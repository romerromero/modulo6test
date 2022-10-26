<template>

    <div class="container">
        <center>
            <h4>ELIMINAR CUENTA</h4>

            <br><br>
            ¿Esta seguro de eliminar esta cuenta?
        </center>
        <div class="mb-3">
            <button type="button" class="btn btn-success btn-sm" v-on:click="irCuentas()">Cancelar</button>
            <button type="button" v-on:click="deleteCuenta()" class="btn btn-danger btn-sm">Elininar</button>
        </div>


    </div>


</template>


<script>

import axios from "axios";


export default {
    name: "EditarCuenta",
    data: function () {
        return {
            id_cuenta: '',
            dats_cuenta: []


        };
    },
    components: {

    },
    created() {

    },
    methods: {

        deleteCuenta() {
            axios.delete('http://localhost:3000/cuentas/' + this.id_cuenta).then(response => {
                response
                this.$router.push("/cuentas");
            });
        },
        irCuentas () {
            this.$router.push("/cuentas");
        },
    },
    mounted() {

        this.id_cuenta = this.$route.params.id_cuenta;
    },
};
</script>