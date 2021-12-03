/**
 *  OMDb template
 *	Documentation: http://www.omdbapi.com/
 *  Generate an API key here: http://www.omdbapi.com/apikey.aspx
 */


/**
 * According to documentation, you need at least 2 parameters when calling the API http://www.omdbapi.com/
 * 1 Required parameter: apikey
 * 2 Required parameter: One of the following i=, t= or s=
 *
 * 
 * Example with parameter s=star trek
 * http://www.omdbapi.com/?apikey=[yourkey]&s=star trek
 *
 * Example with parameter s=star trek AND y=2020
 * http://www.omdbapi.com/?apikey=[yourkey]&s=star trek&y=2020
 *
 * Example with parameter s=star trek AND type=series
 * http://www.omdbapi.com/?apikey=[yourkey]&s=star trek&type=series
 *
 */

for (y = 1972; y <= 2021; y++) {
    var optn = document.createElement("OPTION");
    optn.text = y;
    optn.value = y;
    document.getElementById('movieyear').options.add(optn);
}


let baseurl = 'http://www.omdbapi.com/?apikey=86bce559';


function myMovieList() {
    var name = moviename.value;
    var url = baseurl + '&s=' + name;
    Getdata(url);
}

function choosetype() {
    var type = movietype.value;
    let url = baseurl + '&s=' + moviename.value + '&type=' + type;
    Getdata(url);
}

function chooseyear() {
    var year = movieyear.value;
    let url = baseurl + '&s=' + moviename.value + '&y=' + year;
    Getdata(url);
}


function Getdata(url) {
    fetch(url).then(function(response) {
        return response.json();
    }).then(function(data) {

        let maincontent = document.getElementById('main-content');
        maincontent.innerHTML = '';

        if (data.Response != 'False') {

            for (let x = 0; x < data.Search.length; x++) {

                let boxelemet = document.createElement('div');
                let title = document.createElement('div');
                let content = document.createElement('div');
                let type = document.createElement('p');
                let year = document.createElement('p');
                let imdbid = document.createElement('p');
                let image = document.createElement('img');

                boxelemet.setAttribute('class', 'box');
                title.setAttribute('class', 'title');
                content.setAttribute('class', 'content');
                image.setAttribute('alt', 'width 100px');

                type.innerText = data.Search[x].Type
                title.innerText = data.Search[x].Title;
                year.innerText = data.Search[x].Year
                imdbid.innerText = data.Search[x].imdbID
                image.src = data.Search[x].Poster

                content.appendChild(type);
                content.appendChild(year);
                content.appendChild(imdbid);
                boxelemet.appendChild(title);
                boxelemet.appendChild(content);
                boxelemet.appendChild(image);
                maincontent.appendChild(boxelemet);
            }
        }

    });

}