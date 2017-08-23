# Data Modal

The annotations emitted from LibCrowds Viewer are based on the [Web Annotations data model](https://www.w3.org/TR/annotation-model/).

| Property              | Type   | Description                                                                                                                       |
|-----------------------|--------|-----------------------------------------------------------------------------------------------------------------------------------|
| @context              | String | The JSON-LD context (always [http://www.w3.org/ns/anno.jsonld]http://www.w3.org/ns/anno.jsonld(http://www.w3.org/ns/anno.jsonld)) |
| id                    | String | An automatically generated UUID                                                                                                   |
| type                  | String | The class for Web Annotations (always 'Annotation')                                                                               |
| motivation            | String | The relationship between an Annotation and a Motivation                                                                           |
| created               | String | The time at which the resource was created                                                                                        |
| creator               | Object | The agent responsible for creating the resource. This may be either a human, an organization or a software agent                  |


See [Annotation Modes](/modes/README.md) for examples.
