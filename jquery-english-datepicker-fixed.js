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
        disabledDates: [],           // Array of disabled dates (AD format: [{year, month, day}, ...])
        disabledDateRanges: [],      // Array of disabled date ranges (AD format: [{start: {year, month, day}, end: {year, month, day}}, ...])
        onValidationError: null      // Callback for validation errors
    };

    var INSTANCES = 0;

    /*** ---------------- Utility Functions ---------------- ***/
    function parseDate(date) {
        if (!date) return null;
        if (typeof date === 'string') {
            var parts = date.split('-');
            if (parts.length === 3) {
                return {
                    year: parseInt(parts[0], 10),
                    month: parseInt(parts[1], 10),
                    day: parseInt(parts[2], 10)
                };
            }
        }
        if (typeof date === 'object' && date.year && date.month && date.day) {
            return {
                year: parseInt(date.year, 10),
                month: parseInt(date.month, 10),
                day: parseInt(date.day, 10)
            };
        }
        return null;
    }

    function formatDate(settings, date) {
        if (!date) return '';
        var format = settings.dateFormat || 'YYYY-MM-DD';
        var year = date.year;
        var month = date.month < 10 ? '0' + date.month : date.month;
        var day = date.day < 10 ? '0' + date.day : date.day;
        
        return format
            .replace('YYYY', year)
            .replace('MM', month)
            .replace('DD', day)
            .replace('YY', year.toString().slice(-2));
    }

    function getDaysInMonth(year, month) {
        return new Date(year, month, 0).getDate();
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    function same(a, b) { 
        return !!a && !!b && a.year === b.year && a.month === b.month && a.day === b.day; 
    }

    // Enhanced date validation with proper constraints
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
    
    // Advanced date range picker functionality with proper validation
    function createDateRangePicker($startInput, $endInput, options) {
        var startDate = null;
        var endDate = null;
        
        // Helper function to validate date range
        function validateDateRange(start, end) {
            if (!start || !end) return true;
            return (start.year < end.year) || 
                   (start.year === end.year && start.month < end.month) || 
                   (start.year === end.year && start.month === end.month && start.day <= end.day);
        }
        
        // Helper function to update end datepicker constraints
        function updateEndDatepicker() {
            var endDatepicker = $endInput.data('englishDatepicker');
            if (endDatepicker) {
                endDatepicker.destroy();
            }
            
            var endOptions = $.extend({}, options, {
                minDate: startDate, // End date must be >= start date
                onSelect: function(date, formatted) {
                    endDate = date;
                    
                    // Validate that end date is after start date
                    if (startDate && !validateDateRange(startDate, date)) {
                        // Show error and clear end date
                        if (options.onValidationError) {
                            options.onValidationError('End date must be after start date');
                        }
                        $endInput.val('');
                        endDate = null;
                        return;
                    }
                    
                    if (options.onEndSelect) {
                        options.onEndSelect(date, formatted);
                    }
                    if (options.onRangeSelect && startDate) {
                        options.onRangeSelect(startDate, formatDate(options, startDate), date, formatted);
                    }
                }
            });
            
            $endInput.englishDatepicker(endOptions);
        }
        
        // Helper function to update start datepicker constraints
        function updateStartDatepicker() {
            var startDatepicker = $startInput.data('englishDatepicker');
            if (startDatepicker) {
                startDatepicker.destroy();
            }
            
            var startOptions = $.extend({}, options, {
                maxDate: endDate, // Start date must be <= end date
                onSelect: function(date, formatted) {
                    startDate = date;
                    
                    // Validate that start date is before end date
                    if (endDate && !validateDateRange(date, endDate)) {
                        // Show error and clear start date
                        if (options.onValidationError) {
                            options.onValidationError('Start date must be before end date');
                        }
                        $startInput.val('');
                        startDate = null;
                        return;
                    }
                    
                    // Update end datepicker with new minimum date
                    updateEndDatepicker();
                    
                    if (options.onStartSelect) {
                        options.onStartSelect(date, formatted);
                    }
                    if (options.onRangeSelect && endDate) {
                        options.onRangeSelect(date, formatted, endDate, formatDate(options, endDate));
                    }
                }
            });
            
            $startInput.englishDatepicker(startOptions);
        }
        
        // Initialize start datepicker first
        updateStartDatepicker();
        
        // Initialize end datepicker
        updateEndDatepicker();
        
        return {
            startDatepicker: $startInput.data('englishDatepicker'),
            endDatepicker: $endInput.data('englishDatepicker'),
            destroy: function() {
                $startInput.englishDatepicker('destroy');
                $endInput.englishDatepicker('destroy');
            },
            getRange: function() {
                var startDate = $startInput.data('englishDatepicker').getDate();
                var endDate = $endInput.data('englishDatepicker').getDate();
                return {
                    start: startDate,
                    end: endDate,
                    startFormatted: startDate ? formatDate(options, startDate) : null,
                    endFormatted: endDate ? formatDate(options, endDate) : null
                };
            },
            setRange: function(startDate, endDate) {
                $startInput.data('englishDatepicker').setDate(startDate);
                $endInput.data('englishDatepicker').setDate(endDate);
            },
            clear: function() {
                $startInput.data('englishDatepicker').clear();
                $endInput.data('englishDatepicker').clear();
            }
        };
    }
    
    function isDateInRange(date, startDate, endDate) {
        if (!date || !startDate || !endDate) return false;
        
        // Convert dates to comparable format (YYYYMMDD)
        var dateNum = date.year * 10000 + date.month * 100 + date.day;
        var startNum = startDate.year * 10000 + startDate.month * 100 + startDate.day;
        var endNum = endDate.year * 10000 + endDate.month * 100 + endDate.day;
        
        return dateNum >= startNum && dateNum <= endNum;
    }

    /*** ---------------- Main Plugin ---------------- ***/
    $.fn.englishDatepicker = function(options) {
        return this.each(function() {
            var $input = $(this);
            var settings = $.extend({}, defaults, options);
            
            // Skip if already initialized
            if ($input.data('englishDatepicker')) {
                return;
            }
            
            INSTANCES++;
            
            // Create datepicker instance
            var datepicker = {
                settings: settings,
                $input: $input,
                isOpen: false,
                currentDate: null,
                selectedDate: null,
                
                init: function() {
                    this.bindEvents();
                    this.setupInput();
                },
                
                bindEvents: function() {
                    var self = this;
                    
                    $input.on('click.edp focus.edp', function(e) {
                        e.preventDefault();
                        self.open();
                    });
                    
                    $input.on('keydown.edp', function(e) {
                        if (e.keyCode === 9) { // Tab key
                            self.close();
                        }
                    });
                },
                
                setupInput: function() {
                    $input.attr('readonly', settings.readonly);
                    $input.attr('placeholder', settings.placeholder);
                },
                
                open: function() {
                    if (this.isOpen) return;
                    
                    this.createDatepicker();
                    this.isOpen = true;
                    
                    if (settings.onOpen) {
                        settings.onOpen();
                    }
                },
                
                close: function() {
                    if (!this.isOpen) return;
                    
                    this.$datepicker.remove();
                    this.isOpen = false;
                    
                    if (settings.onClose) {
                        settings.onClose();
                    }
                },
                
                createDatepicker: function() {
                    var self = this;
                    var today = new Date();
                    var currentDate = this.currentDate || {
                        year: today.getFullYear(),
                        month: today.getMonth() + 1,
                        day: today.getDate()
                    };
                    
                    // Create datepicker container
                    var $dp = $('<div class="nepali-datepicker ' + settings.theme + '" role="dialog" aria-label="Date Picker"></div>').hide();
                    
                    if (settings.modal) {
                        var $ov = $('<div class="nepali-datepicker-modal-overlay" role="dialog" aria-modal="true"></div>').hide();
                        var $ct = $('<div class="nepali-datepicker-modal-content"></div>');
                        $ct.append($dp);
                        $ov.append($ct);
                        $('body').append($ov);
                        this.$datepicker = $ov;
                    } else {
                        $input.after($dp);
                        this.$datepicker = $dp;
                    }
                    
                    // Create header
                    var $header = $('<div class="nepali-datepicker-header"></div>');
                    var $prevYear = $('<button type="button" class="nepali-datepicker-nav nepali-datepicker-prev-year" title="Previous Year">««</button>');
                    var $prevMonth = $('<button type="button" class="nepali-datepicker-nav nepali-datepicker-prev-month" title="Previous Month">«</button>');
                    var $monthYear = $('<div class="nepali-datepicker-month-year"></div>');
                    var $nextMonth = $('<button type="button" class="nepali-datepicker-nav nepali-datepicker-next-month" title="Next Month">»</button>');
                    var $nextYear = $('<button type="button" class="nepali-datepicker-nav nepali-datepicker-next-year" title="Next Year">»»</button>');
                    
                    $header.append($prevYear, $prevMonth, $monthYear, $nextMonth, $nextYear);
                    $dp.append($header);
                    
                    // Create calendar
                    this.renderCalendar($dp, currentDate);
                    
                    // Position datepicker
                    this.positionDatepicker();
                    
                    // Show datepicker
                    this.$datepicker.fadeIn(200);
                    
                    // Bind events
                    this.bindDatepickerEvents();
                },
                
                renderCalendar: function($dp, date) {
                    var self = this;
                    var year = date.year;
                    var month = date.month;
                    
                    // Update month/year display
                    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                                    'July', 'August', 'September', 'October', 'November', 'December'];
                    $dp.find('.nepali-datepicker-month-year').text(monthNames[month - 1] + ' ' + year);
                    
                    // Create calendar body
                    var $body = $dp.find('.nepali-datepicker-body');
                    if ($body.length === 0) {
                        $body = $('<div class="nepali-datepicker-body"></div>');
                        $dp.append($body);
                    }
                    $body.empty();
                    
                    // Create day headers
                    var $dayHeaders = $('<div class="nepali-datepicker-days-header"></div>');
                    var dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
                    dayNames.forEach(function(day) {
                        $dayHeaders.append($('<div class="nepali-datepicker-day-header">' + day + '</div>'));
                    });
                    $body.append($dayHeaders);
                    
                    // Create calendar grid
                    var $grid = $('<div class="nepali-datepicker-grid"></div>');
                    
                    // Get first day of month and number of days
                    var firstDay = new Date(year, month - 1, 1).getDay();
                    var daysInMonth = getDaysInMonth(year, month);
                    
                    // Add empty cells for days before month starts
                    for (var i = 0; i < firstDay; i++) {
                        $grid.append($('<div class="nepali-datepicker-day nepali-datepicker-day-other"></div>'));
                    }
                    
                    // Add days of the month
                    for (var day = 1; day <= daysInMonth; day++) {
                        var dayDate = {year: year, month: month, day: day};
                        var $day = $('<div class="nepali-datepicker-day" data-day="' + day + '">' + day + '</div>');
                        
                        // Check if date is disabled
                        if (isDateDisabled(dayDate, self.settings)) {
                            $day.addClass('nepali-datepicker-day-disabled');
                        }
                        
                        // Check if date is today
                        var today = new Date();
                        if (year === today.getFullYear() && month === today.getMonth() + 1 && day === today.getDate()) {
                            $day.addClass('nepali-datepicker-day-today');
                        }
                        
                        // Check if date is selected
                        if (self.selectedDate && same(dayDate, self.selectedDate)) {
                            $day.addClass('nepali-datepicker-day-selected');
                        }
                        
                        $grid.append($day);
                    }
                    
                    $body.append($grid);
                },
                
                positionDatepicker: function() {
                    if (settings.modal) {
                        this.$datepicker.css({
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            zIndex: 9999
                        });
                    } else {
                        var inputOffset = $input.offset();
                        var inputHeight = $input.outerHeight();
                        
                        this.$datepicker.css({
                            position: 'absolute',
                            top: inputOffset.top + inputHeight + 5,
                            left: inputOffset.left,
                            zIndex: 1000
                        });
                    }
                },
                
                bindDatepickerEvents: function() {
                    var self = this;
                    
                    // Navigation events
                    this.$datepicker.find('.nepali-datepicker-prev-year').on('click', function() {
                        self.currentDate.year--;
                        self.renderCalendar(self.$datepicker, self.currentDate);
                    });
                    
                    this.$datepicker.find('.nepali-datepicker-prev-month').on('click', function() {
                        self.currentDate.month--;
                        if (self.currentDate.month < 1) {
                            self.currentDate.month = 12;
                            self.currentDate.year--;
                        }
                        self.renderCalendar(self.$datepicker, self.currentDate);
                    });
                    
                    this.$datepicker.find('.nepali-datepicker-next-month').on('click', function() {
                        self.currentDate.month++;
                        if (self.currentDate.month > 12) {
                            self.currentDate.month = 1;
                            self.currentDate.year++;
                        }
                        self.renderCalendar(self.$datepicker, self.currentDate);
                    });
                    
                    this.$datepicker.find('.nepali-datepicker-next-year').on('click', function() {
                        self.currentDate.year++;
                        self.renderCalendar(self.$datepicker, self.currentDate);
                    });
                    
                    // Day selection
                    this.$datepicker.find('.nepali-datepicker-day').on('click', function() {
                        var day = parseInt($(this).data('day'));
                        if (day && !$(this).hasClass('nepali-datepicker-day-disabled')) {
                            var selectedDate = {
                                year: self.currentDate.year,
                                month: self.currentDate.month,
                                day: day
                            };
                            
                            self.selectDate(selectedDate);
                        }
                    });
                    
                    // Close on outside click
                    $(document).on('click.edp-' + INSTANCES, function(e) {
                        if (!$(e.target).closest('.nepali-datepicker, ' + $input.selector).length) {
                            self.close();
                        }
                    });
                },
                
                selectDate: function(date) {
                    this.selectedDate = date;
                    var formatted = formatDate(this.settings, date);
                    this.$input.val(formatted);
                    
                    if (this.settings.onSelect) {
                        this.settings.onSelect(date, formatted);
                    }
                    
                    if (this.settings.autoClose) {
                        this.close();
                    }
                },
                
                getDate: function() {
                    return this.selectedDate;
                },
                
                setDate: function(date) {
                    this.selectedDate = parseDate(date);
                    if (this.selectedDate) {
                        var formatted = formatDate(this.settings, this.selectedDate);
                        this.$input.val(formatted);
                    }
                },
                
                clear: function() {
                    this.selectedDate = null;
                    this.$input.val('');
                },
                
                destroy: function() {
                    this.close();
                    $input.off('.edp').removeData('englishDatepicker').removeAttr('readonly');
                    INSTANCES--; if (INSTANCES <= 0) unbindGlobalIfIdle();
                }
            };
            
            // Initialize
            datepicker.init();
            
            // Store instance
            $input.data('englishDatepicker', datepicker);
        });
    };

    // Expose advanced date range picker functionality
    $.fn.englishDateRangePicker = function(options) {
        var $startInput = this.first();
        var $endInput = this.last();
        
        if (this.length !== 2) {
            console.error('englishDateRangePicker requires exactly 2 input elements');
            return null;
        }
        
        return createDateRangePicker($startInput, $endInput, options);
    };
    
    // Expose utility functions globally
    window.EnglishDatepickerUtils = {
        createDateRangePicker: createDateRangePicker,
        parseDate: parseDate,
        formatDate: formatDate,
        getDaysInMonth: getDaysInMonth,
        isLeapYear: isLeapYear
    };

    function unbindGlobalIfIdle() {
        $(document).off('.edp');
    }

})(jQuery);
