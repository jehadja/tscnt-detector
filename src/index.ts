import { ContainerTypeHelper } from './container-helper.js';
import { parseContainerNumber, calculateCheckDigit } from './utils/format.js';

export {
    ContainerTypeHelper,
    parseContainerNumber,
    calculateCheckDigit
};

/**
 * Validate a full container number (e.g., "MSCU1234561")
 */
export function validateContainerNumber(serial: string): boolean {
    const result = parseContainerNumber(serial);
    return result?.isValid ?? false;
}

/**
 * Get ISO code from raw input like "reefer", "flt", "high cube"
 */
export function detectISOCode(raw: string): string | null {
    const helper = new ContainerTypeHelper(raw);
    return helper.convertISO();
}

/**
 * Get full container ISO code with size (e.g., 45RC)
 */
export function getFullISO(raw: string, size: string = '20'): string {
    const helper = new ContainerTypeHelper(raw);
    return helper.getFullISO(size);
}
