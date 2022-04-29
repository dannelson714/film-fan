const urlArray = window.location.href.split("/");
var urlWhere = urlArray.at(-1);
const finalURL = urlWhere.replace("20", " ")
console.log(urlWhere);
// var searchResult = window.location.search;
// console.log(searchResult);
// var searchResult = getParameterByName('search-result');

const getMovies = async () => {
    console.log("ding ding");
    let movies = await fetch(
        "https://protected-escarpment-79312.herokuapp.com//api/movies"
    )
        .then((data) => data.json())
        .then((movieData) => movieData);

    return movies;
};

const movieList = getMovies();



function searchTitle(title) {
    title = title.toLowerCase();
    title = title.replace(/[^A-Za-z0-9' ]/g, "");
    const newTitle = title.split(" ");
    return newTitle;
}


const searchResult2 = searchTitle(finalURL);

console.log(searchResult2);

async function generateGal() {
    const movieDB = await getMovies();
    resultList = [];
    let resultsArray = searchResult2.map((word) => {
        return movieDB.filter((movie) => movie.searchTitle.includes(word));
    });

    let returnArray = [];
    
    for (i=0; i<resultsArray.length; i++) {
        for (j=0; j<resultsArray[i].length; j++) {
            let boolArray = []
            if (!returnArray.lenth) {
                returnArray.push(resultsArray[i][j]);
            }
            else {
                for (k=0; k<returnArray.length; k++) {
                    boolArray.push(returnArray[k].title === resultsArray[i][j].title);
                }
            }
            if (!boolArray.includes(true)) {
                returnArray.push(resultsArray[i][j]);
            }
        }
    }

    showResults(returnArray);
};




function showResults(resultList) {
    const resultGallery = document.querySelector("#gallery-list");
    for (i = 0; i < resultList.length; i++) {
        const newLink = document.createElement("a");
        const newCard = document.createElement("div");
        const newPoster = document.createElement("img");
        const newBody = document.createElement("div");
        const newText = document.createElement("p");

        newText.textContent = resultList[i].title;

        resultGallery.appendChild(newCard);
        newCard.appendChild(newLink);
        newLink.appendChild(newPoster);
        newCard.appendChild(newBody);
        newBody.appendChild(newText);

        newCard.setAttribute("class", "card");
        newCard.setAttribute("style", "width: 18rem;");
        newLink.setAttribute("href", `/review/${resultList[i].id}`);
        newPoster.setAttribute("class", "card-img-top");
        newPoster.setAttribute("src", `${resultList[i].poster}`);
        newPoster.setAttribute("alt", `${resultList[i].title} film poster`);
        newBody.setAttribute("class", "card-body");
        newText.setAttribute("class", "card-text");
    }
}

generateGal();
//Needs https://stackoverflow.com/questions/44342226/next-js-error-only-absolute-urls-are-supported
//Needs DB and server to be spun up

//Create cards with info
