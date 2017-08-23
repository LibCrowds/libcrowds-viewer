
# Transcribe Mode

In transcribe mode a form schema is passed to the viewer along with optional coordinates to highlight regions of the image, such as those returned from a previous selection task, allowing for transcription of specific details found in the image.

Note that the `form` task property is required when in `transcribe` mode. The `tag` and `classification` task properties are ignored and are instead taken from `form.model` and `form.classification`, respectively.

### Example task

```json
{
  "mode": "transcribe",
  "tileSource": "https://api.bl.uk/image/iiif/ark:/81055/vdc_100022589157.0x000005/info.json",
  "objective": "Transcribe the title",
  "guidance": "Transcribe the title exactly as shown on the page.",
  "form": {
    "model": {
      "title": ""
    },
    "schema": {
      "fields": [
        {
          "type": "input",
          "inputType": "text",
          "label": "Title",
          "model": "title",
          "placeholder": "Enter the title",
          "required": true
        }
      ]
    }
  },
  "highlights": [
    {
      "x": 100,
      "y": 100,
      "width": 100,
      "height": 100
    }
  ]
}
```

### Example annotation

```jsonld
{
  "@context": "http://www.w3.org/ns/anno.jsonld",
  "id": "45e07a8b-82c2-4fb3-a746-068aad1fab11",
  "type": "Annotation",
  "motivation": "tagging",
  "created": "2017-07-16T13:53:18.795Z",
  "generated": "2017-07-16T13:53:18.795Z",
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
  "target": "http://api.bl.uk/metadata/iiif/ark:/81055/vdc_100022589092.0x000163?xywh=100,100,100,100",
  "body": [
    {
      "type": "TextualBody",
      "purpose": "describing",
      "value": "The Devil to Pay",
      "format": "text/plain"
    },
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
  "modified": "2017-07-16T14:25:18.795Z"
}
```
