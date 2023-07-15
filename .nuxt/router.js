import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _703294c2 = () => interopDefault(import('../pages/appointment/index.vue' /* webpackChunkName: "pages/appointment/index" */))
const _c91291be = () => interopDefault(import('../pages/base.vue' /* webpackChunkName: "pages/base" */))
const _4d8c3868 = () => interopDefault(import('../pages/bloods/index.vue' /* webpackChunkName: "pages/bloods/index" */))
const _749dd880 = () => interopDefault(import('../pages/ipd/index.vue' /* webpackChunkName: "pages/ipd/index" */))
const _2890b5e6 = () => interopDefault(import('../pages/medicine/index.vue' /* webpackChunkName: "pages/medicine/index" */))
const _07c3ba6e = () => interopDefault(import('../pages/nurses/index.vue' /* webpackChunkName: "pages/nurses/index" */))
const _624be83e = () => interopDefault(import('../pages/patients/index.vue' /* webpackChunkName: "pages/patients/index" */))
const _2479b7d2 = () => interopDefault(import('../pages/pharmacists/index.vue' /* webpackChunkName: "pages/pharmacists/index" */))
const _ee0f774a = () => interopDefault(import('../pages/receptionists/index.vue' /* webpackChunkName: "pages/receptionists/index" */))
const _6695cdeb = () => interopDefault(import('../pages/users/index.vue' /* webpackChunkName: "pages/users/index" */))
const _21f083fa = () => interopDefault(import('../pages/account/forgot-password.vue' /* webpackChunkName: "pages/account/forgot-password" */))
const _18309e32 = () => interopDefault(import('../pages/account/login.vue' /* webpackChunkName: "pages/account/login" */))
const _3d746a95 = () => interopDefault(import('../pages/account/register.vue' /* webpackChunkName: "pages/account/register" */))
const _84576388 = () => interopDefault(import('../pages/appointment/create.vue' /* webpackChunkName: "pages/appointment/create" */))
const _36f3a292 = () => interopDefault(import('../pages/auth/lock-screen.vue' /* webpackChunkName: "pages/auth/lock-screen" */))
const _2beb5194 = () => interopDefault(import('../pages/auth/login-1.vue' /* webpackChunkName: "pages/auth/login-1" */))
const _11031100 = () => interopDefault(import('../pages/auth/recoverpwd.vue' /* webpackChunkName: "pages/auth/recoverpwd" */))
const _0e56ecae = () => interopDefault(import('../pages/auth/register-1.vue' /* webpackChunkName: "pages/auth/register-1" */))
const _4a58bbfe = () => interopDefault(import('../pages/bed-management/room/index.vue' /* webpackChunkName: "pages/bed-management/room/index" */))
const _8082c0c6 = () => interopDefault(import('../pages/bed-management/type/index.vue' /* webpackChunkName: "pages/bed-management/type/index" */))
const _75b6e072 = () => interopDefault(import('../pages/bloods/create.vue' /* webpackChunkName: "pages/bloods/create" */))
const _9511d2a8 = () => interopDefault(import('../pages/doctors/list/index.vue' /* webpackChunkName: "pages/doctors/list/index" */))
const _4ad3c0ce = () => interopDefault(import('../pages/doctors/specialization/index.vue' /* webpackChunkName: "pages/doctors/specialization/index" */))
const _1825aefe = () => interopDefault(import('../pages/ipd/create.vue' /* webpackChunkName: "pages/ipd/create" */))
const _9a1d715e = () => interopDefault(import('../pages/medicine/create.vue' /* webpackChunkName: "pages/medicine/create" */))
const _a14afdd6 = () => interopDefault(import('../pages/nurses/create.vue' /* webpackChunkName: "pages/nurses/create" */))
const _341bbafd = () => interopDefault(import('../pages/patients/create.vue' /* webpackChunkName: "pages/patients/create" */))
const _db1ce5a8 = () => interopDefault(import('../pages/pharmacists/create.vue' /* webpackChunkName: "pages/pharmacists/create" */))
const _8476dc7a = () => interopDefault(import('../pages/receptionists/create.vue' /* webpackChunkName: "pages/receptionists/create" */))
const _d84f8b9a = () => interopDefault(import('../pages/users/create.vue' /* webpackChunkName: "pages/users/create" */))
const _45b504f5 = () => interopDefault(import('../pages/utility/404.vue' /* webpackChunkName: "pages/utility/404" */))
const _28730e80 = () => interopDefault(import('../pages/bed-management/room/create.vue' /* webpackChunkName: "pages/bed-management/room/create" */))
const _5fc99ec1 = () => interopDefault(import('../pages/bed-management/type/create.vue' /* webpackChunkName: "pages/bed-management/type/create" */))
const _21200992 = () => interopDefault(import('../pages/doctors/list/create.vue' /* webpackChunkName: "pages/doctors/list/create" */))
const _c03bc376 = () => interopDefault(import('../pages/doctors/specialization/create.vue' /* webpackChunkName: "pages/doctors/specialization/create" */))
const _a6694b7a = () => interopDefault(import('../pages/bed-management/room/_id/edit.vue' /* webpackChunkName: "pages/bed-management/room/_id/edit" */))
const _68bede44 = () => interopDefault(import('../pages/bed-management/type/_id/edit.vue' /* webpackChunkName: "pages/bed-management/type/_id/edit" */))
const _2e25d8d5 = () => interopDefault(import('../pages/doctors/list/_id/edit.vue' /* webpackChunkName: "pages/doctors/list/_id/edit" */))
const _04b58cc8 = () => interopDefault(import('../pages/doctors/specialization/_id/edit.vue' /* webpackChunkName: "pages/doctors/specialization/_id/edit" */))
const _6edb9aff = () => interopDefault(import('../pages/appointment/_id/edit.vue' /* webpackChunkName: "pages/appointment/_id/edit" */))
const _8f3b1096 = () => interopDefault(import('../pages/bloods/_id/edit.vue' /* webpackChunkName: "pages/bloods/_id/edit" */))
const _7a57d341 = () => interopDefault(import('../pages/ipd/_id/edit.vue' /* webpackChunkName: "pages/ipd/_id/edit" */))
const _dec2ba58 = () => interopDefault(import('../pages/medicine/_id/edit.vue' /* webpackChunkName: "pages/medicine/_id/edit" */))
const _17a07b98 = () => interopDefault(import('../pages/nurses/_id/edit.vue' /* webpackChunkName: "pages/nurses/_id/edit" */))
const _70fadb80 = () => interopDefault(import('../pages/patients/_id/edit.vue' /* webpackChunkName: "pages/patients/_id/edit" */))
const _ddb64422 = () => interopDefault(import('../pages/pharmacists/_id/edit.vue' /* webpackChunkName: "pages/pharmacists/_id/edit" */))
const _33c918c6 = () => interopDefault(import('../pages/receptionists/_id/edit.vue' /* webpackChunkName: "pages/receptionists/_id/edit" */))
const _58d73594 = () => interopDefault(import('../pages/users/_id/edit.vue' /* webpackChunkName: "pages/users/_id/edit" */))
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
    path: "/bloods",
    component: _4d8c3868,
    name: "bloods"
  }, {
    path: "/ipd",
    component: _749dd880,
    name: "ipd"
  }, {
    path: "/medicine",
    component: _2890b5e6,
    name: "medicine"
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
    path: "/receptionists",
    component: _ee0f774a,
    name: "receptionists"
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
    path: "/bed-management/room",
    component: _4a58bbfe,
    name: "bed-management-room"
  }, {
    path: "/bed-management/type",
    component: _8082c0c6,
    name: "bed-management-type"
  }, {
    path: "/bloods/create",
    component: _75b6e072,
    name: "bloods-create"
  }, {
    path: "/doctors/list",
    component: _9511d2a8,
    name: "doctors-list"
  }, {
    path: "/doctors/specialization",
    component: _4ad3c0ce,
    name: "doctors-specialization"
  }, {
    path: "/ipd/create",
    component: _1825aefe,
    name: "ipd-create"
  }, {
    path: "/medicine/create",
    component: _9a1d715e,
    name: "medicine-create"
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
    path: "/receptionists/create",
    component: _8476dc7a,
    name: "receptionists-create"
  }, {
    path: "/users/create",
    component: _d84f8b9a,
    name: "users-create"
  }, {
    path: "/utility/404",
    component: _45b504f5,
    name: "utility-404"
  }, {
    path: "/bed-management/room/create",
    component: _28730e80,
    name: "bed-management-room-create"
  }, {
    path: "/bed-management/type/create",
    component: _5fc99ec1,
    name: "bed-management-type-create"
  }, {
    path: "/doctors/list/create",
    component: _21200992,
    name: "doctors-list-create"
  }, {
    path: "/doctors/specialization/create",
    component: _c03bc376,
    name: "doctors-specialization-create"
  }, {
    path: "/bed-management/room/:id?/edit",
    component: _a6694b7a,
    name: "bed-management-room-id-edit"
  }, {
    path: "/bed-management/type/:id?/edit",
    component: _68bede44,
    name: "bed-management-type-id-edit"
  }, {
    path: "/doctors/list/:id/edit",
    component: _2e25d8d5,
    name: "doctors-list-id-edit"
  }, {
    path: "/doctors/specialization/:id/edit",
    component: _04b58cc8,
    name: "doctors-specialization-id-edit"
  }, {
    path: "/appointment/:id/edit",
    component: _6edb9aff,
    name: "appointment-id-edit"
  }, {
    path: "/bloods/:id/edit",
    component: _8f3b1096,
    name: "bloods-id-edit"
  }, {
    path: "/ipd/:id/edit",
    component: _7a57d341,
    name: "ipd-id-edit"
  }, {
    path: "/medicine/:id/edit",
    component: _dec2ba58,
    name: "medicine-id-edit"
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
    path: "/receptionists/:id/edit",
    component: _33c918c6,
    name: "receptionists-id-edit"
  }, {
    path: "/users/:id/edit",
    component: _58d73594,
    name: "users-id-edit"
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
