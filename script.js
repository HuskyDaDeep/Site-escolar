const database = {
    alunos: [],
    professores: [],
    disciplinas: [],
    turmas: []
};

function toggleForm(formId) {
    const forms = ['alunoForm', 'professorForm', 'disciplinaForm', 'turmaForm'];
    forms.forEach(id => {
        document.getElementById(id).style.display = id === formId ? 'block' : 'none';
    });
}

function cadastrar(tipo) {
    let nome;
    if (tipo === 'aluno') {
        nome = document.getElementById('alunoNome').value;
        const turma = document.getElementById('alunoTurma').value;
        database.alunos.push({ nome, turma });
        alert(`Aluno ${nome} cadastrado com sucesso na turma ${turma}`);
    } else if (tipo === 'professor') {
        nome = document.getElementById('professorNome').value;
        database.professores.push({ nome });
        alert(`Professor ${nome} cadastrado com sucesso`);
    } else if (tipo === 'disciplina') {
        nome = document.getElementById('disciplinaNome').value;
        database.disciplinas.push({ nome });
        alert(`Disciplina ${nome} cadastrada com sucesso`);
    } else if (tipo === 'turma') {
        nome = document.getElementById('turmaNome').value;
        database.turmas.push({ nome });
        alert(`Turma ${nome} cadastrada com sucesso`);
    }
    clearForms();
}

function clearForms() {
    document.getElementById('alunoNome').value = '';
    document.getElementById('alunoTurma').value = '';
    document.getElementById('professorNome').value = '';
    document.getElementById('disciplinaNome').value = '';
    document.getElementById('turmaNome').value = '';
}

function consultar(tipo) {
    let resultado = '';
    if (tipo === undefined) {
        resultado += '<h4>Turmas e Alunos</h4>';
        database.turmas.forEach(turma => {
            resultado += `<strong>Turma:</strong> ${turma.nome} <br>`;
            const alunosDaTurma = database.alunos.filter(aluno => aluno.turma === turma.nome);
            resultado += `Alunos: ${alunosDaTurma.map(a => a.nome).join(', ') || 'Nenhum aluno cadastrado'} <br><br>`;
        });
    } else if (tipo === 'alunos') {
        resultado += '<h4>Lista de Alunos</h4>';
        resultado += database.alunos.map(a => a.nome).join(', ') || 'Nenhum aluno cadastrado';
    } else if (tipo === 'professores') {
        resultado += '<h4>Lista de Professores</h4>';
        resultado += database.professores.map(p => p.nome).join(', ') || 'Nenhum professor cadastrado';
    } else if (tipo === 'disciplinas') {
        resultado += '<h4>Lista de Disciplinas</h4>';
        resultado += database.disciplinas.map(d => d.nome).join(', ') || 'Nenhuma disciplina cadastrada';
    }
    document.getElementById('resultado').innerHTML = resultado;
}
function validarDataNascimento() {
    let inputData = document.getElementById('data_nascimento');
    let dataSelecionada = new Date(inputData.value);
    let hoje = new Date();
    let idadeMinima = 18;
    let dataLimite = new Date(hoje.getFullYear() - idadeMinima, hoje.getMonth(), hoje.getDate());
    
    if (dataSelecionada > dataLimite) {
        inputData.setCustomValidity('O professor deve ter pelo menos 18 anos de idade.');
    } else {
        inputData.setCustomValidity('');
    }
}


function validarCPF() {
    let cpf = document.getElementById('cpf').value.replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        document.getElementById('cpf').setCustomValidity('CPF inválido.');
        return;
    }
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf[i - 1]) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[9])) {
        document.getElementById('cpf').setCustomValidity('CPF inválido.');
        return;
    }
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf[i - 1]) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[10])) {
        document.getElementById('cpf').setCustomValidity('CPF inválido.');
        return;
    }
    document.getElementById('cpf').setCustomValidity('');
}

function validarTelefone() {
    let telefone = document.getElementById('telefone').value.replace(/\D/g, '');
    if (telefone.length !== 11) {
        document.getElementById('telefone').setCustomValidity('O telefone deve conter 11 números.');
    } else {
        document.getElementById('telefone').setCustomValidity('');
    }
}

function carregarDisciplinas() {
    const select = document.getElementById('disciplina');
    const disciplinas = ["MAT", "PORT", "HIST", "GEOG", "FIS", "QUI", "BIO", "EDFIS", "ART", "ING"];
    disciplinas.forEach(disc => {
        const option = document.createElement('option');
        option.value = disc;
        option.textContent = disc;
        select.appendChild(option);
    });
}
document.querySelector('.menu-toggle').addEventListener('click', function () {
    const menu = document.querySelector('.navbar-nav');
    menu.classList.toggle('show');
});
    document.querySelector('.navbar-collapse').addEventListener('click', function () {
        this.classList.remove('show');
    });