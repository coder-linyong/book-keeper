<script lang="ts" setup>
import { useQuasar } from 'quasar'
import AddRecord from './add-record.vue'
import ExportData from './export-data.vue'
import ImportData from './import-data.vue'

const $q = useQuasar()
</script>

<template>
  <q-fab
    :class="[$style.floatBtns,{[$style.floatBtnsMobile]:$q.screen.xs}]"
    color="accent"
    direction="up"
    icon="add">
    <add-record/>
    <export-data/>
    <import-data/>
  </q-fab>
</template>

<style lang="stylus" module>

.floatBtns
  position fixed !important
  right 40px
  bottom 40px

.floatBtnsMobile
  right 20px
  bottom 20px
</style>