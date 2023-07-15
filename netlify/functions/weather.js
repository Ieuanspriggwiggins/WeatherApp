exports.handler = async function (event, context) {
    const value = process.env.WEATHER_API_KEY;

    //

    const location = event.queryStringParameters.location;



    return {
        statusCode: 200,
        body: JSON.stringify(fetch(`https://api.weatherapi.com/v1/forecast.json?key=${value}&q=${locationName}&alerts=yes&days=5&aqi=yes`)
            .then((response) => { return response.json() })
            .then((response) => {return response})),
    };
};