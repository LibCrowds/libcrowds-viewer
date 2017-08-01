import uuid from 'uuid/v4'

import Annotator from '@/model/Annotator.js'
import Annotation from '@/model/Annotation.js'
import TranscribeAnnotation from '@/model/TranscribeAnnotation.js'
import SelectAnnotation from '@/model/SelectAnnotation.js'
import CommentAnnotation from '@/model/CommentAnnotation.js'
import Task from '@/model/Task.js'

import imageInfo from './data/imageInfo.json'
import selectTaskOpts from './data/selectTaskOpts.json'
import transcribeTaskOpts from './data/transcribeTaskOpts.json'

export default {

  /**
   * Return a new Annotator.
   */
  buildAnnotator () {
    return new Annotator()
  },

  /**
   * Return a new Annotation.
   */
  buildAnnotation () {
    return new Annotation({
      motivation: 'testing',
      imgInfo: imageInfo
    })
  },

  /**
   * Return a new TranscribeAnnotation.
   */
  buildTranscribeAnnotation (tag = 'test') {
    return new TranscribeAnnotation({
      transcription: 'testing',
      imgInfo: imageInfo,
      tag: tag
    })
  },

  /**
   * Return a new TranscribeAnnotation.
   */
  buildSelectAnnotation () {
    return new SelectAnnotation({
      tag: 'test',
      imgInfo: imageInfo,
      fragmentUri: 'http://example.com/image'
    })
  },

  /**
   * Return a new CommentAnnotation.
   */
  buildCommentAnnotation () {
    return new CommentAnnotation({
      comment: 'test',
      imgInfo: imageInfo
    })
  },

  /**
   * Return a new Task.
   * @param {String} mode
   *   The task mode.
   */
  buildTask (mode) {
    if (mode === 'select') {
      selectTaskOpts.imgInfo = imageInfo
      return new Task(selectTaskOpts)
    } else if (mode === 'transcribe') {
      transcribeTaskOpts.imgInfo = imageInfo
      return new Task(transcribeTaskOpts)
    }
  },

  /**
   * Return a generic test item.
   * @param {Number} id
   *   An ID.
   */
  buildItem (id) {
    return {
      id: `http://example.com/item${id}`,
      name: uuid()
    }
  },

  /**
   * Returns a UUID.
   */
  uuid () {
    return uuid()
  }
}
