import Annotation from '@/model/Annotation'
import Task from '@/model/Task'

import imageInfo from './data/imageInfo'
import selectTaskOpts from './data/selectTaskOpts'
import transcribeTaskOpts from './data/transcribeTaskOpts'

export default {

  /**
   * Return a new annotation.
   */
  buildAnnotation() {
    return new Annotation({
      motivation: 'testing',
      imgInfo: imageInfo
    })
  },

  /**
   * Return a new task.
   * @param {String} mode
   *   The task mode.
   */
  buildTask(mode) {
    if (mode === 'select') {
      return new Task(selectTaskOpts)
    } else if (mode === 'transcribe') {
      return new Task(transcribeTaskOpts)
    }
  }
}
