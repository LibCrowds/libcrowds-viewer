import OpenSeadragon from 'openseadragon'

/**
 * Return a rectangle object from a media fragment.
 * @param {String} fragment
 *   The media fragment selector value (see https://www.w3.org/TR/media-frags/).
 */
export default function (fragment) {
  const regionParts = fragment.split('=')[1].split(',')
  return new OpenSeadragon.Rect(
    Number(regionParts[0]),
    Number(regionParts[1]),
    Number(regionParts[2]),
    Number(regionParts[3])
  )
}
