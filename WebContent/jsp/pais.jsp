<div class="panel panel-default">
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
            <table class="table table-condensed table-bordered table-striped">

            </table>
        </div>
    </div>
</div>

<div class="modal fade" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" aria-hidden="true" data-keyboard="false" id="newPais">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button class="close" aria-hidden="true" type="button" data-dismiss="modal">�</button>
                <h4 class="modal-title">Nuevo Pais</h4>
            </div>
            <div class="modal-body">
                <form method="post" accept-charset="ut-8" class="form-horizontal">
                    <div class="form-group">
                        <label for="descripcion" class="control-label col-md-4 col-lg-4">Descripcion: </label>
                        <div class="col-md-8 col-lg-8">
                            <input type="text" name="descripcion" id="descripcion" autocomplete="off" value="" placeholder="Descripcion" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="abrev" class="control-label col-md-4 col-lg-4">Abreviatura: </label>
                        <div class="col-md-8 col-lg-8">
                            <input type="text" name="abrev" id="abrev" autocomplete="off" value="" placeholder="Abreviatura" class="form-control">
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
<div class="modal fade" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" aria-hidden="true" data-keyboard="false" id="editPais">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button class="close" aria-hidden="true" type="button" data-dismiss="modal">�</button>
                <h4 class="modal-title">Editar Pais</h4>
            </div>
            <div class="modal-body">
                <form method="post" accept-charset="ut-8" class="form-horizontal">
                    <div class="form-group">
                        <label for="edit_descripcion" class="control-label col-md-4 col-lg-4">Descripcion: </label>
                        <div class="col-md-8 col-lg-8">
                        <input type="text" name="descripcion" id="edit_descripcion" autocomplete="off" value="" placeholder="Descripcion" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="edit_abrev" class="control-label col-md-4 col-lg-4">Abreviatura: </label>
                        <div class="col-md-8 col-lg-8">
                        <input type="text" name="abrev" id="edit_abrev" autocomplete="off" value="" placeholder="Abreviatura" class="form-control">
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
<script src="../script/view/pais.js"></script>