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
            title: "Edit User",
            form: {
                username: null,
                email: null,
                role: null,
                password: null,
                created_at: null,
                updated_at: null,
            },
            list_role: ['Super Admin', 'Admin', 'Receptionist', 'Doctor', 'Nurse', 'Cashier', 'Patient']
        };
    },
    middleware: "authentication",
    created() {
        this.get_users()
    },
    methods: {
        async get_users(){
            try {
                const url = `${process.env.apiBaseUrl}/users/${this.$route.params.id}`
                await this.$axios.$get(url)
                .then((res) => {
                    console.log(res);
                    this.form.username = res.username
                    this.form.email = res.email
                    this.form.role = res.role
                    this.form.created_at = res.created_at
                })
                // Handle the JSON data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            
        },

        async submit() {
            this.form.updated_at = new Date()
            const url = `${process.env.apiBaseUrl}/users/${this.$route.params.id}`
                await this.$axios.$post(url, this.form)
                .then((res) => {
                    this.$router.push(`/users`)
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
                                <label>Username</label>
                                <input v-model="form.username" type="text" class="form-control" placeholder="Input Username"/>
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3">
                                <label>Email</label>
                                <input v-model="form.email" type="text" class="form-control" placeholder="Input Email"/>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
                                <label>Role</label>
                                <v-select
                                    v-model="form.role" 
                                    :options="list_role" 
                                    class="style-chooser"
                                    placeholder="Select role"
                                >
                                </v-select>
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3">
                                <label>Password</label>
                                <input v-model="form.password" type="text" class="form-control" placeholder="Input Password"/>
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
