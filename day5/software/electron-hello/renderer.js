const sendMessageButton = document.getElementById("send-message");
const sendShowversion = document.getElementById("show-version");


sendMessageButton.addEventListener("click", async () => {
    let str = await window.electronAPI.sendMessage("Salut");
    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    messageElement.innerHTML = `<span class="msg-name">${str}</span>`
    document.getElementById("message").appendChild(messageElement);
    
});

sendShowversion.addEventListener("click", async () => {
    let version = await window.electronAPI.getVersion()
    const versionElement = document.createElement('div');
    versionElement.className = 'version';
    versionElement.textContent = `Version: ${version}`;
    document.body.appendChild(versionElement)
})

