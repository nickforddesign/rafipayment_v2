<template>
  <div class="model-view">
    <header>
      <div class="meta">
        <legend>Company</legend>
        <h2>{{ $company.name }}</h2>
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
            <dt>Company Name</dt>
            <dd>{{ $company.name }}</dd>
          </dl>
        </div>
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>Business Type</dt>
            <dd>{{ $company.business_type | capitalize }}</dd>
          </dl>
        </div>
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>Created</dt>
            <dd>{{ $company.created | moment('MM/DD/YYYY h:mm:ssa') }}</dd>
          </dl>
        </div>
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>Updated</dt>
            <dd>{{ $company.updated | moment('MM/DD/YYYY h:mm:ssa') }}</dd>
          </dl>
        </div>
        <!-- <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>Classification</dt>
            <dd>{{ $company.business_classification }}</dd>
          </dl>
        </div> -->
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>Address</dt>
            <dd>{{ $company.address1 }}</dd>
          </dl>
        </div>
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>Address 2</dt>
            <dd>{{ $company.address2 }}</dd>
          </dl>
        </div>
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>City</dt>
            <dd>{{ $company.city }}</dd>
          </dl>
        </div>
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>State</dt>
            <dd>{{ $company.state }}</dd>
          </dl>
        </div>
      </div>
    </div>

    <div class="table-container">
      <div class="header">
        Account Representative
      </div>
      <div class="grid">
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>First Name</dt>
            <dd>{{ $company.first_name }}</dd>
          </dl>
        </div>
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>Last Name</dt>
            <dd>{{ $company.last_name }}</dd>
          </dl>
        </div>
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>DOB</dt>
            <dd>{{ $company.date_of_birth | moment('MM/DD/YYYY') }}</dd>
          </dl>
        </div>
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>Email</dt>
            <dd>{{ $company.email }}</dd>
          </dl>
        </div>
      </div>
    </div>

    <admins-table :path="`admins?filter_company=${$company.id}`" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import app from '@/app'
import Company from '@/models/company'
import AdminsTable from '@/views/admins/table'

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
    promptRemove() {
      app.confirm(
        `Are you sure you want to delete ${this.$company.name}?`,
        this.remove,
        'Delete company'
      )
    },
    async remove() {
      await this.$company.destroy()
      this.$router.push(`/companies`)
    }
  },
  components: {
    AdminsTable
  }
}
</script>
