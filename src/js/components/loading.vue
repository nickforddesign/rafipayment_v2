<template>
  <div :class="['loader-container', className]" :style="[style]">
    <div class="loader" v-if="visible">
      <div class="sk-fading-circle">
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
      </div>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { sleep } from '@/utils'

export default {
  name: 'loading',
  props: {
    type: {
      type: String
    },
    fixed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false
    }
  },
  async mounted() {
    await sleep(300)
    this.visible = true
  },
  computed: {
    className() {
      if (!this.is_full) {
        return this.type
      }
    },
    style() {
      if (this.fixed) {
        return {
          position: 'fixed'
        }
      }
    },
    is_full() {
      return !this.type
    }
  },
  watch: {
    visible(val) {
      if (this.is_full) {
        const method = val
          ? 'add'
          : 'remove'
        document.body.classList[method]('lock')
      }
    }
  },
  beforeDestroy() {
    if (this.is_full) {
      document.body.classList.remove('lock')
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.loader-container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99999;

  .loader {
    position: absolute;
    display: inline-block;
    top: 50%;
    left: 50%;
    padding: 10px;
    background: rgba(0,0,0, 0.6);
    border-radius: 5px;
    transform: translateX(-50%) translateY(-50%);

    .sk-fading-circle {
      width: 40px;
      height: 40px;
      position: relative;

      .sk-circle {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;

        &:before {
          content: '';
          display: block;
          margin: 0 auto;
          width: 15%;
          height: 15%;
          background-color: #fff;
          border-radius: 100%;
          animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;
        }
      }
      .sk-circle2 {
        transform: rotate(30deg);
      }
      .sk-circle3 {
        transform: rotate(60deg);
      }
      .sk-circle4 {
        transform: rotate(90deg);
      }
      .sk-circle5 {
        transform: rotate(120deg);
      }
      .sk-circle6 {
        transform: rotate(150deg);
      }
      .sk-circle7 {
        transform: rotate(180deg);
      }
      .sk-circle8 {
        transform: rotate(210deg);
      }
      .sk-circle9 {
        transform: rotate(240deg);
      }
      .sk-circle10 {
        transform: rotate(270deg);
      }
      .sk-circle11 {
        transform: rotate(300deg);
      }
      .sk-circle12 {
        transform: rotate(330deg);
      }
      .sk-circle2:before {
        animation-delay: -1.1s;
      }
      .sk-circle3:before {
        animation-delay: -1s;
      }
      .sk-circle4:before {
        animation-delay: -0.9s;
      }
      .sk-circle5:before {
        animation-delay: -0.8s;
      }
      .sk-circle6:before {
        animation-delay: -0.7s;
      }
      .sk-circle7:before {
        animation-delay: -0.6s;
      }
      .sk-circle8:before {
        animation-delay: -0.5s;
      }
      .sk-circle9:before {
        animation-delay: -0.4s;
      }
      .sk-circle10:before {
        animation-delay: -0.3s;
      }
      .sk-circle11:before {
        animation-delay: -0.2s;
      }
      .sk-circle12:before {
        animation-delay: -0.1s;
      }
    }
  }

  &.input {
    position: relative;
    text-align: left;

    .loader {
      position: relative;
      left: 0;
      top: 0;
      padding: 6px;
      transform: none;

      .sk-fading-circle {
        width: 25px;
        height: 25px;
      }
    }
  }

  &.table {
    position: relative;
    height: 80px;
    margin-top: 0;
    background: #2b3340;
    border-top: 1px solid white;

    .loader {
      padding: 6px;

      .sk-fading-circle {
        width: 25px;
        height: 25px;
      }
    }
  }

  &.data {
    // display: inline-block;
    position: relative;
    margin-top: 0;

    .loader {
      position: relative;
      left: initial;
      padding: 0;
      background: none;
      transform: none;

      .sk-fading-circle {
        width: 12px;
        height: 12px;
      }
    }
  }
}
  

@-webkit-keyframes sk-circleFadeDelay {
  0%, 39%, 100% { opacity: 0; }
  40% { opacity: 1; }
}

@keyframes sk-circleFadeDelay {
  0%, 39%, 100% { opacity: 0; }
  40% { opacity: 1; }
}
</style>
