let form = document.querySelector(".js-form");
let nameField = document.querySelector("[name=word]");
let resultSection = document.querySelector(".js-result-container");

function getApiUrl(word) {
    return `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
}

function renderDefinitions (definitions) {
    let html = "";
    for (let def of definitions){
        html += `
            <li>
                ${def.definition} (e.g. ${def.example})
            </li>
        `;
    }

    return html;
}

function renderMeaning (meaning) {
    let html = `
        <p>${meaning.partOfSpeech}</p>
        <ol>${renderDefinitions(meaning.definitions)}</ol>
    `;

    return html;
}

function renderWord(word) {
    let html = `<h2>${word.word} ${word.phonetic}</h2>`;
    for (let meaning of word.meanings) {
        html += renderMeaning(meaning);
    }

    return html;
}

function renderResponse(wordDefinitions) {
    let html = "";

    if (Array.isArray(wordDefinitions) && wordDefinitions.length > 0){
        let definitions = wordDefinitions[0];
        html = renderWord(definitions);
    } else {
        html = `<div class="error">The requested word does not exist.</div>`;
    }

    resultSection.innerHTML= html;

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