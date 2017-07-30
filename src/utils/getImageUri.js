import errors from '@/utils/errors'

/**
 * Build an IIIF image URI.
 * Default parameters should be available at all compliance levels
 * (see http://iiif.io/api/image/2.1/compliance)
 * @param {Object} opts
 */
export default function ({
  imgInfo = errors.throwIfMissing(),
  region = 'full',
  size = 'full',
  rotation = 0,
  quality = 'default',
  format = 'jpg'
}) {
  const source = imgInfo['@id']
  const regStr = typeof region === 'object'
    ? `${region.x},${region.y},${region.width},${region.height}`
    : region

  return `${source}/${regStr}/${size}/${rotation}/${imgQuality}.${format}`
}
