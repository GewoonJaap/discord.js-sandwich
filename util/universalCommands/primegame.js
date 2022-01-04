const { MessageEmbed } = require('discord.js');
const request = require('../apiRequest');
module.exports = {
  execute: async function () {
    const data = await request.post(
      'https://gaming.amazon.com/graphql?nonce=39d47184-7e2a-4ddc-91cf-a58e113f18cb',
      {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0',
        Accept: '*/*',
        'Accept-Encoding': 'json',
        'Content-Type': 'application/json',
        'Client-Id': 'CarboniteApp',
        'csrf-token': 'gttbTSbgEGE1+8p2g6BBbo8MUPE7OxqlCPHzLT8AAAACAAAAAGHUJWVyYXcAAAAA+8jokd9rqj+wHxPcX6iU',
        'prime-gaming-language': 'en-US',
        Origin: 'https://gaming.amazon.com',
        DNT: '1',
        Connection: 'keep-alive',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        Cookie:
          'session-id=132-7270898-3834048; session-id-time=2082787201l; unique_id=40a401b6-3b6a-4a; ubid-main=133-3751127-2872651; twitch-prime-language=nl-NL; session-token=q2GBe95nj9jDTqcROV7NgevB5kLfeQ0dRHrHsIBv3QWeFgDm4g64dJCu5Dq1jKio9bVfnvamr5hajaHJCok0jhS4SxQnKnts8zShdifBszV09/GcdR38kk3YnO7mqqaJbE5HDvebGiszTdUsjVPuvoYDklOPiUzdoLWvf17BuqAhoVSsI59aCUEsol3OGWSy',
      },
      '{"operationName":"OffersContext_Offers_And_Items","variables":{},"query":"query OffersContext_Offers_And_Items($dateOverride: Time) {\\n  primeOffers(dateOverride: $dateOverride) {\\n    ...PrimeOffer\\n    __typename\\n  }\\n  expiring: items(collectionType: EXPIRING, dateOverride: $dateOverride) {\\n    items {\\n      ...Item\\n      __typename\\n    }\\n    __typename\\n  }\\n  popular: items(collectionType: FEATURED, dateOverride: $dateOverride) {\\n    items {\\n      ...Item\\n      __typename\\n    }\\n    __typename\\n  }\\n  games: items(collectionType: FREE_GAMES, dateOverride: $dateOverride) {\\n    items {\\n      ...Item\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\\nfragment Item on Item {\\n  id\\n  isFGWP\\n  assets {\\n    cardMedia {\\n      defaultMedia {\\n        src1x\\n        src2x\\n        type\\n        __typename\\n      }\\n      __typename\\n    }\\n    externalClaimLink\\n    __typename\\n  }\\n  journey {\\n    id\\n    offers {\\n      ...LinkedJourneyOffer\\n      __typename\\n    }\\n    __typename\\n  }\\n  offers {\\n    id\\n    offerSelfConnection {\\n      eligibility {\\n        offerState\\n        isClaimed\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment PrimeOfferAssets_Pixels on PrimeOfferAssets {\\n  id\\n  pixels {\\n    ...Pixel\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment PrimeOffer on PrimeOffer {\\n  catalogId\\n  id\\n  title\\n  assets {\\n    type\\n    purpose\\n    location\\n    location2x\\n    __typename\\n  }\\n  offerAssets {\\n    ...PrimeOfferAssets_Pixels\\n    __typename\\n  }\\n  description\\n  deliveryMethod\\n  isRetailLinkOffer\\n  priority\\n  tags {\\n    type\\n    tag\\n    __typename\\n  }\\n  content {\\n    externalURL\\n    publisher\\n    categories\\n    __typename\\n  }\\n  startTime\\n  endTime\\n  self {\\n    claimInstructions\\n    orderInformation {\\n      ...PrimeOfferOrderInformation\\n      __typename\\n    }\\n    eligibility {\\n      ...PrimeOfferEligibility\\n      __typename\\n    }\\n    __typename\\n  }\\n  linkedJourney {\\n    ...LinkedJourney\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment PrimeOfferEligibility on OfferEligibility {\\n  isClaimed\\n  canClaim\\n  isPrimeGaming\\n  missingRequiredAccountLink\\n  offerStartTime\\n  offerEndTime\\n  offerState\\n  gameAccountDisplayName\\n  inRestrictedMarketplace\\n  maxOrdersExceeded\\n  conflictingClaimAccount {\\n    ...ConflictingClaimAccount\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment LinkedJourney on Journey {\\n  offers {\\n    ...LinkedJourneyOffer\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment LinkedJourneyOffer on JourneyOffer {\\n  catalogId\\n  grantsCode\\n  self {\\n    eligibility(getOnlyActiveOffers: true) {\\n      canClaim\\n      isClaimed\\n      conflictingClaimAccount {\\n        ...ConflictingClaimAccount\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment PrimeOfferOrderInformation on OfferOrderInformation {\\n  orderDate\\n  orderState\\n  claimCode\\n  __typename\\n}\\n\\nfragment Pixel on Pixel {\\n  type\\n  pixel\\n  __typename\\n}\\n\\nfragment ConflictingClaimAccount on ConflictingClaimUser {\\n  fullName\\n  obfuscatedEmail\\n  __typename\\n}\\n","extensions":{}}'
    );
    if (data.status) {
      let freeGames = [];
      let freeGamesEmbeds = [];
      const games = data.data.data.primeOffers;
      for (let i = 0; i < games.length; i++) {
        if (games[i].content.categories && games[i].content.categories.length != 0) {
          if (games[i].content.categories.indexOf('In-Game Content') == -1) {
            freeGames.push(games[i]);
          }
        }
      }
      freeGames.forEach(game => {
        const embed = new MessageEmbed()
          .setColor('0x0000FF')
          .setTitle(`Free prime game: ${game.title}`)
          .setDescription(game.title)
          .setThumbnail(game.assets[0].location2x)
          .setImage(game.assets[0].location2x)
          .setURL(game.content.externalURL)
          .setTimestamp();
        freeGamesEmbeds.push(embed);
      });
      return freeGamesEmbeds;
    } else {
      const embed = new MessageEmbed()
        .setColor('0x0000ff')
        .setTitle(`Free Amazon Prime game(s): NOT FOUND`)
        .setDescription("Sorry, we couldn't fetch the free game(s) :(")
        .setTimestamp();
      return [embed];
    }
  },
  description: 'Get all the current free Amazon Prime Games',
};
