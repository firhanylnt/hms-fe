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
            title: "Dashboard",
            data: {
                userRole: "",
                users: null,
                doctors: null,
                patients: null,
                appointments: null,
                invoice: 0,
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
    mounted: function() {
        const userRoles = JSON.parse(localStorage.getItem("user"));
        this.userRole = userRoles.role;
    },
    methods: {
        async get_users(){
            const arr = ['users','doctors','patients','appointments','nurses','bloods','rooms','ipd', 'invoice']

            arr.map(async (name) => {
                let url = `${process.env.apiBaseUrl}/${name}`
                const user = JSON.parse(localStorage.getItem("user"));
                if (name === 'appointments') {
                    if (user.role == 'Patient') {
                        url += `?email=${user.email}`;
                    }
                }
                if (name === 'invoice') {
                    if (user.role == 'Patient') {
                        url += `/${user.id}`;
                    }
                }
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
                    if(name === 'appointments'){
                        this.data.appointments = res.length
                    }
                    if(name === 'nurses'){
                        this.data.nurses = res.length
                    }
                    if(name === 'bloods'){
                        this.data.bloods = res.length
                    }
                    if(name === 'rooms'){
                        this.data.rooms = res.length
                    }
                    if(name === 'ipd'){
                        this.data.ipd = res.length
                    }
                    if(name === 'invoice'){
                        this.data.invoice = res.length
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

    <div class="row mt-2" v-if="userRole === 'Patient'">
        <div class="col-md-3">
            <div class="card">
                <div class="card-body">
                    <div class="float-end mt-2">
                        <img width="50" src="~/assets/images/icon/medical-appointment.png">
                    </div>
                    <div>
                        <h4 class="mb-1 mt-1">
                            <span data-plugin="counterup">
                                {{data.appointments}}
                            </span>
                        </h4>
                        <p class="text-muted mb-0">Appointment</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card">
                <div class="card-body">
                    <div class="float-end mt-2">
                        <img width="50" src="~/assets/images/icon/medical-appointment.png">
                    </div>
                    <div>
                        <h4 class="mb-1 mt-1">
                            <span data-plugin="counterup">
                                {{data.invoice}}
                            </span>
                        </h4>
                        <p class="text-muted mb-0">Invoice</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row mt-2" v-if="userRole !== 'Patient'">
        <!--  -->
        <div class="col-md-3">
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
        <div class="col-md-3">
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
        <div class="col-md-3">
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
        <div class="col-md-3">
            <div class="card">
                <div class="card-body">
                    <div class="float-end mt-2">
                        <img width="50" src="~/assets/images/icon/medical-appointment.png">
                    </div>
                    <div>
                        <h4 class="mb-1 mt-1">
                            <span data-plugin="counterup">
                                {{data.appointments}}
                            </span>
                        </h4>
                        <p class="text-muted mb-0">Appointment</p>
                    </div>
                </div>
            </div>
        </div>
        <!--  -->
    </div>

    <div class="row mt-2" v-if="userRole !== 'Patient'">
        <!--  -->
        <div class="col-md-3">
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
        <div class="col-md-3">
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
                        <p class="text-muted mb-0">Blood Stock</p>
                    </div>
                </div>
            </div>
        </div>
        <!--  -->
        <div class="col-md-3">
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
        <div class="col-md-3">
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
