/* gerekli elemtnleri çağırma */
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const alert = document.querySelector(".alert");
const submitBtn = document.querySelector(".submit-btn");
const clearBtn = document.querySelector(".clear-btn");


//düzenleme seçeneği
let editElement ;
let editFlag = false; //düzenleme modunda olup olmadığını belirtir.
let editID = "" //düzenleme yapılan öğenin kimlği


//! olay izleyicisi

form.addEventListener("submit", addItem);

//fonksynlar,
clearBtn.addEventListener("click", function() {
 document.querySelector(".grocery-list").innerHTML = "";
  clearList();
});
function clearList(){}


function displayAllert(text,action){
    console.log(text,action);
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    setTimeout( () => {
        alert.textContent = ""
        alert.classList.remove(`alert-${action}`);
    },2000);
}

function addItem(e) {
  e.preventDefault(); //(yenilenmesini engeller.)
  const value = grocery.value; // inputun değerini alma
  const id = new Date().getTime.toString(); // benzersiz kimlik atama

  // boş değilse ve düzenleme modu açılmadıysa ekleme işlemine geç
  if (value !== "" && !editFlag) {
    const element = document.createElement("article"); //yeni article oluşturma
    let attr = document.createAttribute("data-id"); //veri kimlği oluşturma

    attr.value = id;
    element.setAttributeNode(attr); // veri kimligi article'a ekleniyor.
    element.classList.add("grocery-item"); // class ekleme
    element.innerHTML = ` 
        <p class="title">${value}</p>
        <div class="btn-container">
            <button type="button" class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
            <button type="button" class="delete-btn"><i class="fa-solid fa-trash"></i></button>
        </div>
        `;
    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);
    const editBTn = element.querySelector(".edit-btn");
    editBTn.addEventListener("click", editItem);

    list.appendChild(element); //eklenen elemanı listeye ekleme

    displayAllert("başarı ike eklenid", "succes" );
    container.classList.add("show-container");

    grocery.value = ""; //inputtan yazı silme
  } else if(value !=="" && editFlag){
    editElement.innerHTML = value ;
    displayAllert("Değer Değiştildi", "Succes");
  } else{

  }

}



function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  console.log(element);
  const id = element.dataset.id ;
  list.removeChild(element);
  displayAllert("Öğe Kaldırıldı", "danger"); // displayAllert fonksiyonunu düzeltmek için "displayAlert" olarak değiştirildi.
}


function editItem(e) {
  console.log(e);
    const element = e. currentTarget.parentElement.parentElement;
    editElement = e.currentTarget.parentElement.previousElementSibling;
    console.log(editElement);
    grocery.value = editElement.innerHTML;//inputun değerini metniyle doldurur.
    editFlag = true;
    editID = element.dataset.id // düzenlenen öğenin kimliği

    submitBtn.textContent = "Düzenle";
}

