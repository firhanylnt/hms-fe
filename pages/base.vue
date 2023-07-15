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
        };
    },
    middleware: "authentication",
};
</script>

<template>
<div>
    <div class="row justify-content-center">
        <div class="col-sm-4">
            <div class="error-img">
                <img src="~/assets/images/404-error.png" alt class="img-fluid mx-auto d-block" />
            </div>
        </div>
    </div>
</div>
</template>

<style></style>
