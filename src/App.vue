<template>
  <div id="app">
    <ee-select :value="selectedOption" type="filter" @select="onSelect">
      <ee-option
        v-for="option in options"
        :key="option.label"
        :label="option.label"
        :value="option"
      />
    </ee-select>
  </div>
</template>

<script>
import eeSelect from "./components/eeSelect.vue";
import eeOption from "./components/eeOption.vue";

export default {
  name: "App",
  components: {
    eeOption,
    eeSelect
  },
  data() {
    return {
      inputValue: "test",
      selectedOption: null,
      options: [
        { label: "Copenhagen" },
        { label: "London" },
        { label: "Tokyo" },
        { label: "Mogadishu" },
        { label: "Jebel Ali" },
        { label: "Marakesh" },
        { label: "Budapest" },
        { label: "Nairobi" },
        { label: "Beijing" },
        { label: "Buenos Aires" }
      ]
    };
  },
  methods: {
    onInputChange(value) {
      this.inputValue = value;
    },
    onSelect(option) {
      console.log(option);
      this.selectedOption = option;
    }
  }
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 12px;
  color: #2c3e50;
  margin-top: 60px;
  padding: 40px;
}
</style>
