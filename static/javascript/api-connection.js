let characters = [];
let pages = {
  actual: 1,
  prev: false,
  next: true,
  maxPage: 0,
};

// div para contener las cards
let charactersCards = document.getElementById("characters-cards");

const createCharacterCards = (character) => {
  let characterCard = document.createElement("article");

  // info
  let img = document.createElement("img");
  img.src = character.image;

  let name = document.createElement("h5");
  name.innerHTML = character.name;

  // style
  characterCard.style.textAlign = "center";

  // insert html
  characterCard.appendChild(img);
  characterCard.appendChild(name);

  charactersCards.appendChild(characterCard);
};

const getCharacters = async () => {
  await fetch(`https://rickandmortyapi.com/api/character/?page=${pages.actual}`)
    .then((data) => data.json())
    .then((data) => {
      // info
      const info = data.info;

      pages.prev = info.prev ? true : false;
      pages.next = info.next ? true : false;
      pages.maxPage = info.pages;

      console.log(pages);
      return data.results;
    })
    .then((data) => {
      // data
      characters = data;
    })
    .catch((err) => console.log(err));

  characters.forEach((character) => {
    console.log(character);
    createCharacterCards(character);
  });
};

getCharacters();

// creacion de boton para avanzar y retroceder
let prevButton = document.getElementById("prev");
let nextButton = document.getElementById("next");

prevButton.disabled = true;
nextButton.disabled = false;

prevButton.addEventListener("click", () => {
  if (pages.prev) {
    pages.actual--;
    getCharacters();
  }
  nextButton.disabled = pages.actual <= pages.maxPage ? false : true;
  prevButton.disabled = pages.actual > 1 ? false : true;
});
nextButton.addEventListener("click", () => {
  if (pages.next) {
    pages.actual++;
    getCharacters();
  }

  prevButton.disabled = pages.actual > 1 ? false : true;
  nextButton.disabled = pages.actual <= pages.maxPage ? false : true;
});

// charactersSection.appendChild(prevButton);
// charactersSection.appendChild(nextButton);
