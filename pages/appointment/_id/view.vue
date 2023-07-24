<script>
/**
 * Dashboard component
 */
export default {
  head() {
    return {
      title: `${this.title} | Dimedic`,
    };
  },
  data() {
    return {
      title: "Detail Appointment",
      appointment: null,
    };
  },
  middleware: "authentication",
  created() {
    this.get_appointment()
  },
  methods: {
    async get_appointment() {
      try {
        const url = `${process.env.apiBaseUrl}/appointments/${this.$route.params.id}`
        await this.$axios.$get(url)
          .then((res) => {
            if (typeof(res) == 'object') this.appointment = res
            else this.$router.push(`/appointment`);
          })
      } catch (error) {
        console.error('Error fetching data:', error);
      }

    },

    convert_date(e) {
      const date = e === null ? new Date() : new Date(e)
      const year = date.getUTCFullYear();
      const month = date.getUTCMonth() + 1;
      const day = date.getUTCDate();
      const hour = date.getUTCHours();
      const minute = date.getUTCMinutes();
      const localDatetime =
        year +
        '-' +
        (month < 10 ? '0' + month.toString() : month) +
        '-' +
        (day < 10 ? '0' + day.toString() : day) +
        'T' +
        (hour < 10 ? '0' + hour.toString() : hour) +
        ':' +
        (minute < 10 ? '0' + minute.toString() : minute);
      return localDatetime;
    },
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


            <div v-if="appointment">
              <div class="row">
                <div class="col">
                  <div class="mb-3">
                    <p>Appointment ID: {{ this.appointment.id }}</p>
                    <p>Patient Email: {{ this.appointment.email }}</p>
                    <p>Patient Phone Number: {{ this.appointment.phone_number }}</p>
                    <p>Patient Name: {{ this.appointment.patient_name }}</p>
                    <p>Patient Gender: {{ this.appointment.patient_gender }}</p>
                    <p>Appointment Date: {{ new Date(this.appointment.date).toISOString() }}</p>
                    <p>Description: {{ this.appointment.description }}</p>
                    <p>Polyclinic: {{ this.appointment.specialization }}</p>
                    <p>Doctor: {{ this.appointment.doctor }}</p>
                    <p>Is Approved by Receptionist: {{ this.appointment.is_approved ? 'Yes' : 'No' }}</p>
                    <p>Is Needed OPD (Decided by Doctor): {{ this.appointment.is_need_opd === true ? 'Needed OPD' : this.appointment.is_need_opd === false ? 'Not Needed' : 'Not Decided Yet' }}</p>
                  </div>
                </div>
              </div>
              <!-- Other appointment details can be added here -->
            </div>
          </div>
        </div>
        <!-- end -->
      </div>
    </div>

  </div>
</template>

