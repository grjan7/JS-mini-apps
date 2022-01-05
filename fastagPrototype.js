/**
*
* Fastag: a simple prototype for Fastag transaction; run this in Firfox Console
* This code is not for real world application of Fastag.
*
*/
function Fastag() {
  //properties

  this._id = 0;
  this._transactions = [];
  this._balance = 0;

  //methods

  this.pushDataToTransactions = function (transType, amount) {
    this._transactions.push({
      type: transType,
      date: new Date(),
      amount: Number(amount).toFixed(2),
      balance: this._balance
    });
  };

  this._credit = function (amount) {
    this._balance += amount;
    this.pushDataToTransactions("cr", amount);
    this.sendNotification();
  };

  this._debit = function (amount) {
    this._balance -= amount;
    this.pushDataToTransactions("db", amount);
    this.sendNotification();
  };

  this.sendNotification = function () {
    let transactionDetail = this._transactions[this._transactions.length - 1];
    let transactionType = "";

    transactionType = transactionDetail.type == "cr" ? "credit" : transactionDetail.type == "db" ? "debit" : "";

    document.write(`<p style="width:50%">INR ${Number(transactionDetail.amount).toFixed(2)}  ${transactionType}ed from A/c no. ${this._id} on ${transactionDetail.date.toLocaleString()} at --location--. Avl Bal: INR ${Number(this._balance).toFixed(2)}. Call 123456789, if not done by you. </p>`);
  };

}

//creating new fastag account

var fastag1 = new Fastag();

// Testing: excuting transcations

fastag1._credit(1000);
fastag1._debit(65);
fastag1._debit(35);
fastag1._credit(500);
fastag1._debit(65);
fastag1._debit(65);


