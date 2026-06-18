let selectedCategory = localStorage.getItem("selectedCategory") || "전체";

const menus = {
  "한식": [
    { name: "김치찌개", emoji: "🍲" },
    { name: "비빔밥", emoji: "🥗" },
    { name: "불고기", emoji: "🥩" },
    { name: "된장찌개", emoji: "🍚" }
  ],
  "중식": [
    { name: "짜장면", emoji: "🍜" },
    { name: "짬뽕", emoji: "🍜" },
    { name: "탕수육", emoji: "🥢" },
    { name: "마라탕", emoji: "🌶️" }
  ],
  "일식": [
    { name: "초밥", emoji: "🍣" },
    { name: "라멘", emoji: "🍜" },
    { name: "돈카츠", emoji: "🍱" },
    { name: "우동", emoji: "🥢" }
  ],
  "양식": [
    { name: "파스타", emoji: "🍝" },
    { name: "피자", emoji: "🍕" },
    { name: "스테이크", emoji: "🥩" },
    { name: "리조또", emoji: "🍛" }
  ],
  "패스트푸드": [
    { name: "햄버거", emoji: "🍔" },
    { name: "치킨", emoji: "🍗" },
    { name: "감자튀김", emoji: "🍟" },
    { name: "핫도그", emoji: "🌭" }
  ],
  "분식": [
    { name: "떡볶이", emoji: "🌶️" },
    { name: "김밥", emoji: "🍙" },
    { name: "라볶이", emoji: "🍜" },
    { name: "순대", emoji: "🥢" }
  ]
};

function showScreen(screenId) {
  const screens = document.querySelectorAll(".screen");
  screens.forEach(screen => screen.classList.remove("active"));
  document.getElementById(screenId).classList.add("active");
}

function selectCategory(category) {
  selectedCategory = category;
  localStorage.setItem("selectedCategory", category);
  document.getElementById("selectedCategory").innerText =
    "선택된 카테고리: " + category;
}

function recommendMenu() {
  let menuList = [];

  if (selectedCategory === "전체") {
    Object.values(menus).forEach(categoryMenus => {
      menuList = menuList.concat(categoryMenus);
    });
  } else {
    menuList = menus[selectedCategory];
  }

  const randomIndex = Math.floor(Math.random() * menuList.length);
  const selectedMenu = menuList[randomIndex];

  document.getElementById("menuEmoji").innerText = selectedMenu.emoji;
  document.getElementById("menuName").innerText = selectedMenu.name;
}

function signup() {
  const id = document.getElementById("signupId").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const passwordCheck = document.getElementById("signupPasswordCheck").value;
  const message = document.getElementById("signupMessage");

  if (!id || !email || !password || !passwordCheck) {
    message.innerText = "모든 항목을 입력해주세요.";
    return;
  }

  if (!email.includes("@")) {
    message.innerText = "이메일 형식이 올바르지 않습니다.";
    return;
  }

  if (password !== passwordCheck) {
    message.innerText = "비밀번호가 일치하지 않습니다.";
    return;
  }

  const user = {
    id: id,
    email: email,
    password: password
  };

  localStorage.setItem("user", JSON.stringify(user));

  alert("회원가입이 완료되었습니다.");
  showScreen("loginScreen");
}

function login() {
  const loginId = document.getElementById("loginId").value;
  const loginPassword = document.getElementById("loginPassword").value;
  const message = document.getElementById("loginMessage");

  if (!loginId || !loginPassword) {
    message.innerText = "아이디 또는 이메일과 비밀번호를 입력해주세요.";
    return;
  }

  const savedUser = JSON.parse(localStorage.getItem("user"));

  if (!savedUser) {
    message.innerText = "회원정보가 없습니다.";
    return;
  }

  if (loginId !== savedUser.id && loginId !== savedUser.email) {
    message.innerText = "아이디 또는 이메일이 존재하지 않습니다.";
    return;
  }

  if (loginPassword !== savedUser.password) {
    message.innerText = "비밀번호가 틀렸습니다.";
    return;
  }

  localStorage.setItem("loginStatus", "true");
  alert("로그인 성공!");
  showScreen("mainScreen");
}

function showMyPage() {
  const loginStatus = localStorage.getItem("loginStatus");

  if (loginStatus !== "true") {
    alert("로그인이 필요합니다.");
    showScreen("loginScreen");
    return;
  }

  const user = JSON.parse(localStorage.getItem("user"));
  document.getElementById("myInfo").innerText =
    "아이디: " + user.id + "\n이메일: " + user.email;

  showScreen("myPageScreen");
}

function logout() {
  const confirmLogout = confirm("로그아웃 하시겠습니까?");

  if (confirmLogout) {
    localStorage.removeItem("loginStatus");
    alert("로그아웃 되었습니다.");
    showScreen("mainScreen");
  }
}

document.getElementById("selectedCategory").innerText =
  "선택된 카테고리: " + selectedCategory;
