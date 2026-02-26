const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const jadwal = {
  senin: {
    "07.00": "Matematika",
    "08.00": "Bahasa Indonesia",
  },
  selasa: {
    "07.00": "IPA",
    "08.00": "IPS",
  },
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
