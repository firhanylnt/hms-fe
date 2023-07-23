<script>
import MetisMenu from "metismenujs/dist/metismenujs";

import { mapState } from "vuex";

import { menuItems } from "../menu";

/**
 * Sidebar component
 */
export default {
  data() {
    return {
      menuItems: menuItems
    };
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
      }
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
      }
    }
  },
  mounted: function() {
    // eslint-disable-next-line no-unused-vars

    const userRole = JSON.parse(localStorage.getItem("user"));
    this.role = userRole.role;

    var menuRef = new MetisMenu("#side-menu");
    this._activateMenuDropdown();

    this.$router.afterEach((routeTo, routeFrom) => {
      this._activateMenuDropdown();
    });

    const user = JSON.parse(localStorage.getItem("user"));

    const roles = {
      doctor: [
        "menu-appointment",
        "menu-patients",
        "menu-medicines",
        "menu-laboratory",
        "menu-blood-banks",
        "menu-pharmacists"
      ],
      Receptionist: [
        "menu-dashboard",
        "menu-appointment",
        "menu-ipd",
        "menu-doctors",
        "menu-patients",
        "menu-bed-management",
        "menu-medicines",
        "menu-laboratory",
        "menu-blood-banks",
        "menu-pharmacists",
        "menu-nurses"
      ],
      patient: ["menu-appointment"],
      "Super Admin": [
        "menu-dashboard",
        "menu-appointment",
        "menu-ipd",
        "menu-doctors",
        "menu-patients",
        "menu-bed-management",
        "menu-medicines",
        "menu-laboratory",
        "menu-blood-banks",
        "menu-pharmacists",
        "menu-nurses"
      ]
    };

    if (user.role != "admin") {
      const liMenus = document.getElementsByClassName("li-menus");
      for (let i = 0; i < liMenus.length; i++) {
        const menuItem = liMenus[i];
        const menuId = menuItem.getAttribute("id");

        console.log(menuItem, menuId);

        if (!roles[user.role].includes(menuId)) {
          menuItem.style.display = "none";
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
    }
  }
};
</script>

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
      <a href="javascript:void(0);" class="is-parent has-dropdown">
        <i class="uil-clipboard-notes"></i>
        <span class="pt-2">Appointment</span>
      </a>
      <ul class="sub-menu" aria-expanded="false">
        <li>
          <nuxt-link to="/doctors/list" class="side-nav-link-ref"
            >Doctor</nuxt-link
          >
        </li>
        <li>
          <nuxt-link to="/appointment" class="side-nav-link-ref"
            >Appointment</nuxt-link
          >
        </li>
      </ul>
    </li>
    <li class="li-menus" id="menu-doctors">
      <nuxt-link to="/doctors/list" class="side-nav-link-ref">
        <!-- <i class="fas fa-home"></i> -->
        <i class="mdi mdi-doctor"></i>
        <span>Doctor</span>
      </nuxt-link>
    </li>
    <li class="li-menus" id="menu-patiens">
      <nuxt-link to="/patients" class="side-nav-link-ref">
        <!-- <i class="fas fa-home"></i> -->
        <i class="uil uil-user-plus"></i>
        <span>Patient</span>
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
