<template>
  <div :class="['box', 'user-card', direction]">
    <avatar :initials="$user.initials" :color="$user.avatar_color"></avatar>
    <slot>
      <div class="details text-left">
        <h3>{{ $user.full_name }}</h3>
        <h6>{{ $user.email }}</h6>
      </div>
    </slot>
  </div>
</template>

<script>
import User from '@/models/user'
import Avatar from '@/components/cards/avatar'

export default {
  name: 'user',
  props: {
    data: Object,
    model: Object,
    reverse: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    direction() {
      if (this.reverse) {
        return 'reverse'
      }
    }
  },
  models: {
    user() {
      let output
      if (this.data) {
        output = new User(this.data)
      } else if (this.model) {
        output = this.model
      }
      return output
    }
  },
  components: {
    Avatar
  }
}
</script>

<style lang="scss">
.user-card {
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  text-align: left;
}
.avatar {
  display: block;
  width: 30%;
  margin: 1em;
}
.details {
  width: 70%;
  margin-left: 20px;
  padding: 0;
  border-left: 0;

  h3 {
    margin-bottom: 10px;
  }
  h6 {
    font-size: 0.7em;
    margin: 0;
  }
}
.reverse {
  flex-direction: row-reverse;
  text-align: right;
}
</style>
