<template>
  <div id="lv-metadata-modal">
    <modal :show="show" title="Metadata" @hide="$emit('hide')">

      <span v-if="hasData">
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
      <p class="center">No metadata loaded</p>
    </span>

    </modal>
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
    },
    lang: {
      type: String,
      default: 'en'
    }
  },

  components: {
    ModalBase
  },

  computed: {
    hasData: function () {
      return (this.metadata.length > 0 ||
              this.logo !== null ||
              this.attribution !== null ||
              this.license !== null)
    }
  },

  methods: {

    /**
     * Fetch the manifest and load data.
     */
    fetchManifest () {
      this.metadata = []
      this.logo = null
      this.attribution = null
      this.license = null

      if (!this.task.manifestUri.length) {
        return
      }

      fetch(this.task.manifestUri, {
        method: 'get'
      }).then((response) => {
        return response.json()
      }).then((data) => {
        this.metadata = data.metadata.map((item) => {
          if (typeof item.value === 'object') {
            item.value = this.getValueInLang(item.value)
          }
          return item
        })
        this.logo = data.logo
        this.attribution = data.attribution
        this.license = data.license
      }).catch(function (err) {
        throw Error(`Could not retrieve the manifest: ${err}`)
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

  .center {
    text-align: center;
    margin: 2rem;
  }

  li {
    margin: 0;
  }
}
</style>
