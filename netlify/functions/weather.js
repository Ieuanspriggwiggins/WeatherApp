exports.handler = async function (event, context) {

    'use strict'

    const value = process.env.WEATHER_API_KEY;

    const location = event.queryStringParameters.location;

    const request = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${value}&q=${location}&alerts=yes&days=5&aqi=yes`);


    return {
        statusCode: 200,
        body: JSON.stringify({'response': await request.json().then((response) => {return response})}),
    };
};