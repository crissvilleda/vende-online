import { handleActions } from "redux-actions";
import { initialize as initializeForm } from "redux-form";
import { NotificationManager } from "react-notifications";
import { api } from "api";

const LOADER = "LOGIN_LOADER";
const PRODUCTOS = "PRODUCTOS";
const PAGE = "PAGE";
const PRODUCTO = "PRODUCTO_HOME";
const SHOW_MODAL = "SHOW_MODAL";
const UPDATE_PRODUCTOS = 'UPDATE_PRODUCTOS';

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

const setPage = page => ({
    type: PAGE,
    page,
});

const setProducto = producto => ({
    type: PRODUCTO,
    producto,
});
const setModal = showModal => ({
    type: SHOW_MODAL,
    showModal,
});

const setUpdate = update => ({
    type: UPDATE_PRODUCTOS,
    update,
});

export const reducers = {
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
    [PAGE]: (state, { page }) => {
        return {
            ...state,
            page,
        };
    },
    [PRODUCTO]: (state, { producto }) => {
        return {
            ...state,
            producto,
        };
    },
    [SHOW_MODAL]: (state, { showModal }) => {
        return {
            ...state,
            showModal,
        };
    },
    [UPDATE_PRODUCTOS]: (state, { update }) => {
        return {
            ...state,
            update,
        };
    },
};

// ------------------------------------
// Actions
// -
const getProductos = (page = 1) => (dispatch) => {
    const params = { page };
    dispatch(setUpdate(false));
    dispatch(setLoader(true));
    api.get("productos/productos", params)
        .then((response) => {
            dispatch(setProductos(response));
            dispatch(setPage(page));
        })
        .catch(() => {})
        .finally(() => {
            dispatch(setLoader(false));
        });
};

const ComprarBtn = data => (dispatch) => {
    dispatch(setProducto(data));
    dispatch(setModal(true));
};

const CancelarCompra = () => (dispatch) => {
    dispatch(setProducto({}));
    dispatch(setModal(false));
};
const RealizarCompra = (data, producto) => (dispatch) => {
    const venta = {};
    const cliente = {};
    venta.producto = producto.id;
    venta.cantidad = parseInt(data.cantidad, 10);
    venta.total = data.total;
    cliente.nombre = data.nombre;
    cliente.dirección = data.dirección;
    cliente.teléfono = data.teléfono;

    dispatch(setLoader(true));
    api.post("ventas", { venta, cliente })
        .then(() => {
            NotificationManager.success(
                "Compra realizada Exitosamente",
                "Éxito",
                4000
            );
            dispatch(setUpdate(true));
            dispatch(setModal(false));
            dispatch(setProducto({}));
        })
        .catch(() => {
            NotificationManager.error(
                "Error al realizar la compra",
                "Error",
                3000
            );
        })
        .finally(() => {
            dispatch(setLoader(false));
        });
};

const onChangeField = (value, precio) => (dispatch, getStore) => {
    console.log(value, precio);
    const { values } = getStore().form.ComprarForm;
    const total = parseFloat(value) * precio;
    const newState = {
        ...values,
        total,
    };
    dispatch(initializeForm("ComprarForm", newState));
};

export const actionsHome = {
    getProductos,
    ComprarBtn,
    CancelarCompra,
    RealizarCompra,
    onChangeField,
};

export const initialState = {
    loader: false,
    productos: {
        count: 0,
        results: [],
    },
    producto: {},
    page: 1,
    showModal: false,
    update: false,
};
export default handleActions(reducers, initialState);
