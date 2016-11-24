<div class="panel panel-default">
    <div class="panel-heading">
        <div class="panel-title">Administraci&oacute;n Agente</div>
    </div>
    <div class="panel-body">
        <div class="well well-sm text-right">
            <button class="btn btn-success" data-toggle="modal" data-target="#newAgente">
				<i class="glyphicon glyphicon-plus"></i> Nuevo
			</button>
        </div>
        <div class="table-responsive">
            <table class="table table-condensed table-bordered table-striped">

            </table>
        </div>
    </div>
</div>

<div class="modal fade" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" aria-hidden="true" data-keyboard="false" id="newAgente">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button class="close" aria-hidden="true" type="button" data-dismiss="modal">X</button>
                <h4 class="modal-title">Nuevo Agente</h4>
            </div>
            <div class="modal-body">
                <form method="post" accept-charset="ut-8" class="form-horizontal">
                    <div class="form-group">
                        <label for="tipoAgente" class="control-label col-md-4 col-lg-4">Tipo Agente: </label>
                        <div class="col-md-8 col-lg-8">
                            <select name="tipoAgente" id="tipoAgente" class="form-control">
						    </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="nombre" class="control-label col-md-4 col-lg-4">Nombre: </label>
                        <div class="col-md-8 col-lg-8">
                            <input type="text" name="nombre" id="nombre" autocomplete="off" value="" placeholder="Nombre" class="form-control">
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
<div class="modal fade" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" aria-hidden="true" data-keyboard="false" id="editAgente">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button class="close" aria-hidden="true" type="button" data-dismiss="modal">X</button>
                <h4 class="modal-title">Editar Agente</h4>
            </div>
            <div class="modal-body">
                <form method="post" accept-charset="ut-8" class="form-horizontal">
                    <div class="form-group">
                        <label for="edit_tipoAgente" class="control-label col-md-4 col-lg-4">Tipo Agente: </label>
                        <div class="col-md-8 col-lg-8">
                            <select name="tipoAgente" id="edit_tipoAgente" class="form-control">
						</select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="edit_nombre">Nombre: </label>
                        <div class="col-md-8 col-lg-8">
                            <input type="text" name="nombre" id="edit_nombre" autocomplete="off" value="" placeholder="Nombre" class="form-control">
                        </div>
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
                <a class="btn btn-primary">Guardar cambios</a>
            </div>
        </div>
    </div>
</div>
<script src="script/view/agente.js"></script>