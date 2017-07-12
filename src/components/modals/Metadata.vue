<template>
  <div id="lv-metadata-modal">
    <modal :id="id" title="Metadata">

      <ul v-for="item in manifestData.metadata" :key="item.label">
        <li>
          <strong>{{ item.label }}:</strong>
          &nbsp;
          <span v-html="item.value"></span></li>
      </ul>

      <div id="rights">
        <img :src="manifestData.logo">
        <p v-html="manifestData.attribution"></p>
        <p v-html="manifestData.license"></p>
     </div>

    </modal>
  </div>
</template>

<script>
import axios from 'axios'
import Task from '@/task'
import Modal from '@/components/Modal'

export default {
  data: function () {
    return {
      manifestData: {}
    }
  },

  props: {
    id: {
      type: String,
      requried: true
    },
    task: {
      type: Task,
      required: true
    }
  },

  components: {
    Modal
  },

  methods: {

    /**
     * Fetch the manifest.
     */
    fetchManifest () {
      this.manifestData = {}
      axios.get(this.task.manifest).then((r) => {
        this.manifestData = r.data
      })
    }
  },

  watch: {

    /**
     * Update the manifest when the task changes.
     */
    task: function () {
      this.fetchManifest()
    }
  },

  created () {
    this.fetchManifest()
  }
}
</script>

<style lang="scss" scoped>
#lv-metadata-modal {
  ul {
    padding-left: 0;
    list-style: none;
  }

  #rights {
    text-align: center;
    margin: 2rem;
  }

  li {
    margin: 0;
  }
}
</style>
