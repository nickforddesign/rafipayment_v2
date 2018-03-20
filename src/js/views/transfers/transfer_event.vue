<template>
  <div class="event text-center" @click="toggle">
    <component v-if="short_name" :is="`${short_name}-status`" :transfer="transfer" />
    <avatar v-else :initials="$company.name[0]" />
    <div class="label">
      <div v-if="user">
        {{ $user.full_name }}
      </div>
      <div v-else>
        {{ $company.name }}
      </div>
      <div class="status">
        {{ short_name || 'failed' | capitalize }}
      </div>
    </div>
    <collapse :expanded="!!Object.keys(events).length && expanded">
      <div class="details">
        <div class="detail" v-for="(date, key) in events" :key="key">
          <span class="key">{{ getShortName(key) | capitalize }}:</span> {{ date | moment }}
        </div>
      </div>
    </collapse>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import User from '@/models/user'
import Company from '@/models/company'

import Avatar from '@/components/cards/avatar'

import PendingStatus from './statuses/pending'
import CompletedStatus from './statuses/completed'
import CancelledStatus from './statuses/cancelled'
import CreatedStatus from './statuses/created'
import FailedStatus from './statuses/failed'
import ErrorStatus from './statuses/error'

export default {
  name: 'transfer-event',
  props: {
    type: {
      type: String,
      default: ''
    },
    transfer: Object,
    user: Object,
    company: Object
  },
  data() {
    return {
      expanded: false
    }
  },
  models: {
    user() {
      return new User(this.user)
    },
    company() {
      return new Company(this.company)
    }
  },
  computed: {
    short_name() {
      const status = this.transfer[`${this.path_leader}status`]
      return status
        ? this.getShortName(status)
        : ''
    },
    path_leader() {
      return this.type
      ? `${this.type}_`
      : ''
    },
    status_dates_path() {
      return `${this.path_leader}status_dates`
    },
    events() {
      return this.transfer[this.status_dates_path]
    }
  },
  methods: {
    toggle() {
      this.expanded = !this.expanded
    },
    getShortName(status) {
      return status.split('_').pop()
    }
  },
  components: {
    Avatar,
    PendingStatus,
    CompletedStatus,
    CancelledStatus,
    CreatedStatus,
    FailedStatus,
    ErrorStatus
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

$width: 160px;
$dark-background: darken($color-background-dark, 10%);

.event {
  position: relative;
  display: inline-block;
  width: $width;
  margin-bottom: 20px;
  vertical-align: top;
  text-align: center;
  user-select: none;

  &:hover {
    cursor: pointer;
  }

  &:not(:last-child) {
    &:after {
      content: '';
      display: inline-block;
      position: absolute;
      right: -36px;
      top: 60px;
      width: 10px;
      height: 10px;
      margin: 0 20px;
      border-bottom: 2px solid $color-grey-70;
      border-right: 2px solid $color-grey-70;
      transform: rotate(-45deg) translateY(-100%);
    }
  }
}

.label {
  margin-top: 20px;
}

.avatar {
  display: inline-block;
  width: 56px;
}

.status {
  display: inline-block;
  background: $dark-background;
  margin-top: 6px;
  padding: 4px 7px;
  border-radius: 3px;
}

.details {
  padding: 10px;
  margin-top: 10px;
  background: $dark-background;
  border-radius: 3px;
  font-size: 0.85em;

  .detail {
    padding: 3px 0;

    .key {
      color: darken($color-text-light, 30%);
    }
  }
}
</style>
