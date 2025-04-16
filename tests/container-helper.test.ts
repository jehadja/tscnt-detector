import { describe, it, expect } from 'vitest';
import { ContainerTypeHelper } from '../src/container-helper.js';

describe('ContainerTypeHelper', () => {
    it('should detect Reefer as RC and return correct full ISO', () => {
        const ref = new ContainerTypeHelper('Reefer');
        expect(ref.convertISO()).toBe('RC');
        expect(ref.getFullISO('45')).toBe('45RC');
        expect(ref.isHC()).toBe(true);
    });

    it('should detect Flat Rack and return correct code', () => {
        const flat = new ContainerTypeHelper('flt');
        expect(flat.convertISO()).toBe('FR');
        expect(flat.getFullISO('40')).toBe('40FR');
        expect(flat.isHC()).toBe(false);
    });

    it('should detect aliases like RHC and FHR as RC', () => {
        expect(new ContainerTypeHelper('rhc').convertISO()).toBe('RC');
        expect(new ContainerTypeHelper('FHR').convertISO()).toBe('RC');
        expect(new ContainerTypeHelper('Hr').convertISO()).toBe('RC');
    });

    it('should handle mixed-case and uppercase inputs', () => {
        expect(new ContainerTypeHelper('ReEfEr').convertISO()).toBe('RC');
        expect(new ContainerTypeHelper('RC').getFullISO('40')).toBe('40RC');
        expect(new ContainerTypeHelper('gP').convertISO()).toBe('GP');
        expect(new ContainerTypeHelper('FLAT RACK').convertISO()).toBe('FR');
    });

    it('should return correct ISO code from name lookup', () => {
        const helper = new ContainerTypeHelper('');
        expect(helper.getISOCode('reefer')).toBe('RC');
        expect(helper.getISOCode('flat rack')).toBe('FR');
        expect(helper.getISOCode('high cube')).toBe('HC');
    });

    it('should return correct name from ISO code', () => {
        const helper = new ContainerTypeHelper('');
        expect(helper.getISOCodeName('RC')?.toLowerCase()).toContain('reefer');
        expect(helper.getISOCodeName('FR')?.toLowerCase()).toContain('flat');
        expect(helper.getISOCodeName('HC')?.toLowerCase()).toContain('high');
    });

    it('should default to XX when unknown input', () => {
        const unknown = new ContainerTypeHelper('banana-box');
        expect(unknown.getFullISO('20')).toBe('20XX');
        expect(unknown.convertISO()).toBeNull();
        expect(unknown.isHC()).toBe(false);
        expect(unknown.getDimensions('20')).toBeNull();
        expect(unknown.getCBM('20')).toBeNull();
    });

    it('should return correct dimensions and CBM for 40HC', () => {
        const hc = new ContainerTypeHelper('hc');
        const dim = hc.getDimensions('40');
        expect(dim?.length).toBe(12032);
        expect(dim?.height).toBe(2690);
        expect(hc.getCBM('40')).toBe(76);
    });

    it('should return correct dimensions for Reefer High Cube (RHC)', () => {
        const rhc = new ContainerTypeHelper('rhc');
        const dim = rhc.getDimensions('45');
        expect(dim?.cbm).toBe(75);
        expect(rhc.isHC()).toBe(true);
    });

    it('should parse valid container serials and confirm check digit', () => {
        const cases = [
            { serial: 'TCLU7024574', owner: 'TCL', serialNum: '702457', check: 4 },
            { serial: 'FFAU2504240', owner: 'FFA', serialNum: '250424', check: 0 },
            { serial: 'TXGU4205666', owner: 'TXG', serialNum: '420566', check: 6 }
        ];

        for (const { serial, owner, serialNum, check } of cases) {
            const helper = new ContainerTypeHelper('', serial);
            const parsed = helper.getParsedCode();

            expect(parsed?.ownerCode).toBe(owner);
            expect(parsed?.categoryIdentifier).toBe('U');
            expect(parsed?.serialNumber).toBe(serialNum);
            expect(parsed?.checkDigit).toBe(check);
            expect(parsed?.isValid).toBe(true);
        }
    });


    it('should detect invalid serial check digit', () => {
        const container = new ContainerTypeHelper('', 'MSCU1234560'); // invalid check digit
        const parsed = container.getParsedCode();
        expect(parsed?.isValid).toBe(false);
    });

    it('should return null for non-standard container serial input', () => {
        const container = new ContainerTypeHelper('', 'HELLO-WORLD');
        const parsed = container.getParsedCode();
        expect(parsed).toBeNull();
    });
});
