# Tile Sources

Tile sources are specified via the `tileSource` option requried in each [task configuration](configuration.md#tasks).

A String implies a URL used to determine the `tileSource` implementation based on the file extension of the URL, whereas an Object implies an inline configuration which has a single property sufficient for being able to determine the `tileSource` implementation.

## Examples

Following are some examples of how to configure different types of `tileSource`.

### IIIF

```js
'http://www.example.org/image-service/abcd1234/info.json'
```

### Simple Image

```js
{
  type: 'image',
  url:  '/example.org/my-image.jpg'
}
```

### DZI

```js
'/example-images/highsmith/highsmith.dzi'
```

### Zoomify

```js
{
  type: 'zoomifytileservice',
  width: 7026,
  height: 9221,
  tilesUrl: '/test/data/zoomify/'
}
```

## OpenStreetMap

```js
{
  type: 'openstreetmaps'
}
```
