var TipoPuntoVentaCtrl;
$(document).ready(function() {
    (function(TipoPuntoVentaCtrl) {

        function fnListaTipoPuntoVenta() {
            buildFormPost({ key: 60 }, function(data) {

                $("#table-tipopuntoventa").parent("table").dataTable().fnDestroy();

                createTable(data.lista, "table-tipopuntoventa");
                var options = $.extend(true, {}, tableOptions, {
                    "aoColumns": [
                        { "sClass": "left", "bSortable": false },
                        { "sClass": "left", "bSortable": true },
                        { "sClass": "center", "bSortable": false }
                    ]
                });

                $("#table-tipopuntoventa").parent("table").dataTable(options);

            }, true);
        }

        function fnCrearTipoPuntoVenta(e) {
            e.preventDefault();
            e.stopPropagation();
            var frmValidate = new FormValidate(e.target);
            if (frmValidate.validate()) {
                buildFormPost($(this).serialize(), function() {
                    frmValidate.clean();
                    fnListaTipoPuntoVenta();
                    $("#newTipoPuntoVenta").modal("hide");
                }, true);
            } else {
                noty({ text: "¡ Complete los campos requeridos !", type: 'warning', timeout: 3000 });
            }
        }

        function fnConsultarTipoPuntoVenta(tipopuntoventaId) {
            $("#edit_tipopuntoventaId").val(tipopuntoventaId);
            var param = {};
            param.tipopuntoventaId = tipopuntoventaId;
            param.key = 58;
            buildFormPost(param, function(data) {
                for (var item in data.model) {
                    if (typeof(data.model[item]) === "boolean") {
                        $("#edit_" + item).prop("checked", data.model[item]);
                    } else {
                        $("#edit_" + item).val(data.model[item]);
                    }
                }
                $("#editTipoPuntoVenta").modal("show");
            }, true);
        }

        function fnModificarTipoPuntoVenta(e) {
            e.preventDefault();
            e.stopPropagation();
            var frmValidate = new FormValidate(e.target);
            if (frmValidate.validate()) {
                buildFormPost($(this).serialize(), function() {
                    frmValidate.clean();
                    fnListaTipoPuntoVenta();
                    $("#editTipoPuntoVenta").modal("hide");
                }, true);
            } else {
                noty({ text: "¡ Complete los campos requeridos !", type: 'warning', timeout: 3000 });
            }
        }

        function fnEliminarTipoPuntoVenta(tipopuntoventaId) {
            var param = {};
            param.tipopuntoventaId = tipopuntoventaId;
            param.key = 59;
            alertify.confirm("<h3>¿Esta seguro de eliminar este registro?</h3>", function(e) {
                if (e) {
                    buildFormPost(param, function() {
                        fnListaTipoPuntoVenta();
                    });
                }
            });
        }

        TipoPuntoVentaCtrl.fnEliminarTipoPuntoVenta = fnEliminarTipoPuntoVenta;
        TipoPuntoVentaCtrl.fnConsultarTipoPuntoVenta = fnConsultarTipoPuntoVenta;

        $("#form-new-tipopuntoventa").on("submit", fnCrearTipoPuntoVenta);
        $("#form-edit-tipopuntoventa").on("submit", fnModificarTipoPuntoVenta);
        fnListaTipoPuntoVenta();
    })(TipoPuntoVentaCtrl || (TipoPuntoVentaCtrl = {}));
});