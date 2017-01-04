<div class="panel panel-default">
    <div class="panel-heading">
        <div class="panel-title">
            Reporte de Puntos de venta para Abastecimiento
            <div class="btn-group btn-group-sm pull-right" role="group" aria-label="..." style="min-width: 250px;">
                <button type="button" class="btn btn-secondary col-xs-4" id="filtrar">Filtrar</button>
                <button type="button" class="btn btn-secondary col-xs-4 dropdown-toggle" id="optButton hide" data-toggle="dropdown"><span class="caret"></span> Opciones</button>
                <ul class="dropdown-menu">
                    <li>
                        <a id="reporte"> <span class="glyphicon glyphicon-tasks"></span> Reporte</a>
                    </li>
                    <li>
                        <a id="showMapa"> <span class="glyphicon glyphicon-map-marker"></span> Mapa</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="panel-body">
        <div class="well well-sm">
            <form class="form-horizontal" id="form-filter" novalidate>
                <input type="hidden" name="key" id="key" value="0" />
                <div class="form-group">
                    <div class="col-md-3 col-lg-3">
                        <label for="paises" class="control-label col-md-3 col-lg-3">Pais</label>
                        <select data-placeholder="Seleccione una opcion" name="paises" id="paises" class="form-control" multiple required></select>
                    </div>
                    <div class="col-md-3 col-lg-3">
                        <label for="estados" class="control-label col-md-3 col-lg-3">Estado</label>
                        <select data-placeholder="Seleccione una opcion" name="estados" id="estados" class="form-control" multiple disabled required></select>
                    </div>
                    <div class="col-md-3 col-lg-3">
                        <label for="provincia" class="control-label col-md-3 col-lg-3">Provincia</label>
                        <select data-placeholder="Seleccione una opcion" name="provincias" id="provincias" class="form-control" multiple disabled required></select>
                    </div>
                    <div class="col-md-3 col-lg-3">
                        <label for="regionProvincia" class="control-label col-md-3 col-lg-3">Region</label>
                        <select data-placeholder="Seleccione una opcion" name="regionProvincia" id="regionProvincia" class="form-control" multiple disabled required></select>
                    </div>
                </div>
            </form>
        </div>
        <div>
            <div id="divChart"></div>
        </div>
    </div>
</div>

<!-- Modal MAPA -->
<div class="modal fade" role="dialog" aria-labelledby="mapa" data-backdrop="static" aria-hidden="true" data-keyboard="false" id="mapa" style="overflow-y: auto;">
    <div class="modal-dialog modal-lg" style="margin: 0; padding-bottom: 30px; padding-top: 20px; height: 100%;">
        <div id="mapa-canvas"></div>
        <div class="btn-group btn-group-justified showSlideUp" role="group" id="btnOptions" style="display:none;">
            <div class="btn-group" role="group" style="width: 0.2%;">
                <button type="button" class="btn btn-primary" id="cluster"><span class="glyphicon glyphicon-map-marker"></span></button>
            </div>
            <div class="btn-group" role="group" style="width: 0.2%;">
                <button type="button" class="btn btn-warning" id="toggle"><span class="glyphicon glyphicon-road"></span></button>
            </div>
            <div class="btn-group" role="group">
                <button type="button" class="btn btn-info">Total:	<span id="totalMapa"></span></button>
            </div>
            <!--<div class="btn-group" role="group hidden">
                <button type="button" class="btn btn-success" id="detalleGeoCerca">Reporte Geocerca: <span id="totalGeoCerca">0</span></button>
            </div>-->
            <div class="btn-group" role="group">
                <button type="button" class="btn btn-default" id="showLegends"><i class='glyphicon glyphicon-chevron-up'></i></button>
            </div>
            <!--<div class="btn-group" role="group hidden">
                <button type="button" class="btn btn-primary" id="geoCerca">GeoCerca</button>
            </div>-->
            <div class="btn-group" role="group">
                <button type="button" class="btn btn-danger" id="cerrarMapa"><i class="glyphicon glyphicon-remove"></i> Cerrar</button>
            </div>
        </div>
        <div id="legends" class="slideUp">
            <div id="titleMap" style="color: white; text-shadow: 1px 1px 1px #000; padding: 2px; text-align: center; font-weight: bold; font-size: 1.5em;"></div>
            <div id="legend-one" class="legend-content" style="margin: 0 auto; font-weight: bold;"></div>
        </div>
    </div>
</div>
<script src="script/view/reportePuntoVentaAbast.js"></script>