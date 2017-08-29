<template>
  <div id="lv-info-modal">
    <modal-base :show="show" title="Information" @hide="$emit('hide')">

      <span v-if="hasInfo">
        <ul v-for="item in metadata" :key="item.label">
          <li>
            <strong>{{ item.label }}:</strong>
            <span v-html="item.value"></span></li>
        </ul>
        <div class="center">
          <img v-if="logo" :src="logo">
          <p v-if="attribution" v-html="attribution"></p>
          <a :href="license" v-if="license" v-html="license"></a>
      </div>
    </span>

    <span v-else>
      <p class="center">No task info available</p>
    </span>

    </modal-base>
  </div>
</template>

<script>
import Task from '@/model/Task'
import ModalBase from '@/components/modals/Base'

export default {
  data: function () {
    return {
      metadata: [],
      logo: null,
      attribution: null,
      license: null
    }
  },

  props: {
    show: {
      type: Boolean,
      requried: true
    },
    task: {
      type: Task,
      required: true
    }
  },

  components: {
    ModalBase
  },

  computed: {
    hasInfo: function () {
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

      if (!this.task.info) {
        return
      }

      if (typeof this.task.info === 'string') {
        this.fetchTaskInfo(this.task.info).then(data => {
          this.updateInfo(data)
        })
      } else if (typeof this.task.info === 'object') {
        this.updateInfo(this.task.info)
      }
    }
  },

  watch: {
    task: function () {
      // Update the info when the task changes.
      this.loadInfo()
    }
  },

  created () {
    this.loadInfo()
  }
}
</script>

<style lang="scss" scoped>
#lv-info-modal {
  ul {
    padding-left: 0;
    list-style: none;
  }

  .center {
    text-align: center;
    margin: 2rem;
  }

  li {
    margin: 0;
  }
}
</style>
