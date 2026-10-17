
let tickets = [
    {
        pnr: "VN001",
        passengerName: "Nguyen Van An",
        flightCode: "VN123",
        seat: "A01",
        ticketClass: "ECONOMY",
        baggageWeight: 25,
        status: "BOOKED"
    },
    {
        pnr: "VN002",
        passengerName: "Tran Thi Binh",
        flightCode: "VN456",
        seat: "B02",
        ticketClass: "BUSINESS",
        baggageWeight: 20,
        status: "BOOKED"
    },
    {
        pnr: "VN003",
        passengerName: "Le Van Cuong",
        flightCode: "VN789",
        seat: "C03",
        ticketClass: "ECONOMY",
        baggageWeight: 15,
        status: "BOOKED"
    }
];

const EXCESS_FEE_PER_KG = 50000;

// Tim ve theo ma PNR
function findTicketByPnr(pnr) {
    for (let i = 0; i < tickets.length; i++) {
        if (tickets[i].pnr.toLowerCase() === pnr.toLowerCase()) {
            return tickets[i];
        }
    }

    return null;
}

// Tinh phi hanh ly qua can
function calculateExcessBaggageFee(ticket, weight) {
    let freeWeight = ticket.ticketClass === "BUSINESS" ? 30 : 20;
    let excessWeight = Math.max(0, weight - freeWeight);

    return excessWeight * EXCESS_FEE_PER_KG;
}

// Hien thi danh sach ve
function listTickets() {
    console.log("\n===== DANH SACH VE MAY BAY =====");

    for (let i = 0; i < tickets.length; i++) {
        console.log(
            tickets[i].pnr + " | " +
            tickets[i].passengerName + " | " +
            tickets[i].flightCode + " | " +
            tickets[i].seat + " | " +
            tickets[i].ticketClass + " | " +
            tickets[i].baggageWeight + " kg | " +
            tickets[i].status
        );
    }
}

// Xuat the len may bay
function displayBoardingPass(ticket, weight, fee) {
    console.log("\n===== BOARDING PASS =====");
    console.log("Ma PNR: " + ticket.pnr);
    console.log("Hanh khach: " + ticket.passengerName);
    console.log("Chuyen bay: " + ticket.flightCode);
    console.log("So ghe: " + ticket.seat);
    console.log("Hang ve: " + ticket.ticketClass);
    console.log("Hanh ly: " + weight + " kg");
    console.log("Phi qua can: " + fee.toLocaleString("vi-VN") + " VND");
    console.log("Trang thai: CHECKED_IN");
    console.log("=========================");
}

// Check-in hanh khach
function checkIn() {
    let pnr = prompt("Nhap ma PNR:");

    if (pnr === null || pnr.trim() === "") {
        console.log("Ma PNR khong duoc de trong!");
        return;
    }

    let ticket = findTicketByPnr(pnr.trim());

    if (ticket === null) {
        console.log("Khong tim thay ve!");
        return;
    }

    if (ticket.status !== "BOOKED") {
        console.log("Ve khong the check-in!");
        return;
    }

    let weightInput = prompt("Nhap can nang hanh ly (kg):");

    if (weightInput === null || weightInput.trim() === "") {
        console.log("Can nang khong hop le!");
        return;
    }

    let weight = Number(weightInput);

    if (!Number.isFinite(weight) || weight < 0) {
        console.log("Can nang phai la so khong am!");
        return;
    }

    let fee = calculateExcessBaggageFee(ticket, weight);

    ticket.baggageWeight = weight;
    ticket.status = "CHECKED_IN";

    console.log("Check-in thanh cong!");
    console.log("Phi hanh ly: " + fee.toLocaleString("vi-VN") + " VND");

    displayBoardingPass(ticket, weight, fee);
}

// Tra cuu ve
function searchTicket() {
    let keyword = prompt("Nhap ma PNR hoac ten hanh khach:");

    if (keyword === null || keyword.trim() === "") {
        console.log("Thong tin tim kiem khong hop le!");
        return;
    }

    keyword = keyword.trim().toLowerCase();
    let found = false;

    for (let i = 0; i < tickets.length; i++) {
        if (
            tickets[i].pnr.toLowerCase() === keyword ||
            tickets[i].passengerName.toLowerCase().includes(keyword)
        ) {
            console.log(tickets[i]);
            found = true;
        }
    }

    if (!found) {
        console.log("Khong tim thay ve!");
    }
}

// Huy ve
function cancelTicket() {
    let pnr = prompt("Nhap ma PNR can huy:");

    if (pnr === null || pnr.trim() === "") {
        console.log("Ma PNR khong hop le!");
        return;
    }

    let ticket = findTicketByPnr(pnr.trim());

    if (ticket === null) {
        console.log("Khong tim thay ve!");
        return;
    }

    if (ticket.status === "CANCELLED") {
        console.log("Ve da duoc huy truoc do!");
        return;
    }

    ticket.status = "CANCELLED";
    console.log("Huy ve thanh cong!");
}

// Ham main
function main() {
    let menuChoice;

    do {
        menuChoice = prompt(
            "===== QUAN LY VE MAY BAY =====\n" +
            "1. Hien thi danh sach ve\n" +
            "2. Check-in va tinh phi hanh ly\n" +
            "3. Tra cuu ve\n" +
            "4. Huy ve\n" +
            "5. Thoat chuong trinh\n" +
            "Nhap lua chon:"
        );

        if (menuChoice === null) {
            break;
        }

        switch (menuChoice.trim()) {
            case "1":
                listTickets();
                break;

            case "2":
                checkIn();
                break;

            case "3":
                searchTicket();
                break;

            case "4":
                cancelTicket();
                break;

            case "5":
                console.log("Ket thuc chuong trinh!");
                break;

            default:
                console.log("Lua chon khong hop le!");
        }
    } while (menuChoice !== "5");
}

main();