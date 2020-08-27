import { connect } from 'react-redux';
import Reporte from './reportes';
import { actions } from '../../../redux/modules/Reportes/reportes';

const ms2p = (state) => {
    return {
        ...state.reportes,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(Reporte);
