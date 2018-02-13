<template>
  <div class="tr">
    <cell>{{ model.created | moment('MM/DD/YYYY h:mm:ssa')  }}</cell>
    <cell>{{ model.body.topic }}</cell>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>

export default {
  name: 'row',
  props: ['model']
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
