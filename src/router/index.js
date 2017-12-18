import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import index from '../pages/index'
import more from '../pages/more'
import mycenter from '../pages/mycenter'
import details from '../pages/details'
import website from '../pages/website'
import submit from '../pages/submit'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/vue-home/dist',
      name: 'index',
      component: index
    }, 
    {
      path: '/vue-home/dist/mycenter',
      name: 'center',
      component: mycenter
    }, 
    {
      path: '/vue-home/dist/details',
      name: 'details',
      component: details
    }, 
    {
      path: '/vue-home/dist/more',
      name: 'more',
      component: more
    }, {
      path: '/vue-home/dist/website',
      name: 'website',
      component: website
    }, {
      path: '/vue-home/dist/submit',
      name: 'submit',
      component: submit
    },

  ]
})
