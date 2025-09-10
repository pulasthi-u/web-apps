function getDate() {
    var date = new Date();
    var retDate = date.getDate() + "/" + (parseInt(date.getMonth())+1).toString() + "/" + date.getFullYear();
    return retDate;
}

var DEBIT = 0;
var CREDIT = 1;

function Account(name, increasesWith, isContra = false) {
    this.name = name;
    this.debits = [[], [], [], []];
    this.credits = [[], [], [], []];
    this.increasesWith = increasesWith;
    this.isContra = isContra;
    this.debit = function(value, otherAccount, description = "") {
        this.debits[0].push(getDate());
        this.debits[2].push(otherAccount);
        this.debits[3].push(description);
        if (this.increasesWith == DEBIT) {
            this.debits[1].push(value);
        } else {
            this.debits[1].push(-value);
        }
    }
    this.credit = function(value, otherAccount, description = "") {
        this.credits[0].push(getDate());
        this.credits[2].push(otherAccount);
        this.credits[3].push(description);
        if (this.increasesWith == CREDIT) {
            this.credits[1].push(value);
        } else {
            this.credits[1].push(-value);
        }
    }
    this.getAccountBalance = function() {
        return (this.debits[1].reduce(function(total, value){return total+value;})) + (this.credits[1].reduce(function(total, value){return total+value;}));
    }
}

function Asset(name) {
    Account.call(this, name, DEBIT);
}

function Cash() {
    Asset.call(this, "CASH ACCOUNT");
}

function Inventory() {
    
}

function AccountReceivable(name) {
    Asset.call(this, name);
}

function Liability(name) {
    Account.call(this, name, CREDIT);
}

function Equity(name) {
    Account.call(this, CREDIT);
}

function Revenue(name) {
    Account.call(this, CREDIT);
}

function Expense(name) {
    Account.call(this, DEBIT);
}

function Stakeholder(name, email) {
    this.name = name;
    this.email = email;
}

function Customer(name, email) {
    Stakeholder.call(this, name, email);
    this.cashAccount = Cash();
    this.creditAccount = AccountReceivable(name);
    this.sellGoods = function(basis, good) {
        
    }
}