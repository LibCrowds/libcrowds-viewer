# libcrowds-viewer

[![npm version](https://badge.fury.io/js/libcrowds-viewer.svg)](https://badge.fury.io/js/libcrowds-viewer)

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
  mode="select"
  scheme="http"
  server="api.bl.uk"
  image-api-prefix="image/iiif"
  image-id="ark:/81055/vdc_100022589157.0x000005"
  @submit="handleResponse">
</libcrowds-viewer>
```

### Properties

| Property                | Type          | Default              | Description                     |
|-------------------------|---------------|----------------------|---------------------------------|
| mode                    | String        | 'selection'          | 'select' or 'transcribe'        |
| objective               | String        | null                 | Main task objective             |
| guidance                | String        | null                 | Additional guidance             |
| scheme                  | String        | 'http'               | 'http' or 'https' protocol      |
| server                  | String        | null                 | The IIIF server                 |
| image-api-prefix        | String        | null                 | Prefix for the Image API        |
| presentation-api-prefix | String        | null                 | Prefix for the Presentation API |
| image-id                | String        | null                 | Identifier for the image        |
| manifest-id             | String        | null                 | Identifier for the manifest     |
| confirm-before-unload   | Boolean       | false                | Confirm before leaving the page |
| show-help               | Boolean       | true                 | Include the help modal          |
| show-note               | Boolean       | false                | Include a notes input field     |
| pan-by                  | Number        | 0.1                  | Multiplier by which to pan      |

See the documentation for the [IIIF Image API](http://iiif.io/api/image/2.1)
and [IIIF Presentation API](http://iiif.io/api/presentation/2.1/) for
more details of how a URI is constructed.

### Events

| Event         | Arguments     | Description          |
|---------------|---------------|----------------------|
| submit        | data          | User input confirmed |
