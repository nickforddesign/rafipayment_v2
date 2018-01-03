<template>
  <div>
    <div class="model-view container sm">
      <header>
        <div class="meta">
          <legend>Account</legend>
          <h2>{{ $user.full_name }}</h2>
        </div>
      </header>

      <div class="box flexbox" @click="showModal('name')">
        <div class="icon">
          <avatar :initials="$user.initials" :color="$user.avatar_color" />
        </div>
        <div class="label flex">
          {{ $user.full_name }}
          <div class="description">
            Joined {{ $user.created | moment('M/D/YY') }}
          </div>
        </div>
        <arrow />
      </div>

      <div class="box flexbox" @click="showModal('email')">
        <div class="icon">
          <svg class="icon-email" viewBox="0 0 94 64">
            <path class="st0" d="M80.8,60.6H13.2c-5.5,0-10-4.5-10-10V13.1c0-5.5,4.5-10,10-10h67.6c5.5,0,10,4.5,10,10v37.5
              C90.8,56.1,86.3,60.6,80.8,60.6z"/>
            <polyline class="st1" points="90.8,15.1 47,51.6 3.2,15.1 "/>
          </svg>
        </div>
        <div class="label flex">
          {{ $user.email }}
        </div>
        <arrow />
      </div>

      <div class="box flexbox" @click="goToPayment">
        <div class="icon">
          <svg class="icon-money" viewBox="0 0 49.3 104.3">
            <path d="M4.3,79.6c0,0,8,8.8,21.2,8.8c9.9,0,17.7-6.1,17.7-15.6c0-22-40.9-16.9-40.9-41.1c0-9.7,8-18.9,20.6-20.3V0.7h4.9v10.7
              c11.9,0.5,18.5,7.3,18.5,7.3l-2.7,4.2c0,0-6.8-6.8-17.3-6.8C14.4,16,7.4,23.9,7.4,31.6c0,20.4,40.9,15.1,40.9,41
              c0,10.8-7.8,19.5-20.5,20.5v10.5h-4.9V93.1C8.7,92.2,1,83.4,1,83.4L4.3,79.6z"/>
          </svg>
        </div>
        <div class="label flex">
          Payment Settings
        </div>
        <arrow />
      </div>

      <div class="box flexbox" @click="showModal('password')">
        <div class="icon">
          <svg class="icon-lock" viewBox="0 0 94 116.3">
            <path d="M83.9,48.9h-3.7V35.1c0-18.8-15.3-34.2-34.2-34.2S11.9,16.2,11.9,35.1v13.9h-1.8c-5.1,0-9.2,4.1-9.2,9.2v48
              c0,5.1,4.1,9.2,9.2,9.2h73.9c5.1,0,9.2-4.1,9.2-9.2v-48C93.2,53.1,89,48.9,83.9,48.9z M15.6,35.1c0-16.8,13.7-30.5,30.5-30.5
              s30.5,13.7,30.5,30.5v13.9h-7.4V35.1C69.2,22.3,58.8,12,46.1,12S23,22.3,23,35.1v13.9h-7.4V35.1z M65.5,48.9H26.7V35.1
              c0-10.7,8.7-19.4,19.4-19.4s19.4,8.7,19.4,19.4V48.9z M89.5,106.2c0,3.1-2.5,5.5-5.5,5.5H10.1c-3.1,0-5.5-2.5-5.5-5.5v-48
              c0-3.1,2.5-5.5,5.5-5.5h73.9c3.1,0,5.5,2.5,5.5,5.5V106.2z M47,67.4c-4.1,0-7.4,3.3-7.4,7.4v14.8c0,4.1,3.3,7.4,7.4,7.4
              s7.4-3.3,7.4-7.4V74.8C54.4,70.7,51.1,67.4,47,67.4z M50.7,89.6c0,2-1.7,3.7-3.7,3.7s-3.7-1.7-3.7-3.7V74.8c0-2,1.7-3.7,3.7-3.7
              s3.7,1.7,3.7,3.7V89.6z"/>
          </svg>
        </div>
        <div class="label flex">
          Change Password
        </div>
        <arrow />
      </div>

      <div class="box flexbox logout" @click="logout">
        <div class="label flex">
          Logout
        </div>
        <arrow />
      </div>

    </div>

    <name-modal v-if="modals.name" @close="closeModal('name')" :model="$user" :confirm="fetch" />
    <password-modal v-if="modals.password" @close="closeModal('password')" :model="$user" :confirm="fetch" />
    <email-modal v-if="modals.email" @close="closeModal('email')" :model="$user" :confirm="fetch" :account="true" />
    <!-- <phone-modal v-if="modals.phone" @close="closeModal('phone')" :model="$user" :confirm="fetch" :account="true" /> -->
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import session from '@/session'
import User from '@/models/user'
import Avatar from '@/components/cards/avatar'
import Arrow from '@/components/icons/arrow-right'

import NameModal from '@/components/modals/user/name'
import EmailModal from '@/components/modals/user/email'
// import PhoneModal from '@/components/modals/user/phone'
import PasswordModal from '@/components/modals/password'

export default {
  name: 'account-tenant',
  data() {
    return {
      modals: {
        name: false,
        email: false,
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
    },
    goToPayment() {
      this.$router.push('/account/payment')
    }
  },
  components: {
    Arrow,
    Avatar,
    NameModal,
    EmailModal,
    PasswordModal
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/breakpoints';

.box {
  padding: 14px;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }
  
  .icon-arrow-right {
    flex: 1;
    width: 20px;
    text-align: right;
  }
}
.description {
  color: #aaa;
  font-size: 0.7em;
  line-height: 1em;
  margin-top: 3px;
}
.flex {
  line-height: 1.6em;
}
.icon {
  width: 30px;
  margin-right: 14px;
  color: white;
  text-align: center;

  svg {
    fill: currentColor;
  }

  .avatar {
    width: 100%;
  }

  .icon-money {
    width: 40%;
  }

  .icon-lock {
    width: 65%;
  }

  .icon-email {
    fill: none;
    width: 75%;
    stroke-width: 4;
    stroke: currentColor;
    padding-top: 4px;
  }
}
.logout {
  margin-top: 40px;
}

@media (max-width: $breakpoint-medium) {
  header {
    display: none;
  }
}
</style>