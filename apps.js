import {  registerServiceWorker , requestPermission} from "./js/sw.js";
import { isFavoriteTeams , saveSquadFav} from "./js/view/favorite.js";
import { loadPages} from "./js/script.js";
import { getTeamsById , getMatchById} from "./js/data/api.js";
import { setDarkMode } from "./js/view/view.js";
import { loadMobileNav , loadTopNav } from "./js/view/nav.js";


document.addEventListener('DOMContentLoaded', () => {
    let page = window.location.hash.substr(1);
    if (page === "") page = "home";
    let pagesTeam = window.location.pathname.search("team.html");
    let pagesMatch = window.location.pathname.search("match.html");
     if (pagesTeam > -1) {
        getTeamsById();
     } else if (pagesMatch > -1) {
       getMatchById();
       
     } else {
        loadPages(page);
        loadTopNav();
        loadMobileNav();
      window.setDarkMode = setDarkMode;
     }
     window.saveSquadFav = saveSquadFav;
     window.isFavoriteTeams = isFavoriteTeams;
    
      });
