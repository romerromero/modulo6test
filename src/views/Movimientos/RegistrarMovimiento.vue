<template>

    <div class="container">
        <br>
        <center>
            <h5>NUEVO MOVIMIENTO</h5>
        </center>
        <br>
        <form v-on:submit.prevent="guardarMovimiento()">
            <div class="row">


                <div class="col-md-3">

                    <div class="mb-3">
                      
                        <select class="form-control" v-model="id_cuenta"
                            v-on:change="changeMovimientoFiltro()">
                            <option v-for="cuenta in cuentas" :key="cuenta" :value="cuenta.id">{{cuenta.nombre}}</option>
                        </select>
                    </div>

                </div>

                <div class="col-3">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" v-model="tipo" :value="1" id="flexRadioDefault1">
                        <label class="form-check-label" for="flexRadioDefault1">
                            Engreso
                        </label>
                    </div>
                </div>
                <div class="col-3">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" v-model="tipo" :value="2" id="flexRadioDefault2">
                        <label class="form-check-label" for="flexRadioDefault2">
                            Ingreso
                        </label>
                    </div>
                </div>
                <div class="col-3">

                    <div class="form-check">
                        <input class="form-check-input" type="radio" v-model="tipo" :value="3" id="flexRadioDefault3">
                        <label class="form-check-label" for="flexRadioDefault3">
                            Transferencia
                        </label>
                    </div>

                </div>

                <br><br>
                <div class="col-md-6">
                    <div class="mb-3">
                        <textarea required class="form-control" v-model="concepto" id="exampleFormControlTextarea1"
                            rows="2" placeholder="Concepto"></textarea>
                    </div>
                    <div class="mb-3">
                        <input type="number" class="form-control" v-model="cantidad" v-on:change="changeSubTotal()"
                            id="exampleFormControlInput1" placeholder="Cantidad" required>
                    </div>
                    <div class="mb-3">
                        <input type="number" class="form-control" v-model="precio_unitario"
                            v-on:change="changeSubTotal()" id="exampleFormControlInput1" placeholder="Precio Unitario"
                            required>
                    </div>
                    <div class="mb-3">
                        <input type="number" class="form-control" v-model="sub_total" id="exampleFormControlInput1"
                            placeholder="Sub Total" required>
                    </div>


                    <div class="mb-3">
                        <button type="button" class="btn btn-success btn-sm"
                            v-on:click="irMovimientos()">Ver Lista</button>
                        <button class="btn btn-primary btn-sm">Guardar</button>

                    </div>


                </div>
            </div>

        </form>

    </div>


</template>

<script>
import axios from 'axios';



export default {
    name: "CrearMovimiento",
    data: function () {
        return {
            id_cuenta: '1',
            tipo: 1,
            concepto: '',
            cantidad: '',
            precio_unitario: '',
            sub_total: '',
            fecha: '',
            lugar: '',

            cuentas:[]
        };
    },
    components: {

    },
    created() {
        this.getFechaHoraActual();
        this.getCuentas();
    },

    methods: {


        getCuentas() {
            axios.get('http://localhost:3000/cuentas').then(response => {
                this.cuentas = response.data;
            });
        },

        getFechaHoraActual() {
            let fecha = new Date().toLocaleDateString();
            let hora = new Date().toLocaleTimeString();
            this.fecha = fecha + ' ' + hora;
        },
        changeSubTotal() {

            this.sub_total = this.cantidad * this.precio_unitario;
        },
        guardarMovimiento() {

            axios.post('http://localhost:3000/movimientos', {
                id_cuenta: this.id_cuenta,
                tipo: this.tipo,
                concepto: this.concepto,
                cantidad: this.cantidad,
                precio_unitario: this.precio_unitario,
                sub_total: this.sub_total,
                fecha: this.fecha,
                lugar: this.lugar
            }).then(response => {
                response

                this.id_cuenta= '1';
                this.tipo= 1;
                this.concepto= '';
                this.cantidad= '';
                this.precio_unitario= '';
                this.sub_total= '';
                this.fecha= '';
                this.lugar= '';


                this.$router.push("/");

            });





        },
        irMovimientos() {
            this.$router.push("/movimientosCuenta/" + this.id_cuenta);
        },


    },
    mounted() {



    }

};
</script>
