let isId = document.getElementById('inId');
let isName = document.getElementById('inName');
let isImage = document.getElementById('inImage');
let isPrice = document.getElementById('inPrice');
let isDesc = document.getElementById('inDescription');
// const isInsert = document.getElementById('btnInsert');
const isOutput = document.getElementById('lsOutput');
const isFetch = document.getElementById('fetchProduct');

document.getElementById("btnUpdate").style.display = "none";


//Validation for insert product data
function validation() {
    let id = isId.value;
    let price = isPrice.value;
    let isIdReg = /^\d{4}$/;
    let isPriceReg = /\d/;
    // var fileInput =
    //     document.getElementById('inImage');

    // var filePath = fileInput.value;

    if (id == "") {
        alert("Id must be filled out");
        return false;
    }

    else if (!id.match(isIdReg)) {
        alert("ID must be 4 digit");
        return false;
    }

    else if (isName.value == "") {
        alert("Product Name must be filled out");
        return false;
    }
    // else if (filePath == "") {
    //     alert("Please , Upload Images");
    //     return false;
    // }

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
}

function filter(){
     // Declare variables
  
  var filterInput = document.getElementById("filterProduct").value;
//   console.log(filterInput);
  var table = document.querySelectorAll(".productItems");
  console.log(table.length);
//   var tr = table.getElementsByTagName("tr");
//   console.log(tr);

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < table.length; i++) {
    // console.log(i);
    var td = table[i].getElementsByTagName("td")[0];

    // console.log(td);
    if (td) {
      var txtValue = td.innerHTML;
    //   console.log(txtValue);
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

        // console.log(id);
        // console.log(name);
        let product;

        // const product = [id, name, image , price , description];


        //if data not on productArray so , clear product array  otherwise productArray will parse and set into product array
        if (localStorage.getItem("productArray") == null) {
            product = [];
        }
        else {
            product = JSON.parse(localStorage.getItem("productArray"));
        }

        product.push({
            id: isId.value,
            name: isName.value,
            image: isImage.files[0].name,
            price: isPrice.value,
            description: isDesc.value
        });

        localStorage.setItem("productArray", JSON.stringify(product));
        location.reload();
    }
}



//show the data
window.onload = function showData() {

    let product;
    if (localStorage.getItem("productArray") == null) {
        product = [];
    }
    else {
        product = JSON.parse(localStorage.getItem("productArray"));
    }
    let html = "";
    product.forEach(function (element, index) {

        html += "<tr class='productItems'>";
        html += "<td>" + element.id + "</td>";
        html += "<td>" + element.name + "</td>";
        // html += "<td><img src=./" + element.image + " width='100px' height='100px'></td>";
        html += "<td><img src='Assets/Images/" + element.image + " 'width='50px' height='50px'></td>";
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
    // document.getElementById('btnAllClear').disabled = true
}


//click on Edit button and update data
function btnEdit(index) {
    let product;

    var fileInput =
        document.getElementById('inImage');

    // fileInput.value = isImage.files[0];
    console.log(fileInput.value);

    if (localStorage.getItem("productArray") == null) {
        product = [];
    }
    else {
        product = JSON.parse(localStorage.getItem("productArray"));
    }
    isId.value = product[index].id;
    isName.value = product[index].name;
    // console.log(product[index].image);
    // isImage.value = product[index].image;
    isPrice.value = product[index].price;
    isDesc.value = product[index].description;
    document.getElementById("btnInsert").style.display = "none";
    document.getElementById("btnUpdate").style.display = "block";

    document.querySelector("#btnUpdate").onclick = function () {
        window.location.reload();
        product[index].id = isId.value;
        product[index].name = isName.value;

        product[index].image = isImage.value;
        product[index].image = isImage.files[0].name;
        product[index].price = isPrice.value;
        product[index].description = isDesc.value;

        localStorage.setItem("productArray", JSON.stringify(product));
        showData();

        document.getElementById("btnInsert").style.display = "block";
        document.getElementById("btnUpdate").style.display = "none";


    }

}


// // For sorting
// function sortProduct(){
    
    

//     var optvalue = document.getElementById('sort').value;
//     // console.log(optvalue);
//     var  product = JSON.parse(localStorage.getItem("productArray"));
//     for (let index = 0; index < product.length; index++) {
//         // console.log(product[index].id);
//         const p_id = product[index].id;
//     }
   
//     localStorage.setItem("productArray",JSON.stringify(productArray));
//     showData();
// }

