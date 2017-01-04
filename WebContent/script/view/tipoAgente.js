var TipoAgenteCtrl;
$(document).ready(function() {
    (function(TipoAgenteCtrl) {
        "use strict"

        function fnListaTipoAgente() {
            buildFormPost({ key: 48 }, function(data) {
                if (TipoAgenteCtrl.table) {
                    TipoAgenteCtrl.table.fnDestroy();
                }
                createTable(data.lista, "table-tipoagente");
                var options = $.extend(true, {}, tableOptions, {
                    "aoColumns": [
                        { "sClass": "left", "bSortable": false },
                        { "sClass": "left", "bSortable": true },
                        { "sClass": "center", "bSortable": false },
                        { "sClass": "center", "bSortable": false }
                    ]
                });

                TipoAgenteCtrl.table = $("#table-tipoagente").parent("table").dataTable(options);

            }, true);
        }

        function fnCrearTipoAgente(e) {
            console.log(e);
            e.preventDefault();
            e.stopPropagation();
            var frmValidate = new FormValidate(e.target);
            if (frmValidate.validate()) {
                buildFormPost($(this).serialize(), function() {
                    frmValidate.clean();
                    fnListaTipoAgente();
                    $("#newTipoAgente").modal("hide");
                }, true);
            } else {
                noty({ text: "¡ Complete los campos requeridos !", type: 'warning', timeout: 3000 });
            }
        }

        function fnConsultarTipoAgente(tipoagenteId) {
            $("#edit_tipoagenteId").val(tipoagenteId);
            var param = {};
            param.tipoagenteId = tipoagenteId;
            param.key = 46;
            buildFormPost(param, function(data) {
                for (var item in data.model) {
                    if (typeof(data.model[item]) === "boolean") {
                        $("#edit_" + item).prop("checked", data.model[item]);
                    } else {
                        $("#edit_" + item).val(data.model[item]);
                    }
                }
                $("#editTipoAgente").modal("show");
            }, true);
        }

        function fnModificarTipoAgente(e) {
            console.log(e);
            e.preventDefault();
            e.stopPropagation();
            var frmValidate = new FormValidate(e.target);
            if (frmValidate.validate()) {
                buildFormPost($(this).serialize(), function() {
                    frmValidate.clean();
                    fnListaTipoAgente();
                    $("#editTipoAgente").modal("hide");
                }, true);
            } else {
                noty({ text: "¡ Complete los campos requeridos !", type: 'warning', timeout: 3000 });
            }
        }

        function fnEliminarTipoAgente(tipoagenteId) {
            console.log(tipoagenteId);
            var param = {};
            param.tipoagenteId = tipoagenteId;
            param.key = 47;
            alertify.confirm("<h3>¿Esta seguro de eliminar este registro?</h3>", function(e) {
                if (e) {
                    buildFormPost(param, function() {
                        fnListaTipoAgente();
                    });
                }
            });
        }

        TipoAgenteCtrl.fnEliminarTipoAgente = fnEliminarTipoAgente;
        TipoAgenteCtrl.fnConsultarTipoAgente = fnConsultarTipoAgente;

        $("#form-new-tipoagente").on("submit", fnCrearTipoAgente);
        $("#form-edit-tipoagente").on("submit", fnModificarTipoAgente);
        fnListaTipoAgente();
    })(TipoAgenteCtrl || (TipoAgenteCtrl = {}));
});