import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ImageTest from '@/components/ImageTest'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/image',
      name: 'ImageTest',
      component: ImageTest
    },
    { 
      path: '/user', 
      component:{template:`<div>Hi</div>`}
    }
  ]
})
