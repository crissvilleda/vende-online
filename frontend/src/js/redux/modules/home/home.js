import { handleActions } from "redux-actions";
import { api } from "api";

const LOADER = "LOGIN_LOADER";
const PRODUCTOS = "PRODUCTOS";
const PAGE = "PAGE";

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
};


// ------------------------------------
// Actions
// -
const getProductos = (page = 1) => (dispatch, getStore)=>{
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

export const actionsHome = {
    getProductos,
};

export const initialState = {
    loader: false,
    productos: {
        count: 0,
        results: [],
    },
    page:1
};
export default handleActions(reducers, initialState);
