<template>
  <router-link :to="`/leases/${data.id}`" @click.native.stop>
    #{{ data.display_id }}
  </router-link>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'lease-link',
  props: {
    data: Object
  }
}
</script>
