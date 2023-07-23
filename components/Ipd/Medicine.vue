<script>
import Swal from "sweetalert2";
/**
 * Dashboard component
 */
export default {
    head() {
        return {
            title: `${this.title} | HMS`,
        };
    },
    data() {
        return {
            title: "IPD Patient",
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
            form: {
                description: null,
                report_date: null,
                created_by: null,
            },
            fields: [
                {
                    key: "report_date",
                    label: "Date",
                    thStyle: "min-width: 150px",
                    sortable: true,
                },
                {
                    key: "description",
                    label: "Description",
                    thStyle: "min-width: 250px",
                    sortable: true,
                },
            ],
        };
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
        this.get_medicine()
    },
    methods: {
        async get_medicine(){
            try {
                const url = `${process.env.apiBaseUrl}/ipd/medicine/${this.$route.params.id}`
                await this.$axios.$get(url)
                .then((res) => {
                    console.log(res);
                    this.tableData = res
                    
                })
                // Handle the JSON data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            
        },

        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },

        async submit() {
            const user = JSON.parse(localStorage.getItem("user"));
            this.form.created_by = user.id;
            const url = `${process.env.apiBaseUrl}/ipd/add-medicine/${this.$route.params.id}`
            await this.$axios.$post(url, this.form)
            .then((res) => {
                this.get_medicine()
                this.form.description = null;
                this.form.report_date = null;
                this.form.created_by = null;
                this.$bvModal.hide('add-medicine')
            })
        }

    },
    middleware: "authentication",
};
</script>

<template>
<div>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12 col-md-12">
                            <div>
                                <b-button v-b-modal.add-medicine variant="success">
                                    <i class="mdi mdi-plus-thick me-2"></i>
                                    Add Medicine
                                </b-button>
                            </div>
                        </div>
                    </div>
                    <!-- Table -->
                    <div class="table-responsive mb-0 mt-4" >
                        <b-table :items="tableData" :fields="fields" responsive="sm" :per-page="perPage" :current-page="currentPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :filter="filter" :filter-included-fields="filterOn" @filtered="onFiltered">
                        </b-table>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 col-md-6">
                            <div id="tickets-table_length" class="dataTables_length">
                                <label class="d-inline-flex align-items-center">
                                    Show&nbsp;
                                    <b-form-select v-model="perPage" size="sm" :options="pageOptions"></b-form-select>&nbsp;entries
                                </label>
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6">
                            <div class="dataTables_paginate paging_simple_numbers float-end">
                                <ul class="pagination pagination-rounded mb-0">
                                    <!-- pagination -->
                                    <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage"></b-pagination>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <b-modal id="add-medicine" size="lg"  centered scrollable title="Add medicine" title-class="font-18" hide-footer>
        <div class="row mb-4">
            <div class="col">
                <div class="mb-3">
                    <label>Report Date</label>
                    <input v-model="form.report_date" type="date" class="form-control" placeholder="Report Date"/>
                </div>
            </div>
        </div>
        <div class="row mb-4">
            <div class="col">
                <label>Description</label>
                <textarea class="form-control" v-model="form.description" rows="6" placeholder="paracetamol 4 tablet, 3x1"></textarea>
            </div>
        </div>
        <div class="row float-end">
            <div class="col">
                <b-button class="w-md" variant="success" @click="submit">
                    Submit
                </b-button>
            </div>
            
        </div>
    </b-modal>

</div>
</template>

<style></style>
