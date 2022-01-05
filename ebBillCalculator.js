function EBUnit() {
  
  this.unit = prompt("Enter your current consumption unit");
  
  this._0To100Cost = 0;
  this._101To200Cost = 2;
  this._201To500Cost = 3;
  this._501AboveCost = 6.6;
  this.fixedCost = 30;


  this.calculateBill = function() {
    
    let billAmount = 0;
    if (this.unit > 500) {
      billAmount = 100 * this._0To100Cost + 100 * this._101To200Cost + 300 * this._201To500Cost + (this.unit - 500) * this._501AboveCost + this.fixedCost;
    }
    if (this.unit < 500 && this.unit > 200) {
      billAmount = 100 * this._0To100Cost + 100 * this._101To200Cost + (this.unit - 200) * this._201To500Cost + this.fixedCost;
    }

    if (this.unit < 200 && this.unit > 100) {
      billAmount = 100 * this._0To100Cost + (this.unit - 100) * this._101To200Cost;
    }
    if (this.unit <= 100) {
      billAmount = 0;
    }

    document.write(`Consumed units:   ${this.unit} <br/> <b>Bill Amount:  ${billAmount}.</b><br/><br/>`);

  }

}

var myBill = new EBUnit();
myBill.calculateBill();