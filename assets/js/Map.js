import coyotesData from "./coyotesData.js";

export default class Map {
    constructor() {
        this.map;
        this.arrayCoyotes = coyotesData;

        this.init();
    }

    async init() {
        mapboxgl.accessToken =
            "pk.eyJ1IjoidmFsbW8iLCJhIjoiY2xwMzd4dzQ2MHZxNDJranoxNTAycTZraCJ9.SSx5wDxtgKws5Sl6JCkGkA";
        this.map = new mapboxgl.Map({
            container: "map", // container ID
            style: "mapbox://styles/mapbox/streets-v12", // style URL
            center: [-73.5673, 45.5017], // Centre de Montréal [lng, lat]
            zoom: 10, // Zoom initial, ajustez selon vos besoins
        });
        // Attendre que la carte soit chargée
        this.map.on("load", () => {
            console.log("Map is loaded!");
            this.addCustomMarkers();
        });
    }

    addCustomMarkers() {
        // Charger l'image une seule fois à l'extérieur de la boucle
        this.map.loadImage("assets/png/coyote.png", (error, image) => {
            if (error) throw error;
    
            // Ajouter l'image au style de la carte
            this.map.addImage("coyote-marker", image);
    
            // Iterer sur le tableau arrayCoyotes pour créer les marqueurs
            this.arrayCoyotes.forEach((coyote) => {
                // Ajouter une source de marqueur
                this.map.addSource(`custom-marker-source-${coyote.id}`, {
                    type: "geojson",
                    data: {
                        type: "FeatureCollection",
                        features: [
                            {
                                type: "Feature",
                                geometry: {
                                    type: "Point",
                                    coordinates: [coyote.longitude, coyote.latitude],
                                },
                            },
                        ],
                    },
                });
    
                // Ajouter une couche de symboles avec le marqueur personnalisé
                this.map.addLayer({
                    id: `custom-marker-layer-${coyote.id}`,
                    type: "symbol",
                    source: `custom-marker-source-${coyote.id}`,
                    layout: {
                        "icon-image": "coyote-marker",
                        "icon-size": 0.3,
                    },
                });
            });
        });
    }
}    