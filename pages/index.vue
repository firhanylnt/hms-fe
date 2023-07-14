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
            items: [{
                    text: "Minible",
                },
                {
                    text: "Dashboard",
                    active: true,
                },
            ],
        };
    },
    middleware: "authentication",
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
                                20
                            </span>
                        </h4>
                        <p class="text-muted mb-0">Users</p>
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
                                20
                            </span>
                        </h4>
                        <p class="text-muted mb-0">Doctors</p>
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
                                20
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
                                20
                            </span>
                        </h4>
                        <p class="text-muted mb-0">Appointment</p>
                    </div>
                </div>
            </div>
        </div>
        <!--  -->
    </div>
</div>
</template>

<style></style>
