<template>
  <modal @close="close" :confirm="validate">
    <h1 slot="header">Add Transfer</h1>
    <div slot="body">
      <field name="amount" :errors="errors">
        <currency v-model="amount" v-validate="'required'" />
      </field>
      <field name="source" :errors="errors">
        <select-menu v-if="funding_sources_fetched" v-model="source_funding_source" v-validate="'required'" data-vv-path="field_value" name="source">
          <option disabled value="">Please select one</option>
          <option 
            v-for="(funding_source, index) in funding_sources.models"
            :value="funding_source.id"
            :key="index"
            :label="funding_source.name">
            {{ funding_source.name }}
          </option>
        </select-menu>
        <loading type="input" v-else />
      </field>

      <field name="destination" :errors="errors">
        <select-menu v-if="tenants_fetched" v-model="destination_user" v-validate="'required'" data-vv-path="field_value" name="destination">
          <option disabled value="">Please select one</option>
          <option 
            v-for="(tenant, index) in tenants.models"
            :value="tenant.id"
            :key="index"
            :label="`${tenant.first_name} ${tenant.last_name}`">
            {{tenant.first_name}} {{tenant.last_name}}
          </option>
        </select-menu>
        <loading type="input" v-else />
      </field>
    </div>
  </modal>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Transfer from '@/models/transfer/new'
import User from '@/models/user'
import { Collection } from 'vue-collections'

const fundingSourcesCollection = new Collection({
  basePath: 'account/funding_sources'
})

const tenantsCollection = new Collection({
  basePath: 'tenants',
  model: User
})

export default {
  name: 'modal-transfer-add',
  props: {
    model: Object,
    confirm: Function
  },
  data() {
    return {
      tenants_fetched: false,
      funding_sources_fetched: false,
      // model data
      amount: '',
      source_funding_source: null,
      destination_user: null
    }
  },
  models: {
    transfer() {
      return new Transfer()
    }
  },
  computed: {
    funding_sources() {
      return fundingSourcesCollection
    },
    tenants() {
      return tenantsCollection
    }
  },
  created() {
    this.funding_sources.fetch()
      .then(() => {
        this.funding_sources_fetched = true
      })
    this.tenants.fetch()
      .then(() => {
        this.tenants_fetched = true
      })
  },
  methods: {
    close() {
      this.$emit('close')
    },
    validate() {
      return new Promise(async (resolve, reject) => {
        const passed = await this.$validator.validateAll()
        if (passed) {
          await this.confirmChange()
          resolve()
        } else {
          reject()
        }
      })
    },
    async confirmChange() {
      this.loading = true

      const data = {
        amount: this.amount,
        source_funding_source: this.source_funding_source,
        destination_user: this.destination_user
      }

      await this.$transfer.save(data)
      this.confirm()
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
