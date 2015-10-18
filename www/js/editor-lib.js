////////////////////////////////
// editor functions:

$.contractEditor = {
    addHandlers : function(selector, updateHandler) {
        selector = $(selector).find('input');

        selector.focus(function(evt) {
            var e = $(evt.target);
            e.select();
        });

        selector.keyup(function(evt) {
            var code = evt.which;

            if ((37 <= code && code <= 40) || code == 13) {
                var e = $(evt.target);

                // detect X
                var line = e.parent().parent().find('input');
                for (var x = 0; x < line.length; x++)
                    if (line.get(x).id == evt.target.id) break;

                if (code == 39 || code == 37) {// right
                    if (code == 39) {// right
                        x = x + 1;
                        if (x >= line.length) x = 0;
                    } else if (code == 37) {// left
                        x = x - 1;
                        if (x < 0) x = line.length - 1;
                    }
                    e = line.get(x);
                } else if (code == 38 || code == 40 || code == 13) {
                    // detect Y
                    var rowraw = e.parent().parent().parent().find('input');
                    var row = [], y, j;
                    for (j = x; j < rowraw.length; j += line.length) {
                        if (rowraw.get(j).id == evt.target.id) y = row.length;
                        row[row.length] = rowraw.get(j);
                    }

                    if (code == 38) {// up
                        y = y - 1;
                        if (y < 0) y = row.length - 1;
                    } else if (code == 40 || code == 13) {// down
                        y = y + 1;
                        if (y >= row.length) y = 0;
                    }
                    e = row[y];
                }

                if (e) {
                    $(e).focus();
                    e.select();
                }
            }
        });

        selector.change(function(evt) {
            var z = $.zTools.fromId(evt.target.id);
            var val = evt.target.value;

            if (!isNaN(val) && 0 <= val && val <= 99){ // simple validation
                updateHandler(z[0], z[1], z[2], val, evt.target.placeholder, evt.target);
            }
        });
    },

    constructHeader : function(weekDay, showControls) {
        var i, j, line, e = '', tn = $.contractEditor.timeName, tnl = tn.length;
        if (!weekDay) weekDay = $.contractEditor.weekDay;

        e += $.doWrap.td('zone', false, 2, 'зона');

        if(showControls)
            e += $.doWrap.td('arrow leftArrow', false, 2, '&#9668;', 'предыдущая неделя');

        for (i = 1; i <= 7; i++) {
            e += $.doWrap.td('weekday wd' + i, tnl, false, weekDay[i - 1]);
        }

        if(showControls)
            e += $.doWrap.td('arrow rightArrow', false, 2, '&#9654;', 'следующая неделя');

        e = $.doWrap.tr(e);


        line = '';
        for (i = 1; i <= 7; i++) {
            for (j = 0; j < tnl; j++) {
                line += $.doWrap.td('tm wd' + i + '  tm' + (j + 1) + (j == tnl - 1 ? ' eod' : ''), false, false, tn[j]);
            }
        }
        e += $.doWrap.tr(line);
        e = $.doWrap.thead(e);

        return e;
    },

    weekDay : ['пн','вт','ср','чт','пт','сб','вс'],
    timeName : ['утро','день','вечер']
};

