import inquirer from "inquirer";
const openingBalance = Math.floor(Math.random() * 100000);
console.log(openingBalance);
const answers = await inquirer.prompt([
    {
        type: "input",
        name: "UserId",
        message: "Please enter your authorized Id: "
    },
    {
        type: "password",
        name: "UserPin1",
        message: "Please enter your valid Pin Code: ",
    },
    {
        type: "password",
        name: "UserPin2",
        message: "Please enter your Pin Code again: "
    },
    {
        type: "list",
        name: "AccountType",
        choices: ["Current", "PLS Saving", "Default"],
        message: "Please select your Account Type: ",
        when(answers) {
            if (answers.UserPin1 === answers.UserPin2) {
                if (answers.UserId && answers.UserPin1) {
                    console.log("Account verified, Please proceed further!");
                }
                return answers;
            }
            else {
                console.log('Sorry, invalid Pin');
            }
        }
    },
    {
        type: "list",
        name: "TransactionType",
        choices: ["Fast Cash", "Withdraw", "Balance"],
        message: "Please select your Transaction Type: ",
        when(answers) {
            return answers.AccountType;
        }
    },
    {
        type: "list",
        name: "Amount",
        choices: [1000, 2000, 5000, 10000, 20000],
        message: "Please select your Amount: ",
        when(answers) {
            return answers.TransactionType == "Fast Cash";
        }
    },
    {
        type: "number",
        name: "Amount",
        message: "Please enter your Amount: ",
        when(answers) {
            return answers.TransactionType == "Withdraw";
        }
    },
    {
        type: "expand",
        name: "Balance",
        when(answers) {
            if (answers.TransactionType === "Balance") {
                console.log(`Your current Balance is: Rs.${openingBalance.toString()}/-`);
            }
        }
    }
]);
if (answers.TransactionType == "Fast Cash" || answers.TransactionType == "Withdraw") {
    const enteredAmount = answers.Amount;
    if (enteredAmount <= openingBalance) {
        console.log(`Transaction successful!`);
        const closingBalance = openingBalance - enteredAmount;
        console.log(`Your closing Balance is: Rs.${closingBalance}/-`);
        console.log("Thank you!");
    }
    else {
        console.log("Oops! Insufficient Balance");
    }
}
