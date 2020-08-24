import {mode} from "./view.js";
import {loadPages}  from "../script.js";
const loadMobileNav = () => {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status != 200) return;
        document.querySelectorAll(".nav-bottom-mobile").forEach((elm) => {
          elm.innerHTML = xhttp.responseText;
        });

        let elms = document.querySelectorAll('a.link-mobile');
        elms.forEach(elm => {
          elm.addEventListener('click', (event) => {
            elms.forEach(e => {
              e.classList.remove('active-bottom')
            });
            elm.classList.add('active-bottom');
          });
        });

        document.querySelectorAll(".nav-bottom-mobile a.link-mobile").forEach( (elm) =>{
          elm.addEventListener("click",  (event) => {
              let page = event.target.getAttribute("href").substr(1);
              loadPages(page);
          });
         });

         
         mode();
      }     
    };
    xhttp.open("GET", "nav-mobile.html", true);
      xhttp.send();
}

const loadTopNav = () => {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status != 200) return;
        // Muat daftar tautan menu
        document.querySelectorAll(".topnav").forEach((elm) =>{
          elm.innerHTML = xhttp.responseText;
        });
        document.querySelectorAll(".topnav a.link").forEach( (elm) =>{
          elm.addEventListener("click", (event) =>{
              let page = event.target.getAttribute("href").substr(1);
              loadPages(page);
          });
         });
         mode();
      }
    };
    xhttp.open("GET", "top-nav.html", true);
      xhttp.send();
      
}

export { loadMobileNav , loadTopNav };




