const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const jadwal = {
  senin: {
    "07.00": "bahasa bali",
    "08.00": "ipas",
    "09.30": "bahasa indonesia",
  },
  selasa: {
    "07.00": "pjok",
    "08.00": "dda",
    "14.28": "matematika",
  },
  rabu:  {
    "07.00": "pendidikan pancasila",
    "08.50": "matematika",
    "10.40": "senibudaya",
    "12.00": "sejarah",
    "13.40": "bk",
    "14.20": "bahasa indonesia",
  },
  kamis:  {
    "07.00": "kka",
    "08.50": "dda",
    "13.40": "agama",
  },
  jumat:  {
    "07.30": "informatika",
    "11.20": "bahasa inggris",
  
};
app.post("/webhook", (req, res) => {
  const hari = req.body.queryResult.parameters.hari;
  const jam = req.body.queryResult.parameters.jam;

  let mapel = jadwal[hari]?.[jam];

  if (mapel) {
    res.json({
      fulfillmentText: `Hari ${hari} jam ${jam} pelajaran ${mapel}`
    });
  } else {
    res.json({
      fulfillmentText: `Maaf jadwal tidak ditemukan`
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
