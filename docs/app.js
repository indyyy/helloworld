console.clear();

var a = 0;
var b = 15;
var c = 30;

// TweenLite.from($("#test"), 0.5, { height: "-200px", ease: SteppedOut.easeOut });

// obj.src = "https://kahimyang.com/resources/sound/click.mp3";
// obj.src = "fuzzybeep.mp3";
// obj.src = "https://www.freesfx.co.uk/rx2/mp3s/5/16946_1461335340.mp3";
var obj = document.createElement("audio");
obj.src = "combolock.mp3";
obj.volume = 1;
obj.autoPlay = false;
obj.preLoad = true;
obj.loop = false;
$("#knob1, #knob2, #knob3").click(function() {
  obj.play();
});

var safeFall = document.createElement("audio");
// safeFall.src = "futurefall.mp3";
safeFall.src = "arcadefall.mp3";
$("#test").click(function() {
  safeFall.play();
});

var safeOpen = document.createElement("audio");
safeOpen.src = "safeopen.mp3";

TweenLite.from($("#test"), 2.5, { ease: Bounce.easeOut, y: -600 });

//it doesn't get much easier than this;)
var knob1 = Draggable.create("#knob1", {
  type: "rotation",
  bounds: { minRotation: 0, maxRotation: 360 },
  throwProps: false,
  onDrag: function() {
    // console.log("Knob1", this.rotation);
    document.querySelectorAll("#spincount1")[0].textContent = Math.round(
      this.rotation
    );
  },
  onDragEnd: function() {
    console.log("Hello Knob1", Math.round(this.rotation));
    a = Math.round(this.rotation);
    console.log("a is", a);
    console.log("b is", b);
    console.log("c is", c);
    if (a === b && b === c) {
      console.log("we have a match");
      TweenLite.to($("#test"), 3, { width: "150px" });
      safeOpen.load();
      safeOpen.play();
      TweenLite.to("#kangalogo", 3, {
        ease: Bounce.easeInOut,
        x: 400,
        y: 400,
        delay: 2,
        scale: 4,
        rotation: 360,
        onComplete: selectGame
      });
    }
  }
});

var knob2 = Draggable.create("#knob2", {
  type: "rotation",
  throwProps: false,
  onDrag: function() {
    // console.log("Knob2", this.rotation);
    document.querySelectorAll("#spincount2")[0].textContent = Math.round(
      this.rotation
    );
  },

  onDragEnd: function() {
    console.log("Hello Knob2", Math.round(this.rotation));
    b = Math.round(this.rotation);
    console.log("a is ", a);
    console.log("b is ", b);
    console.log("c is ", c);
  }
});

var knob3 = Draggable.create("#knob3", {
  type: "rotation",
  throwProps: false,
  onDrag: function() {
    // console.log("Knob3", this.rotation);
    document.querySelectorAll("#spincount3")[0].textContent = Math.round(
      this.rotation
    );
  },

  onDragEnd: function() {
    console.log("Hello Knob3", Math.round(this.rotation));
    c = Math.round(this.rotation);
    console.log("a is ", a);
    console.log("b is ", b);
    console.log("c is ", c);
  }
});

function selectGame() {
  // disable the knobs

  // TweenLite.to("#test", 1, { scrambleText: "THIS IS NEW TEXT" });

  TweenLite.to("#headline", 2, {
    text: "You've unlocked 3 games........ Let's Play!",
    ease: Linear.easeNone
  });

  knob1[0].disable();
  knob2[0].disable();
  knob3[0].disable();
  //set up game links by wrapping the knobs
  $("#knob1").wrap($("<a>", { href: "../matchGame/index.html" }));
  $("#knob2").wrap($("<a>", { href: "../greenSockPotatoHead/index.html" }));
  $("#knob3").wrap($("<a>", { href: "../greenSockPotatoHead/index.html" }));

  // turn the sound off with a null
  safeFall.src = "presscorrect.mp3";
  safeFall.load();
  $("#knob1, #knob2, #knob3").click(function() {
    console.log("knob was pressed");
    safeFall.play();
  });
  // knob1[0].addEventListener("press", onPress);
  // function onPress() {
  //   console.log("knob1 was pressed");
  // }
  // var Knob1 = Draggable.create("#knob1", {
  //   type: "rotation",
  //   bounds: { minRotation: 0, maxRotation: 360 },
  //   throwProps: false
  // });

  // Knob1[0].addEventListener("press", onPress);

  // function onPress() {
  //   console.log("myDraggable was pressed");
  // }

  document.querySelector("body").style.backgroundColor = "green";
  $("#kangalogo").click(function() {
    safeFall.play();
  });
  $("#spincount1").text("Match Game");
  $("#spincount2").text("Make Money");
  $("#spincount3").text("In the Pouch");
  $("#rotation1, #rotation2, #rotation3").text("Press to Play");
}

// document.querySelectorAll("#spincount1")[0].textContent;
// if (document.querySelectorAll("#spincount1")[0].textContent == 10) {
//   console.log("hello");
// }

// $("#rotation1").click(function() {
//   console.log(
//     document.getElementById("knob1")._gsTransform.rotation,
//     "from element"
//   );
//   console.log(Draggable.get("#knob1").rotation, "from Draggable.get()");
// });

// $("#rotation2").click(function() {
//   console.log(
//     document.getElementById("knob2")._gsTransform.rotation,
//     "from element"
//   );
//   console.log(Draggable.get("#knob2").rotation, "from Draggable.get()");
// });

// $("#rotation3").click(function() {
//   console.log(
//     document.getElementById("knob3")._gsTransform.rotation,
//     "from element"
//   );
//   console.log(Draggable.get("#knob3").rotation, "from Draggable.get()");
// });

/* note this file loads 

TweenMax.min.js
Draggable.min.js
ThrowPropsPlugin.min.js (Club GreenSock bonus plugin for velocity-based tweens)

More info on Club GreenSock and other bonus plugins
https://www.greensock.com/club

*/
