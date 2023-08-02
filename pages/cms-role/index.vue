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
      title: "CMS Role Privileges",
      userRole: "",
      hospital: null,
      form: {
        hospital_id: null,
        modules: {},
        role: null,
      },
      modules: [],
      hospitals: [],
      list_role: ['Admin', 'Receptionist', 'Doctor', 'Nurse', 'Cashier', 'Patient']
    };
  },
  mounted: function () {
    const userRoles = JSON.parse(localStorage.getItem("user"));
    this.userRole = userRoles.role;
  },
  computed: {
  },
  created() {
    this.get_hospitals();
  },
  methods: {
    async showModules() {
      if (this.form.hospital_id != null && this.form.role != null) {
        await this.get_hospital()

        console.log('form modules', this.form.modules)

        document.getElementById('row-modules').style.display = 'block';
      } else {
        document.getElementById('row-modules').style.display = 'none';
      }
    },

    async showRole() {
      document.getElementById('row-role').style.display = this.form.hospital_id != null ? 'block' : 'none';
    },

    async get_hospital() {
      try {
        this.modules = [];
        this.form.modules = {}; // Initialize the form.modules object

        url = `${process.env.apiBaseUrl}/role-modules?hospital_id=${this.form.hospital_id.id}&role=${this.form.role}`;
        await this.$axios.$get(url).then(res => {
          for (let i = 0; i < res.length; i++) {
            const moduleId = res[i].module_id;

            // Update the form.modules object for the retrieved role-modules
            this.form.modules[moduleId] = {
              module_id: moduleId,
              is_visible: res[i].is_visible,
              is_create: res[i].is_create,
              is_read: res[i].is_read,
              is_edit: res[i].is_edit,
              is_delete: res[i].is_delete,
            };
          }
        });

        let url = `${process.env.apiBaseUrl}/hospitals/${this.form.hospital_id.id}`;
        await this.$axios.$get(url).then(res => {
          this.hospital = res;
          this.modules = res.modules;

          // Initialize the form.modules object with default values for all module IDs
          for (let i = 0; i < this.modules.length; i++) {
            const moduleId = this.modules[i].module_id;
            if (moduleId in this.form.modules == false) {
              this.form.modules[moduleId] = {
                module_id: moduleId,
                is_visible: false,
                is_create: false,
                is_read: false,
                is_edit: false,
                is_delete: false,
              };
            }
          }
        });
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
      let modules = []
      Object.keys(this.form.modules).forEach(moduleId => {
        modules.push({
          module_id: moduleId,
          is_visible: this.form.modules[moduleId].is_visible, 
          is_create: this.form.modules[moduleId].is_create, 
          is_read: this.form.modules[moduleId].is_read, 
          is_edit: this.form.modules[moduleId].is_edit, 
          is_delete: this.form.modules[moduleId].is_delete, 
        })
      });

      let formBody = {
        role: this.form.role,
        hospital_id: this.form.hospital_id.id,
        modules: modules
      }

      console.log('form body', formBody)

      const url = `${process.env.apiBaseUrl}/role-modules`
      await this.$axios.$post(url, formBody)
        .then((res) => {
          if (res == 'Success') {
            Swal.fire({
              text: "Role privileges updated!",
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
                  <v-select v-model="form.hospital_id" :options="hospitals" :label="'name'" :value="'id'"
                    class="style-chooser" placeholder="Select Hospital" @input="showRole">
                  </v-select>
                </div>
              </div>
            </div>

            <div class="row" id="row-role" style="display: none;">
              <div class="col">
                <div class="mb-3">
                  <label>Role</label>
                  <v-select v-model="form.role" :options="list_role" class="style-chooser" placeholder="Select role"
                    @input="showModules">
                  </v-select>
                </div>
              </div>
            </div>

            <div class="row" id="row-modules" style="display: none;">
              <div class="col">
                <div class="mb-3">
                  <label>Modules</label>
                  <br>

                  <table>
                    <thead>
                      <tr>
                        <th>Module</th>
                        <th>Visible</th>
                        <th>Create</th>
                        <th>Read</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in modules" :key="index">
                        <td>{{ item.module_name }}</td>
                        <td>
                          <input type="checkbox" :value="true" v-model="form.modules[item.module_id].is_visible" />
                        </td>
                        <td>
                          <input type="checkbox" :value="true" v-model="form.modules[item.module_id].is_create" />
                        </td>
                        <td>
                          <input type="checkbox" :value="true" v-model="form.modules[item.module_id].is_read" />
                        </td>
                        <td>
                          <input type="checkbox" :value="true" v-model="form.modules[item.module_id].is_edit" />
                        </td>
                        <td>
                          <input type="checkbox" :value="true" v-model="form.modules[item.module_id].is_delete" />
                        </td>
                      </tr>
                    </tbody>
                  </table>

                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <div>
                  <b-button variant="primary" @click="submit">
                    Update Role Privileges
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

<style>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}

/* Checkbox styles */
input[type="checkbox"] {
  width: 16px;
  height: 16px;
  margin: 0;
  vertical-align: middle;
}</style>
