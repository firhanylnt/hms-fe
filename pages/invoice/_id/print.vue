<script>
import VueHtml2pdf from "vue-html2pdf";
/**
 * Dashboard component
 */
export default {
  head() {
    return {
      title: `${this.title} | Dimedic`
    };
  },
  components: { VueHtml2pdf },
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

    getPatienName() {
      const getName = this.list_patient.filter(
        el => el.id === this.form.patient_id
      );

      return getName[0]?.name;
    },

    generatePDF() {
      this.$refs.html2Pdf.generatePdf();
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
        <vue-html2pdf
          :show-layout="true"
          :float-layout="true"
          :enable-download="true"
          :preview-modal="true"
          :paginate-elements-by-height="1400"
          filename="nightprogrammerpdf"
          :pdf-quality="2"
          :manual-pagination="false"
          pdf-format="a4"
          :pdf-margin="10"
          pdf-orientation="portrait"
          pdf-content-width="800px"
          @progress="onProgress($event)"
          ref="html2Pdf"
        >
          <section slot="pdf-content">
            <div class="card">
              <div class="card-body">
                <div class="flex">
                  <h4 class="card-title mt-2 mb-4">{{ title }}</h4>
                  <b-button
                    variant="info"
                    size="md"
                    @click="generatePDF()"
                    class="mr-2 print-btn"
                  >
                    Print
                  </b-button>
                </div>

                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label>Patient</label><br />
                      <span>{{ getPatienName(form.patient_id) }}</span>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label>Type</label><br />
                      <span>{{ form.type }}</span>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label>Payment Method</label>
                      <br />
                      <span>{{ form.payment_method }}</span>
                    </div>
                  </div>
                  <div class="col">
                    <div class="mb-3">
                      <label>Status</label>
                      <br />
                      <span>{{ form.status }}</span>
                    </div>
                  </div>
                </div>

                <div class="card">
                  <div class="card-body">
                    <h4>invoice Details</h4>
                    <div class="row mt-4">
                      <table>
                        <thead>
                          <tr class="text-center">
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="detail in form.details" :key="detail.id">
                            <td>{{ detail.item_name }}</td>
                            <td>{{ detail.quantity }}</td>
                            <td>{{ detail.price }}</td>
                            <td>{{ detail.subtotal }}</td>
                          </tr>
                        </tbody>
                      </table>
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
          </section>
        </vue-html2pdf>
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

table,
th,
td {
  border: 1px solid black;
  padding: 4px;
}
</style>
