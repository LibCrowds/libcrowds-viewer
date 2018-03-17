<template>
  <div id="lv-info-modal">
    <slot>
      <span v-if="hasInfo">
        <ul class="lv-modal-list">
          <li v-for="item in metadata" :key="item.label">
            <strong>{{ item.label }}:</strong>
            <span v-html="item.value"></span></li>
        </ul>
        <div
          v-if="logo || attribution || license"
          id="lv-attribution-details">
          <img v-if="logo" :src="logo">
          <p v-if="attribution" v-html="attribution"></p>
          <a v-if="license" :href="license" v-html="license"></a>
        </div>
      </span>
      <span v-else>
        <p class="center">No task info available</p>
      </span>
    </slot>
  </div>
</template>

<script>
import Task from '@/model/Task'
import ModalBase from '@/components/modals/Base'

export default {
  data () {
    return {
      metadata: [],
      logo: null,
      attribution: null,
      license: null
    }
  },

  props: {
    task: {
      type: Task,
      required: true
    }
  },

  components: {
    ModalBase
  },

  computed: {
    hasInfo () {
      return (this.metadata.length > 0 ||
              this.logo !== null ||
              this.attribution !== null ||
              this.license !== null)
    }
  },

  methods: {
    /**
     * Fetch and return the task info.
     * @param {Object} uri
     *   URI to the JSON task item info.
     */
    fetchTaskInfo (uri) {
      return new Promise((resolve, reject) => {
        fetch(uri, {
          method: 'get'
        }).then((response) => {
          return response.json()
        }).then((data) => {
          resolve(data)
        }).catch(function (err) {
          reject(new Error(`Could not retrieve the item info: ${err}`))
        })
      })
    },

    /**
     * Update the info for a task.
     * @param {Object} info
     *   The info.
     */
    updateInfo (info) {
      this.metadata = info.metadata
      this.logo = info.logo
      this.attribution = info.attribution
      this.license = info.license
    },

    /**
     * Load the info for a task.
     * @param {Object} info
     *   The info.
     */
    loadInfo () {
      this.metadata = []
      this.logo = null
      this.attribution = null
      this.license = null

      if (!this.task.manifest) {
        return
      }

      if (typeof this.task.manifest === 'string') {
        this.fetchTaskInfo(this.task.manifest).then(data => {
          this.updateInfo(data)
        })
      } else if (typeof this.task.manifest === 'object') {
        this.updateInfo(this.task.manifest)
      }
    }
  },

  watch: {
    task () {
      // Update the info when the task changes.
      this.loadInfo()
    }
  },

  created () {
    this.loadInfo()
  }
}
</script>

<style lang="scss">
#lv-info-modal-content {
  #lv-attribution-details {
    text-align: center;
    margin: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>