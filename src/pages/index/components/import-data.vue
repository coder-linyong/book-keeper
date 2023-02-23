<script lang="ts" setup>
import { ref } from 'vue'
import FileSelector from './file-selector.vue'
import { readFile } from '../../../util/file'
import { importData } from '../../../store/data'

const str = ref('')
const visible = ref(false)
const onSelect = async (file: File) => {
  str.value = (await readFile(file, console.log))
}
const onImport = () => {
  if (importData(str.value)) {
    visible.value = false
    return
  }
  alert('数据错误！')
}
</script>

<template>
  <q-fab-action color="primary" icon="file_download" @click="visible=true"></q-fab-action>
  <q-dialog v-model="visible">
    <q-card class="overflow-hidden" style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">导入数据</div>
      </q-card-section>

      <q-card-section>
        <div class="row q-mb-xs">通过选择文件</div>
        <file-selector @select="onSelect"/>
        <div class="row q-mt-md q-mb-xs">或通过输入JSON</div>
        <q-input v-model="str" class="full-width" outlined type="textarea"/>
        <q-btn class="q-mx-auto q-mt-md full-width" color="primary" @click="onImport">导入</q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style lang="stylus" module>

</style>