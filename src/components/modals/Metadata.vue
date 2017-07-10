<template>
  <div id="lv-metadata-modal">
    <modal
      :id="id"
      title="Metadata">
      <ul v-for="m in manifestData.metadata" :key="m.label">
        <li>
          <strong>{{ m.label }}:</strong>
          &nbsp;
          <span v-html="m.value"></span></li>
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
import Modal from '@/components/Modal'

export default {
  data: function () {
    return {
      manifestData: {}
    }
  },

  methods: {
    fetchManifest () {
      const url = `${this.scheme}://` +
                  `${this.server}/` +
                  `${this.presentationApiPrefix}/` +
                  `${this.manifestId}/` +
                  `manifest.json`
      axios.get(url).then((r) => {
        this.manifestData = r.data
      })
    }
  },

  props: {
    id: {
      type: String,
      requried: true
    },
    scheme: {
      type: String,
      required: true
    },
    server: {
      type: String,
      required: true
    },
    presentationApiPrefix: {
      type: String,
      required: true
    },
    manifestId: {
      type: String,
      required: true
    }
  },

  components: {
    Modal
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
