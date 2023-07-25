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
            title: "Edit Bedroom",
            form: {
                room_type_id: null,
                room_number: null,
                slot: null,
                price: null,
            },
            list: [],
        };
    },
    middleware: "authentication",
    created() {
        this.get_list()
        this.get_data()
    },
    methods: {
        async get_list(){
            try {
                const url = `${process.env.apiBaseUrl}/room-types`
                await this.$axios.$get(url)
                .then((res) => {
                    this.list = res
                })
                // Handle the JSON data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            
        },

        async get_data(){
            try {
                const url = `${process.env.apiBaseUrl}/rooms/${this.$route.params.id}`
                await this.$axios.$get(url)
                .then((res) => {
                    this.form.room_type_id = res.type
                    this.form.room_number = res.number
                    this.form.slot = res.slot
                    this.form.price = res.price
                })
                // Handle the JSON data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            
        },

        async submit() {
            this.form.room_type_id = this.form.room_type_id.id

            const url = `${process.env.apiBaseUrl}/rooms/${this.$route.params.id}`
                await this.$axios.$post(url, this.form)
                .then((res) => {
                    this.$router.push(`/bed-management/room`)
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
                                <label>Room Number</label>
                                <input v-model="form.room_number" type="text" class="form-control" placeholder="Input Room Number"/>
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3">
                                <label>Slot</label>
                                <input v-model="form.slot" type="text" class="form-control" placeholder="Input Slot"/>
                            </div>
                        </div>
                        
                    </div>

                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
                                <label>Price</label>
                                <input v-model="form.price" type="text" class="form-control" placeholder="Input Price"/>
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3">
                                <label>Type</label>
                                <v-select
                                    v-model="form.room_type_id" 
                                    :options="list" 
                                    :value="'id'"
                                    :label="'type'"
                                    class="style-chooser"
                                    placeholder="Select Type"
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
