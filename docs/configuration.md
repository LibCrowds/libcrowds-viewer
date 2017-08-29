# Configuration

LibCrowds Viewer provides a range of configuration options that are passed as properties, most of which are optional but allow for more flexible implementations where required.

## Viewer

All of the following properties, apart from `task-opts`, are optional.

| Property              | Type    | Default   | Description                                                                                           |
|-----------------------|---------|-----------|-------------------------------------------------------------------------------------------------------|
| task-opts             | Array   |           | An array of task options \(see [Tasks](configuration.md#tasks)\)                                      |
| pan-by                | Number  | 0.1       | Multiplier by which to pan                                                                            |
| zoom-by               | Number  | 0.2       | Multiplier by which to zoom                                                                           |
| lang                  | String  | 'en'      | Language for manifest metadata \(where available\)                                                    |
| confirm-before-unload | Boolean | false     | Confirm before leaving the page                                                                       |
| disable-complete      | Boolean | false     | Disable completed tasks to prevent multiple submission                                                |
| show-note             | Boolean | true      | Include the note input                                                                                |
| show-form-errors      | Boolean | true      | Show form errors on submit                                                                            |
| show-related-tasks    | Boolean | false     | Show all tasks related to the same image                                                              |
| creator               | Object  | null      | The Annotation creator \(see [Web Annotation Data Model](https://www.w3.org/TR/annotation-model/)\)   |
| generator             | Object  | null      | The Annotation generator \(see [Web Annotation Data Model](https://www.w3.org/TR/annotation-model/)\) |
| next-on-submit        | Object  | true      | Move to the next task on after submission                                                             |
| messageBus            | Object  | null      | Message bus used for notifications \(see [Message Bus](message_bus.md)\)                              |
| navigation            | Array   | null      | Additional navigation links \(see [Navigation](configuration.md#navigation)\)                         |
| confirm-on-submit     | Boolean | true      | Show a confirmation box on submission                                                                 |
| buttons               | Object  | See below | The toolbar buttons to display (see [Buttons](configuration.md#buttons)                               |

## Buttons

By default the viewer displays all of the buttons listed below, to hide a particular button set its value to `false` via the `buttons` object.

| Property              | Type    | Default | Description                                                                                           |
|-----------------------|---------|---------|-------------------------------------------------------------------------------------------------------|
| fullscreen            | Boolean | true    | Show the fullscreen button                                                                            |
| help                  | Boolean | true    | Show the help modal button                                                                            |
| info                  | Boolean | true    | Show the metadata modal button                                                                        |
| browse                | Boolean | true    | Show the browse tasks modal button                                                                    |
| like                  | Boolean | true    | Show the like button                                                                                  |
| share                 | Boolean | true    | Show the share button                                                                                 |
| download              | Boolean | true    | Show the download button                                                                              |


## Tasks

Tasks are created from the `task-opts` passed to the viewer, which each have the following properties.

| Property       | Type              | Attributes | Description                                                                                                    |
|----------------|-------------------|------------|----------------------------------------------------------------------------------------------------------------|
| mode           | String            |            | The task more (see [Annotation Modes](annotations/README.md))                                                  |
| tileSource     | String or Object  |            | The tile source specifier (see [Tile Sources](tile_sources.md))                                                |
| target         | String            |            | The target of the annotation (see [Data Model](data_model.md))                                                 |
| objective      | String            |  optional  | The main objective                                                                                             |
| guidance       | String            |  optional  | Additional guidance                                                                                            |
| thumbnailUrl   | String            |  optional  | URL for a thumbnail image to use in the browse modal                                                           |
| manifestUri    | String            |  optional  | Manifest URI (see the [IIIF Presentation API](http://iiif.io/api/presentation))                                |
| metadata       | Object            |  optional  | Metadata for the info modal (takes preference over `manifestUri`)                                              |
| id             | String            |  optional  | Task identifier                                                                                                |
| form           | Object            |  optional  | Form properties (see [Forms](configuration.md#forms))                                                          |
| highlights     | Array             |  optional  | Coordinates identifying regions of the image to highlight                                                      |
| tag            | String            |  optional  | A tag                                                                                                          |
| liked          | Boolean           |  optional  | Task liked (see the viewer property `show-like`)                                                               |
| classification | String            |  optional  | A Semantic Tag (e.g. [http://purl.org/dc/terms/title](http://purl.org/dc/terms/title))       |
| complete       | Boolean           |  optional  | Mark the task as complete                                                                                      |
| shareUrl       | String            |  optional  | URL for the 'share' button                                                                                     |

## Forms

In `transcribe` mode the form can be configured with the following properties.

| Property        | Type    | Attributes | Description                                                            |
|-----------------|---------|------------|------------------------------------------------------------------------|
| model           | Object  |            | See [vue-form-generator](https://github.com/icebob/vue-form-generator) |
| schema          | Object  |            | See [vue-form-generator](https://github.com/icebob/vue-form-generator) |
| classifications | Object  |  optional  | A SpecificResource IRI for each model key                              |
| highlights      | Object  |  optional  | A region to highlight for each model key                               |

## Navigation

Additional navigation links (for example, for the rest of your website) can be passed to the viewer via the `navigation` property. These links will be appended to a collapsible sidebar toggled via a 'hamburger' button and (as with all other buttons) still visible in full screen mode.

| Property | Type   | Description          |
|----------|--------|----------------------|
| label    | String | A label for the link |
| url      | String | The link url         |