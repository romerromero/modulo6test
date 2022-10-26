<template>

    <div class="container">
        <br>
        <center>
            <h4>LISTA DE CUENTAS </h4>
        </center>

        <button class="btn btn-primary btn-sm" v-on:click="crearNuevaCuenta()">Registrar Nueva Cuenta</button> <br><br>

        <div class="row">
            <ListaCuenta></ListaCuenta>
        </div>
    </div>

</template>


<script>


import ListaCuenta from './ListaCuenta.vue';


export default {
    name: "CuentaUsuario",
    data: function () {
        return {
            cajas_sucursal: [],
          
        };
    },
    components: {
        ListaCuenta
    },

    methods: {
        crearNuevaCuenta() {
            this.$router.push("/crearCuenta");
        }


    },
    mounted() {



    }

};
</script>
