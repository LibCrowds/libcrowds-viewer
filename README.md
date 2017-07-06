# libcrowds-viewer

> IIIF-compatible image viewer Vue component

Originally designed for the LibCrowds crowdsourcing platform, this Vue.js
component presents a zoomable image and provides options for users to mark
and transcribe areas of that image.

[**DEMO**](https://libcrowds.github.io/libcrowds-viewer/)

## Install

```bash
npm install libcrowds-viewer --save
```

## Usage

```js
import Vue from 'vue';
import LibcrowdsViewer from 'libcrowds-viewer';

Vue.component('libcrowds-viewer', LibcrowdsViewer);
```

You can now use the component like this:

```vue
<libcrowds-viewer
  scheme="http"
  server="api.bl.uk"
  image-api-prefix="image/iiif"
  image-id="ark:/81055/vdc_100022589157.0x000005"
  @submit="handleResponse">
</libcrowds-viewer>
```

See the documentation for the [IIIF Image API (v2.1)](http://iiif.io/api/image/2.1)
and [IIIF Presentation API (v2.1)](http://iiif.io/api/presentation/2.1/) for
more details of how a URI is constructed.

### Properties

| Property                | Type          | Default              |
|-------------------------|---------------|----------------------|
| mode                    | String        | 'selection'          |
| objective               | String        | null                 |
| guidance                | String        | null                 |
| scheme                  | String        | 'http'               |
| server                  | String        | null                 |
| image-api-prefix        | String        | null                 |
| presentation-api-prefix | String        | null                 |
| image-id                | String        | null                 |
| manifest-id             | String        | null                 |
| confirm-before-unload   | Boolean       | false                |
| show-help               | Boolean       | true                 |
| show-note               | Boolean       | false                |
| pan-by                  | Number        | 0.1                  |


### Events

| Event         | Arguments     | Description          |
|---------------|---------------|----------------------|
| submit        | data          | User input confirmed |
