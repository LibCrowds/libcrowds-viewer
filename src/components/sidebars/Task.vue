<template>
  <div id="lv-task-sidebar">
    <sidebar title="Task">
      <h4>{{ objective }}</h4>
      <p>{{ guidance }}</p>
      <button class="btn" @click="toggleCollapseNote" v-if="showNote">
        Add a note
      </button>
      <div 
        v-show="showNote"
        v-if="!collapseNote">
        <textarea
          rows="3" 
          placeholder="Leave a note..."
          @input="updateNote">
        </textarea>
      </div>
      <button class="btn btn-green" @click="submit">
        Submit
      </button>
    </sidebar>
  </div>
</template>

<script>
import { store } from '@/store'
import Sidebar from '@/components/Sidebar.vue'
import getData from '@/utils/getData'

export default {
  data: function () {
    return {
      collapseNote: true
    }
  },

  components: {
    Sidebar
  },

  props: {
    objective: {
      type: String,
      required: true
    },
    guidance: {
      type: String,
      required: true
    },
    showNote: {
      type: Boolean,
      required: true
    }
  },

  methods: {
    toggleCollapseNote () {
      this.collapseNote = !this.collapseNote
    },
    updateNote (evt) {
      store.commit('SET_ITEM', { key: 'note', value: evt.target.value })
    },
    submit () {
      const data = getData()
      this.$emit('submit', data)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/settings';
@import '../../assets/style/partials/buttons';
@import '../../assets/style/partials/forms';

#lv-task-sidebar {
  ul {
    overflow-y: auto;
    height: 300px;
    list-style: none;
    padding: 0.8rem;
    border: 1px solid $gray;

    li {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-content: center;

      &:not(:last-child) {
        margin-bottom: 0.75rem;
      }
    }
  }

  .btn {
    width: 100%;
    display: block;
    margin-top: 1rem;
  }

  svg {
    margin-left: 5px;
  }

  button {
    display: flex;
    margin-right: auto;
    margin-left: auto;
  }

  .slide-leave-active,
  .slide-enter-active {
    transition: 1s;
  }
  .slide-enter {
    transform: translate3d(0, 100%, 0);
    visibility: hidden;
  }
  .slide-leave-to {
    transform: translate3d(0, -100%, 0);
    visibility: visible;
  }
}
</style>
