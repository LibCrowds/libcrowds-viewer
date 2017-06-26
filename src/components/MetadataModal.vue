<template>
  <div id="lc-metadata">
    <modal
      :id="id"
      title="Metadata">
      <ul id="manifest-md" v-for="m in manifestData.metadata">
        <li>
          <strong>{{ m.label }}:</strong>
          &nbsp;
          <span v-html="m.value"></span></li>
      </ul>
      <div id="rights">
        <img :src="manifestData.logo" />
        <p>{{ manifestData.attribution }}</p>
        <p>{{ manifestData.license }}</p>
     </div>
    </modal>
  </div>
</template>

<script>
import axios from 'axios'
import Modal from './Modal.vue'

export default {
  data: function () {
    return {
      manifestData: {}
    }
  },

  methods: {
    fetchManifest () {
      axios.get(this.manifest).then((r) => {
        this.manifestData = r.data
      }).catch(function (error) {
        console.log(error);
      })
    }
  },

  props: {
    manifest: {
      type: String,
      requried: true
    },
    id: {
      type: String,
      requried: true
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

<style scoped>
#manifest-md {
  list-style: none;
}

#rights {
  text-align: center;
  margin: 2rem;
}

li {
  margin: 0;
}
</style>
