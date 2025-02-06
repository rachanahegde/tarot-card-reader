// Insert the 78 card backs dynamically (making sure that they overlap)
// Card should shine and pop up from screen when user hovers over them

document.addEventListener("DOMContentLoaded", () => {
  const cardContainer = document.querySelector(".card-container");

  for (let i = 0; i < 78; i++) {
    const card = document.createElement("img");
    card.src = "../assets/cards/tarot_card_back.png";
    card.alt = "Tarot Card Back";
    card.className =
      "w-[80px] -ml-8 transition-transform duration-100 hover:scale-110 hover:z-10 hover:shadow-[0px_0px_5px_4px_rgba(191,145,255,0.8)] cursor-pointer";

    cardContainer.appendChild(card);
  }
});
