<link href="css/app.css" rel="stylesheet" />
<div class="row">
    <section>
        <aside id="sidebar" class="sidebar">
            <div class="s-profile">
                <div class="pie-chart-tiny" data-percent="13">
                    <span class="pie-title-up hide"></span><span class="percent"></span>
                </div>
            </div>
            <ul class="list-group main-menu">

            </ul>
        </aside>
        <section id="content">
            <div class="container">
                <div class="well well-sm text-center alert-info">
                    <button type="button" id="toggle-sidebar" class="btn btn-primary hidden-lg pull-right"> <i class="glyphicon glyphicon-chevron-right"></i></button>
                    <h2>Inbox</h2>
                </div>

                <div class="card">
                    <div class="list-group lg-odd-black">
                        <div class="action-header clearfix">
                            <div class="ah-label"></div>
                            <ul class="actions">
                                <li>
                                    <a href="javascript:InboxCtrl.loadCurrentCampana()">
                                        <i class="glyphicon glyphicon-refresh"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div id="detalles">

                        </div>
                    </div>
                    <div class="list-group-item media">
                        <div class="pull-right">
                            <button type="button" class="btn btn-default" onclick="InboxCtrl.loadCurrentCampana()">Cargar m&aacute;s registros  
                                <i class="glyphicon glyphicon-refresh"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </section>
</div>

<div class="modal fade" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" aria-hidden="true" data-keyboard="false" id="newLlamada">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <form method="POST" id="form-new-llamada">
                <div class="modal-header alert-info">
                    <h4 class="modal-title"><span id="label-llamada-punto"></span></h4>
                </div>
                <div class="modal-body">
                    <div class="jumbotron text-center" id="info-new-llamada">
                        <div class="fx">
                            <div style="margin: 10px;">
                                <i class="glyphicon glyphicon-earphone fx2 text-success"></i>
                                <span id="telefono-referencia"></span>
                            </div>
                            <button type="button" class="btn btn-success btn-lg" id="iniciarLlamada"> Iniciar Llamada</button>
                        </div>
                    </div>
                    <div class="form-horizontal" style="display:none;" id="content-new-llamada">
                        <div class="row">
                            <div class="col-lg-4 col-md-4 info-llamada"></div>
                            <div class="col-lg-4 col-md-4 info-direccion"></div>
                            <div class="col-lg-4 col-md-4 text-center tiempos">
                                <div id="clockdiv" class="pull-right">
                                    <div>
                                        <span class="hours"></span>
                                        <div class="smalltext">Horas</div>
                                    </div>
                                    <div>
                                        <span class="minutes"></span>
                                        <div class="smalltext">Minutos</div>
                                    </div>
                                    <div>
                                        <span class="seconds"></span>
                                        <div class="smalltext">Segundos</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 col-md-12 info-politica jumbotron">

                            </div>
                        </div>
                        <input type="hidden" name="detalleId" id="detalleId" value="0" />
                        <input type="hidden" name="key" id="key" value="76" />
                        <div class="form-group">
                            <label for="receptorId" class="control-label col-md-2 col-lg-2">Receptor: </label>
                            <div class="col-md-4 col-lg-4">
                                <select name="receptorId" id="receptorId" class="form-control" required>

                                </select>
                            </div>
                            <label for="respuestaId" class="control-label col-md-2 col-lg-2">Respuesta: </label>
                            <div class="col-md-4 col-lg-4">
                                <select name="respuestaId" id="respuestaId" class="form-control" required>

                                </select>
                            </div>
                        </div>

                        <div class="form-group" id="content-fecha-programada" style="display:none;">
                            <label for="fechaProgramada" class="control-label col-md-2 col-lg-2">Fecha Programada:</label>
                            <div class="col-md-10 col-lg-10">
                                <div class='input-group date' id='datetimepicker_fechaProgramada'>
                                    <input type="text" name="fechaProgramada" id="fechaProgramada" class="form-control" placeholder="Fecha Programada" />
                                    <span class="input-group-addon">
                                        <span class="glyphicon glyphicon-calendar"></span>
                                    </span>
                                </div>

                            </div>
                        </div>

                        <div class="form-group">
                            <label for="telefonoLlamado" class="control-label col-md-2 col-lg-2"><i class="glyphicon glyphicon-earphone"></i> Tel&eacute;fono:</label>
                            <div class="col-md-4 col-lg-4">
                                <input type="tel" name="telefonoLlamado" id="telefonoLlamado" class="form-control" placeholder="Telefono" required />
                            </div>
                            <label for="referencia" class="control-label col-md-2 col-lg-2"><i class="glyphicon glyphicon-user"></i> Referencia:</label>
                            <div class="col-md-4 col-lg-4">
                                <input type="text" name="referencia" id="referencia" class="form-control" placeholder="Referencia" required />
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="comentarios" class="control-label col-md-2 col-lg-2">Comentarios: </label>
                            <div class="col-md-10 col-lg-10">
                                <textarea class="form-control" id="comentarios" name="comentarios" placeholder="Comentarios" required></textarea>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="modal-footer">
                    <a class="btn btn-danger" data-dismiss="modal" id="cerrarLlamada">Cerrar <i class="glyphicon glyphicon-remove"></i></a>
                    <button class="btn btn-primary" type="submit" style="display: none;" id="guardarLlamada">Guardar Llamada <i class="glyphicon glyphicon-floppy-saved"></i></button>
                </div>
            </form>
        </div>
    </div>
</div>

<div class="modal fade" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" aria-hidden="true" data-keyboard="false" id="newLlamadaVenta">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <form method="POST" id="form-new-llamada-venta">
                <div class="modal-header alert-success">
                    <h4 class="modal-title"><b>-VENTA-</b><span id="label-llamada-venta-punto"></span></h4>
                </div>
                <div class="modal-body">
                    <div class="jumbotron text-center" id="info-new-llamada-venta">
                        <div class="fx">
                            <div style="margin: 10px;">
                                <i class="glyphicon glyphicon-earphone fx2 text-success"></i>
                                <span id="telefono-referencia-venta"></span>
                            </div>
                            <button type="button" class="btn btn-success btn-lg" id="iniciarLlamadaVenta"> Iniciar Llamada</button>
                        </div>
                    </div>
                    <div class="form-horizontal" style="display:none;" id="content-new-llamada-venta">
                        <div class="row">
                            <div class="col-lg-6 col-md-6 info-llamada"></div>
                            <div class="col-lg-6 col-md-6 info-direccion"></div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 col-md-12 info-politica jumbotron">

                            </div>
                        </div>
                        <input type="hidden" name="detalleId" id="venta-detalleId" value="0" />
                        <input type="hidden" name="key" id="venta-key" value="77" />
                        <div class="form-group">
                            <label for="origenPuntoventaId" class="control-label col-md-2 col-lg-2">Punto Origen: </label>
                            <div class="col-md-10 col-lg-10">
                                <select name="origenPuntoventaId" id="origenPuntoventaId" class="form-control combo-punto-venta" required>

                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="destinoPuntoventaId" class="control-label col-md-2 col-lg-2">Punto Destino: </label>
                            <div class="col-md-10 col-lg-10">
                                <select name="destinoPuntoventaId" id="destinoPuntoventaId" class="form-control combo-punto-venta" required>

                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="montoTraspaso" class="control-label col-md-2 col-lg-2"> Monto Traspaso:</label>
                            <div class="col-md-10 col-lg-10 text-right">
                                <div class="input-group">
                                    <span class="input-group-addon">Q</span>
                                    <input type="number" name="montoTraspaso" id="montoTraspaso" class="form-control" placeholder="Monto Traspaso" required step="0.01" aria-label="Amount (to the nearest dollar)" />
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="comentarios" class="control-label col-md-2 col-lg-2">Comentarios: </label>
                            <div class="col-md-10 col-lg-10">
                                <textarea class="form-control" id="comentarios" name="comentarios" placeholder="Comentarios" required></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <a class="btn btn-danger" data-dismiss="modal" id="cerrarLlamadaVenta">Cerrar <i class="glyphicon glyphicon-remove"></i></a>
                    <button class="btn btn-primary" type="submit" style="display: none;" id="guardarLlamadaVenta">Guardar Llamada <i class="glyphicon glyphicon-floppy-saved"></i></button>
                </div>
            </form>
        </div>
    </div>
</div>

<script src="script/view/inbox.js"></script>