<template>
  <div class="tr" @click="showData">
    <cell>
      {{ $event.created | moment('M/D/YY h:mma') }}
    </cell>
    <cell>
      {{ $event.source.full_name }}
    </cell>
    <cell>
      {{ $event.data.type || $event.type }}
    </cell>
    <cell>
      {{ $event.source.rafipayment_client }}
    </cell>
    <cell>
      {{ $event.source.ip_address }}
    </cell>
    <cell>
      <span :class="['text-color', status_class]">
        {{ $event.success }}
      </span>
    </cell>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import app from '@/app'
import UserEvent from '@/models/event'

export default {
  name: 'row',
  props: ['model'],
  models: {
    event() {
      return new UserEvent(this.model)
    }
  },
  computed: {
    status_class() {
      return this.$event.success
        ? 'success'
        : 'danger'
    }
  },
  methods: {
    showData() {
      let message = this.$event.source.user_agent
      if (this.$event.error.error) {
        message += `, Error: ${this.$event.error.message}`
      }
      app.alert(
        message,
        null,
        'More Info'
      )
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
