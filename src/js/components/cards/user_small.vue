<template>
  <div class="tenant-container">
    <component :is="link ? 'router-link' : 'div'" :to="`/${$user.url}`">
      <div class="tenant">
        <avatar :initials="$user.initials" :color="$user.avatar_color" />
        <div class="meta">
          {{ $user.full_name }}
        </div>
      </div>
    </component>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import User from '@/models/user'
import Avatar from '@/components/cards/avatar'

export default {
  name: 'tenant',
  props: {
    data: Object,
    link: {
      type: Boolean,
      default: true
    }
  },
  models: {
    user() {
      return new User(this.data)
    }
  },
  watch: {
    user(val) {
      this.$user = val
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

.tenant {
  display: flex;
  align-items: center;
}

.avatar {
  display: inline-block;
  color: $color-text-light;
  max-width: 30px;
  margin-right: 10px;
}

.meta {
  display: inline-block;
}

</style>