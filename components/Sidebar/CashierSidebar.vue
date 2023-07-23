<template>
  <ul class="metismenu list-unstyled" id="side-menu">
    <li class="menu-title">Menu</li>
    <li class="li-menus" id="menu-dashboard">
      <nuxt-link to="/" class="side-nav-link-ref">
        <!-- <i class="fas fa-home"></i> -->
        <i class="uil uil-home-alt"></i>
        <span>Dashboard</span>
      </nuxt-link>
    </li>
    <li class="li-menus" id="menu-billing">
      <nuxt-link to="/billing" class="side-nav-link-ref">
        <!-- <i class="fas fa-home"></i> -->
        <i class="uil uil-bill"></i>
        <span>Billing</span>
      </nuxt-link>
    </li>
    <li class="li-menus" id="menu-invoices">
      <nuxt-link to="/invoice" class="side-nav-link-ref">
        <!-- <i class="fas fa-home"></i> -->
        <i class="uil uil-invoice"></i>
        <span>Invoices</span>
      </nuxt-link>
    </li>
  </ul>
</template>
