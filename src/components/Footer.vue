<template>
    <v-footer
            id="footer"
            color="rgba(0,0,0,0)"
    >

        <a href="https://github.com/JafarAkhondali/idcart-generator" class="black--text" style="display: flex;flex-direction: row;text-decoration: none;">
            <i class="fab fa-2x fa-github" style="padding-top: 9px;"></i>
            <v-card-text class="white--text">
                &copy;2019 — <strong>Jafar Akhondali</strong>
            </v-card-text>
        </a>
    </v-footer>
</template>

<script>
    export default {
        name: "Footer",
    }
</script>

<style scoped>
    footer{
        margin-bottom: auto;
        top: calc(100% - 50px);
        left: 30px;
        position: absolute;
    }
</style>
