// Insert the 78 card backs dynamically (making sure that they overlap)
// Card should shine and pop up from screen when user hovers over them

document.addEventListener("DOMContentLoaded", async () => {
  const mainContainer = document.querySelector(".main-container");
  const cardContainer = document.querySelector(".card-container");

  // Create div for displaying selected cards
  const selectedCardsContainer = document.createElement("div");
  selectedCardsContainer.className = "flex justify-center mt-10 space-x-10";
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
      const cardIndex = selectedCards.length; // Get the cardIndex in order to assign the correct past/present/future label
      selectedCards.push(cardData);

      // Flip the card
      cardElement.classList.add("flipped");

      // Add sparkle effect
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle";
      cardElement.appendChild(sparkle);

      // Display the selected card at the top after flip animation
      setTimeout(() => {
        const cardWrapper = document.createElement("div");
        cardWrapper.className = "flex flex-col items-center space-y-2";

        // Card Name (Above the card)
        const cardName = document.createElement("p");
        cardName.textContent = cardData.name;
        cardName.className = "font-playfair text-[28px] font-bold text-gold";

        // Selected Card Image
        const selectedCard = document.createElement("img");
        selectedCard.src = cardData.filePath;
        selectedCard.alt = cardData.name;
        selectedCard.className =
          "w-[200px] transition-transform duration-300 hover:scale-105 shadow-lg rounded-lg shimmer";

        // Position Label (Below the card)
        const positionLabel = document.createElement("p");
        const positions = ["Past", "Present", "Future"];
        positionLabel.textContent = positions[cardIndex];
        positionLabel.className =
          "font-poppins text-[20px] font-semibold text-mint-green";

        // Append the card name, image, and position label
        cardWrapper.appendChild(cardName);
        cardWrapper.appendChild(selectedCard);
        cardWrapper.appendChild(positionLabel);
        selectedCardsContainer.appendChild(cardWrapper);

        // Remove the card from the grid
        cardElement.remove();
      }, 800); // Wait for the flip animation to finish

      // Disable further clicks after 3 cards are selected
      if (selectedCards.length === 3) {
        disableFurtherClicks();
      }
    }
  }

  // Function to display explanation when user clicks on card that they selected during the reading
  function displayExplanation(cardData) {
    let explanationContainer = document.querySelector("#explanation-container");

    if (!explanationContainer) {
      explanationContainer = document.createElement("div");
      explanationContainer.id = "explanation-container";
      explanationContainer.className =
        "border-2 border-gold p-4 mt-4 rounded-lg text-white max-w-md mx-auto";
      mainContainer.appendChild(explanationContainer);
    }

    explanationContainer.innerHTML = `
        <h2 class="font-playfair text-2xl text-gold font-bold mb-2">${cardData.name}</h2>
        <p class="font-poppins text-md">${cardData.interpretation}</p>
      `;
  }

  // Create the interpret cards button
  function addInterpretButton() {
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "flex justify-center mt-6";

    const interpretButton = document.createElement("button");
    interpretButton.id = "interpret-cards";
    interpretButton.textContent = "Interpret My Cards";
    interpretButton.className =
      "bg-mint-green text-black font-bold py-2 px-6 rounded-lg shadow-md hover:scale-105 transition-transform";

    buttonContainer.appendChild(interpretButton);
    mainContainer.appendChild(buttonContainer);

    // Add event listener to interpret the cards when clicked
    interpretButton.addEventListener("click", () => {
      displayExplanation(selectedCards[0]); // Show explanation for the first card
    });
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

      // Add "Interpret My Cards" button after cards are cleared
      addInterpretButton();
    }, 1000); // Delay by 1 second for smooth transition
  }

  // TODO Add event listener for "Interpret My Cards" button
  document.addEventListener("click", (e) => {
    if (e.target.id === "interpret-cards" && selectedCards.length === 3) {
      displayExplanation(selectedCards[0]); // Show explanation for the first card
    }
  });

  // TODO Event listeners for hover/click on cards
  selectedCardsContainer.addEventListener("mouseover", (e) => {
    if (e.target.tagName === "IMG") {
      const cardName = e.target.alt;
      const cardData = selectedCards.find((card) => card.name === cardName);
      displayExplanation(cardData);
    }
  });

  selectedCardsContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
      const cardName = e.target.alt;
      const cardData = selectedCards.find((card) => card.name === cardName);
      displayExplanation(cardData);
    }
  });
});
