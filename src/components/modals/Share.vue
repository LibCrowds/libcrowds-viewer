<template>
  <div id="lv-share-modal">
    <modal-base :show="show" title="Share" @hide="$emit('hide')">
      <span v-if="task.shareText" v-html="marked(task.shareText)"></span>
      <div class="flex-row">
        <input :value="task.shareUrl" readonly>
        <button
          ref="copybtn"
          aria-label="URL copied!"
          class="lv-btn lv-btn-blue">
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
    marked
  },

  components: {
    Icon,
    ModalBase
  },

  mounted () {
    let btn = this.$refs.copybtn

    /* eslint-disable no-new */
    new Clipboard(btn, {
      text: (trigger) => {
        btn.classList.add('hint--top')
        trigger.addEventListener('mouseleave', () => {
          btn.classList.remove('hint--top')
        })
        return this.task.shareUrl
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~hint.css';
@import '~style/partials/forms';
@import '~style/partials/buttons';

#lv-share-modal {
  .flex-row {
    margin: 25px 0;
    display: flex;
    flex-direction: row;

    input {
      font-size: 0.75rem;
      margin: 0 12px 0 0;
    }

    .lv-btn {
      flex: 0 0 auto;
    }
  }
}
</style>
