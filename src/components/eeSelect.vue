<template>
  <div class="ee-select">
    <ee-popper ref="popper" @show="popperActive = true" @hide="popperActive = false">
      <div class="popper ee-select__dropdown">
        <!-- ee-loader :loading="" -->
        <perfect-scrollbar class="scroll-container" ref="scrollContainer">
          <div class="scroll-content-wrapper">
            <options-filter class="scroll-content" ref="scrollContent" :type="type" :value="inputValue" @highlightChange="onHighlightChange">
              <slot/>
            </options-filter>
          </div>
        </perfect-scrollbar>
      </div>

      <div
        slot="reference"
        class="ee-select__button"
        @keydown.arrow-up.prevent="$emit('highlight', -1)"
        @keydown.arrow-down.prevent="$emit('highlight', 1)"
        @keydown.enter.prevent="$emit('selectHighlighted')"
      >
        <div v-if="type === 'button'">Button</div>
        <ee-resizable-input
          v-else
          :value="inputValue"
          placeholder="Select.."
          @change="onInputChange"
          @focus="onInputFocus"
          @blur="onInputBlur"
        />
      </div>
    </ee-popper>
  </div>
</template>

<script>
import eePopper from "./eePopper.vue";
import eeResizableInput from "./eeResizableInput.vue";
import optionsFilter from "./optionsFilter.js";

export default {
  name: "eeSelect",
  props: {
    type: {
      type: String,
      required: true,
      validator: value => {
        return ["button", "filter", "api"].indexOf(value) !== -1;
      }
    },
    value: {
      type: Object,
      required: false,
      default: null
    }
  },
  components: {
    eePopper,
    eeResizableInput,
    optionsFilter
  },
  data() {
    return {
      inputValue: "test",
      popperActive: false
    };
  },
  mounted() {
    this.$on("click", option => {
      console.log('yoyoyoy');
      this.$emit("select", option);
    });
  },
  methods: {
    onHighlightChange(index) {
      if(this.$refs.scrollContent.$el.childNodes.length) {
        const containerHeight = this.$refs.scrollContainer.$el.getBoundingClientRect().height;
        const contentHeight = this.$refs.scrollContent.$el.getBoundingClientRect().height;
        const optionHeight = this.$refs.scrollContent.$el.childNodes[0].getBoundingClientRect().height;
        const optionTop = index * optionHeight;
        const scrollTop = this.$refs.scrollContainer.$el.scrollTop;

        if(optionTop === 0) {
          this.$refs.scrollContainer.$el.scrollTop = 0;
        } else if (optionTop+optionHeight === contentHeight) {
          this.$refs.scrollContainer.$el.scrollTop += this.$refs.scrollContent.$el.getBoundingClientRect().height - containerHeight;
        } else if(optionTop >= containerHeight+scrollTop) {
          this.$refs.scrollContainer.$el.scrollTop += optionHeight;
        } else if(optionTop < scrollTop) {
          this.$refs.scrollContainer.$el.scrollTop -= optionHeight;
        }
      }
    },
    onInputChange(value) {
      this.inputValue = value;
      this.$emit("inputChange", value);
    },
    onInputFocus(value) {
      console.log("focus");
    },
    onInputBlur(value) {
      console.log("blur");
    }
  }
};
</script>


<style lang="scss">
.ee-select {
  box-sizing: border-box;

  &__dropdown {
    background-color: #FFF;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
    max-height: 300px;
    max-width: 300px;
  }

  &__item {
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 100%;

    &:hover {
      background-color: #f3f7ff;
      cursor: pointer;
    }
  }

  &__button {
    box-sizing: border-box;
    display: inline-block;
  }
}

.scroll-container {
  max-height: 100px;
}
.scroll-content-wrapper {
}
.scroll-content {
}
</style>

