function addToday(ref_num, username, data, date, priority) {
  if (priority === "true") {
    $("#list-today").prepend(`
          <div class="card">
            <div class="card-body single-card">
              <span class="split">
                  <h5 class="card-title info">${username}</h5>
                  <p class="card-text info">
                    ${date}
                  </p> 
              </span>
            
              <span class="split">
                <image src="../static/images/flag-fill.svg" class="icons">
                <div class="btn-group" id="${ref_num}">
                  <button type="button" class="btn btn-outline-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    Options
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#" id="edit-form">Edit</a></li>
                    <li><a class="dropdown-item" href="#" id="remove" onclick=deleteCard(this)>Remove</a></li>
                  </ul>
                  <button type="button" class="btn btn-outline-success" onclick=deleteCard(this)>
                      Complete
                  </button>
                </div>
              </span>  
            </div>
          </div>`);
  } else {
    $("#list-today").append(`
          <div class="card">
            <div class="card-body single-card">
              <span class="split">
                  <h5 class="card-title info">${username}</h5>
                  <p class="card-text info">
                  ${date}
                </p> 
              </span> 
              <span class="split">
                <div class="btn-group" id="${ref_num}">
                  <button type="button" class="btn btn-outline-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    Options
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#" id="edit-form">Edit</a></li>
                    <li><a class="dropdown-item" href="#" id="remove" onclick=deleteCard(this)>Remove</a></li>
                  </ul>
                  <button type="button" class="btn btn-outline-success" onclick=deleteCard(this)>
                      Complete
                  </button>
                </div>
              </span>  
            </div>
          </div>`);
  }
}

function addUpcoming(ref_num, username, data, date, priority) {
  if (priority === "true") {
    $("#list-upcoming").prepend(`
          <div class="card">
            <div class="card-body single-card">
              <span class="split">
                  <h5 class="card-title info">${username}</h5>
                  <p class="card-text info">
                    ${date}
                  </p> 
              </span>
  
              <span class="split">
                <image src="../static/images/flag-fill.svg" class="icons">
                <div class="btn-group" id="${ref_num}">
                  <button type="button" class="btn btn-outline-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    Options
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#" id="edit-form">Edit</a></li>
                    <li><a class="dropdown-item" href="#" id="remove" onclick=deleteCard(this)>Remove</a></li>
                  </ul>
                  <button type="button" class="btn btn-outline-success" onclick=deleteCard(this)>
                      Complete
                  </button>
                </div>
              </span>  
            </div>
          </div>`);
  } else {
    $("#list-upcoming").append(`
          <div class="card">
            <div class="card-body single-card">
              <span class="split">
                  <h5 class="card-title info">${username}</h5>
                  <p class="card-text info">
                    ${date}
                  </p> 
              </span>
              <span class="split">
                <div class="btn-group" id="${ref_num}">
                  <button type="button" class="btn btn-outline-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    Options
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#" id="edit-form">Edit</a></li>
                    <li><a class="dropdown-item" href="#" id="remove" onclick=deleteCard(this)>Remove</a></li>
                  </ul>
                  <button type="button" class="btn btn-outline-success" onclick=deleteCard(this)>
                      Complete
                  </button>
                </div>
              </span>  
            </div>
          </div>`);
  }
}

function flags(priority, count) {
  if (priority === "true")
    $(`#optFlags${count}`).prepend(
      `<image src="../static/images/flag-fill.svg" class="icons">`
    );
}

function deleteCard(card) {
  let ref = {
    ref_num: $(card).closest("div").attr("id"),
  };
  $.ajax({
    type: "DELETE",
    url: "/delete",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(ref),
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

function getDate() {
  let date = new Date();
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

function checkDate() {
  let date = new Date();
  let year = date.getFullYear().toString();
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

function display(data) {
  let today = checkDate();
  for (doc of data) {
    if (doc[1].date === today) {
      addToday(doc[0], doc[1].name, doc[1].task, doc[1].date, doc[1].priority);
    } else {
      addUpcoming(
        doc[0],
        doc[1].name,
        doc[1].task,
        doc[1].date,
        doc[1].priority
      );
    }
  }
}

$(document).ready(() => {
  display(data);
  $(".todayList").append(`<span class="dateToday">${getDate()}</div>`);
  $(document).on("click", "#edit-form", function (event) {
    event.preventDefault();
    ref_num = $(this).closest("div").attr("id");
    window.location.assign(`/edit/${ref_num}`);
  });
  $("#add-form").click((event) => {
    event.preventDefault();
    window.location.assign(`/edit/new`);
  });
});
