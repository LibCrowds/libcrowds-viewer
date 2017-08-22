# Select Mode

In select mode users can use their mouse \(or finger\) to tag areas of the image, potentially preparing them for subsequent transcription.

Note that the `tag` property is required when in `select` mode.

### Example task

```json
{
  "mode": "select",
  "imgInfoUri": "https://api.bl.uk/image/iiif/ark:/81055/vdc_100022589157.0x000005/info.json",
  "manifestUri": "https://api.bl.uk/metadata/iiif/ark:/81055/vdc_100022589158.0x000002/manifest.json",
  "tag": "title",
  "objective": "Tag all of the titles",
  "guidance": "Draw a box around each title, including any subtitles"
}
```

### Example annotations

One of the following annotations will be emitted, depending on the `annoType` set in the task options.

#### IIIF Presentation API v3

```jsonld
{
  "@context": [
    "http://www.w3.org/ns/anno.jsonld",
    "http://iiif.io/api/presentation/3/context.json"
  ],
  "id": "d008efa2-42e5-494e-b463-c7b9b6744b67",
  "type": "Annotation",
  "motivation": "painting",
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
  "target": {
    "id": "https://api.bl.uk/image/iiif/ark:/81055/vdc_100022589157.0x000005",
    "width": 2433,
    "height": 3838,
    "type": "Image",
    "format" : "image/jpeg",
    "selector": {
      "type": "FragmentSelector",
      "value": "https://api.bl.uk/image/iiif/ark:/81055/vdc_100022589157.0x000005/291,1498,1737,244/full/0/default.jpg",
      "conformsTo": "http://iiif.io/api/image"
    }
  },
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
  ]
  "modified": "2017-07-16T00:44:28.454Z"
}
```