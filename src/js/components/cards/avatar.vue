<template>
  <div class="avatar" :style="[styleHandler]" @mouseover="onEnter" @mouseleave="onLeave" :class="[size_class]">
    <svg viewBox="0 0 220 220">
      <text transform="matrix(1 0 0 1 110 144)" text-anchor="middle">{{ initials }}</text>
    </svg>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'avatar',
  props: {
    color: String,
    initials: String
  },
  data() {
    return {
      width: null,
      size_class: null
    }
  },
  async mounted() {
    this.setWidth()
    window.addEventListener('resize', this.setWidth.bind(this), true)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setWidth.bind(this), true)
  },
  watch: {
    width(val) {
      this.size_class = this.getWidthClass()
    }
  },
  computed: {
    styleHandler() {
      return {
        backgroundColor: `${this.color}`
      }
    }
  },
  methods: {
    onEnter() {
      this.$emit('mouseover')
    },
    onLeave() {
      this.$emit('mouseleave')
    },
    setWidth() {
      this.width = this.$el.offsetWidth
    },
    getWidthClass() {
      return this.width > 70
        ? 'large'
        : 'small'
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style lang="scss" scoped>
@import '~%/colors';

.avatar {
  display: block;
  width: 30%;
  border-radius: 100%;
  background-image: linear-gradient(to bottom,
    rgba(255, 255, 255, 0.5) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  -webkit-font-smoothing: subpixel-antialiased;

  svg {
    display: block;
    width: 100%;
    background-blend-mode: overlay;

    text {
      fill: $color-background-dark;
      // fill: currentColor;
      font-family: 'Roboto', sans-serif;
      font-size: 105.0759px;
    }
  }

  &:hover {
    text {
      text-decoration: none;
    }
  }

  &.small {
    svg {
      text {
        font-weight: 400;
      }
    }
  }

  &.large {
    svg {
      text {
        font-weight: 200;
      }
    }
  }
}
</style>
