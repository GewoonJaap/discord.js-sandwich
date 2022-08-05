const request = require('../apiRequest');
const { v4: uuidv4 } = require('uuid');
module.exports = {
    getSecurityHeaders: async function () {
     let returnData = {
        'session-id': undefined,
       'session-id-time': undefined,
       'unique_id': uuidv4().substring(0,16),
       'ubid-main': undefined,
       'session-token': undefined,
       'csrf': 'gi26JtujGNjYOVCZ5Jp16xrleq+lGtB/cTzUkp8AAAACAAAAAGHr4JdyYXcAAAAA+8jokd9rqj+wHxPcX6iU',
    }
     const data1 = await request.execute('https://gaming.amazon.com/home');
    returnData['session-id'] = module.exports.getCookieValue(data1.headers['set-cookie'][0]);
    returnData['session-id-time'] = module.exports.getCookieValue(data1.headers['set-cookie'][1]);
   // returnData['csrf'] = module.exports.getCSRFToken(data1.data);
    
    
     const data2 = await request.post(
        `https://gaming.amazon.com/graphql?nonce=${uuidv4()}`,
        {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0',
            Accept: '*/*',
            'Accept-Encoding': 'json',
            'Content-Type': 'application/json',
            'Client-Id': 'CarboniteApp',
            'csrf-token':  returnData['csrf'],
            'prime-gaming-language': 'en-US',
            Origin: 'https://gaming.amazon.com',
            DNT: '1',
            Connection: 'keep-alive',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            "Cookie": `session-id=${returnData['session-id']}; session-id-time=${returnData['session-id-time']}; unique_id=${returnData['unique_id']}`
        },
        JSON.stringify({
            "operationName": "Entry_Points_User",
            "variables": {
              "weblabTreatmentList": [
                "PG_326549",
                "PG_ITEM_DETAIL_PAGES_LAUNCH_348615",
                "PG_NIMBUS_365024",
                "PG_TO_THE_MOON_372912",
                "PG_AR_LANGUAGE_388329",
                "PG_CARBON_VILLAGER_396407",
                "PG_CARBON_NOOKS_CRANNY_396732",
                "PG_CARBON_BLATHERS_MUSEUM_396737",
                "PG_CARBON_CELESTE_397753",
                "PG_CARBON_KANZ_III_397263",
                "PG_GIDGET_401947"
              ]
            },
            "query": "fragment EntryPointsUser_TwitchAccount on TwitchAccount {\n  tuid\n  __typename\n}\n\nfragment EntryPointsUser_CurrentUser on CurrentUser {\n  id\n  isTwitchPrime\n  isAmazonPrime\n  isSignedIn\n  firstName\n  twitchAccounts {\n    ...EntryPointsUser_TwitchAccount\n    __typename\n  }\n  __typename\n}\n\nfragment EntryPointsUser_Weblab on Weblab {\n  name\n  treatment\n  __typename\n}\n\nfragment EntryPointsUser_PrimeMarketplace on PrimeMarketplace {\n  id\n  marketplaceCode\n  __typename\n}\n\nfragment EntryPointsUser_CountryOfResidence on Country {\n  countryCode\n  primeGamingEligibility\n  __typename\n}\n\nquery Entry_Points_User($weblabTreatmentList: [String!]!) {\n  currentUser {\n    ...EntryPointsUser_CurrentUser\n    __typename\n  }\n  primeMarketplace {\n    ...EntryPointsUser_PrimeMarketplace\n    __typename\n  }\n  countryOfResidence {\n    ...EntryPointsUser_CountryOfResidence\n    __typename\n  }\n  weblabTreatmentList(weblabNameList: $weblabTreatmentList) {\n    ...EntryPointsUser_Weblab\n    __typename\n  }\n}\n",
            "extensions": {}
          })
        );
      console.log(data2)
     console.log(returnData)
     return returnData;
    },
    getCookieValue(cookieData){
        try{
        return cookieData.split('=')[1].split(';')[0].trim();
        }
        catch(e){
            return cookieData;
        }
    },
    getCSRFToken(body){
        let csrf = body.split('csrf-key')[1];
        csrf = csrf.split(`value='`)[1];
        csrf = csrf.split(`'`)[0];
        console.log(csrf);
       return csrf;
    }
  };