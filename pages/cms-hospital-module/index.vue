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
      title: "CMS Hospital Module",
      userRole: "",
      hospital: null,
      form: {
        hospital_id: null,
        modules_id: []
      },
      modules: [],
      hospitals: [],
    };
  },
  mounted: function() {
    const userRoles = JSON.parse(localStorage.getItem("user"));
    this.userRole = userRoles.role;
  },
  computed: {
  },
  created() {
    this.get_hospitals();
    this.get_modules();
  },
  methods: {
    async get_modules() {
      try {
        let url = `${process.env.apiBaseUrl}/modules`;
        await this.$axios.$get(url).then(res => {
          this.modules = res;
        });
        // Handle the JSON data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    async showModules() {
      if (this.form.hospital_id != null) {
        await this.get_hospital()

        console.log('hospital', this.hospital)
      }

      document.getElementById('row-modules').style.display = this.form.hospital_id != null ? 'block' : 'none';
    },

    async get_hospital() {
      try {
        this.form.modules_id = []

        let url = `${process.env.apiBaseUrl}/hospitals/${this.form.hospital_id.id}`;
        await this.$axios.$get(url).then(res => {
          this.hospital = res;

          for (let i = 0; i < res.modules.length; i++) {
            this.form.modules_id.push(res.modules[i].module_id)
          }
        });
        // Handle the JSON data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    async get_hospitals() {
      try {
        let url = `${process.env.apiBaseUrl}/hospitals`;
        await this.$axios.$get(url).then(res => {
          this.hospitals = res;
        });
        // Handle the JSON data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    async submit() {
      let formBody = {
        hospital_id: this.form.hospital_id.id,
        modules_id: this.form.modules_id
      }

      const url = `${process.env.apiBaseUrl}/hospitals-modules`
      await this.$axios.$post(url, formBody)
      .then((res) => {
        if (res == 'Success') {
          Swal.fire({
            text: "Hospital module updated!",
            icon: "success",
          })
        }
      })
    },

    create() {
      this.$router.push(`/cms-module/create`);
    },

    move(id) {
      this.$router.push(`/cms-module/${id}/edit`);
    },
  },
  middleware: "authentication"
};
</script>

<template>
  <div>
    <PageHeader :title="title" />

    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col">
                <div class="mb-3">
                  <label>Hospital</label>
                  <v-select
                    v-model="form.hospital_id" 
                    :options="hospitals" 
                    :label="'name'"
                    :value="'id'"
                    class="style-chooser"
                    placeholder="Select Hospital"
                    @input="showModules"
                  >
                  </v-select>
                </div>
              </div>
            </div>

            <div class="row" id="row-modules" style="display: none;">
              <div class="col">
                <div class="mb-3">
                  <label>Modules</label>
                  <br>
                  <label v-for="(item, index) in modules" style="display: block;" :key="index">
                  <input
                    type="checkbox"
                    :value="item.id"
                    v-model="form.modules_id"
                  />
                    {{ item.name }}
                  </label>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <div>
                  <b-button variant="primary" @click="submit">
                    Update Module
                  </b-button>
                </div>                  
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
