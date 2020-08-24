import { dbForFavorite, dbSquadFavorite , dbTeamsMatch } from "../data/db.js";
import { checkFavoriteTeams , checkFavoriteSquad } from "./favorite.js";

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

const parseHttpToHttps = (text) => {
    return text.replace(/^http:\/\//i, 'https://');
   }
  
const init =  () => {
    M.Tabs.init(document.querySelector(".tabs"), {
                      swipeable: true
                    });
     M.Collapsible.init(document.querySelectorAll('.collapsible'));
}


const viewHtmlStandings = async (data) => {
  await  data.standings.forEach((standing)=>{
    let elmHtml  = ` <div class="row">`;
    standing.table.forEach((itemStandings)=>{
      let crestUrl = (itemStandings.team.crestUrl)?parseHttpToHttps(itemStandings.team.crestUrl) : 'images/default-team-badge.png';
      elmHtml +=`
      <div class="col s12 l6 open-match-team " id="${itemStandings.team.id}">
        <div class="card hoverable horizontal match">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="badge" src="${crestUrl}">
          </div>
          <div class="card-stacked">
            <div class="card-content">
              <a href="match.html?id=${itemStandings.team.id}" class="card-title black-text" style="font-weight: 900; font-size: 16px;">${itemStandings.team.name}</a>
              <ul>
                <li class="black-text"><div title="Matches Played">Matches</div><div class="val">${itemStandings.playedGames}</div></li>
                <li class="black-text"><div  title="Won">Won</div><div class="val">${itemStandings.won}</div></li>
                <li class="black-text"><div title="Draw">Draw</div><div class="val">${itemStandings.draw}</div></li>
                <li class="black-text" ><div  title="Lost">Lost</div><div class="val">${itemStandings.lost}</div></li>
                <li class="black-text"><div title="Goal">Goal</div><div class="val">${itemStandings.goalsFor}:${itemStandings.goalsAgainst}</div></li>
                <li class="black-text"><div  title="Points"></div>Points<div class="val">${itemStandings.points}</div></li>
            </ul>
            </div>
          </div>
        </div>
      </div>`

    dbTeamsMatch.get(itemStandings.team.id).then((item) => {
        if (!item) { //used for save team for match detail standings
          dbTeamsMatch.update({
                id: itemStandings.team.id,
                name: itemStandings.team.name,
                imgTeam: (itemStandings.team.crestUrl)?parseHttpToHttps(itemStandings.team.crestUrl) : null,
                created: new Date().getTime()
            });
        }
       })
      
    });
    
   elmHtml += `</div>`;
   let content = document.querySelector('#' + 'standing-' + standing.type.toLowerCase());
   content.innerHTML = elmHtml;
  });

  const link = document.querySelectorAll(".open-match-team");
  link.forEach(link => {
      link.addEventListener("click", event => {
          const idTeams = event.currentTarget.id;
          window.open("match.html?id="+idTeams,"_parent");
      })
  })
  mode();
  }

const viewHtmlTeams = (data) => {
    let elmHtml  = ''
    data.teams.forEach((team)=>{
      let crestUrl = (team.crestUrl) ? parseHttpToHttps(team.crestUrl) : 'images/default-teams.png';
     
      elmHtml += ` <div class="col s12 l6">
      <div class="card horizontal match hoverable card-list-team " id="${team.id}" >
        <div class="card-image card-images-tems  waves-effect waves-block waves-light  ">
          <img class="badge-teams"  src="${crestUrl}">
        </div>
        <div class="card-stacked">
          <div class="card-content">
              <div class="title-teams">
                <a href="" class="card-title black-text text-darken-1 title">${team.name}</a>
                <a href="${team.website}" title="goto sites"><i class="material-icons sites black-text">launch</i></a>
                   </div>
              <div class="info-teams">
                <ul>
                  <li><a href="#!" class="black-text" ><i class="material-icons black-text">location_on</i> <span>${team.address}</span></a></li>
                  <li><a href="#!" class="black-text" > <i class="material-icons black-text">contact_mail</i> <span> ${team.email}</span></a></li>
                </ul>
              </div>
          </div>
        </div>
      </div>
    </div>`;
    });
    
    let content = document.querySelector('#list-teams');
    content.innerHTML = elmHtml;
   const link = document.querySelectorAll(".card-list-team");
   link.forEach(link => {
        link.addEventListener("click", event => {
           const idTeams = event.currentTarget.id;
           window.open("team.html?id="+idTeams,"_parent");
      })
    })

    let imgError = document.querySelectorAll(".badge-teams");
    imgError.forEach(imgError=> {
      imgError.addEventListener("error", event => {
        event.currentTarget.src = "images/default-teams.png";
    });
  });
      
    mode();
    
  }


  
const viewHtmlMatch = (data) => {
  let elmHtml = '';
  let IdCompetition = 2021; 
  data.matches.forEach((matche)=>{
      let scoreHomeTeam = (matche.score.fullTime.homeTeam == null) ? '-' : matche.score.fullTime.homeTeam;
      let scoreAwayTeam = (matche.score.fullTime.awayTeam == null) ? '-' : matche.score.fullTime.awayTeam;
      let date = new Date(matche.utcDate);
      
      elmHtml = `<div class="col s12 l6">
                      <div class="card horizontal match hoverable" >
                        <div class="card-stacked">
                          <div class="card-content">
                              <div class="match-title left">
                                  <img class="home-match" data-team="${matche.homeTeam.id}"  src="images/default-teams.png">
                                  <span class="name-team-match center">${matche.homeTeam.name}</span>
                              </div>
                              <div class="detail-match left">
                                  <p class="center">${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}</p>
                                  <h1 class="center">${scoreHomeTeam} : ${scoreAwayTeam}</h1>
                              </div>
                              <div class="match-title right">
                                  <img class="home-match" data-team="${matche.awayTeam.id}"  src="images/default-teams.png">
                                  <span class="name-team-match center">${matche.awayTeam.name}</span>
                              </div>
                          </div>
                        </div>
                      </div>
                    </div>`;
            if (matche.competition.id === IdCompetition) {
              let content = document.querySelector('#' + 'match-' + matche.status.toLowerCase()+ ' > .row');
              if (content) {
                  content.innerHTML = (matche.status.toLowerCase() === 'finished') ? elmHtml + content.innerHTML : content.innerHTML + elmHtml;
              }
            }
    });

  
    document.querySelectorAll('img.home-match').forEach(elm => {
      if (elm.dataset.team) {
          dbTeamsMatch.get(parseInt(elm.dataset.team)).then((item) => {
              if (item) {
                  elm.setAttribute('src', item.imgTeam);
                 
              }
          });
      }
  });
  mode();
  init();
  }



  const viewHtmlDetailTeam = async (data) => {
 
    let crestUrl = (data.crestUrl) ? parseHttpToHttps(data.crestUrl) : 'images/default-teams.png';
    
    let elmNav = `<a href="#" class=" black-text" style="font-size:13px;">${data.name}</a>
    <ul id="nav-mobile" class="left ">
      <li><a href="./index.html"> <i class="black-text material-icons">arrow_back</i></a></li>
    </ul>
    <ul id="nav-mobile" class="right ">
      <li><a href="#" onclick ='isFavoriteTeams(${parseInt(data.id)})' ><i id="favorite-teams${parseInt(data.id)}" class="black-text material-icons">favorite_border</i></a></li>
    </ul>`
    let contentNav = document.querySelector('.match-team-id');
    contentNav.innerHTML = await elmNav;
    checkFavoriteTeams(data.id);

    let elmHtmlInfoTeam = ` <div class="row">
    <div class="col s12 l12">
                <div class="detail-teams-image center">
                  <img class="badge" src="${crestUrl}">
                </div>
                <div class="title-teams-detail center">
                    <h1>${data.name}</h1>
                    <a href="${data.website}" title="goto sites"><i class="material-icons sites black-text">launch</i></a>
                </div>
    </div>
    </div>`;
   let elmHTMLContactTeams = `<div class="row">
      <div class="col s12 l4">
        <div class="info-teams-detail">
          <ul class="collapsible ">
            <li>
              <div class="collapsible-header card"><i class="material-icons black-text">location_on</i>Address</div>
              <div class="collapsible-body">
                <div class="collection black-text"><span>
                  <a  class="black-text">${data.address}</a>
                </span>
                </div>
              </div>
            </li>
            <li>
              <div class="collapsible-header  card"><i class="material-icons black-text">contact_mail</i>Email</div>
              <div class="collapsible-body"> 
                <div class="collection">
                <a  class=" black-text">${data.email}</a>
               </div>
              </div>
            </li>
            <li>
              <div class="collapsible-header  card"><i class="black-text material-icons">contact_phone</i>Phone</div>
              <div class="collapsible-body"> 
                <div class="collection">
                <a href="#" class=" black-text" >${data.phone}</a>
               </div>
              </div>
            </li>
            
          </ul>
        </div>
      </div>`
      let elmHtmlPlayer = ` <div class="col s12 l8">
        <ul class="collapsible active ">
          <li class="active">
            <div class="collapsible-header card"><i class="material-icons">filter_list</i>${data.name} Player</div>
            <div class="collapsible-body squad">
              <div class="collection"> `;
              data.squad.forEach((squad)=>{
                elmHtmlPlayer += `
                <div class="col s12 l6">
                  <div class="card horizontal match hoverable" >
                    <div class="card-image card-images-player  waves-effect waves-block waves-light  ">
                      <img class="badge-player" src="images/default-player.png">
                    </div>
                    <div class="card-stacked">
                      <div class="card-content">
                          <div class="title-player">
                            <a  class="card-title black-text text-darken-1 title left">${squad.name}</a>
                             <a  class="right icon" style="cursor:pointer;" onclick="saveSquadFav('${squad.id}','${squad.name}','${squad.nationality}','${squad.position}')" title="Add to favorite"><i id="favorite-squad${squad.id}" class="material-icons right fav black-text">favorite_border</i></a>
                          </div>
                          <div class="info-player">
                            <ul>
                              <li><a><i class="material-icons black-text">flag</i> <span class='black-text'>${squad.nationality}</span></a></li>
                              <li><a> <i class="material-icons black-text">label</i> <span class='black-text'>${squad.position}</span></a></li>
                            </ul>
                          </div>
                      </div>
                    </div>
                  </div>
               </div> `;
              })
               elmHtmlPlayer += ` </div></li></ul></div></div>`;
               let content = document.querySelector('#content-teams-detail')
               content.innerHTML =  elmHtmlInfoTeam + elmHTMLContactTeams + elmHtmlPlayer;
              init();
              checkFavoriteSquad();
              mode();
  }
  

  const viewHtmlFavorite = async () => {
    dbForFavorite.getAll().then((teams)=>{
     
      let elmHtml = ``;
      teams.forEach((team)=>{
        if (team.favorite === true) {
          elmHtml += `<div class="col s12 l6">
          <div class="card horizontal match hoverable card-list-team " id="${team.id}" >
            <div class="card-image card-images-tems  waves-effect waves-block waves-light  ">
              <img class="badge-teams" src="${team.imgTeam}">
            </div>
            <div class="card-stacked">
              <div class="card-content">
                  <div class="title-teams">
                    <a href="team.html?id=${team.id}" class="card-title black-text text-darken-1 title">${team.name}</a>
                    <a href="${team.website}" title="goto sites"><i class="material-icons sites black-text">launch</i></a>
                   <a href="#" class="right" onclick="isFavoriteTeams(${team.id})" title="Remove Squad Favorite"><i id="favorite-teams${team.id}"  class="material-icons right black-text">favorite</i></a>     
                  </div>
                  <div class="info-teams">
                    <ul>
                      <li><a href="#!" class="black-text" ><i class="material-icons black-text">location_on</i> <span>${team.address}</span></a></li>
                      <li><a href="#!" class="black-text" > <i class="material-icons black-text">contact_mail</i> <span> ${team.email}</span></a></li>
                    </ul>
                  </div>
              </div>
            </div>
          </div>
        </div>`;
        }
      });
      let content = document.querySelector('.show-favorite')
      if (elmHtml !== null) {
      content.innerHTML = elmHtml;
      }
    });

    await dbSquadFavorite.getAll().then((items)=>{
     
      let elmHtmlFav = ``;
      items.forEach((squad)=>{
        //squad-favorite-show
          elmHtmlFav += `<div class="col s12 l6">
          <div class="card horizontal match hoverable" >
            <div class="card-image card-images-player  waves-effect waves-block waves-light  ">
              <img class="badge-player" src="images/default-player.png">
            </div>
            <div class="card-stacked">
              <div class="card-content">
                  <div class="title-player">
                    <a style="cursor:pointer" class="card-title black-text text-darken-1 title left">${squad.name}</a>
                     <a style="cursor:pointer" onclick="saveSquadFav('${squad.id}','','','')" class="right icon" title="Remove Squad Favorite"><i id="favorite-squad${squad.id}" class="material-icons right fav black-text">favorite</i></a>
                  </div>
                  <div class="info-player">
                    <ul>
                      <li ><a href="#!" class=""><i class="material-icons black-text">flag</i> <span class="black-text">${squad.nationality}</span></a></li>
                      <li  ><a href="#!" class=""> <i class="material-icons black-text">label</i> <span class="black-text">${squad.position}</span></a></li>
                    </ul>
                  </div>
              </div>
            </div>
          </div>
       </div>`;
      });
     
      let contentSquad = document.querySelector('.squad-favorite-show')
      if (elmHtmlFav !== null) {
        contentSquad.innerHTML = elmHtmlFav;
        }
      
    });
    mode();
  }

  
const setDarkMode = (isDark) => {
    if (isDark) {
        setDark();
    }else{
        setLight();
    }
}

const setDark = () =>{
    let elmDark = document.getElementsByClassName("dark-mode");
    let elmLight = document.getElementsByClassName("light-mode");
    let elmDarkMobile = document.getElementsByClassName("dark-mode-mobile");
    let elmLightMobile = document.getElementsByClassName("light-mode-mobile");
    let cardDark = document.querySelectorAll(".card");
    let logoApps = document.getElementsByClassName("logo-apps");
    let TextBlack = document.getElementsByClassName("black-text");
    let navCard = document.querySelectorAll('.navigation');

    //topnav Light
    for(let i = elmDark.length - 1; i >= 0; --i)
    {elmDark[i].className = "white-text dark-mode hide";} 
    for(let i = elmLight.length - 1; i >= 0; --i)
    {elmLight[i].className = "black-text light-mode";}
    //end

    //mobile nav Light
    for(let i = elmDarkMobile.length - 1; i >= 0; --i)
        {elmDarkMobile[i].className = "col m3 s3 center black-text list dark-mode-mobile hide";} 
    for(let i = elmLightMobile.length - 1; i >= 0; --i)
        {elmLightMobile[i].className = "col m3 s3 center black-text list light-mode-mobile";}
     //end

    for (let i = 0; i < cardDark.length; i++) {
        cardDark[i].classList.add('card-dark-mode')
      } 

    //Text Dark Mode
    for(let i = TextBlack.length - 1; i >= 0; --i)
    {TextBlack[i].className += " white-text ";} 

    //navigation dark
    for (let i = 0; i < navCard.length; i++) {
        navCard[i].classList.add('dark-mode-navigation');
        navCard[i].classList.remove('white')
      } 

    //img logo dark mode
    for (let i = 0; i < logoApps.length; i++) {
        logoApps[i].src = "images/logo-dark-mode.png";
      } 

    localStorage.setItem('preferredTheme', 'dark');
   document.body.classList.add("darkModeBody");
}

const setLight = () => {
   let elmDark = document.getElementsByClassName("dark-mode");
    let elmLight = document.getElementsByClassName("light-mode");
    let cardDark = document.querySelectorAll(".card");
    let TextBlack = document.querySelectorAll('.black-text')
    let elmDarkMobile = document.querySelectorAll(".dark-mode-mobile");
    let elmLightMobile = document.querySelectorAll(".light-mode-mobile");
    let navCard = document.querySelectorAll('.navigation');
    let logoApps = document.querySelectorAll(".logo-apps");
    
    //mobile nav Light
    for(let i = elmDarkMobile.length - 1; i >= 0; --i)
    {elmDarkMobile[i].className = "col m3 s3 center black-text list dark-mode-mobile";} 
    for(let i = elmLightMobile.length - 1; i >= 0; --i)
    {elmLightMobile[i].className = "col m3 s3 center white-text list light-mode-mobile hide";}
    //end

    //top nav light
    for(let i = elmDark.length - 1; i >= 0; --i)
    {elmDark[i].className = "black-text dark-mode ";}
    for(let i = elmLight.length - 1; i >= 0; --i)
    {elmLight[i].className = "white-text light-mode  hide";}

    //card light
    for (let i = 0; i < cardDark.length; i++) {
        cardDark[i].classList.remove('card-dark-mode')
      } 
    //img logo light
    for (let i = 0; i < logoApps.length; i++) {
        logoApps[i].src = "images/logo.png";
      } 
   //nav light
    for (let i = 0; i < navCard.length; i++) {
        navCard[i].classList.remove('dark-mode-navigation');
        navCard[i].classList.add('white');
      } 
    //Text light
    for (let i = 0; i < TextBlack.length; i++) {
        TextBlack[i].classList.remove('white-text')
      }
        localStorage.removeItem('preferredTheme'); //local storage
        document.body.classList.remove("darkModeBody");
}

const mode = () => {
    if(localStorage.getItem('preferredTheme') === 'dark') {
        setDarkMode(true);
     }else{
         setDarkMode(false);
     }
    } 

export { viewHtmlStandings , viewHtmlMatch , viewHtmlTeams , viewHtmlDetailTeam, mode , viewHtmlFavorite , setDarkMode , parseHttpToHttps , init};