let num_boxes = 0;
let num_semesters = 0;

let boxes = [];

let core_nums = ["521", "522", "531", "541", "551", "571"]

CheckCourses()
const includesCaseInsensitive = (str, searchString) =>
  new RegExp(searchString, 'i').test(str);

class DraggableBox {

  constructor(id, type) {
    this.type = type;
    this.id = id;
    this.position = { x: 0, y: 0 }
    this.in_semester = false;
  }

  is_core() {
    let course = document.getElementById(this.id + "_input").value
    for (let i = 0; i < core_nums.length; i++) {
      if (includesCaseInsensitive(course, core_nums[i]) && includesCaseInsensitive(course, "Phys")) {
        return core_nums[i];
      }
    }
    return 0;
  }

  is_seminar() {
    let course = document.getElementById(this.id + "_input").value
    if (includesCaseInsensitive(course, "599") && includesCaseInsensitive(course, "Phys")) {
      return 599;
    }
    return 0;
  }

  is_collo() {
    let course = document.getElementById(this.id + "_input").value
    if (includesCaseInsensitive(course, "503") && includesCaseInsensitive(course, "Phys")) {
      return 599;
    }
    return 0;
  }
}
interact('.inner-dropzone').dropzone({
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.35,
  // listen for drop related events:
  ondragleave: function (event) {
    // remove the drop feedback style
    current_box = find_box(event.relatedTarget.id);
    current_box.in_semester = false;
    CheckCourses();

  },
  ondrop: function (event) {
    current_box = find_box(event.relatedTarget.id);
    // var rect = event.target.getBoundingClientRect();


    var pos = getPos(event.target);
    var pos2 = getPos(event.relatedTarget);

    dx = pos.x - pos2.x;
    dy = pos.y - pos2.y;
    current_box.position.x = pos.x - pos2.x;
    current_box.position.y = pos.y - pos2.y;
    event.relatedTarget.style.transform =
      `translate(${dx}px, ${dy}px)`

    current_box.in_semester = true;
    CheckCourses();
  }
})

interact('.draggable').draggable({
  listeners: {
    move(event) {

      current_box = find_box(event.target.id)

      current_box.position.x += event.dx;
      current_box.position.y += event.dy;
      current_box.in_semester = false;
      CheckCourses();

      event.target.style.transform =
        `translate(${current_box.position.x}px, ${current_box.position.y}px)`

      
    },
  }
})

function getPos(el) {
  // yay readability
  for (var lx = 0, ly = 0;
    el != null;
    lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
  return { x: lx, y: ly };
}

function find_box(id) {
  for (box of boxes) {
    if (box.id === id)
      return box
  }
}

function CheckCourses() {
  let reqs = ["c_sem", "c_core", "c_core_521", "c_core_522", "c_core_531", "c_core_541",
    "c_core_551", "c_core_571", "c_col", "c_upp"
  ]
  let num_600s = 0;
  let extra_500 = false;
  let num_col = 0;
  for (let i = 0; i < reqs.length; i++) {
    document.getElementById(reqs[i]).checked = false;
  }
  for (var i = 0; i < boxes.length; i++) {
    if (boxes[i].in_semester == false) {
      continue;
    }
    if (boxes[i].is_core()) {
      document.getElementById("c_core_" + boxes[i].is_core()).checked = true;
    }
    else if (boxes[i].type === 600) {
      num_600s += 1;
    }
    else if (boxes[i].is_seminar()) {
      document.getElementById("c_sem").checked = true;
    }
    else if (boxes[i].is_collo()) {
      num_col += 1;
    }
    else if (boxes[i].type === 500) {
      extra_500 = true;
    }
  }
  if (num_600s > 4) {
    document.getElementById("c_upp").checked = true;
  }
  else if (num_600s == 4 && extra_500) {
    document.getElementById("c_upp").checked = true;
  }
  if (num_col > 4) {
    document.getElementById("c_col").checked = true;
  }

}


function CreateCourse(num) {
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
  const box = new DraggableBox("box_" + num_boxes, num);
  const newContent = Object.assign(
    document.createElement("input"),
    {
      className: 'box_text', id: "box_" + num_boxes + "_input",
      placeholder: "Type class here..."
    }
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