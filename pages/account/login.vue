<script>
import { required, email } from "vuelidate/lib/validators";

/**
 * Login component
 */
export default {
  layout: "auth",
  data() {
    return {
      email: "super_admin@dividefense.com",
      password: "fajar123",
      submitted: false,
      authError: null,
      tryingToLogIn: false,
      isAuthError: false
    };
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  computed: {
    notification() {
      return this.$store ? this.$store.state.notification : null;
    },
    notificationAutoCloseDuration() {
      return this.$store && this.$store.state.notification ? 5 : 0;
    }
  },
  mounted: function() {
    const urlParams = new URLSearchParams(window.location.search);
    const as = urlParams.get('as')

    if (as != null) {
      const role = as.charAt(0).toUpperCase() + as.slice(1);
      document.getElementById('role-login').innerHTML = ' as a <b>' + role + '</b>'
    }
  },
  methods: {
    // Try to log the user in with the username
    // and password they provided.
    async tryToLogIn() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      } else {
        
        const { email, password } = this;
          if (email && password) {
            try {
              const url = `${process.env.apiBaseUrl}/auth/login`;
              const response = await this.$axios.$post(url, {
                email: email,
                password: password
              });

              console.log('res login', response);

              if (response.success) {
                // this.$store.dispatch("authfack/login", {
                //   email: email,
                //   password: password
                // });

                let user = response.data
                user['token'] = 'fake-jwt-token'
                localStorage.setItem('user', JSON.stringify(user));

                this.$router.push({ path: "/" });
              } else {
                alert(response.error)
              }
            } catch (error) {
              console.error('Error during login:', error);
            }

          }
      }
    }
  }
};
</script>

<template>
  <div>
    <div class="home-btn d-none d-sm-block">
      <nuxt-link to="/" class="text-dark">
        <i class="mdi mdi-home-variant h2"></i>
      </nuxt-link>
    </div>
    <div class="account-pages my-5 pt-sm-5">
      <div class="container">
        <!-- <div class="row">
          <div class="col-lg-12">
            <div class="text-center">
              <nuxt-link to="/" class="mb-5 d-block auth-logo">
                <img
                  src="~/assets/images/logo-dark.png"
                  alt
                  height="22"
                  class="logo logo-dark"
                />
                <img
                  src="~/assets/images/logo-light.png"
                  alt
                  height="22"
                  class="logo logo-light"
                />
              </nuxt-link>
            </div>
          </div>
        </div> -->
        <div class="row align-items-center justify-content-center">
          <div class="col-md-8 col-lg-6 col-xl-5">
            <div class="card">
              <div class="card-body p-4">
                <div class="text-center mt-2">
                  <h5 class="text-primary">Welcome Back !</h5>
                  <p class="text-muted">Sign in to continue to Dimedic<span id="role-login"></span>.</p>
                </div>
                <div class="p-2 mt-4">
                  <b-alert
                    v-model="isAuthError"
                    variant="danger"
                    class="mt-3"
                    dismissible
                    >{{ authError }}</b-alert
                  >

                  <div
                    v-if="notification.message"
                    :class="'alert ' + notification.type"
                  >
                    {{ notification.message }}
                  </div>

                  <b-form @submit.prevent="tryToLogIn">
                    <b-form-group
                      id="input-group-1"
                      label="Email"
                      label-for="input-1"
                      class="mb-3"
                    >
                      <b-form-input
                        id="input-1"
                        v-model="email"
                        type="text"
                        placeholder="Enter email"
                        :class="{ 'is-invalid': submitted && $v.email.$error }"
                      ></b-form-input>
                      <div
                        v-if="submitted && $v.email.$error"
                        class="invalid-feedback"
                      >
                        <span v-if="!$v.email.required"
                          >Email is required.</span
                        >
                        <span v-if="!$v.email.email"
                          >Please enter valid email.</span
                        >
                      </div>
                    </b-form-group>

                    <b-form-group id="input-group-2" class="mb-3">
                      <div class="float-end">
                        <nuxt-link
                          to="/account/forgot-password"
                          class="text-muted"
                          >Forgot password?</nuxt-link
                        >
                      </div>
                      <label for="input-2">Password</label>
                      <b-form-input
                        id="input-2"
                        v-model="password"
                        type="password"
                        placeholder="Enter password"
                        :class="{
                          'is-invalid': submitted && $v.password.$error
                        }"
                      ></b-form-input>
                      <div
                        v-if="submitted && !$v.password.required"
                        class="invalid-feedback"
                      >
                        Password is required.
                      </div>
                    </b-form-group>
                    <div class="form-check">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="auth-remember-check"
                      />
                      <label class="form-check-label" for="auth-remember-check"
                        >Remember me</label
                      >
                    </div>
                    <div class="mt-3 text-end">
                      <b-button type="submit" variant="primary" class="w-sm"
                        >Log In</b-button
                      >
                    </div>
                  </b-form>
                </div>
                <!-- end card-body -->
              </div>
              <!-- end card -->
            </div>
            <div class="mt-5 text-center">
              <p>
              Dimedic  © {{ new Date().getFullYear() }}
              </p>
            </div>
            <!-- end row -->
          </div>
          <!-- end col -->
        </div>
        <!-- end row -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" module></style>
