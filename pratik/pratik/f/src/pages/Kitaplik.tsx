import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BookOpen, 
  Plus,
  Minus,
  X,
  Divide
} from "lucide-react";
import { InputStd } from "@/components/ui/tropikui/inputstd";
import { InputAdd } from "@/components/ui/tropikui/inputadd";
import { InputInteger } from "@/components/ui/tropikui/inputinteger";
import { InputSelect } from "@/components/ui/tropikui/inputselect";
import { InputSelectAdd } from "@/components/ui/tropikui/inputselectadd";
import PageLayout from "@/components/PageLayout";
import { InputNumeric } from "@/components/ui/tropikui/inputnumeric";
import { 
  ButonKaydet, 
  ButonSil, 
  ButonIptal, 
  ButonYenile, 
  ButonEkle, 
  ButonOnceki, 
  ButonSonraki, 
  ButonKapat, 
  ButonBul, 
  ButonListele, 
  ButonKopyala, 
  ButonExceleAt, 
  ButonYazdir, 
  ButonIslemler, 
  ButonInputIcinde, 
  ButonOnizle, 
  ButonGeriDon, 
  ButonAktar,
  ButonDuzenle,
  ButonSec,
  // Küçük butonlar
  ButonKaydetKucuk,
  ButonSilKucuk,
  ButonIptalKucuk,
  ButonYenileKucuk,
  ButonEkleKucuk,
  ButonOncekiKucuk,
  ButonSonrakiKucuk,
  ButonKapatKucuk,
  ButonBulKucuk,
  ButonListeleKucuk,
  ButonKopyalaKucuk,
  ButonExceleAtKucuk,
  ButonYazdirKucuk,
  ButonIslemlerKucuk,
  ButonInputIcindeKucuk,
  ButonOnizleKucuk,
  ButonGeriDonKucuk,
  ButonAktarKucuk,
  ButonDuzenleKucuk,
  // Simge butonlar
  ButonKaydetSimge,
  ButonSilSimge,
  ButonIptalSimge,
  ButonYenileSimge,
  ButonEkleSimge,
  ButonOncekiSimge,
  ButonSonrakiSimge,
  ButonKapatSimge,
  ButonBulSimge,
  ButonListeleSimge,
  ButonKopyalaSimge,
  ButonExceleAtSimge,
  ButonYazdirSimge,
  ButonIslemlerSimge,
  ButonInputIcindeSimge,
  ButonOnizleSimge,
  ButonGeriDonSimge,
  ButonAktarSimge,
  ButonSecSimge,
  ButonDuzenleSimge
} from "@/components/ui/tropikui/ButtonLib";

// Kitaplık sayfası: örnek bileşenlerinizi burada sergileyebilirsiniz
const Kitaplik: React.FC = () => {
  const [tutar, setTutar] = React.useState<number | null>(null);
  
  // Matematiksel işlemler için state'ler
  const [sayi1, setSayi1] = React.useState<number | null>(null);
  const [sayi2, setSayi2] = React.useState<number | null>(null);
  const [sayi3, setSayi3] = React.useState<number | null>(null);
  const [sayi4, setSayi4] = React.useState<number | null>(null);
  
  // Sonuçlar
  const [toplam, setToplam] = React.useState<number | null>(null);
  const [fark, setFark] = React.useState<number | null>(null);
  const [carpim, setCarpim] = React.useState<number | null>(null);
  const [bolum, setBolum] = React.useState<number | null>(null);

  // Matematiksel işlemleri hesapla
  const hesaplaIslemler = () => {
    if (sayi1 !== null && sayi2 !== null) {
      setToplam(sayi1 + sayi2);
      setFark(sayi1 - sayi2);
      setCarpim(sayi1 * sayi2);
      setBolum(sayi2 !== 0 ? sayi1 / sayi2 : null);
    }
  };

  // Sayılar değiştiğinde otomatik hesapla
  React.useEffect(() => {
    hesaplaIslemler();
  }, [sayi1, sayi2]);

  // Buton varyasyonları
  const butonVaryasyonlari = [
    {
      kategori: "Büyük Butonlar",
      butonlar: [
        { component: ButonKaydet, ad: "Kaydet" },
        { component: ButonSil, ad: "Sil" },
        { component: ButonIptal, ad: "İptal" },
        { component: ButonYenile, ad: "Yenile" },
        { component: ButonEkle, ad: "Ekle" },
        { component: ButonOnceki, ad: "Önceki" },
        { component: ButonSonraki, ad: "Sonraki" },
        { component: ButonKapat, ad: "Kapat" },
        { component: ButonBul, ad: "Bul" },
        { component: ButonListele, ad: "Listele" },
        { component: ButonKopyala, ad: "Kopyala" },
        { component: ButonExceleAt, ad: "Excel'e At" },
        { component: ButonYazdir, ad: "Yazdır" },
        { component: ButonIslemler, ad: "İşlemler" },
        { component: ButonInputIcinde, ad: "Input İçinde" },
        { component: ButonOnizle, ad: "Önizle" },
        { component: ButonGeriDon, ad: "Geri Dön" },
        { component: ButonAktar, ad: "Aktar" },
        { component: ButonDuzenle, ad: "Düzenle" },
        { component: ButonSec, ad: "Seç" }
      ]
    },
    {
      kategori: "Küçük Butonlar",
      butonlar: [
        { component: ButonKaydetKucuk, ad: "Kaydet" },
        { component: ButonSilKucuk, ad: "Sil" },
        { component: ButonIptalKucuk, ad: "İptal" },
        { component: ButonYenileKucuk, ad: "Yenile" },
        { component: ButonEkleKucuk, ad: "Ekle" },
        { component: ButonOncekiKucuk, ad: "Önceki" },
        { component: ButonSonrakiKucuk, ad: "Sonraki" },
        { component: ButonKapatKucuk, ad: "Kapat" },
        { component: ButonBulKucuk, ad: "Bul" },
        { component: ButonListeleKucuk, ad: "Listele" },
        { component: ButonKopyalaKucuk, ad: "Kopyala" },
        { component: ButonExceleAtKucuk, ad: "Excel'e At" },
        { component: ButonYazdirKucuk, ad: "Yazdır" },
        { component: ButonIslemlerKucuk, ad: "İşlemler" },
        { component: ButonInputIcindeKucuk, ad: "Input İçinde" },
        { component: ButonOnizleKucuk, ad: "Önizle" },
        { component: ButonGeriDonKucuk, ad: "Geri Dön" },
        { component: ButonAktarKucuk, ad: "Aktar" },
        { component: ButonDuzenleKucuk, ad: "Düzenle" }
      ]
    },
    {
      kategori: "Simge Butonlar",
      butonlar: [
        { component: ButonKaydetSimge, ad: "Kaydet" },
        { component: ButonSilSimge, ad: "Sil" },
        { component: ButonIptalSimge, ad: "İptal" },
        { component: ButonYenileSimge, ad: "Yenile" },
        { component: ButonEkleSimge, ad: "Ekle" },
        { component: ButonOncekiSimge, ad: "Önceki" },
        { component: ButonSonrakiSimge, ad: "Sonraki" },
        { component: ButonKapatSimge, ad: "Kapat" },
        { component: ButonBulSimge, ad: "Bul" },
        { component: ButonListeleSimge, ad: "Listele" },
        { component: ButonKopyalaSimge, ad: "Kopyala" },
        { component: ButonExceleAtSimge, ad: "Excel'e At" },
        { component: ButonYazdirSimge, ad: "Yazdır" },
        { component: ButonIslemlerSimge, ad: "İşlemler" },
        { component: ButonInputIcindeSimge, ad: "Input İçinde" },
        { component: ButonOnizleSimge, ad: "Önizle" },
        { component: ButonGeriDonSimge, ad: "Geri Dön" },
        { component: ButonAktarSimge, ad: "Aktar" },
        { component: ButonSecSimge, ad: "Seç" },
        { component: ButonDuzenleSimge, ad: "Düzenle" }
      ]
    }
  ];

  return (
    <PageLayout>
      <Card className="overflow-hidden p-0 border-0 shadow-none max-w-7xl">
        <CardContent className="p-6 md:p-8 bg-background backdrop-blur-sm">
          {/* Header - İkon ve Başlık */}
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-600 mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-teal-600 to-cyan-700 rounded-xl">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
                Kitaplık
              </h1>
              <p className="text-gray-400 dark:text-gray-400 text-sm mt-0.5 font-normal">
                Örnek butonlar ve bileşenler
              </p>
            </div>
          </div>

          {/* ButtonLib Varyasyonları */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              ButtonLib Varyasyonları
            </h2>
            
            <div className="space-y-6">
              {butonVaryasyonlari.map((varyasyon, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  {/* Varyasyon Başlığı */}
                  <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {varyasyon.kategori}
                    </h3>
                  </div>
                  
                                     {/* Butonlar Grid */}
                   <div className="p-4">
                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                       {varyasyon.butonlar.map((buton, butonIndex) => (
                         <div key={butonIndex} className="flex justify-center">
                           <buton.component />
                         </div>
                       ))}
                     </div>
                   </div>
                   {/* Outline Butonlar Grid */}
                   <div className="p-4 pt-0">
                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                       {varyasyon.butonlar.map((buton, butonIndex) => (
                         <div key={butonIndex} className="flex justify-center">
                           <buton.component variant="outline" />
                         </div>
                       ))}
                     </div>
                   </div>
                </div>
              ))}
            </div>
          </div>

          {/* Finansal Input Test Bölümü */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Finansal Input Test - Matematiksel İşlemler
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              {/* Giriş Alanları */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    1. Sayı
                  </label>
                  <InputNumeric 
                    value={sayi1 ?? undefined} 
                    onChange={setSayi1} 
                    placeholder="0,00"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    2. Sayı
                  </label>
                  <InputNumeric 
                    value={sayi2 ?? undefined} 
                    onChange={setSayi2} 
                    placeholder="0,00"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    3. Sayı (Ek Test)
                  </label>
                  <InputNumeric 
                    value={sayi3 ?? undefined} 
                    onChange={setSayi3} 
                    placeholder="0,00"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    4. Sayı (Ek Test)
                  </label>
                  <InputNumeric 
                    value={sayi4 ?? undefined} 
                    onChange={setSayi4} 
                    placeholder="0,00"
                  />
                </div>
              </div>

              {/* Sonuçlar */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      <Plus className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Toplama</span>
                    </div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {toplam !== null ? toplam.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0,00'}
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      <Minus className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Çıkarma</span>
                    </div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {fark !== null ? fark.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0,00'}
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      <X className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Çarpma</span>
                    </div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {carpim !== null ? carpim.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0,00'}
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      <Divide className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Bölme</span>
                    </div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {bolum !== null ? bolum.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0,00'}
                    </div>
                  </div>
                </div>
                
                {/* Test Bilgileri */}
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Test Talimatları:</h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li>• Türkiye formatında giriş yapın (örn: 1.234,56)</li>
                    <li>• Virgülden sonra maksimum 2 basamak</li>
                    <li>• Binlik ayırıcı olarak nokta kullanın</li>
                    <li>• Sonuçlar otomatik hesaplanır</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Input Bileşenleri */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Input Bileşenleri
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Standart Input</h4>
                <InputStd />
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Input Add</h4>
                <InputAdd />
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Input Integer</h4>
                <InputInteger />
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Select Input</h4>
                <InputSelect />
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Select Add Input</h4>
                <InputSelectAdd />
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Numeric Input</h4>
                <InputNumeric value={tutar ?? undefined} onChange={setTutar} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default Kitaplik;
