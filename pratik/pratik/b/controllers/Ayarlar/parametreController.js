import { getConnection } from "../../db.js";

// Tüm parametreleri getir
export async function getParametreler(req, res) {
  try {
    const connection = req.db || (await getConnection());
    const result = await connection.query("SELECT * FROM parametreler ORDER BY parametreid ASC");
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Parametreler alınamadı: " + error.message });
  }
}

// Parametreleri güncelle (veya ekle)
export async function updateParametre(req, res) {
  console.log('POST /api/ayarlar/parametreler', { body: req.body, user: req.user });
  const { parametreid, deger } = req.body;
  // jsonb alanı için string ise otomatik olarak JSON.stringify ile sarmala
  let jsonValue = deger;
  if (typeof deger === "string" && !(deger.startsWith('"') && deger.endsWith('"'))) {
    jsonValue = JSON.stringify(deger);
  }
  try {
    const connection = req.db || (await getConnection());
    let result;
    if (parametreid && deger !== undefined) {
      // Sadece deger alanını güncelle
      result = await connection.query(
        'UPDATE parametreler SET deger = $1 WHERE parametreid = $2 RETURNING *',
        [jsonValue, parametreid]
      );
      res.status(200).json(result.rows[0]);
    } else {
      res.status(400).json({ message: "parametreid ve deger zorunlu, yeni kayıt oluşturulamaz" });
      return;
    }
  } catch (error) {
    console.error('Parametre kaydedilemedi:', error);
    res.status(500).json({ message: "Parametre kaydedilemedi: " + error.message });
  }
}

// parametreid ile tek bir parametre getir
export async function getParametreById(req, res) {
  try {
    const connection = req.db || (await getConnection());
    const { parametreid } = req.params;
    const result = await connection.query("SELECT * FROM parametreler WHERE parametreid = $1", [parametreid]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Parametre bulunamadı" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Parametre alınamadı: " + error.message });
  }
} 