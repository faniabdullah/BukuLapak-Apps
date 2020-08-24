
import {  mode, viewHtmlFavorite , init} from "./view/view.js";
import {getStanding , getTeams} from "./data/api.js";
const loadPages = (page) => {
    let viewHome = document.querySelector(".viewHome");
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
        let content = document.querySelector("#body-content");
                if (this.status == 200) {
                    content.innerHTML = xhttp.responseText;
                        init()
                    if (page == "home") {
                        viewHome.classList.remove("hide");
                        getStanding();
                    }else if (page == "teams") {
                        viewHome.classList.add("hide");
                        getTeams();
                    }else if (page == "favorite") {
                        viewHome.classList.add("hide");
                        viewHtmlFavorite();
                    }
                    mode();
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

export { loadPages , init };




