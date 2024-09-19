document.getElementById('presenca-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const nomeAluno = document.getElementById('nomeAluno').value;
    const resumoAula = document.getElementById('resumoAula').value;
    const photoInput = document.getElementById('fotoAula');
    const fotoAula = await convertImageToBase64(photoInput.files[0]);

    navigator.geolocation.getCurrentPosition(async (position) => {
        const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        };

        try {
            const response = await fetch('http://127.0.0.1:3000/api/presenca', { // Certifique-se de que a rota da API está correta
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({nomeAluno, resumoAula, fotoAula, location })
            });

            if (response.ok) {
                document.getElementById('presenca-form').reset();
                fetchPresenca();
            } else {
                console.error('Erro ao registrar presença:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao conectar com a API:', error);
        }
    });
});

async function convertImageToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

async function fetchPresenca() {
    try {
        const response = await fetch('http://127.0.0.1:3000/api/presenca'); // Certifique-se de que a rota da API está correta
        if (!response.ok) {
            throw new Error('Erro ao buscar presenças');
        }
        const presenca = await response.json();
        const list = document.getElementById('presenca-list');
        list.innerHTML = '';
        presenca.forEach(p => {
            const item = document.createElement('div');
            item.innerHTML = `
                <h3>Nome: ${p.nomeAluno}</h3>
                <p> Resumo: ${p.resumoAula}</p>
                <img src="${p.fotoAula}" alt="${p.nomeAluno}" style="max-width: 100%; height: auto;">
            `;
            list.appendChild(item);
        });
    } catch (error) {
        console.error('Erro ao carregar presenças:', error);
    }
}

fetchPresenca();