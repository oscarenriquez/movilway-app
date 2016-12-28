<div class="panel panel-default">
    <div class="panel-heading">
        <h2 class="panel-title">Carga Archivo de Texto</h2>
    </div>
    <div class="panel-body">
        <div class="row">
            <div class="col-md-12">
                <div class="thumbnail">
                    <form class="form-horizontal" id="file-form" action="./Session" method="post" novalidate>
                        <input type="hidden" name="key" id="key" value="92" />
                        <fieldset>
                            <legend class="text-center">
                                <img src="img/txt-file-icon-1203.png" width="50" class="img-responsive img-thumbnail" alt="Archivo de traspasos"> Archivo de Traslados
                            </legend>
                            <div class="form-group text-center">
                                <div class="col-md-8 col-md-offset-3 col-sm-offset-0 col-xs-offset-0">
                                    <input type="file" name="file" class="form-control" accept=".txt" required/>
                                </div>
                            </div>
                            <div class="form-group text-center">
                                <label for="texto" class="col-md-3 control-label">Texto Referencia:</label>
                                <div class="col-md-8">
                                    <textarea name="texto" id="texto" class="form-control" rows="2" placeholder="Texto Referencia" required></textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-12 text-center">
                                    <button name="guardar" class="btn btn-success" id="guardar" type="submit">Cargar</button>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" aria-hidden="true" data-keyboard="false" id="viewDetails">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button class="close" aria-hidden="true" type="button" data-dismiss="modal">X</button>
                <h4 class="modal-title">Detalles de Archivo</h4>
            </div>
            <div class="modal-body">
                <div class="form-horizontal">
                    <div class="form-group">
                        <label class="control-label col-md-2 col-lg-2">Nombre Archivo: </label>
                        <div class="col-md-4 col-lg-4">
                            <p class="form-control-static" id="nombreArchivo"></p>
                        </div>

                        <label class="control-label col-md-3 col-lg-3">No. Registros: </label>
                        <div class="col-md-3 col-lg-3">
                            <p class="form-control-static" id="registrosProcesados"></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a class="btn btn-default" data-dismiss="modal">Cerrar</a>
            </div>
        </div>
    </div>
</div>
<script src="script/view/cargaTexto.js"></script>