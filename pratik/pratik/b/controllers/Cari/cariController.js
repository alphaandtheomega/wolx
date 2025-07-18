import { getConnection } from "../../db.js";

export async function getAllCariler(req, res) {
  try {
    const connection = req.db || (await getConnection());
    const { search } = req.query;
    
    let query = 'SELECT * FROM cariler';
    let params = [];
    
    if (search && search.trim().length >= 3) {
      query += ' WHERE "CariIsim" ILIKE $1 OR "CariKod" ILIKE $1';
      params.push(`%${search.trim()}%`);
    }
    
    query += ' ORDER BY "CariID" ASC';
    
    const result = await connection.query(query, params);
    res.status(200).json(result.rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Cari bilgileri alınamadı: " + error.message });
  }
}

export async function getCarilerById(req, res) {
  try {
    const connection = req.db || (await getConnection());
    const result = await connection.query(
      "SELECT * FROM cariler WHERE id = $1",
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Cari bulunamadı" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Cari alınamadı: " + error.message });
  }
}

export async function createCariler(req, res) {
  const {
    CariIsim,
    Durum,
    CariKod,
    Adres,
    Il,
    Ilce,
    Ulke,
    VergiDairesi,
    VergiNumarasi,
    TCKimlikNo,
    PostaKodu,
    CariRol,
    IsTel1,
    CepTel,
    EMail,
    Faks,
    WebSite,
    GrupKodu1ID,
    GrupKodu2ID,
    GrupKodu3ID,
    Aciklama,
    Kisitla,
    KisitlaAciklamasi,
    Doviz,
    DovizTuruID,
    Iskonto1,
    VadeGunu,
    FiyatSecilen,
    RiskLimiti,
    RiskKullan,
    RiskAciklama,
    Sil,
    } = req.body;

  const KayitYapanKullanici = req.user ? req.user.email : null;
  try {
    const connection = req.db || (await getConnection());
    const newCariler = await connection.query(
        'INSERT INTO cariler ("CariIsim", "Durum", "CariKod", "Adres", "Il", "Ilce", "Ulke", "VergiDairesi", "VergiNumarasi", "TCKimlikNo", "PostaKodu", "CariRol", "IsTel1", "CepTel", "EMail", "Faks", "WebSite", "GrupKodu1ID", "GrupKodu2ID", "GrupKodu3ID", "Aciklama", "Kisitla", "KisitlaAciklamasi", "Doviz", "DovizTuruID", "Iskonto1", "VadeGunu", "FiyatSecilen", "RiskLimiti", "RiskKullan", "RiskAciklama", "KayitYapanKullanici", "Sil") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33) RETURNING *',
      [
        CariIsim,
        Durum,
        CariKod,
        Adres,
        Il,
        Ilce,
        Ulke,
        VergiDairesi,
        VergiNumarasi,
        TCKimlikNo,
        PostaKodu,
        CariRol,
        IsTel1,
        CepTel,
        EMail,
        Faks,
        WebSite,
        GrupKodu1ID,
        GrupKodu2ID,
        GrupKodu3ID,
        Aciklama,
        Kisitla,
        KisitlaAciklamasi,
        Doviz,
        DovizTuruID,
        Iskonto1,
        VadeGunu,
        FiyatSecilen,
        RiskLimiti,
        RiskKullan,
        RiskAciklama,
        KayitYapanKullanici,
        Sil,
      ]
    );
    res.status(201).json(newCariler.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Cari kaydedilemedi: " + error.message });
  }
}

export async function deleteCariler(req, res) {
  try {
    const connection = req.db || (await getConnection());
    const result = await connection.query(
      "DELETE FROM cariler WHERE id = $1 RETURNING *",
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Silinecek cari bulunamadı" });
    }
    res.status(200).json({
      message: "Cari başarıyla silindi",
      deletedCariler: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: "Cari silinemedi: " + error.message });
  }
}

export async function updateCariler(req, res) {
  const {
    CariIsim,
    Durum,
    CariKod,
    Adres,
    Il,
    Ilce,
    Ulke,
    VergiDairesi,
    VergiNumarasi,
    TCKimlikNo,
    PostaKodu,
    CariRol,
    IsTel1,
    CepTel,
    EMail,
    Faks,
    WebSite,
    GrupKodu1ID,
    GrupKodu2ID,
    GrupKodu3ID,
    Aciklama,
    Kisitla,
    KisitlaAciklamasi,
    Doviz,
    DovizTuruID,
    Iskonto1,
    VadeGunu,
    FiyatSecilen,
    RiskLimiti,
    RiskKullan,
    RiskAciklama
    } = req.body;
  const { id } = req.params;
  const DuzenlemeYapanKullanici = req.user ? req.user.email : null;
  try {
    const connection = req.db || (await getConnection());
    const result = await connection.query(
      'UPDATE cariler SET "CariIsim" = $1, "Durum" = $2, "CariKod" = $3, "Adres" = $4, "Il" = $5, "Ilce" = $6, "Ulke" = $7, "VergiDairesi" = $8, "VergiNumarasi" = $9, "TCKimlikNo" = $10, "PostaKodu" = $11, "CariRol" = $12, "IsTel1" = $13, "CepTel" = $14, "EMail" = $15, "Faks" = $16, "WebSite" = $17, "GrupKodu1ID" = $18, "GrupKodu2ID" = $19, "GrupKodu3ID" = $20, "Aciklama" = $21, "Kisitla" = $22, "KisitlaAciklamasi" = $23, "Doviz" = $24, "DovizTuruID" = $25, "Iskonto1" = $26, "VadeGunu" = $27, "FiyatSecilen" = $28, "RiskLimiti" = $29, "RiskKullan" = $30, "RiskAciklama" = $31, "DuzenlemeYapanKullanici" = $32 WHERE id = $33 RETURNING *', 
      [
        CariIsim,
        Durum,
        CariKod,
        Adres,
        Il,
        Ilce,
        Ulke,
        VergiDairesi,
        VergiNumarasi,
        TCKimlikNo,
        PostaKodu,
        CariRol,
        IsTel1,
        CepTel,
        EMail,
        Faks,
        WebSite,
        GrupKodu1ID,
        GrupKodu2ID,
        GrupKodu3ID,
        Aciklama,
        Kisitla,
        KisitlaAciklamasi,
        Doviz,
        DovizTuruID,
        Iskonto1,
        VadeGunu,
        FiyatSecilen,
          RiskLimiti,
        RiskKullan,
        RiskAciklama,
        DuzenlemeYapanKullanici,
        id,
      ]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Güncellenecek cari bulunamadı" });
    }
    res.status(200).json({
      message: "Cari başarıyla güncellendi",
      updatedCariler: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: "Cari güncellenemedi: " + error.message });
  }
}

export async function getAllCariSecView(req, res) {
  try {
    const connection = req.db || (await getConnection());
    const result = await connection.query('SELECT * FROM vw_carisec ORDER BY "CariID" ASC');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "CariSec view verileri alınamadı: " + error.message });
  }
}

export async function getAllCarilerForTable(req, res) {
  try {
    const connection = req.db || (await getConnection());
    const result = await connection.query(
      `SELECT * FROM vw_cariliste_table WHERE "Sil" = false ORDER BY "CariID" DESC`
    );
    res.status(200).json({
      data: result.rows
    });
  } catch (error) {
    console.error("Cari tablo verileri alınamadı:", error);
    res.status(500).json({ message: "Cari tablo verileri alınamadı: " + error.message });
  }
}

export async function getAllCarilerWithParameters(req, res) {
  try {
    const connection = req.db || (await getConnection());
    const { CariKod, CariIsim, Durum, GrupKodu1ID, GrupKodu2ID, GrupKodu3ID } = req.query;
    let query = `SELECT 
      *
    FROM vw_cariliste_table WHERE "Sil" = false`;
    let params = [];
    if (CariKod) {
      query += ' AND "CariKod" ILIKE $' + (params.length + 1);
      params.push(`%${CariKod}%`);
    }
    if (CariIsim) {
      query += ' AND "CariIsim" ILIKE $' + (params.length + 1);
      params.push(`%${CariIsim}%`);
    }
    if (Durum !== undefined) {
      let durumBool = Durum === true || Durum === 'true' || Durum === 1 || Durum === '1';
      if (Durum === false || Durum === 'false' || Durum === 0 || Durum === '0') {
        durumBool = false;
      }
      query += ' AND "Durum" = $' + (params.length + 1);
      params.push(durumBool);
    }
    if (GrupKodu1ID && GrupKodu1ID !== "0") {
      query += ' AND "GrupKodu1ID" = $' + (params.length + 1);
      params.push(Number(GrupKodu1ID));
    }
    if (GrupKodu2ID && GrupKodu2ID !== "0") {
      query += ' AND "GrupKodu2ID" = $' + (params.length + 1);
      params.push(Number(GrupKodu2ID));
    }
    if (GrupKodu3ID && GrupKodu3ID !== "0") {
      query += ' AND "GrupKodu3ID" = $' + (params.length + 1);
      params.push(Number(GrupKodu3ID));
    }
    query += ' ORDER BY "CariID" DESC';
    const result = await connection.query(query, params);
    res.status(200).json({ data: result.rows });
  } catch (error) {
    res.status(500).json({ message: "Filtreli cari listesi alınamadı: " + error.message });
  }
}