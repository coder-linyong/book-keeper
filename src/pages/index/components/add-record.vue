<script lang="ts" setup>
import { addRecord, Record, types } from '../../../store/data'
import { QForm } from 'quasar'
import { ref } from 'vue'
import CostType from './cost-type.vue'
import { dateFormat } from '../../../util/date'

const visible = ref(false)
const record = ref<Record>({
  name: '',
  amount: 0,
  time: dateFormat(new Date()),
  type: ''
})
const form = ref<QForm | null>(null)

const onAdd = async () => {
  const validated = await form.value.validate()
  console.log(validated)
  if (!validated) return
  const amount = Number(record.value.amount)
  record.value.amount = isNaN(amount) ? 0 : amount
  addRecord(record.value)
  !types.includes(record.value.type) && types.push(record.value.type)
  record.value = {
    name: '',
    amount: 0,
    time: dateFormat(new Date()),
    type: ''
  }
  visible.value = false
}
</script>

<template>
  <q-fab-action color="primary" icon="mode_edit" @click="visible=true"></q-fab-action>
  <q-dialog v-model="visible">
    <q-card class="overflow-hidden" style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">添加一条新纪录</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form ref="form">
          <q-input v-model="record.name"
                   :rules="[ val => val && val.length > 0 || '请输入名称']"
                   label="名称"/>
          <cost-type v-model="record.type" label="类型"/>
          <q-input v-model="record.amount" label="金额" min="0" type="number"/>
          <q-input v-model="record.time" label="日期" type="date"/>
        </q-form>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn v-close-popup flat label="取消"/>
        <q-btn flat label="添加" @click="onAdd"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style lang="stylus" module>

</style>