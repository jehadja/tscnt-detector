# 🛰️ TSCNT Detector

> Universal ISO 6346 container type detection, standardization, and validation tool — based on real-world abbreviations, shipping codes, and TOS variants.

**TSCNT Detector** is a lightweight TypeScript utility and CLI tool that:
- ✅ Converts real-world container type inputs (`ref`, `flt`, `dry`, `high cube`) into ISO 6346 codes (`RC`, `FR`, `GP`, `HC`)
- ✅ Computes full container codes (`45RC`, `20GP`)
- ✅ Validates container serial numbers using ISO 6346 MOD-11
- ✅ Retrieves container dimensions (L×W×H) and CBM
- ✅ Supports CLI usage and programmatic access

---

## 📦 Installation

```bash
npm install tscnt-detector
```

For CLI usage globally:

```bash
npm install -g tscnt-detector
```

---

## 🔧 Programmatic Usage (TS/JS)

```ts
import { ContainerTypeHelper } from 'tscnt-detector';

const container = new ContainerTypeHelper('Reefer');

console.log(container.convertISO());      // → 'RC'
console.log(container.getFullISO('45'));  // → '45RC'
console.log(container.isHC());            // → true
console.log(container.getCBM('45'));      // → 75
```

---

## 🚀 CLI Usage

```bash
tscnt reefer --size=45
tscnt --containerType=flt --size=40
tscnt --containerNumber=TCLU7024574
tscnt --containerType=rc --containerNumber=MSCU1234560 --size=45
```

### 🔄 Sample Output:

```bash
🔎 Type Detected: RC
🔢 Full ISO: 45RC
📐 Dimensions: 13000×2300×2500 mm
📦 CBM: 75
🏷️ Is HC: true

🔍 Serial Detected:
  📦 Owner Code:        MSC
  🔠 Category:          U
  🔢 Serial Number:     123456
  ✅ Check Digit:       1
  🔍 Valid Check Digit: ❌ No
```

---

## ⚙️ CLI Options

| Flag                  | Description                               |
|-----------------------|-------------------------------------------|
| `--size=NUM`          | Optional size prefix (default: `20`)      |
| `--containerType=XXX` | Explicit container type input             |
| `--containerNumber=XX`| ISO 6346 container serial number          |

---

## 🧠 Features

- ✔️ Recognizes industry-standard and real-world abbreviations (`FLT`, `REF`, `DC`, `NOR`, `RHC`, `STD`, etc.)
- ✔️ Detects ISO Type Codes: `GP`, `HC`, `RC`, `FR`, `OT`, `PW`, `BU`, etc.
- ✔️ Validates container serials using ISO 6346 MOD-11
- ✔️ Returns dimensions and CBM (cubic volume)
- ✔️ Supports CLI and API usage
- ✔️ Detects High Cube (HC) containers
- ✔️ Extendable via RegEx matchers

---

## 🧪 Testing

```bash
npm run test
```

Runs all tests using [Vitest](https://vitest.dev).

---

## 📚 API Overview

### `new ContainerTypeHelper(rawType?: string, serial?: string)`

| Method                  | Description                                                                 |
|--------------------------|-----------------------------------------------------------------------------|
| `.convertISO()`          | Returns ISO code from raw input (`RC`, `GP`, `FR`)                         |
| `.convertTOS()`          | Returns normalized form (e.g. `FLT`, `REF`)                                |
| `.getFullISO(size)`      | Returns full ISO code like `45RC`                                          |
| `.getDimensions(size)`   | Returns `{ length, width, height, cbm }` object or null                    |
| `.getCBM(size)`          | Returns cubic volume in m³ or null                                         |
| `.getISOCode(name)`      | Lookup ISO code from descriptive name                                      |
| `.getISOCodeName(iso)`   | Lookup friendly name from ISO code                                         |
| `.isHC()`                | Detects if the type is High Cube                                           |
| `.getParsedCode()`       | Parses a container number into parts & verifies the check digit            |

---

## 📦 Supported ISO Codes

| Code | Full Name              | Examples / Aliases (Regex Matched)             |
|------|------------------------|-----------------------------------------------|
| `GP` | General Purpose        | `gp`, `std`, `dry`, `st`, `dc`                |
| `HC` | High Cube              | `hc`, `hq`, `highcube`, `hi-cube`             |
| `RC` | Reefer                 | `rf`, `ref`, `reefer`, `rhc`, `fhr`, `nor`    |
| `FR` | Flat Rack              | `fr`, `flt`, `flat rack`, `rack`, `f/r`       |
| `OT` | Open Top               | `ot`, `opentop`, `o-t`, `hard top`            |
| `TK` | Tank                   | `tk`, `tku`, `tank`, `iso tank`               |
| `BU` | Bulk Container         | `bu`, `bk`, `bulkcontainer`                  |
| `VT` | Ventilated             | `vt`, `vc`, `ventilated`, `vented`            |
| `PW` | Pallet Wide            | `pw`, `palletwide`, `wide pallet`             |
| `IN` | Insulated              | `in`, `ins`, `thermal`, `isothermal`          |
| `HH` | Half Height            | `hh`, `half-height`, `low box`                |
| `SD` | Side Door / Open Side  | `sd`, `os`, `side door`, `open side`          |
| `UC` | Uncontainerized        | `uc`, `nocntr`, `breakbulk`, `loose cargo`    |

---

## 📏 Sample Dimensions

| Size | Type | Length (mm) | Width | Height | CBM |
|------|------|-------------|-------|--------|-----|
| 20   | GP   | 5898        | 2352  | 2390   | 33  |
| 20   | RC   | 5450        | 2260  | 2260   | 27  |
| 40   | HC   | 12032       | 2352  | 2690   | 76  |
| 45   | RC   | 13000       | 2300  | 2500   | 75  |
| 40   | FR   | 12192       | 2438  | 2591   | 76  |

---

## 👤 Author

Made with ❤️ by [Jehad Jaghoub](https://github.com/jehadja)

---

## 📄 License

Licensed under the [MIT License](./LICENSE)
