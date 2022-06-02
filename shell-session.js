// setup typewriter effect in the terminal
if (document.getElementsByClassName('demo').length > 0) {
  var i = 0;
  var txt = `start ...\n\n###a little about me\n\n- Studying Computer Science @ Cal Poly, San Luis Obispo\n- NCAA D1 Cross Country & Track Athlete\n- Research Assistant, AI for Search and Rescue\n- Research Assistant, Damage Map\n- From Seattle, WA`;
  var speed = 30;

  function typeTxtOut () {
    if (i < txt.length) {
      document.getElementsByClassName('demo')[0].innerHTML += txt.charAt(i);
      i++;
      setTimeout(typeTxtOut, speed);
    }
  }

  setTimeout(typeTxtOut, 2250);
}
