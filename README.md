# LibCrowds Viewer

[![Greenkeeper badge](https://badges.greenkeeper.io/LibCrowds/libcrowds-viewer.svg)](https://greenkeeper.io/)
[![npm version](https://badge.fury.io/js/libcrowds-viewer.svg)](https://badge.fury.io/js/libcrowds-viewer)
[![npm downloads](https://img.shields.io/npm/dt/libcrowds-viewer.svg)](https://badge.fury.io/js/libcrowds-viewer)
[![Build Status](https://travis-ci.org/LibCrowds/libcrowds-viewer.svg?branch=master)](https://travis-ci.org/LibCrowds/libcrowds-viewer)
[![DOI](https://zenodo.org/badge/95394175.svg)](https://zenodo.org/badge/latestdoi/95394175)

> A Vue.js component for crowdsourcing Web Annotations using a IIIF viewer.

[**Try the demo**](https://libcrowds.github.io/libcrowds-viewer/)

[**Read the documentation**](https://libcrowds.gitbooks.io/libcrowds-viewer-docs/content/)

## Installation

The component can by installed via npm.

``` bash
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
  <div class="container">
    <libcrowds-viewer
      :task-opts="taskOpts">
    </libcrowds-viewer>
  </div>
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

  // A height must be set on the viewer container.
  .viewer-container {
    margin: 0;
    height: 100vh;
  }
</style>
```

## Development

``` bash
# install dependencies
npm install

# serve demo at localhost:8080
npm run dev

# deploy to gh-pages (rights permitting)
npm run demo:deploy

# test
npm run test
```

