<template>

    <div class="container">
        <br><br>
        <center>
            <h4>REGISTRAR NUEVO MOVIMIENTO</h4>
            {{ fecha }}
        </center>
        <br>
        <form v-on:submit.prevent="guardarMovimiento()">
            <div class="row">
                <div class="col-md-3">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" v-model="tipo" :value="1" id="flexRadioDefault1">
                        <label class="form-check-label" for="flexRadioDefault1">
                            EGRESO
                        </label>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" v-model="tipo" :value="2" id="flexRadioDefault2">
                        <label class="form-check-label" for="flexRadioDefault2">
                            INGRESO
                        </label>
                    </div>
                </div>
                <div class="col-md-3">

                    <div class="form-check">
                        <input class="form-check-input" type="radio" v-model="tipo" :value="3" id="flexRadioDefault3">
                        <label class="form-check-label" for="flexRadioDefault3">
                            TRANSFERENCIA
                        </label>
                    </div>

                </div>

                <br><br>
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Descripción</label>
                        <textarea class="form-control" v-model="concepto" id="exampleFormControlTextarea1"
                            rows="2"></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Cantidad </label>
                        <input type="number" class="form-control" v-model="cantidad" v-on:change="changeSubTotal()"
                            id="exampleFormControlInput1" placeholder="Cantidad">
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Precio unitario </label>
                        <input type="number" class="form-control" v-model="precio_unitario"
                            v-on:change="changeSubTotal()" id="exampleFormControlInput1" placeholder="Precio Unitario">
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Sub total </label>
                        <input type="number" class="form-control" v-model="sub_total" id="exampleFormControlInput1"
                            placeholder="Sub Total">
                    </div>


                    <div class="mb-3">
                        <button type="button" class="btn btn-success btn-sm"
                            v-on:click="irMovimientos()">Cancelar</button>
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
            id_cuenta: '',
            tipo: 1,
            concepto: 'mochila',
            cantidad: 1,
            precio_unitario: 0,
            sub_total: 0,
            fecha: '',
            lugar: ''
        };
    },
    components: {

    },
    created() {
        this.getFechaHoraActual();
    },

    methods: {
        crearMovimiento() {
            this.$router.push("/crearMovimiento");
        },
        getFechaHoraActual() {
            let fecha = new Date().toLocaleDateString();
            let hora = new Date().toLocaleTimeString();
            this.fecha = fecha +' '+ hora;
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


                this.$router.push("/movimientosCuenta/" + this.id_cuenta);
  
            });





        },
        irMovimientos() {
            this.$router.push("/movimientosCuenta/" + this.id_cuenta);
        },


    },
    mounted() {

        this.id_cuenta = this.$route.params.id_cuenta;

    }

};
</script>
