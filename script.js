let input = document.querySelector("#searchInput");
let infoText = document.querySelector(".info-text");
let meaningContainer = document.querySelector(".meaning-container");
let title = document.querySelector(".title");
let meaning = document.querySelector(".meaning");
let audioEl = document.querySelector("#audio");

async function fetchAPI(word) {
  try {
    infoText.style.display = "block";
    meaningContainer.style.display = "none";

    infoText.innerText = `Searching the meaning of "${word}"`;

    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(url).then((res) => res.json());
    
    if(result.title) {
      meaningContainer.style.display = "block";
      infoText.style.display = "none";
      title.innerText = word;
      meaning.innerText = "N/A";
      audioEl.style.display = "none"
    }
    else {
      infoText.style.display = "none";
      meaningContainer.style.display = "block";
      audioEl.style.display = "inline-flex";
      title.innerText = result[0].word;
      meaning.innerText = result[0].meanings[0].definitions[0].definition;
      audioEl.src = result[0].phonetics[0].audio;
    }

    
  } catch (error) {
    infoText.innerText = "An error happened try again"; 
  }
}

input.addEventListener("keyup" ,(e) => {
  if(e.target.value && e.key === "Enter") {
    fetchAPI(e.target.value);
  }
})