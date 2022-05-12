import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"
import UserTab from "../views/UserTableView.vue"
import Reports from "../views/Reports.vue"
import ChatBox from "../components/ChatBox.vue"
import InboxView from "../views/InboxView.vue"
import Settings from "../views/Settings.vue"

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register-admin',
    name: 'register',
    component: Register
  },
  {
    path: '/manage-users',
    name: 'manage-users',
    component: UserTab
  },
  {
    path: '/reports',
    name: 'reports',
    component: Reports
  },
  {
    path: '/chat-box/:id',
    name: 'chat-box',
    component: ChatBox
  },
  {
    path: '/inbox-admin/:id',
    name: 'inbox-admin',
    component: InboxView
  },
  {
    path: '/settings-admin',
    name: 'settings-admin',
    component: Settings
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
