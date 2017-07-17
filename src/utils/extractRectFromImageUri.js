import OpenSeadragon from 'openseadragon'

/**
 * Return a rectangle object from an IIIF image URI.
 * @param {String} imageUri
 *   The image URI.
 */
export default function (imageUri) {
  const uriParts = imageUri.split('/')
  const regionStr = uriParts[uriParts.length - 4]
  const regionParts = regionStr.split(',')
  return new OpenSeadragon.Rect(
    Number(regionParts[0]),
    Number(regionParts[1]),
    Number(regionParts[2]),
    Number(regionParts[3])
  )
}
