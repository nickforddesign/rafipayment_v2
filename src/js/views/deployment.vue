<template>
  <div class="deployment-message">
    <div class="container x-sm">
      <logo />
      <div class="message text-center">
        <p>
          We have updated the app, you must refresh to receive the update.
        </p>
        <button class="primary" @click="refresh">Refresh Now</button>
      </div>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { sleep } from '@/utils'

export default {
  name: 'deployment-message',
  data() {
    return {
      title_changed: false
    }
  },
  mounted() {
    this.startTitle()
  },
  watch: {
    title_changed(val) {
      let title = 'Rafi Payment'
      if (val) {
        title += ' (1)'
      }
      document.title = title
    }
  },
  methods: {
    refresh() {
      window.location.reload()
    },
    async startTitle() {
      this.title_changed = !this.title_changed
      await sleep(1500)
      this.startTitle()
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/mixins';

.deployment-message {
  @include fixed_fill;

  .container {
    position: absolute;
    margin: 0 auto;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .logo {
    width: 180px;
    margin: 0 auto;
  }

  .message {
    p {
      margin: 30px 0;
      font-size: 1.3em;
    }
  }
}
</style>
