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

document
  .getElementById("quote-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const numberOfQuotes = document.getElementById("number_quotes").value;
    const quoteContainer = document.getElementById("quote-container");

    // Clear previous quotes
    quoteContainer.innerHTML = "";

    for (let i = 0; i < numberOfQuotes; i++) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const quote = quotes[randomIndex];
      const quoteElement = document.createElement("p");
      quoteElement.textContent = `"${quote.content}" - ${quote.author}`;
      quoteContainer.appendChild(quoteElement);
    }
  });
