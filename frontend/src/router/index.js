import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ImageTest from '@/components/ImageTest'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/test',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'ImageTest',
      component: ImageTest
    },
    { 
      path: '/user', 
      component:{template:`<div>Hi</div>`}
    }
  ]
})
