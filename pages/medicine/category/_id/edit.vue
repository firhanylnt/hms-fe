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
      title: "Edit Category",
      form: {
        category_name: null
      },
      list: []
    };
  },
  middleware: "authentication",
  created() {
    this.get_medicine();
  },
  methods: {
    async get_medicine() {
      try {
        const url = `${process.env.apiBaseUrl}/medicine-categories/${this.$route.params.id}`;
        await this.$axios.$get(url).then(res => {
          this.form.category_name = res.category_name;
        });
        // Handle the JSON data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    async submit() {
      const data = {
        category_name: this.form.category_name
      };

      const url = `${process.env.apiBaseUrl}/medicine-categories/${this.$route.params.id}`;
      await this.$axios.$post(url, data).then(res => {
        this.$router.push(`/medicine/category`);
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
                  <label>Category Name</label>
                  <input
                    v-model="form.category_name"
                    type="text"
                    class="form-control"
                    placeholder="Input Name"
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
