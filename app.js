/**
 * App JS (no edits to jquery plugin)
 * Requires: jQuery, nepali-date (https://github.com/surozeee/nepali-date)
 */

// ---------- Conversion helpers using surozeee/nepali-date ----------
function hasNepaliDate() {
    return typeof window.NepaliDate === 'function';
  }
  
  // AD (JS Date or {y,m,d}) -> BS {year, month, day}
  function AD2BS_local(ad) {
    const d = ad instanceof Date
      ? new Date(ad.getFullYear(), ad.getMonth(), ad.getDate())  // strip time -> no TZ drift
      : new Date(ad.year, ad.month - 1, ad.day);
  
    if (hasNepaliDate()) {
      const nd = new window.NepaliDate(d);            // AD -> BS
      return { year: nd.getYear(), month: nd.getMonth() + 1, day: nd.getDate() };
    }
    console.warn('NepaliDate not loaded; AD2BS_local unavailable.');
    return null;
  }
  
  // BS {year,month,day} -> AD {year,month,day}
  function BS2AD_local(bs) {
    if (hasNepaliDate()) {
      const nd = new window.NepaliDate(bs.year, bs.month - 1, bs.day); // BS ctor
      const js = nd.toJsDate();     // -> native Date (AD)
      return { year: js.getFullYear(), month: js.getMonth() + 1, day: js.getDate() };
    }
    console.warn('NepaliDate not loaded; BS2AD_local unavailable.');
    return null;
  }
  
  function fmtAD(ad) {
    if (!ad) return '';
    const mm = String(ad.month).padStart(2, '0');
    const dd = String(ad.day).padStart(2, '0');
    return `${ad.year}-${mm}-${dd}`;
  }
  
  function todayBS() {                      // today in BS (no 1-day off)
    const now = new Date();
    return AD2BS_local(new Date(now.getFullYear(), now.getMonth(), now.getDate()));
  }
  
  // ---------- Smart positioning + outside close (no plugin edits) ----------
  function getOpenPickerEl() {
    // The plugin appends the panel to <body>; when open it’s the visible one.
    const $dp = $('.nepali-datepicker:visible').last();
    return $dp.length ? $dp : null;
  }
  
  
  function bindOutsideClose($input) {
    // Capture-phase listener so other code can't block it.
    const handler = (ev) => {
      const $dp = getOpenPickerEl();
      if (!$dp) return;
  
      if ($input[0] === ev.target || $.contains($input[0], ev.target)) return;
      if ($dp[0] === ev.target || $.contains($dp[0], ev.target)) return;
  
      const api = $input.data('nepaliDatepicker');
      if (api && typeof api.hide === 'function') api.hide();
    };
    document.addEventListener('mousedown', handler, true);
    document.addEventListener('touchstart', handler, true);
  
    // Store for cleanup
    $input.data('_outsideHandler', handler);
  }
  
  function unbindOutsideClose($input) {
    const h = $input.data('_outsideHandler');
    if (!h) return;
    document.removeEventListener('mousedown', h, true);
    document.removeEventListener('touchstart', h, true);
    $input.removeData('_outsideHandler');
  }
  
  function bindRepositionOnMove($input) {
    const cb = () => positionPickerBelow($input);
    $(window).on('resize.ndpfix scroll.ndpfix', cb);
    $input.data('_repositionCb', cb);
  }
  function unbindRepositionOnMove($input) {
    const cb = $input.data('_repositionCb');
    if (!cb) return;
    $(window).off('resize.ndpfix scroll.ndpfix', cb);
    $input.removeData('_repositionCb');
  }
  
  (function ($) {
    // Basic picker — on select, emit AD version
    $('#basic-datepicker').nepaliDatepicker({
      theme: 'light',
      language: 'nepali',
      dateFormat: 'YYYY/MM/DD',
      showToday: false,
      date: new Date(),
      onSelect: (bs, formatted) => {
        const ad = bs2ad(bs);
        const adStr = fmtAD(ad);
        console.log('Selected (BS):', formatted, '→ (AD):', adStr);
        $('#basic-english').text(adStr);
      }
    });

    $('#modern-datepicker').nepaliDatepicker({
      theme: 'dark',
      language: 'english',
      dateFormat: 'YYYY-MM-DD',
      showToday: false,
      date: new Date(),
      onSelect: (bs, formatted) => {
        const ad = bs2ad(bs);
        const adStr = fmtAD(ad);
        console.log('Selected (BS):', formatted, '→ (AD):', adStr);
        $('#basic-english').text(adStr);
      }
    });

    // ---------- Demo Functions ----------
    function showDatepickerInfo(type) {
      // Get the datepicker element and its selected date
      let datepickerId = '';
      let selectedDate = null;
      let selectedDateFormatted = '';
      
      // Map type to datepicker ID
      switch(type) {
        case 'basic':
          datepickerId = 'basic-datepicker';
          break;
        case 'modern':
          datepickerId = 'modern-datepicker';
          break;
        case 'minimal':
          datepickerId = 'minimal-datepicker';
          break;
        case 'dark':
          datepickerId = 'dark-datepicker';
          break;
        case 'range':
          datepickerId = 'range-datepicker';
          break;
        case 'time':
          datepickerId = 'time-datepicker';
          break;
        case 'readonly':
          datepickerId = 'readonly-datepicker';
          break;
        case 'disabled':
          datepickerId = 'disabled-datepicker';
          break;
        default:
          datepickerId = 'basic-datepicker';
      }
      
      // Get selected date from datepicker
      const $datepicker = $('#' + datepickerId);
      if ($datepicker.length) {
        const api = $datepicker.data('nepaliDatepicker');
        if (api && typeof api.getDate === 'function') {
          selectedDate = api.getDate();
          selectedDateFormatted = $datepicker.val();
        }
      }
      
      // Convert selected date to both formats
      let nepaliDate = 'No date selected';
      let englishDate = 'No date selected';
      
      if (selectedDate) {
        // Format Nepali date
        nepaliDate = `${selectedDate.year}-${String(selectedDate.month).padStart(2, '0')}-${String(selectedDate.day).padStart(2, '0')}`;
        
        // Convert to English date
        const englishDateObj = bs2ad(selectedDate);
        if (englishDateObj) {
          englishDate = `${englishDateObj.year}-${String(englishDateObj.month).padStart(2, '0')}-${String(englishDateObj.day).padStart(2, '0')}`;
        }
      }
      
      let title = '';
      let description = '';
      let icon = 'info';
      
      switch(type) {
        case 'basic':
          title = 'Basic Datepicker';
          description = 'Default light theme with Nepali language support. Perfect for standard date selection needs.';
          icon = 'calendar';
          break;
        case 'modern':
          title = 'Modern Datepicker';
          description = 'Dark theme with English language. Clean and modern design for contemporary applications.';
          icon = 'star';
          break;
        case 'minimal':
          title = 'Minimal Datepicker';
          description = 'Clean interface without today button. Ideal for minimal design requirements.';
          icon = 'leaf';
          break;
        case 'dark':
          title = 'Dark Theme Datepicker';
          description = 'Dark theme optimized for low light conditions. Better visibility and reduced eye strain.';
          icon = 'moon';
          break;
        case 'range':
          title = 'Professional Datepicker';
          description = 'Blue theme with professional appearance. Suitable for business applications.';
          icon = 'briefcase';
          break;
        case 'time':
          title = 'Time Datepicker';
          description = 'Green theme with time picker functionality. Includes both date and time selection.';
          icon = 'clock';
          break;
        case 'readonly':
          title = 'Read-only Datepicker';
          description = 'Pre-selected date (2081-01-01) with read-only functionality. Display only mode.';
          icon = 'lock';
          break;
        case 'disabled':
          title = 'Disabled Datepicker';
          description = 'Datepicker with disabled date functionality. Custom date restrictions available.';
          icon = 'ban';
          break;
        default:
          title = 'Datepicker Info';
          description = 'Information not available for this datepicker type.';
          icon = 'question';
      }
      
      // Create HTML content with selected dates
      const htmlContent = `
        <div style="text-align: left; margin: 20px 0;">
          <p style="margin-bottom: 15px; font-size: 16px;">${description}</p>
          <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #007bff;">
            <h4 style="margin: 0 0 10px 0; color: #333;">Selected Date Information:</h4>
            <p style="margin: 5px 0;"><strong>Nepali Date (BS):</strong> <span style="color: #e74c3c;">${nepaliDate}</span></p>
            <p style="margin: 5px 0;"><strong>English Date (AD):</strong> <span style="color: #27ae60;">${englishDate}</span></p>
            ${selectedDateFormatted ? `<p style="margin: 5px 0;"><strong>Formatted:</strong> <span style="color: #6c757d;">${selectedDateFormatted}</span></p>` : ''}
          </div>
        </div>
      `;
      
      Swal.fire({
        title: title,
        html: htmlContent,
        icon: icon,
        confirmButtonText: 'Got it!',
        confirmButtonColor: '#007bff',
        width: '500px',
        customClass: {
          popup: 'swal-wide'
        }
      });
    }
   // make it accessible to inline onclick=""
   window.showDatepickerInfo = showDatepickerInfo;
  })(jQuery);

  
  