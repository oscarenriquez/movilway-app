var CargaExcelCtrl;
$(document).ready(function() {
    (function(CargaExcelCtrl) {

        function fnComboBoxAgente() {
            var d1 = $.Deferred();
            buildCombo({ key: 93 }, $("[name=agentes]"), null, false, true, false, function() {
                d1.resolve("resolve");
            });
            return d1;
        }

        function fnUploadFile(e) {
            e.preventDefault();
            e.stopPropagation();
            var frmValidate = new FormValidate(e.target);
            if (frmValidate.validate()) {
                formData = new FormData(e.target);
                appWait.showPleaseWait();
                $.ajax({
                    url: 'Session',
                    type: 'POST',
                    data: formData,
                    cache: false,
                    dataType: 'json',
                    processData: false,
                    contentType: false, // Set content type to false as jQuery will tell the server its a query string request
                    success: function(data, textStatus, jqXHR) {
                        if (typeof data.isSuccess === 'undefined' || !data.isSuccess) {
                            // Handle errors here
                            if (typeof data.msg === 'undefined') {
                                noty({ text: "¡ El servidor no se encuentra disponible intente más tarde !", type: 'warning', timeout: 3000 });
                            } else {
                                noty({ text: data.msg, type: 'warning', timeout: 3000 });
                            }
                        } else {
                            // Success so call function to process the form
                            frmValidate.clean();
                            noty({ text: data.msg, type: 'success', timeout: 3000 });
                            setTimeout(function() {
                                $("[name=agentes]").trigger("chosen:updated");
                            }, 500);

                            $("#nombreArchivo").text(data.resumen.nombreArchivo);
                            $("#registrosProcesados").text(data.resumen.registrosProcesados);
                            if (data.resumen.generaOrden && data.resumen.generaOrden === true) {
                                var alerta = '<div class="alert alert-success alert-dismissible" role="alert"> ' +
                                    '   <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> ' +
                                    '   <strong>Ordenes de Llamada!</strong> se generaron ordenes de llamada en base al archivo subido!!' +
                                    '</div> ';
                                $("#content-alert").html("").append(alerta);
                                $("#content-campana").show();
                                $("#ordenesLlamada").text(data.resumen.ordenesLlamada);
                                $("#campanaObservaciones").text(data.resumen.campanaObservaciones);
                                $("#campanaFechaInicio").text(data.resumen.campanaFechaInicio);
                            } else {
                                var alerta = '<div class="alert alert-warning alert-dismissible" role="alert"> ' +
                                    '   <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> ' +
                                    '   <strong>No se generaron ordenes de llamada</strong>' +
                                    '</div> ';
                                $("#content-alert").html("").append(alerta);
                            }

                            $("#viewDetails").modal('show');
                            $("#content-alert").show();
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        // Handle errors here
                        noty({ text: "¡ El servidor no se encuentra disponible intente más tarde, Error: " + textStatus + " !", type: 'error', timeout: 3000 });
                    },
                    complete: function(jqXHR, textStatus) {
                        // STOP A LOADING SPINNER HERE
                        appWait.hidePleaseWait();
                    }
                });
            } else {
                noty({ text: "¡ Complete los campos requeridos !", type: 'warning', timeout: 3000 });
            }

        }

        $("#file-form").on("submit", fnUploadFile);

        fnComboBoxAgente();
    })(CargaExcelCtrl || (CargaExcelCtrl = {}));
});