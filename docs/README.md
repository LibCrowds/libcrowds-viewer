# Introduction

LibCrowds Viewer is a [Vue.js](https://vuejs.org/v2/guide/) component for crowdsourcing IIIF image annotations, which follow the [W3C Web Annotations](https://www.w3.org/TR/annotation-model/) data model. Tasks are fed into the viewer via properties and the resulting annotations emitted as events.

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

```js
<libcrowds-viewer
  :task-opts="[{
    mode: 'select',
    imgInfoUri: 'http://www.example.org/image-service/abcd1234/info.json'
  }]">
</libcrowds-viewer>
```

## Development

``` bash
# install dependencies
npm install

# serve demo at localhost:8080
npm run demo:dev

# deploy to gh-pages (rights permitting)
npm run demo:deploy
```

## Testing

```
# test
npm run test
```



