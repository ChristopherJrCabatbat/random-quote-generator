const quotes = [
  {
    content:
      "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
  },
  {
    content: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
  },
  {
    content: "Your time is limited, don't waste it living someone else's life.",
    author: "Steve Jobs",
  },
  {
    content:
      "If life were predictable it would cease to be life, and be without flavor.",
    author: "Eleanor Roosevelt",
  },
  {
    content: "If you look at what you have in life, you'll always have more.",
    author: "Oprah Winfrey",
  },
  {
    content:
      "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
    author: "James Cameron",
  },
  {
    content: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
  },
];

const colors = [
  "custom-bg-dark-blue",
  "custom-bg-dark-green",
  "custom-bg-dark-red",
  "custom-bg-dark-brown",
  "custom-bg-dark-gray",
  "custom-bg-dark-purple",
  "custom-bg-dark-teal",
  "custom-bg-dark-maroon",
];

document
  .getElementById("quote-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let numberOfQuotes = parseInt(
      document.getElementById("number_quotes").value
    );

    if (isNaN(numberOfQuotes) || numberOfQuotes < 1 || numberOfQuotes > 5) {
      alert("Please enter a number between 1 and 5.");
      return;
    }

    const quoteContainer = document.getElementById("quote-container");

    // Clear previous quotes
    quoteContainer.innerHTML = "";

    if (numberOfQuotes > quotes.length) {
      alert("Cannot generate more quotes than available.");
      return;
    }

    // Create an array of indices and shuffle it
    let availableIndices = Array.from({ length: quotes.length }, (_, i) => i);
    shuffleArray(availableIndices);

    // Select unique quotes based on shuffled indices
    for (let i = 0; i < numberOfQuotes; i++) {
      const index = availableIndices[i];
      const quote = quotes[index];

      // Create card for each quote with a different color
      const quoteCard = document.createElement("div");
      const colorClass = colors[i % colors.length]; // Cycle through colors
      quoteCard.className = `card mb-3 text-white ${colorClass} animate__animated animate__fadeInUp`;
      quoteCard.style.animationDelay = `${i * 0.1}s`; // Stagger the animations

      const cardBody = document.createElement("div");
      cardBody.className = "card-body";

      const quoteText = document.createElement("p");
      quoteText.className = "card-text";
      quoteText.textContent = `"${quote.content}"`;

      const quoteAuthor = document.createElement("h5");
      quoteAuthor.className = "card-title text-end";
      quoteAuthor.textContent = `- ${quote.author}`;

      cardBody.appendChild(quoteText);
      cardBody.appendChild(quoteAuthor);
      quoteCard.appendChild(cardBody);
      quoteContainer.appendChild(quoteCard);
    }
  });

// Function to shuffle an array (Fisher-Yates shuffle algorithm)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}