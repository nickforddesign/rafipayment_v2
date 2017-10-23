<template>
  <div class="model-view">
    <div v-if="fetched">
      <header>
        <div class="meta">
          <legend>Tenant</legend>
          <h2>{{ $user.full_name }}</h2>
        </div>
        <div class="actions">
          <button class="link" @click="remove">Delete</button>
          <button class="primary">Edit</button>
        </div>
      </header>
      <div class="table">
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
              <dd>{{ $user.phone || '–'}}</dd>
            </dl>
          </div>
          <div class="grid__col grid__col--1-of-2">
          </div>
        </div>
      </div>

      <transfers-table v-if="fetched" :data="$user.payment" />
    </div>
    <loading v-else />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import User from '@/models/user'
import transfersTable from '@/views/transfers/table'

export default {
  name: 'superadmin',
  data() {
    return {
      fetched: false
    }
  },
  models: {
    user() {
      return new User({
        role: 'tenant',
        id: this.$route.params.id
      })
    }
  },
  async created() {
    await this.$user.fetch()
    this.fetched = true
  },
  methods: {
    remove() {
      const confirmed = confirm(`Are you sure you want to remove ${this.$user.full_name}?`)
      if (confirmed) {
        this.$user.destroy()
        .then(() => {
          this.$router.push('/superadmins')
        })
      }
    }
  },
  components: {
    transfersTable
  }
}
</script>
