<template>
  <div class="ee-select" @keydown.enter.prevent="onEnter">
    <ee-popper ref="popper" :showPopper="showPopper" @documentClick="onDocumentClick">

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
      >
        <div v-if="type === 'button'">Button</div>
        <ee-resizable-input
          v-else
          ref="input"
          :value="inputValue"
          :placeholder="inputPlaceholder"
          @change="onInputChange"
          @click="onInputClick"
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
  components: {
    eePopper,
    eeResizableInput,
    optionsFilter
  },
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

  data() {
    return {
      inputPlaceholder: 'Type..',
      inputValue: "test",
      showPopper: true,
    };
  },

  watch: {
    value(newValue, oldValue) {
      this.inputValue = newValue.label;
      this.inputPlaceholder = newValue.label;
      this.$refs.input.doBlur();
    }
  },

  mounted() {
    this.$on("click", option => {
      this.showPopper = false;
      this.$emit("select", option);
    });

    // this.$on("selectHighlighted", () => {
    //   if(!this.showPopper) this.showPopper = true;
    // });
  },
  methods: {
    onEnter() {
      if(this.showPopper) {
        this.$emit('selectHighlighted');
      } else {
        this.inputValue = '';
        this.showPopper = true; 
        // this.$refs.input.onClick();
      }
    },
    onDocumentClick() {
      if(this.value) {
        this.inputValue = this.value.label;
      } else {
        this.inputValue = ''; 
      }
      this.showPopper = false;
    },
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
      // options-filter is listening
      this.$emit("inputChange", value);
    },
    onInputClick() {
      console.log('click');
    },
    onInputFocus(value) {
      console.log('focus');
      this.inputValue = '';
      this.showPopper = true;
    },
  }
};
</script>


<style lang="scss">
.ee-select {
  box-sizing: border-box;

  &:focus {
    border: 1px solid red;
  }

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

