var CampanaCtrl;
$(document).ready(function() {
    (function(CampanaCtrl) {

        function fnComboBoxAgentes() {
            var d1 = $.Deferred();
            buildCombo({ key: 93 }, $("[name=agentes]"), null, false, true, false, function() {
                d1.resolve("resolve");
                setTimeout(function() {
                    $("[name=agentes]").val('').trigger("chosen:updated");
                }, 500);
            });
            return d1;
        }

        function fnComboBoxAgentesEnCampana(campanaId) {
            var d1 = $.Deferred();
            buildCombo({ key: 102, campanaId: campanaId }, $("[name=agente]"), null, false, true, false, function() {
                d1.resolve("resolve");
                setTimeout(function() {
                    $("[name=agente]").val('').trigger("chosen:updated");
                }, 500);
            });
            return d1;
        }

        function fnListaCampana() {
            var d2 = $.Deferred();
            buildFormPost({ key: 101 }, function(data) {
                d2.resolve("resolve");
                $("#table-campana").parent("table").dataTable().fnDestroy();

                createTable(data.lista, "table-campana");
                var options = $.extend(true, {}, tableOptions, {
                    "aoColumns": [
                        { "sClass": "left", "bSortable": false },
                        { "sClass": "left", "bSortable": true },
                        { "sClass": "left", "bSortable": true },
                        { "sClass": "left", "bSortable": true },
                        { "sClass": "center", "bSortable": true },
                        { "sClass": "center", "bSortable": true }
                    ]
                });

                $("#table-campana").parent("table").dataTable(options);

            }, true);
            return d2;
        }

        function fnAsignarAgente(campanaId) {
            buildFormPost({ key: 100, campanaId: campanaId }, function(data) {
                $("#cant").html(data.cant);
                $("#campanaId").val(data.campanaId);
                fnListaCampanaDetalle(data.detalle);
                setTimeout(function() {
                    $("select").trigger("chosen:updated");
                    $("#detalleCampana").modal("show");
                }, 500);
            }, true);
        }

        function fnEliminarCampana(campanaId) {
            alertify.confirm("<h3>Esta seguro de eliminar esta campa&ntilde;a?", function(e) {
                if (e) {
                    buildFormPost({ key: 97, campanaId: campanaId }, function() {
                        fnListaCampana();
                    });
                }
            });
        }

        function fnReAsignarAgente(campanaId) {

            $("#reasig_campanaId").val(campanaId);

            appWait.showPleaseWait();
            $.when(fnComboBoxAgentesEnCampana(campanaId)).done(function() {
                appWait.hidePleaseWait();
                setTimeout(function() {
                    $("select").trigger("chosen:updated");
                    $("#reasignarCampana").modal("show");
                }, 500);
            });
        }

        function fnFinalizarCampana(campanaId) {
            alertify.confirm("<h3>Esta seguro de finalizar esta campa&ntilde;a?", function(e) {
                if (e) {
                    buildFormPost({ key: 99, campanaId: campanaId }, function() {
                        fnListaCampana();
                    });
                }
            });
        }

        function fnDetalleCampana(campanaId) {
            buildFormPost({ key: 100, campanaId: campanaId }, function(data) {
                fnListaCampanaDetalle2(data.detalle);
                setTimeout(function() {
                    $("#detalleCampana2").modal("show");
                }, 500);
            }, true);
        }

        function fnConfirmarCampana(e) {
            e.preventDefault();
            e.stopPropagation();
            var frmValidate = new FormValidate(e.target);
            if (frmValidate.validate()) {
                buildFormPost($(this).serialize(), function(data) {
                    frmValidate.clean();
                    setTimeout(function() {
                        $("select").trigger("chosen:updated");
                        $("#detalleCampana").modal("hide");
                    }, 500);
                }, true);
            } else {
                noty({ text: "¡ Complete los campos requeridos !", type: 'warning', timeout: 3000 });
            }
        }

        function fnConfirmarReasigna(e) {
            e.preventDefault();
            e.stopPropagation();
            var frmValidate = new FormValidate(e.target);
            if (frmValidate.validate()) {
                buildFormPost($(this).serialize(), function(data) {
                    frmValidate.clean();
                    setTimeout(function() {
                        $("select").trigger("chosen:updated");
                        $("#reasignarCampana").modal("hide");
                    }, 500);
                }, true);
            } else {
                noty({ text: "¡ Complete los campos requeridos !", type: 'warning', timeout: 3000 });
            }
        }

        function fnListaCampanaDetalle(lista) {
            $("#table-campana-detalle").parent("table").dataTable().fnDestroy();

            createTable(lista, "table-campana-detalle");
            var options = $.extend(true, {}, tableOptions, {
                "bSort": false,
                "aoColumns": [
                    { "sClass": "center", "bSortable": true },
                    { "sClass": "left", "bSortable": true },
                    { "sClass": "left", "bSortable": true },
                    { "sClass": "right", "bSortable": true },
                    { "sClass": "left", "bSortable": true },
                    { "sClass": "right", "bSortable": true },
                    { "sClass": "left", "bSortable": true }
                ]
            });

            $("#table-campana-detalle").parent("table").dataTable(options);
        }

        function fnListaCampanaDetalle2(lista) {
            $("#table-campana-detalle2").parent("table").dataTable().fnDestroy();

            createTable(lista, "table-campana-detalle2");
            var options = $.extend(true, {}, tableOptions, {
                "bSort": false,
                "aoColumns": [
                    { "sClass": "center", "bSortable": true },
                    { "sClass": "left", "bSortable": true },
                    { "sClass": "left", "bSortable": true },
                    { "sClass": "right", "bSortable": true },
                    { "sClass": "left", "bSortable": true },
                    { "sClass": "right", "bSortable": true },
                    { "sClass": "left", "bSortable": true }
                ]
            });

            $("#table-campana-detalle2").parent("table").dataTable(options);
        }

        CampanaCtrl.fnAsignarAgente = fnAsignarAgente;
        CampanaCtrl.fnEliminarCampana = fnEliminarCampana;
        CampanaCtrl.fnReAsignarAgente = fnReAsignarAgente;
        CampanaCtrl.fnFinalizarCampana = fnFinalizarCampana;
        CampanaCtrl.fnDetalleCampana = fnDetalleCampana;

        $("#form-asigna-agentes").on("submit", fnConfirmarCampana);
        $("#form-reasigna-agentes").on("submit", fnConfirmarReasigna);

        $.when(fnListaCampana()).done(function() {
            fnComboBoxAgentes();
        });

    })(CampanaCtrl || (CampanaCtrl = {}));
});