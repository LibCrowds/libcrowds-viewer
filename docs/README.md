# Introduction

LibCrowds Viewer is a [Vue.js](https://vuejs.org/v2/guide/) component for crowdsourcing [Web Annotations](https://www.w3.org/TR/annotation-model/) for images. Tasks are fed into the viewer via properties and the resulting annotations emitted as events.

Annotations can be emitted in various formats, including those that comply with version 2 or version 3 of the IIIF Presentation API. It is up to the client to decide how to store these annotations (probably by sending them to an annotations server).

## Installation

The component can by installed via npm.

```bash
npm install libcrowds-viewer --save
```

## Usage

Install the component.

```js
import Vue from 'vue';
import LibcrowdsViewer from 'libcrowds-viewer';

Vue.use(LibcrowdsViewer);
```

Use it in your templates \(minimum configuration options shown\).

```vue
<libcrowds-viewer
  :task-opts="[{
    mode: 'select',
    imgInfoUri: 'http://www.example.org/image-service/abcd1234/info.json',
    manifestUri: 'http://example.org/iiif/book1/manifest'
  }]">
</libcrowds-viewer>
```

## Development

```bash
# install dependencies
npm install

# serve demo at localhost:8080
npm run demo:dev

# deploy to gh-pages (rights permitting)
npm run demo:deploy
```

## Testing

```bash
# test
npm run test
```



