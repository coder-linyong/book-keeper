import '../../styl/style.styl'
import { createApp } from 'vue'
import App from './App.vue'
import {
  QBtn,
  QCard,
  QCardActions,
  QCardSection,
  QDate,
  QDialog,
  QFab,
  QFabAction,
  QFooter,
  QForm,
  QIcon,
  QInput,
  QLayout,
  QPage,
  QPageContainer,
  QTable,
  Quasar
} from 'quasar'
import quasarLang from 'quasar/lang/zh-CN'
import '../../util/service-worker'

// Import Quasar css
import 'quasar/dist/quasar.prod.css'
import '@quasar/extras/material-icons/material-icons.css'
// https://fonts.google.com/icons?selected=Material+Icons
import iconSet from 'quasar/icon-set/material-icons'
/*

 */
const app = createApp(App)
app.use(Quasar, {
  components: {
    QBtn,
    QFab,
    QFabAction,
    QTable,
    QLayout,
    QFooter,
    QPageContainer,
    QPage,
    QDialog,
    QCard,
    QCardActions,
    QCardSection,
    QInput,
    QForm,
    QDate,
    QIcon
  },
  iconSet,
  plugins: ['Notify'], // import Quasar plugins and add here
  lang: quasarLang
}).mount('#app')