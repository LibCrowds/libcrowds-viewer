import uuid from 'uuid/v4'

import Annotator from '@/model/Annotator'
import Annotation from '@/model/Annotation'
import Task from '@/model/Task'

import imageInfo from './data/imageInfo'
import selectTaskOpts from './data/selectTaskOpts'
import transcribeTaskOpts from './data/transcribeTaskOpts'

export default {

  /**
   * Return a new Annotator.
   */
  buildAnnotator() {
    return new Annotator()
  },

  /**
   * Return a new Annotation.
   */
  buildAnnotation() {
    return new Annotation({
      motivation: 'testing',
      imgInfo: imageInfo
    })
  },

  /**
   * Return a new Task.
   * @param {String} mode
   *   The task mode.
   */
  buildTask(mode) {
    if (mode === 'select') {
      selectTaskOpts.imgInfo = imageInfo
      return new Task(selectTaskOpts)
    } else if (mode === 'transcribe') {
      transcribeTaskOpts.imgInfo = imageInfo
      return new Task(transcribeTaskOpts)
    }
  },

  /**
   * Returns a UUID.
   */
  uuid () {
    return uuid()
  }
}
