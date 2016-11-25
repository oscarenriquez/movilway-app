var PaisCtrl;
var EstadoCtrl;
$(document).ready(function() {
    // Pais Controller
    (function(PaisCtrl, EstadoCtrl) {

        function fnListaPais() {
            buildFormPost({ key: 24 }, function(data) {

                $("#table-pais").parent("table").dataTable().fnDestroy();

                createTable(data.lista, "table-pais");
                var options = $.extend(true, {}, tableOptions, {
                    "aoColumns": [
                        { "sClass": "left", "bSortable": false },
                        { "sClass": "left", "bSortable": true },
                        { "sClass": "left", "bSortable": true }
                    ]
                });

                $("#table-pais").parent("table").dataTable(options);

            }, true);
        }

        function fnCrearPais(e) {
            e.preventDefault();
            e.stopPropagation();
            var frmValidate = new FormValidate(e.target);
            if (frmValidate.validate()) {
                buildFormPost($(this).serialize(), function() {
                    fnListaPais();
                    $("#newPais").modal("hide");
                }, true);
            } else {
                noty({ text: "¡ Complete los campos requeridos !", type: 'warning', timeout: 3000 });
            }
        }

        function fnConsultarPais(paisId) {
            $("#edit_paisId").val(paisId);
            var param = {};
            param.paisId = paisId;
            param.key = 22;
            buildFormPost(param, function(data) {
                for (var item in data.model) {
                    if (typeof(data.model[item]) === "boolean") {
                        $("#edit_" + item).prop("checked", data.model[item]);
                    } else {
                        $("#edit_" + item).val(data.model[item]);
                    }
                }
                $("#editPais").modal("show");
            }, true);
        }

        function fnModificarPais(e) {
            e.preventDefault();
            e.stopPropagation();
            var frmValidate = new FormValidate(e.target);
            if (frmValidate.validate()) {
                buildFormPost($(this).serialize(), function() {
                    fnListaPais();
                    $("#editPais").modal("hide");
                }, true);
            } else {
                noty({ text: "¡ Complete los campos requeridos !", type: 'warning', timeout: 3000 });
            }
        }

        function fnEliminarPais(paisId) {
            var param = {};
            param.paisId = paisId;
            param.key = 23;
            alertify.confirm("<h3>¿Esta seguro de eliminar este registro?</h3>", function(e) {
                if (e) {
                    buildFormPost(param, function() {
                        fnListaPais();
                    });
                }
            });
        }

        function fnMostrarEstados(paisId, nombre) {
            EstadoCtrl.pais = paisId;
            $("#pais").val(paisId);
            $("#title-pais").html(nombre);
            $("#panel-pais").hide();
            $("#panel-estado").show();
            EstadoCtrl.fnListaEstado();
        }

        PaisCtrl.fnEliminarPais = fnEliminarPais;
        PaisCtrl.fnConsultarPais = fnConsultarPais;
        PaisCtrl.fnMostrarEstados = fnMostrarEstados;

        $("#form-new-pais").on("submit", fnCrearPais);
        $("#form-edit-pais").on("submit", fnModificarPais);
        fnListaPais();
    })(PaisCtrl || (PaisCtrl = {}), EstadoCtrl || (EstadoCtrl = {}));

    // Estado Controller
    (function(EstadoCtrl) {

        // Funciones Estado
        function fnListaEstado() {
            buildFormPost({ key: 13, pais: EstadoCtrl.pais }, function(data) {

                $("#table-estado").parent("table").dataTable().fnDestroy();

                createTable(data.lista, "table-estado");
                var options = $.extend(true, {}, tableOptions, {
                    "aoColumns": [
                        { "sClass": "left", "bSortable": false },
                        { "sClass": "left", "bSortable": true },
                        { "sClass": "left", "bSortable": true }
                    ]
                });

                $("#table-estado").parent("table").dataTable(options);

            }, true);
        }

        function fnCrearEstado(e) {
            e.preventDefault();
            e.stopPropagation();
            var frmValidate = new FormValidate(e.target);
            if (frmValidate.validate()) {
                buildFormPost($(this).serialize(), function() {
                    fnListaEstado();
                    $("#newEstado").modal("hide");
                }, true);
            } else {
                noty({ text: "¡ Complete los campos requeridos !", type: 'warning', timeout: 3000 });
            }
        }

        function fnConsultarEstado(estadoId) {
            $("#edit_estadoId").val(estadoId);
            var param = {};
            param.estadoId = estadoId;
            param.key = 11;
            buildFormPost(param, function(data) {
                for (var item in data.model) {
                    if (typeof(data.model[item]) === "boolean") {
                        $("#edit_" + item).prop("checked", data.model[item]);
                    } else {
                        $("#edit_" + item).val(data.model[item]);
                    }
                }
                $("#editEstado").modal("show");
            }, true);
        }

        function fnModificarEstado(e) {
            e.preventDefault();
            e.stopPropagation();
            var frmValidate = new FormValidate(e.target);
            if (frmValidate.validate()) {
                buildFormPost($(this).serialize(), function() {
                    fnListaEstado();
                    $("#editEstado").modal("hide");
                }, true);
            } else {
                noty({ text: "¡ Complete los campos requeridos !", type: 'warning', timeout: 3000 });
            }
        }

        function fnEliminarEstado(estadoId) {
            var param = {};
            param.estadoId = estadoId;
            param.key = 12;
            alertify.confirm("<h3>¿Esta seguro de eliminar este registro?</h3>", function(e) {
                if (e) {
                    buildFormPost(param, function() {
                        fnListaEstado();
                    });
                }
            });
        }

        function fnMostrarProvincias(estadoId, nombre) {
            EstadoCtrl.estado = estadoId;
            $("#estado").val(estadoId);
            $("#title-estado").html(nombre);
            $("#panel-provincia").show();
            EstadoCtrl.fnListaProvincia();
        }

        EstadoCtrl.fnEliminarEstado = fnEliminarEstado;
        EstadoCtrl.fnConsultarEstado = fnConsultarEstado;
        EstadoCtrl.fnListaEstado = fnListaEstado;
        EstadoCtrl.fnMostrarProvincias = fnMostrarProvincias;

        $("#form-new-estado").on("submit", fnCrearEstado);
        $("#form-edit-estado").on("submit", fnModificarEstado);

        // Funciones Provincia
        function fnListaProvincia() {
            buildFormPost({ key: 18, estado: EstadoCtrl.estado }, function(data) {

                $("#table-provincia").parent("table").dataTable().fnDestroy();

                createTable(data.lista, "table-provincia");
                var options = $.extend(true, {}, tableOptions, {
                    "aoColumns": [
                        { "sClass": "left", "bSortable": false },
                        { "sClass": "left", "bSortable": true },
                        { "sClass": "left", "bSortable": true }
                    ]
                });

                $("#table-provincia").parent("table").dataTable(options);

            }, true);
        }

        function fnCrearProvincia(e) {
            e.preventDefault();
            e.stopPropagation();
            var frmValidate = new FormValidate(e.target);
            if (frmValidate.validate()) {
                buildFormPost($(this).serialize(), function() {
                    fnListaProvincia();
                    $("#newProvincia").modal("hide");
                }, true);
            } else {
                noty({ text: "¡ Complete los campos requeridos !", type: 'warning', timeout: 3000 });
            }
        }

        function fnConsultarProvincia(provinciaId) {
            $("#edit_provinciaId").val(provinciaId);
            var param = {};
            param.provinciaId = provinciaId;
            param.key = 16;
            buildFormPost(param, function(data) {
                for (var item in data.model) {
                    if (typeof(data.model[item]) === "boolean") {
                        $("#edit_" + item).prop("checked", data.model[item]);
                    } else {
                        $("#edit_" + item).val(data.model[item]);
                    }
                }
                $("#editProvincia").modal("show");
            }, true);
        }

        function fnModificarProvincia(e) {
            e.preventDefault();
            e.stopPropagation();
            var frmValidate = new FormValidate(e.target);
            if (frmValidate.validate()) {
                buildFormPost($(this).serialize(), function() {
                    fnListaProvincia();
                    $("#editProvincia").modal("hide");
                }, true);
            } else {
                noty({ text: "¡ Complete los campos requeridos !", type: 'warning', timeout: 3000 });
            }
        }

        function fnEliminarProvincia(provinciaId) {
            var param = {};
            param.provinciaId = provinciaId;
            param.key = 17;
            alertify.confirm("<h3>¿Esta seguro de eliminar este registro?</h3>", function(e) {
                if (e) {
                    buildFormPost(param, function() {
                        fnListaProvincia();
                    });
                }
            });
        }

        EstadoCtrl.fnEliminarProvincia = fnEliminarProvincia;
        EstadoCtrl.fnConsultarProvincia = fnConsultarProvincia;
        EstadoCtrl.fnListaProvincia = fnListaProvincia;

        $("#form-new-provincia").on("submit", fnCrearProvincia);
        $("#form-edit-provincia").on("submit", fnModificarProvincia);

    })(EstadoCtrl || (EstadoCtrl = {}));
});