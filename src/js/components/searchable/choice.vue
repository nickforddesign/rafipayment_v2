<template>
  <li>
    <div class="choice" @click="select">
      {{ model[label] }}
    </div>
  </li>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'choice',
  props: ['model', 'label'],
  methods: {
    select() {
      this.$emit('select', this.model)
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

.choice {
  padding: 8px 10px;
  background: $color-button-background;
  border-bottom: 1px solid darken($color-button-background, 5%);

  &:hover {
    background: lighten($color-button-background, 5%);
    cursor: pointer;
  }
}
</style>