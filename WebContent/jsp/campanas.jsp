<div class="panel panel-default">
    <div class="panel-heading">
        <div class="panel-title">Administraci&oacute;n Agente</div>
    </div>
    <div class="panel-body">
        <div class="table-responsive">
            <table class="table-condensed table-bordered display">
                <thead>
                    <tr>
                        <th></th>
                        <th class="text-center">Tipo Campa&ntilde;a</th>
                        <th class="text-center">Estatus</th>
                        <th class="text-center">Observaciones</th>
                        <th class="text-center">Fecha Inicio</th>
                        <th class="text-center">Fecha Fin</th>
                    </tr>
                </thead>
                <tbody id="table-campana"></tbody>
            </table>
        </div>
    </div>
</div>

<div class="modal fade" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" aria-hidden="true" data-keyboard="false" id="detalleCampana">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <form method="POST" id="form-asigna-agentes">
                <div class="modal-header">
                    <h4 class="modal-title">Detalles de Campa&ntilde;a</h4>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <input type="hidden" name="key" value="96" />
                        <input type="hidden" name="campanaId" id="campanaId" value="0" />
                        <div class="form-group">
                            <div class="col-md-12 col-lg-12 text-center fx">
                                <span id="cant" class="label label-azul"></span> Cuentas
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="agentes" class="control-label col-md-2 col-lg-2">Agentes</label>
                            <div class="col-lg-8 col-md-8">
                                <select data-placeholder="Seleccione una opcion" name="agentes" id="agentes" class="form-control" multiple required></select>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <table class="table-condensed display" style="width: auto !important; font-size: 90%; margin-top: 10px;">
                                <thead>
                                    <tr>
                                        <th class="text-center">ID</th>
                                        <th class="text-center">Descripci&oacute;n</th>
                                        <th class="text-center">Direcci&oacute;n</th>
                                        <th class="text-center">Saldo</th>
                                        <th class="text-center">Fecha ultimo saldo</th>
                                        <th class="text-center">Punto Abast.</th>
                                        <th class="text-center">Agente</th>
                                    </tr>
                                </thead>
                                <tbody id="table-campana-detalle"></tbody>
                            </table>
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

<div class="modal fade" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" aria-hidden="true" data-keyboard="false" id="reasignarCampana">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <form method="POST" id="form-reasigna-agentes">
                <div class="modal-header">
                    <h4 class="modal-title">Re-asignar Agente de Campa&ntilde;a</h4>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <input type="hidden" name="key" value="98" />
                        <input type="hidden" name="campanaId" id="reasig_campanaId" value="0" />
                        <div class="form-group">
                            <label for="agente" class="control-label col-md-2 col-lg-2">Agente</label>
                            <div class="col-lg-8 col-md-8">
                                <select data-placeholder="Seleccione una opcion" name="agente" id="agente" class="form-control" required></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="agentes" class="control-label col-md-2 col-lg-2">Nuevos Agentes</label>
                            <div class="col-lg-8 col-md-8">
                                <select data-placeholder="Seleccione una opcion" name="agentes" id="agentes" class="form-control" multiple required></select>
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

<div class="modal fade" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" aria-hidden="true" data-keyboard="false" id="detalleCampana2">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Detalles de Campa&ntilde;a</h4>
            </div>
            <div class="modal-body">
                <div class="form-horizontal">
                    <div class="table-responsive">
                        <table class="table-condensed display" style="width: auto !important; font-size: 90%; margin-top: 10px;">
                            <thead>
                                <tr>
                                    <th class="text-center">ID</th>
                                    <th class="text-center">Descripci&oacute;n</th>
                                    <th class="text-center">Direcci&oacute;n</th>
                                    <th class="text-center">Saldo</th>
                                    <th class="text-center">Fecha ultimo saldo</th>
                                    <th class="text-center">Punto Abast.</th>
                                    <th class="text-center">Agente</th>
                                </tr>
                            </thead>
                            <tbody id="table-campana-detalle2"></tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a class="btn btn-default" data-dismiss="modal">Cerrar</a>
            </div>
        </div>
    </div>
</div>

<script src="script/view/campanas.js"></script>