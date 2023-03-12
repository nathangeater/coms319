function fetchCatalog() {
    fetch('data.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            buildCatalog(data);
        })
        .catch(function (err) {
            console.log('error:' + err);
        })
}


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
            image.alt = game.imageAlt;
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