<template>
  <router-link :to="`/${$user.url}`">
    <div class="tenant">
      <avatar :initials="$user.initials" :color="$user.avatar_color" />
      <div class="meta">
        {{ $user.full_name }}
      </div>
    </div>
  </router-link>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import User from '@/models/user'
import Avatar from '@/components/cards/avatar'

export default {
  name: 'tenant',
  props: {
    data: Object
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