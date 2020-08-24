import { dbForFavorite, dbSquadFavorite } from "../data/db.js";

const isFavoriteTeams = async (id) => {
    let elm =  document.querySelector("#favorite-teams"+id);
    await dbForFavorite.get(id).then((item)=>{
        if (item) {
            if (item.favorite === true) {
                M.toast({html: `Team berhasil dihapus dari favorit`})
                dbForFavorite.update({
                    id: item.id,
                    name: item.name,
                    imgTeam: item.imgTeam,
                    address: item.address,
                    phone:item.email,
                    website:item.website,
                    favorite:false,
                    created: new Date().getTime()
                });
            elm.innerHTML ="favorite_border";
            }else{
               
                dbForFavorite.update({
                    id: item.id,
                    name: item.name,
                    imgTeam: item.imgTeam,
                    address: item.address,
                    phone:item.email,
                    website:item.website,
                    favorite:true,
                    created: new Date().getTime()
                });
                elm.innerHTML ="favorite";
                M.toast({html: `Team berhasil ditambahkan ke favorit`})
            }
        }
    });

   
}


const checkFavoriteTeams = (id)=>{
    let elm =  document.querySelector("#favorite-teams"+id);
    dbForFavorite.get(id).then((item)=>{
        if (item) {
            if (item.favorite === true) { 
            elm.innerHTML ="favorite";
            }else{
            elm.innerHTML ="favorite_border";
            }
        }
    })
}

const saveSquadFav = (id='',name='',nationality='',position='') => {
    let elm =  document.querySelector("#favorite-squad"+id);
    dbSquadFavorite.get(id).then((item)=>{
        if (item) {
        dbSquadFavorite.delete(id);
      
        elm.innerHTML ="favorite_border";
        M.toast({html: `Player ${name} berhasil dari diihapus difavorit`})
        }else{
            dbSquadFavorite.insert({
                id: id,
                name: name,
                nationality: nationality,
                position: position,
                created: new Date().getTime()
            });
        elm.innerHTML ="favorite";
        M.toast({html: `Player ${name} berhasil di favoritkan`})
        }
    })
} 

const checkFavoriteSquad = ()=>{
    dbSquadFavorite.getAll().then((item)=>{
        item.forEach((squad)=>{
        let elm =  document.querySelector("#favorite-squad"+squad.id);
        if (elm) {
            elm.innerHTML ="favorite";
        }
        });
    });
}


export { checkFavoriteTeams , checkFavoriteSquad , isFavoriteTeams , saveSquadFav};
