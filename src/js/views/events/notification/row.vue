<template>
  <div class="tr" @click.stop="goToEvent">
    <cell>
      <router-link :to="`/events/${$event.id}`">
        {{ $event.created | moment('M/D/YYYY h:mma') }}
      </router-link>
    </cell>
    <cell>
      {{ $event.target.full_name }}
    </cell>
    <cell>
      {{ $event.data.type || $event.type }}
    </cell>
    <cell>
      {{ $event.data.template }}
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
    goToEvent() {
      this.$router.push(`/events/${this.$event.id}`)
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
