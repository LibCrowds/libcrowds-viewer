<template>
  <div class="lv-toolbar" id="lv-main-controls">
    <control-button
      v-for="(button, index) in toolbarButtons"
      :key="index"
      :tooltip="button.tooltip"
      :callback="button.callback">
      <icon :name="button.icon"></icon>
    </control-button>
  </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'
import Task from '@/model/Task'
import ControlButton from '@/components/controls/ControlButton'

export default {
  props: {
    task: {
      type: Task,
      required: true
    },
    viewer: {
      type: Object,
      required: true
    },
    buttons: {
      type: Object,
      required: true
    }
  },

  components: {
    Icon,
    ControlButton
  },

  computed: {
    toolbarButtons () {
      // Declare different icons for some of the default button names
      const replacementIcons = {
        help: 'question-circle',
        info: 'info-circle',
        browse: 'eye',
        share: 'share-alt',
        fullscreen: 'expand'
      }

      return Object.keys(this.buttons).map(key => {
        const iconName = key in replacementIcons
          ? replacementIcons[key]
          : key

        // Attempt to import the icon
        try {
          require(`vue-awesome/icons/${iconName}`)
        } catch (err) {
          // If it doesn't exist, don't load the button
          console.warn(`Icon not found: vue-awesome/icons/${iconName}`)
          return null
        }

        return {
          tooltip: this.buttons[key],
          icon: iconName,
          callback: () => {
            this.$emit('click', key)
          }
        }
      }).filter(btn => (btn !== null))
    }
  }
}
</script>

<style lang="scss">
#lv-main-controls {
  .fa-icon {
    width: auto;
    font-size: 1.35em;
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
