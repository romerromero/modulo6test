<template>

    <div class="container">
        <center>
            <h4>ELIMINAR MOVIMIENTO</h4>

            <br><br>
            ¿Esta seguro de eliminar este movimiento?
        </center>
        <div class="mb-3">
            <button type="button" class="btn btn-success btn-sm" v-on:click="irMovimientos()">Cancelar</button>
            <button type="button" v-on:click="deleteMovimiento()" class="btn btn-danger btn-sm">Elininar</button>
        </div>


    </div>


</template>


<script>

import axios from "axios";


export default {
    name: "EditarCuenta",
    data: function () {
        return {
            id_movimiento: '',
            id_cuenta:'',
            dats_cuenta: []


        };
    },
    components: {

    },
    created() {

    },
    methods: {

        deleteMovimiento() {
            axios.delete('http://localhost:3000/movimientos/' + this.id_cuenta).then(response => {
                response
                this.$router.push("/movimientosCuenta/" + this.id_cuenta);
            });
        },
        irMovimientos () {
            this.$router.push("/movimientosCuenta/" + this.id_cuenta);
        },
    },
    mounted() {

        this.id_movimiento = this.$route.params.id_movimiento;
        this.id_cuenta = this.$route.params.id_cuenta;
    },
};
</script>