"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState, useRef } from "react";
import { z } from "zod";
import { InputStd } from "@/components/ui/tropikui/inputstd";
import { Button } from "@/components/ui/button";
import { ButonIptal, ButonKaydet } from "@/components/ui/tropikui/ButtonLib";
import { toast } from "sonner";
import axios from "axios";
import { AxiosError } from "axios";
import { Switch } from "@/components/ui/switch";
import { TextareaTropik } from "@/components/ui/tropikui/textareatropik";
import {
  Check,
  ChevronsUpDown,
  Phone,
  DollarSign,
  Users,
  FileText,
  User,
  BookOpen,
} from "lucide-react";
import { InputSelectAdd } from "@/components/ui/tropikui/inputselectadd";
import { cn } from "@/lib/utils";
import { InputAdd } from "@/components/ui/tropikui/inputadd";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  SelectTropik,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/tropikui/selecttropik";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/auth-context";
import PageLayout from "@/components/PageLayout";
import GrupKoduModal from "@/components/Cari/GrupKoduModal";
import GrupKoduModalPlus from "@/components/Cari/GrupKoduModalPlus";
import { InputNumeric } from "@/components/ui/tropikui/inputnumeric";
import { InputInteger } from "@/components/ui/tropikui/inputinteger";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


interface ApiError {
  message: string;
}

const formSchema = z.object({
  CariIsim: z
    .string()
    .min(1, "Cari ünvanı gerekli")
    .max(255, "Cari ünvanı en fazla 255 karakter olabilir"),
  Durum: z.boolean(),
  CariKod: z
    .string()
    .min(1, "Cari kodu gerekli")
    .max(50, "Cari kodu en fazla 50 karakter olabilir"),
  Adres: z
    .string()
    .max(1000, "Adres en fazla 1000 karakter olabilir")
    .optional(),
  Il: z.string().max(75, "İl en fazla 75 karakter olabilir").optional(),
  Ilce: z.string().max(75, "İlçe en fazla 75 karakter olabilir").optional(),
  Ulke: z.string().max(50, "Ülke en fazla 50 karakter olabilir").optional(),
  VergiDairesi: z
    .string()
    .max(50, "Vergi dairesi en fazla 50 karakter olabilir")
    .optional(),
  VergiNumarasi: z
    .string()
    .max(10, "Vergi numarası 10 karakter olmalı")
    .optional(),
  TCKimlikNo: z.string().max(11, "TC kimlik no 11 karakter olmalı").optional(),
  PostaKodu: z
    .string()
    .max(50, "Posta kodu en fazla 50 karakter olabilir")
    .optional(),
  CariRol: z.string().min(1, "Cari rol gerekli"),
  IsTel1: z
    .string()
    .max(50, "İş telefonu en fazla 50 karakter olabilir")
    .optional(),
  CepTel: z
    .string()
    .max(50, "Cep telefonu en fazla 50 karakter olabilir")
    .optional(),
  EMail: z
    .string()
    .email("Geçerli bir e-posta adresi giriniz")
    .max(250, "E-posta en fazla 250 karakter olabilir")
    .optional()
    .or(z.literal("")),
  Faks: z.string().max(50, "Faks en fazla 50 karakter olabilir").optional(),
  WebSite: z
    .string()
    .max(250, "Web site en fazla 250 karakter olabilir")
    .optional(),
  GrupKodu1ID: z.string().optional(),
  GrupKodu2ID: z.string().optional(),
  GrupKodu3ID: z.string().optional(),
  Aciklama: z
    .string()
    .max(3000, "Açıklama en fazla 3000 karakter olabilir")
    .optional(),
  Kisitla: z.boolean().default(false),
  KisitlaAciklamasi: z
    .string()
    .max(300, "Kısıtla açıklama en fazla 300 karakter olabilir")
    .optional(),
  Doviz: z.boolean().default(false),
  DovizTuruID: z.number(),
  Iskonto1: z
    .number({
      required_error: "İskonto 1 zorunlu",
      invalid_type_error: "İskonto 1 sayısal olmalı",
    })
    .min(0, "İskonto 1 negatif olamaz")
    .max(
      9999999999.99999999,
      "İskonto 1 en fazla 10 basamak ve 8 ondalık olabilir"
    )
    .optional(),
  VadeGunu: z.number().optional(),
  FiyatSecilen: z.number().optional(),
  RiskLimiti: z.number().optional(),
  RiskKullan: z.boolean().default(false),
  RiskAciklama: z
    .string()
    .max(250, "Risk açıklama en fazla 250 karakter olabilir")
    .optional(),
  Sil: z.boolean().default(false),
});

export default function CariEkle() {
  const [openIl, setOpenIl] = useState(false);
  const [valueIl, setValueIl] = useState<string>("");
  const [selectedIlLabel, setSelectedIlLabel] = useState<string>("");
  const [iller, setIller] = useState<any[]>([]);
  const [ilceler, setIlceler] = useState<any[]>([]);
  const [openIlce, setOpenIlce] = useState(false);
  const [valueIlce, setValueIlce] = useState<string>("");
  const [illerIlkYuklendi, setIllerIlkYuklendi] = useState(false);
  const [openUlke, setOpenUlke] = useState(false);
  const [valueUlke, setValueUlke] = useState<string>("");
  const [selectedUlkeLabel, setSelectedUlkeLabel] = useState<string>("");
  const [ulkeler, setUlkeler] = useState<any[]>([]);
  const [ulkelerYuklendi, setUlkelerYuklendi] = useState(false);
  const [grupKoduModalOpen1, setGrupKoduModalOpen1] = useState<
    "yeni" | "secim" | false
  >(false);
  const [selectedGrupKodu1, setSelectedGrupKodu1] = useState<any>(null);
  const [grupKoduModalOpen2, setGrupKoduModalOpen2] = useState<
    "yeni" | "secim" | false
  >(false);
  const [selectedGrupKodu2, setSelectedGrupKodu2] = useState<any>(null);
  const [grupKoduModalOpen3, setGrupKoduModalOpen3] = useState<
    "yeni" | "secim" | false
  >(false);
  const [selectedGrupKodu3, setSelectedGrupKodu3] = useState<any>(null);
  const [grupKodlari, setGrupKodlari] = useState<any[]>([]);
  const [grupKoduModalPlusOpen, setGrupKoduModalPlusOpen] = useState(false);
  const [grupKodu1PlusModalOpen, setGrupKodu1PlusModalOpen] = useState(false);
  const [grupKodu2PlusModalOpen, setGrupKodu2PlusModalOpen] = useState(false);
  const [grupKodu3PlusModalOpen, setGrupKodu3PlusModalOpen] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3002";
  const { accessToken } = useAuth();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      CariIsim: "",
      Durum: true,
      CariKod: "",
      Adres: "",
      Il: "",
      Ilce: "",
      Ulke: "Türkiye",
      VergiDairesi: "",
      VergiNumarasi: "",
      TCKimlikNo: "",
      PostaKodu: "",
      CariRol: "ALICI-SATICI",
      IsTel1: "",
      CepTel: "",
      EMail: "",
      Faks: "",
      WebSite: "",
      GrupKodu1ID: undefined,
      GrupKodu2ID: undefined,
      GrupKodu3ID: undefined,
      Aciklama: "",
      Kisitla: false,
      KisitlaAciklamasi: "",
      Doviz: false,
      DovizTuruID: 1,
      Iskonto1: undefined,
      VadeGunu: undefined,
      FiyatSecilen: undefined,
      RiskLimiti: undefined,
      RiskKullan: false,
      RiskAciklama: "",
      Sil: false,
    },
  });
  const createCarilerMutation = useMutation({
    mutationFn: (CarilerData: z.infer<typeof formSchema>) => {
      return axios.post(
        `${apiUrl}/api/cariler`,
        CarilerData,
        accessToken
          ? {
              headers: { Authorization: `Bearer ${accessToken}` },
              withCredentials: true,
            }
          : { withCredentials: true }
      );
    },
    onSuccess: () => {
      form.reset();
      setValueIl("");
      setSelectedIlLabel("");
      setValueIlce("");
      setIlceler([]);
      setValueUlke("Türkiye");
      setSelectedUlkeLabel("Türkiye");
      setUlkeler([]);
      setUlkelerYuklendi(false);
      // Grup kodu state'lerini temizle
      setSelectedGrupKodu1(null);
      setSelectedGrupKodu2(null);
      setSelectedGrupKodu3(null);
      toast.success("Cari başarıyla eklendi", {
        description: "İşlem başarıyla tamamlandı",
        style: {
          backgroundColor: "var(--btn-kaydet-bg)",
          border: "1px solid var(--btn-kaydet-border)",
          color: "var(--btn-kaydet-text)",
        },
      });
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error("Hata", {
        description:
          error.response?.data?.message || "Cari eklenirken bir hata oluştu",
        style: {
          backgroundColor: "var(--btn-sil-bg)",
          border: "1px solid var(--btn-sil-border)",
          color: "var(--btn-sil-text)",
        },
      });
    },
  });

  const {
    refetch: fetchIller,
    isFetching: illerYukleniyor,
    data: illerData,
  } = useQuery<any[], Error>({
    queryKey: ["iller"],
    queryFn: async () => {
      const res = await axios.get(`${apiUrl}/api/iller`);
      return res.data;
    },
    enabled: false,
  });

  const {
    refetch: fetchIlceler,
    isFetching: ilcelerYukleniyor,
    data: ilcelerData,
  } = useQuery<any[], Error>({
    queryKey: ["ilceler", valueIl],
    queryFn: async () => {
      const res = await axios.get(`${apiUrl}/api/ilceler?ilId=${valueIl}`);
      return res.data;
    },
    enabled: false,
  });

  const {
    refetch: fetchUlkeler,
    isFetching: ulkelerYukleniyor,
    data: ulkelerData,
  } = useQuery<any[], Error>({
    queryKey: ["ulkeler"],
    queryFn: async () => {
      const res = await axios.get(`${apiUrl}/api/ulkeler`);
      return res.data;
    },
    enabled: false,
  });

  const fetchGrupKodlari = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/carigrupkodlari`);
      setGrupKodlari(res.data);
    } catch (err) {
      // Hata yönetimi
    }
  };

  useEffect(() => {
    if (illerData) {
      setIller(
        illerData.map((il: any) => ({ value: String(il.id), label: il.ad }))
      );
    }
  }, [illerData]);

  useEffect(() => {
    if (ilcelerData) {
      setIlceler(
        ilcelerData.map((ilce: any) => ({ value: ilce.ad, label: ilce.ad }))
      );
    }
  }, [ilcelerData]);

  useEffect(() => {
    if (ulkelerData) {
      setUlkeler(
        ulkelerData.map((ulke: any) => ({
          value: ulke.UlkeKod,
          label: ulke.UlkeIsim,
        }))
      );
    }
  }, [ulkelerData]);

  useEffect(() => {
    const ulkeDefault = form.getValues("Ulke");
    if (ulkeDefault) {
      setValueUlke(ulkeDefault);
      setSelectedUlkeLabel(ulkeDefault);
    }
  }, []);

  const cariKodInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (cariKodInputRef.current) {
      cariKodInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    fetchGrupKodlari();
  }, []);

  async function handleCariKodUpdateIfNeeded(cariKod: string) {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3002";
      // id=5 ve id=6 olan parametreleri çek
      const [resp5, resp6] = await Promise.all([
        axios.get(`${apiUrl}/api/ayarlar/parametreler/5`),
        axios.get(`${apiUrl}/api/ayarlar/parametreler/6`),
      ]);
      const deger5 = parseDeger(resp5.data?.deger);
      let deger6 = parseDeger(resp6.data?.deger);
      // Birleştir
      const parametreKod = `${deger5}${deger6}`;
      // Eğer cariKod ile parametreKod aynıysa
      const eslesme = cariKod === parametreKod;
      console.log("CariKod eşleşme sonucu:", eslesme);
      if (eslesme) {
        // 1 artır

        let deger6Str = typeof deger6 === "number" ? deger6.toString() : deger6;
        if (
          (typeof deger6 === "string" && /^\d+$/.test(deger6)) ||
          typeof deger6 === "number"
        ) {
          const yeniDeger6 = (parseInt(deger6Str, 10) + 1)
            .toString()
            .padStart(deger6Str.length, "0");

          try {
            await axios.post(
              `${apiUrl}/api/ayarlar/parametreler`,
              {
                parametreid: 6,
                deger: yeniDeger6,
              },
              accessToken
                ? {
                    headers: { Authorization: `Bearer ${accessToken}` },
                    withCredentials: true,
                  }
                : { withCredentials: true }
            );
            // Başarılı olunca toast gösterme
          } catch (err) {
            // Hata olursa da toast gösterme
          }
        }
      }
    } catch (err) {
      // Hata olursa sessiz geç
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Boş stringleri null'a çevir
    const temizVeri = Object.fromEntries(
      Object.entries(values).map(([k, v]) => [
        k,
        typeof v === "string" && v === "" ? null : v,
      ])
    ) as z.infer<typeof formSchema>;
    // CariKod'u al
    const cariKod = temizVeri.CariKod as string;
    // Önce parametre güncellemesi gerekiyorsa yap, sonra formu kaydet
    handleCariKodUpdateIfNeeded(cariKod).finally(() => {
      console.log(temizVeri);
      createCarilerMutation.mutate(temizVeri);
    });
  }

  const handleIlPopoverOpenChange = (open: boolean) => {
    setOpenIl(open);
    if (open && !illerIlkYuklendi) {
      fetchIller();
      setIllerIlkYuklendi(true);
      setValueIlce("");
      setIlceler([]);
    } else if (open) {
      setValueIlce("");
    }
  };

  const handleIlcePopoverOpenChange = (open: boolean) => {
    setOpenIlce(open);
    if (open && valueIl) {
      fetchIlceler();
    }
  };

  const handleUlkePopoverOpenChange = (open: boolean) => {
    setOpenUlke(open);
    if (open && !ulkelerYuklendi) {
      fetchUlkeler();
      setUlkelerYuklendi(true);
    }
  };

  // Backend'den gelen deger alanını güvenli şekilde işle
  function parseDeger(deger: any) {
    if (typeof deger !== "string") return deger;
    // Eğer tırnaklı bir string ise tırnakları kaldır
    if (
      (deger.startsWith('"') && deger.endsWith('"')) ||
      (deger.startsWith("'") && deger.endsWith("'"))
    ) {
      return deger.slice(1, -1);
    }
    // JSON ise parse et, değilse düz string olarak döndür
    try {
      return JSON.parse(deger);
    } catch {
      return deger;
    }
  }

  async function handleCariKodPlusClick() {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3002";
      const [resp5, resp6] = await Promise.all([
        axios.get(`${apiUrl}/api/ayarlar/parametreler/5`),
        axios.get(`${apiUrl}/api/ayarlar/parametreler/6`),
      ]);
      // deger alanlarını güvenli şekilde işle
      const deger5 = parseDeger(resp5.data?.deger);
      const deger6 = parseDeger(resp6.data?.deger);
      const yeniKod = `${deger5}${deger6}`;
      form.setValue("CariKod", yeniKod);
    } catch (err) {
      // Hata olursa da toast gösterme
    }
  }

  return (
    <PageLayout>
      {/* Header - İkon ve Başlık */}
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row  items-start sm:items-center gap-4 mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl shadow-lg">
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Cari Ekle
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-base mt-1">
              Yeni cari hesap bilgilerini girin ve kaydedin
            </p>
          </div>
        </div>
        <Tabs defaultValue="carihizli" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-bg sm:grid-cols-3 lg:grid-cols-6 h-auto sm:h-16 mb-0 gap-2 p-2 dark:bg-gray-800 rounded-xl z-20">
            <TabsTrigger
              value="carihizli"
              className="flex items-center gap-2 text-xs sm:text-sm font-medium px-3 py-2 sm:px-4 sm:py-3 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:scale-120 data-[state=active]:bg-white data-[state=active]:dark:bg-gray-700 data-[state=active]:dark:text-white data-[state=inactive]:bg-sky-100 data-[state=inactive]:dark:bg-gray-800/60 text-stone-900 dark:text-gray-200 hover:bg-cyan-500 dark:hover:bg-gray-700 transition-all rounded-lg"
            >
              <User className="!w-5 !h-5 text-green-600" /> Hızlı Kayıt
            </TabsTrigger>
            <TabsTrigger
              value="caribilgiler"
              className="flex items-center gap-2 text-xs sm:text-sm font-medium px-3 py-2 sm:px-4 sm:py-3 border-b-2 border-border/10 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:scale-120 data-[state=active]:bg-white data-[state=active]:dark:bg-gray-700 data-[state=active]:dark:text-white data-[state=inactive]:bg-sky-100 data-[state=inactive]:dark:bg-gray-800/60 text-stone-900 dark:text-gray-200 hover:bg-cyan-500 dark:hover:bg-gray-700 transition-all rounded-lg"
            >
              <BookOpen className="!w-5 !h-5 text-purple-600" /> Bilgiler
            </TabsTrigger>
            <TabsTrigger
              value="cariiletisimveadres"
              className="flex items-center gap-2 text-xs sm:text-sm font-medium px-3 py-2 sm:px-4 sm:py-3 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:scale-120 data-[state=active]:bg-white data-[state=active]:dark:bg-gray-700 data-[state=active]:dark:text-white data-[state=inactive]:bg-sky-100 data-[state=inactive]:dark:bg-gray-800/60 text-stone-900 dark:text-gray-200 hover:bg-cyan-500 dark:hover:bg-gray-700 transition-all rounded-lg"
            >
              <Phone className="!w-5 !h-5 text-blue-600" /> İletişim ve Adres
            </TabsTrigger>
            <TabsTrigger
              value="carifinansal"
              className="flex items-center gap-2 text-xs sm:text-sm font-medium px-3 py-2 sm:px-4 sm:py-3 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:scale-120 data-[state=active]:bg-white data-[state=active]:dark:bg-gray-700 data-[state=active]:dark:text-white data-[state=inactive]:bg-sky-100 data-[state=inactive]:dark:bg-gray-800/60 text-stone-900 dark:text-gray-200 hover:bg-cyan-500 dark:hover:bg-gray-700 transition-all rounded-lg"
            >
              <DollarSign className="!w-5 !h-5 text-red-600" /> Finansal
            </TabsTrigger>
            <TabsTrigger
              value="cariadres"
              className="flex items-center gap-2 text-xs sm:text-sm font-medium px-3 py-2 sm:px-4 sm:py-3 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:scale-120 data-[state=active]:bg-white data-[state=active]:dark:bg-gray-700 data-[state=active]:dark:text-white data-[state=inactive]:bg-sky-100 data-[state=inactive]:dark:bg-gray-800/60 text-stone-900 dark:text-gray-200 hover:bg-cyan-500 dark:hover:bg-gray-700 transition-all rounded-lg"
            >
              <Users className="!w-5 !h-5 text-orange-600" /> Çalışan Tablosu
            </TabsTrigger>
            <TabsTrigger
              value="carinotlar"
              className="flex items-center gap-2 text-xs sm:text-sm font-medium px-3 py-2 sm:px-4 sm:py-3 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:scale-120 data-[state=active]:bg-white data-[state=active]:dark:bg-gray-700 data-[state=active]:dark:text-white data-[state=inactive]:bg-sky-100 data-[state=inactive]:dark:bg-gray-800/60 text-stone-900 dark:text-gray-200 hover:bg-cyan-500 dark:hover:bg-gray-700 transition-all rounded-lg"
            >
              <FileText className="!w-5 !h-5 text-gray-600" /> Notlar
            </TabsTrigger>
          </TabsList>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((values) => {
                // Eğer seçili grup kodu varsa, form verisine GrupKodu1ID olarak ID'yi yaz
                let submitValues = { ...values };
                if (selectedGrupKodu1) {
                  submitValues.GrupKodu1ID = selectedGrupKodu1.GrupKodID;
                }
                if (selectedGrupKodu2) {
                  submitValues.GrupKodu2ID = selectedGrupKodu2.GrupKodID;
                }
                if (selectedGrupKodu3) {
                  submitValues.GrupKodu3ID = selectedGrupKodu3.GrupKodID;
                }
                onSubmit(submitValues);
              })}
            >
              <TabsContent value="carihizli">
                <div className="mb-6">
                  <p className="text-gray-600 dark:text-gray-400 mt-2 sm:mt-12 md:mt-12 lg:mt-4 xl:mt-4">
                    Temel bilgileri hızlıca doldurarak cari hesap oluşturun
                  </p>
                </div>

                <div className="space-y-8">
                  {/* Grup 1: Temel Bilgiler */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Cari Durumu */}
                    <FormField
                      control={form.control}
                      name="Durum"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex flex-col justify-center h-20">
                            <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-200 mb-1">
                              Cari Durumu
                            </FormLabel>
                            <div className="flex items-center gap-3">
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="data-[state=checked]:bg-teal-500"
                              />
                              <span
                                className={
                                  field.value
                                    ? "text-green-600 text-sm"
                                    : "text-gray-400 text-sm"
                                }
                              >
                                {field.value ? "Aktif" : "Pasif"}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500">
                              Aktif/Pasif olarak carinin durumunu belirleyin.
                            </span>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Cari Kodu */}
                    <FormField
                      control={form.control}
                      name="CariKod"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                          <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-200 flex items-center gap-1">
                            Cari Kodu <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <InputAdd
                              type="text"
                              onPlusClick={handleCariKodPlusClick}
                              placeholder="Cari Kodu"
                              className={`  transition-all ${
                                field.value
                                  ? "bg-green-50 dark:bg-green-900/20"
                                  : "bg-white dark:bg-gray-900"
                              }`}
                              {...field}
                              ref={(el) => {
                                cariKodInputRef.current = el;
                                if (typeof field.ref === "function")
                                  field.ref(el);
                                else if (field.ref)
                                  (field.ref as any).current = el;
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Cari Ünvanı */}
                    <FormField
                      control={form.control}
                      name="CariIsim"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                          <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-200 flex items-center gap-1">
                            Cari Ünvanı <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <InputStd
                              type="text"
                              placeholder="Cari Ünvanı"
                              className={` ${
                                field.value
                                  ? "bg-green-50 dark:bg-green-900/20"
                                  : "bg-white dark:bg-gray-900"
                              }`}
                              {...field}
                              ref={field.ref}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Ayırıcı çizgi */}
                  <div className="border-t border-gray-200 dark:border-gray-700"></div>

                  {/* Grup 2: Ek Bilgiler */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* TC Kimlik No */}
                    <FormField
                      control={form.control}
                      name="TCKimlikNo"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                          <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-200">
                            TC Kimlik No
                          </FormLabel>
                          <FormControl>
                            <InputStd
                              type="text"
                              placeholder="TC Kimlik No"
                              className={`${
                                field.value
                                  ? "bg-green-50 dark:bg-green-900/20"
                                  : "bg-white dark:bg-gray-900"
                              }`}
                              maxLength={11}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Vergi Dairesi */}
                    <FormField
                      control={form.control}
                      name="VergiDairesi"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                          <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-200">
                            Vergi Dairesi
                          </FormLabel>
                          <FormControl>
                            <InputStd
                              type="text"
                              placeholder="Vergi Dairesi"
                              className={`${
                                field.value
                                  ? "bg-green-50 dark:bg-green-900/20"
                                  : "bg-white dark:bg-gray-900"
                              }`}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Vergi Numarası */}
                    <FormField
                      control={form.control}
                      name="VergiNumarasi"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                          <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-200">
                            Vergi Numarası
                          </FormLabel>
                          <FormControl>
                            <InputStd
                              type="text"
                              placeholder="Vergi Numarası"
                              className={`${
                                field.value
                                  ? "bg-green-50 dark:bg-green-900/20"
                                  : "bg-white dark:bg-gray-900"
                              }`}
                              maxLength={10}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="caribilgiler">
                <div className="mb-6">
                  <p className="text-gray-600 dark:text-gray-400 mt-2 sm:mt-12 md:mt-12 lg:mt-4 xl:mt-4">
                    Cari ile ilgili detaylı bilgileri girin
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Sol Grid - Temel Bilgiler */}
                  <div className="space-y-6 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
                      Temel Bilgiler
                    </h3>

                    {/* Cari Durumu */}
                    <FormField
                      control={form.control}
                      name="Durum"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex flex-col justify-center h-20">
                            <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-200 mb-1">
                              Cari Durumu
                            </FormLabel>
                            <div className="flex items-center gap-3">
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="data-[state=checked]:bg-teal-500"
                              />
                              <span
                                className={
                                  field.value
                                    ? "text-green-600 text-sm"
                                    : "text-gray-400 text-sm"
                                }
                              >
                                {field.value ? "Aktif" : "Pasif"}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500 mt-1">
                              Aktif/Pasif olarak carinin durumunu belirleyin.
                            </span>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Cari Kodu */}
                    <FormField
                      control={form.control}
                      name="CariKod"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                          <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-200">
                            Cari Kodu
                          </FormLabel>
                          <FormControl>
                            <InputAdd
                              type="text"
                              onPlusClick={handleCariKodPlusClick}
                              placeholder="Cari Kodu"
                              className={`${
                                field.value
                                  ? "bg-green-50 dark:bg-green-900/20"
                                  : "bg-white dark:bg-gray-900"
                              }`}
                              {...field}
                              ref={(el) => {
                                cariKodInputRef.current = el;
                                if (typeof field.ref === "function")
                                  field.ref(el);
                                else if (field.ref)
                                  (field.ref as any).current = el;
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Cari Ünvanı */}
                    <FormField
                      control={form.control}
                      name="CariIsim"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                          <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-200">
                            Cari Ünvanı
                          </FormLabel>
                          <FormControl>
                            <InputStd
                              type="text"
                              placeholder="Cari Ünvanı"
                              className={`${
                                field.value
                                  ? "bg-green-50 dark:bg-green-900/20"
                                  : "bg-white dark:bg-gray-900"
                              }`}
                              {...field}
                              ref={field.ref}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Cari Rol */}
                    <FormField
                      control={form.control}
                      name="CariRol"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                          <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-200">
                            Cari Rol
                          </FormLabel>
                          <FormControl>
                            <SelectTropik
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger >
                                <SelectValue placeholder="Cari Rol" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="ALICI-SATICI">
                                    ALICI-SATICI
                                  </SelectItem>
                                  <SelectItem value="ALICI">ALICI</SelectItem>
                                  <SelectItem value="SATICI">SATICI</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </SelectTropik>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Orta Grid - Kimlik Bilgileri */}
                  <div className="space-y-6 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
                      Kimlik Bilgileri
                    </h3>

                    {/* TC Kimlik No */}
                    <FormField
                      control={form.control}
                      name="TCKimlikNo"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                          <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-200">
                            TC Kimlik No
                          </FormLabel>
                          <FormControl>
                            <InputStd
                              type="text"
                              placeholder="TC Kimlik No"
                              className={`${
                                field.value
                                  ? "bg-green-50 dark:bg-green-900/20"
                                  : "bg-white dark:bg-gray-900"
                              }`}
                              maxLength={11}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Vergi Dairesi */}
                    <FormField
                      control={form.control}
                      name="VergiDairesi"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                          <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-200">
                            Vergi Dairesi
                          </FormLabel>
                          <FormControl>
                            <InputStd
                              type="text"
                              placeholder="Vergi Dairesi"
                              className={`${
                                field.value
                                  ? "bg-green-50 dark:bg-green-900/20"
                                  : "bg-white dark:bg-gray-900"
                              }`}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Vergi Numarası */}
                    <FormField
                      control={form.control}
                      name="VergiNumarasi"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                          <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-200">
                            Vergi Numarası
                          </FormLabel>
                          <FormControl>
                            <InputStd
                              type="text"
                              placeholder="Vergi Numarası"
                              className={`${
                                field.value
                                  ? "bg-green-50 dark:bg-green-900/20"
                                  : "bg-white dark:bg-gray-900"
                              }`}
                              maxLength={10}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Açıklama */}
                    <FormField
                      control={form.control}
                      name="Aciklama"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                          <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-200">
                            Açıklama
                          </FormLabel>
                          <FormControl>
                            <TextareaTropik
                              placeholder="Cari Açıklama"
                              className={`${
                                field.value
                                  ? "bg-green-50 dark:bg-green-900/20"
                                  : "bg-white dark:bg-gray-900"
                              }`}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Sağ Grid - Grup Kodları */}
                  <div className="space-y-6 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
                      Grup Kodları
                    </h3>

                    {/* Grup Kodu 1 */}
                    <FormField
                      control={form.control}
                      name="GrupKodu1ID"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                          <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-200">
                            Grup Kodu 1
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center gap-2">
                              <InputSelectAdd
                                type="text"
                                placeholder="Grup Kodu 1"
                                
                                list="grupkodu1-list"
                                value={
                                  selectedGrupKodu1
                                    ? selectedGrupKodu1.GrupIsim
                                    : field.value || ""
                                }
                                onChange={() => {}}
                                onPlusClick={() =>
                                  setGrupKodu1PlusModalOpen(true)
                                }
                                onListClick={() =>
                                  setGrupKoduModalOpen1("yeni")
                                }
                                readOnly
                              />
                              <datalist id="grupkodu1-list">
                                {grupKodlari.map((g: any) => (
                                  <option
                                    key={g.GrupKodID}
                                    value={g.GrupIsim}
                                  />
                                ))}
                              </datalist>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Grup Kodu 2 */}
                    <FormField
                      control={form.control}
                      name="GrupKodu2ID"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                          <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-200">
                            Grup Kodu 2
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center gap-2">
                              <InputSelectAdd
                                type="text"
                                placeholder="Grup Kodu 2"
                                
                                list="grupkodu2-list"
                                value={
                                  selectedGrupKodu2
                                    ? selectedGrupKodu2.GrupIsim
                                    : field.value || ""
                                }
                                onChange={() => {}}
                                onPlusClick={() =>
                                  setGrupKodu2PlusModalOpen(true)
                                }
                                onListClick={() =>
                                  setGrupKoduModalOpen2("secim")
                                }
                                readOnly
                              />
                              <datalist id="grupkodu2-list">
                                {grupKodlari.map((g: any) => (
                                  <option
                                    key={g.GrupKodID}
                                    value={g.GrupIsim}
                                  />
                                ))}
                              </datalist>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Grup Kodu 3 */}
                    <FormField
                      control={form.control}
                      name="GrupKodu3ID"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                          <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-200">
                            Grup Kodu 3
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center gap-2">
                              <InputSelectAdd
                                type="text"
                                placeholder="Grup Kodu 3"
                                
                                list="grupkodu3-list"
                                value={
                                  selectedGrupKodu3
                                    ? selectedGrupKodu3.GrupIsim
                                    : field.value || ""
                                }
                                onChange={() => {}}
                                onPlusClick={() =>
                                  setGrupKodu3PlusModalOpen(true)
                                }
                                onListClick={() =>
                                  setGrupKoduModalOpen3("secim")
                                }
                                readOnly
                              />
                              <datalist id="grupkodu3-list">
                                {grupKodlari.map((g: any) => (
                                  <option
                                    key={g.GrupKodID}
                                    value={g.GrupIsim}
                                  />
                                ))}
                              </datalist>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="cariiletisimveadres">
                <div className="mb-6">
                  <p className="text-gray-600 dark:text-gray-400 mt-2 sm:mt-12 md:mt-12 lg:mt-4 xl:mt-4">
                    Telefon, e-posta, web bilgileri ve adres bilgilerini girin
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Sol Grid - İletişim Bilgileri */}
                  <div className="space-y-6 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
                      İletişim Bilgileri
                    </h3>

                    {/* İş Telefonu */}
                    <FormField
                      control={form.control}
                      name="IsTel1"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                          <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-200">
                            İş Telefonu
                          </FormLabel>
                          <FormControl>
                            <InputStd
                              type="text"
                              placeholder="İş Telefonu"
                              
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Cep Telefonu */}
                    <FormField
                      control={form.control}
                      name="CepTel"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                          <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-200">
                            Cep Telefonu
                          </FormLabel>
                          <FormControl>
                            <InputStd
                              type="text"
                              placeholder="Cep Telefonu"
                              
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* E-posta */}
                    <FormField
                      control={form.control}
                      name="EMail"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                          <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-200">
                            E-posta
                          </FormLabel>
                          <FormControl>
                            <InputStd
                              type="email"
                              placeholder="E-posta"
                              
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Web Sitesi */}
                    <FormField
                      control={form.control}
                      name="WebSite"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                          <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-200">
                            Web Sitesi
                          </FormLabel>
                          <FormControl>
                            <InputStd
                              type="text"
                              placeholder="Web Sitesi"
                              
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Faks */}
                    <FormField
                      control={form.control}
                      name="Faks"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                          <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-200">
                            Faks
                          </FormLabel>
                          <FormControl>
                            <InputStd
                              type="text"
                              placeholder="Faks"
                              
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Sağ Grid - Adres Bilgileri */}
                  <div className="space-y-6 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
                      Adres Bilgileri
                    </h3>

                    {/* Ülke */}
                    <FormField
                      control={form.control}
                      name="Ulke"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                          <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-200">
                            Ülke
                          </FormLabel>
                          <FormControl>
                            <Popover
                              open={openUlke}
                              onOpenChange={handleUlkePopoverOpenChange}
                            >
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  aria-expanded={openUlke}
                                  className="w-full h-12 justify-between border border-gray-200 dark:border-gray-700 rounded-lg focus:border-teal-500  focus:ring-teal-500/20 transition-all bg-white dark:bg-gray-900"
                                  disabled={ulkelerYukleniyor}
                                >
                                  {valueUlke
                                    ? selectedUlkeLabel
                                    : ulkelerYukleniyor
                                    ? "Yükleniyor..."
                                    : "Ülke Seçiniz..."}
                                  <ChevronsUpDown className="opacity-50 h-4 w-4" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-full p-0">
                                <Command>
                                  <CommandInput
                                    placeholder="Ülke Ara..."
                                    className="h-9"
                                  />
                                  <CommandList>
                                    <CommandEmpty>Ülke bulunamadı.</CommandEmpty>
                                    <CommandGroup>
                                      {ulkeler.map((ulke) => (
                                        <CommandItem
                                          key={ulke.value}
                                          value={`${ulke.label} ${ulke.value}`}
                                          onSelect={() => {
                                            setValueUlke(ulke.value);
                                            setSelectedUlkeLabel(ulke.label);
                                            field.onChange(ulke.label);
                                            setOpenUlke(false);
                                          }}
                                        >
                                          {ulke.label}
                                          <Check
                                            className={cn(
                                              "ml-auto",
                                              field.value === ulke.label
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                          />
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* İl */}
                    <FormField
                      control={form.control}
                      name="Il"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                          <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-200">
                            İl
                          </FormLabel>
                          <FormControl>
                            <Popover
                              open={openIl}
                              onOpenChange={handleIlPopoverOpenChange}
                            >
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  aria-expanded={openIl}
                                  className="w-full h-12 justify-between border border-gray-200 dark:border-gray-700 rounded-lg focus:border-teal-500 focus:ring-teal-500/20 transition-all bg-white dark:bg-gray-900"
                                  disabled={illerYukleniyor}
                                >
                                  {valueIl
                                    ? selectedIlLabel
                                    : illerYukleniyor
                                    ? "Yükleniyor..."
                                    : "İl Seçiniz..."}
                                  <ChevronsUpDown className="opacity-50 h-4 w-4" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-full p-0">
                                <Command>
                                  <CommandInput
                                    placeholder="İl Ara..."
                                    className="h-9"
                                  />
                                  <CommandList>
                                    <CommandEmpty>İl bulunamadı.</CommandEmpty>
                                    <CommandGroup>
                                      {iller.map((il) => (
                                        <CommandItem
                                          key={il.value}
                                          value={`${il.label} ${il.value}`}
                                          onSelect={() => {
                                            setValueIl(il.value);
                                            setSelectedIlLabel(il.label);
                                            field.onChange(il.label);
                                            setOpenIl(false);
                                          }}
                                        >
                                          {il.label}
                                          <Check
                                            className={cn(
                                              "ml-auto",
                                              field.value === il.label
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                          />
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* İlçe */}
                    <FormField
                      control={form.control}
                      name="Ilce"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                          <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-200">
                            İlçe
                          </FormLabel>
                          <FormControl>
                            <Popover
                              open={openIlce}
                              onOpenChange={handleIlcePopoverOpenChange}
                            >
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  aria-expanded={openIlce}
                                  className="w-full h-12 justify-between border border-gray-200 dark:border-gray-700 rounded-lg focus:border-teal-500  focus:ring-teal-500/20 transition-all bg-white dark:bg-gray-900"
                                  disabled={!valueIl || ilcelerYukleniyor}
                                >
                                  {valueIlce
                                    ? ilceler.find(
                                        (ilce) => ilce.value === valueIlce
                                      )?.label
                                    : ilcelerYukleniyor
                                    ? "Yükleniyor..."
                                    : !valueIl
                                    ? "Önce il seçiniz"
                                    : "İlçe Seçiniz..."}
                                  <ChevronsUpDown className="opacity-50 h-4 w-4" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-full p-0">
                                <Command>
                                  <CommandInput
                                    placeholder="İlçe Ara..."
                                    className="h-9"
                                  />
                                  <CommandList>
                                    <CommandEmpty>
                                      İlçe bulunamadı.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      {ilceler.map((ilce) => (
                                        <CommandItem
                                          key={ilce.value}
                                          value={`${ilce.label} ${ilce.value}`}
                                          onSelect={() => {
                                            setValueIlce(ilce.value);
                                            field.onChange(ilce.value);
                                            setOpenIlce(false);
                                          }}
                                        >
                                          {ilce.label}
                                          <Check
                                            className={cn(
                                              "ml-auto",
                                              valueIlce === ilce.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                          />
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Posta Kodu */}
                    <FormField
                      control={form.control}
                      name="PostaKodu"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                          <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-200">
                            Posta Kodu
                          </FormLabel>
                          <FormControl>
                            <InputStd
                              type="text"
                              placeholder="Posta Kodu"
                             
                              maxLength={50}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Adres */}
                    <FormField
                      control={form.control}
                      name="Adres"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                          <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-200">
                            Adres
                          </FormLabel>
                          <FormControl>
                            <TextareaTropik
                              placeholder="Cari Adresi"
                              className={`min-h-[120px] ${
                                field.value
                                  ? "bg-green-50 dark:bg-green-900/20"
                                  : "bg-white dark:bg-gray-900"
                              }`}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="carifinansal">
                <div className="mb-6">
                  <p className="text-gray-600 dark:text-gray-400 mt-2 sm:mt-12 md:mt-12 lg:mt-4 xl:mt-4">
                    Döviz, iskonto, vade ve risk ayarlarını yapın
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Sol Grid - Döviz ve İskonto Ayarları */}
                  <div className="space-y-6 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
                      Döviz ve İskonto
                    </h3>

                    {/* Döviz Kullan */}
                    <FormField
                      control={form.control}
                      name="Doviz"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex flex-col justify-center h-20">
                            <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-200 mb-1">
                              Döviz Kullan
                            </FormLabel>
                            <div className="flex items-center gap-3">
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="data-[state=checked]:bg-teal-500"
                              />
                              <span
                                className={
                                  field.value
                                    ? "text-green-600 text-sm"
                                    : "text-gray-400 text-sm"
                                }
                              >
                                {field.value ? "Aktif" : "Pasif"}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500 mt-1">
                              Döviz kullanımını aktif/pasif yapın.
                            </span>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Döviz Türü */}
                    <FormField
                      control={form.control}
                      name="DovizTuruID"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                          <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-200">
                            Döviz Türü
                          </FormLabel>
                          <FormControl>
                            <SelectTropik
                              value={
                                field.value !== undefined
                                  ? String(field.value)
                                  : ""
                              }
                              onValueChange={(val) =>
                                field.onChange(Number(val))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Döviz Türü" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="1">TL</SelectItem>
                                  <SelectItem value="2">USD</SelectItem>
                                  <SelectItem value="3">EUR</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </SelectTropik>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* İskonto 1 */}
                    <FormField
                      control={form.control}
                      name="Iskonto1"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                          <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-200">
                            İskonto 1 (%)
                          </FormLabel>
                          <FormControl>
                            <InputNumeric
                              placeholder="0,00"
                              className={`${
                                field.value !== undefined &&
                                field.value !== null &&
                                field.value !== 0
                                  ? "bg-green-50 dark:bg-green-900/20"
                                  : "bg-white dark:bg-gray-900"
                              }`}
                              value={field.value ?? undefined}
                              onChange={(value) => {
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Sağ Grid - Vade ve Risk Ayarları */}
                  <div className="space-y-6 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
                      Vade ve Risk
                    </h3>

                    {/* Vade Günü */}
                    <FormField
                      control={form.control}
                      name="VadeGunu"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                          <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-200">
                            Vade Günü
                          </FormLabel>
                          <FormControl>
                            <InputInteger
                              placeholder="0"
                              className={`${
                                field.value !== undefined &&
                                field.value !== null &&
                                field.value !== 0
                                  ? "bg-green-50 dark:bg-green-900/20"
                                  : "bg-white dark:bg-gray-900"
                              }`}
                              value={field.value ?? undefined}
                              onChange={(value) => {
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Fiyat Seçilen */}
                    <FormField
                      control={form.control}
                      name="FiyatSecilen"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                          <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-200">
                            Fiyat Seçilen
                          </FormLabel>
                          <FormControl>
                            <InputInteger
                              placeholder="0"
                              
                              value={field.value ?? undefined}
                              onChange={(value) => {
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Risk Kullan */}
                    <FormField
                      control={form.control}
                      name="RiskKullan"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex flex-col justify-center h-20">
                            <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-200 mb-1">
                              Risk Kullan
                            </FormLabel>
                            <div className="flex items-center gap-3">
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="data-[state=checked]:bg-teal-500"
                              />
                              <span
                                className={
                                  field.value
                                    ? "text-green-600 text-sm"
                                    : "text-gray-400 text-sm"
                                }
                              >
                                {field.value ? "Aktif" : "Pasif"}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500 mt-1">
                              Risk kontrolünü aktif/pasif yapın.
                            </span>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Risk Limiti */}
                    <FormField
                      control={form.control}
                      name="RiskLimiti"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                          <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-200">
                            Risk Limiti
                          </FormLabel>
                          <FormControl>
                            <InputNumeric
                              placeholder="0,00"
                              
                              value={field.value ?? undefined}
                              onChange={(value) => {
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Risk Açıklama */}
                    <FormField
                      control={form.control}
                      name="RiskAciklama"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                          <FormLabel className="text-base font-medium text-gray-700 dark:text-gray-200">
                            Risk Açıklama
                          </FormLabel>
                          <FormControl>
                            <TextareaTropik
                              placeholder="Risk açıklaması"
                              className={`${
                                field.value
                                  ? "bg-green-50 dark:bg-green-900/20"
                                  : "bg-white dark:bg-gray-900"
                              }`}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-6"
                value="cariadres"
              >
                <div className="col-span-full flex items-center gap-3 mb-2">
                  <Users className="!w-5 !h-5 text-orange-600" />
                  <div>
                    <h2 className="font-bold text-xl leading-tight">
                      Çalışan Tablosu
                    </h2>
                    <p className="text-gray-400 text-sm">
                      Çalışan bilgilerini yönetin
                    </p>
                  </div>
                </div>
                {/* Alanlar: örnek */}
                {/* ... Diğer alanlar için aynı sade yapı ... */}
              </TabsContent>
              <TabsContent
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-6"
                value="carinotlar"
              >
                <div className="col-span-full flex items-center gap-3 mb-2">
                  <FileText className="!w-5 !h-5 text-gray-600" />
                  <div>
                    <h2 className="font-bold text-xl leading-tight">Notlar</h2>
                    <p className="text-gray-400 text-sm">
                      Ek açıklama ve notlarınızı girin
                    </p>
                  </div>
                </div>
                {/* Alanlar: örnek */}
                {/* ... Diğer alanlar için aynı sade yapı ... */}
              </TabsContent>
              {/* Form Butonları */}
              <div className="flex justify-end gap-4 pt-6 border-gray-100 dark:border-gray-600">
                <ButonIptal
                  type="button"
                  onClick={() => {
                    form.reset();
                    setValueIl("");
                    setSelectedIlLabel("");
                    setValueIlce("");
                    setIlceler([]);
                    setValueUlke("Türkiye");
                    setSelectedUlkeLabel("Türkiye");
                    setUlkeler([]);
                    setUlkelerYuklendi(false);
                    // Grup kodu state'lerini temizle
                    setSelectedGrupKodu1(null);
                    setSelectedGrupKodu2(null);
                    setSelectedGrupKodu3(null);
                  }}
                >
                  İptal
                </ButonIptal>
                <ButonKaydet
                  type="submit"
                  disabled={createCarilerMutation.isPending}
                >
                  {createCarilerMutation.isPending
                    ? "Kaydediliyor..."
                    : "Kaydet"}
                </ButonKaydet>
              </div>
            </form>
          </Form>
          <GrupKoduModal
            open={grupKoduModalOpen1 !== false}
            onClose={() => setGrupKoduModalOpen1(false)}
            onSaved={() => {
              fetchGrupKodlari();
            }}
            onSelect={(grupKodu) => {
              setSelectedGrupKodu1(grupKodu);
              form.setValue("GrupKodu1ID", String(grupKodu.GrupKodID));
              setGrupKoduModalOpen1(false);
            }}
            sadeceSecimModu={grupKoduModalOpen1 === "secim"}
          />
          <GrupKoduModal
            open={grupKoduModalOpen2 !== false}
            onClose={() => setGrupKoduModalOpen2(false)}
            onSaved={() => {
              fetchGrupKodlari();
            }}
            onSelect={(grupKodu) => {
              setSelectedGrupKodu2(grupKodu);
              form.setValue("GrupKodu2ID", String(grupKodu.GrupKodID));
              setGrupKoduModalOpen2(false);
            }}
            sadeceSecimModu={grupKoduModalOpen2 === "secim"}
          />
          <GrupKoduModal
            open={grupKoduModalOpen3 !== false}
            onClose={() => setGrupKoduModalOpen3(false)}
            onSaved={() => {
              fetchGrupKodlari();
            }}
            onSelect={(grupKodu) => {
              setSelectedGrupKodu3(grupKodu);
              form.setValue("GrupKodu3ID", String(grupKodu.GrupKodID));
              setGrupKoduModalOpen3(false);
            }}
            sadeceSecimModu={grupKoduModalOpen3 === "secim"}
          />
          <GrupKoduModalPlus
            open={grupKoduModalPlusOpen}
            onClose={() => setGrupKoduModalPlusOpen(false)}
          />
          <GrupKoduModalPlus
            open={grupKodu1PlusModalOpen}
            onClose={() => setGrupKodu1PlusModalOpen(false)}
          />
          <GrupKoduModalPlus
            open={grupKodu2PlusModalOpen}
            onClose={() => setGrupKodu2PlusModalOpen(false)}
          />
          <GrupKoduModalPlus
            open={grupKodu3PlusModalOpen}
            onClose={() => setGrupKodu3PlusModalOpen(false)}
          />
        </Tabs>
      </div>
    </PageLayout>
  );
}
