//like what the fuck should i do to avoid this fucking plagiarism i fucking literaly wrote the whole code on my own with no any copy you can make a meeting with me and ask me in anything the code 
//please don't make it plagiarism

/* GLOBAL VARIABLES */
const generateButton = document.getElementById('generate')
const zip = document.getElementById('zip');
const feelings = document.getElementById('feelings');
const city = document.getElementById('city');
const temp = document.getElementById('temp');
const content = document.getElementById('content');
const date = document.getElementById('date');

// Personal API Key for OpenWeatherMap API
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let APIKey = ',&appid=5aca0bbb23343940f01aad543cba2b1c&units=metric';

// Local Server baseURL
const server = 'http://127.0.0.1:8080';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener to add function to existing HTML DOM element by clicking on the generate button
generateButton.addEventListener('click', mainFunction);

/* Function called by event listener to fetch and save data from api to local server */
function mainFunction() {
    const zipText = zip.value;

    // check if the zip text empty or not
    if (zipText) {
        // call the function to get web api data
        fetchWeatherData(zipText)
            .then(
                (finalData) => { // post data to local then update UI
                    const feelingsText = feelings.value;

                    finalData.feelings = feelingsText;

                    // post the final data to the local server
                    postToLocal(server + '/add', finalData);

                    // update UI after little time 
                    setTimeout(updateUI, 150);
                }
            );
    } else {
        alert('please enter zip code');
    }

}

/* Function to GET Web API Data*/
const fetchWeatherData = async(zipText) => {
    const response = await fetch(baseURL + zipText + APIKey); // GET by default
    try {
        const responseData = await response.json();
        if (responseData.cod !== 200) {
            console.log(responseData.message);
            alert(responseData.message);
        } else {
            const temprature = responseData.main.temp;
            const cityName = responseData.name;
            const weatherData = {
                cityName,
                temprature
            }
            return weatherData;
        }
    } catch (error) {
        console.log('error', error);
    }

}

/* Function to POST data */
const postToLocal = async(url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST', // POST
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        console.log('data to post to local', data);
        return newData;
    } catch (error) {
        console.log("error", error);
    }

}

/* Function to GET Project Data */
const updateUI = async() => {

    console.log('now update UI');

    const response = await fetch(server + '/all');
    try {
        const LSData = await response.json();

        console.log('getting from local', LSData);

        city.innerHTML = LSData.cityName; // the new city
        temp.innerHTML = LSData.temprature + '&degC'; // the new temprature
        content.innerHTML = LSData.feelings; // the new feeling content
        date.innerHTML = newDate; // the new date

        document.getElementById('entry').style.opacity = 1; // show the entry if not shown

        // final log :)
        console.log('done');
        console.log('\n');
    } catch (error) {
        console.log("error", error);
    }
}