<script>
import Swal from "sweetalert2";
/**
 * Dashboard component
 */
export default {
  head() {
    return {
      title: `${this.title} | Dimedic`
    };
  },
  data() {
    return {
      title: "Appointment",
      userRole: "",
      user: null,
      appointments: [],
      months: ['January', 'February', 'March', 'April', 'Mei', 'June', 'July', 'August', 'September', 'November', 'December']
    };
  },
  mounted: function () {
    const userRoles = JSON.parse(localStorage.getItem("user"));
    this.userRole = userRoles.role;
    this.user = userRoles
  },
  computed: {
  },
  created() {
    this.get_data();
  },
  methods: {
    convertDate(dateString) {
      const date = new Date(dateString)

      return `${date.getUTCDate()} ${this.months[date.getUTCMonth() - 1]} ${date.getUTCFullYear()} ${date.getUTCHours() < 10 ? '0' + date.getUTCHours() : date.getUTCHours()}:${date.getUTCMinutes() < 10 ? '0' + date.getUTCMinutes() : date.getUTCMinutes()}`
    },

    async get_data() {
      try {
        let user = JSON.parse(localStorage.getItem("user"));
        let url = `${process.env.apiBaseUrl}/appointments?`;
        if (user.role != 'Super Admin' && user.role != 'Receptionist') {
          url += `user_id=${user.id}&`;
        }
        if (user.role == 'Patient') {
          url += `email=${user.email}`
        }
        await this.$axios.$get(url).then(res => {
          console.log('res', res);
          this.appointments = res;
        });
        // Handle the JSON data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    create() {
      this.$router.push(`/appointment/create`);
    },

    move(id) {
      this.$router.push(`/appointment/${id}/edit`);
    },

    confirm(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#34c38f",
        cancelButtonColor: "#f46a6a",
        confirmButtonText: "Yes, delete it!"
      }).then(async result => {
        if (result.value) {
          const url = `${process.env.apiBaseUrl}/appointments/delete/${id}`;
          await this.$axios.$post(url).then(() => {
            Swal.fire("Deleted!", "Appointment has been deleted.", "success");
            this.get_data();
          });
        }
      });
    }
  },
  middleware: "authentication"
};
</script>

<template>
  <div>
    <div class="row">
      <div v-for="(detail, index) in appointments" :key="detail.id" class="card">
        <div style="padding: 5px">
          <table class="table table-responsive">
            <tr>
              <td class="label">Booking ID :</td>
              <td class="value">{{ detail.id }}</td>
            </tr>
            <tr>
              <td class="label">Appointment Date :</td>
              <td class="value">{{ convertDate(detail.appointment_date) }}</td>
            </tr>
            <tr>
              <td class="label">Polyclinic :</td>
              <td class="value">{{ detail.specialization }}</td>
            </tr>
            <tr>
              <td class="label">Doctor :</td>
              <td class="value">{{ detail.doctor ?? '-' }}</td>
            </tr>
            <tr>
              <td class="label">Patient Name :</td>
              <td class="value">{{ detail.patient_name }}</td>
            </tr>
            <tr>
              <td class="label">Patient Gender :</td>
              <td class="value">{{ detail.patient_gender }}</td>
            </tr>
            <tr>
              <td class="label">Email :</td>
              <td class="value">{{ detail.email }}</td>
            </tr>
            <tr>
              <td class="label">Phone Number :</td>
              <td class="value">{{ detail.phone_number }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
  
<style>
table {
  width: 100%;
}

.label,
.value {
  width: 50%;
}
</style>  