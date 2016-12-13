var AgenteCtrl;
$(document).ready(function() {
    (function(AgenteCtrl) {
        "use strict"

        function fnComboBoxTipoAgente() {
            var d1 = $.Deferred();
            buildCombo({ key: 61 }, $("[name=tipoAgente]"), null, false, true, false, function() {
                d1.resolve("resolve");
            });
            return d1;
        }

        function fnComboBoxUsuariosAgentes() {
            var d1 = $.Deferred();
            buildCombo({ key: 70 }, $("[name=userId]"), null, false, true, false, function() {
                d1.resolve("resolve");
            });
            return d1;
        }

        function fnListaAgente() {
            var d2 = $.Deferred();
            buildFormPost({ key: 6 }, function(data) {
                d2.resolve("resolve");
                $("#table-agente").parent("table").dataTable().fnDestroy();

                createTable(data.lista, "table-agente");
                var options = $.extend(true, {}, tableOptions, {
                    "aoColumns": [
                        { "sClass": "left", "bSortable": false },
                        { "sClass": "left", "bSortable": true },
                        { "sClass": "left", "bSortable": true },
                        { "sClass": "center", "bSortable": false }
                    ]
                });

                $("#table-agente").parent("table").dataTable(options);

            }, true);
            return d2;
        }

        function fnCrearAgente(e) {
            e.preventDefault();
            e.stopPropagation();
            var frmValidate = new FormValidate(e.target);
            if (frmValidate.validate()) {
                buildFormPost($(this).serialize(), function() {
                    frmValidate.clean();
                    fnListaAgente();
                    $("#newAgente").modal("hide");
                }, true);
            } else {
                noty({ text: "¡ Complete los campos requeridos !", type: 'warning', timeout: 3000 });
            }
        }

        function fnConsultarAgente(agenteId) {
            $("#edit_agenteId").val(agenteId);
            var param = {};
            param.agenteId = agenteId;
            param.key = 4;
            buildFormPost(param, function(data) {
                $("[name=tipoAgente]").val('').trigger("liszt:updated");
                for (var item in data.model) {
                    if (typeof(data.model[item]) === "boolean") {
                        $("#edit_" + item).prop("checked", data.model[item]);
                    } else {
                        $("#edit_" + item).val(data.model[item]);
                    }
                }
                setTimeout(function() {
                    $("[name=tipoAgente]").trigger("liszt:updated");
                    $("[name=userId]").trigger("liszt:updated");
                }, 500);
                $("#editAgente").modal("show");
            }, true);
        }

        function fnModificarAgente(e) {
            e.preventDefault();
            e.stopPropagation();
            var frmValidate = new FormValidate(e.target);
            if (frmValidate.validate()) {
                buildFormPost($(this).serialize(), function() {
                    frmValidate.clean();
                    fnListaAgente();
                    $("#editAgente").modal("hide");
                }, true);
            } else {
                noty({ text: "¡ Complete los campos requeridos !", type: 'warning', timeout: 3000 });
            }
        }

        function fnEliminarAgente(agenteId) {
            var param = {};
            param.agenteId = agenteId;
            param.key = 5;
            alertify.confirm("<h3>¿Esta seguro de eliminar este registro?</h3>", function(e) {
                if (e) {
                    buildFormPost(param, function() {
                        fnListaAgente();
                    });
                }
            });
        }

        AgenteCtrl.fnEliminarAgente = fnEliminarAgente;
        AgenteCtrl.fnConsultarAgente = fnConsultarAgente;

        $("#form-new-agente").on("submit", fnCrearAgente);
        $("#form-edit-agente").on("submit", fnModificarAgente);

        $.when(fnListaAgente()).done(function() {
            $.when(fnComboBoxTipoAgente()).done(function() {
                fnComboBoxUsuariosAgentes();
            });
        });
    })(AgenteCtrl || (AgenteCtrl = {}));
});