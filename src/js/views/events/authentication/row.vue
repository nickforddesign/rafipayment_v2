<template>
  <div class="tr" @click="showUA">
    <cell>
      {{ $event.created | moment('M/D/YY h:mma') }}
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
    showUA() {
      app.alert(
        this.$event.source.user_agent,
        null,
        'User Agent'
      )
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
