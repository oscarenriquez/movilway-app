<div class="panel panel-default">
    <div class="panel-heading">
        <div class="panel-title">Administraci&oacute;n tipo Punto de Venta</div>
    </div>
    <div class="panel-body">
        <div class="well well-sm text-right">
            <button class="btn btn-success" data-toggle="modal" data-target="#newTipoPuntoVenta">
				<i class="glyphicon glyphicon-plus"></i> Nuevo
			</button>
        </div>
        <div class="table-responsive demo">
            <table class="table table-condensed table-bordered table-striped display" style="width: 100% !important;">
                <thead>
                    <tr>
                        <th></th>
                        <th class="text-center">Descripcion</th>
                        <th class="text-center">Estatus</th>
                    </tr>
                </thead>
                <tbody id="table-tipopuntoventa"></tbody>
            </table>
        </div>
    </div>
</div>

<div class="modal fade" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" aria-hidden="true" data-keyboard="false" id="newTipoPuntoVenta">
    <div class="modal-dialog">
        <div class="modal-content">
            <form method="post" id="form-new-tipopuntoventa">
                <div class="modal-header">
                    <button class="close" aria-hidden="true" type="button" data-dismiss="modal">X</button>
                    <h4 class="modal-title">Nuevo Tipo de Usuario</h4>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <input type="hidden" name="key" id="key" value="56" />
                        <div class="form-group">
                            <label for="descripcion" class="control-label col-md-4 col-lg-4">Descripcion</label>
                            <div class="col-md-8 col-lg-8">
                                <input type="text" name="descripcion" id="descripcion" autocomplete="off" value="" placeholder="Descripcion" class="form-control to-upper" required>
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
<div class="modal fade" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" aria-hidden="true" data-keyboard="false" id="editTipoPuntoVenta">
    <div class="modal-dialog">
        <div class="modal-content">
            <form method="post" id="form-edit-tipopuntoventa">
                <div class="modal-header">
                    <button class="close" aria-hidden="true" type="button" data-dismiss="modal">X</button>
                    <h4 class="modal-title">Editar Tipo de Usuario</h4>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <input type="hidden" name="tipopuntoventaId" id="edit_tipopuntoventaId" value="0" />
                        <input type="hidden" name="key" id="edit_key" value="57" />
                        <div class="form-group">
                            <label for="descripcion" class="control-label col-md-4 col-lg-4">Descripcion</label>
                            <div class="col-md-8 col-lg-8">
                                <input type="text" name="descripcion" id="edit_descripcion" autocomplete="off" value="" placeholder="Descripcion" class="form-control to-upper" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-4 col-lg-4"> Estatus </label>
                            <div class="col-md-8 col-lg-8">
                                <div class="switch ios"><input type="checkbox" id="edit_estatus" name="estatus" value="true"><label><i></i></label></div>
                            </div>
                            <div class="clear"></div>
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
<script src="script/view/tipoPuntoVenta.js"></script>