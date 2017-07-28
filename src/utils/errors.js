export default {
  /**
   * Error used to identify missing required parameters.
   */
  throwIfMissing () {
    throw new Error('Missing parameter')
  }
}
