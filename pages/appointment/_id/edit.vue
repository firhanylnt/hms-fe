<script>
import Swal from "sweetalert2";

/**
 * Dashboard component
 */
export default {
  head() {
    return {
      title: `${this.title} | HMS`
    };
  },
  data() {
    return {
      title: "Edit Appointment",
      form: {
        doctor_id: null,
        email: null,
        phone_number: null,
        patient_name: null,
        patient_gender: null,
        appointment_date: null,
        payment_method: null,
        description: null,
        is_approved: null,
        specialization: null
      },
      list: [],
      list_gender: ["Male", "Female"],
      list_specialization: [],
      list_doctor: [],
      list_status: ["True", "False"]
    };
  },
  middleware: "authentication",
  created() {
    this.get_appointment();
    this.get_list_specialization();
  },
  methods: {
    async get_appointment() {
      try {
        const url = `${process.env.apiBaseUrl}/appointments/${this.$route.params.id}`;
        await this.$axios.$get(url).then(res => {
          this.form.patient_name = res.patient_name;
          this.form.email = res.email;
          this.form.phone_number = res.phone_number;
          this.form.description = res.description;
          this.form.is_approved = res.is_approved;
          this.form.patient_gender = res.patient_gender;
          this.form.doctor_id = res.doctor;
          this.form.specialization = res.specialization;
          this.get_list_doctor();
          this.form.appointment_date = this.convert_date(res.date);

          //   this.form.payment_method = res.payment;
        });
        // Handle the JSON data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    async get_list_specialization() {
      try {
        const url = `${process.env.apiBaseUrl}/specialization`;
        await this.$axios.$get(url).then(res => {
          this.list_specialization = res;
        });
        // Handle the JSON data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    async get_list_doctor() {
      try {
        const url = `${process.env.apiBaseUrl}/doctors?specialization=${this.form.specialization}`;
        await this.$axios.$get(url).then(res => {
          this.list_doctor = res;

          console.log(res);
        });
        // Handle the JSON data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    convert_date(e) {
      const date = e === null ? new Date() : new Date(e);
      const year = date.getUTCFullYear();
      const month = date.getUTCMonth() + 1;
      const day = date.getUTCDate();
      const hour = date.getUTCHours();
      const minute = date.getUTCMinutes();
      const localDatetime =
        year +
        "-" +
        (month < 10 ? "0" + month.toString() : month) +
        "-" +
        (day < 10 ? "0" + day.toString() : day) +
        "T" +
        (hour < 10 ? "0" + hour.toString() : hour) +
        ":" +
        (minute < 10 ? "0" + minute.toString() : minute);
      return localDatetime;
    },

    async submit() {
      if (Boolean(this.form.is_approved)) {
        Swal.fire({
          title: "Are you sure?",
          text:
            this.form.doctor_id +
            " will handle Appointment by " +
            this.form.patient_name +
            " at " +
            this.form.appointment_date,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#34c38f",
          cancelButtonColor: "#f46a6a",
          confirmButtonText: "Yes"
        }).then(async result => {
          const specialization = this.list_specialization.filter(
            el => el.specialization === this.form.specialization
          );

          const getDoctor = this.list_doctor.filter(
            el => el.name === this.form.doctor_id
          );

          const data = {
            specialization_id: specialization[0].id,
            doctor_id: getDoctor[0].id,
            email: this.form.email,
            phone_number: this.form.phone_number,
            patient_name: this.form.patient_name,
            patient_gender: this.form.patient_gender,
            appointment_date: this.form.appointment_date,
            description: this.form.description,
            is_approved: Boolean(this.form.is_approved)
          };

          //   console.log(this.list_doctor);
          //   console.log(getDoctor);
          console.log(data);

          const url = `${process.env.apiBaseUrl}/appointments/${this.$route.params.id}`;
          await this.$axios.$post(url, data).then(res => {
            this.$router.push(`/appointment`);
          });
        });
      } else {
        const specialization = this.list_specialization.filter(
          el => el.specialization === this.form.specialization
        );

        const getDoctor = this.list_doctor.filter(
          el => el.name === this.form.doctor_id
        );

        const data = {
          specialization_id: specialization[0].id,
          doctor_id: getDoctor[0].id,
          email: this.form.email,
          phone_number: this.form.phone_number,
          patient_name: this.form.patient_name,
          patient_gender: this.form.patient_gender,
          appointment_date: this.form.appointment_date,
          description: this.form.description,
          is_approved: Boolean(this.form.is_approved)
        };

        console.log(data);

        const url = `${process.env.apiBaseUrl}/appointments/${this.$route.params.id}`;
        await this.$axios.$post(url, data).then(res => {
          this.$router.push(`/appointment`);
        });
      }
    }
  }
};
</script>

<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-sm-12 col-md-4 mb-3">
            <b-button variant="light" @click="$router.back()">
              <i class="mdi mdi-arrow-left-bold-outline me-2"></i>
              Back
            </b-button>
          </div>
        </div>

        <!-- detail -->
        <div class="card">
          <div class="card-body">
            <h4 class="card-title mt-2 mb-4">{{ title }}</h4>

            <div class="row">
              <div class="col">
                <div class="mb-3">
                  <label>Patient</label>
                  <input
                    v-model="form.patient_name"
                    type="text"
                    class="form-control"
                    placeholder="Patien Name"
                  />
                </div>
              </div>
              <div class="col">
                <div class="mb-3">
                  <label>Patient Gender</label>
                  <v-select
                    v-model="form.patient_gender"
                    :options="list_gender"
                    class="style-chooser"
                    placeholder="Select Gender"
                  >
                  </v-select>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <div class="mb-3">
                  <label>Email</label>
                  <input
                    v-model="form.email"
                    type="email"
                    class="form-control"
                    placeholder="Email Address"
                  />
                </div>
              </div>
              <div class="col">
                <div class="mb-3">
                  <label>Phone Number</label>
                  <input
                    v-model="form.phone_number"
                    type="text"
                    class="form-control"
                    placeholder="Phone Number"
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <div class="mb-3">
                  <label>Specialization</label>
                  <v-select
                    v-model="form.specialization"
                    :options="list_specialization"
                    :value="'specialization'"
                    label="specialization"
                    :reduce="
                      list_specialization => list_specialization.specialization
                    "
                    class="style-chooser"
                    @input="get_list_doctor"
                    placeholder="Select specialization"
                  >
                  </v-select>
                </div>
              </div>
              <div class="col">
                <div class="mb-3">
                  <label>Doctor</label>
                  <v-select
                    v-model="form.doctor_id"
                    :options="list_doctor"
                    :label="'name'"
                    :value="'id'"
                    class="style-chooser"
                    placeholder="Select Doctor"
                  >
                  </v-select>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <div class="mb-3">
                  <label>Date</label>
                  <input
                    v-model="form.appointment_date"
                    type="datetime-local"
                    class="form-control"
                    placeholder="Appointment Date"
                  />
                </div>
              </div>
              <div class="col">
                <div class="mb-3">
                  <label>Approval Status</label>
                  <v-select
                    v-model="form.is_approved"
                    :options="list_status"
                    class="style-chooser"
                    placeholder="Select Status"
                  >
                  </v-select>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label>Description</label>
                  <textarea
                    v-model="form.description"
                    type="text"
                    class="form-control"
                    placeholder="Input Description"
                    rows="4"
                  ></textarea>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12 mt-4">
                <div>
                  <b-button variant="light" @click="$router.back()">
                    Cancel
                  </b-button>
                  <b-button variant="primary" @click="submit">
                    Submit
                  </b-button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- end -->
      </div>
    </div>
  </div>
</template>

<style>
.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle,
.style-chooser .vs__dropdown-menu,
.style-chooser .vs__selected {
  font-size: 14px;
  padding: 0.3em !important;
}

.style-chooser .vs__clear,
.style-chooser .vs__open-indicator {
  font-size: 14px;
}
</style>
