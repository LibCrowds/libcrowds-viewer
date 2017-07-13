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
  return new OpenSeadragon.Rect(regionParts[0], regionParts[1], regionParts[2],
                                regionParts[3])
}
