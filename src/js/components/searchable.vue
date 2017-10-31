<template>
  <div class="searchable">
    <div class="query">
      <span v-if="selected[display]" class="selected">
        <span class="selected-name">{{ selected[display] }}</span>
        <div class="remove" @click="clear"></div>
      </span>
      <input type="text" v-model="query" @keydown.delete="handleDelete" @focus="onFocus" @blur="onBlur">
    </div>
    <ul v-if="focused">
      <li v-for="(model, index) in items" :key="index">
        <div class="choice" @click="setSelected(model)">{{ model[display] }}</div>
      </li>
    </ul>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { isEmpty } from 'ramda'
import { sleep } from '@/utils'

export default {
  name: 'searchable',
  props: {
    collection: Array,
    omit: Array,
    display: String,
    model: Function,
    value: [String, Object, Number]
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
          return new Constructor(model).toJSON()
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
  watch: {
    value(val) {
      this.selected = val
    }
  },
  methods: {
    setSelected(model) {
      this.selected = model
      this.query = ''
      this.emit()
    },
    handleDelete() {
      if (!isEmpty(this.selected) && this.query === '') {
        this.clear()
      }
    },
    clear() {
      this.selected = ''
      this.emit()
    },
    emit() {
      this.$emit('input', this.selected)
    },
    onFocus() {
      this.focused = true
    },
    async onBlur() {
      await sleep(200)
      this.focused = false
    }
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

    .choice {
      padding: 8px 10px;
      background: $color-button-background;
      border-bottom: 1px solid darken($color-button-background, 5%);

      &:hover {
        background: lighten($color-button-background, 5%);
        cursor: pointer;
      }
    }
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

  // & > span {
  //   margin-left: 12px;
  // }

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