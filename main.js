let num_boxes = 0;

let boxes = [];


class DraggableBox {

  constructor(id) {
    this.id = id;
    this.position = {x: 0, y: 0}
  }
}

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

function find_box(id){
  for (box of boxes)
    {
      if (box.id === id)
        return box
    } 
}


function Create() {

  console.log("try??")
  const newDiv = Object.assign(document.createElement("div",), { className: 'draggable', id: "box_" + num_boxes });
  const box = new DraggableBox("box_" + num_boxes);
  num_boxes = num_boxes + 1;

  boxes.push(box);

  const newContent = document.createTextNode("New Box");

  newDiv.appendChild(newContent);

  // add the newly created element and its content into the DOM
  const currentDiv = document.getElementById("CreatorButton");
  document.body.insertBefore(newDiv, currentDiv.nextSibling);
  const all_boxes = document.querySelectorAll('.draggable');

  
}