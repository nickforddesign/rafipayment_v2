<template>
  <svg viewBox="0 0 52 52">
    <circle cx="26" cy="26" r="25"/>
    <g>
      <circle cx="15.1" cy="26" r="2.2"/>
      <circle cx="26" cy="26" r="2.2"/>
      <circle cx="36.9" cy="26" r="2.2"/>
    </g>
  </svg>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'icon-pending'
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

svg {
  width: 56px;

  & > circle {
    fill: $color-status-neutral;
    opacity: 0;
    transform: scale(0.8);
    animation: fadepop .2s ease-in-out .2s forwards;
    transform-origin: center;
  }
}

g {
  circle {
    opacity: 0;
    fill: $color-background-default;
    animation: fadepop .2s ease-in-out .2s forwards;
    transform-origin: center;

    &:nth-child(2) {
      animation-delay: .4s;
    }

    &:nth-child(3) {
      animation-delay: .8s;
    }
  }
}

@keyframes fadepop {
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>

