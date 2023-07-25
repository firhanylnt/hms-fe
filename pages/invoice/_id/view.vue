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
      title: "View Invoice",
      userRole: "",
      disabled: null,
      form: {
        patient_id: null,
        type: null,
        total_amount: null,
        details: [],
        status: null,
        payment_method: null
      },
      list_type: ["IPD", "OPD"],
      list_payment: ["Individual", "Insurance"],
      list_status: ["Pending", "Paid"],
      list_patient: []
    };
  },
  mounted: function() {
    const userRoles = JSON.parse(localStorage.getItem("user"));
    this.userRole = userRoles.role;
  },
  middleware: "authentication",
  created() {
    this.get_list_patient();
    this.get_data();
  },
  methods: {
    async get_data() {
      try {
        const url = `${process.env.apiBaseUrl}/invoice/view/${this.$route.params.id}`;
        await this.$axios.$get(url).then(res => {
          this.form.patient_id = res.invoice.patient_id;
          this.form.type = res.invoice.type;
          this.form.total_amount = res.invoice.total_amount;
          this.form.status = res.invoice.status === false ? "Pending" : "Paid";
          this.form.payment_method = res.invoice.payment_method;
          this.form.details = res.details;
        });

        this.disabled = this.userRole === "Patient" ? "disabled" : "";
        // Handle the JSON data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    async get_list_patient() {
      try {
        const url = `${process.env.apiBaseUrl}/patients`;
        await this.$axios.$get(url).then(res => {
          console.log(res);
          res.map(v => {
            const arr = {
              name: v.first_name + " " + v.last_name,
              dob: v.dob,
              id: v.id
            };
            this.list_patient.push(arr);
          });
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    AddformData() {
      this.form.details.push({
        item: "",
        qty: "",
        price: "",
        subtotal: ""
      });
    },

    deleteRow(index) {
      if (confirm("Are you sure you want to delete this element?"))
        this.form.details.splice(index, 1);
    },

    calculate(i) {
      this.form.details[i].subtotal =
        this.form.details[i].qty * this.form.details[i].price;
      this.subtotal();
    },

    subtotal() {
      let total = 0;
      this.form.details.map(v => {
        total += v.subtotal;
      });
      console.log(total);
      this.form.total_amount = total;
    },

    async submit() {
      console.log(this.form);
      const url = `${process.env.apiBaseUrl}/invoice/${this.$route.params.id}`;
      await this.$axios.$post(url, this.form).then(res => {
        this.$router.push(`/invoice`);
      });
    },

    print() {
      this.$router.push(`/invoice/${this.$route.params.id}/print`);
    }
  }
};
</script>

<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-sm-12 col-md-4 mb-3 ">
            <b-button variant="light" @click="$router.back()">
              <i class="mdi mdi-arrow-left-bold-outline me-2"></i>
              Back
            </b-button>
          </div>
        </div>

        <!-- detail -->
        <div class="card">
          <div class="card-body">
            <div class="flex">
              <h4 class="card-title mt-2 mb-4">{{ title }}</h4>
              <b-button
                variant="info"
                size="md"
                @click="print()"
                class="mr-2 print-btn"
              >
                Print
              </b-button>
            </div>

            <div class="row">
              <div class="col">
                <div class="mb-3">
                  <label>Patient</label>
                  <v-select
                    disabled="disabled"
                    v-model="form.patient_id"
                    :options="list_patient"
                    :label="'name'"
                    :reduce="list_patient => list_patient.id"
                    class="style-chooser"
                    placeholder="Select patient"
                  >
                    <template #option="{ name, dob }">
                      {{ name }} | {{ dob }}
                    </template>
                  </v-select>
                </div>
              </div>
              <div class="col">
                <div class="mb-3">
                  <label>Type</label>
                  <v-select
                    disabled="disabled"
                    v-model="form.type"
                    :options="list_type"
                    class="style-chooser"
                    placeholder="Select type"
                  >
                  </v-select>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <div class="mb-3">
                  <label>Payment Method</label>
                  <v-select
                    :disabled="disabled"
                    v-model="form.payment_method"
                    :options="list_payment"
                    class="style-chooser"
                    placeholder="Select payment"
                  >
                  </v-select>
                </div>
              </div>
              <div class="col">
                <div class="mb-3">
                  <label>Status</label>
                  <v-select
                    :disabled="disabled"
                    v-model="form.status"
                    :options="list_status"
                    class="style-chooser"
                    placeholder="Select status"
                  >
                  </v-select>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-body">
                <h4>invoice Details</h4>
                <div class="row mt-4">
                  <div
                    v-for="(detail, index) in form.details"
                    :key="detail.id"
                    class="row"
                  >
                    <div class="mb-3 col">
                      <label for="name">Item</label>
                      <input
                        disabled="disabled"
                        id="name"
                        v-model="detail.item_name"
                        type="text"
                        name="untyped-input"
                        class="form-control"
                      />
                    </div>

                    <div class="mb-3 col">
                      <label for="name">Quantity</label>
                      <input
                        disabled="disabled"
                        @input="calculate(index)"
                        id="name"
                        v-model="detail.quantity"
                        type="text"
                        name="untyped-input"
                        class="form-control"
                      />
                    </div>

                    <div class="mb-3 col">
                      <label for="name">Price</label>
                      <input
                        disabled="disabled"
                        @input="calculate(index)"
                        id="name"
                        v-model="detail.price"
                        type="text"
                        name="untyped-input"
                        class="form-control"
                      />
                    </div>

                    <div class="mb-3 col">
                      <label for="name">Subtotal</label>
                      <input
                        disabled="disabled"
                        id="name"
                        v-model="detail.subtotal"
                        type="text"
                        name="untyped-input"
                        class="form-control"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div>
                    Total Amount :
                    <h4>${{ form.total_amount }}</h4>
                  </div>
                </div>
              </div>
            </div>

            <div class="row" v-if="userRole === 'Cashier'">
              <div class="col-md-12 mt-4">
                <div>
                  <b-button variant="light" @click="$router.back()">
                    Cancel
                  </b-button>
                  <b-button variant="primary" @click="submit">
                    Update
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
.flex {
  display: flex;
  justify-content: space-between;
}

.print-btn {
  height: fit-content;
}
</style>
