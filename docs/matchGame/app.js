console.clear();

var pad = 20;
var threshold = "50%";

var checkButton = document.querySelector("#check-button");
var resetButton = document.querySelector("#reset-button");

var dragElements = document.querySelectorAll(".drag-tile");
var dropElements = document.querySelectorAll(".drop-tile");

var dragTiles = Array.prototype.map.call(dragElements, createDragTile);
var dropTiles = Array.prototype.map.call(dropElements, createDropTile);

checkButton.addEventListener("click", checkTiles);
resetButton.addEventListener("click", resetTiles);

function checkTiles() {
  for (var i = 0; i < dragTiles.length; i++) {
    var tile = dragTiles[i];

    if (!tile.parent) {
      continue;
    }

    var className = tile.value === tile.parent.value ? "correct" : "wrong";
    tile.element.classList.add(className);
  }
}

function resetTiles() {
  document.querySelector(".counter").textContent = "ZERO";
  for (var i = 0; i < dragTiles.length; i++) {
    var tile = dragTiles[i];

    if (tile.parent) {
      tile.parent = tile.parent.child = null;
    }

    tile.element.classList.remove("correct", "wrong", "hitting");

    TweenLite.to(tile.element, 0.3, {
      x: 0,
      y: 0
    });
  }
}

function createDragTile(element, index) {
  TweenLite.set(element, {
    left: pad,
    top: pad + index * (pad + element.offsetHeight)
  });

  var draggable = new Draggable(element, {
    bounds: ".board",
    onDragStart: onDragStart,
    onDrag: onDrag,
    onDragEnd: onDragEnd
  });

  var tile = {
    element: element,
    parent: null,
    value: element.dataset.value
  };

  function onDragStart() {
    element.classList.remove("correct", "wrong");
  }

  function onDrag() {
    var parent = tile.parent;
    console.log("parent:", parent);

    if (parent) {
      if (this.hitTest(parent.element, threshold)) {
        // exit the function
        // tile is still hitting parent, so no need to proceed any further.
        return;
      }

      // tile is no longer hitting parent, so clear any references between the two
      parent = tile.parent = parent.child = null;
    }

    for (var i = 0; i < dropTiles.length; i++) {
      var dropTile = dropTiles[i];

      if (dropTile.child) {
        // continue to next loop iteration
        // drop tile already has a child, so no need to proceed any further
        continue;
      }

      if (this.hitTest(dropTile.element, threshold)) {
        // we hit an empty drop tile, so link the two together and exit the function
        tile.parent = dropTile;
        dropTile.child = tile;
        element.classList.add("hitting");
        return;
      }
    }

    // if we made it this far, we're not hitting an empty drop tile
    element.classList.remove("hitting");
  }

  function onDragEnd() {
    var x = 0;
    var y = 0;

    // move to parent
    if (tile.parent) {
      var rect1 = element.getBoundingClientRect();
      var rect2 = tile.parent.element.getBoundingClientRect();

      x = "+=" + (rect2.left - rect1.left);
      y = "+=" + (rect2.top - rect1.top);

      if (tile.value === tile.parent.value) {
        console.log("Hello YESSSS");
        document.querySelector(".counter").textContent = tile.value;
      }
    }

    TweenLite.to(element, 0.3, {
      x: x,
      y: y
    });
  }

  return tile;
}

function createDropTile(element, index) {
  TweenLite.set(element, {
    left: pad + 3 * element.offsetWidth,
    top: pad + index * (pad + element.offsetHeight)
  });

  var tile = {
    element: element,
    child: null,
    value: element.dataset.value
  };

  return tile;
}
