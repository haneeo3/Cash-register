// Global variables
let price = 19.5;  // Example price
let cid = [
    ["PENNY", 0.5],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
];

// Event listener for the purchase button
document.getElementById("purchase-btn").addEventListener("click", function() {
    let cash = parseFloat(document.getElementById("cash").value); // Get the value entered

    if (cash < price) {
        alert("Customer does not have enough money to purchase the item");
    } else if (cash === price) {
        document.getElementById("change-due").innerText = "No change due - customer paid with exact cash";
    } else {
        let changeDue = cash - price;
        let totalCid = cid.reduce((acc, denom) => acc + denom[1], 0).toFixed(2);

        if (totalCid < changeDue) {
            document.getElementById("change-due").innerText = "Status: INSUFFICIENT_FUNDS";
        } else {
            let changeArray = calculateChange(changeDue, cid);
            if (changeArray.length === 0) {
                document.getElementById("change-due").innerText = "Status: INSUFFICIENT_FUNDS";
            } else if (parseFloat(totalCid) === parseFloat(changeDue)) {
                // Return all cash and mark register as CLOSED
                document.getElementById("change-due").innerText = `Status: CLOSED ${formatChange(changeArray)}`;
            } else {
                document.getElementById("change-due").innerText = `Status: OPEN ${formatChange(changeArray)}`;
            }
        }
    }
});

// Function to calculate change based on available denominations in the drawer
function calculateChange(changeDue, cid) {
    let change = [];
    let denominations = [
        { name: "ONE HUNDRED", value: 100 },
        { name: "TWENTY", value: 20 },
        { name: "TEN", value: 10 },
        { name: "FIVE", value: 5 },
        { name: "ONE", value: 1 },
        { name: "QUARTER", value: 0.25 },
        { name: "DIME", value: 0.10 },
        { name: "NICKEL", value: 0.05 },
        { name: "PENNY", value: 0.01 }
    ];

    for (let denom of denominations) {
        let denomName = denom.name;
        let denomValue = denom.value;
        let amountAvailable = cid.find(currency => currency[0] === denomName)[1];

        let denomCount = 0;
        while (changeDue >= denomValue && amountAvailable > 0) {
            denomCount++;
            changeDue = (changeDue - denomValue).toFixed(2);
            amountAvailable = (amountAvailable - denomValue).toFixed(2);
        }

        if (denomCount > 0) {
            change.push([denomName, denomCount * denomValue]);
        }
    }

    if (changeDue > 0) {
        return [];
    } else {
        return change;
    }
}

// Function to format the change array for display
function formatChange(changeArray) {
    return changeArray.map(denom => `${denom[0]}: $${denom[1].toFixed(2)}`).join(" ");
}
