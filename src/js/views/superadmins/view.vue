<template>
  <div class="model-view">
    <header>
      <div class="meta">
        <legend>Superadmin</legend>
        <h2>{{ $user.full_name }}</h2>
      </div>
      <div class="actions">
        <button class="link" @click="promptRemove">Delete</button>
        <button class="primary">Edit</button>
      </div>
    </header>
    <div class="table-container">
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
            <dd>{{ $user.phone | phone }}</dd>
          </dl>
        </div>
        <div class="grid__col grid__col--1-of-2">
        </div>
      </div>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import app from '@/app'
import User from '@/models/user'

export default {
  name: 'superadmin',
  models: {
    user() {
      return new User({
        role: 'superadmin',
        id: this.$route.params.id
      })
    }
  },
  created() {
    this.$user.fetch()
  },
  methods: {
    promptRemove() {
      app.confirm(
        `Are you sure you want to remove ${this.$user.full_name}?`,
        this.remove,
        'Delete user'
      )
    },
    async remove() {
      await this.$user.destroy()
      this.$router.push('/superadmins')
    }
  }
}
</script>
