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
            title: "Create invoice",
            form: {
                patient_id: null,
                service_id: null,
                type: null,
                total_amount: null,
                payment_method: null,
                status: null,
                details: []
            },
            list_type: ['IPD','OPD'],
            list_payment: ['Individual','Insurance'],
            list_status: ['Pending','Paid'],
            list_patient: [],
            list_ipdopd: []
        };
    },
    middleware: "authentication",
    created() {
        this.get_list_patient()
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
                            id: v.id
                        }
                        this.list_patient.push(arr)
                    })
                })
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            
        },

        async get_data() {
            try {
                const url = `${process.env.apiBaseUrl}/${this.form.type}/detail/${this.form.service_id}`
                await this.$axios.$get(url)
                .then((res) => {
                    if(res.facility){
                        let total = null
                        res.facility.map((v) => {
                            const qty = v.quantity === 0 ? 1 : v.quantity
                            total += qty
                        })

                        const subtotal = 30*total
                        const arr = {
                            item: 'Consultant',
                            price: 30,
                            qty: total,
                            subtotal: subtotal,
                        }
                        this.form.details.push(arr);
                    }

                    if(this.form.type === 'OPD'){
                        const arr = {
                            item: 'Consultant',
                            price: 30,
                            qty: 1,
                            subtotal: 30,
                        }
                        this.form.details.push(arr);
                    }
                    this.form.payment_method = res.detail.payment_method

                    if(res.facility){
                        console.log(res.facility)
                        res.facility.map((v) => {
                            const qty = v.quantity === 0 ? 1 : v.quantity

                            const subtotal = v.price*qty
                            const arr = {
                                item: v.name,
                                price: v.price,
                                qty: qty,
                                subtotal: subtotal,
                            }
                            this.form.details.push(arr);
                        })
                    }

                    res.medicine.map((v) => {
                        const qty = v.quantity === 0 ? 1 : v.quantity

                        const subtotal = v.price*qty
                        const arr = {
                            item: v.name,
                            price: v.price,
                            qty: qty,
                            subtotal: subtotal,
                        }
                        this.form.details.push(arr);
                    })

                    this.subtotal()
                })
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },

        async choose_type() {
            let url = '';
            if(this.form.type === 'IPD'){
                url = `${process.env.apiBaseUrl}/ipd/patient/${this.form.patient_id}`
            }else{
                url = `${process.env.apiBaseUrl}/opd/patient/${this.form.patient_id}`
            }
            await this.$axios.$get(url)
            .then((res) => {
                console.log(res);
                this.list_ipdopd = res
            })
        },

        AddformData() {
            this.form.details.push({
                item: "",
                qty: "",
                price: "",
                subtotal: ""
            });
        },

        deleteRow(index) {
            if (confirm("Are you sure you want to delete this element?"))
                this.form.details.splice(index, 1);
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

        calculate(i) {
            this.form.details[i].subtotal = this.form.details[i].qty * this.form.details[i].price;
            this.subtotal()
        },

        subtotal() {
            let total = 0
            this.form.details.map((v) => {
                total += v.subtotal
            })
            console.log(total);
            this.form.total_amount = total
        },

        async submit() {
            console.log(this.form)
            const url = `${process.env.apiBaseUrl}/invoice`
                await this.$axios.$post(url, this.form)
                .then((res) => {
                    this.$router.push(`/invoice`)
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
                                    label="name"
                                    :reduce="list_patient => list_patient.id"
                                    class="style-chooser"
                                    placeholder="Select Patient"
                                >
                                <template #option="{ name, dob }">
                                    {{ name }} | {{ convert_dob(dob) }}
                                </template>
                                </v-select>
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3">
                                <label>Type</label>
                                <v-select
                                    v-model="form.type" 
                                    :options="list_type"
                                    class="style-chooser"
                                    placeholder="Select type"
                                    @input="choose_type"
                                >
                                </v-select>
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3">
                                <label>Ipd/Opd ID</label>
                                <v-select
                                    v-model="form.service_id" 
                                    :options="list_ipdopd"
                                    label="id"
                                    :reduce="list_ipdopd => list_ipdopd.id"
                                    class="style-chooser"
                                    placeholder="Select ID"
                                    @input="get_data"
                                >
                                <template #option="{ id, admission_date }">
                                    {{ id }} | {{ convert_dob(admission_date) }}
                                </template>
                                </v-select>
                            </div>
                        </div>
                        
                    </div>

                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
                                <label>Payment Method</label>
                                <v-select
                                    disabled="disabled"
                                    v-model="form.payment_method" 
                                    :options="list_payment"
                                    class="style-chooser"
                                    placeholder="Select payment"
                                >
                                </v-select>
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3">
                                <label>Status</label>
                                <v-select
                                    v-model="form.status" 
                                    :options="list_status"
                                    class="style-chooser"
                                    placeholder="Select status"
                                >
                                </v-select>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-body">
                            <h4>Invoice Details</h4>
                            <div class="row mt-4">
                                <div v-for="(detail, index) in form.details" :key="detail.id" class="row">
                                    <div class="mb-3 col">
                                        <label for="name">Description</label>
                                        <input id="name" v-model="detail.item" type="text" name="untyped-input" class="form-control" />
                                    </div>

                                    <div class="mb-3 col">
                                        <label for="name">Quantity</label>
                                        <input @input="calculate(index)" id="name" v-model="detail.qty" type="text" name="untyped-input" class="form-control" />
                                    </div>

                                    <div class="mb-3 col">
                                        <label for="name">Price</label>
                                        <input @input="calculate(index)" id="name" v-model="detail.price" type="text" name="untyped-input" class="form-control" />
                                    </div>

                                    <div class="mb-3 col">
                                        <label for="name">Subtotal</label>
                                        <input id="name" v-model="detail.subtotal" type="text" name="untyped-input" class="form-control" />
                                    </div>

                                    <div class="col align-self-center mt-2">
                                        <button type="button" class="btn btn-primary" value="Delete" @click="deleteRow(index)"> Delete </button>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <button type="button" class="btn btn-success btn-block" @click="AddformData">Add Item</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div>Total Amount : <h4>${{ form.total_amount }}</h4></div>
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
