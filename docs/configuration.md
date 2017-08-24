# Configuration

LibCrowds Viewer provides a range of configuration options that are passed as properties, most of which are optional but allow for more flexible implementations where required.

## Viewer

All of the following properties, apart from `task-opts` are optional.

| Property              | Type    | Default | Description                                                                                           |
|-----------------------|---------|---------|-------------------------------------------------------------------------------------------------------|
| task-opts             | Array   |         | An array of task options \(see [Tasks](configuration.md#tasks)\)                                      |
| pan-by                | Number  | 0.1     | Multiplier by which to pan                                                                            |
| zoom-by               | Number  | 0.2     | Multiplier by which to zoom                                                                           |
| lang                  | String  | 'en'    | Language for manifest metadata \(where available\)                                                    |
| confirm-before-unload | Boolean | false   | Confirm before leaving the page                                                                       |
| disable-complete      | Boolean | false   | Disable completed tasks to prevent multiple submission                                                |
| show-help             | Boolean | true    | Include the help modal                                                                                |
| show-info             | Boolean | true    | Include the metadata modal                                                                            |
| show-browse           | Boolean | true    | Include the browse tasks modal                                                                        |
| show-note             | Boolean | true    | Include the note input                                                                                |
| show-form-errors      | Boolean | true    | Show form errors on submit                                                                            |
| show-like             | Boolean | false   | Show the like button                                                                                  |
| show-share            | Boolean | true    | Show the share button                                                                                 |
| show-download         | Boolean | true    | Show the download button                                                                              |
| show-related-tasks    | Boolean | false   | Show all tasks related to the same image                                                              |
| discuss-link          | String  | ''      | Show the discuss button using this URL                                                                |
| creator               | Object  | null    | The Annotation creator \(see [Web Annotation Data Model](https://www.w3.org/TR/annotation-model/)\)   |
| generator             | Object  | null    | The Annotation generator \(see [Web Annotation Data Model](https://www.w3.org/TR/annotation-model/)\) |
| next-on-submit        | Object  | true    | Move to the next task on after submission                                                             |
| messageBus            | Object  | null    | Message bus used for notifications \(see [Notifications](notifications.md)\)                          |
| navigation            | Array   | null    | Additional navigation links \(see [Navigation](configuration.md#navigation)\)                         |
| confirm-on-submit     | Boolean | false   | Show a confirmation box on submission                                                                 |


## Tasks

Tasks are created from the `task-opts` passed to the viewer, which each have the following properties.

| Property       | Type              | Attributes | Description                                                                                                    |
|----------------|-------------------|------------|----------------------------------------------------------------------------------------------------------------|
| mode           | String            |            | `'select'` or `'transcribe'`                                                                                   |
| tileSource     | String or Object  |            | The tile source specifier (see [Tile Sources](configuration.md#tile-sources))                                  |
| target         | String            |            | The target of the annotation (e.g. the canvas URI for IIIF annotations)                                        |
| thumbnailUrl   | String            |  optional  | URL for a thumbnail image to use in the browse modal                                                           |
| manifestUri    | String            |  optional  | Manifest URI (see the [IIIF Presentation API](http://iiif.io/api/presentation))                                |
| metadata       | Object            |  optional  | Metadata for the info modal (takes preference over `manifestUri`)                                              |
| id             | String            |  optional  | Task identifier                                                                                                |
| objective      | String            |  optional  | The main objective                                                                                             |
| guidance       | String            |  optional  | Additional guidance                                                                                            |
| form           | Object            |  optional  | Form properties (see [Forms](configuration.md#forms))                                                          |
| highlights     | Array             |  optional  | Coordinates identifying regions of the image to highlight                                                      |
| tag            | String            |  optional  | The tag to add when in `select` mode                                                                           |
| liked          | Boolean           |  optional  | Task liked (see the viewer property `show-like`)                                                               |
| classification | String            |  optional  | A SpecificResource to classify the target as (e.g. [foaf:Person](http://xmlns.com/foaf/spec/#term_Person))     |
| complete       | Boolean           |  optional  | Mark the task as complete                                                                                      |
| shareUrl       | String            |  optional  | URL for the 'share' button (if not given the `tileSource` url will be used)                                    |

## Tile Source

A String implies a URL used to determine the tileSource implementation based on the file extension of the URL. For example, "http://www.example.org/image-service/abcd1234/info.json" would be loaded as a IIIF tile source.

An Object implies an inline configuration which has a single property sufficient for being able to determine tileSource implementation. See the [OpenSeadragon docs](https://openseadragon.github.io/#examples-and-features) for examples of how to implement custom tile sources.

## Forms

In `transcribe` mode the form can be configured via the following properties.

| Property        | Type    | Attributes | Description                                                            |
|-----------------|---------|------------|------------------------------------------------------------------------|
| model           | Object  |            | See [vue-form-generator](https://github.com/icebob/vue-form-generator) |
| schema          | Object  |            | See [vue-form-generator](https://github.com/icebob/vue-form-generator) |
| classifications | Object  |  optional  | A SpecificResource IRI for each model key                              |
| highlights      | Object  |  optional  | A region to highlight for each model key                               |

## Navigation

Additional navigation links (for example, for the rest of your website) can be
passed to the viewer via the `navigation` property. These links will be appended
to a collapsible sidebar toggled via a 'hamburger' button.

| Property | Type   | Description          |
|----------|--------|----------------------|
| label    | String | A label for the link |
| url      | String | The link url         |
