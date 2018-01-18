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
export default {
  name: 'deployment-message',
  methods: {
    refresh() {
      window.location.reload()
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.deployment-message {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

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
