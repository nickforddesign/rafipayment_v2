<template>
  <div>
    <collection name="webhooks" :$collection="$collection" :searchable="false">
      <table slot="content">
        <thead>
          <tr>
            <td>Created</td>
            <td>Topic</td>
          </tr>
        </thead>
        <tbody>
          <row v-for="(model, index) in collection" :key="index" :model="model" />
        </tbody>
      </table>
    </collection>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
import row from './row'

export default {
  name: 'admins',
  data() {
    return {
      modal_visible: false
    }
  },
  collection() {
    return new Collection({
      basePath: 'payment/webhooks'
    })
  },
  // methods: {
  //   fetch() {
  //     this.$collection.fetch()
  //   }
  // },
  components: {
    row
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
