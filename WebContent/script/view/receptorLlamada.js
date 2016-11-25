var ReceptorCtrl;
$(document).ready(function() {
    (function(ReceptorCtrl) {

        function fnListaReceptor() {
            buildFormPost({ key: 36 }, function(data) {

                $("#table-receptor").parent("table").dataTable().fnDestroy();

                createTable(data.lista, "table-receptor");
                var options = $.extend(true, {}, tableOptions, {
                    "aoColumns": [
                        { "sClass": "left", "bSortable": false },
                        { "sClass": "left", "bSortable": true },
                        { "sClass": "left", "bSortable": true },
                        { "sClass": "center", "bSortable": false }
                    ]
                });

                $("#table-receptor").parent("table").dataTable(options);

            }, true);
        }

        function fnCrearReceptor(e) {
            e.preventDefault();
            e.stopPropagation();
            var frmValidate = new FormValidate(e.target);
            if (frmValidate.validate()) {
                buildFormPost($(this).serialize(), function() {
                    fnListaReceptor();
                    $("#newReceptor").modal("hide");
                }, true);
            } else {
                noty({ text: "¡ Complete los campos requeridos !", type: 'warning', timeout: 3000 });
            }
        }

        function fnConsultarReceptor(receptorId) {
            $("#edit_receptorId").val(receptorId);
            var param = {};
            param.receptorId = receptorId;
            param.key = 34;
            buildFormPost(param, function(data) {
                for (var item in data.model) {
                    if (typeof(data.model[item]) === "boolean") {
                        $("#edit_" + item).prop("checked", data.model[item]);
                    } else {
                        $("#edit_" + item).val(data.model[item]);
                    }
                }
                $("#editReceptor").modal("show");
            }, true);
        }

        function fnModificarReceptor(e) {
            e.preventDefault();
            e.stopPropagation();
            var frmValidate = new FormValidate(e.target);
            if (frmValidate.validate()) {
                buildFormPost($(this).serialize(), function() {
                    fnListaReceptor();
                    $("#editReceptor").modal("hide");
                }, true);
            } else {
                noty({ text: "¡ Complete los campos requeridos !", type: 'warning', timeout: 3000 });
            }
        }

        function fnEliminarReceptor(receptorId) {
            var param = {};
            param.receptorId = receptorId;
            param.key = 35;
            alertify.confirm("<h3>¿Esta seguro de eliminar este registro?</h3>", function(e) {
                if (e) {
                    buildFormPost(param, function() {
                        fnListaReceptor();
                    });
                }
            });
        }

        ReceptorCtrl.fnEliminarReceptor = fnEliminarReceptor;
        ReceptorCtrl.fnConsultarReceptor = fnConsultarReceptor;

        $("#form-new-receptor").on("submit", fnCrearReceptor);
        $("#form-edit-receptor").on("submit", fnModificarReceptor);
        fnListaReceptor();
    })(ReceptorCtrl || (ReceptorCtrl = {}));
});