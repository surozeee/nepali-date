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
  
  // ---------- Datepicker init ----------
  document.addEventListener('DOMContentLoaded', () => {
    initPickers();
  });
  
  function initPickers() {
    // Basic picker — on select, emit AD version
    $('#basic-datepicker').nepaliDatepicker({
      theme: 'light',
      language: 'nepali',
      dateFormat: 'YYYY-MM-DD',
      date: new Date(),
      onSelect: (bs, formatted) => {
        const ad = bs2ad(bs);
        const adStr = fmtAD(ad);
        console.log('Selected (BS):', formatted, '→ (AD):', adStr);
        $('#basic-english').text(adStr);
      }
    });
  }
  