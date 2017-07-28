/**
 * Error used to identify missing required parameters.
 */
export function throwIfMissing () {
  throw new Error('Missing parameter')
}
