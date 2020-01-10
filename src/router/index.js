import Vue from 'vue'
import Router from 'vue-router'
import Search from '@/components/Search'
import HelloWorld from '@/components/HelloWorld'
import GoodsDetail from '@/components/GoodsDetail'

Vue.use(Router)

export default new Router({
  mode: 'history', 
  routes: [
    {
      path: '/',
      name: 'Search',
      component: Search
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/GoodsDetail',
      name: 'GoodsDetail',
      component: GoodsDetail
    }
    
  ]
})
