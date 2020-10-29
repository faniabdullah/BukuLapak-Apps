const myArray = ["hello", "reviewer hehe", "Welcome to BukuLapak"];
    const clearTyping = () => {
        if (document.getElementById("Hello") != null) {
            document.getElementById("Hello").innerHTML = "&nbsp";
        } 
    }
    let indexTyping = 0;
    let argumentsTyping = 0;
    const typing = () => {
        let words = myArray[argumentsTyping];
        if (words === undefined) {
           indexTyping = 0;
           argumentsTyping = 0;
        }
        else{
                 if(indexTyping<words.length){
                        if (document.getElementById("Hello") != null) {
                            document.getElementById("Hello").innerHTML += words.charAt(indexTyping);
                            indexTyping++;
                     setTimeout(typing,200);
                        }
                 } else{  
                         indexTyping = 0;
                         argumentsTyping++;
                         let cek = myArray[argumentsTyping];
                         if (cek !== undefined) {
                             setTimeout(clearTyping,800);
                         }
                         if (document.getElementById("Hello") != null) {
                           setTimeout(typing,1000);
                    }
             }
        }
    }

const init = () => {
    let elemsCollapsilable = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elemsCollapsilable);
   
}

const plus = (index) => { 
    //untuk melakukan dom manipulasi tambah qty
    let idQty = 'qty'+index;
    let value =  document.getElementById(idQty).innerHTML;
    value++;
    document.getElementById(idQty).innerHTML = value;
}

const min = (index) => { 
    //untuk melakukan dom manipulasi mengurangi jumlah qty
    let idQty = 'qty'+index;
    let value =  document.getElementById(idQty).innerHTML;
    value--;
    if (value < 1) {
        value =1;
        alert("Maaf , minimal Pembelian adalah 1 ")
    }
    document.getElementById(idQty).innerHTML = value;
}


const addToCart = (index) => {
    const selectProduct = {
        Description: null,
        Book: null,
        Name : null,
        Creator: null,
        Price:null,
        Qty:null
     };

    let idCreator = 'creator-book'+index;
    let idNameProduct = 'product-name'+index;
    let idPrice = 'price-book'+index;
    let idQty = 'qty'+index;
    let idBook = 'book'+index;
    let idDescription = 'description-book'+index;

    selectProduct.Price = document.getElementById(idPrice).innerHTML;
    selectProduct.Name = document.getElementById(idNameProduct).innerHTML;
    selectProduct.Creator = document.getElementById(idCreator).innerHTML;
    selectProduct.Description = document.getElementById(idDescription).innerHTML;
    selectProduct.Qty = document.getElementById(idQty).innerHTML;
    selectProduct.Book = idBook;

    
    //replace string karena value harga disana adalah string. ada Rpnya dan titiknya
    let Price = selectProduct.Price.replace(/\D/gi, '');
    let grandTotal = Price * selectProduct.Qty;
    grandTotal = formatRupiah(grandTotal) //format rupiah
    grandTotal = 'Rp. '+grandTotal;
    // objek yang akan dikirimkan sebagai argumen fungsi putProduct()
    const Product = {
        Description: selectProduct.Description,
        Book: selectProduct.Book,
        Creator: selectProduct.Creator,
        Price:selectProduct.Price,
        Qty:selectProduct.Qty,
        titleBook: selectProduct.Name,
        grandTotal:grandTotal
    }
    console.log(Product);
    var toastHTML = `<span>Berhasil Memasukan Kedalam Keranjang</span><a href="#cart" onclick="loadPage('cart')" class="btn-flat toast-action">Lihat Keranjang</a>`;
    M.toast({html: toastHTML});
    putProduct(Product);
}


// Load page content
let page = window.location.hash.substr(1);
if (page == "") page = "home";
loadPage(page);

function loadPage(page) {
    
let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
    let content = document.querySelector("#body-content");
            if (this.status == 200) {
                content.innerHTML = xhttp.responseText;
                init();
                if (page == "home") {
                    indexTyping = 0;
                    typing(0);
                }else if (page == "cart") {
                    renderHistory();
                }
                
            } else if (this.status == 404) {
                content.innerHTML = "<h1>Halaman tidak ditemukan.</h1>";
            } else {
                content.innerHTML = "<h1>Ups.. halaman tidak dapat diakses.</h1>";
            }
    }
};
xhttp.open("GET", "pages/" + page + ".html", true);
xhttp.send();

}