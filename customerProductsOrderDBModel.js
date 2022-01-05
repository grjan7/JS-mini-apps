var productList = [];

function Products(prodName, prodDetails, unit, price, discount) {
  this.prodId = productList.length + 1;
  this.prodName = prodName;
  this.prodDetails = prodDetails;
  this.prodUnit = unit;
  this.prodPrice = price;
  this.prodDiscount = discount;
  productList.push({
    prodID: this.prodId,
    prodName: this.prodName,
    prodDetails: this.prodDetails,
    prodUnit: this.prodUnit,
    prodPrice: this.prodPrice,
    prodDiscount: this.prodDiscount
  });
}
var orderList = [];

function Orders(custID, prodID, quantity) {
  this.orderNumber = orderList.length + 1;
  this.custID = custID;
  this.prodID = prodID;
  this.quantity = quantity;
  this.unitPrice = 0;
  this.discountPercent = 0;
  this.finalPrice = 0;
  this.setProductDetails = function() {
    for (let prod = 0; prod < productList.length; prod++) {
      if (productList[prod].prodID === this.prodID) {
        this.unitPrice = productList[prod].prodPrice;
        this.discountPercent = productList[prod].prodDiscount;
      }
    }
  }
  this.setProductDetails();
  this.setFinalPrice = function() {
    this.finalPrice = (this.unitPrice - (this.unitPrice * (this.discountPercent / 100))) * this.quantity;
  }
  this.setFinalPrice();
  this.getProductDetails = function() {
    for (let prod = 0; prod < productList.length; prod++) {
      if (productList[prod].prodID === this.prodID) {
        return `Product Name: ${ productList[prod].prodName }
Product Details:${ productList[prod].prodDetails }
Product Unit:${ productList[prod].prodUnit }
Product Price:${ productList[prod].prodPrice }
Product Discount:${ productList[prod].prodDiscount }`;
        break;
      }
    }
  }
  this.getCustDetails = function() {
    for (let cust = 0; cust < customerList.length; cust++) {
      if (customerList[cust].custId === this.custID) {
        return `Customer Name: ${ customerList[cust].custName }
Customer Address: ${ customerList[cust].custAddress }
Customer Phone Number: ${ customerList[cust].custPhoneNumber }`;
        break;
      }
    }
  }
  orderList.push({
    orderID: this.orderNumber,
    custID: this.custID,
    prodID: this.prodID,
    quantity: this.quantity,
    unitPrice: this.unitPrice,
    discountPercent: this.discountPercent,
    finalPrice: this.finalPrice,
    getProductDetails: this.getProductDetails(),
    getCustDetails: this.getCustDetails()
  });
}
var customerList = [];

function Customers(name, address, phoneNumber) {
  this.id = customerList.length + 1;
  this.name = name;
  this.address = address;
  this.phoneNumber = phoneNumber;
  customerList.push({
    custId: this.id,
    custName: this.name,
    custAddress: this.address,
    custPhoneNumber: this.phoneNumber
  });
  this.getOrders = function() {
    let custOrders = [];
    for (let order = 0; order < orderList.length; order++) {
      if (orderList[order].custID === this.id) {
        custOrders.push({
          orderID: orderList[order].orderID,
          quantity: orderList[order].quantity,
          finalPrice: orderList[order].finalPrice,
          productDetails: orderList[order].getProductDetails
        });
      }
    }
    let orderedItems = '';
    for (let item in custOrders) {
      orderedItems += `
Order ID: ${ custOrders[item].orderID }
Quantity: ${ custOrders[item].quantity }
Final Price: ${ custOrders[item].finalPrice }
${ custOrders[item].productDetails }
 `;
    }
    return `Customer Name: ${ this.name }
Total Orders: ${ custOrders.length }
 ${ orderedItems }`;
  }
} 



//customers

var cust1 = new Customers('Arun', '123 Bipass Road, Ooty, TN, India', '+91 94582 45245');
var cust2 = new Customers('Arvind', '42A Gypsy Road, Salem, TX, USA', '+01 44582 45245');
var cust3 = new Customers('Rodon', '42B Gypsy Road, Salem, MN, USA', '+01 22582 45245');

//products
var prod1 = new Products('Turmeric', 'made in India', 'kg', 250, 0);
var prod2 = new Products('Gulab Jamun mix', '200 g packet', 'g', 120, 5);
var prod3 = new Products('Coconut oil', 'made in Kerala', 'l', 450, 2);
var prod4 = new Products('Linseed oil', 'made in china', 'l', 260, 10);
var prod5 = new Products('Dry grapes', 'raisins', 'kg', 1200, 2.5);

//orders
var order1 = new Orders(1, 2, 2);
var order2 = new Orders(1, 1, 1);
var order3 = new Orders(2, 1, 1);
var order4 = new Orders(1, 4, 2);
var order5 = new Orders(1, 5, 3);

console.log(order1.getCustDetails() + '\n\n' + order1.getProductDetails());
