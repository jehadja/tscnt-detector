import { containerNameToISOCode, matchersRegex } from "./data/container-types.js";
import { ContainerDimension, containerDimensions } from "./data/dimensions.js";
import { parseContainerNumber, ParsedContainerCode } from './utils/format.js';

export type ContainerType = keyof typeof matchersRegex;

/**
 * Helper class to normalize container type codes based on ISO 6346.
 */
export class ContainerTypeHelper {
    private normalized: string;
    private raw: string;
    private serial: string;

    constructor(raw: string, serial: string = "") {
        this.raw = raw;
        this.serial = serial;
        this.normalized = raw.trim().toLowerCase();
    }

    /**
     * Converts raw input into an official ISO type code (e.g., 'RC', 'GP', 'FR').
     */
    convertISO(): ContainerType | null {
        for (const [iso, regex] of Object.entries(matchersRegex)) {
            if (regex.test(this.normalized)) {
                return iso as ContainerType;
            }
        }
        return null;
    }

    /**
     * Returns a safe TOS-like abbreviation (or raw input uppercased).
     */
    convertTOS(): string {
        return this.convertISO() ?? this.raw.toUpperCase();
    }

    /**
     * Builds a full ISO code with size prefix. Example: getFullISO('45') → '45RC'
     */
    getFullISO(size: string = '20'): string {
        const iso = this.convertISO();
        return iso ? `${size}${iso}` : `${size}XX`;
    }

    /**
     * Heuristically checks if container is High Cube.
     */
    isHC(): boolean {
        const iso = this.convertISO();
        return ['HC', 'PW', 'RC'].includes(iso ?? '') || this.normalized.includes('hc') || this.normalized.includes('high');
    }

    /**
     * Get ISO code by container type name (e.g., 'reefer' → 'RC')
     */
    getISOCode(containerName: string): string | null {
        const key = containerName.trim().toLowerCase();
        return containerNameToISOCode[key] || null;
    }

    /**
     * Get container name from ISO code (e.g., 'RC' → 'Reefer')
     */
    getISOCodeName(code: string): string | null {
        const normalized = code.toUpperCase();
        for (const [name, iso] of Object.entries(containerNameToISOCode)) {
            if (iso.toUpperCase() === normalized) {
                return name;
            }
        }
        return null;
    }

    /**
     * Returns dimension object (length, width, height, cbm) or null.
     */
    getDimensions(size: string = '20'): ContainerDimension | null {
        const iso = this.convertISO();
        const key = `${size}${iso ?? ''}`.toUpperCase();
        return containerDimensions[key] ?? null;
    }

    /**
     * Returns CBM (cubic meter volume) or null if not found.
     */
    getCBM(size: string = '20'): number | null {
        const dim = this.getDimensions(size);
        return dim ? dim.cbm : null;
    }

    /**
     * Returns parsed container serial information, if any.
     */
    getParsedCode(): ParsedContainerCode | null {
        return this.serial ? parseContainerNumber(this.serial) : null;
    }
}
