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
      tableData: [],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      // sortBy: "id",
      searchmodal: null,
      searchVoucher: false,
      vmessage: null,
      sortDesc: false,
      fields: [
        {
          key: "id",
          label: "Appointment ID",
          sortable: true,
          thStyle: "min-width: 200px"
        },
        {
          key: "patient_name",
          label: "Patient",
          sortable: true,
          thStyle: "min-width: 200px"
        },
        {
          key: "email",
          label: "Patient Email",
          sortable: false,
          thStyle: "min-width: 200px"
        },
        {
          key: "phone_number",
          label: "Patient Phone Number",
          sortable: false,
          thStyle: "min-width: 200px"
        },
        {
          key: "doctor",
          label: "Doctor",
          sortable: true,
          thStyle: "min-width: 200px"
        },
        {
          key: "specialization",
          label: "Specialization",
          sortable: true,
          thStyle: "min-width: 200px"
        },
        {
          key: "appointment_date",
          label: "Date",
          sortable: true,
          thStyle: "min-width: 200px"
        },
        {
          key: "is_approved",
          label: "Status",
          sortable: true,
          thStyle: "min-width: 200px"
        },
        {
          key: "is_need_opd",
          label: "OPD Status",
          sortable: true,
          thStyle: "min-width: 200px"
        },
        {
          label: "Action",
          key: "action"
        }
      ]
    };
  },
  mounted: function() {
    const userRoles = JSON.parse(localStorage.getItem("user"));
    this.userRole = userRoles.role;
    this.user = userRoles
  },
  computed: {
    /**
     * Total no. of records
     */
    rows() {
      return this.tableData.length;
    }
  },
  created() {
    this.get_data();
  },
  methods: {
    async get_data() {
      try {
        let user = JSON.parse(localStorage.getItem("user"));
        let url = `${process.env.apiBaseUrl}/appointments`;
        if (user.role != 'Super Admin' && user.role != 'Receptionist') {
          url += `?user_id=${user.id}`;
        }
        await this.$axios.$get(url).then(res => {
          console.log(res);
          this.tableData = res;
        });
        // Handle the JSON data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
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
    <PageHeader :title="title" />

    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row mt-4">
              <div class="col-sm-12 col-md-4">
                <div>
                  <b-form-input
                    v-model="filter"
                    type="search"
                    placeholder="Search"
                  ></b-form-input>
                </div>
              </div>
            </div>
            <!-- Table -->
            <div class="table-responsive mb-0 mt-4">
              <b-table
                :items="tableData"
                :fields="fields"
                responsive="sm"
                :per-page="perPage"
                :current-page="currentPage"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :filter="filter"
                :filter-included-fields="filterOn"
                @filtered="onFiltered"
              >
                <template v-slot:cell(doctor)="data">
                  <span>{{ data.value === null || data.value === '' ? '-' : data.value }}</span>
                </template>
                <template v-slot:cell(appointment_date)="data">
                  <span>{{ new Date(data.value) }}</span>
                </template>
                <template v-slot:cell(is_approved)="data">
                  <span>{{ data.value ? 'Approved' : 'Not Approved Yet' }}</span>
                </template>
                <template v-slot:cell(is_need_opd)="data">
                  <span>
                    {{ data.value === true ? 'Needed OPD' : data.value === false ? 'Not Needed' : 'Not Decided Yet' }}
                  </span>
                </template>

              </b-table>
            </div>
            <div class="row">
              <div class="col-sm-12 col-md-6">
                <div id="tickets-table_length" class="dataTables_length">
                  <label class="d-inline-flex align-items-center">
                    Show&nbsp;
                    <b-form-select
                      v-model="perPage"
                      size="sm"
                      :options="pageOptions"
                    ></b-form-select
                    >&nbsp;entries
                  </label>
                </div>
              </div>
              <div class="col-sm-12 col-md-6">
                <div
                  class="dataTables_paginate paging_simple_numbers float-end"
                >
                  <ul class="pagination pagination-rounded mb-0">
                    <!-- pagination -->
                    <b-pagination
                      v-model="currentPage"
                      :total-rows="rows"
                      :per-page="perPage"
                    ></b-pagination>
                  </ul>
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
