<template>
  <div class="tr" @click.exact="goToModel" @click.ctrl="goToModelNew" @click.meta="goToModelNew">
    <cell>
      <router-link :to="`/events/${$event.id}`">
        {{ $event.created | moment('M/D/YYYY h:mma', true) }}
      </router-link>
    </cell>
    <cell>
      {{ $event.target.full_name }}
    </cell>
    <cell>
      {{ $event.data.template }}
    </cell>
    <cell>
      {{ $event.data.type || $event.type }}
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
      return this.$event.data.type === 'email'
        ? 'icon-desktop'
        : 'icon-mobile'
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
