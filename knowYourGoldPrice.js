!document.getElementById("main-div") ? (document.write(`
<style>
body{
	background-color:#6b6b5b;
  font-family:'calibri light';
}
input[type="text"]{
	padding:5px;
	border:1px solid #ffcc11;
	color:#5d5d5d;
	border-radius:2px;
	background-color:#fffff0;
  font-family:"calibri";
  font-size:16px;
}
input[type="button"]{
	padding:5px;
	border:0px;
	background-color:#ffcc11;
	color:#ffffff;
	border-radius:2px;
	width:150px;
  font-size:18px;
  font-family:"Calibri";
}
.td1{
	color:#5d5d2d;
}
.td2{
	padding-left:20px;
}
#main-div{
	margin:50px 25px;
	padding:50px 50px;
	border:0px solid #ffee99;
	max-width:800px;
  width:auto;
	background-color:#fffff9;
}
#resultTab{
	max-width:800px;
  width:auto;
	border:0px solid #ffee88;
	background-color:#ffffff;
	border-spacing:0;
}
#head1{
	color:#ffffff;
  background-color:#ffcc11;
  padding:25px 20px;
  max-width:860px;
  margin:-50px -50px 30px -50px;  
}
#head2{
	color:#cfcfc9;
  font-size:24px;  
	background-color:#4f4f3b;
	/* border:5px solid #fffff9;
  border-radius:100px;*/
  padding:10px 20px;
  max-width:860px;
  margin:0px -50px 20px -50px; 
}
.td3{
border:0px solid #ffee88;
padding:10px 5px;

}
.td4{
border:0px solid #ffff00;
padding:10px;
}
#result{
margin-left:0px;
padding:10px 0px;
}
</style>

<div id="main-div">\n
<h2 id="head1">Know Your Gold Price</h2>\n
<table>\n
<tr>\n
<td class="td1">10g 24Kt Gold Price</td>
<td class="td2"><input type="text" id="price" value=0></td>
</tr>\n
<tr>
<td class="td1">Purity (in karat)</td>
<td class="td2"><input type="text" id="purity" value=22></td>
</tr>\n
<tr>\n
<td class="td1">Total Weight (g)</td>
<td class="td2"><input type="text" id="weight" value=8></td>
</tr>\n
<tr>\n
<td class="td1">Wastage (\%)</td>
<td class="td2"><input type="text" id="wastage" value=0></td>
</tr>\n
<tr>\n
<td class="td1">GST (\%)</td>
<td class="td2"><input type="text" id="gst" value=1.5></td>
</tr>\n
<tr>\n
<td class="td1">Discount (\%)</td>
<td class="td2"><input type="text" id="discount" value=0></td>
</tr>\n
<tr>\n
<td class="td2"></br><input type="button" value="Print" id="printData"></td>\n
<td class="td2"></br><input type="button" value="Calculate" id="calculate"></td>
</tr>\n
</table>\n
</br>
<div id="result">\n
</div>
</div>
\n`)) : !1;



function GoldPrice() {
  
  this._24ct_1g = Number(document.getElementById("price").value) / 10 || 0;
  this.buyerSpec = {
    purity: Number(document.getElementById("purity").value) || 0,
    grams: Number(document.getElementById("weight").value) || 0,
    wastage: Number(document.getElementById("wastage").value) || 0,
    gst: Number(document.getElementById("gst").value) || 0,
    discount: Number(document.getElementById("discount").value) || 0,
  };
  this.unitPrice = 0.00;
  this.actualPrice = 0.00;
  this.discountedPrice = 0.00;
  this.wastageCost = 0.00;
  this.cgst = 0.00;
  this.sgst = 0.00;
  this.discount = 0.00;
  this.totalCost = 0.00;

  this.getDetails = function() {
    this.unitPrice = (this._24ct_1g * (this.buyerSpec.purity / 24)).toFixed(2);
    this.actualPrice = (this.unitPrice * this.buyerSpec.grams).toFixed(2);
    this.discount = (this.actualPrice * (this.buyerSpec.discount / 100)).toFixed(2);
    this.discountedPrice = (this.actualPrice - this.discount).toFixed(2);
    this.wastageCost = (this.discountedPrice * (this.buyerSpec.wastage / 100)).toFixed(2);
    this.cgst = ((Number(this.discountedPrice) + Number(this.wastageCost)) * (Number(this.buyerSpec.gst) / 100)).toFixed(2);
    this.sgst = this.cgst;
    this.totalCost = (Number(this.discountedPrice) + Number(this.wastageCost) + Number(this.cgst) * 2).toFixed(2);

    document.getElementById("result").innerHTML = `<p id="head2">Calculated Price</p>
    <p class="td1" style="font-size:16px;">
    <!--24 carat/g: <b>${this._24ct_1g}</b></br>\n-->
    Purity:&nbsp; <b>${this.buyerSpec.purity}</b></br>\n
    Wastage \(\%\):&nbsp; <b>${this.buyerSpec.wastage}</b></br>\n
   Discount \(\%\):&nbsp; <b>${this.buyerSpec.discount}</b></br>\n
    GST \(\%\):&nbsp; <b>${this.buyerSpec.gst}</b></p>\n
    <table id="resultTab">\n
    <tr style="background-color:#7788aa;color:#ffffff;">\n
    <td class="td3">Weight</td>\n
    <td class="td3">Unit Price</td>\n
    <td class="td3">Actual Price</td>\n
    <td class="td3">Discounted Price</td>\n
    <td class="td3">Wastage</td>\n
    <td class="td3">Discount Amount</td>\n
    <td class="td3">CGST</td>\n
    <td class="td3">SGST</td>\n
    <td class="td3">Total Amount</td>\n
    </tr>\n
    <tbody>\n
    <tr >\n
    <td class="td4">${this.buyerSpec.grams}</td>\n
    <td class="td4">${this.unitPrice}</td>\n
    <td class="td4">${this.actualPrice}</td>\n
    <td class="td4">${this.discountedPrice}</td>\n
    <td class="td4">${this.wastageCost}</td>\n
    <td class="td4">${this.discount}</td>\n
    <td class="td4">${this.cgst}</td>\n
    <td class="td4">${this.sgst}</td>\n
    <td class="td4">${this.totalCost}</td>\n
    </tr>\n
    </tbody>\n
    </table>`;

  }
  this.getDetails();
}

function printMyData() {
  try {
    window.print();
  } catch (e) {}
}

var elm = document.getElementById("calculate");
elm.addEventListener("click", GoldPrice);

var prin = document.getElementById("printData");
prin.addEventListener("click", printMyData);