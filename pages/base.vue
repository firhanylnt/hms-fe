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
    <PageHeader :title="title" />

    
</div>
</template>

<style></style>
