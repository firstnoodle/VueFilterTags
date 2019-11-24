<template>
  <div
    class="ee-resizable-input"
    :class="{ 'is-focussed' : inputFocus }"
    @click="onClick"
  >
    <span ref="inputGhost">{{value}}</span>
    <span ref="placeholderGhost">{{placeholder}}</span>

    <input
      ref="input"
      type="text"
      spellcheck="false"
      :value="value"
      :placeholder="placeholder"
      :readonly="readonly"
      :style="computedStyle"
      @blur="onInputBlur"
      @focus="onInputFocus"
      @input="onInput"
    >
  </div>
</template>

<script>
export default {
  name: "eeResizableInput",
  props: {
    value: {
      type: String,
      default: "Test"
    },
    placeholder: {
      type: String,
      default: "Type..."
    }
  },
  data() {
    return {
      inputWidth: 0,
      inputFocus: false,
      placeHolderWidth: 0,
      readonly: true
    };
  },
  computed: {
    computedStyle() {
      return {
        width: this.inputWidth + "px"
      };
    }
  },
  watch: {
    value(newValue, oldValue) {
      this.$nextTick().then(() => {
        this.inputWidth = !this.value.length
          ? this.placeHolderWidth
          : this.$refs.inputGhost.getBoundingClientRect().width;
        this.placeHolderWidth = this.inputWidth;
      });
    }
  },
  mounted() {
    this.inputWidth = this.$refs.inputGhost.getBoundingClientRect().width;
    this.placeHolderWidth = this.$refs.placeholderGhost.getBoundingClientRect().width;
  },
  methods: {
    doBlur() {
      this.readonly = true;
    },

    onClick() {
      this.$emit("click");
      this.$refs.input.focus()
    },

    onInput(event) {
      this.$emit("change", event.target.value);
    },

    onInputFocus() {
      this.$emit("focus");
      this.readonly = false;
      this.inputFocus = true;
    },

    onInputBlur() {
      this.readonly = true;
      this.inputFocus = false;
    }
  }
};
</script>

<style lang="scss">
$font-size: 12px;

.ee-resizable-input {
  background-color: #ddd;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: inline-block;
  font-size: $font-size;
  padding: 2px 4px;
  position: relative;
  white-space: pre;

  & > input {
    background-color: #ddd;
    border: none;
    border-radius: 2px;
    color: #333;
    //font-size: $font-size;
    z-index: 10;

    &:focus {
      color: #000;
      outline: none;
    }
    &:hover {
      cursor: pointer;
    }
  }

  & > span {
    //font-size: $font-size;
    left: 0px;
    position: absolute;
    visibility: hidden;
    z-index: 0;
  }

  &:hover {
    background-color: #ccc;
    cursor: pointer;

    & > input {
      background-color: #ccc;
    }
  }

  &.is-focussed {
    border: 1px solid #aaa;
  }
}
</style>
