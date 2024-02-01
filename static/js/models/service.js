class Service {
  #repository;
  constructor() {
    this.#repository = new Repository();
  }

  getAllBoxes = async () =>
    await this.#repository.findAllBoxes();

  getAllTeams = async () =>
    await this.#repository.findAllTeams();

  getAllHeroesOnly = async () =>
    await this.#repository.findAllHeroesOnly();

  getAllAntiHeroes = async () =>
    await this.#repository.findAllAntiHeroes();

  getAllVillains = async () =>
    await this.#repository.findAllVillains();

  getAllCompanions = async () =>
    await this.#repository.findAllCompanions();

  getAllOthers = async () =>
    await this.#repository.findAllOthers();

  getModeById = async (id) =>
    await this.#repository.findModeById(id);

  getChallengeById = async (id) =>
    await this.#repository.findChallengeById(id);

  getLocationById = async (id) =>
    await this.#repository.findLocationById(id);

  getVillainById = async (id) =>
    await this.#repository.findVillainById(id);

  getHeroById = async (id) =>
    await this.#repository.findHeroById(id);

  getCompanionById = async (id) =>
    await this.#repository.findCompanionById(id);

  getModesByPlayers = async (players, superVillainMode, balanced, twoTeamsGame) =>
    await this.#repository.findModesByPlayers(players, superVillainMode, balanced, twoTeamsGame);

  getVillainByExpansionsAndSuperVillainModeAndMode = async (boxes, superVillainMode, gameModeCode) => {
    if (gameModeCode.includes('SS')) {
      return await this.#repository.findSinisterSix(boxes);
    } else if (gameModeCode.includes('TvT')) {
      return await this.#repository.findTvTVillain(boxes);
    } else if (gameModeCode.includes('DA')) {
      return await this.#repository.findDarkAvengers(boxes);
    } else if (gameModeCode.includes('HoG')) {
      return await this.#repository.findHeraldsOfGalactus(boxes);
    } else if (gameModeCode.includes('RC') || gameModeCode.includes('CoH')) {
      return [];
    }
    return await this.#repository.findVillainsByExpansionsAndSuperVillainMode(boxes, superVillainMode);
  }

  getPhoenixFive = async (villains) => {
    const excludedPhoenixFive = [];
    for (const phoenixFive of villains) {
      if (phoenixFive?.id) {
        excludedPhoenixFive.push(phoenixFive.id);
      }
    }
    return await this.#repository.findPhoenixFive(excludedPhoenixFive);
  }

  countHeroesInExpansions = async (boxes) =>
    await this.#repository.countHeroesInExpansions(boxes);

  countHeroesInTeams = async (teams) =>
    await this.#repository.countHeroesInTeams(teams);

  getHeroByName = async (name) =>
    await this.#repository.getHeroByName(name);

  getHeroesByExpansionsAndNotAntiHero = async (boxes, villains) => {
    const excludedHeroes = [];
    for (const hero of villains) {
      if (hero?.id) {
        excludedHeroes.push(hero.id);
      }
    }
    return await this.#repository.findHeroesByExpansionsAndNotAntiHero(boxes, excludedHeroes);
  }

  getHeroesByTeamsAndNotAntiHero = async (team, villains, heroes = []) => {
    const excludedHeroes = [];
    for (const hero of villains) {
      if (hero?.id) {
        excludedHeroes.push(hero.id);
      }
    }
    for (const hero of heroes) {
      if (hero?.id) {
        excludedHeroes.push(hero.id);
      }
    }
    return await this.#repository.findHeroesByTeamsAndNotAntiHero(team, excludedHeroes);
  }

  getCompanionsByExpansions = async (boxes) =>
    await this.#repository.findCompanionsByExpansions(boxes);

  getChallengeByExpansions = async (boxes) =>
    await this.#repository.findChallengeByExpansions(boxes);

  getHazardousLocationsByExpansions = async (boxes) =>
    await this.#repository.findHazardousLocationsByExpansions(boxes);

  getLocationsByExpansionsAndVillains = async (boxes, villains) => {
    const villainsLocations = [];
    for (const villain of villains) {
      if (villain?.id) {
        villainsLocations.push(villain.id);
      }
    }
    return await this.#repository.findLocationsByExpansionsAndVillains(boxes, villainsLocations);
  }

  getLocationsByExpansionsAndNotId = async (boxes, excludeLocations = []) => {
    const excluded = [];
    for (const location of excludeLocations) {
      if (location?.id) {
        excluded.push(location.id);
      }
    }
    return await this.#repository.findLocationsByExpansionsAndNotId(boxes, excluded);
  }

  getTeamsByHeroes = async (team) => {
    const heroes = [];
    for (const hero of team) {
      if (hero?.id) {
        heroes.push(hero.id);
      }
    }
    return await this.#repository.findTeamsByHeroes(heroes);
  }

  getMembersInVillainGroup = async (group) =>
    await this.#repository.findMembersInVillainGroup(group.split(',').map(item => Number(item)))

}
