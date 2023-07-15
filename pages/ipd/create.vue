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
            title: "Create IPD Patient",
            form: {
                patient: null,
                type: null,
                date: null,
                room: null,
                payment: null,
                symptoms: null,
                notes: null,
                height: null,
                weight: null,
                pressure: null,
                status: null,
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
    created() {
        this.get_list_patient()
        this.get_room_type()
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
                const url = `${process.env.apiBaseUrl}/bedtype`
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
                const url = `${process.env.apiBaseUrl}/bedroom/type/${this.form.type}`
                await this.$axios.$get(url)
                .then((res) => {
                    this.list_room = res
                })
                // Handle the JSON data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            
        },

        async submit() {
            const url = `${process.env.apiBaseUrl}/ipd`
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
                                    v-model="form.patient" 
                                    :options="list_patient"
                                    label="name" 
                                    :reduce="list_patient => list_patient.name" 
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
                                <label>type</label>
                                <v-select
                                    v-model="form.type" 
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
                                    v-model="form.room" 
                                    :options="list_room"
                                    label="number"
                                    :reduce="list_room => list_room.number"  
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
                                <input v-model="form.pressure" type="text" class="form-control" placeholder="Blood Pressure"/>
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
                                <input v-model="form.date" type="datetime-local" class="form-control" placeholder="ipd Date"/>
                                <!-- <input v-model="form.dob" type="date" class="form-control" placeholder="Input name"/> -->
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3">
                                <label>Payment Methods</label>
                                <v-select
                                    v-model="form.payment" 
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
                            v-model="form.status"
                            class="mb-3"
                            plain
                            value="active"
                            unchecked-value="inactive"
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
