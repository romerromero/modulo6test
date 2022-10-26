<template>
    <div class="container">
        <center>
            <h4>REGISTRAR NUEVA CUENTA</h4>
        </center>

        <form v-on:submit.prevent="guardarCuenta()">
            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Nombre </label>
                        <input type="text" class="form-control" v-model="nueva_cuenta.nombre" id="exampleFormControlInput1" placeholder="Nombre">
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Descripción</label>
                        <textarea class="form-control" v-model="nueva_cuenta.descripcion" id="exampleFormControlTextarea1" rows="3"></textarea>
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
    name: "CuentaUsuario",
    data: function () {
        return {
            nueva_cuenta: {
                'nombre':'',
                'descripcion':''
            }
        };
    },
    components: {
        
    },

    methods: {
        guardarCuenta () {
            axios.post('http://localhost:3000/cuentas',{
                nombre:this.nueva_cuenta.nombre,
                descripcion: this.nueva_cuenta.descripcion,
                saldo: 0
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


    },
};
</script>