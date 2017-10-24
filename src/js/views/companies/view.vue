<template>
  <div class="model-view">
    <header>
      <div class="meta">
        <legend>Company</legend>
        <h2>{{ $company.name }}</h2>
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
        <!-- <div class="grid__col grid__col--1-of-2">
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
        </div> -->
      </div>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Company from '@/models/company'

export default {
  name: 'company',
  models: {
    company() {
      return new Company({
        id: this.$route.params.id
      })
    }
  },
  created() {
    this.$company.fetch()
  },
  methods: {
    remove() {
      console.log('remove')
    }
  }
}
</script>
