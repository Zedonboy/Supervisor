import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/CollectInput.vue'
import FlowChart from "../components/Flowchart.vue"
import DBOps from "../components/DBOps.vue"
import LandPage from "../components/LandPage.vue"
import feature from "../components/FeaturesPage.vue"
Vue.use(VueRouter)

const routes = [
  {
    path : "/home",
    component : LandPage,
    children : [
      {
        path: '',
        component: Home
      },
      {
        path : '/flowchart',
        name : "flowchart",
        component : FlowChart
      },
      {
        path : '/dbops',
        component : DBOps
      }
    ]
  },
  {
    path : "/feature",
    component : feature
  }
  
]

const router = new VueRouter({
  routes
})

export default router
