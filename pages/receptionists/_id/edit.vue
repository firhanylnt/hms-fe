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
            title: "Edit receptionist",
            form: {
                user_id: null,
                first_name: null,
                last_name: null,
                gender: null,
                phone: null,
                dob: null,
                address: null,
            },
            users: [],
            list: [],
            list_gender: ['Male', 'Female']
        };
    },
    middleware: "authentication",
    created() {
        this.get_receptionist()
        this.get_users()
    },
    methods: {
        async get_users(){
            try {
                const url = `${process.env.apiBaseUrl}/users?role=Receptionist`
                await this.$axios.$get(url)
                .then((res) => {
                    this.users = res
                })
                // Handle the JSON data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            
        },
        async get_receptionist(){
            try {
                const url = `${process.env.apiBaseUrl}/receptionists/${this.$route.params.id}`
                await this.$axios.$get(url)
                .then((res) => {
                    this.form.user_id = { id: res.user_id, email: res.user };
                    this.form.first_name = res.first_name
                    this.form.last_name = res.last_name
                    this.form.dob = this.convert_date(res.dob)
                    this.form.phone = res.phone
                    this.form.gender = res.gender
                    this.form.address = res.address
                })
                // Handle the JSON data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            
        },

        convert_date(e) {
            const date = e === null ? new Date() : new Date(e)
            const year = date.getUTCFullYear();
            const month = date.getUTCMonth() + 1;
            const day = date.getUTCDate();
            const localDatetime =
            year +
            '-' +
            (month < 10 ? '0' + month.toString() : month) +
            '-' +
            (day < 10 ? '0' + day.toString() : day)
            return localDatetime;
        },

        async submit() {
            this.form.user_id = this.form.user_id.id
            const url = `${process.env.apiBaseUrl}/receptionists/${this.$route.params.id}`
                await this.$axios.$post(url, this.form)
                .then((res) => {
                    this.$router.push(`/receptionists`)
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
                                <label>First Name</label>
                                <input v-model="form.first_name" type="text" class="form-control" placeholder="Input name"/>
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3">
                                <label>Last Name</label>
                                <input v-model="form.last_name" type="text" class="form-control" placeholder="Input name"/>
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
                                <label>Date of Birth</label>
                                <input v-model="form.dob" type="date" class="form-control" placeholder="Input name"/>
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
                        <div class="col">
                            <div class="mb-3">
                                <label>Address</label>
                                <textarea v-model="form.address" type="text" class="form-control" placeholder="Input address" rows="4"></textarea>
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
