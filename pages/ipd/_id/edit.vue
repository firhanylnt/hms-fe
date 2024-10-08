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
            title: "Edit IPD Patient",
            form: {
                doctor_id: null,
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
                details: []
            },
            list: [],
            list_gender: ['Male', 'Female'],
            list_patient: [],
            room_type: [],
            list_room: [],
            list_doctor: [],
            list_payment: ['Individual', 'Insurance']
        };
    },
    middleware: "authentication",
    async created() {
        this.get_room_type()
        this.get_list_room()
        this.get_list_patient()
        this.get_data()
        this.get_list_doctors()
    },
    methods: {
        formatDateToString(inputDate) {
            const dateObject = new Date(inputDate);
        
            const year = dateObject.getFullYear();
            const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so we add 1 and pad with '0' if needed
            const day = String(dateObject.getDate()).padStart(2, '0');
        
            const formattedDate = `${year}-${month}-${day}`;
            return formattedDate;
        },

        async get_list_doctors(){
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

        async get_data(){
            try {
                const url = `${process.env.apiBaseUrl}/ipd/${this.$route.params.id}`
                await this.$axios.$get(url)
                .then((res) => {
                    this.form.room_id = res.ipd.room_id
                    this.form.doctor_id = { id: res.ipd.doctor_id, name: res.ipd.doctor_name };
                    this.form.patient_id = { id: res.ipd.patient_id, name: res.ipd.patient_first_name + ' ' + res.ipd.patient_last_name };
                    this.form.blood_pressure = res.ipd.blood_pressure
                    this.form.height = res.ipd.height
                    this.form.weight = res.ipd.weight
                    this.form.dob = this.convert_dob(res.ipd.patient_dob)
                    this.form.gender = res.ipd.patient_gender
                    this.form.payment_method = res.ipd.payment_method
                    this.form.admission_date = this.convert_date(res.ipd.admission_date)
                    this.form.symptoms = res.ipd.symptoms
                    this.form.notes = res.ipd.notes
                    this.form.is_active = res.ipd.is_active ? '1' : 0

                    res.room.map(async (v) => {
                        const type = await this.room_type.find(o => o.id === v.room_type_id)
                        await this.get_list_room(null, type.type)
                        const room = this.list_room.find(x => x.id === v.room_id)
                        const arr = {
                            room_type: type,
                            room_id: room,
                            start_date: this.convert_dob(v.start_date),
                            end_date: v.end_date !== null ? this.convert_dob(v.end_date) : null,
                        }
                        this.form.details.push(arr)
                    })
                })
                // Handle the JSON data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            
        },

        convert_dob(e) {
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
                    console.log(res);
                    this.room_type = res
                })
                // Handle the JSON data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            
        },

        async get_list_room(e, type){
            try {
                const url = `${process.env.apiBaseUrl}/rooms?roomType=${e !== null ? this.form.details[e].room_type : type}`
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

        AddformData() {
            this.form.details.push({
                room_type: "",
                room_id: "",
                start_date: "",
                end_date: "",
            });
        },

        deleteRow(index) {
            if (confirm("Are you sure you want to delete this element?"))
                this.form.details.splice(index, 1);
        },

        async submit() {
            this.form.doctor_id = this.form.doctor_id.id
            this.form.patient_id = this.form.patient_id.id
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
                                <label>Doctor</label>
                                <v-select
                                    v-model="form.doctor_id" 
                                    :options="list_doctor"
                                    :label="'name'" 
                                    :value="'id'" 
                                    class="style-chooser"
                                    placeholder="Select main doctor"
                                >
                                <template #option="{ name, id }">
                                    {{ name }} ({{ id }})
                                </template>

                                </v-select>
                            </div>
                        </div>
                    </div> 

                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
                                <label>Patient</label>
                                <v-select
                                disabled="disabled"
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
                                <label>Gender</label>
                                <v-select
                                disabled="disabled"
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
                                <input disabled="disabled" v-model="form.dob" type="date" class="form-control" placeholder="Input name"/>
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
                                <input disabled="disabled" v-model="form.admission_date" type="datetime-local" class="form-control" placeholder="ipd Date"/>
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

                    <div class="card mt-3">
                        <div class="card-body">
                            <h4>Room Details</h4>
                            <div class="row mt-4">
                                <div v-for="(detail, index) in form.details" :key="detail.id" class="row">
                                    <div class="mb-3 col">
                                        <label>Room Type</label>
                                        <v-select
                                            v-model="detail.room_type" 
                                            :options="room_type"
                                            label="type"
                                            :reduce="room_type => room_type.type" 
                                            class="style-chooser"
                                            @input="get_list_room(index)"
                                            placeholder="Select type"
                                        >
                                        </v-select>
                                    </div>

                                    <div class="mb-3 col">
                                        <label>Room</label>
                                        <v-select
                                            v-model="detail.room_id" 
                                            :options="list_room"
                                            label="number"
                                            :reduce="list_room => list_room.id"
                                            class="style-chooser"
                                            placeholder="Select Room"
                                        >
                                        </v-select>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label>Start Date</label>
                                            <input v-model="detail.start_date" type="date" class="form-control" placeholder="Input name"/>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="mb-3">
                                            <label>End Date</label>
                                            <input v-model="detail.end_date" type="date" class="form-control" placeholder="Input name"/>
                                        </div>
                                    </div>

                                    <div class="col align-self-center mt-2">
                                        <button type="button" class="btn btn-primary" value="Delete" @click="deleteRow(index)"> Delete </button>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <button type="button" class="btn btn-success btn-block" @click="AddformData">Room Transfer</button>
                                </div>
                            </div>
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
