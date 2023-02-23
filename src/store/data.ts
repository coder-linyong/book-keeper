import { computed, reactive, watch } from 'vue'
import { cacheData, getData } from '../util/localstorage'
import { dateFormat } from '../util/date'

export interface Record {
  index?: number;
  name: string;
  time: string;
  type: string;
  amount: number;
}

const recordsKey = 'records'
const records = reactive(getData<Array<Record>>(recordsKey) || [])
const notNumReg = /\D/g
const strToNum = (str: string) => Number(str.replace(notNumReg, ''))
export const monthRecords = computed(() => {
  const monthMap: { [p: string]: Array<Record> } = {}
  records.sort((a, b) => {
    return strToNum(a.time) > strToNum(b.time) ? -1 : 1
  })
  records.forEach((record, index) => {
    const date = new Date(record.time)
    record.index = index
    const monthStr = `${date.getFullYear()}年${date.getMonth() + 1}月`
    const datas = monthMap[monthStr] || (monthMap[monthStr] = [])
    datas.unshift(record)
  })
  return reactive(Object.keys(monthMap).map(key => ({
    time: key,
    total: monthMap[key].reduce((total, item) => total + Number(item.amount), 0),
    data: monthMap[key]
  })))
})
export const addRecord = (record: Record) => {
  records.unshift({ ...record })
}
watch(records, (records) => {
  cacheData(recordsKey, records)
})

const typesKey = 'types'
export const types = reactive(getData<Array<string>>(typesKey) || [])
watch(types, (items) => {
  cacheData(typesKey, Array.from(new Set(items)))
})

export function getExportData () {
  return {
    data: records,
    types
  }
}

const dateReg = /^[12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/

export function importData (data: string) {
  try {
    const datas = <ReturnType<typeof getExportData>>JSON.parse(data)

    records.length = 0
    types.length = 0

    datas.data = datas.data
      .filter(item => Object.prototype.toString.call(item).includes('Object'))
      .map(({ name, time, amount, type }) => ({
        name,
        time: dateReg.test(time) ? time : dateFormat(new Date()),
        amount: typeof amount === 'number' ? amount : strToNum(String(amount)),
        type: String(type)
      }))
    datas.types = datas.types.filter(type => typeof type === 'string')
    records.push(...datas.data)
    types.push(...datas.types)
  } catch (e) {
    console.error(e)
    return false
  }
  return true
}