/*!
 * Custom jQuery Nepali Datepicker
 * - No external conversion lib
 * - Internal BS↔AD (1970–2100)
 * - rAF-throttled positioning, single global handlers, full destroy
 * - Fixes English header NaN + year→month grid transitions
 * - All interactive elements are <div role="button" tabindex="0">
 */
(function ($) {
    'use strict';
  
    /*** ---------- Config & Labels ---------- ***/
    var defaults = {
      theme: 'light',                 // 'light' | 'dark' (style in CSS)
      language: 'nepali',             // 'nepali' | 'english' (digits/month names)
      dateFormat: 'YYYY-MM-DD',       // output format in the input
      placeholder: 'Select Date',
      showToday: true,
      autoClose: true,
      modal: false,                   // true => overlay modal
      onSelect: null,                 // function(bsObj, formatted){...}
      onOpen: null,
      onClose: null
    };
  
    var monthNames = {
      nepali: ['बैशाख','जेष्ठ','आषाढ','श्रावण','भाद्र','आश्विन','कार्तिक','मंसिर','पौष','माघ','फाल्गुन','चैत्र'],
      english:['Baisakh','Jestha','Ashadh','Shrawan','Bhadra','Ashwin','Kartik','Mangsir','Poush','Magh','Falgun','Chaitra']
    };
    var dayNamesShort = {
      nepali: ['आइत','सोम','मंगल','बुध','बिहि','शुक्र','शनि'],
      english:['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
    };
    var englishMonthNamesShort = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  
    /*** ---------- BS Calendar table (1970–2100) ---------- ***/
    var bsCalendarData = {
      1970:[31,31,32,31,31,31,30,29,30,29,30,30],
      1971:[31,31,32,31,32,30,30,29,30,29,30,30],
      1972:[31,32,31,32,31,30,30,30,29,29,30,31],
      1973:[30,32,31,32,31,30,30,30,29,30,29,31],
      1974:[31,31,32,31,31,31,30,29,30,29,30,30],
      1975:[31,31,32,32,31,30,30,29,30,29,30,30],
      1976:[31,32,31,32,31,30,30,30,29,29,30,31],
      1977:[30,32,31,32,31,31,29,30,29,30,29,31],
      1978:[31,31,32,31,31,31,30,29,30,29,30,30],
      1979:[31,31,32,32,31,30,30,29,30,29,30,30],
      1980:[31,32,31,32,31,30,30,30,29,29,30,31],
      1981:[31,31,31,32,31,31,29,30,30,29,30,30],
      1982:[31,31,32,31,31,31,30,29,30,29,30,30],
      1983:[31,31,32,32,31,30,30,29,30,29,30,30],
      1984:[31,32,31,32,31,30,30,30,29,29,30,31],
      1985:[31,31,31,32,31,31,29,30,30,29,30,30],
      1986:[31,31,32,31,31,31,30,29,30,29,30,30],
      1987:[31,32,31,32,31,30,30,29,30,29,30,30],
      1988:[31,32,31,32,31,30,30,30,29,29,30,31],
      1989:[31,31,31,32,31,31,30,29,30,29,30,30],
      1990:[31,31,32,31,31,31,30,29,30,29,30,30],
      1991:[31,32,31,32,31,30,30,30,29,29,30,30],
      1992:[31,32,31,32,31,30,30,30,29,30,29,31],
      1993:[31,31,31,32,31,31,30,29,30,29,30,30],
      1994:[31,31,32,31,31,31,30,29,30,29,30,30],
      1995:[31,32,31,32,31,30,30,30,29,29,30,30],
      1996:[31,32,31,32,31,30,30,30,29,30,29,31],
      1997:[31,31,32,31,31,31,30,29,30,29,30,30],
      1998:[31,31,32,31,31,31,30,29,30,29,30,30],
      1999:[31,32,31,32,31,30,30,30,29,29,30,31],
      2000:[30,32,31,32,31,30,30,30,29,30,29,31],
      2001:[31,31,32,31,31,31,30,29,30,29,30,30],
      2002:[31,31,32,32,31,30,30,29,30,29,30,30],
      2003:[31,32,31,32,31,30,30,30,29,29,30,31],
      2004:[30,32,31,32,31,30,30,30,29,30,29,31],
      2005:[31,31,32,31,31,31,30,29,30,29,30,30],
      2006:[31,31,32,32,31,30,30,29,30,29,30,30],
      2007:[31,32,31,32,31,30,30,30,29,29,30,31],
      2008:[31,31,31,32,31,31,29,30,30,29,29,31],
      2009:[31,31,32,31,31,31,30,29,30,29,30,30],
      2010:[31,31,32,32,31,30,30,29,30,29,30,30],
      2011:[31,32,31,32,31,30,30,30,29,29,30,31],
      2012:[31,31,31,32,31,31,29,30,30,29,30,30],
      2013:[31,31,32,31,31,31,30,29,30,29,30,30],
      2014:[31,31,32,32,31,30,30,29,30,29,30,30],
      2015:[31,32,31,32,31,30,30,30,29,29,30,31],
      2016:[31,31,31,32,31,31,29,30,30,29,30,30],
      2017:[31,31,32,31,31,31,30,29,30,29,30,30],
      2018:[31,32,31,32,31,30,30,29,30,29,30,30],
      2019:[31,32,31,32,31,30,30,30,29,30,29,31],
      2020:[31,31,31,32,31,31,30,29,30,29,30,30],
      2021:[31,31,32,31,31,31,30,29,30,29,30,30],
      2022:[31,32,31,32,31,30,30,30,29,29,30,30],
      2023:[31,32,31,32,31,30,30,30,29,30,29,31],
      2024:[31,31,31,32,31,31,30,29,30,29,30,30],
      2025:[31,31,32,31,31,31,30,29,30,29,30,30],
      2026:[31,32,31,32,31,30,30,30,29,29,30,31],
      2027:[30,32,31,32,31,30,30,30,29,30,29,31],
      2028:[31,31,32,31,31,31,30,29,30,29,30,30],
      2029:[31,31,32,31,32,30,30,29,30,29,30,30],
      2030:[31,32,31,32,31,30,30,30,29,29,30,31],
      2031:[30,32,31,32,31,30,30,30,29,30,29,31],
      2032:[31,31,32,31,31,31,30,29,30,29,30,30],
      2033:[31,31,32,32,31,30,30,29,30,29,30,30],
      2034:[31,32,31,32,31,30,30,30,29,29,30,31],
      2035:[30,32,31,32,31,31,29,30,30,29,29,31],
      2036:[31,31,32,31,31,31,30,29,30,29,30,30],
      2037:[31,31,32,32,31,30,30,29,30,29,30,30],
      2038:[31,32,31,32,31,30,30,30,29,29,30,31],
      2039:[31,31,31,32,31,31,29,30,30,29,30,30],
      2040:[31,31,32,31,31,31,30,29,30,29,30,30],
      2041:[31,31,32,32,31,30,30,29,30,29,30,30],
      2042:[31,32,31,32,31,30,30,30,29,29,30,31],
      2043:[31,31,31,32,31,31,29,30,30,29,30,30],
      2044:[31,31,32,31,31,31,30,29,30,29,30,30],
      2045:[31,32,31,32,31,30,30,29,30,29,30,30],
      2046:[31,32,31,32,31,30,30,30,29,29,30,31],
      2047:[31,31,31,32,31,31,30,29,30,29,30,30],
      2048:[31,31,32,31,31,31,30,29,30,29,30,30],
      2049:[31,32,31,32,31,30,30,30,29,29,30,30],
      2050:[31,32,31,32,31,30,30,30,29,30,29,31],
      2051:[31,31,32,31,31,31,30,29,30,29,30,30],
      2052:[31,31,32,32,31,30,30,29,30,29,30,30],
      2053:[31,32,31,32,31,30,30,30,29,29,30,31],
      2054:[30,32,31,32,31,30,30,30,29,30,29,31],
      2055:[31,31,32,31,31,31,30,29,30,29,30,30],
      2056:[31,31,32,32,31,30,30,29,30,29,30,30],
      2057:[31,32,31,32,31,30,30,30,29,29,30,31],
      2058:[31,31,31,32,31,31,29,30,30,29,30,30],
      2059:[31,31,32,31,31,31,30,29,30,29,30,30],
      2060:[31,32,31,32,31,30,30,29,30,29,30,30],
      2061:[31,32,31,32,31,30,30,30,29,30,29,31],
      2062:[31,31,31,32,31,31,30,29,30,29,30,30],
      2063:[31,31,32,31,31,31,30,29,30,29,30,30],
      2064:[31,32,31,32,31,30,30,30,29,29,30,30],
      2065:[31,32,31,32,31,30,30,30,29,30,29,31],
      2066:[31,31,32,31,31,31,30,29,30,29,30,30],
      2067:[31,31,32,32,31,30,30,29,30,29,30,30],
      2068:[31,32,31,32,31,30,30,30,29,29,30,31],
      2069:[30,32,31,32,31,30,30,30,29,30,29,31],
      2070:[31,31,32,31,31,31,30,29,30,29,30,30],
      2071:[31,31,32,32,31,30,30,29,30,29,30,30],
      2072:[31,32,31,32,31,30,30,30,29,29,30,31],
      2073:[31,31,31,32,31,31,29,30,30,29,30,30],
      2074:[31,31,32,31,31,31,30,29,30,29,30,30],
      2075:[31,32,31,32,31,30,30,29,30,29,30,30],
      2076:[31,32,31,32,31,30,30,30,29,30,29,31],
      2077:[31,31,31,32,31,31,30,29,30,29,30,30],
      2078:[31,31,32,31,31,31,30,29,30,29,30,30],
      2079:[31,32,31,32,31,30,30,30,29,29,30,30],
      2080:[31,32,31,32,31,30,30,30,29,30,29,31],
      2081:[31,31,32,31,31,31,30,29,30,29,30,30],
      2082:[31,31,32,32,31,30,30,29,30,29,30,30],
      2083:[31,32,31,32,31,30,30,30,29,29,30,31],
      2084:[30,32,31,32,31,30,30,30,29,30,29,31],
      2085:[31,31,32,31,31,31,30,29,30,29,30,30],
      2086:[31,31,32,32,31,30,30,29,30,29,30,30],
      2087:[31,32,31,32,31,30,30,30,29,29,30,31],
      2088:[31,31,31,32,31,31,29,30,30,29,30,30],
      2089:[31,31,32,31,31,31,30,29,30,29,30,30],
      2090:[31,32,31,32,31,30,30,29,30,29,30,30],
      2091:[31,32,31,32,31,30,30,30,29,30,29,31],
      2092:[31,31,31,32,31,31,30,29,30,29,30,30],
      2093:[31,31,32,31,31,31,30,29,30,29,30,30],
      2094:[31,32,31,32,31,30,30,30,29,29,30,30],
      2095:[31,32,31,32,31,30,30,30,29,30,29,31],
      2096:[31,31,32,31,31,31,30,29,30,29,30,30],
      2097:[31,31,32,32,31,30,30,29,30,29,30,30],
      2098:[31,32,31,32,31,30,30,30,29,29,30,31],
      2099:[30,32,31,32,31,30,30,30,29,30,29,31],
      2100:[31,31,32,31,31,31,30,29,30,29,30,30]
    };
  
    /*** ---------- Conversion Engine (UTC-safe) ---------- ***/
    var DAY_MS = 24*60*60*1000;
    var REF_BS = { year: 2000, month: 9, day: 17 };   // BS 2000-09-17
    var REF_AD = new Date(Date.UTC(1944, 0, 1));      // AD 1944-01-01 (UTC)
  
    function isYearValid(y){ return !!bsCalendarData[y]; }
    function dim(bs){ return (bsCalendarData[bs.year] && bsCalendarData[bs.year][bs.month-1]) || 30; }
    function clampBS(bs){
      var years = Object.keys(bsCalendarData).map(Number);
      var minY = Math.min.apply(Math, years), maxY = Math.max.apply(Math, years);
      if (bs.year < minY) bs.year = minY;
      if (bs.year > maxY) bs.year = maxY;
      if (bs.month < 1) bs.month = 1;
      if (bs.month > 12) bs.month = 12;
      var d = dim(bs);
      if (bs.day == null || bs.day < 1) bs.day = 1;
      if (bs.day > d) bs.day = d;
      return bs;
    }
    function cmp(a,b){ if(a.year!==b.year) return a.year-b.year; if(a.month!==b.month) return a.month-b.month; return a.day-b.day; }
    function addDaysBS(bs, delta){
      var y=bs.year,m=bs.month,d=bs.day;
      if(delta===0) return {year:y,month:m,day:d};
      if(delta>0){
        d+=delta;
        for(;;){
          var dm=dim({year:y,month:m,day:1});
          if(d<=dm) break;
          d-=dm; m++; if(m>12){ m=1; y++; if(!isYearValid(y)){ y = Math.max.apply(Math,Object.keys(bsCalendarData).map(Number)); d = Math.min(d, dim({year:y,month:m,day:1})); break; } }
        }
      } else {
        d+=delta;
        while(d<1){
          m--; if(m<1){ m=12; y--; if(!isYearValid(y)){ y = Math.min.apply(Math,Object.keys(bsCalendarData).map(Number)); d = 1; break; } }
          d+=dim({year:y,month:m,day:1});
        }
      }
      return {year:y,month:m,day:d};
    }
    function daysFromRefTo(target){
      target = clampBS(target);
      if(target.year===REF_BS.year && target.month===REF_BS.month && target.day===REF_BS.day) return 0;
      var dir = cmp(target, REF_BS) >= 0 ? 1 : -1;
      var cur = {year:REF_BS.year,month:REF_BS.month,day:REF_BS.day};
      var total = 0;
  
      if(dir>0){
        total += (dim(cur) - cur.day);
        cur.day = 1; cur.month++; if(cur.month>12){cur.month=1;cur.year++;}
        while(cur.year<target.year || (cur.year===target.year && cur.month<target.month)){
          total += dim(cur);
          cur.month++; if(cur.month>12){cur.month=1;cur.year++;}
        }
        total += target.day; total -= 1;
      }else{
        total += (cur.day - 1);
        cur.day = 1; cur.month--; if(cur.month<1){cur.month=12;cur.year--;}
        while(cur.year>target.year || (cur.year===target.year && cur.month>target.month)){
          total += dim(cur);
          cur.month--; if(cur.month<1){cur.month=12;cur.year--;}
        }
        total += (dim(target) - target.day);
        total -= 1; total = -total;
      }
      return total;
    }
  
    // AD -> BS (UTC-safe, using local Y/M/D to avoid timezone off-by-one)
    function adToBS(ad){
      var t1 = (ad instanceof Date)
        ? Date.UTC(ad.getFullYear(), ad.getMonth(), ad.getDate()) // local parts
        : Date.UTC(ad.year, ad.month-1, ad.day||1);
      var t0 = Date.UTC(REF_AD.getUTCFullYear(), REF_AD.getUTCMonth(), REF_AD.getUTCDate());
      var diff = Math.round((t1 - t0)/DAY_MS);
      return addDaysBS({year:REF_BS.year,month:REF_BS.month,day:REF_BS.day}, diff);
    }
    // BS -> AD (UTC-safe; returns UTC components)
    function bsToAD(bs){
      bs = clampBS(bs);
      var delta = daysFromRefTo(bs);
      var t0 = Date.UTC(REF_AD.getUTCFullYear(), REF_AD.getUTCMonth(), REF_AD.getUTCDate());
      var t  = t0 + delta*DAY_MS;
      var d  = new Date(t);
      return { year: d.getUTCFullYear(), month: d.getUTCMonth()+1, day: d.getUTCDate() };
    }
  
    /*** ---------- Helpers ---------- ***/
    var INSTANCES = 0;
    var GLOBAL_BOUND = false;
    var ACTIVE = null;        // HTMLElement of the open dp
    var ACTIVE_INPUT = null;  // Input element for the open dp
  
    function getTodayBS(){
      var now = new Date(); // local today; use local parts to avoid offset
      return adToBS({ year: now.getFullYear(), month: now.getMonth()+1, day: now.getDate() });
    }
    function getDaysInMonth(bs){ return dim(bs); }
    function firstWeekday(bs){
      var a = bsToAD({year:bs.year,month:bs.month,day:1});
      return new Date(a.year, a.month-1, a.day).getDay();
    }
    function same(a,b){ return !!a && !!b && a.year===b.year && a.month===b.month && a.day===b.day; }
    function toNepNum(str){
      var map=['०','१','२','३','४','५','६','७','८','९'];
      return String(str).replace(/\d/g, function(d){ return map[+d]; });
    }
    function fmt(settings, date){
      if(!date) return '';
      var y = settings.language==='nepali'? toNepNum(date.year) : date.year;
      var m = settings.language==='nepali'? toNepNum(date.month) : String(date.month).padStart(2,'0');
      var d = settings.language==='nepali'? toNepNum(date.day)   : String(date.day).padStart(2,'0');
      return settings.dateFormat.replace('YYYY',y).replace('MM',m).replace('DD',d);
    }
    function rafThrottle(fn){ var q=false; return function(){ if(q) return; q=true; requestAnimationFrame(function(){ q=false; fn(); }); }; }

    // NepaliDatepicker Class
    function NepaliDatepicker($input, options) {
      this.$input = $input;
      this.settings = $.extend({}, defaults, options || {});
      this.currentView = 'month';
      this.selectedDate = null;
      this.currentDate = getTodayBS();
      this.$datepicker = null;
      
      this.init();
    }

    NepaliDatepicker.prototype = {
      init: function() {
        this.bindEvents();
      },

      bindEvents: function() {
        var self = this;
        this.$input.on('click', function(e) {
          e.preventDefault();
          self.show();
        });
      },

      show: function() {
        if (this.$datepicker) {
          this.$datepicker.remove();
        }
        this.createDatepicker();
        this.positionDatepicker();
        this.$datepicker.show();
      },

      hide: function() {
        if (this.$datepicker) {
          this.$datepicker.hide();
        }
      },

      createDatepicker: function() {
        var self = this;
        this.$datepicker = $('<div class="nepali-datepicker"></div>');
        
        // Header
        var header = $('<div class="datepicker-header"></div>');
        var navLeft = $('<button class="nav-btn prev-month" data-action="prev-month">‹</button>');
        var navRight = $('<button class="nav-btn next-month" data-action="next-month">›</button>');
        var monthYear = $('<div class="month-year clickable-month-year" data-action="show-month-list"></div>');
        var englishDate = $('<div class="english-date-header"></div>');
        
        header.append(navLeft).append(monthYear).append(navRight).append(englishDate);
        
        // Body
        var body = $('<div class="datepicker-body"></div>');
        var weekdays = $('<div class="weekdays"></div>');
        var days = $('<div class="days"></div>');
        
        // Weekday headers
        var dayNames = ['आइत', 'सोम', 'मंगल', 'बुध', 'बिहि', 'शुक्र', 'शनि'];
        for (var i = 0; i < 7; i++) {
          weekdays.append($('<div class="weekday">' + dayNames[i] + '</div>'));
        }
        
        body.append(weekdays).append(days);
        
        // Footer
        var footer = $('<div class="datepicker-footer"></div>');
        var todayBtn = $('<button class="btn-today" data-action="select-today">आज</button>');
        footer.append(todayBtn);
        
        this.$datepicker.append(header).append(body).append(footer);
        $('body').append(this.$datepicker);
        
        this.updateDisplay();
        this.bindDatepickerEvents();
      },

      bindDatepickerEvents: function() {
        var self = this;
        this.$datepicker.off('click.nepaliDatepicker').on('click.nepaliDatepicker', function(e) {
          e.stopPropagation();
          var $target = $(e.target);
          var action = $target.data('action') || $target.closest('[data-action]').data('action');
          
          switch(action) {
            case 'prev-month':
              self.navigateMonth(-1);
              break;
            case 'next-month':
              self.navigateMonth(1);
              break;
            case 'show-month-list':
              self.showMonthList();
              break;
            case 'select-today':
              self.selectToday();
              break;
            case 'select-day':
              var day = parseInt($target.data('day'));
              self.selectDate(day);
              break;
          }
        });
      },

      updateDisplay: function() {
        if (!this.$datepicker) return;
        
        var monthNames = ['बैशाख', 'जेष्ठ', 'आषाढ', 'श्रावण', 'भाद्र', 'आश्विन', 'कार्तिक', 'मार्ग', 'पौष', 'माघ', 'फाल्गुन', 'चैत्र'];
        var monthName = monthNames[this.currentDate.month - 1] || 'बैशाख';
        var year = this.settings.language === 'nepali' ? toNepNum(this.currentDate.year) : this.currentDate.year;
        
        this.$datepicker.find('.month-year').html(monthName + ' ' + year);
        
        // Update English date
        var englishDate = bsToAD(this.currentDate);
        var englishMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var englishDateStr = englishMonthNames[englishDate.month - 1] + ' ' + englishDate.day + ', ' + englishDate.year;
        this.$datepicker.find('.english-date-header').text(englishDateStr);
        
        this.renderDays();
      },

      renderDays: function() {
        var daysContainer = this.$datepicker.find('.days');
        daysContainer.empty();
        
        var firstDay = this.getFirstDayOfMonth(this.currentDate);
        var daysInMonth = getDaysInMonth(this.currentDate);
        
        // Empty cells for days before month starts
        for (var i = 0; i < firstDay; i++) {
          daysContainer.append($('<div class="day empty"></div>'));
        }
        
        // Days of the month
        for (var day = 1; day <= daysInMonth; day++) {
          var $day = $('<div class="day" data-action="select-day" data-day="' + day + '"></div>');
          $day.append($('<div class="nepali-date">' + toNepNum(day) + '</div>'));
          
          var englishDate = bsToAD({year: this.currentDate.year, month: this.currentDate.month, day: day});
          $day.append($('<div class="english-date-subscript">' + englishDate.day + '</div>'));
          
          if (this.selectedDate && this.isSameDate(this.selectedDate, {year: this.currentDate.year, month: this.currentDate.month, day: day})) {
            $day.addClass('selected');
          }
          
          daysContainer.append($day);
        }
      },

      navigateMonth: function(direction) {
        this.currentDate.month += direction;
        if (this.currentDate.month > 12) {
          this.currentDate.month = 1;
          this.currentDate.year++;
        } else if (this.currentDate.month < 1) {
          this.currentDate.month = 12;
          this.currentDate.year--;
        }
        this.updateDisplay();
      },

      showMonthList: function() {
        this.currentView = 'monthList';
        this.renderMonthList();
      },

      renderMonthList: function() {
        var body = this.$datepicker.find('.datepicker-body');
        body.empty();
        
        var monthNames = ['बैशाख', 'जेष्ठ', 'आषाढ', 'श्रावण', 'भाद्र', 'आश्विन', 'कार्तिक', 'मार्ग', 'पौष', 'माघ', 'फाल्गुन', 'चैत्र'];
        var monthList = $('<div class="month-list-view"></div>');
        
        for (var i = 0; i < 12; i++) {
          var $month = $('<div class="month-item" data-action="select-month" data-month="' + (i + 1) + '">' + monthNames[i] + '</div>');
          monthList.append($month);
        }
        
        body.append(monthList);
        
        // Update header for month list
        var year = this.settings.language === 'nepali' ? toNepNum(this.currentDate.year) : this.currentDate.year;
        this.$datepicker.find('.month-year').html(year);
        
        // Bind month selection
        var self = this;
        this.$datepicker.off('click.nepaliDatepicker').on('click.nepaliDatepicker', function(e) {
          e.stopPropagation();
          var $target = $(e.target);
          var action = $target.data('action') || $target.closest('[data-action]').data('action');
          
          if (action === 'select-month') {
            var month = parseInt($target.data('month'));
            self.currentDate.month = month;
            self.currentView = 'month';
            self.updateDisplay();
          }
        });
      },

      selectDate: function(day) {
        this.selectedDate = {
          year: this.currentDate.year,
          month: this.currentDate.month,
          day: day
        };
        
        var formatted = fmt(this.settings, this.selectedDate);
        this.$input.val(formatted);
        
        if (this.settings.onSelect) {
          this.settings.onSelect(this.selectedDate, formatted);
        }
        
        this.hide();
      },

      selectToday: function() {
        var today = getTodayBS();
        this.selectDate(today.day);
      },

      getFirstDayOfMonth: function(date) {
        var firstDay = new Date(date.year, date.month - 1, 1);
        return firstDay.getDay();
      },

      isSameDate: function(date1, date2) {
        return date1.year === date2.year && date1.month === date2.month && date1.day === date2.day;
      },

      positionDatepicker: function() {
        var offset = this.$input.offset();
        var inputHeight = this.$input.outerHeight();
        
        this.$datepicker.css({
          position: 'absolute',
          top: offset.top + inputHeight + 5,
          left: offset.left,
          zIndex: 9999
        });
      },

      getDate: function() {
        return this.selectedDate;
      },

      setDate: function(date) {
        if (date && date.year && date.month && date.day) {
          this.selectedDate = date;
          this.currentDate = date;
          var formatted = fmt(this.settings, date);
          this.$input.val(formatted);
        }
      },

      destroy: function() {
        if (this.$datepicker) {
          this.$datepicker.remove();
        }
        this.$input.off('click');
      }
    };

    // Define the jQuery plugin
    $.fn.nepaliDatepicker = function(options) {
      return this.each(function() {
        var $input = $(this);
        var settings = $.extend({}, defaults, options || {});
        
        // Create datepicker instance
        var datepicker = new NepaliDatepicker($input, settings);
        
        // Store reference for API access
        $input.data('nepaliDatepicker', datepicker);
      });
    };

    // Expose utility functions globally
    window.NepaliDatepickerUtils = {
      toAD: function(bsDate) {
        return bsToAD(bsDate);
      },
      toBS: function(adDate) {
        return adToBS(adDate);
      },
      getDaysInMonth: function(year, month) {
        return getDaysInMonth({year: year, month: month, day: 1});
      }
    };

  })(jQuery);
