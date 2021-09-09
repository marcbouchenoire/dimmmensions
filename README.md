# ios-dimensions

📏 ️A collection of dimensions from iOS.

[![build](https://github.com/bouchenoiremarc/ios-dimensions/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/bouchenoiremarc/ios-dimensions/actions/workflows/ci.yml) [![npm](https://img.shields.io/npm/v/ios-dimensions?color=%230cf)](https://www.npmjs.com/package/ios-dimensions) [![gzipped](https://img.shields.io/bundlephobia/minzip/ios-dimensions?label=gzipped&color=%2385f)](https://www.npmjs.com/package/ios-dimensions) [![license](https://img.shields.io/github/license/bouchenoiremarc/ios-dimensions?color=%23e4b)](https://github.com/bouchenoiremarc/ios-dimensions/blob/main/LICENSE)

<img src=".github/site@2x.png" width="620" height="336">

🔗 Explore and preview dimensions in the [playground](https://marcbouchenoire.com/projects/ios-dimensions).

## Installation

#### Skypack

```html
<script type="module">
  import { dimensions } from "https://cdn.skypack.dev/ios-dimensions"
</script>
```

#### Yarn

```sh
yarn add ios-dimensions
```

#### npm

```sh
npm install ios-dimensions
```

## Usage

#### `dimensions`

Import `dimensions`.

```tsx
import { dimensions } from "ios-dimensions"

// dimensions: [Dimension, Dimension, Dimension...]
```

#### `getDimensions`

Import `getDimensions`.

```tsx
import { getDimensions } from "ios-dimensions"
```

Given no arguments, `getDimensions` will also return all dimensions.

```tsx
const dimensions = getDimensions()

// dimensions: [Dimension, Dimension, Dimension...]
```

Given a specific `width` and `height`, `getDimensions` will return dimensions that match the specified `screen` size, either in portrait or landscape.

```tsx
const dimensions = getDimensions(320, 568)

// dimensions: [Dimension]
```

## Automation

Dimensions are extracted from iOS with the `generate` command—using Xcode and Simulator.

<img src=".github/generate@2x.png" width="620" height="426">

## Related

[🔣 ios-symbols](https://github.com/bouchenoiremarc/ios-symbols): A collection of every symbol from SF Symbols.
