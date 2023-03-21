let isId = document.getElementById('inId');
let isName = document.getElementById('inName');
let isImage = document.getElementById('inImage');
let isPrice = document.getElementById('inPrice');
let isDesc = document.getElementById('inDescription');

const isOutput = document.getElementById('lsOutput');
const isFetch = document.getElementById('fetchProduct');

document.getElementById("btnUpdate").style.display = "none";


//Validation for insert product data
function validation() {
	let id = isId.value;
	let price = isPrice.value;
	let image = isImage.files;
	let name = isName.value;
	let isIdReg = /^\d{4}$/;
	let isPriceReg = /\d/;
	let isNameReg = /^[A-Za-z]+$/;

	if (id == "") {
		alert("Id must be filled out");
		return false;
	}

	else if (!id.match(isIdReg)) {
		alert("ID must be 4 digit");
		return false;
	}
	else if(!name.match(isNameReg)){
		alert("Must be Alphabet allowed");
		return false;
	}

	else if (isName.value == "") {
		alert("Product Name must be filled out");
		return false;
	}
	else if (image.length == "") {
		alert("image must be filled out");
		return false;
	}


	else if (isPrice.value == "") {
		alert("Price must be filled out");
		return false;
	}

	else if (!price.match(isPriceReg)) {
		alert("Price must be in Number");
		return false;
	}

	else if (isPrice.value < 0) {
		alert("Price must be positive");
		return false;
	}

	else if (isDesc.value == "") {
		alert("Description must be filled out");
		return false;
	}

	else {
		return true;
	}
}


//image file validation for allow only (jpeg , jpg , png) files
function fileValidation() {
	var fileInput =
		document.getElementById('inImage');

	var filePath = fileInput.value;



	// Allowing file type
	var allowedExtensions =
		/(\.jpeg|\.jpg|\.png)$/i;

	if (!allowedExtensions.exec(filePath)) {
		alert('Only jpeg , jpg and png file allowed');
		fileInput.value = '';
		return false;
	}
	else{
		let kb = isImage.files[0].size / 1024; // convert the file size into byte to kb
		let mb = kb / 1024; // convert kb to mb
	
		if(mb > 1){
			alert("image size must be less then 1 MB");
			isImage.value = '';
		}
		
	}
}

function filter() {
	// Declare variables

	var filterInput = document.getElementById("filterProduct").value;

	var table = document.querySelectorAll(".productItems");

	// Loop through all table rows, and hide those who don't match the search query
	for (i = 0; i < table.length; i++) {
		var td = table[i].getElementsByTagName("td")[0];

		if (td) {
			var txtValue = td.innerHTML;

			if (txtValue.indexOf(filterInput) > -1) {
				table[i].style.display = "";
			} else {
				table[i].style.display = "none";
			}
		}
	}
}


//click on Add Product and insert data
function btnInsert() {
	if (validation() == true) {
		const id = isId.value;
		// let image = isImage.files[0];
		let product;



		const fr = new FileReader();
		fr.readAsDataURL(isImage.files[0]);
		fr.addEventListener('load', () => {
			let url = fr.result;
			if (localStorage.getItem("productArray") == null) {
				product = [];
			}
			else {
				product = JSON.parse(localStorage.getItem("productArray"));
			}


			product.push({
				id: isId.value,
				name: isName.value,
				image: url,
				price: isPrice.value,
				description: isDesc.value
			});

			//Convert a JavaScript object into a string with JSON.stringify(). now productArray is string and ready to sent to localstorage
			localStorage.setItem("productArray", JSON.stringify(product));
			location.reload();
			
		});
		
	}
}



//show the data
window.onload = function showData() {

	let product;
	if (localStorage.getItem("productArray") == null) {
		product = [];
	}
	else {
		//Parse the data with JSON.parse(), and the data becomes a JavaScript object.
		product = JSON.parse(localStorage.getItem("productArray"));
	}
	let html = "";
	product.forEach(function (element, index) {

		html += "<tr class='productItems'>";
		html += "<td>" + element.id + "</td>";
		html += "<td>" + element.name + "</td>";
		html += "<td><img src='" + element.image + " 'width='50px' height='50px'></td>";
		html += "<td>" + element.price + "</td>";
		html += "<td>" + element.description + "</td>";
		html += "<td><button class='btn btn-success ms-5' onclick='btnEdit(" + index + ")'>Edit </button></td>";
		html += "<td><button class='btn btn-danger ms-5' onclick='btnDelete(" + index + ")'>Delete </button></td>";
		html += "<tr>";

	});
	document.querySelector("#dataTable1 tbody").innerHTML = html;

}


//click on delete and delete that product
function btnDelete(element) {

	let product;
	if (localStorage.getItem("productArray") == null) {
		product = [];
	}
	else {
		product = JSON.parse(localStorage.getItem("productArray"));
	}
	let confirmation = confirm("Do you want to delete Product : " + product[element].name + ".");
	if (confirmation == true) {
		product.splice(element, 1);
		localStorage.setItem("productArray", JSON.stringify(product));
		window.location.reload();
		showData();
	}
}


//when we click on All Clear button and clear All product from localstorage and on display
function clearAllData() {
	localStorage.clear();

	window.location.reload();
	showData();

}


//click on Edit button and update data
function btnEdit(index) {
	let image = isImage.files ;
	let product;

	var fileInput =
		document.getElementById('inImage');


	if (localStorage.getItem("productArray") == null) {
		product = [];
	}
	else {
		product = JSON.parse(localStorage.getItem("productArray"));
	}
	isId.value = product[index].id;
	isName.value = product[index].name;
	
	isPrice.value = product[index].price;
	isDesc.value = product[index].description;
	document.getElementById("btnInsert").style.display = "none";
	document.getElementById("btnUpdate").style.display = "block";

	document.querySelector("#btnUpdate").onclick = function () {
		let isImage = document.getElementById('inImage');
		let image = isImage.files;
		
		if(image.length == ""){
			alert("image must be filled out");
		}
	
		const fr = new FileReader();
		fr.readAsDataURL(isImage.files[0]);
		fr.addEventListener('load', () => {
			let url = fr.result;

			window.location.reload();


			product[index].id = isId.value;
			product[index].name = isName.value;
			product[index].image = url;
			product[index].price = isPrice.value;
			product[index].description = isDesc.value;

			localStorage.setItem("productArray", JSON.stringify(product));
			showData();
		});

		document.getElementById("btnInsert").style.display = "block";
		document.getElementById("btnUpdate").style.display = "none";
	}

}


// 
// Function Of Sorting Data By Id, Name And Price 
function sortProduct() {
	var product;
	let sortingValue = document.getElementById("sorting").value;
	if (localStorage.getItem("productArray") == null) {
		product = [];
	}
	else {
		product = JSON.parse(localStorage.getItem("productArray"));
	}

	switch (sortingValue) {
		case "p_id":
			product.sort(byProductId);
			break;
		case "p_name":
			product.sort(byProductName);
			break;
		case "p_price":
			product.sort(byProductPrice);
	}
	localStorage.setItem("productArray", JSON.stringify(product));
	location.reload();
	showData();
}


function byProductId(a, b) {
	return a.id - b.id;
}

function byProductName(a, b) {
	if (a.name < b.name) {
		return -1;
	} else if (a.name > b.name) {
		return 1;
	} else {
		return 0;
	}
}

function byProductPrice(a, b) {
	return a.price - b.price;
}




