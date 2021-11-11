# dimmmensions

📏 ️A collection of dimensions from iOS.

[![build](https://github.com/bouchenoiremarc/dimmmensions/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/bouchenoiremarc/dimmmensions/actions/workflows/ci.yml) [![npm](https://img.shields.io/npm/v/dimmmensions?color=%230cf)](https://www.npmjs.com/package/dimmmensions) [![gzipped](https://img.shields.io/bundlephobia/minzip/dimmmensions?label=gzipped&color=%2385f)](https://www.npmjs.com/package/dimmmensions) [![license](https://img.shields.io/github/license/bouchenoiremarc/dimmmensions?color=%23e4b)](https://github.com/bouchenoiremarc/dimmmensions/blob/main/LICENSE)

🔗 Explore and preview dimensions in the [playground](https://marcbouchenoire.com/projects/dimmmensions).

## Installation

#### Skypack

```html
<script type="module">
  import { dimensions } from "https://cdn.skypack.dev/dimmmensions"
</script>
```

#### Yarn

```sh
yarn add dimmmensions
```

#### npm

```sh
npm install dimmmensions
```

## Usage

#### `dimensions`

Import `dimensions`.

```tsx
import { dimensions } from "dimmmensions"

// dimensions: [Dimension, Dimension, Dimension...]
```

#### `getDimensions`

Import `getDimensions`.

```tsx
import { getDimensions } from "dimmmensions"
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
