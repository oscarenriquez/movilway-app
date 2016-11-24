<div class="panel panel-default">
    <div class="panel-heading">
        <div class="panel-title">Administraci&oacute;n tipo de Agente</div>
    </div>
    <div class="panel-body">
        <div class="well well-sm text-right">
            <button class="btn btn-success" data-toggle="modal" data-target="#newTipoAgente">
				<i class="glyphicon glyphicon-plus"></i> Nuevo
			</button>
        </div>
        <div class="table-responsive">
            <table class="table table-condensed table-bordered table-striped display">
                <thead>
                    <tr>
                        <th></th>
                        <th class="text-center">Descripcion</th>
                        <th class="text-center">Estatus</th>
                        <th class="text-center">Es Admin</th>
                    </tr>
                </thead>
                <tbody id="table-tipoagente"></tbody>
            </table>
        </div>
    </div>
</div>

<div class="modal fade" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" aria-hidden="true" data-keyboard="false" id="newTipoAgente">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button class="close" aria-hidden="true" type="button" data-dismiss="modal">X</button>
                <h4 class="modal-title">Nuevo Tipo de Agente</h4>
            </div>
            <div class="modal-body">
                <form method="post" accept-charset="ut-8" class="form-horizontal" id="form-new-tipoagente">
                    <input type="hidden" name="key" id="edit_key" value="44" />
                    <div class="form-group">
                        <label for="descripcion" class="control-label col-md-4 col-lg-4">Descripcion</label>
                        <div class="col-md-8 col-lg-8">
                            <input type="text" name="descripcion" id="descripcion" autocomplete="off" value="" placeholder="Descripcion" class="form-control" required />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-md-4 col-lg-4"> Es Admin </label>
                        <div class="col-md-8 col-lg-8">
                            <div class="switch ios"><input type="checkbox" id="esAdmin" name="esAdmin" value="true"><label><i></i></label></div>
                        </div>
                        <div class="clear"></div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <a class="btn btn-default" data-dismiss="modal">Cerrar</a>
                <a class="btn btn-primary" onclick="$('#form-new-tipoagente').submit()">Guardar cambios</a>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" aria-hidden="true" data-keyboard="false" id="editTipoAgente">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button class="close" aria-hidden="true" type="button" data-dismiss="modal">X</button>
                <h4 class="modal-title">Editar Tipo de Agente</h4>
            </div>
            <div class="modal-body">
                <form method="post" accept-charset="ut-8" class="form-horizontal" id="form-edit-tipoagente">
                    <input type="hidden" name="tipoagenteId" id="edit_tipoagenteId" value="0" />
                    <input type="hidden" name="key" id="edit_key" value="45" />
                    <div class="form-group">
                        <label for="descripcion" class="control-label col-md-4 col-lg-4">Descripcion</label>
                        <div class="col-md-8 col-lg-8">
                            <input type="text" name="descripcion" id="edit_descripcion" autocomplete="off" value="" placeholder="Descripcion" class="form-control" required />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-md-4 col-lg-4"> Es Admin </label>
                        <div class="col-md-8 col-lg-8">
                            <div class="switch ios"><input type="checkbox" id="edit_esAdmin" name="esAdmin" value="true"><label><i></i></label></div>
                        </div>
                        <div class="clear"></div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-md-4 col-lg-4"> Estatus </label>
                        <div class="col-md-8 col-lg-8">
                            <div class="switch ios"><input type="checkbox" id="edit_estatus" name="estatus" value="true"><label><i></i></label></div>
                        </div>
                        <div class="clear"></div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <a class="btn btn-default" data-dismiss="modal">Cerrar</a>
                <a class="btn btn-primary" onclick="$('#form-edit-tipoagente').submit()">Guardar cambios</a>
            </div>
        </div>
    </div>
</div>
<script src="script/view/tipoAgente.js"></script>