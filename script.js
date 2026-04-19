// ================= KALKULATOR =================
const calc = document.getElementById("calcDisplay");

function appendCalc(val){
  calc.value += val;
}

function clearCalc(){
  calc.value = "";
}

function deleteCalc(){
  calc.value = calc.value.slice(0,-1);
}

function calculateCalc(){
  try{
    calc.value = eval(calc.value);
  }catch{
    calc.value = "Error";
  }
}

calc.addEventListener("keydown", e=>{
  if(e.key==="Enter") calculateCalc();
});


// ================= CHAT =================
function sendChat(){
  let input = document.getElementById("chatInput");
  let chatArea = document.getElementById("chatArea");

  let text = input.value.toLowerCase();

  chatArea.innerHTML += `<div class="user">${text}</div>`;

  let reply = processSmart(text);

  chatArea.innerHTML += `<div class="bot">${reply}</div>`;

  input.value = "";
  chatArea.scrollTop = chatArea.scrollHeight;
}


// ================= NLP PINTAR =================
function processSmart(text){

  text = text.toLowerCase();

  // IDENTITAS
  if(
    text.includes("siapa kamu") ||
    text.includes("kamu siapa") ||
    text.includes("siapa namamu") ||
    text.includes("namamu siapa")
  ){
    return "Saya Muammar AI 🤖";
  }

  // SAPAAN
  if(text.includes("halo") || text.includes("hai")){
    return "Halo juga 👋";
  }

  if(text.includes("apa kabar")){
    return "Saya baik 😊, kamu bagaimana?";
  }

  if(text.includes("terima kasih")){
    return "Sama-sama 😊";
  }

  // PENGETAHUAN
  if(text.includes("ibukota indonesia")){
    return "Ibukota Indonesia adalah Jakarta 🇮🇩";
  }

  if(text.includes("hari apa sekarang")){
    return "Hari ini adalah " + new Date().toLocaleDateString("id-ID",{weekday:'long'});
  }

  // ANGKA KATA
  const angkaKata = {
    "nol":0,"satu":1,"dua":2,"tiga":3,"empat":4,
    "lima":5,"enam":6,"tujuh":7,"delapan":8,"sembilan":9,
    "sepuluh":10
  };

  for(let key in angkaKata){
    text = text.replace(new RegExp(key,"g"), angkaKata[key]);
  }

  // HITUNG
  let angka = text.match(/\d+/g);

  if(angka){
    angka = angka.map(Number);

    if(text.includes("tambah") || text.includes("+")){
      return "Hasilnya adalah " + angka.reduce((a,b)=>a+b);
    }

    if(text.includes("kali") || text.includes("x")){
      return "Hasilnya adalah " + angka.reduce((a,b)=>a*b);
    }

    if(text.includes("bagi")){
      return "Hasilnya adalah " + (angka[0]/angka[1]);
    }

    if(text.includes("kurang")){
      return "Hasilnya adalah " + (angka[0]-angka[1]);
    }
  }

  // JAWABAN UMUM
  if(text.includes("apa itu")){
    return "Itu adalah sesuatu yang bisa dijelaskan lebih lanjut 😊";
  }

  if(text.includes("kenapa")){
    return "Karena itu terjadi akibat suatu sebab tertentu 🤔";
  }

  return "Maaf, saya belum mengerti 😅. Coba tanya dengan cara lain.";
}


// ENTER CHAT
document.getElementById("chatInput").addEventListener("keydown", e=>{
  if(e.key==="Enter") sendChat();
});