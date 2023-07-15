exports.handler = async function (event, context) {

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
    };


    const value = process.env.WEATHER_API_KEY;

    const location = event.queryStringParameters.location;

    const request = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${value}&q=${location}&alerts=yes&days=5&aqi=yes`);


    return {
        statusCode: 200,
        headers,
        body: JSON.stringify({'response': await request.json().then((response) => {return response})}),
    };
};