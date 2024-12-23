// upload 시 첨부파일 가져와서 보내기
document.querySelector("#upload").addEventListener("change", (e) => {
  const files = e.target.files;

  console.log(files);

  const formData = new FormData();
  formData.append("img", files[0]);

  console.log(formData.get("img"));

  axios
    .post(`/room/${roomId}/img`, formData)
    .then(() => (e.target.file.value = ""))
    .catch((err) => console.log(err));
});

// 같은 채팅방에게 보여주기

// send 클릭 시 사용자가 작성한 메세지 가져오기(submit 중지)
// 작성한 메세지 보내기(axios)
document.querySelector("#chat-form").addEventListener("submit", (e) => {
  e.preventDefault();

  // 비동기 식으로 서버 통신하기
  // ajax
  // 1) fetch().then().then().catch()
  // 2) axios().then().catch()

  // 비동기

  if (e.target.chat.value) {
    axios
      .post(`/room/${roomId}/chat`, {
        chat: e.target.chat.value,
      })
      .then(() => (e.target.chat.value = ""))
      .catch((err) => console.log(err));
  }
});

// 채팅메세지/이미지 화면에 보여주기
socket.on("chat", (data) => {
  console.log("chat ", data);

  // 누가 작성한 것인가? (작성자 == 본인)
  let result = "";
  if (data.user == `${user}`) {
    result = `<li class="mine" style="color:${data.user}">`;
  } else {
    result = `<li class="other">`;
  }

  // chat 메세지가 있다면
  if (data.chat) {
    result += `<p>${data.chat}</p>`;
    result += `<span class="user">${data.user}</span>`;
    result += `</li>`;
  } else {
    // 이미지가 전송된 경우
    let img = `<img src="/img/${data.img}" style="width:100px;height:100px">`;
    document.querySelector(".msg-body ul").insertAdjacentHTML("beforeend", img);
  }

  document
    .querySelector(".msg-body ul")
    .insertAdjacentHTML("beforeend", result);
});

// 입,퇴장 정보 받기
socket.on("join", (data) => {
  console.log(data);

  const joinMember = document.querySelector(".chat-list");
  let result = `<span class="text-primary d-inline-block">${data.chat}</span>`;
  joinMember.insertAdjacentHTML("beforeend", result);
});

socket.on("exit", (data) => {
  console.log(data);

  const joinMember = document.querySelector(".chat-list");
  let result = `<span class="text-danger d-inline-block">${data.chat}</span>`;
  joinMember.insertAdjacentHTML("beforeend", result);
});
