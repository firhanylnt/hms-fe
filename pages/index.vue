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
            title: "Dashboard",
            data: {
                users: null,
                doctors: null,
                patients: null,
                appointments: null,
                nurses: null,
                bloods: null,
                rooms: null,
                ipd: null,
            }
        };
    },
    middleware: "authentication",
    created() {
        this.get_users()
    },
    methods: {
        async get_users(){
            const arr = ['users','doctors','patients','appointment','nurses','bloods','bedroom','ipd']

            arr.map(async (name) => {
                const url = `${process.env.apiBaseUrl}/${name}`
                await this.$axios.$get(url)
                .then((res) => {
                    if(name === 'users'){
                        this.data.users = res.length
                    }
                    if(name === 'doctors'){
                        this.data.doctors = res.length
                    }
                    if(name === 'patients'){
                        this.data.patients = res.length
                    }
                    if(name === 'appointment'){
                        this.data.appointment = res.length
                    }
                    if(name === 'nurses'){
                        this.data.nurses = res.length
                    }
                    if(name === 'bloods'){
                        this.data.bloods = res.length
                    }
                    if(name === 'bedroom'){
                        this.data.rooms = res.length
                    }
                    if(name === 'ipd'){
                        this.data.ipd = res.length
                    }
                })
            })
            
        },
        
    }
};
</script>

<template>
<div>
    <PageHeader :title="title" />

    <div class="row mt-2">
        <!--  -->
        <div class="col">
            <div class="card">
                <div class="card-body">
                    <div class="float-end mt-2">
                        <img width="50" src="~/assets/images/icon/setting.png">
                    </div>
                    <div>
                        <h4 class="mb-1 mt-1">
                            <span data-plugin="counterup">
                                {{data.users}}
                            </span>
                        </h4>
                        <p class="text-muted mb-0">User</p>
                    </div>
                </div>
            </div>
        </div>
        <!--  -->
        <div class="col">
            <div class="card">
                <div class="card-body">
                    <div class="float-end mt-2">
                        <img width="50" src="~/assets/images/icon/medical-team.png">
                    </div>
                    <div>
                        <h4 class="mb-1 mt-1">
                            <span data-plugin="counterup">
                                {{data.doctors}}
                            </span>
                        </h4>
                        <p class="text-muted mb-0">Doctor</p>
                    </div>
                </div>
            </div>
        </div>
        <!--  -->
        <div class="col">
            <div class="card">
                <div class="card-body">
                    <div class="float-end mt-2">
                        <img width="50" src="~/assets/images/icon/crowd.png">
                    </div>
                    <div>
                        <h4 class="mb-1 mt-1">
                            <span data-plugin="counterup">
                                {{data.patients}}
                            </span>
                        </h4>
                        <p class="text-muted mb-0">Patient</p>
                    </div>
                </div>
            </div>
        </div>
        <!--  -->
        <div class="col">
            <div class="card">
                <div class="card-body">
                    <div class="float-end mt-2">
                        <img width="50" src="~/assets/images/icon/medical-appointment.png">
                    </div>
                    <div>
                        <h4 class="mb-1 mt-1">
                            <span data-plugin="counterup">
                                {{data.appointment}}
                            </span>
                        </h4>
                        <p class="text-muted mb-0">Appointment</p>
                    </div>
                </div>
            </div>
        </div>
        <!--  -->
    </div>

    <div class="row mt-2">
        <!--  -->
        <div class="col">
            <div class="card">
                <div class="card-body">
                    <div class="float-end mt-2">
                        <img width="50" src="~/assets/images/icon/nurse.png">
                    </div>
                    <div>
                        <h4 class="mb-1 mt-1">
                            <span data-plugin="counterup">
                                {{data.nurses}}
                            </span>
                        </h4>
                        <p class="text-muted mb-0">Nurse</p>
                    </div>
                </div>
            </div>
        </div>
        <!--  -->
        <div class="col">
            <div class="card">
                <div class="card-body">
                    <div class="float-end mt-2">
                        <img width="50" src="~/assets/images/icon/blood.png">
                    </div>
                    <div>
                        <h4 class="mb-1 mt-1">
                            <span data-plugin="counterup">
                                {{data.bloods}}
                            </span>
                        </h4>
                        <p class="text-muted mb-0">Bloods Stock</p>
                    </div>
                </div>
            </div>
        </div>
        <!--  -->
        <div class="col">
            <div class="card">
                <div class="card-body">
                    <div class="float-end mt-2">
                        <img width="50" src="~/assets/images/icon/room.png">
                    </div>
                    <div>
                        <h4 class="mb-1 mt-1">
                            <span data-plugin="counterup">
                                {{data.rooms}}
                            </span>
                        </h4>
                        <p class="text-muted mb-0">Room</p>
                    </div>
                </div>
            </div>
        </div>
        <!--  -->
        <div class="col">
            <div class="card">
                <div class="card-body">
                    <div class="float-end mt-2">
                        <img width="50" src="~/assets/images/icon/ipd.png">
                    </div>
                    <div>
                        <h4 class="mb-1 mt-1">
                            <span data-plugin="counterup">
                                {{data.ipd}}
                            </span>
                        </h4>
                        <p class="text-muted mb-0">IPD</p>
                    </div>
                </div>
            </div>
        </div>
        <!--  -->
    </div>
</div>
</template>

<style></style>
