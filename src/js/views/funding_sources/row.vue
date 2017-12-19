<template>
  <div class="tr" @click="goToModel">
    <cell>
      <div class="flexbox">
        <div class="flex">
          {{ model.name }}
        </div>
        <div v-if="is_primary" class="solid primary-label">
          <span class="flag success">Primary</span>
        </div>
      </div>
    </cell>
    <cell>
      <span :class="['text-color', status_class]">
        {{ model.status }}
      </span>
    </cell>
    <cell>{{ model.created | moment('M/D/YY') }}</cell>
    <cell className="text-right actions">
      <button class="small" @click.stop="promptPrimary" v-if="!(is_balance || is_primary)">Set as Primary</button>
      <button class="small danger" @click.stop="promptRemove" v-if="!(is_balance || is_primary)">Remove</button>
      <span v-else>–</span>
    </cell>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { path } from 'ramda'
import app from '@/app'
import FundingSource from '@/models/funding_source'

export default {
  name: 'row',
  props: ['model'],
  models: {
    funding_source() {
      return new FundingSource(this.model)
    }
  },
  computed: {
    $user() {
      return this.$parent.$parent.$parent.$user
    },
    is_balance() {
      return this.$funding_source.type === 'balance'
    },
    is_primary() {
      const primary_id = path(['payment', 'primary_funding_source'], this.$user)
      return this.$funding_source.id === primary_id
    },
    status_class() {
      const map = {
        verified: 'success',
        unverified: 'warning'
      }
      return map[this.$funding_source.status]
    }
  },
  methods: {
    goToModel() {
      this.$router.push(`/funding_sources/${this.$funding_source.id}`)
    },
    promptRemove() {
      app.confirm(
        `Are you sure you want to remove ${this.$funding_source.name}?`,
        this.remove,
        'Delete bank account'
      )
    },
    async remove() {
      await this.$funding_source.destroy()
      this.$emit('refetch')
    },
    promptPrimary() {
      app.confirm(
        `Are you sure you want to change your primary payment method to ${this.$funding_source.name}?`,
        this.setPrimary,
        'Change primary account',
        ['Yes', 'No'],
        'neutral'
      )
    },
    async setPrimary() {
      await this.$request('account/funding_sources', {
        method: 'put',
        body: {
          funding_source: this.model.id
        }
      })
      await this.$user.fetch()
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.primary-label {
  margin-left: 10px;
}
</style>

