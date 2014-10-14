// moment.js
// version : 2.0.0
// author : Tim Wood
// license : MIT
// momentjs.com
(function (e) {
  function O(e, t) {
    return function (n) {
      return j(e.call(this, n), t);
    };
  }
  function M(e) {
    return function (t) {
      return this.lang().ordinal(e.call(this, t));
    };
  }
  function _() {
  }
  function D(e) {
    H(this, e);
  }
  function P(e) {
    var t = this._data = {}, n = e.years || e.year || e.y || 0, r = e.months || e.month || e.M || 0, i = e.weeks || e.week || e.w || 0, s = e.days || e.day || e.d || 0, o = e.hours || e.hour || e.h || 0, u = e.minutes || e.minute || e.m || 0, a = e.seconds || e.second || e.s || 0, f = e.milliseconds || e.millisecond || e.ms || 0;
    this._milliseconds = f + a * 1000 + u * 60000 + o * 3600000, this._days = s + i * 7, this._months = r + n * 12, t.milliseconds = f % 1000, a += B(f / 1000), t.seconds = a % 60, u += B(a / 60), t.minutes = u % 60, o += B(u / 60), t.hours = o % 24, s += B(o / 24), s += i * 7, t.days = s % 30, r += B(s / 30), t.months = r % 12, n += B(r / 12), t.years = n;
  }
  function H(e, t) {
    for (var n in t)
      t.hasOwnProperty(n) && (e[n] = t[n]);
    return e;
  }
  function B(e) {
    return e < 0 ? Math.ceil(e) : Math.floor(e);
  }
  function j(e, t) {
    var n = e + '';
    while (n.length < t)
      n = '0' + n;
    return n;
  }
  function F(e, t, n) {
    var r = t._milliseconds, i = t._days, s = t._months, o;
    r && e._d.setTime(+e + r * n), i && e.date(e.date() + i * n), s && (o = e.date(), e.date(1).month(e.month() + s * n).date(Math.min(o, e.daysInMonth())));
  }
  function I(e) {
    return Object.prototype.toString.call(e) === '[object Array]';
  }
  function q(e, t) {
    var n = Math.min(e.length, t.length), r = Math.abs(e.length - t.length), i = 0, s;
    for (s = 0; s < n; s++)
      ~~e[s] !== ~~t[s] && i++;
    return i + r;
  }
  function R(e, t) {
    return t.abbr = e, s[e] || (s[e] = new _()), s[e].set(t), s[e];
  }
  function U(e) {
    return e ? (!s[e] && o && require('./lang/' + e), s[e]) : t.fn._lang;
  }
  function z(e) {
    return e.match(/\[.*\]/) ? e.replace(/^\[|\]$/g, '') : e.replace(/\\/g, '');
  }
  function W(e) {
    var t = e.match(a), n, r;
    for (n = 0, r = t.length; n < r; n++)
      A[t[n]] ? t[n] = A[t[n]] : t[n] = z(t[n]);
    return function (i) {
      var s = '';
      for (n = 0; n < r; n++)
        s += typeof t[n].call == 'function' ? t[n].call(i, e) : t[n];
      return s;
    };
  }
  function X(e, t) {
    function r(t) {
      return e.lang().longDateFormat(t) || t;
    }
    var n = 5;
    while (n-- && f.test(t))
      t = t.replace(f, r);
    return C[t] || (C[t] = W(t)), C[t](e);
  }
  function V(e) {
    switch (e) {
    case 'DDDD':
      return p;
    case 'YYYY':
      return d;
    case 'YYYYY':
      return v;
    case 'S':
    case 'SS':
    case 'SSS':
    case 'DDD':
      return h;
    case 'MMM':
    case 'MMMM':
    case 'dd':
    case 'ddd':
    case 'dddd':
    case 'a':
    case 'A':
      return m;
    case 'X':
      return b;
    case 'Z':
    case 'ZZ':
      return g;
    case 'T':
      return y;
    case 'MM':
    case 'DD':
    case 'YY':
    case 'HH':
    case 'hh':
    case 'mm':
    case 'ss':
    case 'M':
    case 'D':
    case 'd':
    case 'H':
    case 'h':
    case 'm':
    case 's':
      return c;
    default:
      return new RegExp(e.replace('\\', ''));
    }
  }
  function $(e, t, n) {
    var r, i, s = n._a;
    switch (e) {
    case 'M':
    case 'MM':
      s[1] = t == null ? 0 : ~~t - 1;
      break;
    case 'MMM':
    case 'MMMM':
      r = U(n._l).monthsParse(t), r != null ? s[1] = r : n._isValid = !1;
      break;
    case 'D':
    case 'DD':
    case 'DDD':
    case 'DDDD':
      t != null && (s[2] = ~~t);
      break;
    case 'YY':
      s[0] = ~~t + (~~t > 68 ? 1900 : 2000);
      break;
    case 'YYYY':
    case 'YYYYY':
      s[0] = ~~t;
      break;
    case 'a':
    case 'A':
      n._isPm = (t + '').toLowerCase() === 'pm';
      break;
    case 'H':
    case 'HH':
    case 'h':
    case 'hh':
      s[3] = ~~t;
      break;
    case 'm':
    case 'mm':
      s[4] = ~~t;
      break;
    case 's':
    case 'ss':
      s[5] = ~~t;
      break;
    case 'S':
    case 'SS':
    case 'SSS':
      s[6] = ~~(('0.' + t) * 1000);
      break;
    case 'X':
      n._d = new Date(parseFloat(t) * 1000);
      break;
    case 'Z':
    case 'ZZ':
      n._useUTC = !0, r = (t + '').match(x), r && r[1] && (n._tzh = ~~r[1]), r && r[2] && (n._tzm = ~~r[2]), r && r[0] === '+' && (n._tzh = -n._tzh, n._tzm = -n._tzm);
    }
    t == null && (n._isValid = !1);
  }
  function J(e) {
    var t, n, r = [];
    if (e._d)
      return;
    for (t = 0; t < 7; t++)
      e._a[t] = r[t] = e._a[t] == null ? t === 2 ? 1 : 0 : e._a[t];
    r[3] += e._tzh || 0, r[4] += e._tzm || 0, n = new Date(0), e._useUTC ? (n.setUTCFullYear(r[0], r[1], r[2]), n.setUTCHours(r[3], r[4], r[5], r[6])) : (n.setFullYear(r[0], r[1], r[2]), n.setHours(r[3], r[4], r[5], r[6])), e._d = n;
  }
  function K(e) {
    var t = e._f.match(a), n = e._i, r, i;
    e._a = [];
    for (r = 0; r < t.length; r++)
      i = (V(t[r]).exec(n) || [])[0], i && (n = n.slice(n.indexOf(i) + i.length)), A[t[r]] && $(t[r], i, e);
    e._isPm && e._a[3] < 12 && (e._a[3] += 12), e._isPm === !1 && e._a[3] === 12 && (e._a[3] = 0), J(e);
  }
  function Q(e) {
    var t, n, r, i = 99, s, o, u;
    while (e._f.length) {
      t = H({}, e), t._f = e._f.pop(), K(t), n = new D(t);
      if (n.isValid()) {
        r = n;
        break;
      }
      u = q(t._a, n.toArray()), u < i && (i = u, r = n);
    }
    H(e, r);
  }
  function G(e) {
    var t, n = e._i;
    if (w.exec(n)) {
      e._f = 'YYYY-MM-DDT';
      for (t = 0; t < 4; t++)
        if (S[t][1].exec(n)) {
          e._f += S[t][0];
          break;
        }
      g.exec(n) && (e._f += ' Z'), K(e);
    } else
      e._d = new Date(n);
  }
  function Y(t) {
    var n = t._i, r = u.exec(n);
    n === e ? t._d = new Date() : r ? t._d = new Date(+r[1]) : typeof n == 'string' ? G(t) : I(n) ? (t._a = n.slice(0), J(t)) : t._d = n instanceof Date ? new Date(+n) : new Date(n);
  }
  function Z(e, t, n, r, i) {
    return i.relativeTime(t || 1, !!n, e, r);
  }
  function et(e, t, n) {
    var i = r(Math.abs(e) / 1000), s = r(i / 60), o = r(s / 60), u = r(o / 24), a = r(u / 365), f = i < 45 && [
        's',
        i
      ] || s === 1 && ['m'] || s < 45 && [
        'mm',
        s
      ] || o === 1 && ['h'] || o < 22 && [
        'hh',
        o
      ] || u === 1 && ['d'] || u <= 25 && [
        'dd',
        u
      ] || u <= 45 && ['M'] || u < 345 && [
        'MM',
        r(u / 30)
      ] || a === 1 && ['y'] || [
        'yy',
        a
      ];
    return f[2] = t, f[3] = e > 0, f[4] = n, Z.apply({}, f);
  }
  function tt(e, n, r) {
    var i = r - n, s = r - e.day();
    return s > i && (s -= 7), s < i - 7 && (s += 7), Math.ceil(t(e).add('d', s).dayOfYear() / 7);
  }
  function nt(e) {
    var n = e._i, r = e._f;
    return n === null || n === '' ? null : (typeof n == 'string' && (e._i = n = U().preparse(n)), t.isMoment(n) ? (e = H({}, n), e._d = new Date(+n._d)) : r ? I(r) ? Q(e) : K(e) : Y(e), new D(e));
  }
  function rt(e, n) {
    t.fn[e] = t.fn[e + 's'] = function (e) {
      var t = this._isUTC ? 'UTC' : '';
      return e != null ? (this._d['set' + t + n](e), this) : this._d['get' + t + n]();
    };
  }
  function it(e) {
    t.duration.fn[e] = function () {
      return this._data[e];
    };
  }
  function st(e, n) {
    t.duration.fn['as' + e] = function () {
      return +this / n;
    };
  }
  var t, n = '2.0.0', r = Math.round, i, s = {}, o = typeof module != 'undefined' && module.exports, u = /^\/?Date\((\-?\d+)/i, a = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g, f = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g, l = /([0-9a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)/gi, c = /\d\d?/, h = /\d{1,3}/, p = /\d{3}/, d = /\d{1,4}/, v = /[+\-]?\d{1,6}/, m = /[0-9]*[a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF]+\s*?[\u0600-\u06FF]+/i, g = /Z|[\+\-]\d\d:?\d\d/i, y = /T/i, b = /[\+\-]?\d+(\.\d{1,3})?/, w = /^\s*\d{4}-\d\d-\d\d((T| )(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/, E = 'YYYY-MM-DDTHH:mm:ssZ', S = [
      [
        'HH:mm:ss.S',
        /(T| )\d\d:\d\d:\d\d\.\d{1,3}/
      ],
      [
        'HH:mm:ss',
        /(T| )\d\d:\d\d:\d\d/
      ],
      [
        'HH:mm',
        /(T| )\d\d:\d\d/
      ],
      [
        'HH',
        /(T| )\d\d/
      ]
    ], x = /([\+\-]|\d\d)/gi, T = 'Month|Date|Hours|Minutes|Seconds|Milliseconds'.split('|'), N = {
      Milliseconds: 1,
      Seconds: 1000,
      Minutes: 60000,
      Hours: 3600000,
      Days: 86400000,
      Months: 2592000000,
      Years: 31536000000
    }, C = {}, k = 'DDD w W M D d'.split(' '), L = 'M D H h m s w W'.split(' '), A = {
      M: function () {
        return this.month() + 1;
      },
      MMM: function (e) {
        return this.lang().monthsShort(this, e);
      },
      MMMM: function (e) {
        return this.lang().months(this, e);
      },
      D: function () {
        return this.date();
      },
      DDD: function () {
        return this.dayOfYear();
      },
      d: function () {
        return this.day();
      },
      dd: function (e) {
        return this.lang().weekdaysMin(this, e);
      },
      ddd: function (e) {
        return this.lang().weekdaysShort(this, e);
      },
      dddd: function (e) {
        return this.lang().weekdays(this, e);
      },
      w: function () {
        return this.week();
      },
      W: function () {
        return this.isoWeek();
      },
      YY: function () {
        return j(this.year() % 100, 2);
      },
      YYYY: function () {
        return j(this.year(), 4);
      },
      YYYYY: function () {
        return j(this.year(), 5);
      },
      a: function () {
        return this.lang().meridiem(this.hours(), this.minutes(), !0);
      },
      A: function () {
        return this.lang().meridiem(this.hours(), this.minutes(), !1);
      },
      H: function () {
        return this.hours();
      },
      h: function () {
        return this.hours() % 12 || 12;
      },
      m: function () {
        return this.minutes();
      },
      s: function () {
        return this.seconds();
      },
      S: function () {
        return ~~(this.milliseconds() / 100);
      },
      SS: function () {
        return j(~~(this.milliseconds() / 10), 2);
      },
      SSS: function () {
        return j(this.milliseconds(), 3);
      },
      Z: function () {
        var e = -this.zone(), t = '+';
        return e < 0 && (e = -e, t = '-'), t + j(~~(e / 60), 2) + ':' + j(~~e % 60, 2);
      },
      ZZ: function () {
        var e = -this.zone(), t = '+';
        return e < 0 && (e = -e, t = '-'), t + j(~~(10 * e / 6), 4);
      },
      X: function () {
        return this.unix();
      }
    };
  while (k.length)
    i = k.pop(), A[i + 'o'] = M(A[i]);
  while (L.length)
    i = L.pop(), A[i + i] = O(A[i], 2);
  A.DDDD = O(A.DDD, 3), _.prototype = {
    set: function (e) {
      var t, n;
      for (n in e)
        t = e[n], typeof t == 'function' ? this[n] = t : this['_' + n] = t;
    },
    _months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
    months: function (e) {
      return this._months[e.month()];
    },
    _monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
    monthsShort: function (e) {
      return this._monthsShort[e.month()];
    },
    monthsParse: function (e) {
      var n, r, i, s;
      this._monthsParse || (this._monthsParse = []);
      for (n = 0; n < 12; n++) {
        this._monthsParse[n] || (r = t([
          2000,
          n
        ]), i = '^' + this.months(r, '') + '|^' + this.monthsShort(r, ''), this._monthsParse[n] = new RegExp(i.replace('.', ''), 'i'));
        if (this._monthsParse[n].test(e))
          return n;
      }
    },
    _weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
    weekdays: function (e) {
      return this._weekdays[e.day()];
    },
    _weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
    weekdaysShort: function (e) {
      return this._weekdaysShort[e.day()];
    },
    _weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
    weekdaysMin: function (e) {
      return this._weekdaysMin[e.day()];
    },
    _longDateFormat: {
      LT: 'h:mm A',
      L: 'MM/DD/YYYY',
      LL: 'MMMM D YYYY',
      LLL: 'MMMM D YYYY LT',
      LLLL: 'dddd, MMMM D YYYY LT'
    },
    longDateFormat: function (e) {
      var t = this._longDateFormat[e];
      return !t && this._longDateFormat[e.toUpperCase()] && (t = this._longDateFormat[e.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function (e) {
        return e.slice(1);
      }), this._longDateFormat[e] = t), t;
    },
    meridiem: function (e, t, n) {
      return e > 11 ? n ? 'pm' : 'PM' : n ? 'am' : 'AM';
    },
    _calendar: {
      sameDay: '[Today at] LT',
      nextDay: '[Tomorrow at] LT',
      nextWeek: 'dddd [at] LT',
      lastDay: '[Yesterday at] LT',
      lastWeek: '[last] dddd [at] LT',
      sameElse: 'L'
    },
    calendar: function (e, t) {
      var n = this._calendar[e];
      return typeof n == 'function' ? n.apply(t) : n;
    },
    _relativeTime: {
      future: 'in %s',
      past: '%s ago',
      s: 'a few seconds',
      m: 'a minute',
      mm: '%d minutes',
      h: 'an hour',
      hh: '%d hours',
      d: 'a day',
      dd: '%d days',
      M: 'a month',
      MM: '%d months',
      y: 'a year',
      yy: '%d years'
    },
    relativeTime: function (e, t, n, r) {
      var i = this._relativeTime[n];
      return typeof i == 'function' ? i(e, t, n, r) : i.replace(/%d/i, e);
    },
    pastFuture: function (e, t) {
      var n = this._relativeTime[e > 0 ? 'future' : 'past'];
      return typeof n == 'function' ? n(t) : n.replace(/%s/i, t);
    },
    ordinal: function (e) {
      return this._ordinal.replace('%d', e);
    },
    _ordinal: '%d',
    preparse: function (e) {
      return e;
    },
    postformat: function (e) {
      return e;
    },
    week: function (e) {
      return tt(e, this._week.dow, this._week.doy);
    },
    _week: {
      dow: 0,
      doy: 6
    }
  }, t = function (e, t, n) {
    return nt({
      _i: e,
      _f: t,
      _l: n,
      _isUTC: !1
    });
  }, t.utc = function (e, t, n) {
    return nt({
      _useUTC: !0,
      _isUTC: !0,
      _l: n,
      _i: e,
      _f: t
    });
  }, t.unix = function (e) {
    return t(e * 1000);
  }, t.duration = function (e, n) {
    var r = t.isDuration(e), i = typeof e == 'number', s = r ? e._data : i ? {} : e, o;
    return i && (n ? s[n] = e : s.milliseconds = e), o = new P(s), r && e.hasOwnProperty('_lang') && (o._lang = e._lang), o;
  }, t.version = n, t.defaultFormat = E, t.lang = function (e, n) {
    var r;
    if (!e)
      return t.fn._lang._abbr;
    n ? R(e, n) : s[e] || U(e), t.duration.fn._lang = t.fn._lang = U(e);
  }, t.langData = function (e) {
    return e && e._lang && e._lang._abbr && (e = e._lang._abbr), U(e);
  }, t.isMoment = function (e) {
    return e instanceof D;
  }, t.isDuration = function (e) {
    return e instanceof P;
  }, t.fn = D.prototype = {
    clone: function () {
      return t(this);
    },
    valueOf: function () {
      return +this._d;
    },
    unix: function () {
      return Math.floor(+this._d / 1000);
    },
    toString: function () {
      return this.format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    },
    toDate: function () {
      return this._d;
    },
    toJSON: function () {
      return t.utc(this).format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
    },
    toArray: function () {
      var e = this;
      return [
        e.year(),
        e.month(),
        e.date(),
        e.hours(),
        e.minutes(),
        e.seconds(),
        e.milliseconds()
      ];
    },
    isValid: function () {
      return this._isValid == null && (this._a ? this._isValid = !q(this._a, (this._isUTC ? t.utc(this._a) : t(this._a)).toArray()) : this._isValid = !isNaN(this._d.getTime())), !!this._isValid;
    },
    utc: function () {
      return this._isUTC = !0, this;
    },
    local: function () {
      return this._isUTC = !1, this;
    },
    format: function (e) {
      var n = X(this, e || t.defaultFormat);
      return this.lang().postformat(n);
    },
    add: function (e, n) {
      var r;
      return typeof e == 'string' ? r = t.duration(+n, e) : r = t.duration(e, n), F(this, r, 1), this;
    },
    subtract: function (e, n) {
      var r;
      return typeof e == 'string' ? r = t.duration(+n, e) : r = t.duration(e, n), F(this, r, -1), this;
    },
    diff: function (e, n, r) {
      var i = this._isUTC ? t(e).utc() : t(e).local(), s = (this.zone() - i.zone()) * 60000, o, u;
      return n && (n = n.replace(/s$/, '')), n === 'year' || n === 'month' ? (o = (this.daysInMonth() + i.daysInMonth()) * 43200000, u = (this.year() - i.year()) * 12 + (this.month() - i.month()), u += (this - t(this).startOf('month') - (i - t(i).startOf('month'))) / o, n === 'year' && (u /= 12)) : (o = this - i - s, u = n === 'second' ? o / 1000 : n === 'minute' ? o / 60000 : n === 'hour' ? o / 3600000 : n === 'day' ? o / 86400000 : n === 'week' ? o / 604800000 : o), r ? u : B(u);
    },
    from: function (e, n) {
      return t.duration(this.diff(e)).lang(this.lang()._abbr).humanize(!n);
    },
    fromNow: function (e) {
      return this.from(t(), e);
    },
    calendar: function () {
      var e = this.diff(t().startOf('day'), 'days', !0), n = e < -6 ? 'sameElse' : e < -1 ? 'lastWeek' : e < 0 ? 'lastDay' : e < 1 ? 'sameDay' : e < 2 ? 'nextDay' : e < 7 ? 'nextWeek' : 'sameElse';
      return this.format(this.lang().calendar(n, this));
    },
    isLeapYear: function () {
      var e = this.year();
      return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0;
    },
    isDST: function () {
      return this.zone() < t([this.year()]).zone() || this.zone() < t([
        this.year(),
        5
      ]).zone();
    },
    day: function (e) {
      var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
      return e == null ? t : this.add({ d: e - t });
    },
    startOf: function (e) {
      e = e.replace(/s$/, '');
      switch (e) {
      case 'year':
        this.month(0);
      case 'month':
        this.date(1);
      case 'week':
      case 'day':
        this.hours(0);
      case 'hour':
        this.minutes(0);
      case 'minute':
        this.seconds(0);
      case 'second':
        this.milliseconds(0);
      }
      return e === 'week' && this.day(0), this;
    },
    endOf: function (e) {
      return this.startOf(e).add(e.replace(/s?$/, 's'), 1).subtract('ms', 1);
    },
    isAfter: function (e, n) {
      return n = typeof n != 'undefined' ? n : 'millisecond', +this.clone().startOf(n) > +t(e).startOf(n);
    },
    isBefore: function (e, n) {
      return n = typeof n != 'undefined' ? n : 'millisecond', +this.clone().startOf(n) < +t(e).startOf(n);
    },
    isSame: function (e, n) {
      return n = typeof n != 'undefined' ? n : 'millisecond', +this.clone().startOf(n) === +t(e).startOf(n);
    },
    zone: function () {
      return this._isUTC ? 0 : this._d.getTimezoneOffset();
    },
    daysInMonth: function () {
      return t.utc([
        this.year(),
        this.month() + 1,
        0
      ]).date();
    },
    dayOfYear: function (e) {
      var n = r((t(this).startOf('day') - t(this).startOf('year')) / 86400000) + 1;
      return e == null ? n : this.add('d', e - n);
    },
    isoWeek: function (e) {
      var t = tt(this, 1, 4);
      return e == null ? t : this.add('d', (e - t) * 7);
    },
    week: function (e) {
      var t = this.lang().week(this);
      return e == null ? t : this.add('d', (e - t) * 7);
    },
    lang: function (t) {
      return t === e ? this._lang : (this._lang = U(t), this);
    }
  };
  for (i = 0; i < T.length; i++)
    rt(T[i].toLowerCase().replace(/s$/, ''), T[i]);
  rt('year', 'FullYear'), t.fn.days = t.fn.day, t.fn.weeks = t.fn.week, t.fn.isoWeeks = t.fn.isoWeek, t.duration.fn = P.prototype = {
    weeks: function () {
      return B(this.days() / 7);
    },
    valueOf: function () {
      return this._milliseconds + this._days * 86400000 + this._months * 2592000000;
    },
    humanize: function (e) {
      var t = +this, n = et(t, !e, this.lang());
      return e && (n = this.lang().pastFuture(t, n)), this.lang().postformat(n);
    },
    lang: t.fn.lang
  };
  for (i in N)
    N.hasOwnProperty(i) && (st(i, N[i]), it(i.toLowerCase()));
  st('Weeks', 604800000), t.lang('en', {
    ordinal: function (e) {
      var t = e % 10, n = ~~(e % 100 / 10) === 1 ? 'th' : t === 1 ? 'st' : t === 2 ? 'nd' : t === 3 ? 'rd' : 'th';
      return e + n;
    }
  }), o && (module.exports = t), typeof ender == 'undefined' && (this.moment = t), typeof define == 'function' && define.amd && define('moment', [], function () {
    return t;
  });
}.call(this));
/* mousetrap v1.4.6 craig.is/killing/mice */
(function (J, r, f) {
  function s(a, b, d) {
    a.addEventListener ? a.addEventListener(b, d, !1) : a.attachEvent('on' + b, d);
  }
  function A(a) {
    if ('keypress' == a.type) {
      var b = String.fromCharCode(a.which);
      a.shiftKey || (b = b.toLowerCase());
      return b;
    }
    return h[a.which] ? h[a.which] : B[a.which] ? B[a.which] : String.fromCharCode(a.which).toLowerCase();
  }
  function t(a) {
    a = a || {};
    var b = !1, d;
    for (d in n)
      a[d] ? b = !0 : n[d] = 0;
    b || (u = !1);
  }
  function C(a, b, d, c, e, v) {
    var g, k, f = [], h = d.type;
    if (!l[a])
      return [];
    'keyup' == h && w(a) && (b = [a]);
    for (g = 0; g < l[a].length; ++g)
      if (k = l[a][g], !(!c && k.seq && n[k.seq] != k.level || h != k.action || ('keypress' != h || d.metaKey || d.ctrlKey) && b.sort().join(',') !== k.modifiers.sort().join(','))) {
        var m = c && k.seq == c && k.level == v;
        (!c && k.combo == e || m) && l[a].splice(g, 1);
        f.push(k);
      }
    return f;
  }
  function K(a) {
    var b = [];
    a.shiftKey && b.push('shift');
    a.altKey && b.push('alt');
    a.ctrlKey && b.push('ctrl');
    a.metaKey && b.push('meta');
    return b;
  }
  function x(a, b, d, c) {
    m.stopCallback(b, b.target || b.srcElement, d, c) || !1 !== a(b, d) || (b.preventDefault ? b.preventDefault() : b.returnValue = !1, b.stopPropagation ? b.stopPropagation() : b.cancelBubble = !0);
  }
  function y(a) {
    'number' !== typeof a.which && (a.which = a.keyCode);
    var b = A(a);
    b && ('keyup' == a.type && z === b ? z = !1 : m.handleKey(b, K(a), a));
  }
  function w(a) {
    return 'shift' == a || 'ctrl' == a || 'alt' == a || 'meta' == a;
  }
  function L(a, b, d, c) {
    function e(b) {
      return function () {
        u = b;
        ++n[a];
        clearTimeout(D);
        D = setTimeout(t, 1000);
      };
    }
    function v(b) {
      x(d, b, a);
      'keyup' !== c && (z = A(b));
      setTimeout(t, 10);
    }
    for (var g = n[a] = 0; g < b.length; ++g) {
      var f = g + 1 === b.length ? v : e(c || E(b[g + 1]).action);
      F(b[g], f, c, a, g);
    }
  }
  function E(a, b) {
    var d, c, e, f = [];
    d = '+' === a ? ['+'] : a.split('+');
    for (e = 0; e < d.length; ++e)
      c = d[e], G[c] && (c = G[c]), b && 'keypress' != b && H[c] && (c = H[c], f.push('shift')), w(c) && f.push(c);
    d = c;
    e = b;
    if (!e) {
      if (!p) {
        p = {};
        for (var g in h)
          95 < g && 112 > g || h.hasOwnProperty(g) && (p[h[g]] = g);
      }
      e = p[d] ? 'keydown' : 'keypress';
    }
    'keypress' == e && f.length && (e = 'keydown');
    return {
      key: c,
      modifiers: f,
      action: e
    };
  }
  function F(a, b, d, c, e) {
    q[a + ':' + d] = b;
    a = a.replace(/\s+/g, ' ');
    var f = a.split(' ');
    1 < f.length ? L(a, f, b, d) : (d = E(a, d), l[d.key] = l[d.key] || [], C(d.key, d.modifiers, { type: d.action }, c, a, e), l[d.key][c ? 'unshift' : 'push']({
      callback: b,
      modifiers: d.modifiers,
      action: d.action,
      seq: c,
      level: e,
      combo: a
    }));
  }
  var h = {
      8: 'backspace',
      9: 'tab',
      13: 'enter',
      16: 'shift',
      17: 'ctrl',
      18: 'alt',
      20: 'capslock',
      27: 'esc',
      32: 'space',
      33: 'pageup',
      34: 'pagedown',
      35: 'end',
      36: 'home',
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down',
      45: 'ins',
      46: 'del',
      91: 'meta',
      93: 'meta',
      224: 'meta'
    }, B = {
      106: '*',
      107: '+',
      109: '-',
      110: '.',
      111: '/',
      186: ';',
      187: '=',
      188: ',',
      189: '-',
      190: '.',
      191: '/',
      192: '`',
      219: '[',
      220: '\\',
      221: ']',
      222: '\''
    }, H = {
      '~': '`',
      '!': '1',
      '@': '2',
      '#': '3',
      $: '4',
      '%': '5',
      '^': '6',
      '&': '7',
      '*': '8',
      '(': '9',
      ')': '0',
      _: '-',
      '+': '=',
      ':': ';',
      '"': '\'',
      '<': ',',
      '>': '.',
      '?': '/',
      '|': '\\'
    }, G = {
      option: 'alt',
      command: 'meta',
      'return': 'enter',
      escape: 'esc',
      mod: /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? 'meta' : 'ctrl'
    }, p, l = {}, q = {}, n = {}, D, z = !1, I = !1, u = !1;
  for (f = 1; 20 > f; ++f)
    h[111 + f] = 'f' + f;
  for (f = 0; 9 >= f; ++f)
    h[f + 96] = f;
  s(r, 'keypress', y);
  s(r, 'keydown', y);
  s(r, 'keyup', y);
  var m = {
      bind: function (a, b, d) {
        a = a instanceof Array ? a : [a];
        for (var c = 0; c < a.length; ++c)
          F(a[c], b, d);
        return this;
      },
      unbind: function (a, b) {
        return m.bind(a, function () {
        }, b);
      },
      trigger: function (a, b) {
        if (q[a + ':' + b])
          q[a + ':' + b]({}, a);
        return this;
      },
      reset: function () {
        l = {};
        q = {};
        return this;
      },
      stopCallback: function (a, b) {
        return -1 < (' ' + b.className + ' ').indexOf(' mousetrap ') ? !1 : 'INPUT' == b.tagName || 'SELECT' == b.tagName || 'TEXTAREA' == b.tagName || b.isContentEditable;
      },
      handleKey: function (a, b, d) {
        var c = C(a, b, d), e;
        b = {};
        var f = 0, g = !1;
        for (e = 0; e < c.length; ++e)
          c[e].seq && (f = Math.max(f, c[e].level));
        for (e = 0; e < c.length; ++e)
          c[e].seq ? c[e].level == f && (g = !0, b[c[e].seq] = 1, x(c[e].callback, d, c[e].combo, c[e].seq)) : g || x(c[e].callback, d, c[e].combo);
        c = 'keypress' == d.type && I;
        d.type != u || w(a) || c || t(b);
        I = g && 'keydown' == d.type;
      }
    };
  J.Mousetrap = m;
  'function' === typeof define && define.amd && define(m);
}(window, document));
// SoundRad config
// Beta config
var clientID = '66828e9e2042e682190d1fde4b02e265';
var callbackUrl = 'http://beta.soundrad.com/callback';
// Official config
// var clientID = '683f27c0c6dace16e7498ebffcbef8be';
// var callbackUrl = 'http://soundrad.com/callback';
'text use strict';
var soundrad = angular.module('soundrad', [
    'ngTouch',
    'ngRoute',
    'ngSanitize'
  ]).config([
    '$routeProvider',
    '$locationProvider',
    function ($routeProvider, $locationProvider) {
      $routeProvider.when('/', { templateUrl: '/partials/home.html' });
      $routeProvider.when('/callback', { templateUrl: '/partials/callback.html' });
      $routeProvider.when('/settings', { templateUrl: '/partials/settings.html' });
      $routeProvider.when('/about', { templateUrl: '/partials/about.html' });
      $routeProvider.when('/search', {
        templateUrl: '/partials/search.html',
        controller: 'SearchCtrl'
      });
      $routeProvider.when('/:user/:subpath?/:setTitle?', {
        templateUrl: '/partials/user.html',
        controller: 'UserCtrl'
      });
      $locationProvider.html5Mode(true);
    }
  ]);
'use strict';
var Token;
soundrad.factory('soundcloud', function ($location, $window, storage) {
  SC.initialize({
    client_id: clientID,
    redirect_uri: callbackUrl
  });
  return {
    reconnect: function (token) {
      window.SC.storage().setItem('SC.accessToken', token);
      Token = token;
    },
    connect: function () {
      $window.location.href = 'https://soundcloud.com/connect?client_id=' + clientID + '&redirect_uri=' + callbackUrl + '&response_type=code_and_token&scope=non-expiring&display=popup';
    },
    me: function (callback) {
      SC.get('/me', callback);
    },
    getUser: function (user, callback) {
      SC.get('/users/' + user, callback);
    },
    getUserPlaylists: function (callback) {
      SC.get('/me/playlists', callback);
    },
    getTracks: function (url, params, callback) {
      SC.get(url, params, callback);
    },
    getTrack: function (path, callback) {
      SC.get('/resolve.json?url=http://soundcloud.com' + path, callback);
    },
    getSet: function (path, callback) {
      SC.get('/resolve.json?url=http://soundcloud.com' + path, callback);
    },
    getStream: function (url, params, callback) {
      SC.get(url, params, function (data) {
        var tracks = [];
        for (var i = 0; i < data.collection.length; i++) {
          if (data.collection[i].type == 'track') {
            var track = data.collection[i].origin;
            tracks.push(track);
          } else if (data.collection[i].type == 'track-sharing') {
            var track = data.collection[i].origin.track;
            tracks.push(track);
          } else {
            console.error('Its something else');
            console.log(data.collection[i]);
          }
          ;
        }
        ;
        callback(data, tracks);
      });
    },
    getFollowings: function (user, callback) {
      var initLimit = 128, initOffset = 0, followings = [], getF = function () {
          SC.get('/users/' + user + '/followings', {
            limit: initLimit,
            offset: initOffset
          }, function (data) {
            followings = followings.concat(data);
            if (followings.length >= initLimit + initOffset) {
              initOffset = initOffset + initLimit;
              getF();
            }
            ;
            callback(followings);
          });
        };
      getF();
    },
    getFollowers: function (user, callback) {
      var initLimit = 128, initOffset = 0, followers = [], getF = function () {
          SC.get('/users/' + user + '/followers', {
            limit: initLimit,
            offset: initOffset
          }, function (data) {
            followers = followers.concat(data);
            if (followers.length >= initLimit + initOffset) {
              initOffset = initOffset + initLimit;
              getF();
            }
            ;
            callback(followers);
          });
        };
      getF();
    },
    isFollowing: function (userid, callback) {
      SC.get('/me/followings/' + userid, callback);  // I love how well this fucking works
    },
    follow: function (userid, callback) {
      SC.put('/me/followings/' + userid, callback);
    },
    unfollow: function (userid, callback) {
      SC.delete('/me/followings/' + userid, callback);
    },
    like: function (track, callback) {
      SC.put('/me/favorites/' + track.id, callback);
    },
    unlike: function (track, callback) {
      SC.delete('/me/favorites/' + track.id, callback);
    },
    createPlaylist: function (playlist, callback) {
      SC.post('/playlists', playlist, callback);
    },
    addToPlaylist: function (track, playlist, callback) {
      var tracks = [], i;
      for (i in playlist.tracks) {
        tracks.push(playlist.tracks[i].id);
      }
      ;
      tracks.push(track.id);
      var tracks = tracks.map(function (id) {
          return { id: id };
        });
      SC.put(playlist.uri, { playlist: { tracks: tracks } }, callback);
    },
    removeFromPlaylist: function (track, playlist, callback) {
      var tracks = [], i;
      for (i in playlist.tracks) {
        if (playlist.tracks[i].id != track.id)
          tracks.push(playlist.tracks[i].id);
      }
      ;
      var tracks = tracks.map(function (id) {
          return { id: id };
        });
      SC.put(playlist.uri, { playlist: { tracks: tracks } }, callback);
    },
    updatePlaylist: function (playlist, callback) {
      var tracks = [], i;
      for (i in playlist.tracks) {
        tracks.push(playlist.tracks[i].id);
      }
      ;
      var tracks = tracks.map(function (id) {
          return { id: id };
        });
      SC.put(playlist.uri, { playlist: { tracks: tracks } }, callback);
    },
    search: function (params, callback) {
      console.log('getting search');
      SC.get('/search', params, callback);
    },
    resolve: function (path, callback) {
      SC.get('/resolve.json?url=http://soundcloud.com' + path, callback);
    }
  };
});
////////////////////////////////////////////////////////////////
// Player Factory
soundrad.factory('player', function (audio, soundcloud) {
  var player, tracks, i, urlParams, currentTimePercentage = audio.currentTime;
  player = {
    tracks: tracks,
    i: i,
    playing: false,
    paused: false,
    loaded: false,
    play: function (tracks, i) {
      if (i == null) {
        tracks = new Array(tracks);
        i = 0;
      }
      ;
      player.tracks = tracks;
      if (Token && tracks[i].sharing == 'private') {
        urlParams = '?oauth_token=' + Token;
      } else {
        urlParams = '?client_id=' + clientID;
      }
      ;
      if (player.paused != tracks[i] || player.loaded)
        audio.src = tracks[i].stream_url + urlParams;
      audio.play();
      player.playing = tracks[i];
      player.i = i;
      player.paused = false;
      player.loaded = false;
    },
    pause: function (track) {
      if (player.playing) {
        audio.pause();
        player.playing = false;
        player.paused = track;
      }
    },
    toggle: function () {
      if (player.playing) {
        player.pause(player.playing);
      } else if (player.paused) {
        player.play(player.tracks, player.i);
      } else if (player.tracks) {
        player.play(player.tracks, 0);
      }
      ;
    },
    stop: function () {
      audio.pause();
      player.playing = false;
      player.paused = false;
    },
    next: function () {
      if (player.tracks.length > player.i + 1) {
        player.i = player.i + 1;
        player.play(player.tracks, player.i);
      } else {
      }
      ;
    },
    prev: function () {
      if (player.i > 0)
        player.i = player.i - 1;
      if (player.playing)
        player.play(player.tracks, player.i);
    },
    addTracks: function (tracks) {
      console.log(player.tracks.length);
      console.log(tracks);
      player.tracks = player.tracks.concat(tracks);
      console.log(player.tracks.length);
    },
    load: function (tracks) {
      if (!Array.isArray(tracks)) {
        tracks = new Array(tracks);
      }
      ;
      player.tracks = tracks;
      player.i = 0;
      player.paused = tracks[0];
      player.loaded = true;
    }
  };
  audio.addEventListener('ended', function () {
    player.next();
  }, false);
  return player;
});
////////////////////////////////////////////////////////////////
// Audio Factory
soundrad.factory('audio', function ($document) {
  var audio = $document[0].createElement('audio');
  return audio;
});
////////////////////////////////////////////////////////////////
// Local Storage Factory
soundrad.factory('storage', function () {
  return {
    set: function (key, obj) {
      var string = JSON.stringify(obj);
      localStorage.setItem(key, string);
    },
    get: function (key, callback) {
      var data = localStorage.getItem(key);
      var obj = JSON.parse(data);
      return obj;
    },
    clearAll: function () {
      localStorage.clear();
    }
  };
});
////////////////////////////////////////////////////////////////
// Filters
// Converts dates to relative time
soundrad.filter('fromNow', function () {
  return function (dateString) {
    return moment(new Date(dateString)).fromNow();
  };
});
// Converts milliseconds to hours, minutes, seconds
soundrad.filter('playTime', function () {
  return function (ms) {
    var hours = Math.floor(ms / 3600000), mins = '0' + Math.floor(ms % 3600000 / 60000), secs = '0' + Math.floor(ms % 60000 / 1000);
    mins = mins.substr(mins.length - 2);
    secs = secs.substr(secs.length - 2);
    if (hours) {
      return hours + ':' + mins + ':' + secs;
    } else {
      return mins + ':' + secs;
    }
    ;
  };
});
// Filters text from JSON objects
soundrad.filter('richtext', function () {
  return function (text) {
    if (text) {
      return text.replace(/\n/g, '<br/>');
    }
    ;
  };
});
// Escapes text for URL encoding
soundrad.filter('escape', function () {
  return function (text) {
    if (text) {
      return text.escape;
    }
    ;
  };
});
// Plangular Icons
soundrad.directive('icon', function () {
  var iconUrl = 'icons/plangular-icons.svg', xmlHttp = null, sprite;
  xmlHttp = new XMLHttpRequest();
  xmlHttp.open('GET', iconUrl, false);
  xmlHttp.send(null);
  if (xmlHttp.responseXML)
    sprite = xmlHttp.responseXML.documentElement;
  else
    console.error('Icon sprite not found - check iconUrl variable in plangular.js');
  return {
    restrict: 'A',
    scope: true,
    link: function (scope, elem, attrs) {
      if (!sprite)
        return false;
      var el = elem[0], id = attrs.icon, svg = sprite.getElementById(id).cloneNode(true);
      el.className += ' plangular-icon plangular-icon-' + id;
      svg.removeAttribute('id');
      svg.setAttribute('class', el.className);
      el.parentNode.replaceChild(svg, el);
    }
  };
});
'use strict';
soundrad.controller('PlayerCtrl', [
  '$scope',
  'player',
  'audio',
  function ($scope, player, audio) {
    $scope.player = player;
    $scope.audio = audio;
    Mousetrap.bind([
      'j',
      'shift+right'
    ], function () {
      $scope.$apply(function () {
        player.next();
      });
    });
    Mousetrap.bind([
      'k',
      'shift+left'
    ], function () {
      $scope.$apply(function () {
        player.prev();
      });
    });
    Mousetrap.bind('space', function (e) {
      e.preventDefault();
      $scope.$apply(function () {
        player.toggle();
      });
    });
  }
]);
soundrad.controller('HeadCtrl', [
  '$scope',
  'player',
  function ($scope, player) {
    $scope.title = function () {
      if (player.playing) {
        return '\u25ba ' + player.tracks[player.i].title + ' | SoundRad';
      } else if (player.paused) {
        return player.tracks[player.i].title + ' | SoundRad';
      } else {
        return 'SoundRad';
      }
      ;
    };
  }
]);
soundrad.controller('ScrubberCtrl', [
  '$scope',
  'audio',
  function ($scope, audio) {
    function updateView() {
      $scope.$apply(function () {
        $scope.currentBufferPercentage = (audio.buffered.length && audio.buffered.end(0)) / audio.duration * 100;
        $scope.currentTimePercentage = audio.currentTime / audio.duration * 100;
        $scope.currentTimeMS = (audio.currentTime * 1000).toFixed();
        $scope.durationMS = (audio.duration * 1000).toFixed();
      });
    }
    ;
    audio.addEventListener('timeupdate', updateView, false);
    $scope.seekTo = function ($event) {
      var xpos = $event.offsetX / $event.target.offsetWidth;
      audio.currentTime = xpos * audio.duration;
    };
  }
]);
soundrad.controller('NavCtrl', [
  '$scope',
  '$routeParams',
  '$window',
  '$location',
  'soundcloud',
  'storage',
  function ($scope, $routeParams, $window, $location, soundcloud, storage) {
    // Defaults
    $scope.user = 'test';
    $scope.userData = null;
    $scope.page = 1;
    $scope.pageSize = 16;
    $scope.pageOffset = 0;
    $scope.$routeParams = $routeParams;
    $scope.token = storage.get('token');
    $scope.me = storage.get('me');
    $scope.isConnecting = false;
    $scope.modal = null;
    // Fake UI empty state loading
    $scope.setEmptyState = function () {
      $scope.tracks = [
        {
          user: { username: '\xa0' },
          title: '\xa0'
        },
        {
          user: { username: '\xa0' },
          title: '\xa0'
        },
        {
          user: { username: '\xa0' },
          title: '\xa0'
        },
        {
          user: { username: '\xa0' },
          title: '\xa0'
        },
        {
          user: { username: '\xa0' },
          title: '\xa0'
        },
        {
          user: { username: '\xa0' },
          title: '\xa0'
        },
        {
          user: { username: '\xa0' },
          title: '\xa0'
        },
        {
          user: { username: '\xa0' },
          title: '\xa0'
        },
        {
          user: { username: '\xa0' },
          title: '\xa0'
        },
        {
          user: { username: '\xa0' },
          title: '\xa0'
        },
        {
          user: { username: '\xa0' },
          title: '\xa0'
        },
        {
          user: { username: '\xa0' },
          title: '\xa0'
        }
      ];
    };
    // Get token from url hash after auth
    if ($location.hash()) {
      console.log('getting token from hash');
      var token = $location.hash().replace('#', '').split('&')[0].split('=')[1];
      if (token) {
        storage.set('token', token);
        $scope.token = token;
        $scope.isConnecting = true;  // May need to refresh the page
      }
      ;
    }
    ;
    var getUserPlaylists = function () {
      soundcloud.getUserPlaylists(function (data) {
        $scope.$apply(function () {
          $scope.userPlaylists = data;
        });
      });
    };
    if ($scope.token) {
      soundcloud.reconnect($scope.token);
      soundcloud.me(function (me) {
        $scope.me = me;
        storage.set('me', me);
        getUserPlaylists();
      });
    }
    ;
    $scope.connect = function () {
      soundcloud.connect();
    };
    $scope.logOut = function () {
      storage.clearAll();
      $window.location.href = '/';
    };
    $scope.openModal = function (obj) {
      $scope.modal = obj;
    };
    $scope.closeModal = function () {
      $scope.modal = null;
    };
    Mousetrap.bind('g s', function () {
      $scope.$apply(function () {
        $location.path('/');
      });
    });
    Mousetrap.bind('g m', function () {
      $scope.$apply(function () {
        $location.path('/' + $scope.me.permalink);
      });
    });
    Mousetrap.bind('g l', function () {
      $scope.$apply(function () {
        $location.path('/' + $scope.me.permalink + '/likes');
      });
    });
    Mousetrap.bind('g p', function () {
      $scope.$apply(function () {
        $location.path('/' + $scope.me.permalink + '/sets');
      });
    });
    Mousetrap.bind('/', function (e) {
      e.preventDefault();
      $scope.$apply(function () {
        $location.path('/search');
      });
    });
    Mousetrap.bind('esc', function (e) {
      e.preventDefault();
      $scope.$apply(function () {
        $scope.closeModal();
      });
    });
  }
]);
soundrad.controller('CallbackCtrl', [
  '$scope',
  '$location',
  function ($scope, $location) {
    $location.path('/');
  }
]);
soundrad.controller('StreamCtrl', [
  '$scope',
  '$location',
  'soundcloud',
  'player',
  function ($scope, $location, soundcloud, player) {
    $scope.page = 1;
    $scope.isLoading = true;
    $scope.player = player;
    var url = '/me/activities/tracks';
    var params = { limit: $scope.pageSize };
    $scope.setEmptyState();
    soundcloud.getStream(url, params, function (data, tracks) {
      $scope.$apply(function () {
        $scope.tracks = tracks;
        $scope.isLoading = false;
        $scope.streamNextPage = data.next_href;
        if (!player.playing) {
          player.load($scope.tracks);
        }
        ;
      });
    });
    // Stream Pagination
    $scope.loadMore = function () {
      if ($scope.isLoading)
        return false;
      $scope.isLoading = true;
      var url = $scope.streamNextPage;
      var params = { limit: $scope.pageSize };
      soundcloud.getStream(url, params, function (data, tracks) {
        $scope.$apply(function () {
          if ($scope.tracks[$scope.tracks.length - 1].id == player.tracks[player.tracks.length - 1].id) {
            player.tracks = player.tracks.concat(tracks);
          }
          ;
          $scope.tracks = $scope.tracks.concat(tracks);
          $scope.isLoading = false;
          $scope.streamNextPage = data.next_href;
        });
      });
      $scope.page = $scope.page + 1;  //$location.hash($scope.page);
    };
  }
]);
soundrad.controller('UserCtrl', [
  '$scope',
  '$sce',
  'soundcloud',
  '$routeParams',
  'player',
  function ($scope, $sce, soundcloud, $routeParams, player) {
    $scope.isLoading = true;
    $scope.isSetlist = false;
    $scope.player = player;
    $scope.state = $routeParams;
    var params = {
        limit: $scope.pageSize,
        offset: $scope.pageOffset
      };
    if ($routeParams.user != $scope.$parent.user) {
      $scope.$parent.user = $routeParams.user;
      soundcloud.getUser($scope.$parent.user, function (data) {
        $scope.$apply(function () {
          $scope.$parent.userData = data;
          $scope.userDescription = $sce.trustAsHtml(data.description);
          $scope.username = data.username;
          $scope.followersCount = parseInt(data.followers_count);
          $scope.followingsCount = parseInt(data.followings_count);
        });
      });
    }
    ;
    $scope.follow = function (userid) {
      soundcloud.follow(userid);
    };
    $scope.unfollow = function (userid) {
      soundcloud.unfollow(userid);
    };
    var getTracks = function () {
      $scope.setEmptyState();
      soundcloud.getTracks($scope.api, params, function (data) {
        $scope.$apply(function () {
          $scope.tracks = data;
          $scope.hasPrevPage = $scope.pageOffset >= $scope.pageSize;
          $scope.hasNextPage = $scope.tracks.length >= $scope.pageSize;
          $scope.isLoading = false;
          if (!player.playing)
            player.load($scope.tracks);
        });
      });
    };
    var getTrack = function () {
      soundcloud.getTrack($scope.api, function (data) {
        $scope.$apply(function () {
          //$scope.tracks = new Array(data);
          $scope.tracks = null;
          $scope.track = data;
          //$scope.description = $sce.trustAsHtml(data.description);
          $scope.hasPrevPage = false;
          $scope.hasNextPage = false;
          $scope.isLoading = false;
          if (!player.playing)
            player.load($scope.track);
        });
      });
    };
    var getSet = function () {
      $scope.setEmptyState();
      soundcloud.getSet($scope.api, function (data) {
        $scope.$apply(function () {
          $scope.set = data;
          $scope.tracks = data.tracks;
          $scope.hasPrevPage = false;
          $scope.hasNextPage = false;
          $scope.streamNextPage = false;
          $scope.isLoading = false;
          if (!player.playing)
            player.load($scope.tracks);
        });
      });
    };
    if (!$routeParams.setTitle && $routeParams.subpath == 'sets')
      $scope.isSetlist = true;
    if (!$routeParams.subpath) {
      $scope.api = '/users/' + $scope.user + '/tracks';
      getTracks();
    } else if ($routeParams.subpath == 'likes') {
      $scope.api = '/users/' + $scope.user + '/favorites';
      getTracks();
    } else if ($routeParams.setTitle) {
      $scope.api = '/' + $scope.user + '/sets/' + $routeParams.setTitle;
      getSet();
    } else if ($routeParams.subpath == 'sets') {
      $scope.api = '/users/' + $scope.user + '/playlists';
      getTracks();
    } else {
      $scope.api = '/' + $scope.user + '/' + $routeParams.subpath;
      getTrack();
    }
    ;  // $scope.description = $sce.trustAsHtml($scope.userData.description);
  }
]);
soundrad.controller('TracklistCtrl', [
  '$scope',
  '$location',
  'soundcloud',
  'player',
  function ($scope, $location, soundcloud, player) {
    $scope.player = player;
    $scope.loadMore = function () {
      if ($scope.isLoading)
        return false;
      if ($scope.hasNextPage) {
        $scope.isLoading = true;
        $scope.pageOffset = $scope.pageOffset + $scope.pageSize;
        var params = {
            limit: $scope.pageSize,
            offset: $scope.pageOffset
          };
        soundcloud.getTracks($scope.api, params, function (data) {
          $scope.$apply(function () {
            if (player.tracks) {
              if ($scope.tracks[$scope.tracks.length - 1].id == player.tracks[player.tracks.length - 1].id) {
                player.tracks = player.tracks.concat(data);
              }
              ;
            }
            ;
            $scope.tracks = $scope.tracks.concat(data);
            $scope.hasNextPage = $scope.tracks.length >= $scope.pageSize;
            $scope.isLoading = false;
          });
        });
        $scope.page++;  //$location.hash($scope.page);
      }
      ;
    };
  }
]);
soundrad.controller('TrackCtrl', [
  '$scope',
  'soundcloud',
  function ($scope, soundcloud) {
    $scope.like = function (track) {
      if ($scope.token) {
        track.user_favorite = true;
        soundcloud.like(track, function (data) {
          $scope.$apply(function () {
            track.user_favorite = true;
          });
        });
      } else {
        $scope.connect();
      }
      ;
    };
    $scope.unlike = function (track) {
      track.user_favorite = false;
      soundcloud.unlike(track, function (data) {
        $scope.$apply(function () {
          track.user_favorite = false;
        });
      });
    };
  }
]);
soundrad.controller('AddToSetCtrl', [
  '$scope',
  '$timeout',
  'soundcloud',
  function ($scope, $timeout, soundcloud) {
    $scope.wasAdded = null;
    $scope.addToPlaylist = function (track, playlist) {
      soundcloud.addToPlaylist(track, playlist, function (data) {
        $scope.$apply(function () {
          console.log('Added to ' + data.title);
          $scope.wasAdded = data.id;
          $timeout(function () {
            $scope.wasAdded = null;
            $scope.closeModal();
          }, 800);
        });
      });
    };
    $scope.createPlaylist = function (name, track) {
      var tracks = [];
      tracks.push(track.id);
      var tracks = tracks.map(function (id) {
          return { id: id };
        });
      var playlist = {
          playlist: {
            title: name,
            tracks: tracks
          }
        };
      soundcloud.createPlaylist(playlist, function (data) {
        $scope.$apply(function () {
          console.log('Added to new playlist ' + data.title);  //$scope.flashMessage = 'Added to new playlist ' + data.title;
                                                               //$scope.addToPlaylistIsOpen = false;
                                                               //$timeout(function(){
                                                               //  $scope.flashMessage = null;
                                                               //  $scope.dropdownIsOpen = false;  
                                                               //}, 3500);
        });
      });
    };
  }
]);
soundrad.controller('SearchCtrl', [
  '$scope',
  '$location',
  'soundcloud',
  function ($scope, $location, soundcloud) {
    $scope.search = function () {
      $scope.isLoading = true;
      $scope.searchResults = null;
      $location.search('q', $scope.searchQuery);
      $scope.pageOffset = 0;
      var params = { q: $scope.searchQuery };
      soundcloud.search(params, function (data) {
        $scope.$apply(function () {
          $scope.searchResults = data.collection;
          $scope.isLoading = false;
        });
      });
    };
    $scope.searchMore = function () {
      if ($scope.isLoading || !$scope.searchResults)
        return false;
      $scope.isLoading = true;
      $scope.pageOffset = $scope.pageOffset + $scope.pageSize;
      var params = {
          q: $scope.searchQuery,
          offset: $scope.pageOffset
        };
      soundcloud.search(params, function (data) {
        $scope.$apply(function () {
          $scope.searchResults = $scope.searchResults.concat(data.collection);
          $scope.isLoading = false;
        });
      });
    };
    if ($location.search().q) {
      $scope.searchQuery = $location.search().q;
      $scope.search();
    }
    ;
  }
]);