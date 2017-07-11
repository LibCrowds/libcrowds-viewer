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

Vue.use(LibcrowdsViewer);
```

You can now use the component like this (see below for example tasks):

```vue
<libcrowds-viewer
  mode="select"
  :tasks="tasks"
  @submit="handleResponse">
</libcrowds-viewer>
```

### Properties

| Property                | Type          | Default              | Description                     |
|-------------------------|---------------|----------------------|---------------------------------|
| mode                    | String        | 'select'             | 'select' or 'transcribe'        |
| tasks                   | String        | null                 | An array of tasks               |
| confirm-before-unload   | Boolean       | false                | Confirm before leaving the page |
| show-help               | Boolean       | true                 | Include the help modal          |
| show-note               | Boolean       | false                | Include a notes input field     |
| pan-by                  | Number        | 0.1                  | Multiplier by which to pan      |
| form-schema             | Object        | null                 | See transcribe mode below       |
| form-model              | Object        | null                 | See transcribe mode below       |
| region                  | Object        | null                 | See transcribe mode below       |

See the documentation for the [IIIF Image API](http://iiif.io/api/image/2.1)
and [IIIF Presentation API](http://iiif.io/api/presentation/2.1/) for
more details of how a URI is constructed.

#### Select Mode

In select mode users can click and move their mouse to highlight areas of the
image. This mode requires is useful for tagging images, potentially preparing
them for subsequent transcription.

**Example task:**

```js
{
  index: 1,
  objective: 'Tag all of the titles',
  guidance: 'Draw a box around each title, including any subtitles.',
  tileSource: 'https://api.bl.uk/image/iiif/ark:/81055/vdc_100022589157.0x000005/info.json',
  manifest: 'https://api.bl.uk/metadata/iiif/ark:/81055/vdc_100022589158.0x000002/manifest.json'
}
```


#### Transcribe Mode

In transcribe mode a form schema and model is passed to the viewer, using the
[vue-form-generator](https://github.com/icebob/vue-form-generator) syntax.

**Example task:**

```js
{
  index: 1,
  objective: 'Tag all of the titles',
  guidance: 'Draw a box around each title, including any subtitles.',
  tileSource: 'https://api.bl.uk/image/iiif/ark:/81055/vdc_100022589157.0x000005/info.json',
  manifest: 'https://api.bl.uk/metadata/iiif/ark:/81055/vdc_100022589158.0x000002/manifest.json',
  formModel: {
    title: "",
    date: "",
    genre: []
  },
  formSchema: {
    fields: [
      {
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
      }
    ]
  },
  regions: [
    {
      x: 100
      y: 100
      width: 100
      height: 100
    }
  ]
}
```


### Events

| Event         | Arguments     | Description          |
|---------------|---------------|----------------------|
| submit        | data          | User input confirmed |
