export default {
  /**
   * Error used to identify missing required parameters.
   * @param {String} param
   *   The missing parameter.
   */
  throwIfMissing (param) {
    throw new Error(`Missing parameter: ${param}`)
  }
}
