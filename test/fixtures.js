import uuid from 'uuid/v4'

import Annotator from '@/model/Annotator.js'
import Annotation from '@/model/Annotation.js'
import TranscribeAnnotation from '@/model/TranscribeAnnotation.js'
import SelectAnnotation from '@/model/SelectAnnotation.js'
import CommentAnnotation from '@/model/CommentAnnotation.js'
import Task from '@/model/Task.js'

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
      target: 'http://www.example.org/image-service/abcd1234'
    })
  },

  /**
   * Return a new TranscribeAnnotation.
   */
  buildTranscribeAnnotation (tag = 'test') {
    return new TranscribeAnnotation({
      transcription: 'testing',
      target: 'http://www.example.org/image-service/abcd1234',
      tag: tag
    })
  },

  /**
   * Return a new TranscribeAnnotation.
   */
  buildSelectAnnotation () {
    return new SelectAnnotation({
      tag: 'test',
      target: 'http://www.example.org/image-service/abcd1234',
      fragment: 'xywh=100,100,100,100'
    })
  },

  /**
   * Return a new CommentAnnotation.
   */
  buildCommentAnnotation () {
    return new CommentAnnotation({
      comment: 'test',
      target: 'http://www.example.org/image-service/abcd1234'
    })
  },

  /**
   * Return a new Task.
   * @param {String} mode
   *   The task mode.
   */
  buildTask (mode) {
    if (mode === 'select') {
      return new Task(selectTaskOpts)
    } else if (mode === 'transcribe') {
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
  },

  /**
   * Return an ISO string for yesterday's date.
   */
  getISOYesterday () {
    const date = new Date()
    date.setDate(date.getDate() - 1)
    return date.toISOString()
  }
}
