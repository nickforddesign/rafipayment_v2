<template>
  <div class="model-view">
    <div v-if="loaded">
      <header>
        <div class="meta">
          <legend>Account</legend>
          <h2>{{ $user.full_name }}</h2>
        </div>
        <div class="actions">
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
              <dd>{{ $user.phone | phone }}</dd>
            </dl>
          </div>
          <div class="grid__col grid__col--1-of-2">
          </div>
        </div>
      </div>
      <div class="actions free">
        <div>
          <button @click="showPasswordModal">Change Password</button>
        </div>
      </div>
      <div class="table" v-if="$user.role !== 'superadmin'">
        <div class="header">
          <div class="meta">
            Payment Methods
          </div>
          <div class="actions">
            <button class="small" @click="showPaymentModal">Add Payment Method</button>
          </div>
        </div>
        <table v-if="$user.funding_sources.length">
          <thead>
            <tr>
              <td>Name</td>
              <td>Status</td>
              <td>Created</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            <funding-source-row v-for="(model, index) in $user.funding_sources" :key="index" :model="model" />
          </tbody>
        </table>
        <empty v-else>
          <div slot="message">You don't have any payment methods yet</div>
          <button class="primary" slot="actions" @click="showPaymentModal">Add Payment Method</button>
        </empty>

        <funding-source-modal v-if="payment_modal_visible" @close="closePaymentModal" @complete="fetch" />
      </div>
      
      <div class="actions free">
        <div>
          <button @click="logout">Logout</button>
        </div>
      </div>

      <password-modal v-if="password_modal_visible" @close="closePasswordModal" :model="$user" />
    </div>
    <loading v-else />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import User from '@/models/user'
import passwordModal from '@/components/modals/password'
import fundingSourceModal from '@/components/modals/funding_source'

import fundingSourceRow from '@/views/funding_sources/row'

export default {
  name: 'account',
  data() {
    return {
      loaded: false,
      password_modal_visible: false,
      payment_modal_visible: false
    }
  },
  models: {
    user() {
      return new User(null, {
        name: 'profile',
        url: 'account/profile'
      })
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      await this.$user.fetch()
      this.loaded = true
    },
    logout() {
      this.$store.dispatch('logout')
    },
    showPasswordModal() {
      this.password_modal_visible = true
    },
    closePasswordModal() {
      this.password_modal_visible = false
    },
    showPaymentModal() {
      this.payment_modal_visible = true
    },
    closePaymentModal() {
      this.payment_modal_visible = false
    }
  },
  components: {
    passwordModal,
    fundingSourceModal,
    fundingSourceRow
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style lang="scss" scoped>
.actions.free {
  margin: 30px 0;

  & > div {
    margin-bottom: 10px;
  }
}
</style>
