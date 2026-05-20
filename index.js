const express = require('express');
const app = express();

// Menyimpan status game di dalam memori kontainer
let dataGame = {
  angkaRahasia: Math.floor(Math.random() * 10) + 1,
  percobaan: 0,
  status: "Mulai menebak!"
};

app.get('/', (req, res) => {
  const tebakan = req.query.tebak;
  const aksi = req.query.action;

  // Fitur Reset Game
  if (aksi === 'reset') {
    dataGame.angkaRahasia = Math.floor(Math.random() * 10) + 1;
    dataGame.percobaan = 0;
    dataGame.status = "Game telah direset! Angka baru telah dipilih.";
  } 
  // Fitur Tebak Angka
  else if (tebakan) {
    const angkaTebakan = parseInt(tebakan);
    dataGame.percobaan++;
    
    if (angkaTebakan === dataGame.angkaRahasia) {
      dataGame.status = `🎉 BENAR! Angka rahasianya ${dataGame.angkaRahasia}. Total tebakan: ${dataGame.percobaan}x.`;
    } else if (angkaTebakan < dataGame.angkaRahasia) {
      dataGame.status = `❌ ${angkaTebakan} TERLALU KECIL! Coba lagi. (Tebakan ke-${dataGame.percobaan})`;
    } else if (angkaTebakan > dataGame.angkaRahasia) {
      dataGame.status = `❌ ${angkaTebakan} TERLALU BESAR! Coba lagi. (Tebakan ke-${dataGame.percobaan})`;
    }
  }

  // Membuat Tombol Angka 1 sampai 10 secara otomatis
  let tombolHTML = '';
  for (let i = 1; i <= 10; i++) {
    tombolHTML += `<a href="/?tebak=${i}" style="display:inline-block; padding:12px 18px; margin:5px; background:#38bdf8; color:#0f172a; text-decoration:none; font-weight:bold; border-radius:5px;">${i}</a>`;
  }

  res.send(`
    <body style="font-family:sans-serif; text-align:center; padding:50px; background:#0f172a; color:white;">
      <h1 style="font-size: 36px; color:#38bdf8;">🎮 DOCKER GAME V2: INTERACTIVE BUTTONS</h1>
      
      <div style="background: rgba(255,255,255,0.05); padding: 25px; max-width: 500px; margin: 30px auto; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
        <p style="font-size: 18px; font-weight: bold; margin-bottom: 20px;">${dataGame.status}</p>
        <div style="margin-bottom: 25px;">${tombolHTML}</div>
        <a href="/?action=reset" style="display:inline-block; padding:10px 20px; background:#ef4444; color:white; text-decoration:none; border-radius:5px; font-size:14px;">🔄 Reset Game</a>
      </div>

      <p style="color:#94a3b8; font-size:13px;">Peningkatan V2 berjalan aman di dalam wadah Docker yang sama.</p>
    </body>
  `);
});

app.listen(3000, () => console.log('Game Docker V2 aktif di port 3000'));
