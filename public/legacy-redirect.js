(function () {
  var location = window.location;
  var oldBase = '/mirkan1portfolio';
  var oldPath = location.pathname === oldBase || location.pathname.indexOf(oldBase + '/') === 0;
  var hashRoute = location.hash.indexOf('#/') === 0;

  if (!oldPath && !(location.pathname === '/' && hashRoute)) return;

  var route = hashRoute ? location.hash.slice(2) : location.pathname.slice(oldBase.length);
  var target = new URL(location.origin + '/' + route.replace(/^\/+/, ''));
  if (!target.pathname.endsWith('/')) target.pathname += '/';
  if (hashRoute) {
    target.search = [location.search.slice(1), target.search.slice(1)].filter(Boolean).join('&');
  } else {
    target.search = location.search;
    target.hash = location.hash;
  }
  location.replace(target.href);
})();
