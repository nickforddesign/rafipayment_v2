<template>
  <div class="model-view">
    <div v-if="fetched">
      <header>
        <div class="meta">
          <legend>Tenant</legend>
          <h2>{{ $user.full_name }}</h2>
        </div>
        <div class="actions">
          <button class="link" @click="promptRemove">Delete</button>
          <button class="primary" @click="showModal('name')">Edit</button>
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

      <div v-if="!$user.password" class="actions">
        <button class="primary" @click="invite">Send Invite</button>
      </div>

      <edit-modal v-if="modals.name" @close="closeModal('name')" :model="$user" :confirm="confirmModal" />
      <lease-modal v-if="modals.lease" @close="closeModal('lease')" :confirm="confirmModal" :tenants="[$user]" />
      
      <leases-table v-if="fetched" :data="$user" :path="`tenants/${$user.id}/leases`" @add="showModal('lease')" />
      <transfers-table v-if="fetched" :data="$user.payment" :path="`transfers?filter_parties=${$user.id}`" />
      <notifications-table v-if="fetched" :user="$user" />
      <auth-events-table v-if="fetched" :user="$user" />
      
    </div>
    <loading v-else />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import app from '@/app'
import User from '@/models/user'
import LeasesTable from '@/views/leases/table'
import LeaseModal from '@/components/modals/lease'
// import NameModal from '@/components/modals/user/name'
import EditModal from '@/components/modals/user/edit'
// import EmailModal from '@/components/modals/user/email'
import NotificationsTable from '@/views/events/notification/table'
import AuthEventsTable from '@/views/events/authentication/table'
import TransfersTable from '@/views/transfers/table'

export default {
  name: 'tenant',
  data() {
    return {
      fetched: false,
      modals: {
        lease: false,
        name: false,
        email: false
      }
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
    promptRemove() {
      app.confirm(
        `Are you sure you want to remove ${this.$user.full_name}?`,
        this.remove,
        'Delete user'
      )
    },
    async remove() {
      await this.$user.destroy()
      this.$router.push('/tenants')
    },
    showModal(modal) {
      this.modals[modal] = true
    },
    closeModal(modal) {
      this.modals[modal] = false
    },
    async confirmModal() {
      await this.fetch()
    },
    invite() {
      this.$request(`${this.$user.url}/invite`, {
        method: 'POST'
      })
      .then(() => {
        app.alert(
          `Invitation email has been sent to ${this.$user.email}`,
          this.fetch,
          'Invitation sent',
          'OK',
          'success'
        )
      })
      .catch(() => {
        app.alert(
          `Failed to send invite to ${this.$user.email}`,
          null,
          'Invitation failed',
          'OK',
          'danger'
        )
      })
    }
  },
  components: {
    LeaseModal,
    LeasesTable,
    EditModal,
    // EmailModal,
    NotificationsTable,
    AuthEventsTable,
    TransfersTable
  }
}
</script>

<style scoped lang="scss">
.actions {
  margin-bottom: 20px;
}
</style>
