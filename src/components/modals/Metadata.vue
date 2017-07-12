<template>
  <div id="lv-metadata-modal">
    <modal :id="id" title="Metadata">

      <ul v-for="item in metadata" :key="item.label">
        <li>
          <strong>{{ item.label }}:</strong>
          &nbsp;
          <span v-html="item.value"></span></li>
      </ul>

      <div id="rights">
        <img v-if="logo" :src="logo">
        <p v-if="attribution" v-html="attribution"></p>
        <a :href="license" v-if="license" v-html="license"></a>
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
      metadata: [],
      logo: null,
      attribution: null,
      license: null
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
    },
    lang: {
      type: String,
      default: 'en'
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
        this.metadata = r.data.metadata.map((item) => {
          if (typeof item.value === 'object') {
            item.value = this.getValueInLang(item.value)
          }
          return item
        })
        this.logo = r.data.logo
        this.attribution = r.data.attribution
        this.license = r.data.license
      })
    },

    /**
     * Return a metadata value in the chosen language, if available.
     */
    getValueInLang (values) {
      const filtered = values.filter((value) => {
        return value['@language'] === this.lang
      })
      return filtered.length ? filtered[0]['@value'] : ''
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
