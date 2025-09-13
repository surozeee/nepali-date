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
    // The plugin appends the panel to <body>; when open it's the visible one.
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
      minDate: '2082-05-01',
      maxDate: '2082-06-30',
      onSelect: (bs, formatted) => {
        const ad = bs2ad(bs);
        const adStr = fmtAD(ad);
        console.log('Selected (BS):', formatted, '→ (AD):', adStr);
        $('#basic-english').text(adStr);
      }
    });

    $('#modern-datepicker').nepaliDatepicker({
      theme: 'blue',
      language: 'nepali',
      dateFormat: 'YYYY-MM-DD',
      showToday: false,
      date: new Date(),
      tzOffset: 345,
      onSelect: (bs, formatted) => {
        const ad = bs2ad(bs);
        const adStr = fmtAD(ad);
        console.log('Selected (BS):', formatted, '→ (AD):', adStr);
      }
    });

    $('#minimal-datepicker').nepaliDatepicker({
      theme: 'light',
      language: 'nepali',
      dateFormat: 'YYYY-MM-DD',
      showToday: false,
      autoClose: true,
      onSelect: (bs, formatted) => {
        console.log('Minimal datepicker selected:', formatted);
      }
    });

    $('#dark-datepicker').nepaliDatepicker({
      theme: 'dark',
      language: 'nepali',
      dateFormat: 'YYYY-MM-DD',
      showToday: false,
      onSelect: (bs, formatted) => {
        console.log('Dark datepicker selected:', formatted);
      }
    });

    $('#range-datepicker').nepaliDatepicker({
      theme: 'blue',
      language: 'nepali',
      dateFormat: 'YYYY-MM-DD',
      showToday: false,
      onSelect: (bs, formatted) => {
        console.log('Range datepicker selected:', formatted);
      }
    });

    $('#time-datepicker').nepaliDatepicker({
      theme: 'green',
      language: 'nepali',
      dateFormat: 'YYYY-MM-DD',
      showToday: false,
      onSelect: (bs, formatted) => {
        console.log('Time datepicker selected:', formatted);
      }
    });

    $('#readonly-datepicker').nepaliDatepicker({
      theme: 'light',
      language: 'nepali',
      dateFormat: 'YYYY-MM-DD',
      showToday: false,
      autoClose: false,
      date: { year: 2081, month: 1, day: 1 },
      onSelect: (bs, formatted) => {
        console.log('Readonly datepicker selected:', formatted);
      }
    });

    // Set default date for readonly datepicker
    // setTimeout(() => {
    //   const readonlyApi = $('#readonly-datepicker').data('nepaliDatepicker');
    //   if (readonlyApi) {
    //     readonlyApi.setDate({ year: 2081, month: 1, day: 1 });
    //   }
    // }, 100);

    $('#disabled-datepicker').nepaliDatepicker({
      theme: 'light',
      language: 'nepali',
      dateFormat: 'YYYY-MM-DD',
      showToday: false,
      onSelect: (bs, formatted) => {
        console.log('Disabled datepicker selected:', formatted);
      }
    });

    $('#modal-datepicker').nepaliDatepicker({
      theme: 'light',
      language: 'nepali',
      dateFormat: 'YYYY-MM-DD',
      showToday: false,
      modal: false, // Already in a modal
      autoClose: false,
      onSelect: (bs, formatted) => {
        $('#modal-result').text(`Selected: ${formatted}`);
        console.log('Modal datepicker selected:', formatted);
      }
    });
    $('#modal-datepicker-modal').nepaliDatepicker({
      theme: 'light',
      language: 'nepali',
      dateFormat: 'YYYY-MM-DD',
      showToday: false,
      modal: false, // Already in a modal
      autoClose: false,
      onSelect: (bs, formatted) => {
        $('#modal-result').text(`Selected: ${formatted}`);
        console.log('Modal datepicker selected:', formatted);
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

    // ---------- Additional Demo Functions ----------
    function loadDemoData() {
      const demoDates = [
        { id: 'basic-datepicker', date: { year: 2081, month: 6, day: 15 } },
        { id: 'modern-datepicker', date: { year: 2081, month: 8, day: 22 } },
        { id: 'minimal-datepicker', date: { year: 2081, month: 10, day: 5 } },
        { id: 'dark-datepicker', date: { year: 2081, month: 12, day: 18 } },
        { id: 'range-datepicker', date: { year: 2082, month: 2, day: 3 } },
        { id: 'time-datepicker', date: { year: 2082, month: 4, day: 12 } },
        { id: 'disabled-datepicker', date: { year: 2081, month: 3, day: 25 } }
      ];

      demoDates.forEach(({ id, date }) => {
        const $input = $('#' + id);
        if ($input.length) {
          const api = $input.data('nepaliDatepicker');
          if (api && typeof api.setDate === 'function') {
            api.setDate(date);
          }
        }
      });

      Swal.fire({
        title: 'Demo Data Loaded!',
        text: 'Sample dates have been loaded into all datepickers.',
        icon: 'success',
        confirmButtonText: 'Great!',
        confirmButtonColor: '#28a745'
      });
    }

    function resetAllDatepickers() {
      const datepickers = [
        'basic-datepicker', 'modern-datepicker', 'minimal-datepicker',
        'dark-datepicker', 'range-datepicker', 'time-datepicker',
        'disabled-datepicker', 'modal-datepicker'
      ];

      datepickers.forEach(id => {
        const $input = $('#' + id);
        if ($input.length) {
          const api = $input.data('nepaliDatepicker');
          if (api && typeof api.clear === 'function') {
            api.clear();
          }
        }
      });

      $('#modal-result').text('');
      
      Swal.fire({
        title: 'All Reset!',
        text: 'All datepickers have been cleared.',
        icon: 'info',
        confirmButtonText: 'OK',
        confirmButtonColor: '#6c757d'
      });
    }

    function openModal() {
      const modal = document.getElementById('datepicker-modal');
      if (modal) {
        modal.style.display = 'block';
        
        // Initialize modal datepicker if not already done
        const $modalInput = $('#modal-datepicker');
        if ($modalInput.length && !$modalInput.data('nepaliDatepicker')) {
          $modalInput.nepaliDatepicker({
            theme: 'light',
            language: 'nepali',
            dateFormat: 'YYYY-MM-DD',
            modal: false, // Already in a modal
            showToday: false,
            autoClose: false,
            onSelect: function(bs, formatted) {
              $('#modal-result').text(`Selected: ${formatted}`);
            }
          });
        }
      }
    }

    function closeModal() {
      const modal = document.getElementById('datepicker-modal');
      if (modal) {
        modal.style.display = 'none';
      }
    }

    // ---------- Configuration Panel Handlers ----------
    function initConfigPanel() {
      // Theme selector
      $('#theme-selector').on('change', function() {
        const newTheme = $(this).val();
        updateAllDatepickers('theme', newTheme);
      });

      // Language selector
      $('#language-selector').on('change', function() {
        const newLanguage = $(this).val();
        updateAllDatepickers('language', newLanguage);
      });

      // Format selector
      $('#format-selector').on('change', function() {
        const newFormat = $(this).val();
        updateAllDatepickers('dateFormat', newFormat);
      });
    }

    function updateAllDatepickers(property, value) {
      const datepickers = [
        'basic-datepicker', 'modern-datepicker', 'minimal-datepicker',
        'dark-datepicker', 'range-datepicker', 'time-datepicker',
        'readonly-datepicker', 'disabled-datepicker', 'modal-datepicker'
      ];

      datepickers.forEach(id => {
        const $input = $('#' + id);
        if ($input.length) {
          const api = $input.data('nepaliDatepicker');
          if (api && typeof api.destroy === 'function') {
            // Get current selected date before destroying
            const currentDate = api.getDate();
            
            // Destroy and recreate with new settings
            api.destroy();
            
            // Reinitialize with new property
            const config = {
              theme: 'light',
              language: 'nepali',
              dateFormat: 'YYYY-MM-DD',
              showToday: false,
              autoClose: true,
              onSelect: function(bs, formatted) {
                console.log(`${id} selected:`, formatted);
                if (id === 'modal-datepicker') {
                  $('#modal-result').text(`Selected: ${formatted}`);
                }
              }
            };
            
            // Apply the new property
            config[property] = value;
            
            // Special configurations for different datepickers
            switch(id) {
              case 'modern-datepicker':
                config.theme = 'blue';
                break;
              case 'dark-datepicker':
                config.theme = 'dark';
                break;
              case 'range-datepicker':
                config.theme = 'blue';
                break;
              case 'time-datepicker':
                config.theme = 'green';
                break;
              case 'readonly-datepicker':
                config.autoClose = false;
                break;
              case 'modal-datepicker':
                config.modal = false;
                config.autoClose = false;
                break;
            }
            
            $input.nepaliDatepicker(config);
            
            // Restore selected date if it existed
            if (currentDate) {
              setTimeout(() => {
                const newApi = $input.data('nepaliDatepicker');
                if (newApi && typeof newApi.setDate === 'function') {
                  newApi.setDate(currentDate);
                }
              }, 50);
            }
          }
        }
      });
    }

    // ---------- Event Handlers ----------
    function initEventHandlers() {
      // Modal close handlers
      $('.close').on('click', closeModal);
      
      // Close modal when clicking outside
      $(window).on('click', function(event) {
        const modal = document.getElementById('datepicker-modal');
        if (event.target === modal) {
          closeModal();
        }
      });

      // Keyboard support for modal
      $(document).on('keydown', function(event) {
        if (event.key === 'Escape') {
          closeModal();
        }
      });
    }

    // Initialize everything when document is ready
    $(document).ready(function() {
      initConfigPanel();
      initEventHandlers();
      console.log('Nepali Datepicker Demo initialized successfully!');
    });

   // make it accessible to inline onclick=""
   window.showDatepickerInfo = showDatepickerInfo;
   window.loadDemoData = loadDemoData;
   window.resetAllDatepickers = resetAllDatepickers;
   window.openModal = openModal;
  })(jQuery);

  