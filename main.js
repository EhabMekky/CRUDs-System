var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescInput = document.getElementById("productDesc");

var updateBtn = document.getElementById("updateBtn");
var addBtn = document.getElementById("addBtn");


var productList = [];

if (localStorage.getItem('products') !== null) {
    // JSON

    productList = JSON.parse(localStorage.getItem('products'))
    displayProductList(productList);
}

function addProduct() 
{
   if(validProduct() === true){}
   else
   {
    alert("pls enter valid product name");
   return;
   }

   if(validProductPrice() === true){}
    else
    {
        alert("pls enter valid product price");
        return;
    }
   

    var product =
    {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDescInput.value
    };

    productList.push(product);
    console.log(productList);

    setAtLocalStorageAndDisplay();
};

function createProduct()
{
    var id = Date.now().toString();
    var product = 
    {
        getId: function(){return id},
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDescInput.value
    };

    return product;
}

function getProductById(id)
{
    for(var i = 0; i < productList.length; i++)
    {
        if(productList[i].id == id)
        {
            return i;
        }
    }
}

function clearInputs() {
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescInput.value = "";
}

function displayProductList(list) {
    var cartona = ``;

    for (var i = 0; i < list.length; i++) 
    {

        cartona += ` <tr>
    <td>${list[i].name}</td>
    <td>${list[i].price}</td>
    <td>${list[i].category}</td>
    <td>${list[i].desc}</td>
    <td><button class="btn btn-info" onclick="updateProduct(${i})">update</button></td>
    <td><button class="btn btn-danger" onclick="deleteProduct(${i})">delete</button></td>
</tr>`

    }
    document.getElementById('tBody').innerHTML = cartona;
}

function deleteProduct(id) 
{

    var index = getProductById(id);
    console.log(productList);
    productList.splice(index, 1);

    productList.splice(index, 1);

    setAtLocalStorageAndDisplay();
}

function setAtLocalStorageAndDisplay()
{
    localStorage.setItem('products', JSON.stringify(productList))
    displayProductList(productList)

}

function filterProductListByName(term) 
{
    var filteredList = [];
    var lowerCaseTerm = term.toLocaleLowerCase()

    for(var i = 0; i < productList.length; i++)
    {
        if(productList[i].name.toLocaleLowerCase().includes(lowerCaseTerm) === true)
        {
           filteredList.push(productList[i]);
        }
    }

    displayProductList(filteredList);
}

function updateProduct(index)
{
    
      // Hide the Add Product button
      addBtn.classList.add('d-none');
      // Show the Update Product button
      updateBtn.classList.remove('d-none');
  

    productList[index];
    productNameInput.value = productList[index].name;
    productPriceInput.value = productList[index].price;
    productCategoryInput.value = productList[index].category;
    productDescInput.value = productList[index].desc;

    updateBtn.onclick = function()
    {
        productList[index].name = productNameInput.value;
        productList[index].price = productPriceInput.value;
        productList[index].category = productCategoryInput.value;
        productList[index].desc = productDescInput.value;

        setAtLocalStorageAndDisplay();
        clearInputs();
        
        // revmove update btn
        addBtn.classList.remove('d-none');
        // display add btn
        updateBtn.classList.add('d-none');
        
    }
}

function validProduct()
{
    var regax = /^(?=(?:[^\A-Za-z0-9]*[\A-Za-z0-9]){2})[~,?,!]*\S+(?: \S+){0,}$/;
    if(regax.test(productNameInput.value && productCategoryInput.value) === true)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function validProductPrice()
{
    var regax = /^[0-9]{1,4}$/;
    if(regax.test(productPriceInput.value) === true)
    {
        return true;
    }
    else
    {
        return false;
    }
}