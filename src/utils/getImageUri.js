export default function (region = 'full', size = 'full', rotation = 0,
                         quality = 'default', format = 'jpg') {
  const regStr = typeof region === 'object'
                   ? `${region.x},${region.y},${region.width},${region.height}`
                   : region
  return `${store.state.imgSource}/` +
         `${regStr}/` +
         `${size}/` +
         `${rotation}/` +
         `${quality}.` +
         `${format}`
}
