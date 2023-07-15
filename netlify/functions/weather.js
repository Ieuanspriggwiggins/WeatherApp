exports.handler = async function (event, context) {
    const value = process.env.WEATHER_API_KEY;

    //https://api.weatherapi.com/v1/forecast.json?key=${_weatherKey}&q=${locationName}&alerts=yes&days=5&aqi=yes

    const location = event.queryStringParameters.location;

    return {
        statusCode: 200,
        body: JSON.stringify({ message: `Value of MY_IMPORTANT_VARIABLE is ${location}.` }),
    };
};