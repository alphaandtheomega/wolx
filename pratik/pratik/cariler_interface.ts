// cariler tablosu için TypeScript interface
// Bu interface, veritabanındaki cariler tablosunun yapısını temsil eder

export interface Cari {
  // Ana kimlik alanları
  id?: number;                    // SERIAL PRIMARY KEY
  CariID?: number;               // SERIAL PRIMARY KEY (alternatif)
  
  // Temel bilgiler
  CariKod: string;               // VARCHAR(50) - Cari kodu
  CariIsim: string;              // VARCHAR(255) - Cari ünvanı/ismi
  Durum: boolean;                // BOOLEAN - Aktif/Pasif durumu
  
  // Adres bilgileri
  Adres?: string;                // VARCHAR(1000) - Adres
  Il?: string;                   // VARCHAR(75) - İl
  Ilce?: string;                 // VARCHAR(75) - İlçe
  Ulke?: string;                 // VARCHAR(50) - Ülke
  PostaKodu?: string;            // VARCHAR(50) - Posta kodu
  
  // Vergi bilgileri
  VergiDairesi?: string;         // VARCHAR(50) - Vergi dairesi
  VergiNumarasi?: string;        // VARCHAR(10) - Vergi numarası
  TCKimlikNo?: string;           // VARCHAR(11) - TC kimlik numarası
  
  // İletişim bilgileri
  IsTel1?: string;               // VARCHAR(50) - İş telefonu
  CepTel?: string;               // VARCHAR(50) - Cep telefonu
  EMail?: string;                // VARCHAR(250) - E-posta
  Faks?: string;                 // VARCHAR(50) - Faks
  WebSite?: string;              // VARCHAR(250) - Web sitesi
  
  // Grup kodları
  GrupKodu1ID?: number;          // INTEGER - 1. grup kodu ID'si
  GrupKodu2ID?: number;          // INTEGER - 2. grup kodu ID'si
  GrupKodu3ID?: number;          // INTEGER - 3. grup kodu ID'si
  
  // Diğer alanlar
  CariRol: string;               // VARCHAR(50) - Cari rolü (Müşteri/Tedarikçi vb.)
  Aciklama?: string;             // TEXT - Açıklama
  Kisitla?: boolean;             // BOOLEAN - Kısıtlama durumu
  KisitlaAciklamasi?: string;    // TEXT - Kısıtlama açıklaması
  
  // Finansal ayarlar
  Doviz?: string;                // VARCHAR(10) - Döviz türü
  DovizTuruID?: number;          // INTEGER - Döviz türü ID'si
  Iskonto1?: number;             // DECIMAL - İskonto oranı
  VadeGunu?: number;             // INTEGER - Vade günü
  FiyatSecilen?: string;         // VARCHAR(50) - Seçilen fiyat türü
  RiskLimiti?: number;           // DECIMAL - Risk limiti
  RiskKullan?: boolean;          // BOOLEAN - Risk kullanımı
  RiskAciklama?: string;         // TEXT - Risk açıklaması
  
  // Sistem alanları
  KayitTarihi?: string;          // TIMESTAMP - Kayıt tarihi
  KayitYapanKullanici?: string;  // VARCHAR(255) - Kayıt yapan kullanıcı
  DuzenlemeTarihi?: string;      // TIMESTAMP - Düzenleme tarihi
  DuzenlemeYapanKullanici?: string; // VARCHAR(255) - Düzenleme yapan kullanıcı
}

// Sadece gerekli alanları içeren basit interface
export interface CariBasit {
  id: number;
  CariKod: string;
  CariIsim: string;
  Durum: boolean;
  EMail?: string;
  IsTel1?: string;
  CepTel?: string;
  Adres?: string;
  Il?: string;
  Ilce?: string;
  KayitTarihi?: string;
}

// Yeni cari oluşturma için interface (id ve tarih alanları olmadan)
export interface CariOlustur {
  CariKod: string;
  CariIsim: string;
  Durum: boolean;
  CariRol: string;
  Adres?: string;
  Il?: string;
  Ilce?: string;
  Ulke?: string;
  VergiDairesi?: string;
  VergiNumarasi?: string;
  TCKimlikNo?: string;
  PostaKodu?: string;
  IsTel1?: string;
  CepTel?: string;
  EMail?: string;
  Faks?: string;
  WebSite?: string;
  GrupKodu1ID?: number;
  GrupKodu2ID?: number;
  GrupKodu3ID?: number;
  Aciklama?: string;
  Kisitla?: boolean;
  KisitlaAciklamasi?: string;
  Doviz?: string;
  DovizTuruID?: number;
  Iskonto1?: number;
  VadeGunu?: number;
  FiyatSecilen?: string;
  RiskLimiti?: number;
  RiskKullan?: boolean;
  RiskAciklama?: string;
} 