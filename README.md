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

Vue.component('libcrowds-viewer', LibcrowdsViewer);
```

You can now use the component like this:

``` vue
<libcrowds-viewer
  mode="'selection'"
  objective="'Mark the titles'"
  guidance="'Draw a box around each play title'"
  scheme="http"
  server="api.bl.uk"
  image-api-prefix="image/iiif"
  presentation-api-prefix="metadata/iiif"
  image-id="ark:/81055/vdc_100022589157.0x000005"
  manifest-id="ark:/81055/vdc_100022589158.0x000002"
  @submit="handleResponse">
</libcrowds-viewer>
```

See the documentation for the [IIIF Image API (v2.1)](http://iiif.io/api/image/2.1)
and [IIIF Presentation API (v2.1)](http://iiif.io/api/presentation/2.1/) for 
more details of how a URI is constructed.

There are currently two modes, *selection* and *transcription*, both of which
should be pretty self-explanatory and both of which return a JSON response
containing the user input.

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
| confirm-before-unload   | String        | false                |
| show-help               | String        | true                 |


### Events

| Event         | Arguments     | Description          |
|---------------|---------------|----------------------|
| submit        | data          | User input confirmed |
