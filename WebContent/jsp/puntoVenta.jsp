<div class="panel panel-default">
    <div class="panel-heading">
        <div class="panel-title">Administraci&oacute;n Punto de Venta</div>
    </div>
    <div class="panel-body">
        <div class="well well-sm text-right">
            <button class="btn btn-success" data-toggle="modal" data-target="#newPuntoVenta">
				<i class="glyphicon glyphicon-plus"></i> Nuevo
			</button>
        </div>
        <div class="table-responsive">
            <table class="table table-condensed table-bordered table-striped display" style="width: 100% !important; font-size: 80%;">
                <thead>
                    <tr>
                        <th></th>
                        <th class="text-center">ID</th>
                        <th class="text-center">Tipo</th>
                        <th class="text-center">Direcci&oacute;n</th>
                        <th class="text-center">Tel&eacute;fono</th>
                        <th class="text-center">Saldo</th>
                        <th class="text-center">Fecha. Ult. Recarga</th>
                        <th class="text-center">P. Abastecimientto</th>
                    </tr>
                </thead>
                <tbody id="table-punto-venta">
                </tbody>
            </table>
        </div>
    </div>
</div>

<div class="modal fade" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" aria-hidden="true" data-keyboard="false" id="newPuntoVenta">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <form method="POST" id="form-new-punto-venta">
                <div class="modal-header">
                    <button class="close cancelarNewPuntoVenta" aria-hidden="true" type="button" data-dismiss="modal">X</button>
                    <h4 class="modal-title">Nuevo Punto de Venta</h4>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <input type="hidden" name="key" id="key" value="80" />

                        <div class='form-group'>
                            <label for='puntoventaId' class='control-label col-md-2 col-lg-2'>ID:</label>
                            <div class='col-md-4 col-lg-4'>
                                <input type='text' name='puntoventaId' id='puntoventaId' value='' placeholder='ID' class='form-control'>
                            </div>

                            <label for="tipoPuntoVenta" class="control-label col-md-2 col-lg-2">Tipo Punto: </label>
                            <div class="col-md-4 col-lg-4">
                                <select name="tipoPuntoVenta" id="tipoPuntoVenta" class="form-control" required>
						    </select>
                            </div>
                        </div>

                        <div class='form-group'>
                            <label for="pais" class="control-label col-md-2 col-lg-2">Pais: </label>
                            <div class="col-md-4 col-lg-4">
                                <select name="pais" id="pais" class="form-control" required>
						    </select>
                            </div>

                            <label for="estado" class="control-label col-md-2 col-lg-2">Estado: </label>
                            <div class="col-md-4 col-lg-4">
                                <select name="estado" id="estado" class="form-control" required>
						    </select>
                            </div>
                        </div>

                        <div class='form-group'>
                            <label for="provincia" class="control-label col-md-2 col-lg-2">Provincia: </label>
                            <div class="col-md-4 col-lg-4">
                                <select name="provincia" id="provincia" class="form-control" required>
						    </select>
                            </div>

                            <label for="regionProvincia" class="control-label col-md-2 col-lg-2">Region: </label>
                            <div class="col-md-4 col-lg-4">
                                <select name="regionProvincia" id="regionProvincia" class="form-control" required>
						    </select>
                            </div>
                        </div>

                        <div class='form-group'>
                            <label for="latitud" class="control-label col-md-2 col-lg-2">Latitud: </label>
                            <div class="col-md-4 col-lg-4">
                                <input type="text" name="latitud" id="latitud" class="form-control" placeholder="Latitud" />
                            </div>

                            <label for="longitud" class="control-label col-md-2 col-lg-2">Longitud: </label>
                            <div class="col-md-4 col-lg-4">
                                <input type="text" name="longitud" id="longitud" class="form-control" placeholder="longitud" />
                            </div>
                        </div>

                        <div class='form-group'>
                            <label for="DPuntoventasuperior" class="control-label col-md-2 col-lg-2">Punto Superior: </label>
                            <div class="col-md-4 col-lg-4">
                                <input type="text" name="DPuntoventasuperior" id="DPuntoventasuperior" class="form-control" placeholder="Punto Superior" />
                            </div>
                        </div>

                        <div class='form-group'>
                            <label for='telefono' class='control-label col-md-2 col-lg-2'>Telefono:</label>
                            <div class='col-md-4 col-lg-4'>
                                <input type='tel' name='telefono' id='telefono' value='' placeholder='Telefono' class='form-control' required>
                            </div>

                            <label for='nivel' class='control-label col-md-2 col-lg-2'>Nivel:</label>
                            <div class='col-md-4 col-lg-4'>
                                <input type='tel' name='nivel' id='nivel' value='' placeholder='Nivel' class='form-control' required/>
                            </div>
                        </div>

                        <div class='form-group'>
                            <label for='saldo' class='control-label col-md-2 col-lg-2'>Saldo:</label>
                            <div class='col-md-4 col-lg-4'>
                                <input type='number' name='saldo' id='saldo' value='' placeholder='Saldo' class='form-control' step="0.01" required>
                            </div>

                            <label for='saldoFechahora' class='control-label col-md-2 col-lg-2'>Fecha Hora:</label>
                            <div class='col-md-4 col-lg-4'>
                                <input type='text' name='saldoFechahora' id='saldoFechahora' value='' placeholder='Fecha Hora' class='form-control' required>
                            </div>
                        </div>

                        <div class='form-group'>
                            <label for='puntoAbastecimiento' class='control-label col-md-2 col-lg-2'>Punto Abast:</label>
                            <div class='col-md-4 col-lg-4'>
                                <input type='text' name='puntoAbastecimiento' id='puntoAbastecimiento' value='' placeholder='Punto Abastecimiento' class='form-control'>
                            </div>

                            <label for='contacto' class='control-label col-md-2 col-lg-2'>Contacto:</label>
                            <div class='col-md-4 col-lg-4'>
                                <input type='text' name='contacto' id='contacto' value='' placeholder='Contacto' class='form-control'>
                            </div>
                        </div>

                        <div class='form-group'>
                            <label for='direccion' class='control-label col-md-2 col-lg-2'>Direcci&oacute;n:</label>
                            <div class='col-md-10 col-lg-10'>
                                <input type='text' name='direccion' id='direccion' value='' placeholder='Direcci&oacute;n' class='form-control'>
                            </div>
                        </div>

                        <div class='form-group'>
                            <label for='observaciones' class='control-label col-md-2 col-lg-2'>Observaciones:</label>
                            <div class='col-md-10 col-lg-10'>
                                <input type='text' name='observaciones' id='observaciones' value='' placeholder='Observaciones' class='form-control'>
                            </div>
                        </div>

                        <div class='form-group'>
                            <label for='descripcion' class='control-label col-md-2 col-lg-2'>Descripci&oacute;n:</label>
                            <div class='col-md-10 col-lg-10'>
                                <input type='text' name='descripcion' id='descripcion' value='' placeholder='Descripci&oacute;n' class='form-control'>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="modal-footer">
                    <a class="btn btn-default cancelarNewPuntoVenta" data-dismiss="modal">Cerrar</a>
                    <button class="btn btn-primary" type="submit">Guardar cambios</button>
                </div>
            </form>
        </div>
    </div>
</div>
<div class="modal fade" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" aria-hidden="true" data-keyboard="false" id="editPuntoVenta">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <form method="post" accept-charset="ut-8" id="form-edit-punto-venta">
                <div class="modal-header">
                    <button class="close" aria-hidden="true" type="button" data-dismiss="modal">X</button>
                    <h4 class="modal-title">Editar Punto de Venta</h4>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <input type="hidden" name="id" id="edit_id" value="0" />
                        <input type="hidden" name="key" id="edit_key" value="81" />
                        <div class='form-group'>
                            <label for='puntoventaId' class='control-label col-md-2 col-lg-2'>ID:</label>
                            <div class='col-md-4 col-lg-4'>
                                <input type='text' name='puntoventaId' id='edit_puntoventaId' value='' placeholder='ID' class='form-control'>
                            </div>

                            <label for="tipoPuntoVenta" class="control-label col-md-2 col-lg-2">Tipo Punto: </label>
                            <div class="col-md-4 col-lg-4">
                                <select name="tipoPuntoVenta" id="edit_tipoPuntoVenta" class="form-control" required>
						    </select>
                            </div>
                        </div>

                        <div class='form-group'>
                            <label for="pais" class="control-label col-md-2 col-lg-2">Pais: </label>
                            <div class="col-md-4 col-lg-4">
                                <select name="pais" id="edit_pais" class="form-control" required>
						    </select>
                            </div>

                            <label for="estado" class="control-label col-md-2 col-lg-2">Estado: </label>
                            <div class="col-md-4 col-lg-4">
                                <select name="estado" id="edit_estado" class="form-control" required>
						    </select>
                            </div>
                        </div>

                        <div class='form-group'>
                            <label for="provincia" class="control-label col-md-2 col-lg-2">Provincia: </label>
                            <div class="col-md-4 col-lg-4">
                                <select name="provincia" id="edit_provincia" class="form-control" required>
						    </select>
                            </div>

                            <label for="regionProvincia" class="control-label col-md-2 col-lg-2">Region: </label>
                            <div class="col-md-4 col-lg-4">
                                <select name="regionProvincia" id="edit_regionProvincia" class="form-control" required>
						    </select>
                            </div>
                        </div>

                        <div class='form-group'>
                            <label for="latitud" class="control-label col-md-2 col-lg-2">Latitud: </label>
                            <div class="col-md-4 col-lg-4">
                                <input type="text" name="latitud" id="edit_latitud" class="form-control" placeholder="Latitud" />
                            </div>

                            <label for="longitud" class="control-label col-md-2 col-lg-2">Longitud: </label>
                            <div class="col-md-4 col-lg-4">
                                <input type="text" name="longitud" id="edit_longitud" class="form-control" placeholder="longitud" />
                            </div>
                        </div>

                        <div class='form-group'>
                            <label for="DPuntoventasuperior" class="control-label col-md-2 col-lg-2">Punto Superior: </label>
                            <div class="col-md-4 col-lg-4">
                                <input type="text" name="DPuntoventasuperior" id="edit_DPuntoventasuperior" class="form-control" placeholder="Punto Superior" />
                            </div>
                        </div>

                        <div class='form-group'>
                            <label for='telefono' class='control-label col-md-2 col-lg-2'>Telefono:</label>
                            <div class='col-md-4 col-lg-4'>
                                <input type='tel' name='telefono' id='edit_telefono' value='' placeholder='Telefono' class='form-control' required>
                            </div>

                            <label for='nivel' class='control-label col-md-2 col-lg-2'>Nivel:</label>
                            <div class='col-md-4 col-lg-4'>
                                <input type='tel' name='nivel' id='edit_nivel' value='' placeholder='Nivel' class='form-control' required />
                            </div>
                        </div>

                        <div class='form-group'>
                            <label for='saldo' class='control-label col-md-2 col-lg-2'>Saldo:</label>
                            <div class='col-md-4 col-lg-4'>
                                <input type='number' name='saldo' id='edit_saldo' value='' placeholder='Saldo' class='form-control' step="0.01" required>
                            </div>

                            <label for='saldoFechahora' class='control-label col-md-2 col-lg-2'>Fecha Hora:</label>
                            <div class='col-md-4 col-lg-4'>
                                <input type='text' name='saldoFechahora' id='edit_saldoFechahora' value='' placeholder='Fecha Hora' class='form-control' required>
                            </div>
                        </div>

                        <div class='form-group'>
                            <label for='puntoAbastecimiento' class='control-label col-md-2 col-lg-2'>Punto Abast:</label>
                            <div class='col-md-4 col-lg-4'>
                                <input type='text' name='puntoAbastecimiento' id='edit_puntoAbastecimiento' value='' placeholder='Punto Abastecimiento' class='form-control'>
                            </div>

                            <label for='contacto' class='control-label col-md-2 col-lg-2'>Contacto:</label>
                            <div class='col-md-4 col-lg-4'>
                                <input type='text' name='contacto' id='edit_contacto' value='' placeholder='Contacto' class='form-control'>
                            </div>
                        </div>

                        <div class='form-group'>
                            <label for='direccion' class='control-label col-md-2 col-lg-2'>Direcci&oacute;n:</label>
                            <div class='col-md-10 col-lg-10'>
                                <input type='text' name='direccion' id='edit_direccion' value='' placeholder='Direcci&oacute;n' class='form-control'>
                            </div>
                        </div>

                        <div class='form-group'>
                            <label for='observaciones' class='control-label col-md-2 col-lg-2'>Observaciones:</label>
                            <div class='col-md-10 col-lg-10'>
                                <input type='text' name='observaciones' id='edit_observaciones' value='' placeholder='Observaciones' class='form-control'>
                            </div>
                        </div>

                        <div class='form-group'>
                            <label for='descripcion' class='control-label col-md-2 col-lg-2'>Descripci&oacute;n:</label>
                            <div class='col-md-10 col-lg-10'>
                                <input type='text' name='descripcion' id='edit_descripcion' value='' placeholder='Descripci&oacute;n' class='form-control'>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <a class="btn btn-default" data-dismiss="modal">Cerrar</a>
                    <button class="btn btn-primary" type="submit">Guardar cambios</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script src="script/view/puntoVenta.js"></script>