# Introduction

LibCrowds Viewer is a [Vue.js](https://vuejs.org/v2/guide/) component for crowdsourcing annotations, which are generated according to the [Web Annotations Data Model](https://www.w3.org/TR/annotation-model/).

Tasks are fed into the viewer via properties and the resulting annotations emitted as events. It is up to the client to decide how to store these annotations (probably by sending them to an annotations server).

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
    tileSource: 'http://www.example.org/image-service/abcd1234/info.json',
    info: 'http://example.org/iiif/book1/manifest'
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



