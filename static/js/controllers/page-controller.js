class PageController {
  #mus;
  #gu;
  constructor() {
    this.#mus = new Service();
    this.#gu = new GameUtils();
  }

  getAllBoxes = async () => await this.#mus.getAllBoxes();

  getAllTeams = async () => await this.#mus.getAllTeams();

  getAllHeroesOnly = async () => await this.#mus.getAllHeroesOnly();

  getAllAntiHeroes = async () => await this.#mus.getAllAntiHeroes();

  getAllVillains = async () => await this.#mus.getAllVillains();

  getAllCompanions = async () => await this.#mus.getAllCompanions();

  getAllOthers = async () => await this.#mus.getAllOthers();

  getCodeGame = async (game) => await this.#gu.getCodeGame(game);

  getGameFromCode = async (code) => {
    const game = {
      mode: {},
      villains: [],
      teamI: [],
      teamII: [],
      companionsI: [],
      companionsII: [],
      locations: [],
      initLocation: 0,
      challenge: {}
    }
    const recoveredGame = await this.#gu.getGameFromCode(code);
    game.mode = recoveredGame.mode > 0 && recoveredGame.mode < 62 ? await this.#mus.getModeById(recoveredGame.mode) : {};
    game.challenge = recoveredGame.challenge > 0 && recoveredGame.challenge < 22 ? await this.#mus.getChallengeById(recoveredGame.challenge) : {};
    game.initLocation = recoveredGame.initLocation > 0 && recoveredGame.initLocation < 6 ? recoveredGame.initLocation : 0;
    for (let i = 0; i < 6; i++) {
      game.villains.push(recoveredGame.villains[i] > 0 && recoveredGame.villains[i] < 143 ? await this.#mus.getVillainById(recoveredGame.villains[i]) : {});
      game.locations.push(recoveredGame.locations[i] > 0 && recoveredGame.locations[i] < 126 ? await this.#mus.getLocationById(recoveredGame.locations[i]) : {
        id: 0,
        name: 'Any location',
        hasVillain: 0,
        isHazardous: 0,
        box: 0
      });
    }
    for (let i = 0; i < 5; i++) {
      game.teamI.push(recoveredGame.teamI[i] > 0 && recoveredGame.teamI[i] < 236 ? await this.#mus.getHeroById(recoveredGame.teamI[i]) : {});
      game.teamII.push(recoveredGame.teamII[i] > 0 && recoveredGame.teamII[i] < 236 ? await this.#mus.getHeroById(recoveredGame.teamII[i]) : {});
    }
    for (let i = 0; i < 4; i++) {
      game.companionsI.push(recoveredGame.companionsI[i] > 0 && recoveredGame.companionsI[i] < 8 ? await this.#mus.getCompanionById(recoveredGame.companionsI[i]) : {});
      game.companionsII.push(recoveredGame.companionsII[i] > 0 && recoveredGame.companionsII[i] < 8 ? await this.#mus.getCompanionById(recoveredGame.companionsII[i]) : {});
    }
    if (game.mode.villains == 1 && game.villains[0]?.members.length > 2) {
      game.villains[0].members = await this.#mus.getMembersInVillainGroup(game.villains[0].members);
    }
    return game;
  }

  getOptionals = async (game) => {
    const teamDecksI = await this.#mus.getTeamsByHeroes(game.teamI);
    let teamDecksII = [];
    if (game.mode.teamIISize != 0) {
      teamDecksII = await this.#mus.getTeamsByHeroes(game.teamII);
    }
    return { teamDecksI: teamDecksI, teamDecksII: teamDecksII };
  }

  validateConfig = async (settings) => {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.classList.add('d-none');
    const errorMessages = {
      players: 'Invalid number of players: ',
      companions: 'Invalid companions option: ',
      challenge: 'Invalid challenge option: ',
      superVillainMode: 'Invalid super villain mode option: ',
      anyLocation: 'Invalid locations option: ',
      balanced: 'Invalid balanced option: ',
      twoTeamsGame: 'Invalid two teams option: ',
      teamFromTeams: 'Invalid teams based on team decks option: ',
      boxes: 'Unselected or invalid expansions.',
      teams: 'Unselected or invalid teams.'
    };
    for (const [key, value] of Object.entries(settings)) {
      if (key !== 'boxes' && key !== 'teams') {
        switch (key) {
          case 'players':
            if (!(value <= 7 && value >= 1)) {
              console.warn(errorMessages[key] + value);
              return { valid: false, message: errorMessages[key] + value };
            }
            break;
          case 'teamFromTeams':
            if (value !== 0 && value !== 1) {
              console.warn(errorMessages[key] + value);
              return { valid: false, message: errorMessages[key] + value };
            }
            if (value === 0 && settings['boxes'].length == 0) {
              console.warn(errorMessages['boxes']);
              return { valid: false, message: errorMessages['boxes'] };
            }
            if (value === 1 && settings['teams'].length == 0) {
              console.warn(errorMessages['teams']);
              return { valid: false, message: errorMessages['teams'] };
            }
            break;
          case 'boxes':
          case 'teamDecks':
            if (value.some(item => !Number.isInteger(item))) {
              console.warn(errorMessages[key] + value.toString());
              return { valid: false, message: errorMessages[key] + value.toString() };
            }
            break;
          default:
            if (value !== 0 && value !== 1) {
              console.warn(errorMessages[key] + value);
              return { valid: false, message: errorMessages[key] + value };
            }
        }
      }
    }
    return { valid: true, message: 'ok' };
  }

  validateGame = async (game) => {
    return await this.#gu.validateGame(game);
  }

  getRandomizedGame = async (settings) => {
    const noGamesModes = 'There are no game modes for these settings';
    const game = {
      mode: {},
      villains: [],
      teamI: [],
      teamII: [],
      companionsI: [],
      companionsII: [],
      locations: [],
      initLocation: 0,
      challenge: {}
    }

    const modes = UTILS.arrayToObject(await this.#mus.getModesByPlayers(
      settings.players,
      settings.superVillainMode,
      settings.balanced,
      settings.twoTeamsGame));
    if (Object.keys(modes).length === 0) {
      console.warn(noGamesModes+'.');
      return { error: true, game, randomizeErrorMessage: noGamesModes + '.' };
    }

    const { gameMode, villains, teamI, teamII } = await this.#getMainSetUp(modes, settings);
    if (Object.keys(gameMode).length === 0) {
      console.warn(noGamesModes+'.');
      return { error: true, game, randomizeErrorMessage: noGamesModes + '.' };
    }
    game.mode = gameMode;

    if (UTILS.countObjects(game.villains) != game.villains) {
      console.warn(`${noGamesModes}: You didn't select enough expansions to choose a heroes and villains.`);
      return { error: true, game, randomizeErrorMessage: `${noGamesModes}: You didn't select enough expansions to choose a heroes and villains.` };
    }
    game.villains = villains;

    if (UTILS.countObjects(teamI) != game.mode.teamISize
    || UTILS.countObjects(teamII) != game.mode.teamIISize) {
      console.warn(`${noGamesModes}: You didn't select enough expansions and teams to choose a heroes and villains.`);
      return { error: true, game, randomizeErrorMessage: `${noGamesModes}: You didn't select enough expansions and teams to choose a heroes and villains.` };
    }
    game.teamI = teamI;
    game.teamII = teamII;

    const { companionsI, companionsII } = (settings.companions != 0)
      ? await this.#getCompanionsForGame(game.mode, settings.boxes)
      : { companionsI: [{},{},{},{}], companionsII: [{},{},{},{}] };
    game.companionsI = companionsI;
    game.companionsII = companionsII;

    const challenge = (settings.challenge != 0)
      ? await this.#getChallenge(settings.boxes, game.mode)
      : {};
    game.challenge = challenge;

    const locations = await this.#getLocations(settings.anyLocation, settings.boxes, game.villains, game.challenge)
    if (settings.anyLocation == 0 && locations.some(location => location.id === 0)) {
      console.warn(`${noGamesModes}: You didn't select enough expansions to choose locations`);
      return { error: true, game, randomizeErrorMessage: `${noGamesModes}: You didn't select enough expansions to choose locations` };
    }
    game.locations = locations;
    game.initLocation = await this.#getInitLocation(game.villains, game.locations);

    if (game.mode.villains == 1 && game.villains[0]?.members.length > 2) {
      game.villains[0].members = await this.#mus.getMembersInVillainGroup(game.villains[0].members);
    }

    return { error: false, game, randomizeErrorMessage: '' };
  }

  #getMainSetUp = async (modes, settings) => {
    const gameMode = UTILS.getRandomKey(modes);
    const villains = await this.#mus.getVillainByExpansionsAndSuperVillainModeAndMode(settings.boxes, settings.superVillainMode, gameMode.code);
    const countHeroes = (settings.teamFromTeams === 1)
      ? await this.#mus.countHeroesInTeams(settings.teams)
      : await this.#mus.countHeroesInExpansions(settings.boxes);

    if (villains.length < gameMode.villains || countHeroes < (gameMode.teamISize + gameMode.teamIISize)) {
      console.warn('Changing game mode cause there\'s no enough villains and heroes');
      return await this.#changeGameMode(modes, gameMode, settings);
    }

    const chosenVillains = [{},{},{},{},{},{}];
    const villainsAsObj = UTILS.arrayToObject(villains);
    for (let i = 0; i < gameMode.villains; i++) {
      chosenVillains[i] = UTILS.getRandomKey(villainsAsObj);
      delete villainsAsObj[chosenVillains[i].id];
    }
    if (gameMode.villains == 1 && chosenVillains[0].phoenixFive == 1) {
      const phoenixFive = UTILS.arrayToObject(await this.#mus.getPhoenixFive(chosenVillains));
      const numberOfPhoenixFive = UTILS.getRandomNumber(5) + 1;
      for (let i = 1; i < numberOfPhoenixFive; i++) {
        chosenVillains[i] = UTILS.getRandomKey(phoenixFive);
        delete phoenixFive[chosenVillains[i].id];
      }
    }

    const chosenTeamI = [{},{},{},{},{}];
    const chosenTeamII = [{},{},{},{},{}];
    if (settings.teamFromTeams === 0) {
      const heroes = await this.#mus.getHeroesByExpansionsAndNotAntiHero(settings.boxes, chosenVillains);
      if (heroes.length < (gameMode.teamISize + gameMode.teamIISize)) {
        const swappedSuccess = await this.#swapAntiHero(heroes, gameMode, villainsAsObj, chosenVillains);
        if (!swappedSuccess) {
          console.warn('Changing game mode cause there\'s no enough heroes after swapping anti heroes');
          return await this.#changeGameMode(modes, gameMode, settings);
        }
      }

      if (heroes.length < (gameMode.teamISize + gameMode.teamIISize)) {
        console.warn('Changing game mode cause there\'s no enough heroes in expansions');
        return await this.#changeGameMode(modes, gameMode, settings);
      }

      const heroesAsObj = UTILS.arrayToObject(heroes);
      for (let i = 0; i < gameMode.teamISize; i++) {
        chosenTeamI[i] = UTILS.getRandomKey(heroesAsObj);
        delete heroesAsObj[chosenTeamI[i].id];
      }
      for (let i = 0; i < gameMode.teamIISize; i++) {
        chosenTeamII[i] = UTILS.getRandomKey(heroesAsObj);
        delete heroesAsObj[chosenTeamII[i].id];
      }
    } else if (settings.teamFromTeams === 1) {
      let teamsAvailable = [...settings.teams];
      let index = 0;
      let hereosFromTeamI = [];
      let teamI = 0;
      while (hereosFromTeamI.length < gameMode.teamISize && teamsAvailable.length > 0) {
        index = UTILS.getRandomNumber(teamsAvailable.length);
        teamI = teamsAvailable[index];
        hereosFromTeamI = await this.#mus.getHeroesByTeamsAndNotAntiHero(teamI, chosenVillains);
        teamsAvailable.splice(index, 1);
      }
      if (hereosFromTeamI.length < gameMode.teamISize) {
        console.warn('Changing game mode cause there\'s no enough heroes in teams for team I');
        return await this.#changeGameMode(modes, gameMode, settings);
      }
      const hereosFromTeamIAsObj = UTILS.arrayToObject(hereosFromTeamI);
      for (let i = 0; i < gameMode.teamISize; i++) {
        chosenTeamI[i] = UTILS.getRandomKey(hereosFromTeamIAsObj);
        delete hereosFromTeamIAsObj[chosenTeamI[i].id];
      }

      teamsAvailable = [...settings.teams].filter(team => team !== teamI);
      if (gameMode.teamIISize > 0 && teamsAvailable.length > 0) {
        index = 0;
        let hereosFromTeamII = [];
        let teamII = 0;
        while (hereosFromTeamII.length < gameMode.teamIISize && teamsAvailable.length > 0) {
          index = UTILS.getRandomNumber(teamsAvailable.length);
          teamII = teamsAvailable[index];
          hereosFromTeamII = await this.#mus.getHeroesByTeamsAndNotAntiHero(teamII, chosenVillains);
          teamsAvailable.splice(index, 1);
        }
        if (hereosFromTeamII.length < gameMode.teamIISize) {
          console.warn('Changing game mode cause there\'s no enough heroes in teams for team II');
          return await this.#changeGameMode(modes, gameMode, settings);
        }
        const hereosFromTeamIIAsObj = UTILS.arrayToObject(hereosFromTeamII);
        for (let i = 0; i < gameMode.teamIISize; i++) {
          chosenTeamII[i] = UTILS.getRandomKey(hereosFromTeamIIAsObj);
          delete hereosFromTeamIIAsObj[chosenTeamII[i].id];
        }
      }
    }

    return { gameMode, villains: chosenVillains, teamI: chosenTeamI, teamII: chosenTeamII };
  }

  #getCompanionsForGame = async (gameMode, boxes) => {
    const chosenCompanionsI = [{},{},{},{}];
    const chosenCompanionsII = [{},{},{},{}];
    const companions = UTILS.arrayToObject(await this.#mus.getCompanionsByExpansions(boxes));
    let companionsIComplete = false;
    let companionsIIComplete = gameMode.teamIISize == 0;
    for (let i = 0; i < 4 && Object.keys(companions).length > 0; i++) {
      if (!companionsIComplete && gameMode.teamISize > i && UTILS.getRandomNumber(2) == 0) {
        chosenCompanionsI[i] = UTILS.getRandomKey(companions);
        delete companions[chosenCompanionsI[i].id];
        companionsIComplete = gameMode.teamISize == 5 && UTILS.countObjects(chosenCompanionsI) == 1;
      }
      if (Object.keys(companions).length > 0 && gameMode.teamIISize > i && !companionsIIComplete && UTILS.getRandomNumber(2) == 0) {
        chosenCompanionsII[i] = UTILS.getRandomKey(companions);
        delete companions[chosenCompanionsII[i].id];
        companionsIIComplete = gameMode.teamIISize == 5 && UTILS.countObjects(chosenCompanionsII) == 1;
      }
    }
    return { companionsI: chosenCompanionsI, companionsII: chosenCompanionsII };
  }

  #getChallenge = async (boxes, gameMode) => {
    const challenges = UTILS.arrayToObject(await this.#mus.getChallengeByExpansions(boxes));
    while (Object.keys(challenges).length > 0 && UTILS.getRandomNumber(2) == 0) {
      let challenge = UTILS.getRandomKey(challenges);
      if (gameMode.code.startsWith('TvT') && (challenge.name === 'Traitor Challenge' || challenge.name === 'Plan B Challenge')) {
        console.warn('Changing challenge cause can\'t be used with the game mode');
        continue;
      }
      if (challenge.name === 'Traitor Challenge' && gameMode.teamISize != 3 && gameMode.teamISize != 4
      && gameMode.teamIISize != 3 && gameMode.teamIISize != 4) {
        console.warn('Changing challenge cause can\'t be used with the game mode');
        continue;
      }
      if (!gameMode.code.startsWith('TvT') && challenge.name === 'Accelerated Villain Challenge') {
        console.warn('Changing challenge cause can\'t be used with the game mode');
        continue;
      }
      return challenge;
    }
    return {};
  }

  #getLocations = async (anyLocation, boxes, villains, challenges) => {
    const chosenLocations = [{},{},{},{},{},{}];
    let locations = [];
    if (challenges.name === 'Hazardous Locations Challenge') {
      locations = UTILS.arrayToObject(await this.#mus.getHazardousLocationsByExpansions(boxes));
      for (let i = 0; i < 3 && Object.keys(locations).length; i++) {
        chosenLocations[i] = UTILS.getRandomKey(locations);
        delete locations[chosenLocations[i].id];
      }
    }
    if (anyLocation == 0) {
      locations = UTILS.arrayToObject(await this.#mus.getLocationsByExpansionsAndVillains(boxes, villains));
      for (let i = 0 + UTILS.countObjects(chosenLocations); i < 6 && Object.keys(locations).length > 0; i++) {
        chosenLocations[i] = UTILS.getRandomKey(locations);
        delete locations[chosenLocations[i].id];
      }
      if (UTILS.countObjects(chosenLocations) < 6) {
        locations = UTILS.arrayToObject(await this.#mus.getLocationsByExpansionsAndNotId(boxes, chosenLocations));
        for (let i = 0 + UTILS.countObjects(chosenLocations); i < 6 && Object.keys(locations).length > 0; i++) {
          chosenLocations[i] = UTILS.getRandomKey(locations);
          delete locations[chosenLocations[i].id];
        }
      }
    }
    for (let i = 2; i >= 0; i--) {
      const locationBackUp = chosenLocations[i + i + 1];
      chosenLocations[i + i + 1] = chosenLocations[i];
      chosenLocations[i] = locationBackUp;
    }
    return chosenLocations.fill({
      id: 0,
      name: 'Any location',
      hasVillain: 0,
      isHazardous: 0,
      box: 0
    }, UTILS.countObjects(chosenLocations));
  }

  #getInitLocation = async (villains, locations) => {
    let initPosition = UTILS.getRandomNumber(6);

    if (await this.#gu.meetsMojoRules(villains, locations)
    && UTILS.getRandomNumber(1) == 0) {
      initPosition = (locations.findIndex(location => location.name === 'Mojoverse') + 3) % 6;
    }

    if (await this.#gu.meetsDoctorDoomRules(villains, locations)) {
      initPosition = (locations.findIndex(location => location.name === 'Latveria') + 3) % 6;
    }

    if (await this.#gu.meetsMarrowRules(villains, locations)) {
      initPosition = (locations.findIndex(location => location.name === 'Morlock Tunnels') + 3) % 6;
    }

    if (await this.#gu.meetsArcadeRules(villains, locations)
    && UTILS.getRandomNumber(1) == 0) {
      initPosition = locations.findIndex(location => location.name === 'Murderworld');
    }

    if (await this.#gu.meetsApocalypseRules(villains, locations)) {
      initPosition = (locations.findIndex(location => location.name === 'Apocalypse\'s Pyramid') + 3) % 6;
      const initLocationIndex = locations.findIndex(location => location.name === 'Starlight Citadel');
      const initLocation = locations[initLocationIndex];
      locations[initLocationIndex] = locations[initPosition];
      locations[initPosition] = initLocation;
    }

    if (await this.#gu.meetsMorlunRules(villains, locations)) {
      initPosition = (locations.findIndex(location => location.name === 'Loomworld') + 3) % 6;
      const initLocationIndex = locations.findIndex(location => location.name === 'Sims Tower');
      const initLocation = locations[initLocationIndex];
      locations[initLocationIndex] = locations[initPosition];
      locations[initPosition] = initLocation;
    }

    return initPosition;
  }

  #changeGameMode = async (modes, gameMode, settings) => {
    delete modes[gameMode['id']];
    if (Object.keys(modes).length === 0) {
      return { gameMode: {}, villains: [{},{},{},{},{},{}], teamI: [{},{},{},{},{}], teamII: [{},{},{},{},{}] };
    } else {
      return this.#getMainSetUp(modes, settings);
    }
  }

  #swapAntiHero = async (heroes, gameMode, villainsAsObj, chosenVillains) => {
    console.warn('Swapping AntiHero between chosen villains and teams');
    while (heroes.length < (gameMode.teamISize + gameMode.teamIISize)) {
      if (Object.keys(villainsAsObj).length > 0) {
        const antiHero = chosenVillains.find(antiHero => antiHero.isAntiHero > 0);
        const antiHeroIndex = chosenVillains.findIndex(villain => villain.name == antiHero.name);
        heroes.push(await this.#mus.getHeroByName(antiHero.name));
        let newVillain = UTILS.getRandomKey(villainsAsObj);
        while (heroes.findIndex(antiHero => antiHero.isAntiHero == newVillain.id) > -1) {
          console.wanr('New villain can\'t be use cause is already a hero, selecting other villain');
          delete villainsAsObj[newVillain.id];
          if (Object.keys(villainsAsObj).length > 0) {
            newVillain = UTILS.getRandomKey(villainsAsObj);
          } else return false;
        }
        chosenVillains[antiHeroIndex] = newVillain;
      } else break;
    }
    return true;
  }

}
