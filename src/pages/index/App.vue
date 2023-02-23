<script lang="ts" setup>
import { monthRecords } from '../../store/data'
import PageLayout from '../../components/page-layout.vue'
import { useQuasar } from 'quasar'
import NoContent from '../../components/no-content.vue'
import FloatMenu from './components/float-menu.vue'

const columns = [
  { name: 'name', align: 'left', label: '名称', field: 'name' },
  { name: 'time', align: 'center', label: '时间', field: 'time', sortable: true },
  { name: 'type', align: 'center', label: '类型', field: 'type', sortable: true },
  { name: 'amount', align: 'center', label: '金额（元）', field: 'amount', sortable: true }
]
const $q = useQuasar()
</script>

<template>
  <page-layout>
    <template v-if="!!monthRecords.length">
      <q-table
        v-for="record of monthRecords"
        :key="record.time"
        :class="$style.table"
        :columns="columns"
        :dense="$q.screen.xs"
        :pagination="{rowsPerPage:0}"
        :rows="record.data"
        :title="record.time"
        row-key="name">
        <template v-slot:bottom>
          <div :class="$style.total" class="col text-right">
            总计：{{ record.total }}
          </div>
        </template>
      </q-table>
    </template>
    <no-content v-else/>
    <float-menu/>
  </page-layout>
</template>

<style lang="stylus" module>
.table
  margin 20px 0

.total
  padding-right 20px
  font-weight bold
</style>