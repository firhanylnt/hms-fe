<script>
import Swal from "sweetalert2";
import moment from 'moment';
/**
 * Dashboard component
 */
export default {
    head() {
        return {
            title: `${this.title} | Dimedic`,
        };
    },
    data() {
        return {
            title: "Opd Patient",
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
            list_category: [],
            list_medicine: [],
            form: {
                medicine_category: null,
                medicine_id: null,
                dosage: null,
                instruction: null,
                report_date: null,
                created_by: null,
                quantity: null,
            },
            fields: [
                {
                    key: "report_date",
                    label: "Date",
                    thStyle: "min-width: 150px",
                    sortable: true,
                },
                {
                    key: "medicine_name",
                    label: "Medicine",
                    thStyle: "min-width: 150px",
                    sortable: true,
                },
                {
                    key: "category_name",
                    label: "Medicine Category",
                    thStyle: "min-width: 150px",
                    sortable: true,
                },
                {
                    key: "quantity",
                    label: "Quantity",
                    thStyle: "min-width: 50px",
                    sortable: true,
                },
                {
                    key: "dosage",
                    label: "Dosage",
                    thStyle: "min-width: 150px",
                    sortable: true,
                },
                {
                    key: "instruction",
                    label: "Instruction",
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
        this.get_category()
    },
    methods: {
        async get_category(){
            try {
                const url = `${process.env.apiBaseUrl}/medicine-categories`
                await this.$axios.$get(url)
                .then((res) => {
                    this.list_category = res
                })
                // Handle the JSON data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            
        },

        async get_list_medicine(){
            try {
                const url = `${process.env.apiBaseUrl}/medicine/category/${this.form.medicine_category}`
                await this.$axios.$get(url)
                .then((res) => {
                    console.log(res);
                    this.list_medicine = res
                })
                // Handle the JSON data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            
        },

        async get_medicine(){
            try {
                const url = `${process.env.apiBaseUrl}/opd/medicine/${this.$route.params.id}`
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

        tgl(e) {
            const date = moment(e).format('DD MMM YYYY')
            return date
        },

        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },

        async submit() {
            const user = JSON.parse(localStorage.getItem("user"));
            this.form.created_by = user.id;
            const url = `${process.env.apiBaseUrl}/opd/add-medicine/${this.$route.params.id}`
            await this.$axios.$post(url, this.form)
            .then((res) => {
                this.get_medicine()
                this.form.medicine_category = null;
                this.form.medicine_id = null;
                this.form.description = null;
                this.form.report_date = null;
                this.form.created_by = null;
                this.form.quantity = null;
                this.form.dosage = null;
                this.form.instruction = null;
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
                            <template #cell(report_date)="row">
                                {{ tgl(row.item.report_date) }}
                            </template>
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
                <div class="mb-3">
                    <label>Medicine Category</label>
                    <v-select
                        v-model="form.medicine_category" 
                        :options="list_category"
                        label="category_name" 
                        :reduce="list_category => list_category.id"
                        class="style-chooser"
                        placeholder="Select Category"
                        @input="get_list_medicine"
                    >
                    </v-select>
                </div>
            </div>
            <div class="col">
                <div class="mb-3">
                    <label>Medicine</label>
                    <v-select
                        v-model="form.medicine_id" 
                        :options="list_medicine"
                        :label="'name'" 
                        :reduce="list_medicine => list_medicine.id"
                        class="style-chooser"
                        placeholder="Select Medicine"
                    >
                    </v-select>
                </div>
            </div>
            <div class="col">
                <div class="mb-3">
                    <label>Qantity</label>
                    <input v-model="form.quantity" type="text" class="form-control" placeholder="Quantity"/>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <div class="mb-3">
                    <label>Dosage</label>
                    <input v-model="form.dosage" type="text" class="form-control" placeholder="Dosage"/>
                </div>
            </div>
            <div class="col">
                <div class="mb-3">
                    <label>Instruction</label>
                    <input v-model="form.instruction" type="text" class="form-control" placeholder="Instruction"/>
                </div>
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
