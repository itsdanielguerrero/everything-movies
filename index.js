const Alexa = require('ask-sdk-core')
const axios = require('axios')

function getDirector(title) {
  const url = `http://www.omdbapi.com/?t=${title}&apikey=${process.env.API_KEY}`

  return axios.get(url).then(function (response) {
    return response.data.Director
  })
}

const DirectorIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
        handlerInput.requestEnvelope.request.intent.name === 'DirectorIntent'
    },
    handle(handlerInput) {
      const title = handlerInput.requestEnvelope.request.intent.slots.Title.value
  
      return getDirector(title).then(function (director) {
        const speechText = `The director of ${title} is <emphasis>${director}</emphasis>`
  
        return handlerInput.responseBuilder
          .speak(speechText)
          .getReponse()
      })
    }
  }

const ErrorHandler = {
    canHandle (){
        return true
    },
    handel(handlerInput) {
        return handlerInput.responseBuilder
            .speak('My bad, I did not catch that. Can you repeat it?')
            .reprompt('My bad, I did not catch that. Can you repeat it?')
            .withShouldEndSession(false)
            .getReponse()

    },
}

exports.handler = builder
  .addRequestHandlers(DirectorIntentHandler)
  .addErrorHandlers(ErrorHandler)
  .lambda()