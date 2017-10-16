<template>
  <div class="search-container">
    <form @submit.prevent="submit">
      <input type="text" v-model="search_text">
      <svg viewBox="0 0 100 125" @click="submit">
        <g transform="translate(0,-952.36218)">
          <path style="text-indent:0;text-transform:none;direction:ltr;block-progression:tb;baseline-shift:baseline;color:#000000;enable-background:accumulate;"
            d="m 41.996374,960.35856 c -18.7066,0 -33.9999998,15.29343 -33.9999998,34 0,18.70654 15.2933998,34.00004 33.9999998,34.00004 7.2047,0 13.8928,-2.2666 19.4062,-6.125 l 20.3438,20.375 c 2.3429,2.3429 6.157,2.343 8.5,0 2.343002,-2.3431 2.343002,-6.1569 0,-8.5 l -20.375,-20.3438 c 3.8584,-5.5134 6.125,-12.2015 6.125,-19.40624 0,-18.7066 -15.2935,-34 -34,-34 z m 0,12 c 12.2211,0 22,9.7788 22,22 0,12.22114 -9.7789,22.00004 -22,22.00004 -12.2212,0 -22,-9.7789 -22,-22.00004 0,-12.22123 9.7788,-22 22,-22 z"
            stroke="none" marker="none" visibility="visible" display="inline" overflow="visible"
          />
        </g>
      </svg>
    </form>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'search',
  data() {
    return {
      search_text: ''
    }
  },
  methods: {
    submit() {
      console.log('search')
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

.search-container {
  position: relative;

  input {
    padding-right: 30px;
  }
}

svg {
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
</style>