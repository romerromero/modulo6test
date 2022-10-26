<template>

    <div class="container">
        <center>
            <h4>EDITAR  CUENTA</h4>
        </center>

        <form v-on:submit.prevent="updateDatsCuenta()">
            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Nombre </label>
                        <input type="text" class="form-control" v-model="dats_cuenta.nombre"  placeholder="Nombre">
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Descripción</label>
                        <textarea class="form-control" v-model="dats_cuenta.descripcion"  rows="3"></textarea>
                    </div>
                    <div class="mb-3">
                        <button type="button" class="btn btn-success btn-sm" v-on:click="irCuentas()">Cancelar</button>
                        <button class="btn btn-primary btn-sm">Guardar</button>
                    </div>

                </div>
            </div>

        </form>


    </div>


</template>


<script>

import axios from "axios";


export default {
    name: "EditarCuenta",
    data: function () {
        return {
            id_cuenta:'',
            dats_cuenta: []
       
            
        };
    },
    components: {

    },
    created () {
       
    },
    methods: {
        getDatsCuenta() {
            axios.get('http://localhost:3000/cuentas/'+this.id_cuenta).then(response => {
                this.dats_cuenta = response.data;
            });
        },
        updateDatsCuenta () {
            axios.put('http://localhost:3000/cuentas/'+this.id_cuenta,{
                nombre: this.dats_cuenta.nombre,
                descripcion: this.dats_cuenta.descripcion,
                saldo: this.dats_cuenta.saldo
            }).then(response =>{
                response
                this.$router.push("/cuentas");
            });
        },
        irCuentas () {
            this.$router.push("/cuentas");
        },
    },
    mounted() {
       
        this.id_cuenta  = this.$route.params.id_cuenta;
        this.getDatsCuenta();
    },
};
</script>