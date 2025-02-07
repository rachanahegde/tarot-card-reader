// Insert the 78 card backs dynamically (making sure that they overlap)
// Card should shine and pop up from screen when user hovers over them

document.addEventListener("DOMContentLoaded", async () => {
  const mainContainer = document.querySelector(".main-container");
  const cardContainer = document.querySelector(".card-container");

  // Create div for displaying selected cards
  const selectedCardsContainer = document.createElement("div");
  selectedCardsContainer.className = "flex justify-center mt-10 space-x-4";
  mainContainer.insertBefore(selectedCardsContainer, cardContainer);

  // List of cards selected by user
  let selectedCards = [];

  // Load JSON data
  const response = await fetch("../tarot_cards.json");
  const data = await response.json();
  let cards = data.cards;

  // Shuffle the cards
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Random index
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }

  cards = shuffle(cards);

  // Display card backs
  cards.forEach((cardData, index) => {
    const card = document.createElement("img");
    card.src = "../assets/cards/tarot_card_back.png";
    card.alt = "Tarot Card Back";
    card.className =
      "w-[80px] -ml-8 transition-transform duration-100 hover:scale-110 hover:z-10 hover:shadow-[0px_0px_5px_4px_rgba(191,145,255,0.8)] cursor-pointer";
    card.dataset.index = index;

    card.addEventListener("click", () => handleCardClick(card, cardData));

    cardContainer.appendChild(card);
  });

  function handleCardClick(cardElement, cardData) {
    // Makes sure user can only select max 3 cards and same card isn't selected more than once
    if (selectedCards.length < 3 && !selectedCards.includes(cardData)) {
      selectedCards.push(cardData);

      // Display the selected card at the top
      const selectedCard = document.createElement("img");
      selectedCard.src = cardData.filePath;
      selectedCard.alt = cardData.name;
      selectedCard.className =
        "w-[200px] transition-transform duration-300 hover:scale-105 shadow-lg rounded-lg";

      selectedCardsContainer.appendChild(selectedCard);

      // Remove the selected card from the lineup
      cardElement.remove();

      // Disable further clicks after 3 cards are selected
      if (selectedCards.length === 3) {
        disableFurtherClicks();
      }
    }
  }

  function disableFurtherClicks() {
    // Selects remaining cards, the <img> elements in .card-container div
    const remainingCards = document.querySelectorAll(".card-container img");
    //Loops through remaining cards and prevents any clicks on them
    remainingCards.forEach((card) => {
      card.style.pointerEvents = "none";
    });

    // Remove all unselected cards after a brief delay
    setTimeout(() => {
      cardContainer.innerHTML = ""; // Clears all cards
    }, 1000); // Delay by 1 second for smooth transition
  }
});

// TODO add some sort of animation when user clicks on card

// TODO Add the 'Interpret my cards' button
// TODO Redirect to new page when they click on 'interpret my cards' (tarot-explanation.html)
