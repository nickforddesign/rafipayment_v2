<template>
  <div :class="['search-container', search_state]">
    <form class="search-form" @submit.prevent="submit">
      <!-- <close-icon @click="toggle" /> -->
      <input type="text" v-model="search_text" @blur="toggleIfEmpty" ref="input">
      <search-icon @click="submit" />
    </form>
    <div class="search-toggle">
      <search-icon class="test" @click="show" />
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import searchIcon from '@/components/icons/search'
import closeIcon from '@/components/icons/close'
export default {
  name: 'search',
  data() {
    return {
      search_text: '',
      search_visible: false
    }
  },
  computed: {
    search_state() {
      if (this.search_visible) {
        return 'visible'
      }
    }
  },
  methods: {
    submit() {
      this.$emit('submit', this.search_text)
    },
    emitClick(e) {
      this.$emit('click', e)
    },
    focus() {
      console.log('input', this.$refs.input)
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },
    // toggle() {
    //   this.search_visible = !this.search_visible
    // },
    show() {
      this.search_visible = true
      this.focus()
    },
    hide() {
      this.search_visible = false
    },
    toggleIfEmpty() {
      if (!this.search_text) {
        this.hide()
      }
    }
  },
  components: {
    searchIcon,
    closeIcon
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';
@import '~%/breakpoints';

.search-container {
  position: relative;
  text-align: right;

  input {
    padding-right: 30px;
  }
}

.search-icon {
  position: absolute;
  width: 20px;
  top: 7px;
  right: 5px;
  fill: $color-text-medium;

  &:hover {
    fill: white;
    cursor: pointer;
  }
}

.search-toggle {
  display: none;
}

.close-icon {
  &:hover {
    cursor: pointer;
  }
}

@media (max-width: $breakpoint-medium) {
  .search-container {
    .search-form {
      display: none;
    }
    .search-toggle {
      display: inline-block;
    }
    &.visible {
      .search-form {
        display: block;
      }
      .search-toggle {
        display: none;
      }
    }
  }
}
</style>