# Configuration

The viewer provides a range of flexible configuration options.

## Viewer Properties

All of the following properties, apart from `task-opts` are optional.

| Property              | Type    | Default | Description                                                                                           |
|-----------------------|---------|---------|-------------------------------------------------------------------------------------------------------|
| task-opts             | Array   |         | An array of task options                                                                              |
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
| show-related-tasks    | Boolean | false   | Show all tasks related to the same image                                                              |
| discuss-link          | String  | ''      | Show the discuss button using this URL                                                                |
| creator               | Object  | null    | The Annotation creator \(see [Web Annotation Data Model](https://www.w3.org/TR/annotation-model/)\)   |
| generator             | Object  | null    | The Annotation generator \(see [Web Annotation Data Model](https://www.w3.org/TR/annotation-model/)\) |
| next-on-submit        | Object  | true    | Move to the next task on after submission                                                             |
| messageBus            | Object  | null    | Message bus used for notifications \(see [Notifications](notifcations.md)\)                           |
| navigation            | Array   | null    | Additional navigation links \(see [Navigation Properties](configuration.md#navigation_properties)\)   |
| confirm-on-submit     | Boolean | false   | Show a confirmation box on submission                                                                 |


## Task properties

The core data structure for LibCrowds Viewer is the Task object, an array of which are created from the `task-opts` passed to the viewer, which each have the following properties.

| Property       | Type    | Attributes | Description                                                                                                    |
|----------------|---------|------------|----------------------------------------------------------------------------------------------------------------|
| mode           | String  |            | `'select'` or `'transcribe'`                                                                                   |
| imgInfoUri     | String  |            | Image info URI (see the [IIIF Image API](http://iiif.io/api/image/2.1/#image-information-request-uri-syntax/)) |
| manifestUri    | String  |  optional  | Manifest URI (see the [IIIF Presentation API](http://iiif.io/api/presentation/2.1/#resource-structure))        |
| id             | String  |  optional  | Task identifier                                                                                                |
| objective      | String  |  optional  | The main objective                                                                                             |
| guidance       | String  |  optional  | Additional guidance                                                                                            |
| form           | Object  |  optional  | See form properties below                                                                                      |
| highlights     | Array   |  optional  | Coordinates identifying regions of the image to highlight                                                      |
| tag            | String  |  optional  | The tag to add when in `select` mode                                                                           |
| liked          | Boolean |  optional  | Task liked (see the viewer property `show-like`)                                                               |
| classification | String  |  optional  | A SpecificResource to classify the target as (e.g. [foaf:Person](http://xmlns.com/foaf/spec/#term_Person))     |
| complete       | Boolean |  optional  | Mark the task as complete                                                                                      |

## Form properties

In `transcribe` mode the form can be configured with the following properties.

| Property        | Type    | Attributes | Description                                                            |
|-----------------|---------|------------|------------------------------------------------------------------------|
| model           | Object  |            | See [vue-form-generator](https://github.com/icebob/vue-form-generator) |
| schema          | Object  |            | See [vue-form-generator](https://github.com/icebob/vue-form-generator) |
| classifications | Object  |  optional  | A SpecificResource IRI for each model key                              |
| highlights      | Object  |  optional  | A region to highlight for each model key                               |

## Navigation Properties

Additional navigation links (for example, for the rest of your website) can be
passed to the viewer via the `navigation` property. These links will be appended
to a collapsible sidebar toggled via a 'hamburger' button.

| Property | Type   | Description          |
|----------|--------|----------------------|
| label    | String | A label for the link |
| url      | String | The link url         |
