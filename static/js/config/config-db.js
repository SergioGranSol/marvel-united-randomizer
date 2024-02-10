class DataBase {
  #db;
  constructor(dbName) {
    if (!dbName) {
      throw new Error('Database name can\'t be empty');
    }
    this.#db = new Dexie(dbName);
    this.#create();
  }

  getDB = () => this.#db;

  #create = () => {
    this.#db.version(1).stores({
      boxes: CONSTANTS.BOXES[0].replaceAll('\t',','),
      challenges: CONSTANTS.CHALLENGES[0].replaceAll('\t',','),
      companions: CONSTANTS.COMPANIONS[0].replaceAll('\t',','),
      heroes: CONSTANTS.HEROES[0].replaceAll('\t',','),
      locations: CONSTANTS.LOCATIONS[0].replaceAll('\t',','),
      modes: CONSTANTS.MODES[0].replaceAll('\t',','),
      others: CONSTANTS.OTHERS[0].replaceAll('\t',','),
      teams: CONSTANTS.TEAMS[0].replaceAll('\t',','),
      villains: CONSTANTS.VILLAINS[0].replaceAll('\t',','),
      relchallengebox: CONSTANTS.RELCHALLENGEBOX[0].replaceAll('\t',','),
      relteamsheroes: CONSTANTS.RELTEAMSHEROES[0].replaceAll('\t',','),
      phoenixFive: CONSTANTS.PHOENIXFIVE[0].replaceAll('\t',','),
    });

    for (let i = 1; i < CONSTANTS.BOXES.length; i++) {
      const row = CONSTANTS.BOXES[i].split('\t');
      let column = 0;
      this.#db.boxes.put({ id: Number(row[column++]), season: Number(row[column++]), name: row[column++], isCore: Number(row[column++]) });
    }

    for (let i = 1; i < CONSTANTS.CHALLENGES.length; i++) {
      const row = CONSTANTS.CHALLENGES[i].split('\t');
      let column = 0;
      this.#db.challenges.put({ id: Number(row[column++]), name: row[column++] });
    }

    for (let i = 1; i < CONSTANTS.COMPANIONS.length; i++) {
      const row = CONSTANTS.COMPANIONS[i].split('\t');
      let column = 0;
      this.#db.companions.put({ id: Number(row[column++]), name: row[column++], box: Number(row[column++]), position: row[column++] });
    }

    for (let i = 1; i < CONSTANTS.HEROES.length; i++) {
      const row = CONSTANTS.HEROES[i].split('\t');
      let column = 0;
      this.#db.heroes.put({ id: Number(row[column++]), name: row[column++], equipments: Number(row[column++]), isFF: Number(row[column++]), box: Number(row[column++]), isAntiHero: Number(row[column++]), position: row[column++] });
    }

    for (let i = 1; i < CONSTANTS.LOCATIONS.length; i++) {
      const row = CONSTANTS.LOCATIONS[i].split('\t');
      let column = 0;
      this.#db.locations.put({ id: Number(row[column++]), name: row[column++], hasVillain: Number(row[column++]), isHazardous: Number(row[column++]), box: Number(row[column++]) });
    }

    for (let i = 1; i < CONSTANTS.MODES.length; i++) {
      const row = CONSTANTS.MODES[i].split('\t');
      let column = 0;
      this.#db.modes.put({ id: Number(row[column++]), name: row[column++], code: row[column++], players: Number(row[column++]), teams: Number(row[column++]), teamISize: Number(row[column++]), teamIISize: Number(row[column++]), villains: Number(row[column++]), superVillainMode: Number(row[column++]) });
    }

    for (let i = 1; i < CONSTANTS.OTHERS.length; i++) {
      const row = CONSTANTS.OTHERS[i].split('\t');
      let column = 0;
      this.#db.others.put({ id: Number(row[column++]), name: row[column++], box: Number(row[column++]), position: row[column++] });
    }

    for (let i = 1; i < CONSTANTS.TEAMS.length; i++) {
      const row = CONSTANTS.TEAMS[i].split('\t');
      let column = 0;
      this.#db.teams.put({ id: Number(row[column++]), name: row[column++] });
    }

    for (let i = 1; i < CONSTANTS.VILLAINS.length; i++) {
      const row = CONSTANTS.VILLAINS[i].split('\t');
      let column = 0;
      this.#db.villains.put({ id: Number(row[column++]), name: row[column++], superVillain: Number(row[column++]), teamVsTeam: Number(row[column++]), sinisterSix: Number(row[column++]), heraldsOfGalactus: Number(row[column++]), darkAvengers: Number(row[column++]), phoenixFive: Number(row[column++]), isAntiHero: Number(row[column++]), members: row[column++], box: Number(row[column++]), position: row[column++] });
    }

    for (let i = 1; i < CONSTANTS.RELCHALLENGEBOX.length; i++) {
      const row = CONSTANTS.RELCHALLENGEBOX[i].split('\t');
      let column = 0;
      this.#db.relchallengebox.put({ id: Number(row[column++]), challenge: Number(row[column++]), box: Number(row[column++]) });
    }

    for (let i = 1; i < CONSTANTS.RELTEAMSHEROES.length; i++) {
      const row = CONSTANTS.RELTEAMSHEROES[i].split('\t');
      let column = 0;
      this.#db.relteamsheroes.put({ id: Number(row[column++]), team: Number(row[column++]), hero: Number(row[column++]) });
    }

    for (let i = 1; i < CONSTANTS.PHOENIXFIVE.length; i++) {
      const row = CONSTANTS.PHOENIXFIVE[i].split('\t');
      let column = 0;
      this.#db.phoenixFive.put({ id: Number(row[column++]), members: row[column++], hasColossus: Number(row[column++]), hasCyclops: Number(row[column++]), hasEmmaFrost: Number(row[column++]), hasMagik: Number(row[column++]), hasNamor: Number(row[column++]) });
    }
  }

}