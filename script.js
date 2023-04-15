const chatDiv = document.querySelector('#chat');
const inputMsg = document.querySelector('#inputMsg');
const enviarMsg = document.querySelector('#enviarMsg');

enviarMsg.addEventListener('click', () => {
    if (!inputMsg.value.length) return;

    console.log(`sending msg '${inputMsg.value}' to the server`);

    socket.send(inputMsg.value);
    inputMsg.value = '';
});

function inserirMsgNaTela(data) {
    const p = document.createElement('p');

    const dateObj = new Date(data.date);

    p.innerText = `[${dateObj.toLocaleTimeString()}] ${data.user}: ${data.msg}`;
    chatDiv.append(p);
}