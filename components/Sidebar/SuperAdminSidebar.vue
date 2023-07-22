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
    <li class="li-menus" id="menu-doctors">
      <a href="javascript:void(0);" class="is-parent has-dropdown">
        <i class="mdi mdi-doctor"></i>
        <span class="pt-2">Doctor</span>
      </a>
      <ul class="sub-menu" aria-expanded="false">
        <li>
          <nuxt-link to="/doctors/specialization" class="side-nav-link-ref"
            >Specialization</nuxt-link
          >
        </li>
        <li>
          <nuxt-link to="/doctors/list" class="side-nav-link-ref"
            >Doctor List</nuxt-link
          >
        </li>
      </ul>
    </li>
    <li class="li-menus" id="menu-patients">
      <nuxt-link to="/patients" class="side-nav-link-ref">
        <!-- <i class="fas fa-home"></i> -->
        <i class="uil uil-user-plus"></i>
        <span>Patient</span>
      </nuxt-link>
    </li>
    <li class="li-menus" id="menu-bed-management">
      <a href="javascript:void(0);" class="is-parent has-dropdown">
        <i class="uil uil-bed"></i>
        <span class="pt-2">Bed Management</span>
      </a>
      <ul class="sub-menu" aria-expanded="false">
        <li>
          <nuxt-link to="/bed-management/type" class="side-nav-link-ref"
            >Type</nuxt-link
          >
        </li>
        <li>
          <nuxt-link to="/bed-management/room" class="side-nav-link-ref"
            >Room</nuxt-link
          >
        </li>
      </ul>
    </li>
    <li class="li-menus" id="menu-medicines">
      <nuxt-link to="/medicine" class="side-nav-link-ref">
        <i class="uil uil-capsule"></i>
        <span>Medicine</span>
      </nuxt-link>
    </li>
    <li class="li-menus" id="menu-laboratory">
      <nuxt-link to="/laboratory" class="side-nav-link-ref">
        <i class="fas fa-flask"></i>
        <span>Laboratory</span>
      </nuxt-link>
    </li>
    <li class="li-menus" id="menu-blood-banks">
      <nuxt-link to="/bloods" class="side-nav-link-ref">
        <i class="mdi mdi-water"></i>
        <span>Blood Bank</span>
      </nuxt-link>
    </li>
    <li class="li-menus" id="menu-pharmacists">
      <nuxt-link to="/pharmacists" class="side-nav-link-ref">
        <!-- <i class="fas fa-home"></i> -->
        <i class="uil uil-flask"></i>
        <span>Pharmacist</span>
      </nuxt-link>
    </li>
    <li class="li-menus" id="menu-nurses">
      <nuxt-link to="/nurses" class="side-nav-link-ref">
        <!-- <i class="fas fa-home"></i> -->
        <i class="fas fa-user-nurse"></i>
        <span>Nurse</span>
      </nuxt-link>
    </li>
    <li class="li-menus" id="menu-receptionists">
      <nuxt-link to="/receptionists" class="side-nav-link-ref">
        <!-- <i class="fas fa-home"></i> -->
        <i class="uil uil-book-reader"></i>
        <span>Receptionist</span>
      </nuxt-link>
    </li>
    <li class="li-menus" id="menu-users">
      <nuxt-link to="/users" class="side-nav-link-ref">
        <!-- <i class="fas fa-home"></i> -->
        <i class="uil uil-users-alt"></i>
        <span>User</span>
      </nuxt-link>
    </li>
    <li class="li-menus" id="menu-users">
      <nuxt-link to="/assets" class="side-nav-link-ref">
        <!-- <i class="fas fa-home"></i> -->
        <i class="uil uil-folder"></i>
        <span>Asset</span>
      </nuxt-link>
    </li>
    <li>
      <nuxt-link to="/report" class="side-nav-link-ref">
        <i class="uil uil-chart-line"></i>
        <span>Report</span>
      </nuxt-link>
    </li>
    <li>
      <nuxt-link to="/meals" class="side-nav-link-ref">
        <i class="mdi mdi-food"></i>
        <span>Meals Ordering System</span>
      </nuxt-link>
    </li>
    <!-- <li>
            <a href="javascript:void(0);" class="is-parent has-dropdown">
                <i class="uil uil-history"></i>
                <span class="pt-2">Logs</span>
            </a>
            <ul class="sub-menu" aria-expanded="false">
                <li>
                    <nuxt-link to="logs/doctors" class="side-nav-link-ref">Doctor Logs</nuxt-link>
                </li>
                <li>
                    <nuxt-link to="logs/users" class="side-nav-link-ref">User Logs</nuxt-link>
                </li>
            </ul>
        </li> -->
  </ul>
</template>
