import type { ButtonHTMLAttributes } from "react";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Trash,
  XCircle,
  RefreshCw,
  PlusCircle,
  ChevronLeftCircle,
  ChevronRightCircle,
  SearchCheck,
  List,
  Copy,
  FileSpreadsheet,
  Printer,
  MoreVertical,
  Eye,
  ArrowLeftCircle,
  DownloadCloud,
  Check,
  Edit,
  FileText,
  ArrowUpRight
} from "lucide-react";

// Tüm Variantlar ile aynı hizalama için base class
const baseClass = "min-w-[110px] h-12 flex items-center justify-start shadow-sm font-semibold text-sm tracking-wide px-4 py-2 rounded-md transition-all duration-200 hover:shadow-md focus:outline-none";

const baseClassKucukler = "min-w-[50px] h-9 flex items-center justify-start shadow-sm font-semibold text-sm tracking-wide px-4 py-2 rounded-md transition-all duration-200 hover:shadow-md focus:outline-none";

const baseClassSimge = "min-w-[40px] h-10 flex items-center justify-center shadow-sm font-semibold text-sm tracking-wide px-2 py-2 rounded-md transition-all duration-200 hover:shadow-md focus:outline-none";


// Buton prop tipi
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export const ButonKaydet = ({ children = "Kaydet", variant, ...props }: ButtonProps) => (
  <Button
    className={
      variant === "outline"
        ? `${baseClass} bg-transparent border-2 border-[var(--btn-kaydet-bg)] text-[var(--btn-kaydet-bg)] hover:bg-[var(--btn-kaydet-bg)]/10`
        : `${baseClass} bg-[var(--btn-kaydet-bg)] text-[var(--btn-kaydet-text)] hover:bg-[var(--btn-kaydet-bg)]/90`
    }
    variant={variant}
    {...props}
  >
    <CheckCircle className="w-4 h-4 mr-2 hidden md:block" />
    <span className="relative top-px mx-auto">{children}</span>
  </Button>
);

export const ButonSil = ({ children = "Sil", variant, ...props }: ButtonProps) => (
  <Button
    className={
      variant === "outline"
        ? `${baseClass} bg-transparent border-2 border-[var(--btn-sil-bg)] text-[var(--btn-sil-bg)] hover:bg-[var(--btn-sil-bg)]/10`
        : `${baseClass} bg-[var(--btn-sil-bg)] text-[var(--btn-sil-text)] hover:bg-[var(--btn-sil-bg)]/90`
    }
    variant={variant}
    {...props}
  >
    <Trash className="w-4 h-4 mr-2 hidden md:block" />
    <span className="relative top-px mx-auto">{children}</span>
  </Button>
);

export const ButonIptal = ({ children = "İptal", variant, ...props }: ButtonProps) => (
  <Button
    className={
      variant === "outline"
        ? `${baseClass} bg-transparent border-2 border-[var(--btn-iptal-bg)] text-[var(--btn-iptal-bg)] hover:bg-[var(--btn-iptal-bg)]/10`
        : `${baseClass} bg-[var(--btn-iptal-bg)] text-[var(--btn-iptal-text)] hover:bg-[var(--btn-iptal-bg)]/90`
    }
    variant={variant}
    {...props}
  >
    <XCircle className="w-4 h-4 mr-2 hidden md:block" />
    <span className="relative top-px mx-auto">{children}</span>
  </Button>
);

export const ButonYenile = ({ children = "Yenile", variant, ...props }: ButtonProps) => (
  <Button
    className={
      variant === "outline"
        ? `${baseClass} bg-transparent border-2 border-[var(--btn-yenile-bg)] text-[var(--btn-yenile-bg)] hover:bg-[var(--btn-yenile-bg)]/10`
        : `${baseClass} bg-[var(--btn-yenile-bg)] text-[var(--btn-yenile-text)] hover:bg-[var(--btn-yenile-bg)]/90`
    }
    variant={variant}
    {...props}
  >
    <RefreshCw className="w-4 h-4 mr-2 hidden md:block" />
    <span className="relative top-px mx-auto">{children}</span>
  </Button>
);

export const ButonEkle = ({ children = "Ekle", variant, ...props }: ButtonProps) => (
  <Button
    className={
      variant === "outline"
        ? `${baseClass} bg-transparent border-2 border-[var(--btn-ekle-bg)] text-[var(--btn-ekle-bg)] hover:bg-[var(--btn-ekle-bg)]/10`
        : `${baseClass} bg-[var(--btn-ekle-bg)] text-[var(--btn-ekle-text)] hover:bg-[var(--btn-ekle-bg)]/90`
    }
    variant={variant}
    {...props}
  >
    <PlusCircle className="w-4 h-4 mr-2 hidden md:block" />
    <span className="relative top-px mx-auto">{children}</span>
  </Button>
);

export const ButonOnceki = ({ children = "Önceki", variant, ...props }: ButtonProps) => (
  <Button
    className={
      variant === "outline"
        ? `${baseClass} bg-transparent border-2 border-[var(--btn-onceki-bg)] text-[var(--btn-onceki-bg)] hover:bg-[var(--btn-onceki-bg)]/10`
        : `${baseClass} bg-[var(--btn-onceki-bg)] text-[var(--btn-onceki-text)] hover:bg-[var(--btn-onceki-bg)]/90`
    }
    variant={variant}
    {...props}
  >
    <ChevronLeftCircle className="w-4 h-4 mr-2 hidden md:block" />
    <span className="relative top-px mx-auto">{children}</span>
  </Button>
);

export const ButonSonraki = ({ children = "Sonraki", variant, ...props }: ButtonProps) => (
  <Button
    className={
      variant === "outline"
        ? `${baseClass} bg-transparent border-2 border-[var(--btn-sonraki-bg)] text-[var(--btn-sonraki-bg)] hover:bg-[var(--btn-sonraki-bg)]/10`
        : `${baseClass} bg-[var(--btn-sonraki-bg)] text-[var(--btn-sonraki-text)] hover:bg-[var(--btn-sonraki-bg)]/90`
    }
    variant={variant}
    {...props}
  >
    <ChevronRightCircle className="w-4 h-4 mr-2 hidden md:block" />
    <span className="relative top-px mx-auto">{children}</span>
  </Button>
);

export const ButonKapat = ({ children = "Kapat", variant, ...props }: ButtonProps) => (
  <Button
    className={
      variant === "outline"
        ? `${baseClass} bg-transparent border-2 border-[var(--btn-kapat-bg)] text-[var(--btn-kapat-bg)] hover:bg-[var(--btn-kapat-bg)]/10`
        : `${baseClass} bg-[var(--btn-kapat-bg)] text-[var(--btn-kapat-text)] hover:bg-[var(--btn-kapat-bg)]/90`
    }
    variant={variant}
    {...props}
  >
    <XCircle className="w-4 h-4 mr-2 hidden md:block" />
    <span className="relative top-px mx-auto">{children}</span>
  </Button>
);

export const ButonBul = ({ children = "Bul", variant, ...props }: ButtonProps) => (
  <Button
    className={
      variant === "outline"
        ? `${baseClass} bg-transparent border-2 border-[var(--btn-bul-bg)] text-[var(--btn-bul-bg)] hover:bg-[var(--btn-bul-bg)]/10`
        : `${baseClass} bg-[var(--btn-bul-bg)] text-[var(--btn-bul-text)] hover:bg-[var(--btn-bul-bg)]/90`
    }
    variant={variant}
    {...props}
  >
    <SearchCheck className="w-4 h-4 mr-2 hidden md:block" />
    <span className="relative top-px mx-auto">{children}</span>
  </Button>
);

export const ButonListele = ({ children = "Listele", variant, ...props }: ButtonProps) => (
  <Button
    className={
      variant === "outline"
        ? `${baseClass} bg-transparent border-2 border-[var(--btn-listele-bg)] text-[var(--btn-listele-bg)] hover:bg-[var(--btn-listele-bg)]/10`
        : `${baseClass} bg-[var(--btn-listele-bg)] text-[var(--btn-listele-text)] hover:bg-[var(--btn-listele-bg)]/90`
    }
    variant={variant}
    {...props}
  >
    <List className="w-4 h-4 mr-2 hidden md:block" />
    <span className="relative top-px mx-auto">{children}</span>
  </Button>
);

export const ButonKopyala = ({ children = "Kopyala", variant, ...props }: ButtonProps) => (
  <Button
    className={
      variant === "outline"
        ? `${baseClass} bg-transparent border-2 border-[var(--btn-kopyala-bg)] text-[var(--btn-kopyala-bg)] hover:bg-[var(--btn-kopyala-bg)]/10`
        : `${baseClass} bg-[var(--btn-kopyala-bg)] text-[var(--btn-kopyala-text)] hover:bg-[var(--btn-kopyala-bg)]/90`
    }
    variant={variant}
    {...props}
  >
    <Copy className="w-4 h-4 mr-2 hidden md:block" />
    <span className="relative top-px mx-auto">{children}</span>
  </Button>
);

export const ButonExceleAt = ({ children = "Excel", variant, ...props }: ButtonProps) => (
  <Button
    className={
      variant === "outline"
        ? `${baseClass} bg-transparent border-2 border-[var(--btn-exceleat-bg)] text-[var(--btn-exceleat-bg)] hover:bg-[var(--btn-exceleat-bg)]/10`
        : `${baseClass} bg-[var(--btn-exceleat-bg)] text-[var(--btn-exceleat-text)] hover:bg-[var(--btn-exceleat-bg)]/90`
    }
    variant={variant}
    {...props}
  >
    <FileSpreadsheet className="w-4 h-4 mr-2 hidden md:block" />
    <span className="relative top-px mx-auto">{children}</span>
  </Button>
);

export const ButonPdfeAt = ({ children = "Pdf'e Gönder", variant, ...props }: ButtonProps) => (
  <Button
    className={
      variant === "outline"
        ? `${baseClass} bg-transparent border-2 border-[var(--btn-pdf-bg,#E53935)] text-[var(--btn-pdf-bg,#E53935)] hover:bg-[var(--btn-pdf-bg,#E53935)]/10`
        : `${baseClass} bg-[var(--btn-pdf-bg,#E53935)] text-[var(--btn-pdf-text,#fff)] hover:bg-[var(--btn-pdf-bg,#E53935)]/90`
    }
    variant={variant}
    {...props}
  >
    <FileText className="w-4 h-4 mr-2 hidden md:block" />
    <span className="relative top-px mx-auto">{children}</span>
  </Button>
);

export const ButonYazdir = ({ children = "Yazdır", variant, ...props }: ButtonProps) => (
  <Button
    className={
      variant === "outline"
        ? `${baseClass} bg-transparent border-2 border-[var(--btn-yazdir-bg)] text-[var(--btn-yazdir-bg)] hover:bg-[var(--btn-yazdir-bg)]/10`
        : `${baseClass} bg-[var(--btn-yazdir-bg)] text-[var(--btn-yazdir-text)] hover:bg-[var(--btn-yazdir-bg)]/90`
    }
    variant={variant}
    {...props}
  >
    <Printer className="w-4 h-4 mr-2 hidden md:block" />
    <span className="relative top-px mx-auto">{children}</span>
  </Button>
);

export const ButonIslemler = ({ children = "İşlemler", variant, ...props }: ButtonProps) => (
  <Button
    className={
      variant === "outline"
        ? `${baseClass} bg-transparent border-2 border-[var(--btn-islemler-bg)] text-[var(--btn-islemler-bg)] hover:bg-[var(--btn-islemler-bg)]/10`
        : `${baseClass} bg-[var(--btn-islemler-bg)] text-[var(--btn-islemler-text)] hover:bg-[var(--btn-islemler-bg)]/90`
    }
    variant={variant}
    {...props}
  >
    <MoreVertical className="w-4 h-4 mr-2 hidden md:block" />
    <span className="relative top-px mx-auto">{children}</span>
  </Button>
);

export const ButonInputIcinde = ({ children = "Input İçindeki Buton", variant, ...props }: ButtonProps) => (
  <Button
    className={
      variant === "outline"
        ? `${baseClass} bg-transparent border-2 border-[var(--btn-inputicindekibuton-bg)] text-[var(--btn-inputicindekibuton-bg)] hover:bg-[var(--btn-inputicindekibuton-bg)]/10`
        : `${baseClass} bg-[var(--btn-inputicindekibuton-bg)] text-[var(--btn-inputicindekibuton-text)] hover:bg-[var(--btn-inputicindekibuton-bg)]/90`
    }
    variant={variant}
    {...props}
  >
    <SearchCheck className="w-4 h-4 mr-2 hidden md:block" />
    <span className="relative top-px mx-auto">{children}</span>
  </Button>
);

export const ButonOnizle = ({ children = "Önizle", variant, ...props }: ButtonProps) => (
  <Button
    className={
      variant === "outline"
        ? `${baseClass} bg-transparent border-2 border-[var(--btn-onizle-bg)] text-[var(--btn-onizle-bg)] hover:bg-[var(--btn-onizle-bg)]/10`
        : `${baseClass} bg-[var(--btn-onizle-bg)] text-[var(--btn-onizle-text)] hover:bg-[var(--btn-onizle-bg)]/90`
    }
    variant={variant}
    {...props}
  >
    <Eye className="w-4 h-4 mr-2 hidden md:block" />
    <span className="relative top-px mx-auto">{children}</span>
  </Button>
);

export const ButonGeriDon = ({ children = "Geri Dön", variant, ...props }: ButtonProps) => (
  <Button
    className={
      variant === "outline"
        ? `${baseClass} bg-transparent border-2 border-[var(--btn-geri-don-bg)] text-[var(--btn-geri-don-bg)] hover:bg-[var(--btn-geri-don-bg)]/10`
        : `${baseClass} bg-[var(--btn-geri-don-bg)] text-[var(--btn-geri-don-text)] hover:bg-[var(--btn-geri-don-bg)]/90`
    }
    variant={variant}
    {...props}
  >
    <ArrowLeftCircle className="w-4 h-4 mr-2 hidden md:block" />
    <span className="relative top-px mx-auto">{children}</span>
  </Button>
);

export const ButonAktar = ({ children = "Aktar", variant, ...props }: ButtonProps) => (
  <Button
    className={
      variant === "outline"
        ? `${baseClass} bg-transparent border-2 border-[var(--btn-aktar-bg)] text-[var(--btn-aktar-bg)] hover:bg-[var(--btn-aktar-bg)]/10`
        : `${baseClass} bg-[var(--btn-aktar-bg)] text-[var(--btn-aktar-text)] hover:bg-[var(--btn-aktar-bg)]/90`
    }
    variant={variant}
    {...props}
  >
    <DownloadCloud className="w-4 h-4 mr-2 hidden md:block" />
    <span className="relative top-px mx-auto">{children}</span>
  </Button>
); 

export const ButonDuzenle = ({ children = "Düzenle", variant, ...props }: ButtonProps) => (
  <Button
    className={
      variant === "outline"
        ? `${baseClass} bg-transparent border-2 border-[var(--btn-duzenle-bg)] text-[var(--btn-duzenle-bg)] hover:bg-[var(--btn-duzenle-bg)]/10`
        : `${baseClass} bg-[var(--btn-duzenle-bg)] text-[var(--btn-duzenle-text)] hover:bg-[var(--btn-duzenle-bg)]/90`
    }
    variant={variant}
    {...props}
  >
    <Edit className="w-4 h-4 mr-2 hidden md:block" />
    <span className="relative top-px mx-auto">{children}</span>
  </Button>
);


export const ButonSec = ({ children = "Seç", ...props }: ButtonProps) => (
  <Button className={`${baseClassKucukler} bg-[var(--btn-sec-bg)] text-[var(--btn-sec-text)] hover:bg-[var(--btn-sec-bg)]/90`} {...props}>
    <span className="relative top-px mx-auto">{children}</span>
  </Button>
); 



// Küçük Butonlar

export const ButonKaydetKucuk = ({ children = "Kaydet", variant, ...props }: ButtonProps) => (
  <Button
    className={
      variant === "outline"
        ? `${baseClassKucukler} bg-transparent border-2 border-[var(--btn-kaydet-bg)] text-[var(--btn-kaydet-bg)] hover:bg-[var(--btn-kaydet-bg)]/10`
        : `${baseClassKucukler} bg-[var(--btn-kaydet-bg)] text-[var(--btn-kaydet-text)] hover:bg-[var(--btn-kaydet-bg)]/90`
    }
    variant={variant}
    {...props}
  >
    <CheckCircle className="w-4 h-4 mr-2 hidden md:block" />
    <span className="relative top-px mx-auto">{children}</span>
  </Button>
);

export const ButonSilKucuk = ({ children = "Sil", variant, ...props }: ButtonProps) => (
  <Button
    className={
      variant === "outline"
        ? `${baseClassKucukler} bg-transparent border-2 border-[var(--btn-sil-bg)] text-[var(--btn-sil-bg)] hover:bg-[var(--btn-sil-bg)]/10`
        : `${baseClassKucukler} bg-[var(--btn-sil-bg)] text-[var(--btn-sil-text)] hover:bg-[var(--btn-sil-bg)]/90`
    }
    variant={variant}
    {...props}
  >
    <Trash className="w-4 h-4 mr-2 hidden md:block" />
    <span className="relative top-px mx-auto">{children}</span>
  </Button>
);

export const ButonIptalKucuk = ({ children = "İptal", variant, ...props }: ButtonProps) => (
  <Button
    className={
      variant === "outline"
        ? `${baseClassKucukler} bg-transparent border-2 border-[var(--btn-iptal-bg)] text-[var(--btn-iptal-bg)] hover:bg-[var(--btn-iptal-bg)]/10`
        : `${baseClassKucukler} bg-[var(--btn-iptal-bg)] text-[var(--btn-iptal-text)] hover:bg-[var(--btn-iptal-bg)]/90`
    }
    variant={variant}
    {...props}
  >
    <XCircle className="w-4 h-4 mr-2 hidden md:block" />
    <span className="relative top-px mx-auto">{children}</span>
  </Button>
);

export const ButonYenileKucuk = ({ children = "Yenile", variant, ...props }: ButtonProps) => (
  <Button
    className={
      variant === "outline"
        ? `${baseClassKucukler} bg-transparent border-2 border-[var(--btn-yenile-bg)] text-[var(--btn-yenile-bg)] hover:bg-[var(--btn-yenile-bg)]/10`
        : `${baseClassKucukler} bg-[var(--btn-yenile-bg)] text-[var(--btn-yenile-text)] hover:bg-[var(--btn-yenile-bg)]/90`
    }
    variant={variant}
    {...props}
  >
    <RefreshCw className="w-4 h-4 mr-2 hidden md:block" />
    <span className="relative top-px mx-auto">{children}</span>
  </Button>
);

export const ButonEkleKucuk = ({ children = "Ekle", variant, ...props }: ButtonProps) => (
  <Button
    className={
      variant === "outline"
        ? `${baseClassKucukler} bg-transparent border-2 border-[var(--btn-ekle-bg)] text-[var(--btn-ekle-bg)] hover:bg-[var(--btn-ekle-bg)]/10`
        : `${baseClassKucukler} bg-[var(--btn-ekle-bg)] text-[var(--btn-ekle-text)] hover:bg-[var(--btn-ekle-bg)]/90`
    }
    variant={variant}
    {...props}
  >
    <PlusCircle className="w-4 h-4 mr-2 hidden md:block" />
    <span className="relative top-px mx-auto">{children}</span>
  </Button>
);

export const ButonOncekiKucuk = ({ children = "Önceki", variant, ...props }: ButtonProps) => (
  <Button
    className={
      variant === "outline"
        ? `${baseClassKucukler} bg-transparent border-2 border-[var(--btn-onceki-bg)] text-[var(--btn-onceki-bg)] hover:bg-[var(--btn-onceki-bg)]/10`
        : `${baseClassKucukler} bg-[var(--btn-onceki-bg)] text-[var(--btn-onceki-text)] hover:bg-[var(--btn-onceki-bg)]/90`
    }
    variant={variant}
    {...props}
  >
    <ChevronLeftCircle className="w-4 h-4 mr-2 hidden md:block" />
    <span className="relative top-px mx-auto">{children}</span>
  </Button>
);

export const ButonSonrakiKucuk = ({ children = "Sonraki", variant, ...props }: ButtonProps) => (
  <Button
    className={
      variant === "outline"
        ? `${baseClassKucukler} bg-transparent border-2 border-[var(--btn-sonraki-bg)] text-[var(--btn-sonraki-bg)] hover:bg-[var(--btn-sonraki-bg)]/10`
        : `${baseClassKucukler} bg-[var(--btn-sonraki-bg)] text-[var(--btn-sonraki-text)] hover:bg-[var(--btn-sonraki-bg)]/90`
    }
    variant={variant}
    {...props}
  >
    <ChevronRightCircle className="w-4 h-4 mr-2 hidden md:block" />
    <span className="relative top-px mx-auto">{children}</span>
  </Button>
);

export const ButonKapatKucuk = ({ children = "Kapat", variant, ...props }: ButtonProps) => (
  <Button
    className={
      variant === "outline"
        ? `${baseClassKucukler} bg-transparent border-2 border-[var(--btn-kapat-bg)] text-[var(--btn-kapat-bg)] hover:bg-[var(--btn-kapat-bg)]/10`
        : `${baseClassKucukler} bg-[var(--btn-kapat-bg)] text-[var(--btn-kapat-text)] hover:bg-[var(--btn-kapat-bg)]/90`
    }
    variant={variant}
    {...props}
  >
    <XCircle className="w-4 h-4 mr-2 hidden md:block" />
    <span className="relative top-px mx-auto">{children}</span>
  </Button>
);

export const ButonBulKucuk = ({ children = "Bul", variant, ...props }: ButtonProps) => (
  <Button
    className={
      variant === "outline"
        ? `${baseClassKucukler} bg-transparent border-2 border-[var(--btn-bul-bg)] text-[var(--btn-bul-bg)] hover:bg-[var(--btn-bul-bg)]/10`
        : `${baseClassKucukler} bg-[var(--btn-bul-bg)] text-[var(--btn-bul-text)] hover:bg-[var(--btn-bul-bg)]/90`
    }
    variant={variant}
    {...props}
  >
    <SearchCheck className="w-4 h-4 mr-2 hidden md:block" />
    <span className="relative top-px mx-auto">{children}</span>
  </Button>
);

export const ButonListeleKucuk = ({ children = "Listele", variant, ...props }: ButtonProps) => (
  <Button
    className={
      variant === "outline"
        ? `${baseClassKucukler} bg-transparent border-2 border-[var(--btn-listele-bg)] text-[var(--btn-listele-bg)] hover:bg-[var(--btn-listele-bg)]/10`
        : `${baseClassKucukler} bg-[var(--btn-listele-bg)] text-[var(--btn-listele-text)] hover:bg-[var(--btn-listele-bg)]/90`
    }
    variant={variant}
    {...props}
  >
    <List className="w-4 h-4 mr-2 hidden md:block" />
    <span className="relative top-px mx-auto">{children}</span>
  </Button>
);

export const ButonKopyalaKucuk = ({ children = "Kopyala", variant, ...props }: ButtonProps) => (
  <Button
    className={
      variant === "outline"
        ? `${baseClassKucukler} bg-transparent border-2 border-[var(--btn-kopyala-bg)] text-[var(--btn-kopyala-bg)] hover:bg-[var(--btn-kopyala-bg)]/10`
        : `${baseClassKucukler} bg-[var(--btn-kopyala-bg)] text-[var(--btn-kopyala-text)] hover:bg-[var(--btn-kopyala-bg)]/90`
    }
    variant={variant}
    {...props}
  >
    <Copy className="w-4 h-4 mr-2 hidden md:block" />
    <span className="relative top-px mx-auto">{children}</span>
  </Button>
);

export const ButonExceleAtKucuk = ({ children = "Excel", variant, ...props }: ButtonProps) => (
  <Button
    className={
      variant === "outline"
        ? `${baseClassKucukler} bg-transparent border-2 border-[var(--btn-exceleat-bg)] text-[var(--btn-exceleat-bg)] hover:bg-[var(--btn-exceleat-bg)]/10`
        : `${baseClassKucukler} bg-[var(--btn-exceleat-bg)] text-[var(--btn-exceleat-text)] hover:bg-[var(--btn-exceleat-bg)]/90`
    }
    variant={variant}
    {...props}
  >
    <FileSpreadsheet className="w-4 h-4 mr-2 hidden md:block" />
    <span className="relative top-px mx-auto">{children}</span>
  </Button>
);

export const ButonYazdirKucuk = ({ children = "Yazdır", variant, ...props }: ButtonProps) => (
  <Button
    className={
      variant === "outline"
        ? `${baseClassKucukler} bg-transparent border-2 border-[var(--btn-yazdir-bg)] text-[var(--btn-yazdir-bg)] hover:bg-[var(--btn-yazdir-bg)]/10`
        : `${baseClassKucukler} bg-[var(--btn-yazdir-bg)] text-[var(--btn-yazdir-text)] hover:bg-[var(--btn-yazdir-bg)]/90`
    }
    variant={variant}
    {...props}
  >
    <Printer className="w-4 h-4 mr-2 hidden md:block" />
    <span className="relative top-px mx-auto">{children}</span>
  </Button>
);

export const ButonIslemlerKucuk = ({ children = "İşlemler", variant, ...props }: ButtonProps) => (
  <Button
    className={
      variant === "outline"
        ? `${baseClassKucukler} bg-transparent border-2 border-[var(--btn-islemler-bg)] text-[var(--btn-islemler-bg)] hover:bg-[var(--btn-islemler-bg)]/10`
        : `${baseClassKucukler} bg-[var(--btn-islemler-bg)] text-[var(--btn-islemler-text)] hover:bg-[var(--btn-islemler-bg)]/90`
    }
    variant={variant}
    {...props}
  >
    <MoreVertical className="w-4 h-4 mr-2 hidden md:block" />
    <span className="relative top-px mx-auto">{children}</span>
  </Button>
);

export const ButonInputIcindeKucuk = ({ children = "Input İçindeki Buton", variant, ...props }: ButtonProps) => (
  <Button
    className={
      variant === "outline"
        ? `${baseClassKucukler} bg-transparent border-2 border-[var(--btn-inputicindekibuton-bg)] text-[var(--btn-inputicindekibuton-bg)] hover:bg-[var(--btn-inputicindekibuton-bg)]/10`
        : `${baseClassKucukler} bg-[var(--btn-inputicindekibuton-bg)] text-[var(--btn-inputicindekibuton-text)] hover:bg-[var(--btn-inputicindekibuton-bg)]/90`
    }
    variant={variant}
    {...props}
  >
    <SearchCheck className="w-4 h-4 mr-2 hidden md:block" />
    <span className="relative top-px mx-auto">{children}</span>
  </Button>
);

export const ButonOnizleKucuk = ({ children = "Önizle", variant, ...props }: ButtonProps) => (
  <Button
    className={
      variant === "outline"
        ? `${baseClassKucukler} bg-transparent border-2 border-[var(--btn-onizle-bg)] text-[var(--btn-onizle-bg)] hover:bg-[var(--btn-onizle-bg)]/10`
        : `${baseClassKucukler} bg-[var(--btn-onizle-bg)] text-[var(--btn-onizle-text)] hover:bg-[var(--btn-onizle-bg)]/90`
    }
    variant={variant}
    {...props}
  >
    <Eye className="w-4 h-4 mr-2 hidden md:block" />
    <span className="relative top-px mx-auto">{children}</span>
  </Button>
);

export const ButonGeriDonKucuk = ({ children = "Geri Dön", variant, ...props }: ButtonProps) => (
  <Button
    className={
      variant === "outline"
        ? `${baseClassKucukler} bg-transparent border-2 border-[var(--btn-geri-don-bg)] text-[var(--btn-geri-don-bg)] hover:bg-[var(--btn-geri-don-bg)]/10`
        : `${baseClassKucukler} bg-[var(--btn-geri-don-bg)] text-[var(--btn-geri-don-text)] hover:bg-[var(--btn-geri-don-bg)]/90`
    }
    variant={variant}
    {...props}
  >
    <ArrowLeftCircle className="w-4 h-4 mr-2 hidden md:block" />
    <span className="relative top-px mx-auto">{children}</span>
  </Button>
);

export const ButonAktarKucuk = ({ children = "Aktar", variant, ...props }: ButtonProps) => (
  <Button
    className={
      variant === "outline"
        ? `${baseClassKucukler} bg-transparent border-2 border-[var(--btn-aktar-bg)] text-[var(--btn-aktar-bg)] hover:bg-[var(--btn-aktar-bg)]/10`
        : `${baseClassKucukler} bg-[var(--btn-aktar-bg)] text-[var(--btn-aktar-text)] hover:bg-[var(--btn-aktar-bg)]/90`
    }
    variant={variant}
    {...props}
  >
    <DownloadCloud className="w-4 h-4 mr-2 hidden md:block" />
    <span className="relative top-px mx-auto">{children}</span>
  </Button>
); 

export const ButonDuzenleKucuk = ({ children = "Düzenle", variant, ...props }: ButtonProps) => (
  <Button
    className={
      variant === "outline"
        ? `${baseClassKucukler} bg-transparent border-2 border-[var(--btn-duzenle-bg)] text-[var(--btn-duzenle-bg)] hover:bg-[var(--btn-duzenle-bg)]/10`
        : `${baseClassKucukler} bg-[var(--btn-duzenle-bg)] text-[var(--btn-duzenle-text)] hover:bg-[var(--btn-duzenle-bg)]/90`
    }
    variant={variant}
    {...props}
  >
    <Edit className="w-4 h-4 mr-2 hidden md:block" />
    <span className="relative top-px mx-auto">{children}</span>
  </Button>
);

// Sadece Simge Butonlar


export const ButonKaydetSimge = ({ ...props }: ButtonProps) => (
  <Button className={`${baseClassSimge} bg-[var(--btn-kaydet-bg)] text-[var(--btn-kaydet-text)] hover:bg-[var(--btn-kaydet-bg)]/90`} {...props}>
    <CheckCircle className="w-4 h-4" />
  </Button>
);

export const ButonSilSimge = ({ ...props }: ButtonProps) => (
  <Button className={`${baseClassSimge} bg-[var(--btn-sil-bg)] text-[var(--btn-sil-text)] hover:bg-[var(--btn-sil-bg)]/90`} {...props}>
    <Trash className="w-4 h-4" />
  </Button>
);

export const ButonIptalSimge = ({ ...props }: ButtonProps) => (
  <Button className={`${baseClassSimge} bg-[var(--btn-iptal-bg)] text-[var(--btn-iptal-text)] hover:bg-[var(--btn-iptal-bg)]/90`} {...props}>
    <XCircle className="w-4 h-4" />
  </Button>
);

export const ButonYenileSimge = ({ ...props }: ButtonProps) => (
  <Button className={`${baseClassSimge} bg-[var(--btn-yenile-bg)] text-[var(--btn-yenile-text)] hover:bg-[var(--btn-yenile-bg)]/90`} {...props}>
    <RefreshCw className="w-4 h-4" />
  </Button>
);

export const ButonEkleSimge = ({ ...props }: ButtonProps) => (
  <Button className={`${baseClassSimge} bg-[var(--btn-ekle-bg)] text-[var(--btn-ekle-text)] hover:bg-[var(--btn-ekle-bg)]/90`} {...props}>
    <PlusCircle className="w-4 h-4" />
  </Button>
);

export const ButonOncekiSimge = ({ ...props }: ButtonProps) => (
  <Button className={`${baseClassSimge} bg-[var(--btn-onceki-bg)] text-[var(--btn-onceki-text)] hover:bg-[var(--btn-onceki-bg)]/90`} {...props}>
    <ChevronLeftCircle className="w-4 h-4" />
  </Button>
);

export const ButonSonrakiSimge = ({ ...props }: ButtonProps) => (
  <Button className={`${baseClassSimge} bg-[var(--btn-sonraki-bg)] text-[var(--btn-sonraki-text)] hover:bg-[var(--btn-sonraki-bg)]/90`} {...props}>
    <ChevronRightCircle className="w-4 h-4" />
  </Button>
);

export const ButonKapatSimge = ({ ...props }: ButtonProps) => (
  <Button className={`${baseClassSimge} bg-[var(--btn-kapat-bg)] text-[var(--btn-kapat-text)] hover:bg-[var(--btn-kapat-bg)]/90`} {...props}>
    <XCircle className="w-4 h-4" />
  </Button>
);

export const ButonBulSimge = ({ ...props }: ButtonProps) => (
  <Button className={`${baseClassSimge} bg-[var(--btn-bul-bg)] text-[var(--btn-bul-text)] hover:bg-[var(--btn-bul-bg)]/90`} {...props}>
    <SearchCheck className="w-4 h-4" />
  </Button>
);

export const ButonListeleSimge = ({ ...props }: ButtonProps) => (
  <Button className={`${baseClassSimge} bg-[var(--btn-listele-bg)] text-[var(--btn-listele-text)] hover:bg-[var(--btn-listele-bg)]/90`} {...props}>
    <List className="w-4 h-4" />
  </Button>
);

export const ButonKopyalaSimge = ({ ...props }: ButtonProps) => (
  <Button className={`${baseClassSimge} bg-[var(--btn-kopyala-bg)] text-[var(--btn-kopyala-text)] hover:bg-[var(--btn-kopyala-bg)]/90`} {...props}>
    <Copy className="w-4 h-4" />
  </Button>
);

export const ButonExceleAtSimge = ({ ...props }: ButtonProps) => (
  <Button className={`${baseClassSimge} bg-[var(--btn-exceleat-bg)] text-[var(--btn-exceleat-text)] hover:bg-[var(--btn-exceleat-bg)]/90`} {...props}>
    <FileSpreadsheet className="w-4 h-4" />
  </Button>
);

export const ButonYazdirSimge = ({ ...props }: ButtonProps) => (
  <Button className={`${baseClassSimge} bg-[var(--btn-yazdir-bg)] text-[var(--btn-yazdir-text)] hover:bg-[var(--btn-yazdir-bg)]/90`} {...props}>
    <Printer className="w-4 h-4" />
  </Button>
);

export const ButonIslemlerSimge = ({ ...props }: ButtonProps) => (
  <Button className={`${baseClassSimge} bg-[var(--btn-islemler-bg)] text-[var(--btn-islemler-text)] hover:bg-[var(--btn-islemler-bg)]/90`} {...props}>
    <MoreVertical className="w-4 h-4" />
  </Button>
);

export const ButonInputIcindeSimge = ({ ...props }: ButtonProps) => (
  <Button className={`${baseClassSimge} bg-[var(--btn-inputicindekibuton-bg)] text-[var(--btn-inputicindekibuton-text)] hover:bg-[var(--btn-inputicindekibuton-bg)]/90`} {...props}>
    <SearchCheck className="w-4 h-4" />
  </Button>
);

export const ButonOnizleSimge = ({ ...props }: ButtonProps) => (
  <Button className={`${baseClassSimge} bg-[var(--btn-onizle-bg)] text-[var(--btn-onizle-text)] hover:bg-[var(--btn-onizle-bg)]/90`} {...props}>
    <Eye className="w-4 h-4" />
  </Button>
);

export const ButonGeriDonSimge = ({ ...props }: ButtonProps) => (
  <Button className={`${baseClassSimge} bg-[var(--btn-geri-don-bg)] text-[var(--btn-geri-don-text)] hover:bg-[var(--btn-geri-don-bg)]/90`} {...props}>
    <ArrowLeftCircle className="w-4 h-4" />
  </Button>
);

export const ButonAktarSimge = ({ ...props }: ButtonProps) => (
  <Button className={`${baseClassSimge} bg-[var(--btn-aktar-bg)] text-[var(--btn-aktar-text)] hover:bg-[var(--btn-aktar-bg)]/90`} {...props}>
    <DownloadCloud className="w-4 h-4" />
  </Button>
);

export const ButonSecSimge = ({ ...props }: ButtonProps) => (
  <Button className={`${baseClassSimge} bg-[var(--btn-sec-bg)] text-[var(--btn-sec-text)] hover:bg-[var(--btn-sec-bg)]/90`} {...props}>
    <Check className="w-4 h-4" />
  </Button>
);

export const ButonDuzenleSimge = ({ ...props }: ButtonProps) => (
  <Button className={`${baseClassSimge} bg-[var(--btn-duzenle-bg)] text-[var(--btn-duzenle-text)] hover:bg-[var(--btn-duzenle-bg)]/90`} {...props}>
    <Edit className="w-4 h-4" />
  </Button>
); 

export const ButonPdf = ({ children = "PDF", ...props }: ButtonProps) => (
  <Button className={`${baseClass} bg-[var(--btn-pdf-bg,#E53935)] text-[var(--btn-pdf-text,#fff)] hover:bg-[var(--btn-pdf-bg,#E53935)]/90`} {...props}>
    <FileText className="w-4 h-4 mr-2 hidden md:block" />
    <span className="relative top-px mx-auto">{children}</span>
  </Button>
);

export const ButonPdfKucuk = ({ children = "PDF", variant, ...props }: ButtonProps) => (
  <Button
    className={
      variant === "outline"
        ? `${baseClassKucukler} bg-transparent border-2 border-[var(--btn-pdf-bg,#E53935)] text-[var(--btn-pdf-bg,#E53935)] hover:bg-[var(--btn-pdf-bg,#E53935)]/10`
        : `${baseClassKucukler} bg-[var(--btn-pdf-bg,#E53935)] text-[var(--btn-pdf-text,#fff)] hover:bg-[var(--btn-pdf-bg,#E53935)]/90`
    }
    variant={variant}
    {...props}
  >
    <FileText className="w-4 h-4 mr-2 hidden md:block" />
    <span className="relative top-px mx-auto">{children}</span>
  </Button>
);

export const ButonPdfSimge = ({ ...props }: ButtonProps) => (
  <Button className={`${baseClassSimge} bg-[var(--btn-pdf-bg,#E53935)] text-[var(--btn-pdf-text,#fff)] hover:bg-[var(--btn-pdf-bg,#E53935)]/90`} {...props}>
    <FileText className="w-4 h-4" />
  </Button>
); 

export const ButonYenileSimgeOutline = ({ ...props }: ButtonProps) => (
  <Button
    className={`group ${baseClassSimge} bg-transparent border-2 border-[var(--btn-yenile-bg)] text-[var(--btn-yenile-bg)] hover:bg-[var(--btn-yenile-bg)]/10`}
    variant="outline"
    {...props}
  >
    <RefreshCw className="w-5 h-5 transition-transform duration-500 group-hover:animate-spin" />
  </Button>
);

export const ButonDisariAktarSimgeOutline = ({ ...props }: ButtonProps) => (
  <Button
    className={`group ${baseClassSimge} bg-transparent border-2 border-[var(--btn-aktar-bg)] text-[var(--btn-aktar-bg)] hover:bg-[var(--btn-aktar-bg)]/10`}
    variant="outline"
    {...props}
  >
    <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
  </Button>
); 