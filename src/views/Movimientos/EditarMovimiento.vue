<template>

    <div class="container">
        <br><br>
        <center>
            <h4>EDITAR DATOS DE MOVIMIENTO</h4>
            {{ dats_movimiento.fecha }}
        </center>
        <br>
        <form v-on:submit.prevent="actualizarMovimiento()">
            <div class="row">
                <div class="col-md-3">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" v-model="dats_movimiento.tipo" :value="1" id="flexRadioDefault1">
                        <label class="form-check-label" for="flexRadioDefault1">
                            EGRESO
                        </label>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" v-model="dats_movimiento.tipo" :value="2" id="flexRadioDefault2">
                        <label class="form-check-label" for="flexRadioDefault2">
                            INGRESO
                        </label>
                    </div>
                </div>
                <div class="col-md-3">

                    <div class="form-check">
                        <input class="form-check-input" type="radio" v-model="dats_movimiento.tipo" :value="3" id="flexRadioDefault3">
                        <label class="form-check-label" for="flexRadioDefault3">
                            TRANSFERENCIA
                        </label>
                    </div>

                </div>

                <br><br>
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Descripción</label>
                        <textarea class="form-control" v-model="dats_movimiento.concepto" id="exampleFormControlTextarea1"
                            rows="2"></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Cantidad </label>
                        <input type="number" class="form-control" v-model="dats_movimiento.cantidad" v-on:change="changeSubTotal()"
                            id="exampleFormControlInput1" placeholder="Cantidad">
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Precio unitario </label>
                        <input type="number" class="form-control" v-model="dats_movimiento.precio_unitario" v-on:change="changeSubTotal()"
                            id="exampleFormControlInput1" placeholder="Precio Unitario">
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Sub total </label>
                        <input type="number" class="form-control" v-model="dats_movimiento.sub_total" id="exampleFormControlInput1"
                            placeholder="Sub Total">
                    </div>


                    <div class="mb-3">
                        <button type="button" class="btn btn-success btn-sm" v-on:click="irMovimientos()">Cancelar</button>
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
    name: "EditarMovimiento",
    data: function () {
        return {
            id_movimiento:'',
            dats_movimiento:[]
        };
    },
    components: {

    },
    created() {
        this.getFechaHoraActual();
    
    },

    methods: {
      

        getDatosMovimiento () {
            axios.get('http://localhost:3000/movimientos/'+this.id_movimiento).then(response => {
                this.dats_movimiento = response.data;
            });
        },  

        getFechaHoraActual() {
            let fecha = new Date().toLocaleDateString();
            let hora = new Date().toLocaleTimeString();
            this.dats_movimiento.fecha = fecha +' '+ hora;
        },
        changeSubTotal() {
        
            this.dats_movimiento.sub_total = this.dats_movimiento.cantidad * this.dats_movimiento.precio_unitario;
        },
        actualizarMovimiento() {

            axios.put('http://localhost:3000/movimientos/'+this.id_movimiento, {
                id_cuenta: this.dats_movimiento.id_cuenta,
                tipo: this.dats_movimiento.tipo,
                concepto: this.dats_movimiento.concepto,
                cantidad: this.dats_movimiento.cantidad,
                precio_unitario: this.dats_movimiento.precio_unitario,
                sub_total: this.dats_movimiento.sub_total,
                fecha: this.dats_movimiento.fecha,
                lugar: this.dats_movimiento.lugar
            }).then(response => {
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
        this.getDatosMovimiento();
     

    }

};
</script>
