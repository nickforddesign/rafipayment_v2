<template>
  <div class="container x-sm">
    <h2>Are there any additional fees / credits?</h2>

    <div v-if="charges.length">
      <legend>Charges</legend>

      <div class="box" v-for="(charge, index) in charges" :key="index">
        <field name="amount" :errors="errors">
          <currency v-model="charge.amount" />
        </field>
        <field name="type">
          <input type="radio" :id="`recurring-${index}`" :name="`type-${index}`" value="recurring" v-model="charge.type">
          <label :for="`recurring-${index}`">Recurring</label>
          <input type="radio" :id="`scheduled-${index}`" :name="`type-${index}`" value="scheduled" v-model="charge.type">
          <label :for="`scheduled-${index}`">Scheduled</label>
        </field>
        <field v-if="charge.type === 'scheduled'" name="date">
          <input type="date" v-model="charge.date" v-validate="'required'">
        </field>
      </div>
    </div>

    {{ charges }}

    <div class="actions">
      <div>
        <button class="link" @click="addCharge">Add Charge</button>
      </div>
      <div>
        <button class="primary" @click="complete">Next</button>
      </div>
    </div>
    
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'lease-add--charges',
  props: {
    models: Object
  },
  data() {
    return {
      charges: []
    }
  },
  methods: {
    addCharge() {
      this.charges.push({
        type: 'recurring',
        amount: ''
      })
    },
    complete(model) {
      const data = {
        charges: this.charges
      }
      this.models.lease.set(data)
      this.next()
    },
    next() {
      this.$emit('next')
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
