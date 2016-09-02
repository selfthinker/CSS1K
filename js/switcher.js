(function() {

var hash = window.location.hash;

var switchStyle = function() {
  var styleSlug = window.location.hash.slice(1) || 'default'
    , styleUrl = 'styles/' + styleSlug + '.css';
  // Use PrefixFree to add vendor prefixes if it exists and is functional.
  $.get(styleUrl, function(data) {
    $('style').first().text(
      PrefixFree ? PrefixFree.prefixCSS(data)
                 : data
    );
    $('html, body').animate({ scrollTop: 0 });
  });
  if (window.location.host === 'css1k.net' && styleSlug !== 'default') {
    ga('send', 'pageview', styleSlug);
  }
};

var navigateStyles = function(type) {
  var curStyleLink = window.location.hash || './',
    $curStyleLink = $('a[href="'+curStyleLink+'"]'),
    $nextStyleLink = $curStyleLink.parent().next('li').find('a:first-child'),
    $prevStyleLink = $curStyleLink.parent().prev('li').find('a:first-child');

  if (!$nextStyleLink.length) {
    $nextStyleLink = $('header nav li:first-child a:first-child');
  }
  if (!$prevStyleLink.length) {
    $prevStyleLink = $('header nav li:last-child a:first-child');
  }

  if (type === 'prev') {
    $prevStyleLink[0].click();
  }
  if (type === 'next') {
    $nextStyleLink[0].click();
  }
};

$(function() {

  $('#zengarden-age').text(new Date().getFullYear() - 2003);

  // For permalinks and default style.
  switchStyle();

  // navigate forwards and backwards
  $('body').on('keydown', function(e){
    if (e.which == 37) { // left arrow
      navigateStyles('prev');
    }
    if (e.which == 39) { // right arrow
      navigateStyles('next');
    }
  });

  // Track hash changes.
  if ('onhashchange' in window) {
    $(window).on('hashchange', switchStyle);
  } else {
    setInterval(function() {
      if (window.location.hash != hash) {
        hash = window.location.hash;
        switchStyle();
      }
    }, 250);
  }
});

})();
