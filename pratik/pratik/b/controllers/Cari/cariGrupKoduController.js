import { getConnection } from "../../db.js";

// Tüm Cari Grup Kodlarını getir
export const getAllCariGrupKodlari = async (req, res) => {
  try {
    const connection = req.db || (await getConnection());
    const result = await connection.query('SELECT * FROM grupkodlari WHERE "Kategori" = $1 ORDER BY "GrupKodID" ASC', ['CariGrubu']);
    res.json(result.rows);
  } catch (error) {
    console.error('Cari Grup Kodları alınırken hata:', error);
    res.status(500).json({ message: 'Cari Grup Kodları alınırken bir hata oluştu' });
  }
};

// Yeni Cari Grup Kodu ekle
export const addCariGrupKodu = async (req, res) => {
  const { GrupKod, GrupIsim } = req.body;
  if (!GrupKod || !GrupIsim) {
    return res.status(400).json({ message: 'GrupKod ve GrupIsim zorunludur' });
  }
  const KayitYapanKullanici = req.user ? req.user.email : null;
  try {
    const connection = req.db || (await getConnection());
    const result = await connection.query(
      'INSERT INTO grupkodlari ("GrupKod", "GrupIsim", "Kategori", "KayitTarihi", "KayitYapanKullanici") VALUES ($1, $2, $3, NOW(), $4) RETURNING *',
      [GrupKod, GrupIsim, 'CariGrubu', KayitYapanKullanici]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Cari Grup Kodu eklenirken hata:', error);
    res.status(500).json({ message: 'Cari Grup Kodu eklenirken bir hata oluştu' });
  }
};

// Grup kodunu sil (Kategori = CariGrubu olan ve ID ile)
export const deleteCariGrupKodu = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'ID zorunludur' });
  }
  try {
    const connection = req.db || (await getConnection());
    const result = await connection.query(
      'DELETE FROM grupkodlari WHERE "GrupKodID" = $1 AND "Kategori" = $2 RETURNING *',
      [id, 'CariGrubu']
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Kayıt bulunamadı veya silinemedi' });
    }
    res.json({ message: 'Silindi', deleted: result.rows[0] });
  } catch (error) {
    console.error('Cari Grup Kodu silinirken hata:', error);
    res.status(500).json({ message: 'Cari Grup Kodu silinirken bir hata oluştu' });
  }
};

// Grup kodunu güncelle (Kategori = CariGrubu olan ve ID ile)
export const updateCariGrupKodu = async (req, res) => {
  const { id } = req.params;
  const { GrupKod, GrupIsim } = req.body;
  if (!id || !GrupKod || !GrupIsim) {
    return res.status(400).json({ message: 'ID, GrupKod ve GrupIsim zorunludur' });
  }
  try {
    const connection = req.db || (await getConnection());
    const result = await connection.query(
      'UPDATE grupkodlari SET "GrupKod" = $1, "GrupIsim" = $2 WHERE "GrupKodID" = $3 AND "Kategori" = $4 RETURNING *',
      [GrupKod, GrupIsim, id, 'CariGrubu']
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Kayıt bulunamadı veya güncellenemedi' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Cari Grup Kodu güncellenirken hata:', error);
    res.status(500).json({ message: 'Cari Grup Kodu güncellenirken bir hata oluştu' });
  }
};
