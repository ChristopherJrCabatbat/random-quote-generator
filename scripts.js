const quotes = {
  Random: [
    {
      content: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
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
      content: "If life were predictable it would cease to be life, and be without flavor.",
      author: "Eleanor Roosevelt",
    },
    {
      content: "If you look at what you have in life, you'll always have more.",
      author: "Oprah Winfrey",
    },
    {
      content: "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
      author: "James Cameron",
    },
    {
      content: "Life is what happens when you're busy making other plans.",
      author: "John Lennon",
    }
  ],
  Love: [
    {
      content: "Love is composed of a single soul inhabiting two bodies.",
      author: "Aristotle",
    },
    {
      content: "The best thing to hold onto in life is each other.",
      author: "Audrey Hepburn",
    },
    // Add more love quotes here
  ],
  Motivational: [
    {
      content: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
    },
    {
      content: "The purpose of our lives is to be happy.",
      author: "Dalai Lama",
    },
    // Add more motivational quotes here
  ],
  Life: [
    {
      content: "Life is what happens when you're busy making other plans.",
      author: "John Lennon",
    },
    {
      content: "Get busy living or get busy dying.",
      author: "Stephen King",
    },
    // Add more life quotes here
  ],
  Success: [
    {
      content: "Success is not the key to happiness. Happiness is the key to success.",
      author: "Albert Schweitzer",
    },
    {
      content: "The way to get started is to quit talking and begin doing.",
      author: "Walt Disney",
    },
    // Add more success quotes here
  ],
};

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


document.getElementById("quote-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const numberOfQuotes = parseInt(document.getElementById("number_quotes").value);
  const selectedType = document.getElementById("type_quotes").value;

  if (isNaN(numberOfQuotes) || numberOfQuotes < 1 || numberOfQuotes > 5) {
    alert("Please enter a number between 1 and 5.");
    return;
  }

  const quoteContainer = document.getElementById("quote-container");

  // Clear previous quotes
  quoteContainer.innerHTML = "";

  const selectedQuotes = quotes[selectedType] || quotes.Random;

  if (numberOfQuotes > selectedQuotes.length) {
    alert("Cannot generate more quotes than available.");
    return;
  }

  // Shuffle the selected quotes
  let shuffledQuotes = selectedQuotes.slice();
  shuffleArray(shuffledQuotes);

  // Shuffle the colors
  let shuffledColors = colors.slice();
  shuffleArray(shuffledColors);

  // Select unique quotes and assign random colors
  for (let i = 0; i < numberOfQuotes; i++) {
    const quote = shuffledQuotes[i];
    const colorClass = shuffledColors[i % shuffledColors.length];
  
    // Create card for each quote with a different color
    const quoteCard = document.createElement("div");
    quoteCard.className = `card mb-3 text-white ${colorClass} animate__animated animate__fadeInUp position-relative`;
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
  
    // Add buttons for share, copy, and download inside the card
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";
  
    const shareButton = document.createElement("button");
    shareButton.className = "btn btn-light btn-icon me-2";
    shareButton.innerHTML = '<i class="fas fa-share"></i>';
    shareButton.title = "Share"; // Add tooltip text
    shareButton.onclick = () => shareQuote(quoteCard);
  
    const copyButton = document.createElement("button");
    copyButton.className = "btn btn-light btn-icon me-2";
    copyButton.innerHTML = '<i class="fas fa-copy"></i>';
    copyButton.title = "Copy"; // Add tooltip text
    copyButton.onclick = () => copyQuote(quote);
  
    const downloadButton = document.createElement("button");
    downloadButton.className = "btn btn-light btn-icon";
    downloadButton.innerHTML = '<i class="fas fa-download"></i>';
    downloadButton.title = "Download"; // Add tooltip text
    downloadButton.onclick = () => downloadQuote(quoteCard);
  
    buttonContainer.appendChild(shareButton);
    buttonContainer.appendChild(copyButton);
    buttonContainer.appendChild(downloadButton);
    cardBody.appendChild(buttonContainer);
    
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

// Function to copy the quote text
function copyQuote(quote) {
  const text = `"${quote.content}" - ${quote.author}`;
  navigator.clipboard.writeText(text).then(() => {
    alert("Quote copied to clipboard!");
  });
}

// Function to share the quote by converting it to an image
function shareQuote(element) {
  html2canvas(element).then(canvas => {
    canvas.toBlob(blob => {
      const file = new File([blob], "quote.png", { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share({
          files: [file],
          title: "Quote",
          text: "Check out this quote!",
        });
      } else {
        alert("Sharing is not supported in this browser.");
      }
    });
  });
}

// Function to download the quote as an image
function downloadQuote(element) {
  html2canvas(element).then(canvas => {
    const link = document.createElement("a");
    link.download = "quote.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}



document.getElementById('night-mode-toggle').addEventListener('click', () => {
  const body = document.body;
  const navbar = document.querySelector('.navbar');
  const themeIcon = document.getElementById('theme-icon');
  const themeText = document.getElementById('theme-text');

  body.classList.toggle('night-mode');
  navbar.classList.toggle('night-mode');

  // Toggle input and select fields to match the night mode
  document.querySelectorAll('input, select').forEach(element => {
    element.classList.toggle('night-mode');
  });

  // Toggle button styles for night mode
  document.querySelectorAll('.btn-outline-light').forEach(button => {
    button.classList.toggle('night-mode');
  });

  // Update the icon and text based on the current theme
  if (body.classList.contains('night-mode')) {
    themeIcon.classList.replace('fa-sun', 'fa-moon');
    themeText.textContent = 'Night Mode';
  } else {
    themeIcon.classList.replace('fa-moon', 'fa-sun');
    themeText.textContent = 'Light Mode';
  }
});
