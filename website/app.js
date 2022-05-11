/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = ',&appid=5aca0bbb23343940f01aad543cba2b1c&units=metric';
const server = "http://127.0.0.1:8080";

const postData = async(url = '', data = {}) => {
    //console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    });
    console.log(response);
    try {
        const newData = await response.json();
        console.log(newData, `saved successfully to the server`);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

//Function to GET Web API Data
const getWeatherData = async(zip) => {
    try {
        const response = await fetch(baseURL + zip + apiKey);
        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
};


const generateTheData = () => {
    // get value after click on the button
    const zip = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;

    // getWeatherData return promise
    getWeatherData(zip).then((data) => {
        // making sure from the received data to execute rest of the steps
        if (data) {
            const {
                main: { temp },
                name: city,
                weather: [{ description }],
            } = data;

            const info = {
                newDate,
                city,
                temp: Math.round(temp), // to get integer number
                description,
                feelings,
            };

            postData(server + "/add", info);

            updateUI();

            document.getElementById('entry').style.opacity = 1;

        }
    });
};

// Event listener to add function to existing HTML DOM element
// Function called by event listener
document.getElementById("generate").addEventListener("click", generateTheData);

// Function to update the UI with the new data
const updateUI = async() => {
    const response = await fetch(server + '/all');
    try {
        const savedData = await response.json();
        const date = document.getElementById("date");
        const temp = document.getElementById("temp");
        const content = document.getElementById("content");
        const city = document.getElementById("city");
        const descrtiption = document.getElementById("description");

        date.innerHTML = savedData.newDate;
        temp.innerHTML = savedData.temp + '&degC';
        content.innerHTML = savedData.feelings;
        city.innerHTML = savedData.city;
        descrtiption.innerHTML = savedData.description;
    } catch (error) {
        console.log(error);
    }
}