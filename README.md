# libcrowds-viewer

> IIIF-compatible image viewer component


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

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
