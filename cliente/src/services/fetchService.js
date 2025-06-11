const endpoint = "http://localhost:5174/motivo_visita";

function showMessage(mensagem, tipo="success"){
    const alert = document.getElementById("alert-message");
    alert.innerHTML = `<div class="alert alert-${tipo} sm" role="alert">Mensagem: ${mensagem}</div>`
    setInterval(() => {
        alert.innerHTML = "";
    }, 5000);
}

function pegandoDados(){
    const cod = document.getElementById("codIdentify").value;
    const nome_visita = document.getElementById("nomeIdentify").value;
    const paciente = document.getElementById("pacienteIdentify").value;
    const endereco = document.getElementById("enderecoIdentify").value;
    const motivo = document.getElementById("motivoIdentify").value;

    return {
        "cod": cod,
        "nome_visita": nome_visita,
        "paciente": paciente,
        "endereco": endereco,
        "motivo": motivo
    }
}

function exibindoTabela(Key = ""){
    fetch(`${endpoint}/${Key}`, {
        method: "GET"
    }).then((resposta) => {
        return resposta.json();
    }).then((dataResponse) => {
        if (dataResponse.status){
            const items = dataResponse.clientes;
            const divTable = document.getElementById("get-tab");
            divTable.innerHTML = "";
            if (items.length > 0){
                const header = document.createElement("tr");
                header.classList.add("spaceRow");
                header.innerHTML = `
                    <th class="spaceCol">Código</th>
                    <th class="spaceCol">Visita</th>
                    <th class="spaceCol">Paciente</th>
                    <th class="spaceCol">endereço</th>
                    <th class="spaceMotivo">Motivo</th>
                    <th class="spaceCol">Ações</th>
                `
                const card = document.createElement("tbody");
                card.classList.add("tabScrollDesc");
                card.appendChild(header)

                for (let i = 0; i < items.length; i++){
                    const row = document.createElement("tr");
                    row.classList.add("spaceRow");
                    row.innerHTML = `
                        <td class="spaceCol">${items[i].cod}</td>
                        <td class="spaceCol">${items[i].nome_visita}</td>
                        <td class="spaceCol">${items[i].paciente}</td>
                        <td class="spaceCol">${items[i].endereco}</td>
                        <td class="spaceMotivo">${items[i].motivo}</td>
                    `

                    const col = document.createElement("td");
                    col.classList.add("spaceCol");
                    const btnDel = document.createElement('BUTTON');
                    const labelDel = document.createTextNode("Excluir");    
                    btnDel.appendChild(labelDel);
                    btnDel.classList.add("btn","btn-danger","btn-sm","btnTable");
                    btnDel.onclick = function()
                    {   
                        const delAlert = document.getElementById("deleteMessage");
                        const blockForm = document.getElementById("block");
                        blockForm.style.pointerEvents = "none";
                        blockForm.style.opacity = 0.5;
                        delAlert.style.display = "flex";
                        btnPegarDados(
                            items[i].cod,
                            items[i].nome_visita,
                            items[i].paciente,
                            items[i].endereco,
                            items[i].motivo,'excluir'
                        )
                    }
                    col.appendChild(btnDel);
                    const btnUp = document.createElement('BUTTON');
                    const labelUp = document.createTextNode("Atualizar");        
                    btnUp.appendChild(labelUp);
                    btnUp.classList.add("btn","btn-warning","btn-sm","btnBox");
                    btnUp.onclick = function()
                    {
                        btnPegarDados(
                            items[i].cod,
                            items[i].nome_visita,
                            items[i].paciente,
                            items[i].endereco,
                            items[i].motivo,'atualizar'
                        )
                    }
                    col.appendChild(btnUp);
                    row.appendChild(col);
                    card.appendChild(row);
                }
                divTable.appendChild(card);
            }
            else{
                showMessage("Não há motivo", "warning");
            }
        }
        else{
            showMessage(dataResponse.mensagem, "danger");
        }

    }).catch((erro) => {
        showMessage(erro, "warning");
    })
}

function registrando(){
    const dadosEnviados = pegandoDados();
    fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosEnviados)
    }).then((resposta) => {
        return resposta.json();
    }).then((dadosRecebidos) => {
        if (dadosRecebidos.status){
            showMessage(dadosRecebidos.mensagem, "success");
            exibindoTabela()
        }
        else{
            showMessage(dadosRecebidos.mensagem, "danger");
        }

    }).catch((erro) => {
        showMessage(erro, "warning");
    });
}

function excluindo(){
    fetch(endpoint, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            cod: document.getElementById("codIdentify").value
        })
    }).then((resposta) => {
        return resposta.json();
    }).then((dadosRecebidos) => {
        if (dadosRecebidos.status){
            showMessage(dadosRecebidos.mensagem, "success");
            exibindoTabela()
        }
        else{
            showMessage(dadosRecebidos.mensagem, "danger");
        }

    }).catch((erro) => {
        showMessage(erro, "warning");
    });
}

function atualizando(){
    const dadosEnviados = pegandoDados();
    fetch(endpoint, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(dadosEnviados)
    }).then((resposta) => {
        return resposta.json();
    }).then((dadosRecebidos) => {
        if (dadosRecebidos.status){
            showMessage(dadosRecebidos.mensagem, "success");
            exibindoTabela()
        }
        else{
            showMessage(dadosRecebidos.mensagem, "danger");
        }

    }).catch((erro) => {
        showMessage(erro, "warning");
    });
}

function btnPegarDados(cod, nome_visita, paciente, endereco, motivo, msg = "atualizar"){
    document.getElementById("codIdentify").value = cod;
    document.getElementById("nomeIdentify").value = nome_visita;
    document.getElementById("pacienteIdentify").value = paciente;
    document.getElementById("enderecoIdentify").value = endereco;
    document.getElementById("motivoIdentify").value = motivo;

    if (msg === "atualizar"){
        document.getElementById("atualizar").disabled = false;
        document.getElementById("registrar").disabled = true;
    }

}

function resetForm(){
    document.getElementById("atualizar").disabled = true;
    document.getElementById("registrar").disabled = false;
    document.getElementById("codIdentify").value = "";
    document.getElementById("nomeIdentify").value = "";
    document.getElementById("pacienteIdentify").value = "";
    document.getElementById("enderecoIdentify").value = "";
    document.getElementById("motivoIdentify").value = "";
    const control = document.getElementById("codControl");
    const delAlert = document.getElementById("deleteMessage");
    const blockForm = document.getElementById("block");
    blockForm.style.pointerEvents = "auto";
    blockForm.style.opacity = 1;
    control.style.display = "none";
    delAlert.style.display = "none";
}

const fetchService = {
    registrando,
    atualizando,
    excluindo,
    exibindoTabela,
    resetForm
}
exibindoTabela();

export default fetchService;