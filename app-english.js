/**
 * Application JavaScript for Custom English Datepicker Demo
 * Completely jQuery-based
 */

// Helper function to compare dates
function compareDates(date1, date2) {
    if (!date1 || !date2) return 0;
    
    const d1 = date1.year * 10000 + date1.month * 100 + date1.day;
    const d2 = date2.year * 10000 + date2.month * 100 + date2.day;
    
    if (d1 < d2) return -1;
    if (d1 > d2) return 1;
    return 0;
}

$(document).ready(function() {
    // Initialize all datepickers
    initializeDatepickers();
    
    // Setup configuration panel
    setupConfigurationPanel();
    
    // Setup modal functionality
    setupModal();
    
    // Load demo data after initialization
    setTimeout(loadDemoData, 1000);
    
    // Set default dates for empty datepickers after a short delay
    setTimeout(function() {
        setDefaultDatesForEmptyDatepickers();
    }, 1500);
    
    // Add keyboard shortcuts
    setupKeyboardShortcuts();
    
    console.log('Custom English Datepicker Demo initialized successfully!');
});

// Initialize all datepickers
function initializeDatepickers() {
    // Basic datepicker
    $('#basic-datepicker').englishDatepicker({
        theme: 'light',
        language: 'english',
        dateFormat: 'YYYY-MM-DD',
        defaultDate: '2024-01-15',
        showToday: false,
        onSelect: function(date, formatted) {
            console.log('Basic datepicker selected:', date, formatted);
        }
    });

    // Modern style datepicker
    $('#modern-datepicker').englishDatepicker({
        theme: 'light',
        language: 'english',
        dateFormat: 'DD-MM-YYYY',
        minDate: '2024-01-01',
        maxDate: '2025-12-31',
        disabledDates: [
            '2024-01-01',
            '2024-01-02',
            '2024-01-03'
        ],
        defaultDate: '2024-01-01',
        showToday: true,
        onSelect: function(date, formatted) {
            console.log('Modern datepicker selected:', date, formatted);
        }
    });

    // Minimal style datepicker
    $('#minimal-datepicker').englishDatepicker({
        theme: 'light',
        language: 'english',
        dateFormat: 'MM/DD/YYYY',
        defaultDate: '2024-01-01',
        showToday: false,
        onSelect: function(date, formatted) {
            console.log('Minimal datepicker selected:', date, formatted);
        }
    });

    // Dark theme datepicker
    $('#dark-datepicker').englishDatepicker({
        theme: 'dark',
        language: 'english',
        dateFormat: 'YYYY-MM-DD',
        disabledDates: [
            '2024-06-15',
            '2024-06-16',
            '2024-06-17'
        ],
        showToday: false,
        onSelect: function(date, formatted) {
            console.log('Dark datepicker selected:', date, formatted);
        }
    });

    // Blue theme datepicker
    $('#range-datepicker').englishDatepicker({
        theme: 'blue',
        language: 'english',
        dateFormat: 'DD-MM-YYYY',
        onSelect: function(date, formatted) {
            console.log('Blue datepicker selected:', date, formatted);
        }
    });

    // Green theme datepicker
    $('#time-datepicker').englishDatepicker({
        theme: 'green',
        language: 'english',
        dateFormat: 'YYYY-MM-DD',
        onSelect: function(date, formatted) {
            console.log('Green datepicker selected:', date, formatted);
        }
    });

    // Purple theme datepicker
    $('#purple-datepicker').englishDatepicker({
        theme: 'purple',
        language: 'english',
        dateFormat: 'YYYY-MM-DD',
        defaultDate: '2024-01-01',
        showToday: true,
        onSelect: function(date, formatted) {
            console.log('Purple datepicker selected:', date, formatted);
        }
    });

    // Orange theme datepicker
    $('#orange-datepicker').englishDatepicker({
        theme: 'orange',
        language: 'english',
        dateFormat: 'YYYY-MM-DD',
        defaultDate: '2024-01-01',
        showToday: true,
        onSelect: function(date, formatted) {
            console.log('Orange datepicker selected:', date, formatted);
        }
    });

    // Red theme datepicker
    $('#red-datepicker').englishDatepicker({
        theme: 'red',
        language: 'english',
        dateFormat: 'YYYY-MM-DD',
        defaultDate: new Date(),
        showToday: true,
        onSelect: function(date, formatted) {
            console.log('Red datepicker selected:', date, formatted);
        }
    });

    // Green theme datepicker (additional example)
    $('#green-datepicker').englishDatepicker({
        theme: 'green',
        language: 'english',
        dateFormat: 'YYYY-MM-DD',
        defaultDate: '2024-01-01',
        showToday: true,
        onSelect: function(date, formatted) {
            console.log('Green datepicker selected:', date, formatted);
        }
    });

    // Read-only datepicker
    $('#readonly-datepicker').englishDatepicker({
        theme: 'light',
        language: 'english',
        dateFormat: 'YYYY-MM-DD',
        onSelect: function(date, formatted) {
            console.log('Readonly datepicker selected:', date, formatted);
        }
    });

    // Disabled dates datepicker
    $('#disabled-datepicker').englishDatepicker({
        theme: 'light',
        language: 'english',
        dateFormat: 'DD-MM-YYYY',
        onSelect: function(date, formatted) {
            console.log('Disabled dates datepicker selected:', date, formatted);
        }
    });

    // Initialize unified range picker
    initializeUnifiedRangePicker();
    
    // Initialize English range picker
    initializeEnglishRangePicker();
    
    // Initialize date validation examples
    initializeDateValidationExamples();
}

// Setup configuration panel
function setupConfigurationPanel() {
    $('#theme-selector').on('change', function() {
        const theme = $(this).val();
        updateAllDatepickers({ theme: theme });
    });

    $('#language-selector').on('change', function() {
        const language = $(this).val();
        updateAllDatepickers({ language: language });
    });

    $('#format-selector').on('change', function() {
        const dateFormat = $(this).val();
        updateAllDatepickers({ dateFormat: dateFormat });
    });

    $('#english-subscript-toggle').on('change', function() {
        const showEnglishDateSubscript = $(this).is(':checked');
        updateAllDatepickers({ showEnglishDateSubscript: showEnglishDateSubscript });
    });
}

// Update all datepickers with new options
function updateAllDatepickers(options) {
    $('[id$="-datepicker"]').each(function() {
        const $input = $(this);
        const currentOptions = $input.data('englishDatepicker') || {};
        const newOptions = $.extend({}, currentOptions, options);
        
        $input.englishDatepicker('destroy');
        $input.englishDatepicker(newOptions);
    });
}

// Modal functions
function openModal() {
    console.log('openModal() called');
    const $modal = $('#datepicker-modal');
    if ($modal.length) {
        console.log('Modal found, opening...');
        $modal.show();
        $('body').css('overflow', 'hidden');
    } else {
        console.log('ERROR: datepicker-modal not found');
    }
}

function closeModal() {
    console.log('closeModal() called');
    const $modal = $('#datepicker-modal');
    if ($modal.length) {
        console.log('Modal found, closing...');
        $modal.hide();
        $('body').css('overflow', 'auto');
    } else {
        console.log('ERROR: datepicker-modal not found for closing');
    }
}

// Setup modal event listeners
function setupModal() {
    $('.close').on('click', closeModal);
    
    $('#datepicker-modal').on('click', function(event) {
        if (event.target === this) {
            closeModal();
        }
    });
    
    $(document).on('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
}

// Utility functions
function getCurrentEnglishDate() {
    const today = new Date();
    return {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate()
    };
}

function formatEnglishDate(date) {
    if (!date) return '';
    
    const year = date.year;
    const month = date.month.toString().padStart(2, '0');
    const day = date.day.toString().padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}

// Demo functions
function showGetCurrentDateDemo() {
    const currentDate = getCurrentEnglishDate();
    
    console.log('getCurrentDate Demo:', currentDate);
    
    Swal.fire({
        title: '📅 getCurrentDate Demo',
        html: `
            <div style="text-align: left; font-family: 'Inter', sans-serif;">
                <div style="background: #f8fafc; padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #3182ce;">
                    <h3 style="margin: 0 0 15px 0; color: #2d3748; font-size: 18px; font-weight: 600;">
                        🇺🇸 English Date (AD)
                    </h3>
                    <p style="margin: 0; color: #4a5568; font-size: 16px; font-family: 'Courier New', monospace;">
                        ${currentDate.year}-${currentDate.month.toString().padStart(2, '0')}-${currentDate.day.toString().padStart(2, '0')}
                    </p>
                </div>
            </div>
        `,
        width: '500px',
        padding: '30px',
        background: '#ffffff',
        showConfirmButton: true,
        confirmButtonText: '✨ Great!',
        confirmButtonColor: '#3182ce',
        showCloseButton: true,
        closeButtonHtml: '<i class="fas fa-times"></i>'
    });
}

function showDatepickerInfo(instanceName) {
    const $input = $(`#${instanceName}-datepicker`);
    if ($input.length) {
        const datepicker = $input.data('englishDatepicker');
        if (datepicker) {
            const selectedDate = datepicker.getDate();
            const formattedDate = selectedDate ? formatEnglishDate(selectedDate) : 'No date selected';
            
            // Get validation constraints
            const startDate = datepicker.getStartDate();
            const endDate = datepicker.getEndDate();
            
            if (!selectedDate) {
                Swal.fire({
                    icon: 'warning',
                    title: 'No Date Selected',
                    text: 'Please select a date first to see the information.',
                    confirmButtonColor: '#f59e0b'
                });
                return;
            }
            
            // Build validation info for validation examples
            let validationInfo = '';
            if (['startdate', 'enddate', 'daterange', 'dynamic'].includes(instanceName)) {
                validationInfo = `
                    <div style="background: #e6fffa; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
                        <h4 style="margin: 0 0 10px 0; color: #065f46; font-size: 16px; font-weight: 600;">
                            🔒 Date Validation Constraints
                        </h4>
                        ${startDate ? `<p style="margin: 5px 0; color: #047857; font-size: 14px;"><strong>Start Date:</strong> ${formatEnglishDate(startDate)}</p>` : ''}
                        ${endDate ? `<p style="margin: 5px 0; color: #047857; font-size: 14px;"><strong>End Date:</strong> ${formatEnglishDate(endDate)}</p>` : ''}
                        ${!startDate && !endDate ? '<p style="margin: 5px 0; color: #047857; font-size: 14px;">No date constraints applied</p>' : ''}
                    </div>
                `;
            }
            
            Swal.fire({
                title: '📅 Date Information',
                html: `
                    <div style="text-align: left; font-family: 'Inter', sans-serif;">
                        <div style="background: #f8fafc; padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #3182ce;">
                            <h3 style="margin: 0 0 15px 0; color: #2d3748; font-size: 18px; font-weight: 600;">
                                🇺🇸 English Date
                            </h3>
                            <p style="margin: 0; color: #4a5568; font-size: 16px; font-family: 'Courier New', monospace;">
                                ${formattedDate}
                            </p>
                        </div>
                        
                        ${validationInfo}
                        
                        <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
                            <p style="margin: 0; color: #92400e; font-size: 14px; font-weight: 500;">
                                📋 Instance: ${instanceName} Datepicker
                            </p>
                        </div>
                    </div>
                `,
                width: '500px',
                padding: '30px',
                background: '#ffffff',
                showConfirmButton: true,
                confirmButtonText: '✨ Great!',
                confirmButtonColor: '#3182ce',
                showCloseButton: true,
                closeButtonHtml: '<i class="fas fa-times"></i>'
            });
        }
    }
}

// Additional utility functions
function resetAllDatepickers() {
    $('[id$="-datepicker"]').each(function() {
        const datepicker = $(this).data('englishDatepicker');
        if (datepicker && typeof datepicker.clear === 'function') {
            datepicker.clear();
        }
    });
    
    setTimeout(function() {
        setDefaultDatesForEmptyDatepickers();
    }, 100);
    
    console.log('All datepickers reset and default dates set');
}

function setDefaultDatesForEmptyDatepickers() {
    const today = getCurrentEnglishDate();
    
    const datepickerIds = [
        'basic-datepicker',
        'modern-datepicker', 
        'minimal-datepicker',
        'dark-datepicker',
        'range-datepicker',
        'time-datepicker',
        'readonly-datepicker',
        'disabled-datepicker',
        'red-datepicker',
        'purple-datepicker',
        'orange-datepicker',
        'green-datepicker'
    ];
    
    datepickerIds.forEach(function(id) {
        const $input = $('#' + id);
        if ($input.length) {
            const datepicker = $input.data('englishDatepicker');
            if (datepicker) {
                const currentDate = datepicker.getDate();
                if (!currentDate) {
                    datepicker.setDate(today);
                    console.log(`Set default date for ${id}:`, today);
                }
            }
        }
    });
}

function loadDemoData() {
    const exampleDate = { year: 2024, month: 6, day: 15 };
    
    const readonlyDatepicker = $('#readonly-datepicker').data('englishDatepicker');
    if (readonlyDatepicker) {
        readonlyDatepicker.setDate(exampleDate);
    }
    
    const basicDatepicker = $('#basic-datepicker').data('englishDatepicker');
    if (basicDatepicker) {
        const today = getCurrentEnglishDate();
        basicDatepicker.setDate(today);
    }
    
    setDefaultDatesForEmptyDatepickers();
    console.log('Demo data loaded');
}

function setupKeyboardShortcuts() {
    $(document).on('keydown', function(event) {
        if ((event.ctrlKey || event.metaKey) && event.key === 'd') {
            event.preventDefault();
            openModal();
        }
        
        if ((event.ctrlKey || event.metaKey) && event.key === 'r') {
            event.preventDefault();
            resetAllDatepickers();
        }
    });
}

// Unified Range Picker Functionality
let unifiedRangeState = {
    startDate: null,
    endDate: null,
    isSelectingStart: true,
    isRangeComplete: false
};

function initializeUnifiedRangePicker() {
    $('#unified-range-picker').englishDatepicker({
        theme: 'light',
        language: 'english',
        dateFormat: 'YYYY-MM-DD',
        autoClose: false,
        showToday: false,
        onSelect: function(date, formatted) {
            handleUnifiedRangeSelection(date, formatted);
        }
    });
}

function handleUnifiedRangeSelection(date, formatted) {
    if (unifiedRangeState.isSelectingStart) {
        if (unifiedRangeState.startDate && 
            unifiedRangeState.startDate.date.year === date.year &&
            unifiedRangeState.startDate.date.month === date.month &&
            unifiedRangeState.startDate.date.day === date.day) {
            resetRangePicker();
            return;
        }
        
        unifiedRangeState.startDate = { date: date, formatted: formatted };
        unifiedRangeState.isSelectingStart = false;
        unifiedRangeState.isRangeComplete = false;
        
        $('#unified-range-picker').val(`${formatted} → Select End Date`);
        
    } else {
        if (unifiedRangeState.endDate && 
            unifiedRangeState.endDate.date.year === date.year &&
            unifiedRangeState.endDate.date.month === date.month &&
            unifiedRangeState.endDate.date.day === date.day) {
            resetRangePicker();
            return;
        }
        
        unifiedRangeState.endDate = { date: date, formatted: formatted };
        unifiedRangeState.isSelectingStart = true;
        unifiedRangeState.isRangeComplete = true;
        
        const startFormatted = unifiedRangeState.startDate.formatted;
        const endFormatted = unifiedRangeState.endDate.formatted;
        $('#unified-range-picker').val(`${startFormatted} to ${endFormatted}`);
    }
    
    updateUnifiedRangeDisplay();
}

function updateUnifiedRangeDisplay() {
    const $rangeText = $('#unified-range-text');
    
    if (unifiedRangeState.isRangeComplete && unifiedRangeState.startDate && unifiedRangeState.endDate) {
        const startFormatted = unifiedRangeState.startDate.formatted;
        const endFormatted = unifiedRangeState.endDate.formatted;
        $rangeText.text(`✅ ${startFormatted} to ${endFormatted}`);
        $rangeText.css('border-left-color', '#10b981');
    } else if (unifiedRangeState.startDate && !unifiedRangeState.endDate) {
        $rangeText.text(`🔄 Start: ${unifiedRangeState.startDate.formatted} (Datepicker open - click to select end date)`);
        $rangeText.css('border-left-color', '#f59e0b');
    } else {
        $rangeText.text('📅 No dates selected (Click to select start date)');
        $rangeText.css('border-left-color', '#3b82f6');
    }
}

function showUnifiedRangeInfo() {
    if (!unifiedRangeState.startDate && !unifiedRangeState.endDate) {
        Swal.fire({
            icon: 'warning',
            title: 'No Range Selected',
            text: 'Please select a date range first.',
            confirmButtonColor: '#f59e0b'
        });
        return;
    }

    Swal.fire({
        title: '📅 Unified Date Range Information',
        html: `
            <div style="text-align: left; font-family: 'Inter', sans-serif;">
                <div style="background: #f8fafc; padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #3182ce;">
                    <h3 style="margin: 0 0 15px 0; color: #2d3748; font-size: 18px; font-weight: 600;">
                        🇺🇸 English Date Range
                    </h3>
                    <p style="margin: 0; color: #4a5568; font-size: 16px; font-family: 'Courier New', monospace;">
                        ${unifiedRangeState.startDate ? unifiedRangeState.startDate.formatted : 'Not selected'} 
                        ${unifiedRangeState.startDate && unifiedRangeState.endDate ? 'to' : ''} 
                        ${unifiedRangeState.endDate ? unifiedRangeState.endDate.formatted : ''}
                    </p>
                </div>
                
                <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
                    <p style="margin: 0; color: #92400e; font-size: 14px; font-weight: 500;">
                        📊 Range Status: ${unifiedRangeState.isRangeComplete ? 'Complete' : 'Partial'}
                    </p>
                </div>
            </div>
        `,
        width: '500px',
        padding: '30px',
        background: '#ffffff',
        showConfirmButton: true,
        confirmButtonText: '✨ Great!',
        confirmButtonColor: '#3182ce',
        showCloseButton: true,
        closeButtonHtml: '<i class="fas fa-times"></i>'
    });
}

function resetRangePicker() {
    unifiedRangeState.startDate = null;
    unifiedRangeState.endDate = null;
    unifiedRangeState.isSelectingStart = true;
    unifiedRangeState.isRangeComplete = false;
    
    $('#unified-range-picker').val('');
    updateUnifiedRangeDisplay();
    console.log('Range picker reset');
}

function clearUnifiedRange() {
    unifiedRangeState.startDate = null;
    unifiedRangeState.endDate = null;
    unifiedRangeState.isSelectingStart = true;
    unifiedRangeState.isRangeComplete = false;
    
    $('#unified-range-picker').val('');
    updateUnifiedRangeDisplay();
    console.log('Unified range cleared');
}

function completeRange() {
    if (unifiedRangeState.startDate && !unifiedRangeState.endDate) {
        Swal.fire({
            icon: 'info',
            title: 'Complete Range Selection',
            text: 'Please select an end date to complete the range.',
            confirmButtonColor: '#3b82f6'
        });
    } else if (unifiedRangeState.isRangeComplete) {
        Swal.fire({
            icon: 'success',
            title: 'Range Complete!',
            text: 'Your date range has been successfully selected.',
            confirmButtonColor: '#10b981'
        });
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'No Range Selected',
            text: 'Please select a start date first.',
            confirmButtonColor: '#f59e0b'
        });
    }
}

// English Range Picker Functionality
let englishRangeState = {
    startDate: null,
    endDate: null,
    isSelectingStart: true,
    isRangeComplete: false
};

function initializeEnglishRangePicker() {
    $('#english-range-picker').englishDatepicker({
        theme: 'light',
        language: 'english',
        dateFormat: 'YYYY-MM-DD',
        autoClose: false,
        showToday: false,
        onSelect: function(date, formatted) {
            handleEnglishRangeSelection(date, formatted);
        },
        onOpen: function() {
            console.log('English range picker opened');
            updateEnglishRangeDisplay();
            // Re-highlight any existing range when datepicker opens
            setTimeout(highlightEnglishRangeDates, 100);
        },
        onClose: function() {
            console.log('English range picker closed');
        }
    });
}

// Initialize date validation examples
function initializeDateValidationExamples() {
    // Start Date Validation Example
    $('#startdate-datepicker').englishDatepicker({
        theme: 'light',
        language: 'english',
        dateFormat: 'YYYY-MM-DD',
        startDate: { year: 2024, month: 1, day: 1 }, // Minimum date: 2024-01-01
        onSelect: function(date, formatted) {
            console.log('Start date validation selected:', date, formatted);
            // Update end date picker to have this as minimum date
            updateEndDatePickerConstraints(date);
        }
    });

    // End Date Validation Example
    $('#enddate-datepicker').englishDatepicker({
        theme: 'light',
        language: 'english',
        dateFormat: 'YYYY-MM-DD',
        endDate: { year: 2025, month: 12, day: 31 }, // Maximum date: 2025-12-31
        onSelect: function(date, formatted) {
            console.log('End date validation selected:', date, formatted);
            // Update start date picker to have this as maximum date
            updateStartDatePickerConstraints(date);
        }
    });

    // Date Range Validation Example
    $('#daterange-datepicker').englishDatepicker({
        theme: 'light',
        language: 'english',
        dateFormat: 'YYYY-MM-DD',
        startDate: { year: 2024, month: 6, day: 1 }, // Minimum date: 2024-06-01
        endDate: { year: 2024, month: 12, day: 31 }, // Maximum date: 2024-12-31
        onSelect: function(date, formatted) {
            console.log('Date range validation selected:', date, formatted);
        }
    });

    // Dynamic Date Validation Example
    $('#dynamic-datepicker').englishDatepicker({
        theme: 'light',
        language: 'english',
        dateFormat: 'YYYY-MM-DD',
        startDate: function() {
            // Dynamic start date: today
            const today = new Date();
            return { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
        },
        endDate: function() {
            // Dynamic end date: 30 days from today
            const today = new Date();
            const futureDate = new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000));
            return { year: futureDate.getFullYear(), month: futureDate.getMonth() + 1, day: futureDate.getDate() };
        },
        onSelect: function(date, formatted) {
            console.log('Dynamic date validation selected:', date, formatted);
        }
    });

    console.log('Date validation examples initialized');
}

// Update end date picker constraints based on start date selection
function updateEndDatePickerConstraints(startDate) {
    const $endDatePicker = $('#enddate-datepicker');
    const endDatePicker = $endDatePicker.data('englishDatepicker');
    
    if (endDatePicker) {
        // Get the current end date constraint
        const currentEndDate = endDatePicker.getEndDate();
        
        // Only set start date if it doesn't conflict with existing end date
        if (!currentEndDate || compareDates(startDate, currentEndDate) <= 0) {
            // Set the selected start date as the minimum date for end date picker
            endDatePicker.setStartDate(startDate);
            
            // Update placeholder to show the constraint
            $endDatePicker.attr('placeholder', `Select End Date (after ${formatEnglishDate(startDate)})`);
            
            // Show validation message
            showCrossValidationMessage('startdate', startDate, 'enddate');
            
            console.log('End date picker constraints updated:', startDate);
        } else {
            // Show warning if dates conflict
            Swal.fire({
                icon: 'warning',
                title: 'Date Conflict',
                text: `Selected start date (${formatEnglishDate(startDate)}) is after the maximum end date (${formatEnglishDate(currentEndDate)}). Please select an earlier start date.`,
                confirmButtonColor: '#f59e0b'
            });
            return;
        }
        
        // Update validation status
        updateValidationStatus();
    }
}

// Update start date picker constraints based on end date selection
function updateStartDatePickerConstraints(endDate) {
    const $startDatePicker = $('#startdate-datepicker');
    const startDatePicker = $startDatePicker.data('englishDatepicker');
    
    if (startDatePicker) {
        // Get the current start date constraint
        const currentStartDate = startDatePicker.getStartDate();
        
        // Only set end date if it doesn't conflict with existing start date
        if (!currentStartDate || compareDates(currentStartDate, endDate) <= 0) {
            // Set the selected end date as the maximum date for start date picker
            startDatePicker.setEndDate(endDate);
            
            // Update placeholder to show the constraint
            $startDatePicker.attr('placeholder', `Select Start Date (before ${formatEnglishDate(endDate)})`);
            
            // Show validation message
            showCrossValidationMessage('enddate', endDate, 'startdate');
            
            console.log('Start date picker constraints updated:', endDate);
        } else {
            // Show warning if dates conflict
            Swal.fire({
                icon: 'warning',
                title: 'Date Conflict',
                text: `Selected end date (${formatEnglishDate(endDate)}) is before the minimum start date (${formatEnglishDate(currentStartDate)}). Please select a later end date.`,
                confirmButtonColor: '#f59e0b'
            });
            return;
        }
        
        // Update validation status
        updateValidationStatus();
    }
}

// Show cross-validation message
function showCrossValidationMessage(selectedPicker, selectedDate, targetPicker) {
    const pickerNames = {
        'startdate': 'Start Date',
        'enddate': 'End Date'
    };
    
    const targetNames = {
        'startdate': 'Start Date',
        'enddate': 'End Date'
    };
    
    Swal.fire({
        title: '🔗 Cross-Validation Applied',
        html: `
            <div style="text-align: left; font-family: 'Inter', sans-serif;">
                <div style="background: #e6fffa; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
                    <h4 style="margin: 0 0 10px 0; color: #065f46; font-size: 16px; font-weight: 600;">
                        ✅ ${pickerNames[selectedPicker]} Selected
                    </h4>
                    <p style="margin: 5px 0; color: #047857; font-size: 14px;">
                        <strong>Selected Date:</strong> ${formatEnglishDate(selectedDate)}
                    </p>
                </div>
                
                <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
                    <h4 style="margin: 0 0 10px 0; color: #92400e; font-size: 16px; font-weight: 600;">
                        🔒 ${targetNames[targetPicker]} Constraint Updated
                    </h4>
                    <p style="margin: 5px 0; color: #92400e; font-size: 14px;">
                        The ${targetNames[targetPicker]} picker now has a ${selectedPicker === 'startdate' ? 'minimum' : 'maximum'} date of <strong>${formatEnglishDate(selectedDate)}</strong>
                    </p>
                </div>
            </div>
        `,
        width: '500px',
        padding: '30px',
        background: '#ffffff',
        showConfirmButton: true,
        confirmButtonText: '✨ Got it!',
        confirmButtonColor: '#10b981',
        showCloseButton: true,
        closeButtonHtml: '<i class="fas fa-times"></i>'
    });
}

// Update validation status display
function updateValidationStatus() {
    const $startDatePicker = $('#startdate-datepicker');
    const $endDatePicker = $('#enddate-datepicker');
    
    const startDatePicker = $startDatePicker.data('englishDatepicker');
    const endDatePicker = $endDatePicker.data('englishDatepicker');
    
    // Get selected dates
    const startDate = startDatePicker ? startDatePicker.getDate() : null;
    const endDate = endDatePicker ? endDatePicker.getDate() : null;
    
    // Get constraints
    const startDateConstraint = startDatePicker ? startDatePicker.getEndDate() : null;
    const endDateConstraint = endDatePicker ? endDatePicker.getEndDate() : null;
    
    // Update status display
    $('#startdate-status').text(startDate ? formatEnglishDate(startDate) : 'None');
    $('#enddate-status').text(endDate ? formatEnglishDate(endDate) : 'None');
    
    // Determine cross-validation status
    let crossValidationStatus = 'Inactive';
    if (startDate && endDate) {
        crossValidationStatus = 'Active (Both dates selected)';
    } else if (startDate || endDate) {
        crossValidationStatus = 'Partial (One date selected)';
    }
    
    $('#cross-validation-status').text(crossValidationStatus);
    
    // Add visual indicators
    if (startDate) {
        $('#startdate-status').css('color', '#10b981').css('font-weight', '600');
    } else {
        $('#startdate-status').css('color', '#6b7280').css('font-weight', '400');
    }
    
    if (endDate) {
        $('#enddate-status').css('color', '#10b981').css('font-weight', '600');
    } else {
        $('#enddate-status').css('color', '#6b7280').css('font-weight', '400');
    }
    
    if (crossValidationStatus.includes('Active')) {
        $('#cross-validation-status').css('color', '#10b981').css('font-weight', '600');
    } else if (crossValidationStatus.includes('Partial')) {
        $('#cross-validation-status').css('color', '#f59e0b').css('font-weight', '600');
    } else {
        $('#cross-validation-status').css('color', '#6b7280').css('font-weight', '400');
    }
    
    console.log('Validation status updated:', { startDate, endDate, crossValidationStatus });
}

function handleEnglishRangeSelection(date, formatted) {
    if (englishRangeState.isSelectingStart) {
        // Check if clicking the same start date again (third click reset)
        if (englishRangeState.startDate && 
            englishRangeState.startDate.date.year === date.year &&
            englishRangeState.startDate.date.month === date.month &&
            englishRangeState.startDate.date.day === date.day) {
            // Reset the range picker
            resetEnglishRangePicker();
            return;
        }
        
        // First click: Select start date
        englishRangeState.startDate = { date: date, formatted: formatted };
        englishRangeState.isSelectingStart = false;
        englishRangeState.isRangeComplete = false;
        
        // Update input to show we're now selecting end date
        $('#english-range-picker').val(`${formatted} → Select End Date`);
        
        console.log('Start date selected:', date, formatted);
        
    } else {
        // Check if clicking the same end date again (fourth click reset)
        if (englishRangeState.endDate && 
            englishRangeState.endDate.date.year === date.year &&
            englishRangeState.endDate.date.month === date.month &&
            englishRangeState.endDate.date.day === date.day) {
            // Reset the range picker
            resetEnglishRangePicker();
            return;
        }
        
        // Second click: Select end date
        englishRangeState.endDate = { date: date, formatted: formatted };
        englishRangeState.isSelectingStart = true;
        englishRangeState.isRangeComplete = true;
        
        // Update input to show complete range
        const startFormatted = englishRangeState.startDate.formatted;
        const endFormatted = englishRangeState.endDate.formatted;
        $('#english-range-picker').val(`${startFormatted} to ${endFormatted}`);
        
        console.log('End date selected:', date, formatted);
        console.log('Range complete:', englishRangeState);
    }
    
    // Highlight the range after selection
    setTimeout(highlightEnglishRangeDates, 100);
    
    updateEnglishRangeDisplay();
}

function resetEnglishRangePicker() {
    // Reset the range state
    englishRangeState.startDate = null;
    englishRangeState.endDate = null;
    englishRangeState.isSelectingStart = true;
    englishRangeState.isRangeComplete = false;
    
    // Clear the input field
    $('#english-range-picker').val('Select start date');
    
    // Remove range highlights
    $('.english-datepicker .day').removeClass('range-start range-end range-between');
    
    updateEnglishRangeDisplay();
    console.log('English range picker reset - click same date to reset');
}

function highlightEnglishRangeDates() {
    // Remove any existing range highlights
    $('.english-datepicker .day').removeClass('range-start range-end range-between');
    
    if (englishRangeState.startDate) {
        const startDate = englishRangeState.startDate.date;
        
        // Find and highlight start date
        const $startDay = $(`.english-datepicker .day[data-day="${startDate.day}"]`).filter(function() {
            return !$(this).hasClass('other-month');
        });
        
        if ($startDay.length > 0) {
            $startDay.addClass('range-start');
            console.log('Highlighted start date:', startDate);
        }
        
        if (englishRangeState.endDate) {
            const endDate = englishRangeState.endDate.date;
            
            // Find and highlight end date
            const $endDay = $(`.english-datepicker .day[data-day="${endDate.day}"]`).filter(function() {
                return !$(this).hasClass('other-month');
            });
            
            if ($endDay.length > 0) {
                $endDay.addClass('range-end');
                console.log('Highlighted end date:', endDate);
            }
            
            // Highlight dates between start and end
            highlightEnglishDatesBetween(startDate, endDate);
        }
    }
}

function highlightEnglishDatesBetween(startDate, endDate) {
    console.log('Highlighting dates between:', startDate, 'and', endDate);
    
    // Work with English dates directly
    let currentDate = { ...startDate };
    const endDateCopy = { ...endDate };
    
    // Ensure start is before end
    const startNum = startDate.year * 10000 + startDate.month * 100 + startDate.day;
    const endNum = endDate.year * 10000 + endDate.month * 100 + endDate.day;
    
    if (startNum > endNum) {
        // Swap dates if start is after end
        const temp = currentDate;
        currentDate = endDateCopy;
        endDateCopy = temp;
    }
    
    // Find all dates between start and end (inclusive)
    while (true) {
        const currentNum = currentDate.year * 10000 + currentDate.month * 100 + currentDate.day;
        const endNum = endDateCopy.year * 10000 + endDateCopy.month * 100 + endDateCopy.day;
        
        if (currentNum > endNum) break;
        
        // Find the day element for this date
        const $dayElement = $(`.english-datepicker .day[data-day="${currentDate.day}"]`).filter(function() {
            return !$(this).hasClass('other-month');
        });
        
        if ($dayElement.length > 0) {
            $dayElement.addClass('range-between');
            console.log('Highlighted date:', currentDate);
        }
        
        // Move to next day
        currentDate.day++;
        // Use a simple approach for month days (this is approximate)
        const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const maxDays = monthDays[currentDate.month - 1] || 30;
        
        if (currentDate.day > maxDays) {
            currentDate.day = 1;
            currentDate.month++;
            if (currentDate.month > 12) {
                currentDate.month = 1;
                currentDate.year++;
            }
        }
    }
}

function updateEnglishRangeDisplay() {
    const $rangeText = $('#english-range-text');
    
    if (englishRangeState.isRangeComplete && englishRangeState.startDate && englishRangeState.endDate) {
        const startFormatted = englishRangeState.startDate.formatted;
        const endFormatted = englishRangeState.endDate.formatted;
        $rangeText.text(`✅ ${startFormatted} to ${endFormatted}`);
        $rangeText.css('border-left-color', '#10b981'); // Green for complete range
    } else if (englishRangeState.startDate && !englishRangeState.endDate) {
        $rangeText.text(`🔄 Start: ${englishRangeState.startDate.formatted} (Select end date)`);
        $rangeText.css('border-left-color', '#f59e0b'); // Orange for partial range
    } else {
        $rangeText.text('📅 No dates selected (Click to select start date)');
        $rangeText.css('border-left-color', '#3b82f6'); // Blue for no selection
    }
}

function enableEnglishRangeSelection() {
    const $datepicker = $('#english-range-picker');
    $datepicker.englishDatepicker('enableRangeSelection');
    updateEnglishRangeDisplay();
    console.log('English range selection enabled');
}

function disableEnglishRangeSelection() {
    const $datepicker = $('#english-range-picker');
    $datepicker.englishDatepicker('disableRangeSelection');
    englishRangeState.startDate = null;
    englishRangeState.endDate = null;
    englishRangeState.isSelectingStart = true;
    englishRangeState.isRangeComplete = false;
    updateEnglishRangeDisplay();
    console.log('English range selection disabled');
}

function clearEnglishRange() {
    const $datepicker = $('#english-range-picker');
    $datepicker.englishDatepicker('clear');
    $datepicker.englishDatepicker('disableRangeSelection');
    englishRangeState.startDate = null;
    englishRangeState.endDate = null;
    englishRangeState.isSelectingStart = true;
    englishRangeState.isRangeComplete = false;
    updateEnglishRangeDisplay();
    console.log('English range cleared');
}

function showEnglishRangeInfo() {
    const $datepicker = $('#english-range-picker');
    const range = $datepicker.englishDatepicker('getRangeSelection');
    
    if (!range.startDate && !range.endDate) {
        Swal.fire({
            icon: 'warning',
            title: 'No Range Selected',
            text: 'Please select a date range first.',
            confirmButtonColor: '#f59e0b'
        });
        return;
    }

    let rangeInfo = '';
    if (range.startDate) {
        rangeInfo += `Start Date: ${formatEnglishDate(range.startDate)}<br>`;
    }
    if (range.endDate) {
        rangeInfo += `End Date: ${formatEnglishDate(range.endDate)}<br>`;
    }

    Swal.fire({
        title: '📅 English Date Range Information',
        html: `
            <div style="text-align: left; font-family: 'Inter', sans-serif;">
                <div style="background: #f8fafc; padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #3182ce;">
                    <h3 style="margin: 0 0 15px 0; color: #2d3748; font-size: 18px; font-weight: 600;">
                        🇺🇸 English Date Range
                    </h3>
                    <p style="margin: 0; color: #4a5568; font-size: 16px;">
                        ${rangeInfo}
                    </p>
                </div>
                
                <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
                    <p style="margin: 0; color: #92400e; font-size: 14px; font-weight: 500;">
                        📊 Range Status: ${range.isActive ? 'Active' : 'Inactive'}
                    </p>
                </div>
            </div>
        `,
        width: '500px',
        padding: '30px',
        background: '#ffffff',
        showConfirmButton: true,
        confirmButtonText: '✨ Great!',
        confirmButtonColor: '#3182ce',
        showCloseButton: true,
        closeButtonHtml: '<i class="fas fa-times"></i>'
    });
}

function formatEnglishDate(dateObj) {
    if (!dateObj) return '';
    return dateObj.year + '-' + String(dateObj.month).padStart(2, '0') + '-' + String(dateObj.day).padStart(2, '0');
}

// Export functions for global access
window.openModal = openModal;
window.closeModal = closeModal;
window.showDatepickerInfo = showDatepickerInfo;
window.resetAllDatepickers = resetAllDatepickers;
window.loadDemoData = loadDemoData;
window.showUnifiedRangeInfo = showUnifiedRangeInfo;
window.clearUnifiedRange = clearUnifiedRange;
window.completeRange = completeRange;
window.getCurrentEnglishDate = getCurrentEnglishDate;
window.showGetCurrentDateDemo = showGetCurrentDateDemo;
window.enableEnglishRangeSelection = enableEnglishRangeSelection;
window.disableEnglishRangeSelection = disableEnglishRangeSelection;
window.clearEnglishRange = clearEnglishRange;
window.showEnglishRangeInfo = showEnglishRangeInfo;
