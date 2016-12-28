var CampanaCtrl;
$(document).ready(function() {
    (function(CampanaCtrl) {

        function fnComboBoxPais() {
            var d1 = $.Deferred();
            buildCombo({ key: 85 }, $("[name=paises]"), null, false, true, false, function() {
                d1.resolve("resolve");
                $("[name=paises]").find("option").eq(0).remove();
                setTimeout(function() {
                    $("[name=paises]").val('').trigger("chosen:updated");
                }, 500);
            });
            return d1;
        }

        function fnComboBoxEstado(paisId, fnCallback) {
            var d1 = $.Deferred();
            buildCombo({ key: 86, paises: paisId }, $("[name=estados]"), null, false, true, false, function() {
                d1.resolve("resolve");
                $("[name=estados]").find("option").eq(0).remove();
                setTimeout(function() {
                    $("[name=estados").val('').prop("disabled", false).trigger("chosen:updated");
                    if (fnCallback !== undefined && typeof(fnCallback) === "function") {
                        fnCallback();
                    }
                }, 500);
            });
            return d1;
        }

        function fnComboBoxProvincia(estadoId, fnCallback) {
            var d1 = $.Deferred();
            buildCombo({ key: 87, estados: estadoId }, $("[name=provincias]"), null, false, true, false, function() {
                d1.resolve("resolve");
                $("[name=provincias]").find("option").eq(0).remove();
                setTimeout(function() {
                    $("[name=provincias]").val('').prop("disabled", false).trigger("chosen:updated");
                    if (fnCallback !== undefined && typeof(fnCallback) === "function") {
                        fnCallback();
                    }
                }, 500);
            });
            return d1;
        }

        function fnComboBoxRegionProvincia(provinciaId, fnCallback) {
            var d1 = $.Deferred();
            buildCombo({ key: 88, provincias: provinciaId }, $("[name=regionProvincia]"), null, false, true, false, function() {
                d1.resolve("resolve");
                $("[name=regionProvincia]").find("option").eq(0).remove();
                setTimeout(function() {
                    $("[name=regionProvincia]").val('').prop("disabled", false).trigger("chosen:updated");
                    if (fnCallback !== undefined && typeof(fnCallback) === "function") {
                        fnCallback();
                    }
                }, 500);
            });
            return d1;
        }

        function fnComboBoxTipoPuntoVenta() {
            var d1 = $.Deferred();
            buildCombo({ key: 63 }, $("[name=tipoPuntoVenta]"), null, false, true, false, function() {
                d1.resolve("resolve");
                $("[name=tipoPuntoVenta]").find("option").eq(0).remove();
                setTimeout(function() {
                    $("[name=tipoPuntoVenta]").val('').trigger("chosen:updated");
                }, 500);
            });
            return d1;
        }

        function fnComboBoxRespuesta() {
            var d1 = $.Deferred();
            buildCombo({ key: 71 }, $("[name=respuestas]"), null, false, true, true, function() {
                d1.resolve("resolve");
                $("[name=respuestas]").find("option").eq(0).remove();
                setTimeout(function() {
                    $("[name=respuestas]").val('').trigger("chosen:updated");
                }, 500);
            });
            return d1;
        }

        function fnComboBoxTipoCampana() {
            var d1 = $.Deferred();
            buildCombo({ key: 62 }, $("[name=tipoCampana]"), null, false, true, false, function() {
                d1.resolve("resolve");
                setTimeout(function() {
                    $("[name=tipoCampana]").val('').trigger("chosen:updated");
                }, 500);
            });
            return d1;
        }

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

        function fnGeneraCampana(e) {
            e.preventDefault();
            e.stopPropagation();
            var frmValidate = new FormValidate(e.target);
            if (frmValidate.validate()) {
                buildFormPost($(this).serialize(), function(data) {
                    frmValidate.clean();
                    $("#cant").html(data.cant);
                    $("#campanaId").val(data.campanaId);
                    fnListaCampanaDetalle(data.detalle);
                    $("[href=#campana]").tab("show")
                    setTimeout(function() {
                        $("select").trigger("chosen:updated");
                        $("#detalleCampana").modal("show");
                    }, 500);
                }, true);
            } else {
                noty({ text: "¡ Complete los campos requeridos !", type: 'warning', timeout: 3000 });
            }
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

        function fnCancelarCampana(e) {
            e.preventDefault();
            e.stopPropagation();
            var frmValidate = new FormValidate(e.target);
            buildFormPost({ key: 97, campanaId: $("#campanaId").val() }, function(data) {
                frmValidate.clean();
                setTimeout(function() {
                    $("select").trigger("chosen:updated");
                    $("#detalleCampana").modal("hide");
                }, 500);
            }, true);
        }

        function fnListaCampanaDetalle(lista) {
            $("#table-campana-detalle").parent("table").dataTable().fnDestroy();

            createTable(lista, "table-campana-detalle");
            var options = $.extend(true, {}, tableOptions, {
                "aoColumns": [
                    { "sClass": "center", "bSortable": true },
                    { "sClass": "left", "bSortable": true },
                    { "sClass": "left", "bSortable": true },
                    { "sClass": "right", "bSortable": true },
                    { "sClass": "left", "bSortable": true },
                    { "sClass": "right", "bSortable": true }
                ]
            });

            $("#table-campana-detalle").parent("table").dataTable(options);
        }

        $("#datetimepicker_fechaInicio").datetimepicker({ locale: "es" });
        $("#datetimepicker_fechaFinal").datetimepicker({ locale: "es", useCurrent: false });

        $("#datetimepicker_fechaInicio").on("dp.change", function(e) {
            $('#datetimepicker_fechaFinal').data("DateTimePicker").minDate(e.date);
        });
        $("#datetimepicker_fechaFinal").on("dp.change", function(e) {
            $('#datetimepicker_fechaInicio').data("DateTimePicker").maxDate(e.date);
        });

        $("#datetimepicker_fechaInicioCampa").datetimepicker({ locale: "es" });
        $("#datetimepicker_fechaFinalCampa").datetimepicker({ locale: "es", useCurrent: false });

        $("#datetimepicker_fechaInicioCampa").on("dp.change", function(e) {
            $('#datetimepicker_fechaFinalCampa').data("DateTimePicker").minDate(e.date);
        });
        $("#datetimepicker_fechaFinalCampa").on("dp.change", function(e) {
            $('#datetimepicker_fechaInicioCampa').data("DateTimePicker").maxDate(e.date);
        });

        $("select[name=paises]").on("change", function(e) {
            $("[name=estados]").html('').prop("disabled", true).trigger("chosen:updated");
            $("[name=provincias]").html('').prop("disabled", true).trigger("chosen:updated");
            $("[name=regionProvincia]").html('').prop("disabled", true).trigger("chosen:updated");

            if (e.target.value) {
                fnComboBoxEstado($(e.target).val().toString());
            }
        });

        $("select[name=estados]").on("change", function(e) {
            $("[name=provincias]").html('').prop("disabled", true).trigger("chosen:updated");
            $("[name=regionProvincia]").html('').prop("disabled", true).trigger("chosen:updated");
            if (e.target.value) {
                fnComboBoxProvincia($(e.target).val().toString());
            }
        });

        $("select[name=provincias]").on("change", function(e) {
            $("[name=regionProvincia]").html('').prop("disabled", true).trigger("chosen:updated");
            if (e.target.value) {
                fnComboBoxRegionProvincia($(e.target).val().toString());
            }
        });

        $("select").chosen({ no_results_text: 'Oops!, no existe informacion con: ', width: "100%" });

        $("#form-campana").on("submit", fnGeneraCampana);
        $("#form-asigna-agentes").on("submit", fnConfirmarCampana);

        $("#cancelarCampana").on("click", fnCancelarCampana);

        $.when(fnComboBoxTipoCampana(), fnComboBoxTipoPuntoVenta()).done(function(result) {
            $.when(fnComboBoxPais(), fnComboBoxRespuesta()).done(function() {
                fnComboBoxAgentes();
            });
        });

    })(CampanaCtrl || (CampanaCtrl = {}));
});