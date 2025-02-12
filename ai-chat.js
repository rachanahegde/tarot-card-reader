// TODO Store API key securely

function addAIChatPrompt() {
  // Check if the prompt already exists to avoid duplicates
  if (document.querySelector("#ai-chat-prompt")) return;

  const aiPromptContainer = document.createElement("div");
  aiPromptContainer.id = "ai-chat-prompt";
  aiPromptContainer.className =
    "bg-gold text-black p-4 mt-4 mb-10 rounded-lg flex items-center justify-between max-w-[500px] mx-auto shadow-md";

  aiPromptContainer.innerHTML = `
    <p class="font-poppins text-md font-semibold">Want to ask about your reading?</p>
    <img src="../assets/icons/chat-icon.png" alt="Chat Icon" class="w-8 h-8 ml-4 hover:scale-110 transition-transform cursor-pointer">
  `;

  // Append to the end of the main container
  const mainContainer = document.querySelector(".main-container");
  mainContainer.appendChild(aiPromptContainer);

  // Event listener to open the AI chat when clicking the icon
  const chatIcon = aiPromptContainer.querySelector("img");
  chatIcon.addEventListener("click", () => {
    openAIChat();
  });
}

// TODO position gold container to the right and restyle  

/*
function openAIChat() {
  // Prevent multiple chat windows
  if (document.querySelector("#ai-chat-container")) return;

  const chatContainer = document.createElement("div");
  chatContainer.id = "ai-chat-container";
  chatContainer.className =
    "max-w-md mx-auto bg-black border border-gold p-4 rounded-lg mt-4 shadow-lg";

  chatContainer.innerHTML = `
    <h2 class="text-gold font-playfair text-2xl font-bold mb-2">Ask the AI</h2>
    <input type="text" id="chat-input" class="w-full p-2 border border-gray-400 rounded-md mb-2 text-black" placeholder="Ask about your reading...">
    <button id="send-message" class="bg-mint-green text-black font-bold py-2 px-4 rounded-md hover:scale-105 transition-transform w-full">Ask</button>
    <div id="chat-output" class="mt-4 text-white max-h-40 overflow-y-auto"></div>
  `;

  document.querySelector(".main-container").appendChild(chatContainer);

  const sendMessageButton = chatContainer.querySelector("#send-message");
  const chatInput = chatContainer.querySelector("#chat-input");
  const chatOutput = chatContainer.querySelector("#chat-output");

  sendMessageButton.addEventListener("click", () => {
    const userMessage = chatInput.value.trim();
    if (userMessage) {
      chatOutput.innerHTML += `<p class="font-poppins text-mint-green"><strong>You:</strong> ${userMessage}</p>`;

      // Simulated AI response
      setTimeout(() => {
        const aiResponse = `The tarot cards suggest that "${userMessage}" may hold deeper meaning. Trust your intuition.`;
        chatOutput.innerHTML += `<p class="font-poppins text-gold"><strong>AI:</strong> ${aiResponse}</p>`;
        chatOutput.scrollTop = chatOutput.scrollHeight;
      }, 1000);

      chatInput.value = ""; // Clear input field
    }
  });
}
*/

// TODO Add the "want to ask about your reading" prompt in a div with a gold background after the tarot reading explanation container is displayed on screen
// TODO Add the AI chat icon after the tarot reading explanation container is displayed on screen

// TODO When user clicks on chat icon, the chat opens (and they can click on it again to close it). There is the basic question,suggested questions for user, and the text input box.

// TODO add the following: the AI chat icon, the send icon, and the exit chat icon
// TODO make sure the chat box (div?) can scroll so the user can scroll up an down to view old and new messages
// TODO process user inputs and prompt the AI w/ API, generate AI response using API, display the AI response => repeat in a loop as long as user enters new questions => tell user that their quota of free questions is up after they ask 10 questions in a day
