//Function to read game data from the JSON
function fetchCatalog(file, type) {
    fetch(file)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //Testing which thing ot build with the data
            if(type == 1){
                buildCatalog(data);   
            }
            else{
                buildPage(data, type);
            }
        })
        .catch(function (err) {
            console.log('error:' + err);
        })
}

//Function to build the index's catalog from the gathered data
function buildCatalog(data) {
    //Getting the catalog to put entries into it
    let catalog = document.getElementById("catalog");

    for (let type in data) {
        for (let game of data[type]) {
            //Declaring and Initialising each game entry's elements
            let division1 = document.createElement("div");
            let division2 = document.createElement("div");
            let image = document.createElement("img");
            let division3 = document.createElement("div");
            let paragraph = document.createElement("p");
            let division4 = document.createElement("div");
            let link = document.createElement("a");
            let button = document.createElement("button");

            //Setting the correct formatting/data
            division1.className = "col";
            division2.className = "card shadow-sm card-border";
            image.src = game.image;
            image.alt = game.title;
            division3.className = "card-body";
            paragraph.className = "card-text";
            paragraph.innerText = `${game.description}`;
            division4.className = "item-btns";
            link.href = game.page;
            link.target = "_self";
            button.className = "item-btns btn btn-primary";
            button.type = "button";
            button.innerText = "More";

            //Appending everything together to get the correct structure
            catalog.appendChild(division1);
            division1.appendChild(division2);
            division2.appendChild(image);
            division2.appendChild(division3);
            division3.appendChild(paragraph);
            division3.appendChild(division4);
            division4.appendChild(link);
            link.appendChild(button);
        }
    }
}

function buildPage(data, name){

    for (let type in data) {
        for (let game of data[type]) {
            //Checking for the correct game
            if(game.title === name){
                //Setting the image
                let image = document.getElementById("image");
                image.src = `.${game.image}`;
                image.alt = game.title;

                //Setting the title and description
                document.getElementById("title").textContent = game.title;
                document.getElementById("description").textContent = game.description;

                //Setting all of the table information
                document.getElementById("relDate").textContent = game.releaseDate;
                document.getElementById("dev").textContent = game.developer;
                document.getElementById("pub").textContent = game.publisher;
                document.getElementById("platforms").textContent = game.platforms;
                document.getElementById("genres").textContent = game.genres;
                document.getElementById("numPlayers").textContent = game.numOfPlayers;
                document.getElementById("recommended").textContent = game.recommender;
            }
        }

    }
}