import Vue from "vue";
import VueRouter from "vue-router";
// import store from '@/store/index.js'
Vue.use(VueRouter);

const Home = () => import('@/views/Home.vue');
const Dashboard = () => import('@/views/dashboard/index.vue');

const Edit = () => import('@/views/dashboard/edit.vue');

const routes = [
  {
    path: "/",
    name: "Home",
    component:Home,
    meta: {
      tittle: '首页'
    },
    redirect: '/home/dashboard',
    children: [
      {
      path: '/home/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      },{
          path: '/home/edit',
          name: 'Edit',
          component: Edit,
          },]
  },
 
 


  {
    path: "/",
    redirect: 'Home',
  },
  {
    path: "*",
    component: () =>
      import("@/views/Not.vue"),
    meta: {
      tittle: '404'
    }
  }
];
const router = new VueRouter({
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
});


//解决from  home  to  ligin的 报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}



export default router;
