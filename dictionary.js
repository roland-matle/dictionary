let form = document.querySelector(".js-form");
let nameField = document.querySelector("[name=word]");
let resultSection = document.querySelector(".js-result-container");

function getApiUrl(word) {
    return `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
}

function renderResponse(wordDefinitions) {
    console.log(wordDefinitions);

    resultSection.innerHTML= `
        <pre>
            <code>
                ${JSON.stringify(wordDefinitions)}
            </code>
        </Spre>
    `;
}

function eseményKezelő(eseményObjektum) {
    eseményObjektum.preventDefault();
    let word = nameField.value.trim();

    console.log("Beírt érték: ", word);

    nameField.value = "";

    fetch(getApiUrl(word))
        .then(response => response.json())
        .then(renderResponse);
}

form.addEventListener("submit", eseményKezelő);