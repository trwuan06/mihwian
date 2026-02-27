var titles = [
  "@",
  "@m",
  "@mi",
  "@mih",
  "@mihw",
  "@mihwi",
  "@mihwia",
  "@mihwian",
  "@mihwia",
  "@mihwi",
  "@mihw",
  "@mih",
  "@mi",
  "@m"
];

function changeTitle() {
  var index = 0;

  setInterval(function() {
      document.title = titles[index];
      index = (index + 1) % titles.length;
  }, 456);
}

changeTitle();
