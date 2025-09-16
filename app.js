/**
 * Application JavaScript for Custom Nepali Datepicker Demo
 */

// Global variables - now using jQuery

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeDatepickers();
    setupConfigurationPanel();
    setupModal();
});

// Initialize all datepickers
function initializeDatepickers() {
    // Basic datepicker
    $('#basic-datepicker').nepaliDatepicker({
        theme: 'light',
        language: 'nepali',
        dateFormat: 'YYYY-MM-DD',
        defaultDate: '2081-01-01',
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
        defaultDate: '2081-01-01', // Set default date to Baisakh 1, 2081
        showToday: true, // Show today button
        onSelect: function(date, formatted) {
            console.log('Modern datepicker selected:', date, formatted);
        }
    });

    // Modal datepicker with English date display
    $('#modal-datepicker').nepaliDatepicker({
        theme: 'light',
        language: 'nepali',
        dateFormat: 'YYYY-MM-DD',
        modal: false, // Don't use datepicker's modal since we have our own modal container
        autoClose: true,
        onSelect: function(date, formatted) {
            console.log('Modal datepicker selected:', date, formatted);
            $('#modal-result').text('Selected: ' + formatted);
            $('#modal-trigger-input').val(formatted);
            displayDateConversion(date, formatted);
            // Auto-close modal after selection
            setTimeout(() => {
                closeModal();
            }, 500);
        },
        onOpen: function() {
            console.log('Modal datepicker opened');
        },
        onClose: function() {
            console.log('Modal datepicker closed');
        }
    });

    $('#modal-datepicker1').nepaliDatepicker({
        theme: 'light',
        language: 'nepali',
        dateFormat: 'YYYY-MM-DD',
        modal: false, // Don't use datepicker's modal since we have our own modal container
        autoClose: true,
        onSelect: function(date, formatted) {
            console.log('Modal datepicker selected:', date, formatted);
            $('#modal-result').text('Selected: ' + formatted);
            $('#modal-trigger-input').val(formatted);
            // Auto-close modal after selection
            setTimeout(() => {
                closeModal();
            }, 500);
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
        defaultDate: '2081-01-01',
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
    const themeSelector = document.getElementById('theme-selector');
    const languageSelector = document.getElementById('language-selector');
    const formatSelector = document.getElementById('format-selector');
    const englishSubscriptToggle = document.getElementById('english-subscript-toggle');

    if (themeSelector) {
        themeSelector.addEventListener('change', function() {
            const theme = this.value;
            updateAllDatepickers({ theme: theme });
        });
    }

    if (languageSelector) {
        languageSelector.addEventListener('change', function() {
            const language = this.value;
            updateAllDatepickers({ language: language });
        });
    }

    if (formatSelector) {
        formatSelector.addEventListener('change', function() {
            const dateFormat = this.value;
            updateAllDatepickers({ dateFormat: dateFormat });
        });
    }

    if (englishSubscriptToggle) {
        englishSubscriptToggle.addEventListener('change', function() {
            const showEnglishDateSubscript = this.checked;
            updateAllDatepickers({ showEnglishDateSubscript: showEnglishDateSubscript });
        });
    }
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
    const modal = document.getElementById('datepicker-modal');
    if (modal) {
        console.log('Modal found, opening...');
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    } else {
        console.log('ERROR: datepicker-modal not found');
    }
}

function closeModal() {
    console.log('closeModal() called');
    const modal = document.getElementById('datepicker-modal');
    if (modal) {
        console.log('Modal found, closing...');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
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
    const modal = document.getElementById('datepicker-modal');
    const closeBtn = modal?.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
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
    // Create a temporary input to get current date
    const $tempInput = $('<input>');
    $tempInput.nepaliDatepicker();
    const datepicker = $tempInput.data('nepaliDatepicker');
    const currentDate = datepicker.getDate();
    $tempInput.nepaliDatepicker('destroy');
    return currentDate;
}


function formatNepaliDate(date) {
    if (!date) return '';
    
    const year = date.year;
    const month = date.month.toString().padStart(2, '0');
    const day = date.day.toString().padStart(2, '0');
    
    return `${year}-${month}-${day}`;
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
                    didOpen: () => {
                        // Add some animation
                        const popup = Swal.getPopup();
                        popup.style.transform = 'scale(0.8)';
                        popup.style.transition = 'transform 0.3s ease';
                        setTimeout(() => {
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

// Export functions for global access
window.openModal = openModal;
window.closeModal = closeModal;
window.showDatepickerInfo = showDatepickerInfo;
window.resetAllDatepickers = resetAllDatepickers;
window.loadDemoData = loadDemoData;


// Load demo data after initialization
setTimeout(loadDemoData, 1000);

// Additional utility functions
function resetAllDatepickers() {
    $('[id$="-datepicker"]').each(function() {
        const datepicker = $(this).data('nepaliDatepicker');
        if (datepicker && typeof datepicker.clear === 'function') {
            datepicker.clear();
        }
    });
    console.log('All datepickers reset');
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
    
    console.log('Demo data loaded');
}

// Add keyboard shortcuts
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

// Add touch support for mobile devices
function addTouchSupport() {
    document.addEventListener('touchstart', function(event) {
        // Handle touch events for better mobile experience
        const target = event.target;
        if (target.classList.contains('day') || target.classList.contains('nav-btn')) {
            target.style.transform = 'scale(0.95)';
        }
    });
    
    document.addEventListener('touchend', function(event) {
        const target = event.target;
        if (target.classList.contains('day') || target.classList.contains('nav-btn')) {
            setTimeout(() => {
                target.style.transform = '';
            }, 150);
        }
    });
}

// Initialize touch support
addTouchSupport();

// Performance monitoring
function logPerformance() {
    if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    }
}

// Log performance after page load
window.addEventListener('load', logPerformance);

console.log('Custom Nepali Datepicker Demo initialized successfully!');
console.log('Using jQuery version');
console.log('Keyboard shortcuts:');
console.log('- Ctrl/Cmd + D: Open modal');
console.log('- Ctrl/Cmd + R: Reset all datepickers');
console.log('- Escape: Close modal or datepicker');
