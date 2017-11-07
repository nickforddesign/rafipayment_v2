<template>
  <div class="searchable">
    <div class="query" @click.self="focusInput">
      <span v-if="selected[display]" class="selected">
        <span class="selected-name">{{ selected[display] }}</span>
        <div class="remove" @click="clear"></div>
      </span>
      <input
        type="text"
        ref="input"
        v-model="query"
        @keydown.delete="handleDelete"
        @keydown.enter="handleEnter"
        @keydown.esc="handleEscape"
        @keydown.up="handleUp"
        @keydown.down="handleDown"
        @focus="onFocus"
        @blur="onBlur">
    </div>
    <ul v-if="focused">
      <choice v-for="(model, index) in items" :key="index" :label="display" :model="model" @select="setSelected" />
    </ul>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { isEmpty } from 'ramda'
import { sleep } from '@/utils'

import choice from './choice'

export default {
  name: 'searchable',
  props: {
    collection: Array,
    omit: Array,
    display: String,
    model: Function,
    value: [String, Object, Number],
    focus: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      query: '',
      selected: {},
      focused: false
    }
  },
  computed: {
    models() {
      const Constructor = this.model
      return Constructor
        ? this.collection.map(model => {
          return new Constructor(model)
        })
        : this.collection
    },
    items() {
      let output = this.models
      if (this.omit) {
        output = this.models.filter(model => {
          return !this.omit.includes(model)
        })
      }
      if (this.query) {
        output = output.filter(model => {
          const regex = new RegExp(this.query, 'gi')
          return model[this.display].match(regex)
        })
      }
      return output
    }
  },
  created() {
    this.$nextTick(() => {
      if (this.focus) {
        this.focusInput()
      }
    })
  },
  watch: {
    value(val) {
      this.selected = val
    }
  },
  methods: {
    handleDelete() {
      if (!isEmpty(this.selected) && this.query === '') {
        this.clear()
      }
    },
    handleEnter() {
      this.$refs.input.blur()
    },
    handleEscape() {
      this.$refs.input.blur()
    },
    handleUp() {
      if (!isEmpty(this.selected)) {
        const current_index = this.items.indexOf(this.selected)
        if (current_index) {
          this.selected = this.items[current_index - 1]
        }
      } else {
        this.selected = this.items[0]
      }
      this.emit()
    },
    handleDown() {
      if (!isEmpty(this.selected)) {
        const current_index = this.items.indexOf(this.selected)
        if (current_index + 1 !== this.items.length) {
          this.selected = this.items[current_index + 1]
        }
      } else {
        this.selected = this.items[0]
      }
      this.emit()
    },
    setSelected(model) {
      this.selected = model
      this.query = ''
      this.emit()
    },
    clear() {
      this.selected = ''
      this.emit()
      this.focusInput()
    },
    emit() {
      this.$emit('input', this.selected)
    },
    focusInput() {
      this.$refs.input.focus()
    },
    onFocus() {
      this.focused = true
    },
    async onBlur() {
      await sleep(200)
      this.focused = false
    }
  },
  components: {
    choice
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

.searchable {
  position: relative;
}

ul {
  position: absolute;
  width: 100%;
  z-index: 3;

  li {
    display: block;
    margin: 0;
  }
}

.selected {
  background: $color-button-background;
  padding: 4px 6px;
  margin-left: 8px;
  border-radius: 4px;
}

.query {
  padding: 5px 0 3px;
  background: $color-box-background;

  input {
    background: none;
    border: none;
  }

  .remove {
    display: inline-block;
    position: relative;
    top: 5px;
    width: 10px;
    height: 10px;

    &:hover {
      cursor: pointer;
    }

    &:before {
      content: '';
      display: block;
      position: absolute;
      height: 1px;
      width: 10px;
      background: $color-text-default;
      transform: rotate(-45deg);
    }

    &:after {
      content: '';
      display: block;
      position: absolute;
      height: 1px;
      width: 10px;
      background: $color-text-default;
      transform: rotate(45deg);
    }
  }
}

</style>