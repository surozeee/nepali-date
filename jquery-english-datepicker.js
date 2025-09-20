/*!
 * English Datepicker (jQuery) — Based on Nepali Datepicker
 * A modern, customizable datepicker for English dates with multiple themes
 */
(function ($) {
    'use strict';
  
    /*** ---------------- Options ---------------- ***/
    var defaults = {
        theme: 'light',
        language: 'english',          // 'nepali' | 'english'
        dateFormat: 'YYYY-MM-DD',
        placeholder: 'Select Date',
        showToday: true,
        autoClose: true,
        modal: false,
        onSelect: null,
        onOpen: null,
        onClose: null,
        readonly: false,
        minDate: null,               // Minimum selectable date (AD format: {year, month, day}, 'YYYY-MM-DD', or function)
        maxDate: null,               // Maximum selectable date (AD format: {year, month, day}, 'YYYY-MM-DD', or function)
        disabledDates: [],           // Array of disabled dates (AD format: [{year, month, day}, ...] or ['YYYY-MM-DD', ...])
        disabledDateRanges: [],      // Array of disabled date ranges (AD format: [{start: {year, month, day}, end: {year, month, day}}, ...])
        defaultDate: null,           // Default date to set on initialization (AD format: {year, month, day} or 'YYYY-MM-DD')
        showToday: true,             // Show/hide the today button
        showEnglishDateSubscript: true  // Show/hide English date subscripts
    };
  
    /*** ---------------- Labels ---------------- ***/
    var monthNames = {
        nepali: ['बैशाख','जेष्ठ','आषाढ','श्रावण','भाद्र','आश्विन','कार्तिक','मंसिर','पौष','माघ','फाल्गुन','चैत्र'],
        english:['January','February','March','April','May','June','July','August','September','October','November','December']
    };
    var dayNamesShort = {
        nepali: ['आइत','सोम','मंगल','बुध','बिहि','शुक्र','शनि'],
        english:['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
    };
    var englishMonthNamesShort = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    // Helper functions
    function getDaysInMonth(year, month) {
        return new Date(year, month, 0).getDate();
    }

    function getFirstDayOfMonth(year, month) {
        return new Date(year, month - 1, 1).getDay();
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    function formatDate(settings, date) {
        if (!date) return '';
        var y = date.year;
        var mm = String(date.month).padStart(2, '0');
        var dd = String(date.day).padStart(2, '0');
        return settings.dateFormat.replace('YYYY', y).replace('MM', mm).replace('DD', dd);
    }

    function same(a, b) { 
        return !!a && !!b && a.year === b.year && a.month === b.month && a.day === b.day; 
    }

    // Date validation helper functions
    function isDateDisabled(date, settings) {
        if (!date) return false;
        
        // Check minDate (support both static and dynamic)
        var minDate = settings.minDate;
        if (typeof minDate === 'function') {
            minDate = parseDate(minDate());
        }
        if (minDate) {
            if (date.year < minDate.year) return true;
            if (date.year === minDate.year && date.month < minDate.month) return true;
            if (date.year === minDate.year && date.month === minDate.month && date.day < minDate.day) return true;
        }
        
        // Check maxDate (support both static and dynamic)
        var maxDate = settings.maxDate;
        if (typeof maxDate === 'function') {
            maxDate = parseDate(maxDate());
        }
        if (maxDate) {
            if (date.year > maxDate.year) return true;
            if (date.year === maxDate.year && date.month > maxDate.month) return true;
            if (date.year === maxDate.year && date.month === maxDate.month && date.day > maxDate.day) return true;
        }
        
        // Check disabledDates array
        if (settings.disabledDates && settings.disabledDates.length > 0) {
            for (var i = 0; i < settings.disabledDates.length; i++) {
                if (same(date, settings.disabledDates[i])) return true;
            }
        }
        
        // Check disabledDateRanges array
        if (settings.disabledDateRanges && settings.disabledDateRanges.length > 0) {
            for (var j = 0; j < settings.disabledDateRanges.length; j++) {
                var range = settings.disabledDateRanges[j];
                if (isDateInRange(date, range.start, range.end)) return true;
            }
        }
        
        return false;
    }
    
    function isDateInRange(date, startDate, endDate) {
        if (!date || !startDate || !endDate) return false;
        
        // Convert dates to comparable format (YYYYMMDD)
        var dateNum = date.year * 10000 + date.month * 100 + date.day;
        var startNum = startDate.year * 10000 + startDate.month * 100 + startDate.day;
        var endNum = endDate.year * 10000 + endDate.month * 100 + endDate.day;
        
        return dateNum >= startNum && dateNum <= endNum;
    }
    
    // Helper function to parse date strings or objects
    function parseDate(dateInput, dateType) {
        if (!dateInput) return null;
        
        var parsedDate = null;
        
        if (typeof dateInput === 'string') {
            // Parse string format 'YYYY-MM-DD'
            var match = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(dateInput.trim());
            if (match) {
                parsedDate = {
                    year: parseInt(match[1], 10),
                    month: parseInt(match[2], 10),
                    day: parseInt(match[3], 10)
                };
            }
        } else if (typeof dateInput === 'object' && dateInput.year && dateInput.month && dateInput.day) {
            parsedDate = {
                year: parseInt(dateInput.year, 10),
                month: parseInt(dateInput.month, 10),
                day: parseInt(dateInput.day, 10)
            };
        } else if (dateInput instanceof Date) {
            // Convert Date object
            parsedDate = {
                year: dateInput.getFullYear(),
                month: dateInput.getMonth() + 1,
                day: dateInput.getDate()
            };
        }
        
        if (!parsedDate) return null;
        
        // Validate the parsed date
        if (parsedDate && parsedDate.year && parsedDate.month && parsedDate.day) {
            var daysInMonth = getDaysInMonth(parsedDate.year, parsedDate.month);
            if (parsedDate.day > daysInMonth) {
                parsedDate.day = daysInMonth;
            }
        }
        
        return parsedDate;
    }
    
    // Helper function to normalize settings dates
    function normalizeSettingsDates(settings) {
        // Parse minDate (only if it's not a function)
        if (settings.minDate && typeof settings.minDate !== 'function') {
            settings.minDate = parseDate(settings.minDate);
        }
        
        // Parse maxDate (only if it's not a function)
        if (settings.maxDate && typeof settings.maxDate !== 'function') {
            settings.maxDate = parseDate(settings.maxDate);
        }
        
        // Parse disabledDates
        if (settings.disabledDates && Array.isArray(settings.disabledDates)) {
            settings.disabledDates = settings.disabledDates.map(function(date) {
                return parseDate(date);
            }).filter(function(date) {
                return date !== null;
            });
        }
        
        // Parse disabledDateRanges
        if (settings.disabledDateRanges && Array.isArray(settings.disabledDateRanges)) {
            settings.disabledDateRanges = settings.disabledDateRanges.map(function(range) {
                if (range && range.start && range.end) {
                    return {
                        start: parseDate(range.start),
                        end: parseDate(range.end)
                    };
                }
                return null;
            }).filter(function(range) {
                return range && range.start && range.end;
            });
        }
        
        // Parse defaultDate
        if (settings.defaultDate) {
            settings.defaultDate = parseDate(settings.defaultDate);
        }
    }

    /*** ---------------- Plugin ---------------- ***/
    var ACTIVE = null, ACTIVE_INPUT = null, INSTANCES = 0, GLOBAL_BOUND = false;

    function bindGlobal() {
        if (GLOBAL_BOUND) return;
        GLOBAL_BOUND = true;
        $(document).on('mousedown.edp-global', function(e) {
            if (!ACTIVE) return;
            if ($(e.target).closest(ACTIVE).length) return;
            if ($(e.target).closest(ACTIVE_INPUT).length) return;
            var closeFn = $(ACTIVE).data('__edp_close__');
            if (closeFn) closeFn();
        });
        $(window).on('resize.edp-global scroll.edp-global', function() {
            if (!ACTIVE) return;
            var pos = $(ACTIVE).data('__edp_position__');
            if (pos) pos();
        });
    }
    function unbindGlobalIfIdle() {
        if (INSTANCES > 0) return;
        $(document).off('.edp-global'); $(window).off('.edp-global'); GLOBAL_BOUND = false;
    }

    $.fn.englishDatepicker = function(options) {
        bindGlobal();
        return this.each(function() {
            var $input = $(this);
            var settings = $.extend({}, defaults, options || {});
            
            // Normalize date settings (parse strings to objects)
            normalizeSettingsDates(settings);
            
            $input.attr('readonly', true).attr('placeholder', settings.placeholder);

            var today = new Date();
            var initialDate = settings.defaultDate || {
                year: today.getFullYear(),
                month: today.getMonth() + 1,
                day: today.getDate()
            };
            
            var state = {
                isOpen: false,
                selected: {year: initialDate.year, month: initialDate.month, day: initialDate.day},
                current: {year: initialDate.year, month: initialDate.month, day: initialDate.day},
                view: 'month',
                $dp: null, $overlay: null, bound: false
            };
            INSTANCES++;
            $input.val(formatDate(settings, state.selected));

            function build() {
                if (state.$dp) return;
                var $dp = $('<div class="nepali-datepicker ' + settings.theme + '" role="dialog" aria-label="Date Picker"></div>').hide();
                state.$dp = $dp;
                if (settings.modal) {
                    var $ov = $('<div class="nepali-datepicker-modal-overlay" role="dialog" aria-modal="true"></div>').hide();
                    var $ct = $('<div class="nepali-datepicker-modal-content"></div>');
                    $ct.append($dp); $ov.append($ct);
                    $('body').append($ov); state.$overlay = $ov;
                    $ov.on('click.edp', function(e) { if (e.target === $ov[0]) close(); });
                    $ct.on('click.edp', function(e) { e.stopPropagation(); });
                } else {
                    $('body').append($dp);
                }
                bindOnce();
            }

            function open() {
                if (state.isOpen) return;

                // If another input's datepicker is open, fully close (destroy) it first
                if (ACTIVE && ACTIVE !== state.$dp?.[0]) {
                    var closeFn = $(ACTIVE).data('__edp_close__');
                    if (typeof closeFn === 'function') closeFn();
                    ACTIVE = null;
                    ACTIVE_INPUT = null;
                }

                // Build fresh UI for this input and show it
                build();
                render();

                state.isOpen = true;
                ACTIVE = state.$dp[0];
                ACTIVE_INPUT = $input[0];

                if (settings.modal && state.$overlay) {
                    state.$overlay.css('display', 'flex');

                    // If this input lives inside a Bootstrap/other modal, ensure proper stacking
                    var parentModal = $input.closest('.modal');
                    if (parentModal.length) state.$overlay.css('z-index', '10001');
                } else {
                    position();
                    state.$dp.show();
                }

                if (settings.onOpen) settings.onOpen.call($input[0]);
            }

            function close() {
                // If nothing is open/rendered, do nothing
                if (!state.isOpen && !state.$dp && !state.$overlay) return;

                state.isOpen = false;

                // Clear global ACTIVE pointers when this was the active UI
                if (ACTIVE === state.$dp?.[0]) {
                    ACTIVE = null;
                    ACTIVE_INPUT = null;
                }

                // Remove datepicker DOM and unbind its internal handlers
                if (state.$dp) {
                    state.$dp.off('.edp').remove();
                    state.$dp = null;
                }
                if (settings.modal && state.$overlay) {
                    state.$overlay.off('.edp').remove();
                    state.$overlay = null;
                }

                // Let the host page know we closed
                if (settings.onClose) settings.onClose.call($input[0]);
            }

            function position() {
                if (!state.isOpen || settings.modal || !state.$dp) return;
                var $dp = state.$dp, off = $input.offset(), ih = $input.outerHeight();
                var dh = $dp.outerHeight() || 280, dw = $dp.outerWidth() || 320;
                var $w = $(window), vh = $w.height(), vw = $w.width(), st = $w.scrollTop(), sl = $w.scrollLeft();
                var below = vh - (off.top - st) - ih, above = (off.top - st);
                var top, left;
                if (below >= dh + 10) top = off.top + ih + 5;
                else if (above >= dh + 10) top = off.top - dh - 5;
                else top = Math.min(off.top + ih + 5, st + vh - dh - 10);
                left = off.left; if (left + dw > sl + vw) left = sl + vw - dw - 10; if (left < sl + 10) left = sl + 10;
                $dp.css({position: 'absolute', top: top, left: left, zIndex: 9999});
            }

            function render() {
                state.$dp.data('__edp_close__', close);
                state.$dp.data('__edp_position__', position);
                
                var cur = state.current, html = '';
                if (state.view === 'month') {
                    html += '<div class="datepicker-header">';
                    html += '<div class="nav-btn prev-year" data-action="prev-year" role="button" tabindex="0">&#171;</div>';
                    html += '<div class="nav-btn prev-month" data-action="prev-month" role="button" tabindex="0">&#8249;</div>';
                    html += '<div class="month-year clickable-month-year" data-action="show-month-list" role="button" tabindex="0"><div class="date-display">';
                    html += '<span class="month">' + monthNames[settings.language][cur.month - 1] + '</span> ';
                    html += '<span class="year">' + cur.year + '</span></div></div>';
                    html += '<div class="nav-btn next-month" data-action="next-month" role="button" tabindex="0">&#8250;</div>';
                    html += '<div class="nav-btn next-year" data-action="next-year" role="button" tabindex="0">&#187;</div>';
                    html += '</div>';

                    html += '<div class="datepicker-body"><div class="weekdays">';
                    for (var i = 0; i < 7; i++) {
                        html += '<div class="weekday">' + dayNamesShort[settings.language][i] + '</div>';
                    }
                    html += '</div><div class="days">';

                    var first = getFirstDayOfMonth(cur.year, cur.month);
                    var daysIn = getDaysInMonth(cur.year, cur.month);

                    // Previous month days
                    var prevMonth = cur.month === 1 ? 12 : cur.month - 1;
                    var prevYear = cur.month === 1 ? cur.year - 1 : cur.year;
                    var prevDaysIn = getDaysInMonth(prevYear, prevMonth);
                    for (var p = first - 1; p >= 0; p--) {
                        var pd = prevDaysIn - p;
                        html += '<div class="day other-month"><div class="date">' + pd + '</div></div>';
                    }

                    // Current month days
                    for (var d = 1; d <= daysIn; d++) {
                        var adDate = {year: cur.year, month: cur.month, day: d};
                        var isToday = same(adDate, {
                            year: new Date().getFullYear(),
                            month: new Date().getMonth() + 1,
                            day: new Date().getDate()
                        });
                        var isSelected = state.selected && same(adDate, state.selected);
                        var isDisabled = isDateDisabled(adDate, settings);
                        var cls = 'day' + (isToday ? ' today' : '') + (isSelected ? ' selected' : '') + (isDisabled ? ' disabled' : '');
                        var dataAction = isDisabled ? '' : 'data-action="select-day"';
                        var role = isDisabled ? 'role="button" aria-disabled="true"' : 'role="button" tabindex="0"';
                        
                        html += '<div class="' + cls + '" ' + dataAction + ' data-day="' + d + '" ' + role + '>';
                        html += '<div class="date">' + d + '</div>';
                        html += '</div>';
                    }

                    // Next month days
                    var nextMonth = cur.month === 12 ? 1 : cur.month + 1;
                    var nextYear = cur.month === 12 ? cur.year + 1 : cur.year;
                    var need = 42 - (first + daysIn);
                    for (var n = 1; n <= need; n++) {
                        html += '<div class="day other-month"><div class="date">' + n + '</div></div>';
                    }

                    html += '</div></div>';
                    if (settings.showToday) {
                        html += '<div class="datepicker-footer"><div class="btn-today" data-action="today" role="button" tabindex="0">Today</div></div>';
                    }
                    html += '</div>';
                } else if (state.view === 'year') {
                    var currentYear = cur.year;
                    var startYear = Math.floor(currentYear / 12) * 12;
                    var endYear = startYear + 11;
                    
                    html += '<div class="datepicker-header">';
                    html += '<div class="nav-btn prev-decade" data-action="prev-decade" role="button" tabindex="0">&#171;</div>';
                    html += '<div class="year-range"><span>' + startYear + ' - ' + endYear + '</span></div>';
                    html += '<div class="nav-btn next-decade" data-action="next-decade" role="button" tabindex="0">&#187;</div>';
                    html += '</div><div class="datepicker-body year-view">';
                    
                    for (var y = startYear; y <= endYear; y++) {
                        var c = 'year-item';
                        if (y === cur.year) c += ' current';
                        if (state.selected && y === state.selected.year) c += ' selected';
                        html += '<div class="' + c + '" data-action="select-year" data-year="' + y + '" role="button" tabindex="0">' + y + '</div>';
                    }
                    html += '</div>';
                } else if (state.view === 'monthList') {
                    html += '<div class="datepicker-header">';
                    html += '<div class="nav-btn prev-year" data-action="prev-year" role="button" tabindex="0">&#8249;</div>';
                    html += '<div class="year-display"><div class="clickable-year" data-action="show-year-range" role="button" tabindex="0">' + cur.year + '</div></div>';
                    html += '<div class="nav-btn next-year" data-action="next-year" role="button" tabindex="0">&#8250;</div>';
                    html += '</div><div class="datepicker-body month-list-view">';
                    for (var m = 1; m <= 12; m++) {
                        var cls2 = 'month-item' + (m === cur.month ? ' current' : '') + (state.selected && m === state.selected.month ? ' selected' : '');
                        html += '<div class="' + cls2 + '" data-action="select-month" data-month="' + m + '" role="button" tabindex="0">' + monthNames[settings.language][m - 1] + '</div>';
                    }
                    html += '</div>';
                }
                state.$dp[0].innerHTML = html;
                state.$dp.data('__edp_close__', close);
                state.$dp.data('__edp_position__', position);
                
                // Bind event handlers after HTML is rendered
                bindEventHandlers();
            }

            function bindEventHandlers() {
                if (!state.$dp) return;
                
                // Remove any existing event handlers to avoid duplicates
                state.$dp.off('click.edp keydown.edp mousedown.edp');

                state.$dp.on('click.edp', '[data-action]', function(e) {
                    e.preventDefault(); e.stopPropagation();
                    var $t = $(this), action = $t.data('action');
                    if ($t.hasClass('disabled') || $t.attr('aria-disabled') === 'true') return;
                    var cur = state.current;

                    switch (action) {
                        case 'prev-year':
                            cur.year--;
                            cur.day = Math.min(cur.day || 1, getDaysInMonth(cur.year, cur.month));
                            render();
                            break;
                        case 'next-year':
                            cur.year++;
                            cur.day = Math.min(cur.day || 1, getDaysInMonth(cur.year, cur.month));
                            render();
                            break;
                        case 'prev-month':
                            if (cur.month === 1) {
                                cur.month = 12;
                                cur.year--;
                            } else {
                                cur.month--;
                            }
                            cur.day = Math.min(cur.day || 1, getDaysInMonth(cur.year, cur.month));
                            render();
                            break;
                        case 'next-month':
                            if (cur.month === 12) {
                                cur.month = 1;
                                cur.year++;
                            } else {
                                cur.month++;
                            }
                            cur.day = Math.min(cur.day || 1, getDaysInMonth(cur.year, cur.month));
                            render();
                            break;
                        case 'prev-decade':
                            cur.year -= 12;
                            cur.day = Math.min(cur.day || 1, getDaysInMonth(cur.year, cur.month));
                            render();
                            break;
                        case 'next-decade':
                            cur.year += 12;
                            cur.day = Math.min(cur.day || 1, getDaysInMonth(cur.year, cur.month));
                            render();
                            break;
                        case 'select-year':
                            var y = parseInt($t.data('year'), 10);
                            cur.year = y;
                            cur.day = Math.min(cur.day || 1, getDaysInMonth(cur.year, cur.month));
                            state.view = 'monthList';
                            render();
                            break;
                        case 'show-year-range':
                            state.view = 'year';
                            render();
                            break;
                        case 'show-month-list':
                            state.view = 'monthList';
                            render();
                            break;
                        case 'select-month':
                            cur.month = parseInt($t.data('month'), 10);
                            cur.day = Math.min(cur.day || 1, getDaysInMonth(cur.year, cur.month));
                            state.view = 'month';
                            render();
                            break;
                        case 'select-day':
                            var d = parseInt($t.data('day'), 10);
                            var selectedDate = {year: cur.year, month: cur.month, day: d};
                            
                            // Check if the selected date is disabled
                            if (isDateDisabled(selectedDate, settings)) {
                                return; // Don't select disabled dates
                            }
                            
                            state.selected = selectedDate;
                            $input.val(formatDate(settings, state.selected));
                            if (settings.autoClose) close();
                            if (settings.onSelect) settings.onSelect.call($input[0], state.selected, formatDate(settings, state.selected));
                            break;
                        case 'today':
                            var today = new Date();
                            var todayDate = {
                                year: today.getFullYear(),
                                month: today.getMonth() + 1,
                                day: today.getDate()
                            };
                            
                            // Check if today's date is disabled
                            if (isDateDisabled(todayDate, settings)) {
                                return; // Don't select today if it's disabled
                            }
                            
                            state.current = {year: todayDate.year, month: todayDate.month, day: todayDate.day};
                            state.selected = {year: todayDate.year, month: todayDate.month, day: todayDate.day};
                            $input.val(formatDate(settings, state.selected));
                            if (settings.autoClose) close();
                            if (settings.onSelect) settings.onSelect.call($input[0], state.selected, formatDate(settings, state.selected));
                            break;
                    }
                });

                state.$dp.on('keydown.edp', '[data-action][role="button"]', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); $(this).trigger('click'); }
                });
                state.$dp.on('mousedown.edp', function(e) { e.stopPropagation(); });
            }

            function bindOnce() {
                if (state.bound || !state.$dp) return;
                state.bound = true;
                // Event handlers are now bound in bindEventHandlers() which is called from render()
            }

            // input triggers
            $input.off('click.edp focus.edp mousedown.edp')
                .on('click.edp focus.edp', function(e) { e.preventDefault(); e.stopPropagation(); open(); })
                .on('mousedown.edp', function(e) { e.stopPropagation(); });

            // public API
            $input.data('englishDatepicker', {
                show: open,
                hide: close,
                isOpen: function() { return state.isOpen; },
                getDate: function() { return state.selected; },
                setDate: function(date) {
                    var ad = parseDate(date);
                    if (ad) {
                        var dmax = getDaysInMonth(ad.year, ad.month);
                        if (ad.day < 1) ad.day = 1;
                        if (ad.day > dmax) ad.day = dmax;
                        state.selected = {year: ad.year, month: ad.month, day: ad.day};
                        state.current = {year: ad.year, month: ad.month, day: ad.day};
                        $input.val(formatDate(settings, state.selected));
                        if (state.$dp) render();
                    }
                },
                clear: function() { state.selected = null; $input.val(''); if (state.$dp) render(); },
                destroy: function() {
                    close();
                    if (state.$dp) { state.$dp.off('.edp').remove(); state.$dp = null; }
                    if (state.$overlay) { state.$overlay.off('.edp').remove(); state.$overlay = null; }
                    $input.off('.edp').removeData('englishDatepicker').removeAttr('readonly');
                    INSTANCES--; if (INSTANCES <= 0) unbindGlobalIfIdle();
                }
            });
        });
    };

})(jQuery);