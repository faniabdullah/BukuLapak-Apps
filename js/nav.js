 document.addEventListener("DOMContentLoaded",()=>{
    let elems = document.querySelectorAll(".sidenav")
    M.Sidenav.init(elems);
    loadNav();
    function loadNav() {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status != 200) return;
                    
            // Muat daftar tautan menu
            document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
              elm.innerHTML = xhttp.responseText;
            });
            
            document.querySelectorAll(".sidenav a, .topnav a").forEach( function(elm){
                elm.addEventListener("click", function (event){
                     //tutup nav
                    let sidenav = document.querySelector(".sidenav");
                    M.Sidenav.getInstance(sidenav).close();
                    //muat konten yg dipanggil
                    page = event.target.getAttribute("href").substr(1);
                    loadPage(page);
                });
               
            });
          }
        };
        xhttp.open("GET", "nav.html", true);
          xhttp.send();
    }        
            
})
