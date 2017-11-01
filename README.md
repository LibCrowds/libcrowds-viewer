# libcrowds-viewer

[![npm version](https://badge.fury.io/js/libcrowds-viewer.svg)](https://badge.fury.io/js/libcrowds-viewer)
[![Build Status](https://travis-ci.org/LibCrowds/libcrowds-viewer.svg?branch=master)](https://travis-ci.org/LibCrowds/libcrowds-viewer)
[![dependencies Status](https://david-dm.org/LibCrowds/libcrowds-viewer/status.svg)](https://david-dm.org/LibCrowds/libcrowds-viewer)
[![DOI](https://zenodo.org/badge/95394175.svg)](https://zenodo.org/badge/latestdoi/95394175)

> A Vue.js component for crowdsourcing Web Annotations using a IIIF viewer.

[**DEMO**](https://libcrowds.github.io/libcrowds-viewer/)

**[LibCrowds Viewer documentation](https://libcrowds.gitbooks.io/libcrowds-viewer-docs/content/) for full details of installation, configuration and usage.

## Installation

The component can by installed via npm.

```bash
npm install libcrowds-viewer --save
```

## Usage

Install the component:

``` js
// main.js
import Vue from 'vue';
import LibcrowdsViewer from 'libcrowds-viewer';

Vue.use(LibcrowdsViewer);
```

Use it in your templates \(minimal configuration options shown\):

``` vue
<template>
  <libcrowds-viewer
    :task-opts="taskOpts">
  </libcrowds-viewer>
</template>

<script>
  export default {
    data () {
      return {
        taskOpts: [
          {
            mode: 'select',
            objective: 'Draw rectangles around stuff'
            tileSource: 'http://www.example.org/image-service/abcd123/info.json',
            target: 'http://example.org/iiif/book1/canvas/p1'
          }
        ]
      }
    }
  }
</script>

<style lang="scss">
  @import "~libcrowds-viewer/dist/scss/libcrowds-viewer.scss";
</style>
```

## Development

```bash
# install dependencies
npm install

# serve demo at localhost:8080
npm run demo:dev

# deploy to gh-pages (rights permitting)
npm run demo:deploy

# test
npm run test
```

