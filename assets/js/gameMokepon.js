// Section choose mokepons
let mokepones = [];
let containPets = document.querySelector('.containPets');
let btnChoosePet = document.querySelector(".btnChoosePet");
let hiddenSelectionPets;
let replaceSubTitle = document.querySelector('.sub-title');// These change for the maps

//Section Battle mokepons
let allPets = document.getElementsByName('pet');
let findPetChecked = [];
let imagePlayer;
let imageEnemy;
let typeOfMokepon;
let typeOfMokeponEnemy;
let allAttacksPlayerPet;
let allAttacksEnemyPet;
let mokeponsOptions;
let attacksMokepons;
let totalAttacksInsert = document.querySelector('.gamesRound span');
let totalAttacks = Array(5).fill('⚔️');
let totalVictoriesPlayer = [];
let totalVictoriesEnemy = [];
let buttons = [];
let attackedPlayer = [];
let attackedEnemy = [];
let randomNamePetEnemy;
let playerAttackedSelect;
let enemyAttackedSelect;
let victoryPlayer = 0;
let victoryEnemy = 0;
let resultWinner;
let countAttacks = 0;
let strongAttack;
let reboot;





// Single source of truth.
//Class
class Mokepon {
  //Object's
  constructor(name, image, typeOfMokepon) {
    //Internal variables.
    this.name = name;
    this.image = image;
    this.typeOfMokepon = typeOfMokepon;
    this.attacks = [];
    this.x = 20;
    this.y = 30;
    this.width = 80;
    this.height = 80;
    this.mapImage = new Image();
    this.mapImage.src = image;

  }
}

// Instances.
let hipodoge = new Mokepon('Hipodoge', './assets/images/mokepon_hipodoge.webp', 'water');
let capipepo = new Mokepon('Capipepo', './assets/images/mokepon_capipepo.webp', 'land');
let ratigueya = new Mokepon('Ratigueya', './assets/images/mokepon_ratigueya.webp', 'fire');
let langostelvis = new Mokepon('Langostelvis', './assets/images/mokepon_langostelvis.webp', 'fire');
let pydos = new Mokepon('Pydos', './assets/images/mokepon_pydos.webp', 'water');
let tucapalma = new Mokepon('Tucapalma', './assets/images/mokepon_tucapalma.webp', 'land');


//These inject to attribute {this.attack} directly
hipodoge.attacks = Array(3).fill({ nameAttack: '🌊', id: 'btnWater', dataAttack: 'Water' })
  .concat({ nameAttack: '🔥', id: 'btnFire', dataAttack: 'Fire' })
  .concat({ nameAttack: '🌱', id: 'btnLand', dataAttack: 'Land' });

// hipodoge.attacks.push(
//   { nameAttack: '🌊', id: 'btnWater', dataAttack: 'Water' },
//   { nameAttack: '🌊', id: 'btnWater', dataAttack: 'Water' },
//   { nameAttack: '🌊', id: 'btnWater', dataAttack: 'Water' },
//   { nameAttack: '🔥', id: 'btnFire', dataAttack: 'Fire' },
//   { nameAttack: '🌱', id: 'btnLand', dataAttack: 'Land' }
// );

capipepo.attacks.push(
  { nameAttack: '🌱', id: 'btnLand', dataAttack: 'Land' },
  { nameAttack: '🌱', id: 'btnLand', dataAttack: 'Land' },
  { nameAttack: '🌱', id: 'btnLand', dataAttack: 'Land' },
  { nameAttack: '🔥', id: 'btnFire', dataAttack: 'Fire' },
  { nameAttack: '🌊', id: 'btnWater', dataAttack: 'Water' }
);

ratigueya.attacks.push(
  { nameAttack: '🔥', id: 'btnFire', dataAttack: 'Fire' },
  { nameAttack: '🔥', id: 'btnFire', dataAttack: 'Fire' },
  { nameAttack: '🔥', id: 'btnFire', dataAttack: 'Fire' },
  { nameAttack: '🌊', id: 'btnWater', dataAttack: 'Water' },
  { nameAttack: '🌱', id: 'btnLand', dataAttack: 'Land' }
);

pydos.attacks.push(
  { nameAttack: '🌊', id: 'btnWater', dataAttack: 'Water' },
  { nameAttack: '🌊', id: 'btnWater', dataAttack: 'Water' },
  { nameAttack: '🌊', id: 'btnWater', dataAttack: 'Water' },
  { nameAttack: '🔥', id: 'btnFire', dataAttack: 'Fire' },
  { nameAttack: '🌱', id: 'btnLand', dataAttack: 'Land' }
);

tucapalma.attacks.push(
  { nameAttack: '🌱', id: 'btnLand', dataAttack: 'Land' },
  { nameAttack: '🌱', id: 'btnLand', dataAttack: 'Land' },
  { nameAttack: '🌱', id: 'btnLand', dataAttack: 'Land' },
  { nameAttack: '🔥', id: 'btnFire', dataAttack: 'Fire' },
  { nameAttack: '🌊', id: 'btnWater', dataAttack: 'Water' }
);

langostelvis.attacks.push(
  { nameAttack: '🔥', id: 'btnFire', dataAttack: 'Fire' },
  { nameAttack: '🔥', id: 'btnFire', dataAttack: 'Fire' },
  { nameAttack: '🔥', id: 'btnFire', dataAttack: 'Fire' },
  { nameAttack: '🌊', id: 'btnWater', dataAttack: 'Water' },
  { nameAttack: '🌱', id: 'btnLand', dataAttack: 'Land' }
);

mokepones.push(hipodoge, capipepo, ratigueya, langostelvis, pydos, tucapalma);

//Choose Mokepons.
function startGame() {

  mokepones.forEach((mokepon) => {
    //Literary Templates.
    mokeponsOptions = `
    <label for=${mokepon.name.toLowerCase()} class=${mokepon.typeOfMokepon}>
      <input type="radio" name="pet" id=${mokepon.name.toLowerCase()}>
        <span class="radio-btn"><strong></strong>
        <img src=${mokepon.image} alt=${mokepon.name.toLowerCase()}>
        <p>${mokepon.name}</p>
      </span>
    </label>
    `;
    containPets.innerHTML += mokeponsOptions;

    hiddenSelectionPets = document.querySelectorAll('.containPets label, .btnChoosePet, .more-information');
    btnChoosePet.addEventListener('click', validateSelection);
  });

}

function validateSelection() {
  let showPetAttacks = document.querySelector('.containerBattlePets');
  //Map
  let viewMap = document.querySelector('.view-map');
  let right = document.querySelector('.right');
  right.addEventListener('click', movePet);


  allPets.forEach(function (pet) {
    if (pet.checked) {
      findPetChecked.push(pet.id);
    }
  });

  if (findPetChecked.length != 0) {
    //map
    replaceSubTitle.innerHTML = "Search for your opponent:";
    viewMap.style.display = 'flex';
    containPets.style.height = '65vh';
    containPets.style.padding = '8px 8px 15px'

    // replaceSubTitle.innerHTML = "Select your attack:";
    // showPetAttacks.style.display = 'flex';
    // containPets.style.height = '60%';

    playerSelectPet();
  } else {
    alert('Please, Choose your pet');
  }
}


function paintPet(){
  //Map
  let viewMap = document.querySelector('.view-map');
  let map = document.getElementById('map');
  let canvas = map.getContext("2d");

  canvas.clearRect(0, 0, map.width, map.height);
  canvas.drawImage(
    ratigueya.mapImage,
    ratigueya.x,
    ratigueya.y,
    ratigueya.width,
    ratigueya.height
  );


}

function movePet(){
  ratigueya.x = ratigueya.x + 5;
  paintPet()
}


function playerSelectPet() {
  let playerPet = document.querySelectorAll('.playerPet img, .playerPet p');
  let enemyPet = document.querySelectorAll('.enemyPet img, .enemyPet p');
  let namePetPlayer = document.querySelector('.namePetPlayer');
  let namePetEnemy = document.querySelector('.namePetEnemy');

  hiddenSelectionPets.forEach(function (hiddenSelectionPet) {
    hiddenSelectionPet.style.display = "none"
  });

  namePetSelected = findPetChecked[0];
  namePetSelected = namePetSelected.charAt(0).toUpperCase() + namePetSelected.slice(1);// I think it's not necessary

  for (let x = 0; x < mokepones.length; x++) {
    if (namePetSelected === mokepones[x].name) {
      allAttacksPlayerPet = mokepones[x].attacks;
      imagePlayer = mokepones[x].image;
      typeOfMokepon = mokepones[x].typeOfMokepon;
    }
  }
  //Factory this code.
  playerPet.forEach(function (playerPetSet) {
    playerPetSet.src = imagePlayer;
    playerPetSet.alt = namePetSelected;
    playerPetSet.classList.add(typeOfMokepon);
  });
  namePetPlayer.innerHTML = namePetSelected;



  let randomNumberEnemy = randomNumber(0, mokepones.length);
  randomNamePetEnemy = allPets[randomNumberEnemy].id;
  randomNamePetEnemy = randomNamePetEnemy.charAt(0).toUpperCase() + randomNamePetEnemy.slice(1);

  for (let z = 0; z < mokepones.length; z++) {
    if (randomNamePetEnemy === mokepones[z].name) {
      imageEnemy = mokepones[z].image;
      typeOfMokeponEnemy = mokepones[z].typeOfMokepon;
    }
  }

  enemyPet.forEach(function (enemyPetSet) {
    enemyPetSet.src = imageEnemy;
    enemyPetSet.alt = randomNamePetEnemy.toLowerCase();
    enemyPetSet.classList.add(typeOfMokeponEnemy);
  });
  namePetEnemy.innerHTML = randomNamePetEnemy;
  //Don't repeat Code

  showAttacks(allAttacksPlayerPet);

}

function showAttacks(allAttacksPlayerPet) {
  let btnAttacksContainer = document.querySelector('.containAttacks');
  let totalAttacksInsert = document.querySelector('.gamesRound span');


  let indiceMokepon = mokepones.findIndex(mokepon => mokepon.name === namePetSelected);
  let icoMokepon = mokepones[indiceMokepon].attacks[0].nameAttack;
  let typeMokepon = mokepones[indiceMokepon].attacks[0].dataAttack;


  if(typeOfMokepon  === typeOfMokeponEnemy){
    totalAttacksInsert.innerHTML = totalAttacks.join('');
    allAttacksPlayerPet.forEach((attackPet) => {
      attacksMokepons = `<button class=${attackPet.id} data-type_attack=${attackPet.dataAttack}>${attackPet.nameAttack}</button>`
      btnAttacksContainer.innerHTML += attacksMokepons;
    });
    strongAttack = 1;

  }else if(typeOfMokepon  === 'water' && typeOfMokeponEnemy === 'fire' || typeOfMokepon  === 'fire' && typeOfMokeponEnemy === 'land' || typeOfMokepon  === 'land' && typeOfMokeponEnemy === 'water'){
    totalAttacks.push('⚔️');
    totalAttacksInsert.innerHTML = totalAttacks.join('');
    mokepones[indiceMokepon].attacks.push({ nameAttack: `${icoMokepon}`, id: 'btn' + `${typeMokepon}`, dataAttack: `${typeMokepon}` });
    allAttacksPlayerPet.forEach((attackPet) => {
      attacksMokepons = `<button class=${attackPet.id} data-type_attack=${attackPet.dataAttack}>${attackPet.nameAttack}</button>`
      btnAttacksContainer.innerHTML += attacksMokepons;
    });
    strongAttack = 2;
  } else {
    totalAttacks.pop();
    totalAttacksInsert.innerHTML = totalAttacks.join('');
    mokepones[indiceMokepon].attacks.pop();
    allAttacksPlayerPet.forEach((attackPet) => {
      attacksMokepons = `<button class=${attackPet.id} data-type_attack=${attackPet.dataAttack}>${attackPet.nameAttack}</button>`
      btnAttacksContainer.innerHTML += attacksMokepons;
      strongAttack = true;
    });
    strongAttack = 3;
  }



  buttons = document.querySelectorAll('.containAttacks button[class*="btn"]');
  reboot = document.querySelector('.reboot');
  reboot.addEventListener('click', rebootGame);

  sequenceOfAttacks();

}

function sequenceOfAttacks() {

  buttons.forEach((button) => {
    button.addEventListener('click', (x) => {
      if (x.target.textContent === '🔥') {
        attackedPlayer.push('Fire');
        totalAttacks.pop()
        button.disabled = true;
      } else if (x.target.textContent === '🌊') {
        attackedPlayer.push('Water');
        totalAttacks.pop()
        button.disabled = true;
      } else {
        attackedPlayer.push('Land');
        totalAttacks.pop()
        button.disabled = true;
      }
      randomEnemyAttack();
    })
  });


}

//  Validate Name pet in Class and return attacks
function randomEnemyAttack() {

  randomNamePetEnemy = randomNamePetEnemy.charAt(0).toUpperCase() + randomNamePetEnemy.slice(1);
  for (let x = 0; x < mokepones.length; x++) {
    if (randomNamePetEnemy == mokepones[x].name) {
      allAttacksEnemyPet = mokepones[x].attacks;
    }
  }

  let randomNumberEnemy = randomNumber(0, allAttacksEnemyPet.length);
  attackedEnemy.push(allAttacksEnemyPet[randomNumberEnemy].dataAttack);
  playGame();
}

//Why the variables not working in global scope?
function playGame() {
  let victoryPlayerInsert = document.querySelector('.victoriesPlayer');
  let victoryEnemyInsert = document.querySelector('.victoriesEnemy');

  for (let x = 0; x < attackedPlayer.length; x++) {

    if (attackedPlayer.length > 1) {
      attackedPlayer.splice(0, 1);
      attackedEnemy.splice(0, 1);
    }

    if (attackedPlayer[x] === attackedEnemy[x]) {
      resultWinner = '😐 <br/> Tie ';
      countAttacks++;

    } else if (attackedPlayer[x] === 'Fire' && attackedEnemy[x] === 'Land' || attackedPlayer[x] === 'Water' && attackedEnemy[x] === 'Fire' || attackedPlayer[x] === 'Land' && attackedEnemy[x] === 'Fire') {
      victoryPlayer++
      resultWinner = '🏆 <br/> Win';
      totalVictoriesPlayer.push('🏆');
      victoryPlayerInsert.innerHTML = totalVictoriesPlayer.join('');
      countAttacks++;

    } else {

      victoryEnemy++;
      resultWinner = '😭 <br/> Lose';
      totalVictoriesEnemy.push('🏆');
      victoryEnemyInsert.innerHTML = totalVictoriesEnemy.join('');
      countAttacks++;

    }
    getNumberAttack(x, x);
    createMessage();
  }


  if (strongAttack === 1 && countAttacks === 5) {
    validateVictorys();
  } else if(strongAttack === 2 && countAttacks === 6){
    validateVictorys();
  } else if(strongAttack === 3 && countAttacks === 4){
    validateVictorys();
  }

}

function getNumberAttack(player, enemy) {
  playerAttackedSelect = attackedPlayer[player];
  enemyAttackedSelect = attackedEnemy[enemy];
}

function createMessage() {
  let playerAttack = document.querySelector('.attackPlayer');
  let enemyAttack = document.querySelector('.attackEnemy');
  let sectionResult = document.querySelector('.resultAttack');
  let totalAttacksInsert = document.querySelector('.gamesRound span');

  totalAttacksInsert.innerHTML = totalAttacks.join('');
  playerAttack.innerHTML = 'attacked with ' + playerAttackedSelect;
  enemyAttack.innerHTML = 'attacked with ' + enemyAttackedSelect;
  sectionResult.innerHTML = resultWinner;

}

function validateVictorys() {
  let messageTitle = document.querySelector('#messages h1');
  let sectionResult = document.querySelector('.resultAttack');
  messageTitle.innerHTML = 'The Battle Result is:'

  if (victoryPlayer === victoryEnemy) {
    sectionResult.innerHTML = "😐 <br/> It's Tie";
  } else if (victoryPlayer > victoryEnemy) {
    sectionResult.innerHTML = '🏆 <br/> You Won!';
  } else {
    sectionResult.innerHTML = '🥲 <br/> You Lose!';
  }
  btnAttacks = document.querySelectorAll('.containAttacks button[class*="btn"]');
  btnAttacks.forEach(function (btnAttacks) {
    btnAttacks.style.display = 'none';
  });

  reboot.style.display = 'block';
}

function rebootGame() {
  location.reload();
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

window.addEventListener('load', startGame);
