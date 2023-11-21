let title = document.querySelector(".title");
let price = document.querySelector(".price");
let taxes = document.querySelector(".taxes");
let ads = document.querySelector(".ads");
let discount = document.querySelector(".discount");
let total = document.querySelector(".total");
let count = document.querySelector(".count");
let category = document.querySelector(".category");
let submet = document.querySelector(".submet");
let search = document.querySelector(".search");
let light = document.getElementById("lightModeToggle");
let mood = 'create';
let tmp;
// get total price
function getTotal()
{
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = "green";
    } else {
        total.innerHTML = "";
        total.style.backgroundColor = "red";
    }
}
// create product
let proData;

if(localStorage.getItem("product") != null)
{
    proData = JSON.parse(localStorage.product);
} else {
    proData = [];
}

submet.onclick = function createProduct()
{
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if(title.value != ''
    && price.value != ''
    && category.value != ''
    && newPro.count <= 100){
        if(mood === 'create'){
                if(newPro.count > 1)
            {
                for(let i = 0; i < newPro.count; i++)
                {
                    proData.push(newPro);
                }
            }else {
                proData.push(newPro);
            }
        } else {
            proData[tmp] = newPro;
            mood = 'create';
            submet.innerHTML = "Create";
            count.style.display = "block";
        }
        clearInputs();
    }


    localStorage.setItem("product", JSON.stringify(proData));
    showProducts();
}
// clear inputs
function clearInputs()
{
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}
// show products
function showProducts()
{
    getTotal();
    let table = ``;
    for(let i = 0; i < proData.length; i++)
    {
        table += `
            <tr>
                <td>${i+1}</td>
                <td>${proData[i].title}</td>
                <td>${proData[i].price}</td>
                <td>${proData[i].taxes}</td>
                <td>${proData[i].ads}</td>
                <td>${proData[i].discount}</td>
                <td>${proData[i].total}</td>
                <td>${proData[i].category}</td>
                <td><button onclick="updateProduct(${i})" class="updatebtn">Update</button></td>
                <td><button onclick="removeProduct(${i})" class="deletebtn">Delete</button></td>
            </tr>
        `;
    }

    document.querySelector(".tbody").innerHTML = table;
    let deletebtn = document.querySelector(".deleteAll")
    if(proData.length > 0)
    {
        deletebtn.innerHTML = `
        <button onclick="removeAll()" class="submet">Remove All (${proData.length})</button>
        `;
    } else {
        deletebtn.innerHTML = "";
        
    }
}
showProducts();
// remove product
function removeProduct(i)
{
    proData.splice(i, 1);
    localStorage.setItem("product", JSON.stringify(proData));
    showProducts();
}
// remove all products
function removeAll()
{
    localStorage.clear();
    proData.splice(0);
    showProducts();
}
// update product

function updateProduct(i){
    title.value = proData[i].title;
    price.value = proData[i].price;
    taxes.value = proData[i].taxes;
    ads.value = proData[i].ads;
    discount.value = proData[i].discount;
    category.value = proData[i].category;
    count.style.display = "none";
    getTotal();
    submet.innerHTML = "Update";
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    })
}
// search product

let searchMood = 'title'

function getSearchMood(id){
    let search = document.querySelector('.search')
    if(id == 'searchTitle'){
        searchMood = 'title';
    } else{
        searchMood = 'category';
    }
    search.placeholder = 'Search By '+ searchMood; 
    search.focus()
    search.value = '';
    showProducts()
}

function searchData(value){
    let table = '';
    for(let i = 0; i < proData.length; i++){
        if(searchMood == 'title'){
                if(proData[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${proData[i].title}</td>
                    <td>${proData[i].price}</td>
                    <td>${proData[i].taxes}</td>
                    <td>${proData[i].ads}</td>
                    <td>${proData[i].discount}</td>
                    <td>${proData[i].total}</td>
                    <td>${proData[i].category}</td>
                    <td><button onclick="updateProduct(${i})" class="updatebtn">Update</button></td>
                    <td><button onclick="removeProduct(${i})" class="deletebtn">Delete</button></td>
                </tr>
                `;
            }
        } else {
            if(proData[i].category.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${proData[i].title}</td>
                    <td>${proData[i].price}</td>
                    <td>${proData[i].taxes}</td>
                    <td>${proData[i].ads}</td>
                    <td>${proData[i].discount}</td>
                    <td>${proData[i].total}</td>
                    <td>${proData[i].category}</td>
                    <td><button onclick="updateProduct(${i})" class="updatebtn">Update</button></td>
                    <td><button onclick="removeProduct(${i})" class="deletebtn">Delete</button></td>
                </tr>
                `;
            }
        }
    }
    document.querySelector(".tbody").innerHTML = table;
}

document.getElementById('lightModeToggle').addEventListener('click', function() {
    document.body.classList.toggle('light-mode');
    light.innerText = light.innerText === 'Light Mode' ? 'Dark Mode' : 'Light Mode';
    light.style.backgroundColor = light.style.backgroundColor === '#cacbcf' ? '#181818' : '#cacbcf';
    light.style.color = light.style.color === 'black' ? 'white' : 'black';
}
);