export interface ContainerDimension {
    length: number; // in millimeters
    width: number;
    height: number;
    cbm: number;    // in cubic meters
}

export const containerDimensions: Record<string, ContainerDimension> = {
    '20GP': { length: 5898, width: 2352, height: 2390, cbm: 33 },
    '20HC': { length: 5898, width: 2352, height: 2690, cbm: 37 },
    '20RC': { length: 5450, width: 2260, height: 2260, cbm: 27 },
    '40GP': { length: 12032, width: 2352, height: 2390, cbm: 67 },
    '40HC': { length: 12032, width: 2352, height: 2690, cbm: 76 },
    '40RC': { length: 11500, width: 2290, height: 2300, cbm: 60 },
    '45HC': { length: 13556, width: 2352, height: 2690, cbm: 86 },
    '40FR': { length: 12192, width: 2438, height: 2591, cbm: 76 },
    '20FR': { length: 6058, width: 2438, height: 2591, cbm: 33 },
    '45RC': { length: 13000, width: 2300, height: 2500, cbm: 75 }
};