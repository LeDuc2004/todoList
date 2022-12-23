
// Exercise 04

// Read
function getTodo() {
  fetch("http://localhost:3000/api/v1/todos")
    .then((rep) => rep.json())
    .then((data) => arr(data));
  function arr(data) {
    let result = "";
    let sundone = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].completed) {
        result += `
        <div  onclick="deleteun(${i})"  class="chalist" style="display:flex">
        <div class="sun" style="text-decoration: line-through;" >${data[i].title}</div>
        <i onclick="deleteSun(${i})" style="" class="fa-solid fa-trash"></i>
        </div>
        
        `;
      } else {
        sundone += 1;

        result += `
            <div  onclick="deleteun(${i})"  class="chalist" style="display:flex">
            <div class="sundone"  >${data[i].title}</div>
            <i onclick = "deleteSun(${i})" class="fa-solid fa-trash"></i>
            </div>
            `;
      }
    }
    document.getElementById("numberOne").innerHTML = sundone;
    document.getElementById("list").innerHTML = result;
  }
}
getTodo();

// Post
function addTodo() {
  fetch("http://localhost:3000/api/v1/todos")
    .then((rep) => rep.json())
    .then((data) => arr1(data));
  function arr1(data) {
    let doituong = {
      userId: 7,
      id: 128,
      title: `${document.getElementById("ip").value}`,
      completed: false,
    };
    data.unshift(doituong);

    fetch("http://localhost:3000/receive", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(data)
      .catch((err) => console.log(err));
    document.getElementById("ip").value = "";
    getTodo();
  }
}

// Put

function deleteun(num) {
  fetch("http://localhost:3000/api/v1/todos")
    .then((rep) => rep.json())
    .then((data) => arr1(data));
  function arr1(data) {
    for (let i = 0; i < data.length; i++) {
      if (i == num) {

        data[i].completed = true

      }
    }

    fetch("http://localhost:3000/receive", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(data)
      .catch((err) => console.log(err));
    document.getElementById("ip").value = "";
    getTodo();
  }
}


// Delete

function deleteSun(num) {
  fetch("http://localhost:3000/api/v1/todos")
    .then((rep) => rep.json())
    .then((data) => arr1(data));
  function arr1(data) {
    for (let i = 0; i < data.length; i++) {
      if (Number(i) == num) {
        data.splice(i, 1);
      }
    }

    fetch("http://localhost:3000/receive", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(data)
      .catch((err) => console.log(err));
    document.getElementById("ip").value = "";
    getTodo();
  }
}

// clearAll
function clearAll() {
  fetch("http://localhost:3000/api/v1/todos")
    .then((rep) => rep.json())
    .then((data) => arr1(data));
  function arr1(data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].completed == false) {
        data.splice(i, 1);
      } 
    }
    fetch("http://localhost:3000/receive", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(data)
      .catch((err) => console.log(err));

    getTodo();
  }
}






