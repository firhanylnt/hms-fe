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
            title: "Create nurse",
            form: {
                first_name: null,
                last_name: null,
                gender: null,
                phone: null,
                email: null,
                dob: null,
                address: null,
            },
            list: [],
            list_gender: ['Male', 'Female']
        };
    },
    middleware: "authentication",
    created() {
        this.get_list()
    },
    methods: {
        async get_list(){
            try {
                const url = `${process.env.apiBaseUrl}/nurses`
                await this.$axios.$get(url)
                .then((res) => {
                    this.list = res
                })
                // Handle the JSON data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            
        },

        async submit() {
            const url = `${process.env.apiBaseUrl}/nurses`
                await this.$axios.$post(url, this.form)
                .then((res) => {
                    this.$router.push(`/nurses`)
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
                                <label>Email</label>
                                <input v-model="form.email" type="text" class="form-control" placeholder="Input email"/>
                            </div>
                        </div>
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
