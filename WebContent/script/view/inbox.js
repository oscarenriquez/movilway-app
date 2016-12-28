var easyPie = {
    easing: 'easeOutBounce',
    barColor: '#1ca8dd',
    trackColor: 'rgba(0,0,0,0.5)',
    scaleColor: 'rgba(0,0,0,0.5)',
    lineCap: 'square',
    lineWidth: 8,
    size: 160,
    animate: 3000,
    onStep: function(from, to, percent) {
        $(this.el).find('.percent').text(Math.round(percent));
    }
};
var Chrono;
(function() {
    "use strict"
    Chrono = function() {
        var scope = this;
        this.timeinterval = 0;
        this.getTimeRemaining = function(initialTime) {
            var t = Date.parse(new Date()) - Date.parse(initialTime);
            var seconds = Math.floor((t / 1000) % 60);
            var minutes = Math.floor((t / 1000 / 60) % 60);
            var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
            return {
                'total': t,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
        };

        this.stopClock = function() {
            clearInterval(this.timeinterval);
        }

        this.initializeClock = function() {
            clearInterval(this.timeinterval);
            var initialTime = new Date();
            var id = "clockdiv"
            var clock = document.getElementById(id);
            var hoursSpan = clock.querySelector('.hours');
            var minutesSpan = clock.querySelector('.minutes');
            var secondsSpan = clock.querySelector('.seconds');

            function updateClock() {
                var t = scope.getTimeRemaining(initialTime);

                hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
                minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
                secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
            }

            if (hoursSpan && minutesSpan && secondsSpan) {
                updateClock();
                this.timeinterval = setInterval(updateClock, 1000);
            }
        };
    }
})();
var InboxCtrl;
$(document).ready(function() {
    (function(InboxCtrl) {
        "use strict"
        InboxCtrl.listadoCampaDetalle = new Array();
        InboxCtrl.detalleEnCurso = {};
        clearTimeout(InboxCtrl.llamadaEncurso);
        $("#toggle-sidebar").on("click", function() {
            $(this).find("i").toggleClass("glyphicon-chevron-right").toggleClass("glyphicon-chevron-left")
            $("#sidebar").toggleClass("toggled");
        });

        function fnComboBoxReceptor() {
            var d1 = $.Deferred();
            buildCombo({ key: 72 }, $("[name=receptorId]"), null, false, true, false, function() {
                d1.resolve("resolve");
            });
            return d1;
        }

        function fnComboBoxRespuesta() {
            var d1 = $.Deferred();
            buildCombo({ key: 71 }, $("[name=respuestaId]"), null, false, true, true, function() {
                d1.resolve("resolve");
            });
            return d1;
        }

        function fnComboPuntoVenta(paisId, estadoId, provinciaId) {
            var d1 = $.Deferred();
            buildCombo({ key: 78, paisId: paisId, estadoId: estadoId, provinciaId: provinciaId }, $(".combo-punto-venta"), null, false, true, false, function() {
                d1.resolve("resolve");
            });
            return d1;
        }

        function validaNuevaLlamada(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log(e);
            var value = e.currentTarget.value;
            var type = $("option[value=" + value + "]").data("type");
            if (value && type && type === true) {
                $("#content-fecha-programada").slideDown();
                $("#fechaProgramada").val(moment().add(1, "days").format("DD/MM/YYYY HH:mm"));
            } else {
                $("#content-fecha-programada").slideUp();
                $("#fechaProgramada").val("");
            }
        }

        function loadLlamada(detalle) {
            InboxCtrl.detalleEnCurso = detalle;
            var llamadaHTML = '<dl>' +
                '<dt>FECHA ULT. REGARGA</dt>' +
                '<dd>' + detalle.saldoFechahora + '</dd>' +
                '<dt>SALDO</dt>' +
                '<dd>Q ' + Number(detalle.saldo).formatMoney() + '</dd>' +
                '<dt>PUNTO ABASTECIMIENTO</dt>' +
                '<dd>Q ' + Number(detalle.puntoAbastecimiento).formatMoney() + '</dd>' +
                '</dl>';

            var addressHTML = '<address>' +
                '<strong>' + detalle.pais + '</strong><br>' +
                detalle.direccion + '<br>' +
                detalle.region + ', ' + detalle.estado + '<br>' +
                '<abbr title="Telefono">TEL:</abbr> ' + detalle.telefono +
                '</address>';

            var politicaHTML = '<figure><figcaption><i class="glyphicon glyphicon-star-empty"></i> Politicas</figcaption><ol>';
            for (var i = 0; i < detalle.politicas.length; i++) {
                var politica = detalle.politicas[i];
                politicaHTML += '<li value="' + politica.numLinea + '">' + politica.texto + '</li>'
            }
            politicaHTML += '</ol></figure>';

            if (detalle.isVenta) {
                $("#content-new-llamada-venta")
                    .find(".info-llamada").html("").append(llamadaHTML).end()
                    .find(".info-direccion").html("").append(addressHTML).end()
                    .find(".info-politica").html("").append(politicaHTML);

                $("#venta-detalleId").val(detalle.detalleId)
                $("#label-llamada-venta-punto").text(detalle.descripcion);
                $("#telefono-referencia-venta").text(detalle.telefono);
                $("#newLlamadaVenta").modal('show');
                fnComboPuntoVenta(detalle.paisId, detalle.estadoId, detalle.provinciaId);
            } else {
                $("#content-new-llamada")
                    .find(".info-llamada").html("").append(llamadaHTML).end()
                    .find(".info-direccion").html("").append(addressHTML).end()
                    .find(".info-politica").html("").append(politicaHTML);

                $("#detalleId").val(detalle.detalleId)
                $("#label-llamada-punto").text(detalle.descripcion);
                $("#telefono-referencia").text(detalle.telefono);
                $("#newLlamada").modal('show');
            }
        }

        function refreshCampanaDetalle() {
            $("#detalles").html('');
            for (var i = 0; i < InboxCtrl.listadoCampaDetalle.length; i++) {

                var detalle = InboxCtrl.listadoCampaDetalle[i];
                var detalleHTML = '';
                detalleHTML += '     <div class="pull-right"> ';
                detalleHTML += '     </div> ';
                detalleHTML += '     <div class="media-body"> ';
                detalleHTML += '         <div class="lgi-heading">' + detalle.descripcion + '</div> ';
                if (detalle.fechaProgramada) {
                    detalleHTML += '         <small class="lgi-text"><span class="label label-naranja">Llamada Programada: ' + detalle.fechaProgramada + '</span></small> ';
                }
                if (detalle.contacto) {
                    detalleHTML += '         <small class="lgi-text">' + detalle.contacto + '</small> ';
                }
                detalleHTML += '         <small class="lgi-text">' + detalle.tipoPuntoVenta + '</small> ';
                detalleHTML += '         <ul class="lgi-attrs"> ';
                detalleHTML += '             <li>Direcci&oacute;n: ' + detalle.direccion + '</li> ';
                detalleHTML += '             <li>Saldo: Q ' + Number(detalle.saldo).formatMoney() + '</li> ';
                detalleHTML += '             <li>Fecha: ' + detalle.saldoFechahora + '</li> ';
                detalleHTML += '         </ul> ';
                detalleHTML += '     </div> ';

                var $button = $('<button class="btn btn-success" type="button" />');
                $button.append('<span class="glyphicon glyphicon-earphone"></span>');
                $button.data('detalle', detalle);
                $button.on("click", function(e) {
                    var _this = $(e.currentTarget).data('detalle');
                    e.preventDefault();
                    InboxCtrl.loadLlamada(_this);
                });


                var $item = $("<div class='list-group-item media' />").append(detalleHTML);

                $item.find('.pull-right').append($button);

                $("#detalles").append($item);
            }
        }

        function loadCampana(campanaId) {
            clearTimeout(InboxCtrl.llamadaEncurso);
            InboxCtrl.currentCampana = campanaId;
            buildFormPost({ key: 74, campanaId: campanaId }, function(data) {
                $(".ah-label").text(data.textoReferencia);
                InboxCtrl.listadoCampaDetalle = data.detalles;
                refreshCampanaDetalle();
            }, true);
        }

        function cargarInforGeneral(e) {
            var d1 = $.Deferred();
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }

            buildFormPost({ key: 73 }, function(data) {
                $(".main-menu").html("");
                var campanas = data.campanas;
                var firstCampana = 0;
                for (var i = 0; i < campanas.length; i++) {
                    var campana = campanas[i];
                    if (i == 0) {
                        firstCampana = campana.campanaId;
                    }
                    var campanaHTML = '';
                    campanaHTML += ' <a href="javascript:InboxCtrl.loadCampana(' + campana.campanaId + ')" class="list-group-item media"> ';
                    campanaHTML += '     <div class="progress progress-tiny"> ';
                    campanaHTML += '         <div class="progress-bar progress-bar-info progress-bar-striped" role="progressbar" aria-valuenow="' + campana.porcentaje + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + campana.porcentaje + '%"> ';
                    campanaHTML += '             <span class="sr-only">' + campana.porcentaje + '% Complete (success)</span> ';
                    campanaHTML += '         </div> ';
                    campanaHTML += '     </div> ';
                    campanaHTML += '     <div class="lgi-heading">' + campana.descripcion + '</div> ';
                    campanaHTML += '     <small class="lgi-text">' + campana.observaciones + '</small> ';
                    campanaHTML += '     <div class="media-body"> ';
                    campanaHTML += '         <ul class="lgi-attrs"> ';
                    campanaHTML += '             <li>Fecha Inicio: ' + campana.fechahoraInicio + '</li> ';
                    campanaHTML += '             <li>Miembros: ' + campana.total + '</li> ';
                    campanaHTML += '             <li>llamadas: ' + campana.llamadas + '</li> ';
                    campanaHTML += '             <li>Estado: ' + campana.estatus + '</li> ';
                    campanaHTML += '         </ul> ';
                    campanaHTML += '     </div> ';
                    campanaHTML += ' </a> ';
                    $(".main-menu").append(campanaHTML)
                }

                setTimeout(function() {
                    $('.pie-chart-tiny').data('easyPieChart').update(data.porcentaje);
                }, 1500);
                d1.resolve(firstCampana);
            }, true);
            return d1;
        }

        function loadCurrentCampana() {
            loadCampana(InboxCtrl.currentCampana);
        }

        function loopLlamada() {
            buildFormPost({ key: 75, detalleId: $("#detalleId").val() }, function() {
                if (loopLlamada) {
                    InboxCtrl.llamadaEncurso = setTimeout(loopLlamada, 60000);
                }
            });
        }

        function iniciarLlamada(e) {
            e.preventDefault();
            e.stopPropagation();
            buildFormPost({ key: 75, detalleId: $("#detalleId").val() }, function(data) {
                $('#info-new-llamada').hide();
                $('#content-new-llamada').show();
                $("#cerrarLlamada").hide();
                $("#guardarLlamada").show();
                $("#content-fecha-programada").hide();
                InboxCtrl.chrono.initializeClock();
                if (loopLlamada) {
                    InboxCtrl.llamadaEncurso = setTimeout(loopLlamada, 60000);
                }
            }, true);
        }


        function saveLlamada(e) {
            e.preventDefault();
            e.stopPropagation();
            var frmValidate = new FormValidate(e.target);
            if (frmValidate.validate()) {
                clearTimeout(InboxCtrl.llamadaEncurso);
                buildFormPost($(e.target).serialize(), function() {
                    setTimeout(function() {
                        $("[name=respuestaId]").val("").trigger("chosen:updated");
                        $("[name=receptorId]").val("").trigger("chosen:updated");
                    }, 500);
                    frmValidate.clean();
                    InboxCtrl.chrono.stopClock();
                    if (InboxCtrl.listadoCampaDetalle.length <= 5) {
                        $.when(cargarInforGeneral()).then(function() {
                            loadCurrentCampana();
                        });
                    } else {
                        var index = -1;
                        for (var i = 0; i < InboxCtrl.listadoCampaDetalle.length; i++) {
                            if (InboxCtrl.listadoCampaDetalle[i].detalleId === InboxCtrl.detalleEnCurso.detalleId) {
                                index = i;
                                break;
                            }
                        }
                        if (index > -1) {
                            InboxCtrl.listadoCampaDetalle.splice(index, 1);
                        }
                        refreshCampanaDetalle();
                    }
                    $("#cerrarLlamada").show();
                    $("#guardarLlamada").hide();
                    $('#info-new-llamada').show();
                    $('#content-new-llamada').hide();
                    $("#content-fecha-programada").hide();
                    $("#newLlamada").modal("hide");
                }, true);
            } else {
                noty({ text: "¡ Complete los campos requeridos !", type: 'warning', timeout: 3000 });
            }
        }

        function iniciarLlamadaVenta(e) {
            e.preventDefault();
            e.stopPropagation();
            $('#info-new-llamada-venta').hide();
            $('#content-new-llamada-venta').show();
            $("#cerrarLlamadaVenta").hide();
            $("#guardarLlamadaVenta").show();
        }


        function saveLlamadaVenta(e) {
            e.preventDefault();
            e.stopPropagation();
            var frmValidate = new FormValidate(e.target);
            if (frmValidate.validate()) {
                clearTimeout(InboxCtrl.llamadaEncurso);
                buildFormPost($(e.target).serialize(), function() {
                    setTimeout(function() {
                        $(".combo-punto-venta").val("").trigger("chosen:updated");
                    }, 500);
                    frmValidate.clean();
                    $.when(cargarInforGeneral()).then(function() {
                        loadCurrentCampana();
                    });
                    $("#cerrarLlamadaVenta").show();
                    $("#guardarLlamadaVenta").hide();
                    $('#info-new-llamada-venta').show();
                    $('#content-new-llamada-venta').hide();
                    $("#newLlamadaVenta").modal("hide");
                }, true);
            } else {
                noty({ text: "¡ Complete los campos requeridos !", type: 'warning', timeout: 3000 });
            }
        }

        function cancelarLlamadaVenta(e) {
            e.preventDefault();
            e.stopPropagation();
            clearTimeout(InboxCtrl.llamadaEncurso);
            setTimeout(function() {
                $(".combo-punto-venta").val("").trigger("chosen:updated");
            }, 500);
            var frmValidate = new FormValidate(document.getElementById("form-new-llamada-venta"));
            frmValidate.clean();
            $("#cerrarLlamadaVenta").show();
            $("#guardarLlamadaVenta").hide();
            $('#info-new-llamada-venta').show();
            $('#content-new-llamada-venta').hide();
            $("#newLlamadaVenta").modal("hide");
        }

        $('.pie-chart-tiny').easyPieChart(easyPie);

        InboxCtrl.loadCurrentCampana = loadCurrentCampana;
        InboxCtrl.loadCampana = loadCampana;
        InboxCtrl.loadLlamada = loadLlamada;
        InboxCtrl.chrono = new Chrono();

        $.when(cargarInforGeneral()).then(function(firstCampana) {
            if (firstCampana > 0) {
                loadCampana(firstCampana);

                $.when(fnComboBoxReceptor()).then(function() {
                    fnComboBoxRespuesta();
                });
            } else {
                noty({ text: "¡ No tiene campa&ntilde;as asignadas !", type: 'warning', timeout: 3000 });
            }
        });

        $("select[name=respuestaId]").on("change", validaNuevaLlamada);
        $("#form-new-llamada").on("submit", saveLlamada);
        $("#iniciarLlamada").on("click", iniciarLlamada);

        $("#form-new-llamada-venta").on("submit", saveLlamadaVenta);
        $("#iniciarLlamadaVenta").on("click", iniciarLlamadaVenta);

        $("#cerrarLlamadaVenta").on("click", cancelarLlamadaVenta);

        $("#datetimepicker_fechaProgramada").datetimepicker({ locale: "es" });

    })((InboxCtrl || (InboxCtrl = {})));
});