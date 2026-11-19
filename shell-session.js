// typewriter effect for the hero terminal
(function () {
  var el = document.getElementById('shell');
  if (!el) return;

  var PROMPT = 'erikluu ~ $ ';
  var lines = [
    { cmd: 'whoami' },
    { out: 'Erik Luu, Software Engineer @ Boeing' },
    { cmd: 'cat about.txt' },
    { out: '- Real-time sensor fusion in C++ on the USAF E-7A' },
    { out: '- M.S. + B.S. Computer Science, Cal Poly SLO' },
    { out: '- NCAA D1 Cross Country & Track, 2019-2024' },
    { out: '- From Seattle, WA' },
    { cmd: 'ls interests/' },
    { out: 'real-time-systems  knowledge-graphs  running  games', dim: true },
    { prompt: true }
  ];

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var TYPE_MS = 45;
  var LINE_MS = 120;

  el.textContent = '';

  function span(cls, text) {
    var s = document.createElement('span');
    if (cls) s.className = cls;
    s.textContent = text || '';
    el.appendChild(s);
    return s;
  }

  function render(line, typed) {
    if (line.cmd !== undefined || line.prompt) {
      span('prompt', PROMPT);
      var s = span(null, typed ? '' : line.cmd || '');
      return s;
    }
    span(line.dim ? 'dim' : null, line.out);
  }

  if (reduceMotion) {
    lines.forEach(function (line, i) {
      render(line, false);
      if (i < lines.length - 1) span(null, '\n');
    });
    return;
  }

  var i = 0;
  function next() {
    if (i >= lines.length) return;
    var line = lines[i];
    if (i > 0) span(null, '\n');
    i++;

    if (line.cmd) {
      var target = render(line, true);
      var c = 0;
      (function type() {
        target.textContent = line.cmd.slice(0, ++c);
        if (c < line.cmd.length) setTimeout(type, TYPE_MS);
        else setTimeout(next, LINE_MS * 3);
      })();
    } else {
      render(line, false);
      setTimeout(next, LINE_MS);
    }
  }

  setTimeout(next, 600);
})();
