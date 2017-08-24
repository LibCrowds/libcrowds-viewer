# Data Modal

The annotations emitted from LibCrowds Viewer are based on the [Web Annotations data model](https://www.w3.org/TR/annotation-model/).

See [Annotation Modes](/modes/README.md) for examples.


| Property       | Type             | Description                                                                                                                       |
|----------------|------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| @context       | String           | The JSON-LD context (always [http://www.w3.org/ns/anno.jsonld]http://www.w3.org/ns/anno.jsonld(http://www.w3.org/ns/anno.jsonld)) |
| id             | String           | An automatically generated UUID                                                                                                   |
| type           | String           | The class for Web Annotations (always 'Annotation')                                                                               |
| motivation     | String           | The relationship between an Annotation and a Motivation                                                                           |
| created        | String           | The time at which the resource was created                                                                                        |
| creator        | String or Object | The agent responsible for creating the resource (human or software)                                                               |
| generated      | String           | The time at which the Annotation serialization was generated                                                                      |
| generator      | String or Object | The agent responsible for generating the serialization of the Annotation (typically software)                                     |
| modified       | String           | The time at which the resource was modified, after creation                                                                       |
| target         | String           | The URL of the resource being annotated                                                                                           |
| body           | Object           | The relationship between an Annotation and its Body                                                                               |
