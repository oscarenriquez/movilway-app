var TipoCampanaCtrl;
$(document).ready(function() {
    (function(TipoCampanaCtrl) {

        function fnListaTipoCampana() {
            buildFormPost({ key: 54 }, function(data) {

                $("#table-tipocampana").parent("table").dataTable().fnDestroy();

                createTable(data.lista, "table-tipocampana");
                var options = $.extend(true, {}, tableOptions, {
                    "aoColumns": [
                        { "sClass": "left", "bSortable": false },
                        { "sClass": "left", "bSortable": true },
                        { "sClass": "center", "bSortable": false }
                    ]
                });

                $("#table-tipocampana").parent("table").dataTable(options);

            }, true);
        }

        function fnCrearTipoCampana(e) {
            e.preventDefault();
            e.stopPropagation();
            var frmValidate = new FormValidate(e.target);
            if (frmValidate.validate()) {
                buildFormPost($(this).serialize(), function() {
                    frmValidate.clean();
                    fnListaTipoCampana();
                    $("#newTipoCampana").modal("hide");
                }, true);
            } else {
                noty({ text: "¡ Complete los campos requeridos !", type: 'warning', timeout: 3000 });
            }
        }

        function fnConsultarTipoCampana(tipocampanaId) {
            $("#edit_tipocampanaId").val(tipocampanaId);
            var param = {};
            param.tipocampanaId = tipocampanaId;
            param.key = 52;
            buildFormPost(param, function(data) {
                for (var item in data.model) {
                    if (typeof(data.model[item]) === "boolean") {
                        $("#edit_" + item).prop("checked", data.model[item]);
                    } else {
                        $("#edit_" + item).val(data.model[item]);
                    }
                }
                $("#editTipoCampana").modal("show");
            }, true);
        }

        function fnModificarTipoCampana(e) {
            e.preventDefault();
            e.stopPropagation();
            var frmValidate = new FormValidate(e.target);
            if (frmValidate.validate()) {
                buildFormPost($(this).serialize(), function() {
                    frmValidate.clean();
                    fnListaTipoCampana();
                    $("#editTipoCampana").modal("hide");
                }, true);
            } else {
                noty({ text: "¡ Complete los campos requeridos !", type: 'warning', timeout: 3000 });
            }
        }

        function fnEliminarTipoCampana(tipocampanaId) {
            var param = {};
            param.tipocampanaId = tipocampanaId;
            param.key = 53;
            alertify.confirm("<h3>¿Esta seguro de eliminar este registro?</h3>", function(e) {
                if (e) {
                    buildFormPost(param, function() {
                        fnListaTipoCampana();
                    });
                }
            });
        }

        TipoCampanaCtrl.fnEliminarTipoCampana = fnEliminarTipoCampana;
        TipoCampanaCtrl.fnConsultarTipoCampana = fnConsultarTipoCampana;

        $("#form-new-tipocampana").on("submit", fnCrearTipoCampana);
        $("#form-edit-tipocampana").on("submit", fnModificarTipoCampana);
        fnListaTipoCampana();
    })(TipoCampanaCtrl || (TipoCampanaCtrl = {}));
});