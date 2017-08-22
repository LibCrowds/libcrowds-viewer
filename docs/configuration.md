# Configuration

The viewer provides a range of flexible configuration options.

## Viewer Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| task-opts | Array |  | An array of task options |
| pan-by | Number | 0.1 | Multiplier by which to pan |
| zoom-by | Number | 0.2 | Multiplier by which to zoom |
| lang | String | 'en' | Language for manifest metadata \(where available\) |
| confirm-before-unload | Boolean | false | Confirm before leaving the page |
| disable-complete | Boolean | false | Disable completed tasks to prevent multiple submission |
| show-help | Boolean | true | Include the help modal |
| show-info | Boolean | true | Include the metadata modal |
| show-browse | Boolean | true | Include the browse tasks modal |
| show-note | Boolean | true | Include the note input |
| show-form-errors | Boolean | true | Show form errors on submit |
| show-like | Boolean | false | Show the like button |
| show-share | Boolean | true | Show the share button |
| show-related-tasks | Boolean | false | Show all tasks related to the same image |
| discuss-link | String | '' | Show the discuss button using this URL |
| creator | Object | null | The Annotation creator \(see [Web Annotation Data Model](https://www.w3.org/TR/annotation-model/)\) |
| generator | Object | null | The Annotation generator \(see [Web Annotation Data Model](https://www.w3.org/TR/annotation-model/)\) |
| next-on-submit | Object | true | Move to the next task on after submission |
| messageBus | Object | null | Message bus used for notifications \(see below\) |
| navigation | Array | null | Additional navigation links \(see below\) |



