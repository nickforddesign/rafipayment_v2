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

      <div v-if="!$user.password" class="actions">
        <button class="primary" @click="invite">Send Invite</button>
      </div>

      <leases-table v-if="fetched" :data="$user" :path="`tenants/${$user.id}/leases`" @add="showModal" />
      <lease-modal v-if="modal_visible" @close="closeModal" :confirm="confirmModal" :tenants="[$user]" />

      <transfers-table v-if="fetched" :data="$user.payment" :path="`tenants/${$user.id}/transfers`" />
      
    </div>
    <loading v-else />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import User from '@/models/user'
import leasesTable from '@/views/leases/table'
import leaseModal from '@/components/modals/lease'
import transfersTable from '@/views/transfers/table'

export default {
  name: 'tenant',
  data() {
    return {
      fetched: false,
      modal_visible: false
    }
  },
  models: {
    user() {
      return new User({
        role: 'tenant',
        id: this.$route.params.id
      }, {
        persist: true
      })
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      this.fetched = false
      await this.$user.fetch()
      this.fetched = true
    },
    async remove() {
      const confirmed = confirm(`Are you sure you want to remove ${this.$user.full_name}?`)
      if (confirmed) {
        await this.$user.destroy()
        this.$router.push('/superadmins')
      }
    },
    showModal() {
      this.modal_visible = true
    },
    closeModal() {
      this.modal_visible = false
    },
    confirmModal() {
      this.fetch()
    },
    async invite() {
      const response = await this.$request(`${this.$user.url}/invite`, {
        method: 'POST'
      })
      console.log(response)
    }
  },
  components: {
    leaseModal,
    leasesTable,
    transfersTable
  }
}
</script>

<style scoped lang="scss">
.actions {
  margin-bottom: 20px;
}
</style>
