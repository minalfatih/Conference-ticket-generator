"use strict";

let img = false;
let nameValue = false;
let emailValue = false;
let githubValue = false;

let avatarSrc;

document.getElementById("avatar").onchange = function (e) {
  let selected = e.target.files[0];
  let reader = new FileReader();

  let imgSize = Math.floor(selected.size / 1024);

  let imgTag = document.querySelector(".avatar");
  imgTag.title = selected.name;

  if (
    (imgTag.title.slice(-3) === "jpg") | (imgTag.title.slice(-3) === "png") &&
    imgSize <= 500
  ) {
    reader.onload = function (e) {
      imgTag.src = e.target.result;
      avatarSrc = imgTag.src;
    };

    reader.readAsDataURL(selected);

    if (imgTag.classList.contains("img-added")) {
      document.querySelector(".upload input").classList.remove("remove");
    } else {
      imgTag.classList.add("img-added");
      document.querySelector(".note").classList.add("remove");
      document.querySelector(".upload input").classList.add("remove");
      buttons();

      document.querySelector(".upload input").classList.remove("remove");
      document.querySelector(".upload input").classList.add("active");
    }
    removeErorr("info-box");
    removeErorr("info-error");

    img = true;
  } else {
    activeErorr("info-box");
    activeErorr("info-error");
  }
};

function buttons() {
  let btnsBox = document.createElement("div");
  btnsBox.className = "btns-box";
  document.querySelector(".upload div").appendChild(btnsBox);

  let removeImg = document.createElement("button");
  removeImg.className = "btn";
  removeImg.id = "remove-img";
  removeImg.textContent = "Remove Image";
  btnsBox.appendChild(removeImg);

  let changeImg = document.createElement("button");
  changeImg.className = "btn";
  changeImg.id = "change-img";
  changeImg.textContent = "Change Image";
  btnsBox.appendChild(changeImg);
}

document.addEventListener("click", (e) => {
  if (e.target.id === "remove-img") {
    document.querySelector(".avatar").src = "../assets/images/icon-upload.svg";
    img = false;
    document.querySelector(".note").classList.remove("remove");
    document.querySelector(".upload input").classList.remove("remove");
    document.querySelector(".upload input").classList.remove("active");
    document.querySelector(".avatar").classList.remove("img-added");
    document.querySelector(".btns-box").remove();

    e.preventDefault();
  }
  if (e.target.id === "change-img") {
    document.querySelector(".btns-box").remove();

    document.querySelector(".upload input").classList.remove("remove");
    document.querySelector(".upload input").classList.add("active");

    buttons();
    e.preventDefault();
  }
});

document.forms[0].onsubmit = function (e) {
  let regexName = /\b[a-zA-Z]{2,}/gi;
  let regexEmail = /\w+\@[a-z]+\.(com|net|org)/gi;
  let regexGithub = /@[a-z]+/gi;

  let username = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let githubName = document.getElementById("github-username").value;

  if (img === false) {
    activeErorr("info-error");
    activeErorr("info-box");
  } else {
    removeErorr("info-error");
    removeErorr("info-box");
  }
  if (regexName.test(username) === false) {
    activeErorr("name-error");
  } else {
    removeErorr("name-error");
    nameValue = true;
  }
  if (regexEmail.test(email) === false) {
    activeErorr("email-error");
  } else {
    removeErorr("email-error");
    emailValue = true;
  }
  if (regexGithub.test(githubName) === false) {
    activeErorr("github-error");
  } else {
    removeErorr("github-error");
    githubValue = true;
  }

  if (
    img === true &&
    nameValue === true &&
    emailValue === true &&
    githubValue === true
  ) {
    document.querySelector("form").remove();
    document.querySelector("header h1").remove();
    document.querySelector("header p").remove();
    document.querySelector("header .teckit-info").classList.add("active");
    document.querySelector("header .teckit-info h1 span").textContent =
      username;
    document.querySelector("header .teckit-info p span").textContent = email;

    document.querySelector(".ticket-box").classList.add("active");

    // create ticket info
    document.querySelector(".user-info .user-image").src = avatarSrc;
    document.querySelector(".user-info .username").textContent = username;
    document.querySelector(".user-info .github-name").textContent = githubName;

    // create the ticket #numbers
    let nums = [];
    for (let i = 0; i < 5; i++) {
      let randomNum = Math.floor(Math.random() * 9);
      nums.push(randomNum);
    }
    document.getElementById("num-of-ticket").textContent = `#${nums.join("")}`;
  }

  e.preventDefault();
};

function activeErorr(className) {
  document.getElementById(className).classList.add("active-error");
}

function removeErorr(className) {
  document.getElementById(className).classList.remove("active-error");
}

console.log("amina");

//# sourceMappingURL=main.js.map
