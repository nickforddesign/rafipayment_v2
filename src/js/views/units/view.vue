<template>
  <div class="model-view">
    <header>
      <div class="meta">
        <legend>Unit</legend>
        <h2>{{ $unit.address }}</h2>
      </div>
      <div class="actions">
        <button class="link" @click="remove">Delete</button>
        <button class="primary">Edit</button>
      </div>
    </header>
    <div class="table">
      <div class="header">
        Unit Information
      </div>
      <div class="grid">
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>Unit Name</dt>
            <dd>{{ $unit.name }}</dd>
          </dl>
        </div>
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>Property</dt>
            <dd>{{ $unit.property_name }}</dd>
          </dl>
        </div>
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>Beds</dt>
            <dd>{{ $unit.bed_count }}</dd>
          </dl>
        </div>
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>Beds</dt>
            <dd>{{ $unit.bed_count }}</dd>
          </dl>
        </div>
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>Square Footage</dt>
            <dd>{{ $unit.square_footage }}</dd>
          </dl>
        </div>
        <div class="grid__col grid__col--1-of-2">
        </div>
      </div>
    </div>
    <!-- <div class="actions">
      <button @click="remove">Delete</button>
    </div> -->
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Unit from '@/models/unit'

export default {
  name: 'unit',
  models: {
    unit() {
      return new Unit({
        id: this.$route.params.id
      })
    }
  },
  created() {
    this.$unit.fetch()
  },
  methods: {
    remove() {
      const confirmed = confirm(`Are you sure you want to remove ${this.$unit.address}?`)
      if (confirmed) {
        this.$unit.destroy()
        .then(() => {
          this.$router.push('/units')
        })
      }
    }
  }
}
</script>