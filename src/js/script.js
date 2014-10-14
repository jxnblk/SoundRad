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
/*! jQuery v1.11.0 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!function (a, b) {
  'object' == typeof module && 'object' == typeof module.exports ? module.exports = a.document ? b(a, !0) : function (a) {
    if (!a.document)
      throw new Error('jQuery requires a window with a document');
    return b(a);
  } : b(a);
}('undefined' != typeof window ? window : this, function (a, b) {
  var c = [], d = c.slice, e = c.concat, f = c.push, g = c.indexOf, h = {}, i = h.toString, j = h.hasOwnProperty, k = ''.trim, l = {}, m = '1.11.0', n = function (a, b) {
      return new n.fn.init(a, b);
    }, o = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, p = /^-ms-/, q = /-([\da-z])/gi, r = function (a, b) {
      return b.toUpperCase();
    };
  n.fn = n.prototype = {
    jquery: m,
    constructor: n,
    selector: '',
    length: 0,
    toArray: function () {
      return d.call(this);
    },
    get: function (a) {
      return null != a ? 0 > a ? this[a + this.length] : this[a] : d.call(this);
    },
    pushStack: function (a) {
      var b = n.merge(this.constructor(), a);
      return b.prevObject = this, b.context = this.context, b;
    },
    each: function (a, b) {
      return n.each(this, a, b);
    },
    map: function (a) {
      return this.pushStack(n.map(this, function (b, c) {
        return a.call(b, c, b);
      }));
    },
    slice: function () {
      return this.pushStack(d.apply(this, arguments));
    },
    first: function () {
      return this.eq(0);
    },
    last: function () {
      return this.eq(-1);
    },
    eq: function (a) {
      var b = this.length, c = +a + (0 > a ? b : 0);
      return this.pushStack(c >= 0 && b > c ? [this[c]] : []);
    },
    end: function () {
      return this.prevObject || this.constructor(null);
    },
    push: f,
    sort: c.sort,
    splice: c.splice
  }, n.extend = n.fn.extend = function () {
    var a, b, c, d, e, f, g = arguments[0] || {}, h = 1, i = arguments.length, j = !1;
    for ('boolean' == typeof g && (j = g, g = arguments[h] || {}, h++), 'object' == typeof g || n.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++)
      if (null != (e = arguments[h]))
        for (d in e)
          a = g[d], c = e[d], g !== c && (j && c && (n.isPlainObject(c) || (b = n.isArray(c))) ? (b ? (b = !1, f = a && n.isArray(a) ? a : []) : f = a && n.isPlainObject(a) ? a : {}, g[d] = n.extend(j, f, c)) : void 0 !== c && (g[d] = c));
    return g;
  }, n.extend({
    expando: 'jQuery' + (m + Math.random()).replace(/\D/g, ''),
    isReady: !0,
    error: function (a) {
      throw new Error(a);
    },
    noop: function () {
    },
    isFunction: function (a) {
      return 'function' === n.type(a);
    },
    isArray: Array.isArray || function (a) {
      return 'array' === n.type(a);
    },
    isWindow: function (a) {
      return null != a && a == a.window;
    },
    isNumeric: function (a) {
      return a - parseFloat(a) >= 0;
    },
    isEmptyObject: function (a) {
      var b;
      for (b in a)
        return !1;
      return !0;
    },
    isPlainObject: function (a) {
      var b;
      if (!a || 'object' !== n.type(a) || a.nodeType || n.isWindow(a))
        return !1;
      try {
        if (a.constructor && !j.call(a, 'constructor') && !j.call(a.constructor.prototype, 'isPrototypeOf'))
          return !1;
      } catch (c) {
        return !1;
      }
      if (l.ownLast)
        for (b in a)
          return j.call(a, b);
      for (b in a);
      return void 0 === b || j.call(a, b);
    },
    type: function (a) {
      return null == a ? a + '' : 'object' == typeof a || 'function' == typeof a ? h[i.call(a)] || 'object' : typeof a;
    },
    globalEval: function (b) {
      b && n.trim(b) && (a.execScript || function (b) {
        a.eval.call(a, b);
      })(b);
    },
    camelCase: function (a) {
      return a.replace(p, 'ms-').replace(q, r);
    },
    nodeName: function (a, b) {
      return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase();
    },
    each: function (a, b, c) {
      var d, e = 0, f = a.length, g = s(a);
      if (c) {
        if (g) {
          for (; f > e; e++)
            if (d = b.apply(a[e], c), d === !1)
              break;
        } else
          for (e in a)
            if (d = b.apply(a[e], c), d === !1)
              break;
      } else if (g) {
        for (; f > e; e++)
          if (d = b.call(a[e], e, a[e]), d === !1)
            break;
      } else
        for (e in a)
          if (d = b.call(a[e], e, a[e]), d === !1)
            break;
      return a;
    },
    trim: k && !k.call('\ufeff\xa0') ? function (a) {
      return null == a ? '' : k.call(a);
    } : function (a) {
      return null == a ? '' : (a + '').replace(o, '');
    },
    makeArray: function (a, b) {
      var c = b || [];
      return null != a && (s(Object(a)) ? n.merge(c, 'string' == typeof a ? [a] : a) : f.call(c, a)), c;
    },
    inArray: function (a, b, c) {
      var d;
      if (b) {
        if (g)
          return g.call(b, a, c);
        for (d = b.length, c = c ? 0 > c ? Math.max(0, d + c) : c : 0; d > c; c++)
          if (c in b && b[c] === a)
            return c;
      }
      return -1;
    },
    merge: function (a, b) {
      var c = +b.length, d = 0, e = a.length;
      while (c > d)
        a[e++] = b[d++];
      if (c !== c)
        while (void 0 !== b[d])
          a[e++] = b[d++];
      return a.length = e, a;
    },
    grep: function (a, b, c) {
      for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++)
        d = !b(a[f], f), d !== h && e.push(a[f]);
      return e;
    },
    map: function (a, b, c) {
      var d, f = 0, g = a.length, h = s(a), i = [];
      if (h)
        for (; g > f; f++)
          d = b(a[f], f, c), null != d && i.push(d);
      else
        for (f in a)
          d = b(a[f], f, c), null != d && i.push(d);
      return e.apply([], i);
    },
    guid: 1,
    proxy: function (a, b) {
      var c, e, f;
      return 'string' == typeof b && (f = a[b], b = a, a = f), n.isFunction(a) ? (c = d.call(arguments, 2), e = function () {
        return a.apply(b || this, c.concat(d.call(arguments)));
      }, e.guid = a.guid = a.guid || n.guid++, e) : void 0;
    },
    now: function () {
      return +new Date();
    },
    support: l
  }), n.each('Boolean Number String Function Array Date RegExp Object Error'.split(' '), function (a, b) {
    h['[object ' + b + ']'] = b.toLowerCase();
  });
  function s(a) {
    var b = a.length, c = n.type(a);
    return 'function' === c || n.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : 'array' === c || 0 === b || 'number' == typeof b && b > 0 && b - 1 in a;
  }
  var t = function (a) {
      var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s = 'sizzle' + -new Date(), t = a.document, u = 0, v = 0, w = eb(), x = eb(), y = eb(), z = function (a, b) {
          return a === b && (j = !0), 0;
        }, A = 'undefined', B = 1 << 31, C = {}.hasOwnProperty, D = [], E = D.pop, F = D.push, G = D.push, H = D.slice, I = D.indexOf || function (a) {
          for (var b = 0, c = this.length; c > b; b++)
            if (this[b] === a)
              return b;
          return -1;
        }, J = 'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped', K = '[\\x20\\t\\r\\n\\f]', L = '(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+', M = L.replace('w', 'w#'), N = '\\[' + K + '*(' + L + ')' + K + '*(?:([*^$|!~]?=)' + K + '*(?:([\'"])((?:\\\\.|[^\\\\])*?)\\3|(' + M + ')|)|)' + K + '*\\]', O = ':(' + L + ')(?:\\((([\'"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|' + N.replace(3, 8) + ')*)|.*)\\)|)', P = new RegExp('^' + K + '+|((?:^|[^\\\\])(?:\\\\.)*)' + K + '+$', 'g'), Q = new RegExp('^' + K + '*,' + K + '*'), R = new RegExp('^' + K + '*([>+~]|' + K + ')' + K + '*'), S = new RegExp('=' + K + '*([^\\]\'"]*?)' + K + '*\\]', 'g'), T = new RegExp(O), U = new RegExp('^' + M + '$'), V = {
          ID: new RegExp('^#(' + L + ')'),
          CLASS: new RegExp('^\\.(' + L + ')'),
          TAG: new RegExp('^(' + L.replace('w', 'w*') + ')'),
          ATTR: new RegExp('^' + N),
          PSEUDO: new RegExp('^' + O),
          CHILD: new RegExp('^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' + K + '*(even|odd|(([+-]|)(\\d*)n|)' + K + '*(?:([+-]|)' + K + '*(\\d+)|))' + K + '*\\)|)', 'i'),
          bool: new RegExp('^(?:' + J + ')$', 'i'),
          needsContext: new RegExp('^' + K + '*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' + K + '*((?:-\\d)?\\d*)' + K + '*\\)|)(?=[^-]|$)', 'i')
        }, W = /^(?:input|select|textarea|button)$/i, X = /^h\d$/i, Y = /^[^{]+\{\s*\[native \w/, Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, $ = /[+~]/, _ = /'|\\/g, ab = new RegExp('\\\\([\\da-f]{1,6}' + K + '?|(' + K + ')|.)', 'ig'), bb = function (a, b, c) {
          var d = '0x' + b - 65536;
          return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320);
        };
      try {
        G.apply(D = H.call(t.childNodes), t.childNodes), D[t.childNodes.length].nodeType;
      } catch (cb) {
        G = {
          apply: D.length ? function (a, b) {
            F.apply(a, H.call(b));
          } : function (a, b) {
            var c = a.length, d = 0;
            while (a[c++] = b[d++]);
            a.length = c - 1;
          }
        };
      }
      function db(a, b, d, e) {
        var f, g, h, i, j, m, p, q, u, v;
        if ((b ? b.ownerDocument || b : t) !== l && k(b), b = b || l, d = d || [], !a || 'string' != typeof a)
          return d;
        if (1 !== (i = b.nodeType) && 9 !== i)
          return [];
        if (n && !e) {
          if (f = Z.exec(a))
            if (h = f[1]) {
              if (9 === i) {
                if (g = b.getElementById(h), !g || !g.parentNode)
                  return d;
                if (g.id === h)
                  return d.push(g), d;
              } else if (b.ownerDocument && (g = b.ownerDocument.getElementById(h)) && r(b, g) && g.id === h)
                return d.push(g), d;
            } else {
              if (f[2])
                return G.apply(d, b.getElementsByTagName(a)), d;
              if ((h = f[3]) && c.getElementsByClassName && b.getElementsByClassName)
                return G.apply(d, b.getElementsByClassName(h)), d;
            }
          if (c.qsa && (!o || !o.test(a))) {
            if (q = p = s, u = b, v = 9 === i && a, 1 === i && 'object' !== b.nodeName.toLowerCase()) {
              m = ob(a), (p = b.getAttribute('id')) ? q = p.replace(_, '\\$&') : b.setAttribute('id', q), q = '[id=\'' + q + '\'] ', j = m.length;
              while (j--)
                m[j] = q + pb(m[j]);
              u = $.test(a) && mb(b.parentNode) || b, v = m.join(',');
            }
            if (v)
              try {
                return G.apply(d, u.querySelectorAll(v)), d;
              } catch (w) {
              } finally {
                p || b.removeAttribute('id');
              }
          }
        }
        return xb(a.replace(P, '$1'), b, d, e);
      }
      function eb() {
        var a = [];
        function b(c, e) {
          return a.push(c + ' ') > d.cacheLength && delete b[a.shift()], b[c + ' '] = e;
        }
        return b;
      }
      function fb(a) {
        return a[s] = !0, a;
      }
      function gb(a) {
        var b = l.createElement('div');
        try {
          return !!a(b);
        } catch (c) {
          return !1;
        } finally {
          b.parentNode && b.parentNode.removeChild(b), b = null;
        }
      }
      function hb(a, b) {
        var c = a.split('|'), e = a.length;
        while (e--)
          d.attrHandle[c[e]] = b;
      }
      function ib(a, b) {
        var c = b && a, d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || B) - (~a.sourceIndex || B);
        if (d)
          return d;
        if (c)
          while (c = c.nextSibling)
            if (c === b)
              return -1;
        return a ? 1 : -1;
      }
      function jb(a) {
        return function (b) {
          var c = b.nodeName.toLowerCase();
          return 'input' === c && b.type === a;
        };
      }
      function kb(a) {
        return function (b) {
          var c = b.nodeName.toLowerCase();
          return ('input' === c || 'button' === c) && b.type === a;
        };
      }
      function lb(a) {
        return fb(function (b) {
          return b = +b, fb(function (c, d) {
            var e, f = a([], c.length, b), g = f.length;
            while (g--)
              c[e = f[g]] && (c[e] = !(d[e] = c[e]));
          });
        });
      }
      function mb(a) {
        return a && typeof a.getElementsByTagName !== A && a;
      }
      c = db.support = {}, f = db.isXML = function (a) {
        var b = a && (a.ownerDocument || a).documentElement;
        return b ? 'HTML' !== b.nodeName : !1;
      }, k = db.setDocument = function (a) {
        var b, e = a ? a.ownerDocument || a : t, g = e.defaultView;
        return e !== l && 9 === e.nodeType && e.documentElement ? (l = e, m = e.documentElement, n = !f(e), g && g !== g.top && (g.addEventListener ? g.addEventListener('unload', function () {
          k();
        }, !1) : g.attachEvent && g.attachEvent('onunload', function () {
          k();
        })), c.attributes = gb(function (a) {
          return a.className = 'i', !a.getAttribute('className');
        }), c.getElementsByTagName = gb(function (a) {
          return a.appendChild(e.createComment('')), !a.getElementsByTagName('*').length;
        }), c.getElementsByClassName = Y.test(e.getElementsByClassName) && gb(function (a) {
          return a.innerHTML = '<div class=\'a\'></div><div class=\'a i\'></div>', a.firstChild.className = 'i', 2 === a.getElementsByClassName('i').length;
        }), c.getById = gb(function (a) {
          return m.appendChild(a).id = s, !e.getElementsByName || !e.getElementsByName(s).length;
        }), c.getById ? (d.find.ID = function (a, b) {
          if (typeof b.getElementById !== A && n) {
            var c = b.getElementById(a);
            return c && c.parentNode ? [c] : [];
          }
        }, d.filter.ID = function (a) {
          var b = a.replace(ab, bb);
          return function (a) {
            return a.getAttribute('id') === b;
          };
        }) : (delete d.find.ID, d.filter.ID = function (a) {
          var b = a.replace(ab, bb);
          return function (a) {
            var c = typeof a.getAttributeNode !== A && a.getAttributeNode('id');
            return c && c.value === b;
          };
        }), d.find.TAG = c.getElementsByTagName ? function (a, b) {
          return typeof b.getElementsByTagName !== A ? b.getElementsByTagName(a) : void 0;
        } : function (a, b) {
          var c, d = [], e = 0, f = b.getElementsByTagName(a);
          if ('*' === a) {
            while (c = f[e++])
              1 === c.nodeType && d.push(c);
            return d;
          }
          return f;
        }, d.find.CLASS = c.getElementsByClassName && function (a, b) {
          return typeof b.getElementsByClassName !== A && n ? b.getElementsByClassName(a) : void 0;
        }, p = [], o = [], (c.qsa = Y.test(e.querySelectorAll)) && (gb(function (a) {
          a.innerHTML = '<select t=\'\'><option selected=\'\'></option></select>', a.querySelectorAll('[t^=\'\']').length && o.push('[*^$]=' + K + '*(?:\'\'|"")'), a.querySelectorAll('[selected]').length || o.push('\\[' + K + '*(?:value|' + J + ')'), a.querySelectorAll(':checked').length || o.push(':checked');
        }), gb(function (a) {
          var b = e.createElement('input');
          b.setAttribute('type', 'hidden'), a.appendChild(b).setAttribute('name', 'D'), a.querySelectorAll('[name=d]').length && o.push('name' + K + '*[*^$|!~]?='), a.querySelectorAll(':enabled').length || o.push(':enabled', ':disabled'), a.querySelectorAll('*,:x'), o.push(',.*:');
        })), (c.matchesSelector = Y.test(q = m.webkitMatchesSelector || m.mozMatchesSelector || m.oMatchesSelector || m.msMatchesSelector)) && gb(function (a) {
          c.disconnectedMatch = q.call(a, 'div'), q.call(a, '[s!=\'\']:x'), p.push('!=', O);
        }), o = o.length && new RegExp(o.join('|')), p = p.length && new RegExp(p.join('|')), b = Y.test(m.compareDocumentPosition), r = b || Y.test(m.contains) ? function (a, b) {
          var c = 9 === a.nodeType ? a.documentElement : a, d = b && b.parentNode;
          return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)));
        } : function (a, b) {
          if (b)
            while (b = b.parentNode)
              if (b === a)
                return !0;
          return !1;
        }, z = b ? function (a, b) {
          if (a === b)
            return j = !0, 0;
          var d = !a.compareDocumentPosition - !b.compareDocumentPosition;
          return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !c.sortDetached && b.compareDocumentPosition(a) === d ? a === e || a.ownerDocument === t && r(t, a) ? -1 : b === e || b.ownerDocument === t && r(t, b) ? 1 : i ? I.call(i, a) - I.call(i, b) : 0 : 4 & d ? -1 : 1);
        } : function (a, b) {
          if (a === b)
            return j = !0, 0;
          var c, d = 0, f = a.parentNode, g = b.parentNode, h = [a], k = [b];
          if (!f || !g)
            return a === e ? -1 : b === e ? 1 : f ? -1 : g ? 1 : i ? I.call(i, a) - I.call(i, b) : 0;
          if (f === g)
            return ib(a, b);
          c = a;
          while (c = c.parentNode)
            h.unshift(c);
          c = b;
          while (c = c.parentNode)
            k.unshift(c);
          while (h[d] === k[d])
            d++;
          return d ? ib(h[d], k[d]) : h[d] === t ? -1 : k[d] === t ? 1 : 0;
        }, e) : l;
      }, db.matches = function (a, b) {
        return db(a, null, null, b);
      }, db.matchesSelector = function (a, b) {
        if ((a.ownerDocument || a) !== l && k(a), b = b.replace(S, '=\'$1\']'), !(!c.matchesSelector || !n || p && p.test(b) || o && o.test(b)))
          try {
            var d = q.call(a, b);
            if (d || c.disconnectedMatch || a.document && 11 !== a.document.nodeType)
              return d;
          } catch (e) {
          }
        return db(b, l, null, [a]).length > 0;
      }, db.contains = function (a, b) {
        return (a.ownerDocument || a) !== l && k(a), r(a, b);
      }, db.attr = function (a, b) {
        (a.ownerDocument || a) !== l && k(a);
        var e = d.attrHandle[b.toLowerCase()], f = e && C.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !n) : void 0;
        return void 0 !== f ? f : c.attributes || !n ? a.getAttribute(b) : (f = a.getAttributeNode(b)) && f.specified ? f.value : null;
      }, db.error = function (a) {
        throw new Error('Syntax error, unrecognized expression: ' + a);
      }, db.uniqueSort = function (a) {
        var b, d = [], e = 0, f = 0;
        if (j = !c.detectDuplicates, i = !c.sortStable && a.slice(0), a.sort(z), j) {
          while (b = a[f++])
            b === a[f] && (e = d.push(f));
          while (e--)
            a.splice(d[e], 1);
        }
        return i = null, a;
      }, e = db.getText = function (a) {
        var b, c = '', d = 0, f = a.nodeType;
        if (f) {
          if (1 === f || 9 === f || 11 === f) {
            if ('string' == typeof a.textContent)
              return a.textContent;
            for (a = a.firstChild; a; a = a.nextSibling)
              c += e(a);
          } else if (3 === f || 4 === f)
            return a.nodeValue;
        } else
          while (b = a[d++])
            c += e(b);
        return c;
      }, d = db.selectors = {
        cacheLength: 50,
        createPseudo: fb,
        match: V,
        attrHandle: {},
        find: {},
        relative: {
          '>': {
            dir: 'parentNode',
            first: !0
          },
          ' ': { dir: 'parentNode' },
          '+': {
            dir: 'previousSibling',
            first: !0
          },
          '~': { dir: 'previousSibling' }
        },
        preFilter: {
          ATTR: function (a) {
            return a[1] = a[1].replace(ab, bb), a[3] = (a[4] || a[5] || '').replace(ab, bb), '~=' === a[2] && (a[3] = ' ' + a[3] + ' '), a.slice(0, 4);
          },
          CHILD: function (a) {
            return a[1] = a[1].toLowerCase(), 'nth' === a[1].slice(0, 3) ? (a[3] || db.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ('even' === a[3] || 'odd' === a[3])), a[5] = +(a[7] + a[8] || 'odd' === a[3])) : a[3] && db.error(a[0]), a;
          },
          PSEUDO: function (a) {
            var b, c = !a[5] && a[2];
            return V.CHILD.test(a[0]) ? null : (a[3] && void 0 !== a[4] ? a[2] = a[4] : c && T.test(c) && (b = ob(c, !0)) && (b = c.indexOf(')', c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3));
          }
        },
        filter: {
          TAG: function (a) {
            var b = a.replace(ab, bb).toLowerCase();
            return '*' === a ? function () {
              return !0;
            } : function (a) {
              return a.nodeName && a.nodeName.toLowerCase() === b;
            };
          },
          CLASS: function (a) {
            var b = w[a + ' '];
            return b || (b = new RegExp('(^|' + K + ')' + a + '(' + K + '|$)')) && w(a, function (a) {
              return b.test('string' == typeof a.className && a.className || typeof a.getAttribute !== A && a.getAttribute('class') || '');
            });
          },
          ATTR: function (a, b, c) {
            return function (d) {
              var e = db.attr(d, a);
              return null == e ? '!=' === b : b ? (e += '', '=' === b ? e === c : '!=' === b ? e !== c : '^=' === b ? c && 0 === e.indexOf(c) : '*=' === b ? c && e.indexOf(c) > -1 : '$=' === b ? c && e.slice(-c.length) === c : '~=' === b ? (' ' + e + ' ').indexOf(c) > -1 : '|=' === b ? e === c || e.slice(0, c.length + 1) === c + '-' : !1) : !0;
            };
          },
          CHILD: function (a, b, c, d, e) {
            var f = 'nth' !== a.slice(0, 3), g = 'last' !== a.slice(-4), h = 'of-type' === b;
            return 1 === d && 0 === e ? function (a) {
              return !!a.parentNode;
            } : function (b, c, i) {
              var j, k, l, m, n, o, p = f !== g ? 'nextSibling' : 'previousSibling', q = b.parentNode, r = h && b.nodeName.toLowerCase(), t = !i && !h;
              if (q) {
                if (f) {
                  while (p) {
                    l = b;
                    while (l = l[p])
                      if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType)
                        return !1;
                    o = p = 'only' === a && !o && 'nextSibling';
                  }
                  return !0;
                }
                if (o = [g ? q.firstChild : q.lastChild], g && t) {
                  k = q[s] || (q[s] = {}), j = k[a] || [], n = j[0] === u && j[1], m = j[0] === u && j[2], l = n && q.childNodes[n];
                  while (l = ++n && l && l[p] || (m = n = 0) || o.pop())
                    if (1 === l.nodeType && ++m && l === b) {
                      k[a] = [
                        u,
                        n,
                        m
                      ];
                      break;
                    }
                } else if (t && (j = (b[s] || (b[s] = {}))[a]) && j[0] === u)
                  m = j[1];
                else
                  while (l = ++n && l && l[p] || (m = n = 0) || o.pop())
                    if ((h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) && ++m && (t && ((l[s] || (l[s] = {}))[a] = [
                        u,
                        m
                      ]), l === b))
                      break;
                return m -= e, m === d || m % d === 0 && m / d >= 0;
              }
            };
          },
          PSEUDO: function (a, b) {
            var c, e = d.pseudos[a] || d.setFilters[a.toLowerCase()] || db.error('unsupported pseudo: ' + a);
            return e[s] ? e(b) : e.length > 1 ? (c = [
              a,
              a,
              '',
              b
            ], d.setFilters.hasOwnProperty(a.toLowerCase()) ? fb(function (a, c) {
              var d, f = e(a, b), g = f.length;
              while (g--)
                d = I.call(a, f[g]), a[d] = !(c[d] = f[g]);
            }) : function (a) {
              return e(a, 0, c);
            }) : e;
          }
        },
        pseudos: {
          not: fb(function (a) {
            var b = [], c = [], d = g(a.replace(P, '$1'));
            return d[s] ? fb(function (a, b, c, e) {
              var f, g = d(a, null, e, []), h = a.length;
              while (h--)
                (f = g[h]) && (a[h] = !(b[h] = f));
            }) : function (a, e, f) {
              return b[0] = a, d(b, null, f, c), !c.pop();
            };
          }),
          has: fb(function (a) {
            return function (b) {
              return db(a, b).length > 0;
            };
          }),
          contains: fb(function (a) {
            return function (b) {
              return (b.textContent || b.innerText || e(b)).indexOf(a) > -1;
            };
          }),
          lang: fb(function (a) {
            return U.test(a || '') || db.error('unsupported lang: ' + a), a = a.replace(ab, bb).toLowerCase(), function (b) {
              var c;
              do
                if (c = n ? b.lang : b.getAttribute('xml:lang') || b.getAttribute('lang'))
                  return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + '-');
              while ((b = b.parentNode) && 1 === b.nodeType);
              return !1;
            };
          }),
          target: function (b) {
            var c = a.location && a.location.hash;
            return c && c.slice(1) === b.id;
          },
          root: function (a) {
            return a === m;
          },
          focus: function (a) {
            return a === l.activeElement && (!l.hasFocus || l.hasFocus()) && !!(a.type || a.href || ~a.tabIndex);
          },
          enabled: function (a) {
            return a.disabled === !1;
          },
          disabled: function (a) {
            return a.disabled === !0;
          },
          checked: function (a) {
            var b = a.nodeName.toLowerCase();
            return 'input' === b && !!a.checked || 'option' === b && !!a.selected;
          },
          selected: function (a) {
            return a.parentNode && a.parentNode.selectedIndex, a.selected === !0;
          },
          empty: function (a) {
            for (a = a.firstChild; a; a = a.nextSibling)
              if (a.nodeType < 6)
                return !1;
            return !0;
          },
          parent: function (a) {
            return !d.pseudos.empty(a);
          },
          header: function (a) {
            return X.test(a.nodeName);
          },
          input: function (a) {
            return W.test(a.nodeName);
          },
          button: function (a) {
            var b = a.nodeName.toLowerCase();
            return 'input' === b && 'button' === a.type || 'button' === b;
          },
          text: function (a) {
            var b;
            return 'input' === a.nodeName.toLowerCase() && 'text' === a.type && (null == (b = a.getAttribute('type')) || 'text' === b.toLowerCase());
          },
          first: lb(function () {
            return [0];
          }),
          last: lb(function (a, b) {
            return [b - 1];
          }),
          eq: lb(function (a, b, c) {
            return [0 > c ? c + b : c];
          }),
          even: lb(function (a, b) {
            for (var c = 0; b > c; c += 2)
              a.push(c);
            return a;
          }),
          odd: lb(function (a, b) {
            for (var c = 1; b > c; c += 2)
              a.push(c);
            return a;
          }),
          lt: lb(function (a, b, c) {
            for (var d = 0 > c ? c + b : c; --d >= 0;)
              a.push(d);
            return a;
          }),
          gt: lb(function (a, b, c) {
            for (var d = 0 > c ? c + b : c; ++d < b;)
              a.push(d);
            return a;
          })
        }
      }, d.pseudos.nth = d.pseudos.eq;
      for (b in {
          radio: !0,
          checkbox: !0,
          file: !0,
          password: !0,
          image: !0
        })
        d.pseudos[b] = jb(b);
      for (b in {
          submit: !0,
          reset: !0
        })
        d.pseudos[b] = kb(b);
      function nb() {
      }
      nb.prototype = d.filters = d.pseudos, d.setFilters = new nb();
      function ob(a, b) {
        var c, e, f, g, h, i, j, k = x[a + ' '];
        if (k)
          return b ? 0 : k.slice(0);
        h = a, i = [], j = d.preFilter;
        while (h) {
          (!c || (e = Q.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])), c = !1, (e = R.exec(h)) && (c = e.shift(), f.push({
            value: c,
            type: e[0].replace(P, ' ')
          }), h = h.slice(c.length));
          for (g in d.filter)
            !(e = V[g].exec(h)) || j[g] && !(e = j[g](e)) || (c = e.shift(), f.push({
              value: c,
              type: g,
              matches: e
            }), h = h.slice(c.length));
          if (!c)
            break;
        }
        return b ? h.length : h ? db.error(a) : x(a, i).slice(0);
      }
      function pb(a) {
        for (var b = 0, c = a.length, d = ''; c > b; b++)
          d += a[b].value;
        return d;
      }
      function qb(a, b, c) {
        var d = b.dir, e = c && 'parentNode' === d, f = v++;
        return b.first ? function (b, c, f) {
          while (b = b[d])
            if (1 === b.nodeType || e)
              return a(b, c, f);
        } : function (b, c, g) {
          var h, i, j = [
              u,
              f
            ];
          if (g) {
            while (b = b[d])
              if ((1 === b.nodeType || e) && a(b, c, g))
                return !0;
          } else
            while (b = b[d])
              if (1 === b.nodeType || e) {
                if (i = b[s] || (b[s] = {}), (h = i[d]) && h[0] === u && h[1] === f)
                  return j[2] = h[2];
                if (i[d] = j, j[2] = a(b, c, g))
                  return !0;
              }
        };
      }
      function rb(a) {
        return a.length > 1 ? function (b, c, d) {
          var e = a.length;
          while (e--)
            if (!a[e](b, c, d))
              return !1;
          return !0;
        } : a[0];
      }
      function sb(a, b, c, d, e) {
        for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)
          (f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));
        return g;
      }
      function tb(a, b, c, d, e, f) {
        return d && !d[s] && (d = tb(d)), e && !e[s] && (e = tb(e, f)), fb(function (f, g, h, i) {
          var j, k, l, m = [], n = [], o = g.length, p = f || wb(b || '*', h.nodeType ? [h] : h, []), q = !a || !f && b ? p : sb(p, m, a, h, i), r = c ? e || (f ? a : o || d) ? [] : g : q;
          if (c && c(q, r, h, i), d) {
            j = sb(r, n), d(j, [], h, i), k = j.length;
            while (k--)
              (l = j[k]) && (r[n[k]] = !(q[n[k]] = l));
          }
          if (f) {
            if (e || a) {
              if (e) {
                j = [], k = r.length;
                while (k--)
                  (l = r[k]) && j.push(q[k] = l);
                e(null, r = [], j, i);
              }
              k = r.length;
              while (k--)
                (l = r[k]) && (j = e ? I.call(f, l) : m[k]) > -1 && (f[j] = !(g[j] = l));
            }
          } else
            r = sb(r === g ? r.splice(o, r.length) : r), e ? e(null, g, r, i) : G.apply(g, r);
        });
      }
      function ub(a) {
        for (var b, c, e, f = a.length, g = d.relative[a[0].type], i = g || d.relative[' '], j = g ? 1 : 0, k = qb(function (a) {
              return a === b;
            }, i, !0), l = qb(function (a) {
              return I.call(b, a) > -1;
            }, i, !0), m = [function (a, c, d) {
                return !g && (d || c !== h) || ((b = c).nodeType ? k(a, c, d) : l(a, c, d));
              }]; f > j; j++)
          if (c = d.relative[a[j].type])
            m = [qb(rb(m), c)];
          else {
            if (c = d.filter[a[j].type].apply(null, a[j].matches), c[s]) {
              for (e = ++j; f > e; e++)
                if (d.relative[a[e].type])
                  break;
              return tb(j > 1 && rb(m), j > 1 && pb(a.slice(0, j - 1).concat({ value: ' ' === a[j - 2].type ? '*' : '' })).replace(P, '$1'), c, e > j && ub(a.slice(j, e)), f > e && ub(a = a.slice(e)), f > e && pb(a));
            }
            m.push(c);
          }
        return rb(m);
      }
      function vb(a, b) {
        var c = b.length > 0, e = a.length > 0, f = function (f, g, i, j, k) {
            var m, n, o, p = 0, q = '0', r = f && [], s = [], t = h, v = f || e && d.find.TAG('*', k), w = u += null == t ? 1 : Math.random() || 0.1, x = v.length;
            for (k && (h = g !== l && g); q !== x && null != (m = v[q]); q++) {
              if (e && m) {
                n = 0;
                while (o = a[n++])
                  if (o(m, g, i)) {
                    j.push(m);
                    break;
                  }
                k && (u = w);
              }
              c && ((m = !o && m) && p--, f && r.push(m));
            }
            if (p += q, c && q !== p) {
              n = 0;
              while (o = b[n++])
                o(r, s, g, i);
              if (f) {
                if (p > 0)
                  while (q--)
                    r[q] || s[q] || (s[q] = E.call(j));
                s = sb(s);
              }
              G.apply(j, s), k && !f && s.length > 0 && p + b.length > 1 && db.uniqueSort(j);
            }
            return k && (u = w, h = t), r;
          };
        return c ? fb(f) : f;
      }
      g = db.compile = function (a, b) {
        var c, d = [], e = [], f = y[a + ' '];
        if (!f) {
          b || (b = ob(a)), c = b.length;
          while (c--)
            f = ub(b[c]), f[s] ? d.push(f) : e.push(f);
          f = y(a, vb(e, d));
        }
        return f;
      };
      function wb(a, b, c) {
        for (var d = 0, e = b.length; e > d; d++)
          db(a, b[d], c);
        return c;
      }
      function xb(a, b, e, f) {
        var h, i, j, k, l, m = ob(a);
        if (!f && 1 === m.length) {
          if (i = m[0] = m[0].slice(0), i.length > 2 && 'ID' === (j = i[0]).type && c.getById && 9 === b.nodeType && n && d.relative[i[1].type]) {
            if (b = (d.find.ID(j.matches[0].replace(ab, bb), b) || [])[0], !b)
              return e;
            a = a.slice(i.shift().value.length);
          }
          h = V.needsContext.test(a) ? 0 : i.length;
          while (h--) {
            if (j = i[h], d.relative[k = j.type])
              break;
            if ((l = d.find[k]) && (f = l(j.matches[0].replace(ab, bb), $.test(i[0].type) && mb(b.parentNode) || b))) {
              if (i.splice(h, 1), a = f.length && pb(i), !a)
                return G.apply(e, f), e;
              break;
            }
          }
        }
        return g(a, m)(f, b, !n, e, $.test(a) && mb(b.parentNode) || b), e;
      }
      return c.sortStable = s.split('').sort(z).join('') === s, c.detectDuplicates = !!j, k(), c.sortDetached = gb(function (a) {
        return 1 & a.compareDocumentPosition(l.createElement('div'));
      }), gb(function (a) {
        return a.innerHTML = '<a href=\'#\'></a>', '#' === a.firstChild.getAttribute('href');
      }) || hb('type|href|height|width', function (a, b, c) {
        return c ? void 0 : a.getAttribute(b, 'type' === b.toLowerCase() ? 1 : 2);
      }), c.attributes && gb(function (a) {
        return a.innerHTML = '<input/>', a.firstChild.setAttribute('value', ''), '' === a.firstChild.getAttribute('value');
      }) || hb('value', function (a, b, c) {
        return c || 'input' !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue;
      }), gb(function (a) {
        return null == a.getAttribute('disabled');
      }) || hb(J, function (a, b, c) {
        var d;
        return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null;
      }), db;
    }(a);
  n.find = t, n.expr = t.selectors, n.expr[':'] = n.expr.pseudos, n.unique = t.uniqueSort, n.text = t.getText, n.isXMLDoc = t.isXML, n.contains = t.contains;
  var u = n.expr.match.needsContext, v = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, w = /^.[^:#\[\.,]*$/;
  function x(a, b, c) {
    if (n.isFunction(b))
      return n.grep(a, function (a, d) {
        return !!b.call(a, d, a) !== c;
      });
    if (b.nodeType)
      return n.grep(a, function (a) {
        return a === b !== c;
      });
    if ('string' == typeof b) {
      if (w.test(b))
        return n.filter(b, a, c);
      b = n.filter(b, a);
    }
    return n.grep(a, function (a) {
      return n.inArray(a, b) >= 0 !== c;
    });
  }
  n.filter = function (a, b, c) {
    var d = b[0];
    return c && (a = ':not(' + a + ')'), 1 === b.length && 1 === d.nodeType ? n.find.matchesSelector(d, a) ? [d] : [] : n.find.matches(a, n.grep(b, function (a) {
      return 1 === a.nodeType;
    }));
  }, n.fn.extend({
    find: function (a) {
      var b, c = [], d = this, e = d.length;
      if ('string' != typeof a)
        return this.pushStack(n(a).filter(function () {
          for (b = 0; e > b; b++)
            if (n.contains(d[b], this))
              return !0;
        }));
      for (b = 0; e > b; b++)
        n.find(a, d[b], c);
      return c = this.pushStack(e > 1 ? n.unique(c) : c), c.selector = this.selector ? this.selector + ' ' + a : a, c;
    },
    filter: function (a) {
      return this.pushStack(x(this, a || [], !1));
    },
    not: function (a) {
      return this.pushStack(x(this, a || [], !0));
    },
    is: function (a) {
      return !!x(this, 'string' == typeof a && u.test(a) ? n(a) : a || [], !1).length;
    }
  });
  var y, z = a.document, A = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, B = n.fn.init = function (a, b) {
      var c, d;
      if (!a)
        return this;
      if ('string' == typeof a) {
        if (c = '<' === a.charAt(0) && '>' === a.charAt(a.length - 1) && a.length >= 3 ? [
            null,
            a,
            null
          ] : A.exec(a), !c || !c[1] && b)
          return !b || b.jquery ? (b || y).find(a) : this.constructor(b).find(a);
        if (c[1]) {
          if (b = b instanceof n ? b[0] : b, n.merge(this, n.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : z, !0)), v.test(c[1]) && n.isPlainObject(b))
            for (c in b)
              n.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
          return this;
        }
        if (d = z.getElementById(c[2]), d && d.parentNode) {
          if (d.id !== c[2])
            return y.find(a);
          this.length = 1, this[0] = d;
        }
        return this.context = z, this.selector = a, this;
      }
      return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : n.isFunction(a) ? 'undefined' != typeof y.ready ? y.ready(a) : a(n) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), n.makeArray(a, this));
    };
  B.prototype = n.fn, y = n(z);
  var C = /^(?:parents|prev(?:Until|All))/, D = {
      children: !0,
      contents: !0,
      next: !0,
      prev: !0
    };
  n.extend({
    dir: function (a, b, c) {
      var d = [], e = a[b];
      while (e && 9 !== e.nodeType && (void 0 === c || 1 !== e.nodeType || !n(e).is(c)))
        1 === e.nodeType && d.push(e), e = e[b];
      return d;
    },
    sibling: function (a, b) {
      for (var c = []; a; a = a.nextSibling)
        1 === a.nodeType && a !== b && c.push(a);
      return c;
    }
  }), n.fn.extend({
    has: function (a) {
      var b, c = n(a, this), d = c.length;
      return this.filter(function () {
        for (b = 0; d > b; b++)
          if (n.contains(this, c[b]))
            return !0;
      });
    },
    closest: function (a, b) {
      for (var c, d = 0, e = this.length, f = [], g = u.test(a) || 'string' != typeof a ? n(a, b || this.context) : 0; e > d; d++)
        for (c = this[d]; c && c !== b; c = c.parentNode)
          if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && n.find.matchesSelector(c, a))) {
            f.push(c);
            break;
          }
      return this.pushStack(f.length > 1 ? n.unique(f) : f);
    },
    index: function (a) {
      return a ? 'string' == typeof a ? n.inArray(this[0], n(a)) : n.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
    },
    add: function (a, b) {
      return this.pushStack(n.unique(n.merge(this.get(), n(a, b))));
    },
    addBack: function (a) {
      return this.add(null == a ? this.prevObject : this.prevObject.filter(a));
    }
  });
  function E(a, b) {
    do
      a = a[b];
    while (a && 1 !== a.nodeType);
    return a;
  }
  n.each({
    parent: function (a) {
      var b = a.parentNode;
      return b && 11 !== b.nodeType ? b : null;
    },
    parents: function (a) {
      return n.dir(a, 'parentNode');
    },
    parentsUntil: function (a, b, c) {
      return n.dir(a, 'parentNode', c);
    },
    next: function (a) {
      return E(a, 'nextSibling');
    },
    prev: function (a) {
      return E(a, 'previousSibling');
    },
    nextAll: function (a) {
      return n.dir(a, 'nextSibling');
    },
    prevAll: function (a) {
      return n.dir(a, 'previousSibling');
    },
    nextUntil: function (a, b, c) {
      return n.dir(a, 'nextSibling', c);
    },
    prevUntil: function (a, b, c) {
      return n.dir(a, 'previousSibling', c);
    },
    siblings: function (a) {
      return n.sibling((a.parentNode || {}).firstChild, a);
    },
    children: function (a) {
      return n.sibling(a.firstChild);
    },
    contents: function (a) {
      return n.nodeName(a, 'iframe') ? a.contentDocument || a.contentWindow.document : n.merge([], a.childNodes);
    }
  }, function (a, b) {
    n.fn[a] = function (c, d) {
      var e = n.map(this, b, c);
      return 'Until' !== a.slice(-5) && (d = c), d && 'string' == typeof d && (e = n.filter(d, e)), this.length > 1 && (D[a] || (e = n.unique(e)), C.test(a) && (e = e.reverse())), this.pushStack(e);
    };
  });
  var F = /\S+/g, G = {};
  function H(a) {
    var b = G[a] = {};
    return n.each(a.match(F) || [], function (a, c) {
      b[c] = !0;
    }), b;
  }
  n.Callbacks = function (a) {
    a = 'string' == typeof a ? G[a] || H(a) : n.extend({}, a);
    var b, c, d, e, f, g, h = [], i = !a.once && [], j = function (l) {
        for (c = a.memory && l, d = !0, f = g || 0, g = 0, e = h.length, b = !0; h && e > f; f++)
          if (h[f].apply(l[0], l[1]) === !1 && a.stopOnFalse) {
            c = !1;
            break;
          }
        b = !1, h && (i ? i.length && j(i.shift()) : c ? h = [] : k.disable());
      }, k = {
        add: function () {
          if (h) {
            var d = h.length;
            !function f(b) {
              n.each(b, function (b, c) {
                var d = n.type(c);
                'function' === d ? a.unique && k.has(c) || h.push(c) : c && c.length && 'string' !== d && f(c);
              });
            }(arguments), b ? e = h.length : c && (g = d, j(c));
          }
          return this;
        },
        remove: function () {
          return h && n.each(arguments, function (a, c) {
            var d;
            while ((d = n.inArray(c, h, d)) > -1)
              h.splice(d, 1), b && (e >= d && e--, f >= d && f--);
          }), this;
        },
        has: function (a) {
          return a ? n.inArray(a, h) > -1 : !(!h || !h.length);
        },
        empty: function () {
          return h = [], e = 0, this;
        },
        disable: function () {
          return h = i = c = void 0, this;
        },
        disabled: function () {
          return !h;
        },
        lock: function () {
          return i = void 0, c || k.disable(), this;
        },
        locked: function () {
          return !i;
        },
        fireWith: function (a, c) {
          return !h || d && !i || (c = c || [], c = [
            a,
            c.slice ? c.slice() : c
          ], b ? i.push(c) : j(c)), this;
        },
        fire: function () {
          return k.fireWith(this, arguments), this;
        },
        fired: function () {
          return !!d;
        }
      };
    return k;
  }, n.extend({
    Deferred: function (a) {
      var b = [
          [
            'resolve',
            'done',
            n.Callbacks('once memory'),
            'resolved'
          ],
          [
            'reject',
            'fail',
            n.Callbacks('once memory'),
            'rejected'
          ],
          [
            'notify',
            'progress',
            n.Callbacks('memory')
          ]
        ], c = 'pending', d = {
          state: function () {
            return c;
          },
          always: function () {
            return e.done(arguments).fail(arguments), this;
          },
          then: function () {
            var a = arguments;
            return n.Deferred(function (c) {
              n.each(b, function (b, f) {
                var g = n.isFunction(a[b]) && a[b];
                e[f[1]](function () {
                  var a = g && g.apply(this, arguments);
                  a && n.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + 'With'](this === d ? c.promise() : this, g ? [a] : arguments);
                });
              }), a = null;
            }).promise();
          },
          promise: function (a) {
            return null != a ? n.extend(a, d) : d;
          }
        }, e = {};
      return d.pipe = d.then, n.each(b, function (a, f) {
        var g = f[2], h = f[3];
        d[f[1]] = g.add, h && g.add(function () {
          c = h;
        }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function () {
          return e[f[0] + 'With'](this === e ? d : this, arguments), this;
        }, e[f[0] + 'With'] = g.fireWith;
      }), d.promise(e), a && a.call(e, e), e;
    },
    when: function (a) {
      var b = 0, c = d.call(arguments), e = c.length, f = 1 !== e || a && n.isFunction(a.promise) ? e : 0, g = 1 === f ? a : n.Deferred(), h = function (a, b, c) {
          return function (e) {
            b[a] = this, c[a] = arguments.length > 1 ? d.call(arguments) : e, c === i ? g.notifyWith(b, c) : --f || g.resolveWith(b, c);
          };
        }, i, j, k;
      if (e > 1)
        for (i = new Array(e), j = new Array(e), k = new Array(e); e > b; b++)
          c[b] && n.isFunction(c[b].promise) ? c[b].promise().done(h(b, k, c)).fail(g.reject).progress(h(b, j, i)) : --f;
      return f || g.resolveWith(k, c), g.promise();
    }
  });
  var I;
  n.fn.ready = function (a) {
    return n.ready.promise().done(a), this;
  }, n.extend({
    isReady: !1,
    readyWait: 1,
    holdReady: function (a) {
      a ? n.readyWait++ : n.ready(!0);
    },
    ready: function (a) {
      if (a === !0 ? !--n.readyWait : !n.isReady) {
        if (!z.body)
          return setTimeout(n.ready);
        n.isReady = !0, a !== !0 && --n.readyWait > 0 || (I.resolveWith(z, [n]), n.fn.trigger && n(z).trigger('ready').off('ready'));
      }
    }
  });
  function J() {
    z.addEventListener ? (z.removeEventListener('DOMContentLoaded', K, !1), a.removeEventListener('load', K, !1)) : (z.detachEvent('onreadystatechange', K), a.detachEvent('onload', K));
  }
  function K() {
    (z.addEventListener || 'load' === event.type || 'complete' === z.readyState) && (J(), n.ready());
  }
  n.ready.promise = function (b) {
    if (!I)
      if (I = n.Deferred(), 'complete' === z.readyState)
        setTimeout(n.ready);
      else if (z.addEventListener)
        z.addEventListener('DOMContentLoaded', K, !1), a.addEventListener('load', K, !1);
      else {
        z.attachEvent('onreadystatechange', K), a.attachEvent('onload', K);
        var c = !1;
        try {
          c = null == a.frameElement && z.documentElement;
        } catch (d) {
        }
        c && c.doScroll && !function e() {
          if (!n.isReady) {
            try {
              c.doScroll('left');
            } catch (a) {
              return setTimeout(e, 50);
            }
            J(), n.ready();
          }
        }();
      }
    return I.promise(b);
  };
  var L = 'undefined', M;
  for (M in n(l))
    break;
  l.ownLast = '0' !== M, l.inlineBlockNeedsLayout = !1, n(function () {
    var a, b, c = z.getElementsByTagName('body')[0];
    c && (a = z.createElement('div'), a.style.cssText = 'border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px', b = z.createElement('div'), c.appendChild(a).appendChild(b), typeof b.style.zoom !== L && (b.style.cssText = 'border:0;margin:0;width:1px;padding:1px;display:inline;zoom:1', (l.inlineBlockNeedsLayout = 3 === b.offsetWidth) && (c.style.zoom = 1)), c.removeChild(a), a = b = null);
  }), function () {
    var a = z.createElement('div');
    if (null == l.deleteExpando) {
      l.deleteExpando = !0;
      try {
        delete a.test;
      } catch (b) {
        l.deleteExpando = !1;
      }
    }
    a = null;
  }(), n.acceptData = function (a) {
    var b = n.noData[(a.nodeName + ' ').toLowerCase()], c = +a.nodeType || 1;
    return 1 !== c && 9 !== c ? !1 : !b || b !== !0 && a.getAttribute('classid') === b;
  };
  var N = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, O = /([A-Z])/g;
  function P(a, b, c) {
    if (void 0 === c && 1 === a.nodeType) {
      var d = 'data-' + b.replace(O, '-$1').toLowerCase();
      if (c = a.getAttribute(d), 'string' == typeof c) {
        try {
          c = 'true' === c ? !0 : 'false' === c ? !1 : 'null' === c ? null : +c + '' === c ? +c : N.test(c) ? n.parseJSON(c) : c;
        } catch (e) {
        }
        n.data(a, b, c);
      } else
        c = void 0;
    }
    return c;
  }
  function Q(a) {
    var b;
    for (b in a)
      if (('data' !== b || !n.isEmptyObject(a[b])) && 'toJSON' !== b)
        return !1;
    return !0;
  }
  function R(a, b, d, e) {
    if (n.acceptData(a)) {
      var f, g, h = n.expando, i = a.nodeType, j = i ? n.cache : a, k = i ? a[h] : a[h] && h;
      if (k && j[k] && (e || j[k].data) || void 0 !== d || 'string' != typeof b)
        return k || (k = i ? a[h] = c.pop() || n.guid++ : h), j[k] || (j[k] = i ? {} : { toJSON: n.noop }), ('object' == typeof b || 'function' == typeof b) && (e ? j[k] = n.extend(j[k], b) : j[k].data = n.extend(j[k].data, b)), g = j[k], e || (g.data || (g.data = {}), g = g.data), void 0 !== d && (g[n.camelCase(b)] = d), 'string' == typeof b ? (f = g[b], null == f && (f = g[n.camelCase(b)])) : f = g, f;
    }
  }
  function S(a, b, c) {
    if (n.acceptData(a)) {
      var d, e, f = a.nodeType, g = f ? n.cache : a, h = f ? a[n.expando] : n.expando;
      if (g[h]) {
        if (b && (d = c ? g[h] : g[h].data)) {
          n.isArray(b) ? b = b.concat(n.map(b, n.camelCase)) : b in d ? b = [b] : (b = n.camelCase(b), b = b in d ? [b] : b.split(' ')), e = b.length;
          while (e--)
            delete d[b[e]];
          if (c ? !Q(d) : !n.isEmptyObject(d))
            return;
        }
        (c || (delete g[h].data, Q(g[h]))) && (f ? n.cleanData([a], !0) : l.deleteExpando || g != g.window ? delete g[h] : g[h] = null);
      }
    }
  }
  n.extend({
    cache: {},
    noData: {
      'applet ': !0,
      'embed ': !0,
      'object ': 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000'
    },
    hasData: function (a) {
      return a = a.nodeType ? n.cache[a[n.expando]] : a[n.expando], !!a && !Q(a);
    },
    data: function (a, b, c) {
      return R(a, b, c);
    },
    removeData: function (a, b) {
      return S(a, b);
    },
    _data: function (a, b, c) {
      return R(a, b, c, !0);
    },
    _removeData: function (a, b) {
      return S(a, b, !0);
    }
  }), n.fn.extend({
    data: function (a, b) {
      var c, d, e, f = this[0], g = f && f.attributes;
      if (void 0 === a) {
        if (this.length && (e = n.data(f), 1 === f.nodeType && !n._data(f, 'parsedAttrs'))) {
          c = g.length;
          while (c--)
            d = g[c].name, 0 === d.indexOf('data-') && (d = n.camelCase(d.slice(5)), P(f, d, e[d]));
          n._data(f, 'parsedAttrs', !0);
        }
        return e;
      }
      return 'object' == typeof a ? this.each(function () {
        n.data(this, a);
      }) : arguments.length > 1 ? this.each(function () {
        n.data(this, a, b);
      }) : f ? P(f, a, n.data(f, a)) : void 0;
    },
    removeData: function (a) {
      return this.each(function () {
        n.removeData(this, a);
      });
    }
  }), n.extend({
    queue: function (a, b, c) {
      var d;
      return a ? (b = (b || 'fx') + 'queue', d = n._data(a, b), c && (!d || n.isArray(c) ? d = n._data(a, b, n.makeArray(c)) : d.push(c)), d || []) : void 0;
    },
    dequeue: function (a, b) {
      b = b || 'fx';
      var c = n.queue(a, b), d = c.length, e = c.shift(), f = n._queueHooks(a, b), g = function () {
          n.dequeue(a, b);
        };
      'inprogress' === e && (e = c.shift(), d--), e && ('fx' === b && c.unshift('inprogress'), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire();
    },
    _queueHooks: function (a, b) {
      var c = b + 'queueHooks';
      return n._data(a, c) || n._data(a, c, {
        empty: n.Callbacks('once memory').add(function () {
          n._removeData(a, b + 'queue'), n._removeData(a, c);
        })
      });
    }
  }), n.fn.extend({
    queue: function (a, b) {
      var c = 2;
      return 'string' != typeof a && (b = a, a = 'fx', c--), arguments.length < c ? n.queue(this[0], a) : void 0 === b ? this : this.each(function () {
        var c = n.queue(this, a, b);
        n._queueHooks(this, a), 'fx' === a && 'inprogress' !== c[0] && n.dequeue(this, a);
      });
    },
    dequeue: function (a) {
      return this.each(function () {
        n.dequeue(this, a);
      });
    },
    clearQueue: function (a) {
      return this.queue(a || 'fx', []);
    },
    promise: function (a, b) {
      var c, d = 1, e = n.Deferred(), f = this, g = this.length, h = function () {
          --d || e.resolveWith(f, [f]);
        };
      'string' != typeof a && (b = a, a = void 0), a = a || 'fx';
      while (g--)
        c = n._data(f[g], a + 'queueHooks'), c && c.empty && (d++, c.empty.add(h));
      return h(), e.promise(b);
    }
  });
  var T = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, U = [
      'Top',
      'Right',
      'Bottom',
      'Left'
    ], V = function (a, b) {
      return a = b || a, 'none' === n.css(a, 'display') || !n.contains(a.ownerDocument, a);
    }, W = n.access = function (a, b, c, d, e, f, g) {
      var h = 0, i = a.length, j = null == c;
      if ('object' === n.type(c)) {
        e = !0;
        for (h in c)
          n.access(a, b, h, c[h], !0, f, g);
      } else if (void 0 !== d && (e = !0, n.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function (a, b, c) {
          return j.call(n(a), c);
        })), b))
        for (; i > h; h++)
          b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
      return e ? a : j ? b.call(a) : i ? b(a[0], c) : f;
    }, X = /^(?:checkbox|radio)$/i;
  !function () {
    var a = z.createDocumentFragment(), b = z.createElement('div'), c = z.createElement('input');
    if (b.setAttribute('className', 't'), b.innerHTML = '  <link/><table></table><a href=\'/a\'>a</a>', l.leadingWhitespace = 3 === b.firstChild.nodeType, l.tbody = !b.getElementsByTagName('tbody').length, l.htmlSerialize = !!b.getElementsByTagName('link').length, l.html5Clone = '<:nav></:nav>' !== z.createElement('nav').cloneNode(!0).outerHTML, c.type = 'checkbox', c.checked = !0, a.appendChild(c), l.appendChecked = c.checked, b.innerHTML = '<textarea>x</textarea>', l.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue, a.appendChild(b), b.innerHTML = '<input type=\'radio\' checked=\'checked\' name=\'t\'/>', l.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, l.noCloneEvent = !0, b.attachEvent && (b.attachEvent('onclick', function () {
        l.noCloneEvent = !1;
      }), b.cloneNode(!0).click()), null == l.deleteExpando) {
      l.deleteExpando = !0;
      try {
        delete b.test;
      } catch (d) {
        l.deleteExpando = !1;
      }
    }
    a = b = c = null;
  }(), function () {
    var b, c, d = z.createElement('div');
    for (b in {
        submit: !0,
        change: !0,
        focusin: !0
      })
      c = 'on' + b, (l[b + 'Bubbles'] = c in a) || (d.setAttribute(c, 't'), l[b + 'Bubbles'] = d.attributes[c].expando === !1);
    d = null;
  }();
  var Y = /^(?:input|select|textarea)$/i, Z = /^key/, $ = /^(?:mouse|contextmenu)|click/, _ = /^(?:focusinfocus|focusoutblur)$/, ab = /^([^.]*)(?:\.(.+)|)$/;
  function bb() {
    return !0;
  }
  function cb() {
    return !1;
  }
  function db() {
    try {
      return z.activeElement;
    } catch (a) {
    }
  }
  n.event = {
    global: {},
    add: function (a, b, c, d, e) {
      var f, g, h, i, j, k, l, m, o, p, q, r = n._data(a);
      if (r) {
        c.handler && (i = c, c = i.handler, e = i.selector), c.guid || (c.guid = n.guid++), (g = r.events) || (g = r.events = {}), (k = r.handle) || (k = r.handle = function (a) {
          return typeof n === L || a && n.event.triggered === a.type ? void 0 : n.event.dispatch.apply(k.elem, arguments);
        }, k.elem = a), b = (b || '').match(F) || [''], h = b.length;
        while (h--)
          f = ab.exec(b[h]) || [], o = q = f[1], p = (f[2] || '').split('.').sort(), o && (j = n.event.special[o] || {}, o = (e ? j.delegateType : j.bindType) || o, j = n.event.special[o] || {}, l = n.extend({
            type: o,
            origType: q,
            data: d,
            handler: c,
            guid: c.guid,
            selector: e,
            needsContext: e && n.expr.match.needsContext.test(e),
            namespace: p.join('.')
          }, i), (m = g[o]) || (m = g[o] = [], m.delegateCount = 0, j.setup && j.setup.call(a, d, p, k) !== !1 || (a.addEventListener ? a.addEventListener(o, k, !1) : a.attachEvent && a.attachEvent('on' + o, k))), j.add && (j.add.call(a, l), l.handler.guid || (l.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, l) : m.push(l), n.event.global[o] = !0);
        a = null;
      }
    },
    remove: function (a, b, c, d, e) {
      var f, g, h, i, j, k, l, m, o, p, q, r = n.hasData(a) && n._data(a);
      if (r && (k = r.events)) {
        b = (b || '').match(F) || [''], j = b.length;
        while (j--)
          if (h = ab.exec(b[j]) || [], o = q = h[1], p = (h[2] || '').split('.').sort(), o) {
            l = n.event.special[o] || {}, o = (d ? l.delegateType : l.bindType) || o, m = k[o] || [], h = h[2] && new RegExp('(^|\\.)' + p.join('\\.(?:.*\\.|)') + '(\\.|$)'), i = f = m.length;
            while (f--)
              g = m[f], !e && q !== g.origType || c && c.guid !== g.guid || h && !h.test(g.namespace) || d && d !== g.selector && ('**' !== d || !g.selector) || (m.splice(f, 1), g.selector && m.delegateCount--, l.remove && l.remove.call(a, g));
            i && !m.length && (l.teardown && l.teardown.call(a, p, r.handle) !== !1 || n.removeEvent(a, o, r.handle), delete k[o]);
          } else
            for (o in k)
              n.event.remove(a, o + b[j], c, d, !0);
        n.isEmptyObject(k) && (delete r.handle, n._removeData(a, 'events'));
      }
    },
    trigger: function (b, c, d, e) {
      var f, g, h, i, k, l, m, o = [d || z], p = j.call(b, 'type') ? b.type : b, q = j.call(b, 'namespace') ? b.namespace.split('.') : [];
      if (h = l = d = d || z, 3 !== d.nodeType && 8 !== d.nodeType && !_.test(p + n.event.triggered) && (p.indexOf('.') >= 0 && (q = p.split('.'), p = q.shift(), q.sort()), g = p.indexOf(':') < 0 && 'on' + p, b = b[n.expando] ? b : new n.Event(p, 'object' == typeof b && b), b.isTrigger = e ? 2 : 3, b.namespace = q.join('.'), b.namespace_re = b.namespace ? new RegExp('(^|\\.)' + q.join('\\.(?:.*\\.|)') + '(\\.|$)') : null, b.result = void 0, b.target || (b.target = d), c = null == c ? [b] : n.makeArray(c, [b]), k = n.event.special[p] || {}, e || !k.trigger || k.trigger.apply(d, c) !== !1)) {
        if (!e && !k.noBubble && !n.isWindow(d)) {
          for (i = k.delegateType || p, _.test(i + p) || (h = h.parentNode); h; h = h.parentNode)
            o.push(h), l = h;
          l === (d.ownerDocument || z) && o.push(l.defaultView || l.parentWindow || a);
        }
        m = 0;
        while ((h = o[m++]) && !b.isPropagationStopped())
          b.type = m > 1 ? i : k.bindType || p, f = (n._data(h, 'events') || {})[b.type] && n._data(h, 'handle'), f && f.apply(h, c), f = g && h[g], f && f.apply && n.acceptData(h) && (b.result = f.apply(h, c), b.result === !1 && b.preventDefault());
        if (b.type = p, !e && !b.isDefaultPrevented() && (!k._default || k._default.apply(o.pop(), c) === !1) && n.acceptData(d) && g && d[p] && !n.isWindow(d)) {
          l = d[g], l && (d[g] = null), n.event.triggered = p;
          try {
            d[p]();
          } catch (r) {
          }
          n.event.triggered = void 0, l && (d[g] = l);
        }
        return b.result;
      }
    },
    dispatch: function (a) {
      a = n.event.fix(a);
      var b, c, e, f, g, h = [], i = d.call(arguments), j = (n._data(this, 'events') || {})[a.type] || [], k = n.event.special[a.type] || {};
      if (i[0] = a, a.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, a) !== !1) {
        h = n.event.handlers.call(this, a, j), b = 0;
        while ((f = h[b++]) && !a.isPropagationStopped()) {
          a.currentTarget = f.elem, g = 0;
          while ((e = f.handlers[g++]) && !a.isImmediatePropagationStopped())
            (!a.namespace_re || a.namespace_re.test(e.namespace)) && (a.handleObj = e, a.data = e.data, c = ((n.event.special[e.origType] || {}).handle || e.handler).apply(f.elem, i), void 0 !== c && (a.result = c) === !1 && (a.preventDefault(), a.stopPropagation()));
        }
        return k.postDispatch && k.postDispatch.call(this, a), a.result;
      }
    },
    handlers: function (a, b) {
      var c, d, e, f, g = [], h = b.delegateCount, i = a.target;
      if (h && i.nodeType && (!a.button || 'click' !== a.type))
        for (; i != this; i = i.parentNode || this)
          if (1 === i.nodeType && (i.disabled !== !0 || 'click' !== a.type)) {
            for (e = [], f = 0; h > f; f++)
              d = b[f], c = d.selector + ' ', void 0 === e[c] && (e[c] = d.needsContext ? n(c, this).index(i) >= 0 : n.find(c, this, null, [i]).length), e[c] && e.push(d);
            e.length && g.push({
              elem: i,
              handlers: e
            });
          }
      return h < b.length && g.push({
        elem: this,
        handlers: b.slice(h)
      }), g;
    },
    fix: function (a) {
      if (a[n.expando])
        return a;
      var b, c, d, e = a.type, f = a, g = this.fixHooks[e];
      g || (this.fixHooks[e] = g = $.test(e) ? this.mouseHooks : Z.test(e) ? this.keyHooks : {}), d = g.props ? this.props.concat(g.props) : this.props, a = new n.Event(f), b = d.length;
      while (b--)
        c = d[b], a[c] = f[c];
      return a.target || (a.target = f.srcElement || z), 3 === a.target.nodeType && (a.target = a.target.parentNode), a.metaKey = !!a.metaKey, g.filter ? g.filter(a, f) : a;
    },
    props: 'altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which'.split(' '),
    fixHooks: {},
    keyHooks: {
      props: 'char charCode key keyCode'.split(' '),
      filter: function (a, b) {
        return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a;
      }
    },
    mouseHooks: {
      props: 'button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement'.split(' '),
      filter: function (a, b) {
        var c, d, e, f = b.button, g = b.fromElement;
        return null == a.pageX && null != b.clientX && (d = a.target.ownerDocument || z, e = d.documentElement, c = d.body, a.pageX = b.clientX + (e && e.scrollLeft || c && c.scrollLeft || 0) - (e && e.clientLeft || c && c.clientLeft || 0), a.pageY = b.clientY + (e && e.scrollTop || c && c.scrollTop || 0) - (e && e.clientTop || c && c.clientTop || 0)), !a.relatedTarget && g && (a.relatedTarget = g === a.target ? b.toElement : g), a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), a;
      }
    },
    special: {
      load: { noBubble: !0 },
      focus: {
        trigger: function () {
          if (this !== db() && this.focus)
            try {
              return this.focus(), !1;
            } catch (a) {
            }
        },
        delegateType: 'focusin'
      },
      blur: {
        trigger: function () {
          return this === db() && this.blur ? (this.blur(), !1) : void 0;
        },
        delegateType: 'focusout'
      },
      click: {
        trigger: function () {
          return n.nodeName(this, 'input') && 'checkbox' === this.type && this.click ? (this.click(), !1) : void 0;
        },
        _default: function (a) {
          return n.nodeName(a.target, 'a');
        }
      },
      beforeunload: {
        postDispatch: function (a) {
          void 0 !== a.result && (a.originalEvent.returnValue = a.result);
        }
      }
    },
    simulate: function (a, b, c, d) {
      var e = n.extend(new n.Event(), c, {
          type: a,
          isSimulated: !0,
          originalEvent: {}
        });
      d ? n.event.trigger(e, null, b) : n.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault();
    }
  }, n.removeEvent = z.removeEventListener ? function (a, b, c) {
    a.removeEventListener && a.removeEventListener(b, c, !1);
  } : function (a, b, c) {
    var d = 'on' + b;
    a.detachEvent && (typeof a[d] === L && (a[d] = null), a.detachEvent(d, c));
  }, n.Event = function (a, b) {
    return this instanceof n.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && (a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault()) ? bb : cb) : this.type = a, b && n.extend(this, b), this.timeStamp = a && a.timeStamp || n.now(), void (this[n.expando] = !0)) : new n.Event(a, b);
  }, n.Event.prototype = {
    isDefaultPrevented: cb,
    isPropagationStopped: cb,
    isImmediatePropagationStopped: cb,
    preventDefault: function () {
      var a = this.originalEvent;
      this.isDefaultPrevented = bb, a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1);
    },
    stopPropagation: function () {
      var a = this.originalEvent;
      this.isPropagationStopped = bb, a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0);
    },
    stopImmediatePropagation: function () {
      this.isImmediatePropagationStopped = bb, this.stopPropagation();
    }
  }, n.each({
    mouseenter: 'mouseover',
    mouseleave: 'mouseout'
  }, function (a, b) {
    n.event.special[a] = {
      delegateType: b,
      bindType: b,
      handle: function (a) {
        var c, d = this, e = a.relatedTarget, f = a.handleObj;
        return (!e || e !== d && !n.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c;
      }
    };
  }), l.submitBubbles || (n.event.special.submit = {
    setup: function () {
      return n.nodeName(this, 'form') ? !1 : void n.event.add(this, 'click._submit keypress._submit', function (a) {
        var b = a.target, c = n.nodeName(b, 'input') || n.nodeName(b, 'button') ? b.form : void 0;
        c && !n._data(c, 'submitBubbles') && (n.event.add(c, 'submit._submit', function (a) {
          a._submit_bubble = !0;
        }), n._data(c, 'submitBubbles', !0));
      });
    },
    postDispatch: function (a) {
      a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && n.event.simulate('submit', this.parentNode, a, !0));
    },
    teardown: function () {
      return n.nodeName(this, 'form') ? !1 : void n.event.remove(this, '._submit');
    }
  }), l.changeBubbles || (n.event.special.change = {
    setup: function () {
      return Y.test(this.nodeName) ? (('checkbox' === this.type || 'radio' === this.type) && (n.event.add(this, 'propertychange._change', function (a) {
        'checked' === a.originalEvent.propertyName && (this._just_changed = !0);
      }), n.event.add(this, 'click._change', function (a) {
        this._just_changed && !a.isTrigger && (this._just_changed = !1), n.event.simulate('change', this, a, !0);
      })), !1) : void n.event.add(this, 'beforeactivate._change', function (a) {
        var b = a.target;
        Y.test(b.nodeName) && !n._data(b, 'changeBubbles') && (n.event.add(b, 'change._change', function (a) {
          !this.parentNode || a.isSimulated || a.isTrigger || n.event.simulate('change', this.parentNode, a, !0);
        }), n._data(b, 'changeBubbles', !0));
      });
    },
    handle: function (a) {
      var b = a.target;
      return this !== b || a.isSimulated || a.isTrigger || 'radio' !== b.type && 'checkbox' !== b.type ? a.handleObj.handler.apply(this, arguments) : void 0;
    },
    teardown: function () {
      return n.event.remove(this, '._change'), !Y.test(this.nodeName);
    }
  }), l.focusinBubbles || n.each({
    focus: 'focusin',
    blur: 'focusout'
  }, function (a, b) {
    var c = function (a) {
      n.event.simulate(b, a.target, n.event.fix(a), !0);
    };
    n.event.special[b] = {
      setup: function () {
        var d = this.ownerDocument || this, e = n._data(d, b);
        e || d.addEventListener(a, c, !0), n._data(d, b, (e || 0) + 1);
      },
      teardown: function () {
        var d = this.ownerDocument || this, e = n._data(d, b) - 1;
        e ? n._data(d, b, e) : (d.removeEventListener(a, c, !0), n._removeData(d, b));
      }
    };
  }), n.fn.extend({
    on: function (a, b, c, d, e) {
      var f, g;
      if ('object' == typeof a) {
        'string' != typeof b && (c = c || b, b = void 0);
        for (f in a)
          this.on(f, b, c, a[f], e);
        return this;
      }
      if (null == c && null == d ? (d = b, c = b = void 0) : null == d && ('string' == typeof b ? (d = c, c = void 0) : (d = c, c = b, b = void 0)), d === !1)
        d = cb;
      else if (!d)
        return this;
      return 1 === e && (g = d, d = function (a) {
        return n().off(a), g.apply(this, arguments);
      }, d.guid = g.guid || (g.guid = n.guid++)), this.each(function () {
        n.event.add(this, a, d, c, b);
      });
    },
    one: function (a, b, c, d) {
      return this.on(a, b, c, d, 1);
    },
    off: function (a, b, c) {
      var d, e;
      if (a && a.preventDefault && a.handleObj)
        return d = a.handleObj, n(a.delegateTarget).off(d.namespace ? d.origType + '.' + d.namespace : d.origType, d.selector, d.handler), this;
      if ('object' == typeof a) {
        for (e in a)
          this.off(e, b, a[e]);
        return this;
      }
      return (b === !1 || 'function' == typeof b) && (c = b, b = void 0), c === !1 && (c = cb), this.each(function () {
        n.event.remove(this, a, c, b);
      });
    },
    trigger: function (a, b) {
      return this.each(function () {
        n.event.trigger(a, b, this);
      });
    },
    triggerHandler: function (a, b) {
      var c = this[0];
      return c ? n.event.trigger(a, b, c, !0) : void 0;
    }
  });
  function eb(a) {
    var b = fb.split('|'), c = a.createDocumentFragment();
    if (c.createElement)
      while (b.length)
        c.createElement(b.pop());
    return c;
  }
  var fb = 'abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video', gb = / jQuery\d+="(?:null|\d+)"/g, hb = new RegExp('<(?:' + fb + ')[\\s/>]', 'i'), ib = /^\s+/, jb = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, kb = /<([\w:]+)/, lb = /<tbody/i, mb = /<|&#?\w+;/, nb = /<(?:script|style|link)/i, ob = /checked\s*(?:[^=]|=\s*.checked.)/i, pb = /^$|\/(?:java|ecma)script/i, qb = /^true\/(.*)/, rb = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, sb = {
      option: [
        1,
        '<select multiple=\'multiple\'>',
        '</select>'
      ],
      legend: [
        1,
        '<fieldset>',
        '</fieldset>'
      ],
      area: [
        1,
        '<map>',
        '</map>'
      ],
      param: [
        1,
        '<object>',
        '</object>'
      ],
      thead: [
        1,
        '<table>',
        '</table>'
      ],
      tr: [
        2,
        '<table><tbody>',
        '</tbody></table>'
      ],
      col: [
        2,
        '<table><tbody></tbody><colgroup>',
        '</colgroup></table>'
      ],
      td: [
        3,
        '<table><tbody><tr>',
        '</tr></tbody></table>'
      ],
      _default: l.htmlSerialize ? [
        0,
        '',
        ''
      ] : [
        1,
        'X<div>',
        '</div>'
      ]
    }, tb = eb(z), ub = tb.appendChild(z.createElement('div'));
  sb.optgroup = sb.option, sb.tbody = sb.tfoot = sb.colgroup = sb.caption = sb.thead, sb.th = sb.td;
  function vb(a, b) {
    var c, d, e = 0, f = typeof a.getElementsByTagName !== L ? a.getElementsByTagName(b || '*') : typeof a.querySelectorAll !== L ? a.querySelectorAll(b || '*') : void 0;
    if (!f)
      for (f = [], c = a.childNodes || a; null != (d = c[e]); e++)
        !b || n.nodeName(d, b) ? f.push(d) : n.merge(f, vb(d, b));
    return void 0 === b || b && n.nodeName(a, b) ? n.merge([a], f) : f;
  }
  function wb(a) {
    X.test(a.type) && (a.defaultChecked = a.checked);
  }
  function xb(a, b) {
    return n.nodeName(a, 'table') && n.nodeName(11 !== b.nodeType ? b : b.firstChild, 'tr') ? a.getElementsByTagName('tbody')[0] || a.appendChild(a.ownerDocument.createElement('tbody')) : a;
  }
  function yb(a) {
    return a.type = (null !== n.find.attr(a, 'type')) + '/' + a.type, a;
  }
  function zb(a) {
    var b = qb.exec(a.type);
    return b ? a.type = b[1] : a.removeAttribute('type'), a;
  }
  function Ab(a, b) {
    for (var c, d = 0; null != (c = a[d]); d++)
      n._data(c, 'globalEval', !b || n._data(b[d], 'globalEval'));
  }
  function Bb(a, b) {
    if (1 === b.nodeType && n.hasData(a)) {
      var c, d, e, f = n._data(a), g = n._data(b, f), h = f.events;
      if (h) {
        delete g.handle, g.events = {};
        for (c in h)
          for (d = 0, e = h[c].length; e > d; d++)
            n.event.add(b, c, h[c][d]);
      }
      g.data && (g.data = n.extend({}, g.data));
    }
  }
  function Cb(a, b) {
    var c, d, e;
    if (1 === b.nodeType) {
      if (c = b.nodeName.toLowerCase(), !l.noCloneEvent && b[n.expando]) {
        e = n._data(b);
        for (d in e.events)
          n.removeEvent(b, d, e.handle);
        b.removeAttribute(n.expando);
      }
      'script' === c && b.text !== a.text ? (yb(b).text = a.text, zb(b)) : 'object' === c ? (b.parentNode && (b.outerHTML = a.outerHTML), l.html5Clone && a.innerHTML && !n.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : 'input' === c && X.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : 'option' === c ? b.defaultSelected = b.selected = a.defaultSelected : ('input' === c || 'textarea' === c) && (b.defaultValue = a.defaultValue);
    }
  }
  n.extend({
    clone: function (a, b, c) {
      var d, e, f, g, h, i = n.contains(a.ownerDocument, a);
      if (l.html5Clone || n.isXMLDoc(a) || !hb.test('<' + a.nodeName + '>') ? f = a.cloneNode(!0) : (ub.innerHTML = a.outerHTML, ub.removeChild(f = ub.firstChild)), !(l.noCloneEvent && l.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || n.isXMLDoc(a)))
        for (d = vb(f), h = vb(a), g = 0; null != (e = h[g]); ++g)
          d[g] && Cb(e, d[g]);
      if (b)
        if (c)
          for (h = h || vb(a), d = d || vb(f), g = 0; null != (e = h[g]); g++)
            Bb(e, d[g]);
        else
          Bb(a, f);
      return d = vb(f, 'script'), d.length > 0 && Ab(d, !i && vb(a, 'script')), d = h = e = null, f;
    },
    buildFragment: function (a, b, c, d) {
      for (var e, f, g, h, i, j, k, m = a.length, o = eb(b), p = [], q = 0; m > q; q++)
        if (f = a[q], f || 0 === f)
          if ('object' === n.type(f))
            n.merge(p, f.nodeType ? [f] : f);
          else if (mb.test(f)) {
            h = h || o.appendChild(b.createElement('div')), i = (kb.exec(f) || [
              '',
              ''
            ])[1].toLowerCase(), k = sb[i] || sb._default, h.innerHTML = k[1] + f.replace(jb, '<$1></$2>') + k[2], e = k[0];
            while (e--)
              h = h.lastChild;
            if (!l.leadingWhitespace && ib.test(f) && p.push(b.createTextNode(ib.exec(f)[0])), !l.tbody) {
              f = 'table' !== i || lb.test(f) ? '<table>' !== k[1] || lb.test(f) ? 0 : h : h.firstChild, e = f && f.childNodes.length;
              while (e--)
                n.nodeName(j = f.childNodes[e], 'tbody') && !j.childNodes.length && f.removeChild(j);
            }
            n.merge(p, h.childNodes), h.textContent = '';
            while (h.firstChild)
              h.removeChild(h.firstChild);
            h = o.lastChild;
          } else
            p.push(b.createTextNode(f));
      h && o.removeChild(h), l.appendChecked || n.grep(vb(p, 'input'), wb), q = 0;
      while (f = p[q++])
        if ((!d || -1 === n.inArray(f, d)) && (g = n.contains(f.ownerDocument, f), h = vb(o.appendChild(f), 'script'), g && Ab(h), c)) {
          e = 0;
          while (f = h[e++])
            pb.test(f.type || '') && c.push(f);
        }
      return h = null, o;
    },
    cleanData: function (a, b) {
      for (var d, e, f, g, h = 0, i = n.expando, j = n.cache, k = l.deleteExpando, m = n.event.special; null != (d = a[h]); h++)
        if ((b || n.acceptData(d)) && (f = d[i], g = f && j[f])) {
          if (g.events)
            for (e in g.events)
              m[e] ? n.event.remove(d, e) : n.removeEvent(d, e, g.handle);
          j[f] && (delete j[f], k ? delete d[i] : typeof d.removeAttribute !== L ? d.removeAttribute(i) : d[i] = null, c.push(f));
        }
    }
  }), n.fn.extend({
    text: function (a) {
      return W(this, function (a) {
        return void 0 === a ? n.text(this) : this.empty().append((this[0] && this[0].ownerDocument || z).createTextNode(a));
      }, null, a, arguments.length);
    },
    append: function () {
      return this.domManip(arguments, function (a) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var b = xb(this, a);
          b.appendChild(a);
        }
      });
    },
    prepend: function () {
      return this.domManip(arguments, function (a) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var b = xb(this, a);
          b.insertBefore(a, b.firstChild);
        }
      });
    },
    before: function () {
      return this.domManip(arguments, function (a) {
        this.parentNode && this.parentNode.insertBefore(a, this);
      });
    },
    after: function () {
      return this.domManip(arguments, function (a) {
        this.parentNode && this.parentNode.insertBefore(a, this.nextSibling);
      });
    },
    remove: function (a, b) {
      for (var c, d = a ? n.filter(a, this) : this, e = 0; null != (c = d[e]); e++)
        b || 1 !== c.nodeType || n.cleanData(vb(c)), c.parentNode && (b && n.contains(c.ownerDocument, c) && Ab(vb(c, 'script')), c.parentNode.removeChild(c));
      return this;
    },
    empty: function () {
      for (var a, b = 0; null != (a = this[b]); b++) {
        1 === a.nodeType && n.cleanData(vb(a, !1));
        while (a.firstChild)
          a.removeChild(a.firstChild);
        a.options && n.nodeName(a, 'select') && (a.options.length = 0);
      }
      return this;
    },
    clone: function (a, b) {
      return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function () {
        return n.clone(this, a, b);
      });
    },
    html: function (a) {
      return W(this, function (a) {
        var b = this[0] || {}, c = 0, d = this.length;
        if (void 0 === a)
          return 1 === b.nodeType ? b.innerHTML.replace(gb, '') : void 0;
        if (!('string' != typeof a || nb.test(a) || !l.htmlSerialize && hb.test(a) || !l.leadingWhitespace && ib.test(a) || sb[(kb.exec(a) || [
            '',
            ''
          ])[1].toLowerCase()])) {
          a = a.replace(jb, '<$1></$2>');
          try {
            for (; d > c; c++)
              b = this[c] || {}, 1 === b.nodeType && (n.cleanData(vb(b, !1)), b.innerHTML = a);
            b = 0;
          } catch (e) {
          }
        }
        b && this.empty().append(a);
      }, null, a, arguments.length);
    },
    replaceWith: function () {
      var a = arguments[0];
      return this.domManip(arguments, function (b) {
        a = this.parentNode, n.cleanData(vb(this)), a && a.replaceChild(b, this);
      }), a && (a.length || a.nodeType) ? this : this.remove();
    },
    detach: function (a) {
      return this.remove(a, !0);
    },
    domManip: function (a, b) {
      a = e.apply([], a);
      var c, d, f, g, h, i, j = 0, k = this.length, m = this, o = k - 1, p = a[0], q = n.isFunction(p);
      if (q || k > 1 && 'string' == typeof p && !l.checkClone && ob.test(p))
        return this.each(function (c) {
          var d = m.eq(c);
          q && (a[0] = p.call(this, c, d.html())), d.domManip(a, b);
        });
      if (k && (i = n.buildFragment(a, this[0].ownerDocument, !1, this), c = i.firstChild, 1 === i.childNodes.length && (i = c), c)) {
        for (g = n.map(vb(i, 'script'), yb), f = g.length; k > j; j++)
          d = i, j !== o && (d = n.clone(d, !0, !0), f && n.merge(g, vb(d, 'script'))), b.call(this[j], d, j);
        if (f)
          for (h = g[g.length - 1].ownerDocument, n.map(g, zb), j = 0; f > j; j++)
            d = g[j], pb.test(d.type || '') && !n._data(d, 'globalEval') && n.contains(h, d) && (d.src ? n._evalUrl && n._evalUrl(d.src) : n.globalEval((d.text || d.textContent || d.innerHTML || '').replace(rb, '')));
        i = c = null;
      }
      return this;
    }
  }), n.each({
    appendTo: 'append',
    prependTo: 'prepend',
    insertBefore: 'before',
    insertAfter: 'after',
    replaceAll: 'replaceWith'
  }, function (a, b) {
    n.fn[a] = function (a) {
      for (var c, d = 0, e = [], g = n(a), h = g.length - 1; h >= d; d++)
        c = d === h ? this : this.clone(!0), n(g[d])[b](c), f.apply(e, c.get());
      return this.pushStack(e);
    };
  });
  var Db, Eb = {};
  function Fb(b, c) {
    var d = n(c.createElement(b)).appendTo(c.body), e = a.getDefaultComputedStyle ? a.getDefaultComputedStyle(d[0]).display : n.css(d[0], 'display');
    return d.detach(), e;
  }
  function Gb(a) {
    var b = z, c = Eb[a];
    return c || (c = Fb(a, b), 'none' !== c && c || (Db = (Db || n('<iframe frameborder=\'0\' width=\'0\' height=\'0\'/>')).appendTo(b.documentElement), b = (Db[0].contentWindow || Db[0].contentDocument).document, b.write(), b.close(), c = Fb(a, b), Db.detach()), Eb[a] = c), c;
  }
  !function () {
    var a, b, c = z.createElement('div'), d = '-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0';
    c.innerHTML = '  <link/><table></table><a href=\'/a\'>a</a><input type=\'checkbox\'/>', a = c.getElementsByTagName('a')[0], a.style.cssText = 'float:left;opacity:.5', l.opacity = /^0.5/.test(a.style.opacity), l.cssFloat = !!a.style.cssFloat, c.style.backgroundClip = 'content-box', c.cloneNode(!0).style.backgroundClip = '', l.clearCloneStyle = 'content-box' === c.style.backgroundClip, a = c = null, l.shrinkWrapBlocks = function () {
      var a, c, e, f;
      if (null == b) {
        if (a = z.getElementsByTagName('body')[0], !a)
          return;
        f = 'border:0;width:0;height:0;position:absolute;top:0;left:-9999px', c = z.createElement('div'), e = z.createElement('div'), a.appendChild(c).appendChild(e), b = !1, typeof e.style.zoom !== L && (e.style.cssText = d + ';width:1px;padding:1px;zoom:1', e.innerHTML = '<div></div>', e.firstChild.style.width = '5px', b = 3 !== e.offsetWidth), a.removeChild(c), a = c = e = null;
      }
      return b;
    };
  }();
  var Hb = /^margin/, Ib = new RegExp('^(' + T + ')(?!px)[a-z%]+$', 'i'), Jb, Kb, Lb = /^(top|right|bottom|left)$/;
  a.getComputedStyle ? (Jb = function (a) {
    return a.ownerDocument.defaultView.getComputedStyle(a, null);
  }, Kb = function (a, b, c) {
    var d, e, f, g, h = a.style;
    return c = c || Jb(a), g = c ? c.getPropertyValue(b) || c[b] : void 0, c && ('' !== g || n.contains(a.ownerDocument, a) || (g = n.style(a, b)), Ib.test(g) && Hb.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 === g ? g : g + '';
  }) : z.documentElement.currentStyle && (Jb = function (a) {
    return a.currentStyle;
  }, Kb = function (a, b, c) {
    var d, e, f, g, h = a.style;
    return c = c || Jb(a), g = c ? c[b] : void 0, null == g && h && h[b] && (g = h[b]), Ib.test(g) && !Lb.test(b) && (d = h.left, e = a.runtimeStyle, f = e && e.left, f && (e.left = a.currentStyle.left), h.left = 'fontSize' === b ? '1em' : g, g = h.pixelLeft + 'px', h.left = d, f && (e.left = f)), void 0 === g ? g : g + '' || 'auto';
  });
  function Mb(a, b) {
    return {
      get: function () {
        var c = a();
        if (null != c)
          return c ? void delete this.get : (this.get = b).apply(this, arguments);
      }
    };
  }
  !function () {
    var b, c, d, e, f, g, h = z.createElement('div'), i = 'border:0;width:0;height:0;position:absolute;top:0;left:-9999px', j = '-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0';
    h.innerHTML = '  <link/><table></table><a href=\'/a\'>a</a><input type=\'checkbox\'/>', b = h.getElementsByTagName('a')[0], b.style.cssText = 'float:left;opacity:.5', l.opacity = /^0.5/.test(b.style.opacity), l.cssFloat = !!b.style.cssFloat, h.style.backgroundClip = 'content-box', h.cloneNode(!0).style.backgroundClip = '', l.clearCloneStyle = 'content-box' === h.style.backgroundClip, b = h = null, n.extend(l, {
      reliableHiddenOffsets: function () {
        if (null != c)
          return c;
        var a, b, d, e = z.createElement('div'), f = z.getElementsByTagName('body')[0];
        if (f)
          return e.setAttribute('className', 't'), e.innerHTML = '  <link/><table></table><a href=\'/a\'>a</a><input type=\'checkbox\'/>', a = z.createElement('div'), a.style.cssText = i, f.appendChild(a).appendChild(e), e.innerHTML = '<table><tr><td></td><td>t</td></tr></table>', b = e.getElementsByTagName('td'), b[0].style.cssText = 'padding:0;margin:0;border:0;display:none', d = 0 === b[0].offsetHeight, b[0].style.display = '', b[1].style.display = 'none', c = d && 0 === b[0].offsetHeight, f.removeChild(a), e = f = null, c;
      },
      boxSizing: function () {
        return null == d && k(), d;
      },
      boxSizingReliable: function () {
        return null == e && k(), e;
      },
      pixelPosition: function () {
        return null == f && k(), f;
      },
      reliableMarginRight: function () {
        var b, c, d, e;
        if (null == g && a.getComputedStyle) {
          if (b = z.getElementsByTagName('body')[0], !b)
            return;
          c = z.createElement('div'), d = z.createElement('div'), c.style.cssText = i, b.appendChild(c).appendChild(d), e = d.appendChild(z.createElement('div')), e.style.cssText = d.style.cssText = j, e.style.marginRight = e.style.width = '0', d.style.width = '1px', g = !parseFloat((a.getComputedStyle(e, null) || {}).marginRight), b.removeChild(c);
        }
        return g;
      }
    });
    function k() {
      var b, c, h = z.getElementsByTagName('body')[0];
      h && (b = z.createElement('div'), c = z.createElement('div'), b.style.cssText = i, h.appendChild(b).appendChild(c), c.style.cssText = '-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;display:block;padding:1px;border:1px;width:4px;margin-top:1%;top:1%', n.swap(h, null != h.style.zoom ? { zoom: 1 } : {}, function () {
        d = 4 === c.offsetWidth;
      }), e = !0, f = !1, g = !0, a.getComputedStyle && (f = '1%' !== (a.getComputedStyle(c, null) || {}).top, e = '4px' === (a.getComputedStyle(c, null) || { width: '4px' }).width), h.removeChild(b), c = h = null);
    }
  }(), n.swap = function (a, b, c, d) {
    var e, f, g = {};
    for (f in b)
      g[f] = a.style[f], a.style[f] = b[f];
    e = c.apply(a, d || []);
    for (f in b)
      a.style[f] = g[f];
    return e;
  };
  var Nb = /alpha\([^)]*\)/i, Ob = /opacity\s*=\s*([^)]*)/, Pb = /^(none|table(?!-c[ea]).+)/, Qb = new RegExp('^(' + T + ')(.*)$', 'i'), Rb = new RegExp('^([+-])=(' + T + ')', 'i'), Sb = {
      position: 'absolute',
      visibility: 'hidden',
      display: 'block'
    }, Tb = {
      letterSpacing: 0,
      fontWeight: 400
    }, Ub = [
      'Webkit',
      'O',
      'Moz',
      'ms'
    ];
  function Vb(a, b) {
    if (b in a)
      return b;
    var c = b.charAt(0).toUpperCase() + b.slice(1), d = b, e = Ub.length;
    while (e--)
      if (b = Ub[e] + c, b in a)
        return b;
    return d;
  }
  function Wb(a, b) {
    for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++)
      d = a[g], d.style && (f[g] = n._data(d, 'olddisplay'), c = d.style.display, b ? (f[g] || 'none' !== c || (d.style.display = ''), '' === d.style.display && V(d) && (f[g] = n._data(d, 'olddisplay', Gb(d.nodeName)))) : f[g] || (e = V(d), (c && 'none' !== c || !e) && n._data(d, 'olddisplay', e ? c : n.css(d, 'display'))));
    for (g = 0; h > g; g++)
      d = a[g], d.style && (b && 'none' !== d.style.display && '' !== d.style.display || (d.style.display = b ? f[g] || '' : 'none'));
    return a;
  }
  function Xb(a, b, c) {
    var d = Qb.exec(b);
    return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || 'px') : b;
  }
  function Yb(a, b, c, d, e) {
    for (var f = c === (d ? 'border' : 'content') ? 4 : 'width' === b ? 1 : 0, g = 0; 4 > f; f += 2)
      'margin' === c && (g += n.css(a, c + U[f], !0, e)), d ? ('content' === c && (g -= n.css(a, 'padding' + U[f], !0, e)), 'margin' !== c && (g -= n.css(a, 'border' + U[f] + 'Width', !0, e))) : (g += n.css(a, 'padding' + U[f], !0, e), 'padding' !== c && (g += n.css(a, 'border' + U[f] + 'Width', !0, e)));
    return g;
  }
  function Zb(a, b, c) {
    var d = !0, e = 'width' === b ? a.offsetWidth : a.offsetHeight, f = Jb(a), g = l.boxSizing() && 'border-box' === n.css(a, 'boxSizing', !1, f);
    if (0 >= e || null == e) {
      if (e = Kb(a, b, f), (0 > e || null == e) && (e = a.style[b]), Ib.test(e))
        return e;
      d = g && (l.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0;
    }
    return e + Yb(a, b, c || (g ? 'border' : 'content'), d, f) + 'px';
  }
  n.extend({
    cssHooks: {
      opacity: {
        get: function (a, b) {
          if (b) {
            var c = Kb(a, 'opacity');
            return '' === c ? '1' : c;
          }
        }
      }
    },
    cssNumber: {
      columnCount: !0,
      fillOpacity: !0,
      fontWeight: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0
    },
    cssProps: { 'float': l.cssFloat ? 'cssFloat' : 'styleFloat' },
    style: function (a, b, c, d) {
      if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
        var e, f, g, h = n.camelCase(b), i = a.style;
        if (b = n.cssProps[h] || (n.cssProps[h] = Vb(i, h)), g = n.cssHooks[b] || n.cssHooks[h], void 0 === c)
          return g && 'get' in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b];
        if (f = typeof c, 'string' === f && (e = Rb.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(n.css(a, b)), f = 'number'), null != c && c === c && ('number' !== f || n.cssNumber[h] || (c += 'px'), l.clearCloneStyle || '' !== c || 0 !== b.indexOf('background') || (i[b] = 'inherit'), !(g && 'set' in g && void 0 === (c = g.set(a, c, d)))))
          try {
            i[b] = '', i[b] = c;
          } catch (j) {
          }
      }
    },
    css: function (a, b, c, d) {
      var e, f, g, h = n.camelCase(b);
      return b = n.cssProps[h] || (n.cssProps[h] = Vb(a.style, h)), g = n.cssHooks[b] || n.cssHooks[h], g && 'get' in g && (f = g.get(a, !0, c)), void 0 === f && (f = Kb(a, b, d)), 'normal' === f && b in Tb && (f = Tb[b]), '' === c || c ? (e = parseFloat(f), c === !0 || n.isNumeric(e) ? e || 0 : f) : f;
    }
  }), n.each([
    'height',
    'width'
  ], function (a, b) {
    n.cssHooks[b] = {
      get: function (a, c, d) {
        return c ? 0 === a.offsetWidth && Pb.test(n.css(a, 'display')) ? n.swap(a, Sb, function () {
          return Zb(a, b, d);
        }) : Zb(a, b, d) : void 0;
      },
      set: function (a, c, d) {
        var e = d && Jb(a);
        return Xb(a, c, d ? Yb(a, b, d, l.boxSizing() && 'border-box' === n.css(a, 'boxSizing', !1, e), e) : 0);
      }
    };
  }), l.opacity || (n.cssHooks.opacity = {
    get: function (a, b) {
      return Ob.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || '') ? 0.01 * parseFloat(RegExp.$1) + '' : b ? '1' : '';
    },
    set: function (a, b) {
      var c = a.style, d = a.currentStyle, e = n.isNumeric(b) ? 'alpha(opacity=' + 100 * b + ')' : '', f = d && d.filter || c.filter || '';
      c.zoom = 1, (b >= 1 || '' === b) && '' === n.trim(f.replace(Nb, '')) && c.removeAttribute && (c.removeAttribute('filter'), '' === b || d && !d.filter) || (c.filter = Nb.test(f) ? f.replace(Nb, e) : f + ' ' + e);
    }
  }), n.cssHooks.marginRight = Mb(l.reliableMarginRight, function (a, b) {
    return b ? n.swap(a, { display: 'inline-block' }, Kb, [
      a,
      'marginRight'
    ]) : void 0;
  }), n.each({
    margin: '',
    padding: '',
    border: 'Width'
  }, function (a, b) {
    n.cssHooks[a + b] = {
      expand: function (c) {
        for (var d = 0, e = {}, f = 'string' == typeof c ? c.split(' ') : [c]; 4 > d; d++)
          e[a + U[d] + b] = f[d] || f[d - 2] || f[0];
        return e;
      }
    }, Hb.test(a) || (n.cssHooks[a + b].set = Xb);
  }), n.fn.extend({
    css: function (a, b) {
      return W(this, function (a, b, c) {
        var d, e, f = {}, g = 0;
        if (n.isArray(b)) {
          for (d = Jb(a), e = b.length; e > g; g++)
            f[b[g]] = n.css(a, b[g], !1, d);
          return f;
        }
        return void 0 !== c ? n.style(a, b, c) : n.css(a, b);
      }, a, b, arguments.length > 1);
    },
    show: function () {
      return Wb(this, !0);
    },
    hide: function () {
      return Wb(this);
    },
    toggle: function (a) {
      return 'boolean' == typeof a ? a ? this.show() : this.hide() : this.each(function () {
        V(this) ? n(this).show() : n(this).hide();
      });
    }
  });
  function $b(a, b, c, d, e) {
    return new $b.prototype.init(a, b, c, d, e);
  }
  n.Tween = $b, $b.prototype = {
    constructor: $b,
    init: function (a, b, c, d, e, f) {
      this.elem = a, this.prop = c, this.easing = e || 'swing', this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (n.cssNumber[c] ? '' : 'px');
    },
    cur: function () {
      var a = $b.propHooks[this.prop];
      return a && a.get ? a.get(this) : $b.propHooks._default.get(this);
    },
    run: function (a) {
      var b, c = $b.propHooks[this.prop];
      return this.pos = b = this.options.duration ? n.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : $b.propHooks._default.set(this), this;
    }
  }, $b.prototype.init.prototype = $b.prototype, $b.propHooks = {
    _default: {
      get: function (a) {
        var b;
        return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = n.css(a.elem, a.prop, ''), b && 'auto' !== b ? b : 0) : a.elem[a.prop];
      },
      set: function (a) {
        n.fx.step[a.prop] ? n.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[n.cssProps[a.prop]] || n.cssHooks[a.prop]) ? n.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now;
      }
    }
  }, $b.propHooks.scrollTop = $b.propHooks.scrollLeft = {
    set: function (a) {
      a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now);
    }
  }, n.easing = {
    linear: function (a) {
      return a;
    },
    swing: function (a) {
      return 0.5 - Math.cos(a * Math.PI) / 2;
    }
  }, n.fx = $b.prototype.init, n.fx.step = {};
  var _b, ac, bc = /^(?:toggle|show|hide)$/, cc = new RegExp('^(?:([+-])=|)(' + T + ')([a-z%]*)$', 'i'), dc = /queueHooks$/, ec = [jc], fc = {
      '*': [function (a, b) {
          var c = this.createTween(a, b), d = c.cur(), e = cc.exec(b), f = e && e[3] || (n.cssNumber[a] ? '' : 'px'), g = (n.cssNumber[a] || 'px' !== f && +d) && cc.exec(n.css(c.elem, a)), h = 1, i = 20;
          if (g && g[3] !== f) {
            f = f || g[3], e = e || [], g = +d || 1;
            do
              h = h || '.5', g /= h, n.style(c.elem, a, g + f);
            while (h !== (h = c.cur() / d) && 1 !== h && --i);
          }
          return e && (g = c.start = +g || +d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]), c;
        }]
    };
  function gc() {
    return setTimeout(function () {
      _b = void 0;
    }), _b = n.now();
  }
  function hc(a, b) {
    var c, d = { height: a }, e = 0;
    for (b = b ? 1 : 0; 4 > e; e += 2 - b)
      c = U[e], d['margin' + c] = d['padding' + c] = a;
    return b && (d.opacity = d.width = a), d;
  }
  function ic(a, b, c) {
    for (var d, e = (fc[b] || []).concat(fc['*']), f = 0, g = e.length; g > f; f++)
      if (d = e[f].call(c, b, a))
        return d;
  }
  function jc(a, b, c) {
    var d, e, f, g, h, i, j, k, m = this, o = {}, p = a.style, q = a.nodeType && V(a), r = n._data(a, 'fxshow');
    c.queue || (h = n._queueHooks(a, 'fx'), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function () {
      h.unqueued || i();
    }), h.unqueued++, m.always(function () {
      m.always(function () {
        h.unqueued--, n.queue(a, 'fx').length || h.empty.fire();
      });
    })), 1 === a.nodeType && ('height' in b || 'width' in b) && (c.overflow = [
      p.overflow,
      p.overflowX,
      p.overflowY
    ], j = n.css(a, 'display'), k = Gb(a.nodeName), 'none' === j && (j = k), 'inline' === j && 'none' === n.css(a, 'float') && (l.inlineBlockNeedsLayout && 'inline' !== k ? p.zoom = 1 : p.display = 'inline-block')), c.overflow && (p.overflow = 'hidden', l.shrinkWrapBlocks() || m.always(function () {
      p.overflow = c.overflow[0], p.overflowX = c.overflow[1], p.overflowY = c.overflow[2];
    }));
    for (d in b)
      if (e = b[d], bc.exec(e)) {
        if (delete b[d], f = f || 'toggle' === e, e === (q ? 'hide' : 'show')) {
          if ('show' !== e || !r || void 0 === r[d])
            continue;
          q = !0;
        }
        o[d] = r && r[d] || n.style(a, d);
      }
    if (!n.isEmptyObject(o)) {
      r ? 'hidden' in r && (q = r.hidden) : r = n._data(a, 'fxshow', {}), f && (r.hidden = !q), q ? n(a).show() : m.done(function () {
        n(a).hide();
      }), m.done(function () {
        var b;
        n._removeData(a, 'fxshow');
        for (b in o)
          n.style(a, b, o[b]);
      });
      for (d in o)
        g = ic(q ? r[d] : 0, d, m), d in r || (r[d] = g.start, q && (g.end = g.start, g.start = 'width' === d || 'height' === d ? 1 : 0));
    }
  }
  function kc(a, b) {
    var c, d, e, f, g;
    for (c in a)
      if (d = n.camelCase(c), e = b[d], f = a[c], n.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = n.cssHooks[d], g && 'expand' in g) {
        f = g.expand(f), delete a[d];
        for (c in f)
          c in a || (a[c] = f[c], b[c] = e);
      } else
        b[d] = e;
  }
  function lc(a, b, c) {
    var d, e, f = 0, g = ec.length, h = n.Deferred().always(function () {
        delete i.elem;
      }), i = function () {
        if (e)
          return !1;
        for (var b = _b || gc(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++)
          j.tweens[g].run(f);
        return h.notifyWith(a, [
          j,
          f,
          c
        ]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1);
      }, j = h.promise({
        elem: a,
        props: n.extend({}, b),
        opts: n.extend(!0, { specialEasing: {} }, c),
        originalProperties: b,
        originalOptions: c,
        startTime: _b || gc(),
        duration: c.duration,
        tweens: [],
        createTween: function (b, c) {
          var d = n.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
          return j.tweens.push(d), d;
        },
        stop: function (b) {
          var c = 0, d = b ? j.tweens.length : 0;
          if (e)
            return this;
          for (e = !0; d > c; c++)
            j.tweens[c].run(1);
          return b ? h.resolveWith(a, [
            j,
            b
          ]) : h.rejectWith(a, [
            j,
            b
          ]), this;
        }
      }), k = j.props;
    for (kc(k, j.opts.specialEasing); g > f; f++)
      if (d = ec[f].call(j, a, k, j.opts))
        return d;
    return n.map(k, ic, j), n.isFunction(j.opts.start) && j.opts.start.call(a, j), n.fx.timer(n.extend(i, {
      elem: a,
      anim: j,
      queue: j.opts.queue
    })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always);
  }
  n.Animation = n.extend(lc, {
    tweener: function (a, b) {
      n.isFunction(a) ? (b = a, a = ['*']) : a = a.split(' ');
      for (var c, d = 0, e = a.length; e > d; d++)
        c = a[d], fc[c] = fc[c] || [], fc[c].unshift(b);
    },
    prefilter: function (a, b) {
      b ? ec.unshift(a) : ec.push(a);
    }
  }), n.speed = function (a, b, c) {
    var d = a && 'object' == typeof a ? n.extend({}, a) : {
        complete: c || !c && b || n.isFunction(a) && a,
        duration: a,
        easing: c && b || b && !n.isFunction(b) && b
      };
    return d.duration = n.fx.off ? 0 : 'number' == typeof d.duration ? d.duration : d.duration in n.fx.speeds ? n.fx.speeds[d.duration] : n.fx.speeds._default, (null == d.queue || d.queue === !0) && (d.queue = 'fx'), d.old = d.complete, d.complete = function () {
      n.isFunction(d.old) && d.old.call(this), d.queue && n.dequeue(this, d.queue);
    }, d;
  }, n.fn.extend({
    fadeTo: function (a, b, c, d) {
      return this.filter(V).css('opacity', 0).show().end().animate({ opacity: b }, a, c, d);
    },
    animate: function (a, b, c, d) {
      var e = n.isEmptyObject(a), f = n.speed(b, c, d), g = function () {
          var b = lc(this, n.extend({}, a), f);
          (e || n._data(this, 'finish')) && b.stop(!0);
        };
      return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g);
    },
    stop: function (a, b, c) {
      var d = function (a) {
        var b = a.stop;
        delete a.stop, b(c);
      };
      return 'string' != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || 'fx', []), this.each(function () {
        var b = !0, e = null != a && a + 'queueHooks', f = n.timers, g = n._data(this);
        if (e)
          g[e] && g[e].stop && d(g[e]);
        else
          for (e in g)
            g[e] && g[e].stop && dc.test(e) && d(g[e]);
        for (e = f.length; e--;)
          f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
        (b || !c) && n.dequeue(this, a);
      });
    },
    finish: function (a) {
      return a !== !1 && (a = a || 'fx'), this.each(function () {
        var b, c = n._data(this), d = c[a + 'queue'], e = c[a + 'queueHooks'], f = n.timers, g = d ? d.length : 0;
        for (c.finish = !0, n.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;)
          f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
        for (b = 0; g > b; b++)
          d[b] && d[b].finish && d[b].finish.call(this);
        delete c.finish;
      });
    }
  }), n.each([
    'toggle',
    'show',
    'hide'
  ], function (a, b) {
    var c = n.fn[b];
    n.fn[b] = function (a, d, e) {
      return null == a || 'boolean' == typeof a ? c.apply(this, arguments) : this.animate(hc(b, !0), a, d, e);
    };
  }), n.each({
    slideDown: hc('show'),
    slideUp: hc('hide'),
    slideToggle: hc('toggle'),
    fadeIn: { opacity: 'show' },
    fadeOut: { opacity: 'hide' },
    fadeToggle: { opacity: 'toggle' }
  }, function (a, b) {
    n.fn[a] = function (a, c, d) {
      return this.animate(b, a, c, d);
    };
  }), n.timers = [], n.fx.tick = function () {
    var a, b = n.timers, c = 0;
    for (_b = n.now(); c < b.length; c++)
      a = b[c], a() || b[c] !== a || b.splice(c--, 1);
    b.length || n.fx.stop(), _b = void 0;
  }, n.fx.timer = function (a) {
    n.timers.push(a), a() ? n.fx.start() : n.timers.pop();
  }, n.fx.interval = 13, n.fx.start = function () {
    ac || (ac = setInterval(n.fx.tick, n.fx.interval));
  }, n.fx.stop = function () {
    clearInterval(ac), ac = null;
  }, n.fx.speeds = {
    slow: 600,
    fast: 200,
    _default: 400
  }, n.fn.delay = function (a, b) {
    return a = n.fx ? n.fx.speeds[a] || a : a, b = b || 'fx', this.queue(b, function (b, c) {
      var d = setTimeout(b, a);
      c.stop = function () {
        clearTimeout(d);
      };
    });
  }, function () {
    var a, b, c, d, e = z.createElement('div');
    e.setAttribute('className', 't'), e.innerHTML = '  <link/><table></table><a href=\'/a\'>a</a><input type=\'checkbox\'/>', a = e.getElementsByTagName('a')[0], c = z.createElement('select'), d = c.appendChild(z.createElement('option')), b = e.getElementsByTagName('input')[0], a.style.cssText = 'top:1px', l.getSetAttribute = 't' !== e.className, l.style = /top/.test(a.getAttribute('style')), l.hrefNormalized = '/a' === a.getAttribute('href'), l.checkOn = !!b.value, l.optSelected = d.selected, l.enctype = !!z.createElement('form').enctype, c.disabled = !0, l.optDisabled = !d.disabled, b = z.createElement('input'), b.setAttribute('value', ''), l.input = '' === b.getAttribute('value'), b.value = 't', b.setAttribute('type', 'radio'), l.radioValue = 't' === b.value, a = b = c = d = e = null;
  }();
  var mc = /\r/g;
  n.fn.extend({
    val: function (a) {
      var b, c, d, e = this[0];
      {
        if (arguments.length)
          return d = n.isFunction(a), this.each(function (c) {
            var e;
            1 === this.nodeType && (e = d ? a.call(this, c, n(this).val()) : a, null == e ? e = '' : 'number' == typeof e ? e += '' : n.isArray(e) && (e = n.map(e, function (a) {
              return null == a ? '' : a + '';
            })), b = n.valHooks[this.type] || n.valHooks[this.nodeName.toLowerCase()], b && 'set' in b && void 0 !== b.set(this, e, 'value') || (this.value = e));
          });
        if (e)
          return b = n.valHooks[e.type] || n.valHooks[e.nodeName.toLowerCase()], b && 'get' in b && void 0 !== (c = b.get(e, 'value')) ? c : (c = e.value, 'string' == typeof c ? c.replace(mc, '') : null == c ? '' : c);
      }
    }
  }), n.extend({
    valHooks: {
      option: {
        get: function (a) {
          var b = n.find.attr(a, 'value');
          return null != b ? b : n.text(a);
        }
      },
      select: {
        get: function (a) {
          for (var b, c, d = a.options, e = a.selectedIndex, f = 'select-one' === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++)
            if (c = d[i], !(!c.selected && i !== e || (l.optDisabled ? c.disabled : null !== c.getAttribute('disabled')) || c.parentNode.disabled && n.nodeName(c.parentNode, 'optgroup'))) {
              if (b = n(c).val(), f)
                return b;
              g.push(b);
            }
          return g;
        },
        set: function (a, b) {
          var c, d, e = a.options, f = n.makeArray(b), g = e.length;
          while (g--)
            if (d = e[g], n.inArray(n.valHooks.option.get(d), f) >= 0)
              try {
                d.selected = c = !0;
              } catch (h) {
                d.scrollHeight;
              }
            else
              d.selected = !1;
          return c || (a.selectedIndex = -1), e;
        }
      }
    }
  }), n.each([
    'radio',
    'checkbox'
  ], function () {
    n.valHooks[this] = {
      set: function (a, b) {
        return n.isArray(b) ? a.checked = n.inArray(n(a).val(), b) >= 0 : void 0;
      }
    }, l.checkOn || (n.valHooks[this].get = function (a) {
      return null === a.getAttribute('value') ? 'on' : a.value;
    });
  });
  var nc, oc, pc = n.expr.attrHandle, qc = /^(?:checked|selected)$/i, rc = l.getSetAttribute, sc = l.input;
  n.fn.extend({
    attr: function (a, b) {
      return W(this, n.attr, a, b, arguments.length > 1);
    },
    removeAttr: function (a) {
      return this.each(function () {
        n.removeAttr(this, a);
      });
    }
  }), n.extend({
    attr: function (a, b, c) {
      var d, e, f = a.nodeType;
      if (a && 3 !== f && 8 !== f && 2 !== f)
        return typeof a.getAttribute === L ? n.prop(a, b, c) : (1 === f && n.isXMLDoc(a) || (b = b.toLowerCase(), d = n.attrHooks[b] || (n.expr.match.bool.test(b) ? oc : nc)), void 0 === c ? d && 'get' in d && null !== (e = d.get(a, b)) ? e : (e = n.find.attr(a, b), null == e ? void 0 : e) : null !== c ? d && 'set' in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + ''), c) : void n.removeAttr(a, b));
    },
    removeAttr: function (a, b) {
      var c, d, e = 0, f = b && b.match(F);
      if (f && 1 === a.nodeType)
        while (c = f[e++])
          d = n.propFix[c] || c, n.expr.match.bool.test(c) ? sc && rc || !qc.test(c) ? a[d] = !1 : a[n.camelCase('default-' + c)] = a[d] = !1 : n.attr(a, c, ''), a.removeAttribute(rc ? c : d);
    },
    attrHooks: {
      type: {
        set: function (a, b) {
          if (!l.radioValue && 'radio' === b && n.nodeName(a, 'input')) {
            var c = a.value;
            return a.setAttribute('type', b), c && (a.value = c), b;
          }
        }
      }
    }
  }), oc = {
    set: function (a, b, c) {
      return b === !1 ? n.removeAttr(a, c) : sc && rc || !qc.test(c) ? a.setAttribute(!rc && n.propFix[c] || c, c) : a[n.camelCase('default-' + c)] = a[c] = !0, c;
    }
  }, n.each(n.expr.match.bool.source.match(/\w+/g), function (a, b) {
    var c = pc[b] || n.find.attr;
    pc[b] = sc && rc || !qc.test(b) ? function (a, b, d) {
      var e, f;
      return d || (f = pc[b], pc[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, pc[b] = f), e;
    } : function (a, b, c) {
      return c ? void 0 : a[n.camelCase('default-' + b)] ? b.toLowerCase() : null;
    };
  }), sc && rc || (n.attrHooks.value = {
    set: function (a, b, c) {
      return n.nodeName(a, 'input') ? void (a.defaultValue = b) : nc && nc.set(a, b, c);
    }
  }), rc || (nc = {
    set: function (a, b, c) {
      var d = a.getAttributeNode(c);
      return d || a.setAttributeNode(d = a.ownerDocument.createAttribute(c)), d.value = b += '', 'value' === c || b === a.getAttribute(c) ? b : void 0;
    }
  }, pc.id = pc.name = pc.coords = function (a, b, c) {
    var d;
    return c ? void 0 : (d = a.getAttributeNode(b)) && '' !== d.value ? d.value : null;
  }, n.valHooks.button = {
    get: function (a, b) {
      var c = a.getAttributeNode(b);
      return c && c.specified ? c.value : void 0;
    },
    set: nc.set
  }, n.attrHooks.contenteditable = {
    set: function (a, b, c) {
      nc.set(a, '' === b ? !1 : b, c);
    }
  }, n.each([
    'width',
    'height'
  ], function (a, b) {
    n.attrHooks[b] = {
      set: function (a, c) {
        return '' === c ? (a.setAttribute(b, 'auto'), c) : void 0;
      }
    };
  })), l.style || (n.attrHooks.style = {
    get: function (a) {
      return a.style.cssText || void 0;
    },
    set: function (a, b) {
      return a.style.cssText = b + '';
    }
  });
  var tc = /^(?:input|select|textarea|button|object)$/i, uc = /^(?:a|area)$/i;
  n.fn.extend({
    prop: function (a, b) {
      return W(this, n.prop, a, b, arguments.length > 1);
    },
    removeProp: function (a) {
      return a = n.propFix[a] || a, this.each(function () {
        try {
          this[a] = void 0, delete this[a];
        } catch (b) {
        }
      });
    }
  }), n.extend({
    propFix: {
      'for': 'htmlFor',
      'class': 'className'
    },
    prop: function (a, b, c) {
      var d, e, f, g = a.nodeType;
      if (a && 3 !== g && 8 !== g && 2 !== g)
        return f = 1 !== g || !n.isXMLDoc(a), f && (b = n.propFix[b] || b, e = n.propHooks[b]), void 0 !== c ? e && 'set' in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && 'get' in e && null !== (d = e.get(a, b)) ? d : a[b];
    },
    propHooks: {
      tabIndex: {
        get: function (a) {
          var b = n.find.attr(a, 'tabindex');
          return b ? parseInt(b, 10) : tc.test(a.nodeName) || uc.test(a.nodeName) && a.href ? 0 : -1;
        }
      }
    }
  }), l.hrefNormalized || n.each([
    'href',
    'src'
  ], function (a, b) {
    n.propHooks[b] = {
      get: function (a) {
        return a.getAttribute(b, 4);
      }
    };
  }), l.optSelected || (n.propHooks.selected = {
    get: function (a) {
      var b = a.parentNode;
      return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null;
    }
  }), n.each([
    'tabIndex',
    'readOnly',
    'maxLength',
    'cellSpacing',
    'cellPadding',
    'rowSpan',
    'colSpan',
    'useMap',
    'frameBorder',
    'contentEditable'
  ], function () {
    n.propFix[this.toLowerCase()] = this;
  }), l.enctype || (n.propFix.enctype = 'encoding');
  var vc = /[\t\r\n\f]/g;
  n.fn.extend({
    addClass: function (a) {
      var b, c, d, e, f, g, h = 0, i = this.length, j = 'string' == typeof a && a;
      if (n.isFunction(a))
        return this.each(function (b) {
          n(this).addClass(a.call(this, b, this.className));
        });
      if (j)
        for (b = (a || '').match(F) || []; i > h; h++)
          if (c = this[h], d = 1 === c.nodeType && (c.className ? (' ' + c.className + ' ').replace(vc, ' ') : ' ')) {
            f = 0;
            while (e = b[f++])
              d.indexOf(' ' + e + ' ') < 0 && (d += e + ' ');
            g = n.trim(d), c.className !== g && (c.className = g);
          }
      return this;
    },
    removeClass: function (a) {
      var b, c, d, e, f, g, h = 0, i = this.length, j = 0 === arguments.length || 'string' == typeof a && a;
      if (n.isFunction(a))
        return this.each(function (b) {
          n(this).removeClass(a.call(this, b, this.className));
        });
      if (j)
        for (b = (a || '').match(F) || []; i > h; h++)
          if (c = this[h], d = 1 === c.nodeType && (c.className ? (' ' + c.className + ' ').replace(vc, ' ') : '')) {
            f = 0;
            while (e = b[f++])
              while (d.indexOf(' ' + e + ' ') >= 0)
                d = d.replace(' ' + e + ' ', ' ');
            g = a ? n.trim(d) : '', c.className !== g && (c.className = g);
          }
      return this;
    },
    toggleClass: function (a, b) {
      var c = typeof a;
      return 'boolean' == typeof b && 'string' === c ? b ? this.addClass(a) : this.removeClass(a) : this.each(n.isFunction(a) ? function (c) {
        n(this).toggleClass(a.call(this, c, this.className, b), b);
      } : function () {
        if ('string' === c) {
          var b, d = 0, e = n(this), f = a.match(F) || [];
          while (b = f[d++])
            e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
        } else
          (c === L || 'boolean' === c) && (this.className && n._data(this, '__className__', this.className), this.className = this.className || a === !1 ? '' : n._data(this, '__className__') || '');
      });
    },
    hasClass: function (a) {
      for (var b = ' ' + a + ' ', c = 0, d = this.length; d > c; c++)
        if (1 === this[c].nodeType && (' ' + this[c].className + ' ').replace(vc, ' ').indexOf(b) >= 0)
          return !0;
      return !1;
    }
  }), n.each('blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu'.split(' '), function (a, b) {
    n.fn[b] = function (a, c) {
      return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b);
    };
  }), n.fn.extend({
    hover: function (a, b) {
      return this.mouseenter(a).mouseleave(b || a);
    },
    bind: function (a, b, c) {
      return this.on(a, null, b, c);
    },
    unbind: function (a, b) {
      return this.off(a, null, b);
    },
    delegate: function (a, b, c, d) {
      return this.on(b, a, c, d);
    },
    undelegate: function (a, b, c) {
      return 1 === arguments.length ? this.off(a, '**') : this.off(b, a || '**', c);
    }
  });
  var wc = n.now(), xc = /\?/, yc = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
  n.parseJSON = function (b) {
    if (a.JSON && a.JSON.parse)
      return a.JSON.parse(b + '');
    var c, d = null, e = n.trim(b + '');
    return e && !n.trim(e.replace(yc, function (a, b, e, f) {
      return c && b && (d = 0), 0 === d ? a : (c = e || b, d += !f - !e, '');
    })) ? Function('return ' + e)() : n.error('Invalid JSON: ' + b);
  }, n.parseXML = function (b) {
    var c, d;
    if (!b || 'string' != typeof b)
      return null;
    try {
      a.DOMParser ? (d = new DOMParser(), c = d.parseFromString(b, 'text/xml')) : (c = new ActiveXObject('Microsoft.XMLDOM'), c.async = 'false', c.loadXML(b));
    } catch (e) {
      c = void 0;
    }
    return c && c.documentElement && !c.getElementsByTagName('parsererror').length || n.error('Invalid XML: ' + b), c;
  };
  var zc, Ac, Bc = /#.*$/, Cc = /([?&])_=[^&]*/, Dc = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Ec = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Fc = /^(?:GET|HEAD)$/, Gc = /^\/\//, Hc = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, Ic = {}, Jc = {}, Kc = '*/'.concat('*');
  try {
    Ac = location.href;
  } catch (Lc) {
    Ac = z.createElement('a'), Ac.href = '', Ac = Ac.href;
  }
  zc = Hc.exec(Ac.toLowerCase()) || [];
  function Mc(a) {
    return function (b, c) {
      'string' != typeof b && (c = b, b = '*');
      var d, e = 0, f = b.toLowerCase().match(F) || [];
      if (n.isFunction(c))
        while (d = f[e++])
          '+' === d.charAt(0) ? (d = d.slice(1) || '*', (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c);
    };
  }
  function Nc(a, b, c, d) {
    var e = {}, f = a === Jc;
    function g(h) {
      var i;
      return e[h] = !0, n.each(a[h] || [], function (a, h) {
        var j = h(b, c, d);
        return 'string' != typeof j || f || e[j] ? f ? !(i = j) : void 0 : (b.dataTypes.unshift(j), g(j), !1);
      }), i;
    }
    return g(b.dataTypes[0]) || !e['*'] && g('*');
  }
  function Oc(a, b) {
    var c, d, e = n.ajaxSettings.flatOptions || {};
    for (d in b)
      void 0 !== b[d] && ((e[d] ? a : c || (c = {}))[d] = b[d]);
    return c && n.extend(!0, a, c), a;
  }
  function Pc(a, b, c) {
    var d, e, f, g, h = a.contents, i = a.dataTypes;
    while ('*' === i[0])
      i.shift(), void 0 === e && (e = a.mimeType || b.getResponseHeader('Content-Type'));
    if (e)
      for (g in h)
        if (h[g] && h[g].test(e)) {
          i.unshift(g);
          break;
        }
    if (i[0] in c)
      f = i[0];
    else {
      for (g in c) {
        if (!i[0] || a.converters[g + ' ' + i[0]]) {
          f = g;
          break;
        }
        d || (d = g);
      }
      f = f || d;
    }
    return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0;
  }
  function Qc(a, b, c, d) {
    var e, f, g, h, i, j = {}, k = a.dataTypes.slice();
    if (k[1])
      for (g in a.converters)
        j[g.toLowerCase()] = a.converters[g];
    f = k.shift();
    while (f)
      if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())
        if ('*' === f)
          f = i;
        else if ('*' !== i && i !== f) {
          if (g = j[i + ' ' + f] || j['* ' + f], !g)
            for (e in j)
              if (h = e.split(' '), h[1] === f && (g = j[i + ' ' + h[0]] || j['* ' + h[0]])) {
                g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
                break;
              }
          if (g !== !0)
            if (g && a['throws'])
              b = g(b);
            else
              try {
                b = g(b);
              } catch (l) {
                return {
                  state: 'parsererror',
                  error: g ? l : 'No conversion from ' + i + ' to ' + f
                };
              }
        }
    return {
      state: 'success',
      data: b
    };
  }
  n.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: Ac,
      type: 'GET',
      isLocal: Ec.test(zc[1]),
      global: !0,
      processData: !0,
      async: !0,
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      accepts: {
        '*': Kc,
        text: 'text/plain',
        html: 'text/html',
        xml: 'application/xml, text/xml',
        json: 'application/json, text/javascript'
      },
      contents: {
        xml: /xml/,
        html: /html/,
        json: /json/
      },
      responseFields: {
        xml: 'responseXML',
        text: 'responseText',
        json: 'responseJSON'
      },
      converters: {
        '* text': String,
        'text html': !0,
        'text json': n.parseJSON,
        'text xml': n.parseXML
      },
      flatOptions: {
        url: !0,
        context: !0
      }
    },
    ajaxSetup: function (a, b) {
      return b ? Oc(Oc(a, n.ajaxSettings), b) : Oc(n.ajaxSettings, a);
    },
    ajaxPrefilter: Mc(Ic),
    ajaxTransport: Mc(Jc),
    ajax: function (a, b) {
      'object' == typeof a && (b = a, a = void 0), b = b || {};
      var c, d, e, f, g, h, i, j, k = n.ajaxSetup({}, b), l = k.context || k, m = k.context && (l.nodeType || l.jquery) ? n(l) : n.event, o = n.Deferred(), p = n.Callbacks('once memory'), q = k.statusCode || {}, r = {}, s = {}, t = 0, u = 'canceled', v = {
          readyState: 0,
          getResponseHeader: function (a) {
            var b;
            if (2 === t) {
              if (!j) {
                j = {};
                while (b = Dc.exec(f))
                  j[b[1].toLowerCase()] = b[2];
              }
              b = j[a.toLowerCase()];
            }
            return null == b ? null : b;
          },
          getAllResponseHeaders: function () {
            return 2 === t ? f : null;
          },
          setRequestHeader: function (a, b) {
            var c = a.toLowerCase();
            return t || (a = s[c] = s[c] || a, r[a] = b), this;
          },
          overrideMimeType: function (a) {
            return t || (k.mimeType = a), this;
          },
          statusCode: function (a) {
            var b;
            if (a)
              if (2 > t)
                for (b in a)
                  q[b] = [
                    q[b],
                    a[b]
                  ];
              else
                v.always(a[v.status]);
            return this;
          },
          abort: function (a) {
            var b = a || u;
            return i && i.abort(b), x(0, b), this;
          }
        };
      if (o.promise(v).complete = p.add, v.success = v.done, v.error = v.fail, k.url = ((a || k.url || Ac) + '').replace(Bc, '').replace(Gc, zc[1] + '//'), k.type = b.method || b.type || k.method || k.type, k.dataTypes = n.trim(k.dataType || '*').toLowerCase().match(F) || [''], null == k.crossDomain && (c = Hc.exec(k.url.toLowerCase()), k.crossDomain = !(!c || c[1] === zc[1] && c[2] === zc[2] && (c[3] || ('http:' === c[1] ? '80' : '443')) === (zc[3] || ('http:' === zc[1] ? '80' : '443')))), k.data && k.processData && 'string' != typeof k.data && (k.data = n.param(k.data, k.traditional)), Nc(Ic, k, b, v), 2 === t)
        return v;
      h = k.global, h && 0 === n.active++ && n.event.trigger('ajaxStart'), k.type = k.type.toUpperCase(), k.hasContent = !Fc.test(k.type), e = k.url, k.hasContent || (k.data && (e = k.url += (xc.test(e) ? '&' : '?') + k.data, delete k.data), k.cache === !1 && (k.url = Cc.test(e) ? e.replace(Cc, '$1_=' + wc++) : e + (xc.test(e) ? '&' : '?') + '_=' + wc++)), k.ifModified && (n.lastModified[e] && v.setRequestHeader('If-Modified-Since', n.lastModified[e]), n.etag[e] && v.setRequestHeader('If-None-Match', n.etag[e])), (k.data && k.hasContent && k.contentType !== !1 || b.contentType) && v.setRequestHeader('Content-Type', k.contentType), v.setRequestHeader('Accept', k.dataTypes[0] && k.accepts[k.dataTypes[0]] ? k.accepts[k.dataTypes[0]] + ('*' !== k.dataTypes[0] ? ', ' + Kc + '; q=0.01' : '') : k.accepts['*']);
      for (d in k.headers)
        v.setRequestHeader(d, k.headers[d]);
      if (k.beforeSend && (k.beforeSend.call(l, v, k) === !1 || 2 === t))
        return v.abort();
      u = 'abort';
      for (d in {
          success: 1,
          error: 1,
          complete: 1
        })
        v[d](k[d]);
      if (i = Nc(Jc, k, b, v)) {
        v.readyState = 1, h && m.trigger('ajaxSend', [
          v,
          k
        ]), k.async && k.timeout > 0 && (g = setTimeout(function () {
          v.abort('timeout');
        }, k.timeout));
        try {
          t = 1, i.send(r, x);
        } catch (w) {
          if (!(2 > t))
            throw w;
          x(-1, w);
        }
      } else
        x(-1, 'No Transport');
      function x(a, b, c, d) {
        var j, r, s, u, w, x = b;
        2 !== t && (t = 2, g && clearTimeout(g), i = void 0, f = d || '', v.readyState = a > 0 ? 4 : 0, j = a >= 200 && 300 > a || 304 === a, c && (u = Pc(k, v, c)), u = Qc(k, u, v, j), j ? (k.ifModified && (w = v.getResponseHeader('Last-Modified'), w && (n.lastModified[e] = w), w = v.getResponseHeader('etag'), w && (n.etag[e] = w)), 204 === a || 'HEAD' === k.type ? x = 'nocontent' : 304 === a ? x = 'notmodified' : (x = u.state, r = u.data, s = u.error, j = !s)) : (s = x, (a || !x) && (x = 'error', 0 > a && (a = 0))), v.status = a, v.statusText = (b || x) + '', j ? o.resolveWith(l, [
          r,
          x,
          v
        ]) : o.rejectWith(l, [
          v,
          x,
          s
        ]), v.statusCode(q), q = void 0, h && m.trigger(j ? 'ajaxSuccess' : 'ajaxError', [
          v,
          k,
          j ? r : s
        ]), p.fireWith(l, [
          v,
          x
        ]), h && (m.trigger('ajaxComplete', [
          v,
          k
        ]), --n.active || n.event.trigger('ajaxStop')));
      }
      return v;
    },
    getJSON: function (a, b, c) {
      return n.get(a, b, c, 'json');
    },
    getScript: function (a, b) {
      return n.get(a, void 0, b, 'script');
    }
  }), n.each([
    'get',
    'post'
  ], function (a, b) {
    n[b] = function (a, c, d, e) {
      return n.isFunction(c) && (e = e || d, d = c, c = void 0), n.ajax({
        url: a,
        type: b,
        dataType: e,
        data: c,
        success: d
      });
    };
  }), n.each([
    'ajaxStart',
    'ajaxStop',
    'ajaxComplete',
    'ajaxError',
    'ajaxSuccess',
    'ajaxSend'
  ], function (a, b) {
    n.fn[b] = function (a) {
      return this.on(b, a);
    };
  }), n._evalUrl = function (a) {
    return n.ajax({
      url: a,
      type: 'GET',
      dataType: 'script',
      async: !1,
      global: !1,
      'throws': !0
    });
  }, n.fn.extend({
    wrapAll: function (a) {
      if (n.isFunction(a))
        return this.each(function (b) {
          n(this).wrapAll(a.call(this, b));
        });
      if (this[0]) {
        var b = n(a, this[0].ownerDocument).eq(0).clone(!0);
        this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
          var a = this;
          while (a.firstChild && 1 === a.firstChild.nodeType)
            a = a.firstChild;
          return a;
        }).append(this);
      }
      return this;
    },
    wrapInner: function (a) {
      return this.each(n.isFunction(a) ? function (b) {
        n(this).wrapInner(a.call(this, b));
      } : function () {
        var b = n(this), c = b.contents();
        c.length ? c.wrapAll(a) : b.append(a);
      });
    },
    wrap: function (a) {
      var b = n.isFunction(a);
      return this.each(function (c) {
        n(this).wrapAll(b ? a.call(this, c) : a);
      });
    },
    unwrap: function () {
      return this.parent().each(function () {
        n.nodeName(this, 'body') || n(this).replaceWith(this.childNodes);
      }).end();
    }
  }), n.expr.filters.hidden = function (a) {
    return a.offsetWidth <= 0 && a.offsetHeight <= 0 || !l.reliableHiddenOffsets() && 'none' === (a.style && a.style.display || n.css(a, 'display'));
  }, n.expr.filters.visible = function (a) {
    return !n.expr.filters.hidden(a);
  };
  var Rc = /%20/g, Sc = /\[\]$/, Tc = /\r?\n/g, Uc = /^(?:submit|button|image|reset|file)$/i, Vc = /^(?:input|select|textarea|keygen)/i;
  function Wc(a, b, c, d) {
    var e;
    if (n.isArray(b))
      n.each(b, function (b, e) {
        c || Sc.test(a) ? d(a, e) : Wc(a + '[' + ('object' == typeof e ? b : '') + ']', e, c, d);
      });
    else if (c || 'object' !== n.type(b))
      d(a, b);
    else
      for (e in b)
        Wc(a + '[' + e + ']', b[e], c, d);
  }
  n.param = function (a, b) {
    var c, d = [], e = function (a, b) {
        b = n.isFunction(b) ? b() : null == b ? '' : b, d[d.length] = encodeURIComponent(a) + '=' + encodeURIComponent(b);
      };
    if (void 0 === b && (b = n.ajaxSettings && n.ajaxSettings.traditional), n.isArray(a) || a.jquery && !n.isPlainObject(a))
      n.each(a, function () {
        e(this.name, this.value);
      });
    else
      for (c in a)
        Wc(c, a[c], b, e);
    return d.join('&').replace(Rc, '+');
  }, n.fn.extend({
    serialize: function () {
      return n.param(this.serializeArray());
    },
    serializeArray: function () {
      return this.map(function () {
        var a = n.prop(this, 'elements');
        return a ? n.makeArray(a) : this;
      }).filter(function () {
        var a = this.type;
        return this.name && !n(this).is(':disabled') && Vc.test(this.nodeName) && !Uc.test(a) && (this.checked || !X.test(a));
      }).map(function (a, b) {
        var c = n(this).val();
        return null == c ? null : n.isArray(c) ? n.map(c, function (a) {
          return {
            name: b.name,
            value: a.replace(Tc, '\r\n')
          };
        }) : {
          name: b.name,
          value: c.replace(Tc, '\r\n')
        };
      }).get();
    }
  }), n.ajaxSettings.xhr = void 0 !== a.ActiveXObject ? function () {
    return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && $c() || _c();
  } : $c;
  var Xc = 0, Yc = {}, Zc = n.ajaxSettings.xhr();
  a.ActiveXObject && n(a).on('unload', function () {
    for (var a in Yc)
      Yc[a](void 0, !0);
  }), l.cors = !!Zc && 'withCredentials' in Zc, Zc = l.ajax = !!Zc, Zc && n.ajaxTransport(function (a) {
    if (!a.crossDomain || l.cors) {
      var b;
      return {
        send: function (c, d) {
          var e, f = a.xhr(), g = ++Xc;
          if (f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields)
            for (e in a.xhrFields)
              f[e] = a.xhrFields[e];
          a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType), a.crossDomain || c['X-Requested-With'] || (c['X-Requested-With'] = 'XMLHttpRequest');
          for (e in c)
            void 0 !== c[e] && f.setRequestHeader(e, c[e] + '');
          f.send(a.hasContent && a.data || null), b = function (c, e) {
            var h, i, j;
            if (b && (e || 4 === f.readyState))
              if (delete Yc[g], b = void 0, f.onreadystatechange = n.noop, e)
                4 !== f.readyState && f.abort();
              else {
                j = {}, h = f.status, 'string' == typeof f.responseText && (j.text = f.responseText);
                try {
                  i = f.statusText;
                } catch (k) {
                  i = '';
                }
                h || !a.isLocal || a.crossDomain ? 1223 === h && (h = 204) : h = j.text ? 200 : 404;
              }
            j && d(h, i, j, f.getAllResponseHeaders());
          }, a.async ? 4 === f.readyState ? setTimeout(b) : f.onreadystatechange = Yc[g] = b : b();
        },
        abort: function () {
          b && b(void 0, !0);
        }
      };
    }
  });
  function $c() {
    try {
      return new a.XMLHttpRequest();
    } catch (b) {
    }
  }
  function _c() {
    try {
      return new a.ActiveXObject('Microsoft.XMLHTTP');
    } catch (b) {
    }
  }
  n.ajaxSetup({
    accepts: { script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript' },
    contents: { script: /(?:java|ecma)script/ },
    converters: {
      'text script': function (a) {
        return n.globalEval(a), a;
      }
    }
  }), n.ajaxPrefilter('script', function (a) {
    void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = 'GET', a.global = !1);
  }), n.ajaxTransport('script', function (a) {
    if (a.crossDomain) {
      var b, c = z.head || n('head')[0] || z.documentElement;
      return {
        send: function (d, e) {
          b = z.createElement('script'), b.async = !0, a.scriptCharset && (b.charset = a.scriptCharset), b.src = a.url, b.onload = b.onreadystatechange = function (a, c) {
            (c || !b.readyState || /loaded|complete/.test(b.readyState)) && (b.onload = b.onreadystatechange = null, b.parentNode && b.parentNode.removeChild(b), b = null, c || e(200, 'success'));
          }, c.insertBefore(b, c.firstChild);
        },
        abort: function () {
          b && b.onload(void 0, !0);
        }
      };
    }
  });
  var ad = [], bd = /(=)\?(?=&|$)|\?\?/;
  n.ajaxSetup({
    jsonp: 'callback',
    jsonpCallback: function () {
      var a = ad.pop() || n.expando + '_' + wc++;
      return this[a] = !0, a;
    }
  }), n.ajaxPrefilter('json jsonp', function (b, c, d) {
    var e, f, g, h = b.jsonp !== !1 && (bd.test(b.url) ? 'url' : 'string' == typeof b.data && !(b.contentType || '').indexOf('application/x-www-form-urlencoded') && bd.test(b.data) && 'data');
    return h || 'jsonp' === b.dataTypes[0] ? (e = b.jsonpCallback = n.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(bd, '$1' + e) : b.jsonp !== !1 && (b.url += (xc.test(b.url) ? '&' : '?') + b.jsonp + '=' + e), b.converters['script json'] = function () {
      return g || n.error(e + ' was not called'), g[0];
    }, b.dataTypes[0] = 'json', f = a[e], a[e] = function () {
      g = arguments;
    }, d.always(function () {
      a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, ad.push(e)), g && n.isFunction(f) && f(g[0]), g = f = void 0;
    }), 'script') : void 0;
  }), n.parseHTML = function (a, b, c) {
    if (!a || 'string' != typeof a)
      return null;
    'boolean' == typeof b && (c = b, b = !1), b = b || z;
    var d = v.exec(a), e = !c && [];
    return d ? [b.createElement(d[1])] : (d = n.buildFragment([a], b, e), e && e.length && n(e).remove(), n.merge([], d.childNodes));
  };
  var cd = n.fn.load;
  n.fn.load = function (a, b, c) {
    if ('string' != typeof a && cd)
      return cd.apply(this, arguments);
    var d, e, f, g = this, h = a.indexOf(' ');
    return h >= 0 && (d = a.slice(h, a.length), a = a.slice(0, h)), n.isFunction(b) ? (c = b, b = void 0) : b && 'object' == typeof b && (f = 'POST'), g.length > 0 && n.ajax({
      url: a,
      type: f,
      dataType: 'html',
      data: b
    }).done(function (a) {
      e = arguments, g.html(d ? n('<div>').append(n.parseHTML(a)).find(d) : a);
    }).complete(c && function (a, b) {
      g.each(c, e || [
        a.responseText,
        b,
        a
      ]);
    }), this;
  }, n.expr.filters.animated = function (a) {
    return n.grep(n.timers, function (b) {
      return a === b.elem;
    }).length;
  };
  var dd = a.document.documentElement;
  function ed(a) {
    return n.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1;
  }
  n.offset = {
    setOffset: function (a, b, c) {
      var d, e, f, g, h, i, j, k = n.css(a, 'position'), l = n(a), m = {};
      'static' === k && (a.style.position = 'relative'), h = l.offset(), f = n.css(a, 'top'), i = n.css(a, 'left'), j = ('absolute' === k || 'fixed' === k) && n.inArray('auto', [
        f,
        i
      ]) > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), n.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), 'using' in b ? b.using.call(a, m) : l.css(m);
    }
  }, n.fn.extend({
    offset: function (a) {
      if (arguments.length)
        return void 0 === a ? this : this.each(function (b) {
          n.offset.setOffset(this, a, b);
        });
      var b, c, d = {
          top: 0,
          left: 0
        }, e = this[0], f = e && e.ownerDocument;
      if (f)
        return b = f.documentElement, n.contains(b, e) ? (typeof e.getBoundingClientRect !== L && (d = e.getBoundingClientRect()), c = ed(f), {
          top: d.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0),
          left: d.left + (c.pageXOffset || b.scrollLeft) - (b.clientLeft || 0)
        }) : d;
    },
    position: function () {
      if (this[0]) {
        var a, b, c = {
            top: 0,
            left: 0
          }, d = this[0];
        return 'fixed' === n.css(d, 'position') ? b = d.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), n.nodeName(a[0], 'html') || (c = a.offset()), c.top += n.css(a[0], 'borderTopWidth', !0), c.left += n.css(a[0], 'borderLeftWidth', !0)), {
          top: b.top - c.top - n.css(d, 'marginTop', !0),
          left: b.left - c.left - n.css(d, 'marginLeft', !0)
        };
      }
    },
    offsetParent: function () {
      return this.map(function () {
        var a = this.offsetParent || dd;
        while (a && !n.nodeName(a, 'html') && 'static' === n.css(a, 'position'))
          a = a.offsetParent;
        return a || dd;
      });
    }
  }), n.each({
    scrollLeft: 'pageXOffset',
    scrollTop: 'pageYOffset'
  }, function (a, b) {
    var c = /Y/.test(b);
    n.fn[a] = function (d) {
      return W(this, function (a, d, e) {
        var f = ed(a);
        return void 0 === e ? f ? b in f ? f[b] : f.document.documentElement[d] : a[d] : void (f ? f.scrollTo(c ? n(f).scrollLeft() : e, c ? e : n(f).scrollTop()) : a[d] = e);
      }, a, d, arguments.length, null);
    };
  }), n.each([
    'top',
    'left'
  ], function (a, b) {
    n.cssHooks[b] = Mb(l.pixelPosition, function (a, c) {
      return c ? (c = Kb(a, b), Ib.test(c) ? n(a).position()[b] + 'px' : c) : void 0;
    });
  }), n.each({
    Height: 'height',
    Width: 'width'
  }, function (a, b) {
    n.each({
      padding: 'inner' + a,
      content: b,
      '': 'outer' + a
    }, function (c, d) {
      n.fn[d] = function (d, e) {
        var f = arguments.length && (c || 'boolean' != typeof d), g = c || (d === !0 || e === !0 ? 'margin' : 'border');
        return W(this, function (b, c, d) {
          var e;
          return n.isWindow(b) ? b.document.documentElement['client' + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body['scroll' + a], e['scroll' + a], b.body['offset' + a], e['offset' + a], e['client' + a])) : void 0 === d ? n.css(b, c, g) : n.style(b, c, d, g);
        }, b, f ? d : void 0, f, null);
      };
    });
  }), n.fn.size = function () {
    return this.length;
  }, n.fn.andSelf = n.fn.addBack, 'function' == typeof define && define.amd && define('jquery', [], function () {
    return n;
  });
  var fd = a.jQuery, gd = a.$;
  return n.noConflict = function (b) {
    return a.$ === n && (a.$ = gd), b && a.jQuery === n && (a.jQuery = fd), n;
  }, typeof b === L && (a.jQuery = a.$ = n), n;
});
/*
 AngularJS v1.2.16
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function (O, U, s) {
  'use strict';
  function t(b) {
    return function () {
      var a = arguments[0], c, a = '[' + (b ? b + ':' : '') + a + '] http://errors.angularjs.org/1.2.16/' + (b ? b + '/' : '') + a;
      for (c = 1; c < arguments.length; c++)
        a = a + (1 == c ? '?' : '&') + 'p' + (c - 1) + '=' + encodeURIComponent('function' == typeof arguments[c] ? arguments[c].toString().replace(/ \{[\s\S]*$/, '') : 'undefined' == typeof arguments[c] ? 'undefined' : 'string' != typeof arguments[c] ? JSON.stringify(arguments[c]) : arguments[c]);
      return Error(a);
    };
  }
  function ab(b) {
    if (null == b || Ca(b))
      return !1;
    var a = b.length;
    return 1 === b.nodeType && a ? !0 : w(b) || M(b) || 0 === a || 'number' === typeof a && 0 < a && a - 1 in b;
  }
  function q(b, a, c) {
    var d;
    if (b)
      if (P(b))
        for (d in b)
          'prototype' == d || ('length' == d || 'name' == d || b.hasOwnProperty && !b.hasOwnProperty(d)) || a.call(c, b[d], d);
      else if (b.forEach && b.forEach !== q)
        b.forEach(a, c);
      else if (ab(b))
        for (d = 0; d < b.length; d++)
          a.call(c, b[d], d);
      else
        for (d in b)
          b.hasOwnProperty(d) && a.call(c, b[d], d);
    return b;
  }
  function Qb(b) {
    var a = [], c;
    for (c in b)
      b.hasOwnProperty(c) && a.push(c);
    return a.sort();
  }
  function Sc(b, a, c) {
    for (var d = Qb(b), e = 0; e < d.length; e++)
      a.call(c, b[d[e]], d[e]);
    return d;
  }
  function Rb(b) {
    return function (a, c) {
      b(c, a);
    };
  }
  function bb() {
    for (var b = ka.length, a; b;) {
      b--;
      a = ka[b].charCodeAt(0);
      if (57 == a)
        return ka[b] = 'A', ka.join('');
      if (90 == a)
        ka[b] = '0';
      else
        return ka[b] = String.fromCharCode(a + 1), ka.join('');
    }
    ka.unshift('0');
    return ka.join('');
  }
  function Sb(b, a) {
    a ? b.$$hashKey = a : delete b.$$hashKey;
  }
  function D(b) {
    var a = b.$$hashKey;
    q(arguments, function (a) {
      a !== b && q(a, function (a, c) {
        b[c] = a;
      });
    });
    Sb(b, a);
    return b;
  }
  function Y(b) {
    return parseInt(b, 10);
  }
  function Tb(b, a) {
    return D(new (D(function () {
    }, { prototype: b }))(), a);
  }
  function C() {
  }
  function Da(b) {
    return b;
  }
  function aa(b) {
    return function () {
      return b;
    };
  }
  function E(b) {
    return 'undefined' === typeof b;
  }
  function B(b) {
    return 'undefined' !== typeof b;
  }
  function X(b) {
    return null != b && 'object' === typeof b;
  }
  function w(b) {
    return 'string' === typeof b;
  }
  function vb(b) {
    return 'number' === typeof b;
  }
  function Na(b) {
    return '[object Date]' === wa.call(b);
  }
  function M(b) {
    return '[object Array]' === wa.call(b);
  }
  function P(b) {
    return 'function' === typeof b;
  }
  function cb(b) {
    return '[object RegExp]' === wa.call(b);
  }
  function Ca(b) {
    return b && b.document && b.location && b.alert && b.setInterval;
  }
  function Tc(b) {
    return !(!b || !(b.nodeName || b.prop && b.attr && b.find));
  }
  function Uc(b, a, c) {
    var d = [];
    q(b, function (b, g, f) {
      d.push(a.call(c, b, g, f));
    });
    return d;
  }
  function db(b, a) {
    if (b.indexOf)
      return b.indexOf(a);
    for (var c = 0; c < b.length; c++)
      if (a === b[c])
        return c;
    return -1;
  }
  function Oa(b, a) {
    var c = db(b, a);
    0 <= c && b.splice(c, 1);
    return a;
  }
  function ba(b, a) {
    if (Ca(b) || b && b.$evalAsync && b.$watch)
      throw Pa('cpws');
    if (a) {
      if (b === a)
        throw Pa('cpi');
      if (M(b))
        for (var c = a.length = 0; c < b.length; c++)
          a.push(ba(b[c]));
      else {
        c = a.$$hashKey;
        q(a, function (b, c) {
          delete a[c];
        });
        for (var d in b)
          a[d] = ba(b[d]);
        Sb(a, c);
      }
    } else
      (a = b) && (M(b) ? a = ba(b, []) : Na(b) ? a = new Date(b.getTime()) : cb(b) ? a = RegExp(b.source) : X(b) && (a = ba(b, {})));
    return a;
  }
  function Ub(b, a) {
    a = a || {};
    for (var c in b)
      !b.hasOwnProperty(c) || '$' === c.charAt(0) && '$' === c.charAt(1) || (a[c] = b[c]);
    return a;
  }
  function xa(b, a) {
    if (b === a)
      return !0;
    if (null === b || null === a)
      return !1;
    if (b !== b && a !== a)
      return !0;
    var c = typeof b, d;
    if (c == typeof a && 'object' == c)
      if (M(b)) {
        if (!M(a))
          return !1;
        if ((c = b.length) == a.length) {
          for (d = 0; d < c; d++)
            if (!xa(b[d], a[d]))
              return !1;
          return !0;
        }
      } else {
        if (Na(b))
          return Na(a) && b.getTime() == a.getTime();
        if (cb(b) && cb(a))
          return b.toString() == a.toString();
        if (b && b.$evalAsync && b.$watch || a && a.$evalAsync && a.$watch || Ca(b) || Ca(a) || M(a))
          return !1;
        c = {};
        for (d in b)
          if ('$' !== d.charAt(0) && !P(b[d])) {
            if (!xa(b[d], a[d]))
              return !1;
            c[d] = !0;
          }
        for (d in a)
          if (!c.hasOwnProperty(d) && '$' !== d.charAt(0) && a[d] !== s && !P(a[d]))
            return !1;
        return !0;
      }
    return !1;
  }
  function Vb() {
    return U.securityPolicy && U.securityPolicy.isActive || U.querySelector && !(!U.querySelector('[ng-csp]') && !U.querySelector('[data-ng-csp]'));
  }
  function eb(b, a) {
    var c = 2 < arguments.length ? ya.call(arguments, 2) : [];
    return !P(a) || a instanceof RegExp ? a : c.length ? function () {
      return arguments.length ? a.apply(b, c.concat(ya.call(arguments, 0))) : a.apply(b, c);
    } : function () {
      return arguments.length ? a.apply(b, arguments) : a.call(b);
    };
  }
  function Vc(b, a) {
    var c = a;
    'string' === typeof b && '$' === b.charAt(0) ? c = s : Ca(a) ? c = '$WINDOW' : a && U === a ? c = '$DOCUMENT' : a && (a.$evalAsync && a.$watch) && (c = '$SCOPE');
    return c;
  }
  function qa(b, a) {
    return 'undefined' === typeof b ? s : JSON.stringify(b, Vc, a ? '  ' : null);
  }
  function Wb(b) {
    return w(b) ? JSON.parse(b) : b;
  }
  function Qa(b) {
    'function' === typeof b ? b = !0 : b && 0 !== b.length ? (b = K('' + b), b = !('f' == b || '0' == b || 'false' == b || 'no' == b || 'n' == b || '[]' == b)) : b = !1;
    return b;
  }
  function ha(b) {
    b = y(b).clone();
    try {
      b.empty();
    } catch (a) {
    }
    var c = y('<div>').append(b).html();
    try {
      return 3 === b[0].nodeType ? K(c) : c.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function (a, b) {
        return '<' + K(b);
      });
    } catch (d) {
      return K(c);
    }
  }
  function Xb(b) {
    try {
      return decodeURIComponent(b);
    } catch (a) {
    }
  }
  function Yb(b) {
    var a = {}, c, d;
    q((b || '').split('&'), function (b) {
      b && (c = b.split('='), d = Xb(c[0]), B(d) && (b = B(c[1]) ? Xb(c[1]) : !0, a[d] ? M(a[d]) ? a[d].push(b) : a[d] = [
        a[d],
        b
      ] : a[d] = b));
    });
    return a;
  }
  function Zb(b) {
    var a = [];
    q(b, function (b, d) {
      M(b) ? q(b, function (b) {
        a.push(za(d, !0) + (!0 === b ? '' : '=' + za(b, !0)));
      }) : a.push(za(d, !0) + (!0 === b ? '' : '=' + za(b, !0)));
    });
    return a.length ? a.join('&') : '';
  }
  function wb(b) {
    return za(b, !0).replace(/%26/gi, '&').replace(/%3D/gi, '=').replace(/%2B/gi, '+');
  }
  function za(b, a) {
    return encodeURIComponent(b).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, a ? '%20' : '+');
  }
  function Wc(b, a) {
    function c(a) {
      a && d.push(a);
    }
    var d = [b], e, g, f = [
        'ng:app',
        'ng-app',
        'x-ng-app',
        'data-ng-app'
      ], h = /\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;
    q(f, function (a) {
      f[a] = !0;
      c(U.getElementById(a));
      a = a.replace(':', '\\:');
      b.querySelectorAll && (q(b.querySelectorAll('.' + a), c), q(b.querySelectorAll('.' + a + '\\:'), c), q(b.querySelectorAll('[' + a + ']'), c));
    });
    q(d, function (a) {
      if (!e) {
        var b = h.exec(' ' + a.className + ' ');
        b ? (e = a, g = (b[2] || '').replace(/\s+/g, ',')) : q(a.attributes, function (b) {
          !e && f[b.name] && (e = a, g = b.value);
        });
      }
    });
    e && a(e, g ? [g] : []);
  }
  function $b(b, a) {
    var c = function () {
        b = y(b);
        if (b.injector()) {
          var c = b[0] === U ? 'document' : ha(b);
          throw Pa('btstrpd', c);
        }
        a = a || [];
        a.unshift([
          '$provide',
          function (a) {
            a.value('$rootElement', b);
          }
        ]);
        a.unshift('ng');
        c = ac(a);
        c.invoke([
          '$rootScope',
          '$rootElement',
          '$compile',
          '$injector',
          '$animate',
          function (a, b, c, d, e) {
            a.$apply(function () {
              b.data('$injector', d);
              c(b)(a);
            });
          }
        ]);
        return c;
      }, d = /^NG_DEFER_BOOTSTRAP!/;
    if (O && !d.test(O.name))
      return c();
    O.name = O.name.replace(d, '');
    Ea.resumeBootstrap = function (b) {
      q(b, function (b) {
        a.push(b);
      });
      c();
    };
  }
  function fb(b, a) {
    a = a || '_';
    return b.replace(Xc, function (b, d) {
      return (d ? a : '') + b.toLowerCase();
    });
  }
  function xb(b, a, c) {
    if (!b)
      throw Pa('areq', a || '?', c || 'required');
    return b;
  }
  function Ra(b, a, c) {
    c && M(b) && (b = b[b.length - 1]);
    xb(P(b), a, 'not a function, got ' + (b && 'object' == typeof b ? b.constructor.name || 'Object' : typeof b));
    return b;
  }
  function Aa(b, a) {
    if ('hasOwnProperty' === b)
      throw Pa('badname', a);
  }
  function bc(b, a, c) {
    if (!a)
      return b;
    a = a.split('.');
    for (var d, e = b, g = a.length, f = 0; f < g; f++)
      d = a[f], b && (b = (e = b)[d]);
    return !c && P(b) ? eb(e, b) : b;
  }
  function yb(b) {
    var a = b[0];
    b = b[b.length - 1];
    if (a === b)
      return y(a);
    var c = [a];
    do {
      a = a.nextSibling;
      if (!a)
        break;
      c.push(a);
    } while (a !== b);
    return y(c);
  }
  function Yc(b) {
    var a = t('$injector'), c = t('ng');
    b = b.angular || (b.angular = {});
    b.$$minErr = b.$$minErr || t;
    return b.module || (b.module = function () {
      var b = {};
      return function (e, g, f) {
        if ('hasOwnProperty' === e)
          throw c('badname', 'module');
        g && b.hasOwnProperty(e) && (b[e] = null);
        return b[e] || (b[e] = function () {
          function b(a, d, e) {
            return function () {
              c[e || 'push']([
                a,
                d,
                arguments
              ]);
              return n;
            };
          }
          if (!g)
            throw a('nomod', e);
          var c = [], d = [], m = b('$injector', 'invoke'), n = {
              _invokeQueue: c,
              _runBlocks: d,
              requires: g,
              name: e,
              provider: b('$provide', 'provider'),
              factory: b('$provide', 'factory'),
              service: b('$provide', 'service'),
              value: b('$provide', 'value'),
              constant: b('$provide', 'constant', 'unshift'),
              animation: b('$animateProvider', 'register'),
              filter: b('$filterProvider', 'register'),
              controller: b('$controllerProvider', 'register'),
              directive: b('$compileProvider', 'directive'),
              config: m,
              run: function (a) {
                d.push(a);
                return this;
              }
            };
          f && m(f);
          return n;
        }());
      };
    }());
  }
  function Zc(b) {
    D(b, {
      bootstrap: $b,
      copy: ba,
      extend: D,
      equals: xa,
      element: y,
      forEach: q,
      injector: ac,
      noop: C,
      bind: eb,
      toJson: qa,
      fromJson: Wb,
      identity: Da,
      isUndefined: E,
      isDefined: B,
      isString: w,
      isFunction: P,
      isObject: X,
      isNumber: vb,
      isElement: Tc,
      isArray: M,
      version: $c,
      isDate: Na,
      lowercase: K,
      uppercase: Fa,
      callbacks: { counter: 0 },
      $$minErr: t,
      $$csp: Vb
    });
    Sa = Yc(O);
    try {
      Sa('ngLocale');
    } catch (a) {
      Sa('ngLocale', []).provider('$locale', ad);
    }
    Sa('ng', ['ngLocale'], [
      '$provide',
      function (a) {
        a.provider({ $$sanitizeUri: bd });
        a.provider('$compile', cc).directive({
          a: cd,
          input: dc,
          textarea: dc,
          form: dd,
          script: ed,
          select: fd,
          style: gd,
          option: hd,
          ngBind: id,
          ngBindHtml: jd,
          ngBindTemplate: kd,
          ngClass: ld,
          ngClassEven: md,
          ngClassOdd: nd,
          ngCloak: od,
          ngController: pd,
          ngForm: qd,
          ngHide: rd,
          ngIf: sd,
          ngInclude: td,
          ngInit: ud,
          ngNonBindable: vd,
          ngPluralize: wd,
          ngRepeat: xd,
          ngShow: yd,
          ngStyle: zd,
          ngSwitch: Ad,
          ngSwitchWhen: Bd,
          ngSwitchDefault: Cd,
          ngOptions: Dd,
          ngTransclude: Ed,
          ngModel: Fd,
          ngList: Gd,
          ngChange: Hd,
          required: ec,
          ngRequired: ec,
          ngValue: Id
        }).directive({ ngInclude: Jd }).directive(zb).directive(fc);
        a.provider({
          $anchorScroll: Kd,
          $animate: Ld,
          $browser: Md,
          $cacheFactory: Nd,
          $controller: Od,
          $document: Pd,
          $exceptionHandler: Qd,
          $filter: gc,
          $interpolate: Rd,
          $interval: Sd,
          $http: Td,
          $httpBackend: Ud,
          $location: Vd,
          $log: Wd,
          $parse: Xd,
          $rootScope: Yd,
          $q: Zd,
          $sce: $d,
          $sceDelegate: ae,
          $sniffer: be,
          $templateCache: ce,
          $timeout: de,
          $window: ee,
          $$rAF: fe,
          $$asyncCallback: ge
        });
      }
    ]);
  }
  function Ta(b) {
    return b.replace(he, function (a, b, d, e) {
      return e ? d.toUpperCase() : d;
    }).replace(ie, 'Moz$1');
  }
  function Ab(b, a, c, d) {
    function e(b) {
      var e = c && b ? [this.filter(b)] : [this], l = a, k, m, n, p, r, z;
      if (!d || null != b)
        for (; e.length;)
          for (k = e.shift(), m = 0, n = k.length; m < n; m++)
            for (p = y(k[m]), l ? p.triggerHandler('$destroy') : l = !l, r = 0, p = (z = p.children()).length; r < p; r++)
              e.push(Ga(z[r]));
      return g.apply(this, arguments);
    }
    var g = Ga.fn[b], g = g.$original || g;
    e.$original = g;
    Ga.fn[b] = e;
  }
  function N(b) {
    if (b instanceof N)
      return b;
    w(b) && (b = ca(b));
    if (!(this instanceof N)) {
      if (w(b) && '<' != b.charAt(0))
        throw Bb('nosel');
      return new N(b);
    }
    if (w(b)) {
      var a = b;
      b = U;
      var c;
      if (c = je.exec(a))
        b = [b.createElement(c[1])];
      else {
        var d = b, e;
        b = d.createDocumentFragment();
        c = [];
        if (Cb.test(a)) {
          d = b.appendChild(d.createElement('div'));
          e = (ke.exec(a) || [
            '',
            ''
          ])[1].toLowerCase();
          e = ea[e] || ea._default;
          d.innerHTML = '<div>&#160;</div>' + e[1] + a.replace(le, '<$1></$2>') + e[2];
          d.removeChild(d.firstChild);
          for (a = e[0]; a--;)
            d = d.lastChild;
          a = 0;
          for (e = d.childNodes.length; a < e; ++a)
            c.push(d.childNodes[a]);
          d = b.firstChild;
          d.textContent = '';
        } else
          c.push(d.createTextNode(a));
        b.textContent = '';
        b.innerHTML = '';
        b = c;
      }
      Db(this, b);
      y(U.createDocumentFragment()).append(this);
    } else
      Db(this, b);
  }
  function Eb(b) {
    return b.cloneNode(!0);
  }
  function Ha(b) {
    hc(b);
    var a = 0;
    for (b = b.childNodes || []; a < b.length; a++)
      Ha(b[a]);
  }
  function ic(b, a, c, d) {
    if (B(d))
      throw Bb('offargs');
    var e = la(b, 'events');
    la(b, 'handle') && (E(a) ? q(e, function (a, c) {
      Fb(b, c, a);
      delete e[c];
    }) : q(a.split(' '), function (a) {
      E(c) ? (Fb(b, a, e[a]), delete e[a]) : Oa(e[a] || [], c);
    }));
  }
  function hc(b, a) {
    var c = b[gb], d = Ua[c];
    d && (a ? delete Ua[c].data[a] : (d.handle && (d.events.$destroy && d.handle({}, '$destroy'), ic(b)), delete Ua[c], b[gb] = s));
  }
  function la(b, a, c) {
    var d = b[gb], d = Ua[d || -1];
    if (B(c))
      d || (b[gb] = d = ++me, d = Ua[d] = {}), d[a] = c;
    else
      return d && d[a];
  }
  function jc(b, a, c) {
    var d = la(b, 'data'), e = B(c), g = !e && B(a), f = g && !X(a);
    d || f || la(b, 'data', d = {});
    if (e)
      d[a] = c;
    else if (g) {
      if (f)
        return d && d[a];
      D(d, a);
    } else
      return d;
  }
  function Gb(b, a) {
    return b.getAttribute ? -1 < (' ' + (b.getAttribute('class') || '') + ' ').replace(/[\n\t]/g, ' ').indexOf(' ' + a + ' ') : !1;
  }
  function hb(b, a) {
    a && b.setAttribute && q(a.split(' '), function (a) {
      b.setAttribute('class', ca((' ' + (b.getAttribute('class') || '') + ' ').replace(/[\n\t]/g, ' ').replace(' ' + ca(a) + ' ', ' ')));
    });
  }
  function ib(b, a) {
    if (a && b.setAttribute) {
      var c = (' ' + (b.getAttribute('class') || '') + ' ').replace(/[\n\t]/g, ' ');
      q(a.split(' '), function (a) {
        a = ca(a);
        -1 === c.indexOf(' ' + a + ' ') && (c += a + ' ');
      });
      b.setAttribute('class', ca(c));
    }
  }
  function Db(b, a) {
    if (a) {
      a = a.nodeName || !B(a.length) || Ca(a) ? [a] : a;
      for (var c = 0; c < a.length; c++)
        b.push(a[c]);
    }
  }
  function kc(b, a) {
    return jb(b, '$' + (a || 'ngController') + 'Controller');
  }
  function jb(b, a, c) {
    b = y(b);
    9 == b[0].nodeType && (b = b.find('html'));
    for (a = M(a) ? a : [a]; b.length;) {
      for (var d = b[0], e = 0, g = a.length; e < g; e++)
        if ((c = b.data(a[e])) !== s)
          return c;
      b = y(d.parentNode || 11 === d.nodeType && d.host);
    }
  }
  function lc(b) {
    for (var a = 0, c = b.childNodes; a < c.length; a++)
      Ha(c[a]);
    for (; b.firstChild;)
      b.removeChild(b.firstChild);
  }
  function mc(b, a) {
    var c = kb[a.toLowerCase()];
    return c && nc[b.nodeName] && c;
  }
  function ne(b, a) {
    var c = function (c, e) {
      c.preventDefault || (c.preventDefault = function () {
        c.returnValue = !1;
      });
      c.stopPropagation || (c.stopPropagation = function () {
        c.cancelBubble = !0;
      });
      c.target || (c.target = c.srcElement || U);
      if (E(c.defaultPrevented)) {
        var g = c.preventDefault;
        c.preventDefault = function () {
          c.defaultPrevented = !0;
          g.call(c);
        };
        c.defaultPrevented = !1;
      }
      c.isDefaultPrevented = function () {
        return c.defaultPrevented || !1 === c.returnValue;
      };
      var f = Ub(a[e || c.type] || []);
      q(f, function (a) {
        a.call(b, c);
      });
      8 >= S ? (c.preventDefault = null, c.stopPropagation = null, c.isDefaultPrevented = null) : (delete c.preventDefault, delete c.stopPropagation, delete c.isDefaultPrevented);
    };
    c.elem = b;
    return c;
  }
  function Ia(b) {
    var a = typeof b, c;
    'object' == a && null !== b ? 'function' == typeof (c = b.$$hashKey) ? c = b.$$hashKey() : c === s && (c = b.$$hashKey = bb()) : c = b;
    return a + ':' + c;
  }
  function Va(b) {
    q(b, this.put, this);
  }
  function oc(b) {
    var a, c;
    'function' == typeof b ? (a = b.$inject) || (a = [], b.length && (c = b.toString().replace(oe, ''), c = c.match(pe), q(c[1].split(qe), function (b) {
      b.replace(re, function (b, c, d) {
        a.push(d);
      });
    })), b.$inject = a) : M(b) ? (c = b.length - 1, Ra(b[c], 'fn'), a = b.slice(0, c)) : Ra(b, 'fn', !0);
    return a;
  }
  function ac(b) {
    function a(a) {
      return function (b, c) {
        if (X(b))
          q(b, Rb(a));
        else
          return a(b, c);
      };
    }
    function c(a, b) {
      Aa(a, 'service');
      if (P(b) || M(b))
        b = n.instantiate(b);
      if (!b.$get)
        throw Wa('pget', a);
      return m[a + h] = b;
    }
    function d(a, b) {
      return c(a, { $get: b });
    }
    function e(a) {
      var b = [], c, d, g, h;
      q(a, function (a) {
        if (!k.get(a)) {
          k.put(a, !0);
          try {
            if (w(a))
              for (c = Sa(a), b = b.concat(e(c.requires)).concat(c._runBlocks), d = c._invokeQueue, g = 0, h = d.length; g < h; g++) {
                var f = d[g], l = n.get(f[0]);
                l[f[1]].apply(l, f[2]);
              }
            else
              P(a) ? b.push(n.invoke(a)) : M(a) ? b.push(n.invoke(a)) : Ra(a, 'module');
          } catch (m) {
            throw M(a) && (a = a[a.length - 1]), m.message && (m.stack && -1 == m.stack.indexOf(m.message)) && (m = m.message + '\n' + m.stack), Wa('modulerr', a, m.stack || m.message || m);
          }
        }
      });
      return b;
    }
    function g(a, b) {
      function c(d) {
        if (a.hasOwnProperty(d)) {
          if (a[d] === f)
            throw Wa('cdep', l.join(' <- '));
          return a[d];
        }
        try {
          return l.unshift(d), a[d] = f, a[d] = b(d);
        } catch (e) {
          throw a[d] === f && delete a[d], e;
        } finally {
          l.shift();
        }
      }
      function d(a, b, e) {
        var g = [], h = oc(a), f, l, k;
        l = 0;
        for (f = h.length; l < f; l++) {
          k = h[l];
          if ('string' !== typeof k)
            throw Wa('itkn', k);
          g.push(e && e.hasOwnProperty(k) ? e[k] : c(k));
        }
        a.$inject || (a = a[f]);
        return a.apply(b, g);
      }
      return {
        invoke: d,
        instantiate: function (a, b) {
          var c = function () {
            }, e;
          c.prototype = (M(a) ? a[a.length - 1] : a).prototype;
          c = new c();
          e = d(a, c, b);
          return X(e) || P(e) ? e : c;
        },
        get: c,
        annotate: oc,
        has: function (b) {
          return m.hasOwnProperty(b + h) || a.hasOwnProperty(b);
        }
      };
    }
    var f = {}, h = 'Provider', l = [], k = new Va(), m = {
        $provide: {
          provider: a(c),
          factory: a(d),
          service: a(function (a, b) {
            return d(a, [
              '$injector',
              function (a) {
                return a.instantiate(b);
              }
            ]);
          }),
          value: a(function (a, b) {
            return d(a, aa(b));
          }),
          constant: a(function (a, b) {
            Aa(a, 'constant');
            m[a] = b;
            p[a] = b;
          }),
          decorator: function (a, b) {
            var c = n.get(a + h), d = c.$get;
            c.$get = function () {
              var a = r.invoke(d, c);
              return r.invoke(b, null, { $delegate: a });
            };
          }
        }
      }, n = m.$injector = g(m, function () {
        throw Wa('unpr', l.join(' <- '));
      }), p = {}, r = p.$injector = g(p, function (a) {
        a = n.get(a + h);
        return r.invoke(a.$get, a);
      });
    q(e(b), function (a) {
      r.invoke(a || C);
    });
    return r;
  }
  function Kd() {
    var b = !0;
    this.disableAutoScrolling = function () {
      b = !1;
    };
    this.$get = [
      '$window',
      '$location',
      '$rootScope',
      function (a, c, d) {
        function e(a) {
          var b = null;
          q(a, function (a) {
            b || 'a' !== K(a.nodeName) || (b = a);
          });
          return b;
        }
        function g() {
          var b = c.hash(), d;
          b ? (d = f.getElementById(b)) ? d.scrollIntoView() : (d = e(f.getElementsByName(b))) ? d.scrollIntoView() : 'top' === b && a.scrollTo(0, 0) : a.scrollTo(0, 0);
        }
        var f = a.document;
        b && d.$watch(function () {
          return c.hash();
        }, function () {
          d.$evalAsync(g);
        });
        return g;
      }
    ];
  }
  function ge() {
    this.$get = [
      '$$rAF',
      '$timeout',
      function (b, a) {
        return b.supported ? function (a) {
          return b(a);
        } : function (b) {
          return a(b, 0, !1);
        };
      }
    ];
  }
  function se(b, a, c, d) {
    function e(a) {
      try {
        a.apply(null, ya.call(arguments, 1));
      } finally {
        if (z--, 0 === z)
          for (; u.length;)
            try {
              u.pop()();
            } catch (b) {
              c.error(b);
            }
      }
    }
    function g(a, b) {
      (function T() {
        q(F, function (a) {
          a();
        });
        v = b(T, a);
      }());
    }
    function f() {
      x = null;
      J != h.url() && (J = h.url(), q(ma, function (a) {
        a(h.url());
      }));
    }
    var h = this, l = a[0], k = b.location, m = b.history, n = b.setTimeout, p = b.clearTimeout, r = {};
    h.isMock = !1;
    var z = 0, u = [];
    h.$$completeOutstandingRequest = e;
    h.$$incOutstandingRequestCount = function () {
      z++;
    };
    h.notifyWhenNoOutstandingRequests = function (a) {
      q(F, function (a) {
        a();
      });
      0 === z ? a() : u.push(a);
    };
    var F = [], v;
    h.addPollFn = function (a) {
      E(v) && g(100, n);
      F.push(a);
      return a;
    };
    var J = k.href, A = a.find('base'), x = null;
    h.url = function (a, c) {
      k !== b.location && (k = b.location);
      m !== b.history && (m = b.history);
      if (a) {
        if (J != a)
          return J = a, d.history ? c ? m.replaceState(null, '', a) : (m.pushState(null, '', a), A.attr('href', A.attr('href'))) : (x = a, c ? k.replace(a) : k.href = a), h;
      } else
        return x || k.href.replace(/%27/g, '\'');
    };
    var ma = [], L = !1;
    h.onUrlChange = function (a) {
      if (!L) {
        if (d.history)
          y(b).on('popstate', f);
        if (d.hashchange)
          y(b).on('hashchange', f);
        else
          h.addPollFn(f);
        L = !0;
      }
      ma.push(a);
      return a;
    };
    h.baseHref = function () {
      var a = A.attr('href');
      return a ? a.replace(/^(https?\:)?\/\/[^\/]*/, '') : '';
    };
    var Q = {}, da = '', H = h.baseHref();
    h.cookies = function (a, b) {
      var d, e, g, h;
      if (a)
        b === s ? l.cookie = escape(a) + '=;path=' + H + ';expires=Thu, 01 Jan 1970 00:00:00 GMT' : w(b) && (d = (l.cookie = escape(a) + '=' + escape(b) + ';path=' + H).length + 1, 4096 < d && c.warn('Cookie \'' + a + '\' possibly not set or overflowed because it was too large (' + d + ' > 4096 bytes)!'));
      else {
        if (l.cookie !== da)
          for (da = l.cookie, d = da.split('; '), Q = {}, g = 0; g < d.length; g++)
            e = d[g], h = e.indexOf('='), 0 < h && (a = unescape(e.substring(0, h)), Q[a] === s && (Q[a] = unescape(e.substring(h + 1))));
        return Q;
      }
    };
    h.defer = function (a, b) {
      var c;
      z++;
      c = n(function () {
        delete r[c];
        e(a);
      }, b || 0);
      r[c] = !0;
      return c;
    };
    h.defer.cancel = function (a) {
      return r[a] ? (delete r[a], p(a), e(C), !0) : !1;
    };
  }
  function Md() {
    this.$get = [
      '$window',
      '$log',
      '$sniffer',
      '$document',
      function (b, a, c, d) {
        return new se(b, d, a, c);
      }
    ];
  }
  function Nd() {
    this.$get = function () {
      function b(b, d) {
        function e(a) {
          a != n && (p ? p == a && (p = a.n) : p = a, g(a.n, a.p), g(a, n), n = a, n.n = null);
        }
        function g(a, b) {
          a != b && (a && (a.p = b), b && (b.n = a));
        }
        if (b in a)
          throw t('$cacheFactory')('iid', b);
        var f = 0, h = D({}, d, { id: b }), l = {}, k = d && d.capacity || Number.MAX_VALUE, m = {}, n = null, p = null;
        return a[b] = {
          put: function (a, b) {
            if (k < Number.MAX_VALUE) {
              var c = m[a] || (m[a] = { key: a });
              e(c);
            }
            if (!E(b))
              return a in l || f++, l[a] = b, f > k && this.remove(p.key), b;
          },
          get: function (a) {
            if (k < Number.MAX_VALUE) {
              var b = m[a];
              if (!b)
                return;
              e(b);
            }
            return l[a];
          },
          remove: function (a) {
            if (k < Number.MAX_VALUE) {
              var b = m[a];
              if (!b)
                return;
              b == n && (n = b.p);
              b == p && (p = b.n);
              g(b.n, b.p);
              delete m[a];
            }
            delete l[a];
            f--;
          },
          removeAll: function () {
            l = {};
            f = 0;
            m = {};
            n = p = null;
          },
          destroy: function () {
            m = h = l = null;
            delete a[b];
          },
          info: function () {
            return D({}, h, { size: f });
          }
        };
      }
      var a = {};
      b.info = function () {
        var b = {};
        q(a, function (a, e) {
          b[e] = a.info();
        });
        return b;
      };
      b.get = function (b) {
        return a[b];
      };
      return b;
    };
  }
  function ce() {
    this.$get = [
      '$cacheFactory',
      function (b) {
        return b('templates');
      }
    ];
  }
  function cc(b, a) {
    var c = {}, d = 'Directive', e = /^\s*directive\:\s*([\d\w\-_]+)\s+(.*)$/, g = /(([\d\w\-_]+)(?:\:([^;]+))?;?)/, f = /^(on[a-z]+|formaction)$/;
    this.directive = function l(a, e) {
      Aa(a, 'directive');
      w(a) ? (xb(e, 'directiveFactory'), c.hasOwnProperty(a) || (c[a] = [], b.factory(a + d, [
        '$injector',
        '$exceptionHandler',
        function (b, d) {
          var e = [];
          q(c[a], function (c, g) {
            try {
              var f = b.invoke(c);
              P(f) ? f = { compile: aa(f) } : !f.compile && f.link && (f.compile = aa(f.link));
              f.priority = f.priority || 0;
              f.index = g;
              f.name = f.name || a;
              f.require = f.require || f.controller && f.name;
              f.restrict = f.restrict || 'A';
              e.push(f);
            } catch (l) {
              d(l);
            }
          });
          return e;
        }
      ])), c[a].push(e)) : q(a, Rb(l));
      return this;
    };
    this.aHrefSanitizationWhitelist = function (b) {
      return B(b) ? (a.aHrefSanitizationWhitelist(b), this) : a.aHrefSanitizationWhitelist();
    };
    this.imgSrcSanitizationWhitelist = function (b) {
      return B(b) ? (a.imgSrcSanitizationWhitelist(b), this) : a.imgSrcSanitizationWhitelist();
    };
    this.$get = [
      '$injector',
      '$interpolate',
      '$exceptionHandler',
      '$http',
      '$templateCache',
      '$parse',
      '$controller',
      '$rootScope',
      '$document',
      '$sce',
      '$animate',
      '$$sanitizeUri',
      function (a, b, m, n, p, r, z, u, F, v, J, A) {
        function x(a, b, c, d, e) {
          a instanceof y || (a = y(a));
          q(a, function (b, c) {
            3 == b.nodeType && b.nodeValue.match(/\S+/) && (a[c] = y(b).wrap('<span></span>').parent()[0]);
          });
          var g = L(a, b, a, c, d, e);
          ma(a, 'ng-scope');
          return function (b, c, d) {
            xb(b, 'scope');
            var e = c ? Ja.clone.call(a) : a;
            q(d, function (a, b) {
              e.data('$' + b + 'Controller', a);
            });
            d = 0;
            for (var f = e.length; d < f; d++) {
              var l = e[d].nodeType;
              1 !== l && 9 !== l || e.eq(d).data('$scope', b);
            }
            c && c(e, b);
            g && g(b, e, e);
            return e;
          };
        }
        function ma(a, b) {
          try {
            a.addClass(b);
          } catch (c) {
          }
        }
        function L(a, b, c, d, e, g) {
          function f(a, c, d, e) {
            var g, k, m, r, n, p, z;
            g = c.length;
            var I = Array(g);
            for (n = 0; n < g; n++)
              I[n] = c[n];
            z = n = 0;
            for (p = l.length; n < p; z++)
              k = I[z], c = l[n++], g = l[n++], m = y(k), c ? (c.scope ? (r = a.$new(), m.data('$scope', r)) : r = a, (m = c.transclude) || !e && b ? c(g, r, k, d, Q(a, m || b)) : c(g, r, k, d, e)) : g && g(a, k.childNodes, s, e);
          }
          for (var l = [], k, m, r, n, p = 0; p < a.length; p++)
            k = new Hb(), m = da(a[p], [], k, 0 === p ? d : s, e), (g = m.length ? ia(m, a[p], k, b, c, null, [], [], g) : null) && g.scope && ma(y(a[p]), 'ng-scope'), k = g && g.terminal || !(r = a[p].childNodes) || !r.length ? null : L(r, g ? g.transclude : b), l.push(g, k), n = n || g || k, g = null;
          return n ? f : null;
        }
        function Q(a, b) {
          return function (c, d, e) {
            var g = !1;
            c || (c = a.$new(), g = c.$$transcluded = !0);
            d = b(c, d, e);
            if (g)
              d.on('$destroy', eb(c, c.$destroy));
            return d;
          };
        }
        function da(a, b, c, d, f) {
          var k = c.$attr, l;
          switch (a.nodeType) {
          case 1:
            T(b, na(Ka(a).toLowerCase()), 'E', d, f);
            var m, r, n;
            l = a.attributes;
            for (var p = 0, z = l && l.length; p < z; p++) {
              var u = !1, F = !1;
              m = l[p];
              if (!S || 8 <= S || m.specified) {
                r = m.name;
                n = na(r);
                W.test(n) && (r = fb(n.substr(6), '-'));
                var J = n.replace(/(Start|End)$/, '');
                n === J + 'Start' && (u = r, F = r.substr(0, r.length - 5) + 'end', r = r.substr(0, r.length - 6));
                n = na(r.toLowerCase());
                k[n] = r;
                c[n] = m = ca(m.value);
                mc(a, n) && (c[n] = !0);
                N(a, b, m, n);
                T(b, n, 'A', d, f, u, F);
              }
            }
            a = a.className;
            if (w(a) && '' !== a)
              for (; l = g.exec(a);)
                n = na(l[2]), T(b, n, 'C', d, f) && (c[n] = ca(l[3])), a = a.substr(l.index + l[0].length);
            break;
          case 3:
            t(b, a.nodeValue);
            break;
          case 8:
            try {
              if (l = e.exec(a.nodeValue))
                n = na(l[1]), T(b, n, 'M', d, f) && (c[n] = ca(l[2]));
            } catch (x) {
            }
          }
          b.sort(E);
          return b;
        }
        function H(a, b, c) {
          var d = [], e = 0;
          if (b && a.hasAttribute && a.hasAttribute(b)) {
            do {
              if (!a)
                throw ja('uterdir', b, c);
              1 == a.nodeType && (a.hasAttribute(b) && e++, a.hasAttribute(c) && e--);
              d.push(a);
              a = a.nextSibling;
            } while (0 < e);
          } else
            d.push(a);
          return y(d);
        }
        function R(a, b, c) {
          return function (d, e, g, f, l) {
            e = H(e[0], b, c);
            return a(d, e, g, f, l);
          };
        }
        function ia(a, c, d, e, g, f, l, n, p) {
          function u(a, b, c, d) {
            if (a) {
              c && (a = R(a, c, d));
              a.require = G.require;
              if (Q === G || G.$$isolateScope)
                a = qc(a, { isolateScope: !0 });
              l.push(a);
            }
            if (b) {
              c && (b = R(b, c, d));
              b.require = G.require;
              if (Q === G || G.$$isolateScope)
                b = qc(b, { isolateScope: !0 });
              n.push(b);
            }
          }
          function F(a, b, c) {
            var d, e = 'data', g = !1;
            if (w(a)) {
              for (; '^' == (d = a.charAt(0)) || '?' == d;)
                a = a.substr(1), '^' == d && (e = 'inheritedData'), g = g || '?' == d;
              d = null;
              c && 'data' === e && (d = c[a]);
              d = d || b[e]('$' + a + 'Controller');
              if (!d && !g)
                throw ja('ctreq', a, t);
            } else
              M(a) && (d = [], q(a, function (a) {
                d.push(F(a, b, c));
              }));
            return d;
          }
          function J(a, e, g, f, p) {
            function u(a, b) {
              var c;
              2 > arguments.length && (b = a, a = s);
              D && (c = lb);
              return p(a, b, c);
            }
            var I, x, v, A, R, H, lb = {}, da;
            I = c === g ? d : Ub(d, new Hb(y(g), d.$attr));
            x = I.$$element;
            if (Q) {
              var T = /^\s*([@=&])(\??)\s*(\w*)\s*$/;
              f = y(g);
              H = e.$new(!0);
              ia && ia === Q.$$originalDirective ? f.data('$isolateScope', H) : f.data('$isolateScopeNoTemplate', H);
              ma(f, 'ng-isolate-scope');
              q(Q.scope, function (a, c) {
                var d = a.match(T) || [], g = d[3] || c, f = '?' == d[2], d = d[1], l, m, n, p;
                H.$$isolateBindings[c] = d + g;
                switch (d) {
                case '@':
                  I.$observe(g, function (a) {
                    H[c] = a;
                  });
                  I.$$observers[g].$$scope = e;
                  I[g] && (H[c] = b(I[g])(e));
                  break;
                case '=':
                  if (f && !I[g])
                    break;
                  m = r(I[g]);
                  p = m.literal ? xa : function (a, b) {
                    return a === b;
                  };
                  n = m.assign || function () {
                    l = H[c] = m(e);
                    throw ja('nonassign', I[g], Q.name);
                  };
                  l = H[c] = m(e);
                  H.$watch(function () {
                    var a = m(e);
                    p(a, H[c]) || (p(a, l) ? n(e, a = H[c]) : H[c] = a);
                    return l = a;
                  }, null, m.literal);
                  break;
                case '&':
                  m = r(I[g]);
                  H[c] = function (a) {
                    return m(e, a);
                  };
                  break;
                default:
                  throw ja('iscp', Q.name, c, a);
                }
              });
            }
            da = p && u;
            L && q(L, function (a) {
              var b = {
                  $scope: a === Q || a.$$isolateScope ? H : e,
                  $element: x,
                  $attrs: I,
                  $transclude: da
                }, c;
              R = a.controller;
              '@' == R && (R = I[a.name]);
              c = z(R, b);
              lb[a.name] = c;
              D || x.data('$' + a.name + 'Controller', c);
              a.controllerAs && (b.$scope[a.controllerAs] = c);
            });
            f = 0;
            for (v = l.length; f < v; f++)
              try {
                A = l[f], A(A.isolateScope ? H : e, x, I, A.require && F(A.require, x, lb), da);
              } catch (G) {
                m(G, ha(x));
              }
            f = e;
            Q && (Q.template || null === Q.templateUrl) && (f = H);
            a && a(f, g.childNodes, s, p);
            for (f = n.length - 1; 0 <= f; f--)
              try {
                A = n[f], A(A.isolateScope ? H : e, x, I, A.require && F(A.require, x, lb), da);
              } catch (B) {
                m(B, ha(x));
              }
          }
          p = p || {};
          for (var v = -Number.MAX_VALUE, A, L = p.controllerDirectives, Q = p.newIsolateScopeDirective, ia = p.templateDirective, T = p.nonTlbTranscludeDirective, E = !1, D = p.hasElementTranscludeDirective, Z = d.$$element = y(c), G, t, V, Xa = e, O, N = 0, S = a.length; N < S; N++) {
            G = a[N];
            var ra = G.$$start, W = G.$$end;
            ra && (Z = H(c, ra, W));
            V = s;
            if (v > G.priority)
              break;
            if (V = G.scope)
              A = A || G, G.templateUrl || (K('new/isolated scope', Q, G, Z), X(V) && (Q = G));
            t = G.name;
            !G.templateUrl && G.controller && (V = G.controller, L = L || {}, K('\'' + t + '\' controller', L[t], G, Z), L[t] = G);
            if (V = G.transclude)
              E = !0, G.$$tlb || (K('transclusion', T, G, Z), T = G), 'element' == V ? (D = !0, v = G.priority, V = H(c, ra, W), Z = d.$$element = y(U.createComment(' ' + t + ': ' + d[t] + ' ')), c = Z[0], mb(g, y(ya.call(V, 0)), c), Xa = x(V, e, v, f && f.name, { nonTlbTranscludeDirective: T })) : (V = y(Eb(c)).contents(), Z.empty(), Xa = x(V, e));
            if (G.template)
              if (K('template', ia, G, Z), ia = G, V = P(G.template) ? G.template(Z, d) : G.template, V = Y(V), G.replace) {
                f = G;
                V = Cb.test(V) ? y(V) : [];
                c = V[0];
                if (1 != V.length || 1 !== c.nodeType)
                  throw ja('tplrt', t, '');
                mb(g, Z, c);
                S = { $attr: {} };
                V = da(c, [], S);
                var $ = a.splice(N + 1, a.length - (N + 1));
                Q && pc(V);
                a = a.concat(V).concat($);
                B(d, S);
                S = a.length;
              } else
                Z.html(V);
            if (G.templateUrl)
              K('template', ia, G, Z), ia = G, G.replace && (f = G), J = C(a.splice(N, a.length - N), Z, d, g, Xa, l, n, {
                controllerDirectives: L,
                newIsolateScopeDirective: Q,
                templateDirective: ia,
                nonTlbTranscludeDirective: T
              }), S = a.length;
            else if (G.compile)
              try {
                O = G.compile(Z, d, Xa), P(O) ? u(null, O, ra, W) : O && u(O.pre, O.post, ra, W);
              } catch (aa) {
                m(aa, ha(Z));
              }
            G.terminal && (J.terminal = !0, v = Math.max(v, G.priority));
          }
          J.scope = A && !0 === A.scope;
          J.transclude = E && Xa;
          p.hasElementTranscludeDirective = D;
          return J;
        }
        function pc(a) {
          for (var b = 0, c = a.length; b < c; b++)
            a[b] = Tb(a[b], { $$isolateScope: !0 });
        }
        function T(b, e, g, f, k, n, r) {
          if (e === k)
            return null;
          k = null;
          if (c.hasOwnProperty(e)) {
            var p;
            e = a.get(e + d);
            for (var z = 0, u = e.length; z < u; z++)
              try {
                p = e[z], (f === s || f > p.priority) && -1 != p.restrict.indexOf(g) && (n && (p = Tb(p, {
                  $$start: n,
                  $$end: r
                })), b.push(p), k = p);
              } catch (F) {
                m(F);
              }
          }
          return k;
        }
        function B(a, b) {
          var c = b.$attr, d = a.$attr, e = a.$$element;
          q(a, function (d, e) {
            '$' != e.charAt(0) && (b[e] && (d += ('style' === e ? ';' : ' ') + b[e]), a.$set(e, d, !0, c[e]));
          });
          q(b, function (b, g) {
            'class' == g ? (ma(e, b), a['class'] = (a['class'] ? a['class'] + ' ' : '') + b) : 'style' == g ? (e.attr('style', e.attr('style') + ';' + b), a.style = (a.style ? a.style + ';' : '') + b) : '$' == g.charAt(0) || a.hasOwnProperty(g) || (a[g] = b, d[g] = c[g]);
          });
        }
        function C(a, b, c, d, e, g, f, l) {
          var k = [], m, r, z = b[0], u = a.shift(), F = D({}, u, {
              templateUrl: null,
              transclude: null,
              replace: null,
              $$originalDirective: u
            }), x = P(u.templateUrl) ? u.templateUrl(b, c) : u.templateUrl;
          b.empty();
          n.get(v.getTrustedResourceUrl(x), { cache: p }).success(function (n) {
            var p, J;
            n = Y(n);
            if (u.replace) {
              n = Cb.test(n) ? y(n) : [];
              p = n[0];
              if (1 != n.length || 1 !== p.nodeType)
                throw ja('tplrt', u.name, x);
              n = { $attr: {} };
              mb(d, b, p);
              var v = da(p, [], n);
              X(u.scope) && pc(v);
              a = v.concat(a);
              B(c, n);
            } else
              p = z, b.html(n);
            a.unshift(F);
            m = ia(a, p, c, e, b, u, g, f, l);
            q(d, function (a, c) {
              a == p && (d[c] = b[0]);
            });
            for (r = L(b[0].childNodes, e); k.length;) {
              n = k.shift();
              J = k.shift();
              var A = k.shift(), R = k.shift(), v = b[0];
              if (J !== z) {
                var H = J.className;
                l.hasElementTranscludeDirective && u.replace || (v = Eb(p));
                mb(A, y(J), v);
                ma(y(v), H);
              }
              J = m.transclude ? Q(n, m.transclude) : R;
              m(r, n, v, d, J);
            }
            k = null;
          }).error(function (a, b, c, d) {
            throw ja('tpload', d.url);
          });
          return function (a, b, c, d, e) {
            k ? (k.push(b), k.push(c), k.push(d), k.push(e)) : m(r, b, c, d, e);
          };
        }
        function E(a, b) {
          var c = b.priority - a.priority;
          return 0 !== c ? c : a.name !== b.name ? a.name < b.name ? -1 : 1 : a.index - b.index;
        }
        function K(a, b, c, d) {
          if (b)
            throw ja('multidir', b.name, c.name, a, ha(d));
        }
        function t(a, c) {
          var d = b(c, !0);
          d && a.push({
            priority: 0,
            compile: aa(function (a, b) {
              var c = b.parent(), e = c.data('$binding') || [];
              e.push(d);
              ma(c.data('$binding', e), 'ng-binding');
              a.$watch(d, function (a) {
                b[0].nodeValue = a;
              });
            })
          });
        }
        function O(a, b) {
          if ('srcdoc' == b)
            return v.HTML;
          var c = Ka(a);
          if ('xlinkHref' == b || 'FORM' == c && 'action' == b || 'IMG' != c && ('src' == b || 'ngSrc' == b))
            return v.RESOURCE_URL;
        }
        function N(a, c, d, e) {
          var g = b(d, !0);
          if (g) {
            if ('multiple' === e && 'SELECT' === Ka(a))
              throw ja('selmulti', ha(a));
            c.push({
              priority: 100,
              compile: function () {
                return {
                  pre: function (c, d, l) {
                    d = l.$$observers || (l.$$observers = {});
                    if (f.test(e))
                      throw ja('nodomevents');
                    if (g = b(l[e], !0, O(a, e)))
                      l[e] = g(c), (d[e] || (d[e] = [])).$$inter = !0, (l.$$observers && l.$$observers[e].$$scope || c).$watch(g, function (a, b) {
                        'class' === e && a != b ? l.$updateClass(a, b) : l.$set(e, a);
                      });
                  }
                };
              }
            });
          }
        }
        function mb(a, b, c) {
          var d = b[0], e = b.length, g = d.parentNode, f, l;
          if (a)
            for (f = 0, l = a.length; f < l; f++)
              if (a[f] == d) {
                a[f++] = c;
                l = f + e - 1;
                for (var k = a.length; f < k; f++, l++)
                  l < k ? a[f] = a[l] : delete a[f];
                a.length -= e - 1;
                break;
              }
          g && g.replaceChild(c, d);
          a = U.createDocumentFragment();
          a.appendChild(d);
          c[y.expando] = d[y.expando];
          d = 1;
          for (e = b.length; d < e; d++)
            g = b[d], y(g).remove(), a.appendChild(g), delete b[d];
          b[0] = c;
          b.length = 1;
        }
        function qc(a, b) {
          return D(function () {
            return a.apply(null, arguments);
          }, a, b);
        }
        var Hb = function (a, b) {
          this.$$element = a;
          this.$attr = b || {};
        };
        Hb.prototype = {
          $normalize: na,
          $addClass: function (a) {
            a && 0 < a.length && J.addClass(this.$$element, a);
          },
          $removeClass: function (a) {
            a && 0 < a.length && J.removeClass(this.$$element, a);
          },
          $updateClass: function (a, b) {
            var c = rc(a, b), d = rc(b, a);
            0 === c.length ? J.removeClass(this.$$element, d) : 0 === d.length ? J.addClass(this.$$element, c) : J.setClass(this.$$element, c, d);
          },
          $set: function (a, b, c, d) {
            var e = mc(this.$$element[0], a);
            e && (this.$$element.prop(a, b), d = e);
            this[a] = b;
            d ? this.$attr[a] = d : (d = this.$attr[a]) || (this.$attr[a] = d = fb(a, '-'));
            e = Ka(this.$$element);
            if ('A' === e && 'href' === a || 'IMG' === e && 'src' === a)
              this[a] = b = A(b, 'src' === a);
            !1 !== c && (null === b || b === s ? this.$$element.removeAttr(d) : this.$$element.attr(d, b));
            (c = this.$$observers) && q(c[a], function (a) {
              try {
                a(b);
              } catch (c) {
                m(c);
              }
            });
          },
          $observe: function (a, b) {
            var c = this, d = c.$$observers || (c.$$observers = {}), e = d[a] || (d[a] = []);
            e.push(b);
            u.$evalAsync(function () {
              e.$$inter || b(c[a]);
            });
            return b;
          }
        };
        var Z = b.startSymbol(), ra = b.endSymbol(), Y = '{{' == Z || '}}' == ra ? Da : function (a) {
            return a.replace(/\{\{/g, Z).replace(/}}/g, ra);
          }, W = /^ngAttr[A-Z]/;
        return x;
      }
    ];
  }
  function na(b) {
    return Ta(b.replace(te, ''));
  }
  function rc(b, a) {
    var c = '', d = b.split(/\s+/), e = a.split(/\s+/), g = 0;
    a:
      for (; g < d.length; g++) {
        for (var f = d[g], h = 0; h < e.length; h++)
          if (f == e[h])
            continue a;
        c += (0 < c.length ? ' ' : '') + f;
      }
    return c;
  }
  function Od() {
    var b = {}, a = /^(\S+)(\s+as\s+(\w+))?$/;
    this.register = function (a, d) {
      Aa(a, 'controller');
      X(a) ? D(b, a) : b[a] = d;
    };
    this.$get = [
      '$injector',
      '$window',
      function (c, d) {
        return function (e, g) {
          var f, h, l;
          w(e) && (f = e.match(a), h = f[1], l = f[3], e = b.hasOwnProperty(h) ? b[h] : bc(g.$scope, h, !0) || bc(d, h, !0), Ra(e, h, !0));
          f = c.instantiate(e, g);
          if (l) {
            if (!g || 'object' != typeof g.$scope)
              throw t('$controller')('noscp', h || e.name, l);
            g.$scope[l] = f;
          }
          return f;
        };
      }
    ];
  }
  function Pd() {
    this.$get = [
      '$window',
      function (b) {
        return y(b.document);
      }
    ];
  }
  function Qd() {
    this.$get = [
      '$log',
      function (b) {
        return function (a, c) {
          b.error.apply(b, arguments);
        };
      }
    ];
  }
  function sc(b) {
    var a = {}, c, d, e;
    if (!b)
      return a;
    q(b.split('\n'), function (b) {
      e = b.indexOf(':');
      c = K(ca(b.substr(0, e)));
      d = ca(b.substr(e + 1));
      c && (a[c] = a[c] ? a[c] + (', ' + d) : d);
    });
    return a;
  }
  function tc(b) {
    var a = X(b) ? b : s;
    return function (c) {
      a || (a = sc(b));
      return c ? a[K(c)] || null : a;
    };
  }
  function uc(b, a, c) {
    if (P(c))
      return c(b, a);
    q(c, function (c) {
      b = c(b, a);
    });
    return b;
  }
  function Td() {
    var b = /^\s*(\[|\{[^\{])/, a = /[\}\]]\s*$/, c = /^\)\]\}',?\n/, d = { 'Content-Type': 'application/json;charset=utf-8' }, e = this.defaults = {
        transformResponse: [function (d) {
            w(d) && (d = d.replace(c, ''), b.test(d) && a.test(d) && (d = Wb(d)));
            return d;
          }],
        transformRequest: [function (a) {
            return X(a) && '[object File]' !== wa.call(a) && '[object Blob]' !== wa.call(a) ? qa(a) : a;
          }],
        headers: {
          common: { Accept: 'application/json, text/plain, */*' },
          post: ba(d),
          put: ba(d),
          patch: ba(d)
        },
        xsrfCookieName: 'XSRF-TOKEN',
        xsrfHeaderName: 'X-XSRF-TOKEN'
      }, g = this.interceptors = [], f = this.responseInterceptors = [];
    this.$get = [
      '$httpBackend',
      '$browser',
      '$cacheFactory',
      '$rootScope',
      '$q',
      '$injector',
      function (a, b, c, d, n, p) {
        function r(a) {
          function c(a) {
            var b = D({}, a, { data: uc(a.data, a.headers, d.transformResponse) });
            return 200 <= a.status && 300 > a.status ? b : n.reject(b);
          }
          var d = {
              method: 'get',
              transformRequest: e.transformRequest,
              transformResponse: e.transformResponse
            }, g = function (a) {
              function b(a) {
                var c;
                q(a, function (b, d) {
                  P(b) && (c = b(), null != c ? a[d] = c : delete a[d]);
                });
              }
              var c = e.headers, d = D({}, a.headers), g, f, c = D({}, c.common, c[K(a.method)]);
              b(c);
              b(d);
              a:
                for (g in c) {
                  a = K(g);
                  for (f in d)
                    if (K(f) === a)
                      continue a;
                  d[g] = c[g];
                }
              return d;
            }(a);
          D(d, a);
          d.headers = g;
          d.method = Fa(d.method);
          (a = Ib(d.url) ? b.cookies()[d.xsrfCookieName || e.xsrfCookieName] : s) && (g[d.xsrfHeaderName || e.xsrfHeaderName] = a);
          var f = [
              function (a) {
                g = a.headers;
                var b = uc(a.data, tc(g), a.transformRequest);
                E(a.data) && q(g, function (a, b) {
                  'content-type' === K(b) && delete g[b];
                });
                E(a.withCredentials) && !E(e.withCredentials) && (a.withCredentials = e.withCredentials);
                return z(a, b, g).then(c, c);
              },
              s
            ], h = n.when(d);
          for (q(v, function (a) {
              (a.request || a.requestError) && f.unshift(a.request, a.requestError);
              (a.response || a.responseError) && f.push(a.response, a.responseError);
            }); f.length;) {
            a = f.shift();
            var k = f.shift(), h = h.then(a, k);
          }
          h.success = function (a) {
            h.then(function (b) {
              a(b.data, b.status, b.headers, d);
            });
            return h;
          };
          h.error = function (a) {
            h.then(null, function (b) {
              a(b.data, b.status, b.headers, d);
            });
            return h;
          };
          return h;
        }
        function z(b, c, g) {
          function f(a, b, c, e) {
            v && (200 <= a && 300 > a ? v.put(s, [
              a,
              b,
              sc(c),
              e
            ]) : v.remove(s));
            l(b, a, c, e);
            d.$$phase || d.$apply();
          }
          function l(a, c, d, e) {
            c = Math.max(c, 0);
            (200 <= c && 300 > c ? p.resolve : p.reject)({
              data: a,
              status: c,
              headers: tc(d),
              config: b,
              statusText: e
            });
          }
          function k() {
            var a = db(r.pendingRequests, b);
            -1 !== a && r.pendingRequests.splice(a, 1);
          }
          var p = n.defer(), z = p.promise, v, q, s = u(b.url, b.params);
          r.pendingRequests.push(b);
          z.then(k, k);
          (b.cache || e.cache) && (!1 !== b.cache && 'GET' == b.method) && (v = X(b.cache) ? b.cache : X(e.cache) ? e.cache : F);
          if (v)
            if (q = v.get(s), B(q)) {
              if (q.then)
                return q.then(k, k), q;
              M(q) ? l(q[1], q[0], ba(q[2]), q[3]) : l(q, 200, {}, 'OK');
            } else
              v.put(s, z);
          E(q) && a(b.method, s, c, f, g, b.timeout, b.withCredentials, b.responseType);
          return z;
        }
        function u(a, b) {
          if (!b)
            return a;
          var c = [];
          Sc(b, function (a, b) {
            null === a || E(a) || (M(a) || (a = [a]), q(a, function (a) {
              X(a) && (a = qa(a));
              c.push(za(b) + '=' + za(a));
            }));
          });
          0 < c.length && (a += (-1 == a.indexOf('?') ? '?' : '&') + c.join('&'));
          return a;
        }
        var F = c('$http'), v = [];
        q(g, function (a) {
          v.unshift(w(a) ? p.get(a) : p.invoke(a));
        });
        q(f, function (a, b) {
          var c = w(a) ? p.get(a) : p.invoke(a);
          v.splice(b, 0, {
            response: function (a) {
              return c(n.when(a));
            },
            responseError: function (a) {
              return c(n.reject(a));
            }
          });
        });
        r.pendingRequests = [];
        (function (a) {
          q(arguments, function (a) {
            r[a] = function (b, c) {
              return r(D(c || {}, {
                method: a,
                url: b
              }));
            };
          });
        }('get', 'delete', 'head', 'jsonp'));
        (function (a) {
          q(arguments, function (a) {
            r[a] = function (b, c, d) {
              return r(D(d || {}, {
                method: a,
                url: b,
                data: c
              }));
            };
          });
        }('post', 'put'));
        r.defaults = e;
        return r;
      }
    ];
  }
  function ue(b) {
    if (8 >= S && (!b.match(/^(get|post|head|put|delete|options)$/i) || !O.XMLHttpRequest))
      return new O.ActiveXObject('Microsoft.XMLHTTP');
    if (O.XMLHttpRequest)
      return new O.XMLHttpRequest();
    throw t('$httpBackend')('noxhr');
  }
  function Ud() {
    this.$get = [
      '$browser',
      '$window',
      '$document',
      function (b, a, c) {
        return ve(b, ue, b.defer, a.angular.callbacks, c[0]);
      }
    ];
  }
  function ve(b, a, c, d, e) {
    function g(a, b) {
      var c = e.createElement('script'), d = function () {
          c.onreadystatechange = c.onload = c.onerror = null;
          e.body.removeChild(c);
          b && b();
        };
      c.type = 'text/javascript';
      c.src = a;
      S && 8 >= S ? c.onreadystatechange = function () {
        /loaded|complete/.test(c.readyState) && d();
      } : c.onload = c.onerror = function () {
        d();
      };
      e.body.appendChild(c);
      return d;
    }
    var f = -1;
    return function (e, l, k, m, n, p, r, z) {
      function u() {
        v = f;
        A && A();
        x && x.abort();
      }
      function F(a, d, e, g, f) {
        L && c.cancel(L);
        A = x = null;
        0 === d && (d = e ? 200 : 'file' == sa(l).protocol ? 404 : 0);
        a(1223 === d ? 204 : d, e, g, f || '');
        b.$$completeOutstandingRequest(C);
      }
      var v;
      b.$$incOutstandingRequestCount();
      l = l || b.url();
      if ('jsonp' == K(e)) {
        var J = '_' + (d.counter++).toString(36);
        d[J] = function (a) {
          d[J].data = a;
        };
        var A = g(l.replace('JSON_CALLBACK', 'angular.callbacks.' + J), function () {
            d[J].data ? F(m, 200, d[J].data) : F(m, v || -2);
            d[J] = Ea.noop;
          });
      } else {
        var x = a(e);
        x.open(e, l, !0);
        q(n, function (a, b) {
          B(a) && x.setRequestHeader(b, a);
        });
        x.onreadystatechange = function () {
          if (x && 4 == x.readyState) {
            var a = null, b = null;
            v !== f && (a = x.getAllResponseHeaders(), b = 'response' in x ? x.response : x.responseText);
            F(m, v || x.status, b, a, x.statusText || '');
          }
        };
        r && (x.withCredentials = !0);
        if (z)
          try {
            x.responseType = z;
          } catch (s) {
            if ('json' !== z)
              throw s;
          }
        x.send(k || null);
      }
      if (0 < p)
        var L = c(u, p);
      else
        p && p.then && p.then(u);
    };
  }
  function Rd() {
    var b = '{{', a = '}}';
    this.startSymbol = function (a) {
      return a ? (b = a, this) : b;
    };
    this.endSymbol = function (b) {
      return b ? (a = b, this) : a;
    };
    this.$get = [
      '$parse',
      '$exceptionHandler',
      '$sce',
      function (c, d, e) {
        function g(g, k, m) {
          for (var n, p, r = 0, z = [], u = g.length, F = !1, v = []; r < u;)
            -1 != (n = g.indexOf(b, r)) && -1 != (p = g.indexOf(a, n + f)) ? (r != n && z.push(g.substring(r, n)), z.push(r = c(F = g.substring(n + f, p))), r.exp = F, r = p + h, F = !0) : (r != u && z.push(g.substring(r)), r = u);
          (u = z.length) || (z.push(''), u = 1);
          if (m && 1 < z.length)
            throw vc('noconcat', g);
          if (!k || F)
            return v.length = u, r = function (a) {
              try {
                for (var b = 0, c = u, f; b < c; b++)
                  'function' == typeof (f = z[b]) && (f = f(a), f = m ? e.getTrusted(m, f) : e.valueOf(f), null === f || E(f) ? f = '' : 'string' != typeof f && (f = qa(f))), v[b] = f;
                return v.join('');
              } catch (h) {
                a = vc('interr', g, h.toString()), d(a);
              }
            }, r.exp = g, r.parts = z, r;
        }
        var f = b.length, h = a.length;
        g.startSymbol = function () {
          return b;
        };
        g.endSymbol = function () {
          return a;
        };
        return g;
      }
    ];
  }
  function Sd() {
    this.$get = [
      '$rootScope',
      '$window',
      '$q',
      function (b, a, c) {
        function d(d, f, h, l) {
          var k = a.setInterval, m = a.clearInterval, n = c.defer(), p = n.promise, r = 0, z = B(l) && !l;
          h = B(h) ? h : 0;
          p.then(null, null, d);
          p.$$intervalId = k(function () {
            n.notify(r++);
            0 < h && r >= h && (n.resolve(r), m(p.$$intervalId), delete e[p.$$intervalId]);
            z || b.$apply();
          }, f);
          e[p.$$intervalId] = n;
          return p;
        }
        var e = {};
        d.cancel = function (a) {
          return a && a.$$intervalId in e ? (e[a.$$intervalId].reject('canceled'), clearInterval(a.$$intervalId), delete e[a.$$intervalId], !0) : !1;
        };
        return d;
      }
    ];
  }
  function ad() {
    this.$get = function () {
      return {
        id: 'en-us',
        NUMBER_FORMATS: {
          DECIMAL_SEP: '.',
          GROUP_SEP: ',',
          PATTERNS: [
            {
              minInt: 1,
              minFrac: 0,
              maxFrac: 3,
              posPre: '',
              posSuf: '',
              negPre: '-',
              negSuf: '',
              gSize: 3,
              lgSize: 3
            },
            {
              minInt: 1,
              minFrac: 2,
              maxFrac: 2,
              posPre: '\xa4',
              posSuf: '',
              negPre: '(\xa4',
              negSuf: ')',
              gSize: 3,
              lgSize: 3
            }
          ],
          CURRENCY_SYM: '$'
        },
        DATETIME_FORMATS: {
          MONTH: 'January February March April May June July August September October November December'.split(' '),
          SHORTMONTH: 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' '),
          DAY: 'Sunday Monday Tuesday Wednesday Thursday Friday Saturday'.split(' '),
          SHORTDAY: 'Sun Mon Tue Wed Thu Fri Sat'.split(' '),
          AMPMS: [
            'AM',
            'PM'
          ],
          medium: 'MMM d, y h:mm:ss a',
          'short': 'M/d/yy h:mm a',
          fullDate: 'EEEE, MMMM d, y',
          longDate: 'MMMM d, y',
          mediumDate: 'MMM d, y',
          shortDate: 'M/d/yy',
          mediumTime: 'h:mm:ss a',
          shortTime: 'h:mm a'
        },
        pluralCat: function (b) {
          return 1 === b ? 'one' : 'other';
        }
      };
    };
  }
  function wc(b) {
    b = b.split('/');
    for (var a = b.length; a--;)
      b[a] = wb(b[a]);
    return b.join('/');
  }
  function xc(b, a, c) {
    b = sa(b, c);
    a.$$protocol = b.protocol;
    a.$$host = b.hostname;
    a.$$port = Y(b.port) || we[b.protocol] || null;
  }
  function yc(b, a, c) {
    var d = '/' !== b.charAt(0);
    d && (b = '/' + b);
    b = sa(b, c);
    a.$$path = decodeURIComponent(d && '/' === b.pathname.charAt(0) ? b.pathname.substring(1) : b.pathname);
    a.$$search = Yb(b.search);
    a.$$hash = decodeURIComponent(b.hash);
    a.$$path && '/' != a.$$path.charAt(0) && (a.$$path = '/' + a.$$path);
  }
  function oa(b, a) {
    if (0 === a.indexOf(b))
      return a.substr(b.length);
  }
  function Ya(b) {
    var a = b.indexOf('#');
    return -1 == a ? b : b.substr(0, a);
  }
  function Jb(b) {
    return b.substr(0, Ya(b).lastIndexOf('/') + 1);
  }
  function zc(b, a) {
    this.$$html5 = !0;
    a = a || '';
    var c = Jb(b);
    xc(b, this, b);
    this.$$parse = function (a) {
      var e = oa(c, a);
      if (!w(e))
        throw Kb('ipthprfx', a, c);
      yc(e, this, b);
      this.$$path || (this.$$path = '/');
      this.$$compose();
    };
    this.$$compose = function () {
      var a = Zb(this.$$search), b = this.$$hash ? '#' + wb(this.$$hash) : '';
      this.$$url = wc(this.$$path) + (a ? '?' + a : '') + b;
      this.$$absUrl = c + this.$$url.substr(1);
    };
    this.$$rewrite = function (d) {
      var e;
      if ((e = oa(b, d)) !== s)
        return d = e, (e = oa(a, e)) !== s ? c + (oa('/', e) || e) : b + d;
      if ((e = oa(c, d)) !== s)
        return c + e;
      if (c == d + '/')
        return c;
    };
  }
  function Lb(b, a) {
    var c = Jb(b);
    xc(b, this, b);
    this.$$parse = function (d) {
      var e = oa(b, d) || oa(c, d), e = '#' == e.charAt(0) ? oa(a, e) : this.$$html5 ? e : '';
      if (!w(e))
        throw Kb('ihshprfx', d, a);
      yc(e, this, b);
      d = this.$$path;
      var g = /^\/?.*?:(\/.*)/;
      0 === e.indexOf(b) && (e = e.replace(b, ''));
      g.exec(e) || (d = (e = g.exec(d)) ? e[1] : d);
      this.$$path = d;
      this.$$compose();
    };
    this.$$compose = function () {
      var c = Zb(this.$$search), e = this.$$hash ? '#' + wb(this.$$hash) : '';
      this.$$url = wc(this.$$path) + (c ? '?' + c : '') + e;
      this.$$absUrl = b + (this.$$url ? a + this.$$url : '');
    };
    this.$$rewrite = function (a) {
      if (Ya(b) == Ya(a))
        return a;
    };
  }
  function Ac(b, a) {
    this.$$html5 = !0;
    Lb.apply(this, arguments);
    var c = Jb(b);
    this.$$rewrite = function (d) {
      var e;
      if (b == Ya(d))
        return d;
      if (e = oa(c, d))
        return b + a + e;
      if (c === d + '/')
        return c;
    };
  }
  function nb(b) {
    return function () {
      return this[b];
    };
  }
  function Bc(b, a) {
    return function (c) {
      if (E(c))
        return this[b];
      this[b] = a(c);
      this.$$compose();
      return this;
    };
  }
  function Vd() {
    var b = '', a = !1;
    this.hashPrefix = function (a) {
      return B(a) ? (b = a, this) : b;
    };
    this.html5Mode = function (b) {
      return B(b) ? (a = b, this) : a;
    };
    this.$get = [
      '$rootScope',
      '$browser',
      '$sniffer',
      '$rootElement',
      function (c, d, e, g) {
        function f(a) {
          c.$broadcast('$locationChangeSuccess', h.absUrl(), a);
        }
        var h, l = d.baseHref(), k = d.url();
        a ? (l = k.substring(0, k.indexOf('/', k.indexOf('//') + 2)) + (l || '/'), e = e.history ? zc : Ac) : (l = Ya(k), e = Lb);
        h = new e(l, '#' + b);
        h.$$parse(h.$$rewrite(k));
        g.on('click', function (a) {
          if (!a.ctrlKey && !a.metaKey && 2 != a.which) {
            for (var b = y(a.target); 'a' !== K(b[0].nodeName);)
              if (b[0] === g[0] || !(b = b.parent())[0])
                return;
            var e = b.prop('href');
            X(e) && '[object SVGAnimatedString]' === e.toString() && (e = sa(e.animVal).href);
            var f = h.$$rewrite(e);
            e && (!b.attr('target') && f && !a.isDefaultPrevented()) && (a.preventDefault(), f != d.url() && (h.$$parse(f), c.$apply(), O.angular['ff-684208-preventDefault'] = !0));
          }
        });
        h.absUrl() != k && d.url(h.absUrl(), !0);
        d.onUrlChange(function (a) {
          h.absUrl() != a && (c.$evalAsync(function () {
            var b = h.absUrl();
            h.$$parse(a);
            c.$broadcast('$locationChangeStart', a, b).defaultPrevented ? (h.$$parse(b), d.url(b)) : f(b);
          }), c.$$phase || c.$digest());
        });
        var m = 0;
        c.$watch(function () {
          var a = d.url(), b = h.$$replace;
          m && a == h.absUrl() || (m++, c.$evalAsync(function () {
            c.$broadcast('$locationChangeStart', h.absUrl(), a).defaultPrevented ? h.$$parse(a) : (d.url(h.absUrl(), b), f(a));
          }));
          h.$$replace = !1;
          return m;
        });
        return h;
      }
    ];
  }
  function Wd() {
    var b = !0, a = this;
    this.debugEnabled = function (a) {
      return B(a) ? (b = a, this) : b;
    };
    this.$get = [
      '$window',
      function (c) {
        function d(a) {
          a instanceof Error && (a.stack ? a = a.message && -1 === a.stack.indexOf(a.message) ? 'Error: ' + a.message + '\n' + a.stack : a.stack : a.sourceURL && (a = a.message + '\n' + a.sourceURL + ':' + a.line));
          return a;
        }
        function e(a) {
          var b = c.console || {}, e = b[a] || b.log || C;
          a = !1;
          try {
            a = !!e.apply;
          } catch (l) {
          }
          return a ? function () {
            var a = [];
            q(arguments, function (b) {
              a.push(d(b));
            });
            return e.apply(b, a);
          } : function (a, b) {
            e(a, null == b ? '' : b);
          };
        }
        return {
          log: e('log'),
          info: e('info'),
          warn: e('warn'),
          error: e('error'),
          debug: function () {
            var c = e('debug');
            return function () {
              b && c.apply(a, arguments);
            };
          }()
        };
      }
    ];
  }
  function fa(b, a) {
    if ('constructor' === b)
      throw Ba('isecfld', a);
    return b;
  }
  function Za(b, a) {
    if (b) {
      if (b.constructor === b)
        throw Ba('isecfn', a);
      if (b.document && b.location && b.alert && b.setInterval)
        throw Ba('isecwindow', a);
      if (b.children && (b.nodeName || b.prop && b.attr && b.find))
        throw Ba('isecdom', a);
    }
    return b;
  }
  function ob(b, a, c, d, e) {
    e = e || {};
    a = a.split('.');
    for (var g, f = 0; 1 < a.length; f++) {
      g = fa(a.shift(), d);
      var h = b[g];
      h || (h = {}, b[g] = h);
      b = h;
      b.then && e.unwrapPromises && (ta(d), '$$v' in b || function (a) {
        a.then(function (b) {
          a.$$v = b;
        });
      }(b), b.$$v === s && (b.$$v = {}), b = b.$$v);
    }
    g = fa(a.shift(), d);
    return b[g] = c;
  }
  function Cc(b, a, c, d, e, g, f) {
    fa(b, g);
    fa(a, g);
    fa(c, g);
    fa(d, g);
    fa(e, g);
    return f.unwrapPromises ? function (f, l) {
      var k = l && l.hasOwnProperty(b) ? l : f, m;
      if (null == k)
        return k;
      (k = k[b]) && k.then && (ta(g), '$$v' in k || (m = k, m.$$v = s, m.then(function (a) {
        m.$$v = a;
      })), k = k.$$v);
      if (!a)
        return k;
      if (null == k)
        return s;
      (k = k[a]) && k.then && (ta(g), '$$v' in k || (m = k, m.$$v = s, m.then(function (a) {
        m.$$v = a;
      })), k = k.$$v);
      if (!c)
        return k;
      if (null == k)
        return s;
      (k = k[c]) && k.then && (ta(g), '$$v' in k || (m = k, m.$$v = s, m.then(function (a) {
        m.$$v = a;
      })), k = k.$$v);
      if (!d)
        return k;
      if (null == k)
        return s;
      (k = k[d]) && k.then && (ta(g), '$$v' in k || (m = k, m.$$v = s, m.then(function (a) {
        m.$$v = a;
      })), k = k.$$v);
      if (!e)
        return k;
      if (null == k)
        return s;
      (k = k[e]) && k.then && (ta(g), '$$v' in k || (m = k, m.$$v = s, m.then(function (a) {
        m.$$v = a;
      })), k = k.$$v);
      return k;
    } : function (g, f) {
      var k = f && f.hasOwnProperty(b) ? f : g;
      if (null == k)
        return k;
      k = k[b];
      if (!a)
        return k;
      if (null == k)
        return s;
      k = k[a];
      if (!c)
        return k;
      if (null == k)
        return s;
      k = k[c];
      if (!d)
        return k;
      if (null == k)
        return s;
      k = k[d];
      return e ? null == k ? s : k = k[e] : k;
    };
  }
  function xe(b, a) {
    fa(b, a);
    return function (a, d) {
      return null == a ? s : (d && d.hasOwnProperty(b) ? d : a)[b];
    };
  }
  function ye(b, a, c) {
    fa(b, c);
    fa(a, c);
    return function (c, e) {
      if (null == c)
        return s;
      c = (e && e.hasOwnProperty(b) ? e : c)[b];
      return null == c ? s : c[a];
    };
  }
  function Dc(b, a, c) {
    if (Mb.hasOwnProperty(b))
      return Mb[b];
    var d = b.split('.'), e = d.length, g;
    if (a.unwrapPromises || 1 !== e)
      if (a.unwrapPromises || 2 !== e)
        if (a.csp)
          g = 6 > e ? Cc(d[0], d[1], d[2], d[3], d[4], c, a) : function (b, g) {
            var f = 0, h;
            do
              h = Cc(d[f++], d[f++], d[f++], d[f++], d[f++], c, a)(b, g), g = s, b = h;
            while (f < e);
            return h;
          };
        else {
          var f = 'var p;\n';
          q(d, function (b, d) {
            fa(b, c);
            f += 'if(s == null) return undefined;\ns=' + (d ? 's' : '((k&&k.hasOwnProperty("' + b + '"))?k:s)') + '["' + b + '"];\n' + (a.unwrapPromises ? 'if (s && s.then) {\n pw("' + c.replace(/(["\r\n])/g, '\\$1') + '");\n if (!("$$v" in s)) {\n p=s;\n p.$$v = undefined;\n p.then(function(v) {p.$$v=v;});\n}\n s=s.$$v\n}\n' : '');
          });
          var f = f + 'return s;', h = new Function('s', 'k', 'pw', f);
          h.toString = aa(f);
          g = a.unwrapPromises ? function (a, b) {
            return h(a, b, ta);
          } : h;
        }
      else
        g = ye(d[0], d[1], c);
    else
      g = xe(d[0], c);
    'hasOwnProperty' !== b && (Mb[b] = g);
    return g;
  }
  function Xd() {
    var b = {}, a = {
        csp: !1,
        unwrapPromises: !1,
        logPromiseWarnings: !0
      };
    this.unwrapPromises = function (b) {
      return B(b) ? (a.unwrapPromises = !!b, this) : a.unwrapPromises;
    };
    this.logPromiseWarnings = function (b) {
      return B(b) ? (a.logPromiseWarnings = b, this) : a.logPromiseWarnings;
    };
    this.$get = [
      '$filter',
      '$sniffer',
      '$log',
      function (c, d, e) {
        a.csp = d.csp;
        ta = function (b) {
          a.logPromiseWarnings && !Ec.hasOwnProperty(b) && (Ec[b] = !0, e.warn('[$parse] Promise found in the expression `' + b + '`. Automatic unwrapping of promises in Angular expressions is deprecated.'));
        };
        return function (d) {
          var e;
          switch (typeof d) {
          case 'string':
            if (b.hasOwnProperty(d))
              return b[d];
            e = new Nb(a);
            e = new $a(e, c, a).parse(d, !1);
            'hasOwnProperty' !== d && (b[d] = e);
            return e;
          case 'function':
            return d;
          default:
            return C;
          }
        };
      }
    ];
  }
  function Zd() {
    this.$get = [
      '$rootScope',
      '$exceptionHandler',
      function (b, a) {
        return ze(function (a) {
          b.$evalAsync(a);
        }, a);
      }
    ];
  }
  function ze(b, a) {
    function c(a) {
      return a;
    }
    function d(a) {
      return f(a);
    }
    var e = function () {
        var f = [], k, m;
        return m = {
          resolve: function (a) {
            if (f) {
              var c = f;
              f = s;
              k = g(a);
              c.length && b(function () {
                for (var a, b = 0, d = c.length; b < d; b++)
                  a = c[b], k.then(a[0], a[1], a[2]);
              });
            }
          },
          reject: function (a) {
            m.resolve(h(a));
          },
          notify: function (a) {
            if (f) {
              var c = f;
              f.length && b(function () {
                for (var b, d = 0, e = c.length; d < e; d++)
                  b = c[d], b[2](a);
              });
            }
          },
          promise: {
            then: function (b, g, h) {
              var m = e(), u = function (d) {
                  try {
                    m.resolve((P(b) ? b : c)(d));
                  } catch (e) {
                    m.reject(e), a(e);
                  }
                }, F = function (b) {
                  try {
                    m.resolve((P(g) ? g : d)(b));
                  } catch (c) {
                    m.reject(c), a(c);
                  }
                }, v = function (b) {
                  try {
                    m.notify((P(h) ? h : c)(b));
                  } catch (d) {
                    a(d);
                  }
                };
              f ? f.push([
                u,
                F,
                v
              ]) : k.then(u, F, v);
              return m.promise;
            },
            'catch': function (a) {
              return this.then(null, a);
            },
            'finally': function (a) {
              function b(a, c) {
                var d = e();
                c ? d.resolve(a) : d.reject(a);
                return d.promise;
              }
              function d(e, g) {
                var f = null;
                try {
                  f = (a || c)();
                } catch (h) {
                  return b(h, !1);
                }
                return f && P(f.then) ? f.then(function () {
                  return b(e, g);
                }, function (a) {
                  return b(a, !1);
                }) : b(e, g);
              }
              return this.then(function (a) {
                return d(a, !0);
              }, function (a) {
                return d(a, !1);
              });
            }
          }
        };
      }, g = function (a) {
        return a && P(a.then) ? a : {
          then: function (c) {
            var d = e();
            b(function () {
              d.resolve(c(a));
            });
            return d.promise;
          }
        };
      }, f = function (a) {
        var b = e();
        b.reject(a);
        return b.promise;
      }, h = function (c) {
        return {
          then: function (g, f) {
            var h = e();
            b(function () {
              try {
                h.resolve((P(f) ? f : d)(c));
              } catch (b) {
                h.reject(b), a(b);
              }
            });
            return h.promise;
          }
        };
      };
    return {
      defer: e,
      reject: f,
      when: function (h, k, m, n) {
        var p = e(), r, z = function (b) {
            try {
              return (P(k) ? k : c)(b);
            } catch (d) {
              return a(d), f(d);
            }
          }, u = function (b) {
            try {
              return (P(m) ? m : d)(b);
            } catch (c) {
              return a(c), f(c);
            }
          }, F = function (b) {
            try {
              return (P(n) ? n : c)(b);
            } catch (d) {
              a(d);
            }
          };
        b(function () {
          g(h).then(function (a) {
            r || (r = !0, p.resolve(g(a).then(z, u, F)));
          }, function (a) {
            r || (r = !0, p.resolve(u(a)));
          }, function (a) {
            r || p.notify(F(a));
          });
        });
        return p.promise;
      },
      all: function (a) {
        var b = e(), c = 0, d = M(a) ? [] : {};
        q(a, function (a, e) {
          c++;
          g(a).then(function (a) {
            d.hasOwnProperty(e) || (d[e] = a, --c || b.resolve(d));
          }, function (a) {
            d.hasOwnProperty(e) || b.reject(a);
          });
        });
        0 === c && b.resolve(d);
        return b.promise;
      }
    };
  }
  function fe() {
    this.$get = [
      '$window',
      '$timeout',
      function (b, a) {
        var c = b.requestAnimationFrame || b.webkitRequestAnimationFrame || b.mozRequestAnimationFrame, d = b.cancelAnimationFrame || b.webkitCancelAnimationFrame || b.mozCancelAnimationFrame || b.webkitCancelRequestAnimationFrame, e = !!c, g = e ? function (a) {
            var b = c(a);
            return function () {
              d(b);
            };
          } : function (b) {
            var c = a(b, 16.66, !1);
            return function () {
              a.cancel(c);
            };
          };
        g.supported = e;
        return g;
      }
    ];
  }
  function Yd() {
    var b = 10, a = t('$rootScope'), c = null;
    this.digestTtl = function (a) {
      arguments.length && (b = a);
      return b;
    };
    this.$get = [
      '$injector',
      '$exceptionHandler',
      '$parse',
      '$browser',
      function (d, e, g, f) {
        function h() {
          this.$id = bb();
          this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null;
          this['this'] = this.$root = this;
          this.$$destroyed = !1;
          this.$$asyncQueue = [];
          this.$$postDigestQueue = [];
          this.$$listeners = {};
          this.$$listenerCount = {};
          this.$$isolateBindings = {};
        }
        function l(b) {
          if (p.$$phase)
            throw a('inprog', p.$$phase);
          p.$$phase = b;
        }
        function k(a, b) {
          var c = g(a);
          Ra(c, b);
          return c;
        }
        function m(a, b, c) {
          do
            a.$$listenerCount[c] -= b, 0 === a.$$listenerCount[c] && delete a.$$listenerCount[c];
          while (a = a.$parent);
        }
        function n() {
        }
        h.prototype = {
          constructor: h,
          $new: function (a) {
            a ? (a = new h(), a.$root = this.$root, a.$$asyncQueue = this.$$asyncQueue, a.$$postDigestQueue = this.$$postDigestQueue) : (a = function () {
            }, a.prototype = this, a = new a(), a.$id = bb());
            a['this'] = a;
            a.$$listeners = {};
            a.$$listenerCount = {};
            a.$parent = this;
            a.$$watchers = a.$$nextSibling = a.$$childHead = a.$$childTail = null;
            a.$$prevSibling = this.$$childTail;
            this.$$childHead ? this.$$childTail = this.$$childTail.$$nextSibling = a : this.$$childHead = this.$$childTail = a;
            return a;
          },
          $watch: function (a, b, d) {
            var e = k(a, 'watch'), g = this.$$watchers, f = {
                fn: b,
                last: n,
                get: e,
                exp: a,
                eq: !!d
              };
            c = null;
            if (!P(b)) {
              var h = k(b || C, 'listener');
              f.fn = function (a, b, c) {
                h(c);
              };
            }
            if ('string' == typeof a && e.constant) {
              var l = f.fn;
              f.fn = function (a, b, c) {
                l.call(this, a, b, c);
                Oa(g, f);
              };
            }
            g || (g = this.$$watchers = []);
            g.unshift(f);
            return function () {
              Oa(g, f);
              c = null;
            };
          },
          $watchCollection: function (a, b) {
            var c = this, d, e, f, h = 1 < b.length, l = 0, k = g(a), m = [], n = {}, p = !0, q = 0;
            return this.$watch(function () {
              d = k(c);
              var a, b;
              if (X(d))
                if (ab(d))
                  for (e !== m && (e = m, q = e.length = 0, l++), a = d.length, q !== a && (l++, e.length = q = a), b = 0; b < a; b++)
                    e[b] !== e[b] && d[b] !== d[b] || e[b] === d[b] || (l++, e[b] = d[b]);
                else {
                  e !== n && (e = n = {}, q = 0, l++);
                  a = 0;
                  for (b in d)
                    d.hasOwnProperty(b) && (a++, e.hasOwnProperty(b) ? e[b] !== d[b] && (l++, e[b] = d[b]) : (q++, e[b] = d[b], l++));
                  if (q > a)
                    for (b in l++, e)
                      e.hasOwnProperty(b) && !d.hasOwnProperty(b) && (q--, delete e[b]);
                }
              else
                e !== d && (e = d, l++);
              return l;
            }, function () {
              p ? (p = !1, b(d, d, c)) : b(d, f, c);
              if (h)
                if (X(d))
                  if (ab(d)) {
                    f = Array(d.length);
                    for (var a = 0; a < d.length; a++)
                      f[a] = d[a];
                  } else
                    for (a in f = {}, d)
                      Fc.call(d, a) && (f[a] = d[a]);
                else
                  f = d;
            });
          },
          $digest: function () {
            var d, g, f, h, k = this.$$asyncQueue, m = this.$$postDigestQueue, q, x, s = b, L, Q = [], y, H, R;
            l('$digest');
            c = null;
            do {
              x = !1;
              for (L = this; k.length;) {
                try {
                  R = k.shift(), R.scope.$eval(R.expression);
                } catch (B) {
                  p.$$phase = null, e(B);
                }
                c = null;
              }
              a:
                do {
                  if (h = L.$$watchers)
                    for (q = h.length; q--;)
                      try {
                        if (d = h[q])
                          if ((g = d.get(L)) !== (f = d.last) && !(d.eq ? xa(g, f) : 'number' == typeof g && 'number' == typeof f && isNaN(g) && isNaN(f)))
                            x = !0, c = d, d.last = d.eq ? ba(g) : g, d.fn(g, f === n ? g : f, L), 5 > s && (y = 4 - s, Q[y] || (Q[y] = []), H = P(d.exp) ? 'fn: ' + (d.exp.name || d.exp.toString()) : d.exp, H += '; newVal: ' + qa(g) + '; oldVal: ' + qa(f), Q[y].push(H));
                          else if (d === c) {
                            x = !1;
                            break a;
                          }
                      } catch (w) {
                        p.$$phase = null, e(w);
                      }
                  if (!(h = L.$$childHead || L !== this && L.$$nextSibling))
                    for (; L !== this && !(h = L.$$nextSibling);)
                      L = L.$parent;
                } while (L = h);
              if ((x || k.length) && !s--)
                throw p.$$phase = null, a('infdig', b, qa(Q));
            } while (x || k.length);
            for (p.$$phase = null; m.length;)
              try {
                m.shift()();
              } catch (T) {
                e(T);
              }
          },
          $destroy: function () {
            if (!this.$$destroyed) {
              var a = this.$parent;
              this.$broadcast('$destroy');
              this.$$destroyed = !0;
              this !== p && (q(this.$$listenerCount, eb(null, m, this)), a.$$childHead == this && (a.$$childHead = this.$$nextSibling), a.$$childTail == this && (a.$$childTail = this.$$prevSibling), this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling), this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling), this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = this.$root = null, this.$$listeners = {}, this.$$watchers = this.$$asyncQueue = this.$$postDigestQueue = [], this.$destroy = this.$digest = this.$apply = C, this.$on = this.$watch = function () {
                return C;
              });
            }
          },
          $eval: function (a, b) {
            return g(a)(this, b);
          },
          $evalAsync: function (a) {
            p.$$phase || p.$$asyncQueue.length || f.defer(function () {
              p.$$asyncQueue.length && p.$digest();
            });
            this.$$asyncQueue.push({
              scope: this,
              expression: a
            });
          },
          $$postDigest: function (a) {
            this.$$postDigestQueue.push(a);
          },
          $apply: function (a) {
            try {
              return l('$apply'), this.$eval(a);
            } catch (b) {
              e(b);
            } finally {
              p.$$phase = null;
              try {
                p.$digest();
              } catch (c) {
                throw e(c), c;
              }
            }
          },
          $on: function (a, b) {
            var c = this.$$listeners[a];
            c || (this.$$listeners[a] = c = []);
            c.push(b);
            var d = this;
            do
              d.$$listenerCount[a] || (d.$$listenerCount[a] = 0), d.$$listenerCount[a]++;
            while (d = d.$parent);
            var e = this;
            return function () {
              c[db(c, b)] = null;
              m(e, 1, a);
            };
          },
          $emit: function (a, b) {
            var c = [], d, g = this, f = !1, h = {
                name: a,
                targetScope: g,
                stopPropagation: function () {
                  f = !0;
                },
                preventDefault: function () {
                  h.defaultPrevented = !0;
                },
                defaultPrevented: !1
              }, l = [h].concat(ya.call(arguments, 1)), k, m;
            do {
              d = g.$$listeners[a] || c;
              h.currentScope = g;
              k = 0;
              for (m = d.length; k < m; k++)
                if (d[k])
                  try {
                    d[k].apply(null, l);
                  } catch (n) {
                    e(n);
                  }
                else
                  d.splice(k, 1), k--, m--;
              if (f)
                break;
              g = g.$parent;
            } while (g);
            return h;
          },
          $broadcast: function (a, b) {
            for (var c = this, d = this, g = {
                  name: a,
                  targetScope: this,
                  preventDefault: function () {
                    g.defaultPrevented = !0;
                  },
                  defaultPrevented: !1
                }, f = [g].concat(ya.call(arguments, 1)), h, k; c = d;) {
              g.currentScope = c;
              d = c.$$listeners[a] || [];
              h = 0;
              for (k = d.length; h < k; h++)
                if (d[h])
                  try {
                    d[h].apply(null, f);
                  } catch (l) {
                    e(l);
                  }
                else
                  d.splice(h, 1), h--, k--;
              if (!(d = c.$$listenerCount[a] && c.$$childHead || c !== this && c.$$nextSibling))
                for (; c !== this && !(d = c.$$nextSibling);)
                  c = c.$parent;
            }
            return g;
          }
        };
        var p = new h();
        return p;
      }
    ];
  }
  function bd() {
    var b = /^\s*(https?|ftp|mailto|tel|file):/, a = /^\s*(https?|ftp|file):|data:image\//;
    this.aHrefSanitizationWhitelist = function (a) {
      return B(a) ? (b = a, this) : b;
    };
    this.imgSrcSanitizationWhitelist = function (b) {
      return B(b) ? (a = b, this) : a;
    };
    this.$get = function () {
      return function (c, d) {
        var e = d ? a : b, g;
        if (!S || 8 <= S)
          if (g = sa(c).href, '' !== g && !g.match(e))
            return 'unsafe:' + g;
        return c;
      };
    };
  }
  function Ae(b) {
    if ('self' === b)
      return b;
    if (w(b)) {
      if (-1 < b.indexOf('***'))
        throw ua('iwcard', b);
      b = b.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, '\\$1').replace(/\x08/g, '\\x08').replace('\\*\\*', '.*').replace('\\*', '[^:/.?&;]*');
      return RegExp('^' + b + '$');
    }
    if (cb(b))
      return RegExp('^' + b.source + '$');
    throw ua('imatcher');
  }
  function Gc(b) {
    var a = [];
    B(b) && q(b, function (b) {
      a.push(Ae(b));
    });
    return a;
  }
  function ae() {
    this.SCE_CONTEXTS = ga;
    var b = ['self'], a = [];
    this.resourceUrlWhitelist = function (a) {
      arguments.length && (b = Gc(a));
      return b;
    };
    this.resourceUrlBlacklist = function (b) {
      arguments.length && (a = Gc(b));
      return a;
    };
    this.$get = [
      '$injector',
      function (c) {
        function d(a) {
          var b = function (a) {
            this.$$unwrapTrustedValue = function () {
              return a;
            };
          };
          a && (b.prototype = new a());
          b.prototype.valueOf = function () {
            return this.$$unwrapTrustedValue();
          };
          b.prototype.toString = function () {
            return this.$$unwrapTrustedValue().toString();
          };
          return b;
        }
        var e = function (a) {
          throw ua('unsafe');
        };
        c.has('$sanitize') && (e = c.get('$sanitize'));
        var g = d(), f = {};
        f[ga.HTML] = d(g);
        f[ga.CSS] = d(g);
        f[ga.URL] = d(g);
        f[ga.JS] = d(g);
        f[ga.RESOURCE_URL] = d(f[ga.URL]);
        return {
          trustAs: function (a, b) {
            var c = f.hasOwnProperty(a) ? f[a] : null;
            if (!c)
              throw ua('icontext', a, b);
            if (null === b || b === s || '' === b)
              return b;
            if ('string' !== typeof b)
              throw ua('itype', a);
            return new c(b);
          },
          getTrusted: function (c, d) {
            if (null === d || d === s || '' === d)
              return d;
            var g = f.hasOwnProperty(c) ? f[c] : null;
            if (g && d instanceof g)
              return d.$$unwrapTrustedValue();
            if (c === ga.RESOURCE_URL) {
              var g = sa(d.toString()), m, n, p = !1;
              m = 0;
              for (n = b.length; m < n; m++)
                if ('self' === b[m] ? Ib(g) : b[m].exec(g.href)) {
                  p = !0;
                  break;
                }
              if (p)
                for (m = 0, n = a.length; m < n; m++)
                  if ('self' === a[m] ? Ib(g) : a[m].exec(g.href)) {
                    p = !1;
                    break;
                  }
              if (p)
                return d;
              throw ua('insecurl', d.toString());
            }
            if (c === ga.HTML)
              return e(d);
            throw ua('unsafe');
          },
          valueOf: function (a) {
            return a instanceof g ? a.$$unwrapTrustedValue() : a;
          }
        };
      }
    ];
  }
  function $d() {
    var b = !0;
    this.enabled = function (a) {
      arguments.length && (b = !!a);
      return b;
    };
    this.$get = [
      '$parse',
      '$sniffer',
      '$sceDelegate',
      function (a, c, d) {
        if (b && c.msie && 8 > c.msieDocumentMode)
          throw ua('iequirks');
        var e = ba(ga);
        e.isEnabled = function () {
          return b;
        };
        e.trustAs = d.trustAs;
        e.getTrusted = d.getTrusted;
        e.valueOf = d.valueOf;
        b || (e.trustAs = e.getTrusted = function (a, b) {
          return b;
        }, e.valueOf = Da);
        e.parseAs = function (b, c) {
          var d = a(c);
          return d.literal && d.constant ? d : function (a, c) {
            return e.getTrusted(b, d(a, c));
          };
        };
        var g = e.parseAs, f = e.getTrusted, h = e.trustAs;
        q(ga, function (a, b) {
          var c = K(b);
          e[Ta('parse_as_' + c)] = function (b) {
            return g(a, b);
          };
          e[Ta('get_trusted_' + c)] = function (b) {
            return f(a, b);
          };
          e[Ta('trust_as_' + c)] = function (b) {
            return h(a, b);
          };
        });
        return e;
      }
    ];
  }
  function be() {
    this.$get = [
      '$window',
      '$document',
      function (b, a) {
        var c = {}, d = Y((/android (\d+)/.exec(K((b.navigator || {}).userAgent)) || [])[1]), e = /Boxee/i.test((b.navigator || {}).userAgent), g = a[0] || {}, f = g.documentMode, h, l = /^(Moz|webkit|O|ms)(?=[A-Z])/, k = g.body && g.body.style, m = !1, n = !1;
        if (k) {
          for (var p in k)
            if (m = l.exec(p)) {
              h = m[0];
              h = h.substr(0, 1).toUpperCase() + h.substr(1);
              break;
            }
          h || (h = 'WebkitOpacity' in k && 'webkit');
          m = !!('transition' in k || h + 'Transition' in k);
          n = !!('animation' in k || h + 'Animation' in k);
          !d || m && n || (m = w(g.body.style.webkitTransition), n = w(g.body.style.webkitAnimation));
        }
        return {
          history: !(!b.history || !b.history.pushState || 4 > d || e),
          hashchange: 'onhashchange' in b && (!f || 7 < f),
          hasEvent: function (a) {
            if ('input' == a && 9 == S)
              return !1;
            if (E(c[a])) {
              var b = g.createElement('div');
              c[a] = 'on' + a in b;
            }
            return c[a];
          },
          csp: Vb(),
          vendorPrefix: h,
          transitions: m,
          animations: n,
          android: d,
          msie: S,
          msieDocumentMode: f
        };
      }
    ];
  }
  function de() {
    this.$get = [
      '$rootScope',
      '$browser',
      '$q',
      '$exceptionHandler',
      function (b, a, c, d) {
        function e(e, h, l) {
          var k = c.defer(), m = k.promise, n = B(l) && !l;
          h = a.defer(function () {
            try {
              k.resolve(e());
            } catch (a) {
              k.reject(a), d(a);
            } finally {
              delete g[m.$$timeoutId];
            }
            n || b.$apply();
          }, h);
          m.$$timeoutId = h;
          g[h] = k;
          return m;
        }
        var g = {};
        e.cancel = function (b) {
          return b && b.$$timeoutId in g ? (g[b.$$timeoutId].reject('canceled'), delete g[b.$$timeoutId], a.defer.cancel(b.$$timeoutId)) : !1;
        };
        return e;
      }
    ];
  }
  function sa(b, a) {
    var c = b;
    S && (W.setAttribute('href', c), c = W.href);
    W.setAttribute('href', c);
    return {
      href: W.href,
      protocol: W.protocol ? W.protocol.replace(/:$/, '') : '',
      host: W.host,
      search: W.search ? W.search.replace(/^\?/, '') : '',
      hash: W.hash ? W.hash.replace(/^#/, '') : '',
      hostname: W.hostname,
      port: W.port,
      pathname: '/' === W.pathname.charAt(0) ? W.pathname : '/' + W.pathname
    };
  }
  function Ib(b) {
    b = w(b) ? sa(b) : b;
    return b.protocol === Hc.protocol && b.host === Hc.host;
  }
  function ee() {
    this.$get = aa(O);
  }
  function gc(b) {
    function a(d, e) {
      if (X(d)) {
        var g = {};
        q(d, function (b, c) {
          g[c] = a(c, b);
        });
        return g;
      }
      return b.factory(d + c, e);
    }
    var c = 'Filter';
    this.register = a;
    this.$get = [
      '$injector',
      function (a) {
        return function (b) {
          return a.get(b + c);
        };
      }
    ];
    a('currency', Ic);
    a('date', Jc);
    a('filter', Be);
    a('json', Ce);
    a('limitTo', De);
    a('lowercase', Ee);
    a('number', Kc);
    a('orderBy', Lc);
    a('uppercase', Fe);
  }
  function Be() {
    return function (b, a, c) {
      if (!M(b))
        return b;
      var d = typeof c, e = [];
      e.check = function (a) {
        for (var b = 0; b < e.length; b++)
          if (!e[b](a))
            return !1;
        return !0;
      };
      'function' !== d && (c = 'boolean' === d && c ? function (a, b) {
        return Ea.equals(a, b);
      } : function (a, b) {
        if (a && b && 'object' === typeof a && 'object' === typeof b) {
          for (var d in a)
            if ('$' !== d.charAt(0) && Fc.call(a, d) && c(a[d], b[d]))
              return !0;
          return !1;
        }
        b = ('' + b).toLowerCase();
        return -1 < ('' + a).toLowerCase().indexOf(b);
      });
      var g = function (a, b) {
        if ('string' == typeof b && '!' === b.charAt(0))
          return !g(a, b.substr(1));
        switch (typeof a) {
        case 'boolean':
        case 'number':
        case 'string':
          return c(a, b);
        case 'object':
          switch (typeof b) {
          case 'object':
            return c(a, b);
          default:
            for (var d in a)
              if ('$' !== d.charAt(0) && g(a[d], b))
                return !0;
          }
          return !1;
        case 'array':
          for (d = 0; d < a.length; d++)
            if (g(a[d], b))
              return !0;
          return !1;
        default:
          return !1;
        }
      };
      switch (typeof a) {
      case 'boolean':
      case 'number':
      case 'string':
        a = { $: a };
      case 'object':
        for (var f in a)
          (function (b) {
            'undefined' != typeof a[b] && e.push(function (c) {
              return g('$' == b ? c : c && c[b], a[b]);
            });
          }(f));
        break;
      case 'function':
        e.push(a);
        break;
      default:
        return b;
      }
      d = [];
      for (f = 0; f < b.length; f++) {
        var h = b[f];
        e.check(h) && d.push(h);
      }
      return d;
    };
  }
  function Ic(b) {
    var a = b.NUMBER_FORMATS;
    return function (b, d) {
      E(d) && (d = a.CURRENCY_SYM);
      return Mc(b, a.PATTERNS[1], a.GROUP_SEP, a.DECIMAL_SEP, 2).replace(/\u00A4/g, d);
    };
  }
  function Kc(b) {
    var a = b.NUMBER_FORMATS;
    return function (b, d) {
      return Mc(b, a.PATTERNS[0], a.GROUP_SEP, a.DECIMAL_SEP, d);
    };
  }
  function Mc(b, a, c, d, e) {
    if (null == b || !isFinite(b) || X(b))
      return '';
    var g = 0 > b;
    b = Math.abs(b);
    var f = b + '', h = '', l = [], k = !1;
    if (-1 !== f.indexOf('e')) {
      var m = f.match(/([\d\.]+)e(-?)(\d+)/);
      m && '-' == m[2] && m[3] > e + 1 ? f = '0' : (h = f, k = !0);
    }
    if (k)
      0 < e && (-1 < b && 1 > b) && (h = b.toFixed(e));
    else {
      f = (f.split(Nc)[1] || '').length;
      E(e) && (e = Math.min(Math.max(a.minFrac, f), a.maxFrac));
      f = Math.pow(10, e);
      b = Math.round(b * f) / f;
      b = ('' + b).split(Nc);
      f = b[0];
      b = b[1] || '';
      var m = 0, n = a.lgSize, p = a.gSize;
      if (f.length >= n + p)
        for (m = f.length - n, k = 0; k < m; k++)
          0 === (m - k) % p && 0 !== k && (h += c), h += f.charAt(k);
      for (k = m; k < f.length; k++)
        0 === (f.length - k) % n && 0 !== k && (h += c), h += f.charAt(k);
      for (; b.length < e;)
        b += '0';
      e && '0' !== e && (h += d + b.substr(0, e));
    }
    l.push(g ? a.negPre : a.posPre);
    l.push(h);
    l.push(g ? a.negSuf : a.posSuf);
    return l.join('');
  }
  function Ob(b, a, c) {
    var d = '';
    0 > b && (d = '-', b = -b);
    for (b = '' + b; b.length < a;)
      b = '0' + b;
    c && (b = b.substr(b.length - a));
    return d + b;
  }
  function $(b, a, c, d) {
    c = c || 0;
    return function (e) {
      e = e['get' + b]();
      if (0 < c || e > -c)
        e += c;
      0 === e && -12 == c && (e = 12);
      return Ob(e, a, d);
    };
  }
  function pb(b, a) {
    return function (c, d) {
      var e = c['get' + b](), g = Fa(a ? 'SHORT' + b : b);
      return d[g][e];
    };
  }
  function Jc(b) {
    function a(a) {
      var b;
      if (b = a.match(c)) {
        a = new Date(0);
        var g = 0, f = 0, h = b[8] ? a.setUTCFullYear : a.setFullYear, l = b[8] ? a.setUTCHours : a.setHours;
        b[9] && (g = Y(b[9] + b[10]), f = Y(b[9] + b[11]));
        h.call(a, Y(b[1]), Y(b[2]) - 1, Y(b[3]));
        g = Y(b[4] || 0) - g;
        f = Y(b[5] || 0) - f;
        h = Y(b[6] || 0);
        b = Math.round(1000 * parseFloat('0.' + (b[7] || 0)));
        l.call(a, g, f, h, b);
      }
      return a;
    }
    var c = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
    return function (c, e) {
      var g = '', f = [], h, l;
      e = e || 'mediumDate';
      e = b.DATETIME_FORMATS[e] || e;
      w(c) && (c = Ge.test(c) ? Y(c) : a(c));
      vb(c) && (c = new Date(c));
      if (!Na(c))
        return c;
      for (; e;)
        (l = He.exec(e)) ? (f = f.concat(ya.call(l, 1)), e = f.pop()) : (f.push(e), e = null);
      q(f, function (a) {
        h = Ie[a];
        g += h ? h(c, b.DATETIME_FORMATS) : a.replace(/(^'|'$)/g, '').replace(/''/g, '\'');
      });
      return g;
    };
  }
  function Ce() {
    return function (b) {
      return qa(b, !0);
    };
  }
  function De() {
    return function (b, a) {
      if (!M(b) && !w(b))
        return b;
      a = Y(a);
      if (w(b))
        return a ? 0 <= a ? b.slice(0, a) : b.slice(a, b.length) : '';
      var c = [], d, e;
      a > b.length ? a = b.length : a < -b.length && (a = -b.length);
      0 < a ? (d = 0, e = a) : (d = b.length + a, e = b.length);
      for (; d < e; d++)
        c.push(b[d]);
      return c;
    };
  }
  function Lc(b) {
    return function (a, c, d) {
      function e(a, b) {
        return Qa(b) ? function (b, c) {
          return a(c, b);
        } : a;
      }
      function g(a, b) {
        var c = typeof a, d = typeof b;
        return c == d ? ('string' == c && (a = a.toLowerCase(), b = b.toLowerCase()), a === b ? 0 : a < b ? -1 : 1) : c < d ? -1 : 1;
      }
      if (!M(a) || !c)
        return a;
      c = M(c) ? c : [c];
      c = Uc(c, function (a) {
        var c = !1, d = a || Da;
        if (w(a)) {
          if ('+' == a.charAt(0) || '-' == a.charAt(0))
            c = '-' == a.charAt(0), a = a.substring(1);
          d = b(a);
          if (d.constant) {
            var f = d();
            return e(function (a, b) {
              return g(a[f], b[f]);
            }, c);
          }
        }
        return e(function (a, b) {
          return g(d(a), d(b));
        }, c);
      });
      for (var f = [], h = 0; h < a.length; h++)
        f.push(a[h]);
      return f.sort(e(function (a, b) {
        for (var d = 0; d < c.length; d++) {
          var e = c[d](a, b);
          if (0 !== e)
            return e;
        }
        return 0;
      }, d));
    };
  }
  function va(b) {
    P(b) && (b = { link: b });
    b.restrict = b.restrict || 'AC';
    return aa(b);
  }
  function Oc(b, a, c, d) {
    function e(a, c) {
      c = c ? '-' + fb(c, '-') : '';
      d.removeClass(b, (a ? qb : rb) + c);
      d.addClass(b, (a ? rb : qb) + c);
    }
    var g = this, f = b.parent().controller('form') || sb, h = 0, l = g.$error = {}, k = [];
    g.$name = a.name || a.ngForm;
    g.$dirty = !1;
    g.$pristine = !0;
    g.$valid = !0;
    g.$invalid = !1;
    f.$addControl(g);
    b.addClass(La);
    e(!0);
    g.$addControl = function (a) {
      Aa(a.$name, 'input');
      k.push(a);
      a.$name && (g[a.$name] = a);
    };
    g.$removeControl = function (a) {
      a.$name && g[a.$name] === a && delete g[a.$name];
      q(l, function (b, c) {
        g.$setValidity(c, !0, a);
      });
      Oa(k, a);
    };
    g.$setValidity = function (a, b, c) {
      var d = l[a];
      if (b)
        d && (Oa(d, c), d.length || (h--, h || (e(b), g.$valid = !0, g.$invalid = !1), l[a] = !1, e(!0, a), f.$setValidity(a, !0, g)));
      else {
        h || e(b);
        if (d) {
          if (-1 != db(d, c))
            return;
        } else
          l[a] = d = [], h++, e(!1, a), f.$setValidity(a, !1, g);
        d.push(c);
        g.$valid = !1;
        g.$invalid = !0;
      }
    };
    g.$setDirty = function () {
      d.removeClass(b, La);
      d.addClass(b, tb);
      g.$dirty = !0;
      g.$pristine = !1;
      f.$setDirty();
    };
    g.$setPristine = function () {
      d.removeClass(b, tb);
      d.addClass(b, La);
      g.$dirty = !1;
      g.$pristine = !0;
      q(k, function (a) {
        a.$setPristine();
      });
    };
  }
  function pa(b, a, c, d) {
    b.$setValidity(a, c);
    return c ? d : s;
  }
  function Je(b, a, c) {
    var d = c.prop('validity');
    X(d) && b.$parsers.push(function (c) {
      if (b.$error[a] || !(d.badInput || d.customError || d.typeMismatch) || d.valueMissing)
        return c;
      b.$setValidity(a, !1);
    });
  }
  function ub(b, a, c, d, e, g) {
    var f = a.prop('validity');
    if (!e.android) {
      var h = !1;
      a.on('compositionstart', function (a) {
        h = !0;
      });
      a.on('compositionend', function () {
        h = !1;
        l();
      });
    }
    var l = function () {
      if (!h) {
        var e = a.val();
        Qa(c.ngTrim || 'T') && (e = ca(e));
        if (d.$viewValue !== e || f && '' === e && !f.valueMissing)
          b.$$phase ? d.$setViewValue(e) : b.$apply(function () {
            d.$setViewValue(e);
          });
      }
    };
    if (e.hasEvent('input'))
      a.on('input', l);
    else {
      var k, m = function () {
          k || (k = g.defer(function () {
            l();
            k = null;
          }));
        };
      a.on('keydown', function (a) {
        a = a.keyCode;
        91 === a || (15 < a && 19 > a || 37 <= a && 40 >= a) || m();
      });
      if (e.hasEvent('paste'))
        a.on('paste cut', m);
    }
    a.on('change', l);
    d.$render = function () {
      a.val(d.$isEmpty(d.$viewValue) ? '' : d.$viewValue);
    };
    var n = c.ngPattern;
    n && ((e = n.match(/^\/(.*)\/([gim]*)$/)) ? (n = RegExp(e[1], e[2]), e = function (a) {
      return pa(d, 'pattern', d.$isEmpty(a) || n.test(a), a);
    }) : e = function (c) {
      var e = b.$eval(n);
      if (!e || !e.test)
        throw t('ngPattern')('noregexp', n, e, ha(a));
      return pa(d, 'pattern', d.$isEmpty(c) || e.test(c), c);
    }, d.$formatters.push(e), d.$parsers.push(e));
    if (c.ngMinlength) {
      var p = Y(c.ngMinlength);
      e = function (a) {
        return pa(d, 'minlength', d.$isEmpty(a) || a.length >= p, a);
      };
      d.$parsers.push(e);
      d.$formatters.push(e);
    }
    if (c.ngMaxlength) {
      var r = Y(c.ngMaxlength);
      e = function (a) {
        return pa(d, 'maxlength', d.$isEmpty(a) || a.length <= r, a);
      };
      d.$parsers.push(e);
      d.$formatters.push(e);
    }
  }
  function Pb(b, a) {
    b = 'ngClass' + b;
    return [
      '$animate',
      function (c) {
        function d(a, b) {
          var c = [], d = 0;
          a:
            for (; d < a.length; d++) {
              for (var e = a[d], m = 0; m < b.length; m++)
                if (e == b[m])
                  continue a;
              c.push(e);
            }
          return c;
        }
        function e(a) {
          if (!M(a)) {
            if (w(a))
              return a.split(' ');
            if (X(a)) {
              var b = [];
              q(a, function (a, c) {
                a && b.push(c);
              });
              return b;
            }
          }
          return a;
        }
        return {
          restrict: 'AC',
          link: function (g, f, h) {
            function l(a, b) {
              var c = f.data('$classCounts') || {}, d = [];
              q(a, function (a) {
                if (0 < b || c[a])
                  c[a] = (c[a] || 0) + b, c[a] === +(0 < b) && d.push(a);
              });
              f.data('$classCounts', c);
              return d.join(' ');
            }
            function k(b) {
              if (!0 === a || g.$index % 2 === a) {
                var k = e(b || []);
                if (!m) {
                  var r = l(k, 1);
                  h.$addClass(r);
                } else if (!xa(b, m)) {
                  var q = e(m), r = d(k, q), k = d(q, k), k = l(k, -1), r = l(r, 1);
                  0 === r.length ? c.removeClass(f, k) : 0 === k.length ? c.addClass(f, r) : c.setClass(f, r, k);
                }
              }
              m = ba(b);
            }
            var m;
            g.$watch(h[b], k, !0);
            h.$observe('class', function (a) {
              k(g.$eval(h[b]));
            });
            'ngClass' !== b && g.$watch('$index', function (c, d) {
              var f = c & 1;
              if (f !== d & 1) {
                var k = e(g.$eval(h[b]));
                f === a ? (f = l(k, 1), h.$addClass(f)) : (f = l(k, -1), h.$removeClass(f));
              }
            });
          }
        };
      }
    ];
  }
  var K = function (b) {
      return w(b) ? b.toLowerCase() : b;
    }, Fc = Object.prototype.hasOwnProperty, Fa = function (b) {
      return w(b) ? b.toUpperCase() : b;
    }, S, y, Ga, ya = [].slice, Ke = [].push, wa = Object.prototype.toString, Pa = t('ng'), Ea = O.angular || (O.angular = {}), Sa, Ka, ka = [
      '0',
      '0',
      '0'
    ];
  S = Y((/msie (\d+)/.exec(K(navigator.userAgent)) || [])[1]);
  isNaN(S) && (S = Y((/trident\/.*; rv:(\d+)/.exec(K(navigator.userAgent)) || [])[1]));
  C.$inject = [];
  Da.$inject = [];
  var ca = function () {
      return String.prototype.trim ? function (b) {
        return w(b) ? b.trim() : b;
      } : function (b) {
        return w(b) ? b.replace(/^\s\s*/, '').replace(/\s\s*$/, '') : b;
      };
    }();
  Ka = 9 > S ? function (b) {
    b = b.nodeName ? b : b[0];
    return b.scopeName && 'HTML' != b.scopeName ? Fa(b.scopeName + ':' + b.nodeName) : b.nodeName;
  } : function (b) {
    return b.nodeName ? b.nodeName : b[0].nodeName;
  };
  var Xc = /[A-Z]/g, $c = {
      full: '1.2.16',
      major: 1,
      minor: 2,
      dot: 16,
      codeName: 'badger-enumeration'
    }, Ua = N.cache = {}, gb = N.expando = 'ng-' + new Date().getTime(), me = 1, Pc = O.document.addEventListener ? function (b, a, c) {
      b.addEventListener(a, c, !1);
    } : function (b, a, c) {
      b.attachEvent('on' + a, c);
    }, Fb = O.document.removeEventListener ? function (b, a, c) {
      b.removeEventListener(a, c, !1);
    } : function (b, a, c) {
      b.detachEvent('on' + a, c);
    };
  N._data = function (b) {
    return this.cache[b[this.expando]] || {};
  };
  var he = /([\:\-\_]+(.))/g, ie = /^moz([A-Z])/, Bb = t('jqLite'), je = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, Cb = /<|&#?\w+;/, ke = /<([\w:]+)/, le = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, ea = {
      option: [
        1,
        '<select multiple="multiple">',
        '</select>'
      ],
      thead: [
        1,
        '<table>',
        '</table>'
      ],
      col: [
        2,
        '<table><colgroup>',
        '</colgroup></table>'
      ],
      tr: [
        2,
        '<table><tbody>',
        '</tbody></table>'
      ],
      td: [
        3,
        '<table><tbody><tr>',
        '</tr></tbody></table>'
      ],
      _default: [
        0,
        '',
        ''
      ]
    };
  ea.optgroup = ea.option;
  ea.tbody = ea.tfoot = ea.colgroup = ea.caption = ea.thead;
  ea.th = ea.td;
  var Ja = N.prototype = {
      ready: function (b) {
        function a() {
          c || (c = !0, b());
        }
        var c = !1;
        'complete' === U.readyState ? setTimeout(a) : (this.on('DOMContentLoaded', a), N(O).on('load', a));
      },
      toString: function () {
        var b = [];
        q(this, function (a) {
          b.push('' + a);
        });
        return '[' + b.join(', ') + ']';
      },
      eq: function (b) {
        return 0 <= b ? y(this[b]) : y(this[this.length + b]);
      },
      length: 0,
      push: Ke,
      sort: [].sort,
      splice: [].splice
    }, kb = {};
  q('multiple selected checked disabled readOnly required open'.split(' '), function (b) {
    kb[K(b)] = b;
  });
  var nc = {};
  q('input select option textarea button form details'.split(' '), function (b) {
    nc[Fa(b)] = !0;
  });
  q({
    data: jc,
    inheritedData: jb,
    scope: function (b) {
      return y(b).data('$scope') || jb(b.parentNode || b, [
        '$isolateScope',
        '$scope'
      ]);
    },
    isolateScope: function (b) {
      return y(b).data('$isolateScope') || y(b).data('$isolateScopeNoTemplate');
    },
    controller: kc,
    injector: function (b) {
      return jb(b, '$injector');
    },
    removeAttr: function (b, a) {
      b.removeAttribute(a);
    },
    hasClass: Gb,
    css: function (b, a, c) {
      a = Ta(a);
      if (B(c))
        b.style[a] = c;
      else {
        var d;
        8 >= S && (d = b.currentStyle && b.currentStyle[a], '' === d && (d = 'auto'));
        d = d || b.style[a];
        8 >= S && (d = '' === d ? s : d);
        return d;
      }
    },
    attr: function (b, a, c) {
      var d = K(a);
      if (kb[d])
        if (B(c))
          c ? (b[a] = !0, b.setAttribute(a, d)) : (b[a] = !1, b.removeAttribute(d));
        else
          return b[a] || (b.attributes.getNamedItem(a) || C).specified ? d : s;
      else if (B(c))
        b.setAttribute(a, c);
      else if (b.getAttribute)
        return b = b.getAttribute(a, 2), null === b ? s : b;
    },
    prop: function (b, a, c) {
      if (B(c))
        b[a] = c;
      else
        return b[a];
    },
    text: function () {
      function b(b, d) {
        var e = a[b.nodeType];
        if (E(d))
          return e ? b[e] : '';
        b[e] = d;
      }
      var a = [];
      9 > S ? (a[1] = 'innerText', a[3] = 'nodeValue') : a[1] = a[3] = 'textContent';
      b.$dv = '';
      return b;
    }(),
    val: function (b, a) {
      if (E(a)) {
        if ('SELECT' === Ka(b) && b.multiple) {
          var c = [];
          q(b.options, function (a) {
            a.selected && c.push(a.value || a.text);
          });
          return 0 === c.length ? null : c;
        }
        return b.value;
      }
      b.value = a;
    },
    html: function (b, a) {
      if (E(a))
        return b.innerHTML;
      for (var c = 0, d = b.childNodes; c < d.length; c++)
        Ha(d[c]);
      b.innerHTML = a;
    },
    empty: lc
  }, function (b, a) {
    N.prototype[a] = function (a, d) {
      var e, g;
      if (b !== lc && (2 == b.length && b !== Gb && b !== kc ? a : d) === s) {
        if (X(a)) {
          for (e = 0; e < this.length; e++)
            if (b === jc)
              b(this[e], a);
            else
              for (g in a)
                b(this[e], g, a[g]);
          return this;
        }
        e = b.$dv;
        g = e === s ? Math.min(this.length, 1) : this.length;
        for (var f = 0; f < g; f++) {
          var h = b(this[f], a, d);
          e = e ? e + h : h;
        }
        return e;
      }
      for (e = 0; e < this.length; e++)
        b(this[e], a, d);
      return this;
    };
  });
  q({
    removeData: hc,
    dealoc: Ha,
    on: function a(c, d, e, g) {
      if (B(g))
        throw Bb('onargs');
      var f = la(c, 'events'), h = la(c, 'handle');
      f || la(c, 'events', f = {});
      h || la(c, 'handle', h = ne(c, f));
      q(d.split(' '), function (d) {
        var g = f[d];
        if (!g) {
          if ('mouseenter' == d || 'mouseleave' == d) {
            var m = U.body.contains || U.body.compareDocumentPosition ? function (a, c) {
                var d = 9 === a.nodeType ? a.documentElement : a, e = c && c.parentNode;
                return a === e || !!(e && 1 === e.nodeType && (d.contains ? d.contains(e) : a.compareDocumentPosition && a.compareDocumentPosition(e) & 16));
              } : function (a, c) {
                if (c)
                  for (; c = c.parentNode;)
                    if (c === a)
                      return !0;
                return !1;
              };
            f[d] = [];
            a(c, {
              mouseleave: 'mouseout',
              mouseenter: 'mouseover'
            }[d], function (a) {
              var c = a.relatedTarget;
              c && (c === this || m(this, c)) || h(a, d);
            });
          } else
            Pc(c, d, h), f[d] = [];
          g = f[d];
        }
        g.push(e);
      });
    },
    off: ic,
    one: function (a, c, d) {
      a = y(a);
      a.on(c, function g() {
        a.off(c, d);
        a.off(c, g);
      });
      a.on(c, d);
    },
    replaceWith: function (a, c) {
      var d, e = a.parentNode;
      Ha(a);
      q(new N(c), function (c) {
        d ? e.insertBefore(c, d.nextSibling) : e.replaceChild(c, a);
        d = c;
      });
    },
    children: function (a) {
      var c = [];
      q(a.childNodes, function (a) {
        1 === a.nodeType && c.push(a);
      });
      return c;
    },
    contents: function (a) {
      return a.contentDocument || a.childNodes || [];
    },
    append: function (a, c) {
      q(new N(c), function (c) {
        1 !== a.nodeType && 11 !== a.nodeType || a.appendChild(c);
      });
    },
    prepend: function (a, c) {
      if (1 === a.nodeType) {
        var d = a.firstChild;
        q(new N(c), function (c) {
          a.insertBefore(c, d);
        });
      }
    },
    wrap: function (a, c) {
      c = y(c)[0];
      var d = a.parentNode;
      d && d.replaceChild(c, a);
      c.appendChild(a);
    },
    remove: function (a) {
      Ha(a);
      var c = a.parentNode;
      c && c.removeChild(a);
    },
    after: function (a, c) {
      var d = a, e = a.parentNode;
      q(new N(c), function (a) {
        e.insertBefore(a, d.nextSibling);
        d = a;
      });
    },
    addClass: ib,
    removeClass: hb,
    toggleClass: function (a, c, d) {
      c && q(c.split(' '), function (c) {
        var g = d;
        E(g) && (g = !Gb(a, c));
        (g ? ib : hb)(a, c);
      });
    },
    parent: function (a) {
      return (a = a.parentNode) && 11 !== a.nodeType ? a : null;
    },
    next: function (a) {
      if (a.nextElementSibling)
        return a.nextElementSibling;
      for (a = a.nextSibling; null != a && 1 !== a.nodeType;)
        a = a.nextSibling;
      return a;
    },
    find: function (a, c) {
      return a.getElementsByTagName ? a.getElementsByTagName(c) : [];
    },
    clone: Eb,
    triggerHandler: function (a, c, d) {
      c = (la(a, 'events') || {})[c];
      d = d || [];
      var e = [{
            preventDefault: C,
            stopPropagation: C
          }];
      q(c, function (c) {
        c.apply(a, e.concat(d));
      });
    }
  }, function (a, c) {
    N.prototype[c] = function (c, e, g) {
      for (var f, h = 0; h < this.length; h++)
        E(f) ? (f = a(this[h], c, e, g), B(f) && (f = y(f))) : Db(f, a(this[h], c, e, g));
      return B(f) ? f : this;
    };
    N.prototype.bind = N.prototype.on;
    N.prototype.unbind = N.prototype.off;
  });
  Va.prototype = {
    put: function (a, c) {
      this[Ia(a)] = c;
    },
    get: function (a) {
      return this[Ia(a)];
    },
    remove: function (a) {
      var c = this[a = Ia(a)];
      delete this[a];
      return c;
    }
  };
  var pe = /^function\s*[^\(]*\(\s*([^\)]*)\)/m, qe = /,/, re = /^\s*(_?)(\S+?)\1\s*$/, oe = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm, Wa = t('$injector'), Le = t('$animate'), Ld = [
      '$provide',
      function (a) {
        this.$$selectors = {};
        this.register = function (c, d) {
          var e = c + '-animation';
          if (c && '.' != c.charAt(0))
            throw Le('notcsel', c);
          this.$$selectors[c.substr(1)] = e;
          a.factory(e, d);
        };
        this.classNameFilter = function (a) {
          1 === arguments.length && (this.$$classNameFilter = a instanceof RegExp ? a : null);
          return this.$$classNameFilter;
        };
        this.$get = [
          '$timeout',
          '$$asyncCallback',
          function (a, d) {
            return {
              enter: function (a, c, f, h) {
                f ? f.after(a) : (c && c[0] || (c = f.parent()), c.append(a));
                h && d(h);
              },
              leave: function (a, c) {
                a.remove();
                c && d(c);
              },
              move: function (a, c, d, h) {
                this.enter(a, c, d, h);
              },
              addClass: function (a, c, f) {
                c = w(c) ? c : M(c) ? c.join(' ') : '';
                q(a, function (a) {
                  ib(a, c);
                });
                f && d(f);
              },
              removeClass: function (a, c, f) {
                c = w(c) ? c : M(c) ? c.join(' ') : '';
                q(a, function (a) {
                  hb(a, c);
                });
                f && d(f);
              },
              setClass: function (a, c, f, h) {
                q(a, function (a) {
                  ib(a, c);
                  hb(a, f);
                });
                h && d(h);
              },
              enabled: C
            };
          }
        ];
      }
    ], ja = t('$compile');
  cc.$inject = [
    '$provide',
    '$$sanitizeUriProvider'
  ];
  var te = /^(x[\:\-_]|data[\:\-_])/i, vc = t('$interpolate'), Me = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/, we = {
      http: 80,
      https: 443,
      ftp: 21
    }, Kb = t('$location');
  Ac.prototype = Lb.prototype = zc.prototype = {
    $$html5: !1,
    $$replace: !1,
    absUrl: nb('$$absUrl'),
    url: function (a, c) {
      if (E(a))
        return this.$$url;
      var d = Me.exec(a);
      d[1] && this.path(decodeURIComponent(d[1]));
      (d[2] || d[1]) && this.search(d[3] || '');
      this.hash(d[5] || '', c);
      return this;
    },
    protocol: nb('$$protocol'),
    host: nb('$$host'),
    port: nb('$$port'),
    path: Bc('$$path', function (a) {
      return '/' == a.charAt(0) ? a : '/' + a;
    }),
    search: function (a, c) {
      switch (arguments.length) {
      case 0:
        return this.$$search;
      case 1:
        if (w(a))
          this.$$search = Yb(a);
        else if (X(a))
          this.$$search = a;
        else
          throw Kb('isrcharg');
        break;
      default:
        E(c) || null === c ? delete this.$$search[a] : this.$$search[a] = c;
      }
      this.$$compose();
      return this;
    },
    hash: Bc('$$hash', Da),
    replace: function () {
      this.$$replace = !0;
      return this;
    }
  };
  var Ba = t('$parse'), Ec = {}, ta, Ma = {
      'null': function () {
        return null;
      },
      'true': function () {
        return !0;
      },
      'false': function () {
        return !1;
      },
      undefined: C,
      '+': function (a, c, d, e) {
        d = d(a, c);
        e = e(a, c);
        return B(d) ? B(e) ? d + e : d : B(e) ? e : s;
      },
      '-': function (a, c, d, e) {
        d = d(a, c);
        e = e(a, c);
        return (B(d) ? d : 0) - (B(e) ? e : 0);
      },
      '*': function (a, c, d, e) {
        return d(a, c) * e(a, c);
      },
      '/': function (a, c, d, e) {
        return d(a, c) / e(a, c);
      },
      '%': function (a, c, d, e) {
        return d(a, c) % e(a, c);
      },
      '^': function (a, c, d, e) {
        return d(a, c) ^ e(a, c);
      },
      '=': C,
      '===': function (a, c, d, e) {
        return d(a, c) === e(a, c);
      },
      '!==': function (a, c, d, e) {
        return d(a, c) !== e(a, c);
      },
      '==': function (a, c, d, e) {
        return d(a, c) == e(a, c);
      },
      '!=': function (a, c, d, e) {
        return d(a, c) != e(a, c);
      },
      '<': function (a, c, d, e) {
        return d(a, c) < e(a, c);
      },
      '>': function (a, c, d, e) {
        return d(a, c) > e(a, c);
      },
      '<=': function (a, c, d, e) {
        return d(a, c) <= e(a, c);
      },
      '>=': function (a, c, d, e) {
        return d(a, c) >= e(a, c);
      },
      '&&': function (a, c, d, e) {
        return d(a, c) && e(a, c);
      },
      '||': function (a, c, d, e) {
        return d(a, c) || e(a, c);
      },
      '&': function (a, c, d, e) {
        return d(a, c) & e(a, c);
      },
      '|': function (a, c, d, e) {
        return e(a, c)(a, c, d(a, c));
      },
      '!': function (a, c, d) {
        return !d(a, c);
      }
    }, Ne = {
      n: '\n',
      f: '\f',
      r: '\r',
      t: '\t',
      v: '\x0B',
      '\'': '\'',
      '"': '"'
    }, Nb = function (a) {
      this.options = a;
    };
  Nb.prototype = {
    constructor: Nb,
    lex: function (a) {
      this.text = a;
      this.index = 0;
      this.ch = s;
      this.lastCh = ':';
      this.tokens = [];
      var c;
      for (a = []; this.index < this.text.length;) {
        this.ch = this.text.charAt(this.index);
        if (this.is('"\''))
          this.readString(this.ch);
        else if (this.isNumber(this.ch) || this.is('.') && this.isNumber(this.peek()))
          this.readNumber();
        else if (this.isIdent(this.ch))
          this.readIdent(), this.was('{,') && ('{' === a[0] && (c = this.tokens[this.tokens.length - 1])) && (c.json = -1 === c.text.indexOf('.'));
        else if (this.is('(){}[].,;:?'))
          this.tokens.push({
            index: this.index,
            text: this.ch,
            json: this.was(':[,') && this.is('{[') || this.is('}]:,')
          }), this.is('{[') && a.unshift(this.ch), this.is('}]') && a.shift(), this.index++;
        else if (this.isWhitespace(this.ch)) {
          this.index++;
          continue;
        } else {
          var d = this.ch + this.peek(), e = d + this.peek(2), g = Ma[this.ch], f = Ma[d], h = Ma[e];
          h ? (this.tokens.push({
            index: this.index,
            text: e,
            fn: h
          }), this.index += 3) : f ? (this.tokens.push({
            index: this.index,
            text: d,
            fn: f
          }), this.index += 2) : g ? (this.tokens.push({
            index: this.index,
            text: this.ch,
            fn: g,
            json: this.was('[,:') && this.is('+-')
          }), this.index += 1) : this.throwError('Unexpected next character ', this.index, this.index + 1);
        }
        this.lastCh = this.ch;
      }
      return this.tokens;
    },
    is: function (a) {
      return -1 !== a.indexOf(this.ch);
    },
    was: function (a) {
      return -1 !== a.indexOf(this.lastCh);
    },
    peek: function (a) {
      a = a || 1;
      return this.index + a < this.text.length ? this.text.charAt(this.index + a) : !1;
    },
    isNumber: function (a) {
      return '0' <= a && '9' >= a;
    },
    isWhitespace: function (a) {
      return ' ' === a || '\r' === a || '\t' === a || '\n' === a || '\x0B' === a || '\xa0' === a;
    },
    isIdent: function (a) {
      return 'a' <= a && 'z' >= a || 'A' <= a && 'Z' >= a || '_' === a || '$' === a;
    },
    isExpOperator: function (a) {
      return '-' === a || '+' === a || this.isNumber(a);
    },
    throwError: function (a, c, d) {
      d = d || this.index;
      c = B(c) ? 's ' + c + '-' + this.index + ' [' + this.text.substring(c, d) + ']' : ' ' + d;
      throw Ba('lexerr', a, c, this.text);
    },
    readNumber: function () {
      for (var a = '', c = this.index; this.index < this.text.length;) {
        var d = K(this.text.charAt(this.index));
        if ('.' == d || this.isNumber(d))
          a += d;
        else {
          var e = this.peek();
          if ('e' == d && this.isExpOperator(e))
            a += d;
          else if (this.isExpOperator(d) && e && this.isNumber(e) && 'e' == a.charAt(a.length - 1))
            a += d;
          else if (!this.isExpOperator(d) || e && this.isNumber(e) || 'e' != a.charAt(a.length - 1))
            break;
          else
            this.throwError('Invalid exponent');
        }
        this.index++;
      }
      a *= 1;
      this.tokens.push({
        index: c,
        text: a,
        json: !0,
        fn: function () {
          return a;
        }
      });
    },
    readIdent: function () {
      for (var a = this, c = '', d = this.index, e, g, f, h; this.index < this.text.length;) {
        h = this.text.charAt(this.index);
        if ('.' === h || this.isIdent(h) || this.isNumber(h))
          '.' === h && (e = this.index), c += h;
        else
          break;
        this.index++;
      }
      if (e)
        for (g = this.index; g < this.text.length;) {
          h = this.text.charAt(g);
          if ('(' === h) {
            f = c.substr(e - d + 1);
            c = c.substr(0, e - d);
            this.index = g;
            break;
          }
          if (this.isWhitespace(h))
            g++;
          else
            break;
        }
      d = {
        index: d,
        text: c
      };
      if (Ma.hasOwnProperty(c))
        d.fn = Ma[c], d.json = Ma[c];
      else {
        var l = Dc(c, this.options, this.text);
        d.fn = D(function (a, c) {
          return l(a, c);
        }, {
          assign: function (d, e) {
            return ob(d, c, e, a.text, a.options);
          }
        });
      }
      this.tokens.push(d);
      f && (this.tokens.push({
        index: e,
        text: '.',
        json: !1
      }), this.tokens.push({
        index: e + 1,
        text: f,
        json: !1
      }));
    },
    readString: function (a) {
      var c = this.index;
      this.index++;
      for (var d = '', e = a, g = !1; this.index < this.text.length;) {
        var f = this.text.charAt(this.index), e = e + f;
        if (g)
          'u' === f ? (f = this.text.substring(this.index + 1, this.index + 5), f.match(/[\da-f]{4}/i) || this.throwError('Invalid unicode escape [\\u' + f + ']'), this.index += 4, d += String.fromCharCode(parseInt(f, 16))) : d = (g = Ne[f]) ? d + g : d + f, g = !1;
        else if ('\\' === f)
          g = !0;
        else {
          if (f === a) {
            this.index++;
            this.tokens.push({
              index: c,
              text: e,
              string: d,
              json: !0,
              fn: function () {
                return d;
              }
            });
            return;
          }
          d += f;
        }
        this.index++;
      }
      this.throwError('Unterminated quote', c);
    }
  };
  var $a = function (a, c, d) {
    this.lexer = a;
    this.$filter = c;
    this.options = d;
  };
  $a.ZERO = D(function () {
    return 0;
  }, { constant: !0 });
  $a.prototype = {
    constructor: $a,
    parse: function (a, c) {
      this.text = a;
      this.json = c;
      this.tokens = this.lexer.lex(a);
      c && (this.assignment = this.logicalOR, this.functionCall = this.fieldAccess = this.objectIndex = this.filterChain = function () {
        this.throwError('is not valid json', {
          text: a,
          index: 0
        });
      });
      var d = c ? this.primary() : this.statements();
      0 !== this.tokens.length && this.throwError('is an unexpected token', this.tokens[0]);
      d.literal = !!d.literal;
      d.constant = !!d.constant;
      return d;
    },
    primary: function () {
      var a;
      if (this.expect('('))
        a = this.filterChain(), this.consume(')');
      else if (this.expect('['))
        a = this.arrayDeclaration();
      else if (this.expect('{'))
        a = this.object();
      else {
        var c = this.expect();
        (a = c.fn) || this.throwError('not a primary expression', c);
        c.json && (a.constant = !0, a.literal = !0);
      }
      for (var d; c = this.expect('(', '[', '.');)
        '(' === c.text ? (a = this.functionCall(a, d), d = null) : '[' === c.text ? (d = a, a = this.objectIndex(a)) : '.' === c.text ? (d = a, a = this.fieldAccess(a)) : this.throwError('IMPOSSIBLE');
      return a;
    },
    throwError: function (a, c) {
      throw Ba('syntax', c.text, a, c.index + 1, this.text, this.text.substring(c.index));
    },
    peekToken: function () {
      if (0 === this.tokens.length)
        throw Ba('ueoe', this.text);
      return this.tokens[0];
    },
    peek: function (a, c, d, e) {
      if (0 < this.tokens.length) {
        var g = this.tokens[0], f = g.text;
        if (f === a || f === c || f === d || f === e || !(a || c || d || e))
          return g;
      }
      return !1;
    },
    expect: function (a, c, d, e) {
      return (a = this.peek(a, c, d, e)) ? (this.json && !a.json && this.throwError('is not valid json', a), this.tokens.shift(), a) : !1;
    },
    consume: function (a) {
      this.expect(a) || this.throwError('is unexpected, expecting [' + a + ']', this.peek());
    },
    unaryFn: function (a, c) {
      return D(function (d, e) {
        return a(d, e, c);
      }, { constant: c.constant });
    },
    ternaryFn: function (a, c, d) {
      return D(function (e, g) {
        return a(e, g) ? c(e, g) : d(e, g);
      }, { constant: a.constant && c.constant && d.constant });
    },
    binaryFn: function (a, c, d) {
      return D(function (e, g) {
        return c(e, g, a, d);
      }, { constant: a.constant && d.constant });
    },
    statements: function () {
      for (var a = [];;)
        if (0 < this.tokens.length && !this.peek('}', ')', ';', ']') && a.push(this.filterChain()), !this.expect(';'))
          return 1 === a.length ? a[0] : function (c, d) {
            for (var e, g = 0; g < a.length; g++) {
              var f = a[g];
              f && (e = f(c, d));
            }
            return e;
          };
    },
    filterChain: function () {
      for (var a = this.expression(), c;;)
        if (c = this.expect('|'))
          a = this.binaryFn(a, c.fn, this.filter());
        else
          return a;
    },
    filter: function () {
      for (var a = this.expect(), c = this.$filter(a.text), d = [];;)
        if (a = this.expect(':'))
          d.push(this.expression());
        else {
          var e = function (a, e, h) {
            h = [h];
            for (var l = 0; l < d.length; l++)
              h.push(d[l](a, e));
            return c.apply(a, h);
          };
          return function () {
            return e;
          };
        }
    },
    expression: function () {
      return this.assignment();
    },
    assignment: function () {
      var a = this.ternary(), c, d;
      return (d = this.expect('=')) ? (a.assign || this.throwError('implies assignment but [' + this.text.substring(0, d.index) + '] can not be assigned to', d), c = this.ternary(), function (d, g) {
        return a.assign(d, c(d, g), g);
      }) : a;
    },
    ternary: function () {
      var a = this.logicalOR(), c, d;
      if (this.expect('?')) {
        c = this.ternary();
        if (d = this.expect(':'))
          return this.ternaryFn(a, c, this.ternary());
        this.throwError('expected :', d);
      } else
        return a;
    },
    logicalOR: function () {
      for (var a = this.logicalAND(), c;;)
        if (c = this.expect('||'))
          a = this.binaryFn(a, c.fn, this.logicalAND());
        else
          return a;
    },
    logicalAND: function () {
      var a = this.equality(), c;
      if (c = this.expect('&&'))
        a = this.binaryFn(a, c.fn, this.logicalAND());
      return a;
    },
    equality: function () {
      var a = this.relational(), c;
      if (c = this.expect('==', '!=', '===', '!=='))
        a = this.binaryFn(a, c.fn, this.equality());
      return a;
    },
    relational: function () {
      var a = this.additive(), c;
      if (c = this.expect('<', '>', '<=', '>='))
        a = this.binaryFn(a, c.fn, this.relational());
      return a;
    },
    additive: function () {
      for (var a = this.multiplicative(), c; c = this.expect('+', '-');)
        a = this.binaryFn(a, c.fn, this.multiplicative());
      return a;
    },
    multiplicative: function () {
      for (var a = this.unary(), c; c = this.expect('*', '/', '%');)
        a = this.binaryFn(a, c.fn, this.unary());
      return a;
    },
    unary: function () {
      var a;
      return this.expect('+') ? this.primary() : (a = this.expect('-')) ? this.binaryFn($a.ZERO, a.fn, this.unary()) : (a = this.expect('!')) ? this.unaryFn(a.fn, this.unary()) : this.primary();
    },
    fieldAccess: function (a) {
      var c = this, d = this.expect().text, e = Dc(d, this.options, this.text);
      return D(function (c, d, h) {
        return e(h || a(c, d));
      }, {
        assign: function (e, f, h) {
          return ob(a(e, h), d, f, c.text, c.options);
        }
      });
    },
    objectIndex: function (a) {
      var c = this, d = this.expression();
      this.consume(']');
      return D(function (e, g) {
        var f = a(e, g), h = d(e, g), l;
        if (!f)
          return s;
        (f = Za(f[h], c.text)) && (f.then && c.options.unwrapPromises) && (l = f, '$$v' in f || (l.$$v = s, l.then(function (a) {
          l.$$v = a;
        })), f = f.$$v);
        return f;
      }, {
        assign: function (e, g, f) {
          var h = d(e, f);
          return Za(a(e, f), c.text)[h] = g;
        }
      });
    },
    functionCall: function (a, c) {
      var d = [];
      if (')' !== this.peekToken().text) {
        do
          d.push(this.expression());
        while (this.expect(','));
      }
      this.consume(')');
      var e = this;
      return function (g, f) {
        for (var h = [], l = c ? c(g, f) : g, k = 0; k < d.length; k++)
          h.push(d[k](g, f));
        k = a(g, f, l) || C;
        Za(l, e.text);
        Za(k, e.text);
        h = k.apply ? k.apply(l, h) : k(h[0], h[1], h[2], h[3], h[4]);
        return Za(h, e.text);
      };
    },
    arrayDeclaration: function () {
      var a = [], c = !0;
      if (']' !== this.peekToken().text) {
        do {
          if (this.peek(']'))
            break;
          var d = this.expression();
          a.push(d);
          d.constant || (c = !1);
        } while (this.expect(','));
      }
      this.consume(']');
      return D(function (c, d) {
        for (var f = [], h = 0; h < a.length; h++)
          f.push(a[h](c, d));
        return f;
      }, {
        literal: !0,
        constant: c
      });
    },
    object: function () {
      var a = [], c = !0;
      if ('}' !== this.peekToken().text) {
        do {
          if (this.peek('}'))
            break;
          var d = this.expect(), d = d.string || d.text;
          this.consume(':');
          var e = this.expression();
          a.push({
            key: d,
            value: e
          });
          e.constant || (c = !1);
        } while (this.expect(','));
      }
      this.consume('}');
      return D(function (c, d) {
        for (var e = {}, l = 0; l < a.length; l++) {
          var k = a[l];
          e[k.key] = k.value(c, d);
        }
        return e;
      }, {
        literal: !0,
        constant: c
      });
    }
  };
  var Mb = {}, ua = t('$sce'), ga = {
      HTML: 'html',
      CSS: 'css',
      URL: 'url',
      RESOURCE_URL: 'resourceUrl',
      JS: 'js'
    }, W = U.createElement('a'), Hc = sa(O.location.href, !0);
  gc.$inject = ['$provide'];
  Ic.$inject = ['$locale'];
  Kc.$inject = ['$locale'];
  var Nc = '.', Ie = {
      yyyy: $('FullYear', 4),
      yy: $('FullYear', 2, 0, !0),
      y: $('FullYear', 1),
      MMMM: pb('Month'),
      MMM: pb('Month', !0),
      MM: $('Month', 2, 1),
      M: $('Month', 1, 1),
      dd: $('Date', 2),
      d: $('Date', 1),
      HH: $('Hours', 2),
      H: $('Hours', 1),
      hh: $('Hours', 2, -12),
      h: $('Hours', 1, -12),
      mm: $('Minutes', 2),
      m: $('Minutes', 1),
      ss: $('Seconds', 2),
      s: $('Seconds', 1),
      sss: $('Milliseconds', 3),
      EEEE: pb('Day'),
      EEE: pb('Day', !0),
      a: function (a, c) {
        return 12 > a.getHours() ? c.AMPMS[0] : c.AMPMS[1];
      },
      Z: function (a) {
        a = -1 * a.getTimezoneOffset();
        return a = (0 <= a ? '+' : '') + (Ob(Math[0 < a ? 'floor' : 'ceil'](a / 60), 2) + Ob(Math.abs(a % 60), 2));
      }
    }, He = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/, Ge = /^\-?\d+$/;
  Jc.$inject = ['$locale'];
  var Ee = aa(K), Fe = aa(Fa);
  Lc.$inject = ['$parse'];
  var cd = aa({
      restrict: 'E',
      compile: function (a, c) {
        8 >= S && (c.href || c.name || c.$set('href', ''), a.append(U.createComment('IE fix')));
        if (!c.href && !c.xlinkHref && !c.name)
          return function (a, c) {
            var g = '[object SVGAnimatedString]' === wa.call(c.prop('href')) ? 'xlink:href' : 'href';
            c.on('click', function (a) {
              c.attr(g) || a.preventDefault();
            });
          };
      }
    }), zb = {};
  q(kb, function (a, c) {
    if ('multiple' != a) {
      var d = na('ng-' + c);
      zb[d] = function () {
        return {
          priority: 100,
          link: function (a, g, f) {
            a.$watch(f[d], function (a) {
              f.$set(c, !!a);
            });
          }
        };
      };
    }
  });
  q([
    'src',
    'srcset',
    'href'
  ], function (a) {
    var c = na('ng-' + a);
    zb[c] = function () {
      return {
        priority: 99,
        link: function (d, e, g) {
          var f = a, h = a;
          'href' === a && '[object SVGAnimatedString]' === wa.call(e.prop('href')) && (h = 'xlinkHref', g.$attr[h] = 'xlink:href', f = null);
          g.$observe(c, function (a) {
            a && (g.$set(h, a), S && f && e.prop(f, g[h]));
          });
        }
      };
    };
  });
  var sb = {
      $addControl: C,
      $removeControl: C,
      $setValidity: C,
      $setDirty: C,
      $setPristine: C
    };
  Oc.$inject = [
    '$element',
    '$attrs',
    '$scope',
    '$animate'
  ];
  var Qc = function (a) {
      return [
        '$timeout',
        function (c) {
          return {
            name: 'form',
            restrict: a ? 'EAC' : 'E',
            controller: Oc,
            compile: function () {
              return {
                pre: function (a, e, g, f) {
                  if (!g.action) {
                    var h = function (a) {
                      a.preventDefault ? a.preventDefault() : a.returnValue = !1;
                    };
                    Pc(e[0], 'submit', h);
                    e.on('$destroy', function () {
                      c(function () {
                        Fb(e[0], 'submit', h);
                      }, 0, !1);
                    });
                  }
                  var l = e.parent().controller('form'), k = g.name || g.ngForm;
                  k && ob(a, k, f, k);
                  if (l)
                    e.on('$destroy', function () {
                      l.$removeControl(f);
                      k && ob(a, k, s, k);
                      D(f, sb);
                    });
                }
              };
            }
          };
        }
      ];
    }, dd = Qc(), qd = Qc(!0), Oe = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/, Pe = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i, Qe = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/, Rc = {
      text: ub,
      number: function (a, c, d, e, g, f) {
        ub(a, c, d, e, g, f);
        e.$parsers.push(function (a) {
          var c = e.$isEmpty(a);
          if (c || Qe.test(a))
            return e.$setValidity('number', !0), '' === a ? null : c ? a : parseFloat(a);
          e.$setValidity('number', !1);
          return s;
        });
        Je(e, 'number', c);
        e.$formatters.push(function (a) {
          return e.$isEmpty(a) ? '' : '' + a;
        });
        d.min && (a = function (a) {
          var c = parseFloat(d.min);
          return pa(e, 'min', e.$isEmpty(a) || a >= c, a);
        }, e.$parsers.push(a), e.$formatters.push(a));
        d.max && (a = function (a) {
          var c = parseFloat(d.max);
          return pa(e, 'max', e.$isEmpty(a) || a <= c, a);
        }, e.$parsers.push(a), e.$formatters.push(a));
        e.$formatters.push(function (a) {
          return pa(e, 'number', e.$isEmpty(a) || vb(a), a);
        });
      },
      url: function (a, c, d, e, g, f) {
        ub(a, c, d, e, g, f);
        a = function (a) {
          return pa(e, 'url', e.$isEmpty(a) || Oe.test(a), a);
        };
        e.$formatters.push(a);
        e.$parsers.push(a);
      },
      email: function (a, c, d, e, g, f) {
        ub(a, c, d, e, g, f);
        a = function (a) {
          return pa(e, 'email', e.$isEmpty(a) || Pe.test(a), a);
        };
        e.$formatters.push(a);
        e.$parsers.push(a);
      },
      radio: function (a, c, d, e) {
        E(d.name) && c.attr('name', bb());
        c.on('click', function () {
          c[0].checked && a.$apply(function () {
            e.$setViewValue(d.value);
          });
        });
        e.$render = function () {
          c[0].checked = d.value == e.$viewValue;
        };
        d.$observe('value', e.$render);
      },
      checkbox: function (a, c, d, e) {
        var g = d.ngTrueValue, f = d.ngFalseValue;
        w(g) || (g = !0);
        w(f) || (f = !1);
        c.on('click', function () {
          a.$apply(function () {
            e.$setViewValue(c[0].checked);
          });
        });
        e.$render = function () {
          c[0].checked = e.$viewValue;
        };
        e.$isEmpty = function (a) {
          return a !== g;
        };
        e.$formatters.push(function (a) {
          return a === g;
        });
        e.$parsers.push(function (a) {
          return a ? g : f;
        });
      },
      hidden: C,
      button: C,
      submit: C,
      reset: C,
      file: C
    }, dc = [
      '$browser',
      '$sniffer',
      function (a, c) {
        return {
          restrict: 'E',
          require: '?ngModel',
          link: function (d, e, g, f) {
            f && (Rc[K(g.type)] || Rc.text)(d, e, g, f, c, a);
          }
        };
      }
    ], rb = 'ng-valid', qb = 'ng-invalid', La = 'ng-pristine', tb = 'ng-dirty', Re = [
      '$scope',
      '$exceptionHandler',
      '$attrs',
      '$element',
      '$parse',
      '$animate',
      function (a, c, d, e, g, f) {
        function h(a, c) {
          c = c ? '-' + fb(c, '-') : '';
          f.removeClass(e, (a ? qb : rb) + c);
          f.addClass(e, (a ? rb : qb) + c);
        }
        this.$modelValue = this.$viewValue = Number.NaN;
        this.$parsers = [];
        this.$formatters = [];
        this.$viewChangeListeners = [];
        this.$pristine = !0;
        this.$dirty = !1;
        this.$valid = !0;
        this.$invalid = !1;
        this.$name = d.name;
        var l = g(d.ngModel), k = l.assign;
        if (!k)
          throw t('ngModel')('nonassign', d.ngModel, ha(e));
        this.$render = C;
        this.$isEmpty = function (a) {
          return E(a) || '' === a || null === a || a !== a;
        };
        var m = e.inheritedData('$formController') || sb, n = 0, p = this.$error = {};
        e.addClass(La);
        h(!0);
        this.$setValidity = function (a, c) {
          p[a] !== !c && (c ? (p[a] && n--, n || (h(!0), this.$valid = !0, this.$invalid = !1)) : (h(!1), this.$invalid = !0, this.$valid = !1, n++), p[a] = !c, h(c, a), m.$setValidity(a, c, this));
        };
        this.$setPristine = function () {
          this.$dirty = !1;
          this.$pristine = !0;
          f.removeClass(e, tb);
          f.addClass(e, La);
        };
        this.$setViewValue = function (d) {
          this.$viewValue = d;
          this.$pristine && (this.$dirty = !0, this.$pristine = !1, f.removeClass(e, La), f.addClass(e, tb), m.$setDirty());
          q(this.$parsers, function (a) {
            d = a(d);
          });
          this.$modelValue !== d && (this.$modelValue = d, k(a, d), q(this.$viewChangeListeners, function (a) {
            try {
              a();
            } catch (d) {
              c(d);
            }
          }));
        };
        var r = this;
        a.$watch(function () {
          var c = l(a);
          if (r.$modelValue !== c) {
            var d = r.$formatters, e = d.length;
            for (r.$modelValue = c; e--;)
              c = d[e](c);
            r.$viewValue !== c && (r.$viewValue = c, r.$render());
          }
          return c;
        });
      }
    ], Fd = function () {
      return {
        require: [
          'ngModel',
          '^?form'
        ],
        controller: Re,
        link: function (a, c, d, e) {
          var g = e[0], f = e[1] || sb;
          f.$addControl(g);
          a.$on('$destroy', function () {
            f.$removeControl(g);
          });
        }
      };
    }, Hd = aa({
      require: 'ngModel',
      link: function (a, c, d, e) {
        e.$viewChangeListeners.push(function () {
          a.$eval(d.ngChange);
        });
      }
    }), ec = function () {
      return {
        require: '?ngModel',
        link: function (a, c, d, e) {
          if (e) {
            d.required = !0;
            var g = function (a) {
              if (d.required && e.$isEmpty(a))
                e.$setValidity('required', !1);
              else
                return e.$setValidity('required', !0), a;
            };
            e.$formatters.push(g);
            e.$parsers.unshift(g);
            d.$observe('required', function () {
              g(e.$viewValue);
            });
          }
        }
      };
    }, Gd = function () {
      return {
        require: 'ngModel',
        link: function (a, c, d, e) {
          var g = (a = /\/(.*)\//.exec(d.ngList)) && RegExp(a[1]) || d.ngList || ',';
          e.$parsers.push(function (a) {
            if (!E(a)) {
              var c = [];
              a && q(a.split(g), function (a) {
                a && c.push(ca(a));
              });
              return c;
            }
          });
          e.$formatters.push(function (a) {
            return M(a) ? a.join(', ') : s;
          });
          e.$isEmpty = function (a) {
            return !a || !a.length;
          };
        }
      };
    }, Se = /^(true|false|\d+)$/, Id = function () {
      return {
        priority: 100,
        compile: function (a, c) {
          return Se.test(c.ngValue) ? function (a, c, g) {
            g.$set('value', a.$eval(g.ngValue));
          } : function (a, c, g) {
            a.$watch(g.ngValue, function (a) {
              g.$set('value', a);
            });
          };
        }
      };
    }, id = va(function (a, c, d) {
      c.addClass('ng-binding').data('$binding', d.ngBind);
      a.$watch(d.ngBind, function (a) {
        c.text(a == s ? '' : a);
      });
    }), kd = [
      '$interpolate',
      function (a) {
        return function (c, d, e) {
          c = a(d.attr(e.$attr.ngBindTemplate));
          d.addClass('ng-binding').data('$binding', c);
          e.$observe('ngBindTemplate', function (a) {
            d.text(a);
          });
        };
      }
    ], jd = [
      '$sce',
      '$parse',
      function (a, c) {
        return function (d, e, g) {
          e.addClass('ng-binding').data('$binding', g.ngBindHtml);
          var f = c(g.ngBindHtml);
          d.$watch(function () {
            return (f(d) || '').toString();
          }, function (c) {
            e.html(a.getTrustedHtml(f(d)) || '');
          });
        };
      }
    ], ld = Pb('', !0), nd = Pb('Odd', 0), md = Pb('Even', 1), od = va({
      compile: function (a, c) {
        c.$set('ngCloak', s);
        a.removeClass('ng-cloak');
      }
    }), pd = [function () {
        return {
          scope: !0,
          controller: '@',
          priority: 500
        };
      }], fc = {};
  q('click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste'.split(' '), function (a) {
    var c = na('ng-' + a);
    fc[c] = [
      '$parse',
      function (d) {
        return {
          compile: function (e, g) {
            var f = d(g[c]);
            return function (c, d, e) {
              d.on(K(a), function (a) {
                c.$apply(function () {
                  f(c, { $event: a });
                });
              });
            };
          }
        };
      }
    ];
  });
  var sd = [
      '$animate',
      function (a) {
        return {
          transclude: 'element',
          priority: 600,
          terminal: !0,
          restrict: 'A',
          $$tlb: !0,
          link: function (c, d, e, g, f) {
            var h, l, k;
            c.$watch(e.ngIf, function (g) {
              Qa(g) ? l || (l = c.$new(), f(l, function (c) {
                c[c.length++] = U.createComment(' end ngIf: ' + e.ngIf + ' ');
                h = { clone: c };
                a.enter(c, d.parent(), d);
              })) : (k && (k.remove(), k = null), l && (l.$destroy(), l = null), h && (k = yb(h.clone), a.leave(k, function () {
                k = null;
              }), h = null));
            });
          }
        };
      }
    ], td = [
      '$http',
      '$templateCache',
      '$anchorScroll',
      '$animate',
      '$sce',
      function (a, c, d, e, g) {
        return {
          restrict: 'ECA',
          priority: 400,
          terminal: !0,
          transclude: 'element',
          controller: Ea.noop,
          compile: function (f, h) {
            var l = h.ngInclude || h.src, k = h.onload || '', m = h.autoscroll;
            return function (f, h, q, s, u) {
              var F = 0, v, y, A, x = function () {
                  y && (y.remove(), y = null);
                  v && (v.$destroy(), v = null);
                  A && (e.leave(A, function () {
                    y = null;
                  }), y = A, A = null);
                };
              f.$watch(g.parseAsResourceUrl(l), function (g) {
                var l = function () {
                    !B(m) || m && !f.$eval(m) || d();
                  }, q = ++F;
                g ? (a.get(g, { cache: c }).success(function (a) {
                  if (q === F) {
                    var c = f.$new();
                    s.template = a;
                    a = u(c, function (a) {
                      x();
                      e.enter(a, null, h, l);
                    });
                    v = c;
                    A = a;
                    v.$emit('$includeContentLoaded');
                    f.$eval(k);
                  }
                }).error(function () {
                  q === F && x();
                }), f.$emit('$includeContentRequested')) : (x(), s.template = null);
              });
            };
          }
        };
      }
    ], Jd = [
      '$compile',
      function (a) {
        return {
          restrict: 'ECA',
          priority: -400,
          require: 'ngInclude',
          link: function (c, d, e, g) {
            d.html(g.template);
            a(d.contents())(c);
          }
        };
      }
    ], ud = va({
      priority: 450,
      compile: function () {
        return {
          pre: function (a, c, d) {
            a.$eval(d.ngInit);
          }
        };
      }
    }), vd = va({
      terminal: !0,
      priority: 1000
    }), wd = [
      '$locale',
      '$interpolate',
      function (a, c) {
        var d = /{}/g;
        return {
          restrict: 'EA',
          link: function (e, g, f) {
            var h = f.count, l = f.$attr.when && g.attr(f.$attr.when), k = f.offset || 0, m = e.$eval(l) || {}, n = {}, p = c.startSymbol(), r = c.endSymbol(), s = /^when(Minus)?(.+)$/;
            q(f, function (a, c) {
              s.test(c) && (m[K(c.replace('when', '').replace('Minus', '-'))] = g.attr(f.$attr[c]));
            });
            q(m, function (a, e) {
              n[e] = c(a.replace(d, p + h + '-' + k + r));
            });
            e.$watch(function () {
              var c = parseFloat(e.$eval(h));
              if (isNaN(c))
                return '';
              c in m || (c = a.pluralCat(c - k));
              return n[c](e, g, !0);
            }, function (a) {
              g.text(a);
            });
          }
        };
      }
    ], xd = [
      '$parse',
      '$animate',
      function (a, c) {
        var d = t('ngRepeat');
        return {
          transclude: 'element',
          priority: 1000,
          terminal: !0,
          $$tlb: !0,
          link: function (e, g, f, h, l) {
            var k = f.ngRepeat, m = k.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/), n, p, r, s, u, F, v = { $id: Ia };
            if (!m)
              throw d('iexp', k);
            f = m[1];
            h = m[2];
            (m = m[3]) ? (n = a(m), p = function (a, c, d) {
              F && (v[F] = a);
              v[u] = c;
              v.$index = d;
              return n(e, v);
            }) : (r = function (a, c) {
              return Ia(c);
            }, s = function (a) {
              return a;
            });
            m = f.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/);
            if (!m)
              throw d('iidexp', f);
            u = m[3] || m[1];
            F = m[2];
            var B = {};
            e.$watchCollection(h, function (a) {
              var f, h, m = g[0], n, v = {}, H, R, w, C, T, t, E = [];
              if (ab(a))
                T = a, n = p || r;
              else {
                n = p || s;
                T = [];
                for (w in a)
                  a.hasOwnProperty(w) && '$' != w.charAt(0) && T.push(w);
                T.sort();
              }
              H = T.length;
              h = E.length = T.length;
              for (f = 0; f < h; f++)
                if (w = a === T ? f : T[f], C = a[w], C = n(w, C, f), Aa(C, '`track by` id'), B.hasOwnProperty(C))
                  t = B[C], delete B[C], v[C] = t, E[f] = t;
                else {
                  if (v.hasOwnProperty(C))
                    throw q(E, function (a) {
                      a && a.scope && (B[a.id] = a);
                    }), d('dupes', k, C);
                  E[f] = { id: C };
                  v[C] = !1;
                }
              for (w in B)
                B.hasOwnProperty(w) && (t = B[w], f = yb(t.clone), c.leave(f), q(f, function (a) {
                  a.$$NG_REMOVED = !0;
                }), t.scope.$destroy());
              f = 0;
              for (h = T.length; f < h; f++) {
                w = a === T ? f : T[f];
                C = a[w];
                t = E[f];
                E[f - 1] && (m = E[f - 1].clone[E[f - 1].clone.length - 1]);
                if (t.scope) {
                  R = t.scope;
                  n = m;
                  do
                    n = n.nextSibling;
                  while (n && n.$$NG_REMOVED);
                  t.clone[0] != n && c.move(yb(t.clone), null, y(m));
                  m = t.clone[t.clone.length - 1];
                } else
                  R = e.$new();
                R[u] = C;
                F && (R[F] = w);
                R.$index = f;
                R.$first = 0 === f;
                R.$last = f === H - 1;
                R.$middle = !(R.$first || R.$last);
                R.$odd = !(R.$even = 0 === (f & 1));
                t.scope || l(R, function (a) {
                  a[a.length++] = U.createComment(' end ngRepeat: ' + k + ' ');
                  c.enter(a, null, y(m));
                  m = a;
                  t.scope = R;
                  t.clone = a;
                  v[t.id] = t;
                });
              }
              B = v;
            });
          }
        };
      }
    ], yd = [
      '$animate',
      function (a) {
        return function (c, d, e) {
          c.$watch(e.ngShow, function (c) {
            a[Qa(c) ? 'removeClass' : 'addClass'](d, 'ng-hide');
          });
        };
      }
    ], rd = [
      '$animate',
      function (a) {
        return function (c, d, e) {
          c.$watch(e.ngHide, function (c) {
            a[Qa(c) ? 'addClass' : 'removeClass'](d, 'ng-hide');
          });
        };
      }
    ], zd = va(function (a, c, d) {
      a.$watch(d.ngStyle, function (a, d) {
        d && a !== d && q(d, function (a, d) {
          c.css(d, '');
        });
        a && c.css(a);
      }, !0);
    }), Ad = [
      '$animate',
      function (a) {
        return {
          restrict: 'EA',
          require: 'ngSwitch',
          controller: [
            '$scope',
            function () {
              this.cases = {};
            }
          ],
          link: function (c, d, e, g) {
            var f, h, l, k = [];
            c.$watch(e.ngSwitch || e.on, function (d) {
              var n, p = k.length;
              if (0 < p) {
                if (l) {
                  for (n = 0; n < p; n++)
                    l[n].remove();
                  l = null;
                }
                l = [];
                for (n = 0; n < p; n++) {
                  var r = h[n];
                  k[n].$destroy();
                  l[n] = r;
                  a.leave(r, function () {
                    l.splice(n, 1);
                    0 === l.length && (l = null);
                  });
                }
              }
              h = [];
              k = [];
              if (f = g.cases['!' + d] || g.cases['?'])
                c.$eval(e.change), q(f, function (d) {
                  var e = c.$new();
                  k.push(e);
                  d.transclude(e, function (c) {
                    var e = d.element;
                    h.push(c);
                    a.enter(c, e.parent(), e);
                  });
                });
            });
          }
        };
      }
    ], Bd = va({
      transclude: 'element',
      priority: 800,
      require: '^ngSwitch',
      link: function (a, c, d, e, g) {
        e.cases['!' + d.ngSwitchWhen] = e.cases['!' + d.ngSwitchWhen] || [];
        e.cases['!' + d.ngSwitchWhen].push({
          transclude: g,
          element: c
        });
      }
    }), Cd = va({
      transclude: 'element',
      priority: 800,
      require: '^ngSwitch',
      link: function (a, c, d, e, g) {
        e.cases['?'] = e.cases['?'] || [];
        e.cases['?'].push({
          transclude: g,
          element: c
        });
      }
    }), Ed = va({
      link: function (a, c, d, e, g) {
        if (!g)
          throw t('ngTransclude')('orphan', ha(c));
        g(function (a) {
          c.empty();
          c.append(a);
        });
      }
    }), ed = [
      '$templateCache',
      function (a) {
        return {
          restrict: 'E',
          terminal: !0,
          compile: function (c, d) {
            'text/ng-template' == d.type && a.put(d.id, c[0].text);
          }
        };
      }
    ], Te = t('ngOptions'), Dd = aa({ terminal: !0 }), fd = [
      '$compile',
      '$parse',
      function (a, c) {
        var d = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/, e = { $setViewValue: C };
        return {
          restrict: 'E',
          require: [
            'select',
            '?ngModel'
          ],
          controller: [
            '$element',
            '$scope',
            '$attrs',
            function (a, c, d) {
              var l = this, k = {}, m = e, n;
              l.databound = d.ngModel;
              l.init = function (a, c, d) {
                m = a;
                n = d;
              };
              l.addOption = function (c) {
                Aa(c, '"option value"');
                k[c] = !0;
                m.$viewValue == c && (a.val(c), n.parent() && n.remove());
              };
              l.removeOption = function (a) {
                this.hasOption(a) && (delete k[a], m.$viewValue == a && this.renderUnknownOption(a));
              };
              l.renderUnknownOption = function (c) {
                c = '? ' + Ia(c) + ' ?';
                n.val(c);
                a.prepend(n);
                a.val(c);
                n.prop('selected', !0);
              };
              l.hasOption = function (a) {
                return k.hasOwnProperty(a);
              };
              c.$on('$destroy', function () {
                l.renderUnknownOption = C;
              });
            }
          ],
          link: function (e, f, h, l) {
            function k(a, c, d, e) {
              d.$render = function () {
                var a = d.$viewValue;
                e.hasOption(a) ? (A.parent() && A.remove(), c.val(a), '' === a && w.prop('selected', !0)) : E(a) && w ? c.val('') : e.renderUnknownOption(a);
              };
              c.on('change', function () {
                a.$apply(function () {
                  A.parent() && A.remove();
                  d.$setViewValue(c.val());
                });
              });
            }
            function m(a, c, d) {
              var e;
              d.$render = function () {
                var a = new Va(d.$viewValue);
                q(c.find('option'), function (c) {
                  c.selected = B(a.get(c.value));
                });
              };
              a.$watch(function () {
                xa(e, d.$viewValue) || (e = ba(d.$viewValue), d.$render());
              });
              c.on('change', function () {
                a.$apply(function () {
                  var a = [];
                  q(c.find('option'), function (c) {
                    c.selected && a.push(c.value);
                  });
                  d.$setViewValue(a);
                });
              });
            }
            function n(e, f, g) {
              function h() {
                var a = { '': [] }, c = [''], d, k, s, t, z;
                t = g.$modelValue;
                z = y(e) || [];
                var E = n ? Qb(z) : z, F, I, A;
                I = {};
                s = !1;
                var D, H;
                if (r)
                  if (w && M(t))
                    for (s = new Va([]), A = 0; A < t.length; A++)
                      I[m] = t[A], s.put(w(e, I), t[A]);
                  else
                    s = new Va(t);
                for (A = 0; F = E.length, A < F; A++) {
                  k = A;
                  if (n) {
                    k = E[A];
                    if ('$' === k.charAt(0))
                      continue;
                    I[n] = k;
                  }
                  I[m] = z[k];
                  d = p(e, I) || '';
                  (k = a[d]) || (k = a[d] = [], c.push(d));
                  r ? d = B(s.remove(w ? w(e, I) : q(e, I))) : (w ? (d = {}, d[m] = t, d = w(e, d) === w(e, I)) : d = t === q(e, I), s = s || d);
                  D = l(e, I);
                  D = B(D) ? D : '';
                  k.push({
                    id: w ? w(e, I) : n ? E[A] : A,
                    label: D,
                    selected: d
                  });
                }
                r || (u || null === t ? a[''].unshift({
                  id: '',
                  label: '',
                  selected: !s
                }) : s || a[''].unshift({
                  id: '?',
                  label: '',
                  selected: !0
                }));
                I = 0;
                for (E = c.length; I < E; I++) {
                  d = c[I];
                  k = a[d];
                  x.length <= I ? (t = {
                    element: C.clone().attr('label', d),
                    label: k.label
                  }, z = [t], x.push(z), f.append(t.element)) : (z = x[I], t = z[0], t.label != d && t.element.attr('label', t.label = d));
                  D = null;
                  A = 0;
                  for (F = k.length; A < F; A++)
                    s = k[A], (d = z[A + 1]) ? (D = d.element, d.label !== s.label && D.text(d.label = s.label), d.id !== s.id && D.val(d.id = s.id), d.selected !== s.selected && D.prop('selected', d.selected = s.selected)) : ('' === s.id && u ? H = u : (H = v.clone()).val(s.id).attr('selected', s.selected).text(s.label), z.push({
                      element: H,
                      label: s.label,
                      id: s.id,
                      selected: s.selected
                    }), D ? D.after(H) : t.element.append(H), D = H);
                  for (A++; z.length > A;)
                    z.pop().element.remove();
                }
                for (; x.length > I;)
                  x.pop()[0].element.remove();
              }
              var k;
              if (!(k = t.match(d)))
                throw Te('iexp', t, ha(f));
              var l = c(k[2] || k[1]), m = k[4] || k[6], n = k[5], p = c(k[3] || ''), q = c(k[2] ? k[1] : m), y = c(k[7]), w = k[8] ? c(k[8]) : null, x = [[{
                      element: f,
                      label: ''
                    }]];
              u && (a(u)(e), u.removeClass('ng-scope'), u.remove());
              f.empty();
              f.on('change', function () {
                e.$apply(function () {
                  var a, c = y(e) || [], d = {}, h, k, l, p, t, v, u;
                  if (r)
                    for (k = [], p = 0, v = x.length; p < v; p++)
                      for (a = x[p], l = 1, t = a.length; l < t; l++) {
                        if ((h = a[l].element)[0].selected) {
                          h = h.val();
                          n && (d[n] = h);
                          if (w)
                            for (u = 0; u < c.length && (d[m] = c[u], w(e, d) != h); u++);
                          else
                            d[m] = c[h];
                          k.push(q(e, d));
                        }
                      }
                  else {
                    h = f.val();
                    if ('?' == h)
                      k = s;
                    else if ('' === h)
                      k = null;
                    else if (w)
                      for (u = 0; u < c.length; u++) {
                        if (d[m] = c[u], w(e, d) == h) {
                          k = q(e, d);
                          break;
                        }
                      }
                    else
                      d[m] = c[h], n && (d[n] = h), k = q(e, d);
                    1 < x[0].length && x[0][1].id !== h && (x[0][1].selected = !1);
                  }
                  g.$setViewValue(k);
                });
              });
              g.$render = h;
              e.$watch(h);
            }
            if (l[1]) {
              var p = l[0];
              l = l[1];
              var r = h.multiple, t = h.ngOptions, u = !1, w, v = y(U.createElement('option')), C = y(U.createElement('optgroup')), A = v.clone();
              h = 0;
              for (var x = f.children(), D = x.length; h < D; h++)
                if ('' === x[h].value) {
                  w = u = x.eq(h);
                  break;
                }
              p.init(l, u, A);
              r && (l.$isEmpty = function (a) {
                return !a || 0 === a.length;
              });
              t ? n(e, f, l) : r ? m(e, f, l) : k(e, f, l, p);
            }
          }
        };
      }
    ], hd = [
      '$interpolate',
      function (a) {
        var c = {
            addOption: C,
            removeOption: C
          };
        return {
          restrict: 'E',
          priority: 100,
          compile: function (d, e) {
            if (E(e.value)) {
              var g = a(d.text(), !0);
              g || e.$set('value', d.text());
            }
            return function (a, d, e) {
              var k = d.parent(), m = k.data('$selectController') || k.parent().data('$selectController');
              m && m.databound ? d.prop('selected', !1) : m = c;
              g ? a.$watch(g, function (a, c) {
                e.$set('value', a);
                a !== c && m.removeOption(c);
                m.addOption(a);
              }) : m.addOption(e.value);
              d.on('$destroy', function () {
                m.removeOption(e.value);
              });
            };
          }
        };
      }
    ], gd = aa({
      restrict: 'E',
      terminal: !0
    });
  O.angular.bootstrap ? console.log('WARNING: Tried to load angular more than once.') : ((Ga = O.jQuery) ? (y = Ga, D(Ga.fn, {
    scope: Ja.scope,
    isolateScope: Ja.isolateScope,
    controller: Ja.controller,
    injector: Ja.injector,
    inheritedData: Ja.inheritedData
  }), Ab('remove', !0, !0, !1), Ab('empty', !1, !1, !1), Ab('html', !1, !1, !0)) : y = N, Ea.element = y, Zc(Ea), y(U).ready(function () {
    Wc(U, $b);
  }));
}(window, document));
!angular.$$csp() && angular.element(document).find('head').prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide{display:none !important;}ng\\:form{display:block;}.ng-animate-block-transitions{transition:0s all!important;-webkit-transition:0s all!important;}</style>');
//# sourceMappingURL=angular.min.js.map
/*
 AngularJS v1.2.16
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function (n, e, A) {
  'use strict';
  function x(s, g, k) {
    return {
      restrict: 'ECA',
      terminal: !0,
      priority: 400,
      transclude: 'element',
      link: function (a, c, b, f, w) {
        function y() {
          p && (p.remove(), p = null);
          h && (h.$destroy(), h = null);
          l && (k.leave(l, function () {
            p = null;
          }), p = l, l = null);
        }
        function v() {
          var b = s.current && s.current.locals;
          if (e.isDefined(b && b.$template)) {
            var b = a.$new(), d = s.current;
            l = w(b, function (d) {
              k.enter(d, null, l || c, function () {
                !e.isDefined(t) || t && !a.$eval(t) || g();
              });
              y();
            });
            h = d.scope = b;
            h.$emit('$viewContentLoaded');
            h.$eval(u);
          } else
            y();
        }
        var h, l, p, t = b.autoscroll, u = b.onload || '';
        a.$on('$routeChangeSuccess', v);
        v();
      }
    };
  }
  function z(e, g, k) {
    return {
      restrict: 'ECA',
      priority: -400,
      link: function (a, c) {
        var b = k.current, f = b.locals;
        c.html(f.$template);
        var w = e(c.contents());
        b.controller && (f.$scope = a, f = g(b.controller, f), b.controllerAs && (a[b.controllerAs] = f), c.data('$ngControllerController', f), c.children().data('$ngControllerController', f));
        w(a);
      }
    };
  }
  n = e.module('ngRoute', ['ng']).provider('$route', function () {
    function s(a, c) {
      return e.extend(new (e.extend(function () {
      }, { prototype: a }))(), c);
    }
    function g(a, e) {
      var b = e.caseInsensitiveMatch, f = {
          originalPath: a,
          regexp: a
        }, k = f.keys = [];
      a = a.replace(/([().])/g, '\\$1').replace(/(\/)?:(\w+)([\?\*])?/g, function (a, e, b, c) {
        a = '?' === c ? c : null;
        c = '*' === c ? c : null;
        k.push({
          name: b,
          optional: !!a
        });
        e = e || '';
        return '' + (a ? '' : e) + '(?:' + (a ? e : '') + (c && '(.+?)' || '([^/]+)') + (a || '') + ')' + (a || '');
      }).replace(/([\/$\*])/g, '\\$1');
      f.regexp = RegExp('^' + a + '$', b ? 'i' : '');
      return f;
    }
    var k = {};
    this.when = function (a, c) {
      k[a] = e.extend({ reloadOnSearch: !0 }, c, a && g(a, c));
      if (a) {
        var b = '/' == a[a.length - 1] ? a.substr(0, a.length - 1) : a + '/';
        k[b] = e.extend({ redirectTo: a }, g(b, c));
      }
      return this;
    };
    this.otherwise = function (a) {
      this.when(null, a);
      return this;
    };
    this.$get = [
      '$rootScope',
      '$location',
      '$routeParams',
      '$q',
      '$injector',
      '$http',
      '$templateCache',
      '$sce',
      function (a, c, b, f, g, n, v, h) {
        function l() {
          var d = p(), m = r.current;
          if (d && m && d.$$route === m.$$route && e.equals(d.pathParams, m.pathParams) && !d.reloadOnSearch && !u)
            m.params = d.params, e.copy(m.params, b), a.$broadcast('$routeUpdate', m);
          else if (d || m)
            u = !1, a.$broadcast('$routeChangeStart', d, m), (r.current = d) && d.redirectTo && (e.isString(d.redirectTo) ? c.path(t(d.redirectTo, d.params)).search(d.params).replace() : c.url(d.redirectTo(d.pathParams, c.path(), c.search())).replace()), f.when(d).then(function () {
              if (d) {
                var a = e.extend({}, d.resolve), c, b;
                e.forEach(a, function (d, c) {
                  a[c] = e.isString(d) ? g.get(d) : g.invoke(d);
                });
                e.isDefined(c = d.template) ? e.isFunction(c) && (c = c(d.params)) : e.isDefined(b = d.templateUrl) && (e.isFunction(b) && (b = b(d.params)), b = h.getTrustedResourceUrl(b), e.isDefined(b) && (d.loadedTemplateUrl = b, c = n.get(b, { cache: v }).then(function (a) {
                  return a.data;
                })));
                e.isDefined(c) && (a.$template = c);
                return f.all(a);
              }
            }).then(function (c) {
              d == r.current && (d && (d.locals = c, e.copy(d.params, b)), a.$broadcast('$routeChangeSuccess', d, m));
            }, function (c) {
              d == r.current && a.$broadcast('$routeChangeError', d, m, c);
            });
        }
        function p() {
          var a, b;
          e.forEach(k, function (f, k) {
            var q;
            if (q = !b) {
              var g = c.path();
              q = f.keys;
              var l = {};
              if (f.regexp)
                if (g = f.regexp.exec(g)) {
                  for (var h = 1, p = g.length; h < p; ++h) {
                    var n = q[h - 1], r = 'string' == typeof g[h] ? decodeURIComponent(g[h]) : g[h];
                    n && r && (l[n.name] = r);
                  }
                  q = l;
                } else
                  q = null;
              else
                q = null;
              q = a = q;
            }
            q && (b = s(f, {
              params: e.extend({}, c.search(), a),
              pathParams: a
            }), b.$$route = f);
          });
          return b || k[null] && s(k[null], {
            params: {},
            pathParams: {}
          });
        }
        function t(a, c) {
          var b = [];
          e.forEach((a || '').split(':'), function (a, d) {
            if (0 === d)
              b.push(a);
            else {
              var e = a.match(/(\w+)(.*)/), f = e[1];
              b.push(c[f]);
              b.push(e[2] || '');
              delete c[f];
            }
          });
          return b.join('');
        }
        var u = !1, r = {
            routes: k,
            reload: function () {
              u = !0;
              a.$evalAsync(l);
            }
          };
        a.$on('$locationChangeSuccess', l);
        return r;
      }
    ];
  });
  n.provider('$routeParams', function () {
    this.$get = function () {
      return {};
    };
  });
  n.directive('ngView', x);
  n.directive('ngView', z);
  x.$inject = [
    '$route',
    '$anchorScroll',
    '$animate'
  ];
  z.$inject = [
    '$compile',
    '$controller',
    '$route'
  ];
}(window, window.angular));
//# sourceMappingURL=angular-route.min.js.map
/*
 AngularJS v1.2.16
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function (y, w, z) {
  'use strict';
  function u(f, a, c) {
    r.directive(f, [
      '$parse',
      '$swipe',
      function (m, p) {
        var q = 75, g = 0.3, e = 30;
        return function (h, n, l) {
          function k(d) {
            if (!b)
              return !1;
            var s = Math.abs(d.y - b.y);
            d = (d.x - b.x) * a;
            return v && s < q && 0 < d && d > e && s / d < g;
          }
          var s = m(l[f]), b, v;
          p.bind(n, {
            start: function (d, s) {
              b = d;
              v = !0;
            },
            cancel: function (b) {
              v = !1;
            },
            end: function (b, a) {
              k(b) && h.$apply(function () {
                n.triggerHandler(c);
                s(h, { $event: a });
              });
            }
          });
        };
      }
    ]);
  }
  var r = w.module('ngTouch', []);
  r.factory('$swipe', [function () {
      function f(a) {
        var c = a.touches && a.touches.length ? a.touches : [a];
        a = a.changedTouches && a.changedTouches[0] || a.originalEvent && a.originalEvent.changedTouches && a.originalEvent.changedTouches[0] || c[0].originalEvent || c[0];
        return {
          x: a.clientX,
          y: a.clientY
        };
      }
      return {
        bind: function (a, c) {
          var m, p, q, g, e = !1;
          a.on('touchstart mousedown', function (a) {
            q = f(a);
            e = !0;
            p = m = 0;
            g = q;
            c.start && c.start(q, a);
          });
          a.on('touchcancel', function (a) {
            e = !1;
            c.cancel && c.cancel(a);
          });
          a.on('touchmove mousemove', function (a) {
            if (e && q) {
              var n = f(a);
              m += Math.abs(n.x - g.x);
              p += Math.abs(n.y - g.y);
              g = n;
              10 > m && 10 > p || (p > m ? (e = !1, c.cancel && c.cancel(a)) : (a.preventDefault(), c.move && c.move(n, a)));
            }
          });
          a.on('touchend mouseup', function (a) {
            e && (e = !1, c.end && c.end(f(a), a));
          });
        }
      };
    }]);
  r.config([
    '$provide',
    function (f) {
      f.decorator('ngClickDirective', [
        '$delegate',
        function (a) {
          a.shift();
          return a;
        }
      ]);
    }
  ]);
  r.directive('ngClick', [
    '$parse',
    '$timeout',
    '$rootElement',
    function (f, a, c) {
      function m(a, b, c) {
        for (var d = 0; d < a.length; d += 2)
          if (Math.abs(a[d] - b) < e && Math.abs(a[d + 1] - c) < e)
            return a.splice(d, d + 2), !0;
        return !1;
      }
      function p(a) {
        if (!(Date.now() - n > g)) {
          var b = a.touches && a.touches.length ? a.touches : [a], c = b[0].clientX, b = b[0].clientY;
          1 > c && 1 > b || k && k[0] === c && k[1] === b || (k && (k = null), 'label' === a.target.tagName.toLowerCase() && (k = [
            c,
            b
          ]), m(l, c, b) || (a.stopPropagation(), a.preventDefault(), a.target && a.target.blur()));
        }
      }
      function q(c) {
        c = c.touches && c.touches.length ? c.touches : [c];
        var b = c[0].clientX, e = c[0].clientY;
        l.push(b, e);
        a(function () {
          for (var a = 0; a < l.length; a += 2)
            if (l[a] == b && l[a + 1] == e) {
              l.splice(a, a + 2);
              break;
            }
        }, g, !1);
      }
      var g = 2500, e = 25, h = 'ng-click-active', n, l, k;
      return function (a, b, e) {
        function d() {
          k = !1;
          b.removeClass(h);
        }
        var g = f(e.ngClick), k = !1, t, r, u, x;
        b.on('touchstart', function (a) {
          k = !0;
          t = a.target ? a.target : a.srcElement;
          3 == t.nodeType && (t = t.parentNode);
          b.addClass(h);
          r = Date.now();
          a = a.touches && a.touches.length ? a.touches : [a];
          a = a[0].originalEvent || a[0];
          u = a.clientX;
          x = a.clientY;
        });
        b.on('touchmove', function (a) {
          d();
        });
        b.on('touchcancel', function (a) {
          d();
        });
        b.on('touchend', function (a) {
          var g = Date.now() - r, f = a.changedTouches && a.changedTouches.length ? a.changedTouches : a.touches && a.touches.length ? a.touches : [a], h = f[0].originalEvent || f[0], f = h.clientX, h = h.clientY, s = Math.sqrt(Math.pow(f - u, 2) + Math.pow(h - x, 2));
          k && (750 > g && 12 > s) && (l || (c[0].addEventListener('click', p, !0), c[0].addEventListener('touchstart', q, !0), l = []), n = Date.now(), m(l, f, h), t && t.blur(), w.isDefined(e.disabled) && !1 !== e.disabled || b.triggerHandler('click', [a]));
          d();
        });
        b.onclick = function (a) {
        };
        b.on('click', function (b, c) {
          a.$apply(function () {
            g(a, { $event: c || b });
          });
        });
        b.on('mousedown', function (a) {
          b.addClass(h);
        });
        b.on('mousemove mouseup', function (a) {
          b.removeClass(h);
        });
      };
    }
  ]);
  u('ngSwipeLeft', -1, 'swipeleft');
  u('ngSwipeRight', 1, 'swiperight');
}(window, window.angular));
//# sourceMappingURL=angular-touch.min.js.map
/*
 AngularJS v1.2.16
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function (p, h, q) {
  'use strict';
  function E(a) {
    var e = [];
    s(e, h.noop).chars(a);
    return e.join('');
  }
  function k(a) {
    var e = {};
    a = a.split(',');
    var d;
    for (d = 0; d < a.length; d++)
      e[a[d]] = !0;
    return e;
  }
  function F(a, e) {
    function d(a, b, d, g) {
      b = h.lowercase(b);
      if (t[b])
        for (; f.last() && u[f.last()];)
          c('', f.last());
      v[b] && f.last() == b && c('', b);
      (g = w[b] || !!g) || f.push(b);
      var l = {};
      d.replace(G, function (a, b, e, c, d) {
        l[b] = r(e || c || d || '');
      });
      e.start && e.start(b, l, g);
    }
    function c(a, b) {
      var c = 0, d;
      if (b = h.lowercase(b))
        for (c = f.length - 1; 0 <= c && f[c] != b; c--);
      if (0 <= c) {
        for (d = f.length - 1; d >= c; d--)
          e.end && e.end(f[d]);
        f.length = c;
      }
    }
    var b, g, f = [], l = a;
    for (f.last = function () {
        return f[f.length - 1];
      }; a;) {
      g = !0;
      if (f.last() && x[f.last()])
        a = a.replace(RegExp('(.*)<\\s*\\/\\s*' + f.last() + '[^>]*>', 'i'), function (b, a) {
          a = a.replace(H, '$1').replace(I, '$1');
          e.chars && e.chars(r(a));
          return '';
        }), c('', f.last());
      else {
        if (0 === a.indexOf('<!--'))
          b = a.indexOf('--', 4), 0 <= b && a.lastIndexOf('-->', b) === b && (e.comment && e.comment(a.substring(4, b)), a = a.substring(b + 3), g = !1);
        else if (y.test(a)) {
          if (b = a.match(y))
            a = a.replace(b[0], ''), g = !1;
        } else if (J.test(a)) {
          if (b = a.match(z))
            a = a.substring(b[0].length), b[0].replace(z, c), g = !1;
        } else
          K.test(a) && (b = a.match(A)) && (a = a.substring(b[0].length), b[0].replace(A, d), g = !1);
        g && (b = a.indexOf('<'), g = 0 > b ? a : a.substring(0, b), a = 0 > b ? '' : a.substring(b), e.chars && e.chars(r(g)));
      }
      if (a == l)
        throw L('badparse', a);
      l = a;
    }
    c();
  }
  function r(a) {
    if (!a)
      return '';
    var e = M.exec(a);
    a = e[1];
    var d = e[3];
    if (e = e[2])
      n.innerHTML = e.replace(/</g, '&lt;'), e = 'textContent' in n ? n.textContent : n.innerText;
    return a + e + d;
  }
  function B(a) {
    return a.replace(/&/g, '&amp;').replace(N, function (a) {
      return '&#' + a.charCodeAt(0) + ';';
    }).replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function s(a, e) {
    var d = !1, c = h.bind(a, a.push);
    return {
      start: function (a, g, f) {
        a = h.lowercase(a);
        !d && x[a] && (d = a);
        d || !0 !== C[a] || (c('<'), c(a), h.forEach(g, function (d, f) {
          var g = h.lowercase(f), k = 'img' === a && 'src' === g || 'background' === g;
          !0 !== O[g] || !0 === D[g] && !e(d, k) || (c(' '), c(f), c('="'), c(B(d)), c('"'));
        }), c(f ? '/>' : '>'));
      },
      end: function (a) {
        a = h.lowercase(a);
        d || !0 !== C[a] || (c('</'), c(a), c('>'));
        a == d && (d = !1);
      },
      chars: function (a) {
        d || c(B(a));
      }
    };
  }
  var L = h.$$minErr('$sanitize'), A = /^<\s*([\w:-]+)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*>/, z = /^<\s*\/\s*([\w:-]+)[^>]*>/, G = /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g, K = /^</, J = /^<\s*\//, H = /\x3c!--(.*?)--\x3e/g, y = /<!DOCTYPE([^>]*?)>/i, I = /<!\[CDATA\[(.*?)]]\x3e/g, N = /([^\#-~| |!])/g, w = k('area,br,col,hr,img,wbr');
  p = k('colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr');
  q = k('rp,rt');
  var v = h.extend({}, q, p), t = h.extend({}, p, k('address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul')), u = h.extend({}, q, k('a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var')), x = k('script,style'), C = h.extend({}, w, t, u, v), D = k('background,cite,href,longdesc,src,usemap'), O = h.extend({}, D, k('abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,target,title,type,valign,value,vspace,width')), n = document.createElement('pre'), M = /^(\s*)([\s\S]*?)(\s*)$/;
  h.module('ngSanitize', []).provider('$sanitize', function () {
    this.$get = [
      '$$sanitizeUri',
      function (a) {
        return function (e) {
          var d = [];
          F(e, s(d, function (c, b) {
            return !/^unsafe/.test(a(c, b));
          }));
          return d.join('');
        };
      }
    ];
  });
  h.module('ngSanitize').filter('linky', [
    '$sanitize',
    function (a) {
      var e = /((ftp|https?):\/\/|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>]/, d = /^mailto:/;
      return function (c, b) {
        function g(a) {
          a && m.push(E(a));
        }
        function f(a, c) {
          m.push('<a ');
          h.isDefined(b) && (m.push('target="'), m.push(b), m.push('" '));
          m.push('href="');
          m.push(a);
          m.push('">');
          g(c);
          m.push('</a>');
        }
        if (!c)
          return c;
        for (var l, k = c, m = [], n, p; l = k.match(e);)
          n = l[0], l[2] == l[3] && (n = 'mailto:' + n), p = l.index, g(k.substr(0, p)), f(n, l[0].replace(d, '')), k = k.substring(p + l[0].length);
        g(k);
        return a(m.join(''));
      };
    }
  ]);
}(window, window.angular));
//# sourceMappingURL=angular-sanitize.min.js.map
/* ng-infinite-scroll - v1.0.0 - 2013-02-23 */
var mod;
mod = angular.module('infinite-scroll', []), mod.directive('infiniteScroll', [
  '$rootScope',
  '$window',
  '$timeout',
  function (i, n, e) {
    return {
      link: function (t, l, o) {
        var r, c, f, a;
        return n = angular.element(n), f = 0, null != o.infiniteScrollDistance && t.$watch(o.infiniteScrollDistance, function (i) {
          return f = parseInt(i, 10);
        }), a = !0, r = !1, null != o.infiniteScrollDisabled && t.$watch(o.infiniteScrollDisabled, function (i) {
          return a = !i, a && r ? (r = !1, c()) : void 0;
        }), c = function () {
          var e, c, u, d;
          return d = n.height() + n.scrollTop(), e = l.offset().top + l.height(), c = e - d, u = n.height() * f >= c, u && a ? i.$$phase ? t.$eval(o.infiniteScroll) : t.$apply(o.infiniteScroll) : u ? r = !0 : void 0;
        }, n.on('scroll', c), t.$on('$destroy', function () {
          return n.off('scroll', c);
        }), e(function () {
          return o.infiniteScrollImmediateCheck ? t.$eval(o.infiniteScrollImmediateCheck) ? c() : void 0 : c();
        }, 0);
      }
    };
  }
]);
// SoundRad config
// Beta config
//var clientID = '66828e9e2042e682190d1fde4b02e265';
//var callbackUrl = 'http://beta.soundrad.com/callback';
// Official config
var clientID = '683f27c0c6dace16e7498ebffcbef8be';
var callbackUrl = 'http://soundrad.com/callback';
'text use strict';
var soundrad = angular.module('soundrad', [
    'ngTouch',
    'ngRoute',
    'ngSanitize',
    'infinite-scroll'
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