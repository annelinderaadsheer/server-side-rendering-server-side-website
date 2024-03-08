/*** Express setup & start ***/
// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from "./helpers/fetch-json.js";

// Importeer het npm pakket express uit de node_modules map
import express from "express";

// Maak een nieuwe express app aan
const app = express();

// Stel ejs in als template engine
app.set("view engine", "ejs");

// Stel de map met ejs templates in
app.set("views", "./views");

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static("public"));

//Zorg dat werken met request data makkelijker wordt
app.use(express.urlencoded({ extended: true }));

//Als iemand mijn route pagina bezoekt, dan rendert de homepage
app.get("/", function (request, response) {
  response.render("homepage");
});

//Eigen data inladen
app.get("/vraag-aanbod", function (request, response) {
  fetchJson("https://fdnd-agency.directus.app/items/dh_services").then(
    (apiData) => {
      {
        response.render("vraag-aanbod.ejs", { vraagaanbod: apiData.data });
      }
    }
  );
});

// Stel het poortnummer in waar express op moet gaan luisteren
app.set("port", process.env.PORT || 8000);

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get("port"), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get("port")}`);
});
