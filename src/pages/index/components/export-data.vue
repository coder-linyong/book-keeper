<script lang="ts" setup>
import { ref } from 'vue'
import { copyToClipboard, downloadJSON } from '../../../util/file'
import { getExportData } from '../../../store/data'

const visible = ref(false)

const download = () => downloadJSON(getExportData(), 'config')
const copyJSON = () => {
  copyToClipboard(JSON.stringify(getExportData()))
  alert('已复制到剪贴板')
}
</script>

<template>
  <q-fab-action color="primary" icon="file_upload" @click="visible=true"></q-fab-action>
  <q-dialog v-model="visible">
    <q-card class="overflow-hidden" style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">导出数据</div>
      </q-card-section>

      <q-card-section class="q-pa-md q-gutter-md">
        <q-btn color="secondary" style="width: 100px" @click="copyJSON">复制JSON</q-btn>
        <q-btn color="primary" style="width: 100px" @click="download">下载文件
        </q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style lang="stylus" module>

</style>