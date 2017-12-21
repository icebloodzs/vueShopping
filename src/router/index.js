import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import index from '../pages/index'
import more from '../pages/more'
import mycenter from '../pages/mycenter'
import details from '../pages/details'
import website from '../pages/website'
import submit from '../pages/submit'
import pay from '../pages/pay'
import cancel from '../pages/cancel'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      redirect: {name:"index"}
    },
    {
      path: '/',
      name: 'index',
      component: index
    }, 
    {
      path: '/dist/mycenter',
      name: 'center',
      component: mycenter
    }, 
    {
      path: '/dist/details',
      name: 'details',
      component: details
    }, 
    {
      path: '/dist/more',
      name: 'more',
      component: more
    }, {
      path: '/dist/website',
      name: 'website',
      component: website
    }, {
      path: '/dist/submit',
      name: 'submit',
      component: submit
    },{
      path: '/dist/pay',
      name: 'pay',
      component: pay
    },{
      path: '/dist/cancel',
      name: 'cancel',
      component: cancel
    }

  ]
})
