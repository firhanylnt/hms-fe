import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _703294c2 = () => interopDefault(import('../pages/appointment/index.vue' /* webpackChunkName: "pages/appointment/index" */))
const _c91291be = () => interopDefault(import('../pages/base.vue' /* webpackChunkName: "pages/base" */))
const _07c3ba6e = () => interopDefault(import('../pages/nurses/index.vue' /* webpackChunkName: "pages/nurses/index" */))
const _624be83e = () => interopDefault(import('../pages/patients/index.vue' /* webpackChunkName: "pages/patients/index" */))
const _2479b7d2 = () => interopDefault(import('../pages/pharmacists/index.vue' /* webpackChunkName: "pages/pharmacists/index" */))
const _569b10ee = () => interopDefault(import('../pages/receptionist/index.vue' /* webpackChunkName: "pages/receptionist/index" */))
const _6695cdeb = () => interopDefault(import('../pages/users/index.vue' /* webpackChunkName: "pages/users/index" */))
const _21f083fa = () => interopDefault(import('../pages/account/forgot-password.vue' /* webpackChunkName: "pages/account/forgot-password" */))
const _18309e32 = () => interopDefault(import('../pages/account/login.vue' /* webpackChunkName: "pages/account/login" */))
const _3d746a95 = () => interopDefault(import('../pages/account/register.vue' /* webpackChunkName: "pages/account/register" */))
const _84576388 = () => interopDefault(import('../pages/appointment/create.vue' /* webpackChunkName: "pages/appointment/create" */))
const _36f3a292 = () => interopDefault(import('../pages/auth/lock-screen.vue' /* webpackChunkName: "pages/auth/lock-screen" */))
const _2beb5194 = () => interopDefault(import('../pages/auth/login-1.vue' /* webpackChunkName: "pages/auth/login-1" */))
const _11031100 = () => interopDefault(import('../pages/auth/recoverpwd.vue' /* webpackChunkName: "pages/auth/recoverpwd" */))
const _0e56ecae = () => interopDefault(import('../pages/auth/register-1.vue' /* webpackChunkName: "pages/auth/register-1" */))
const _f8da58f2 = () => interopDefault(import('../pages/doctors/create.vue' /* webpackChunkName: "pages/doctors/create" */))
const _f48f9f1a = () => interopDefault(import('../pages/doctors/create_specialization.vue' /* webpackChunkName: "pages/doctors/create_specialization" */))
const _72bd1920 = () => interopDefault(import('../pages/doctors/manage.vue' /* webpackChunkName: "pages/doctors/manage" */))
const _c040bcd4 = () => interopDefault(import('../pages/doctors/specialization.vue' /* webpackChunkName: "pages/doctors/specialization" */))
const _a14afdd6 = () => interopDefault(import('../pages/nurses/create.vue' /* webpackChunkName: "pages/nurses/create" */))
const _341bbafd = () => interopDefault(import('../pages/patients/create.vue' /* webpackChunkName: "pages/patients/create" */))
const _db1ce5a8 = () => interopDefault(import('../pages/pharmacists/create.vue' /* webpackChunkName: "pages/pharmacists/create" */))
const _45b504f5 = () => interopDefault(import('../pages/utility/404.vue' /* webpackChunkName: "pages/utility/404" */))
const _6edb9aff = () => interopDefault(import('../pages/appointment/_id/edit.vue' /* webpackChunkName: "pages/appointment/_id/edit" */))
const _81e40cec = () => interopDefault(import('../pages/doctors/_id/edit.vue' /* webpackChunkName: "pages/doctors/_id/edit" */))
const _5efc37e0 = () => interopDefault(import('../pages/doctors/_id/edit_specialization.vue' /* webpackChunkName: "pages/doctors/_id/edit_specialization" */))
const _17a07b98 = () => interopDefault(import('../pages/nurses/_id/edit.vue' /* webpackChunkName: "pages/nurses/_id/edit" */))
const _70fadb80 = () => interopDefault(import('../pages/patients/_id/edit.vue' /* webpackChunkName: "pages/patients/_id/edit" */))
const _ddb64422 = () => interopDefault(import('../pages/pharmacists/_id/edit.vue' /* webpackChunkName: "pages/pharmacists/_id/edit" */))
const _12231b32 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/appointment",
    component: _703294c2,
    name: "appointment"
  }, {
    path: "/base",
    component: _c91291be,
    name: "base"
  }, {
    path: "/nurses",
    component: _07c3ba6e,
    name: "nurses"
  }, {
    path: "/patients",
    component: _624be83e,
    name: "patients"
  }, {
    path: "/pharmacists",
    component: _2479b7d2,
    name: "pharmacists"
  }, {
    path: "/receptionist",
    component: _569b10ee,
    name: "receptionist"
  }, {
    path: "/users",
    component: _6695cdeb,
    name: "users"
  }, {
    path: "/account/forgot-password",
    component: _21f083fa,
    name: "account-forgot-password"
  }, {
    path: "/account/login",
    component: _18309e32,
    name: "account-login"
  }, {
    path: "/account/register",
    component: _3d746a95,
    name: "account-register"
  }, {
    path: "/appointment/create",
    component: _84576388,
    name: "appointment-create"
  }, {
    path: "/auth/lock-screen",
    component: _36f3a292,
    name: "auth-lock-screen"
  }, {
    path: "/auth/login-1",
    component: _2beb5194,
    name: "auth-login-1"
  }, {
    path: "/auth/recoverpwd",
    component: _11031100,
    name: "auth-recoverpwd"
  }, {
    path: "/auth/register-1",
    component: _0e56ecae,
    name: "auth-register-1"
  }, {
    path: "/doctors/create",
    component: _f8da58f2,
    name: "doctors-create"
  }, {
    path: "/doctors/create_specialization",
    component: _f48f9f1a,
    name: "doctors-create_specialization"
  }, {
    path: "/doctors/manage",
    component: _72bd1920,
    name: "doctors-manage"
  }, {
    path: "/doctors/specialization",
    component: _c040bcd4,
    name: "doctors-specialization"
  }, {
    path: "/nurses/create",
    component: _a14afdd6,
    name: "nurses-create"
  }, {
    path: "/patients/create",
    component: _341bbafd,
    name: "patients-create"
  }, {
    path: "/pharmacists/create",
    component: _db1ce5a8,
    name: "pharmacists-create"
  }, {
    path: "/utility/404",
    component: _45b504f5,
    name: "utility-404"
  }, {
    path: "/appointment/:id/edit",
    component: _6edb9aff,
    name: "appointment-id-edit"
  }, {
    path: "/doctors/:id?/edit",
    component: _81e40cec,
    name: "doctors-id-edit"
  }, {
    path: "/doctors/:id?/edit_specialization",
    component: _5efc37e0,
    name: "doctors-id-edit_specialization"
  }, {
    path: "/nurses/:id/edit",
    component: _17a07b98,
    name: "nurses-id-edit"
  }, {
    path: "/patients/:id/edit",
    component: _70fadb80,
    name: "patients-id-edit"
  }, {
    path: "/pharmacists/:id/edit",
    component: _ddb64422,
    name: "pharmacists-id-edit"
  }, {
    path: "/",
    component: _12231b32,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
