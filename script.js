const chat = document.getElementById("chat");


// SISTEMA DE CONVERSACIONES
let conversations = JSON.parse(localStorage.getItem("conversations")) || [];


// MENSAJE BOT
function botMessage(text){
chat.innerHTML += '<div class="bot"><span class="avatar">🤖 BOOT:</span> ' + text + '</div>';
scroll();
saveChat();
}


// MENSAJE USUARIO
function userMessage(text){
chat.innerHTML += '<div class="user"><span class="avatar">👤 Tú:</span> ' + text + '</div>';
scroll();
saveChat();
}


function scroll(){
chat.scrollTop = chat.scrollHeight;
}


// EFECTO ESCRIBIENDO
function typing(){
chat.innerHTML += '<div class="bot" id="typing"><span class="avatar">🤖 BOOT:</span> escribiendo...</div>';
scroll();
}

function stopTyping(){
let t = document.getElementById("typing");
if(t) t.remove();
}


function sendMessage(){

let input = document.getElementById("userInput").value.trim().toLowerCase();

if(input === "") return;

userMessage(input);

let response = "";


// DETECTAR ERRORES DE ESCRITURA

if(input === "dr") input = "dir";
if(input === "copi") input = "copy";
if(input === "makdir") input = "mkdir";
if(input === "pimg") input = "ping";


// COMANDO EXPLICA

if(input.includes("explica dir")) input = "dir";
if(input.includes("explica cd")) input = "cd";
if(input.includes("explica cls")) input = "cls";
if(input.includes("explica mkdir")) input = "mkdir";
if(input.includes("explica rmdir")) input = "rmdir";
if(input.includes("explica del")) input = "del";
if(input.includes("explica copy")) input = "copy";
if(input.includes("explica ping")) input = "ping";


// RESPUESTAS

if(input === "dir" || input.includes("dir")){
response =
"<b>DIR</b><br><br>" +
"<b>Función:</b><br>" +
"Muestra los archivos y carpetas dentro de un directorio.<br><br>" +
"<b>Sintaxis:</b><br>" +
"dir [ruta]<br><br>" +
"<b>Ejemplo:</b><br>" +
"dir C:\\Usuarios";
}

else if(input === "cd" || input.includes(" cd")){
response =
"<b>CD</b><br><br>" +
"<b>Función:</b><br>" +
"Cambia de directorio.<br><br>" +
"<b>Sintaxis:</b><br>" +
"cd [ruta]<br><br>" +
"<b>Ejemplo:</b><br>" +
"cd Documentos";
}

else if(
input.includes("que es un comando") ||
input.includes("qué es un comando") ||
input.includes("definicion de comando") ||
input.includes("definición de comando") ||
input.includes("explica comando") ||
input.includes("que significa comando") ||
input.includes("para que sirve un comando")
){
response =
"<b>¿Qué es un comando?</b><br><br>" +
"Un comando es una instrucción que el usuario escribe para que el sistema operativo realice una acción.<br><br>" +
"Por ejemplo, un comando puede crear carpetas, copiar archivos o mostrar información del sistema.<br><br>" +
"<b>Ejemplos de comandos:</b><br>dir<br>cd<br>mkdir";
}

else if(
input === "hola" ||
input === "buenas" ||
input.includes("hola") ||
input.includes("buenas")
){
response =
"Hola, soy <b>BOOT</b>.<br><br>" +
"Puedo ayudarte a aprender comandos del sistema.<br><br>" +
"Escribe <b>ayuda</b> para ver los comandos disponibles.";
}

else if(input === "ayuda" || input.includes("comandos")){
response =
"<b>Comandos disponibles:</b><br><br>" +
"dir – ver archivos<br>" +
"cd – cambiar de carpeta<br>" +
"cls – limpiar pantalla<br>" +
"mkdir – crear carpeta<br>" +
"rmdir – eliminar carpeta<br>" +
"del – borrar archivo<br>" +
"copy – copiar archivo<br>" +
"ping – probar conexión";
}

else if(input === "cls" || input.includes("cls")){
response =
"<b>CLS</b><br><br>" +
"<b>Función:</b><br>" +
"Limpia la pantalla de la consola.<br><br>" +
"<b>Sintaxis:</b><br>" +
"cls<br><br>" +
"<b>Ejemplo:</b><br>" +
"cls";
}

else if(input === "mkdir" || input.includes("mkdir")){
response =
"<b>MKDIR</b><br><br>" +
"<b>Función:</b><br>" +
"Crea una nueva carpeta.<br><br>" +
"<b>Sintaxis:</b><br>" +
"mkdir nombre_carpeta<br><br>" +
"<b>Ejemplo:</b><br>" +
"mkdir Proyectos";
}

else if(input === "rmdir" || input.includes("rmdir")){
response =
"<b>RMDIR</b><br><br>" +
"<b>Función:</b><br>" +
"Elimina una carpeta vacía.<br><br>" +
"<b>Sintaxis:</b><br>" +
"rmdir nombre_carpeta<br><br>" +
"<b>Ejemplo:</b><br>" +
"rmdir CarpetaVieja";
}

else if(input === "del" || input.includes("del")){
response =
"<b>DEL</b><br><br>" +
"<b>Función:</b><br>" +
"Elimina archivos.<br><br>" +
"<b>Sintaxis:</b><br>" +
"del archivo<br><br>" +
"<b>Ejemplo:</b><br>" +
"del documento.txt";
}

else if(input === "copy" || input.includes("copy") || input.includes("copiar")){
response =
"<b>COPY</b><br><br>" +
"<b>Función:</b><br>" +
"Copia archivos de una ubicación a otra.<br><br>" +
"<b>Sintaxis:</b><br>" +
"copy origen destino<br><br>" +
"<b>Ejemplo:</b><br>" +
"copy archivo.txt D:\\Backup";
}

else if(input === "ping" || input.includes("ping")){
response =
"<b>PING</b><br><br>" +
"<b>Función:</b><br>" +
"Comprueba la conexión con otro equipo en la red.<br><br>" +
"<b>Sintaxis:</b><br>" +
"ping dominio<br><br>" +
"<b>Ejemplo:</b><br>" +
"ping google.com";
}

else{
response =
"No reconozco ese comando.<br><br>" +
"Puedes buscar más información usando:<br><br>" +
"<a href='https://copilot.microsoft.com' target='_blank'>Microsoft Copilot</a><br>" +
"<a href='https://chat.openai.com' target='_blank'>ChatGPT</a>";
}


// EFECTO ESCRIBIENDO

typing();

setTimeout(function(){
stopTyping();
botMessage(response);
},1000);

document.getElementById("userInput").value="";
}


// ENTER PARA ENVIAR
document.getElementById("userInput").addEventListener("keypress",function(e){
if(e.key === "Enter"){
sendMessage();
}
});


// BOTONES RAPIDOS
function quickCommand(cmd){
document.getElementById("userInput").value = cmd;
sendMessage();
}


// GUARDAR CHAT ACTUAL
function saveChat(){
localStorage.setItem("chatHistory", chat.innerHTML);
}


// CARGAR CHAT
function loadChat(){
let saved = localStorage.getItem("chatHistory");
if(saved){
chat.innerHTML = saved;
scroll();
}
}


// GUARDAR CONVERSACION EN HISTORIAL
function saveConversation(){

if(chat.innerHTML.trim() === "") return;

conversations.push(chat.innerHTML);

localStorage.setItem("conversations", JSON.stringify(conversations));

loadHistory();

}


// CARGAR HISTORIAL
function loadHistory(){

let historyDiv = document.getElementById("history");

if(!historyDiv) return;

historyDiv.innerHTML = "";

conversations.forEach((conv,index)=>{

let item = document.createElement("div");

item.textContent = "Chat " + (index+1);

item.style.cursor = "pointer";
item.style.marginBottom = "5px";

item.onclick = function(){
chat.innerHTML = conversations[index];
scroll();
};

historyDiv.appendChild(item);

});

}


// NUEVO CHAT
function newChat(){

if(chat.innerHTML.trim() !== ""){
saveConversation();
}

chat.innerHTML = "";

localStorage.removeItem("chatHistory");

}


// MODO OSCURO
function toggleDark(){
document.body.classList.toggle("dark");
}


// MENSAJE INICIAL
window.onload = function(){

loadChat();
loadHistory();

if(chat.innerHTML === ""){
botMessage(
"Hola. Soy <b>BOOT</b>, tu asistente virtual para aprender comandos básicos del sistema operativo.<br><br>" +
"Puedes escribir:<br>" +
"dir<br>cd<br>cls<br>mkdir<br>rmdir<br>del<br>copy<br>ping<br><br>" +
"O escribir:<br>¿qué es un comando?"
);
}

}