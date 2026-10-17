
let athletes = [
  {
    athleteCode: "ATH-001",
    fullName: "Lâm Văn Hải",
    sport: "Bóng Đá",
    age: 21,
    jerseyNumber: 10
  },
  {
    athleteCode: "ATH-002",
    fullName: "Tạ Minh Thư",
    sport: "Bóng Chuyền",
    age: 19,
    jerseyNumber: 7
  },
  {
    athleteCode: "ATH-003",
    fullName: "Đinh Công Phát",
    sport: "Bóng Đá",
    age: 24,
    jerseyNumber: 9
  }
];

// 1. Chuẩn hóa họ tên, môn thi đấu
function normalizeText(rawText) {
  return rawText.trim()
    .replace(/\s+/g, " ")
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// 2. Tìm vị trí vận động viên theo mã
function findAthleteIndex(code) {
  for (let i = 0; i < athletes.length; i++) {
    if (athletes[i].athleteCode === code) {
      return i;
    }
  }
  return -1;
}

// 3. Kiểm tra mã vận động viên
function validateAthleteCode(code) {
  if (code === "") {
    return "Mã vận động viên không được để trống";
  }

  if (code.length < 6) {
    return "Mã vận động viên tối thiểu 6 ký tự";
  }

  if (!code.startsWith("ATH-")) {
    return 'Mã vận động viên phải bắt đầu bằng "ATH-"';
  }

  if (code.includes(" ")) {
    return "Mã vận động viên không được chứa khoảng trắng";
  }

  if (findAthleteIndex(code) !== -1) {
    return "Mã vận động viên đã tồn tại";
  }

  return "";
}

// 4. Nhập số nguyên trong khoảng
function inputIntegerInRange(message, min, max) {
  while (true) {
    let input = prompt(message);

    if (input === null) {
      return null;
    }

    input = input.trim();

    if (input === "") {
      console.log("Lỗi: chưa nhập, nhập lại");
      continue;
    }

    let number = Number(input);

    if (!Number.isInteger(number)) {
      console.log("Lỗi: không phải số nguyên, nhập lại");
      continue;
    }

    if (number < min || number > max) {
      console.log(`Lỗi: ngoài phạm vi ${min} – ${max}, nhập lại`);
      continue;
    }

    return number;
  }
}

// 5. Hiển thị danh sách
function displayAthletes(list) {
  if (list.length === 0) {
    console.log("Danh sách vận động viên trống");
    return;
  }

  for (let i = 0; i < list.length; i++) {
    let athlete = list[i];

    console.log(
      `${i + 1}. ${athlete.athleteCode} - ${athlete.fullName} - ${athlete.sport}`
    );

    console.log(
      `Tuổi: ${athlete.age} | Số áo: ${athlete.jerseyNumber}`
    );
  }

  console.log(`Tổng: ${list.length} vận động viên`);
}

// CASE 1: Hiển thị danh sách
function showAthletes() {
  displayAthletes(athletes);
}

// CASE 2: Thêm vận động viên
function addAthlete() {
  let code;

  while (true) {
    code = prompt("Nhập mã vận động viên:");

    if (code === null) {
      console.log("Đã hủy thao tác thêm");
      return;
    }

    code = code.trim().toUpperCase();

    let error = validateAthleteCode(code);

    if (error !== "") {
      console.log("Lỗi: " + error);
      continue;
    }

    break;
  }

  let fullName;

  while (true) {
    fullName = prompt("Nhập họ tên:");

    if (fullName === null) {
      console.log("Đã hủy thao tác thêm");
      return;
    }

    fullName = normalizeText(fullName);

    if (fullName === "") {
      console.log("Lỗi: họ tên không được để trống");
      continue;
    }

    break;
  }

  let sport;

  while (true) {
    sport = prompt("Nhập môn thi đấu:");

    if (sport === null) {
      console.log("Đã hủy thao tác thêm");
      return;
    }

    sport = normalizeText(sport);

    if (sport === "") {
      console.log("Lỗi: môn thi đấu không được để trống");
      continue;
    }

    break;
  }

  let age = inputIntegerInRange("Nhập tuổi (15 - 40):", 15, 40);

  if (age === null) {
    console.log("Đã hủy thao tác thêm");
    return;
  }

  let jerseyNumber = inputIntegerInRange(
    "Nhập số áo (1 - 99):", 1, 99
  );

  if (jerseyNumber === null) {
    console.log("Đã hủy thao tác thêm");
    return;
  }

  athletes.push({
    athleteCode: code,
    fullName: fullName,
    sport: sport,
    age: age,
    jerseyNumber: jerseyNumber
  });

  console.log("Thêm vận động viên thành công");
  console.log(`Tổng: ${athletes.length} vận động viên`);
}

// CASE 3: Cập nhật vận động viên
function updateAthlete() {
  let code = prompt("Nhập mã vận động viên cần cập nhật:");

  if (code === null) {
    console.log("Đã hủy thao tác cập nhật");
    return;
  }

  code = code.trim().toUpperCase();

  let index = findAthleteIndex(code);

  if (index === -1) {
    console.log(`Không tìm thấy vận động viên có mã ${code}`);
    return;
  }

  let oldAge = athletes[index].age;
  let oldJersey = athletes[index].jerseyNumber;

  let newAge = inputIntegerInRange(
    "Nhập tuổi mới (15 - 40):", 15, 40
  );

  if (newAge === null) {
    console.log("Đã hủy thao tác cập nhật");
    return;
  }

  let newJersey = inputIntegerInRange(
    "Nhập số áo mới (1 - 99):", 1, 99
  );

  if (newJersey === null) {
    console.log("Đã hủy thao tác cập nhật");
    return;
  }

  athletes[index].age = newAge;
  athletes[index].jerseyNumber = newJersey;

  console.log(
    `Trước: Tuổi ${oldAge} | Số áo ${oldJersey}`
  );
  console.log(
    `Sau: Tuổi ${newAge} | Số áo ${newJersey}`
  );
  console.log("Cập nhật thành công");
}

// CASE 4: Xóa vận động viên
function deleteAthlete() {
  let code = prompt("Nhập mã vận động viên cần xóa:");

  if (code === null) {
    console.log("Đã hủy thao tác xóa");
    return;
  }

  code = code.trim().toUpperCase();

  let index = findAthleteIndex(code);

  if (index === -1) {
    console.log(`Không tìm thấy vận động viên có mã ${code}`);
    return;
  }

  let confirmDelete = prompt("Xác nhận xóa (Y/N):");

  if (confirmDelete === null ||
      confirmDelete.trim().toUpperCase() !== "Y") {
    console.log("Đã hủy thao tác xóa");
    console.log(`Còn ${athletes.length} vận động viên`);
    return;
  }

  athletes.splice(index, 1);

  console.log(
    `Xóa thành công, còn ${athletes.length} vận động viên`
  );
}

// CASE 5: Tìm kiếm theo môn thi đấu
function searchAthletes() {
  let keyword = prompt("Nhập từ khóa môn thi đấu:");

  if (keyword === null || keyword.trim() === "") {
    console.log("Chưa nhập từ khóa tìm kiếm");
    return;
  }

  keyword = keyword.trim().toLowerCase();

  let result = athletes.filter(athlete =>
    athlete.sport.toLowerCase().includes(keyword)
  );

  if (result.length === 0) {
    console.log("Không tìm thấy vận động viên phù hợp");
    return;
  }

  displayAthletes(result);
}

// MENU CHƯƠNG TRÌNH
function showMenu() {
  console.log("============================================");
  console.log("HỆ THỐNG QUẢN LÝ VẬN ĐỘNG VIÊN CLB THỂ THAO VICTORY");
  console.log("============================================");
  console.log("1. Hiển thị danh sách vận động viên");
  console.log("2. Thêm vận động viên mới");
  console.log("3. Cập nhật thông tin vận động viên");
  console.log("4. Xóa vận động viên");
  console.log("5. Tìm kiếm vận động viên theo môn thi đấu");
  console.log("0. Thoát chương trình");
  console.log("============================================");
}

// Chạy chương trình
function main() {
  let choice;

  do {
    showMenu();

    let input = prompt("Vui lòng nhập lựa chọn của bạn (0 - 5):");

    if (input === null) {
      console.log("Lựa chọn không hợp lệ");
      continue;
    }

    input = input.trim();

    if (!/^[0-5]$/.test(input)) {
      console.log("Lựa chọn không hợp lệ");
      continue;
    }

    choice = Number(input);

    switch (choice) {
      case 1:
        showAthletes();
        break;

      case 2:
        addAthlete();
        break;

      case 3:
        updateAthlete();
        break;

      case 4:
        deleteAthlete();
        break;

      case 5:
        searchAthletes();
        break;

      case 0:
        console.log("Tạm biệt!");
        break;
    }

  } while (choice !== 0);
}

main();
