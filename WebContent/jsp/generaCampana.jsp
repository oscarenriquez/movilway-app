<div class="panel panel-default">
    <div class="panel-heading">
        <div class="panel-title">Nueva Campa&ntilde;a</div>
    </div>
    <div class="panel-body">
        <div class="wizard">
            <!-- Nav tabs -->
            <ul class="nav nav-tabs nav-pills nav-justified" role="tablist">
                <li role="presentation" class="active"><a href="#campana" aria-controls="campana" role="tab" data-toggle="tab">Campa&ntilde;a</a></li>
                <li role="presentation"><a href="#contacto" aria-controls="contacto" role="tab" data-toggle="tab">Punto Venta</a></li>
                <li role="presentation"><a href="#ubicacion" aria-controls="ubicacion" role="tab" data-toggle="tab">Ubicaci&oacute;n</a></li>
                <li role="presentation"><a href="#historial" aria-controls="historial" role="tab" data-toggle="tab">Historial</a></li>
            </ul>

            <!-- Tab panes -->
            <form action="Session" name="form-campana" id="form-campana" novalidate>
                <input type="hidden" name="key" id="key" value="95" />
                <div class="tab-content">
                    <div role="tabpanel" class="tab-pane active" id="campana">
                        <div class="form-horizontal">
                            <fieldset>
                                <legend> Datos de Campa&ntilde;a </legend>
                                <div class="form-group input-group-lg">
                                    <label for="tipoCampana" class="control-label col-md-3 col-lg-3">Tipo Campa&ntilde;a</label>
                                    <div class="col-md-8 col-lg-8">
                                        <select name="tipoCampana" id="tipoCampana" class="form-control input-lg" required></select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-3 col-lg-3">Fecha Inicial</label>
                                    <div class="col-md-3 col-lg-3">
                                        <div class='input-group date' id='datetimepicker_fechaInicioCampa'>
                                            <input type="text" name="fechaHoraInicio" id="fechaHoraInicio" class="form-control" placeholder="Fecha de Inicio" required/>
                                            <span class="input-group-addon">
                                                <span class="glyphicon glyphicon-calendar"></span>
                                            </span>
                                        </div>
                                    </div>
                                    <label class="text-center col-md-2 col-lg-2">Fecha Final</label>
                                    <div class="col-md-3 col-lg-3">
                                        <div class='input-group date' id='datetimepicker_fechaFinalCampa'>
                                            <input type="text" name="fechaHoraFin" id="fechaHoraFin" class="form-control" placeholder="Fecha de Fin" required/>
                                            <span class="input-group-addon">
                                                <span class="glyphicon glyphicon-calendar"></span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="observaciones" class="control-label col-md-3 col-lg-3">Observaciones</label>
                                    <div class="col-md-8 col-lg-8">
                                        <textarea name="observaciones" id="observaciones" class="form-control" cols="30" rows="10"></textarea>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                    <div role="tabpanel" class="tab-pane" id="contacto">
                        <div class="form-horizontal">
                            <fieldset>
                                <legend> Informaci&oacute;n B&aacute;sica Punto Venta </legend>
                                <div class="form-group">
                                    <div class="col-md-9 col-lg-9 col-md-offset-3 col-lg-offset-3">
                                        <div class="alert alert-info">
                                            <b>FILTROS:</b> Los campos vacios se tomar&aacute;n como TODOS !
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="tipoPuntoVenta" class="control-label col-md-3 col-lg-3">Tipo P. Venta</label>
                                    <div class="col-md-9 col-lg-9">
                                        <select data-placeholder="Seleccione una opcion" name="tipoPuntoVenta" id="tipoPuntoVenta" class="form-control" multiple>
                                            
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="puntoVentaSuperior" class="control-label col-md-3 col-lg-3">Punto Venta Superior (ID)</label>
                                    <div class="col-md-4 col-lg4">
                                        <input type="text" class="form-control" placeholder="Punto Superior" id="puntoVentaSuperior" name="puntoVentaSuperior" />
                                    </div>
                                    <label for="nivel" class="text-center col-md-1 col-lg-1">Nivel</label>
                                    <div class="col-md-4 col-lg-4">
                                        <input type="text" class="form-control" placeholder="Nivel" id="nivel" name="nivel" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-3 col-lg-3">Saldo Minimo</label>
                                    <div class="col-lg-4 col-md-4">
                                        <input type="number" class="form-control" id="saldoMin" name="saldoMin" placeholder="Saldo Minimo" step="0.01">
                                    </div>
                                    <label class="text-center col-md-1 col-lg-1">Maximo</label>
                                    <div class="col-lg-4 col-md-4">
                                        <input type="number" class="form-control" id="saldoMax" name="saldoMax" placeholder="Saldo Maximo" step="0.01">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-3 col-lg-3">Fecha Saldo Del</label>
                                    <div class="col-md-4 col-lg-4">
                                        <div class='input-group date' id='datetimepicker_fechaInicio'>
                                            <input type="text" name="saldoFehaHoraInicio" id="saldoFehaHoraInicio" class="form-control" placeholder="Fecha de Saldo Inicio" />
                                            <span class="input-group-addon">
                                                <span class="glyphicon glyphicon-calendar"></span>
                                            </span>
                                        </div>
                                    </div>
                                    <label class="text-center col-md-1 col-lg-1">Al</label>
                                    <div class="col-md-4 col-lg-4">
                                        <div class='input-group date' id='datetimepicker_fechaFinal'>
                                            <input type="text" name="saldoFehaHoraFinal" id="saldoFehaHoraFinal" class="form-control" placeholder="Fecha de Saldo Final" />
                                            <span class="input-group-addon">
                                                <span class="glyphicon glyphicon-calendar"></span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-3 col-lg-3">Punto Abstec. Minimo</label>
                                    <div class="col-lg-4 col-md-4">
                                        <input type="number" class="form-control" id="puntoAbastecimientoMin" name="puntoAbastecimientoMin" placeholder="Abastecimiento Minimo" step="0.01">
                                    </div>
                                    <label class="text-center col-md-1 col-lg-1">Maximo</label>
                                    <div class="col-lg-4 col-md-4">
                                        <input type="number" class="form-control" id="puntoAbastecimientoMax" name="puntoAbastecimientoMax" placeholder="Abastecimiento Maximo" step="0.01">
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                    <div role="tabpanel" class="tab-pane" id="ubicacion">
                        <div class="form-horizontal">
                            <fieldset>
                                <legend> Ubicaci&oacute;n Geogr&aacute;fica </legend>
                                <div class="form-group">
                                    <div class="col-md-9 col-lg-9 col-md-offset-3 col-lg-offset-3">
                                        <div class="alert alert-info">
                                            <b>FILTROS:</b> Los campos vacios se tomar&aacute;n como TODOS !
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="paises" class="control-label col-md-3 col-lg-3">Pais</label>
                                    <div class="col-lg-8 col-md-8">
                                        <select data-placeholder="Seleccione una opcion" name="paises" id="paises" class="form-control" multiple></select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="estados" class="control-label col-md-3 col-lg-3">Estado</label>
                                    <div class="col-lg-8 col-md-8">
                                        <select data-placeholder="Seleccione una opcion" name="estados" id="estados" class="form-control" multiple disabled></select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="provincia" class="control-label col-md-3 col-lg-3">Provincia</label>
                                    <div class="col-lg-8 col-md-8">
                                        <select data-placeholder="Seleccione una opcion" name="provincias" id="provincias" class="form-control" multiple disabled></select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="regionProvincia" class="control-label col-md-3 col-lg-3">Region</label>
                                    <div class="col-lg-8 col-md-8">
                                        <select data-placeholder="Seleccione una opcion" name="regionProvincia" id="regionProvincia" class="form-control" multiple disabled></select>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                    <div role="tabpanel" class="tab-pane" id="historial">
                        <div class="form-horizontal">
                            <fieldset>
                                <legend> Historial de Respuestas </legend>
                                <div class="form-group">
                                    <div class="col-md-9 col-lg-9 col-md-offset-3 col-lg-offset-3">
                                        <div class="alert alert-info">
                                            <b>FILTROS:</b> Los campos vacios se tomar&aacute;n como TODOS !
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="respuestas" class="control-label col-md-3 col-lg-3">Ultimas Respuestas</label>
                                    <div class="col-lg-8 col-md-8">
                                        <select data-placeholder="Seleccione una opcion" name="respuestas" id="respuestas" class="form-control" multiple></select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="text-center">
                                        <button type="submit" class="btn btn-primary">Guardar</button>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </form>
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
                                    </tr>
                                </thead>
                                <tbody id="table-campana-detalle"></tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <a class="btn btn-danger" id="cancelarCampana" data-dismiss="modal">Cerrar</a>
                    <button class="btn btn-primary" type="submit">Guardar cambios</button>
                </div>
            </form>
        </div>
    </div>
</div>
<script src="script/view/generaCampana.js"></script>