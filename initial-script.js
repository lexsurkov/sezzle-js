(function (callback) {
  var iframe = document.createElement('iframe');
  iframe.width = 0;
  iframe.height = 0;
  iframe.style.display = 'none';
  iframe.style.visibility = 'hidden';
  iframe.name='szl';
  iframe.src = 'https://tracking.sezzle.com';
  document.body.appendChild(iframe);
  callback();

})(function () {
  var el = document.createElement('script');
  el.src = 'https://widget.sezzle.com/v1/javascript/price-widget?uuid=' + document.sezzleConfig['merchantID'];
  document.getElementsByTagName('head')[0].appendChild(el);
});
