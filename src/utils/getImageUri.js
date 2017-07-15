/**
 * Build an IIIF image URI.
 * @param {Object} opts
 */
export default function ({
  imgSource,
  region = 'full',
  size = 'full',
  rotation = 0,
  quality = 'default',
  format = 'jpg'
}) {
  if (typeof imgSource === 'undefined') {
    throw new Error('imgSource is required')
  }

  const source = imgSource.replace('/info.json', '')
  const regStr = typeof region === 'object'
                   ? `${region.x},${region.y},${region.width},${region.height}`
                   : region

  return `${source}/${regStr}/${size}/${rotation}/${quality}.${format}`
}
