function fallidos() {
    $('#tablaLoginFallidos').dataTable({
        "bProcessing": true,
        "bServerSide": true,
        "bJQueryUI": true,
        "bDestroy": true,
        "bFilter": false,
        "bLengthChange": false,
        "bInfo": false,
        "bAutoWidth": false,
        "sPaginationType": "full_numbers",
        "sAjaxSource": "Session?key=1", //c
        "aaSorting": [
            [0, 'asc']
        ],
        "fnInitComplete": function(oSettings, json) {},
        "aoColumns": [
            { "sWidth": "25%", "sClass": "left", "bSortable": true },
            { "sWidth": "25%", "sClass": "left", "bSortable": true },
            { "sWidth": "25%", "sClass": "left", "bSortable": true },
            { "sWidth": "25%", "sClass": "left", "bSortable": true }
        ],
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
    });
}

window.onbeforeunload = function(e) {
    var val = document.getElementById("key2").value;
    if (val === "-2" || val === "-1") {
        e.stopPropagation();
        e.preventDefault();
        e.cancelBubble = false;
    } else {
        var message = "Saliendo de la aplicacion!!",
            e = e || window.event;
        if (e) {
            e.returnValue = message;
        }

        return message;
    }
};

$(document).ready(function() {
    $("#showMenu").addClass("btn-sm");

    $("#showMenu").on('click', function() {
        if (!($('#menu-contenedor').is(':visible'))) {
            var potop = $('body').offset().top;
            $('html,body, #principal').animate({
                scrollTop: potop
            }, 1000);
        }

        $("#menu-contenedor").fadeToggle('fast', function() {
            $("#menu-contenedor").toggleClass('show');
        });
    });

    $("#cont-menu").prepend('<button type="button" id="menutoggle" class="navtoogle btn btn-default btn-block btn-lg" aria-hidden="true"><span class="icon"><i aria-hidden="true" class="icon-menu"> </i> Menu</span></button>');

    $("#menutoggle").on('click', function() {
        $(this).toggleClass('active');
    });


    $.get("./Mensaje", function(data) {
        if (data.IsSuccess) {
            reset();
            alertify.success(data.Msg);
        }

    });

    $("#home").on('click', function() {
        $("#formAux").attr("action", "./Action");
        $("#formAux #key2").val(-1);
        $("#formAux").submit();
    });

    $("#acerca").hide();

    $("#contacto").hide();

    $("#logout").on('click', function() {
        clearAppStorage();
        $("#formAux").attr("action", "./Session");
        $("#formAux #key2").val(-2);
        $("#formAux").submit();
    });


    Highcharts.setOptions({
        colors: ['#8BBC21', '#2F7ED8', '#910000', '#ED561B', '#DDDF00', '#24CBE5', '#92A8CD', '#B5CA92',
            '#1AADCE', '#492970', '#F28F43', '#77A1E5', '#FFF263', '#FF9655', '#6AF9C4', '#A47D7C',
            '#C42525', '#A6C96A', '#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE', '#DB843D', '#50B432',
            '#64E572', '#0D233A', '#263C53'
        ]
    });

    var css = "color: red; font-size: 40px; text-shadow: 1px 0px 0px black, 0px 1px 0px black, -1px 0px 0px black, 0px -1px 0px black";
    console.log("%cOUSTSMOBI-SECURITY", css);
    var css2 = "background: #333; color: white; font-size: 20px; line-height: 40px; padding: 5px";
    console.log("%cEsta es una función de navegador destinado para los desarrolladores. Te recomendamos que no intentes nada por acá pues podría afectar el funcionamiento de tu cuenta.", css2);
});

var changeClass = function(r, className1, className2) {
    var regex = new RegExp("(?:^|\\s+)" + className1 + "(?:\\s+|$)");
    if (regex.test(r.className)) {
        r.className = r.className.replace(regex, ' ' + className2 + ' ');
    } else {
        r.className = r.className.replace(new RegExp("(?:^|\\s+)" + className2 + "(?:\\s+|$)"), ' ' + className1 + ' ');
    }
    return r.className;
};

// Oculta menutoggle al dar click
document.onclick = function(e) {
    var mobileButton = document.getElementById('menutoggle'),
        buttonStyle = mobileButton.currentStyle ? mobileButton.currentStyle.display : getComputedStyle(mobileButton, null).display;

    if (buttonStyle === 'block' && e.target !== mobileButton && new RegExp(' ' + 'active' + ' ').test(' ' + mobileButton.className + ' ')) {
        changeClass(mobileButton, 'active', '');
    }
};