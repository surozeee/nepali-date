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
        onSelect: function(date, formatted) {
            console.log('Basic datepicker selected:', date, formatted);
        }
    });

    // Modern style datepicker
    $('#modern-datepicker').nepaliDatepicker({
        theme: 'light',
        language: 'english',
        dateFormat: 'DD-MM-YYYY',
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

    // Minimal style datepicker
    $('#minimal-datepicker').nepaliDatepicker({
        theme: 'light',
        language: 'nepali',
        dateFormat: 'MM/DD/YYYY',
        showToday: false,
        showClear: false,
        onSelect: function(date, formatted) {
            console.log('Minimal datepicker selected:', date, formatted);
        }
    });

    // Dark theme datepicker
    $('#dark-datepicker').nepaliDatepicker({
        theme: 'dark',
        language: 'nepali',
        dateFormat: 'YYYY-MM-DD',
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
        }
    });

    // Time picker datepicker
    $('#time-datepicker').nepaliDatepicker({
        theme: 'green',
        language: 'english',
        dateFormat: 'YYYY-MM-DD',
        onSelect: function(date, formatted) {
            console.log('Time datepicker selected:', date, formatted);
        }
    });

    // Read-only datepicker
    $('#readonly-datepicker').nepaliDatepicker({
        theme: 'light',
        language: 'nepali',
        dateFormat: 'YYYY-MM-DD',
        onSelect: function(date, formatted) {
            console.log('Readonly datepicker selected:', date, formatted);
        }
    });

    // Disabled dates datepicker
    $('#disabled-datepicker').nepaliDatepicker({
        theme: 'light',
        language: 'nepali',
        dateFormat: 'DD-MM-YYYY',
        onSelect: function(date, formatted) {
            console.log('Disabled dates datepicker selected:', date, formatted);
        }
    });

}

// Setup configuration panel
function setupConfigurationPanel() {
    const themeSelector = document.getElementById('theme-selector');
    const languageSelector = document.getElementById('language-selector');
    const formatSelector = document.getElementById('format-selector');

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
console.log('2082 Shrawan days =', GetDaysInMonth(2082, 4)); // 31
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
            const info = {
                instance: instanceName,
                selectedDate: selectedDate,
                formattedDate: selectedDate ? formatNepaliDate(selectedDate) : 'No date selected'
            };
            
            console.log('Datepicker Info:', info);
            alert(`Selected Date: ${info.formattedDate}\nInstance: ${instanceName}`);
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
