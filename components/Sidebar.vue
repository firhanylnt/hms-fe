<script>
import MetisMenu from "metismenujs/dist/metismenujs";

import {
    mapState
} from "vuex";

import {
    menuItems
} from "./menu";

/**
 * Sidebar component
 */
export default {
    data() {
        return {
            menuItems: menuItems,
        };
    },
    props: {
        type: {
            type: String,
            required: true,
        },
        width: {
            type: String,
            required: true,
        },
    },
    computed: mapState(["layout"]),
    watch: {
        type: {
            immediate: true,
            handler(newVal, oldVal) {
                if (newVal !== oldVal) {
                    switch (newVal) {
                        case "dark":
                            document.body.setAttribute("data-sidebar", "dark");
                            document.body.removeAttribute("data-topbar");
                            document.body.removeAttribute("data-sidebar-size");
                            break;
                        case "light":
                            document.body.removeAttribute("data-sidebar");
                            document.body.removeAttribute("data-sidebar-size");
                            document.body.classList.remove("vertical-collpsed");
                            break;
                        case "compact":
                            document.body.setAttribute("data-sidebar-size", "small");
                            document.body.setAttribute("data-sidebar", "dark");
                            document.body.classList.remove("vertical-collpsed");
                            document.body.removeAttribute("data-topbar", "dark");
                            break;
                        case "icon":
                            document.body.setAttribute("data-keep-enlarged", "true");
                            document.body.classList.add("vertical-collpsed");
                            document.body.setAttribute("data-sidebar", "dark");
                            document.body.removeAttribute("data-topbar", "dark");
                            break;
                        case "colored":
                            document.body.setAttribute("data-sidebar", "colored");
                            document.body.removeAttribute("data-keep-enlarged");
                            document.body.classList.remove("vertical-collpsed");
                            document.body.removeAttribute("data-sidebar-size");
                            break;
                        default:
                            document.body.setAttribute("data-sidebar", "dark");
                            break;
                    }
                }
            },
        },
        width: {
            immediate: true,
            handler(newVal, oldVal) {
                if (newVal !== oldVal) {
                    switch (newVal) {
                        case "boxed":
                            document.body.setAttribute("data-layout-size", "boxed");
                            break;
                        case "fluid":
                            document.body.setAttribute("data-layout-mode", "fluid");
                            document.body.removeAttribute("data-layout-size");
                            break;
                        default:
                            document.body.setAttribute("data-layout-mode", "fluid");
                            break;
                    }
                }
            },
        },
    },
    mounted: function () {
        // eslint-disable-next-line no-unused-vars
        var menuRef = new MetisMenu("#side-menu");
        this._activateMenuDropdown();

        this.$router.afterEach((routeTo, routeFrom) => {
            this._activateMenuDropdown();
        });

        const user = JSON.parse(localStorage.getItem('user'))
        const roles = {
            doctor: ['menu-appointment', 'menu-patients', 'menu-medicines', 'menu-laboratory', 'menu-blood-banks', 'menu-pharmacists'],
            receptionist: ['menu-appointment', 'menu-ipd', 'menu-doctors', 'menu-patients', 'menu-bed-management', 'menu-medicines', 'menu-laboratory', 'menu-blood-banks', 'menu-pharmacists', 'menu-nurses'],
            patient: ['menu-appointment']
        }

        if (user.role != 'admin') {
            const liMenus = document.getElementsByClassName('li-menus')
            for (let i = 0; i < liMenus.length; i++) {
                const menuItem = liMenus[i];
                const menuId = menuItem.getAttribute('id')

                console.log(menuItem, menuId)

                if (!roles[user.role].includes(menuId)) {
                    menuItem.style.display = 'none';
                }
            }            
        }
    },
    methods: {
        /**
         * Toggle menu
         */
        toggleMenu() {
            this.$parent.toggleMenu();
        },
        /**
         * Returns true or false if given menu item has child or not
         * @param item menuItem
         */
        hasItems(item) {
            return item.subItems !== undefined ? item.subItems.length > 0 : false;
        },
        /**
         * remove active and mm-active class
         */
        _removeAllClass(className) {
            const els = document.getElementsByClassName(className);
            while (els[0]) {
                els[0].classList.remove(className);
            }
        },
        _activateMenuDropdown() {
            this._removeAllClass("mm-active");
            this._removeAllClass("mm-show");

            var links = document.getElementsByClassName("side-nav-link-ref");
            var matchingMenuItem = null;
            const paths = [];

            for (var i = 0; i < links.length; i++) {
                paths.push(links[i]["pathname"]);
            }
            var itemIndex = paths.indexOf(window.location.pathname);
            if (itemIndex === -1) {
                const strIndex = window.location.pathname.lastIndexOf("/");
                const item = window.location.pathname.substr(0, strIndex).toString();
                matchingMenuItem = links[paths.indexOf(item)];
            } else {
                matchingMenuItem = links[itemIndex];
            }

            if (matchingMenuItem) {
                matchingMenuItem.classList.add("active");
                var parent = matchingMenuItem.parentElement;

                /**
                 * TODO: This is hard coded way of expading/activating parent menu dropdown and working till level 3.
                 * We should come up with non hard coded approach
                 */
                if (parent) {
                    parent.classList.add("mm-active");
                    const parent2 = parent.parentElement.closest("ul");
                    if (parent2 && parent2.id !== "side-menu") {
                        parent2.classList.add("mm-show");

                        const parent3 = parent2.parentElement;
                        if (parent3) {
                            parent3.classList.add("mm-active");
                            var childAnchor = parent3.querySelector(".has-arrow");
                            var childDropdown = parent3.querySelector(".has-dropdown");
                            if (childAnchor) childAnchor.classList.add("mm-active");
                            if (childDropdown) childDropdown.classList.add("mm-active");

                            const parent4 = parent3.parentElement;
                            if (parent4 && parent4.id !== "side-menu") {
                                parent4.classList.add("mm-show");
                                const parent5 = parent4.parentElement;
                                if (parent5 && parent5.id !== "side-menu") {
                                    parent5.classList.add("mm-active");
                                    const childanchor = parent5.querySelector(".is-parent");
                                    if (childanchor && parent5.id !== "side-menu") {
                                        childanchor.classList.add("mm-active");
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
    },
};
</script>

<template>
<!-- ========== Left Sidebar Start ========== -->
<div class="vertical-menu">
    <!-- LOGO -->
    <div class="navbar-brand-box">
        <nuxt-link to="/" class="logo logo-dark">
            <span class="logo-sm">
                Dimedic
            </span>
            <span class="logo-lg">
                Dimedic
            </span>
        </nuxt-link>

        <nuxt-link to="/" class="logo logo-light">
            <span class="logo-sm">
                Dimedic
            </span>
            <span class="logo-lg">
                Dimedic
            </span>
        </nuxt-link>
    </div>

    <button type="button" @click="toggleMenu" class="btn btn-sm px-3 font-size-16 header-item vertical-menu-btn">
        <i class="fa fa-fw fa-bars"></i>
    </button>

    <div data-simplebar class="sidebar-menu-scroll">
        <!--- Sidemenu -->
        <div id="sidebar-menu">
            <!-- Left Menu Start -->
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
                            <nuxt-link to="/doctors/specialization" class="side-nav-link-ref">Specialization</nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/doctors/list" class="side-nav-link-ref">Doctor List</nuxt-link>
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
                            <nuxt-link to="/bed-management/type" class="side-nav-link-ref">Type</nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/bed-management/room" class="side-nav-link-ref">Room</nuxt-link>
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
                <!-- <li>
                    <nuxt-link to="/report" class="side-nav-link-ref">
                        <i class="uil uil-chart-line"></i>
                        <span>Report</span>
                    </nuxt-link>
                </li>
                <li>
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
        </div>
        <!-- Sidebar -->
    </div>
</div>
<!-- Left Sidebar End -->
</template>


<style scoped>
@import url('https://unicons.iconscout.com/release/v3.0.0/css/line.css');

</style>