<template>
  <div class="small-search" :class="{ value: value && value.length > 0 }">
    <label for="small-search-box">{{ label }}</label>
    <input
      id="small-search-box"
      :value="value"
      class="small-search-box"
      name="small-search-box"
      type="text"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'SmallSearchBox',
  props: {
    value: String,
    label: String
  }
});
</script>

<style lang="scss">
.small-search {
  width: 100%;
  display: flex;
  max-width: $main-width;
  margin: 0 auto;
  z-index: 11;
  position: relative;
  padding: 0 15px;
  box-sizing: border-box;
  cursor: text;

  &.value {
    .small-search-box {
      border-color: var(--theme-color);
    }

    label {
      opacity: 0;
    }
  }

  label {
    font-size: 1rem;
    padding: 4px 5px;
    position: absolute;
    user-select: none;
    pointer-events: none;
    transition: opacity 300ms $intro-easing;
  }
  .small-search-box {
    all: unset;
    border-bottom: solid 3px var(--theme-color-translucent);
    padding: 4px 5px;
    width: 100%;
    max-width: $mobile-width;
    transition: border 300ms $intro-easing;

    &:focus {
      border-color: var(--theme-color);
    }
  }
}
</style>
