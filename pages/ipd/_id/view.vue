<script>

import Overview from '../../../components/Ipd/Overview.vue';
import Medicine from '../../../components/Ipd/Medicine.vue';
import Diagnosis from '../../../components/Ipd/Diagnosis.vue';

export default {
    head() {
        return {
            title: `${this.title} | Dimedic`,
        };
    },
    components: { Overview, Medicine, Diagnosis }
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
                    <b-tabs justified nav-class="nav-tabs-custom" content-class="p-3 text-muted">
                        <b-tab active>
                            <template v-slot:title>
                                <span class="d-inline-block d-sm-none">
                                    <i class="fas fa-home"></i>
                                </span>
                                <span class="d-none d-sm-inline-block">Overview</span>
                            </template>
                           <Overview />
                        </b-tab>
                        <b-tab>
                            <template v-slot:title>
                                <span class="d-inline-block d-sm-none">
                                    <i class="far fa-user"></i>
                                </span>
                                <span class="d-none d-sm-inline-block">Diagnosis</span>
                            </template>
                            <Diagnosis />
                        </b-tab>
                        <b-tab>
                            <template v-slot:title>
                                <span class="d-inline-block d-sm-none">
                                    <i class="far fa-envelope"></i>
                                </span>
                                <span class="d-none d-sm-inline-block">Medicine</span>
                            </template>
                            <Medicine />
                        </b-tab>
                    </b-tabs>
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
