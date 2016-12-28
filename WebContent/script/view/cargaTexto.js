var CargaTextoCtrl;
$(document).ready(function() {
    (function(CargaTextoCtrl) {

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
                            $("#nombreArchivo").text(data.resumen.nombreArchivo);
                            $("#registrosProcesados").text(data.resumen.registrosProcesados);
                            $("#viewDetails").modal('show');
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
    })(CargaTextoCtrl || (CargaTextoCtrl = {}));
});