/**
 * Return annotations where a key matches a value.
 * @param {Array} annotations
 *   The annotations.
 * @param {String} key
 *   The key to match on.
 * @param {String} value
 *   The value to match.
 */
function filterBy (annotations, key, value) {
  const filtered = annotations.filter(function(anno) {
    return anno[key] === value
  })

  const annoList = []
  for (let anno of filtered) {
    const idx = annotations.indexOf(anno)
    const originalAnno = annotations[idx]
    annoList.push(originalAnno)
  }
  return annoList
}

/**
 * Filter annotations.
 * @param {Object} opts
 *   The properties to filter by.
 */
export default function ({
  annotations,
  motivation = null
}) {
  let filtered = annotations
  if (motivation) {
    filtered = filterBy(annotations, 'motivation', motivation)
  }
  return filtered
}
