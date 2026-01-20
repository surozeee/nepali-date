/**
 * Application JavaScript for Custom English Datepicker Demo
 * Completely jQuery-based
 */

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
    
    // Initialize advanced date range pickers
    initializeAdvancedRangePickers();
    
    // Initialize modal datepickers
    initializeModalDatepickers();
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
            
            if (!selectedDate) {
                Swal.fire({
                    icon: 'warning',
                    title: 'No Date Selected',
                    text: 'Please select a date first to see the information.',
                    confirmButtonColor: '#f59e0b'
                });
                return;
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

// Advanced date range picker functionality
function initializeAdvancedRangePickers() {
    // Create advanced range picker for dedicated inputs
    if ($('#gijgo-start-date').length && $('#gijgo-end-date').length) {
        var rangePicker = $('#gijgo-start-date, #gijgo-end-date').englishDateRangePicker({
            theme: 'light',
            language: 'english',
            dateFormat: 'YYYY-MM-DD',
            minDate: function() {
                // Set minimum date to today
                var today = new Date();
                return {
                    year: today.getFullYear(),
                    month: today.getMonth() + 1,
                    day: today.getDate()
                };
            },
            maxDate: function() {
                // Set maximum date to 1 year from today
                var maxDate = new Date();
                maxDate.setFullYear(maxDate.getFullYear() + 1);
                return {
                    year: maxDate.getFullYear(),
                    month: maxDate.getMonth() + 1,
                    day: maxDate.getDate()
                };
            },
            onStartSelect: function(date, formatted) {
                console.log('Advanced range start date selected:', date, formatted);
                updateAdvancedRangeDisplay();
            },
            onEndSelect: function(date, formatted) {
                console.log('Advanced range end date selected:', date, formatted);
                updateAdvancedRangeDisplay();
            },
            onRangeSelect: function(startDate, startFormatted, endDate, endFormatted) {
                console.log('Advanced range selected:', startFormatted, 'to', endFormatted);
                updateAdvancedRangeDisplay();
            },
            onValidationError: function(message) {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Date Range',
                    text: message,
                    confirmButtonColor: '#ef4444'
                });
            }
        });
        
        // Store reference for later use
        window.advancedRangePicker = rangePicker;
    }
}

function updateAdvancedRangeDisplay() {
    if (window.advancedRangePicker) {
        var range = window.advancedRangePicker.getRange();
        var displayText = '';
        
        if (range.start && range.end) {
            displayText = `✅ ${range.startFormatted} to ${range.endFormatted}`;
        } else if (range.start) {
            displayText = `🔄 Start: ${range.startFormatted} (Select end date)`;
        } else if (range.end) {
            displayText = `🔄 End: ${range.endFormatted} (Select start date)`;
        } else {
            displayText = '📅 No dates selected';
        }
        
        // Update display if element exists
        var $display = $('#gijgo-range-display');
        if ($display.length) {
            $display.text(displayText);
        }
        
        console.log('Advanced range display updated:', displayText);
    }
}

// Advanced range picker demo functions
function showGijgoRangeInfo() {
    if (!window.advancedRangePicker) {
        Swal.fire({
            icon: 'warning',
            title: 'No Range Picker',
            text: 'Advanced range picker not initialized.',
            confirmButtonColor: '#f59e0b'
        });
        return;
    }
    
    var range = window.advancedRangePicker.getRange();
    
    if (!range.start && !range.end) {
        Swal.fire({
            icon: 'warning',
            title: 'No Range Selected',
            text: 'Please select a date range first.',
            confirmButtonColor: '#f59e0b'
        });
        return;
    }
    
    Swal.fire({
        title: '📅 Advanced Date Range Information',
        html: `
            <div style="text-align: left; font-family: 'Inter', sans-serif;">
                <div style="background: #f8fafc; padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #3182ce;">
                    <h3 style="margin: 0 0 15px 0; color: #2d3748; font-size: 18px; font-weight: 600;">
                        🇺🇸 English Date Range (Advanced)
                    </h3>
                    <p style="margin: 0; color: #4a5568; font-size: 16px; font-family: 'Courier New', monospace;">
                        ${range.start ? range.startFormatted : 'Not selected'} 
                        ${range.start && range.end ? 'to' : ''} 
                        ${range.end ? range.endFormatted : ''}
                    </p>
                </div>
                
                <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
                    <p style="margin: 0; color: #92400e; font-size: 14px; font-weight: 500;">
                        📊 Range Status: ${range.start && range.end ? 'Complete' : 'Partial'}
                    </p>
                    <p style="margin: 4px 0 0 0; color: #92400e; font-size: 12px;">
                        🔗 Advanced range picker with automatic minDate/maxDate constraints
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

function clearGijgoRange() {
    if (window.advancedRangePicker) {
        window.advancedRangePicker.clear();
        updateAdvancedRangeDisplay();
        console.log('Advanced range cleared');
    }
}

function setGijgoRange(startDate, endDate) {
    if (window.advancedRangePicker) {
        window.advancedRangePicker.setRange(startDate, endDate);
        updateAdvancedRangeDisplay();
        console.log('Advanced range set:', startDate, 'to', endDate);
    }
}

// Initialize modal datepickers
function initializeModalDatepickers() {
    // Initialize start date input in modal
    $('#startDate').englishDatepicker({
        theme: 'light',
        language: 'english',
        dateFormat: 'YYYY-MM-DD',
        modal: true,
        placeholder: 'Select Start Date',
        onSelect: function(date, formatted) {
            console.log('Modal start date selected:', date, formatted);
            updateModalRangeDisplay();
        }
    });
    
    // Initialize end date input in modal
    $('#endDate').englishDatepicker({
        theme: 'light',
        language: 'english',
        dateFormat: 'YYYY-MM-DD',
        modal: true,
        placeholder: 'Select End Date',
        onSelect: function(date, formatted) {
            console.log('Modal end date selected:', date, formatted);
            updateModalRangeDisplay();
        }
    });
    
    console.log('Modal datepickers initialized');
}

function updateModalRangeDisplay() {
    var startDate = $('#startDate').val();
    var endDate = $('#endDate').val();
    
    console.log('Modal range updated:', startDate, 'to', endDate);
    
    // You can add additional logic here to update any display elements
    // or trigger other actions when dates are selected in the modal
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
window.showGijgoRangeInfo = showGijgoRangeInfo;
window.clearGijgoRange = clearGijgoRange;
window.setGijgoRange = setGijgoRange;
