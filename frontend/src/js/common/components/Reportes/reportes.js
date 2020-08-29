import React, { Component } from "react";
import Grid from "../Utils/Grid";

class Reporte extends Component {
    componentWillMount = () => {
        const { generarReporte } = this.props;
        generarReporte();
    };

    render() {
        const { productos, loader, promedio, totalVenta, totalCantidad } = this.props;
        console.log(totalCantidad);
        return (
            <React.Fragment>
                <br />
                <h3 className="uk-text-bold uk-text-lead uk-width-1-2">
                    Reportes
                </h3>
                {
                    totalVenta && totalVenta !== 0 ? (
                        <div className="card card-small uk-padding-small uk-padding uk-margin-auto">
                            <div className="uk-padding uk-padding-remove-bottom">
                                <h3
                                    style={{
                                        fontSize: "18px",
                                        fontWeight: "bold",
                                        marginBottom: "0",
                                    }}
                                >
                                    Reporte promedio de precios
                                </h3>
                                <hr style={{ marginTop: "5px" }} />
                                <p style={{ fontSize: "16px" }}>
                                    Promedio:
                                    {` Q.${promedio.toFixed(2)}`}
                                </p>
                                <hr />
                            </div>

                            <div className="uk-card uk-padding uk-padding-remove-top uk-padding-remove-bottom">
                                <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>
                                    Reporte ventas por producto
                                </h3>
                                <Grid
                                    data={productos}
                                    loading={loader}
                                    pagination={false}
                                >
                                    <TableHeaderColumn
                                        isKey
                                        key="id"
                                        dataField="nombre"
                                        dataSort
                                    >
                                        Producto
                                    </TableHeaderColumn>
                                    <TableHeaderColumn dataField="cantidad" dataSort>
                                        Cantidad disponible
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField="cantidad_venta"
                                        dataSort
                                    >
                                        Cantidad vendida
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField="total_venta"
                                        dataSort
                                        dataFormat={cell => `Q. ${cell.toFixed(2)}`}
                                    >
                                        Total Vendido (Quetzales)
                                    </TableHeaderColumn>
                                </Grid>
                            </div>
                            <div className="uk-card uk-padding uk-padding-remove-top">
                                <h3
                                    style={{
                                        fontSize: "18px",
                                        fontWeight: "bold",
                                        marginTop: "15px",
                                        marginBottom: "0",
                                    }}
                                >
                                    Reporte total ventas
                                </h3>
                                <hr style={{ marginTop: "5px" }} />
                                <p style={{ fontSize: "16px", marginBottom: "0" }}>
                                    {' '}
                                    Productos Vendidos :
                                    {`  ${totalCantidad}`}
                                </p>
                                <p style={{ fontSize: "16px" }}>
                                    {' '}
                                    Total ventas:
                                    {`   Q.${totalVenta.toFixed(2)}`}
                                </p>
                            </div>
                        </div>

                    ) : (<p style={{ fontSize: "16px", fontWeight: "bold" }}>Lo sentimos, no tienes ventas para generar un reporte!</p>)
                }

            </React.Fragment>
        );
    }
}

export default Reporte;
