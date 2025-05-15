function validacaoFormulario() {

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const curso = document.getElementById('curso desejado').value;
    const cep = document.getElementById('cep').value.trim();
    const rua = document.getElementById('rua').value.trim();
    const bairro = document.getElementById('bairro').value.trim();
    const cidade = document.getElementById('cidade').value.trim();
    const estado = document.getElementById('estado').value.trim();
    let valid = true;

    function mostrarErro(id, mensagem) {
        const erro = document.getElementById(id + '-erro');
        erro.textContent = mensagem;
        erro.style.display = 'block';
        valid = false;

    }
    
    function limparErro(id) {
        const erro = document.getElementById(id + '-erro');
        erro.textContent = '';
        erro.style.display = 'none';        
    }

    if (!nome)mostrarErro('nome', 'Por favor, preencha o nome completo.');
    else limparErro('nome');

    const emailErro =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailErro.test(email)) mostrarErro('email', 'Informe o CPF corretamente.');

    if (!curso) mostrarErro('curso', 'Selecione um curso.');
    else limparErro('curso');

    if (!cep) mostrarErro('cep', 'Informe o CEP corretamente.');
    else limparErro('cep');

    if (!rua) mostrarErro('rua', 'Informe a rua.');
    else limparErro('rua');

    if (!bairro) mostrarErro('bairro', 'Informe o bairro.');
    else limparErro('bairro');

    if (!cidade) mostrarErro('cidade', 'Informe a ciade.');
    else limparErro ('cidade');

    if (!estado) mostrarErro('estado','Informe o estado.');
    else limparErro('estado');

    return valid;

}

    async function preencherendereco() {
        const cep = document.getElementById('cep').value;
        if (cep.lenght !== 8) return;
    
        try{
            const response = await fetch (`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            if (data.erro) throw new Error('CEP não encontrado');
    
            document.getElementById('rua').value = data.logradouro;
            document.getElementById('bairro').value = data.bairro;
            document.getElementById('cidade').value = data.localidade;
            document.getElementById('estado').value = data.uf;
        } catch (error) {
            alert('Erro ao buscar o CEP. Verifique o número e tente novamente.');
        }
    }

    document.getElementById('cep').addEventListener('blur', preencherEndereco);

    
function alternarModo() {
    document.body.classList.toggle('dark-mode');
    const icone = document.getElementById('icone-modo');
    if (document.body.classList.contains('dark-mode')) {
        icone.src = '/icons/sun.svg';
        icone.alt = 'Modo Claro';
    } else {
        icone.src = '/icons/moon.svg';
        icone.alt = 'Modo Escuro';
    }
}


document.getElementById('modo-escuro').addEventListener('click', alternarModo);


document.getElementById('formulario-matricula').addEventListener('submit',function(e) {
    if (!validacaoFormulario()) {
        e.preventDefault();
    }
});