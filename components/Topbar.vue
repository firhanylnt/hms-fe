<script>

/**
 * Topbar component
 */
export default {
    data() {
        return {
            languages: [{
                    flag: require("~/assets/images/flags/us.jpg"),
                    language: "en",
                    title: "English",
                },
                {
                    flag: require("~/assets/images/flags/french.jpg"),
                    language: "fr",
                    title: "French",
                },
                {
                    flag: require("~/assets/images/flags/spain.jpg"),
                    language: "es",
                    title: "spanish",
                },
                {
                    flag: require("~/assets/images/flags/china.png"),
                    language: "zh",
                    title: "Chinese",
                },
                {
                    flag: require("~/assets/images/flags/arabic.png"),
                    language: "ar",
                    title: "Arabic",
                },
            ],
            current_language: this.$i18n.locale,
            text: null,
            flag: null,
            value: null,
        };
    },
    mounted() {
        this.value = this.languages.find((x) => x.language === this.$i18n.locale);
        this.text = this.value.title;
        this.flag = this.value.flag;

        const user = JSON.parse(localStorage.getItem('user'))

        document.getElementById('span-username').innerHTML = user.username
    },
    methods: {
        /**
         * Toggle menu
         */
        toggleMenu() {
            this.$parent.toggleMenu();
        },
        initFullScreen() {
            document.body.classList.toggle("fullscreen-enable");
            if (
                !document.fullscreenElement &&
                /* alternative standard method */
                !document.mozFullScreenElement &&
                !document.webkitFullscreenElement
            ) {
                // current working methods
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                } else if (document.documentElement.mozRequestFullScreen) {
                    document.documentElement.mozRequestFullScreen();
                } else if (document.documentElement.webkitRequestFullscreen) {
                    document.documentElement.webkitRequestFullscreen(
                        Element.ALLOW_KEYBOARD_INPUT
                    );
                }
            } else {
                if (document.cancelFullScreen) {
                    document.cancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                }
            }
        },
        /**
         * Toggle rightsidebar
         */
        toggleRightSidebar() {
            this.$parent.toggleRightSidebar();
        },
        /**
         * Set languages
         */
        setLanguage(locale, country, flag) {
            this.$i18n.locale = locale;
            this.current_language = locale;
            this.text = country;
            this.flag = flag;
        },
        logoutUser() {
            if (process.env.auth === "firebase") {
                this.$store.dispatch("auth/logOut");
            } else if (process.env.auth === "fakebackend") {
                this.$store.dispatch("authfack/logout");
            }
            this.$router.push({
                path: "/account/login",
            });
        },
    },
};
</script>

<template>
<header id="page-topbar">
    <div class="navbar-header">
        <div class="d-flex">
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

            <button @click="toggleMenu" type="button" class="btn btn-sm px-3 font-size-16 header-item vertical-menu-btn" id="vertical-menu-btn">
                <i class="fa fa-fw fa-bars"></i>
            </button>

            <!-- App Search-->
        </div>

        <div class="d-flex">

            <b-dropdown class="d-inline-block" toggle-class="header-item" right variant="white">
                <template v-slot:button-content>
                    <span class="d-none d-xl-inline-block ms-1 fw-medium font-size-15" id="span-username">Administrator</span>
                    <i class="uil-angle-down d-none d-xl-inline-block font-size-15"></i>
                </template>

                <!-- item-->
                <a class="dropdown-item" href="#">
                    <i class="uil uil-user-circle font-size-18 align-middle text-muted me-1"></i>
                    <span class="align-middle">{{ $t('navbar.dropdown.marcus.list.profile') }}</span>
                </a>
                <a class="dropdown-item" @click="logoutUser" href="javascript: void(0);">
                    <i class="uil uil-sign-out-alt font-size-18 align-middle me-1 text-muted"></i>
                    <span class="align-middle">{{ $t('navbar.dropdown.marcus.list.logout') }}</span>
                </a>
            </b-dropdown>

        </div>
    </div>
</header>
</template>
