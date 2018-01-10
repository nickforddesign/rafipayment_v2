<template>
  <div class="model-view">
    <header>
      <div class="meta">
        <legend>Admin</legend>
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

    <notifications-table v-if="fetched" :user="$user" />

    <name-modal v-if="modals.name" @close="closeModal('name')" :model="$user" :confirm="confirmModal" />

  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import app from '@/app'
import User from '@/models/user'

import NotificationsTable from '@/views/events/notifications/table'
import NameModal from '@/components/modals/user/name'

export default {
  name: 'admin',
  data() {
    return {
      fetched: false,
      modals: {
        name: false
      }
    }
  },
  models: {
    user() {
      return new User({
        role: 'admin',
        id: this.$route.params.id
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
          null,
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
    NameModal,
    NotificationsTable
  }
}
</script>
