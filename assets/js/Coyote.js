export default class Coyote {
  constructor(coyote) {
    this.date = coyote.Dat_obs;
    this.arrondissement = coyote.Territoire;
    this.heure = coyote.Hr_obs;
    this.periode = coyote.Periode;
    this.nbCoyotes = coyote.Nb_coyotes 
    this.statut = coyote.Statut_animal ? coyote.Statut_animal : "non définit";
    this.latitude = coyote.Lat;
    this.longitude = coyote.Long;
    this.id = coyote._id;
    this.conteneurHTML = document.querySelector("[data-container]");

    this.init();
  }

  init() {
    this.afficherCoyote();
  }

  // Afficher les données dans le HTML
  async afficherCoyote() {
    const donnees = await fetch("../../templates/coyotes.html");
    let templateHtml = await donnees.text();
console.log(this.statut);

    const view = {
      date: this.date,
      heure: this.heure,
      periode: this.periode,
      lieu: this.arrondissement,
      nbCoyote: this.nbCoyotes,
      id: this.id,
      // FIXME: //le status ne s'affiche pas dans le html
      statut: this.statut,  
    };
    const html = Mustache.render(templateHtml, view);
    this.conteneurHTML.insertAdjacentHTML('beforeend', html);
  }
}
