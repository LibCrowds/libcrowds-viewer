
# Transcribe Annotations

In transcribe mode a form schema is passed to the viewer along with optional coordinates to highlight regions of the image, such as those returned from a previous selection task, allowing for transcription of specific details found in the image.

Generate Transcribe Annotations by setting the task options `type` to `transcribe`, see [Configuration](../configuration.md) for details.

Note that the `form` task property is required when in `transcribe` mode. The `tag` and `classification` task properties are ignored and are instead taken from `form.model` and `form.classification`, respectively.

### Example task

```json
{
  "mode": "transcribe",
  "tileSource": "http://www.example.org/image-service/abcd1234/info.json",
  "target": "http://example.org/iiif/book1/canvas/p1",
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
  "motivation": "describing",
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
  "target": {
    "source": "http://example.org/iiif/book1/canvas/p1"
    "selector": {
      "conformsTo": "http://www.w3.org/TR/media-frags/",
      "type": "FragmentSelector",
      "value": "?xywh=100,100,100,100"
    }
  },
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
      "source": "http://purl.org/dc/terms/title"
    }
  ],
  "modified": "2017-07-16T14:25:18.795Z"
}
```
