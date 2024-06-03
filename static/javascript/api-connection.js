let pages = {
  actual: 1,
  prev: false,
  next: true,
  maxPage: 0,
};

// div para contener las cards
let charactersCards = document.getElementById("characters-cards");

let actualPageText = document.getElementById("pages-counter");
actualPageText.style.color = "white";
actualPageText.style.alignContent = "center";
actualPageText.innerHTML = `Pagina ${pages.actual} de ${pages.maxPage}`;

const createCharacterCards = (character) => {
  let characterCard = document.createElement("article");

  // info
  let img = document.createElement("img");
  img.src = character.image;

  let name = document.createElement("h4");
  name.innerHTML = character.name;
  name.style.color = "white";

  // style
  characterCard.style.textAlign = "center";

  // insert html
  characterCard.appendChild(img);
  characterCard.appendChild(name);

  return characterCard;
};

const showCards = (cards) => {
  while (charactersCards.hasChildNodes()) {
    charactersCards.removeChild(charactersCards.firstChild);
  }

  cards.forEach((character) => {
    charactersCards.appendChild(character);
  });
};

const getCharacters = async () => {
  let characters = [];
  let cards = [];

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
    // console.log(character);

    cards.push(createCharacterCards(character)); //genera articles
  });

  showCards(cards);

  actualPageText.innerHTML = `Pagina ${pages.actual} de ${pages.maxPage}`;
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

  actualPageText.innerHTML = `Pagina ${pages.actual} de ${pages.maxPage}`;
});
nextButton.addEventListener("click", () => {
  if (pages.next) {
    pages.actual++;
    getCharacters();
  }

  prevButton.disabled = pages.actual > 1 ? false : true;
  nextButton.disabled = pages.actual == pages.maxPage ? true : false;

  actualPageText.innerHTML = `Pagina ${pages.actual} de ${pages.maxPage}`;
});

// charactersSection.appendChild(prevButton);
// charactersSection.appendChild(nextButton);
