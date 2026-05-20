const express = require('express');
const app = express();

const angkaRahasia = Math.floor(Math.random() * 10) + 1;

app.get('/', (req, res) => {
  const tebakan = req.query.tebak;
  let pesan = "Silakan tebak angka antara 1 sampai 10 dengan mengetik di URL!";
  let warnaBg = "#0f172a"; 

  if (tebakan) {
    const angkaTebakan = parseInt(tebakan);
    if (angkaTebakan === angkaRahasia) {
      pesan = `🎉 KAMU BENAR! Angka rahasianya adalah ${angkaRahasia}.`;
      warnaBg = "#15803d"; 
    } else if (angkaTebakan < angkaRahasia) {
      pesan = `❌ SALAH! Angka tebakanmu (${angkaTebakan}) TERLALU KECIL.`;
      warnaBg = "#b91c1c"; 
    } else if (angkaTebakan > angkaRahasia) {
      pesan = `❌ SALAH! Angka tebakanmu (${angkaTebakan}) TERLALU BESAR.`;
      warnaBg = "#b91c1c"; 
    }
  }

  res.send(`
    <body style="font-family:sans-serif; text-align:center; padding:100px; background:${warnaBg}; color:white; transition: 0.5s;">
      <h1 style="font-size: 40px;">🎮 MINI GAME: DOCKER NUMBER GUESSER</h1>
      <p style="font-size: 20px; margin: 30px 0;">${pesan}</p>
      
      <div style="background: rgba(255,255,255,0.1); padding: 20px; display: inline-block; border-radius: 10px;">
        <p><b>Cara Bermain:</b> Tambahkan <code>?tebak=ANGKA</code> di akhir URL browser Anda.</p>
        <p>Contoh: <a href="http://localhost:3000/?tebak=5" style="color:#38bdf8;">http://localhost:3000/?tebak=5</a></p>
      </div>

      <hr style="border:1px solid rgba(255,255,255,0.2); max-width:500px; margin:40px auto;">
      <p style="color:#94a3b8; font-size:14px;">Game ini dijalankan dari dalam Docker Container yang terisolasi.</p>
    </body>
  `);
});

app.listen(3000, () => console.log('Game Docker aktif di port 3000'));
