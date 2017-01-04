var _this = this;
_this.obj_geoCerca = false;
_this.obj_cluster = false;
_this.locationsPolygon = [];
_this.lnPolygon = 0;
_this.markers = [];
_this.path = new google.maps.MVCArray;
var poly = null,
    mapa = null,
    map = null,
    image = "./img/marker/beachflag.png";
var markerClusterer = null;
var latLngControl3;
_this.obj_toggle = false;

function LatLngControl(map) {
    this.ANCHOR_OFFSET_ = new google.maps.Point(8, 8);
    this.node_ = this.createHtmlNode_();
    map.controls[google.maps.ControlPosition.TOP].push(this.node_);
    this.setMap(map);
    this.set('visible', false);
}
LatLngControl.prototype = new google.maps.OverlayView();
LatLngControl.prototype.draw = function() {};
LatLngControl.prototype.createHtmlNode_ = function() {
    var divNode = document.createElement('div');
    divNode.id = 'latlng-control';
    divNode.index = 100;
    divNode.style.fontSize = '18px';
    return divNode;
};
LatLngControl.prototype.visible_changed = function() {
    this.node_.style.display = this.get('visible') ? '' : 'none';
};
LatLngControl.prototype.updatePosition = function(latLng) {
    var projection = this.getProjection();
    var pointD = projection.fromLatLngToContainerPixel(latLng);
    this.node_.style.left = pointD.x + this.ANCHOR_OFFSET_.x + 'px';
    this.node_.style.top = pointD.y + this.ANCHOR_OFFSET_.y + 'px';
    //this.node_.innerHTML = [latLng.toUrlValue(8)].join('  ');
    this.node_.innerHTML = latLng.lat().toFixed(8) + ", " + latLng.lng().toFixed(8);
};

LatLngControl.prototype.onRemove = function() {
    this.div_.parentNode.removeChild(this.div_);
};

LatLngControl.prototype.hide = function() {
    if (this.node_) {
        this.node_.hidden = true;
    }

};
LatLngControl.prototype.show = function() {
    if (this.node_) {
        this.node_.hidden = false;
    }
};
LatLngControl.prototype.toggle = function() {
    if (this.node_) {
        var x = this.node_.hidden;
        if (x == true) {
            this.show();
        } else {
            this.hide();
        }
    }
};

function toggleLatlong(e) {
    try {
        e.preventDefault();
        try {
            _this.obj_toggle = !_this.obj_toggle;
            latLngControl3.toggle();
        } catch (e) {
            console.log(e.name + ": " + e.message);
        }
        if (_this.obj_toggle === true) {
            $("#toggle").addClass('btn-danger').removeClass('btn-warning');
        } else {
            $("#toggle").addClass('btn-warning').removeClass('btn-danger');
        }
    } catch (e) {
        alert("Error " + e.name + ": " + e.message);
    }
};

function removeLocations() {
    _this.obj_geoCerca = false;

    for (var i = 0; i < _this.lnPolygon; i++) {
        _this.markers[i].setMap(null);
    }

    _this.markers.splice(0, _this.markers.length);
    _this.path.clear();
    _this.locationsPolygon.splice(0, _this.locationsPolygon.length);
    _this.lnPolygon = 0;
    var bottomPosition = ($(window).height() + 100) + "px";
    $("#slideDetalle").css({ top: bottomPosition });
    $("#geoCerca").text('Geocerca').removeClass('btn-warning').addClass('btn-primary');
    $("#totalGeoCerca").html(_this.locationsPolygon.length);
}

function addPolygonPoint(map, event) {
    try {
        if (_this.obj_geoCerca) {

            _this.path.insertAt(_this.path.length, event.latLng);

            var marker = new google.maps.Marker({ position: event.latLng, map: map, icon: image });
            marker.setTitle("#" + _this.path.length);
            _this.markers.push(marker);
            _this.lnPolygon++;

            _this.locationsPolygon = mapa.PolygonGetLocations(poly);

            $("#totalGeoCerca").html(_this.locationsPolygon.length);
        }
    } catch (e) {
        console.log(e);
        noty({ text: "El MAPA no esta disponible en estos momentos, por favor intente más tarde!!", type: "warning", timeout: 6000 });
    }
}

function initialize(points) {
    map = new google.maps.Map(document.getElementById('mapa-canvas'), {
        zoom: 14,
        center: new google.maps.LatLng(39.91, 116.38),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    google.maps.event.addListener(map, 'click', function(event) {
        addPolygonPoint(map, event);
    });

    var markers = [];

    for (var i = 0; i < points.length; ++i) {
        var latLng = new google.maps.LatLng(points[i].lat, points[i].lon);
        var marker = new google.maps.Marker({ position: latLng, icon: null });
        markers.push(marker);
    }
}


function refreshMap() {
    if (markerClusterer) {
        markerClusterer.clearMarkers();
    }

    var markers = mapa.getLocations();
    //var circles = mapa.getCircles();

    if (_this.obj_cluster == true) {
        var zoom = null;
        var size = null;
        var style = null;

        markerClusterer = new MarkerClusterer(map, markers, [], {
            maxZoom: zoom,
            gridSize: size,
            styles: null
        });
    } else {
        if (markerClusterer) {
            /*for (var i = 0; i < circles.length; i++) {
                circles[i].setMap(map);
            }*/
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(map);
            }
        }
    }
}

function createObjMap(points, legend) {
    var styles = [{
        stylers: [
            { "weight": 1.3 },
            { invert_lightness: true }
        ]
    }];


    try {
        mapa = new Maplace({
            locations: points,
            generate_controls: false,
            map_div: '#mapa-canvas',
            map_options: {
                zoom: 14
            },
            //type: 'circle',
            visualRefresh: true,
            /*stroke_options: {
              strokeColor: '#0000FF',
              strokeOpacity: 0.6,
              strokeWeight: 2,
              fillColor: '#0000FF',
              fillOpacity: 0.2
            },*/
            listeners: {
                click: addPolygonPoint
            }
        }).Load();

        map = mapa.getObjectMap();

        latLngControl3 = new LatLngControl(map);
        google.maps.event.addListener(map, 'mouseover', function(mEvent) {
            latLngControl3.set('visible', true);
        });
        google.maps.event.addListener(map, 'mouseout', function(mEvent) {
            latLngControl3.set('visible', false);
        });
        google.maps.event.addListener(map, 'mousemove', function(mEvent) {
            latLngControl3.updatePosition(mEvent.latLng);
        });
        latLngControl3.toggle();
        poly = new google.maps.Polygon({
            strokeWeight: 3,
            fillColor: '#5555FF'
        });
        poly.setMap(map);
        poly.setPaths(new google.maps.MVCArray([path]));

        refreshMap();

        $("#totalMapa").html(points.length);
        $("#legend-one").html(legend);
        $("#legends").show();
        $("#btnOptions").show();
        $("body").css({ overflow: "hidden" });
    } catch (e) {
        throw e;
    }
}

function generaMapa(param, title) {
    appWait.showPleaseWait();
    try {

        $.post("Session", param, function(data) {
            try {
                if (data.permiso) {
                    if (data.isSuccess) {
                        createObjMap(data.points, data.legend);
                    } else {
                        noty({ text: data.msg, type: 'error', timeout: 7000 });
                    }
                } else {
                    noty({ text: data.msg, type: 'warning', timeout: 7000 });
                }
            } catch (e) {
                console.log(e);
                $("#cerrarMapa").trigger('click');
                noty({ text: "El MAPA no esta disponible en estos momentos, por favor intente más tarde!!", type: "warning", timeout: 6000 });
            }
        }).done(function() {
            $("#btnOptions").show();
            appWait.hidePleaseWait();
        }).fail(function(jqXHR, textStatus, errorThrown) {
            $("#btnOptions").show();
            appWait.hidePleaseWait();
            logException(jqXHR, textStatus, errorThrown);
        }).always(function() {
            $("#btnOptions").show();
            $("#titleMap").html(title);
        });
    } catch (e) {
        alert("Error " + e.name + ": " + e.message);
    }
}

function detallesMapa(id) {
    appWait.showPleaseWait();
    try {

        var param = [{ "name": "key", "value": 128 },
            { "name": "idAnotacion", "value": id }
        ];

        $.post("Session", param, function(data) {
            try {
                if (data.permiso) {
                    if (data.isSuccess) {
                        $("#corrMapaDetalle").html("<strong style='text-decoration: underline;font-size: larger;'>" + data.formulario.corr + "</strong>");
                        $("#estado").html("<strong style='text-decoration: underline;'>" + data.formulario.estado + "</strong>");
                        $("#actual").html("<strong style='text-decoration: underline;'>" + data.formulario.actual + "</strong>");
                        $("#evento").html("<strong style='text-decoration: underline;'>" + data.formulario.evento + "</strong>");
                        $("#fechaMapa").html(data.formulario.fecha);
                        $("#usuarioCreo").html(data.formulario.usuarioCreo);
                        $("#asignado").html(data.formulario.asignado);
                        $("#descripcion").html(data.formulario.descripcion);
                        $("#detalleMapa").find("form").find(".form-group").eq(0).attr("class", "form-group label-" + getClassColor(data.formulario.estado));
                        var contentGallery = $("#detalleMapa").find("form").find("#contentGallery");
                        if (contentGallery.length > 0) {
                            contentGallery.html(data.formulario.divHTML)
                        } else {
                            $("#detalleMapa").find("form").append("<div id=\"contentGallery\" class=\"form-group\">" + data.formulario.divHTML + "</div>")
                        }

                        var sOut = '';

                        sOut += fnTableFormatDetails(data.formulario.tracking);

                        $("#tackingDetalleMap").html('').append(sOut);

                        /*
                         * Lightbox
                         */
                        var $lg = $('.lightbox');
                        if ($lg[0]) {
                            $lg.lightGallery({
                                enableTouch: true,
                                onOpen: function(plugin) {
                                    if ($("#lg-action")[0]) {
                                        $("#lg-action").append('<a class="text-center" data-rotate="0" id="rotate-img"><span class="glyphicon glyphicon-share-alt"></span></a>');
                                    } else {
                                        $("#lg-gallery").append('<div id="lg-action" class="has-thumb"><a class="text-center" data-rotate="0" id="rotate-img"><span class="glyphicon glyphicon-share-alt"></span></a></div>')
                                    }
                                    $("#rotate-img").on("click", function() {
                                        var $obj = $(".lg-slide.current");
                                        var valueRotate = $obj.data("rotate");
                                        var nowRotate = 0;
                                        if (valueRotate !== undefined) {
                                            nowRotate = fnRotateImage($obj.find("img"), valueRotate);
                                        } else {
                                            nowRotate = fnRotateImage($obj.find("img"), 0);
                                        }

                                        $obj.data("rotate", nowRotate);

                                    });
                                }
                            });
                        }
                        $("#detalleMapa").modal('show');
                    } else {
                        noty({ text: data.msg, type: 'error', timeout: 7000 });
                    }
                } else {
                    noty({ text: data.msg, type: 'warning', timeout: 7000 });
                }
            } catch (e) {
                console.log(e);
                noty({ text: "El MAPA de Analiticas no esta disponible en estos momentos, por favor intente más tarde!!", type: "warning", timeout: 6000 });
            }
        }).done(function() {
            appWait.hidePleaseWait();
        }).fail(function(jqXHR, textStatus, errorThrown) {
            appWait.hidePleaseWait();
            logException(jqXHR, textStatus, errorThrown);
        }).always(function() {
            appWait.hidePleaseWait();
        });
    } catch (e) {
        alert("Error " + e.name + ": " + e.message);
    }
}

function detallesMapaGeoCerca(e) {
    try {
        if (_this.locationsPolygon.length > 0) {
            e.preventDefault();
            appWait.showPleaseWait();

            var param = [{ "name": "key", "value": 178 },
                { "name": "anotaciones", "value": _this.locationsPolygon.toString() }
            ];

            $.post("Session", param, function(data) {
                try {
                    if (data.permiso) {
                        if (data.isSuccess) {
                            $("#tbBodyDetalleGeoCerca").html("");
                            $.each(data.oaData, function(idx, value) {
                                var trApp = "<tr>";
                                $.each(value, function(i, e) {
                                    trApp += "<td>" + e + "</td>"
                                });
                                trApp += "</tr>"
                                $("#tbBodyDetalleGeoCerca").append(trApp);
                            });
                            $("#overlayDetalleGeoCerca").modal('show');
                            $("#slideDetalle").animate({ top: "0px" }, 1000);
                        } else {
                            noty({ text: data.msg, type: 'error', timeout: 7000 });
                        }
                    } else {
                        noty({ text: data.msg, type: 'warning', timeout: 7000 });
                    }
                } catch (e) {
                    console.log(e);
                    noty({ text: "El MAPA de Analiticas no esta disponible en estos momentos, por favor intente más tarde!!", type: "warning", timeout: 6000 });
                }
            }).done(function() {
                appWait.hidePleaseWait();
            }).fail(function(jqXHR, textStatus, errorThrown) {
                appWait.hidePleaseWait();
                logException(jqXHR, textStatus, errorThrown);
            }).always(function() {
                appWait.hidePleaseWait();
            });
        }
    } catch (e) {
        alert("Error " + e.name + ": " + e.message);
    }
}

function cerrarDetallesMapaGeoCerca(e) {
    try {
        e.preventDefault();
        var bottomPosition = ($(window).height() + 100) + "px";
        $("#slideDetalle").animate({ top: bottomPosition }, 700, function() {
            $("#overlayDetalleGeoCerca").modal('hide');
        });
    } catch (e) {
        $("#overlayDetalleGeoCerca").modal('hide');
        console.log(e.name + ": " + e.message);
    }
}

function cerrarMapa(e) {
    try {
        e.preventDefault();
        $("#mapa").modal('hide');
        $("body").css({ overflow: "auto" });
        $("#mapa-canvas").html('');
        $("#legend-one").html('');
        $("#titleMap").html('');
        $("#legends").hide();
        $("#btnOptions").hide();
        mapa = null;
        poly = null;
        map = null;
        markerClusterer = null;
        _this.obj_cluster = false;
        $("#cluster").addClass('btn-primary').removeClass('btn-danger');
        try {
            removeLocations();
        } catch (e) {
            console.log(e.name + ": " + e.message);
        }

    } catch (e) {
        $("#mapa").modal('hide');
        $("body").css({ overflow: "auto" });
        console.log(e.name + ": " + e.message);
    }
}

function toggleGeoCerca(e) {
    try {
        e.preventDefault();
        if (_this.obj_geoCerca) {
            try {
                removeLocations();
            } catch (e) {
                console.log(e.name + ": " + e.message);
            }
        } else {
            _this.obj_geoCerca = true;
            $("#geoCerca").text('Eliminar Geocerca').addClass('btn-warning').removeClass('btn-primary');
        }
    } catch (e) {
        alert("Error " + e.name + ": " + e.message);
    }
}

function toggleMarkerClusterer(e) {
    try {
        e.preventDefault();
        try {
            _this.obj_cluster = !_this.obj_cluster;
            refreshMap();
        } catch (e) {
            console.log(e.name + ": " + e.message);
        }
        if (_this.obj_cluster === true) {
            $("#cluster").addClass('btn-danger').removeClass('btn-primary');
        } else {
            $("#cluster").addClass('btn-primary').removeClass('btn-danger');
        }
    } catch (e) {
        alert("Error " + e.name + ": " + e.message);
    }
}

function showDetalleMapa(e) {
    if ($(this).hasClass("active") ||  e == null) {
        $("#legends").animate({ bottom: '-150px' }, 400);
        $("#showLegends").animate({ bottom: '0px' }, 400).removeClass("active").html("<i class='glyphicon glyphicon-chevron-up'></i>");
    } else {
        $("#legends").animate({ bottom: '0px' }, 400);
        $("#showLegends").animate({ bottom: '150px' }, 400).addClass("active").html("<i class='glyphicon glyphicon-chevron-down'></i>");
    }

    if (e != null)
        e.preventDefault();
}

function reportedetallesMapaGeoCerca(e) {
    try {
        if (_this.locationsPolygon.length > 0) {
            e.preventDefault();
            appWait.showPleaseWait();

            var param = [{ "name": "key", "value": 179 },
                { "name": "anotaciones", "value": _this.locationsPolygon.toString() }
            ];
            $.post("Session", param, function(data) {
                if (data.permiso) {
                    if (data.isSuccess) {
                        var mobil = isMovil();
                        if (mobil) {
                            var paramMobil = [{ "name": "nombre", "value": data.nombre }];
                            $.post("Mobil", paramMobil, function(data) {
                                noty({ text: "El Reporte, ha sido enviado a su cuenta de correo!!", type: "success", timeout: 6000 });
                            });
                        } else {
                            var form = $('<form method="post" class="fileDownloadForm" action="./Download">');
                            form.append($('<input type="hidden" name="nombre" value="' + data.nombre + '">'));
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
                                noty({ text: "El Reporte, no se puede descargar en este momento!!", type: "warning", timeout: 6000 });
                            }
                        }

                    } else {
                        noty({ text: data.msg, type: "danger", timeout: 6000 });
                    }
                } else {
                    noty({ text: data.msg, type: "warning", timeout: 6000 });
                }
            }).done(function() {
                appWait.hidePleaseWait();
            }).fail(function(jqXHR, textStatus, errorThrown) {
                appWait.hidePleaseWait();
                logException(jqXHR, textStatus, errorThrown);
            }).always(function() {
                appWait.hidePleaseWait();
            });
        }
    } catch (e) {
        noty({ text: "Ha incurrido en un error, por favor intente más tarde!!", type: "error", timeout: 6000 });
    }
}