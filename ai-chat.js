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

  // Select the AI prompt container and hide it
  const aiPromptContainer = document.querySelector("#prompt-icon-div");
  if (aiPromptContainer) {
    aiPromptContainer.style.display = "none";
  }

  // Create the chat container
  const chatContainer = document.createElement("div");
  chatContainer.id = "ai-chat-container";
  // Keep chat in a fixed position on right hand side of page
  chatContainer.className =
    "w-[350px] bg-light-purple border border-gold p-4 rounded-lg shadow-lg fixed top-80 right-4 flex flex-col items-center text-center";

  // Create the close chat button
  const closeChatButton = document.createElement("img");
  closeChatButton.src = "../assets/icons/exit-icon.png";
  closeChatButton.alt = "Exit Icon";
  closeChatButton.className =
    "w-[26px] hover:scale-110 transition-transform cursor-pointer absolute top-2 right-2";

  chatContainer.appendChild(closeChatButton);

  // Add event listener to close the chat window and show the aiPromptContainer again
  closeChatButton.addEventListener("click", () => {
    chatContainer.remove();
    if (aiPromptContainer) {
      aiPromptContainer.style.display = "flex"; // Restore the prompt asking user if they want to chat
    }
  });

  const chatHeader = document.createElement("h2");
  chatHeader.textContent = "Ask the Universe";
  chatHeader.className =
    "text-dark-purple font-playfair text-[24px] font-bold mb-4";

  // Create the default AI question with AI icon
  const questAndIcon = document.createElement("div");
  questAndIcon.className = "flex items-center space-x-2 mb-3";

  const aiIcon = document.createElement("img");
  aiIcon.src = "../assets/icons/ai-icon.png";
  aiIcon.alt = "AI Icon";
  aiIcon.className = "w-[40px]";

  const defaultQuestion = document.createElement("p");
  defaultQuestion.textContent =
    "Welcome!  The cards have been drawn, and destiny awaits. How may I guide you on your journey?";
  defaultQuestion.className =
    "font-poppins text-[16px] font-bold mb-2 bg-medium-purple border border-dark-purple p-2 rounded-lg";

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
  const chatInput = document.createElement("textarea");
  chatInput.id = "chat-input";
  chatInput.placeholder = "Ask about your reading...";
  chatInput.rows = 1; // Start with a single row
  chatInput.className =
    "w-full p-2 border border-gold rounded-md text-black resize-none overflow-y-auto max-h-[90px]";

  // Automatically resize textarea as user types
  chatInput.addEventListener("input", function () {
    this.style.height = "auto"; // Reset height
    this.style.height = Math.min(this.scrollHeight, 90) + "px"; // Expand but limit to 90px
  });

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
}

// TODO add a different color background to the messages that the user sends

// TODO when user click on send button, extract the user input.
// TODO send the message to the API and get the response

// TODO display the user message as the next message in the chat
// TODO display the response with the AI icon beside it

// TODO ---------- SAFE GUARDS FOR PREVENTING MISUSE OF AI
// TODO Limit user message length
// TODO AI response length limit - restrict to 100 words
// TODO Cooldown between messages	- 5 second delay per message
// TODO Content filtering - profanity and spam detection
// TODO prevent prompt injection with System message restrictions
// TODO error handling - Show friendly fallback responses
// TODO if user asks for non-tarot questions, respond with "I can only answer tarot questions!"
// TODO limit user message length to 5 per session and 10 total in one day
//

// TODO process user inputs and prompt the AI w/ API, generate AI response using API, display the AI response => repeat in a loop as long as user enters new questions
// TODO if user clicks on a suggested question, it will appear in the chat input box

// TODO make sure the chat box (div?) can scroll so the user can scroll up an down to view old and new messages
