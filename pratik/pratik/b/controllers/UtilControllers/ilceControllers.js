import express from 'express';

export const getIlcelerByIlId = async (req, res) => {
  try {
    const db = req.db;
    if (!db) {
      return res.status(500).json({ message: 'Veritabanı bağlantısı yok.' });
    }
    const ilId = req.query.ilId;
    if (!ilId) {
      return res.status(400).json({ message: 'ilId parametresi gerekli.' });
    }
    const result = await db.query('SELECT "IlceID" as id, "IlceIsim" as ad FROM ilceler WHERE "IllerID" = $1 ORDER BY "IlceIsim"', [ilId]);
    res.json(result.rows);
  } catch (error) {
    console.error('İlçeler alınırken hata:', error);
    res.status(500).json({ message: 'İlçeler alınırken hata oluştu.' });
  }
};
