<script>
import moment from 'moment';
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
            res: [],
        };
    },
    created() {
        this.get_data()
    },
    methods: {
        async get_data() {
            try {
                let user = JSON.parse(localStorage.getItem("user"));
                let url = `${process.env.apiBaseUrl}/trm`;
                if (user.role != 'Super Admin' && user.role != 'Receptionist') {
                url += `/${user.id}`;
                }
                await this.$axios.$get(url).then(res => {
                console.log(res);
                this.res = res;
                });
                // Handle the JSON data
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        },
        tgl(e) {
            const date = moment(e).format('DD MMM YYYY HH:mm')
            return date
        },
    },
    middleware: "authentication",
};
</script>

<template>
<div>
    <div class="row">
        <div v-for="(detail, index) in res" :key="detail.id" class="card">
            <div style="padding: 5px">
                <table class="table table-responsive">
                    <tr>
                        <td>Date :</td>
                        <td>{{ tgl(detail.date) }}</td>
                    </tr>
                    <tr>
                        <td>Type :</td>
                        <td>{{ detail.type }}</td>
                    </tr>
                    <tr>
                        <td>Payment Method :</td>
                        <td>{{ detail.payment_method }}</td>
                    </tr>
                    <tr>
                        <td>Blood Pressure :</td>
                        <td>{{ detail.blood_pressure }}</td>
                    </tr>
                    <tr>
                        <td>Weight :</td>
                        <td>{{ detail.weight }}</td>
                    </tr>
                    <tr>
                        <td>Height :</td>
                        <td>{{ detail.height }}</td>
                    </tr>
                    <tr>
                        <td>Symptoms :</td>
                        <td>{{ detail.symptoms }}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</div>
</template>

<style></style>
