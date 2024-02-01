class Repository {
  #db;
  constructor() {
    this.#db = new DataBase('MUDatabase').getDB();
  }

  findAllBoxes = async () =>
    await this.#db.boxes.orderBy('id').toArray();

  findAllTeams = async () =>
    await this.#db.teams.where('id').notEqual(1).toArray();

  findAllHeroesOnly = async () => {
    const heroes = await this.#db.heroes.where('isAntiHero').equals(0).sortBy('name');
    for (const hero of heroes) {
      const teams = await this.#db.relteamsheroes.where('hero').equals(hero.id).toArray();
      hero['teams'] = teams.reduce((acc, row) => {
        return acc + `${row.team}-`
      }, '').slice(0, -1);
    }
    return heroes;
  }

  findAllAntiHeroes = async () => {
    const antiHeroes = await this.#db.heroes.where('isAntiHero').notEqual(0).sortBy('name');
    for (const antiHero of antiHeroes) {
      const asVillain = await this.#db.villains.where('id').equals(antiHero.isAntiHero).first();
      antiHero['superVillain'] = asVillain['superVillain'];
      antiHero['teamVsTeam'] = asVillain['teamVsTeam'];
      antiHero['sinisterSix'] = asVillain['sinisterSix'];
      antiHero['heraldsOfGalactus'] = asVillain['heraldsOfGalactus'];
      antiHero['darkAvengers'] = asVillain['darkAvengers'];
      antiHero['phoenixFive'] = asVillain['phoenixFive'];
      const teams = await this.#db.relteamsheroes.where('hero').equals(antiHero.id).toArray();
      antiHero['teams'] = teams.reduce((acc, row) => {
        return acc + `${row.team}-`
      }, '').slice(0, -1);
    }
    return antiHeroes;
  }

  findAllVillains = async () =>
    await this.#db.villains
      .where('isAntiHero').equals(0)
      .and(row => row.members == '-1' || row.members == '0').sortBy('name');

  findAllCompanions = async () =>
    await this.#db.companions.orderBy('id').sortBy('name');

  findAllOthers = async () =>
    await this.#db.others.orderBy('id').sortBy('name');

  findModeById = async (id) =>
    await this.#db.modes.where('id').equals(id).first();

  findChallengeById = async (id) =>
    await this.#db.challenges.where('id').equals(id).first();

  findLocationById = async (id) =>
    await this.#db.locations.where('id').equals(id).first();

  findVillainById = async (id) =>
    await this.#db.villains.where('id').equals(id).first();

  findHeroById = async (id) =>
    await this.#db.heroes.where('id').equals(id).first();

  findCompanionById = async (id) =>
    await this.#db.companions.where('id').equals(id).first();

  findModesByPlayers = async (players, superVillainMode, balanced, twoTeamsGame) =>
    await this.#db.modes
      .where('players').equals(players)
      .and(row => row.superVillainMode == superVillainMode
        && row.teams == (twoTeamsGame == 0 ? 1 : 2)
        && (balanced == 1 ? (row.teams == 1 ? true : row.teamISize == row.teamIISize) : true))
      .toArray();

  findSinisterSix = async (boxes) =>
    await this.#db.villains
      .where('box').anyOf(boxes)
      .and(row => row.sinisterSix == 1)
      .toArray();

  findTvTVillain = async (boxes) =>
    await this.#db.villains
      .where('box').anyOf(boxes)
      .and(row => row.teamVsTeam == 1)
      .toArray();

  findDarkAvengers = async (boxes) =>
    await this.#db.villains
      .where('box').anyOf(boxes)
      .and(row => row.darkAvengers == 1)
      .toArray();

  findHeraldsOfGalactus = async (boxes) =>
    await this.#db.villains
      .where('box').anyOf(boxes)
      .and(row => row.heraldsOfGalactus == 1)
      .toArray();

  findPhoenixFive = async (excluded) =>
    await this.#db.villains
      .where('id').noneOf(excluded)
      .and(row => row.phoenixFive == 1)
      .toArray();

  findVillainsByExpansionsAndSuperVillainMode = async (boxes, superVillainMode) =>
    await this.#db.villains
      .where('box').anyOf(boxes)
      .and(row => row.superVillain >= superVillainMode
        && row.members != '-1')
      .toArray();

  countHeroesInExpansions = async (boxes) =>
    await this.#db.heroes
      .where('box').anyOf(boxes)
      .count();

  countHeroesInTeams = async (teams) => {
    const heroesInTeams = await this.#db.relteamsheroes
      .where('team').anyOf(teams)
      .toArray();
    const heroes = [];
    for (const id of heroesInTeams) {
      heroes.push(id.hero);
    }
    return await this.#db.heroes
      .where('id').anyOf(heroes)
      .count();
  }

  findHeroByName = async (name) =>
    await this.#db.heroes
      .where('name').equals(name)
      .first();

  findHeroesByExpansionsAndNotAntiHero = async (boxes, excludedHeroes) =>
    await this.#db.heroes
      .where('box').anyOf(boxes)
      .and(row => !excludedHeroes.includes(row.isAntiHero))
      .toArray();

  findHeroesByTeamsAndNotAntiHero = async (team, excludedHeroes) => {
    const teamsHero = await this.#db.relteamsheroes
      .where('team').equals(team)
      .toArray();
    const heroes = [];
    for (const hero of teamsHero) {
      heroes.push(hero.hero);
    }
    return await this.#db.heroes
      .where('id').anyOf(heroes)
      .and(row => !excludedHeroes.includes(row.isAntiHero))
      .toArray();
  }

  findCompanionsByExpansions = async (boxes) =>
    await this.#db.companions
      .where('box').anyOf(boxes)
      .toArray();

  findChallengeByExpansions = async (boxes) => {
    const challengeInBoxes = await this.#db.relchallengebox
      .where('box').anyOf(boxes)
      .toArray();
    const challenge = [];
    for (const id of challengeInBoxes) {
      challenge.push(id.challenge);
    }
    return await this.#db.challenges
      .where('id').anyOf(challenge)
      .toArray();
  }

  findHazardousLocationsByExpansions = async (boxes) =>
    await this.#db.locations
      .where('box').anyOf(boxes)
      .and(row => row.isHazardous == 1)
      .toArray();

  findLocationsByExpansionsAndVillains = async (boxes, villainsLocations) =>
    await this.#db.locations
      .where('box').anyOf(boxes)
      .and(row => villainsLocations.includes(row.hasVillain))
      .toArray();

  findLocationsByExpansionsAndNotId = async (boxes, excluded) =>
    await this.#db.locations
      .where('box').anyOf(boxes)
      .and(row => row.hasVillain != 17
        && !excluded.includes(row.id))
      .toArray();

  findTeamsByHeroes = async (heroes) => {
    heroes = heroes.filter((item, index) => heroes.indexOf(item) === index);
    const heroesDecks = await this.#db.relteamsheroes
      .where('hero').anyOf(heroes)
      .toArray();
    const numbersOfHereosInDecks = heroesDecks.reduce((acc, row) => {
      if (!(row.team in acc)) {
        acc[row.team] = 1;
      } else acc[row.team]++;
      return acc;
    }, {});
    const decks = [];
    for (const [key, value] of Object.entries(numbersOfHereosInDecks)) {
      if (value == heroes.length) {
        decks.push(Number(key));
      }
    }
    return [... await this.#db.teams.where('id').equals(1).toArray(),
      ...await this.#db.teams.where('id').anyOf(decks).toArray()];
  }

  findMembersInVillainGroup = async (villains) =>
    await this.#db.villains.where('id').anyOf(villains).toArray();

}
