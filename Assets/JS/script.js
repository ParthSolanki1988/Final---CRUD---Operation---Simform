const isId = document.getElementById('inId');
const isName = document.getElementById('inName');
const isImage = document.getElementById('inImage');
const isPrice = document.getElementById('inPrice');
const isDesc = document.getElementById('inDescription');
const isInsert = document.getElementById('btnInsert');
const isOutput = document.getElementById('lsOutput');


btnInsert.onclick = function (){
    const id = isId.value;

    // console.log(id);
    // console.log(name);


    // const product = [id, name, image , price , description];



    const product = {
        id : isId.value,
        name : isName.value,
        image : isImage.value,
        price : isImage.value,
        description : isDesc.value
    }



    if(id && product){


        localStorage.setItem(product.id, JSON.stringify(product));
        location.reload();
    }
}

