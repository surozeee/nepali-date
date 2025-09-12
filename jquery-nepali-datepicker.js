;/**
 * jQuery Nepali Datepicker Plugin (no external v5 lib)
 * - Internal BS↔AD converter (1970–2100)
 * - rAF-throttled positioning, idempotent bindings, full cleanup
 * - Fixes English header NaN and year→month grid transitions
 */
(function ($) {
    'use strict';
  
    var defaults = {
      theme: 'light',
      language: 'nepali',
      dateFormat: 'YYYY-MM-DD',
      placeholder: 'Select Date',
      showToday: true,
      showClear: true,
      autoClose: true,
      modal: false,
      showEnglishDate: true,
      onSelect: null,
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
  
    // === BS Calendar data (1970–2100) ===
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
    if (!bsCalendarData || !bsCalendarData[2000] || bsCalendarData[2000].length !== 12) {
      throw new Error('Invalid bsCalendarData.');
    }
  
    // ===== Internal conversion engine =====
    var REF_BS = { year: 2000, month: 9, day: 17 }; // BS
    var REF_AD = new Date(1944, 0, 1);              // AD
  
    function isYearValid(y){ return !!bsCalendarData[y]; }
    function daysInMonth_Internal(bs){ return (bsCalendarData[bs.year] && bsCalendarData[bs.year][bs.month-1]) || 30; }
    function clampBS(bs){
      var years = Object.keys(bsCalendarData).map(Number);
      var minY = Math.min.apply(Math, years), maxY = Math.max.apply(Math, years);
      if (bs.year < minY) bs.year = minY;
      if (bs.year > maxY) bs.year = maxY;
      if (bs.month < 1) bs.month = 1;
      if (bs.month > 12) bs.month = 12;
      var dim = daysInMonth_Internal(bs);
      if (bs.day == null || bs.day < 1) bs.day = 1;
      if (bs.day > dim) bs.day = dim;
      return bs;
    }
    function compareBS(a,b){ if(a.year!==b.year) return a.year-b.year; if(a.month!==b.month) return a.month-b.month; return a.day-b.day; }
    function addDaysBS(bs, delta){
      var y=bs.year,m=bs.month,d=bs.day;
      if(delta===0) return {year:y,month:m,day:d};
      if(delta>0){
        d+=delta;
        for(;;){
          var dim=daysInMonth_Internal({year:y,month:m,day:1});
          if(d<=dim) break;
          d-=dim; m++; if(m>12){m=1;y++; if(!isYearValid(y)){y=Math.max.apply(Math,Object.keys(bsCalendarData).map(Number)); d=Math.min(d,daysInMonth_Internal({year:y,month:m,day:1})); break;}}
        }
      }else{
        d+=delta;
        while(d<1){
          m--; if(m<1){m=12;y--; if(!isYearValid(y)){y=Math.min.apply(Math,Object.keys(bsCalendarData).map(Number)); d=1; break;}}
          d+=daysInMonth_Internal({year:y,month:m,day:1});
        }
      }
      return {year:y,month:m,day:d};
    }
    function totalDaysFromRefToBS(target){
      target = clampBS(target);
      if(target.year===REF_BS.year && target.month===REF_BS.month && target.day===REF_BS.day) return 0;
      var dir = compareBS(target, REF_BS) >= 0 ? 1 : -1;
      var cur = {year:REF_BS.year,month:REF_BS.month,day:REF_BS.day};
      var total = 0;
  
      if(dir>0){
        total += (daysInMonth_Internal(cur) - cur.day);
        cur.day = 1; cur.month++; if(cur.month>12){cur.month=1;cur.year++;}
        while(cur.year<target.year || (cur.year===target.year && cur.month<target.month)){
          total += daysInMonth_Internal(cur);
          cur.month++; if(cur.month>12){cur.month=1;cur.year++;}
        }
        total += target.day; total -= 1;
      }else{
        total += (cur.day - 1);
        cur.day = 1; cur.month--; if(cur.month<1){cur.month=12;cur.year--;}
        while(cur.year>target.year || (cur.year===target.year && cur.month>target.month)){
          total += daysInMonth_Internal(cur);
          cur.month--; if(cur.month<1){cur.month=12;cur.year--;}
        }
        total += (daysInMonth_Internal(target) - target.day);
        total -= 1; total = -total;
      }
      return total;
    }
    function convertADToBS_Internal(adDate){
      var diffDays = Math.floor((adDate.getTime() - REF_AD.getTime()) / 86400000);
      return addDaysBS({year:REF_BS.year,month:REF_BS.month,day:REF_BS.day}, diffDays);
    }
    function convertBSToAD_Internal(y,m,d){
      var target = clampBS({year:y,month:m,day:d});
      var delta = totalDaysFromRefToBS(target);
      var ad = new Date(REF_AD.getTime() + delta * 86400000);
      return {year:ad.getFullYear(), month:ad.getMonth()+1, day:ad.getDate()};
    }
  
    // public conversion helpers (internal only)
    function toBS(ad){ return convertADToBS_Internal(ad instanceof Date ? ad : new Date(ad.year, ad.month-1, ad.day)); }
    function toAD(bs){ return convertBSToAD_Internal(bs.year, bs.month, bs.day); }
    function bsDaysInMonth(year, month){ return daysInMonth_Internal({year:year,month:month,day:1}); }
  
    // ===== Widget helpers =====
    var ACTIVE = null;
    function getCurrentNepaliDate(){ return toBS(new Date()); }
    function getEnglishDate(nepaliDate){
      var y = nepaliDate.year, m = nepaliDate.month, d = nepaliDate.day || 1;
      return toAD({year:y,month:m,day:d});
    }
    function getDaysInMonth(bs){ return bsDaysInMonth(bs.year, bs.month); }
    function firstWeekdayOfMonth(bs){
      var ad = toAD({year:bs.year, month:bs.month, day:1});
      return new Date(ad.year, ad.month-1, ad.day).getDay();
    }
    function sameDate(a,b){ return a && b && a.year===b.year && a.month===b.month && a.day===b.day; }
    function toNepNum(s){ var map=['०','१','२','३','४','५','६','७','८','९']; return String(s).replace(/\d/g, function(d){ return map[+d]; }); }
    function fmt(settings, date){
      if(!date) return '';
      var y = settings.language==='nepali'? toNepNum(date.year) : date.year;
      var m = settings.language==='nepali'? toNepNum(date.month) : String(date.month).padStart(2,'0');
      var d = settings.language==='nepali'? toNepNum(date.day)   : String(date.day).padStart(2,'0');
      return settings.dateFormat.replace('YYYY',y).replace('MM',m).replace('DD',d);
    }
    function rafThrottle(fn){ var queued=false; return function(){ if(queued) return; queued=true; requestAnimationFrame(function(){ queued=false; fn();}); }; }
  
    $.fn.nepaliDatepicker = function (options) {
      return this.each(function () {
        var $input = $(this);
        var settings = $.extend({}, defaults, options || {});
        // persist settings so app code can re-init with merged options
        $input.data('__ndp_settings__', settings);
  
        var state = {
          isOpen: false,
          selected: null,
          current: getCurrentNepaliDate(),
          view: 'month',
          $dp: null,
          $overlay: null,
          bound: false
        };
  
        $input.attr('readonly', true).attr('placeholder', settings.placeholder);
  
        function build(){
          if (state.$dp) return;
          var $dp = $('<div class="nepali-datepicker '+settings.theme+'"></div>').hide();
          state.$dp = $dp;
  
          if (settings.modal){
            var $ov = $('<div class="nepali-datepicker-modal-overlay"></div>').hide();
            var $content = $('<div class="nepali-datepicker-modal-content"></div>');
            $content.append($dp); $ov.append($content);
            $('body').append($ov);
            state.$overlay = $ov;
          } else {
            $('body').append($dp);
          }
          bindOnce();
        }
  
        function open(){
          if (state.isOpen) return;
  
          if (ACTIVE && ACTIVE !== state.$dp){
            var closeOther = $(ACTIVE).data('__ndp_close__');
            if (closeOther) closeOther();
          }
  
          build();
          render();
  
          state.isOpen = true;
          ACTIVE = state.$dp;
          $input.attr('data-nepali-datepicker-active','true');
  
          if (settings.modal && state.$overlay){
            state.$overlay.css('display','flex').addClass('ndp-enter');
            requestAnimationFrame(function(){ state.$overlay.removeClass('ndp-enter'); });
          } else {
            positionThrottled();
            state.$dp.addClass('ndp-enter').show(0);
            requestAnimationFrame(function(){ state.$dp.removeClass('ndp-enter'); });
          }
          if (settings.onOpen) settings.onOpen();
        }
  
        function close(){
          if (!state.isOpen) return;
          state.isOpen = false;
          $input.removeAttr('data-nepali-datepicker-active');
          if (ACTIVE === state.$dp) ACTIVE = null;
  
          if (settings.modal && state.$overlay){
            state.$overlay.addClass('ndp-leave');
            setTimeout(function(){ state.$overlay.removeClass('ndp-leave').hide(); }, 180);
          } else if (state.$dp){
            state.$dp.addClass('ndp-leave');
            setTimeout(function(){ state.$dp.removeClass('ndp-leave').hide(); }, 180);
          }
          if (settings.onClose) settings.onClose();
        }
        function exposeClose(){ state.$dp && state.$dp.data('__ndp_close__', close); }
  
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
  
        function render(){
          var cur = state.current;
          var html = '';
  
          if (state.view === 'month'){
            var canPrevY = isYearValid(cur.year - 1);
            var canNextY = isYearValid(cur.year + 1);
  
            html += '<div class="datepicker-header">';
            html += '<button type="button" class="nav-btn prev-year'+(canPrevY?'':' disabled')+'" data-action="prev-year" title="Previous Year">&#171;</button>';
            html += '<button type="button" class="nav-btn prev-month" data-action="prev-month" title="Previous Month">&#8249;</button>';
  
            // English header from day=1
            var engHead = getEnglishDate({year:cur.year, month:cur.month, day:1});
            var nextMonth = engHead.month === 12 ? 1 : engHead.month + 1;
            var nextYear  = engHead.month === 12 ? engHead.year + 1 : engHead.year;
  
            html += '<div class="month-year">';
            html +=   '<div class="nepali-date-display">';
            html +=     '<span class="month">'+ monthNames[settings.language][cur.month-1] +'</span> ';
            html +=     '<span class="year">'+ toNepNum(cur.year) +'</span>';
            html +=   '</div>';
            html +=   '<div class="clickable-month-year-trigger" data-action="show-month-list"></div>';
            html +=   '<div class="english-date-header">'+ englishMonthNamesShort[engHead.month-1] +' '+ engHead.year +' / '+ englishMonthNamesShort[nextMonth-1] +' '+ nextYear +'</div>';
            html += '</div>';
  
            html += '<button type="button" class="nav-btn next-month" data-action="next-month" title="Next Month">&#8250;</button>';
            html += '<button type="button" class="nav-btn next-year'+(canNextY?'':' disabled')+'" data-action="next-year" title="Next Year">&#187;</button>';
            html += '</div>';
  
            html += '<div class="datepicker-body">';
            html += '<div class="weekdays">';
            for (var i=0;i<7;i++) html += '<div class="weekday">'+ dayNamesShort[settings.language][i] +'</div>';
            html += '</div>';
  
            html += '<div class="days">';
            var first = firstWeekdayOfMonth(cur);
            var dim = getDaysInMonth(cur);
            var today = getCurrentNepaliDate();
  
            // prev month tail
            var prevM = cur.month===1?12:cur.month-1;
            var prevY = cur.month===1?cur.year-1:cur.year;
            var prevDim = getDaysInMonth({year:prevY,month:prevM,day:1});
            for (var p=first-1; p>=0; p--) {
              var pd = prevDim - p;
              var engP = getEnglishDate({year:prevY,month:prevM,day:pd});
              html += '<div class="day other-month" data-day="'+pd+'"><div class="nepali-date">'+ toNepNum(pd) +'</div><div class="english-date-subscript">'+ engP.day +'</div></div>';
            }
  
            // current month
            for (var d=1; d<=dim; d++) {
              var isT = sameDate({year:cur.year,month:cur.month,day:d}, today);
              var isS = state.selected && sameDate({year:cur.year,month:cur.month,day:d}, state.selected);
              var classes = 'day' + (isT?' today':'') + (isS?' selected':'');
              var engD = getEnglishDate({year:cur.year,month:cur.month,day:d});
              html += '<div class="'+classes+'" data-action="select-day" data-day="'+d+'"><div class="nepali-date">'+ toNepNum(d) +'</div><div class="english-date-subscript">'+ engD.day +'</div></div>';
            }
  
            // next month head to fill 35 cells
            var filled = first + dim;
            var remain = 35 - filled;
            var nextM = cur.month===12?1:cur.month+1;
            var nextY = cur.month===12?cur.year+1:cur.year;
            for (var n=1; n<=remain; n++) {
              var engN = getEnglishDate({year:nextY,month:nextM,day:n});
              html += '<div class="day other-month" data-day="'+n+'"><div class="nepali-date">'+ toNepNum(n) +'</div><div class="english-date-subscript">'+ engN.day +'</div></div>';
            }
  
            html += '</div>'; // .days
            if (settings.showToday) {
              html += '<div class="datepicker-footer"><button type="button" class="btn-today" data-action="today">Today</button></div>';
            }
            html += '</div>'; // body
          }
          else if (state.view === 'year'){
            var prevDecade = state.current.year - 12;
            var nextDecade = state.current.year + 12;
            var years = Object.keys(bsCalendarData).map(Number);
            var minY = Math.min.apply(Math, years);
            var maxY = Math.max.apply(Math, years);
            var canPrevDec = prevDecade >= minY;
            var canNextDec = nextDecade <= maxY;
  
            var start = Math.max(minY, Math.min(maxY-11, Math.floor(state.current.year/12)*12));
  
            html += '<div class="datepicker-header">';
            html += '<button type="button" class="nav-btn prev-decade'+(canPrevDec?'':' disabled')+'" data-action="prev-decade" title="Previous Decade">&#171;</button>';
            html += '<div class="year-range"><span>'+ toNepNum(start) +' - '+ toNepNum(start+11) +'</span></div>';
            html += '<button type="button" class="nav-btn next-decade'+(canNextDec?'':' disabled')+'" data-action="next-decade" title="Next Decade">&#187;</button>';
            html += '</div>';
  
            html += '<div class="datepicker-body year-view">';
            for (var y=start; y<start+12; y++) {
              var cls = 'year-item';
              if (y === state.current.year) cls += ' current';
              if (state.selected && y === state.selected.year) cls += ' selected';
              if (!isYearValid(y)) cls += ' disabled';
              html += '<div class="'+cls+'" data-action="select-year" data-year="'+y+'">'+ toNepNum(y) +'</div>';
            }
            html += '</div>';
          }
          else if (state.view === 'monthList'){
            var canPY = isYearValid(state.current.year-1);
            var canNY = isYearValid(state.current.year+1);
            html += '<div class="datepicker-header">';
            html += '<button type="button" class="nav-btn prev-year'+(canPY?'':' disabled')+'" data-action="prev-year" title="Previous Year">&#8249;</button>';
            html += '<div class="year-display clickable-year-display"><span class="clickable-year" data-action="show-year-range">'+ toNepNum(state.current.year) +'</span></div>';
            html += '<button type="button" class="nav-btn next-year'+(canNY?'':' disabled')+'" data-action="next-year" title="Next Year">&#8250;</button>';
            html += '</div>';
  
            html += '<div class="datepicker-body month-list-view">';
            for (var m=1; m<=12; m++) {
              var cls2 = 'month-item' + (m===state.current.month?' current':'') + (state.selected && m===state.selected.month?' selected':'');
              html += '<div class="'+cls2+'" data-action="select-month" data-month="'+m+'">'+ monthNames[settings.language][m-1] +'</div>';
            }
            html += '</div>';
          }
  
          state.$dp[0].innerHTML = html;
          exposeClose();
        }
  
        function bindOnce(){
          if (state.bound || !state.$dp) return;
          state.bound = true;
  
          state.$dp.on('click.ndp', '[data-action]', function(e){
            e.preventDefault(); e.stopPropagation();
            var $t = $(this), action = $t.data('action');
            var cur = state.current;
  
            switch(action){
              case 'prev-year':
                if (isYearValid(cur.year-1)) { cur.year--; if (cur.day==null) cur.day=1; var dim1=getDaysInMonth(cur); if(cur.day>dim1) cur.day=dim1; render(); }
                break;
              case 'next-year':
                if (isYearValid(cur.year+1)) { cur.year++; if (cur.day==null) cur.day=1; var dim2=getDaysInMonth(cur); if(cur.day>dim2) cur.day=dim2; render(); }
                break;
              case 'prev-month':
                cur.month--; if (cur.month<1) { cur.month=12; cur.year--; }
                if (!isYearValid(cur.year)) { cur.year = Math.min.apply(Math,Object.keys(bsCalendarData).map(Number)); cur.month=1; }
                if (cur.day==null) cur.day=1; var dim3=getDaysInMonth(cur); if(cur.day>dim3) cur.day=dim3; render();
                break;
              case 'next-month':
                cur.month++; if (cur.month>12) { cur.month=1; cur.year++; }
                if (!isYearValid(cur.year)) { cur.year = Math.max.apply(Math,Object.keys(bsCalendarData).map(Number)); cur.month=12; }
                if (cur.day==null) cur.day=1; var dim4=getDaysInMonth(cur); if(cur.day>dim4) cur.day=dim4; render();
                break;
              case 'prev-decade':
                if (isYearValid(cur.year-12)) cur.year -= 12; else cur.year = Math.min.apply(Math,Object.keys(bsCalendarData).map(Number));
                if (cur.day==null) cur.day=1; var dim5=getDaysInMonth(cur); if(cur.day>dim5) cur.day=dim5; render();
                break;
              case 'next-decade':
                if (isYearValid(cur.year+12)) cur.year += 12; else cur.year = Math.max.apply(Math,Object.keys(bsCalendarData).map(Number));
                if (cur.day==null) cur.day=1; var dim6=getDaysInMonth(cur); if(cur.day>dim6) cur.day=dim6; render();
                break;
              case 'select-year':
                var y = parseInt($t.data('year'),10);
                if (isYearValid(y)) { cur.year = y; if (cur.day==null) cur.day=1; var dim7=getDaysInMonth(cur); if(cur.day>dim7) cur.day=dim7; state.view='monthList'; render(); }
                break;
              case 'show-month-list':
                state.view = 'monthList'; render();
                break;
              case 'show-year-range':
                state.view = 'year'; render();
                break;
              case 'select-month':
                cur.month = parseInt($t.data('month'),10); if (cur.day==null) cur.day=1; var dim8=getDaysInMonth(cur); if(cur.day>dim8) cur.day=dim8; state.view='month'; render();
                break;
              case 'select-day':
                var d = parseInt($t.data('day'),10);
                state.selected = { year: cur.year, month: cur.month, day: d };
                $input.val(fmt(settings, state.selected));
                if (settings.autoClose) close();
                if (settings.onSelect) settings.onSelect.call($input[0], state.selected, fmt(settings, state.selected));
                break;
              case 'today':
                var t = getCurrentNepaliDate();
                state.current = { year: t.year, month: t.month, day: t.day };
                state.selected = { year: t.year, month: t.month, day: t.day };
                $input.val(fmt(settings, state.selected));
                if (settings.autoClose) close();
                if (settings.onSelect) settings.onSelect.call($input[0], state.selected, fmt(settings, state.selected));
                break;
            }
          });
  
          state.$dp.on('mousedown.ndp', function(e){ e.stopPropagation(); });
  
          if (settings.modal && state.$overlay){
            state.$overlay.on('click.ndp', function(e){ if (e.target === state.$overlay[0]) close(); });
            state.$overlay.find('.nepali-datepicker-modal-content').on('click.ndp', function(e){ e.stopPropagation(); });
          }
  
          $(document).off('mousedown.ndp-global').on('mousedown.ndp-global', function(e){
            if (!state.isOpen) return;
            if ($(e.target).closest($input).length) return;
            if ($(e.target).closest(state.$dp).length) return;
            if (settings.modal && $(e.target).closest('.nepali-datepicker-modal-overlay').length) return;
            close();
          });
  
          var onWin = function(){ if (state.isOpen && !settings.modal) positionThrottled(); };
          $(window).off('resize.ndp-global scroll.ndp-global').on('resize.ndp-global scroll.ndp-global', onWin);
        }
  
        $input
          .off('click.ndp focus.ndp mousedown.ndp')
          .on('click.ndp focus.ndp', function(e){ e.preventDefault(); e.stopPropagation(); open(); })
          .on('mousedown.ndp', function(e){ e.stopPropagation(); });
  
        $input.data('nepaliDatepicker', {
          show: open,
          hide: close,
          getDate: function(){ return state.selected; },
          setDate: function(date){
            var bs = {year: date.year, month: date.month, day: date.day || 1};
            var dim = getDaysInMonth(bs); if (bs.day>dim) bs.day=dim;
            state.selected = {year:bs.year, month:bs.month, day:bs.day};
            state.current  = {year:bs.year, month:bs.month, day:bs.day};
            $input.val(fmt(settings, state.selected));
            render();
          },
          clear: function(){ state.selected=null; $input.val(''); render(); },
          destroy: function(){
            close();
            $(document).off('mousedown.ndp-global');
            $(window).off('resize.ndp-global scroll.ndp-global');
            if (state.$dp) { state.$dp.off('.ndp').removeData('__ndp_close__').remove(); }
            if (state.$overlay) { state.$overlay.off('.ndp').remove(); }
            $input.removeData('nepaliDatepicker').removeAttr('data-nepali-datepicker-active').off('.ndp');
          }
        });
  
        build();
      });
    };
  
    // --- expose converters for external use (INSIDE IIFE) ---
    $.nepaliDate = $.nepaliDate || {};
    $.nepaliDate.bsToAd = toAD;
    $.nepaliDate.adToBs = toBS;
  
  })(jQuery);
  