<template>
  <div class="model-view">
    <header>
      <div class="meta">
        <legend>Property</legend>
        <h2>{{ $property.full_name }}</h2>
      </div>
      <div class="actions">
        <button class="primary">Edit</button>
      </div>
    </header>
    <div class="table">
      <div class="header">
        Property Information
      </div>
      <div class="grid">
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>Address</dt>
            <dd>{{ $property.address }}</dd>
          </dl>
        </div>
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>Name</dt>
            <dd>{{ $property.name }}</dd>
          </dl>
        </div>
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>Units</dt>
            <dd></dd>
          </dl>
        </div>
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>Vacancies</dt>
            <dd></dd>
          </dl>
        </div>
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>Bank Account</dt>
            <dd></dd>
          </dl>
        </div>
        <div class="grid__col grid__col--1-of-2">
        </div>
      </div>
    </div>
    <div class="actions">
      <button @click="remove">Delete</button>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Property from '@/models/property'

export default {
  name: 'property',
  models: {
    property() {
      return new Property({
        id: this.$route.params.id
      })
    }
  },
  created() {
    this.$property.fetch()
  },
  methods: {
    remove() {
      const confirmed = confirm(`Are you sure you want to remove ${this.$property.address}?`)
      if (confirmed) {
        this.$property.destroy()
        .then(() => {
          this.$router.push('/properties')
        })
      }
    }
  }
}
</script>
