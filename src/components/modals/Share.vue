<template>
  <div id="lv-share-modal">
    <modal-base :show="show" title="Share" @hide="$emit('hide')">
      <div class="flex-row">
        <input id="share-url" :value="task.shareUrl" readonly>
        <button
          class="btn hint--left hint--no-animate"
          data-clipboard-target="#share-url"
          @click="onCopyClick">
          Copy to clipboard
        </button>
      </div>
    </modal-base>
  </div>
</template>

<script>
import Clipboard from 'clipboard'
import marked from 'marked'
import Icon from 'vue-awesome/components/Icon'
import ModalBase from '@/components/modals/Base'
import Task from '@/model/Task'

export default {
  data: function () {
    return {
      manifestData: {}
    }
  },

  props: {
    show: {
      type: Boolean,
      requried: true
    },
    task: {
      type: Task,
      requried: true
    }
  },

  methods: {
    /**
     * Show a tooltip when the copy button is clicked.
     */
    onCopyClick (evt) {
      evt.target.setAttribute('aria-label', 'URL Copied!')
      evt.target.addEventListener('mouseleave', () => {
        evt.target.setAttribute('aria-label', '')
      })
    },

    /**
     * Markdown processor.
     */
    marked
  },

  components: {
    Icon,
    ModalBase
  }
}
</script>

<style lang="scss" scoped>
@import '~hint.css';
@import '~style/partials/forms';
@import '~style/partials/buttons';

#lv-share-modal {
  .flex-row {
    margin: 10px 0;
    display: flex;
    flex-direction: row;

    input {
      font-size: 0.75rem;
      margin: 0 12px 0 0;
    }

    .btn {
      flex: 0 0 auto;
    }
  }
}
</style>
