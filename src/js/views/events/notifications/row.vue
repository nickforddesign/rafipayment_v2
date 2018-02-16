<template>
  <div class="tr">
    <cell>
      {{ $event.created | moment('M/D/YYYY h:mm:ssa') }}
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
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
