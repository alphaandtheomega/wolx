-- Virman hareketleri tablosu
CREATE TABLE IF NOT EXISTS virman_hareketleri (
    id SERIAL PRIMARY KEY,
    "gonderenCariId" INTEGER NOT NULL,
    "aliciCariId" INTEGER NOT NULL,
    tutar DECIMAL(15,2) NOT NULL,
    aciklama TEXT,
    "islemTarihi" DATE NOT NULL,
    "kayitTarihi" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "kayitYapanKullanici" VARCHAR(255),
    FOREIGN KEY ("gonderenCariId") REFERENCES cariler(id),
    FOREIGN KEY ("aliciCariId") REFERENCES cariler(id)
);

-- Cari bakiyeler tablosu (eğer yoksa)
CREATE TABLE IF NOT EXISTS cari_bakiyeler (
    id SERIAL PRIMARY KEY,
    "cariId" INTEGER NOT NULL UNIQUE,
    bakiye DECIMAL(15,2) DEFAULT 0.00,
    "kayitTarihi" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "guncellemeTarihi" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "kayitYapanKullanici" VARCHAR(255),
    "guncellemeYapanKullanici" VARCHAR(255),
    FOREIGN KEY ("cariId") REFERENCES cariler(id)
);

-- Mevcut cari hesaplar için bakiye kayıtları oluştur (eğer yoksa)
INSERT INTO cari_bakiyeler ("cariId", bakiye)
SELECT id, 0.00
FROM cariler
WHERE id NOT IN (SELECT "cariId" FROM cari_bakiyeler);

-- İndeksler
CREATE INDEX IF NOT EXISTS idx_virman_gonderen_cari ON virman_hareketleri("gonderenCariId");
CREATE INDEX IF NOT EXISTS idx_virman_alici_cari ON virman_hareketleri("aliciCariId");
CREATE INDEX IF NOT EXISTS idx_virman_islem_tarihi ON virman_hareketleri("islemTarihi");
CREATE INDEX IF NOT EXISTS idx_cari_bakiyeler_cari_id ON cari_bakiyeler("cariId"); 