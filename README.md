# libcrowds-viewer

> IIIF-compatible image viewer Vue component

Originally designed for the LibCrowds crowdsourcing platform, this Vue.js 
component presents a zoomable image and provides options for users to mark 
and transcribe areas of that image.

[**DEMO**](https://libcrowds.github.io/libcrowds-viewer/)

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
<lc-viewer tileSource="{scheme}://{server}{/prefix}/{identifier}/info.json"></lc-viewer>
```

Where `tileSource` is a URI conforming to the IIIF Image Request URI Syntax, 
see the [IIIF Image API (v2.1) documentation](http://iiif.io/api/image/2.1) 
for details.
