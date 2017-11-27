# Data Model

The annotations emitted from LibCrowds Viewer are based on the
[Web Annotations Data Model](https://www.w3.org/TR/annotation-model/),
see See [Annotations](/annotations/README.md) for specific examples for each
type of task.


| Property       | Type             | Description                                                                                                                       |
|----------------|------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| @context       | String           | The JSON-LD context (always '[http://www.w3.org/ns/anno.jsonld](http://www.w3.org/ns/anno.jsonld)')                                 |
| id             | String           | An automatically generated UUID (to be replaced with an IRI by the client when the Annotation is stored)                          |
| type           | String           | The class for Web Annotations (always 'Annotation')                                                                               |
| motivation     | String           | The relationship between the Annotation and a Motivation                                                                          |
| created        | String           | The time at which the Annotation was created                                                                                      |
| creator        | String or Object | The agent responsible for creating the resource (generally a human)                                                               |
| generated      | String           | The time at which the Annotation serialization was generated                                                                      |
| generator      | String or Object | The agent responsible for generating the serialization of the Annotation (typically software)                                     |
| modified       | String           | The time at which the Annotation was modified, after its creation                                                                 |
| target         | String or Object | The target of the Annotation                                                                                                      |
| body           | Object           | The relationship between the Annotation and its Body                                                                              |

## target

The target is specified via the `target` property of each
[task configuration](configuration.md#tasks).

The String passed as the `target` will be used directly, unless a specific
fragment of the image is selected, in which case the target will be specified
with the following properties.

| Property            | Type             | Description                                                                                                                       |
|---------------------|------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| source              | String           | The initial target                                                                                                                |
| selector            | Object           | The relationship between the resource and a selector                                                                              |
| selector.type       | String           | The class of the selector (always 'FragmentSelector')                                                                             |
| selector.conformsTo | String           | The fragment selector syntax IRI (always '[http://www.w3.org/TR/media-frags/](http://www.w3.org/TR/media-frags/)')                |
| selector.value      | String           | The contents of the fragment component                                                                                            |

#### Example

```json-ld
"target": {
  "source": "http://example.org/iiif/book1/canvas/p1",
  "selector": {
    "type": "FragmentSelector",
    "conformsTo": "http://www.w3.org/TR/media-frags/",
    "value": "xywh=100,100,100,100"
  }
}
```

## body

The Annotation body will differ depending on the
[task configuration](configuration.md#tasks).

### Tags

Tags are used to associate some label, generally as plain text, with the target.

| Property       | Type             | Description                                     |
|----------------|------------------|-------------------------------------------------|
| type           | String           | The type of the resource (always 'TextualBody') |
| purpose        | String           | The reason for the inclusion (always 'tagging') |
| value          | String           | The tag text                                    |

#### Example

```json-ld
{
  "type": "TextualBody",
  "purpose": "tagging",
  "value": "title"
}
```

### Semantic Tags

Semantic Tags are used to link the annotation to a URI that identifies a
specific resource.

| Property       | Type             | Description                                          |
|----------------|------------------|------------------------------------------------------|
| type           | String           | The type of the resource (always 'SpecificResource') |
| purpose        | String           | The reason for the inclusion (always 'classifying')  |
| source         | String           | A URI identifying the specific resource              |

#### Example

```json-ld
{
  "type": "SpecificResource",
  "purpose": "classifying",
  "source": "http://purl.org/dc/terms/title"
}
```

### Descriptions

Descriptions are used to describe the target in plain text.

| Property       | Type             | Description                                         |
|----------------|------------------|-----------------------------------------------------|
| type           | String           | The type of the resource (always 'TextualBody')     |
| purpose        | String           | The reason for the inclusion (always 'describing')  |
| format         | String           | The format of the description (always 'text/plain') |
| value          | String           | The description text                                |

#### Example

```json-ld
{
  "type": "TextualBody",
  "purpose": "describing",
  "format": "text/plain",
  "value": "The Merchant of Venice"
}
```
