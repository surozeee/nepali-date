/**
 * Application JavaScript for Custom Nepali Datepicker Demo
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
        // You can pass an English date to set as default
        // Example: setDefaultDatesForEmptyDatepickers('2024-01-15');
        setDefaultDatesForEmptyDatepickers();
    }, 1500);
    
    // Add keyboard shortcuts
    setupKeyboardShortcuts();
    
    // Add touch support for mobile devices
    setupTouchSupport();
    
    console.log('Custom Nepali Datepicker Demo initialized successfully!');
    console.log('Using jQuery version');
    console.log('Keyboard shortcuts:');
    console.log('- Ctrl/Cmd + D: Open modal');
    console.log('- Ctrl/Cmd + R: Reset all datepickers');
    console.log('- Escape: Close modal or datepicker');
});

// Initialize all datepickers
function initializeDatepickers() {
    // Basic datepicker
    $('#basic-datepicker').nepaliDatepicker({
        theme: 'light',
        language: 'nepali',
        dateFormat: 'YYYY-MM-DD',
        defaultDate: '2024-01-15',
        dateType: 'AD', // Case insensitive - will convert AD date to BS
        showEnglishDateSubscript: false,
        showToday: false,
        onSelect: function(date, formatted) {
            console.log('Basic datepicker selected:', date, formatted);
        }
    });

    // Modern style datepicker with string format date restrictions
    $('#modern-datepicker').nepaliDatepicker({
        theme: 'light',
        language: 'english',
        dateFormat: 'DD-MM-YYYY',
        minDate: '2080-01-01', // Can't select before Baisakh 2080
        maxDate: '2090-12-30', // Can't select after Chaitra 2090
        disabledDates: [
            '2081-01-01', // Disable Baisakh 1, 2081
            '2081-01-02', // Disable Baisakh 2, 2081
            '2081-01-03'  // Disable Baisakh 3, 2081
        ],
        disabledDateRanges: [
            {
                start: '2082-04-01', // Disable Shrawan 1, 2082
                end: '2082-04-10'    // to Shrawan 10, 2082
            }
        ],
        defaultDate: '2081-01-01',
        dateType: 'BS', // Case insensitive - BS date (no conversion needed)
        showToday: true, // Show today button
        onSelect: function(date, formatted) {
            console.log('Modern datepicker selected:', date, formatted);
        }
    });

    // Simple date range picker - no complex constraints
    $('#startDate').nepaliDatepicker({
        theme: 'light',
        language: 'nepali',
        dateFormat: 'YYYY-MM-DD',
        autoClose: true
    });

    $('#endDate').nepaliDatepicker({
        theme: 'light',
        language: 'nepali',
        dateFormat: 'YYYY-MM-DD',
        autoClose: true
    });


    // Minimal style datepicker with default date
    $('#minimal-datepicker').nepaliDatepicker({
        theme: 'light',
        language: 'nepali',
        dateFormat: 'MM/DD/YYYY',
        defaultDate: '2081-01-01', // Set default date to Baisakh 1, 2081
        showToday: false,
        showClear: false,
        onSelect: function(date, formatted) {
            console.log('Minimal datepicker selected:', date, formatted);
        }
    });

    // Dark theme datepicker with string format disabled dates
    $('#dark-datepicker').nepaliDatepicker({
        theme: 'dark',
        language: 'nepali',
        dateFormat: 'YYYY-MM-DD',
        disabledDates: [
            '2081-06-15', // Disable Kartik 15, 2081
            '2081-06-16', // Disable Kartik 16, 2081
            '2081-06-17'  // Disable Kartik 17, 2081
        ],
        showToday: false, // Hide today button
        onSelect: function(date, formatted) {
            console.log('Dark datepicker selected:', date, formatted);
        }
    });

    // Range datepicker
    $('#range-datepicker').nepaliDatepicker({
        theme: 'blue',
        language: 'nepali',
        dateFormat: 'DD-MM-YYYY',
        onSelect: function(date, formatted) {
            console.log('Range datepicker selected:', date, formatted);
            displayDateConversion(date, formatted);
        }
    });

    // Time picker datepicker
    $('#time-datepicker').nepaliDatepicker({
        theme: 'green',
        language: 'english',
        dateFormat: 'YYYY-MM-DD',
        onSelect: function(date, formatted) {
            console.log('Time datepicker selected:', date, formatted);
            displayDateConversion(date, formatted);
        }
    });

    // Read-only datepicker
    $('#readonly-datepicker').nepaliDatepicker({
        theme: 'light',
        language: 'nepali',
        dateFormat: 'YYYY-MM-DD',
        onSelect: function(date, formatted) {
            console.log('Readonly datepicker selected:', date, formatted);
            displayDateConversion(date, formatted);
        }
    });

    // Disabled dates datepicker
    $('#disabled-datepicker').nepaliDatepicker({
        theme: 'light',
        language: 'nepali',
        dateFormat: 'DD-MM-YYYY',
        onSelect: function(date, formatted) {
            console.log('Disabled dates datepicker selected:', date, formatted);
            displayDateConversion(date, formatted);
        }
    });

    // Red theme datepicker
    $('#red-datepicker').nepaliDatepicker({
        theme: 'red',
        language: 'nepali',
        dateFormat: 'YYYY-MM-DD',
        defaultDate: new Date(),
        dateType: 'ad', // Case insensitive - AD date will be converted to BS
        showToday: true,
        onSelect: function(date, formatted) {
            console.log('Red datepicker selected:', date, formatted);
        }
    });

    // Purple theme datepicker
    $('#purple-datepicker').nepaliDatepicker({
        theme: 'purple',
        language: 'nepali',
        dateFormat: 'YYYY-MM-DD',
        defaultDate: '2081-01-01',
        showToday: true,
        onSelect: function(date, formatted) {
            console.log('Purple datepicker selected:', date, formatted);
        }
    });

    // Orange theme datepicker
    $('#orange-datepicker').nepaliDatepicker({
        theme: 'orange',
        language: 'nepali',
        dateFormat: 'YYYY-MM-DD',
        defaultDate: '2081-01-01',
        showToday: true,
        onSelect: function(date, formatted) {
            console.log('Orange datepicker selected:', date, formatted);
            displayDateConversion(date, formatted);
        }
    });

    // Green theme datepicker (additional example)
    $('#green-datepicker').nepaliDatepicker({
        theme: 'green',
        language: 'nepali',
        dateFormat: 'YYYY-MM-DD',
        defaultDate: '2081-01-01',
        showToday: true,
        onSelect: function(date, formatted) {
            console.log('Green datepicker selected:', date, formatted);
            displayDateConversion(date, formatted);
        }
    });

    // Initialize range picker
    initializeRangePicker();
    
    // Initialize unified range picker
    initializeUnifiedRangePicker();
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
    // Get all datepicker inputs and update their options
    $('[id$="-datepicker"]').each(function() {
        const $input = $(this);
        const currentOptions = $input.data('nepaliDatepicker') || {};
        const newOptions = $.extend({}, currentOptions, options);
        
        // Destroy and recreate with new options
        $input.nepaliDatepicker('destroy');
        $input.nepaliDatepicker(newOptions);
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
        
        // Close any open datepicker
        const $modalDatepicker = $('#modal-datepicker');
        if ($modalDatepicker.length) {
            const datepicker = $modalDatepicker.data('nepaliDatepicker');
            if (datepicker && typeof datepicker.hide === 'function') {
                console.log('Closing datepicker...');
                datepicker.hide();
            }
        }
    } else {
        console.log('ERROR: datepicker-modal not found for closing');
    }
}

// Setup modal event listeners
function setupModal() {
    $('.close').on('click', closeModal);
    
    // Close modal when clicking outside
    $('#datepicker-modal').on('click', function(event) {
        if (event.target === this) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    $(document).on('keydown', function(event) {
        if (event.key === 'Escape') {
            // Check if datepicker is open first
            const $modalDatepicker = $('#modal-datepicker');
            if ($modalDatepicker.length) {
                const datepicker = $modalDatepicker.data('nepaliDatepicker');
                if (datepicker && typeof datepicker.isOpen === 'function' && datepicker.isOpen() && typeof datepicker.hide === 'function') {
                    datepicker.hide();
                    return;
                }
            }
            closeModal();
        }
    });
}

// Utility functions
function getCurrentNepaliDate() {
    // Use JavaScript's new Date() to get today's date
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // JavaScript months are 0-based
    const day = today.getDate();
    
    // Convert English date to Nepali date using the datepicker's conversion function
    try {
        // Check if conversion function is available
        if (typeof nepaliFunction === 'undefined' || typeof nepaliFunction.ad2bs !== 'function') {
            console.warn('nepaliFunction.ad2bs function is not available yet');
            return { year: 2081, month: 1, day: 1 };
        }
        
        // Format date as YYYY-MM-DD string
        const dateString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        const nepaliDate = nepaliFunction.ad2bs(today);
        return nepaliDate;
    } catch (error) {
        console.error('Error converting English date to Nepali:', error);
        // Fallback to a default date if conversion fails
        return { year: 2081, month: 1, day: 1 };
    }
}

// Enhanced getCurrentDate function with support for new Date() and dateType (AD/BS) with case-insensitive support
function getCurrentDate(dateType = 'AD') {
    // Normalize dateType to uppercase for case-insensitive comparison
    const normalizedDateType = dateType.toString().toUpperCase();
    
    // Get current date using new Date()
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // JavaScript months are 0-based
    const day = today.getDate();
    
    // Return based on dateType
    if (normalizedDateType === 'BS' || normalizedDateType === 'NEPALI') {
        // Convert English date to Nepali date
        try {
            // Check if conversion function is available
            if (typeof nepaliFunction === 'undefined' || typeof nepaliFunction.ad2bs !== 'function') {
                console.warn('nepaliFunction.ad2bs function is not available yet');
                return { year: 2081, month: 1, day: 1 };
            }
            
            // Format date as YYYY-MM-DD string
            const dateString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            const nepaliDate = nepaliFunction.ad2bs(dateString);
            return nepaliDate;
        } catch (error) {
            console.error('Error converting English date to Nepali:', error);
            // Fallback to a default Nepali date if conversion fails
            return { year: 2081, month: 1, day: 1 };
        }
    } else if (normalizedDateType === 'AD' || normalizedDateType === 'ENGLISH' || normalizedDateType === 'EN') {
        // Return English date
        return { year: year, month: month, day: day };
    } else {
        // Default to English date for unknown dateType
        console.warn(`Unknown dateType: ${dateType}. Defaulting to AD.`);
        return { year: year, month: month, day: day };
    }
}

function formatNepaliDate(date) {
    if (!date) return '';
    
    const year = date.year;
    const month = date.month.toString().padStart(2, '0');
    const day = date.day.toString().padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}

// Convert Nepali date to English date and display
function displayDateConversion(nepaliDate, formattedNepaliDate) {
    if (!nepaliDate) return;
    
    try {
        // Check if conversion function is available
        if (typeof nepaliFunction === 'undefined' || typeof nepaliFunction.bs2ad !== 'function') {
            console.warn('nepaliFunction.bs2ad function is not available yet');
            return;
        }
        
        // Convert Nepali date to English date using the datepicker's conversion function
        const englishDate = nepaliFunction.bs2ad(nepaliDate, 'string');
        
        // Parse the English date string to get individual components
        const [year, month, day] = englishDate.split('-');
        const englishDateObj = new Date(year, month - 1, day);
        
        // Format the English date in a readable format
        const englishFormatted = englishDateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        });
        
        console.log('Date Conversion:');
        console.log('Nepali Date:', formattedNepaliDate);
        console.log('English Date:', englishFormatted);
        console.log('ISO Format:', englishDate);
        
    } catch (error) {
        console.error('Error converting date:', error);
    }
}

// Demo functions
function showGetCurrentDateDemo() {
    // Demonstrate getCurrentDate function with different dateType options
    const currentAD = getCurrentDate('AD');
    const currentBS = getCurrentDate('BS');
    const currentEnglish = getCurrentDate('english');
    const currentNepali = getCurrentDate('nepali');
    
    console.log('getCurrentDate Demo:');
    console.log('AD:', currentAD);
    console.log('BS:', currentBS);
    console.log('english:', currentEnglish);
    console.log('nepali:', currentNepali);
    
    // Show in SweetAlert
    Swal.fire({
        title: '📅 getCurrentDate Demo',
        html: `
            <div style="text-align: left; font-family: 'Inter', sans-serif;">
                <div style="background: #f8fafc; padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #3182ce;">
                    <h3 style="margin: 0 0 15px 0; color: #2d3748; font-size: 18px; font-weight: 600;">
                        🇺🇸 English Date (AD)
                    </h3>
                    <p style="margin: 0; color: #4a5568; font-size: 16px; font-family: 'Courier New', monospace;">
                        ${currentAD.year}-${currentAD.month.toString().padStart(2, '0')}-${currentAD.day.toString().padStart(2, '0')}
                    </p>
                </div>
                
                <div style="background: #f0f9ff; padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #0ea5e9;">
                    <h3 style="margin: 0 0 15px 0; color: #2d3748; font-size: 18px; font-weight: 600;">
                        🇳🇵 Nepali Date (BS)
                    </h3>
                    <p style="margin: 0; color: #4a5568; font-size: 16px; font-family: 'Courier New', monospace;">
                        ${currentBS.year}-${currentBS.month.toString().padStart(2, '0')}-${currentBS.day.toString().padStart(2, '0')}
                    </p>
                </div>
                
                <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
                    <p style="margin: 0; color: #92400e; font-size: 14px; font-weight: 500;">
                        📊 Case-insensitive support: 'ad', 'AD', 'bs', 'BS', 'english', 'nepali' all work!
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
        const datepicker = $input.data('nepaliDatepicker');
        if (datepicker) {
            const selectedDate = datepicker.getDate();
            const formattedDate = selectedDate ? formatNepaliDate(selectedDate) : 'No date selected';
            
            if (!selectedDate) {
                // Show error if no date is selected
                Swal.fire({
                    icon: 'warning',
                    title: 'No Date Selected',
                    text: 'Please select a date first to see the conversion.',
                    confirmButtonColor: '#f59e0b'
                });
                return;
            }
            
            try {
                // Convert Nepali date to English date
                const englishDate = nepaliFunction.bs2ad(selectedDate, 'string');
                
                // Parse the English date string to get individual components
                const [year, month, day] = englishDate.split('-');
                const englishDateObj = new Date(year, month - 1, day);
                
                // Format the English date in a readable format
                const englishFormatted = englishDateObj.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    weekday: 'long'
                });
                
                // Show SweetAlert popup with date conversion
                Swal.fire({
                    title: '📅 Date Conversion',
                    html: `
                        <div style="text-align: left; font-family: 'Inter', sans-serif;">
                            <div style="background: #f8fafc; padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #3182ce;">
                                <h3 style="margin: 0 0 15px 0; color: #2d3748; font-size: 18px; font-weight: 600;">
                                    🇳🇵 Nepali Date
                                </h3>
                                <p style="margin: 0; color: #4a5568; font-size: 16px; font-family: 'Courier New', monospace;">
                                    ${formattedDate}
                                </p>
                            </div>
                            
                            <div style="background: #f0f9ff; padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #0ea5e9;">
                                <h3 style="margin: 0 0 15px 0; color: #2d3748; font-size: 18px; font-weight: 600;">
                                    🇺🇸 English Date
                                </h3>
                                <p style="margin: 0; color: #4a5568; font-size: 16px;">
                                    ${englishFormatted}
                                </p>
                            </div>
                            
                            <div style="background: #f0fdf4; padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #22c55e;">
                                <h3 style="margin: 0 0 15px 0; color: #2d3748; font-size: 18px; font-weight: 600;">
                                    📊 ISO Format
                                </h3>
                                <p style="margin: 0; color: #4a5568; font-size: 16px; font-family: 'Courier New', monospace;">
                                    ${englishDate}
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
                    backdrop: `
                        rgba(0,0,0,0.4)
                        left top
                        no-repeat
                    `,
                    showConfirmButton: true,
                    confirmButtonText: '✨ Great!',
                    confirmButtonColor: '#3182ce',
                    confirmButtonAriaLabel: 'Great',
                    buttonsStyling: true,
                    customClass: {
                        popup: 'swal2-popup-custom',
                        title: 'swal2-title-custom',
                        confirmButton: 'swal2-confirm-custom'
                    },
                    showCloseButton: true,
                    closeButtonHtml: '<i class="fas fa-times"></i>',
                    timer: 10000,
                    timerProgressBar: true,
                    didOpen: function() {
                        // Add some animation
                        const popup = Swal.getPopup();
                        popup.style.transform = 'scale(0.8)';
                        popup.style.transition = 'transform 0.3s ease';
                        setTimeout(function() {
                            popup.style.transform = 'scale(1)';
                        }, 100);
                    }
                });
                
            } catch (error) {
                console.error('Error converting date:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Conversion Error',
                    text: 'There was an error converting the date. Please try again.',
                    confirmButtonColor: '#e53e3e'
                });
            }
        }
    }
}

// Additional utility functions
function resetAllDatepickers() {
    $('[id$="-datepicker"]').each(function() {
        const datepicker = $(this).data('nepaliDatepicker');
        if (datepicker && typeof datepicker.clear === 'function') {
            datepicker.clear();
        }
    });
    
    // Set today's date for all empty datepickers after reset
    setTimeout(function() {
        setDefaultDatesForEmptyDatepickers();
    }, 100);
    
    console.log('All datepickers reset and default dates set');
}

// Set default date for empty datepickers
function setDefaultDatesForEmptyDatepickers(englishDate = null) {
    let nepaliDate;
    
    if (englishDate) {
        // Convert provided English date to Nepali date
        try {
            nepaliDate = nepaliFunction.ad2bs(englishDate);
            console.log('Using provided English date:', englishDate, 'converted to Nepali:', nepaliDate);
        } catch (error) {
            console.error('Error converting provided English date to Nepali:', error);
            nepaliDate = getCurrentNepaliDate(); // Fallback to today's date
        }
    } else {
        // Use today's date if no English date provided
        nepaliDate = getCurrentNepaliDate();
    }
    
    // List of datepicker IDs that should get the default date if empty
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
            const datepicker = $input.data('nepaliDatepicker');
            if (datepicker) {
                const currentDate = datepicker.getDate();
                // Only set default date if no date is currently selected
                if (!currentDate) {
                    datepicker.setDate(nepaliDate);
                    console.log(`Set default date for ${id}:`, nepaliDate);
                }
            }
        }
    });
}

// Enhanced demo data loading
function loadDemoData() {
    // Set some example dates
    const exampleDate = { year: 2080, month: 6, day: 15 };
    
    // Set date for readonly datepicker
    const readonlyDatepicker = $('#readonly-datepicker').data('nepaliDatepicker');
    if (readonlyDatepicker) {
        readonlyDatepicker.setDate(exampleDate);
    }
    
    // Set today's date for basic datepicker
    const basicDatepicker = $('#basic-datepicker').data('nepaliDatepicker');
    if (basicDatepicker) {
        const today = getCurrentNepaliDate();
        basicDatepicker.setDate(today);
    }
    
    // Set default dates for empty datepickers
    setDefaultDatesForEmptyDatepickers();
    
    console.log('Demo data loaded');
}

// Setup keyboard shortcuts
function setupKeyboardShortcuts() {
    $(document).on('keydown', function(event) {
        // Ctrl/Cmd + D to open modal
        if ((event.ctrlKey || event.metaKey) && event.key === 'd') {
            event.preventDefault();
            openModal();
        }
        
        // Ctrl/Cmd + R to reset all datepickers
        if ((event.ctrlKey || event.metaKey) && event.key === 'r') {
            event.preventDefault();
            resetAllDatepickers();
        }
    });
}

// Add touch support for mobile devices
function setupTouchSupport() {
    $(document).on('touchstart', '.day, .nav-btn', function() {
        $(this).css('transform', 'scale(0.95)');
    });
    
    $(document).on('touchend', '.day, .nav-btn', function() {
        const $this = $(this);
        setTimeout(function() {
            $this.css('transform', '');
        }, 150);
    });
}


// Helper function to set a specific English date as default
function setEnglishDateAsDefault(englishDate) {
    console.log('Setting English date as default:', englishDate);
    setDefaultDatesForEmptyDatepickers(englishDate);
}

// Range Picker Functionality
let rangeState = {
    startDate: null,
    endDate: null,
    selectingStart: true
};

function initializeRangePicker() {
    // Initialize start date picker
    $('#range-start-date').nepaliDatepicker({
        theme: 'light',
        language: 'nepali',
        dateFormat: 'YYYY-MM-DD',
        onSelect: function(date, formatted) {
            handleRangeDateSelection(date, formatted, 'start');
        }
    });

    // Initialize end date picker
    $('#range-end-date').nepaliDatepicker({
        theme: 'light',
        language: 'nepali',
        dateFormat: 'YYYY-MM-DD',
        onSelect: function(date, formatted) {
            handleRangeDateSelection(date, formatted, 'end');
        }
    });

    // Add click handlers to switch between start and end date selection
    $('#range-start-date').on('click', function() {
        rangeState.selectingStart = true;
        updateRangeDisplay();
    });

    $('#range-end-date').on('click', function() {
        rangeState.selectingStart = false;
        updateRangeDisplay();
    });
}

function handleRangeDateSelection(date, formatted, type) {
    if (type === 'start') {
        rangeState.startDate = { date: date, formatted: formatted };
        // Set end date minimum to start date
        const $endDate = $('#range-end-date');
        const endDatepicker = $endDate.data('nepaliDatepicker');
        if (endDatepicker) {
            const currentOptions = $endDate.data('nepaliDatepicker-options') || {};
            const newOptions = $.extend({}, currentOptions, { minDate: date });
            $endDate.nepaliDatepicker('destroy');
            $endDate.nepaliDatepicker(newOptions);
        }
    } else {
        rangeState.endDate = { date: date, formatted: formatted };
        // Set start date maximum to end date
        const $startDate = $('#range-start-date');
        const startDatepicker = $startDate.data('nepaliDatepicker');
        if (startDatepicker) {
            const currentOptions = $startDate.data('nepaliDatepicker-options') || {};
            const newOptions = $.extend({}, currentOptions, { maxDate: date });
            $startDate.nepaliDatepicker('destroy');
            $startDate.nepaliDatepicker(newOptions);
        }
    }
    
    updateRangeDisplay();
    console.log('Range selection updated:', rangeState);
}

function updateRangeDisplay() {
    const $rangeText = $('#range-text');
    
    if (rangeState.startDate && rangeState.endDate) {
        const startFormatted = rangeState.startDate.formatted;
        const endFormatted = rangeState.endDate.formatted;
        $rangeText.text(`${startFormatted} to ${endFormatted}`);
        $rangeText.css('border-left-color', '#10b981'); // Green for complete range
    } else if (rangeState.startDate) {
        $rangeText.text(`Start: ${rangeState.startDate.formatted} (Select end date)`);
        $rangeText.css('border-left-color', '#f59e0b'); // Orange for partial range
    } else if (rangeState.endDate) {
        $rangeText.text(`End: ${rangeState.endDate.formatted} (Select start date)`);
        $rangeText.css('border-left-color', '#f59e0b'); // Orange for partial range
    } else {
        $rangeText.text('No dates selected');
        $rangeText.css('border-left-color', '#3b82f6'); // Blue for no selection
    }
}

function showRangeInfo() {
    if (!rangeState.startDate && !rangeState.endDate) {
        Swal.fire({
            icon: 'warning',
            title: 'No Range Selected',
            text: 'Please select a date range first.',
            confirmButtonColor: '#f59e0b'
        });
        return;
    }

    let rangeInfo = '';
    let englishStart = '';
    let englishEnd = '';

    if (rangeState.startDate) {
        try {
            const englishStartDate = nepaliFunction.bs2ad(rangeState.startDate.date, 'string');
            const [year, month, day] = englishStartDate.split('-');
            const startDateObj = new Date(year, month - 1, day);
            englishStart = startDateObj.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long'
            });
        } catch (error) {
            console.error('Error converting start date:', error);
            englishStart = 'Conversion error';
        }
    }

    if (rangeState.endDate) {
        try {
            const englishEndDate = nepaliFunction.bs2ad(rangeState.endDate.date, 'string');
            const [year, month, day] = englishEndDate.split('-');
            const endDateObj = new Date(year, month - 1, day);
            englishEnd = endDateObj.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long'
            });
        } catch (error) {
            console.error('Error converting end date:', error);
            englishEnd = 'Conversion error';
        }
    }

    Swal.fire({
        title: '📅 Date Range Information',
        html: `
            <div style="text-align: left; font-family: 'Inter', sans-serif;">
                <div style="background: #f8fafc; padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #3182ce;">
                    <h3 style="margin: 0 0 15px 0; color: #2d3748; font-size: 18px; font-weight: 600;">
                        🇳🇵 Nepali Date Range
                    </h3>
                    <p style="margin: 0; color: #4a5568; font-size: 16px; font-family: 'Courier New', monospace;">
                        ${rangeState.startDate ? rangeState.startDate.formatted : 'Not selected'} 
                        ${rangeState.startDate && rangeState.endDate ? 'to' : ''} 
                        ${rangeState.endDate ? rangeState.endDate.formatted : ''}
                    </p>
                </div>
                
                <div style="background: #f0f9ff; padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #0ea5e9;">
                    <h3 style="margin: 0 0 15px 0; color: #2d3748; font-size: 18px; font-weight: 600;">
                        🇺🇸 English Date Range
                    </h3>
                    <p style="margin: 0; color: #4a5568; font-size: 16px;">
                        ${englishStart || 'Not selected'} 
                        ${englishStart && englishEnd ? 'to' : ''} 
                        ${englishEnd || ''}
                    </p>
                </div>
                
                <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
                    <p style="margin: 0; color: #92400e; font-size: 14px; font-weight: 500;">
                        📊 Range Status: ${rangeState.startDate && rangeState.endDate ? 'Complete' : 'Partial'}
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

function clearRange() {
    rangeState.startDate = null;
    rangeState.endDate = null;
    rangeState.selectingStart = true;
    
    // Clear the input fields
    $('#range-start-date').val('');
    $('#range-end-date').val('');
    
    // Reset datepickers without constraints
    const $startDate = $('#range-start-date');
    const $endDate = $('#range-end-date');
    
    // Recreate start datepicker
    $startDate.nepaliDatepicker('destroy');
    $startDate.nepaliDatepicker({
        theme: 'light',
        language: 'nepali',
        dateFormat: 'YYYY-MM-DD',
        onSelect: function(date, formatted) {
            handleRangeDateSelection(date, formatted, 'start');
        }
    });
    
    // Recreate end datepicker
    $endDate.nepaliDatepicker('destroy');
    $endDate.nepaliDatepicker({
        theme: 'light',
        language: 'nepali',
        dateFormat: 'YYYY-MM-DD',
        onSelect: function(date, formatted) {
            handleRangeDateSelection(date, formatted, 'end');
        }
    });
    
    updateRangeDisplay();
    console.log('Range cleared');
}

// Unified Range Picker Functionality
let unifiedRangeState = {
    startDate: null,
    endDate: null,
    isSelectingStart: true,
    isRangeComplete: false
};

function initializeUnifiedRangePicker() {
    $('#unified-range-picker').nepaliDatepicker({
        theme: 'light',
        language: 'nepali',
        dateFormat: 'YYYY-MM-DD',
        autoClose: false, // Don't auto-close after first selection
        showToday: false, // Hide the Today button
        onSelect: function(date, formatted) {
            handleUnifiedRangeSelection(date, formatted);
        },
        onOpen: function() {
            console.log('Unified range picker opened');
            updateUnifiedRangeDisplay();
            // Re-highlight any existing range when datepicker opens
            setTimeout(highlightRangeDates, 100);
        },
        onClose: function() {
            console.log('Unified range picker closed');
        }
    });
}

function handleUnifiedRangeSelection(date, formatted) {
    if (unifiedRangeState.isSelectingStart) {
        // Check if clicking the same start date again
        if (unifiedRangeState.startDate && 
            unifiedRangeState.startDate.date.year === date.year &&
            unifiedRangeState.startDate.date.month === date.month &&
            unifiedRangeState.startDate.date.day === date.day) {
            // Reset the range picker
            resetRangePicker();
            return;
        }
        
        // Selecting start date - keep datepicker open
        unifiedRangeState.startDate = { date: date, formatted: formatted };
        unifiedRangeState.isSelectingStart = false;
        unifiedRangeState.isRangeComplete = false;
        
        // Update input to show we're now selecting end date
        $('#unified-range-picker').val(`${formatted} → Select End Date`);
        
        // Highlight the start date
        highlightRangeDates();
        
        // Set minDate constraint to start date to disable dates before startDate
        setMinDateConstraint(date);
        
        // Keep datepicker open by not calling close
        console.log('Start date selected:', date, formatted);
        console.log('Datepicker stays open for end date selection');
        
    } else {
        // Check if clicking the same end date again
        if (unifiedRangeState.endDate && 
            unifiedRangeState.endDate.date.year === date.year &&
            unifiedRangeState.endDate.date.month === date.month &&
            unifiedRangeState.endDate.date.day === date.day) {
            // Reset the range picker
            resetRangePicker();
            return;
        }
        
        // Selecting end date - highlight range and show OK button
        unifiedRangeState.endDate = { date: date, formatted: formatted };
        unifiedRangeState.isSelectingStart = true;
        unifiedRangeState.isRangeComplete = true;
        
        // Update input to show complete range
        const startFormatted = unifiedRangeState.startDate.formatted;
        const endFormatted = unifiedRangeState.endDate.formatted;
        $('#unified-range-picker').val(`${startFormatted} to ${endFormatted}`);
        
        // Highlight the complete range
        highlightRangeDates();
        
        // Show OK button instead of auto-closing
        showRangeOKButton();
        
        console.log('End date selected:', date, formatted);
        console.log('Range complete:', unifiedRangeState);
    }
    
    updateUnifiedRangeDisplay();
}

function updateUnifiedRangeDisplay() {
    const $rangeText = $('#unified-range-text');
    
    if (unifiedRangeState.isRangeComplete && unifiedRangeState.startDate && unifiedRangeState.endDate) {
        const startFormatted = unifiedRangeState.startDate.formatted;
        const endFormatted = unifiedRangeState.endDate.formatted;
        $rangeText.text(`✅ ${startFormatted} to ${endFormatted}`);
        $rangeText.css('border-left-color', '#10b981'); // Green for complete range
    } else if (unifiedRangeState.startDate && !unifiedRangeState.endDate) {
        $rangeText.text(`🔄 Start: ${unifiedRangeState.startDate.formatted} (Datepicker open - click to select end date)`);
        $rangeText.css('border-left-color', '#f59e0b'); // Orange for partial range
    } else {
        $rangeText.text('📅 No dates selected (Click to select start date)');
        $rangeText.css('border-left-color', '#3b82f6'); // Blue for no selection
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

    let englishStart = '';
    let englishEnd = '';

    if (unifiedRangeState.startDate) {
        try {
            const englishStartDate = nepaliFunction.bs2ad(unifiedRangeState.startDate.date, 'string');
            const [year, month, day] = englishStartDate.split('-');
            const startDateObj = new Date(year, month - 1, day);
            englishStart = startDateObj.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long'
            });
        } catch (error) {
            console.error('Error converting start date:', error);
            englishStart = 'Conversion error';
        }
    }

    if (unifiedRangeState.endDate) {
        try {
            const englishEndDate = nepaliFunction.bs2ad(unifiedRangeState.endDate.date, 'string');
            const [year, month, day] = englishEndDate.split('-');
            const endDateObj = new Date(year, month - 1, day);
            englishEnd = endDateObj.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long'
            });
        } catch (error) {
            console.error('Error converting end date:', error);
            englishEnd = 'Conversion error';
        }
    }

    Swal.fire({
        title: '📅 Unified Date Range Information',
        html: `
            <div style="text-align: left; font-family: 'Inter', sans-serif;">
                <div style="background: #f8fafc; padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #3182ce;">
                    <h3 style="margin: 0 0 15px 0; color: #2d3748; font-size: 18px; font-weight: 600;">
                        🇳🇵 Nepali Date Range
                    </h3>
                    <p style="margin: 0; color: #4a5568; font-size: 16px; font-family: 'Courier New', monospace;">
                        ${unifiedRangeState.startDate ? unifiedRangeState.startDate.formatted : 'Not selected'} 
                        ${unifiedRangeState.startDate && unifiedRangeState.endDate ? 'to' : ''} 
                        ${unifiedRangeState.endDate ? unifiedRangeState.endDate.formatted : ''}
                    </p>
                </div>
                
                <div style="background: #f0f9ff; padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #0ea5e9;">
                    <h3 style="margin: 0 0 15px 0; color: #2d3748; font-size: 18px; font-weight: 600;">
                        🇺🇸 English Date Range
                    </h3>
                    <p style="margin: 0; color: #4a5568; font-size: 16px;">
                        ${englishStart || 'Not selected'} 
                        ${englishStart && englishEnd ? 'to' : ''} 
                        ${englishEnd || ''}
                    </p>
                </div>
                
                <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
                    <p style="margin: 0; color: #92400e; font-size: 14px; font-weight: 500;">
                        📊 Range Status: ${unifiedRangeState.isRangeComplete ? 'Complete' : 'Partial'}
                    </p>
                    <p style="margin: 4px 0 0 0; color: #92400e; font-size: 12px;">
                        Next: ${unifiedRangeState.isSelectingStart ? 'Select Start Date' : 'Select End Date'}
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

function highlightRangeDates() {
    // Remove any existing range highlights
    $('.nepali-datepicker .day').removeClass('range-start range-end range-between');
    
    if (unifiedRangeState.startDate) {
        const startDate = unifiedRangeState.startDate.date;
        
        // Find and highlight start date using data-day attribute
        const $startDay = $(`.nepali-datepicker .day[data-day="${startDate.day}"]`).filter(function() {
            // Check if this day belongs to the current month and year
            const $day = $(this);
            const $datepicker = $day.closest('.nepali-datepicker');
            if ($datepicker.length === 0) return false;
            
            // Get current month and year from the datepicker
            const currentMonth = $datepicker.find('.month-year').text();
            // This is a simplified check - we'll use a more robust approach
            return !$day.hasClass('other-month');
        });
        
        if ($startDay.length > 0) {
            $startDay.addClass('range-start');
            console.log('Highlighted start date:', startDate);
        }
        
        if (unifiedRangeState.endDate) {
            const endDate = unifiedRangeState.endDate.date;
            
            // Find and highlight end date
            const $endDay = $(`.nepali-datepicker .day[data-day="${endDate.day}"]`).filter(function() {
                return !$(this).hasClass('other-month');
            });
            
            if ($endDay.length > 0) {
                $endDay.addClass('range-end');
                console.log('Highlighted end date:', endDate);
            }
            
            // Highlight dates between start and end
            highlightDatesBetween(startDate, endDate);
        }
    }
}

function highlightDatesBetween(startDate, endDate) {
    console.log('Highlighting dates between:', startDate, 'and', endDate);
    
    // Work with Nepali dates directly
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
        const $dayElement = $(`.nepali-datepicker .day[data-day="${currentDate.day}"]`).filter(function() {
            return !$(this).hasClass('other-month');
        });
        
        if ($dayElement.length > 0) {
            $dayElement.addClass('range-between');
            console.log('Highlighted date:', currentDate);
        }
        
        // Move to next day
        currentDate.day++;
        // Use a simple approach for month days (this is approximate)
        const monthDays = [31, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30];
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

function setMinDateConstraint(startDate) {
    // Destroy and recreate the datepicker with minDate constraint
    const $input = $('#unified-range-picker');
    const currentValue = $input.val();
    
    // Destroy the current datepicker
    $input.nepaliDatepicker('destroy');
    
    // Recreate with minDate constraint to disable dates before startDate
    $input.nepaliDatepicker({
        theme: 'light',
        language: 'nepali',
        dateFormat: 'YYYY-MM-DD',
        autoClose: false,
        showToday: false,
        minDate: startDate, // Set minDate to start date to disable dates before startDate
        onSelect: function(date, formatted) {
            handleUnifiedRangeSelection(date, formatted);
        },
        onOpen: function() {
            console.log('Unified range picker opened');
            updateUnifiedRangeDisplay();
            // Re-highlight any existing range when datepicker opens
            setTimeout(highlightRangeDates, 100);
        },
        onClose: function() {
            console.log('Unified range picker closed');
        }
    });
    
    // Restore the input value
    $input.val(currentValue);
    
    console.log('Set minDate constraint to:', startDate, '- dates before this will be disabled');
}

function showRangeOKButton() {
    // Add OK button to the datepicker footer (like today button)
    const $datepicker = $('.nepali-datepicker');
    if ($datepicker.length > 0) {
        // Remove existing OK button if any
        $datepicker.find('.range-ok-button').remove();
        
        // Check if footer exists, if not create it
        let $footer = $datepicker.find('.datepicker-footer');
        if ($footer.length === 0) {
            $footer = $('<div class="datepicker-footer"></div>');
            $datepicker.append($footer);
        }
        
        // Add OK button to footer
        const okButton = `
            <div class="range-ok-button">
                <button class="btn-ok-range" onclick="confirmRangeSelection()">
                    <i class="fas fa-check"></i> OK
                </button>
            </div>
        `;
        $footer.append(okButton);
    }
}

function confirmRangeSelection() {
    // Close the datepicker
    const datepicker = $('#unified-range-picker').data('nepaliDatepicker');
    if (datepicker && typeof datepicker.hide === 'function') {
        datepicker.hide();
        console.log('Datepicker closed after OK button click');
    }
    
    // Remove OK button
    $('.nepali-datepicker .range-ok-button').remove();
}

function resetRangePicker() {
    // Reset the range state
    unifiedRangeState.startDate = null;
    unifiedRangeState.endDate = null;
    unifiedRangeState.isSelectingStart = true;
    unifiedRangeState.isRangeComplete = false;
    
    // Clear the input field
    $('#unified-range-picker').val('');
    
    // Remove range highlights
    $('.nepali-datepicker .day').removeClass('range-start range-end range-between');
    
    // Re-enable all dates
    $('.nepali-datepicker .day').removeClass('disabled').removeAttr('aria-disabled').css({
        'opacity': '',
        'cursor': '',
        'background-color': '',
        'color': ''
    });
    
    // Remove OK button if exists
    $('.nepali-datepicker .range-ok-button').remove();
    
    // Reset minDate constraint by recreating the datepicker without constraints
    resetDatepickerConstraints();
    
    updateUnifiedRangeDisplay();
    console.log('Range picker reset - click same date to reset');
}

function resetDatepickerConstraints() {
    // Destroy and recreate the datepicker without any constraints
    const $input = $('#unified-range-picker');
    const currentValue = $input.val();
    
    // Destroy the current datepicker
    $input.nepaliDatepicker('destroy');
    
    // Recreate with original settings (no minDate/maxDate constraints)
    $input.nepaliDatepicker({
        theme: 'light',
        language: 'nepali',
        dateFormat: 'YYYY-MM-DD',
        autoClose: false,
        showToday: false,
        minDate: null, // Explicitly set minDate to null
        maxDate: null, // Explicitly set maxDate to null
        onSelect: function(date, formatted) {
            handleUnifiedRangeSelection(date, formatted);
        },
        onOpen: function() {
            console.log('Unified range picker opened');
            updateUnifiedRangeDisplay();
            // Re-highlight any existing range when datepicker opens
            setTimeout(highlightRangeDates, 100);
        },
        onClose: function() {
            console.log('Unified range picker closed');
        }
    });
    
    // Restore the input value
    $input.val(currentValue);
    
    console.log('Datepicker constraints reset - minDate and maxDate removed');
}

function clearUnifiedRange() {
    unifiedRangeState.startDate = null;
    unifiedRangeState.endDate = null;
    unifiedRangeState.isSelectingStart = true;
    unifiedRangeState.isRangeComplete = false;
    
    // Clear the input field
    $('#unified-range-picker').val('');
    
    // Remove range highlights
    $('.nepali-datepicker .day').removeClass('range-start range-end range-between');
    
    // Re-enable all dates
    $('.nepali-datepicker .day').removeClass('disabled').removeAttr('aria-disabled').css({
        'opacity': '',
        'cursor': '',
        'background-color': '',
        'color': ''
    });
    
    // Remove OK button if exists
    $('.nepali-datepicker .range-ok-button').remove();
    
    // Reset datepicker constraints
    resetDatepickerConstraints();
    
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

// Export functions for global access
window.openModal = openModal;
window.closeModal = closeModal;
window.showDatepickerInfo = showDatepickerInfo;
window.resetAllDatepickers = resetAllDatepickers;
window.loadDemoData = loadDemoData;
window.setEnglishDateAsDefault = setEnglishDateAsDefault;
window.showRangeInfo = showRangeInfo;
window.clearRange = clearRange;
window.showUnifiedRangeInfo = showUnifiedRangeInfo;
window.clearUnifiedRange = clearUnifiedRange;
window.completeRange = completeRange;
window.confirmRangeSelection = confirmRangeSelection;
window.getCurrentDate = getCurrentDate;
window.getCurrentNepaliDate = getCurrentNepaliDate;
window.showGetCurrentDateDemo = showGetCurrentDateDemo;