/**
 * Utility functions for parsing and formatting container codes.
 */

export interface ParsedContainerCode {
    ownerCode: string;
    categoryIdentifier: 'U' | 'J' | 'Z';
    serialNumber: string;
    checkDigit: number;
    isValid: boolean;
}

/**
 * Parses a standard ISO 6346 container number.
 * Example: "MSCU1234565"
 */
export function parseContainerNumber(code: string): ParsedContainerCode | null {
    const cleaned = code.replace(/\s+/g, '').toUpperCase();
    const match = cleaned.match(/^([A-Z]{3})([UJZ])(\d{6})(\d)$/);

    if (!match) return null;

    const [_, owner, category, serial, check] = match;
    const expectedCheckDigit = calculateCheckDigit(owner + category + serial);
    const actualCheckDigit = parseInt(check);

    return {
        ownerCode: owner,
        categoryIdentifier: category as 'U' | 'J' | 'Z',
        serialNumber: serial,
        checkDigit: actualCheckDigit,
        isValid: actualCheckDigit === expectedCheckDigit
    };
}

/**
 * Calculates the ISO 6346 check digit using the official mod-11 algorithm.
 */
export function calculateCheckDigit(code: string): number {
    const letterValues: Record<string, number> = {
        A: 10, B: 12, C: 13, D: 14, E: 15, F: 16, G: 17, H: 18, I: 19,
        J: 20, K: 21, L: 23, M: 24, N: 25, O: 26, P: 27, Q: 28, R: 29,
        S: 30, T: 31, U: 32, V: 34, W: 35, X: 36, Y: 37, Z: 38
    };

    const weights = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512];
    let sum = 0;

    for (let i = 0; i < 10; i++) {
        const char = code[i].toUpperCase();

        let value: number;

        if (/[A-Z]/.test(char)) {
            value = letterValues[char] ?? -1;
        } else if (/\d/.test(char)) {
            value = parseInt(char);
        } else {
            return -1; // invalid character
        }

        if (value === -1) return -1;
        sum += value * weights[i];
    }

    const remainder = sum % 11;
    return remainder === 10 ? 0 : remainder;
}
