<template>
  <div class="model-view">
    <header>
      <div class="meta">
        <h2>Authentication Event</h2>
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
    <!-- <pre>{{$event}}</pre> -->
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'event-authentication',
  props: {
    $event: Object
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

<style scoped lang="scss">

</style>
