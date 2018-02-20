<template>
  <div>
    <header>
      <div class="meta">
        <h2>{{ $event.data.type | capitalize }} Notification</h2>
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
              <router-link :to="`/${$event.target.model}s/${$event.target.id}`">
                {{ $event.target.full_name }}
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
            <dt>Template</dt>
            <dd>{{ $event.data.template }}</dd>
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
        Notification Data
      </div>
      <div class="grid">
        <div class="grid__col grid__col--1-of-2" v-for="(value, key) in $event.data.template_data" :key="key" v-if="typeof value !== 'object'">
          <dl>
            <dt>{{ key }}</dt>
            <dd>{{ value }}</dd>
          </dl>
        </div>
        <div class="grid__col grid__col--1-of-2" v-for="(item, index) in $event.data.template_data.details" :key="index">
          <dl>
            <dt>{{ item.key }}</dt>
            <dd>{{ item.value }}</dd>
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
  name: 'event-notification',
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
