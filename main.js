'use strict'

const assert = require('assert');

// Declaring a class that represents a bank account
class BankAccount {
    //String representing the account number
    accountNumber;
    //String representing the owner of the account
    owner;
    // An array of transactions that show the history of all transactions
    // associated with the account
    transactions;
    constructor(accountNumber, owner) {
        this.accountNumber = accountNumber;
        this.owner = owner;
        // Transactions are represented by empty array and no transactions 
        // have taken place at the creation of the bank account
        this.transactions = []
    }

    // Declaring a method that returns the current balance on the account by
    // adding up the amounts in the transaction array
    balance() {
        let sum = 0;
        // for loop that iterates over the length of the transaction array
        for (let i = 0; i < this.transactions.length; i++) {
            // sum is equal to sum plus each elements amount in the transaction array
            sum += this.transactions[i].amount
        }
        return sum;
    }
    // Declaring a method that that takes in an input of amount, creates a new deposit transaction
    // and pushes it to the transaction array
    deposit(amount) {
        // if statement that states if the deposit is a positive amount, it will perform the if statement, 
        // if it is not true, will simply return out of it
        if (amount > 0) {
            // create an new variable fo deposits that is equal to a new transaction
            let deposits = new Transaction(amount, this.owner)
            // the new deposit transaction is pushed to the transactions array
            this.transactions.push(deposits)
        }
    }
    // Declaring a method that that takes in an inputs of amount and payee, creates a new charge transaction
    // and pushes it to the transaction array
    charge(payee, amount) {
        // if statement that states if the result of the charge account remains a positive number or equal to zero, 
        // it will perform the if statement, if it is not true, will simply return out of it
        if (amount <= this.balance()) {
            // create an new variable fo deposits that is equal to a new transaction and where the transaction occurred.
            // negative amount as a charge amount would be deducting money from the account
            let charges = new Transaction(-amount, payee)
            // the new charge transaction is pushed to the transactions array
            this.transactions.push(charges)
        }
    }

}
//Declaring a class that represents each transaction
class Transaction {
    // the amount of the transaction.  Positive transactions are added as deposits into
    // the account, while negative transactions are removed from the account as charges.
    amount;
    // Description of the transaction.  Where a charge was made or the payee for a deposit
    payee;
    //Date of the transaction which set automatically by calling new Date()
    date
    constructor(amount, payee) {
        this.amount = amount;
        this.payee = payee;
        this.date = new Date();
    }
}
// Declaring a Savings account that extends BankAccount by bringing in accountNumber and owner from it
class SavingsAccount extends BankAccount {
    // account information extended from BankAccount
    accountNumber;
    // owner information extended from BankAccount
    owner;
    // The rate in which the account earns interest
    interestRate;
    constructor(accountNumber, owner, interestRate) {
        super(accountNumber, owner)
        this.interestRate = interestRate
    }
    // Declaring a method that that calculates the interest earned on the account
    // and pushes it to the transaction array
    accrueInterest() {
        // Interest calculated by multiplying balance of account times the interest rate
        let accruedInterest = this.balance() * this.interestRate
        // create an new variable for interest earned that is equal to a new transaction
        let interest = new Transaction(accruedInterest, "interest")
        // the interest earned is pushed to the transactions array
        this.transactions.push(interest)
    }
}


//Tests

if (typeof describe === 'function') {
    describe('Bank Account Info Test', function () {

        it('should have an account number, owner, and empty transaction', function () {
            const a = new BankAccount('123456', 'John Doe');
            assert.equal(a.accountNumber, '123456');
            assert.equal(a.owner, 'John Doe');
            assert.equal(a.balance(), 0);
        });
    });

    describe('Transaction Tests', function () {
        it('should be able to take a deposit', function () {
            const t = new Transaction(30, 'John Doe');

            assert.equal(t.amount, 30);
            assert.equal(t.payee, 'John Doe')

        });

        it('should be able to take a charge', function () {
            const t = new Transaction(-30, 'Walmart');

            assert.equal(t.amount, -30);
            assert.equal(t.payee, 'Walmart')

        });

        it('should not be able to have charges more than the balance', function () {
            const a = new BankAccount('123456', 'John Doe');
            assert.equal(a.balance(), 0)
            a.charge('Walmart', 60)

            assert.equal(a.balance(), 0)

        });
    });

    describe("Deposit Test", function () {
        let a = new BankAccount('123456', 'John Doe')

        it('should be able to take deposits and update balance', function () {
            a.deposit(50);
            a.deposit(100);
            assert.equal(150, a.balance())
        })
    })

    describe("Test Transactions", function () {
        let a = new BankAccount('123456', 'John Doe')

        it('should be able to take deposit and charges update balance', function () {
            a.deposit(500);
            a.charge('Walmart', 50.50); // 449.50
            a.charge('Target', 26)// 423.50
            a.charge('Home Depot', 200)//223.50
            assert.equal(223.50, a.balance())
        })
    })

    describe("Interest on Savings", function () {

        it('should be able to deposit interest into savings account', function () {
            let a2 = new SavingsAccount('12345678', 'John Doe', 0.03)
            a2.deposit(20000);
            a2.accrueInterest();
            assert.equal(20600, a2.balance())
        })
    })





}