# libcrowds-viewer

> IIIF-compatible image viewer Vue component

Originally designed for the LibCrowds crowdsourcing platform, this component
presents an image (loaded from a tile source) and provides options for users to
mark and transcribe areas of that image, returning an object containing the
user input.

[DEMO](https://libcrowds.github.io/libcrowds-viewer/)

## Build Setup

``` bash
# install dependencies
npm install

# build for production with minification
npm run build
```

## Usage

``` js
import Vue from 'vue';
import LibcrowdsViewer from 'libcrowds-viewer';

Vue.component('lc-viewer', LibcrowdsViewer);
```

You can now use the component like this:

``` vue
<lc-viewer></lc-viewer>
```
