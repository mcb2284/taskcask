function editForm(name = "", task = "", date = "", priority = "") {
  let priorityToggle =
    priority === "false"
      ? "../static/images/flag.svg"
      : "../static/images/flag-fill.svg";
  console.log(date);
  $("#edit-tasks").append(`
	  <form>
		  <div class="mb-3">
			  <label for="InputTitle" class="form-label">Title</label>
			  <input type="title" class="form-control" id="inputtitle" value="${name}" placeholder="Title">
		  </div>
		  <div class="mb-3">
			  <label for="inputDescription" class="form-label">Task</label>
			  <input type="task" class="form-control" id="inputdescription" value="${task}" placeholder="Description">
		  </div>
      <div class="mb-3">
        <label for="inputDate" class="form-label">Date</label>
        <input type="date" class="form-control" id="inputdate" value="${date}" placeholder="XX/XX/XXXX">
        <div class="invalid-feedback">We can't change the past, try setting a goal for the future!</div>
      </div>
      <div class="options">
        <image src="${priorityToggle}" alt="priority" class="icons" id="priorityToggle">
        <image src="../static/images/stopwatch.svg" alt="urgent" class="icons">
        <button type="submit" class="btn btn-outline-dark" id="submit-task">Submit</button>
      </div>
	  </form>
	  `);
}

function submit() {
  if (ref === "") {
    let data = {
      name: $("#inputtitle").val(),
      task: $("#inputdescription").val(),
      date: $("#inputdate").val(),
      priority: priority,
    };
    add(data);
  } else {
    let data = {
      name: $("#inputtitle").val(),
      task: $("#inputdescription").val(),
      date: $("#inputdate").val(),
      priority: priority,
      ref_num: ref,
    };
    update(data);
  }
}

function add(data) {
  $.ajax({
    type: "POST",
    url: "/add",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(data),
    success: function (result) {
      console.log(result.errors);
    },
    error: function (request, status, error) {
      console.log("Error");
      console.log(request);
      console.log(status);
      console.log(error);
    },
  });
  window.location.assign(`/`);
}

function update(data) {
  $.ajax({
    type: "POST",
    url: "/update",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(data),
    success: function (result) {
      console.log(result.errors);
    },
    error: function (request, status, error) {
      console.log("Error");
      console.log(request);
      console.log(status);
      console.log(error);
    },
  });
  window.location.assign(`/`);
}

function dateIsValid(input) {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  //Check to see if the date is valid
//  if (Number(input[0]) < year) {
//    $("#inputdate").addClass("is-invalid");
//    return false;
//  } else if (Number(input[1]) < month && Number(input[0]) === year) {
//    $("#inputdate").addClass("is-invalid");
//    return false;
//  } else if (Number(input[2]) < day && Number(input[1]) === month) {
//    $("#inputdate").addClass("is-invalid");
//    return false;
//  }
  return true;
}

$(document).ready(() => {
  editForm(username, task, date, priority);
  $("#submit-task").click((event) => {
    event.preventDefault();
    if (dateIsValid($("#inputdate").val().split("-"))) {
      submit();
    }
  });

  $("#priorityToggle").on("click", function () {
    if (priority === "true") {
      $(this).attr("src", "../static/images/flag.svg");
      priority = "false";
    } else {
      $(this).attr("src", "../static/images/flag-fill.svg");
      priority = "true";
    }
  });

  $("#inputdate").on("click", function () {
    $("#inputdate").focus();
  });
});
