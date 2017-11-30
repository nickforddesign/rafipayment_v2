<template>
  <transition name="fade">
    <div class="alert-container" @click.self="cancel">
      <div class="alert" @keyup.esc="cancel" @keyup.enter="validate">
        <loading v-if="alert_loading" />
        <!-- <div class="alert-header" v-if="has_header">
          <slot name="header">
            <h1>{{ alert.title || 'Please confirm' }}</h1>
          </slot>
        </div> -->
        <div class="alert-body text-center">
          <slot name="header">
            <h1>{{ alert.title || 'Please confirm' }}</h1>
          </slot>
          <slot name="body">
            <p>{{ alert.message }}</p>
          </slot>
        </div>
        <div class="alert-footer">
          <slot name="actions">
            <button
              v-if="has_cancel"
              type="button"
              @click="cancel">
              {{ cancel_label }}
            </button>
            <button
              type="button"
              ref="default"
              :class="[confirm_class]"
              @click="validate">
              {{ confirm_label }}
            </button>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'alert',
  data() {
    return {
      alert_loading: false
    }
  },
  mounted() {
    if (this.$refs.default) {
      console.log(this.$refs.default)
      this.$refs.default.focus()
    }
    document.body.classList.add('lock')
  },
  beforeDestroy() {
    document.body.classList.remove('lock')
  },
  computed: {
    has_header() {
      return this.alert.title
    },
    has_cancel() {
      return this.alert.button_labels
    },
    confirm_class() {
      return this.alert.confirm_class
      // return this.has_cancel
      //   ? 'danger'
      //   : 'primary'
    },
    confirm_label() {
      return this.has_cancel
        ? this.alert.button_labels[0] || 'Ok'
        : this.alert.button_label
    },
    cancel_label() {
      return this.has_cancel
        ? this.alert.button_labels[1] || 'Cancel'
        : null
    },
    alert() {
      return this.$store.getters['app:alert']
    }
  },
  methods: {
    closeAlert() {
      this.$store.dispatch('alert_hide')
    },
    async validate(e) {
      this.alert_loading = true
      try {
        if (this.alert.callback) {
          await this.alert.callback()
        }
        this.closeAlert()
      } catch (err) {
        console.warn(err)
      } finally {
        this.alert_loading = false
      }
    },
    cancel() {
      this.closeAlert()
    }
  }
}
</script>

<style lang="scss">
@import '~%/colors';
@import '~%/mixins';

.alert-container {
  @include fixed_fill;
  z-index: 9998;
  background: rgba(0,0,0, 0.6);

  .alert {
    @include fixed_center;
    width: 440px;
    max-width: 90%;
    max-height: 80%;
    background: $color-alert-background;
    border-radius: 4px;
    box-shadow: 0 2px 11px rgba(0, 0, 0, 0.9);
    z-index: 2;
    overflow: hidden;

    .alert-header {
      padding: 0 15px;
      border-bottom: 1px solid #ddd;
      text-align: center;
    }

    .alert-body {
      position: relative;
      padding: 32px 16px;
      max-height: calc(80vh - 140px);
      overflow-x: hidden;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }

    .alert-footer {
      display: flex;
      position: relative;
      width: 100%;
      // border-top: 1px solid #ddd;
      // padding: 10px;
      overflow: hidden;
      text-align: right;

      button {
        padding: 0.8em 1em;
        flex: 1 1 0;
        border-radius: 0;
      }
    }

    h1 {
      // margin: 10px 0;
      margin: 0;
      font-size: 1.3em;
      font-weight: 500;
      line-height: 2.5em;
      text-transform: capitalize;
    }

    p {
      margin: 7px 0;
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;

  .alert {
    transition: margin .2s;
    margin-top: 0;
  }
}
.fade-enter, .fade-leave-to {
  opacity: 0;

  .alert {
    margin-top: -20px;
  }
}
</style>
