<template>
  <div class="container">
    <h1>{{ title }}</h1>
    <p class="lead">
      {{ lead }}
    </p>
    <div>
      <button
        v-for="b in buttons"
        :key="b.endpoint"
        @click="go(b.endpoint)">
        {{ b.text }}
      </button>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    lead: String,
    buttons: Array
  },

  methods: {
    go(endpoint) {
      window.location.pathname = endpoint
    }
  }
}
</script>

<style lang="scss">
.container {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
  background-color: #F8F8F8;
  color: #1F1E38;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

h1 {
  margin: 0;
  font-weight: 200;
}

p.lead {
  font-weight: bold;
  color: #5F5F5F;
}

button {
  color: white;
  background: #59ABE3;
  padding: 12px 26px;
  margin: 0.5rem;
  letter-spacing: 0.8px;
  font-size: 1.2rem;
  border: none;
}
</style>
