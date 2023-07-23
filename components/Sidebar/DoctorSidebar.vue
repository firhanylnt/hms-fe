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
        <span>Appointment</span>
      </nuxt-link>
    </li>
    <li class="li-menus" id="menu-ipd">
      <nuxt-link to="/ipd" class="side-nav-link-ref">
        <!-- <i class="fas fa-home"></i> -->
        <i class="uil uil-medical-drip"></i>
        <span>IPD</span>
      </nuxt-link>
    </li>
    <li class="li-menus" id="menu-opd">
      <nuxt-link to="/opd" class="side-nav-link-ref">
        <!-- <i class="fas fa-home"></i> -->
        <i class="uil uil-file-medical-alt"></i>
        <span>OPD</span>
      </nuxt-link>
    </li>
  </ul>
</template>
