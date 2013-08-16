// Globalne varijable.
var mojaMapa = null;
var markeri = [];
var selectedMarker = null;

// Početno postavljanje mape pri prvom učitavanju stranice.
(function () {
    window.onload = function () {
        var koordinate = new google.maps.LatLng(45.8, 15.9);
        var options = {
            zoom: 8,
            center: koordinate,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scaleControl: true,
            streetViewControl: true
        };
        mojaMapa = new google.maps.Map(document.getElementById('GoogleMapa'), options);

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "services/JsonGeoWS2.asmx/DohvatiGeoPodatke",
            data: "{'param': '1'}",
            dataType: "json",
            success: AjaxSucceeded,
            error: AjaxFailed
        });
        
        // Postavljanje tipkovničkih komandi.
        // http://www.htmlgoodies.com/tutorials/forms/article.php/3904651/jQuery-Basics-for-Web-Developers-Keyboard-Events.htm
        $(LijeviIzbornik).keyup(function(key) {
            var focusedIndex = -1
            switch (key.which) {
                case 37: case 65: // <-, A lijevo
                    stranici('prev');
                    break;
                case 39: case 68: // ->, D desno
                    stranici('next');
                    break;
                case 38: case 87: // ^, W gore
                    for (var i = 0; i < $('.rpt_item').size(); i++) {
                        if ((i > 0) && ($('.rpt_item:eq(' + i + ') > a').is(':focus'))) {
                           $('.rpt_item:eq(' + (i - 1) + ') > a').focus();
                           break;
                        };
                    };
                    break;
                case 40: case 83: // ˇ, S dolje
                    for (var i = 0; i < $('.rpt_item').size(); i++) {
                        if ($('.rpt_item:eq(' + i + ') > a').is(':focus')) {
                           $('.rpt_item:eq(' + (i + 1) + ') > a').focus();
                           break;
                        };
                    };
                    break;
                case 81: // Q prvi
                    stranici('first');    
                    break;
                case 69: // E zadnji
                    stranici('last');
                    break;
                default:
                    // Za sada ništa.
                    break;
            }
        });
    }
})();

function AjaxSucceeded(msg) {
    $(lblErrMsg).empty();
    
    var jsonTablica = eval(msg.d);
    var oblacic = new google.maps.InfoWindow();
    for (var i = 0, length = jsonTablica.length; i < length; i++) {
        var jsonRedak = jsonTablica[i],
		koordinate = new google.maps.LatLng(jsonRedak.GSirina, jsonRedak.GDuzina);           
        var marker = new google.maps.Marker({
            position: koordinate,
            map: mojaMapa,
            title: jsonRedak.Naziv,
            icon: 'http://gmaps-samples.googlecode.com/svn/trunk/markers/blue/blank.png'
        });
        // Pamćenje markera radi kasnije izmjene ikone pri klikanju po meniju.
        markeri.push(marker);
                    
        // Closure.
        (function (marker) {
            // Postavljanje slušača na marker.
            google.maps.event.addListener(marker, "click", function (e) {
                // Slušač mora:
                // 1. Selektirati sve div tagove klase rpt_item.
                // 2. U petlji pronaći njihovu 'hidden' djecu koja u nazivu imaju GSirina i GDuzina.
                // 3. Iz djece pročitati vrijednosti.
                // 4. Usporediti vrijednosti s marker.position.lat() i marker.position.lng()
                // 5. Kada pronađe jednakosti GSirina = marker.position.lat() i GDuzina = marker.position.lng(),
                //  onda treba trenutnom tagu dodati rpt_selected_item klasu i (NOVO) dodati fokus,
                //  inače trenutnom tagu oduzeti rpt_selected_item klasu.
                // 6. Prikazati odgovarajuću stranicu u meniju s lijeva ako već nije prikazana.

                if (selectedMarker != null) {
                    selectedMarker.setIcon('http://gmaps-samples.googlecode.com/svn/trunk/markers/blue/blank.png');
                }
                selectedMarker = marker;
                marker.setIcon('http://gmaps-samples.googlecode.com/svn/trunk/markers/red/blank.png');

                var itemCounter = 0;
                var focusedItem = 0;
                $('.rpt_item').each(function () {
                    itemCounter++;
                    if (Math.abs(marker.position.lat() - $(this).children('input[id$="hdnGSirina"]').val()) < 0.000001 && Math.abs(marker.position.lng() - $(this).children('input[id$="hdnGDuzina"]').val()) < 0.000001) {
                        $(this).addClass("rpt_selected_item");
                        var currPage = Math.ceil(itemCounter / ($(lblPageSize).text())); //Math.ceil(itemCounter / ($(hdnPageSize).val()));
                        stranici(currPage);
                        focusedItem = itemCounter - 1;
                    } else {
                        $(this).removeClass("rpt_selected_item");
                    }
                }); // kraj each petlje

                // Fokusiranje s mape.
                $('.rpt_item:eq(' + focusedItem + ') > a').focus();
            });
        })(marker);

        // Closure.
        (function (marker, jsonRedak) {
            google.maps.event.addListener(marker, "click", function (e) {
                oblacic.setContent(jsonRedak.Naziv + '<br/>' + jsonRedak.Info);
                oblacic.open(mojaMapa, marker);
            });
        })(marker, jsonRedak);
    } // kraj for petlje

    stranici('first');

    // Početno fokusiranje.
    $(".rpt_item:eq(0) > a").focus();
}

function AjaxFailed(msg) {
    alert(msg.status + ' ' + msg.statusText);
    $(lblErrMsg).text(msg.status + ' ' + msg.statusText);
}

// Ova funkcija se pokreće pri klikanju na stavke u lijevom izborniku (NE na straničnike).
function pozicioniraj(lat, lng, clientID) {
    mojaMapa.setCenter(new google.maps.LatLng(lat, lng));
    for (var i = 0; i < markeri.length; i++) {
        // Ovakvo ispitivanje uvjeta provodi se zbog float problema:
        // http://stackoverflow.com/questions/588004/is-javascripts-floating-point-math-broken
        if (Math.abs(markeri[i].position.lat() - lat) < 0.000001 && Math.abs(markeri[i].position.lng() - lng) < 0.000001) {
            markeri[i].setIcon('http://gmaps-samples.googlecode.com/svn/trunk/markers/red/blank.png');
            selectedMarker = markeri[i];
        } else {
            markeri[i].setIcon('http://gmaps-samples.googlecode.com/svn/trunk/markers/blue/blank.png');
        }
    }
    $('.rpt_selected_item').removeClass('rpt_selected_item');
    $(clientID).parent().addClass("rpt_selected_item");
}

function stranici(op) {
    var currPage = $(lblCurrPage).text();
    // IE ne zna, čak niti u devetoj inkarnaciji, čitati skrivena polja java scriptom.
    // Sramota. Taj preglednik je i dalje degeneracija Weba i ružan prišt na licu čovječanstva.
    var pageSize = $(lblPageSize).text(); //  $(hdnPageSize).val();
    var pageCount = $(lblPageCount).text();

    switch(op) {
        case 'first':
            currPage = 1;
            break;
        case 'prev':
            if (currPage > 1) {
                currPage--;
            }
            break;
        case 'next':
            if (currPage < pageCount) {
                currPage++;
            }
            break;
        case 'last':
            currPage = pageCount;
            break;
        default: // Ovo se poziva ISKLJUČIVO u slučaju klika na MAPU.
            currPage = op;
            break;
    } // kraj case naredbe

    $(lblCurrPage).text(currPage);
    
    for (var i = 0; i < $('.rpt_item').size(); i++) {
        if (($('.rpt_item:eq(' + i + ')').index() <= currPage * pageSize) && ($('.rpt_item:eq(' + i + ')').index() > (currPage - 1) * pageSize)) {
            $('.rpt_item:eq(' + i + ')').removeClass('rpt_hidden_item');
        } else {
            $('.rpt_item:eq(' + i + ')').addClass('rpt_hidden_item');
        }
    } // kraj for petlje

    $(".rpt_item:eq(" + (currPage - 1) * pageSize + ") > a").focus();
}
        