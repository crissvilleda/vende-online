import React, { Component } from "react";
import { Link } from "react-router-dom";
import Grid from "../Utils/Grid";
import { standardActions } from "../Utils/Grid/StandardActions";

export default class listaProducto extends Component {
    componentWillMount = () => {
        const { listar } = this.props;
        listar();
    };

    render() {
        const {
            data,
            loader,
            onSortChange,
            eliminar,
            listar,
            page,
        } = this.props;
        return (
            <React.Fragment>
                <br />
                <h3 className="uk-text-bold uk-text-lead uk-width-1-2">
                    Productos
                </h3>
                <div className="card card-small uk-padding-small uk-padding uk-margin-auto">
                    <div className="uk-width-1-1 uk-flex uk-flex-right uk-margin-auto-top@s">
                        <Link
                            className="btn btn-primary btn-sm"
                            to="/productos/create"
                        >
                            Agregar
                            <span uk-icon="icon: pencil" />
                        </Link>
                    </div>

                    <div className="uk-card uk-padding">
                        <Grid
                            data={data}
                            loading={loader}
                            onPageChange={listar}
                            onSortChange={onSortChange}
                            page={page}
                        >
                            <TableHeaderColumn dataField="nombre" dataSort>
                                Nombre
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField="descripción" dataSort>
                                Descripcion
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField="precio" dataSort>
                                Precio
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField="cantidad" dataSort>
                                Cantidad
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                isKey
                                dataField="id"
                                dataAlign="center"
                                dataSort
                                dataFormat={standardActions({
                                    editar: "productos",
                                    ver: "productos",
                                    eliminar,
                                })}
                            >
                                Acciones
                            </TableHeaderColumn>
                        </Grid>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
