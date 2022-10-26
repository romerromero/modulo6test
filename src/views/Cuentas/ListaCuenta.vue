<template>


    <div class="row">

        <div class="col-md-6">
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Buscar Cuentas </label>
                <input type="email" class="form-control" v-model="descripcion_filtro" placeholder="Nombre">
            </div>
        </div>
        <div class="col-md-6">
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Buscar Cuentas </label>
                <select class="form-select" v-model="saldo_filtro" v-on:change="changeSaldoFiltro()">
                    <option value="">Filtrar Cuentas</option>
                    <option value="50">Saldo mayor a Bs. 50 </option>
                    <option value="100">Saldo mayor a Bs. 100 </option>
                    <option value="500">Saldo mayor a Bs. 500 </option>
                    <option value="1000">Saldo mayor a Bs. 1000 </option>
                </select>
            </div>
        </div>
    </div>

    <table class="table table-striped">
        <thead>
            <th>Nº</th>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Saldo</th>
        </thead>
        <tbody>
            <tr v-for="(cuenta, index) in filtradorCuentas" :key="cuenta">
                <td>{{ index + 1 }}</td>
                <td>{{ cuenta.nombre }}</td>
                <td>{{ cuenta.descripcion }}</td>
                <td>Bs. {{ cuenta.saldo }}</td>
                <td>


                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button class="btn btn-danger btn-sm" v-on:click="eliminarCuenta(cuenta)">Eliminar</button>
                        <button class="btn btn-success btn-sm" v-on:click="editarCuenta(cuenta)">Editar</button>
                        <button class="btn btn-primary btn-sm"
                            v-on:click="movimientosCuenta(cuenta)">Movimientos</button>
                    </div>
                </td>
            </tr>

        </tbody>
    </table>

</template>

<script>

import axios from "axios";


export default {
    name: "ListaCuenta",
    data: function () {
        return {
            cuentas: [],
            descripcion_filtro: '',
            saldo_filtro: ''
        };
    },
    components: {

    },
    created() {
        this.getCuentas();
    },
    methods: {
        getCuentas() {
            axios.get('http://localhost:3000/cuentas').then(response => {
                this.cuentas = response.data;
            });
        },
        editarCuenta(cuenta) {
            this.$router.push("/editarCuenta/" + cuenta.id);
        },
        eliminarCuenta(cuenta) {
            this.$router.push("/eliminarCuenta/" + cuenta.id);
        },
        movimientosCuenta(cuenta) {
            this.$router.push("/movimientosCuenta/" + cuenta.id);
        },
        changeSaldoFiltro() {
            if (this.saldo_filtro == '') {
                this.getCuentas();
            }
            else {
                axios.get('http://localhost:3000/cuentas').then(response => {
                    var cuentas = response.data;
                    cuentas = cuentas.filter(e => e.saldo > this.saldo_filtro);

                    this.cuentas = cuentas;

                });

            }
        }



    },
    mounted() {


    },

    computed: {
        filtradorCuentas() {
            let filtradorCuentas = this.cuentas.filter((cuenta) => {
                return cuenta.nombre.toLowerCase().includes(this.descripcion_filtro.toLowerCase());
            })
            let ordernarCuentas = filtradorCuentas.sort((a, b) => {
                return b.upvoted - a.upvoted;
            })
            return ordernarCuentas;
        }
    }

};
</script>