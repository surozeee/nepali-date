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
  
//   function positionPickerBelow($input) {
//     const $dp = getOpenPickerEl();
//     if (!$dp) return;
  
//     // Temporarily show for measurement if hidden
//     const wasHidden = $dp.css('display') === 'none';
//     if (wasHidden) $dp.css({ display: 'block', visibility: 'hidden' });
  
//     const off  = $input.offset();
//     const ih   = $input.outerHeight();
//     const dw   = $dp.outerWidth() || 320;
//     const dh   = $dp.outerHeight() || 280;
  
//     const $win = $(window);
//     const vw   = $win.width();
//     const vh   = $win.height();
//     const sl   = $win.scrollLeft();
//     const st   = $win.scrollTop();
  
//     // Prefer below → flip above if needed → clamp
//     const spaceBelow = (st + vh) - (off.top + ih);
//     const spaceAbove = (off.top - st);
//     let top;
  
//     if (spaceBelow >= dh + 8) top = off.top + ih + 6;
//     else if (spaceAbove >= dh + 8) top = off.top - dh - 6;
//     else top = Math.min(Math.max(off.top + ih + 6, st + 8), (st + vh) - dh - 8);
  
//     // Align left to input; clamp inside viewport
//     let left = off.left;
//     const maxLeft = sl + vw - dw - 10;
//     if (left > maxLeft) left = Math.max(sl + 10, maxLeft);
//     if (left < sl + 10) left = sl + 10;
  
//     $dp.css({ position: 'absolute', top, left, zIndex: 9999 })
//        .toggleClass('positioned-above', top < off.top)
//        .toggleClass('positioned-below', top >= off.top);
  
//     if (wasHidden) $dp.css({ visibility: '', display: 'none' });
//   }
  
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
      onSelect: (bs, formatted) => {
        const ad = adtobs(bs);
        const adStr = fmtAD(ad);
        console.log('Selected (BS):', formatted, '→ (AD):', adStr);
        $('#basic-english').text(adStr);
      },
      onOpen: function () {
        const $input = $(this);
        // Delay one frame so panel exists, then position + bind global handlers
        requestAnimationFrame(() => {
          positionPickerBelow($input);
          bindOutsideClose($input);
          bindRepositionOnMove($input);
        });
      },
      onClose: function () {
        const $input = $(this);
        unbindOutsideClose($input);
        unbindRepositionOnMove($input);
      }
    });
  
    // Example of setting today's BS correctly (no 1-day off)
    const t = todayBS();
    const api = $('#basic-datepicker').data('nepaliDatepicker');
    if (api && typeof api.setDate === 'function') api.setDate(t);
  
    // If you have other inputs, initialize them similarly
    // … (modern/readonly/etc.) — include onOpen/onClose same as above.
  }
  