<div class="panel panel-default">
    <div class="panel-heading">
        <div class="panel-title">Administraci&oacute;n Politica</div>
    </div>
    <div class="panel-body">
        <div class="well well-sm text-right">
            <button class="btn btn-success" data-toggle="modal" data-target="#newPolitica">
				<i class="glyphicon glyphicon-plus"></i> Nuevo
			</button>
        </div>
        <div class="table-responsive">
            <table class="table table-condensed table-bordered table-striped display" style="width: 100% !important;">
                <thead>
                    <tr>
                        <th></th>
                        <th class="text-center">Tipo Campa&ntilde;a</th>
                        <th class="text-center">Num. Linea</th>
                        <th class="text-center">Texto</th>
                        <th class="text-center">Estatus</th>
                    </tr>
                </thead>
                <tbody id="table-politica"></tbody>
            </table>
        </div>
    </div>
</div>

<div class="modal fade" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" aria-hidden="true" data-keyboard="false" id="newPolitica">
    <div class="modal-dialog">
        <div class="modal-content">
            <form method="post" id="form-new-politica">
                <div class="modal-header">
                    <button class="close" aria-hidden="true" type="button" data-dismiss="modal">X</button>
                    <h4 class="modal-title">Nueva Politica</h4>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <input type="hidden" name="key" id="key" value="26" />
                        <div class="form-group">
                            <label for="tipoCampana" class="control-label col-md-4 col-lg-4">Tipo Campa&ntilde;a: </label>
                            <div class="col-md-8 col-lg-8">
                                <select name="tipoCampana" id="tipoCampana" class="form-control" required>
						    </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="numLinea" class="control-label col-md-4 col-lg-4">Numero Linea: </label>
                            <div class="col-md-8 col-lg-8">
                                <input type="tel" name="numLinea" id="numLinea" autocomplete="off" value="" placeholder="Descripcion" class="form-control to-upper" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="texto" class="control-label col-md-4 col-lg-4">Texto</label>
                            <div class="col-md-8 col-lg-8">
                                <textarea rows="3" class="form-control" id="texto" name="texto" required></textarea>
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
<div class="modal fade" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" aria-hidden="true" data-keyboard="false" id="editPolitica">
    <div class="modal-dialog">
        <div class="modal-content">
            <form method="post" id="form-edit-politica">
                <div class="modal-header">
                    <button class="close" aria-hidden="true" type="button" data-dismiss="modal">X</button>
                    <h4 class="modal-title">Editar Politica</h4>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <input type="hidden" name="politicaId" id="edit_politicaId" value="0" />
                        <input type="hidden" name="key" id="edit_key" value="27" />
                        <div class="form-group">
                            <label for="edit_tipoCampana" class="control-label col-md-4 col-lg-4">Tipo Campa&ntilde;a: </label>
                            <div class="col-md-8 col-lg-8">
                                <select name="tipoCampana" id="edit_tipoCampana" class="form-control" required>
						</select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="edit_numLinea" class="control-label col-md-4 col-lg-4">Numero Linea: </label>
                            <div class="col-md-8 col-lg-8">
                                <input type="tel" name="numLinea" id="edit_numLinea" autocomplete="off" value="" placeholder="Descripcion" class="form-control to-upper" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="edit_texto" class="control-label col-md-4 col-lg-4">Texto</label>
                            <div class="col-md-8 col-lg-8">
                                <textarea rows="3" class="form-control" id="edit_texto" name="texto" required></textarea>
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
<script src="script/view/politica.js"></script>