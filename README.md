# Nepali Datepicker (jQuery Plugin)

A powerful and feature-rich jQuery plugin for Nepali (Bikram Sambat) date selection with English date conversion support.

## 🌟 Features

- **Dual Calendar Support**: Bikram Sambat (BS) and Anno Domini (AD) date systems
- **Automatic Date Conversion**: Convert between BS and AD dates seamlessly
- **Multiple Themes**: Light, Dark, Blue, Red, Purple, Orange, Green themes
- **Language Support**: Nepali and English language options
- **Flexible Date Formats**: Multiple date format options
- **Date Restrictions**: Min/max dates, disabled dates, and date ranges
- **Modal Support**: Built-in modal functionality
- **Touch Friendly**: Mobile-optimized touch interactions
- **Keyboard Navigation**: Full keyboard support
- **SweetAlert Integration**: Beautiful date conversion popups

## 📦 Installation

### CDN (Recommended)
```html
<!-- jQuery (required) -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<!-- Nepali Datepicker CSS -->
<link rel="stylesheet" href="path/to/styles.css">

<!-- Nepali Datepicker JS -->
<script src="path/to/jquery-nepali-datepicker.js"></script>

<!-- SweetAlert2 (for date conversion popups) -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
```

### Local Installation
1. Download the plugin files
2. Include jQuery library
3. Include the CSS and JS files in your HTML

## 🚀 Quick Start

### Basic Usage
```javascript
$('#datepicker').nepaliDatepicker({
    theme: 'light',
    language: 'nepali',
    dateFormat: 'YYYY-MM-DD'
});
```

### With Default Date (AD)
```javascript
$('#datepicker').nepaliDatepicker({
    defaultDate: '2024-01-15',
    dateType: 'AD', // Converts AD date to BS
    theme: 'light'
});
```

### With Default Date (BS)
```javascript
$('#datepicker').nepaliDatepicker({
    defaultDate: '2081-01-01',
    dateType: 'BS', // Uses BS date as-is
    theme: 'light'
});
```

## ⚙️ Configuration Options

### Core Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `theme` | String | `'light'` | Theme: `'light'`, `'dark'`, `'blue'`, `'red'`, `'purple'`, `'orange'`, `'green'` |
| `language` | String | `'nepali'` | Language: `'nepali'` or `'english'` |
| `dateFormat` | String | `'YYYY-MM-DD'` | Date format: `'YYYY-MM-DD'`, `'DD-MM-YYYY'`, `'MM/DD/YYYY'` |
| `placeholder` | String | `'Select Date'` | Input placeholder text |
| `defaultDate` | String/Object | `null` | Default date to set |
| `dateType` | String | `null` | Date type: `'AD'` or `'BS'` (case insensitive) |

### Display Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `showToday` | Boolean | `true` | Show/hide today button |
| `showEnglishDateSubscript` | Boolean | `true` | Show English date subscripts |
| `autoClose` | Boolean | `true` | Auto-close datepicker on date selection |
| `modal` | Boolean | `false` | Use modal display |
| `readonly` | Boolean | `false` | Make input readonly |

### Date Restrictions

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `minDate` | String/Object | `null` | Minimum selectable date |
| `maxDate` | String/Object | `null` | Maximum selectable date |
| `disabledDates` | Array | `[]` | Array of disabled dates |
| `disabledDateRanges` | Array | `[]` | Array of disabled date ranges |

### Event Handlers

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `onSelect` | Function | `null` | Callback when date is selected |
| `onOpen` | Function | `null` | Callback when datepicker opens |
| `onClose` | Function | `null` | Callback when datepicker closes |

## 🎨 Themes

### Available Themes
- **Light**: Clean white theme
- **Dark**: Dark mode theme
- **Blue**: Blue gradient theme
- **Red**: Red gradient theme
- **Purple**: Purple gradient theme
- **Orange**: Orange gradient theme
- **Green**: Green gradient theme

### Theme Usage
```javascript
$('#datepicker').nepaliDatepicker({
    theme: 'red', // or 'dark', 'blue', 'purple', 'orange', 'green'
    language: 'nepali'
});
```

## 📅 Date Formats

### Supported Formats
- `'YYYY-MM-DD'` - 2081-01-15
- `'DD-MM-YYYY'` - 15-01-2081
- `'MM/DD/YYYY'` - 01/15/2081

### Format Usage
```javascript
$('#datepicker').nepaliDatepicker({
    dateFormat: 'DD-MM-YYYY',
    language: 'nepali'
});
```

## 🌐 Language Support

### Nepali Language
```javascript
$('#datepicker').nepaliDatepicker({
    language: 'nepali',
    showEnglishDateSubscript: true
});
```

### English Language
```javascript
$('#datepicker').nepaliDatepicker({
    language: 'english',
    showEnglishDateSubscript: false
});
```

## 🚫 Date Restrictions

### Minimum and Maximum Dates
```javascript
$('#datepicker').nepaliDatepicker({
    minDate: '2080-01-01',
    maxDate: '2090-12-30',
    theme: 'light'
});
```

### Disabled Dates
```javascript
$('#datepicker').nepaliDatepicker({
    disabledDates: [
        '2081-01-01',
        '2081-01-02',
        '2081-01-03'
    ]
});
```

### Disabled Date Ranges
```javascript
$('#datepicker').nepaliDatepicker({
    disabledDateRanges: [
        {
            start: '2082-04-01',
            end: '2082-04-10'
        }
    ]
});
```

## 📱 Modal Usage

### Basic Modal
```javascript
$('#modal-datepicker').nepaliDatepicker({
    theme: 'light',
    language: 'nepali',
    modal: false, // Use custom modal container
    autoClose: true,
    onSelect: function(date, formatted) {
        $('#modal-result').text('Selected: ' + formatted);
    }
});
```

### Modal with Auto-close Prevention
```javascript
$('#modal-datepicker').nepaliDatepicker({
    autoClose: false, // Keep modal open after selection
    onSelect: function(date, formatted) {
        // Handle date selection
        console.log('Selected:', date, formatted);
    }
});
```

## 🔄 Date Conversion

### Automatic AD to BS Conversion
```javascript
$('#datepicker').nepaliDatepicker({
    defaultDate: '2024-01-15',
    dateType: 'AD', // Automatically converts to BS
    onSelect: function(date, formatted) {
        // date is in BS format
        console.log('BS Date:', formatted);
    }
});
```

### Manual Date Conversion
```javascript
// Convert AD to BS
var bsDate = window.ad2bs({year: 2024, month: 1, day: 15});

// Convert BS to AD
var adDate = window.bs2ad({year: 2081, month: 1, day: 1});
```

## 🎯 Event Handling

### Date Selection
```javascript
$('#datepicker').nepaliDatepicker({
    onSelect: function(date, formatted) {
        console.log('Selected date:', date);
        console.log('Formatted date:', formatted);
        
        // Convert to English date
        var englishDate = window.bs2ad(date, 'string');
        console.log('English date:', englishDate);
    }
});
```

### Datepicker Events
```javascript
$('#datepicker').nepaliDatepicker({
    onOpen: function() {
        console.log('Datepicker opened');
    },
    onClose: function() {
        console.log('Datepicker closed');
    }
});
```

## 🛠️ API Methods

### Get Selected Date
```javascript
var datepicker = $('#datepicker').data('nepaliDatepicker');
var selectedDate = datepicker.getDate();
```

### Set Date
```javascript
var datepicker = $('#datepicker').data('nepaliDatepicker');
datepicker.setDate({year: 2081, month: 1, day: 15});
```

### Clear Date
```javascript
var datepicker = $('#datepicker').data('nepaliDatepicker');
datepicker.clear();
```

### Show/Hide Datepicker
```javascript
var datepicker = $('#datepicker').data('nepaliDatepicker');
datepicker.show();
datepicker.hide();
```

### Destroy Datepicker
```javascript
$('#datepicker').nepaliDatepicker('destroy');
```

## 🎨 SweetAlert Integration

### Date Conversion Popup
```javascript
// Show date conversion popup
function showDateConversion(instanceName) {
    var dateInfo = window.showDatepickerInfo(instanceName);
    if (dateInfo) {
        // SweetAlert popup with conversion details
        Swal.fire({
            title: '📅 Date Conversion',
            html: `
                <div>Nepali Date: ${dateInfo.nepaliDate}</div>
                <div>English Date: ${dateInfo.englishDate}</div>
                <div>ISO Format: ${dateInfo.isoDate}</div>
            `
        });
    }
}
```

## 📱 Mobile Support

### Touch Events
The plugin automatically handles touch events for mobile devices:
- Touch start/end animations
- Swipe gestures
- Mobile-optimized UI

### Responsive Design
```css
/* Mobile-specific styles */
@media (max-width: 768px) {
    .nepali-datepicker {
        font-size: 14px;
    }
}
```

## ⌨️ Keyboard Navigation

### Supported Keys
- **Arrow Keys**: Navigate through dates
- **Enter**: Select date
- **Escape**: Close datepicker
- **Tab**: Navigate through elements

### Keyboard Shortcuts
```javascript
// Global keyboard shortcuts
$(document).on('keydown', function(event) {
    // Ctrl/Cmd + D: Open modal
    if ((event.ctrlKey || event.metaKey) && event.key === 'd') {
        openModal();
    }
    
    // Ctrl/Cmd + R: Reset all datepickers
    if ((event.ctrlKey || event.metaKey) && event.key === 'r') {
        resetAllDatepickers();
    }
});
```

## 🔧 Advanced Configuration

### Multiple Datepickers
```javascript
// Initialize multiple datepickers
$('#datepicker1, #datepicker2, #datepicker3').nepaliDatepicker({
    theme: 'light',
    language: 'nepali',
    dateFormat: 'YYYY-MM-DD'
});
```

### Dynamic Theme Switching
```javascript
// Change theme dynamically
function switchTheme(theme) {
    $('[id$="-datepicker"]').each(function() {
        var $input = $(this);
        var currentOptions = $input.data('nepaliDatepicker') || {};
        var newOptions = $.extend({}, currentOptions, {theme: theme});
        
        $input.nepaliDatepicker('destroy');
        $input.nepaliDatepicker(newOptions);
    });
}
```

### Configuration Panel
```javascript
// Setup configuration panel
function setupConfigurationPanel() {
    $('#theme-selector').on('change', function() {
        var theme = $(this).val();
        updateAllDatepickers({theme: theme});
    });
    
    $('#language-selector').on('change', function() {
        var language = $(this).val();
        updateAllDatepickers({language: language});
    });
}
```

## 🐛 Troubleshooting

### Common Issues

#### Datepicker Not Initializing
```javascript
// Ensure jQuery is loaded
if (typeof $ === 'undefined') {
    console.error('jQuery is required for Nepali Datepicker');
}

// Check if plugin is loaded
if (typeof $.fn.nepaliDatepicker === 'undefined') {
    console.error('Nepali Datepicker plugin not loaded');
}
```

#### Date Conversion Errors
```javascript
try {
    var bsDate = window.ad2bs({year: 2024, month: 1, day: 15});
} catch (error) {
    console.error('Date conversion error:', error);
}
```

#### Theme Not Applying
```javascript
// Ensure CSS is loaded
if (!$('link[href*="styles.css"]').length) {
    console.error('Nepali Datepicker CSS not loaded');
}
```

## 📄 Examples

### Complete Example
```html
<!DOCTYPE html>
<html>
<head>
    <title>Nepali Datepicker Demo</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <input type="text" id="datepicker" placeholder="Select Date">
    
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="jquery-nepali-datepicker.js"></script>
    <script>
        $(document).ready(function() {
            $('#datepicker').nepaliDatepicker({
                theme: 'light',
                language: 'nepali',
                dateFormat: 'YYYY-MM-DD',
                defaultDate: '2024-01-15',
                dateType: 'AD',
                showEnglishDateSubscript: true,
                onSelect: function(date, formatted) {
                    console.log('Selected:', date, formatted);
                }
            });
        });
    </script>
</body>
</html>
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Bikram Sambat calendar system
- jQuery community
- SweetAlert2 for beautiful popups
- All contributors and users

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the examples

---

**Made with ❤️ for the Nepali community**
