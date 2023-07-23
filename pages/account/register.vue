<script>
import { required, email } from "vuelidate/lib/validators";

/**
 * Register component
 */
export default {
  layout: "auth",
  head() {
    return {
      title: `${this.title} | HMS`,
    };
  },
  data() {
    return {
      genderOptions: ["Male", "Female", "Other"], // Define the gender options here
      user: {
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        gender: "",
        dob: "",
        phone: "",
        address: "",
      },
      submitted: false,
      tryingToRegister: false,
      isRegisterError: false,
      title: "Register",
    };
  },
  validations: {
    user: {
      username: {
        required,
      },
      email: {
        required,
        email,
      },
      password: {
        required,
      },
      first_name: {
        required,
      },
      last_name: {
        required,
      },
      gender: {
        required,
      },
      dob: {
        required,
      },
      phone: {
        required,
      },
      address: {
        required,
      },
    },
  },
  computed: {
    notification() {
      return this.$store ? this.$store.state.notification : null;
    },
    notificationAutoCloseDuration() {
      return this.$store && this.$store.state.notification ? 5 : 0;
    },
  },
  methods: {
    // Try to register the user in with the email, username
    // and password they provided.
    async tryToRegisterIn() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      } else {
        console.log('form', this.user)
        const url = `${process.env.apiBaseUrl}/auth/register`;
        const response = await this.$axios.$post(url, this.user);
        console.log(response)
        if (response.success) {
          this.$router.push(`/account/login`);
        } else {
          alert(response.error)
        }
      }
    },
  },
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
        <div class="row">
          <div class="col-lg-12">
            <div class="text-center">
              <h1>Dimedic</h1>
            </div>
          </div>
        </div>
        <div class="row align-items-center justify-content-center">
          <div class="col-md-8 col-lg-6 col-xl-5">
            <div class="card">
              <div class="card-body p-4">
                <div class="text-center mt-2">
                  <h5 class="text-primary">Register Account</h5>
                  <p class="text-muted">Get your Dimedic account now.</p>
                </div>
                <div class="p-2 mt-4">
                  <div v-if="notification.message" :class="'alert ' + notification.type">
                    {{ notification.message }}
                  </div>

                  <b-form @submit.prevent="tryToRegisterIn">
                    <b-form-group id="username-group" label="Username" label-for="username" class="mb-3">
                      <b-form-input id="username" v-model="user.username" type="text" placeholder="Enter username"
                        :class="{ 'is-invalid': submitted && $v.user.username.$error }"></b-form-input>
                      <div v-if="submitted && !$v.user.username.required" class="invalid-feedback">
                        Username is required.
                      </div>
                    </b-form-group>

                    <b-form-group id="email-group" label="Email" label-for="email" class="mb-3">
                      <b-form-input id="email" v-model="user.email" type="email" placeholder="Enter email"
                        :class="{ 'is-invalid': submitted && $v.user.email.$error }"></b-form-input>
                      <div v-if="submitted && $v.user.email.$error" class="invalid-feedback">
                        <span v-if="!$v.user.email.required">Email is required.</span>
                        <span v-if="!$v.user.email.email">Please enter a valid email.</span>
                      </div>
                    </b-form-group>

                    <b-form-group id="password-group" label="Password" label-for="password" class="mb-3">
                      <b-form-input id="password" v-model="user.password" type="password" placeholder="Enter password"
                        :class="{ 'is-invalid': submitted && $v.user.password.$error }"></b-form-input>
                      <div v-if="submitted && !$v.user.password.required" class="invalid-feedback">
                        Password is required.
                      </div>
                    </b-form-group>

                    <!-- Additional input fields for the RegisterAuthDto -->
                    <b-form-group id="first-name-group" label="First Name" label-for="first-name" class="mb-3">
                      <b-form-input id="first-name" v-model="user.first_name" type="text" placeholder="Enter first name"
                        :class="{ 'is-invalid': submitted && $v.user.first_name.$error }"></b-form-input>
                      <div v-if="submitted && !$v.user.first_name.required" class="invalid-feedback">
                        First Name is required.
                      </div>
                    </b-form-group>

                    <b-form-group id="last-name-group" label="Last Name" label-for="last-name" class="mb-3">
                      <b-form-input id="last-name" v-model="user.last_name" type="text" placeholder="Enter last name"
                        :class="{ 'is-invalid': submitted && $v.user.last_name.$error }"></b-form-input>
                      <div v-if="submitted && !$v.user.last_name.required" class="invalid-feedback">
                        Last Name is required.
                      </div>
                    </b-form-group>

                    <b-form-group id="gender-group" label="Gender" label-for="gender" class="mb-3">
                      <b-form-select
                        id="gender"
                        v-model="user.gender"
                        :options="genderOptions"
                        placeholder="Select gender"
                        :class="{ 'is-invalid': submitted && $v.user.gender.$error }"
                      ></b-form-select>                      
                      <div v-if="submitted && !$v.user.gender.required" class="invalid-feedback">
                        Gender is required.
                      </div>
                    </b-form-group>

                    <b-form-group id="dob-group" label="Date of Birth" label-for="dob" class="mb-3">
                      <b-form-input id="dob" v-model="user.dob" type="date"
                        :class="{ 'is-invalid': submitted && $v.user.dob.$error }"></b-form-input>
                      <div v-if="submitted && !$v.user.dob.required" class="invalid-feedback">
                        Date of Birth is required.
                      </div>
                    </b-form-group>

                    <b-form-group id="phone-group" label="Phone" label-for="phone" class="mb-3">
                      <b-form-input id="phone" v-model="user.phone" type="text" placeholder="Enter phone number"
                        :class="{ 'is-invalid': submitted && $v.user.phone.$error }"></b-form-input>
                      <div v-if="submitted && !$v.user.phone.required" class="invalid-feedback">
                        Phone number is required.
                      </div>
                    </b-form-group>

                    <b-form-group id="address-group" label="Address" label-for="address" class="mb-3">
                      <b-form-input id="address" v-model="user.address" type="text" placeholder="Enter address"
                        :class="{ 'is-invalid': submitted && $v.user.address.$error }"></b-form-input>
                      <div v-if="submitted && !$v.user.address.required" class="invalid-feedback">
                        Address is required.
                      </div>
                    </b-form-group>

                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="auth-terms-condition-check" />
                      <label class="form-check-label" for="auth-terms-condition-check">I accept
                        <a href="javascript: void(0);" class="text-dark">Terms and Conditions</a></label>
                    </div>
                    <div class="mt-3 text-end">
                      <b-button type="submit" variant="primary" class="w-sm">Register</b-button>
                    </div>

                    <div class="mt-4 text-center">
                      <p class="text-muted mb-0">
                        Already have an account ?
                        <nuxt-link to="/account/login" class="fw-medium text-primary">Login</nuxt-link>
                      </p>
                    </div>

                  </b-form>
                </div>
                <!-- end card-body -->
              </div>
              <!-- end card -->
            </div>
            <div class="mt-5 text-center">
              <p>
                © {{ new Date().getFullYear() }} Minible. Crafted with
                <i class="mdi mdi-heart text-danger"></i> by Themesbrand
              </p>
            </div>
          </div>
          <!-- end col -->
        </div>
      </div>
    </div>
    <!-- end row -->
  </div>
</template>

<style lang="scss" module></style>
