import { handleActions } from "redux-actions";
import { api } from "api";

const LOADER = "LOADER";
const PRODUCTOS = "PRODUCTOS_REPORTE";
const PRECIO_PROMEDIO = "PRECIO_PROMEDIO";
const TOTAL_VENTA = "TOTAL_VENTA";
const TOTAL_CANTIDAD = "TOTAL_CANTIDAD";

// ------------------------------------
// Pure Actions
// ------------------------------------
const setLoader = loader => ({
    type: LOADER,
    loader,
});
const setProductos = productos => ({
    type: PRODUCTOS,
    productos,
});
const setPecioPromedio = promedio => ({
    type: PRECIO_PROMEDIO,
    promedio,
});
const setTotalVenta = totalVenta => ({
    type: TOTAL_VENTA,
    totalVenta,
});
const setTotalCantidad = totalCantidad => ({
    type: TOTAL_CANTIDAD,
    totalCantidad,
});

// ------------------------------------
// Actions
// ------------------------------------

const generarReporte = () => (dispatch) => {
    dispatch(setLoader(true));
    api.get("reportes/generar_reporte")
        .then((response) => {
            dispatch(setProductos({ results: response.productos }));
            dispatch(setPecioPromedio(response.precio_promedio));
            dispatch(setTotalVenta(response.total_venta));
            dispatch(setTotalCantidad(response.cantidad));
        })
        .catch(() => {})
        .finally(() => {
            dispatch(setLoader(false));
        });
};

export const actions = {
    generarReporte,
};

const reducers = {
    [LOADER]: (state, { loader }) => {
        return {
            ...state,
            loader,
        };
    },
    [PRODUCTOS]: (state, { productos }) => {
        return {
            ...state,
            productos,
        };
    },
    [PRECIO_PROMEDIO]: (state, { promedio }) => {
        return {
            ...state,
            promedio,
        };
    },
    [TOTAL_VENTA]: (state, { totalVenta }) => {
        return {
            ...state,
            totalVenta,
        };
    },
    [TOTAL_CANTIDAD]: (state, { totalCantidad }) => {
        return {
            ...state,
            totalCantidad,
        };
    },
};

const initialState = {
    productos: {},
    totalVenta: 0,
    promedio: 0,
    loader: false,
    totalCantidad: 0,
};

export default handleActions(reducers, initialState);
