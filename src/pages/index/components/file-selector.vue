<script lang="ts" setup>
import { defineEmits, ref } from 'vue'

const inputRef = ref<HTMLInputElement | null>(null)
const emit = defineEmits<{(e: 'select', file: File): void; }>()
const onChange = (e: Event) => {
  // @ts-ignore
  emit('select', e.target.files[0])
}

const dragHandler = (e: DragEvent) => {
  e.preventDefault()
  if (e.type === 'drop') {
    emit('select', e.dataTransfer.files[0])
  }
}
</script>

<template>
  <div
    :class="$style.wrapper"
    class="row justify-center items-center cursor-pointer"
    @click="inputRef.click()"
    @dragover="dragHandler"
    @drop="dragHandler">
    <q-icon name="add" size="md"/>
    <input ref="inputRef" :class="$style.input" accept="application/json" type="file" @change="onChange">
  </div>
</template>

<style lang="stylus" module>
.wrapper
  width 100%
  height 100px
  border dashed 1px gray

.input
  display none
</style>