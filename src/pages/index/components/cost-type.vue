<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { types } from '../../../store/data'

const props = defineProps<{ label: string, modelValue: string }>()
const emit = defineEmits(['update:modelValue'])
const input = ref('')
const selected = computed({
  get () {
    return props.modelValue
  },
  set (val) {
    emit('update:modelValue', val)
  }
})
watch(input, (val) => {
  selected.value = val
})

</script>

<template>
  <div>
    <q-input v-model="input" :label="props.label" :rules="[ val => val && val.length > 0 || '请输入或选择下方类型']"/>
    <div
      v-for="(type,index) of types"
      :key="type"
      :class="[$style.type,selected===type?'bg-grey-4':'bg-grey-2']"
      @click="selected=type">
      {{ type }}
      <q-btn icon="close" round size="xs" @click="types.splice(index,1)"/>
    </div>
  </div>
</template>

<style lang="stylus" module>
.type
  display inline-flex
  align-items center
  justify-content center
  gap 6px
  padding 6px 6px 6px 12px
  margin 4px
  border-radius 4px
  font-size 12px
  cursor pointer
  user-select none
</style>