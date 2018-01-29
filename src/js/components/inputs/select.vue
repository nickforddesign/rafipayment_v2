<template>
  <div :class="classHandler">
    <select :name="name" :disabled="field_disabled" :multiple="field_multiple" @change="emitChange" v-model="field_value" @focus="focus" @blur="blur">
      <slot>
        <option v-for="(option, index) in options" :value="option.value" :key="index">
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
    options: {
      type: Array
    },
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: Boolean,
    value: [String, Object, Number]
  },
  data() {
    return {
      field_value: this.multiple ? [] : '',
      focused: false
    }
  },
  created() {
    if (this.$slots.default && this.options) {
      throw new Error('Cannot use both content slot and options property')
    }
    if (this.value) {
      this.field_value = this.value
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
        'disabled': this.field_disabled,
        'focused': this.focused
      }
    }
  },
  methods: {
    emitChange(e, value) {
      this.$emit('input', this.field_value)
    },
    focus() {
      this.focused = true
    },
    blur() {
      this.focused = false
    }
  },
  watch: {
    value(val) {
      this.field_value = val
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

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
    pointer-events: none;
    z-index: 2;
  }

  &.disabled {
    &:after {
      opacity: 0.5;
    }
  }

  &.focused {
    &:after {
      border-color: $color-input-border-focus transparent transparent transparent;
    }
  }
}

select {
  padding-right: 24px;
}

</style>
