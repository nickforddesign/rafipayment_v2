<template>
  <div class="search-container">
    <form @submit.prevent="submit">
      <input type="text" v-model="search_text">
      <search-icon @click="submit" />
    </form>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import searchIcon from '@/components/svg/search-icon'
export default {
  name: 'search',
  data() {
    return {
      search_text: ''
    }
  },
  methods: {
    submit() {
      this.$emit('submit', this.search_text)
    },
    emitClick(e) {
      this.$emit('click', e)
    }
  },
  components: {
    searchIcon
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';
@import '~%/breakpoints';

.search-container {
  position: relative;

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

@media (max-width: $breakpoint-medium) {
  .search-container {

    input {
      display: none;
    }
  }
}
</style>