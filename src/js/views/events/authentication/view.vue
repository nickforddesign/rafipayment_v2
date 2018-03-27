<template>
  <div class="model-view">
    <header>
      <div class="meta">
        <h2>Authentication Event <component :is="icon" /></h2>
      </div>
    </header>
    <div class="table-container">
      <div class="header">
        Basic Information
      </div>
      <div class="grid">
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>Date</dt>
            <dd>{{ $event.created | moment('M/D/YY h:mma') }}</dd>
          </dl>
        </div>
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>Type</dt>
            <dd>{{ $event.data.type }}</dd>
          </dl>
        </div>
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>Source</dt>
            <dd>
              <router-link :to="`/${$event.source.model}s/${$event.source.id}`">
                {{ $event.source.full_name }}
              </router-link>
            </dd>
          </dl>
        </div>
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>Role</dt>
            <dd>{{ $event.source.model }}</dd>
          </dl>
        </div>
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>Success</dt>
            <dd :class="['text-color', status_class]">{{ $event.success }}</dd>
          </dl>
        </div>
      </div>
    </div>

    <div class="table-container">
      <div class="header">
        Client Information
      </div>
      <div class="grid">
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>Rafi Client</dt>
            <dd>{{ $event.source.rafipayment_client }}</dd>
          </dl>
        </div>
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>Device Family</dt>
            <dd>{{ $event.source.user_agent.device_family }}</dd>
          </dl>
        </div>
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>OS Family</dt>
            <dd>{{ $event.source.user_agent.os_family }}</dd>
          </dl>
        </div>
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>OS Version</dt>
            <dd>{{ $event.source.user_agent.os_version }}</dd>
          </dl>
        </div>
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>Browser Family</dt>
            <dd>{{ $event.source.user_agent.browser_family }}</dd>
          </dl>
        </div>
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>Browser Version</dt>
            <dd>{{ $event.source.user_agent.browser_version }}</dd>
          </dl>
        </div>
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>IP Address</dt>
            <dd>{{ $event.source.ip_address }}</dd>
          </dl>
        </div>
      </div>
    </div>

    <div class="table-container" v-if="$event.error.error">
      <div class="header">
        Error Information
      </div>
      <div class="grid">
        <div class="grid__col grid__col--1-of-2">
          <dl>
            <dt>Error Message</dt>
            <dd>{{ $event.error.error }}</dd>
          </dl>
        </div>
        <div class="grid__col grid__col--1-of-2" v-for="(error, key) in $event.error.data" :key="key">
          <dl>
            <dt>{{ key }}</dt>
            <dd>{{ error }}</dd>
          </dl>
        </div>
      </div>
    </div>
    <google-map v-if="ip_fetched" :markers="[marker]" />
    <!-- <pre>{{$event}}</pre> -->
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import IconDesktop from '@/components/icons/desktop'
import IconMobile from '@/components/icons/mobile'

export default {
  name: 'event-authentication',
  props: {
    $event: Object
  },
  data() {
    return {
      ip_fetched: false
    }
  },
  mounted() {
    if (this.$event.source.ip_address) {
      this.fetchIp()
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
    async fetchIp() {
      const response = await this.$request(`https://ipapi.co/${this.$event.source.ip_address}/json/`, {
        headers: false
      })
      this.marker = {
        geometry: {
          location: {
            lat: response.latitude,
            lng: response.longitude
          }
        }
      }
      this.ip_fetched = true
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
  width: 18px;
  margin-left: 7px;
}
</style>
