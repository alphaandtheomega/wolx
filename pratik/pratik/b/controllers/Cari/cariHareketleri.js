import { getConnection } from "../../db.js";

// Tüm hareketleri listele
export async function getAllCariHareketleri(req, res) {
  try {
    const connection = req.db || (await getConnection());
    const { cariId } = req.query;
    let result;
    if (cariId) {
      result = await connection.query(
        'SELECT * FROM carihareketleri WHERE "Sil" IS NOT TRUE AND "CariID" = $1 ORDER BY "CariHareketleriID" DESC',
        [cariId]
      );
    } else {
      result = await connection.query(
        'SELECT * FROM carihareketleri WHERE "Sil" IS NOT TRUE ORDER BY "CariHareketleriID" DESC'
      );
    }
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Cari hareketleri alınamadı: " + error.message });
  }
}

// Tek hareket getir
export async function getCariHareketleriById(req, res) {
  try {
    const connection = req.db || (await getConnection());
    const result = await connection.query(
      'SELECT * FROM carihareketleri WHERE "CariHareketleriID" = $1',
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Cari hareketi bulunamadı" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Cari hareketi alınamadı: " + error.message });
  }
}

// Yeni hareket ekle
export async function createCariHareketleri(req, res) {
  const {
    CariID, Tarih, VadeTarihi, BelgeNo, HareketTipi, BorcAlacak, Borc, Alacak,
    DovizBorc, DovizAlacak, Kur, DovizID, Aciklama, Tip,
    FaturaGrupKodu, FaturaGrupKod
  } = req.body;
  const KayitYapanKullanici = req.user ? req.user.email : null;
  try {
    const connection = req.db || (await getConnection());
    const result = await connection.query(
      `INSERT INTO carihareketleri (
        "CariID", "Tarih", "VadeTarihi", "BelgeNo", "HareketTipi", "BorcAlacak", "Borc", "Alacak",
        "DovizBorc", "DovizAlacak", "Kur", "DovizID", "Aciklama", "KayitYapanKullanici", "Tip",
        "FaturaGrupKodu", "FaturaGrupKod"
      ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17
      ) RETURNING *`,
      [
        CariID, Tarih, VadeTarihi, BelgeNo, HareketTipi, BorcAlacak, Borc, Alacak,
        DovizBorc, DovizAlacak, Kur, DovizID, Aciklama, KayitYapanKullanici, Tip,
        FaturaGrupKodu, FaturaGrupKod
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Cari hareketi eklenemedi: " + error.message });
  }
}

// Hareket güncelle
export async function updateCariHareketleri(req, res) {
  const {
    CariID, Tarih, VadeTarihi, BelgeNo, HareketTipi, BorcAlacak, Borc, Alacak,
    DovizBorc, DovizAlacak, Kur, DovizID, Aciklama, Tip,
    FaturaGrupKodu, FaturaGrupKod, Sil
  } = req.body;
  const { id } = req.params;
  const DuzenlemeYapanKullanici = req.user ? req.user.email : null;
  const SilenKullanici = req.user ? req.user.email : null;
  try {
    const connection = req.db || (await getConnection());
    let query, params;
    if (Sil === true || Sil === 'true') {
      // Soft delete ise SilinenTarih ve SilenKullanici da güncellensin
      query = `UPDATE carihareketleri SET
        "CariID"=$1, "Tarih"=$2, "VadeTarihi"=$3, "BelgeNo"=$4, "HareketTipi"=$5, "BorcAlacak"=$6,
        "Borc"=$7, "Alacak"=$8, "DovizBorc"=$9, "DovizAlacak"=$10, "Kur"=$11, "DovizID"=$12,
        "Aciklama"=$13, "DuzenlemeTarihi"=now(), "DuzenlemeYapanKullanici"=$14, "Tip"=$15,
        "FaturaGrupKodu"=$16, "FaturaGrupKod"=$17, "Sil"=TRUE, "SilinenTarih"=now(), "SilenKullanici"=$18
      WHERE "CariHareketleriID"=$19
      RETURNING *`;
      params = [
        CariID, Tarih, VadeTarihi, BelgeNo, HareketTipi, BorcAlacak, Borc, Alacak,
        DovizBorc, DovizAlacak, Kur, DovizID, Aciklama, DuzenlemeYapanKullanici, Tip,
        FaturaGrupKodu, FaturaGrupKod, SilenKullanici, id
      ];
    } else {
      // Normal update
      query = `UPDATE carihareketleri SET
        "CariID"=$1, "Tarih"=$2, "VadeTarihi"=$3, "BelgeNo"=$4, "HareketTipi"=$5, "BorcAlacak"=$6,
        "Borc"=$7, "Alacak"=$8, "DovizBorc"=$9, "DovizAlacak"=$10, "Kur"=$11, "DovizID"=$12,
        "Aciklama"=$13, "DuzenlemeTarihi"=now(), "DuzenlemeYapanKullanici"=$14, "Tip"=$15,
        "FaturaGrupKodu"=$16, "FaturaGrupKod"=$17, "Sil"=$18
      WHERE "CariHareketleriID"=$19
      RETURNING *`;
      params = [
        CariID, Tarih, VadeTarihi, BelgeNo, HareketTipi, BorcAlacak, Borc, Alacak,
        DovizBorc, DovizAlacak, Kur, DovizID, Aciklama, DuzenlemeYapanKullanici, Tip,
        FaturaGrupKodu, FaturaGrupKod, Sil, id
      ];
    }
    const result = await connection.query(query, params);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Cari hareketi bulunamadı" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Cari hareketi güncellenemedi: " + error.message });
  }
}

// Hareket sil (soft delete)
export async function deleteCariHareketleri(req, res) {
  const { id } = req.params;
  const SilenKullanici = req.user ? req.user.email : null;
  try {
    const connection = req.db || (await getConnection());
    const result = await connection.query(
      `UPDATE carihareketleri SET "Sil"=TRUE, "SilinenTarih"=now(), "SilenKullanici"=$1 WHERE "CariHareketleriID"=$2 RETURNING *`,
      [SilenKullanici, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Cari hareketi bulunamadı" });
    }
    res.status(200).json({ message: "Cari hareketi silindi", deleted: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Cari hareketi silinemedi: " + error.message });
  }
}
