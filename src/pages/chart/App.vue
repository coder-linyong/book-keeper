<script lang="ts" setup>
import { ref } from 'vue'

const a = ref(1)
</script>

<template>
  <div :class="$style.box">chart{{ a }}</div>
</template>

<style lang="stylus" module>
.box
  background aqua
</style>