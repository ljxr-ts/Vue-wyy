import Vue from 'vue'
import VueRouter from 'vue-router'

const discoveringMusic =()=> import('../views/discoveringMusic')
const latestMusic =()=> import('../views/latestMusic')
const lattestMv =()=> import('../views/latestMv')
const recommend =()=> import('../views/recommend')
const songsheet =()=> import('../views/songSheet')
const newmv =()=> import('../views/newMv')
const search =()=> import('../views/search')
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    component:discoveringMusic
  },
  {
    // 发现音乐
    path:"/DiscoveringMusic",
    component:discoveringMusic
  },
  {
    // 推荐音乐
    path:"/Recommend",
    component:recommend
  },
  {
    // 最新音乐
    path:"/LatestMusic",
    component:latestMusic
  },
  {
    // 最新Mv
    path:"/LattestMv",
    component:lattestMv
  },
  {
    path:"/songSheet",
    component:songsheet
  },
  {
    path:"/newMv",
    component:newmv
  },
  {
    path:"/search",
    component:search
  }
]

const router = new VueRouter({
  routes
})

export default router
