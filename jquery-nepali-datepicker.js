/**
 * jQuery Nepali Datepicker Plugin
 * A simple, lightweight datepicker for Nepali dates using jQuery
 */

(function($) {
    'use strict';

    // Default options
    var defaults = {
        theme: 'light',
        language: 'nepali',
        dateFormat: 'YYYY-MM-DD',
        placeholder: 'Select Date',
        showToday: true,
        showClear: true,
        autoClose: true,
        modal: false, // New option for modal mode
        showEnglishDate: true, // Show mini English date picker
        onSelect: null,
        onOpen: null,
        onClose: null
    };

    // Nepali month names
    var monthNames = {
        nepali: ['बैशाख', 'जेष्ठ', 'आषाढ', 'श्रावण', 'भाद्र', 'आश्विन', 'कार्तिक', 'मंसिर', 'पौष', 'माघ', 'फाल्गुन', 'चैत्र'],
        english: ['Baisakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin', 'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra']
    };

    // Day names
    var dayNames = {
        nepali: ['आइतबार', 'सोमबार', 'मंगलबार', 'बुधबार', 'बिहिबार', 'शुक्रबार', 'शनिबार'],
        english: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    };

    var dayNamesShort = {
        nepali: ['आइत', 'सोम', 'मंगल', 'बुध', 'बिहि', 'शुक्र', 'शनि'],
        english: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    };

    // English month names
    var englishMonthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                            'July', 'August', 'September', 'October', 'November', 'December'];
    
    var englishMonthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                                 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // BS Calendar data - Updated with comprehensive data from official library (1970-2047)
    var bsCalendarData = {
        1970: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        1971: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
        1972: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        1973: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
        1974: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        1975: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        1976: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        1977: [30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31],
        1978: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        1979: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        1980: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        1981: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
        1982: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        1983: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        1984: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        1985: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
        1986: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        1987: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        1988: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        1989: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
        1990: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        1991: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
        1992: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
        1993: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
        1994: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        1995: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
        1996: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
        1997: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        1998: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        1999: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2000: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
        2001: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2002: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        2003: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2004: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
        2005: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2006: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        2007: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2008: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
        2009: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2010: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        2011: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2012: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
        2013: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2014: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        2015: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2016: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
        2017: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2018: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        2019: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
        2020: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
        2021: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2022: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
        2023: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
        2024: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
        2025: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2026: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2027: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
        2028: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2029: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
        2030: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2031: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
        2032: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2033: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        2034: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2035: [30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
        2036: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2037: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        2038: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2039: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
        2040: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2041: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        2042: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2043: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
        2044: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2045: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        2046: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2047: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
        2048: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2049: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
        2050: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
        2051: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2052: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        2053: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2054: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
        2055: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2056: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        2057: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2058: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
        2059: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2060: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        2061: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
        2062: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
        2063: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2064: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
        2065: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
        2066: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2067: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        2068: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2069: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
        2070: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2071: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        2072: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2073: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
        2074: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2075: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        2076: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
        2077: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
        2078: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2079: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
        2080: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
        2081: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2082: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        2083: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2084: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
        2085: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2086: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        2087: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2088: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
        2089: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2090: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        2091: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
        2092: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
        2093: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2094: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
        2095: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
        2096: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2097: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
        2098: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2099: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
        2100: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]
    };

    // Helper functions for year limits
    function getMinYear() {
        return Math.min.apply(Math, Object.keys(bsCalendarData).map(Number));
    }

    function getMaxYear() {
        return Math.max.apply(Math, Object.keys(bsCalendarData).map(Number));
    }

    function isYearValid(year) {
        return bsCalendarData.hasOwnProperty(year);
    }

    // Global datepicker management
    var activeDatepicker = null;

    function closeActiveDatepicker() {
        if (activeDatepicker && activeDatepicker !== null) {
            // Find the input element for the active datepicker
            var $activeInput = $('input[data-nepali-datepicker-active="true"]');
            if ($activeInput.length > 0) {
                $activeInput.nepaliDatepicker('hide');
                $activeInput.removeData('nepali-datepicker-active');
            }
            activeDatepicker = null;
        }
    }

    // Simplified global click handler based on official library
    $(document).on('click.nepaliDatepickerGlobal', function(e) {
        if (activeDatepicker && activeDatepicker !== null) {
            var $target = $(e.target);
            var $activeInput = $('input[data-nepali-datepicker-active="true"]');
            var $modalOverlay = $('.nepali-datepicker-modal-overlay');
            
            // For modal mode, close if clicking on the overlay itself
            if ($modalOverlay.length > 0) {
                if ($target.is($modalOverlay)) {
                    closeActiveDatepicker();
                }
            } else {
                // For non-modal mode, check if click is outside both input and datepicker
                if (!$target.closest($activeInput).length && 
                    !$target.closest(activeDatepicker).length) {
                    closeActiveDatepicker();
                }
            }
        }
    });

    // Main plugin function
    $.fn.nepaliDatepicker = function(options) {
        return this.each(function() {
            var $this = $(this);
            var settings = $.extend({}, defaults, options);
            
            // Initialize the datepicker
            initDatepicker($this, settings);
        });
    };

    function initDatepicker($input, settings) {
        var isOpen = false;
        var selectedDate = null;
        var currentDate = getCurrentNepaliDate();
        var $datepicker = null;
        var $modalOverlay = null;
        var currentView = 'month'; // 'month', 'year', or 'monthList'

        // Set input attributes
        $input.attr('readonly', true);
        $input.attr('placeholder', settings.placeholder);

        // Create datepicker element
        function createDatepicker() {
            $datepicker = $('<div class="nepali-datepicker ' + settings.theme + '"></div>');
            $datepicker.hide();
            
            if (settings.modal) {
                // Create modal overlay with proper structure
                $modalOverlay = $('<div class="nepali-datepicker-modal-overlay"></div>');
                $modalOverlay.hide();
                
                // Create modal content wrapper
                var $modalContent = $('<div class="nepali-datepicker-modal-content"></div>');
                $modalContent.append($datepicker);
                $modalOverlay.append($modalContent);
                
                // Add modal class to datepicker
                $datepicker.addClass('modal');
                
                // Append to body
                $('body').append($modalOverlay);
            } else {
            $('body').append($datepicker);
            }
        }

        // Show datepicker
        function showDatepicker() {
            if (isOpen) return;
            
            // Close any existing datepicker first
            closeActiveDatepicker();
            
            createDatepicker();
            renderDatepicker();
            
            isOpen = true;
            activeDatepicker = $datepicker;
            $input.attr('data-nepali-datepicker-active', 'true');
            
            // Position after a brief delay to ensure DOM is updated
            setTimeout(function() {
                if (settings.modal) {
                    // Show modal overlay with proper animation
                    $modalOverlay.css({
                        'display': 'flex',
                        'opacity': '0'
                    }).animate({
                        'opacity': '1'
                    }, 300);
                    
                    bindDatepickerElementEvents(); // Bind datepicker-specific events
                    
                    // Animate datepicker appearance
                    $datepicker.css({
                        'opacity': '0',
                        'transform': 'scale(0.9)'
                    }).animate({
                        'opacity': '1'
                    }, 300, function() {
                        $datepicker.css('transform', 'scale(1)');
                    });
                } else {
            positionDatepicker();
                    bindDatepickerElementEvents(); // Bind datepicker-specific events
            $datepicker.fadeIn(300);
                }
            
            if (settings.onOpen) {
                settings.onOpen();
            }
            }, 10);
        }

        // Hide datepicker
        function hideDatepicker() {
            if (!isOpen) return;
            
            isOpen = false;
            
            // Clean up global state
            if (activeDatepicker === $datepicker) {
                activeDatepicker = null;
            }
            $input.removeAttr('data-nepali-datepicker-active');
            
            if (settings.modal && $modalOverlay) {
                // Hide modal with proper animation
                $datepicker.animate({
                    'opacity': '0',
                    'transform': 'scale(0.9)'
                }, 200, function() {
                    $modalOverlay.animate({
                        'opacity': '0'
                    }, 200, function() {
                        $modalOverlay.css('display', 'none');
                    });
                });
            } else {
            $datepicker.fadeOut(300);
            }
            
            if (settings.onClose) {
                settings.onClose();
            }
        }

        // Toggle datepicker
        function toggleDatepicker() {
            if (isOpen) {
                hideDatepicker();
            } else {
                showDatepicker();
            }
        }

        // Position datepicker
        function positionDatepicker() {
            var inputOffset = $input.offset();
            var inputHeight = $input.outerHeight();
            var inputWidth = $input.outerWidth();
            var datepickerHeight = $datepicker.outerHeight() || 280; // Use actual height or fallback
            var datepickerWidth = $datepicker.outerWidth() || 320; // Use actual width or fallback
            var viewportHeight = $(window).height();
            var viewportWidth = $(window).width();
            var scrollTop = $(window).scrollTop();
            var scrollLeft = $(window).scrollLeft();
            
            // Calculate available space below and above the input
            var spaceBelow = viewportHeight - (inputOffset.top - scrollTop) - inputHeight;
            var spaceAbove = inputOffset.top - scrollTop;
            
            var top, left;
            var positionedAbove = false;
            
            // Default: try to position below the input
            if (spaceBelow >= datepickerHeight + 10) {
                // Enough space below - position below
                top = inputOffset.top + inputHeight + 5;
                positionedAbove = false;
            } else if (spaceAbove >= datepickerHeight + 10) {
                // Not enough space below, but enough above - position above
                top = inputOffset.top - datepickerHeight - 5;
                positionedAbove = true;
            } else {
                // Not enough space in either direction - position below with scroll
                top = inputOffset.top + inputHeight + 5;
                positionedAbove = false;
                // If it would go off screen, adjust to fit
                if (top + datepickerHeight > viewportHeight + scrollTop) {
                    top = viewportHeight + scrollTop - datepickerHeight - 10;
                }
            }
            
            // Align to left side of input, but keep within viewport
            left = inputOffset.left;
            
            // Adjust if would go off screen horizontally
            if (left + datepickerWidth > viewportWidth + scrollLeft) {
                left = viewportWidth + scrollLeft - datepickerWidth - 10;
            }
            
            if (left < scrollLeft + 10) {
                left = scrollLeft + 10;
            }
            
            $datepicker.css({
                position: 'absolute',
                top: top,
                left: left,
                zIndex: 9999
            });
            
            // Add position class for animation
            $datepicker.removeClass('positioned-above positioned-below');
            if (positionedAbove) {
                $datepicker.addClass('positioned-above');
            } else {
                $datepicker.addClass('positioned-below');
            }
            
            // Add responsive classes
            if (viewportWidth < 480) {
                $datepicker.addClass('mobile-view');
            } else {
                $datepicker.removeClass('mobile-view');
            }
        }

        // Show year range selector
        function showYearRange() {
            currentView = 'year';
            renderDatepicker();
        }

        // Show month list selector
        function showMonthList() {
            currentView = 'monthList';
            renderDatepicker();
        }

        // Check if navigation buttons should be disabled
        function canNavigateYear(direction) {
            if (direction === 'prev') {
                return isYearValid(currentDate.year - 1);
            } else if (direction === 'next') {
                return isYearValid(currentDate.year + 1);
            }
            return false;
        }

        function canNavigateDecade(direction) {
            if (direction === 'prev') {
                return currentDate.year - 12 >= getMinYear();
            } else if (direction === 'next') {
                return currentDate.year + 12 <= getMaxYear();
            }
            return false;
        }

        // Render datepicker
        function renderDatepicker() {
            var html = '';
            
            if (currentView === 'month') {
                // Month view
            html += '<div class="datepicker-header">';
                var prevYearDisabled = !canNavigateYear('prev') ? ' disabled' : '';
                var nextYearDisabled = !canNavigateYear('next') ? ' disabled' : '';
                html += '<button type="button" class="nav-btn prev-year' + prevYearDisabled + '" title="Previous Year"><i class="fa fa-angle-double-left"></i></button>';
                html += '<button type="button" class="nav-btn prev-month" title="Previous Month"><i class="fa fa-chevron-left"></i></button>';
                html += '<div class="month-year">';
                html += '<div class="nepali-date-display">';
                html += '<span class="month">' + monthNames[settings.language][currentDate.month - 1] + '</span>';
                html += ' <span class="year">' + convertToNepaliNumbers(currentDate.year) + '</span>';
                html += '</div>';
                // Add English date in header on new line
                var englishDate = getEnglishDate(currentDate);
                var nextMonth = englishDate.month === 12 ? 1 : englishDate.month + 1;
                var nextYear = englishDate.month === 12 ? englishDate.year + 1 : englishDate.year;
                console.log('English date conversion:', {
                    nepaliDate: currentDate,
                    englishDate: englishDate,
                    nextMonth: nextMonth,
                    nextYear: nextYear
                });
                html += '<div class="english-date-header">';
                html += englishMonthNamesShort[englishDate.month - 1] + ' ' + englishDate.year + ' / ' + englishMonthNamesShort[nextMonth - 1] + ' ' + nextYear;
                html += '</div>';
                html += '</div>';
                
                // Add year list container (initially hidden)
                html += '<div class="year-list-container" style="display: none;">';
                html += '<div class="year-list-header">';
                html += '<button type="button" class="nav-btn prev-year-range" title="Previous Year Range"><i class="fa fa-chevron-left"></i></button>';
                html += '<span class="year-range-display">' + getYearRangeDisplay(currentDate.year) + '</span>';
                html += '<button type="button" class="nav-btn next-year-range" title="Next Year Range"><i class="fa fa-chevron-right"></i></button>';
                html += '</div>';
                html += '<div class="year-list-grid">';
                var yearRange = getYearRange(currentDate.year);
                for (var y = yearRange.start; y <= yearRange.end; y++) {
                    var isCurrentYear = y === currentDate.year;
                    var isValidYear = isYearValid(y);
                    var classes = 'year-list-item';
                    if (isCurrentYear) classes += ' current';
                    if (!isValidYear) classes += ' disabled';
                    html += '<div class="' + classes + '" data-year="' + y + '">' + convertToNepaliNumbers(y) + '</div>';
                }
                html += '</div>';
            html += '</div>';
                
                html += '<button type="button" class="nav-btn next-month" title="Next Month"><i class="fa fa-chevron-right"></i></button>';
                html += '<button type="button" class="nav-btn next-year' + nextYearDisabled + '" title="Next Year"><i class="fa fa-angle-double-right"></i></button>';
            html += '</div>';
            
            // Body
            html += '<div class="datepicker-body">';
            
            // Weekdays
            html += '<div class="weekdays">';
            for (var i = 0; i < 7; i++) {
                html += '<div class="weekday">' + dayNamesShort[settings.language][i] + '</div>';
            }
            html += '</div>';
            
            // Days
            html += '<div class="days">';
            var firstDay = getFirstDayOfMonth(currentDate);
            var daysInMonth = getDaysInMonth(currentDate);
            var today = getCurrentNepaliDate();
            
            // Previous month days
            for (var i = firstDay - 1; i >= 0; i--) {
                var day = daysInMonth - i;
                    var prevMonth = currentDate.month === 1 ? 12 : currentDate.month - 1;
                    var prevYear = currentDate.month === 1 ? currentDate.year - 1 : currentDate.year;
                    var nepaliDate = {year: prevYear, month: prevMonth, day: day};
                    var englishDate = getEnglishDate(nepaliDate);
                    
                    html += '<div class="day other-month" data-day="' + day + '">';
                    html += '<div class="nepali-date">' + convertToNepaliNumbers(day) + '</div>';
                    html += '<div class="english-date-subscript">' + englishDate.day + '</div>';
                    html += '</div>';
            }
            
            // Current month days
            for (var day = 1; day <= daysInMonth; day++) {
                var isToday = isSameDate({...currentDate, day: day}, today);
                var isSelected = selectedDate && isSameDate({...currentDate, day: day}, selectedDate);
                var classes = 'day';
                if (isToday) classes += ' today';
                if (isSelected) classes += ' selected';
                
                    // Get English date for this Nepali date
                    var nepaliDate = {...currentDate, day: day};
                    var englishDate = getEnglishDate(nepaliDate);
                    
                    html += '<div class="' + classes + '" data-day="' + day + '">';
                    html += '<div class="nepali-date">' + convertToNepaliNumbers(day) + '</div>';
                    html += '<div class="english-date-subscript">' + englishDate.day + '</div>';
                    html += '</div>';
                }
                
                // Next month days - limit to 5 rows (35 days total)
                var remainingDays = 35 - (firstDay + daysInMonth);
            for (var day = 1; day <= remainingDays; day++) {
                    var nextMonth = currentDate.month === 12 ? 1 : currentDate.month + 1;
                    var nextYear = currentDate.month === 12 ? currentDate.year + 1 : currentDate.year;
                    var nepaliDate = {year: nextYear, month: nextMonth, day: day};
                    var englishDate = getEnglishDate(nepaliDate);
                    
                    html += '<div class="day other-month" data-day="' + day + '">';
                    html += '<div class="nepali-date">' + convertToNepaliNumbers(day) + '</div>';
                    html += '<div class="english-date-subscript">' + englishDate.day + '</div>';
                    html += '</div>';
            }
            
            html += '</div>';
                
                // Add Today button like official library
                html += '<div class="datepicker-footer">';
                html += '<button type="button" class="btn-today">Today</button>';
                html += '</div>';
                html += '</div>';
                
            } else if (currentView === 'year') {
                // Year view
                html += '<div class="datepicker-header">';
                var prevDecadeDisabled = !canNavigateDecade('prev') ? ' disabled' : '';
                var nextDecadeDisabled = !canNavigateDecade('next') ? ' disabled' : '';
                html += '<button type="button" class="nav-btn prev-decade' + prevDecadeDisabled + '" title="Previous Decade"><i class="fa fa-angle-double-left"></i></button>';
                html += '<div class="year-range">';
                var startYear = Math.floor(currentDate.year / 12) * 12;
                var minYear = getMinYear();
                var maxYear = getMaxYear();
                
                // Ensure startYear is within valid range
                if (startYear < minYear) {
                    startYear = minYear;
                } else if (startYear + 11 > maxYear) {
                    startYear = maxYear - 11;
                }
                
                html += '<span>' + convertToNepaliNumbers(startYear) + ' - ' + convertToNepaliNumbers(startYear + 11) + '</span>';
                html += '</div>';
                html += '<button type="button" class="nav-btn next-decade' + nextDecadeDisabled + '" title="Next Decade"><i class="fa fa-angle-double-right"></i></button>';
                html += '</div>';
                
                // Year grid (3x4 = 12 years)
                html += '<div class="datepicker-body year-view">';
                for (var y = startYear; y < startYear + 12; y++) {
                    var isCurrentYear = y === currentDate.year;
                    var isSelected = selectedDate && y === selectedDate.year;
                    var isValidYear = isYearValid(y);
                    var classes = 'year-item';
                    if (isCurrentYear) classes += ' current';
                    if (isSelected) classes += ' selected';
                    if (!isValidYear) classes += ' disabled';
                    
                    html += '<div class="' + classes + '" data-year="' + y + '">' + 
                           convertToNepaliNumbers(y) + '</div>';
                }
                html += '</div>';
                
            } else if (currentView === 'monthList') {
                // Month list view
                html += '<div class="datepicker-header">';
                html += '<button type="button" class="nav-btn back-to-month" title="Back to Month"><i class="fa fa-arrow-left"></i></button>';
                html += '<div class="year-display">';
                html += '<span>' + convertToNepaliNumbers(currentDate.year) + '</span>';
                html += '</div>';
                html += '<button type="button" class="nav-btn today-btn" title="Go to Today"><i class="fa fa-calendar-check"></i></button>';
            html += '</div>';
            
                // Month grid
                html += '<div class="datepicker-body month-list-view">';
                for (var m = 1; m <= 12; m++) {
                    var isCurrentMonth = m === currentDate.month;
                    var isSelected = selectedDate && m === selectedDate.month;
                    var classes = 'month-item';
                    if (isCurrentMonth) classes += ' current';
                    if (isSelected) classes += ' selected';
                    
                    html += '<div class="' + classes + '" data-month="' + m + '">' + 
                           monthNames[settings.language][m - 1] + '</div>';
                }
                html += '</div>';
            }
            
            // English date is now shown in header and as subscripts, no need for separate display
            
            $datepicker.html(html);
            bindDatepickerEvents();
        }

        // Bind events
        function bindDatepickerEvents() {
            // Year Navigation
            $datepicker.find('.prev-year').on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                var newYear = currentDate.year - 1;
                if (isYearValid(newYear)) {
                    currentDate.year = newYear;
                    renderDatepicker();
                }
            });
            
            $datepicker.find('.next-year').on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                var newYear = currentDate.year + 1;
                if (isYearValid(newYear)) {
                    currentDate.year = newYear;
                    renderDatepicker();
                }
            });
            
            // Month Navigation
            $datepicker.find('.prev-month').on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                currentDate.month--;
                if (currentDate.month < 1) {
                    currentDate.month = 12;
                    currentDate.year--;
                }
                renderDatepicker();
            });
            
            $datepicker.find('.next-month').on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                currentDate.month++;
                if (currentDate.month > 12) {
                    currentDate.month = 1;
                    currentDate.year++;
                }
                renderDatepicker();
            });
            
            // Decade Navigation (for year view) - now 12-year ranges
            $datepicker.find('.prev-decade').on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                var newYear = currentDate.year - 12;
                if (isYearValid(newYear)) {
                    currentDate.year = newYear;
                    renderDatepicker();
                } else {
                    // If the exact year isn't valid, find the closest valid year
                    var minYear = getMinYear();
                    if (newYear < minYear) {
                        currentDate.year = minYear;
                        renderDatepicker();
                    }
                }
            });
            
            $datepicker.find('.next-decade').on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                var newYear = currentDate.year + 12;
                if (isYearValid(newYear)) {
                    currentDate.year = newYear;
                    renderDatepicker();
                } else {
                    // If the exact year isn't valid, find the closest valid year
                    var maxYear = getMaxYear();
                    if (newYear > maxYear) {
                        currentDate.year = maxYear;
                        renderDatepicker();
                    }
                }
            });
            
            // Year selection (in year view)
            $datepicker.find('.year-item').on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                var year = parseInt($(this).data('year'));
                if (isYearValid(year)) {
                    currentDate.year = year;
                    currentView = 'month';
                    renderDatepicker();
                }
            });
            
            // Back to month view - close datepicker like official library
            $datepicker.find('.back-to-month').on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                currentView = 'month';
                
                // Close datepicker when going back to month view like official library
                hideDatepicker();
            });
            
            // Today button - go to current date like official library
            $datepicker.find('.today-btn').on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                var today = getCurrentNepaliDate();
                currentDate = {...today};
                selectedDate = {...today};
                $input.val(formatDate(selectedDate));
                
                // Close datepicker after going to today like official library
                hideDatepicker();
                
                if (settings.onSelect) {
                    settings.onSelect(selectedDate, formatDate(selectedDate));
                }
            });
            
            // Today button in main view
            $datepicker.find('.btn-today').on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                var today = getCurrentNepaliDate();
                currentDate = {...today};
                selectedDate = {...today};
                $input.val(formatDate(selectedDate));
                
                // Close datepicker after going to today like official library
                    hideDatepicker();
                
                if (settings.onSelect) {
                    settings.onSelect(selectedDate, formatDate(selectedDate));
                }
            });
            
            // Month and year click events removed as requested
            
            
            
            // Year list navigation - using event delegation
            $datepicker.on('click', '.prev-year-range', function(e) {
                e.preventDefault();
                e.stopPropagation();
                navigateYearRange('prev');
            });
            
            $datepicker.on('click', '.next-year-range', function(e) {
                e.preventDefault();
                e.stopPropagation();
                navigateYearRange('next');
            });
            
            // Year list item selection - close after selection like official library - using event delegation
            $datepicker.on('click', '.year-list-item', function(e) {
                e.preventDefault();
                e.stopPropagation();
                var year = parseInt($(this).data('year'));
                if (isYearValid(year)) {
                    currentDate.year = year;
                    hideYearList();
                    
                    // Close datepicker after year selection like official library
                    hideDatepicker();
                }
            });
            
            // Month selection (in month list view) - close after selection like official library - using event delegation
            $datepicker.on('click', '.month-item', function(e) {
                e.preventDefault();
                e.stopPropagation();
                var month = parseInt($(this).data('month'));
                currentDate.month = month;
                currentView = 'month';
                
                // Close datepicker after month selection like official library
                hideDatepicker();
            });
            
            
            
            
            
            // Day selection - show month selection like official library
            $datepicker.find('.day:not(.other-month)').on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                var day = parseInt($(this).data('day'));
                selectedDate = {...currentDate, day: day};
                $input.val(formatDate(selectedDate));
                
                // Show month selection instead of closing
                showMonthList();
                
                if (settings.onSelect) {
                    settings.onSelect(selectedDate, formatDate(selectedDate));
                }
            });
            
        }

        // Utility functions
        function getCurrentNepaliDate() {
            var today = new Date();
            return convertADToBS(today);
        }

        function convertADToBS(adDate) {
            // Official library reference: 1944-01-01 AD = 2000-09-17 BS
            var referenceAD = new Date(1944, 0, 1); // January 1, 1944
            var referenceBS = { year: 2000, month: 9, day: 17 }; // 2000-09-17 BS
            
            // Calculate the difference in days
            var diffTime = adDate.getTime() - referenceAD.getTime();
            var diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            
            var bsDate = {...referenceBS};
            
            // If the AD date is before the reference date, we need to go backwards
            if (diffDays < 0) {
                // Go backwards day by day
                for (var i = 0; i < Math.abs(diffDays); i++) {
                    bsDate.day--;
                    if (bsDate.day < 1) {
                        bsDate.month--;
                        if (bsDate.month < 1) {
                            bsDate.month = 12;
                            bsDate.year--;
                        }
                        bsDate.day = getDaysInMonth(bsDate);
                    }
                }
            } else {
                // Go forwards day by day
            for (var i = 0; i < diffDays; i++) {
                bsDate.day++;
                var daysInMonth = getDaysInMonth(bsDate);
                
                if (bsDate.day > daysInMonth) {
                    bsDate.day = 1;
                    bsDate.month++;
                    
                    if (bsDate.month > 12) {
                        bsDate.month = 1;
                        bsDate.year++;
                        }
                    }
                }
            }
            
            return bsDate;
        }

        function getDaysInMonth(date) {
            return bsCalendarData[date.year] ? bsCalendarData[date.year][date.month - 1] : 30;
        }

        function getFirstDayOfMonth(date) {
            // Calculate the actual first day of the month based on calendar data
            // Reference: 2000-09-17 BS = Sunday (day 0)
            var referenceBS = { year: 2000, month: 9, day: 17 };
            var referenceDayOfWeek = 0; // Sunday
            
            // Calculate total days from reference date to the first day of the target month
            var totalDays = 0;
            
            // Calculate days from reference date to first day of target month
            var tempDate = { year: referenceBS.year, month: referenceBS.month, day: referenceBS.day };
            var targetDate = { year: date.year, month: date.month, day: 1 };
            
            while (tempDate.year !== targetDate.year || tempDate.month !== targetDate.month || tempDate.day !== targetDate.day) {
                totalDays++;
                tempDate.day++;
                var daysInMonth = getDaysInMonth(tempDate);
                if (tempDate.day > daysInMonth) {
                    tempDate.day = 1;
                    tempDate.month++;
                    if (tempDate.month > 12) {
                        tempDate.month = 1;
                        tempDate.year++;
                    }
                }
            }
            
            // Calculate day of week (0 = Sunday, 1 = Monday, etc.)
            var dayOfWeek = (referenceDayOfWeek + totalDays) % 7;
            if (dayOfWeek < 0) dayOfWeek += 7;
            
            return dayOfWeek;
        }

        function isSameDate(date1, date2) {
            return date1.year === date2.year && 
                   date1.month === date2.month && 
                   date1.day === date2.day;
        }

        // Helper function to convert Nepali date to English date
        function convertBSToAD(bsYear, bsMonth, bsDay) {
            // Official library reference: 2000-09-17 BS = 1944-01-01 AD
            var referenceBS = { year: 2000, month: 9, day: 17 };
            var referenceAD = new Date(1944, 0, 1); // January 1, 1944
            
            // Calculate total days from reference BS date to given BS date
            var totalDays = 0;
            
            // Calculate days from reference date to target date
            var tempDate = { year: referenceBS.year, month: referenceBS.month, day: referenceBS.day };
            while (tempDate.year !== bsYear || tempDate.month !== bsMonth || tempDate.day !== bsDay) {
                totalDays++;
                tempDate.day++;
                var daysInMonth = getDaysInMonth(tempDate);
                if (tempDate.day > daysInMonth) {
                    tempDate.day = 1;
                    tempDate.month++;
                    if (tempDate.month > 12) {
                        tempDate.month = 1;
                        tempDate.year++;
                    }
                }
            }
            
            // Convert to AD date using reference point
            var adDate = new Date(referenceAD.getTime() + (totalDays * 24 * 60 * 60 * 1000));
            
            var result = {
                year: adDate.getFullYear(),
                month: adDate.getMonth() + 1,
                day: adDate.getDate()
            };
            
            return result;
        }

        // Helper function to get English date from Nepali date
        function getEnglishDate(nepaliDate) {
            return convertBSToAD(nepaliDate.year, nepaliDate.month, nepaliDate.day);
        }

        // Helper function to get year range for year list
        function getYearRange(currentYear) {
            var startYear = Math.floor(currentYear / 12) * 12;
            var endYear = startYear + 11;
            return { start: startYear, end: endYear };
        }

        // Helper function to get year range display text
        function getYearRangeDisplay(currentYear) {
            var range = getYearRange(currentYear);
            return convertToNepaliNumbers(range.start) + ' - ' + convertToNepaliNumbers(range.end);
        }

        // Toggle year list visibility
        function toggleYearList() {
            var $yearListContainer = $datepicker.find('.year-list-container');
            console.log('toggleYearList called, year list container found:', $yearListContainer.length);
            if ($yearListContainer.is(':visible')) {
                console.log('Hiding year list');
                hideYearList();
            } else {
                console.log('Showing year list');
                showYearList();
            }
        }

        // Show year list
        function showYearList() {
            var $yearListContainer = $datepicker.find('.year-list-container');
            console.log('showYearList called, container found:', $yearListContainer.length);
            if ($yearListContainer.length > 0) {
                console.log('Showing year list with slideDown');
                $yearListContainer.slideDown(200);
            } else {
                console.log('Year list container not found!');
            }
        }

        // Hide year list
        function hideYearList() {
            var $yearListContainer = $datepicker.find('.year-list-container');
            $yearListContainer.slideUp(200);
        }

        // Navigate year range
        function navigateYearRange(direction) {
            var currentRange = getYearRange(currentDate.year);
            var newYear;
            
            if (direction === 'prev') {
                newYear = currentRange.start - 12;
            } else {
                newYear = currentRange.start + 12;
            }
            
            if (isYearValid(newYear)) {
                currentDate.year = newYear;
                renderDatepicker();
            }
        }


        function formatDate(date) {
            if (!date) return '';
            
            var year = settings.language === 'nepali' ? 
                convertToNepaliNumbers(date.year) : date.year;
            var month = settings.language === 'nepali' ? 
                convertToNepaliNumbers(date.month) : date.month;
            var day = settings.language === 'nepali' ? 
                convertToNepaliNumbers(date.day) : date.day;

            return settings.dateFormat
                .replace('YYYY', year)
                .replace('MM', month.toString().padStart(2, '0'))
                .replace('DD', day.toString().padStart(2, '0'));
        }

        function convertToNepaliNumbers(str) {
            var nepaliNumbers = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
            return str.toString().replace(/\d/g, function(digit) {
                return nepaliNumbers[parseInt(digit)];
            });
        }

        // Simplified event handlers based on official library
        $input.on('click focus', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (!isOpen) {
                showDatepicker();
            }
        });

        $input.on('mousedown', function(e) {
            e.stopPropagation();
        });

        // Simplified document event handling based on official library
        $(document).on('mousedown.nepaliDatepicker', function(e) {
            // Close datepicker if clicking outside
            if (isOpen && 
                !$(e.target).closest($input).length && 
                !$(e.target).closest($datepicker).length &&
                !$(e.target).closest('.nepali-datepicker-modal-overlay').length) {
                hideDatepicker();
            }
        });

        // Simplified datepicker element event handling
        function bindDatepickerElementEvents() {
            if (!$datepicker) return;
            
            // Prevent closing when interacting with datepicker elements
            $datepicker.on('mousedown', function(e) {
                e.stopPropagation();
            });
            
            // Add direct click handler to modal overlay for better reliability
            if (settings.modal && $modalOverlay) {
                $modalOverlay.on('click.nepaliDatepicker', function(e) {
                    // Only close if clicking directly on the overlay, not on its children
                    if (e.target === $modalOverlay[0]) {
                        hideDatepicker();
                    }
                });
                
                // Prevent modal content clicks from bubbling to overlay
                var $modalContent = $modalOverlay.find('.nepali-datepicker-modal-content');
                if ($modalContent.length) {
                    $modalContent.on('click.nepaliDatepicker', function(e) {
                        e.stopPropagation();
                    });
                }
            }
        }

        // Handle window resize to reposition datepicker
        $(window).on('resize.nepaliDatepicker scroll.nepaliDatepicker', function() {
            if (isOpen) {
                if (settings.modal) {
                    // Modal doesn't need repositioning
                } else {
                    positionDatepicker();
                }
            }
        });

        // Handle keyboard events for modal
        if (settings.modal) {
            $(document).on('keydown.nepaliDatepicker', function(e) {
                if (e.keyCode === 27 && isOpen) { // Escape key
                    console.log('Escape key pressed - closing datepicker');
                    hideDatepicker();
                }
            });
        }

        // Initialize
        createDatepicker();
        
        // Public methods
        $input.data('nepaliDatepicker', {
            show: showDatepicker,
            hide: hideDatepicker,
            getDate: function() { return selectedDate; },
            setDate: function(date) { 
                selectedDate = date; 
                $input.val(formatDate(date));
                renderDatepicker();
            },
            clear: function() {
                selectedDate = null;
                $input.val('');
                renderDatepicker();
            },
            destroy: function() {
                $(document).off('mousedown.nepaliDatepicker keydown.nepaliDatepicker');
                $(window).off('resize.nepaliDatepicker scroll.nepaliDatepicker');
                if ($datepicker) {
                    $datepicker.off('mousedown');
                    $datepicker.remove();
                }
                if ($modalOverlay) {
                    $modalOverlay.off('click.nepaliDatepicker');
                    $modalOverlay.find('.nepali-datepicker-modal-content').off('click.nepaliDatepicker');
                    $modalOverlay.remove();
                }
                $input.removeData('nepaliDatepicker');
                $input.removeAttr('data-nepali-datepicker-active');
                
                // Clean up global state if this was the active datepicker
                if (activeDatepicker === $datepicker) {
                    activeDatepicker = null;
                }
            }
        });
    }

})(jQuery);
