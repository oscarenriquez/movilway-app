var intervalsDeclared = new Array();
var itemsAppStorage = new Array();
var mensajeError = "No es posible atender su petición en este momento, por favor intente más tarde!!";
var ultMsjError = "ESTAMOS EXPERIMENTANDO PROBLEMAS TECNICOS, DISCULPE LOS INCONVENIENTES!!";
var contadorError = 0;

var tableOptions = {
    "bJQueryUI": true,
    "bDestroy": true,
    "bStateSave": true,
    "bAutoWidth": false,
    "sPaginationType": "full_numbers",
    "oLanguage": {
        "sSearch": "Busqueda por todos los campos:",
        "sProcessing": "Procesando...",
        "sLengthMenu": "Mostrar _MENU_ registros",
        "sZeroRecords": "No se encontraron resultados",
        "sInfo": "Mostrando desde _START_ hasta _END_ de _TOTAL_ registros",
        "sInfoEmpty": "Mostrando desde 0 hasta 0 de 0 registros",
        "sInfoFiltered": "(filtrado de _MAX_ registros en total)",
        "sInfoPostFix": "",
        "sUrl": "",
        "oPaginate": {
            "sFirst": "Primero",
            "sPrevious": "Anterior",
            "sNext": "Siguiente",
            "sLast": "Ultimo"
        }
    }
};

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

Number.prototype.formatMoney = function(c, d, t) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

function redirectError() {
    var a0 = window.location.pathname;
    window.location.pathname = a0.substring(0, a0.lastIndexOf("/")) + "/";
}

function logException(responseTxt, statusTxt, xhr) {
    contadorError++;
    if (contadorError > 3) {
        contadorError = 0;
        alert(ultMsjError);
        redirectError();
    } else {
        alert(mensajeError);
    }

    try {
        console.log("Error: " + xhr.status + ": " + xhr.statusText);
    } catch (e) {
        console.log(e);
    }

}

function fnRotateImage($img, nowRotate) {
    nowRotate += 90;
    $img.css("transform", "rotate(" + nowRotate + "deg)");
    return nowRotate;
}

function loadHtml($objContent, param, fnCallBack) {
    appWait.showPleaseWait();
    $objContent.load("./Session", param, function(responseTxt, statusTxt, xhr) {
        appWait.hidePleaseWait();
        if (fnCallBack != undefined && fnCallBack != "") {
            if (typeof fnCallBack == 'function' && fnCallBack !== null) {
                fnCallBack();
            }
        }
        if (statusTxt == "error") {
            logException(responseTxt, statusTxt, xhr);
        }
    });
}

function build(obj, event, key) {
    intervalCleaned();
    appWait.showPleaseWait();
    $("#principal").load("./Session", { "key": key }, function(responseTxt, statusTxt, xhr) {
        appWait.hidePleaseWait();
        if (statusTxt == "error") {
            logException(responseTxt, statusTxt, xhr);
        }
    });

}

function buildFormParam(obj, event, param) {
    intervalCleaned();
    appWait.showPleaseWait();
    $("#principal").load("./Session", param, function(responseTxt, statusTxt, xhr) {
        appWait.hidePleaseWait();
        if (statusTxt == "error") {
            logException(responseTxt, statusTxt, xhr);
        }
    });

}

function buildPanel(obj, event, key) {
    appWait.showPleaseWait();
    $("#menu").load("./Action", { "key": key }, function(responseTxt, statusTxt, xhr) {
        appWait.hidePleaseWait();
        if (!($('#menu-contenedor').is(':visible'))) {
            $('#showMenu').trigger('click');
        }
        $("#principal").html(' ');
        if (statusTxt == "error") {
            logException(responseTxt, statusTxt, xhr);
        }
    });

}

function buildFormPost(param, fnCallBack, valid) {
    appWait.showPleaseWait();
    $.post("./Session", param, function(data) {
        if (data.permiso) {
            if (data.isSuccess) {
                if (data.msg.length > 0) {
                    noty({ text: data.msg, type: 'success', timeout: 7000 });
                }
                if (fnCallBack !== undefined && fnCallBack !== null && typeof fnCallBack === 'function') {
                    if (valid) {
                        fnCallBack(data);
                    }
                }
            } else {
                noty({ text: data.msg + " !!", type: 'error', timeout: 7000 });
            }
        } else {
            noty({ text: data.msg + " !!", type: 'warning', timeout: 7000 });
        }
    }).fail(function(responseTxt, statusTxt, xhr) {
        appWait.hidePleaseWait();
        logException(responseTxt, statusTxt, xhr);
        return false;
    }).always(function() {
        appWait.hidePleaseWait();
        if (fnCallBack != undefined && fnCallBack != "") {
            if (typeof fnCallBack == 'function' && fnCallBack !== null) {
                if (!valid) {
                    fnCallBack();
                }
            }
        }
    });
}

function buildFormPostAT(param, fnCallBack) {
    appWait.showPleaseWait();
    $.post("./Action", param, function(data) {
        if (data.permiso) {
            if (data.isSuccess) {
                noty({ text: data.msg + " !!", type: 'success', timeout: 7000 });
            } else {
                noty({ text: data.msg + " !!", type: 'error', timeout: 7000 });
            }
        } else {
            noty({ text: data.msg + " !!", type: 'warning', timeout: 7000 });
        }
    }).fail(function(responseTxt, statusTxt, xhr) {
        appWait.hidePleaseWait();
        logException(responseTxt, statusTxt, xhr);
        return false;
    }).always(function() {
        appWait.hidePleaseWait();
        if (fnCallBack != undefined && fnCallBack != "") {
            if (typeof fnCallBack == 'function' && fnCallBack !== null) {
                fnCallBack();
            }
        }
    });
}

function buildForm(obj, key, id) {
    intervalCleaned();
    appWait.showPleaseWait();
    $("#principal").load("./Session", { "key": key, "id": id }, function(responseTxt, statusTxt, xhr) {
        appWait.hidePleaseWait();
        if (statusTxt == "error") {
            logException(responseTxt, statusTxt, xhr);
        }
    });

}

function buildFormBack2(obj, event, param) {
    intervalCleaned();
    appWait.showPleaseWait();
    $("#principal").load("./Session", param, function(responseTxt, statusTxt, xhr) {
        appWait.hidePleaseWait();
        if (statusTxt == "error") {
            logException(responseTxt, statusTxt, xhr);
        }
    });

}

function buildFormBack(key, id) {
    intervalCleaned();
    appWait.showPleaseWait();
    $("#principal").load("./Session", { "key": key, "id": id }, function(responseTxt, statusTxt, xhr) {
        appWait.hidePleaseWait();
        if (statusTxt == "error") {
            logException(responseTxt, statusTxt, xhr);
        }
    });
}

function buildServidor(obj, event, key) {
    /*window.location = "./Session?key="+key;*/
    $(window).attr('location', "./Session", { "key": key }, function(responseTxt, statusTxt, xhr) {
        if (statusTxt == "error") {
            logException(responseTxt, statusTxt, xhr);
        }
    });

}

function buildSummary(key, id, str) {
    intervalCleaned();
    appWait.showPleaseWait();
    $("#principal").load("./Session", { "key": key, "id": id, "str": str }, function(responseTxt, statusTxt, xhr) {
        appWait.hidePleaseWait();
        if (statusTxt == "error") {
            logException(responseTxt, statusTxt, xhr);
        }
    });
}

function setLocalStorage(id, val) {
    if (!itemsAppStorage.contains(id)) {
        itemsAppStorage.push(id);
    }
    localStorage.setItem(id, val);
}

function getLocalStorage(id) {
    return localStorage.getItem(id);
}

function removeLocalStorage(id) {
    var idx = itemsAppStorage.indexOf(id);
    if (idx > -1) {
        itemsAppStorage.splice(idx, 1);
    }
    localStorage.removeItem(id);
}

function clearAppStorage() {
    for (var i = 0; i < itemsAppStorage.length; i++) {
        removeLocalStorage(itemsAppStorage[i])
    }
}

var appWait;
appWait = appWait || (function() {
    var pleaseWaitDiv = $('<div class="modal no-seleccionable" style="cursor:wait;overflow:hidden;background:rgba(0,0,0,0.8);" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" aria-hidden="true" data-keyboard="false" id="myModal"> ' +
        '<div class="modal-dialog" style="margin-top:13%;width:100%;"> ' +
        '	<div> ' +
        '   <div class="modal-body"> ' +
        '      <h1 class="text-center" style="font-weight: bold; color: #2187e7;">Procesando</h1> ' +
        '		<div class="content"> ' +
        '			<div class="circle"></div> ' +
        '			<div class="circle1"></div> ' +
        '		</div> ' +
        '  	</div> ' +
        '	</div> ' +
        '</div> ' +
        '</div>');

    var pleaseWaitDiv2 = $('<div class="modal no-seleccionable" style="cursor:wait;overflow:hidden;background:rgba(0,0,0,0.8);"  role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" aria-hidden="true" data-keyboard="false" id="myModal2"> ' +
        '<div class="modal-dialog" style="margin-top:13%;width:100%;"> ' +
        '	<div> ' +
        '   <div class="modal-body"> ' +
        '      <h1 class="text-center" style="font-weight: bold; color: #2187e7;">Procesando</h1> ' +
        '		<div class="content"> ' +
        '			<div class="circle"></div> ' +
        '			<div class="circle1"></div> ' +
        '		</div> ' +
        '  	</div> ' +
        '	</div> ' +
        '</div> ' +
        '</div>');

    return {
        showPleaseWait: function() {
            pleaseWaitDiv.modal();
        },
        hidePleaseWait: function() {
            if (this.isVisible()) {
                pleaseWaitDiv.modal('hide');
            }
        },
        isVisible: function() {
            if (pleaseWaitDiv.is(":visible")) {
                return true;
            }
            return false;
        },
        showPleaseWait2: function() {
            pleaseWaitDiv2.modal();
        },
        hidePleaseWait2: function() {
            if (this.isVisible2()) {
                pleaseWaitDiv2.modal('hide');
            }
        },
        isVisible2: function() {
            if (pleaseWaitDiv2.is(":visible")) {
                return true;
            }
            return false;
        }
    };
})();

function change(pbar, plus, limit) {
    setTimeout(function() {
        if (pbar < limit) {
            pbar = parseInt($('.progress-bar').attr('aria-valuenow'));
            var aux = pbar + plus;
            $('.progress-bar').attr('aria-valuenow', aux);
            $('.progress-bar').css('width', aux + '%');
            change(pbar, plus, limit);
        } else {
            appWait.hidePleaseWait();
            $('.progress-bar').attr('aria-valuenow', 0);
            $('.progress-bar').css('width', '0%');
        }
    }, 1000);
}

function changeBar(seg) {
    if (seg != "" && seg != undefined) {
        var plus = 100 / parseInt(seg);
        var limit = 100;
        var pbar = 0;
        change(pbar, plus, limit);
    }
}

function wait(seg) {
    appWait.showPleaseWait();
    changeBar(seg);
}

/**
 * Funcion para llamar un servicio de combo
 * @param param
 * @param obj
 * @param sele
 * @param isSelec
 * @param isChosen
 * @param isRel
 * @param fnCallBack
 */
function buildCombo(param, obj, sele, isSelec, isChosen, isRel, fnCallBack) {
    $.post("./Session", param, function(data) {
        if (data.permiso) {
            if (data.isSuccess) {
                if (isRel) {
                    llenaComboRel(data.formulario.comboBox, obj, sele, isSelec, isChosen);
                } else {
                    llenaComboPPL(data.formulario.comboBox, obj, sele, isSelec, isChosen);
                }
            } else {
                alertify.error(data.msg);
            }
        } else {
            alertify.warning(data.msg);
        }
    }).fail(function(responseTxt, statusTxt, xhr) {
        logException(responseTxt, statusTxt, xhr);
        return false;
    }).always(function() {
        if (fnCallBack != undefined && fnCallBack != "") {
            if (typeof fnCallBack == 'function' && fnCallBack !== null) {
                fnCallBack();
            }
        }
    });
}

/**
 * Funcion para llenar un elemento tipo select de Html
 * @param data: objeto tipo array que contiene la data para llenar comobo.
 * @param obj: objeto tipo $jQuery que hacer referencia al select.
 * @param sele: valor que se desea seleccionar, puede ser multiple (Array)
 * @param isSelec: boolean para saber si aplica la seleccion
 * @param isChosen. boolean para saber si aplica plugin 'Chosen'
 */
function llenaComboPPL(data, obj, sele, isSelec, isChosen) {
    obj.html("");
    $.each(data, function(index, el) {
        if (isSelec) {
            if (sele instanceof Array) {
                var opt = "";
                opt = "<option value='" + el.ID + "'>" + el.DESCRIPCION.toUpperCase() + "</option> ";
                for (var i = 0; i < sele.length; i++) {
                    if (sele[i] == el.ID) {
                        opt = "<option value='" + el.ID + "' selected>" + el.DESCRIPCION.toUpperCase() + "</option> ";
                        break;
                    }
                }
                obj.append(opt);
            } else {
                if (el.ID == sele) {
                    obj.append("<option value='" + el.ID + "' selected>" + el.DESCRIPCION.toUpperCase() + "</option> ");
                } else {
                    obj.append("<option value='" + el.ID + "'>" + el.DESCRIPCION.toUpperCase() + "</option> ");
                }
            }
        } else {
            obj.append("<option value='" + el.ID + "'>" + el.DESCRIPCION.toUpperCase() + "</option> ");
        }

    });

    if (isChosen) {
        obj.chosen({ no_results_text: 'Oops!, no existe informacion con: ', width: "100%" });
    } else {
        obj.prepend("<option value=''>Seleccione una opcion</option> ");
    }
}

/**
 * Funcion para llenar un elemento tipo select de Html con referencia
 * @param data: objeto tipo array que contiene la data para llenar comobo.
 * @param obj: objeto tipo $jQuery que hacer referencia al select.
 * @param sele: valor que se desea seleccionar, puede ser multiple (Array)
 * @param isSelec: boolean para saber si aplica la seleccion
 * @param isChosen. boolean para saber si aplica plugin 'Chosen'
 */
function llenaComboRel(data, obj, sele, isSelec, isChosen) {
    obj.html("");
    $.each(data, function(index, el) {
        if (isSelec) {
            if (sele instanceof Array) {
                var opt = "";
                opt = "<option value='" + el.ID + "' data-extra='" + el.TYPE_EXTRA + "'>" + el.DESCRIPCION.toUpperCase() + "</option> ";
                for (var i = 0; i < sele.length; i++) {
                    if (sele[i] == el.ID) {
                        opt = "<option value='" + el.ID + "' data-extra='" + el.TYPE_EXTRA + "' selected>" + el.DESCRIPCION.toUpperCase() + "</option> ";
                        break;
                    }
                }
                obj.append(opt);
            } else {
                if (el.ID == sele) {
                    obj.append("<option value='" + el.ID + "' data-extra='" + el.TYPE_EXTRA + "' selected>" + el.DESCRIPCION.toUpperCase() + "</option> ");
                } else {
                    obj.append("<option value='" + el.ID + "' data-extra='" + el.TYPE_EXTRA + "'>" + el.DESCRIPCION.toUpperCase() + "</option> ");
                }
            }
        } else {
            obj.append("<option value='" + el.ID + "' data-extra='" + el.TYPE_EXTRA + "'>" + el.DESCRIPCION.toUpperCase() + "</option> ");
        }

    });

    if (isChosen) {
        obj.chosen({ no_results_text: 'Oops!, no existe informacion con: ', width: "100%" });
    } else {
        obj.prepend("<option value=''>Seleccione una opcion</option> ");
    }
}

function llenaCombo(data, obj, sele, isSelec, isChosen) {
    obj.html("");
    obj.html("<option value='0'>Seleccione una opcion</option> ");
    obj.html("<option value=''>Seleccione una opcion</option> ");
    $.each(data, function(index, el) {
        if (isSelec) {
            if (sele instanceof Array) {
                var opt = "";
                opt = "<option value='" + el.ID + "'>" + el.DESCRIPCION + "</option> ";
                for (var i = 0; i < sele.length; i++) {
                    if (sele[i] == el.ID) {
                        opt = "<option value='" + el.ID + "' selected>" + el.DESCRIPCION + "</option> ";
                        break;
                    }
                }
                obj.append(opt);
            } else {
                if (el.ID == sele) {
                    obj.append("<option value='" + el.ID + "' selected>" + el.DESCRIPCION + "</option> ");
                } else {
                    obj.append("<option value='" + el.ID + "'>" + el.DESCRIPCION + "</option> ");
                }
            }
        } else {
            obj.append("<option value='" + el.ID + "'>" + el.DESCRIPCION + "</option> ");
        }

    });

    if (isChosen) {
        obj.chosen({ no_results_text: 'Oops!, no existe informacion con: ', width: "100%" });
    }
}

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function isCorrectText(text) {
    /*var nameRegex = /^[a-zA-Z\u00E0-\u00FC0-9_.,:;\s]+(([\'\,\.\- ][a-zA-Z0-9_])?[a-zA-Z0-9_]*)*$/;
    return nameRegex.test(text);*/

    return true;
}

function isNumber(number) {
    if (!isNaN(number)) {
        return true;
    }
    return false;
}

function isFecha(text) {
    var nameRegex = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
    return nameRegex.test(text);
}

function isDecimal(text) {
    var nameRegex = /^\d{1,3}\,\d{1,2}\/\d{2,4}$/;
    return nameRegex.test(text);
}

function isZonas(text) {
    var nameRegex = /^\d{1,2}[,{0,1}\s\d{1,2}+]*$/;

    return nameRegex.test(text);
}

function vParam(param) {
    if (param !== undefined && param !== null && param !== "") {
        if (isNaN(param) && param.length > 0) {
            return true;
        }
        if (param.toString() > 0) {
            return true;
        }
    }
    return false;
}


function isDireccionIp(IPText) {
    var validIp = false;
    var RegE = /^\d{1,3}[.]\d{1,3}[.]\d{1,3}[.]\d{1,3}$/;
    if (RegE.test(IPText)) {
        var ipParts = IPText.split(".");
        if (ipParts.length == 4) {
            var i = 0;
            for (i = 0; i < 4; i++) {
                var TheNum = parseInt(ipParts[i]);
                if (TheNum >= 0 && TheNum <= 255) {} else { break; }
            }
            if (i == 4) { validIp = true; }
        }
    }
    return validIp;
}

function capitalLetter(str) {
    return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
}

function validarDecimal(e, thix) {
    var keynum = window.event ? window.event.keyCode : e.which;
    if (document.getElementById(thix.id).value.indexOf('.') != -1 && keynum == 46)
        return false;
    if ((keynum == 8 || keynum == 48 || keynum == 46))
        return true;
    if (keynum <= 47 || keynum >= 58) return false;
    return /\d/.test(String.fromCharCode(keynum));
}

function validarEntero(e) {
    var keynum = window.event ? window.event.keyCode : e.which;
    if ((keynum == 8 || keynum == 48))
        return true;
    if (keynum <= 47 || keynum >= 58) return false;
    return /\d/.test(String.fromCharCode(keynum));
}

function capitalizeName(str) {
    var regresa = new String();
    var fullName = str.split(" ");
    var total = fullName.length - 1;
    for (var i = 0; i < fullName.length; i++) {
        if (i < total) {
            regresa += fullName[i].charAt(0).toUpperCase() + fullName[i].substring(1).toLowerCase() + " ";
        } else {
            regresa += fullName[i].charAt(0).toUpperCase() + fullName[i].substring(1).toLowerCase();
        }
    }
    return regresa;
}

function intervalCleaned() {
    for (var i = 0; i < intervalsDeclared.length; i++) {
        clearInterval(intervalsDeclared[i]);
    }
}

function isMovil() {
    var navegador = navigator.userAgent;
    var ios = navegador.match(/like Mac OS X/i);
    var android = navegador.match(/Mobile/i);
    var chrome = navegador.match(/Chrome/i);

    if (ios) {
        return true;
    } else if (android) {
        return true;
    } else if (chrome) {
        return false;
    } else {
        return false;
    }
}

function fillTable($obj, data, total) {
    $obj.find('tbody').html(' ');
    $obj.find('tfoot').html(' ');
    $.each(data, function(idx, elem) {
        if (total !== undefined) {
            if (idx == 0) {
                var row = document.createElement("tr");
                var itemTotal = document.createElement("th");
                var itemMonto = document.createElement("th");
                itemTotal.style.textAlign = "center";
                itemTotal.style.fontWeight = "bold";
                itemTotal.textContent = "TOTAL";
                row.appendChild(itemTotal);
                itemMonto.style.textAlign = "center";
                itemMonto.style.fontWeight = "bold";
                itemMonto.textContent = total;
                row.appendChild(itemMonto);
                var cant = (elem.length - 2);
                for (var i = 0; i < cant; i++) {
                    var itemAux = document.createElement("th");
                    itemAux.style.textAlign = "center";
                    itemAux.textContent = "--";
                    row.appendChild(itemAux);
                }
                $obj.find('tfoot').append(row);
            }
        }

        var row = document.createElement("tr");
        $.each(elem, function(i, e) {
            var item = document.createElement("td");
            item.textContent = e;
            row.appendChild(item);
        });
        $obj.find('tbody').append(row);
    });
}

/*****Limpieza***
 * 
 * element = div Pdre
 * ***/
function clearChildren(element) {
    var div = document.getElementById(element);
    var nodelistInput = div.getElementsByTagName("input");
    var nodelistTextTarea = div.getElementsByTagName("textarea");
    var nodelistRadio = div.getElementsByTagName("input[type=radio]");
    var nodelistselect = div.getElementsByTagName("select");
    var nodelistCheck = div.getElementsByTagName("input[type=checkbox]");

    var i = 0;

    if (nodelistInput.length > 0) {
        for (i = 0; i < nodelistInput.length; i++) {
            nodelistInput[i].value = '';
        }
    }

    if (nodelistTextTarea.length > 0) {
        for (i = 0; i < nodelistTextTarea.length; i++) {
            nodelistTextTarea[i].value = '';
        }
    }

    if (nodelistRadio.length > 0) {
        for (i = 0; i < nodelistRadio.length; i++) {
            nodelistRadio[i].checked = false;
        }
    }

    if (nodelistCheck.length > 0) {
        for (i = 0; i < nodelistCheck.length; i++) {
            nodelistCheck[i].checked = false;
        }
    }

    if (nodelistselect.length > 0) {
        for (i = 0; i < nodelistselect.length; i++) {
            nodelistselect[i].selectedIndex = 0;
        }
    }

    return true;
}

function createTable(data, elementId) {
    var table = document.getElementById(elementId);
    table.innerHTML = ""; // CLEAN
    for (var i = 0; i < data.length; i++) {
        var tr = document.createElement("TR");
        for (var j = 0; j < data[i].length; j++) {
            var td = document.createElement("TD");
            td.innerHTML = data[i][j];
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

var FormValidate;

(function() {

    FormValidate = function(formTarget) {

        this.formValidate = formTarget;
        this.inputElement = this.formValidate.getElementsByTagName('input');
        this.textAreaElement = this.formValidate.getElementsByTagName('textarea');
        this.selectElement = this.formValidate.getElementsByTagName('select');

        this.validate = function() {

            var nav = navigator.userAgent.toLocaleLowerCase(),
                emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/,
                digitsPattern = /^\d+$/,
                isValid = true;

            if (/safari/.test(nav) || /chrome/.test(nav)) {
                for (var i = 0; i < this.inputElement.length; i++) {
                    if (this.inputElement[i].required && this.inputElement[i].value === '') {
                        this.inputElement[i].style.border = '1px solid red';
                        isValid = false;
                    } else {
                        if (this.inputElement[i].type === 'email' &&
                            (this.inputElement[i].value).match(emailPattern) === null) {
                            this.inputElement[i].style.border = '1px solid red';
                            isValid = false;
                        } else if (this.inputElement[i].id === 'phone' &&
                            (this.inputElement[i].value).match(digitsPattern) === null) {
                            this.inputElement[i].style.border = '1px solid red';
                            isValid = false;
                        } else {
                            this.inputElement[i].style.border = 'none';
                        }
                    }
                }

                for (var i = 0; i < this.textAreaElement.length; i++) {
                    if (this.textAreaElement[i].required && this.textAreaElement[i].value === '') {
                        this.textAreaElement[i].style.border = '1px solid red';
                        isValid = false;
                    } else {
                        this.textAreaElement[i].style.border = 'none';
                    }
                }

                for (var i = 0; i < this.selectElement.length; i++) {
                    if (this.selectElement[i].required && this.selectElement[i].value === '') {
                        this.selectElement[i].style.border = '1px solid red';
                        isValid = false;
                    } else {
                        this.selectElement[i].style.border = 'none';
                    }
                }
            }
            return isValid;
        };

        this.clean = function() {
            for (var i = 0; i < this.inputElement.length; i++) {
                if (this.inputElement[i].type != 'hidden') {
                    if (this.inputElement[i].type == 'checkbox') {
                        this.inputElement[i].checked = false;
                    } else {
                        this.inputElement[i].value = '';
                    }
                }
            }

            for (var i = 0; i < this.textAreaElement.length; i++) {
                this.textAreaElement[i].value = '';
            }

            for (var i = 0; i < this.selectElement.length; i++) {
                this.selectElement[i].value = '';
                if (this.selectElement[i].multiple) {
                    var options = this.selectElement[i].getElementsByTagName("option");
                    for (var j = 0; j < options.length; j++) {
                        options[j].removeAttribute("selected");
                    }
                }
            }
        };
    };
})();

$(document).ready(function() {

    Highcharts.setOptions({
        lang: {
            months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            weekdays: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
            shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        }
    });

    reset = function() {
        $("toggleCSS").href = "css/alertify.default.css";
        alertify.set({
            labels: {
                ok: "OK",
                cancel: "Cancel"
            },
            delay: 5000,
            buttonReverse: false,
            buttonFocus: "ok"
        });
    };
});