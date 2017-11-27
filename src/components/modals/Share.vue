<template>
  <div id="lv-share-modal">
    <modal-base :show="show" title="Share" @hide="$emit('hide')">
      <slot></slot>
    </modal-base>
  </div>
</template>

<script>
import ModalBase from '@/components/modals/Base'

export default {
  props: {
    show: {
      type: Boolean,
      requried: true
    }
  },

  components: {
    ModalBase
  }
}
</script>
