# Comment Annotations

Generate Select Annotations by setting the viewer property `show-note` to  `true`, see [Configuration](../configuration.md) for details.

Comment Annotations are intended for comments about the image, as opposed to specific content on the image.

### Example annotation

```jsonld
{
  "@context": "http://www.w3.org/ns/anno.jsonld",
  "id": "d008efa2-42e5-494e-b463-c7b9b6744b67",
  "type": "Annotation",
  "motivation": "commenting",
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
  "target": "http://example.org/iiif/book1/canvas/p1"
  "body": {
    "type": "TextualBody",
    "value": "My fascinating comment",
    "purpose": "commenting",
    "format": "text/plain"
  },
  "modified": "2017-07-16T13:53:18.795Z"
}
```
