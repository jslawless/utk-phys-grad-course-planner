let num_boxes = 0;
let num_semesters = 0;

let boxes = [];


class DraggableBox {

  constructor(id) {
    this.id = id;
    this.position = { x: 0, y: 0 }
  }
}
interact('.dropzone').dropzone({
  // only accept elements matching this CSS selector
  accept: '#yes-drop',
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.75,

  // listen for drop related events:

  ondropactivate: function (event) {
    // add active dropzone feedback
    event.target.classList.add('drop-active')
  },
  ondragenter: function (event) {
    var draggableElement = event.relatedTarget
    var dropzoneElement = event.target

    // feedback the possibility of a drop
    dropzoneElement.classList.add('drop-target')
    draggableElement.classList.add('can-drop')
    draggableElement.textContent = 'Dragged in'
  },
  ondragleave: function (event) {
    // remove the drop feedback style
    event.target.classList.remove('drop-target')
    event.relatedTarget.classList.remove('can-drop')
    event.relatedTarget.textContent = 'Dragged out'
  },
  ondrop: function (event) {
    event.relatedTarget.textContent = 'Dropped'
  },
  ondropdeactivate: function (event) {
    // remove active dropzone feedback
    event.target.classList.remove('drop-active')
    event.target.classList.remove('drop-target')
  }
})

interact('.draggable').draggable({
  modifiers: [
    interact.modifiers.restrict({
      restriction: 'self'           // keep the drag coords within the element
    })
  ],
  listeners: {
    start(event) {
      console.log(event.type, event.target)
    },
    move(event) {
      console.log(event.target.id)
      console.log("asdfasdfasdfasdf")

      current_box = find_box(event.target.id)


      current_box.position.x += event.dx
      current_box.position.y += event.dy

      event.target.style.transform =
        `translate(${current_box.position.x}px, ${current_box.position.y}px)`
    },
  }
})

function find_box(id) {
  for (box of boxes) {
    if (box.id === id)
      return box
  }
}


function CreateCourse(num) {
  console.log(num);
  const newDiv = Object.assign(
    document.createElement("div",),
    { className: 'draggable draggable-design', id: "box_" + num_boxes }
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

  if (isNaN(classes) || classes == 0)
  {
    classes = 1;
  }

  newDiv.appendChild(document.createTextNode("Semester "+ num_semesters,));

  for (let i = 0; i < classes; i++)
  {
    let newContent = Object.assign(
      document.createElement("div",),
      { className: 'inner-dropzone dropzone', id:"semester_" + num_semesters + "_class_" + i }
    );
    newDiv.appendChild(newContent);
  }
  document.getElementById("parent-div").appendChild(newDiv);

  num_semesters = num_semesters + 1;
}