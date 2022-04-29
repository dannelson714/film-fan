
const getMovies = async () => {
    console.log("ding ding");
    let movies = await fetch(
      "https://protected-escarpment-79312.herokuapp.com/api/movies"
    ).then(data => data.json()).then(movieData => movieData)
        console.log({movies});
    return movies
}



function titleSearch(title) {
    title = title.toLowerCase();
    title = title.replace(/[^A-Za-z0-9' ]/g,"");
    const newTitle = title.split(" ")
    return newTitle;
}
const searchBtn = document.getElementById('search')
const searchFormHandler = async (event) => {
    event.preventDefault();

    console.log('click');

    let searchResult = document.querySelector('#search-result').value.trim();
    console.log(searchResult);
    const searchResult2 = titleSearch(searchResult);

    console.log(searchResult2);

    const movieDB = await getMovies();
    resultsArray = [];
    resultsArray.push(searchResult2.map(word => {
        return movieDB.filter(movie => movie.searchTitle.includes(word) 
        )})
    )
    // let returnArray = [];
    
    // for (i=0; i<resultsArray.length; i++) {
    //     for (j=0; j<resultsArray[i].length; j++) {
    //         let boolArray = []
    //         if (!returnArray.lenth) {
    //             returnArray.push(resultsArray[i][j]);
    //         }
    //         else {
    //             for (k=0; k<returnArray.length; k++) {
    //                 boolArray.push(returnArray[k].title === resultsArray[i][j].title);
    //             }
    //         }
    //         if (!boolArray.includes(true)) {
    //             returnArray.push(resultsArray[i][j]);
    //         }
    //     }
    // }
    // console.log(resultsArray);
    // console.log(returnArray);

    if (resultsArray.length) {
        document.location.replace(`/api/movies/results/${searchResult}`);
    }
    else {
        alert('No film matching those terms! Please search again.')
    }


}

searchBtn.addEventListener('click', searchFormHandler);
