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
        };
    },
    middleware: "authentication",
};
</script>

<template>
<div>
    <div class="text-center">
        <div>
            <div class="row justify-content-center">
                <div class="col-sm-4">
                    <div class="error-img">
                        <img src="~/assets/images/404-error.png" alt class="img-fluid mx-auto d-block" />
                    </div>
                </div>
            </div>
        </div>
        <h4 class="text-uppercase mt-4">Sorry, page not found</h4>
    </div>
</div>
</template>

<style></style>
