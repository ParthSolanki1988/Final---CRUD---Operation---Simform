const isId = document.getElementById('inId');
const isName = document.getElementById('inName');
const isImage = document.getElementById('inImage');
const isPrice = document.getElementById('inPrice');
const isDesc = document.getElementById('inDescription');
// const isInsert = document.getElementById('btnInsert');
const isOutput = document.getElementById('lsOutput');
const isFetch = document.getElementById('fetchProduct');


 function btnInsert() {


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


function showData() {

    let product;
    if (localStorage.getItem("productArray") == null) {
        product = [];
    }
    else {
        product = JSON.parse(localStorage.getItem("productArray"));
    }
    let html = "";
    product.forEach(function (element, index) {

        html += "<tr>";
        html += "<td>" + element.id + "</td>";
        html += "<td>" + element.name+ "</td>";
        html += "<td><img src=" + element.image + "></td>";
        html += "<td>" + element.price + "</td>";
        html += "<td>" + element.description + "</td>";
        html += "<td><button class='btn btn-success ms-5' onclick='btnEdit("+ index+")'>Edit </button></td>";
        html += "<td><button class='btn btn-danger ms-5' onclick='btnDelete("+ index +")'>Delete </button></td>";
        html += "<tr>";
       
    });
    document.querySelector("#dataTable1 tbody").innerHTML = html;
    
}

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
        showData();
    }
}






