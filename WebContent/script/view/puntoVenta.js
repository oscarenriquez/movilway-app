var PuntoVentaCtrl;
$(document).ready(function() {
    (function(PuntoVentaCtrl) {

        function fnComboBoxPais() {
            var d1 = $.Deferred();
            buildCombo({ key: 85 }, $("[name=pais]"), null, false, true, false, function() {
                d1.resolve("resolve");
                setTimeout(function() {
                    $("[name=pais]").val('').trigger("chosen:updated");
                }, 500);
            });
            return d1;
        }

        function fnComboBoxEstado(paisId, fnCallback) {
            var d1 = $.Deferred();
            buildCombo({ key: 86, pais: paisId }, $("[name=estado]"), null, false, true, false, function() {
                d1.resolve("resolve");
                setTimeout(function() {
                    $("[name=estado]").val('').trigger("chosen:updated");
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
                    $("[name=provincia]").val('').trigger("chosen:updated");
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
                    $("[name=regionProvincia]").val('').trigger("chosen:updated");
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
                    $("[name=tipoPuntoVenta]").val('').trigger("chosen:updated");
                }, 500);
            });
            return d1;
        }

        function fnListaPuntoVenta() {
            if (PuntoVentaCtrl.table) {
                PuntoVentaCtrl.table.fnDestroy();
            }
            var d2 = $.Deferred();
            $("#table-punto-venta").html('<tr class="even" style="color: white;"><td colspan="8" >Obteniendo data del servidor</td></tr>');
            var options = $.extend(true, {}, tableOptions, {
                "bProcessing": true,
                "bSort": false,
                //"bFilter": false,
                "bServerSide": true,
                "bJQueryUI": true,
                "bDestroy": true,
                "bAutoWidth": false,
                "sPaginationType": "full_numbers",
                "sAjaxSource": "Session",
                "fnServerData": function(sSource, aoData, fnCallback, oSettings) {
                    aoData.push({ "name": "key", "value": 84 });
                    $.ajax({
                        "dataType": 'json',
                        "type": "POST",
                        "url": sSource,
                        "data": aoData,
                        "success": function(oaData) {
                            fnCallback(oaData);
                        },
                        "error": function(jqXHR, textStatus, errorThrown) {
                            alert(mensajeError);
                        },
                        "complete": function() {
                            d2.resolve("resolve");
                        }
                    });
                },
                "fnInitComplete": function(a) {
                    //$(".dataTables_filter").hide();
                },
                "aoColumns": [
                    { "sClass": "left", "sWidth": "10%" },
                    { "sClass": "left", "sWidth": "5%" },
                    { "sClass": "left", "sWidth": "10%" },
                    { "sClass": "left", "sWidth": "30%" },
                    { "sClass": "center", "sWidth": "10%" },
                    { "sClass": "right", "sWidth": "10%" },
                    { "sClass": "left", "sWidth": "15%" },
                    { "sClass": "right", "sWidth": "10%" }
                ]
            });

            PuntoVentaCtrl.table = $("#table-punto-venta").parent("table").dataTable(options);
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
                $("[name=tipoPuntoVenta]").val('').trigger("chosen:updated");
                $("[name=pais]").val('').trigger("chosen:updated");
                $("[name=estado]").val('').trigger("chosen:updated");
                $("[name=provincia]").val('').trigger("chosen:updated");
                $("[name=regionProvincia]").val('').trigger("chosen:updated");
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
                        $("[name=estado]").trigger("chosen:updated");
                    });
                    fnComboBoxProvincia(data.model.estado, function() {
                        $("#edit_provincia").val(data.model.provincia);
                        $("[name=provincia]").trigger("chosen:updated");
                    });
                    fnComboBoxRegionProvincia(data.model.provincia, function() {
                        $("#edit_regionProvincia").val(data.model.regionProvincia);
                        $("[name=regionProvincia]").trigger("chosen:updated");
                    });
                }
                setTimeout(function() {
                    $("[name=tipoPuntoVenta]").trigger("chosen:updated");
                    $("[name=pais]").trigger("chosen:updated");
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
            $("[name=estado]").html('').trigger("chosen:updated");
            $("[name=provincia]").html('').trigger("chosen:updated");
            $("[name=regionProvincia]").html('').trigger("chosen:updated");
        }

        PuntoVentaCtrl.fnEliminarPuntoVenta = fnEliminarPuntoVenta;
        PuntoVentaCtrl.fnConsultarPuntoVenta = fnConsultarPuntoVenta;

        $("#form-new-punto-venta").on("submit", fnCrearPuntoVenta);
        $("#form-edit-punto-venta").on("submit", fnModificarPuntoVenta);
        $('input[name=saldoFechahora]').datetimepicker({ locale: 'es' });

        $(".cancelarNewPuntoVenta").on("click", cleanFormNewPuntoVenta);

        $("select[name=pais]").on("change", function(e) {
            $("[name=estado]").html('').trigger("chosen:updated");
            $("[name=provincia]").html('').trigger("chosen:updated");
            $("[name=regionProvincia]").html('').trigger("chosen:updated");

            if (e.target.value) {
                fnComboBoxEstado(e.target.value);
            }
        });

        $("select[name=estado]").on("change", function(e) {
            $("[name=provincia]").html('').trigger("chosen:updated");
            $("[name=regionProvincia]").html('').trigger("chosen:updated");
            if (e.target.value) {
                fnComboBoxProvincia(e.target.value);
            }
        });

        $("select[name=provincia]").on("change", function(e) {
            $("[name=regionProvincia]").html('').trigger("chosen:updated");
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