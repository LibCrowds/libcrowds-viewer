# Select Mode

In select mode users can use their mouse \(or finger\) to tag areas of the image, potentially preparing them for subsequent transcription.

Note that the `tag` property is required when in `select` mode.

### Example task

```json
{
  "mode": "select",
  "tileSource": "http://www.example.org/image-service/abcd1234/info.json",
  "target": "http://example.org/iiif/book1/canvas/p1",
  "tag": "title",
  "objective": "Tag all of the titles",
  "guidance": "Draw a box around each title, including any subtitles"
}
```

### Example annotation

```jsonld
{
  "@context": "http://www.w3.org/ns/anno.jsonld",
  "id": "d008efa2-42e5-494e-b463-c7b9b6744b67",
  "type": "Annotation",
  "motivation": "tagging",
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
  "target": "http://api.bl.uk/metadata/iiif/ark:/81055/vdc_100022589092.0x000163?xywh=291,1498,1737,244",
  "body": [
    {
      "type": "TextualBody",
      "purpose": "tagging",
      "value": "title"
    },
    {
      "type": "SpecificResource",
      "purpose": "classifying",
      "value": "http://purl.org/dc/terms/title"
    }
  ],
  "modified": "2017-07-16T13:53:18.795Z"
}
```