<template>
  <div class="container x-sm">
    <h2>Who will be residing here?</h2>

    <button @click="previous" class="back-button">Back</button>

    <searchable :collection="collection" display="full_name" :model="User" @input="addTenant" v-model="selected" :omit="tenants" :focus="true" />

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
        <button class="link">Create New Tenant</button>
      </div>
      <div>
        <button class="primary" v-if="tenants.length > 0" @click="complete">Next</button>
      </div>
    </div>
    
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
import User from '@/models/user'

export default {
  name: 'lease-add--tenants',
  props: {
    models: Object
  },
  data() {
    return {
      selected: null,
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
      this.$emit('previous')
    }
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