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
    
    // Performance monitoring
    setupPerformanceMonitoring();
    
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

    // Modal datepicker with English date display
    $('#startDate').nepaliDatepicker({
        theme: 'light',
        language: 'nepali',
        dateFormat: 'YYYY-MM-DD',
        modal: false, // Don't use datepicker's modal since we have our own modal container
        autoClose: true, // Close the datepicker when date is selected
        onSelect: function(date, formatted) {
            console.log('Modal datepicker selected:', date, formatted);
            $('#modal-result').text('Selected: ' + formatted);
            $('#modal-trigger-input').val(formatted);
            displayDateConversion(date, formatted);
            // Datepicker will close automatically, but modal stays open
        },
        onOpen: function() {
            console.log('Modal datepicker opened');
        },
        onClose: function() {
            console.log('Modal datepicker closed');
        }
    });

    $('#endDate').nepaliDatepicker({
        theme: 'light',
        language: 'nepali',
        dateFormat: 'YYYY-MM-DD',
        modal: false, // Don't use datepicker's modal since we have our own modal container
        autoClose: true, // Close the datepicker when date is selected
        onSelect: function(date, formatted) {
            console.log('Modal datepicker selected:', date, formatted);
            $('#modal-result').text('Selected: ' + formatted);
            $('#modal-trigger-input').val(formatted);
            // Datepicker will close automatically, but modal stays open
        },
        onOpen: function() {
            console.log('Modal datepicker opened');
        },
        onClose: function() {
            console.log('Modal datepicker closed');
        }
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
        const nepaliDate = window.ad2bs({ year: year, month: month, day: day });
        return nepaliDate;
    } catch (error) {
        console.error('Error converting English date to Nepali:', error);
        // Fallback to a default date if conversion fails
        return { year: 2081, month: 1, day: 1 };
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
        // Convert Nepali date to English date using the datepicker's conversion function
        const englishDate = window.bs2ad(nepaliDate, 'string');
        
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
                const englishDate = window.bs2ad(selectedDate, 'string');
                
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
            nepaliDate = window.ad2bs(englishDate);
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

// Performance monitoring
function setupPerformanceMonitoring() {
    $(window).on('load', function() {
        if (window.performance && window.performance.timing) {
            const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
            console.log(`Page loaded in ${loadTime}ms`);
        }
    });
}

// Helper function to set a specific English date as default
function setEnglishDateAsDefault(englishDate) {
    console.log('Setting English date as default:', englishDate);
    setDefaultDatesForEmptyDatepickers(englishDate);
}

// Export functions for global access
window.openModal = openModal;
window.closeModal = closeModal;
window.showDatepickerInfo = showDatepickerInfo;
window.resetAllDatepickers = resetAllDatepickers;
window.loadDemoData = loadDemoData;
window.setEnglishDateAsDefault = setEnglishDateAsDefault;