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
            title: "Receptionist",
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
                    label: "Receptionist ID",
                    sortable: true,
                },
                {
                    key: "first_name",
                    label: "First Name",
                    sortable: true,
                },
                {
                    key: "last_name",
                    label: "Last Name",
                    sortable: true,
                },
                {
                    key: "gender",
                    label: "Gender",
                    sortable: true,
                },
                {
                    key: "dob",
                    label: "Date of Birth",
                    sortable: true,
                },
                {
                    label: "Action",
                    key: 'action'
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
        this.get_data()
    },
    methods: {
        async get_data(){
            try {
                const url = `${process.env.apiBaseUrl}/receptionists`
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

        create(){
            this.$router.push(`/receptionists/create`)
        },

        move(id) {
            this.$router.push(`/receptionists/${id}/edit`)
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
                    const url = `${process.env.apiBaseUrl}/receptionists/delete/${id}`
                    await this.$axios.$post(url)
                    .then(() => {
                        Swal.fire("Deleted!", "Receptionist has been deleted.", "success");
                        this.get_data()
                    })
                }
            });
        },
    },
    middleware: "authentication",
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
                        <div class="col-sm-12 col-md-12">
                            <div>
                                <b-button variant="success" @click="create">
                                    <i class="mdi mdi-plus-thick me-2"></i>
                                    Create Receptionist
                                </b-button>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col-sm-12 col-md-4">
                            <div>
                                <b-form-input v-model="filter" type="search" placeholder="Search"></b-form-input>
                            </div>
                        </div>
                    </div>
                    <!-- Table -->
                    <div class="table-responsive mb-0 mt-4" >
                        <b-table :items="tableData" :fields="fields" responsive="sm" :per-page="perPage" :current-page="currentPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :filter="filter" :filter-included-fields="filterOn" @filtered="onFiltered">
                            <template #cell(action)="row">
                                <b-button variant="warning" size="sm" @click="move(row.item.id)" class="mr-2">
                                    Edit
                                </b-button>
                                <b-button variant="danger" size="sm" @click="confirm(row.item.id)" class="mr-2">
                                    Delete
                                </b-button>
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

</div>
</template>

<style></style>
