var PoliticaCtrl;
$(document).ready(function() {
    (function(PoliticaCtrl) {
        "use strict"

        function fnComboBoxTipoCampana() {
            var d1 = $.Deferred();
            buildCombo({ key: 62 }, $("[name=tipoCampana]"), null, false, true, false, function() {
                d1.resolve("resolve");
            });
            return d1;
        }

        function fnListaPolitica() {
            var d2 = $.Deferred();
            buildFormPost({ key: 30 }, function(data) {
                d2.resolve("resolve");
                $("#table-politica").parent("table").dataTable().fnDestroy();

                createTable(data.lista, "table-politica");
                var options = $.extend(true, {}, tableOptions, {
                    "aoColumns": [
                        { "sClass": "left", "bSortable": false, "sWidth": "5%" },
                        { "sClass": "left", "bSortable": true, "sWidth": "20%" },
                        { "sClass": "left", "bSortable": true, "sWidth": "5%" },
                        { "sClass": "left", "bSortable": true, "sWidth": "60%" },
                        { "sClass": "center", "bSortable": false, "sWidth": "10%" }
                    ]
                });

                $("#table-politica").parent("table").dataTable(options);

            }, true);
            return d2;
        }

        function fnCrearPolitica(e) {
            e.preventDefault();
            e.stopPropagation();
            var frmValidate = new FormValidate(e.target);
            if (frmValidate.validate()) {
                buildFormPost($(this).serialize(), function() {
                    frmValidate.clean();
                    fnListaPolitica();
                    $("#newPolitica").modal("hide");
                }, true);
            } else {
                noty({ text: "¡ Complete los campos requeridos !", type: 'warning', timeout: 3000 });
            }
        }

        function fnConsultarPolitica(politicaId) {
            $("#edit_politicaId").val(politicaId);
            var param = {};
            param.politicaId = politicaId;
            param.key = 28;
            buildFormPost(param, function(data) {
                $("[name=tipoCampana]").val('').trigger("chosen:updated");
                for (var item in data.model) {
                    if (typeof(data.model[item]) === "boolean") {
                        $("#edit_" + item).prop("checked", data.model[item]);
                    } else {
                        $("#edit_" + item).val(data.model[item]);
                    }
                }
                setTimeout(function() { $("[name=tipoCampana]").trigger("chosen:updated"); }, 500);
                $("#editPolitica").modal("show");
            }, true);
        }

        function fnModificarPolitica(e) {
            e.preventDefault();
            e.stopPropagation();
            var frmValidate = new FormValidate(e.target);
            if (frmValidate.validate()) {
                buildFormPost($(this).serialize(), function() {
                    frmValidate.clean();
                    fnListaPolitica();
                    $("#editPolitica").modal("hide");
                }, true);
            } else {
                noty({ text: "¡ Complete los campos requeridos !", type: 'warning', timeout: 3000 });
            }
        }

        function fnEliminarPolitica(politicaId) {
            var param = {};
            param.politicaId = politicaId;
            param.key = 29;
            alertify.confirm("<h3>¿Esta seguro de eliminar este registro?</h3>", function(e) {
                if (e) {
                    buildFormPost(param, function() {
                        fnListaPolitica();
                    });
                }
            });
        }

        PoliticaCtrl.fnEliminarPolitica = fnEliminarPolitica;
        PoliticaCtrl.fnConsultarPolitica = fnConsultarPolitica;

        $("#form-new-politica").on("submit", fnCrearPolitica);
        $("#form-edit-politica").on("submit", fnModificarPolitica);

        $.when(fnListaPolitica()).done(function() {
            fnComboBoxTipoCampana();
        });
    })(PoliticaCtrl || (PoliticaCtrl = {}));
});