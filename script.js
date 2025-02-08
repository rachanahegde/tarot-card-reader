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

  // Display card backs with flip animation
  cards.forEach((cardData, index) => {
    const card = document.createElement("div");
    card.className =
      "card w-[80px] h-[120px] -ml-8 hover:scale-110 hover:z-20 transition-transform duration-300";
    card.dataset.index = index;

    const cardInner = document.createElement("div");
    cardInner.className = "card-inner";

    const cardBack = document.createElement("div");
    cardBack.className = "card-back";

    const cardFront = document.createElement("img");
    cardFront.className = "card-front";
    cardFront.src = cardData.filePath;
    cardFront.alt = cardData.name;

    cardInner.appendChild(cardBack);
    cardInner.appendChild(cardFront);
    card.appendChild(cardInner);
    cardContainer.appendChild(card);

    card.addEventListener("click", () => handleCardClick(card, cardData));
  });

  function handleCardClick(cardElement, cardData) {
    // Makes sure user can only select max 3 cards and same card isn't selected more than once
    if (selectedCards.length < 3 && !selectedCards.includes(cardData)) {
      selectedCards.push(cardData);

      // Flip the card
      cardElement.classList.add("flipped");

      // Add sparkle effect
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle";
      cardElement.appendChild(sparkle);

      // Display the selected card at the top after flip animation
      setTimeout(() => {
        const selectedCard = document.createElement("img");
        selectedCard.src = cardData.filePath;
        selectedCard.alt = cardData.name;
        selectedCard.className =
          "w-[200px] transition-transform duration-300 hover:scale-105 shadow-lg rounded-lg shimmer";
        selectedCardsContainer.appendChild(selectedCard);

        // Remove the card from the grid
        cardElement.remove();
      }, 800); // Wait for the flip animation to finish

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

// TODO Add the tarot card's name above each card and the words 'past' 'present' 'future' below each card
// TODO Add the 'Interpret my cards' button
// TODO Show the explanation for the first card when they click on 'interpret my cards' (tarot-explanation.html). Then when they click or hover over a card, the explanation for THAT card should show instead.
// TODO optional styling - add a border to the div of the box where the explanation is in??
