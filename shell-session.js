// setup typewriter effect in the terminal
if (document.getElementsByClassName('demo').length > 0) {
  var i = 0;
  var txt = `describe --me\n\n###a little about me\n\n- M.S. Computer Science @ Cal Poly, San Luis Obispo\n- NCAA D1 Cross Country & Track Athlete\n- Software Engineer Intern for Cylerian LLC\n- From Seattle, WA\n\n tags: Machine Learning; Data Science; Accessibility; Knowledge Graphs`;
  var speed = 5;

  function typeTxtOut () {
    if (i < txt.length) {
      document.getElementsByClassName('demo')[0].innerHTML += txt.charAt(i);
      i++;
      setTimeout(typeTxtOut, speed);
    }
  }

  setTimeout(typeTxtOut, 1000);
}
