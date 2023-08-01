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
      title: "Edit Hospital",
      form: {
        name: null,
        logo_url: null,
        sidebar_bg: null,
      },
      list: [],
    };
  },
  middleware: "authentication",
  created() {
    this.get_hospital();
  },
  methods: {
    async get_hospital() {
      try {
        const url = `${process.env.apiBaseUrl}/hospitals/${this.$route.params.id}`;
        await this.$axios.$get(url).then(res => {
          this.form.name = res.name;
          this.form.logo_url = res.logo_url;
          this.form.sidebar_bg = res.sidebar_bg;
        });
        // Handle the JSON data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    async submit() {
      const url = `${process.env.apiBaseUrl}/hospitals/${this.$route.params.id}`;
      await this.$axios.$post(url, this.form).then(res => {
        this.$router.push(`/cms-hospital`);
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
                    placeholder="Input Hospital Name"
                  />
                </div>
              </div>
              <div class="col">
                <div class="mb-3">
                  <label>Logo URL</label>
                  <input
                    v-model="form.logo_url"
                    type="text"
                    class="form-control"
                    placeholder="Input hospital logo URL"
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <div class="mb-3">
                  <label>Sidebar Background</label>
                  <input
                    v-model="form.sidebar_bg"
                    type="text"
                    class="form-control"
                    placeholder="Input sidebar background"
                  />
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
