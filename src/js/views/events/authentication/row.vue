<template>
  <div class="tr" @click.exact="goToModel" @click.ctrl="goToModel" @click.meta="goToModelNew">
    <cell>
      <router-link :to="`/events/${$event.id}`">
        {{ $event.created | moment('M/D/YY h:mma') }}
      </router-link>
    </cell>
    <cell>
      {{ $event.source.full_name || '–' }}
    </cell>
    <cell>
      {{ $event.data.type || $event.type }}
    </cell>
    <cell>
      {{ $event.source.ip_address }}
    </cell>
    <cell>
      {{ $event.source.rafipayment_client }}
    </cell>
    <cell>
      <component :is="icon" />
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
import IconDesktop from '@/components/icons/desktop'
import IconMobile from '@/components/icons/mobile'
import { smartClick } from '@/utils'

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
    },
    icon() {
      return this.$event.source.user_agent.device_family && (this.$event.source.user_agent.device_family === 'PC'
        ? 'icon-desktop'
        : 'icon-mobile')
    }
  },
  methods: {
    goToModel(e) {
      smartClick(e, () => this.$router.push(`/events/${this.$event.id}`))
    },
    goToModelNew(e) {
      smartClick(e, () => window.open(`/events/${this.$event.id}`))
    }
  },
  components: {
    IconDesktop,
    IconMobile
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.icon {
  width: 20px;
}
</style>
