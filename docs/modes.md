# Modes

LibCrowds Viewer currently provides the following modes, each configurable via the task options passed to the viewer.

## Select Mode

In select mode users can use their mouse (or finger) to tag areas of the image, potentially preparing them for subsequent transcription.

Note that the `tag` property is required when in `select` mode.

#### Example task

```json
{
  "mode": "select",
  "imgInfoUri": "https://api.bl.uk/image/iiif/ark:/81055/vdc_100022589157.0x000005/info.json",
  "manifestUri": "https://api.bl.uk/metadata/iiif/ark:/81055/vdc_100022589158.0x000002/manifest.json",
  "id": 123,
  "tag": "title",
  "classification": "http://purl.org/dc/terms/title",
  "objective": "Tag all of the titles",
  "guidance": "Draw a box around each title, including any subtitles"
}
```

#### Example annotation

```jsonld
{
  "@context": [
    "http://www.w3.org/ns/anno.jsonld",
    "http://iiif.io/api/image/2/context.json"
  ],
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

## Transcribe Mode

In transcribe mode a form schema is passed to the viewer along with optional
coordinates to highlight regions of the image (such as those returned from a
previous selection task) allowing for transcription of specific details found
in the image.

Note that the `form` task property is required when in `transcribe` mode. The
`tag` and `classification` task properties are ignored and are instead
taken from `form.model` and `form.classification`, respectively.

#### Example task

```json
{
  "mode": "transcribe",
  "imgInfoUri": "https://api.bl.uk/image/iiif/ark:/81055/vdc_100022589157.0x000005/info.json",
  "manifestUri": "https://api.bl.uk/metadata/iiif/ark:/81055/vdc_100022589158.0x000002/manifest.json",
  "id": 123,
  "objective": "Transcribe the required info",
  "guidance": "Write everything exactly as you see on the page.",
  "classify": "http://purl.org/dc/terms/title",
  "form": {
    "model": {
      "title": "",
      "date": "",
      "genre": []
    },
    "classification": {
      "title": "http://purl.org/dc/terms/title",
      "date": "http://purl.org/dc/terms/date"
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
        },
        {
          "type": "input",
          "inputType": "date",
          "label": "Date",
          "model": "date"
        },
        {
          "type": "select",
          "label": "Genre",
          "model": "genre",
          "values": ["Comedy", "Tragedy", "Drama"]
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

#### Example annotation

```jsonld
{
  "@context": [
    "http://www.w3.org/ns/anno.jsonld",
    "http://iiif.io/api/image/2/context.json"
  ],
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
    "id": "https://api.bl.uk/image/iiif/ark:/81055/vdc_100022589157.0x000005",
    "width": 2433,
    "height": 3838,
    "type": "Image",
    "format": "image/jpeg"
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
      "value": "http://purl.org/dc/terms/title"
    }
  ],
  "modified": "2017-07-16T13:53:18.795Z"
}
```
