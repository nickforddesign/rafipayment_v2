<template>
  <div class="container x-sm">
    <h2>Who will be residing here?</h2>

    <button @click="previous" class="back-button">Back</button>

    <div v-if="!this.new">
      <searchable :collection="collection" display="full_name" :model="User" @input="addTenant" v-model="selected" :omit="tenants" />

      <ul>
        <li v-for="(tenant, index) in tenants" :key="index">
          <dl>
            <dt>
              <span>{{ tenant.full_name }}</span>
            </dt>
            <dd>
              <button @click="remove(index)" class="small">Remove</button>
            </dd>
          </dl>
        </li>
      </ul>

      <div class="actions">
        <div>
          <button class="link" @click="newTenant">Create New Tenant</button>
        </div>
        <div>
          <button class="primary" v-if="tenants.length > 0" @click="complete">Next</button>
        </div>
      </div>
    </div>

    <new-tenant v-else />
    
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
import User from '@/models/user'

import newTenant from './new'

export default {
  name: 'lease-add--tenants',
  props: {
    models: Object
  },
  data() {
    return {
      selected: null,
      new: false,
      tenants: []
    }
  },
  computed: {
    User() {
      return User
    }
  },
  collection() {
    return new Collection({
      basePath: 'tenants',
      model: User
    })
  },
  created() {
    if (this.models.tenants) {
      this.models.tenants = null
    }
    this.fetch()
  },
  methods: {
    fetch() {
      this.$collection.fetch()
    },
    newTenant() {
      this.new = true
    },
    addTenant(val) {
      this.tenants.push(val)
      this.$nextTick(() => {
        this.selected = {}
      })
    },
    remove(index) {
      this.tenants.splice(index, 1)
    },
    complete() {
      this.models.tenants = this.tenants
      this.next()
    },
    next() {
      this.$emit('next')
    },
    previous() {
      if (this.new) {
        this.new = false
      } else {
        this.$emit('previous')
      }
    }
  },
  components: {
    newTenant
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

ul {
  li {
    dl {
      width: 100%;
    }
  }
}

.actions {
  text-align: center;

  div {
    margin-bottom: 14px;
  }
}
</style>