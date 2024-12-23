// 입장 버튼 클릭 시
document.querySelector(".table").addEventListener("click", (e) => {
  // data-id, data-pasword 가져오기
  const id = e.target.dataset.id;
  const password = e.target.dataset.password;

  if (password == "true") {
    // passowrd 가 있다면 prompt(비밀번호를 입력하세요)
    const pwd = prompt("비밀번호를 입력하세요");
    location.href = `/room/${id}?password=${pwd}`;
  } else {
    // password 가 없다면 `/room/${id}`
    location.href = `/room/${id}`;
  }
});

//소켓을 통해서 넘어오는 새 방 정보를 출력
socket.on("newRoom", (data) => {
  console.log(data);

  let room = `<tr data-id="${data._id}">`;
  room += `<th scope="row">${data._id}</th>`;
  room += `<td>${data.title}</td>`;
  room += `<td>${data.password ? "비밀방" : "공개방"}</td>`;
  room += `<td>${data.max}</td>`;
  room += `<td style="color:${data.owner}">${data.owner}</td>`;
  room += `<td><button class="btn btn-sm btn-outline-success">입장</button></td>`;
  room += `</tr>`;

  document.querySelector("table tbody").insertAdjacentHTML("beforeend", room);
});

socket.on("removeRoom", (roomId) => {
  document.querySelectorAll("tbody tr").forEach((tr) => {
    if (tr.dataset.id == roomId) {
      tr.remove();
    }
  });
});
