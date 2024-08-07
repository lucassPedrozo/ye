function obterYe() {
    console.log('obterYe chamada'); // Para depuração

    const url = 'https://api.kanye.rest/';
    const params = new URLSearchParams({});
    const headers = {};

    fetch(`${url}?${params.toString()}`, { headers: headers })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Citação recebida:', data.quote); // Para depuração
            const checkbox = document.getElementById('toggle-button');
            if (checkbox.checked) {
                console.log('Checkbox marcado. Chamando fetchTranslationPT');
                fetchTranslationPT(data.quote);
            } else {
                console.log('Checkbox não marcado. Chamando fetchTranslationEN');
                fetchTranslationEN(data.quote);
            }
        })
        .catch(error => {
            console.error('Erro na solicitação:', error);
        });
}

async function fetchTranslationPT(text) {
    console.log('fetchTranslationPT chamada'); // Para depuração
    try {
        const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|pt`);
        const data = await res.json();
        document.getElementById('citacao').textContent = "''" + data.responseData.translatedText + "''";
    } catch (error) {
        console.error('Erro na solicitação:', error);
    }
}

async function fetchTranslationEN(text) {
    console.log('fetchTranslationEN chamada'); // Para depuração
    try {
        const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=pt|en`);
        const data = await res.json();
        document.getElementById('citacao').textContent = "''" + data.responseData.translatedText + "''";
    } catch (error) {
        console.error('Erro na solicitação:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded'); // Para depuração
    const checkbox = document.getElementById('toggle-button');
    const button = document.getElementById('button');

    button.addEventListener('click', function() {
        console.log('Botão clicado'); // Para depuração
        obterYe();
    });
});
