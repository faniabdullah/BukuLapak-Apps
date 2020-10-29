const CACHE_KEY = "cart_histori";
const checkForStorage = () => {
   return typeof(Storage) !== "undefined";
}
const putProduct = (data) => {
   if (checkForStorage()) {
       let historyData = null;
       if (localStorage.getItem(CACHE_KEY) === null) {
           historyData = [];
       } else {
           historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
       }
       historyData.unshift(data);
       if (historyData.length > 5) {
           historyData.pop();
       }
       localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
   }
}
const showHistory = () => {
    if (checkForStorage) {
        return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
    } else {
        return [];
    }
}
const formatRupiah = (result) => {
    let	reverse = result.toString().split('').reverse().join(''),
	format 	= reverse.match(/\d{1,3}/g);
    format	= format.join('.').split('').reverse().join('');
    return format;
}
 const renderHistory = () => {
    var i = 1;
    const historyData = showHistory();
    let historyList = document.querySelector("#listProduct");
    let grandTotal = 0;
    historyList.innerHTML = "";
    for (let history of historyData) {
        let row = document.createElement('tr');
        row.innerHTML = "<td>" + i + "</td>";
        row.innerHTML +=`<td><img  height="50px" src="images/${history.Book}.jpeg"></td>`;
        row.innerHTML += `<td> ${history.Creator}</td>`;
        row.innerHTML += "<td>" + history.Price + "</td>";
        row.innerHTML += "<td>" + history.Qty + "</td>";
        row.innerHTML += "<td>" + history.grandTotal + "</td>";
        historyList.appendChild(row);
        let subTotal = history.grandTotal.replace(/\D/gi, '');
        grandTotal = grandTotal + parseInt(subTotal);
        i++;
    }
     grandTotal = formatRupiah(grandTotal);
    document.querySelector("#grandTotal").innerHTML = 'Rp. '+grandTotal;
 }

const checkOut= () =>{
    var toastHTML = '<span>Proses checkout berhasil Kami telah Mengirim Link Tautan Pembayaran Ke email Anda</span><button class="btn-flat toast-action">Thanks</button>';
  M.toast({html: toastHTML});
   localStorage.removeItem(CACHE_KEY);
    renderHistory();
}
 