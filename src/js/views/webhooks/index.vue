<template>
  <div>
    <collection collection_name="webhooks" :$collection="$collection" :searchable="false">

      <responsive-table slot="content" :columns="[
        'Created',
        {
          name: 'Topic',
          sort: 'body.topic',
        },
        {
          name: 'Error',
          sort: false
        }
      ]">
        <row v-for="(model, index) in collection" :key="index" :model="model" />
      </responsive-table>

    </collection>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
import Webhook from '@/models/webhook'
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
      basePath: 'payment/webhooks',
      query: {
        sort_created: -1
      },
      model: Webhook
    })
  },
  components: {
    row
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
