# Components

The following custom components are available.

## lv-modal

Custom modals are available via the `<lv-modal>` tag.

| Property | Type    | Description                             |                                                     |
|----------|---------|-----------------------------------------|
| v-model  | Boolean | True to show the modal, false otherwise |
| title    | String  | The modal title                         |

#### Example

``` vue
<lv-modal title="My Modal" v-model="show">
  Modal content.
</lv-modal>
```
