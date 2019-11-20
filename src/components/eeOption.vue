<template>
  <div>{{ label }}</div>
</template>

<script>
export default {
  name: "eeOption",
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      required: true
    }
  },
};
</script>

<style lang="scss">
.ee-option {
  color: #444;
  padding: 2px 6px;
  &:hover, &.is-highlighted {
    background-color: #409EFF;
    color: white;
    cursor: pointer;
  }
  .is-marked {
    color: #000;
    font-weight: bold;
  }
}
</style>

