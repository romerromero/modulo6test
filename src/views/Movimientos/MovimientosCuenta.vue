<template>

    <div class="container">
        <br>
        <center>
            <h4>MOVIMIENTOS</h4>
        </center>

     
            <button class="btn btn-success btn-sm " v-on:click="irCuentas()">Atras</button>
            <button class="btn btn-primary btn-sm " v-on:click="crearMovimiento()">Registrar Nuevo Moviminento</button>
            <br><br>

      


        <div class="row">
            <ListaMovimientos></ListaMovimientos>
        </div>
    </div>

</template>


<script>


import ListaMovimientos from './ListaMovimientos.vue';


export default {
    name: "MovimientosCuenta",
    data: function () {
        return {
            id_cuenta: ''
        };
    },
    components: {
        ListaMovimientos
    },

    methods: {
        irCuentas () {
            this.$router.push("/cuentas");
        },
        crearMovimiento() {
            this.$router.push("/crearMovimiento/" + this.id_cuenta);
        }


    },
    mounted() {
        this.id_cuenta = this.$route.params.id_cuenta;


    }

};
</script>
