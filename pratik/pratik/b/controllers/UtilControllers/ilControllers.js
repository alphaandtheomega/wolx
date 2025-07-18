import express from 'express';

export const getIller = async (req, res) => {
  try {
    const db = req.db;
    if (!db) {
      return res.status(500).json({ message: 'Veritabanı bağlantısı yok.' });
    }
    const result = await db.query('SELECT "IllerID" as id, "IlKodu" as kod, "IlIsim" as ad FROM iller ORDER BY "IllerID"');
    res.json(result.rows);
  } catch (error) {
    console.error('İller alınırken hata:', error);
    res.status(500).json({ message: 'İller alınırken hata oluştu.' });
  }
};
