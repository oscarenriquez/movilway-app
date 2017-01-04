var ReporteCtrl;
$(document).ready(function() {
    (function(ReporteCtrl) {
        ReporteCtrl.chartOptions = {
            chart: {
                renderTo: 'divChart',
                type: 'column'
            },
            legend: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            title: {
                text: 'Puntos de venta para Abastecimiento'
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: [],
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Saldo (Q)'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td> <td style="padding:0"><b>Q {point.y:,.2f} </b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: []
        };

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

        function fnGeneraReporteExcel(e) {
            e.preventDefault();
            e.stopPropagation();
            var frmValidate = new FormValidate(document.getElementById("form-filter"));
            if (frmValidate.validate()) {
                $("#key").val(107);
                buildFormPost($("#form-filter").serialize(), function(data) {
                    var mobil = isMovil();
                    if (mobil) {
                        var paramMobil = [{ "name": "nombre", "value": data.nombreArchivo }];
                        $.post("Mobil", paramMobil, function(data) {
                            noty({ text: "El Reporte de Rendimiento, ha sido enviado a su cuenta de correo!!", type: "success", timeout: 6000 });
                        });
                    } else {
                        var form = $('<form method="post" class="fileDownloadForm" action="./Download">');
                        form.append($('<input type="hidden" name="nombre" value="' + data.nombreArchivo + '">'));
                        try {
                            form.on("submit", function(e) {
                                $.fileDownload($(this).prop('action'), {
                                    httpMethod: "POST",
                                    data: $(this).serialize()
                                });
                                e.preventDefault();
                            });
                            form.submit();
                        } catch (e) {
                            noty({ text: "El Reporte de Rendimiento, no se puede descargar en este momento!!", type: "warning", timeout: 6000 });
                        }
                    }
                }, true);
            } else {
                noty({ text: "¡ Complete todos los filtros !", type: 'warning', timeout: 3000 });
            }
        }

        function fnGeneraGrafica(e) {
            e.preventDefault();
            e.stopPropagation();
            $("#optButton").addClass("hide");
            var frmValidate = new FormValidate(document.getElementById("form-filter"));
            if (frmValidate.validate()) {
                $("#key").val(106);
                buildFormPost($("#form-filter").serialize(), function(data) {
                    $("#optButton").removeClass("hide");
                    ReporteCtrl.points = data.points;
                    ReporteCtrl.legend = data.legend;

                    var options = $.extend(true, {}, ReporteCtrl.chartOptions, {
                        subtitle: {
                            text: data.subtitle
                        },
                        xAxis: {
                            categories: data.categories,
                        },
                        series: data.series
                    });

                    ReporteCtrl.chart = new Highcharts.Chart(options);

                }, true);
            } else {
                noty({ text: "¡ Complete todos los filtros !", type: 'warning', timeout: 3000 });
            }
        }

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

        $("#reporte").on("click", fnGeneraReporteExcel);
        $("#filtrar").on("click", fnGeneraGrafica);

        $("#toggle").on('click', toggleLatlong);

        $("#cluster").on('click', toggleMarkerClusterer);
        $("#cerrarMapa").on('click', cerrarMapa);
        $("#showLegends").on("click", showDetalleMapa);

        $("#showMapa").on("click", function(e) {
            e.stopPropagation();
            e.preventDefault();

            try {
                $("#mapa").modal('show');
                setTimeout(function() {
                    createObjMap(ReporteCtrl.points, ReporteCtrl.legend);
                }, 1000);
            } catch (e) {}
        });

        fnComboBoxPais();

    })(ReporteCtrl || (ReporteCtrl = {}));
});