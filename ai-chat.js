// TODO Store API key securely


function addAIChatPrompt() {
  // Check if the prompt already exists to avoid duplicates
  if (document.querySelector("#prompt-icon-div")) return;

  // Create container for the prompt and the icon
  const promptIconDiv = document.createElement("div");
  promptIconDiv.id = "prompt-icon-div";
  promptIconDiv.className =
    "absolute right-4 bottom-10 flex flex-col items-center space-y-2";

  const aiPromptContainer = document.createElement("div");
  aiPromptContainer.id = "ai-chat-prompt";
  aiPromptContainer.className =
    "bg-gold text-black p-2 rounded-lg flex items-center  shadow-md";

  aiPromptContainer.innerHTML = `
    <p class="font-poppins text-md font-semibold">Want to ask about your reading?</p>  
    `;

  // Add the icon
  const aiPromptIcon = document.createElement("img");
  aiPromptIcon.src = "../assets/icons/chat-icon.png";
  aiPromptIcon.alt = "Chat Icon";
  aiPromptIcon.className =
    "w-[50px] ml-4 hover:scale-110 transition-transform cursor-pointer";

  // Append the prompt and icon to the container
  promptIconDiv.appendChild(aiPromptContainer);
  promptIconDiv.appendChild(aiPromptIcon);

  // Append to the end of the main container on the page
  const mainContainer = document.querySelector(".main-container");
  mainContainer.appendChild(promptIconDiv);

  // Event listeners to open the AI chat when clicking the icon
  aiPromptIcon.addEventListener("click", () => {
    openAIChat();
  });
}

function openAIChat() {
  // Prevent multiple chat windows
  if (document.querySelector("#ai-chat-container")) return;

  // TODO Hide the aiPromptContainer while the AI chat is open
  // TODO display aiPromptContainer while AIchat is closed

  // Create the chat container
  const chatContainer = document.createElement("div");
  chatContainer.id = "ai-chat-container";
  // Keep chat in a fixed position on right hand side of page
  chatContainer.className =
    "w-[350px] bg-light-purple border border-gold p-4 rounded-lg shadow-lg fixed top-20 right-4 flex flex-col items-center text-center";

  // Create the close chat button
  const closeChatButton = document.createElement("img");
  closeChatButton.src = "../assets/icons/exit-icon.png";
  closeChatButton.alt = "Exit Icon";
  closeChatButton.className =
    "w-[26px] hover:scale-110 transition-transform cursor-pointer absolute top-2 right-2";

  chatContainer.appendChild(closeChatButton);

  // Add event listener to close the chat window
  closeChatButton.addEventListener("click", () => {
    chatContainer.remove();
  });

  const chatHeader = document.createElement("h2");
  chatHeader.textContent = "Ask the Universe";
  chatHeader.className =
    "text-dark-purple font-playfair text-[24px] font-bold mb-4";

  // Create the default AI question with AI icon
  const questAndIcon = document.createElement("div");
  questAndIcon.className = "flex items-center space-x-2 mb-2";

  const aiIcon = document.createElement("img");
  aiIcon.src = "../assets/icons/ai-icon.png";
  aiIcon.alt = "AI Icon";
  aiIcon.className = "w-[40px]";

  const defaultQuestion = document.createElement("p");
  defaultQuestion.textContent =
    "Welcome!  The cards have been drawn, and destiny awaits. How may I guide you on your journey?";
  defaultQuestion.className = "font-poppins text-[16px] font-bold mb-2";

  // Display suggested questions to guide user
  const suggestedQuestions = [
    "What action should I take based on this reading?",
    "How does this reading apply to my love life?",
  ];

  const suggestedQDiv = document.createElement("div");
  suggestedQDiv.className =
    "flex flex-col items-center text-center mb-2 suggested-questions";

  const suggestedQHeader = document.createElement("h2");
  suggestedQHeader.textContent = "Suggested Questions";
  suggestedQHeader.className =
    "text-dark-purple font-poppins text-[16px] font-bold mb-4";
  suggestedQDiv.appendChild(suggestedQHeader);

  for (let i = 0; i < suggestedQuestions.length; i++) {
    const suggestedQuestion = document.createElement("p");
    suggestedQuestion.textContent = suggestedQuestions[i];
    suggestedQuestion.className =
      "font-poppins text-[14px] font-bold mb-2 border border-gold p-2 rounded-lg";
    suggestedQDiv.appendChild(suggestedQuestion);
  }

  // Add div to hold chat input and send button
  const chatInputDiv = document.createElement("div");
  chatInputDiv.className = "relative mb-2 w-[320px]";

  // Add the chat input box
  const chatInput = document.createElement("input");
  chatInput.type = "text";
  chatInput.placeholder = "Ask about your reading...";
  chatInput.className =
    "w-full p-2 border border-gold rounded-md mb-2 text-black";

  // TODO the chat input box has to grow as user types into it

  // Add the send button
  const sendButton = document.createElement("img");
  sendButton.src = "../assets/icons/arrow-icon.png";
  sendButton.className =
    "w-[24px] hover:scale-110 transition-transform cursor-pointer absolute right-2 top-2";

  chatInputDiv.appendChild(chatInput);
  chatInputDiv.appendChild(sendButton);

  // Add everything to the web page and set up the chat container UI
  document.querySelector(".main-container").appendChild(chatContainer);
  chatContainer.appendChild(chatHeader);
  questAndIcon.appendChild(aiIcon);
  questAndIcon.appendChild(defaultQuestion);
  chatContainer.appendChild(questAndIcon);
  chatContainer.appendChild(suggestedQDiv);
  chatContainer.appendChild(chatInputDiv);

  /*
  chatContainer.innerHTML = `
    <button id="send-message" class="bg-mint-green text-black font-bold py-2 px-4 rounded-md hover:scale-105 transition-transform w-full">Ask</button>
    <div id="chat-output" class="mt-4 text-white max-h-40 overflow-y-auto"></div>
  `;
  */

  // const sendMessageButton = chatContainer.querySelector("#send-message");
  // const chatInput = chatContainer.querySelector("#chat-input");
  // const chatOutput = chatContainer.querySelector("#chat-output");

  /*
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
  */
}

// TODO When user clicks on chat icon, the chat opens (and they can click on it again to close it). There is the basic question,suggested questions for user, and the text input box.

// TODO if user clicks on a suggested question, it will appear in the chat input box

// TODO add the following: the AI chat icon, the send icon, and the exit chat icon
// TODO make sure the chat box (div?) can scroll so the user can scroll up an down to view old and new messages
// TODO process user inputs and prompt the AI w/ API, generate AI response using API, display the AI response => repeat in a loop as long as user enters new questions => tell user that their quota of free questions is up after they ask 10 questions in a day
