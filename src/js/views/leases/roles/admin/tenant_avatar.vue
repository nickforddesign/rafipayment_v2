<template>
  <div class="tenant-avatar">
    <router-link :to="`/${$user.url}`">
      <avatar
      :initials="$user.first_name[0]"
      :color="$user.avatar_color"
      @mouseover="onEnter"
      @mouseleave="onLeave" />
    </router-link>
    <transition name="fade">
      <div class="tooltip" v-if="hovering">
        {{ $user.full_name }}
      </div>
    </transition>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Avatar from '@/components/cards/avatar'
import User from '@/models/user'

export default {
  name: 'tenant-avatar',
  props: {
    data: Object
  },
  data() {
    return {
      hovering: false
    }
  },
  models: {
    user() {
      return new User(this.data)
    }
  },
  methods: {
    onEnter() {
      this.hovering = true
    },
    onLeave() {
      this.hovering = false
    }
  },
  components: {
    Avatar
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

.tenant-avatar {
  position: relative;
  display: inline-block;

  .avatar {
    width: 16px;
    color: $color-text-light;

    &:hover {
      cursor: pointer;
    }
  }
}

.tooltip {
  bottom: calc(100% + 6px);
}
</style>
