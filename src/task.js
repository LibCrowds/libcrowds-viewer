/**
 * Represents a task that can be updated with all associated user input.
 *
 */
class Task {

  constructor ({
    id,
    tileSource,
    manifest = '',
    objective = '',
    guidance = '',
    form = {},
    regions = [],
    note = '',
    annotations: []
  }) {
    this.id = id
    this.tileSource = tileSource
    this.manifest = manifest
    this.objective = objective
    this.guidance = guidance
    this.form = form
    this.regions = regions
    this.note = note
  }
}

export default Task
