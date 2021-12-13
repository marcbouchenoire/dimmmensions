# <a href="https://dimmmensions.marcbouchenoire.com"><img src="https://raw.githubusercontent.com/marcbouchenoire/dimmmensions/main/packages/site/public/logo.svg" width="326" alt="Dimmmensions" /></a>

📏 A collection of dimensions from iOS and iPadOS devices.

- 🤖 [**Automated**](#automation): Authored and updated automatically
- 🧪 **Reliable**: Fully tested with [100% code coverage](https://codecov.io/gh/marcbouchenoire/dimmmensions)
- 📦 **Typed**: Written in [TypeScript](https://www.typescriptlang.org/) and includes definitions out-of-the-box
- 💨 **Zero dependencies**

[![version](https://img.shields.io/badge/iOS%2015.0-message?color=%23b4e)](https://developer.apple.com/sf-symbols/)
[![build](https://img.shields.io/github/workflow/status/marcbouchenoire/dimmmensions/CI?color=%23b4e)](https://github.com/marcbouchenoire/dimmmensions/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/dimmmensions?color=%23b4e)](https://www.npmjs.com/package/dimmmensions)
[![size](https://img.shields.io/bundlephobia/minzip/dimmmensions?label=size&color=%23b4e)](https://bundlephobia.com/package/dimmmensions)
[![coverage](https://img.shields.io/codecov/c/github/marcbouchenoire/dimmmensions?color=%23b4e)](https://codecov.io/gh/marcbouchenoire/dimmmensions)
[![license](https://img.shields.io/github/license/marcbouchenoire/dimmmensions?color=%23b4e)](https://github.com/marcbouchenoire/dimmmensions/blob/main/LICENSE)

## Introduction

Dimmmensions collects dimensions as objects for each device.

```typescript
interface Dimensions {
  device: "iPhone" | "iPad"
  name: string
  radius: number
  scale: number
  landscape: Orientation
  portrait: Orientation
}
```

`landscape` and `portrait` both contain orientation-specific dimensions and size classes.

```typescript
interface Orientation {
  screen: {
    width: number
    height: number
  }
  layoutMargins: {
    top: number
    left: number
    right: number
    bottom: number
  }
  readableContent: {
    top: number
    left: number
    right: number
    bottom: number
  }
  safeArea: {
    top: number
    left: number
    right: number
    bottom: number
  }
  sizeClass: {
    horizontal: "compact" | "regular"
    vertical: "compact" | "regular"
  }
}
```

#### Examples

<details>
<summary><code>iPhone 11</code></summary>
<p>

```json
{
  "device": "iPhone",
  "name": "iPhone 11",
  "radius": 41.5,
  "scale": 2,
  "landscape": {
    "screen": {
      "width": 896,
      "height": 414
    },
    "layoutMargins": {
      "top": 0,
      "left": 64,
      "right": 64,
      "bottom": 21
    },
    "readableContent": {
      "top": 0,
      "left": 116,
      "right": 116,
      "bottom": 21
    },
    "safeArea": {
      "top": 0,
      "left": 48,
      "right": 48,
      "bottom": 21
    },
    "sizeClass": {
      "horizontal": "regular",
      "vertical": "compact"
    }
  },
  "portrait": {
    "screen": {
      "width": 414,
      "height": 896
    },
    "layoutMargins": {
      "top": 48,
      "left": 20,
      "right": 20,
      "bottom": 34
    },
    "readableContent": {
      "top": 48,
      "left": 20,
      "right": 20,
      "bottom": 34
    },
    "safeArea": {
      "top": 48,
      "left": 0,
      "right": 0,
      "bottom": 34
    },
    "sizeClass": {
      "horizontal": "compact",
      "vertical": "regular"
    }
  }
}
```

</p>
</details>

<details>
<summary><code>iPad mini</code></summary>
<p>

```json
{
  "device": "iPad",
  "name": "iPad mini (6th generation)",
  "radius": 21.5,
  "scale": 2,
  "landscape": {
    "screen": {
      "width": 1133,
      "height": 744
    },
    "sizeClass": {
      "horizontal": "regular",
      "vertical": "regular"
    },
    "layoutMargins": {
      "top": 24,
      "left": 20,
      "right": 20,
      "bottom": 20
    },
    "readableContent": {
      "top": 24,
      "left": 234.5,
      "right": 234.5,
      "bottom": 20
    },
    "safeArea": {
      "top": 24,
      "left": 0,
      "right": 0,
      "bottom": 20
    }
  },
  "portrait": {
    "screen": {
      "width": 744,
      "height": 1133
    },
    "sizeClass": {
      "horizontal": "regular",
      "vertical": "regular"
    },
    "layoutMargins": {
      "top": 24,
      "left": 20,
      "right": 20,
      "bottom": 20
    },
    "readableContent": {
      "top": 24,
      "left": 20,
      "right": 20,
      "bottom": 20
    },
    "safeArea": {
      "top": 24,
      "left": 0,
      "right": 0,
      "bottom": 20
    }
  }
}
```

</p>
</details>

## Installation

#### Skypack

```javascript
import { dimensions } from "https://cdn.skypack.dev/dimmmensions"
```

#### Yarn

```bash
yarn add dimmmensions
```

#### npm

```bash
npm install dimmmensions
```

## Usage

#### `dimensions`

Import `dimensions`.

```typescript
import { dimensions } from "dimmmensions"

// dimensions: [Dimensions, Dimensions, Dimensions...]
```

#### `getDimensions`

Import `getDimensions`.

```typescript
import { getDimensions } from "dimmmensions"
```

Given no arguments, `getDimensions` will also return all dimensions.

```typescript
const dimensions = getDimensions()

// dimensions: [Dimensions, Dimensions, Dimensions...]
```

Given a specific `width` and `height`, `getDimensions` will return dimensions that match the specified `screen` size, either in portrait or landscape.

```typescript
const dimensions = getDimensions(320, 568)

// dimensions: [Dimensions]
```

## Automation

Dimensions are extracted from iOS and iPadOS with the `generate` command—using Xcode and Simulator.
