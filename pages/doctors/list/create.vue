<script>
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
            title: "Create Doctor",
            form: {
                user_id: null,
                specialization_id: null,
                name: null,
                gender: null,
                phone: null,
                dob: null,
            },
            users: [],
            list: [],
            list_gender: ['Male', 'Female']
        };
    },
    middleware: "authentication",
    created() {
        this.get_users()
        this.get_list()
    },
    methods: {
        async get_list(){
            try {
                const url = `${process.env.apiBaseUrl}/specialization`
                await this.$axios.$get(url)
                .then((res) => {
                    this.list = res
                })
                // Handle the JSON data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            
        },

        async get_users(){
            try {
                const url = `${process.env.apiBaseUrl}/users?role=Doctor`
                await this.$axios.$get(url)
                .then((res) => {
                    this.users = res
                })
                // Handle the JSON data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            
        },

        async submit() {
            this.form.user_id = this.form.user_id.id
            this.form.specialization_id = this.form.specialization_id.id

            const url = `${process.env.apiBaseUrl}/doctors`
                await this.$axios.$post(url, this.form)
                .then((res) => {
                    this.$router.push(`/doctors/list`)
                })
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
                                <label>User</label>
                                <v-select
                                    v-model="form.user_id" 
                                    :options="users" 
                                    :label="'email'"
                                    :value="'id'"
                                    class="style-chooser"
                                    placeholder="Select User"
                                >
                                </v-select>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
                                <label>Name</label>
                                <input v-model="form.name" type="text" class="form-control" placeholder="Input name"/>
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3">
                                <label>Date of Birth</label>
                                <input v-model="form.dob" type="date" class="form-control" placeholder="Input name"/>
                            </div>
                        </div>
                        
                    </div>

                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
                                <label>Gender</label>
                                <v-select
                                    v-model="form.gender" 
                                    :options="list_gender" 
                                    class="style-chooser"
                                    placeholder="Select Gender"
                                >
                                </v-select>
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3">
                                <label>Specialization</label>
                                <v-select
                                    v-model="form.specialization_id" 
                                    :options="list" 
                                    :label="'specialization'"
                                    :value="'id'"
                                    class="style-chooser"
                                    placeholder="Select Specialization"
                                >
                                </v-select>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
                                <label>Phone</label>
                                <input v-model="form.phone" type="text" class="form-control" placeholder="Input phone"/>
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
