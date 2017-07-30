import errors from '@/utils/errors'

/**
 * Build an IIIF image URI.
 * @param {Object} opts
 */
export default function ({
  imgInfo = errors.throwIfMissing(),
  region = 'full',
  size = 'full',
  rotation = 0,
  quality = null,
  format = 'jpg'
}) {
  const source = imgInfo['@id']
  const regStr = typeof region === 'object'
    ? `${region.x},${region.y},${region.width},${region.height}`
    : region

  console.log(imgInfo)

  // We can't always assume that default will exist
  let qualities = imgInfo.profile[1].qualities
  let imgQuality = 'default'
  if (!quality && 'color' in qualities) {
    imgQuality = 'color'
  } else if (!quality && 'gray' in qualities) {
    imgQuality = 'gray'
  } else if (!quality && 'bitonal' in qualities) {
    imgQuality = 'bitonal'
  }

  return `${source}/${regStr}/${size}/${rotation}/${imgQuality}.${format}`
}
