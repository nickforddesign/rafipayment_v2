<template>
  <div class="model-view">
    <div v-if="loaded">
      <header>
        <div class="meta">
          <legend>Account</legend>
          <h2>{{ $user.full_name }}</h2>
        </div>
        <div class="actions">
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
              <dd>
                <div class="flexbox">
                  <span class="flex">{{ $user.email }}</span>
                  <div class="actions solid">
                    <button class="x-small" @click="showModal('email')">Edit</button>
                  </div>
                </div>
              </dd> 
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
              <dd>{{ $user.phone | phone }} <button class="x-small" @click="showModal('phone')">Edit</button></dd>
            </dl>
          </div>
          <div class="grid__col grid__col--1-of-2">
          </div>
        </div>
      </div>
      <div class="actions free">
        <div>
          <button @click="showModal('password')">Change Password</button>
        </div>
      </div>

      <div class="actions free">
        <div>
          <button @click="logout">Logout</button>
        </div>
      </div>
      
      <name-modal v-if="modals.name" @close="closeModal('name')" :model="$user" :confirm="fetch" />
      <password-modal v-if="modals.password" @close="closeModal('password')" :model="$user" :confirm="fetch" />
      <email-modal v-if="modals.email" @close="closeModal('email')" :model="$user" :confirm="fetch" :account="true" />
      <phone-modal v-if="modals.phone" @close="closeModal('phone')" :model="$user" :confirm="fetch" :account="true" />
    </div>
    <loading v-else />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import session from '@/session'
import User from '@/models/user'

import NameModal from '@/components/modals/user/name'
import EmailModal from '@/components/modals/user/email'
import PhoneModal from '@/components/modals/user/phone'
import PasswordModal from '@/components/modals/password'

export default {
  name: 'account-admin',
  data() {
    return {
      loaded: false,
      modals: {
        name: false,
        email: false,
        phone: false,
        password: false
      }
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
      session.logout()
    },
    showModal(name) {
      this.modals[name] = true
    },
    closeModal(name) {
      this.modals[name] = false
    }
  },
  components: {
    NameModal,
    EmailModal,
    PhoneModal,
    PasswordModal
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
