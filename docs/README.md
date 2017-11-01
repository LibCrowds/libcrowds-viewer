# Introduction

LibCrowds Viewer is a [Vue.js](https://vuejs.org/v2/guide/) component for crowdsourcing annotations, which are generated according to the [Web Annotations Data Model](https://www.w3.org/TR/annotation-model/).

Tasks are fed into the viewer via properties and the resulting annotations emitted as events. It is up to the client to decide how to store these annotations (probably by sending them to an annotations server).

## Installation

The component can by installed via npm.

```bash
npm install libcrowds-viewer --save
```

## Usage

Install the component.

``` js
// main.js
import Vue from 'vue';
import LibcrowdsViewer from 'libcrowds-viewer';

Vue.use(LibcrowdsViewer);
```

Use it in your templates \(minimal configuration options shown\).

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

  // An explicit height must be set on the viewer container.
  .viewer-container {
    margin: 0;
    height: 100vh;
  }
</style>
```

## Development

```bash
# install dependencies
npm install

# serve demo at localhost:8080
npm run dev

# deploy to gh-pages (rights permitting)
npm run demo:deploy

# test
npm run test
```
