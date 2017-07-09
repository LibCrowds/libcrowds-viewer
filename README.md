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
| mode                    | String        | 'select'             | 'select' or 'transcribe'        |
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
| form-schema             | Object        | null                 | See transcribe mode below       |
| form-model              | Object        | null                 | See transcribe mode below       |

See the documentation for the [IIIF Image API](http://iiif.io/api/image/2.1)
and [IIIF Presentation API](http://iiif.io/api/presentation/2.1/) for
more details of how a URI is constructed.

#### Select Mode

In select mode users can click and move their mouse across the image to highlight
areas of the image. This mode requires the least configuration (a minimal example
is provided above) and is useful for tagging images, or preparing for subsequent
transcription.


#### Transcribe Mode

In transcribe mode a form schema and model is passed to the viewer, using the
[vue-form-generator](https://github.com/icebob/vue-form-generator) syntax, for
example:

```vue
formModel: {             
  title: "",
  date: ""
  genre: []
}

formSchema: {
  fields: [{
    type: "input",
    inputType: "text",
    label: "Title",
    model: "title",
    placeholder: "Enter the title",
    required: true
  },
  {
    type: "input",
    inputType: "date",
    label: "Date",
    model: "date"
  },
  {
    type: "select",
    label: "Genre",
    model: "genre",
    values: ["Comedy", "Tragedy", "Drama"]
  }]
}
```

Optionally, you can also pass an image region, such as that returned as
`imageRect` when in select mode. This region will be highlighted when the
viewer is loaded.


### Events

| Event         | Arguments     | Description          |
|---------------|---------------|----------------------|
| submit        | data          | User input confirmed |
