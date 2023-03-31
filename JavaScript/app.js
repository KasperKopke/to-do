const listItems = [];

function deSend() {
  document.querySelector(".fa-arrow-down-a-z").classList.toggle("desend");
}

function addItem(name, isDone) {
  let item = {
    name: name,
    isDone: isDone,
  };

  listItems.push(item);

  showItems(listItems);
}

function showItems(listItems) {
  let ulTag = document.querySelector(".todo ul#ull");
  while (ulTag.firstChild) {
    ulTag.removeChild(ulTag.firstChild);
  }

  for (let index = 0; index < listItems.length; index++) {
    let liTag = document.createElement("li");
    let iTagCircle = document.createElement("i");
    iTagCircle.classList.add("fa-solid");
    iTagCircle.classList.add("fa-circle");

    let iTagCircleCheck = document.createElement("i");
    iTagCircleCheck.classList.add("fa-solid");
    iTagCircleCheck.classList.add("fa-circle-check");

    let pTag = document.createElement("p");
    pTag.innerText = listItems[index].name;

    let iTagEllipsis = document.createElement("i");
    iTagEllipsis.classList.add("fa-solid");
    iTagEllipsis.classList.add("fa-ellipsis");

    liTag.appendChild(iTagCircle);
    liTag.appendChild(iTagCircleCheck);
    liTag.appendChild(pTag);
    liTag.appendChild(iTagEllipsis);

    if (listItems[index].isDone) {
      liTag.classList.add("done");
    }

    liTag.addEventListener("click", function () {
      if (liTag.classList.contains("done")) {
        liTag.classList.remove("done");
        listItems[index].isDone;
      } else {
        liTag.classList.add("done");
        listItems[index].isDone;
      }
    });

    ulTag.appendChild(liTag);
  }
}

showItems(listItems);

const addBtn = document.getElementById("addbtn");
const inputField = document.getElementById("newList");

addBtn.addEventListener("click", () => {
  if (inputField.value.trim() !== "") {
    // Trim er til at gøre så man ikke kan tiføje en li med et mellemrum
    // og !== "" der må ikke være noget inde i input fæltet hvis den skal tilføje
    addItem(inputField.value, false);
    inputField.value = "";
  }
});

const getThem = document.getElementsByClassName("litagss");

for (let i = 0; i < getThem.length; i++) {
  console.log(getThem[i]);
}

const sortBtn = document.querySelector(".fa-arrow-down-a-z");
let sortOrder = "asending";

sortBtn.addEventListener("click", (event) => {
  if (sortOrder === "asending") {
    function compare(a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    }
    listItems.sort(compare);
    sortOrder = "descending";
  } else {
    // sorter fra Z til A
    function compare(a, b) {
      if (a.name > b.name) {
        return -1;
      }
      if (a.name < b.name) {
        return 1;
      }
      return 0;
    }
    listItems.sort(compare);
    sortOrder = "asending";
  }

  showItems(listItems);
});

function burgerMenu() {
  document.querySelector("nav").classList.toggle("active");
}

addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const newList = document.getElementById("newList").value;
  const lists = JSON.parse(localStorage.getItem("lists")) || [];
  lists.push(newList);
  localStorage.setItem("lists", JSON.stringify(lists));
  createList();
  document.getElementById("newList").value = "";
});

function createList() {
  const lists = JSON.parse(localStorage.getItem("lists")) || [];
  const ul = document.getElementById("ull");
  ul.innerHTML = "";
  for (let i = 0; i < lists.length; i++) {
    const li = document.createElement("li");
    li.innerHTML = `
      <p>${lists[i]}</p>
      <i class="fa-solid fa-ellipsis"></i>
      <i class="fa-solid fa-circle"></i>
      <i class="fa-solid fa-circle-check"></i>
    `;
    ul.appendChild(li);
  }
}

window.onload = function () {
  createList();
};
