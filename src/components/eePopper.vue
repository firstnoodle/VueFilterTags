<template>
  <span>
    <slot name="reference"></slot>
    <transition
      :name="transition"
      :enter-active-class="enterActiveClass"
      :leave-active-class="leaveActiveClass"
      @after-leave="doDestroy"
    >
      <span ref="popper" v-show="showPopper">
        <slot />
      </span>
    </transition>
  </span>
</template>

<script>
import Popper from "popper.js";

function on(element, event, handler) {
  if (element && event && handler) {
    document.addEventListener
      ? element.addEventListener(event, handler, false)
      : element.attachEvent("on" + event, handler);
  }
}

function off(element, event, handler) {
  if (element && event) {
    document.removeEventListener
      ? element.removeEventListener(event, handler, false)
      : element.detachEvent("on" + event, handler);
  }
}

export default {
  props: {
    enterActiveClass: String,
    leaveActiveClass: String,
    boundariesSelector: String,
    appendToBody: {
      type: Boolean,
      default: false
    },
    showPopper: {
      type: Boolean,
      default: false,
    },
    transition: {
      type: String,
      default: ""
    },
    options: {
      type: Object,
      default() {
        return {
          modifiers: {
            preventOverflow: {
              escapeWithReference: true
            },
            offset: {
              enabled: true,
              offset: "0, 0"
            }
          }
        };
      }
    }
  },

  data() {
    return {
      referenceElm: null,
      popperJS: null,
      currentPlacement: "",
      popperOptions: {
        placement: "bottom-start",
        gpuAcceleration: false
      }
    };
  },

  watch: {
    showPopper(value) {
      if (value) {
        this.$emit("show");
        this.updatePopper();
        on(document, "click", this.handleDocumentClick);
      } else {
        this.$emit("hide");
        off(document, "click", this.handleDocumentClick);
      }
    },
  },

  created() {
    this.appendedToBody = false;
    this.popperOptions = Object.assign(this.popperOptions, this.options);
  },

  mounted() {
    this.referenceElm = this.$slots.reference[0].elm;
    this.popper = this.$slots.default[0].elm;
    on(document, "click", this.handleDocumentClick);
  },

  methods: {
    doClose() {
      this.showPopper = false;
    },
    doDestroy() {
      if (this.showPopper) {
        return;
      }
      if (this.popperJS) {
        this.popperJS.destroy();
        this.popperJS = null;
      }
      if (this.appendedToBody) {
        this.appendedToBody = false;
        document.body.removeChild(this.popper.parentElement);
      }
    },

    createPopper() {
      this.$nextTick(() => {
        if (this.appendToBody && !this.appendedToBody) {
          this.appendedToBody = true;
          document.body.appendChild(this.popper.parentElement);
        }

        if (this.popperJS && this.popperJS.destroy) {
          this.popperJS.destroy();
        }

        if (this.boundariesSelector) {
          const boundariesElement = document.querySelector(
            this.boundariesSelector
          );

          if (boundariesElement) {
            this.popperOptions.modifiers = Object.assign(
              {},
              this.popperOptions.modifiers
            );
            this.popperOptions.modifiers.preventOverflow = Object.assign(
              {},
              this.popperOptions.modifiers.preventOverflow
            );
            this.popperOptions.modifiers.preventOverflow.boundariesElement = boundariesElement;
          }
        }
        this.popperOptions.onCreate = () => {
          this.$emit("created", this);
          this.$nextTick(this.updatePopper);
        };
        this.popperJS = new Popper(
          this.referenceElm,
          this.popper,
          this.popperOptions
        );
      });
    },
    destroyPopper() {
      off(document, "click", this.handleDocumentClick);
      this.doDestroy();
    },
    updatePopper() {
      this.popperJS ? this.popperJS.scheduleUpdate() : this.createPopper();
    },
    handleDocumentClick(e) {
      if (
        !this.$el ||
        !this.referenceElm ||
        this.elementContains(this.$el, e.target) ||
        this.elementContains(this.referenceElm, e.target) ||
        !this.popper ||
        this.elementContains(this.popper, e.target)
      ) {
        return;
      }
      this.$emit("documentClick");
    },
    elementContains(elm, otherElm) {
      if (typeof elm.contains === "function") {
        return elm.contains(otherElm);
      }
      return false;
    }
  },

  destroyed() {
    this.destroyPopper();
  }
};
</script>
