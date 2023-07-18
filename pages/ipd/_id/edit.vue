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
            title: "Edit IPD Patient",
            form: {
                patient_id: null,
                room_id: null,
                room_type: null,
                blood_pressure: null,
                height: null,
                weight: null,
                admission_date: null,
                payment_method: null,
                symptoms: null,
                notes: null,
                is_active: null,
            },
            list: [],
            list_gender: ['Male', 'Female'],
            list_patient: [],
            room_type: [],
            list_room: [],
            list_payment: ['Pribadi', 'BPJS', 'Asuransi']
        };
    },
    middleware: "authentication",
    async created() {
        await this.get_data()
        this.get_list_patient()
        this.get_room_type()
        this.get_list_room()
    },
    methods: {
        async get_data(){
            try {
                const url = `${process.env.apiBaseUrl}/ipd/${this.$route.params.id}`
                await this.$axios.$get(url)
                .then((res) => {
                    this.form.patient_id = { id: res.patient_id, name: res.patient_first_name + ' ' + res.patient_last_name };
                    this.form.room_id = { id: res.room_id, number: res.room_number };
                    this.form.room_type = res.room_type
                    this.form.blood_pressure = res.blood_pressure
                    this.form.height = res.height
                    this.form.weight = res.weight
                    this.form.payment_method = res.payment_method
                    this.form.admission_date = this.convert_date(res.admission_date)
                    this.form.symptoms = res.symptoms
                    this.form.notes = res.notes
                    this.form.is_active = res.is_active ? '1' : 0

                    console.log('init form', this.form)
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
            const hour = date.getUTCHours();
            const minute = date.getUTCMinutes();
            const localDatetime =
            year +
            '-' +
            (month < 10 ? '0' + month.toString() : month) +
            '-' +
            (day < 10 ? '0' + day.toString() : day) +
            'T' +
            (hour < 10 ? '0' + hour.toString() : hour) +
            ':' +
            (minute < 10 ? '0' + minute.toString() : minute);
            return localDatetime;
        },

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
                            id: v.id
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

        async get_room_type(){
            try {
                const url = `${process.env.apiBaseUrl}/room-types`
                await this.$axios.$get(url)
                .then((res) => {
                    this.room_type = res
                })
                // Handle the JSON data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            
        },

        async get_list_room(){
            try {
                const url = `${process.env.apiBaseUrl}/rooms?roomType=${this.form.room_type}`
                await this.$axios.$get(url)
                .then((res) => {
                    console.log('list room', res)
                    this.list_room = res
                })
                // Handle the JSON data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            
        },

        async submit() {
            this.form.patient_id = this.form.patient_id.id
            this.form.room_id = this.form.room_id.id
            this.form.is_active = this.form.is_active == '1' ? true : false

            const url = `${process.env.apiBaseUrl}/ipd/${this.$route.params.id}`
                await this.$axios.$post(url, this.form)
                .then((res) => {
                    this.$router.push(`/ipd`)
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
                                <label>Room Type</label>
                                <v-select
                                    v-model="form.room_type" 
                                    :options="room_type"
                                    label="type"
                                    :reduce="room_type => room_type.type" 
                                    class="style-chooser"
                                    @input="get_list_room"
                                    placeholder="Select type"
                                >
                                </v-select>
                            </div>
                        </div>

                        <div class="col">
                            <div class="mb-3">
                                <label>Room</label>
                                <v-select
                                    v-model="form.room_id" 
                                    :options="list_room"
                                    :label="'number'"
                                    :value="'id'"
                                    class="style-chooser"
                                    placeholder="Select Room"
                                >
                                </v-select>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
                                <label>Blood Pressure</label>
                                <input v-model="form.blood_pressure" type="text" class="form-control" placeholder="Blood Pressure"/>
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3">
                                <label>Height</label>
                                <input v-model="form.height" type="text" class="form-control" placeholder="Height"/>
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3">
                                <label>Weight</label>
                                <input v-model="form.weight" type="text" class="form-control" placeholder="Weight"/>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
                                <label>Admission Date</label>
                                <input v-model="form.admission_date" type="datetime-local" class="form-control" placeholder="ipd Date"/>
                                <!-- <input v-model="form.dob" type="date" class="form-control" placeholder="Input name"/> -->
                            </div>
                        </div>
                        <div class="col">
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
                        <div class="col">
                            <label>Symptoms</label>
                            <textarea class="form-control" v-model="form.symptoms" rows="6"></textarea>
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col">
                            <label>Notes</label>
                            <textarea class="form-control" v-model="form.notes" rows="6"></textarea>
                        </div>
                    </div>

                    <div class="row mt-3">
                        <label>Status</label>
                        <div class="col-md-12">
                            <b-form-checkbox
                            v-model="form.is_active"
                            class="mb-3"
                            plain
                            value="1"
                            unchecked-value="0"
                            >Active</b-form-checkbox>
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
