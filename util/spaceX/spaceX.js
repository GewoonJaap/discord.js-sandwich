const request = require('../apiRequest');
const helper = require('../helper');
module.exports = {
  GetUpcomingLaunch: async function () {
    let launchData = await request.execute('https://api.spacexdata.com/v4/launches/next');
    if (!launchData.status) return launchData;
    launchData = await module.exports.GetLaunch(launchData.data.id);
    return { status: true, data: launchData };
  },

  GetLatestLaunch: async function () {
    let launchData = await request.execute('https://api.spacexdata.com/v4/launches/latest');
    if (!launchData.status) return launchData;
    launchData = await module.exports.GetLaunch(launchData.data.id);
    return { status: true, data: launchData };
  },

  GetLaunch: async function (launchId) {
    let launchData = await request.execute(`https://api.spacexdata.com/v4/launches/${launchId}`);
    if (!launchData.status) return launchData;
    launchData = launchData.data;
    if (launchData.rocket) {
      const rocketData = await module.exports.GetRocket(launchData.rocket);
      if (rocketData.status) launchData.rocket = rocketData.data;
    }

    if (launchData.crew && launchData.crew.length != 0) {
      let finalcrew = [];
      await helper.asyncForEach(launchData.crew, async crewId => {
        const crew = await module.exports.GetCrew(crewId);
        if (crew.status) finalcrew.push(crew.data);
      });
      launchData.crew = finalcrew;
    }

    if (launchData.ships && launchData.ships.length != 0) {
      let finalShips = [];
      await helper.asyncForEach(launchData.ships, async shipId => {
        const ship = await module.exports.GetShip(shipId);
        if (ship.status) finalShips.push(ship.data);
      });
      launchData.ships = finalShips;
    }
    if (launchData.capsules && launchData.capsules.length != 0) {
      let finalCapsules = [];
      await helper.asyncForEach(launchData.capsules, async capsuleId => {
        const capsule = await module.exports.GetCapsule(capsuleId);
        if (capsule.status) finalCapsules.push(capsule.data);
      });
      launchData.capsules = finalCapsules;
    }

    if (launchData.payloads && launchData.payloads.length != 0) {
      let finalPayloads = [];
      await helper.asyncForEach(launchData.payloads, async payloadId => {
        const payload = await module.exports.GetPayload(payloadId);
        if (payload.status) finalPayloads.push(payload.data);
      });
      launchData.payloads = finalPayloads;
    }

    if (launchData.launchpad) {
      const launchpad = await module.exports.GetLaunchpad(launchData.launchpad);
      if (launchpad.status) launchData.launchpad = launchpad.data;
    }

    if (launchData.cores && launchData.cores.length != 0) {
      let finalCores = [];
      await helper.asyncForEach(launchData.cores, async Core => {
        const core = await module.exports.GetCore(Core.core);
        if (core.status) finalCores.push(core.data);
      });
      launchData.cores = finalCores;
    }
    return launchData;
  },

  GetRocket: async function (rocketId) {
    const rocketData = await request.execute(`https://api.spacexdata.com/v4/rockets/${rocketId}`);
    return rocketData;
  },
  GetCrew: async function (crewId) {
    const crewData = await request.execute(`https://api.spacexdata.com/v4/crew/${crewId}`);
    return crewData;
  },
  GetShip: async function (shipId) {
    const shipData = await request.execute(`https://api.spacexdata.com/v4/ships/${shipId}`);
    return shipData;
  },
  GetCapsule: async function (capsuleId) {
    const capsuleData = await request.execute(`https://api.spacexdata.com/v4/capsules/${capsuleId}`);
    return capsuleData;
  },
  GetPayload: async function (payloadId) {
    const payloadData = await request.execute(`https://api.spacexdata.com/v4/payloads/${payloadId}`);
    return payloadData;
  },
  GetLaunchpad: async function (launchPadId) {
    const launchPadData = await request.execute(`https://api.spacexdata.com/v4/launchpads/${launchPadId}`);
    return launchPadData;
  },
  GetCore: async function (coreId) {
    const coreData = await request.execute(`https://api.spacexdata.com/v4/cores/${coreId}`);
    return coreData;
  },
};
