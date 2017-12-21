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
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },
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
    max-width: 100%;
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
  position: absolute;
  display: none;
  width: 24px;
  right: 0;
}

.close-icon {
  &:hover {
    cursor: pointer;
  }
}

@media (max-width: $breakpoint-medium) {
  .search-container {
    .search-form {
      display: inline-block;
      width: 0;
      overflow: hidden;
      transition: 0.4s all;
    }
    .search-toggle {
      display: inline-block;
    }
    &.visible {
      .search-form {
        width: 100%;
        transition: 0.4s all;
      }
      .search-toggle {
        display: none;
      }
    }
  }
}
</style>