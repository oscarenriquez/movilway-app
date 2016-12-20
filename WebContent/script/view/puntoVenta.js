var PuntoVentaCtrl;
$(document).ready(function() {
    (function(PuntoVentaCtrl) {

        function fnComboBoxPais() {
            var d1 = $.Deferred();
            buildCombo({ key: 85 }, $("[name=pais]"), null, false, true, false, function() {
                d1.resolve("resolve");
                setTimeout(function() {
                    $("[name=pais]").val('').trigger("liszt:updated");
                }, 500);
            });
            return d1;
        }

        function fnComboBoxEstado(paisId, fnCallback) {
            var d1 = $.Deferred();
            buildCombo({ key: 86, pais: paisId }, $("[name=estado]"), null, false, true, false, function() {
                d1.resolve("resolve");
                setTimeout(function() {
                    $("[name=estado]").val('').trigger("liszt:updated");
                    if (fnCallback !== undefined && typeof(fnCallback) === "function") {
                        fnCallback();
                    }
                }, 500);
            });
            return d1;
        }

        function fnComboBoxProvincia(estadoId, fnCallback) {
            var d1 = $.Deferred();
            buildCombo({ key: 87, estado: estadoId }, $("[name=provincia]"), null, false, true, false, function() {
                d1.resolve("resolve");
                setTimeout(function() {
                    $("[name=provincia]").val('').trigger("liszt:updated");
                    if (fnCallback !== undefined && typeof(fnCallback) === "function") {
                        fnCallback();
                    }
                }, 500);
            });
            return d1;
        }

        function fnComboBoxRegionProvincia(provinciaId, fnCallback) {
            var d1 = $.Deferred();
            buildCombo({ key: 88, provincia: provinciaId }, $("[name=regionProvincia]"), null, false, true, false, function() {
                d1.resolve("resolve");
                setTimeout(function() {
                    $("[name=regionProvincia]").val('').trigger("liszt:updated");
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
                setTimeout(function() {
                    $("[name=tipoPuntoVenta]").val('').trigger("liszt:updated");
                }, 500);
            });
            return d1;
        }

        function fnListaPuntoVenta() {
            var d2 = $.Deferred();
            buildFormPost({ key: 84 }, function(data) {
                d2.resolve("resolve");
                $("#table-punto-venta").parent("table").dataTable().fnDestroy();

                createTable(data.lista, "table-punto-venta");
                var options = $.extend(true, {}, tableOptions, {
                    "aoColumns": [
                        { "sClass": "left", "bSortable": false, "sWidth": "10%" },
                        { "sClass": "left", "bSortable": true, "sWidth": "5%" },
                        { "sClass": "left", "bSortable": true, "sWidth": "10%" },
                        { "sClass": "left", "bSortable": true, "sWidth": "30%" },
                        { "sClass": "center", "bSortable": true, "sWidth": "10%" },
                        { "sClass": "right", "bSortable": true, "sWidth": "10%" },
                        { "sClass": "left", "bSortable": true, "sWidth": "15%" },
                        { "sClass": "right", "bSortable": true, "sWidth": "10%" }
                    ]
                });

                $("#table-punto-venta").parent("table").dataTable(options);

            }, true);
            return d2;
        }

        function fnCrearPuntoVenta(e) {
            e.preventDefault();
            e.stopPropagation();
            var frmValidate = new FormValidate(e.target);
            if (frmValidate.validate()) {
                buildFormPost($(this).serialize(), function() {
                    frmValidate.clean();
                    fnListaPuntoVenta();
                    $("#newPuntoVenta").modal("hide");
                }, true);
            } else {
                noty({ text: "¡ Complete los campos requeridos !", type: 'warning', timeout: 3000 });
            }
        }

        function fnConsultarPuntoVenta(id) {
            $("#edit_id").val(id);
            var param = {};
            param.id = id;
            param.key = 82;
            buildFormPost(param, function(data) {
                $("[name=tipoPuntoVenta]").val('').trigger("liszt:updated");
                $("[name=pais]").val('').trigger("liszt:updated");
                $("[name=estado]").val('').trigger("liszt:updated");
                $("[name=provincia]").val('').trigger("liszt:updated");
                $("[name=regionProvincia]").val('').trigger("liszt:updated");
                for (var item in data.model) {
                    if (typeof(data.model[item]) === "boolean") {
                        $("#edit_" + item).prop("checked", data.model[item]);
                    } else if (typeof(data.model[item]) === "object") {
                        if (data.model[item].time) {
                            var fechaSaldo = new Date(data.model[item].time);
                            var fechaSaldoWrapper = moment(fechaSaldo);
                            $("#edit_" + item).val(fechaSaldoWrapper.format("DD/MM/YYYY HH:mm"));
                        }
                    } else {
                        $("#edit_" + item).val(data.model[item]);
                    }

                    fnComboBoxEstado(data.model.pais, function() {
                        $("#edit_estado").val(data.model.estado);
                        $("[name=estado]").trigger("liszt:updated");
                    });
                    fnComboBoxProvincia(data.model.estado, function() {
                        $("#edit_provincia").val(data.model.provincia);
                        $("[name=provincia]").trigger("liszt:updated");
                    });
                    fnComboBoxRegionProvincia(data.model.provincia, function() {
                        $("#edit_regionProvincia").val(data.model.regionProvincia);
                        $("[name=regionProvincia]").trigger("liszt:updated");
                    });
                }
                setTimeout(function() {
                    $("[name=tipoPuntoVenta]").trigger("liszt:updated");
                    $("[name=pais]").trigger("liszt:updated");
                }, 500);
                $("#editPuntoVenta").modal("show");
            }, true);
        }

        function fnModificarPuntoVenta(e) {
            e.preventDefault();
            e.stopPropagation();
            var frmValidate = new FormValidate(e.target);
            if (frmValidate.validate()) {
                buildFormPost($(this).serialize(), function() {
                    frmValidate.clean();
                    fnListaPuntoVenta();
                    $("#editPuntoVenta").modal("hide");
                }, true);
            } else {
                noty({ text: "¡ Complete los campos requeridos !", type: 'warning', timeout: 3000 });
            }
        }

        function fnEliminarPuntoVenta(id) {
            var param = {};
            param.id = id;
            param.key = 83;
            alertify.confirm("<h3>¿Esta seguro de eliminar este registro?</h3>", function(e) {
                if (e) {
                    buildFormPost(param, function() {
                        fnListaPuntoVenta();
                    });
                }
            });
        }

        function cleanFormNewPuntoVenta(e) {
            e.preventDefault();
            e.stopPropagation();
            var frmValidate = new FormValidate(document.getElementById("form-new-punto-venta"));
            frmValidate.clean();
            $("#newPuntoVenta").modal("hide");
            $("[name=estado]").html('').trigger("liszt:updated");
            $("[name=provincia]").html('').trigger("liszt:updated");
            $("[name=regionProvincia]").html('').trigger("liszt:updated");
        }

        PuntoVentaCtrl.fnEliminarPuntoVenta = fnEliminarPuntoVenta;
        PuntoVentaCtrl.fnConsultarPuntoVenta = fnConsultarPuntoVenta;

        $("#form-new-punto-venta").on("submit", fnCrearPuntoVenta);
        $("#form-edit-punto-venta").on("submit", fnModificarPuntoVenta);
        $('input[name=saldoFechahora]').datetimepicker({ locale: 'es' });

        $(".cancelarNewPuntoVenta").on("click", cleanFormNewPuntoVenta);

        $("select[name=pais]").on("change", function(e) {
            $("[name=estado]").html('').trigger("liszt:updated");
            $("[name=provincia]").html('').trigger("liszt:updated");
            $("[name=regionProvincia]").html('').trigger("liszt:updated");

            if (e.target.value) {
                fnComboBoxEstado(e.target.value);
            }
        });

        $("select[name=estado]").on("change", function(e) {
            $("[name=provincia]").html('').trigger("liszt:updated");
            $("[name=regionProvincia]").html('').trigger("liszt:updated");
            if (e.target.value) {
                fnComboBoxProvincia(e.target.value);
            }
        });

        $("select[name=provincia]").on("change", function(e) {
            $("[name=regionProvincia]").html('').trigger("liszt:updated");
            if (e.target.value) {
                fnComboBoxRegionProvincia(e.target.value);
            }
        });

        $.when(fnListaPuntoVenta()).done(function() {
            $.when(fnComboBoxTipoPuntoVenta(), fnComboBoxPais()).done(function(result) {
                console.log(result);
            });
        });
    })(PuntoVentaCtrl || (PuntoVentaCtrl = {}));
});