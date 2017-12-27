<template>
  <transition name="fade">
    <div :class="['modal-container', type_class]" @click.self="close">
      <div class="modal" @keyup.esc="handleEscape" @keyup.enter="handleEnter">
        <loading v-if="loading"></loading>
        <div class="modal-header">
          <div class="actions">
            <button type="button" class="close" @click="cancel">
              {{ cancel_label }}
            </button>
            <button class="confirm neutral" @click="validate" v-if="has_confirm">
              {{ confirm_label }}
            </button>
          </div>

          <slot name="header">
            <h1>Please confirm</h1>
          </slot>
        </div>
        <div class="modal-body">
          <slot name="body">test</slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { path } from 'ramda'

export default {
  name: 'modal',
  props: {
    confirm: Function,
    keywatch: {
      type: Boolean,
      default: true
    },
    full: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false
    }
  },
  beforeMount() {
    document.body.classList.add('modal-visible')
  },
  mounted() {
    try {
      const default_focus = path(['$refs', 'default'], this.$parent)
      if (default_focus) {
        default_focus.focus()
      }
    } catch (error) {
      console.warn(error)
    }
  },
  beforeDestroy() {
    document.body.classList.remove('modal-visible')
  },
  computed: {
    has_confirm() {
      return this.confirm !== undefined
    },
    cancel_label() {
      return 'Cancel'
    },
    confirm_label() {
      return 'OK'
    },
    type_class() {
      if (this.full) {
        return 'full'
      }
    }
  },
  methods: {
    handleEnter() {
      if (this.keywatch) {
        this.validate()
      }
    },
    handleEscape() {
      if (this.keywatch) {
        this.close()
      }
    },
    async validate(e) {
      this.loading = true
      try {
        if (this.confirm) {
          await this.confirm()
        }
        this.close()
      } catch (err) {
        console.warn(err)
      } finally {
        this.$emit('complete')
        this.loading = false
      }
    },
    cancel() {
      this.close()
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
@import '~%/colors';
@import '~%/mixins';
@import '~%/breakpoints';

.modal-container {
  @include fixed_fill;
  z-index: 9999;
  background: rgba(0,0,0, 0.6);

  .modal {
    @include fixed_fill;
    background: $color-modal-background;
    box-shadow: 0 1px 4px rgba(0,0,0, 0.3);
    z-index: 2;
    font-size: 1rem;
    overflow: hidden;

    .modal-header {
      height: 70px;
      padding: 24px;
      border-bottom: 1px solid #ddd;
      text-align: center;
      font-size: 0.9em;

      h1 {
        position: absolute;
        top: 22px;
        left: 0;
        width: 100%;
        margin: 0;
        font-size: 1em;
        line-height: 2.5em;
      }
    }

    .modal-body {
      position: relative;
      padding: 14px;
      max-height: calc(100vh - 70px);
      min-height: calc(100vh - 70px);

      overflow-x: hidden;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      text-align: left;
    }

    .modal-footer {
      position: relative;
      border-top: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;
      text-align: right;
    }

    p {
      margin: 7px 0;
    }
  }

  &.full {
    .modal {
      .modal-header {
        button {
          position: absolute;
          top: 18px;
          font-weight: bold;
          text-transform: capitalize;
          z-index: 3;
          background: transparent;
          color: $color-highlight;
          box-shadow: none;
        }
        .close {
          left: 4px;
        }

        .confirm {
          right: 4px;
        }
      }
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;

  .modal {
    transition: margin .2s;
    margin-top: 0;
  }
}
.fade-enter, .fade-leave-to {
  opacity: 0;

  .modal {
    margin-top: -20px;
  }
}

@media (max-width: $breakpoint-medium) {
  .modal-container {
    .modal {
      .modal-header {
        button {
          position: absolute;
          top: 18px;
          font-weight: bold;
          text-transform: capitalize;
          z-index: 3;
          background: transparent;
          color: $color-highlight;
          box-shadow: none;

          &:hover {
            text-decoration: none;
          }
        }

        .close {
          left: 4px;
        }

        .confirm {
          right: 4px;
        }
      }
    }
  }
}

@media (min-width: $breakpoint-medium) {
  .modal-container:not(.full) {
    .modal {
      bottom: initial;
      right: initial;
      // width: 720px;
      width: 560px;
      max-width: 80%;
      left: 50%;
      top: 50%;
      border-radius: 4px;
      transform: translate(-50%, -50%);

      .modal-body {
        // min-height: 400px;
        min-height: 0;
        // height: 400px;
        height: auto;
        max-height: calc(100vh - 100px);
        padding-bottom: 80px;
      }

      .modal-header {
        .actions {
          position: fixed;
          display: flex;
          width: 100%;
          // height: 70px;
          left: 0;
          bottom: 0;
          margin: 0;
          z-index: 90;
          overflow: hidden;
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;

          button {
            position: relative;
            padding: 0.8em 1em;
            flex: 1 1 0;
            border-radius: 0;
            left: initial;
            right: initial;
          }
        }
      }
    }
  }
}

</style>
