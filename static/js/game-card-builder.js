class CardBuilder {

  #card;
  constructor() {
    this.#card = document.getElementById('cardGame');
  }

  buildCard = (game, optionals, code, notes) => {
    console.log(game);
    this.#card.classList.remove('flipped');
    this.#card.querySelector('[card-section="card-description"]').textContent = this.#getDescription(game.mode);
    this.#card.querySelector('[card-section="players"]').textContent = game.mode.players;
    this.#card.querySelector('[card-section="challenge"]').textContent = game.challenge?.name || 'No challenge';
    this.#setLocations(game);
    this.#setTeamDecks(optionals, 'blue');
    this.#setTeam('blue', game.teamI, game.mode.teamISize, game.companionsI);
    if (game.mode.teams == 2) {
      this.#card.querySelector('[card-section="blue-team"]').firstElementChild.textContent = 'Blue Team';
      this.#card.querySelector('[card-section="blue-team-inidicator"]').classList.remove('d-none');
      this.#card.querySelector(`[card-section="${game.mode.villains == 0 ? 'red' : 'yellow'}-team"]`).firstElementChild.textContent = `${game.mode.villains == 0 ? 'Red' : 'Yellow'} Team`;
      this.#card.querySelectorAll(`[card-section="${game.mode.villains == 0 ? 'red' : 'yellow'}-team-optionals"]`).forEach(item => item.classList.remove('d-none'));
      this.#card.querySelectorAll(`[card-section="${game.mode.villains == 0 ? 'yellow' : 'red'}-team-optionals"]`).forEach(item => item.classList.add('d-none'));
      this.#setTeamDecks(optionals, game.mode.villains == 0 ? 'red' : 'yellow');
      this.#setTeam(game.mode.villains == 0 ? 'red' : 'yellow', game.teamII, game.mode.teamIISize, game.companionsII);
      if (game.mode.villains > 0) {
        this.#card.querySelector('[card-section="yellow-team"]').classList.remove('d-none');
        this.#card.querySelector('[card-section="red-team"]').firstElementChild.textContent = 'Villain(s)';
      } else {
        this.#card.querySelector('[card-section="yellow-team"]').classList.add('d-none');
      }
    } else {
      this.#card.querySelector('[card-section="blue-team"]').firstElementChild.textContent = 'Heroes';
      this.#card.querySelector('[card-section="red-team"]').firstElementChild.textContent = 'Villain(s)';
      this.#card.querySelector('[card-section="blue-team-inidicator"]').classList.add('d-none');
      this.#card.querySelectorAll('[card-section$="-team-optionals"]').forEach(item => item.classList.add('d-none'));
      this.#card.querySelector('[card-section="yellow-team"]').classList.add('d-none');
    }
    if (game.mode.villains > 0) {
      this.#setTeam('red', typeof game.villains[0].members == 'string' ? game.villains : game.villains[0].members , typeof game.villains[0].members == 'string' ? game.mode.villains : game.villains[0].members.length , []);
    }
    this.#card.querySelector('[card-section="code"]').textContent = code;
    this.#card.querySelector('[name="card-code"]').value = code;
    this.#setNotes(notes);
  }

  #setLocations = (game) => {
    const locationSection = this.#card.querySelector('[card-section="locations"]');
    locationSection.replaceChildren();
    for (let i = 0; i < 6; i++) {
      locationSection.appendChild(
        elCr(`div.col-6.order-${((i+i)%6)+1}`, [
          elCr('span.fa-stack.fa-2x.fs-6', [
            elCr('i.fa-regular.fa-square.fa-stack-2x'),
            i == game.initLocation ? elCr('i.fa-solid.fa-bullseye.text-orange.fa-stack-1x') : elCr('span.fst-game-title.fa-stack-1x',i + 1)
          ]),
          elCr("span", game.locations[i].name)
        ])
      );
    }
  }

  #setTeamDecks = (optionals, team) => {
    const optionalTeamDecksSection = this.#card.querySelector(`[card-section="${team}-team-decks"]`);
    optionalTeamDecksSection.replaceChildren();
    const decks = team == 'blue' ? optionals.teamDecksI : optionals.teamDecksII;
    if (decks.length > 0) {
      for (let deck of decks) {
        optionalTeamDecksSection.appendChild(elCr("p.m-0", deck.name));
      }
    } else {
      optionalTeamDecksSection.appendChild(elCr("p.m-0", 'No decks'));
    }
  }

  #setNotes = (notes) => {
    const icon = this.#card.querySelector('[card-section="is-valid"]');
    if (notes.errors.length > 0) {
      icon.classList.remove('fa-triangle-exclamation', 'fa-circle-check');
      icon.classList.add('fa-ban');
      icon.parentElement.parentElement.classList.remove('bg-lime', 'bg-yellow');
      icon.parentElement.parentElement.classList.add('bg-red');
    } else if (notes.warnings.length > 0) {
      icon.classList.remove('fa-ban', 'fa-circle-check');
      icon.classList.add('fa-triangle-exclamation');
      icon.parentElement.parentElement.classList.remove('bg-lime', 'bg-red');
      icon.parentElement.parentElement.classList.add('bg-yellow');
    } else {
      icon.classList.remove('fa-triangle-exclamation', 'fa-ban');
      icon.classList.add('fa-circle-check');
      icon.parentElement.parentElement.classList.remove('bg-red', 'bg-yellow');
      icon.parentElement.parentElement.classList.add('bg-lime');
    }
  }

  #setTeam = (team, items, size, companions) => {
    const teamSection = this.#card.querySelector(`[card-section="${team}-team"]`);
    const teamCharacters = teamSection.lastElementChild;
    teamSection.classList.remove('cols-1-section', 'cols-2-section');
    teamSection.classList.add(`cols-${size <= 3 ? 1 : 2}-section`);
    teamCharacters.classList.remove('row-cols-1', 'row-cols-2');
    teamCharacters.classList.add(`row-cols-${size <= 3 ? 1 : 2}`);
    teamCharacters.replaceChildren();
    for (let i = 0; i < 6; i++) {
      if (i + 1 <= size && items[i]?.id) {
        let positionStyles = '';
        let companionPositionStyles = '';
        if (items[i]?.position) {
          const position = items[i].position.split(',');
          positionStyles = `background-position: ${position[0]}% ${position[1]}%;` + (position.length == 3 ? `background-size: ${position[2]}%;` : '');
        } else {
          positionStyles = 'background-position: 50% 50%;';
        }
        if (companions[i]?.id && companions[i]?.position) {
          const position = companions[i].position.split(',');
          companionPositionStyles = `background-position: ${position[0]}% ${position[1]}%;` + 'background-size: ' + (position.length == 3 ? position[2] : 360) + '%;';
        } else {
          companionPositionStyles = 'background-position: 50% 50%;';
        }
        teamCharacters.appendChild(
          elCr('.col', [
            elCr('.avatar.avatar-xl.p-0.border-0', [
              elCr(`span.avatar.avatar-xl.avatar-mu-xl.border.border-2.border-bottom-0${size > 3 && i % 2 == 0 ? '.border-start-0' : '.border-x-0'}.border-black.rounded-0[style=${positionStyles}background-image:url('static/img/bio/${UTILS.removeChars(items[i].name)}.png')]`),
              elCr(`span.badge.badge-item.bg-${size==5&&i>0?'dark-lt':team}.rounded-0.border.border-2.border-bottom-0${size > 3 && i % 2 == 0 ? '.border-start-0' : '.border-x-0'}.border-black.fst-game-title.w-100.text-white.shadow-none${items[i].name.length>17?'.text-wrap.fs-7':'.fs-6'}`, items[i].name),
              (companions[i]?.id && ((size == 5 && i == 0) || size < 5))
              ? elCr('.position-absolute.start-0.bottom-0.fst-game-title.fs-6[style=margin-bottom:16px;]', [
                elCr('.d-inline.bg-orange.border.border-2.border-start-0.border-bottom-0.border-black.text-white.fs-7.p-0[style=padding:.15rem!important;]', [
                  elCr(`.avatar.avatar-xs.companion-avatar.border.border-2.border-bottom-0.border-black.rounded-0[style=${companionPositionStyles}background-image:url('static/img/bio/${UTILS.removeChars(companions[i].name)}.png');]`),
                  elCr('span.ms-1', companions[i].name)
                ])
              ])
              : [],
              (items[i]?.equipments && ((size == 5 && i == 0) || size < 5))
              ? elCr('.position-absolute.end-0.top-0.fst-game-title.fs-6[style=margin-top:3px;margin-right:2px;]', [
                elCr('.d-inline.bg-white.border.border-2.border-top-0.border-end-0.border-black.text-black[style=padding:.2rem!important;]', [
                  elCr('i.fa-solid.fa-gear'), `:${items[i].equipments}`
                ])
              ])
              : []
            ])
          ])
        );
      } else {
        teamCharacters.appendChild(
          elCr('.col', [
            elCr(`.avatar.avatar-xl.p-0.border-0.bg-${team}`, [
              elCr(`span.avatar.avatar-xl.avatar-mu-xl.border.border-2.border-bottom-0${size > 3 && i % 2 == 0 ? '.border-start-0' : '.border-x-0'}.border-black.rounded-0.opacity-75[style=background-size:100%;background-image:url(static/img/empty.png)]`),
            ])
          ])
        );
      }
      if (size <= 3 && i + 1 == 3) {
        return;
      }
    }
  }

  #getDescription = (mode) => {
    let modeDescription = '';
    modeDescription += mode.players > 1 ? ` (P${mode.code.includes('(SX') || mode.code.includes('(C') || mode.code.includes('SXw') || mode.code.includes('Cw') ? '1' : mode.teamISize}` : '';
    modeDescription += mode.players > 1 && mode.teamIISize > 0 ? ` VS P${mode.code.includes('vSX') || mode.code.includes('vC') ? '1' : mode.teamIISize}` : '';
    modeDescription += mode.players > 1 && mode.superVillainMode == 1 ? ' VS P1' : '';
    modeDescription += mode.players > 1 ? ')' : '';
    return ` (P${mode.players})` == modeDescription ? mode.name : (mode.name + modeDescription);
  }

}
