$.zTools = {
    dayLng : 86400000,
    weekLng : 86400000 * 7,
    dayToWeekNbr : function(date) {
        if (!isNaN(date)) date = new Date(date);

        date = new Date(date.getTime() - (date.getDay() == 0 ? 6 : date.getDay() - 1) * $.zTools.dayLng);
        date = new Date(date.getFullYear(),
            date.getMonth(), date.getDate(), 0, 0, 0, 0).getTime();

        return date / 100000;
    },

    weekNbrToDay : function(week, toString) {
        var day = week * 100000;
        return toString ? $.zTools.dateToStr(day) : day;
    },

    genUID : function() {
        var chars = '0123456789ABCDEF'.split('');
        var uid = [], rnd = Math.random;

        for (var i = 0; i < 32; i++) {
            uid[i] = chars[(0 | rnd() * 16) & 0xf];
        }

        return uid.join('');
    },

    uidToColor : function(uid, bright) {
        var baseBright = 255, steps = 256, s = parseInt(uid.substr(uid.length - 2), 16);

        var r, g, b;
        var i = Math.floor(6 * s / steps), f = 6 * (s - steps * i / 6) / steps, q = 1 - f;

        switch (i) {
            case 0:
                r = 1, g = f, b = 0;
                break;
            case 1:
                r = q, g = 1, b = 0;
                break;
            case 2:
                r = 0, g = 1, b = f;
                break;
            case 3:
                r = 0, g = q, b = 1;
                break;
            case 4:
                r = f, g = 0, b = 1;
                break;
            case 5:
                r = 1, g = 0, b = q;
                break;
        }

        if (bright) {
            var br = (3 * bright - (r + g + b)) / 3;
            r += br;
            g += br;
            b += br;
            r = r < 1 ? r : 1;
            g = g < 1 ? g : 1;
            b = b < 1 ? b : 1;
            r = r > 0 ? r : 0;
            g = g > 0 ? g : 0;
            b = b > 0 ? b : 0;
        }

        r = Math.round(r * baseBright);
        g = Math.round(g * baseBright);
        b = Math.round(b * baseBright);

        return ""
            + ("00" + r.toString(16)).slice(-2)
            + ("00" + g.toString(16)).slice(-2)
            + ("00" + b.toString(16)).slice(-2);
    },

    numToStr : function(num, numOfDgts) {
        var n = '' + Math.round(num);
        while (n.length < numOfDgts) n = '0' + n;
        return n;
    },
    dateToStr : function(date, showTime, showWeekDay) {
        if (!isNaN(date)) date = new Date(date);

        return (showWeekDay ?
            ['вс','пн','вт','ср','чт','пт','сб'][date.getDay()] + ', '
            : '') +
            $.zTools.numToStr(date.getDate(), 2) + '.' +
            $.zTools.numToStr(date.getMonth() + 1, 2) +
            (showWeekDay ? '' : '.' + $.zTools.numToStr(date.getFullYear(), 4)) +
            (showTime ? ' ' +
                date.getHours() + ':' +
                $.zTools.numToStr(date.getMinutes(), 2)
                : '');
    },
    id : function(zoneCode, dateId, tmNumber) {
        return 'z' + zoneCode +
            'z' + ('' + dateId).split('.').join('d') +
            'z' + tmNumber;
    },
    fromId : function(id) {
        var z = id.split('z');
        return [
            z[1],
            z[2].split('d').join('.'),
            z[3]
        ];
    }
};