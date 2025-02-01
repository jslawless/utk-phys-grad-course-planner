let num_boxes = 0;
let num_semesters = 0;

let boxes = [];


class DraggableBox {

  constructor(id) {
    this.id = id;
    this.position = { x: 0, y: 0 }
  }
}
interact('.inner-dropzone').dropzone({
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.35,
  // listen for drop related events:
  ondrop: function (event) {
    current_box = find_box(event.relatedTarget.id);
    // var rect = event.target.getBoundingClientRect();

    
    var pos = getPos(event.target);
    var pos2 = getPos(event.relatedTarget);

    console.log(pos);

    dx = pos.x - pos2.x;
    dy = pos.y - pos2.y; 
    current_box.position.x = pos.x - pos2.x;
    current_box.position.y = pos.y - pos2.y;
    event.relatedTarget.style.transform =
      `translate(${dx}px, ${dy}px)`
  }
})

interact('.draggable').draggable({
  listeners: {
    start(event) {
      console.log(event.type, event.target)
    },
    move(event) {

      current_box = find_box(event.target.id)

      current_box.position.x += event.dx
      current_box.position.y += event.dy

      event.target.style.transform =
        `translate(${current_box.position.x}px, ${current_box.position.y}px)`
    },
  }
})

function getPos(el) {
  // yay readability
  for (var lx=0, ly=0;
       el != null;
       lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
  return {x: lx,y: ly};
}

function find_box(id) {
  for (box of boxes) {
    if (box.id === id)
      return box
  }
}


function CreateCourse(num) {
  console.log(num);
  let color = "#29e";
  if (num == 0) {
    color = "background-color:rgb(238, 146, 34)";
  }
  else if (num == 500) {
    color = "background-color:rgb(34, 153, 238)";
  }
  else if (num == 600) {
    color = "background-color:rgb(162, 0, 180)";
  }
  const newDiv = Object.assign(
    document.createElement("div",),
    { className: 'draggable draggable-design', id: "box_" + num_boxes, style: color }
  );
  const box = new DraggableBox("box_" + num_boxes);
  const newContent = Object.assign(
    document.createElement("input"),
    { className: 'box_text', id: "box_" + num_boxes + "_input", placeholder: "Type class here..." }
  );
  num_boxes = num_boxes + 1;

  boxes.push(box);
  newDiv.appendChild(newContent);

  // add the newly created element and its content into the DOM
  document.getElementById("buttons-div").appendChild(newDiv);
  const all_boxes = document.querySelectorAll('.draggable');


}

function CreateSemester() {
  const newDiv = Object.assign(
    document.createElement("div",),
    { className: 'outer-dropzone dropzone', id: "semester_" + num_semesters }
  );

  let classes = document.getElementById("num_classes").value;

  if (isNaN(classes) || classes == 0) {
    classes = 1;
  }

  newDiv.appendChild(document.createTextNode("Semester " + num_semesters,));

  for (let i = 0; i < classes; i++) {
    let newContent = Object.assign(
      document.createElement("div",),
      { className: 'inner-dropzone dropzone', id: "semester_" + num_semesters + "_class_" + i }
    );
    newDiv.appendChild(newContent);
  }
  document.getElementById("parent-div").appendChild(newDiv);

  num_semesters = num_semesters + 1;
}