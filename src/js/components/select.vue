<template>
  <div :class="classHandler">
    <select :name="name" :disabled="field_disabled" :multiple="field_multiple" @change="emitChange" v-model="field_value">
      <slot>
        <option v-for="(options, index) in options" value="option.value" :key="index">
          {{ option.label }}
        </option>
      </slot>
    </select>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'select-menu',
  props: {
    name: String,
    options: Array,
    multiple: Boolean,
    disabled: Boolean
  },
  data() {
    return {
      field_value: ''
    }
  },
  created() {
    if (this.$slots.default && this.options) {
      throw new Error('Cannot use both content slot and options property')
    }
  },
  computed: {
    field_disabled() {
      return this.disabled
    },
    field_multiple() {
      return this.multiple
    },
    classHandler() {
      return {
        'select-container': true,
        'multiple': this.field_multiple,
        'disabled': this.field_disabled
      }
    }
  },
  methods: {
    emitChange(e, value) {
      this.$emit('input', this.field_value)
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">

.select-container:not(.multiple) {
  position: relative;
  width: 100%;
  max-width: 100%;

  &:after {
    display: inline-block;
    content: '';
    position: absolute;
    right: 10px;
    bottom: 50%;
    width: 0;
    height: 0;
    border-color: #666 transparent transparent transparent;
    border-style: solid;
    border-width: 5px 5px 0 5px;
    transform: translateY(50%);
    z-index: 2;
  }

  &.disabled {
    &:after {
      opacity: 0.5;
    }
  }
}

</style>
