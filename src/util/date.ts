import { date } from 'quasar'
import formatDate = date.formatDate

export const dateFormat = (date: Date) => formatDate(date, 'YYYY-MM-DD')