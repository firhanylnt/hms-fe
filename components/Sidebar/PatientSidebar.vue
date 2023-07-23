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
    <li class="li-menus" id="menu-appointment">
      <nuxt-link to="/appointment" class="side-nav-link-ref">
        <!-- <i class="fas fa-home"></i> -->
        <i class="uil uil-clipboard-notes"></i>
        <span>My Appointment</span>
      </nuxt-link>
    </li>
    <li class="li-menus" id="menu-invoice">
      <nuxt-link to="/invoice" class="side-nav-link-ref">
        <!-- <i class="fas fa-home"></i> -->
        <i class="uil uil-invoice"></i>
        <span>Invoice</span>
      </nuxt-link>
    </li>
    <li class="li-menus" id="menu-track-record">
      <nuxt-link to="/track-record-medical" class="side-nav-link-ref">
        <!-- <i class="fas fa-home"></i> -->
        <i class="uil uil-medical-drip"></i>
        <span>Track Record Medical</span>
      </nuxt-link>
    </li>
  </ul>
</template>
