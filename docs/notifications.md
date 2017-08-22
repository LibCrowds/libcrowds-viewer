# Notifications

By creating an instance of Vue and passing it to the viewer via the `messageBus` property it is possible to emit `success` and `error` events that will be displayed as notifications within the viewer.

### Example

```vue
<template>
  <libcrowds-viewer
    :task-opts="taskOpts"
    :message-bus="messageBus">
  </libcrowds-viewer>
</template>

<script>
import Vue from 'vue';

export default {
  data: function () {
    return {
      messageBus: new Vue(),
      taskOpts: [
        {
          mode: 'select',
          imgInfoUri: 'http://www.example.org/image-service/abcd1234/info.json'
        }
      ]
    }
  },

  mounted () {
    // Display a success message
    this.messageBus.$emit('success', 'Yay');

    // Display an error message
    this.messageBus.$emit('error', 'Boo');
  }
}
</script>
```



