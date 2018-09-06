heading = document.querySelector("#test");
heading.textContent = "What's up Aman";

for (i = 1; i < 100; i++) {
  for (j = 1; j < 100; j++) {
    $("#test").append("<span id=test>What's up Aman </span>");
  }
}
