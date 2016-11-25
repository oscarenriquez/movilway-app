<!-- PANEL DE PAIS -->
<div class="panel panel-default" id="panel-pais">
    <div class="panel-heading">
        <div class="panel-title">Administraci&oacute;n Pais</div>
    </div>
    <div class="panel-body">
        <div class="well well-sm text-right">
            <button class="btn btn-success" data-toggle="modal" data-target="#newPais">
				<i class="glyphicon glyphicon-plus"></i> Nuevo
			</button>
        </div>
        <div class="table-responsive">
            <table class="table table-condensed table-bordered table-striped display" style="width: 100% !important;">
                <thead>
                    <tr>
                        <th></th>
                        <th class="text-center">Descripcion</th>
                        <th class="text-center">Abreviatura</th>
                    </tr>
                </thead>
                <tbody id="table-pais"></tbody>
            </table>
        </div>
    </div>
</div>

<!-- PANEL DE ESTADO Y PROVINCIA -->
<div class="panel panel-default" id="panel-estado" style="display:none;">
    <div class="panel-heading">
        <div class="panel-title">Administraci&oacute;n Pais</div>
    </div>
    <div class="panel-body">
        <div class="alert alert-info text-center">
            <h3 id="title-pais"></h3>
        </div>
        <div class="well well-sm text-right">
            <button class="btn btn-success" data-toggle="modal" data-target="#newEstado">
				<i class="glyphicon glyphicon-plus"></i> Nuevo
			</button>
        </div>
        <div class="table-responsive">
            <table class="table table-condensed table-bordered table-striped display" style="width: 100% !important;">
                <thead>
                    <tr>
                        <th></th>
                        <th class="text-center">Descripcion</th>
                        <th class="text-center">Abreviatura</th>
                    </tr>
                </thead>
                <tbody id="table-estado"></tbody>
            </table>
        </div>
        <div class="row">
            <br />
            <div class="col-lg-12 text-center">
                <button class="btn btn-danger" type="button" onclick="$('#panel-pais').show();$('#panel-estado').hide();">Cancelar</button>
            </div>
        </div>
        <div id="panel-provincia" style="display:none;">
            <br />
            <br />
            <div class="alert alert-info text-center">
                <h3 id="title-estado"></h3>
            </div>
            <div class="well well-sm text-right">
                <button class="btn btn-success" data-toggle="modal" data-target="#newProvincia">
				<i class="glyphicon glyphicon-plus"></i> Nuevo
			</button>
            </div>
            <div class="table-responsive">
                <table class="table table-condensed table-bordered table-striped display" style="width: 100% !important;">
                    <thead>
                        <tr>
                            <th></th>
                            <th class="text-center">Descripcion</th>
                            <th class="text-center">Abreviatura</th>
                        </tr>
                    </thead>
                    <tbody id="table-provincia"></tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<!-- MODALS DE PAIS -->
<div class="modal fade" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" aria-hidden="true" data-keyboard="false" id="newPais">
    <div class="modal-dialog">
        <div class="modal-content">
            <form method="POST" id="form-new-pais">
                <div class="modal-header">
                    <button class="close" aria-hidden="true" type="button" data-dismiss="modal">X</button>
                    <h4 class="modal-title">Nuevo Pais</h4>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <input type="hidden" name="key" id="key" value="20" />
                        <div class="form-group">
                            <label for="descripcion" class="control-label col-md-4 col-lg-4">Descripcion: </label>
                            <div class="col-md-8 col-lg-8">
                                <input type="text" name="descripcion" id="descripcion" autocomplete="off" value="" placeholder="Descripcion" class="form-control" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="abrev" class="control-label col-md-4 col-lg-4">Abreviatura: </label>
                            <div class="col-md-8 col-lg-8">
                                <input type="text" name="abrev" id="abrev" autocomplete="off" value="" placeholder="Abreviatura" class="form-control" required>
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
<div class="modal fade" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" aria-hidden="true" data-keyboard="false" id="editPais">
    <div class="modal-dialog">
        <div class="modal-content">
            <form method="POST" id="form-edit-pais">
                <div class="modal-header">
                    <button class="close" aria-hidden="true" type="button" data-dismiss="modal">X</button>
                    <h4 class="modal-title">Editar Pais</h4>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <input type="hidden" name="paisId" id="edit_paisId" value="0" />
                        <input type="hidden" name="key" id="edit_key" value="21" />
                        <div class="form-group">
                            <label for="edit_descripcion" class="control-label col-md-4 col-lg-4">Descripcion: </label>
                            <div class="col-md-8 col-lg-8">
                                <input type="text" name="descripcion" id="edit_descripcion" autocomplete="off" value="" placeholder="Descripcion" class="form-control" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="edit_abrev" class="control-label col-md-4 col-lg-4">Abreviatura: </label>
                            <div class="col-md-8 col-lg-8">
                                <input type="text" name="abrev" id="edit_abrev" autocomplete="off" value="" placeholder="Abreviatura" class="form-control" required>
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

<!-- MODALS DE ESTADO -->
<div class="modal fade" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" aria-hidden="true" data-keyboard="false" id="newEstado">
    <div class="modal-dialog">
        <div class="modal-content">
            <form method="POST" id="form-new-estado">
                <div class="modal-header">
                    <button class="close" aria-hidden="true" type="button" data-dismiss="modal">X</button>
                    <h4 class="modal-title">Nuevo Estado</h4>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <input type="hidden" name="pais" id="pais" value="0" />
                        <input type="hidden" name="key" id="key" value="9" />
                        <div class="form-group">
                            <label for="descripcion" class="control-label col-md-4 col-lg-4">Descripcion: </label>
                            <div class="col-md-8 col-lg-8">
                                <input type="text" name="descripcion" id="descripcion" autocomplete="off" value="" placeholder="Descripcion" class="form-control" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="abrev" class="control-label col-md-4 col-lg-4">Abreviatura: </label>
                            <div class="col-md-8 col-lg-8">
                                <input type="text" name="abrev" id="abrev" autocomplete="off" value="" placeholder="Abreviatura" class="form-control" required>
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
<div class="modal fade" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" aria-hidden="true" data-keyboard="false" id="editEstado">
    <div class="modal-dialog">
        <div class="modal-content">
            <form method="POST" id="form-edit-estado">
                <div class="modal-header">
                    <button class="close" aria-hidden="true" type="button" data-dismiss="modal">X</button>
                    <h4 class="modal-title">Editar Estado</h4>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <input type="hidden" name="estadoId" id="edit_estadoId" value="0" />
                        <input type="hidden" name="key" id="edit_key" value="10" />
                        <div class="form-group">
                            <label for="edit_descripcion" class="control-label col-md-4 col-lg-4">Descripcion: </label>
                            <div class="col-md-8 col-lg-8">
                                <input type="text" name="descripcion" id="edit_descripcion" autocomplete="off" value="" placeholder="Descripcion" class="form-control" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="edit_abrev" class="control-label col-md-4 col-lg-4">Abreviatura: </label>
                            <div class="col-md-8 col-lg-8">
                                <input type="text" name="abrev" id="edit_abrev" autocomplete="off" value="" placeholder="Abreviatura" class="form-control" required>
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

<!-- MODALS DE PROVINCIA -->
<div class="modal fade" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" aria-hidden="true" data-keyboard="false" id="newProvincia">
    <div class="modal-dialog">
        <div class="modal-content">
            <form method="POST" id="form-new-provincia">
                <div class="modal-header">
                    <button class="close" aria-hidden="true" type="button" data-dismiss="modal">X</button>
                    <h4 class="modal-title">Nueva Provincia</h4>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <input type="hidden" name="estado" id="estado" value="0" />
                        <input type="hidden" name="key" id="key" value="14" />
                        <div class="form-group">
                            <label for="descripcion" class="control-label col-md-4 col-lg-4">Descripcion: </label>
                            <div class="col-md-8 col-lg-8">
                                <input type="text" name="descripcion" id="descripcion" autocomplete="off" value="" placeholder="Descripcion" class="form-control" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="abrev" class="control-label col-md-4 col-lg-4">Abreviatura: </label>
                            <div class="col-md-8 col-lg-8">
                                <input type="text" name="abrev" id="abrev" autocomplete="off" value="" placeholder="Abreviatura" class="form-control" required>
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
<div class="modal fade" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" aria-hidden="true" data-keyboard="false" id="editProvincia">
    <div class="modal-dialog">
        <div class="modal-content">
            <form method="POST" id="form-edit-provincia">
                <div class="modal-header">
                    <button class="close" aria-hidden="true" type="button" data-dismiss="modal">X</button>
                    <h4 class="modal-title">Editar Provincia</h4>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <input type="hidden" name="provinciaId" id="edit_provinciaId" value="0" />
                        <input type="hidden" name="key" id="edit_key" value="15" />
                        <div class="form-group">
                            <label for="edit_descripcion" class="control-label col-md-4 col-lg-4">Descripcion: </label>
                            <div class="col-md-8 col-lg-8">
                                <input type="text" name="descripcion" id="edit_descripcion" autocomplete="off" value="" placeholder="Descripcion" class="form-control" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="edit_abrev" class="control-label col-md-4 col-lg-4">Abreviatura: </label>
                            <div class="col-md-8 col-lg-8">
                                <input type="text" name="abrev" id="edit_abrev" autocomplete="off" value="" placeholder="Abreviatura" class="form-control" required>
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

<script src="script/view/pais.js"></script>