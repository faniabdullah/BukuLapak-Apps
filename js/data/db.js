let dbPromised = idb.open("clubs-favorite", 1, (upgradeDb) => {

    let dbImageTeamsForMatch = upgradeDb.createObjectStore("teams-match", {
      keyPath: "id"
    });

    let dbTeamForFavorite = upgradeDb.createObjectStore("team-favorite", {
        keyPath: "id"
      });

    let dbSquadFavorite = upgradeDb.createObjectStore("squad-favorite", {
        keyPath: 'id'
      });

    dbTeamForFavorite.createIndex('date', 'date');
    dbSquadFavorite.createIndex('date', 'date');
    dbImageTeamsForMatch.createIndex('date', 'date');
  });



  const dbTeamsMatch = {
    get: async (id) => {
      return (await dbPromised)
        .transaction('teams-match')
        .objectStore('teams-match')
        .get(id);
    },
  
    insert: async (data) => {
      let tx = (await dbPromised).transaction('teams-match', 'readwrite');
      tx.objectStore('teams-match').add(data);
      return tx.complete;
    },
  
    update: async (data) => {
      let tx = (await dbPromised).transaction('teams-match', 'readwrite');
      tx.objectStore('teams-match').put(data);
      return tx.complete;
    },
    delete: async (id) => {
      return (await dbPromised)
        .transaction('teams-match', 'readwrite')
        .objectStore('teams-match')
        .delete(id);
    }
  };


  const dbForFavorite = {
    get: async (id) => {
      return (await dbPromised)
        .transaction('team-favorite')
        .objectStore('team-favorite')
        .get(id);
    },
    getAll: async () => {
      return (await dbPromised)
        .transaction('team-favorite')
        .objectStore('team-favorite')
        .getAll();
    },
    insert: async (data) => {
      let tx = (await dbPromised).transaction('team-favorite', 'readwrite');
      tx.objectStore('team-favorite').add(data);
  
      return tx.complete;
    },
    update: async (data) => {
      let tx = (await dbPromised).transaction('team-favorite', 'readwrite');
      tx.objectStore('team-favorite').put(data);
  
      return tx.complete;
    },
    delete: async (id) => {
      return (await dbPromised)
        .transaction('team-favorite', 'readwrite')
        .objectStore('team-favorite')
        .delete(id);
    }
  };

  const dbSquadFavorite = {
    get: async (id) => {
      return (await dbPromised)
        .transaction('squad-favorite')
        .objectStore('squad-favorite')
        .get(id);
    },
    getAll: async () => {
      return (await dbPromised)
        .transaction('squad-favorite')
        .objectStore('squad-favorite')
        .getAll();
    },
    insert: async (data) => {
      let tx = (await dbPromised).transaction('squad-favorite', 'readwrite');
      tx.objectStore('squad-favorite').add(data);
  
      return tx.complete;
    },
    update: async (data) => {
      let tx = (await dbPromised).transaction('squad-favorite', 'readwrite');
      tx.objectStore('squad-favorite').put(data);
  
      return tx.complete;
    },
    delete: async (id) => {
      return (await dbPromised)
        .transaction('squad-favorite', 'readwrite')
        .objectStore('squad-favorite')
        .delete(id);
    }
  };


  export { dbForFavorite, dbSquadFavorite , dbTeamsMatch };