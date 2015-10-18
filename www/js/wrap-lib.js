$.doWrap = {
    table : function(id, s) {
        return '<table id="' + id + '" class="contract" cellspacing="0">' + s + '</table>';
    },
    thead : function(s) {
        return '<thead>' + s + '</thead>';
    },
    tbody : function(s) {
        return '<tbody>' + s + '</tbody>';
    },
    tr : function(s, cls) {
        return '<tr' + (cls ? ' class="' + cls + '"' : '') + '>' + s + '</tr>';
    },
    zoneName : function(zone) {
        return zone.zone + (zone.price && zone.price > 0 ? ' <sup>~' + zone.price + '</sup>' : '');
    },
    td : function(cls, colspan, rowspan, s, title) {
        return '<td' +
            (cls ? ' class="' + (cls.join ? cls.join(' ') : cls) + '"' : '') +
            (colspan ? ' colspan="' + colspan + '"' : '') +
            (rowspan ? ' rowspan="' + rowspan + '"' : '') +
            (title ? ' title="' + title + '"' : '') +
            '>' + s + '</td>';
    },
    inputNumber : function(id, title, defaultVal, val) {
        return '<input type="text" size="2" maxlength="2" pattern="\\d{1,2}" required="required"' +
            (val && defaultVal != val ? ' class="changed"' : '') +
            (id ? ' id="' + id + '"' : '') +
            (title ? ' title="' + title + '"' : '') +
            (!defaultVal && isNaN(defaultVal) ? '' : ' placeholder="' + defaultVal + '"') +
            (val || defaultVal ? ' value="' + (val ? val : defaultVal) + '"' : '') +
            '/>';
    },
    zoneListItem : function(value, price, color) {
        return '<div class="zone"><div class="zoneAction zoneShow" title="показать зону доставки">&#9668;</div>' +
            '<input class="zoneName" type="text" size="40" maxlength="120" ' +
            'pattern="^[A-ZА-ЯЁ]([A-Za-zА-Яа-яЁё]|\\x20|\\d|\\x2D|\\x43|\\x44){1,120}" required="required" placeholder="Название зоны доставки"' +
            (color ? ' style="color:#' + color + '"' : '') +
            ' value="' + value + '"/>' +
            '<input class="zonePrice" type="text" size="4" maxlength="4" ' +
            'pattern="\\d{1,4}" required="required" placeholder="цена"' +
            (color ? ' style="color:#' + color + '"' : '') +
            ' value="' + (price ? price : 0) + '"/>' +
            '<div class="zoneAction zoneRemove" title="удалить зону доставки">&#10006;</div></div>';
    }
};