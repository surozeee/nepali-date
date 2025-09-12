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
  
    // Global handlers (bound once)
    function bindGlobal(){
      if (GLOBAL_BOUND) return;
      GLOBAL_BOUND = true;
  
      $(document).on('mousedown.ndp-global', function(e){
        if (!ACTIVE) return;
        if ($(e.target).closest(ACTIVE).length) return;
        if ($(e.target).closest(ACTIVE_INPUT).length) return;
        var closeFn = $(ACTIVE).data('__ndp_close__');
        if (closeFn) closeFn();
      });
  
      var onWin = function(){
        if (!ACTIVE) return;
        var pos = $(ACTIVE).data('__ndp_position__');
        if (pos) pos();
      };
      $(window).on('resize.ndp-global scroll.ndp-global', onWin);
    }
    function unbindGlobalIfIdle(){
      if (INSTANCES > 0) return;
      $(document).off('.ndp-global');
      $(window).off('.ndp-global');
      GLOBAL_BOUND = false;
    }
  
    /*** ---------- Plugin ---------- ***/
    $.fn.nepaliDatepicker = function (options) {
      bindGlobal();
  
      return this.each(function () {
        var $input = $(this);
        var settings = $.extend({}, defaults, options || {});
        $input.data('__ndp_settings__', settings);
  
        var state = {
          isOpen: false,
          selected: null,
          current: getTodayBS(),
          view: 'month',
          $dp: null,
          $overlay: null,
          bound: false
        };
        INSTANCES++;
  
        $input.attr('readonly', true).attr('placeholder', settings.placeholder);
  
        function build(){
          if (state.$dp) return;
          var $dp = $('<div class="nepali-datepicker '+settings.theme+'" role="dialog" aria-label="Date Picker"></div>').hide();
          state.$dp = $dp;
  
          if (settings.modal){
            var $ov = $('<div class="nepali-datepicker-modal-overlay" role="dialog" aria-modal="true"></div>').hide();
            var $content = $('<div class="nepali-datepicker-modal-content"></div>');
            $content.append($dp); $ov.append($content);
            $('body').append($ov);
            state.$overlay = $ov;
  
            $ov.on('click.ndp', function(e){ if (e.target === $ov[0]) close(); });
            $content.on('click.ndp', function(e){ e.stopPropagation(); });
          } else {
            $('body').append($dp);
          }
  
          bindOnce();
        }
  
        function open(){
          if (state.isOpen) return;
  
          build();
          render();
  
          state.isOpen = true;
          ACTIVE = state.$dp[0];
          ACTIVE_INPUT = $input[0];
          $input.attr('aria-expanded','true');
  
          if (settings.modal && state.$overlay){
            state.$overlay.css('display','flex').addClass('ndp-enter');
            requestAnimationFrame(function(){ state.$overlay.removeClass('ndp-enter'); });
          } else {
            positionThrottled();
            state.$dp.addClass('ndp-enter').show(0);
            requestAnimationFrame(function(){ state.$dp.removeClass('ndp-enter'); });
          }
          if (settings.onOpen) settings.onOpen.call($input[0]);
        }
  
        function close(){
          if (!state.isOpen) return;
          state.isOpen = false;
          $input.removeAttr('data-nepali-datepicker-active').attr('aria-expanded','false');
  
          if (ACTIVE === state.$dp[0]) { ACTIVE = null; ACTIVE_INPUT = null; }
  
          if (settings.modal && state.$overlay){
            state.$overlay.addClass('ndp-leave');
            setTimeout(function(){ state.$overlay.removeClass('ndp-leave').hide(); }, 180);
          } else if (state.$dp){
            state.$dp.addClass('ndp-leave');
            setTimeout(function(){ state.$dp.removeClass('ndp-leave').hide(); }, 180);
          }
          if (settings.onClose) settings.onClose.call($input[0]);
        }
  
        function position(){
          if (!state.isOpen || settings.modal || !state.$dp) return;
          var $dp = state.$dp;
          var off = $input.offset();
          var ih = $input.outerHeight();
          var dh = $dp.outerHeight() || 280;
          var dw = $dp.outerWidth()  || 320;
          var $win = $(window);
          var vh = $win.height(), vw = $win.width();
          var st = $win.scrollTop(), sl = $win.scrollLeft();
  
          var belowSpace = vh - (off.top - st) - ih;
          var aboveSpace = off.top - st;
          var top, left, above=false;
  
          if (belowSpace >= dh + 10) {
            top = off.top + ih + 5;
          } else if (aboveSpace >= dh + 10) {
            top = off.top - dh - 5; above = true;
          } else {
            top = Math.min(off.top + ih + 5, st + vh - dh - 10);
          }
  
          left = off.left;
          if (left + dw > sl + vw) left = sl + vw - dw - 10;
          if (left < sl + 10) left = sl + 10;
  
          $dp.css({position:'absolute', top:top, left:left, zIndex:9999})
             .toggleClass('positioned-above', !!above)
             .toggleClass('positioned-below', !above)
             .toggleClass('mobile-view', vw < 480);
        }
        var positionThrottled = rafThrottle(position);
  
        function englishHeaderFor(bsYear, bsMonth){
          var ad = bsToAD({year:bsYear, month:bsMonth, day:1});
          var nextM = ad.month === 12 ? 1 : ad.month + 1;
          var nextY = ad.month === 12 ? ad.year + 1 : ad.year;
          return englishMonthNamesShort[ad.month-1]+' '+ad.year+' / '+englishMonthNamesShort[nextM-1]+' '+nextY;
        }
  
        function render(){
          var cur = state.current;
          var html = '';
  
          if (state.view === 'month'){
            var canPrevY = isYearValid(cur.year - 1);
            var canNextY = isYearValid(cur.year + 1);
  
            html += '<div class="datepicker-header">';
            html += '<div class="nav-btn prev-year'+(canPrevY?'':' disabled')+'" data-action="prev-year" title="Previous Year" aria-label="Previous Year" role="button" tabindex="0">&#171;</div>';
            html += '<div class="nav-btn prev-month" data-action="prev-month" title="Previous Month" aria-label="Previous Month" role="button" tabindex="0">&#8249;</div>';
  
            html += '<div class="month-year">';
            html +=   '<div class="nepali-date-display">';
            html +=     '<span class="month">'+ monthNames[settings.language][cur.month-1] +'</span> ';
            html +=     '<span class="year">'+ toNepNum(cur.year) +'</span>';
            html +=   '</div>';
            html +=   '<div class="clickable-month-year-trigger" data-action="show-month-list" aria-label="Choose month/year" role="button" tabindex="0"></div>';
            html +=   '<div class="english-date-header">'+ englishHeaderFor(cur.year, cur.month) +'</div>';
            html += '</div>';
  
            html += '<div class="nav-btn next-month" data-action="next-month" title="Next Month" aria-label="Next Month" role="button" tabindex="0">&#8250;</div>';
            html += '<div class="nav-btn next-year'+(canNextY?'':' disabled')+'" data-action="next-year" title="Next Year" aria-label="Next Year" role="button" tabindex="0">&#187;</div>';
            html += '</div>';
  
            html += '<div class="datepicker-body">';
            html +=   '<div class="weekdays">';
            for (var i=0;i<7;i++) html += '<div class="weekday">'+ dayNamesShort[settings.language][i] +'</div>';
            html +=   '</div>';
  
            html +=   '<div class="days">';
            var first = firstWeekday(cur);
            var daysIn = getDaysInMonth(cur);
            var today  = getTodayBS();
  
            // prev month tail
            var pm = cur.month===1?12:cur.month-1;
            var py = cur.month===1?cur.year-1:cur.year;
            var pmDim = getDaysInMonth({year:py,month:pm,day:1});
            for (var p=first-1; p>=0; p--) {
              var pd = pmDim - p;
              var eP = bsToAD({year:py,month:pm,day:pd});
              html += '<div class="day other-month" aria-disabled="true"><div class="nepali-date">'+ toNepNum(pd) +'</div><div class="english-date-subscript">'+ eP.day +'</div></div>';
            }
  
            // current month
            for (var d=1; d<=daysIn; d++) {
              var isT = same({year:cur.year,month:cur.month,day:d}, today);
              var isS = state.selected && same({year:cur.year,month:cur.month,day:d}, state.selected);
              var cls = 'day' + (isT?' today':'') + (isS?' selected':'');
              var eD = bsToAD({year:cur.year,month:cur.month,day:d});
              html += '<div class="'+cls+'" data-action="select-day" data-day="'+d+'" aria-label="Select '+d+'" role="button" tabindex="0">';
              html +=   '<div class="nepali-date">'+ toNepNum(d) +'</div><div class="english-date-subscript">'+ eD.day +'</div>';
              html += '</div>';
            }
  
            // next month head to fill 35 cells
            var totalFilled = first + daysIn;
            var remain = 35 - totalFilled;
            var nm = cur.month===12?1:cur.month+1;
            var ny = cur.month===12?cur.year+1:cur.year;
            for (var n=1; n<=remain; n++) {
              var eN = bsToAD({year:ny,month:nm,day:n});
              html += '<div class="day other-month" aria-disabled="true"><div class="nepali-date">'+ toNepNum(n) +'</div><div class="english-date-subscript">'+ eN.day +'</div></div>';
            }
  
            html +=   '</div>'; // .days
            if (settings.showToday) {
              html += '<div class="datepicker-footer"><div class="btn-today" data-action="today" aria-label="Select Today" role="button" tabindex="0">Today</div></div>';
            }
            html += '</div>'; // body
          }
          else if (state.view === 'year'){
            var years = Object.keys(bsCalendarData).map(Number);
            var minY = Math.min.apply(Math, years);
            var maxY = Math.max.apply(Math, years);
            var base = Math.floor(state.current.year/12)*12;
            var start = Math.max(minY, Math.min(maxY-11, base));
  
            html += '<div class="datepicker-header">';
            html += '<div class="nav-btn prev-decade'+(start-12>=minY?'':' disabled')+'" data-action="prev-decade" title="Previous 12 years" aria-label="Previous 12 years" role="button" tabindex="0">&#171;</div>';
            html += '<div class="year-range"><span>'+ toNepNum(start) +' - '+ toNepNum(start+11) +'</span></div>';
            html += '<div class="nav-btn next-decade'+(start+12<=maxY?'':' disabled')+'" data-action="next-decade" title="Next 12 years" aria-label="Next 12 years" role="button" tabindex="0">&#187;</div>';
            html += '</div>';
  
            html += '<div class="datepicker-body year-view">';
            for (var y=start; y<start+12; y++) {
              var c = 'year-item';
              if (y === state.current.year) c += ' current';
              if (state.selected && y === state.selected.year) c += ' selected';
              if (!isYearValid(y)) c += ' disabled';
              html += '<div class="'+c+'" data-action="select-year" data-year="'+y+'" '+(!isYearValid(y)?'aria-disabled="true"':'')+' role="button" tabindex="0">'+ toNepNum(y) +'</div>';
            }
            html += '</div>';
          }
          else if (state.view === 'monthList'){
            var canPY = isYearValid(state.current.year-1);
            var canNY = isYearValid(state.current.year+1);
  
            html += '<div class="datepicker-header">';
            html += '<div class="nav-btn prev-year'+(canPY?'':' disabled')+'" data-action="prev-year" title="Previous Year" aria-label="Previous Year" role="button" tabindex="0">&#8249;</div>';
            html += '<div class="year-display"><div class="clickable-year" data-action="show-year-range" aria-label="Choose year" role="button" tabindex="0">'+ toNepNum(state.current.year) +'</div></div>';
            html += '<div class="nav-btn next-year'+(canNY?'':' disabled')+'" data-action="next-year" title="Next Year" aria-label="Next Year" role="button" tabindex="0">&#8250;</div>';
            html += '</div>';
  
            html += '<div class="datepicker-body month-list-view">';
            for (var m=1; m<=12; m++) {
              var cls2 = 'month-item' + (m===state.current.month?' current':'') + (state.selected && m===state.selected.month?' selected':'');
              html += '<div class="'+cls2+'" data-action="select-month" data-month="'+m+'" role="button" tabindex="0">'+ monthNames[settings.language][m-1] +'</div>';
            }
            html += '</div>';
          }
  
          state.$dp[0].innerHTML = html;
          state.$dp.data('__ndp_close__', close);
          state.$dp.data('__ndp_position__', positionThrottled);
        }
  
        function bindOnce(){
          if (state.bound || !state.$dp) return;
          state.bound = true;
  
          // Click actions
          state.$dp.on('click.ndp', '[data-action]', function(e){
            e.preventDefault(); e.stopPropagation();
            var $t = $(this), action = $t.data('action');
            if ($t.hasClass('disabled') || $t.attr('aria-disabled') === 'true') return;
  
            var cur = state.current;
  
            switch(action){
              case 'prev-year':
                if (isYearValid(cur.year-1)) { cur.year--; cur.day = Math.min(cur.day||1, getDaysInMonth(cur)); render(); }
                break;
              case 'next-year':
                if (isYearValid(cur.year+1)) { cur.year++; cur.day = Math.min(cur.day||1, getDaysInMonth(cur)); render(); }
                break;
              case 'prev-month':
                cur.month--; if (cur.month<1) { cur.month=12; cur.year--; }
                if (!isYearValid(cur.year)) { cur.year = Math.min.apply(Math,Object.keys(bsCalendarData).map(Number)); cur.month=1; }
                cur.day = Math.min(cur.day||1, getDaysInMonth(cur)); render();
                break;
              case 'next-month':
                cur.month++; if (cur.month>12) { cur.month=1; cur.year++; }
                if (!isYearValid(cur.year)) { cur.year = Math.max.apply(Math,Object.keys(bsCalendarData).map(Number)); cur.month=12; }
                cur.day = Math.min(cur.day||1, getDaysInMonth(cur)); render();
                break;
              case 'prev-decade':
                if (isYearValid(cur.year-12)) cur.year -= 12; else cur.year = Math.min.apply(Math,Object.keys(bsCalendarData).map(Number));
                cur.day = Math.min(cur.day||1, getDaysInMonth(cur)); render();
                break;
              case 'next-decade':
                if (isYearValid(cur.year+12)) cur.year += 12; else cur.year = Math.max.apply(Math,Object.keys(bsCalendarData).map(Number));
                cur.day = Math.min(cur.day||1, getDaysInMonth(cur)); render();
                break;
              case 'select-year':
                var y = parseInt($t.data('year'),10);
                if (isYearValid(y)) { cur.year = y; cur.day = Math.min(cur.day||1, getDaysInMonth(cur)); state.view='monthList'; render(); }
                break;
              case 'show-month-list':
                state.view = 'monthList'; render();
                break;
              case 'show-year-range':
                state.view = 'year'; render();
                break;
              case 'select-month':
                cur.month = parseInt($t.data('month'),10);
                cur.day = Math.min(cur.day||1, getDaysInMonth(cur));
                state.view='month'; render();
                break;
              case 'select-day':
                var d = parseInt($t.data('day'),10);
                state.selected = { year: cur.year, month: cur.month, day: d };
                $input.val(fmt(settings, state.selected));
                if (settings.autoClose) close();
                if (settings.onSelect) settings.onSelect.call($input[0], state.selected, fmt(settings, state.selected));
                break;
              case 'today':
                var t = getTodayBS();
                state.current  = { year: t.year, month: t.month, day: t.day };
                state.selected = { year: t.year, month: t.month, day: t.day };
                $input.val(fmt(settings, state.selected));
                if (settings.autoClose) close();
                if (settings.onSelect) settings.onSelect.call($input[0], state.selected, fmt(settings, state.selected));
                break;
            }
          });
  
          // Keyboard: Enter/Space to activate role="button"
          state.$dp.on('keydown.ndp', '[data-action][role="button"]', function(e){
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              $(this).trigger('click');
            }
          });
  
          // Prevent outside-click close when interacting inside
          state.$dp.on('mousedown.ndp', function(e){ e.stopPropagation(); });
        }
  
        // input triggers
        $input
          .off('click.ndp focus.ndp mousedown.ndp')
          .on('click.ndp focus.ndp', function(e){ e.preventDefault(); e.stopPropagation(); open(); })
          .on('mousedown.ndp', function(e){ e.stopPropagation(); });
  
        // public API
        $input.data('nepaliDatepicker', {
          show: open,
          hide: close,
          getDate: function(){ return state.selected; },
          setDate: function(date){
            var bs;
            if (date && typeof date === 'object' && 'year' in date && 'month' in date) {
              bs = { year: +date.year, month: +date.month, day: +(date.day||1) };
            } else if (date instanceof Date) {
              bs = adToBS(date);
            } else if (typeof date === 'string' && !isNaN(Date.parse(date))) {
              bs = adToBS(new Date(date));
            } else {
              bs = getTodayBS();
            }
            var dmax = getDaysInMonth(bs);
            if (bs.day < 1) bs.day = 1;
            if (bs.day > dmax) bs.day = dmax;
  
            state.selected = { year: bs.year, month: bs.month, day: bs.day };
            state.current  = { year: bs.year, month: bs.month, day: bs.day };
            $input.val(fmt(settings, state.selected));
            render();
          },
          clear: function(){ state.selected=null; $input.val(''); render(); },
          destroy: function(){
            // close UI
            close();
            // unbind instance events
            if (state.$dp){ state.$dp.off('.ndp').remove(); state.$dp=null; }
            if (state.$overlay){ state.$overlay.off('.ndp').remove(); state.$overlay=null; }
            $input.off('.ndp')
                  .removeData('nepaliDatepicker')
                  .removeData('__ndp_settings__')
                  .removeAttr('aria-expanded')
                  .removeAttr('readonly');
            INSTANCES--;
            if (INSTANCES <= 0) unbindGlobalIfIdle();
          }
        });
      });
    };
  

    //conversion
    function parseYMDString(s){
        var m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(String(s||'').trim());
        return m ? { year:+m[1], month:+m[2], day:+m[3] } : null;
      }
      function pad2(n){ return (n<10?'0':'')+n; }
      function toYMDString(o){ return o.year + '-' + pad2(o.month) + '-' + pad2(o.day); }
  
      // AD -> BS
      window.adtobs = function(input, format){
        var asString = format === 'string' || (format && format.format === 'string') || format === true;
        var ad;
  
        if (input instanceof Date) {
          // Use local parts to avoid timezone off-by-one
          ad = { year: input.getFullYear(), month: input.getMonth()+1, day: input.getDate() };
        } else if (typeof input === 'string') {
          ad = parseYMDString(input);
          if (!ad) {
            // Fallback: try Date constructor (best-effort)
            var d = new Date(input);
            if (isNaN(d)) throw new Error('adtobs: invalid date string');
            ad = { year: d.getFullYear(), month: d.getMonth()+1, day: d.getDate() };
          }
        } else if (input && typeof input === 'object') {
          ad = { year:+input.year, month:+input.month, day:+(input.day||1) };
        } else {
          throw new Error('adtobs: invalid input');
        }
  
        var bs = adToBS(ad);
        return asString ? toYMDString(bs) : bs;
      };
  
      // BS -> AD
      window.bs2ad = function(input, format){
        var asString = format === 'string' || (format && format.format === 'string') || format === true;
        var bs;
  
        if (typeof input === 'string') {
          bs = parseYMDString(input);
          if (!bs) throw new Error('bs2ad: invalid BS date string (expected YYYY-MM-DD)');
        } else if (input && typeof input === 'object') {
          bs = { year:+input.year, month:+input.month, day:+(input.day||1) };
        } else {
          throw new Error('bs2ad: invalid input');
        }
  
        var ad = bsToAD(bs);
        return asString ? toYMDString(ad) : ad;
      };

        function positionPickerBelow($input) {
    const $dp = getOpenPickerEl();
    if (!$dp) return;
  
    // Temporarily show for measurement if hidden
    const wasHidden = $dp.css('display') === 'none';
    if (wasHidden) $dp.css({ display: 'block', visibility: 'hidden' });
  
    const off  = $input.offset();
    const ih   = $input.outerHeight();
    const dw   = $dp.outerWidth() || 320;
    const dh   = $dp.outerHeight() || 280;
  
    const $win = $(window);
    const vw   = $win.width();
    const vh   = $win.height();
    const sl   = $win.scrollLeft();
    const st   = $win.scrollTop();
  
    // Prefer below → flip above if needed → clamp
    const spaceBelow = (st + vh) - (off.top + ih);
    const spaceAbove = (off.top - st);
    let top;
  
    if (spaceBelow >= dh + 8) top = off.top + ih + 6;
    else if (spaceAbove >= dh + 8) top = off.top - dh - 6;
    else top = Math.min(Math.max(off.top + ih + 6, st + 8), (st + vh) - dh - 8);
  
    // Align left to input; clamp inside viewport
    let left = off.left;
    const maxLeft = sl + vw - dw - 10;
    if (left > maxLeft) left = Math.max(sl + 10, maxLeft);
    if (left < sl + 10) left = sl + 10;
  
    $dp.css({ position: 'absolute', top, left, zIndex: 9999 })
       .toggleClass('positioned-above', top < off.top)
       .toggleClass('positioned-below', top >= off.top);
  
    if (wasHidden) $dp.css({ visibility: '', display: 'none' });
  }
  })(jQuery);
    function positionPickerBelow($input) {
    const $dp = getOpenPickerEl();
    if (!$dp) return;
  
    // Temporarily show for measurement if hidden
    const wasHidden = $dp.css('display') === 'none';
    if (wasHidden) $dp.css({ display: 'block', visibility: 'hidden' });
  
    const off  = $input.offset();
    const ih   = $input.outerHeight();
    const dw   = $dp.outerWidth() || 320;
    const dh   = $dp.outerHeight() || 280;
  
    const $win = $(window);
    const vw   = $win.width();
    const vh   = $win.height();
    const sl   = $win.scrollLeft();
    const st   = $win.scrollTop();
  
    // Prefer below → flip above if needed → clamp
    const spaceBelow = (st + vh) - (off.top + ih);
    const spaceAbove = (off.top - st);
    let top;
  
    if (spaceBelow >= dh + 8) top = off.top + ih + 6;
    else if (spaceAbove >= dh + 8) top = off.top - dh - 6;
    else top = Math.min(Math.max(off.top + ih + 6, st + 8), (st + vh) - dh - 8);
  
    // Align left to input; clamp inside viewport
    let left = off.left;
    const maxLeft = sl + vw - dw - 10;
    if (left > maxLeft) left = Math.max(sl + 10, maxLeft);
    if (left < sl + 10) left = sl + 10;
  
    $dp.css({ position: 'absolute', top, left, zIndex: 9999 })
       .toggleClass('positioned-above', top < off.top)
       .toggleClass('positioned-below', top >= off.top);
  
    if (wasHidden) $dp.css({ visibility: '', display: 'none' });
  }