<template>
  <div class="tr">
    <div class="td">{{ model.body.created | moment('MM/DD/YYYY h:mm:ssa') }}</div>
    <div class="td">
      {{ model.body.topic }}
    </div>
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
