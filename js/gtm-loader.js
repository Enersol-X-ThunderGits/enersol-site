// Enersol GTM loader: injects GTM <script> (head) and <noscript><iframe> (body)
(function () {
  var gtmId = 'GTM-MV8ZQKRT';
  if (!gtmId) return;

  // Prevent duplicate insertion if included more than once.
  if (window.__ENERSOL_GTM_LOADED__) return;
  window.__ENERSOL_GTM_LOADED__ = true;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });

  var d = document;

  // Inject GTM script into <head> (or <html> as fallback).
  var gtmScript = d.createElement('script');
  gtmScript.async = true;
  gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(gtmId);

  var head = d.head || d.getElementsByTagName('head')[0];
  var insertParent = head || d.documentElement;
  var firstScript = d.getElementsByTagName('script')[0];
  insertParent.insertBefore(gtmScript, firstScript || insertParent.firstChild);

  // Insert GTM noscript iframe as the first element in <body>.
  function insertNoScript() {
    if (!d.body) return;
    if (d.getElementById('enersol-gtm-noscript')) return;

    var noscript = d.createElement('noscript');
    noscript.id = 'enersol-gtm-noscript';

    var iframe = d.createElement('iframe');
    iframe.src = 'https://www.googletagmanager.com/ns.html?id=' + encodeURIComponent(gtmId);
    iframe.height = '0';
    iframe.width = '0';
    iframe.style.display = 'none';
    iframe.style.visibility = 'hidden';

    noscript.appendChild(iframe);
    d.body.insertBefore(noscript, d.body.firstChild);
  }

  if (d.readyState === 'loading') {
    d.addEventListener('DOMContentLoaded', insertNoScript);
  } else {
    insertNoScript();
  }
})();
