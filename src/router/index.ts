import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
Vue.use(VueRouter)
let routesArr:Array<any> = [];

((modules: { (arg0: string): { (): any; new(): any; default: any[]; }; keys: () => string[]; }) => modules.keys().forEach((key: string) => {
  const keys: string = key.split("-")[1];
  let arr = modules(key).default.map((res)=>{
      res.type = keys
      return res
  })
  routesArr = routesArr.concat(arr);
}))(require.context('./modules/', true, /\.ts$/));
let routes: Array<RouteConfig> = routesArr

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
