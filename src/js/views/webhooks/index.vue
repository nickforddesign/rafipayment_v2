<template>
  <div>
    <collection name="webhooks" :$collection="$collection" :searchable="false">

      <responsive-table slot="content" :columns="[
        'Created',
        'Topic'
      ]">
        <row v-for="(model, index) in collection" :key="index" :model="model" />
      </responsive-table>

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
  components: {
    row
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
