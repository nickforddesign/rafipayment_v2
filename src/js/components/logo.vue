<template>
  <div class="logo">
    <svg :style="style" viewBox="0 0 289.3 171.2">
      <path d="M44.3,139.2h-4.2v7.5h-5.5v-25h10.2c6,0,9.6,3.5,9.6,8.7v0.1C54.5,136.2,50,139.2,44.3,139.2z M48.9,130.5c0-2.5-1.7-3.8-4.5-3.8h-4.3v7.7h4.4C47.3,134.3,48.9,132.7,48.9,130.5L48.9,130.5L48.9,130.5z"/>
      <path d="M82.8,146.7l-2.3-5.6H69.9l-2.3,5.6H62l10.7-25.2h5.1l10.7,25.2H82.8z M75.2,128.1l-3.3,8.1h6.7L75.2,128.1z"/>
      <path d="M109.3,136.8v10h-5.5v-9.9l-9.6-15.2h6.4l6,10l6.1-10h6.3L109.3,136.8z"/>
      <path d="M149.6,146.7v-16.3l-7,10.7h-0.1l-7-10.6v16.2h-5.4v-25h5.9l6.6,10.6l6.6-10.6h5.9v25L149.6,146.7L149.6,146.7z"/>
      <path d="M169,146.7v-25h18.9v4.8h-13.4v5.1h11.8v4.9h-11.8v5.3h13.6v4.9L169,146.7L169,146.7z"/>
      <path d="M218.7,146.7l-12.1-15.9v15.9h-5.4v-25h5.1l11.7,15.4v-15.5h5.4v25L218.7,146.7L218.7,146.7z"/>
      <path d="M248,126.8v20h-5.5v-20h-7.6v-5.1h20.8v5.1C255.6,126.8,248,126.8,248,126.8z"/>
      <path d="M34.8,102.9v-8h7.6c3.4,0,4.5-1.1,4.5-3.9V42.8c0-2.8-1.1-3.9-4.5-3.9h-7.6v-8H82c15.8,0,23.1,6.2,23.1,18c0,11.2-9.4,16.6-20.4,17.6v0.2c11.4,1.4,14,6.4,14,14.9c0,11.5,2.6,13.2,4.4,13.2c2.6,0,3.7-2.3,3.7-8.7v-3.4h7.2v3.4c0,13.9-6,18.9-15,18.9c-10.8,0-14-5.9-14-14.8c0-17.4-3.9-21.2-16.6-21.2H62v21.8c0,2.8,1.1,3.9,4.5,3.9h7.9v8L34.8,102.9L34.8,102.9z M62,61.1h12.8c11.7,0,15.1-3.8,15.1-11.8c0-6.7-4.4-10.5-14-10.5H62V61.1z"/>
      <path d="M176.8,84v3.3c0,12.2-4.9,17.3-14,17.3c-5.4,0-10.1-2.3-11-8c-4,6.1-11,8-17.8,8c-8.5,0-15.1-4-15.1-13.8
        c0-21.1,32.6-10.9,32.6-26.2c0-7-5.9-8.2-11.6-8.2c-3,0-8.1,1-10.1,3.6c4-0.5,7.2,1.2,7.2,5.7c0,4.9-3.4,6.4-7.6,6.4
        c-4.3,0.1-7.8-3.3-7.8-7.6c0-0.1,0-0.3,0-0.4c0-11.1,13.3-13.5,21.8-13.5c14.7,0,21,6.6,21,15.8v26.5c0,2.4,1,3.6,2.6,3.6
        s2.9-1.5,2.9-8.2V84H176.8L176.8,84z M151.5,76L140,81.2c-3.1,1.4-6.5,3.2-6.5,8.3c0,4.6,2.1,6.8,6.5,6.8c7.4,0,11.5-6.3,11.5-13.2
        V76z"/>
      <path d="M180,52h10.3v-2.8c0-13.9,7.4-20.5,18.8-20.5c7,0,15.2,4.1,15.2,12.1c0,4.3-2.5,7.5-6.9,7.5
        c-4,0-7.1-2.7-7.1-6.3c0-3.4,2.4-5.5,5.5-6c-0.1-0.1-0.2-0.2-0.2-0.3c-1.6-1-3.4-1.5-5.3-1.5c-5.6,0-7.2,3.8-7.2,8.7V52h11.1v7.2
        h-11.1v32.2c0,3.2,1.3,4.3,4.3,4.3h6.6v7.2h-34v-7.2h5.9c3,0,4.4-1.2,4.4-4.3V59.2H180V52z"/>
      <path d="M224.1,102.9v-7.2h5c3,0,4.4-1.2,4.4-4.3V63.6c0-3.2-1.3-4.3-4.4-4.3h-5V52h22.1v39.3c0,3.2,1.3,4.3,4.4,4.3
        h5.3v7.2C255.9,102.9,224.1,102.9,224.1,102.9z M238.4,29.6c4.3,0,7.8,3.5,7.8,7.8s-3.5,7.8-7.8,7.8s-7.8-3.5-7.8-7.8
        C230.6,33.1,234.1,29.6,238.4,29.6"/>
    </svg>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'logo',
  props: {
    color: {
      type: String,
      default: '#fff'
    }
  },
  computed: {
    style() {
      return {
        color: this.color
      }
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
svg {
  display: block;
  fill: currentColor;
}
</style>
