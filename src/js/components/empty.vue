<template>
  <div class="empty-collection">
    <div class="message">
      <slot name="message">Collection is empty</slot>
    </div>
    <div class="actions" v-if="$slots.actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'empty',
  props: {
    message: {
      type: String
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

.empty-collection {
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 30px;
  border: 2px dashed #aaa;
  background: $color-box-background;
  text-align: center;

  .actions {
    margin-top: 20px;
  }
}
</style>