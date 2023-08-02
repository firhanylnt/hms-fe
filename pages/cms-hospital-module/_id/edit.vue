<script>
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
      title: "Edit Module",
      form: {
        name: null,
        url_path: null,
        icon: null,
        is_active: null
      },
      list: [],
      list_status: ["Active", "Inactive"],
    };
  },
  middleware: "authentication",
  created() {
    this.get_module();
  },
  methods: {
    async get_module() {
      try {
        const url = `${process.env.apiBaseUrl}/modules/${this.$route.params.id}`;
        await this.$axios.$get(url).then(res => {
          this.form.name = res.name;
          this.form.url_path = res.url_path;
          this.form.icon = res.icon;
          this.form.is_active = res.is_active ? 'Active' : 'Inactive';
        });
        // Handle the JSON data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    async submit() {
      this.form.is_active = this.form.is_active == 'Active' ? true : false

      const url = `${process.env.apiBaseUrl}/modules/${this.$route.params.id}`;
      await this.$axios.$post(url, this.form).then(res => {
        this.$router.push(`/cms-module`);
      });
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
                  <label>Module Name</label>
                  <input
                    v-model="form.name"
                    type="text"
                    class="form-control"
                    placeholder="Input Module Name"
                  />
                </div>
              </div>
              <div class="col">
                <div class="mb-3">
                  <label>Frontend URL Path</label>
                  <input
                    v-model="form.url_path"
                    type="text"
                    class="form-control"
                    placeholder="Input URL Path (starts with /)"
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <div class="mb-3">
                  <label>Icon</label>
                  <input
                    v-model="form.icon"
                    type="text"
                    class="form-control"
                    placeholder="Input Icon Class"
                  />
                </div>
              </div>
              <div class="col">
                <div class="mb-3">
                  <label>Status</label>
                  <v-select
                    v-model="form.is_active"
                    :options="list_status"
                    class="style-chooser"
                    placeholder="Select Module Status"
                  >
                  </v-select>
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
