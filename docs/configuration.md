# Configuration

LibCrowds Viewer provides a range of configuration options that are passed as properties. Most of these are optional but allow for more flexible implementations where required.

## Viewer

All of the following properties, apart from `task-opts`, are optional.

| Property              | Type    | Default   | Description                                                                                           |
|-----------------------|---------|-----------|-------------------------------------------------------------------------------------------------------|
| task-opts             | Array   |           | An array of task options \(see [Tasks](configuration.md#tasks)\)                                      |
| pan-by                | Number  | 0.1       | Multiplier by which to pan                                                                            |
| zoom-by               | Number  | 0.2       | Multiplier by which to zoom                                                                           |
| confirm-before-unload | Boolean | true      | Confirm before leaving the page                                                                       |
| disable-complete      | Boolean | true      | Disable completed tasks to prevent multiple submission                                                |
| show-note             | Boolean | true      | Include the note input                                                                                |
| show-form-errors      | Boolean | true      | Show form errors on submit                                                                            |
| show-related-tasks    | Boolean | false     | Show all tasks related to the same image                                                              |
| creator               | Object  | null      | The Annotation creator \(see [Web Annotation Data Model](https://www.w3.org/TR/annotation-model/)\)   |
| generator             | Object  | null      | The Annotation generator \(see [Web Annotation Data Model](https://www.w3.org/TR/annotation-model/)\) |
| next-on-submit        | Object  | true      | Move to the next task on after submission                                                             |
| navigation            | Array   | [ ]       | Additional navigation links \(see [Navigation](configuration.md#navigation)\)                         |
| confirm-on-submit     | Boolean | true      | Show a confirmation box on submission                                                                 |
| buttons               | Object  | See below | Button configuration details (see [Buttons](configuration.md#buttons)\)                               |
| selections-editable   | Boolean | true      | Allow the editing of selections                                                                       |
| browsable             | Boolean | true      | Allow browsing back and forth between tasks                                                           |
| show-help-on-mount    | Boolean | false     | Show the help modal when the component is mounted                                                     |

## Buttons

To hide a particular button set its property to `false`, or to change its tooltip enter a String (or an Array in the case of the `like` button).

| Property              | Type              | Default            | Description                     |
|-----------------------|-------------------|--------------------|---------------------------------|
| fullscreen            | Boolean or String | 'Fullscreen'       | The fullscreen button           |
| help                  | Boolean or String | 'Help'             | The help button                 |
| info                  | Boolean or String | 'Details'          | The info button                 |
| browse                | Boolean or String | 'Browse Tasks'     | The browse tasks button         |
| like                  | Boolean or Array  | ['Like', 'Unlike'] | The like button                 |
| share                 | Boolean or String | 'Share'            | The share button                |
| download              | Boolean or String | 'Download'         | The download button             |
| note                  | Boolean or String | 'Add a note'       | The note button                 |
| submit                | Boolean or String | 'Submit'           | The note button                 |

## Tasks

Tasks are created from an array of objects with the following properties. These objects are passed to the viewer via `task-opts`.

| Property       | Type              | Attributes | Description                                                                                                    |
|----------------|-------------------|------------|----------------------------------------------------------------------------------------------------------------|
| mode           | String            |            | The task more (see [Annotation Modes](annotations/README.md))                                                  |
| tileSource     | String or Object  |            | The tile source specifier (see [Tile Sources](tile_sources.md))                                                |
| target         | String            |            | The target of the annotation (see [Data Model](data_model.md))                                                 |
| objective      | String            |  optional  | The main objective                                                                                             |
| guidance       | String            |  optional  | Additional guidance                                                                                            |
| thumbnailUrl   | String            |  optional  | URL for a thumbnail image to use in the browse modal                                                           |
| info           | String or Object  |  optional  | Content for the info modal (see [Info](configuration.md#info))                                                 |
| id             | String            |  optional  | Task identifier                                                                                                |
| form           | Object            |  optional  | Form properties (see [Forms](configuration.md#forms))                                                          |
| highlights     | Array             |  optional  | Coordinates identifying regions of the image to highlight                                                      |
| tag            | String            |  optional  | A tag                                                                                                          |
| liked          | Boolean           |  optional  | Highlight the task liked button                                                                                |
| classification | String            |  optional  | A Semantic Tag (e.g. [http://purl.org/dc/terms/title](http://purl.org/dc/terms/title))                         |
| complete       | Boolean           |  optional  | Mark the task as complete                                                                                      |
| shareUrl       | String            |  optional  | URL for the 'share' modal input                                                                                |
| shareText      | String            |  optional  | Text for the share modal                                                                                       |
| help           | String            |  optional  | Additional help loaded as Markdown into the top of the help modal                                              |
| bounds         | Object            |  optional  | Parameters to fit screen to when task loaded (`x`, `y`, `width` and `height`)                                  |

See the [Annotations](annotations/README.md) section for some examples.

## Forms

In `transcribe` mode the form can be configured with the following properties.

| Property        | Type    | Attributes | Description                                                            |
|-----------------|---------|------------|------------------------------------------------------------------------|
| model           | Object  |            | See [vue-form-generator](https://github.com/icebob/vue-form-generator) |
| schema          | Object  |            | See [vue-form-generator](https://github.com/icebob/vue-form-generator) |
| classifications | Object  |  optional  | A SpecificResource IRI for each model key                              |
| fragments       | Object  |  optional  | A fragment to highlight for each model key                             |

## Info

The content of the info modal is taken from the `info` task property. An Object can be passed with the following properties and a String implies a URL that will return a JSON Object with the same properties (e.g. an IIIF manifest URI).

| Property    | Type    | Description                                                    |
|-------------|---------|----------------------------------------------------------------|
| metadata    | Array   | List of objects containings the properties `label` and `value` |
| logo        | String  | The source for a logo image                                    |
| attribution | String  | Attribution for the resource                                   |
| license     | String  | URL to an external resource containing rights information      |

## Navigation

Additional navigation links (for example, for the rest of your website) can be passed to the viewer via the `navigation` property. These links will be appended to a responsive navbar that will still visible in full screen mode.

| Property | Type    | Description          |
|----------|---------|----------------------|
| label    | String  | A label for the link |
| url      | String  | The link url         |
| brand    | Boolean | Add brand styling    |

## Styles

To customise the appearance of the viewer, the following Sass variables can be overridden before importing the libcrowds-viewer.scss file.

{% codesnippet "./src/scss/settings.scss language="scss" %}{% endcodesnippet %}