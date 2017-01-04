var RespuestaCtrl;
$(document).ready(function() {
    (function(RespuestaCtrl) {
        "use strict"

        function fnListaRespuesta() {
            buildFormPost({ key: 42 }, function(data) {
                if (RespuestaCtrl.table) {
                    RespuestaCtrl.table.fnDestroy();
                }
                createTable(data.lista, "table-respuesta");
                var options = $.extend(true, {}, tableOptions, {
                    "aoColumns": [
                        { "sClass": "left", "bSortable": false },
                        { "sClass": "left", "bSortable": true },
                        { "sClass": "left", "bSortable": true },
                        { "sClass": "center", "bSortable": false },
                        { "sClass": "center", "bSortable": false },
                        { "sClass": "center", "bSortable": false }
                    ]
                });

                RespuestaCtrl.table = $("#table-respuesta").parent("table").dataTable(options);

            }, true);
        }

        function fnCrearRespuesta(e) {
            e.preventDefault();
            e.stopPropagation();
            var frmValidate = new FormValidate(e.target);
            if (frmValidate.validate()) {
                buildFormPost($(this).serialize(), function() {
                    frmValidate.clean();
                    fnListaRespuesta();
                    $("#newRespuesta").modal("hide");
                }, true);
            } else {
                noty({ text: "¡ Complete los campos requeridos !", type: 'warning', timeout: 3000 });
            }
        }

        function fnConsultarRespuesta(respuestaId) {
            $("#edit_respuestaId").val(respuestaId);
            var param = {};
            param.respuestaId = respuestaId;
            param.key = 40;
            buildFormPost(param, function(data) {
                for (var item in data.model) {
                    if (typeof(data.model[item]) === "boolean") {
                        $("#edit_" + item).prop("checked", data.model[item]);
                    } else {
                        $("#edit_" + item).val(data.model[item]);
                    }
                }
                $("#editRespuesta").modal("show");
            }, true);
        }

        function fnModificarRespuesta(e) {
            e.preventDefault();
            e.stopPropagation();
            var frmValidate = new FormValidate(e.target);
            if (frmValidate.validate()) {
                buildFormPost($(this).serialize(), function() {
                    frmValidate.clean();
                    fnListaRespuesta();
                    $("#editRespuesta").modal("hide");
                }, true);
            } else {
                noty({ text: "¡ Complete los campos requeridos !", type: 'warning', timeout: 3000 });
            }
        }

        function fnEliminarRespuesta(respuestaId) {
            var param = {};
            param.respuestaId = respuestaId;
            param.key = 41;
            alertify.confirm("<h3>¿Esta seguro de eliminar este registro?</h3>", function(e) {
                if (e) {
                    buildFormPost(param, function() {
                        fnListaRespuesta();
                    });
                }
            });
        }

        RespuestaCtrl.fnEliminarRespuesta = fnEliminarRespuesta;
        RespuestaCtrl.fnConsultarRespuesta = fnConsultarRespuesta;

        $("#form-new-respuesta").on("submit", fnCrearRespuesta);
        $("#form-edit-respuesta").on("submit", fnModificarRespuesta);
        fnListaRespuesta();
    })(RespuestaCtrl || (RespuestaCtrl = {}));
});