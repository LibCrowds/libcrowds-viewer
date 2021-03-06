# Configuration

LibCrowds Viewer provides a range of configuration options that are passed as
properties. Most of these are optional but allow for more flexible
implementations where required.


## Viewer

All of the following properties, apart from `task-opts`, are optional.

| Property              | Type     | Default       | Description                                                                                           |
|-----------------------|----------|---------------|-------------------------------------------------------------------------------------------------------|
| task-opts             | Array    |               | An array of task options \(see [Tasks](configuration.md#tasks)\)                                      |
| pan-by                | Number   | 0.1           | Multiplier by which to pan                                                                            |
| zoom-by               | Number   | 0.2           | Multiplier by which to zoom                                                                           |
| confirm-before-unload | Boolean  | true          | Confirm before leaving the page                                                                       |
| disable-complete      | Boolean  | true          | Disable completed tasks to prevent multiple submission                                                |
| show-note             | Boolean  | true          | Include the note input                                                                                |
| show-form-errors      | Boolean  | true          | Show form errors on submit                                                                            |
| show-related-tasks    | Boolean  | false         | Show all tasks related to the same image                                                              |
| next-on-submit        | Object   | true          | Move to the next task on after submission                                                             |
| confirm-on-submit     | Boolean  | false         | Show a confirmation box on submission                                                                 |
| toolbar-buttons       | Object   | See below     | Toolbar button configuration details (see [Toolbar Buttons](configuration.md#toolbar-buttons)\)       |
| sidebar-buttons       | Object   | See below     | Sidebar button configuration details (see [Sidebar Buttons](configuration.md#sidebar-buttons)\)       |
| selections-editable   | Boolean  | true          | Allow the editing of selections from the sidebar                                                      |
| browsable             | Boolean  | true          | Allow browsing back and forth between tasks                                                           |
| show-help-on-mount    | Boolean  | false         | Show the help modal when the component is mounted                                                     |
| before-submit         | Promise  | Empty promise | A function that recieves the task data as an argument and should return a promise that resolves if the submission should go ahead and rejects otherwise |
| disable-modals        | Boolean  | false         | Disable display of the default modals                                                                 |


## Toolbar Buttons

The buttons object contains the following default options. To hide a particular
button set its property to `false`. To change a button's tooltip enter a
String.

| Property              | Type              | Default            | Description                     |
|-----------------------|-------------------|--------------------|---------------------------------|
| fullscreen            | Boolean or String | 'Fullscreen'       | The fullscreen button           |
| help                  | Boolean or String | 'Help'             | The help button                 |
| info                  | Boolean or String | 'Details'          | The info button                 |
| browse                | Boolean or String | 'Browse Tasks'     | The browse tasks button         |
| download              | Boolean or String | 'Download'         | The download button             |

Any key-value pairs added to the `buttons` object that are not listed above
will be rendered as additional buttons. The key should be the name of a
[Font Awesome](https://fontawesome.com/v4.7.0/cheatsheet/) icon, whereas the
value will be used as the tooltip text. When the button is clicked
the **toolbarbtnclick** event will be emited with the key as the only argument.


## Sidebar Buttons

The buttons object contains the following default options. To hide a particular
button set its property to `false`. To change a button's text enter a
String.

| Property              | Type              | Default            | Description                     |
|-----------------------|-------------------|--------------------|---------------------------------|
| note                  | Boolean or String | 'Add a note'       | The note button                 |
| submit                | Boolean or String | 'Submit'           | The submit button               |


## Tasks

Tasks are created from an array of objects with the following properties. These
objects are passed to the viewer via `task-opts`.

| Property       | Type              | Attributes | Description                                                                            |
|----------------|-------------------|------------|----------------------------------------------------------------------------------------|
| mode           | String            |            | The task more (see [Annotation Modes](annotations/README.md))                          |
| tileSource     | String or Object  |            | The tile source specifier (see [Tile Sources](tile_sources.md))                        |
| target         | String or Object  |            | The target of the annotation (see [Data Model](data_model.md))                         |
| manifest       | String            |  optional  | A IIIF manifest URI used to fill the info modal                                        |
| objective      | String            |  optional  | The main objective                                                                     |
| guidance       | String            |  optional  | Additional guidance                                                                    |
| thumbnailUrl   | String            |  optional  | URL for a thumbnail image to use in the browse modal                                   |
| id             | String            |  optional  | Task identifier                                                                        |
| form           | Object            |  optional  | Form properties (see [Forms](configuration.md#forms))                                  |
| highlights     | Array             |  optional  | Coordinates identifying regions of the image to highlight. This can also be achived by passing a `FragmentSelector` as part of the `target` object, see the [Data Model](data_model.md) |
| tag            | String            |  optional  | A tag                                                                                  |
| classification | String            |  optional  | A Semantic Tag (e.g. [http://purl.org/dc/terms/title](http://purl.org/dc/terms/title)) |
| complete       | Boolean           |  optional  | Mark the task as complete                                                              |
| bounds         | Object            |  optional  | Parameters to fit screen to when task loaded (`x`, `y`, `width` and `height`)          |

See the [Annotations](annotations/README.md) section for some examples of using the above options to configure tasks.


## Forms

In `transcribe` mode, the form can be configured with the following properties.

| Property        | Type    | Attributes | Description                                                            |
|-----------------|---------|------------|------------------------------------------------------------------------|
| model           | Object  |            | See [vue-form-generator](https://github.com/icebob/vue-form-generator) |
| schema          | Object  |            | See [vue-form-generator](https://github.com/icebob/vue-form-generator) |
| classifications | Object  |  optional  | A SpecificResource IRI for each model key                              |
| fragments       | Object  |  optional  | A fragment to highlight for each model key                             |


## Slots

The following slots are available.

| Name   | Description                                                          |
|--------|----------------------------------------------------------------------|
| help   | Slots in above the viewer controls section in the help model         |
| info   | Content for the info modal (overwrites `task.manifest`)              |
| footer | Add items into the sidebar footer, above the submit and note buttons |


## Styles

To customise the appearance of the viewer, the following Sass variables can be
overridden, before importing the *libcrowds-viewer.scss* file.

The defaults are shown below.

{% codesnippet "../src/scss/settings.scss", language="scss" %}{% endcodesnippet %}
