import { handleActions } from "redux-actions";
import { api } from "api";

const LOADER = "LOGIN_LOADER";
const PRODUCTOS = "PRODUCTOS";
const PAGE = "PAGE";
const PRODUCTO = "PRODUCTO_HOME";
const SHOW_MODAL = "SHOW_MODAL";

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
};


// ------------------------------------
// Actions
// -
const getProductos = (page = 1) => (dispatch, getStore) => {
    const params = { page };
    dispatch(setLoader(true));
    api.get('productos/productos', params).then((response) => {
        dispatch(setProductos(response));
        dispatch(setPage(page));
    }).catch(() => {
    }).finally(() => {
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
const RealizarCompra = () => (dispatch) => {
    console.log("Compra exitosa");
    dispatch(setModal(false));
};

export const actionsHome = {
    getProductos,
    ComprarBtn,
    CancelarCompra,
    RealizarCompra,
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
};
export default handleActions(reducers, initialState);
