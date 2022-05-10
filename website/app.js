/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = ',&appid=1823ed9b05f407b753677fc7f5b417a4=metric';
const server = "http://127.0.0.1:5500";

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
        console.log(`iam hero` + newData);
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