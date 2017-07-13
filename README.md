# libcrowds-viewer

[![npm version](https://badge.fury.io/js/libcrowds-viewer.svg)](https://badge.fury.io/js/libcrowds-viewer)

> IIIF-compatible image viewer Vue component for microtasks

Originally designed for the LibCrowds crowdsourcing platform, this Vue.js
component presents a zoomable image and provides options for users to mark
and transcribe areas of that image.

User input is serialised according to the
[W3C Web Annotations spec](https://www.w3.org/annotation/) and returned via
events.

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

You can now use the component like this:

```vue
<libcrowds-viewer
  mode="select"
  :taskOpts="[{ id: 1, tileSource: 'http://www.example.org/image-service/abcd1234/info.json' }]">
</libcrowds-viewer>
```

### Properties

| Property                | Type          | Default              | Description                                      |
|-------------------------|---------------|----------------------|--------------------------------------------------|
| mode                    | String        | 'select'             | 'select' or 'transcribe'                         |
| taskOpts                | String        | null                 | An array of task options                         |
| confirm-before-unload   | Boolean       | false                | Confirm before leaving the page                  |
| show-help               | Boolean       | true                 | Include the help modal                           |
| show-info               | Boolean       | true                 | Include the metadata modal                       |
| show-note               | Boolean       | false                | Include a notes input field                      |
| show-browse             | Boolean       | true                 | Include the browse sidebar                       |
| show-form-errors        | Boolean       | true                 | Show form errors on submit                       |
| pan-by                  | Number        | 0.1                  | Multiplier by which to pan                       |
| lang                    | String        | 'en'                 | Language for manifest metadata (where available) |

### Events

| Event         | Arguments     | Description          |
|---------------|---------------|----------------------|
| submit        | data          | User input confirmed |

### Modes

LibCrowds Viewer currently provides the following modes.

#### Select Mode

In select mode users can click and move their mouse to highlight areas of the
image. This mode is useful for tagging images and potentially preparing
them for subsequent transcription.

#### Transcribe Mode

In transcribe mode a form schema and model is passed to the viewer (using the
[vue-form-generator](https://github.com/icebob/vue-form-generator) syntax),
along with optional coordinates to highlight regions of the image. This allows
users to transcribe specific details found in the image.

### Tasks

The core data structure for LibCrowds Viewer is the Task object. An array of
Task options is passed to the viewer as a property and from each item in this
array a new Task object is created. These Tasks are updated within the viewer
with data such as area selection and form input data, with the update events
emitted from the viewer.

#### Task properties

| Property                | Type   | Attributes  | Description                                                                          |
|-------------------------|--------|-------------|--------------------------------------------------------------------------------------|
| id                      | String |             | Task identifier                                                                      |
| tileSource              | String |             | Tile source URI (see the [IIIF Image API](http://iiif.io/api/image/2.1/))            |
| manifest                | String | \<optional> | Manifest URI (see the [IIIF Presentation API](http://iiif.io/api/presentation/2.1/)) |
| objective               | String | \<optional> | The main objective                                                                   |
| guidance                | String | \<optional> | Additional guidance                                                                  |
| form                    | Object | \<optional> | Form schema and model for use in transcription tasks                                 |
| regions                 | Array  | \<optional> | Coordinates identifying regions of the image                                         |
| note                    | String | \<optional> | Additional note about the image                                                      |

#### Simple Example

The minimum set of options that must be passed to the viewer is simply `mode`
and `tileSource`.

```json
{
  "mode": "select",
  "tileSource": "https://api.bl.uk/image/iiif/ark:/81055/vdc_100022589157.0x000005/info.json"
}
```

#### Full Example

```json
{
  "id": 123,
  "tileSource": "https://api.bl.uk/image/iiif/ark:/81055/vdc_100022589157.0x000005/info.json",
  "manifest": "https://api.bl.uk/metadata/iiif/ark:/81055/vdc_100022589158.0x000002/manifest.json",
  "objective": "Transcribe the required info",
  "guidance": "Write everything exactly as you see on the page.",
  "form": {
    "formModel": {
      "title": "",
      "date": "",
      "genre": []
    },
    "formSchema": {
      "fields": [
        {
          "type": "input",
          "inputType": "text",
          "label": "Title",
          "model": "title",
          "placeholder": "Enter the title",
          "required": true
        },
        {
          "type": "input",
          "inputType": "date",
          "label": "Date",
          "model": "date"
        },
        {
          "type": "select",
          "label": "Genre",
          "model": "genre",
          "values": ["Comedy", "Tragedy", "Drama"]
        }
      ]
    },
    "errors": []
  },
  "regions": [
    {
      "x": 100,
      "y": 100,
      "width": 100,
      "height": 100
    }
  ],
  "annotations": []
}
```

For more (including simpler) example tasks see [demo/src/data](demo/src/data).
