# libcrowds-viewer

[![npm version](https://badge.fury.io/js/libcrowds-viewer.svg)](https://badge.fury.io/js/libcrowds-viewer)
[![Build Status](https://travis-ci.org/LibCrowds/libcrowds-viewer.svg?branch=master)](https://travis-ci.org/LibCrowds/libcrowds-viewer)
[![dependencies Status](https://david-dm.org/LibCrowds/libcrowds-viewer/status.svg)](https://david-dm.org/LibCrowds/libcrowds-viewer)

> IIIF-compatible image viewer Vue component for microtasks

Originally designed for the LibCrowds crowdsourcing platform, this Vue.js
component presents a zoomable image and provides options for users to mark
and transcribe areas of that image.

An array of options is used to configure tasks that are presented to
the user. The output from these tasks is serialised according to the
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
  :task-opts="[{ mode: 'select', imgInfoUri: 'http://www.example.org/image-service/abcd1234/info.json' }]">
</libcrowds-viewer>
```

### Properties

The following viewer has the following properties.

| Property              | Type    | Default | Description                                                                                           |
|-----------------------|---------|---------|-------------------------------------------------------------------------------------------------------|
| task-opts             | Array   | null    | An array of task options                                                                              |
| pan-by                | Number  | 0.1     | Multiplier by which to pan                                                                            |
| zoom-by               | Number  | 0.2     | Multiplier by which to zoom                                                                           |
| lang                  | String  | 'en'    | Language for manifest metadata (where available)                                                      |
| confirm-before-unload | Boolean | false   | Confirm before leaving the page                                                                       |
| disable-complete      | Boolean | false   | Disable completed tasks to prevent multiple submission                                                |
| show-help             | Boolean | true    | Include the help modal                                                                                |
| show-info             | Boolean | true    | Include the metadata modal                                                                            |
| show-browse           | Boolean | true    | Include the browse tasks modal                                                                        |
| show-note             | Boolean | true    | Include the note input                                                                                |
| show-form-errors      | Boolean | true    | Show form errors on submit                                                                            |
| show-like             | Boolean | false   | Show the like button                                                                                  |
| show-share            | Boolean | true    | Show the share button                                                                                 |
| creator               | Object  | null    | The Annotation creator (see [Web Annotation Data Model](https://www.w3.org/TR/annotation-model/))     |
| generator             | Object  | null    | The Annotation generator (see [Web Annotation Data Model](https://www.w3.org/TR/annotation-model/))   |
| next-on-submit        | Object  | true    | Move to the next task on after submission                                                             |
| messageBus            | Object  | null    | Message bus used for notifications (see below)                                                        |

### Events

The following events are emitted from the viewer.

| Event      | Arguments        | Description          |
|------------|------------------|----------------------|
| submit     | task             | User input confirmed |
| update     | task, annotation | Annotation updated   |
| create     | task, annotation | Annotation created   |
| delete     | task, annotation | Annotation deleted   |
| taskchange | oldTask, newTask | Task changed         |
| taskliked  | task             | Task liked/unliked   |

### Notifications

By creating an instance of Vue and passing it to the viewer via the `messageBus`
property it is possible to emit `success` and `error` events that will be
displayed as notifications within the viewer, see example.

```vue
<template>
  <libcrowds-viewer
    :task-opts="taskOpts"
    :message-bus="messageBus">
  </libcrowds-viewer>
</template>

<script>
import Vue from 'vue';

export default {
  data: function () {
    return {
      messageBus: new Vue(),
      taskOpts: [
        {
          mode: 'select',
          imgInfoUri: 'http://www.example.org/image-service/abcd1234/info.json'
        }
      ]
    }
  },

  mounted () {
    // Display a success message
    this.messageBus.$emit('success', 'Yay');

    // Display an error message
    this.messageBus.$emit('error', 'Boo');
  }
}
</script>
```

To display a notification push an object to the `notifications` array with the
following required properties.

| Property | Type   | Description          |
|----------|--------|----------------------|
| type     | String | `success` or `error` |
| text     | String | Message text         |

## Tasks

The core data structure for LibCrowds Viewer is the Task object, an array of
which are created from the task options passed to the viewer.

### Task properties

| Property       | Type    | Attributes  | Description                                                                                                    |
|----------------|---------|-------------|----------------------------------------------------------------------------------------------------------------|
| mode           | String  |             | `'select'` or `'transcribe'`                                                                                   |
| imgInfoUri     | String  |             | Image info URI (see the [IIIF Image API](http://iiif.io/api/image/2.1/#image-information-request-uri-syntax/)) |
| manifestUri    | String  | \<optional> | Manifest URI (see the [IIIF Presentation API](http://iiif.io/api/presentation/2.1/#resource-structure))        |
| id             | String  | \<optional> | Task identifier                                                                                                |
| objective      | String  | \<optional> | The main objective                                                                                             |
| guidance       | String  | \<optional> | Additional guidance                                                                                            |
| form           | Object  | \<optional> | See form properties below                                                                                      |
| highlights     | Array   | \<optional> | Coordinates identifying regions of the image to highlight                                                      |
| tag            | String  | \<optional> | The tag to add when in `select` mode                                                                           |
| liked          | Boolean | \<optional> | Task liked (see the viewer property `show-like`)                                                               |
| classification | String  | \<optional> | A SpecificResource to classify the target as (e.g. [foaf:Person](http://xmlns.com/foaf/spec/#term_Person))     |
| complete       | Boolean | \<optional> | Mark the task as complete                                                                                      |

### Form properties

In `transcribe` mode the form can be configured with the following properties.

| Property        | Type    | Attributes  | Description                                                            |
|-----------------|---------|-------------|------------------------------------------------------------------------|
| model           | Object  |             | See [vue-form-generator](https://github.com/icebob/vue-form-generator) |
| schema          | Object  |             | See [vue-form-generator](https://github.com/icebob/vue-form-generator) |
| classifications | Object  | \<optional> | A SpecificResource IRI for each model key                              |
| highlights      | Object  | \<optional> | A region to highlight for each model key                               |

## Modes

LibCrowds Viewer currently provides the following modes, each configurable via
the task options passed to the viewer.

### Select Mode

In select mode users can use their mouse (or finger) to tag areas of the image,
potentially preparing them for subsequent transcription.

Note that the `tag` property is required when in `select` mode.

#### Example task

```json
{
  "mode": "select",
  "imgInfoUri": "https://api.bl.uk/image/iiif/ark:/81055/vdc_100022589157.0x000005/info.json",
  "manifestUri": "https://api.bl.uk/metadata/iiif/ark:/81055/vdc_100022589158.0x000002/manifest.json",
  "id": 123,
  "tag": "title",
  "classification": "http://purl.org/dc/terms/title",
  "objective": "Tag all of the titles",
  "guidance": "Draw a box around each title, including any subtitles"
}
```

#### Example annotation

```jsonld
{
  "@context": [
    "http://www.w3.org/ns/anno.jsonld",
    "http://iiif.io/api/image/2/context.json"
  ],
  "id": "d008efa2-42e5-494e-b463-c7b9b6744b67",
  "type": "Annotation",
  "motivation": "tagging",
  "created": "2017-07-16T00:44:28.454Z",
  "generated": "2017-07-16T00:44:28.454Z",
  "creator": {
    "id": "http://example.org/user1",
    "type": "Person",
    "name": "My Pseudonym",
    "nickname": "pseudo"
  },
  "generator": {
    "id": "http://example.org/client1",
    "type": "Software",
    "name": "Code v2.1",
    "homepage": "http://example.org/client1/homepage1"
  },
  "target": {
    "id": "https://api.bl.uk/image/iiif/ark:/81055/vdc_100022589157.0x000005",
    "width": 2433,
    "height": 3838,
    "type": "Image",
    "format" : "image/jpeg",
    "selector": {
      "type": "FragmentSelector",
      "value": "https://api.bl.uk/image/iiif/ark:/81055/vdc_100022589157.0x000005/291,1498,1737,244/full/0/default.jpg",
      "conformsTo": "http://iiif.io/api/image"
    }
  },
  "body": [
    {
      "type": "TextualBody",
      "purpose": "tagging",
      "value": "title"
    },
    {
      "type": "SpecificResource",
      "purpose": "classifying",
      "value": "http://purl.org/dc/terms/title"
    }
  ]
  "modified": "2017-07-16T00:44:28.454Z"
}
```

### Transcribe Mode

In transcribe mode a form schema is passed to the viewer along with optional
coordinates to highlight regions of the image (such as those returned from a
previous selection task) allowing for transcription of specific details found
in the image.

Note that the `form` task property is required when in `transcribe` mode. The
`tag` and `classification` task properties are ignored and are instead
taken from `form.model` and `form.classification`, respectively.

#### Example task

```json
{
  "mode": "transcribe",
  "imgInfoUri": "https://api.bl.uk/image/iiif/ark:/81055/vdc_100022589157.0x000005/info.json",
  "manifestUri": "https://api.bl.uk/metadata/iiif/ark:/81055/vdc_100022589158.0x000002/manifest.json",
  "id": 123,
  "objective": "Transcribe the required info",
  "guidance": "Write everything exactly as you see on the page.",
  "classify": "http://purl.org/dc/terms/title",
  "form": {
    "model": {
      "title": "",
      "date": "",
      "genre": []
    },
    "classification": {
      "title": "http://purl.org/dc/terms/title",
      "date": "http://purl.org/dc/terms/date"
    },
    "schema": {
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
    }
  },
  "highlights": [
    {
      "x": 100,
      "y": 100,
      "width": 100,
      "height": 100
    }
  ]
}
```

#### Example annotation

```jsonld
{
  "@context": [
    "http://www.w3.org/ns/anno.jsonld",
    "http://iiif.io/api/image/2/context.json"
  ],
  "id": "45e07a8b-82c2-4fb3-a746-068aad1fab11",
  "type": "Annotation",
  "motivation": "describing",
  "created": "2017-07-16T13:53:18.795Z",
  "generated": "2017-07-16T13:53:18.795Z",
  "creator": {
    "id": "http://example.org/user1",
    "type": "Person",
    "name": "My Pseudonym",
    "nickname": "pseudo"
  },
  "generator": {
    "id": "http://example.org/client1",
    "type": "Software",
    "name": "Code v2.1",
    "homepage": "http://example.org/client1/homepage1"
  },
  "target": {
    "id": "https://api.bl.uk/image/iiif/ark:/81055/vdc_100022589157.0x000005",
    "width": 2433,
    "height": 3838,
    "type": "Image",
    "format": "image/jpeg"
  },
  "body": [
    {
      "type": "TextualBody",
      "purpose": "describing",
      "value": "The Devil to Pay",
      "format": "text/plain"
    },
    {
      "type": "TextualBody",
      "purpose": "tagging",
      "value": "title"
    },
    {
      "type": "SpecificResource",
      "purpose": "classifying",
      "value": "http://purl.org/dc/terms/title"
    }
  ],
  "modified": "2017-07-16T13:53:18.795Z"
}
```

## Managing Annotations

LibCrowds Viewer doesn't manage the persistance of Annotations. This is left to
be implemented in whatever way the client chooses. Instead, the component
follows the standard Vue parent-child relationship of props down, events up.
After initialisation all tasks and annotations are only modified locally, with
any changes emitted via events.

Note that the viewer creates Annotations with a random ID, so this should be
updated and tracked by the client (for instance, using one generated by an
Annotation server).

## Developing

``` bash
# install dependencies
npm install

# serve demo at localhost:8080
npm run demo:dev

# deploy to gh-pages (rights permitting)
npm run demo:deploy

# test
npm run test
```
