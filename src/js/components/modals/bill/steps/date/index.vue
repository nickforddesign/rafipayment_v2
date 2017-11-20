<template>
  <div>
    <field name="due date">
      <date-picker v-model="due_date" v-validate="'required'" name="due date" />
    </field>
    
    <button @click="next">Next</button>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'bill-add--date',
  props: ['models'],
  data() {
    return {
      due_date: null
    }
  },
  methods: {
    next() {
      this.models.bill.due_date = this.due_date
      this.complete()
    },
    complete() {
      this.$emit('next')
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">

</style>