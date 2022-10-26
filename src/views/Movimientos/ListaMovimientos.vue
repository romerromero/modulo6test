<template>

    <div class="row">

        <div class="col-md-12">
            <table>
                <tr>
                    <td><b>SALDO</b></td>
                    <td>Bs. {{ monto_saldo }}</td>
                </tr>
                <tr>
                    <td><b>INGRESOS</b></td>
                    <td>Bs. {{ monto_ingresos }}</td>
                </tr>
                <tr>
                    <td><b>EGRESOS</b></td>
                    <td>Bs. {{ monto_egresos }}</td>
                </tr>
            </table>
            <br>
        </div>

        <div class="col-md-4">
            <div class="mb-3">
                <label class="form-label">Buscar Movimientos </label>
                <input type="email" class="form-control" v-model="descripcion_filtro" placeholder="Movimientos">
            </div>
        </div>


        <div class="col-md-4">
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Filtrar </label>
                <select class="form-control" v-model="movimientos_filtro" v-on:change="changeMovimientoFiltro()">
                    <option value="">Todos los Movimientos</option>
                    <option :value="50">Movimientos mayor a Bs. 50 </option>
                    <option :value="100">Movimientos mayor a Bs. 100 </option>
                    <option :value="500">Movimientos mayor a Bs. 500 </option>
                    <option :value="1000">Movimientos mayor a Bs. 1000 </option>

                </select>
            </div>

        </div>


    </div>

    <div class="row">
        <table class="table table-striped">
            <thead>
                <th>Nº</th>
                <th>Tipo</th>
                <th>Descripcion</th>
                <th>Cantidad</th>
                <th>Monto Unitario</th>
                <th>Sub total</th>
                <th>Fecha</th>
                <!-- <th>Lugar</th> -->
            </thead>
            <tbody>
                <tr v-for="(movimiento, index) in filtroMovimientos" :key="movimiento">
                    <td>{{ index + 1 }}</td>
                    <td>
                        <b v-if="movimiento.tipo == 1" style="color:red;">Egreso</b>
                        <b v-if="movimiento.tipo == 2" style="color:green;">Ingreso</b>
                        <b v-if="movimiento.tipo == 3" style="color:blue;">Transferencia</b>
                    </td>
                    <td>{{ movimiento.concepto }}</td>
                    <td>{{ movimiento.cantidad }}</td>
                    <td>{{ movimiento.precio_unitario }}</td>
                    <td>
                        <b v-if="movimiento.tipo == 1" style="color:red;">-</b>
                        <b v-if="movimiento.tipo == 2" style="color:green;">+</b>
                        <b v-if="movimiento.tipo == 3" style="color:blue;">_</b>
                        Bs.
                        {{ movimiento.sub_total }}
                    </td>
                    <td>{{ movimiento.fecha }}</td>
                    <!-- <td>{{ movimiento.lugar }}</td> -->
                    <td>
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">


                            <button class="btn btn-danger btn-sm"
                                v-on:click="eliminarMovimiento(movimiento)">Eliminar</button>
                            <button class="btn btn-success btn-sm"
                                v-on:click="editarMovimiento(movimiento)">Editar</button>
                        </div>
                    </td>
                </tr>

            </tbody>
        </table>
    </div>
</template>


<script>

import axios from 'axios';

export default {
    name: "ListaMovimientos",
    data: function () {
        return {
            id_cuenta: '',
            movimientos: [],
            descripcion_filtro: '',

            monto_saldo: 0,
            monto_ingresos: 0,
            monto_egresos: 0,

            movimientos_filtro: '',
            
        };
    },
    components: {

    },
    created() {

    },
    methods: {
        getMovimientos() {
            axios.get('http://localhost:3000/movimientos?id_cuenta=' + this.id_cuenta).then(response => {
                this.movimientos = response.data;


                this.monto_egresos = 0;
                this.monto_ingresos = 0;
                this.monto_saldo = 0;

                for (var i = 0; i < this.movimientos.length; i++) {
                    if (this.movimientos[i].tipo == 1) {
                        this.monto_egresos = parseFloat(this.monto_egresos + this.movimientos[i].sub_total)
                    }
                    if (this.movimientos[i].tipo == 2) {
                        this.monto_ingresos = parseFloat(this.monto_ingresos + this.movimientos[i].sub_total)
                    }


                }
                this.monto_saldo = this.monto_ingresos - this.monto_egresos;

                axios.get('http://localhost:3000/cuentas/' + this.id_cuenta).then(response => {
                    var dats_cuenta = response.data;


                    dats_cuenta.saldo = this.monto_saldo;


                    axios.put('http://localhost:3000/cuentas/' + this.id_cuenta, {
                        nombre: dats_cuenta.nombre,
                        descripcion: dats_cuenta.descripcion,
                        saldo: dats_cuenta.saldo,
                    }).then(response => {
                        response
                        this.$router.push("/movimientosCuenta/" + this.id_cuenta);
                    });

                });


            });
        },
        editarMovimiento(movimiento) {
            this.$router.push("/editarMovimiento/" + this.id_cuenta + "/" + movimiento.id);
        },
        eliminarMovimiento(movimiento) {
            this.$router.push("/eliminarMovimiento/" + this.id_cuenta + "/" + movimiento.id);
        },
        changeMovimientoFiltro() {
            if (this.movimientos_filtro == '') {
                this.getMovimientos();
            }
            else {
                axios.get('http://localhost:3000/movimientos?id_cuenta=' + this.id_cuenta).then(response => {
                    var movimientos = response.data;
                    movimientos = movimientos.filter(e => e.sub_total > this.movimientos_filtro);

                    this.movimientos = movimientos;

                });

            }
        }


    },
    mounted() {

        this.id_cuenta = this.$route.params.id_cuenta;
        this.getMovimientos();
    },
    computed: {
        filtroMovimientos() {
            let filtroMovimientos = this.movimientos.filter((movimiento) => {
                return movimiento.concepto.toLowerCase().includes(this.descripcion_filtro.toLowerCase());
            })
            let ordernarMovimientos = filtroMovimientos.sort((a, b) => {
                return b.upvoted - a.upvoted;
            })
            return ordernarMovimientos;
        }
    }

};
</script>