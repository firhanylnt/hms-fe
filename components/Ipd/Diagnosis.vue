<script>
import Swal from "sweetalert2";
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
            title: "IPD Patient",
            tableData: [],
            totalRows: 1,
            currentPage: 1,
            perPage: 10,
            pageOptions: [10, 25, 50, 100],
            filter: null,
            filterOn: [],
            // sortBy: "id",
            sortDesc: false,
            list_doctor: [],
            form: {
                doctor_id: null,
                diagnosis: null,
                instruction: null,
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
                    key: "doctor",
                    label: "Doctor",
                    thStyle: "min-width: 150px",
                    sortable: true,
                },
                {
                    key: "diagnosis",
                    label: "Diagnosis",
                    thStyle: "min-width: 250px",
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
        this.get_diagnosis()
        this.get_list_doctor()
    },
    methods: {
        async get_diagnosis(){
            try {
                const url = `${process.env.apiBaseUrl}/ipd/diagnosis/${this.$route.params.id}`
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

        async get_list_doctor(){
            try {
                const url = `${process.env.apiBaseUrl}/doctors`
                await this.$axios.$get(url)
                .then((res) => {
                    this.list_doctor = res
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
            const url = `${process.env.apiBaseUrl}/ipd/add-diagnosis/${this.$route.params.id}`
            await this.$axios.$post(url, this.form)
            .then((res) => {
                this.get_diagnosis()
                this.form.doctor_id = null;
                this.form.diagnosis = null;
                this.form.instruction = null;
                this.form.report_date = null;
                this.form.created_by = null;
                this.$bvModal.hide('add-diagnosis')
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
                                <b-button v-b-modal.add-diagnosis variant="success">
                                    <i class="mdi mdi-plus-thick me-2"></i>
                                    Add Diagnosis
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

    <b-modal id="add-diagnosis" size="lg"  centered scrollable title="Add Diagnosis" title-class="font-18" hide-footer>
        <div class="row mb-4">
            <div class="col">
                <div class="mb-3">
                    <label>Report Date</label>
                    <input v-model="form.report_date" type="date" class="form-control" placeholder="Report Date"/>
                    <!-- <input v-model="form.dob" type="date" class="form-control" placeholder="Input name"/> -->
                </div>
            </div>
            <div class="col">
                <div class="mb-3">
                    <label>Doctor</label>
                    <v-select
                        v-model="form.doctor_id" 
                        :options="list_doctor"
                        :label="'name'" 
                        :reduce="list_doctor => list_doctor.id"
                        class="style-chooser"
                        placeholder="Select Docter"
                    >
                    </v-select>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <label>Diagnosis</label>
                <textarea class="form-control" v-model="form.diagnosis" rows="6"></textarea>
            </div>
        </div>
        <div class="row mb-4">
            <div class="col">
                <label>Instruction</label>
                <textarea class="form-control" v-model="form.instruction" rows="6"></textarea>
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
