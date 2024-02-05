class GameUtils {

  validateGame = async (game) => {
    const message = {
      errors: [],
      warnings: []
    };
    if (new Set(game.villains.filter(item => item?.id).map(item => item.id)).size < game.villains.filter(item => item?.id).length) {
      message.warnings.push('This game has duplicate villains.');
    }
    if (new Set(game.teamI.filter(item => item?.id).map(item => item.id)).size < game.teamI.filter(item => item?.id).length) {
      message.warnings.push('This game has duplicate heroes in team I.');
    }
    if (new Set(game.teamII.filter(item => item?.id).map(item => item.id)).size < game.teamII.filter(item => item?.id).length) {
      message.warnings.push('This game has duplicate heroes in team II.');
    }
    if (new Set(game.companionsI.filter(item => item?.id).map(item => item.id)).size < game.companionsI.filter(item => item?.id).length) {
      message.warnings.push('This game has duplicate companions in team I.');
    }
    if (new Set(game.companionsII.filter(item => item?.id).map(item => item.id)).size < game.companionsII.filter(item => item?.id).length) {
      message.warnings.push('This game has duplicate companions in team II.');
    }
    if (new Set(game.locations.filter(item => item?.id).map(item => item.id)).size < game.locations.filter(item => item?.id).length) {
      message.warnings.push('This game has duplicate locations.');
    }
    const hasThanos = game.villains[game.villains.findIndex(villain => villain.name === 'Thanos')];
    if (hasThanos && game.locations.some(location => location.hasVillain != hasThanos.id)) {
      message.warnings.push('Thanos must used all Thanos Locations.');
    }
    if (game.villains.some(villain => villain.name === 'Doctor Doom')
    && ((game.initLocation + 3) % 6) != game.locations.findIndex(location => location.name == 'Latveria')) {
      message.warnings.push('Doctor Doom must start in Latveria.');
    }
    if (game.villains.some(villain => villain.name === 'Marrow')
    && ((game.initLocation + 3) % 6) != game.locations.findIndex(location => location.name == 'Morlock Tunnels')) {
      message.warnings.push('Marrow must start in Morlock Tunnels.');
    }
    if (game.villains.some(villain => villain.name === 'Apocalypse')
    && (((game.initLocation + 3) % 6) != game.locations.findIndex(location => location.name == 'Apocalypse\'s Pyramid')
    || game.initLocation != game.locations.findIndex(location => location.name == 'Starlight Citadel'))) {
      message.warnings.push('Apocalypse must start in Apocalypse\'s Pyramid and Heroes in Starlight Citadel.');
    }
    if (game.villains.some(villain => villain.name === 'Morlun')
    && (((game.initLocation + 3) % 6) != game.locations.findIndex(location => location.name == 'Loomworld')
    || game.initLocation != game.locations.findIndex(location => location.name == 'Sims Tower'))) {
      message.warnings.push('Morlun must start in Loomworld and Heroes in Sims Tower.');
    }

    for (const villain of game.villains) {
      if (game.mode.code.endsWith('wSP') && villain?.superVillain == 0) {
        message.warnings.push(`${villain.name} can't be use with Super Villain Mode.`);
      }
      if (game.mode.code.startsWith('DA') && villain?.darkAvengers == 0) {
        message.errors.push(`${villain.name} can't be use with Dark Avengers Mode.`);
      }
      if (game.mode.code.startsWith('TvT') && villain?.teamVsTeam == 0) {
        message.warnings.push(`${villain.name} can't be use with Team vs Team Mode.`);
      }
      if (game.mode.code.startsWith('SS') && villain?.sinisterSix == 0) {
        message.errors.push(`${villain.name} can't be use with Sinister Six Mode.`);
      }
      if (game.mode.code.startsWith('HoG') && villain?.heraldsOfGalactus == 0) {
        message.warnings.push(`${villain.name} can't be use with Heralds of Galactus Mode.`);
      }
    }

    if (game?.challenge.name === 'Traitor Challenge') {
      if (game.mode.code.startsWith('TvT')) {
        message.warnings.push('Traitor Challenge can\'t be used in Team vs Team Mode');
      } else if (game.teamISize == 2) {
        message.errors.push('Traitor Challenge can only be used in games with 3 or 4 players.');
      }
    }

    if (!game.mode.code.startsWith('TvT') && game?.challenge.name === 'Accelerated Villain Challenge') {
      message.warnings.push('Accelerated Villain Challenge can only be used in Team vs Team Mode.');
    }
    if (game.mode.code.startsWith('TvT') && game?.challenge.name === 'Plan B Challenge') {
      message.warnings.push('Plan B Challenge can\'t be used in Team vs Team Mode.');
    }

    if (game?.challenge.name === 'Hazardous Locations Challenge') {
      if (game.locations.reduce((accumulator, location) => accumulator + location.isHazardous, 0) < 3) {
        message.warnings.push('Hazardous Locations Challenge must use 3 hazardous locations at least .');
      }
    }
    return message;
  }

  getCodeGame = async (game) => {
    const code = [];
    try {
      code.push(game.mode.id < 10 ? `0${game.mode.id}` : `${game.mode.id}`);
      code.push(`${game.initLocation}`);
      const emptyLocations = {0:[]};
      for (let i = 0; i < 6; i++) {
        if (game.locations[i].id == 0) {
          emptyLocations.push(i + 1);
        }
      }
      code.push(`${emptyLocations[0].length}`);
      if (emptyLocations.length < 6) {
        code.push(emptyLocations.join(""));
      }
      for (let i = 0; i < 6; i++) {
        if (game.locations[i].id != 0) {
          code.push(game.locations[i].id < 100 ? game.locations[i].id < 10 ? `00${game.locations[i].id}` : `0${game.locations[i].id}` : `${game.locations[i].id}`);
        }
      }
      code.push(game.challenge.id ? game.challenge.id < 10 ? `0${game.challenge.id}` : `${game.challenge.id}` : '00');
      code.push(`${UTILS.countObjects(game.villains)}`);
      for (const villain of game.villains) {
        if (villain?.id) {
          code.push(villain.id < 100 ? villain.id < 10 ? `00${villain.id}` : `0${villain.id}` : `${villain.id}`);
        }
      }
      code.push(`${UTILS.countObjects(game.teamI)}`);
      for (let i = 0; i < game.teamI.length; i++) {
        if (game.teamI[i]?.id) {
          code.push(game.teamI[i].id < 100 ? game.teamI[i].id < 10 ? `00${game.teamI[i].id}` : `0${game.teamI[i].id}` : `${game.teamI[i].id}`);
          if (game.companionsI[i]?.id) {
            code.push(game.companionsI[i].id < 10 ? `0${game.companionsI[i].id}` : `${game.companionsI[i].id}`);
          } else code.push('00')
        }
      }
      const teamIISize = UTILS.countObjects(game.teamII);
      code.push(`${teamIISize}`);
      if (teamIISize > 0) {
        for (let i = 0; i < game.teamII.length; i++) {
          if (game.teamII[i]?.id) {
            code.push(game.teamII[i].id < 100 ? game.teamII[i].id < 10 ? `00${game.teamII[i].id}` : `0${game.teamII[i].id}` : `${game.teamII[i].id}`);
            if (game.companionsII[i]?.id) {
              code.push(game.companionsII[i].id < 10 ? `0${game.companionsII[i].id}` : `${game.companionsII[i].id}`);
            } else code.push('00')
          }
        }
      }
    } catch (error) {
      console.log('Invalid game: ', error);
    }
    return code.join("");
  }

  getGameFromCode = async (code) => {
    const recoveredGame = {
      mode: 0,
      villains: [0, 0, 0, 0, 0, 0],
      locations: [0, 0, 0, 0, 0, 0],
      teamI: [0, 0, 0, 0, 0],
      teamII: [0, 0, 0, 0, 0],
      companionsI: [0, 0, 0, 0],
      companionsII: [0, 0, 0, 0],
      initLocation: 0,
      challenge: 0
    }
    try {
      let position = 0;
      recoveredGame.mode = Number(code.substring(position, position + 2));
      position += 2;
      recoveredGame.initLocation = Number(code.substring(position, position + 1));
      position += 1;
      let emptyLocations = Number(code.substring(position, position + 1));
      position += 1;
      emptyLocations = emptyLocations <= 6 ? emptyLocations : 6;
      const locationsWithId = 6 - emptyLocations;
      const emptyLocationsAux = [];
      for (let i = 1; i <= emptyLocations; i++) {
        emptyLocationsAux.push(Number(code.substring(position, position + 1)));
        position += 1;
      }
      const locationsWithIdAux = [];
      for (let i = 1; i <= locationsWithId; i++) {
        locationsWithIdAux.push(Number(code.substring(position, position + 3)));
        position += 3;
      }
      for (let i = 0; i < 6; i++ ) {
        if (emptyLocationsAux.includes(i + 1)) {
          continue;
        } else {
          recoveredGame.locations[i] = locationsWithIdAux[0];
          locationsWithIdAux.shift();
        }
      }
      recoveredGame.challenge = Number(code.substring(position, position + 2));
      position += 2;
      const villainsSize = Number(code.substring(position, position + 1));
      position += 1;
      for (let i = 1; i <= villainsSize && i < 7; i++) {
        recoveredGame.villains[i-1] = Number(code.substring(position, position + 3));
        position += 3;
      }
      const teamISize = Number(code.substring(position, position + 1));
      position += 1;
      for (let i = 1; i <= teamISize && i < 7; i++) {
        recoveredGame.teamI[i-1] = Number(code.substring(position, position + 3));
        position += 3;
        recoveredGame.companionsI[i-1] = Number(code.substring(position, position + 2));
        position += 2;
      }
      const teamIISize = Number(code.substring(position, position + 1));
      position += 1;
      for (let i = 1; i <= teamIISize && i < 7; i++) {
        recoveredGame.teamII[i-1] = Number(code.substring(position, position + 3));
        position += 3;
        recoveredGame.companionsII[i-1] = Number(code.substring(position, position + 2));
        position += 2;
      }
    } catch (error) {
      console.log('Invalid code game: ', error);
    }
    return recoveredGame;
  }

  meetsMojoRules = async (villains, locations) =>
    villains.some(villain => villain.name === 'Mojo')
    && locations.some(location => location.name === 'Mojoverse');

  meetsDoctorDoomRules = async (villains, locations) =>
    villains.some(villain => villain.name === 'Doctor Doom')
    && locations.some(location => location.name === 'Latveria');

  meetsMarrowRules = async (villains, locations) =>
    villains.some(villain => villain.name === 'Marrow')
    && locations.some(location => location.name === 'Morlock Tunnels');

  meetsArcadeRules = async (villains, locations) =>
    villains.some(villain => villain.name === 'Arcade')
    && locations.some(location => location.name === 'Murderworld')

  meetsApocalypseRules = async (villains, locations) =>
    villains.some(villain => villain.name === 'Apocalypse')
    && locations.some(location => location.name === 'Apocalypse\'s Pyramid')
    && locations.some(location => location.name === 'Starlight Citadel');

  meetsMorlunRules = async (villains, locations) =>
    villains.some(villain => villain.name === 'Morlun')
    && locations.some(location => location.name === 'Loomworld')
    && locations.some(location => location.name === 'Sims Tower');

}