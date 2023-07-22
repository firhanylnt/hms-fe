<script>
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
            title: "Create Appointment",
            form: {
                patient_id: null,
                doctor_id: null,
                appointment_date: null,
                payment_method: null,
            },
            list: [],
            list_gender: ['Male', 'Female'],
            list_patient: [],
            list_specialization: [],
            list_doctor: [],
            list_payment: ['Pribadi', 'BPJS', 'Asuransi']
        };
    },
    middleware: "authentication",
    created() {
        this.get_list_patient()
        this.get_list_specialization()
    },
    methods: {
        async get_list_patient(){
            try {
                const url = `${process.env.apiBaseUrl}/patients`
                await this.$axios.$get(url)
                .then((res) => {
                    console.log(res);
                    res.map((v) => {
                        const arr = {
                            name: v.first_name +' '+ v.last_name,
                            dob: v.dob,
                            id: v.id,
                        }
                        this.list_patient.push(arr)
                    })
                    // this.list_patient = res
                })
                // Handle the JSON data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            
        },

        async get_list_specialization(){
            try {
                const url = `${process.env.apiBaseUrl}/specialization`
                await this.$axios.$get(url)
                .then((res) => {
                    this.list_specialization = res
                })
                // Handle the JSON data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            
        },
        
        async get_list_doctor(){
            try {
                const url = `${process.env.apiBaseUrl}/doctors?specialization=${this.form.specialization}`
                await this.$axios.$get(url)
                .then((res) => {
                    this.list_doctor = res
                })
                // Handle the JSON data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            
        },

        async submit() {
            this.form.patient_id = this.form.patient_id.id
            this.form.doctor_id = this.form.doctor_id.id

            const url = `${process.env.apiBaseUrl}/appointment`
                await this.$axios.$post(url, this.form)
                .then((res) => {
                    this.$router.push(`/appointment`)
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
                                <label>Patient</label>
                                <v-select
                                    v-model="form.patient_id" 
                                    :options="list_patient"
                                    :label="'name'" 
                                    :value="'id'" 
                                    class="style-chooser"
                                    placeholder="Select patient"
                                >
                                <template #option="{ name, dob }">
                                    {{ name }} | {{ dob }}
                                </template>

                                </v-select>
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3">
                                <label>Specialization</label>
                                <v-select
                                    v-model="form.specialization" 
                                    :options="list_specialization"
                                    label="specialization"
                                    :reduce="list_specialization => list_specialization.specialization" 
                                    class="style-chooser"
                                    @input="get_list_doctor"
                                    placeholder="Select specialization"
                                >
                                </v-select>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
                                <label>Doctor</label>
                                <v-select
                                    v-model="form.doctor_id" 
                                    :options="list_doctor"
                                    :label="'name'" 
                                    :value="'id'" 
                                    class="style-chooser"
                                    placeholder="Select Docter"
                                >
                                </v-select>
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3">
                                <label>Date</label>
                                <input v-model="form.appointment_date" type="datetime-local" class="form-control" placeholder="Appointment Date"/>
                                <!-- <input v-model="form.dob" type="date" class="form-control" placeholder="Input name"/> -->
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label>Payment Methods</label>
                                <v-select
                                    v-model="form.payment_method" 
                                    :options="list_payment"
                                    class="style-chooser"
                                    placeholder="Select Payment Method"
                                >
                                </v-select>
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
