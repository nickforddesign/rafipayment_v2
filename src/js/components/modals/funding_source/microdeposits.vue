<template>
  <modal @close="close" :confirm="validate">
    <h1 slot="header">Confirm Microdeposits</h1>
    <div slot="body">
      <div class="microdeposits-form">
        <field name="amount 1">
          $
          <input type="text" value="0" class="mock" disabled>
          .
          <number @next="next" v-model="amount1a" maxlength="1" placeholder="0" name="tab-focus-1" :wrap="true" ref="default"></number>
          <number @next="next" v-model="amount1b" maxlength="1" placeholder="0" name="tab-focus-2" :wrap="true"></number>
        </field>
        <field name="amount 2">
          $
          <input type="text" value="0" class="mock" disabled>
          .
          <number @next="next" v-model="amount2a" maxlength="1" placeholder="0" name="tab-focus-3" :wrap="true"></number>
          <number @next="next" v-model="amount2b" maxlength="1" placeholder="0" name="tab-focus-4" :wrap="true"></number>
        </field>
      </div>
    </div>
  </modal>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { sleep } from '@/utils'

export default {
  name: 'modal-microdeposits',
  props: {
    model: Object,
    confirm: Function
  },
  data() {
    return {
      amount1a: null,
      amount1b: null,
      amount2a: null,
      amount2b: null
    }
  },
  created() {
    this.name = this.model.name
  },
  computed: {
    microdeposits_array() {
      const a = this.amount1a.toString()
      const b = this.amount1b.toString()
      const c = this.amount2a.toString()
      const d = this.amount2b.toString()

      return [a + b, c + d]
    },
    microdeposits() {
      let output = {}
      this.microdeposits_array.map((input, index) => {
        output[`amount_${++index}`] = parseFloat('0.' + input)
      })
      return output
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    async next(e, component) {
      const name = component.$el.querySelector('input').getAttribute('name')
      const index = parseInt(name.split('tab-focus-')[1])
      const next_index = index + 1
      const $next_input = this.$el.querySelector(`input[name="tab-focus-${next_index}"]`)

      await sleep(10)
      if ($next_input) {
        $next_input.focus()
      } else {
        this.$el.querySelector('.confirm').focus()
      }
    },
    validate() {
      this.errors.clear()
      return new Promise((resolve, reject) => {
        this.validateInputs()
          .then(() => {
            this.confirmMicrodeposits()
            .then((res) => {
              resolve()
              this.confirm()
            })
            .catch((err) => {
              reject(err)
            })
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    validateInputs() {
      return new Promise((resolve, reject) => {
        const inputs = this.microdeposits_array

        inputs.map((input, index) => {
          this.validateInput(input, index)
        })
        if (this.errors.any()) {
          reject()
        } else {
          resolve()
        }
      })
    },
    validateInput(input, _index) {
      const index = _index + 1
      if (input.length !== 2) {
        this.errors.add(
          `input ${index}`,
          'Please enter a valid amount',
          'required'
        )
      }
      if (+input > 12) {
        this.errors.add(
          `input ${index}`,
          'Microdeposits must be under 12 cents',
          'max_value'
        )
      }
    },
    confirmMicrodeposits() {
      const body = this.microdeposits

      const request = this.model.save(body, {
        path: 'microdeposits',
        diff: false
      })

      request.then((response) => {
        // app.alert(
        //   'Thank you for verifying your bank account!',
        //   null,
        //   'Verified'
        // )
      })
      .catch(() => {
        // app.alert(
        //   'Incorrect microdeposit amounts',
        //   null,
        //   'Verification Failed'
        // )
      })
      return request
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style lang="scss">
$input-width: 44px;
$input-font-size: 3rem;
$input-line-height: 3.5rem;
$input-padding: 5px;
$input-text-align: center;

.microdeposits-form {
  .mock {
    width: $input-width;
    font-size: $input-font-size;
    text-align: $input-text-align;
    padding: $input-padding
  }

  .number-container {
    display: inline-block;
    width: $input-width;
    margin-left: 4px;

    input {
      display: block;
      width: 100%;
      font-size: $input-font-size;
      line-height: $input-line-height;
      text-align: $input-text-align;
      padding: $input-padding
    }
  }
}
</style>
