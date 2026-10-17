
let passengers = [
    {
        pnrCode: "VN001",
        passengerName: "Nguyen Van An",
        idNumber: "012345678901",
        flightNumber: "VN123",
        seatNumber: "",
        isCheckedIn: false
    },
    {
        pnrCode: "VN002",
        passengerName: "Tran Thi Binh",
        idNumber: "A1234567",
        flightNumber: "VN123",
        seatNumber: "",
        isCheckedIn: false
    }
];

let availableSeats = ["12A", "12B", "12C", "14A", "14B", "14C"];

// Tim hanh khach theo PNR
function findPassenger(pnrCode) {
    for (let i = 0; i < passengers.length; i++) {
        if (passengers[i].pnrCode.toLowerCase() === pnrCode.toLowerCase()) {
            return passengers[i];
        }
    }

    return null;
}

// Kiem tra CCCD hoac ho chieu
function validateIdNumber(idNumber) {
    let cccdPattern = /^\d{12}$/;
    let passportPattern = /^[A-Za-z]\d{7,8}$/;

    return cccdPattern.test(idNumber) || passportPattern.test(idNumber);
}

// Cap ghe trong theo chuyen bay
function assignSeat(flightNumber) {
    for (let i = 0; i < availableSeats.length; i++) {
        let seatTaken = false;

        for (let j = 0; j < passengers.length; j++) {
            if (
                passengers[j].flightNumber === flightNumber &&
                passengers[j].seatNumber === availableSeats[i]
            ) {
                seatTaken = true;
                break;
            }
        }

        if (!seatTaken) {
            return availableSeats[i];
        }
    }

    return null;
}

// Hien thi danh sach hanh khach
function displayPassengers() {
    console.log("\n========== DANH SACH HANH KHACH ==========");

    for (let i = 0; i < passengers.length; i++) {
        console.log(
            passengers[i].pnrCode + " | " +
            passengers[i].passengerName + " | " +
            passengers[i].flightNumber + " | " +
            (passengers[i].seatNumber || "Chua co ghe") + " | " +
            (passengers[i].isCheckedIn ? "Da check-in" : "Chua check-in")
        );
    }
}

// Them ho so hanh khach
function addPassenger() {
    let pnrCode = prompt("Nhap ma PNR:");

    if (pnrCode === null || pnrCode.trim() === "") {
        console.log("Ma PNR khong hop le!");
        return;
    }

    pnrCode = pnrCode.trim();

    if (findPassenger(pnrCode) !== null) {
        console.log("Ma PNR da ton tai!");
        return;
    }

    let passengerName = prompt("Nhap ho ten hanh khach:");

    if (passengerName === null || passengerName.trim() === "") {
        console.log("Ho ten khong hop le!");
        return;
    }

    let idNumber = prompt("Nhap CCCD hoac ho chieu:");

    if (idNumber === null || !validateIdNumber(idNumber.trim())) {
        console.log("CCCD hoac ho chieu khong dung dinh dang!");
        return;
    }

    idNumber = idNumber.trim();

    for (let i = 0; i < passengers.length; i++) {
        if (passengers[i].idNumber === idNumber) {
            console.log("Giay to nay da duoc dang ky!");
            return;
        }
    }

    let flightNumber = prompt("Nhap so hieu chuyen bay:");

    if (flightNumber === null || flightNumber.trim() === "") {
        console.log("So hieu chuyen bay khong hop le!");
        return;
    }

    passengers.push({
        pnrCode: pnrCode,
        passengerName: passengerName.trim(),
        idNumber: idNumber,
        flightNumber: flightNumber.trim().toUpperCase(),
        seatNumber: "",
        isCheckedIn: false
    });

    console.log("Them ho so thanh cong!");
}

// In the len may bay
function displayBoardingPass(passenger) {
    console.log("\n========================================");
    console.log("             BOARDING PASS");
    console.log("========================================");
    console.log("PASSENGER : " + passenger.passengerName);
    console.log("PNR CODE  : " + passenger.pnrCode);
    console.log("FLIGHT    : " + passenger.flightNumber);
    console.log("SEAT      : " + passenger.seatNumber);
    console.log("STATUS    : CHECKED IN");
    console.log("----------------------------------------");
    console.log("BARCODE   : ||| || |||| | ||| || ||||");
    console.log("========================================");
}

// Check-in hanh khach
function checkInPassenger() {
    let pnrCode = prompt("Nhap ma PNR can check-in:");

    if (pnrCode === null || pnrCode.trim() === "") {
        console.log("Ma PNR khong hop le!");
        return;
    }

    let passenger = findPassenger(pnrCode.trim());

    if (passenger === null) {
        console.log("Khong tim thay ho so!");
        return;
    }

    if (passenger.isCheckedIn) {
        console.log("Hanh khach da check-in!");
        return;
    }

    if (!validateIdNumber(passenger.idNumber)) {
        console.log("Giay to khong hop le!");
        return;
    }

    let seatNumber = assignSeat(passenger.flightNumber);

    if (seatNumber === null) {
        console.log("Chuyen bay da het ghe!");
        return;
    }

    passenger.seatNumber = seatNumber;
    passenger.isCheckedIn = true;

    console.log("Xac thuc giay to thanh cong!");
    console.log("Doi chieu chuyen bay: " + passenger.flightNumber);
    console.log("Cap ghe thanh cong: " + seatNumber);

    displayBoardingPass(passenger);
}

// Tra cuu hanh khach
function searchPassenger() {
    let keyword = prompt("Nhap PNR hoac ten hanh khach:");

    if (keyword === null || keyword.trim() === "") {
        console.log("Thong tin tim kiem khong hop le!");
        return;
    }

    keyword = keyword.trim().toLowerCase();
    let found = false;

    for (let i = 0; i < passengers.length; i++) {
        if (
            passengers[i].pnrCode.toLowerCase() === keyword ||
            passengers[i].passengerName.toLowerCase().includes(keyword)
        ) {
            console.log(passengers[i]);
            found = true;
        }
    }

    if (!found) {
        console.log("Khong tim thay hanh khach!");
    }
}

// Ham main
function main() {
    let choice;

    do {
        choice = prompt(
            "===== QUAN LY HO SO HANH KHACH =====\n" +
            "1. Hien thi danh sach hanh khach\n" +
            "2. Them ho so hanh khach\n" +
            "3. Check-in va in Boarding Pass\n" +
            "4. Tra cuu hanh khach\n" +
            "5. Thoat\n" +
            "Nhap lua chon:"
        );

        if (choice === null) {
            break;
        }

        switch (choice.trim()) {
            case "1":
                displayPassengers();
                break;

            case "2":
                addPassenger();
                break;

            case "3":
                checkInPassenger();
                break;

            case "4":
                searchPassenger();
                break;

            case "5":
                console.log("Ket thuc chuong trinh!");
                break;

            default:
                console.log("Lua chon khong hop le!");
        }
    } while (choice !== "5");
}

main();
