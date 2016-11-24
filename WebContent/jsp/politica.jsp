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
            <table class="table table-condensed table-bordered table-striped">

            </table>
        </div>
    </div>
</div>

<div class="modal fade" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" aria-hidden="true" data-keyboard="false" id="newPolitica">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button class="close" aria-hidden="true" type="button" data-dismiss="modal">X</button>
                <h4 class="modal-title">Nueva Politica</h4>
            </div>
            <div class="modal-body">
                <form method="post" accept-charset="ut-8" class="form-horizontal">
                    <div class="form-group">
                        <label for="tipoCampana" class="control-label col-md-4 col-lg-4">Tipo Campa&ntilde;a: </label>
                        <div class="col-md-8 col-lg-8">
                            <select name="tipoCampana" id="tipoCampana" class="form-control">
						</select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="numLinea" class="control-label col-md-4 col-lg-4">Numero Linea: </label>
                        <div class="col-md-8 col-lg-8">
                            <input type="text" name="numLinea" id="numLinea" autocomplete="off" value="" placeholder="Descripcion" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="texto" class="control-label col-md-4 col-lg-4">Texto</label>
                        <div class="col-md-8 col-lg-8">
                            <textarea rows="3" class="form-control" id="texto" name="texto"></textarea>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <a class="btn btn-default" data-dismiss="modal">Cerrar</a>
                <a class="btn btn-primary">Guardar cambios</a>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" aria-hidden="true" data-keyboard="false" id="editPolitica">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button class="close" aria-hidden="true" type="button" data-dismiss="modal">X</button>
                <h4 class="modal-title">Editar Politica</h4>
            </div>
            <div class="modal-body">
                <form method="post" accept-charset="ut-8" class="form-horizontal">
                    <div class="form-group">
                        <label for="edit_tipoCampana" class="control-label col-md-4 col-lg-4">Tipo Campa&ntilde;a: </label>
                        <div class="col-md-8 col-lg-8">
                            <select name="tipoCampana" id="edit_tipoCampana" class="form-control">
						</select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="edit_numLinea" class="control-label col-md-4 col-lg-4">Numero Linea: </label>
                        <div class="col-md-8 col-lg-8">
                        <input type="text" name="numLinea" id="edit_numLinea" autocomplete="off" value="" placeholder="Descripcion" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="edit_texto" class="control-label col-md-4 col-lg-4">Texto</label>
                        <div class="col-md-8 col-lg-8">
                        <textarea rows="3" class="form-control" id="edit_texto" name="texto"></textarea>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <a class="btn btn-default" data-dismiss="modal">Cerrar</a>
                <a class="btn btn-primary">Guardar cambios</a>
            </div>
        </div>
    </div>
</div>
<script src="../script/view/politica.js"></script>