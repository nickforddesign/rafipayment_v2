<template>
  <div class="tr">
    <cell>{{ model.created | moment('M/D/YY h:mm:ssa')  }}</cell>
    <cell>{{ model.body.topic }}</cell>
    <cell :class="['text-color', status_class]">{{ has_error }}</cell>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>

export default {
  name: 'row',
  props: ['model'],
  computed: {
    status_class() {
      return this.has_error
        ? 'danger'
        : 'success'
    },
    has_error() {
      return !!this.model.error.exception
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
