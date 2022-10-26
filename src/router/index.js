import { createWebHistory, createRouter } from "vue-router";

import CuentaUsuario from "../views/Cuentas/CuentaUsuario.vue";
import CrearCuenta from "../views/Cuentas/CrearCuenta.vue";
import EditarCuenta from "../views/Cuentas/EditarCuenta.vue";
import EliminarCuenta from "../views/Cuentas/EliminarCuenta.vue";

import MovimientosCuenta from "../views/Movimientos/MovimientosCuenta.vue";
import CrearMovimiento from "../views/Movimientos/CrearMovimiento.vue";
import EditarMovimiento from "../views/Movimientos/EditarMovimiento.vue";
import EliminarMovimiento from "../views/Movimientos/EliminarMovimiento.vue";




const routes = [{
        name: "cuentas",
        path: "/cuentas",
        component: CuentaUsuario,
    },
    {
        name: "crearCuenta",
        path: "/crearCuenta",
        component: CrearCuenta
    },
    {
        name: "editarCuenta",
        path: "/editarCuenta/:id_cuenta",
        component: EditarCuenta
    },
    {
        name: "eliminarCuenta",
        path: "/eliminarCuenta/:id_cuenta",
        component: EliminarCuenta
    },


    {
        name: "movimientosCuenta",
        path: "/movimientosCuenta/:id_cuenta",
        component: MovimientosCuenta
    },
    {
        name: "crearMovimiento",
        path: "/crearMovimiento/:id_cuenta",
        component: CrearMovimiento
    },
    {
        name: "editarMovimiento",
        path: "/editarMovimiento/:id_cuenta/:id_movimiento",
        component: EditarMovimiento
    },
    {
        name: "eliminarMovimiento",
        path: "/eliminarMovimiento/:id_cuenta/:id_movimiento",
        component: EliminarMovimiento
    },


];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;