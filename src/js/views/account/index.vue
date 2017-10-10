<template>
  <div>
    <header>
      <div class="meta">
        <legend>ACCOUNT</legend>
        <h2>{{ $user.full_name }}</h2>
      </div>
      <div class="actions">
        <button class="primary">Edit</button>
      </div>
    </header>
    <div class="table fake">
      <div class="header">
        Basic Information
      </div>
      <div class="grid">
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>First Name</dt>
            <dd>{{ $user.first_name }}</dd>
          </dl>
        </div>
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>Last Name</dt>
            <dd>{{ $user.last_name }}</dd>
          </dl>
        </div>
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>Email</dt>
            <dd>{{ $user.email }}</dd>
          </dl>
        </div>
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>Role</dt>
            <dd>{{ $user.role | capitalize }}</dd>
          </dl>
        </div>
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>Phone</dt>
            <dd>{{ $user.phone }}</dd>
          </dl>
        </div>
        <div class="grid__col grid__col--1-of-2">
        </div>
      </div>
    </div>
    <div class="actions">
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import session from '@/session'

export default {
  name: 'account',
  models: {
    user() {
      return session.$user
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

header {
  display: flex;
  align-items: center;

  .meta {
    flex: 2 0 0;
  }
  .actions {
    flex: 1 0 0;
    text-align: right;
  }
}

.header {
  background: $color-box-background;
  padding: 12px 16px;
  text-transform: uppercase;
  font-size: 0.8em;
  letter-spacing: 1px;
}

dl {
  padding: 20px 0;
  border-bottom: 1px solid $color-text-medium;

  dt {
    color: $color-text-medium;
  }
}

.table {
  margin-bottom: 30px;
}
</style>