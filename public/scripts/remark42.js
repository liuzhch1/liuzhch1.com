var remark_config = {
  host: 'https://remark42.liuzhch1.com',
  site_id: 'liuzhch1.com',
  components: ['embed'],
  max_shown_comments: 100,
  theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
  locale: 'en',
  show_email_subscription: false,
  simple_view: true,
  no_footer: false,
}
!(function (e, n) {
  for (var o = 0; o < e.length; o++) {
    var r = n.createElement('script'),
      c = '.js',
      d = n.head || n.body
    'noModule' in r ? ((r.type = 'module'), (c = '.mjs')) : (r.async = !0),
      (r.defer = !0),
      (r.src = remark_config.host + '/web/' + e[o] + c),
      d.appendChild(r)
  }
})(remark_config.components, document)
