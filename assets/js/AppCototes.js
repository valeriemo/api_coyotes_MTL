import Coyote from "./Coyote.js";

export default class AppCoyotes {
  constructor() {
    this.tableauCoyotes = [];
    
    this.init();
  }

  init() {
    this.getCoyotes();
  }

  async getCoyotes() {
    const resourceId = "f5183819-098c-418a-ae2e-d8011970adf5";
    const limit = 5;
    // Utilisez le champ de tri approprié (par exemple, '_id' pour l'identifiant)
    const sortOrder = "_id desc";
    const url = `https://donnees.montreal.ca/api/3/action/datastore_search?resource_id=${resourceId}&limit=${limit}&sort=${sortOrder}`;
    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const resultData = data.result;
        const resultCoyotes = resultData.records;
        this.showCoyotes(resultCoyotes);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  showCoyotes(coyotes) {
    coyotes.forEach((coyote) => {
      // Créer un objet Coyote pour chaque entrée
      const newCoyote = new Coyote(coyote);
      // Ajouter l'objet Coyote au tableauCoyote
      this.tableauCoyotes.push(newCoyote);
    });
  }
}
