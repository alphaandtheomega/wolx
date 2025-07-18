"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ButonEkle, ButonIptal, ButonKaydet } from "@/components/ui/tropikui/ButtonLib";
import { toast } from "sonner";
import axios from "axios";
import { AxiosError } from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/auth-context";
import PageLayout from "@/components/PageLayout";
import CariSecCombo from "@/components/PaylasilanComponentler/CariSecCombo";
import Tarih from "@/components/PaylasilanComponentler/Tarih";
import BelgeNo from "@/components/PaylasilanComponentler/BelgeNo";
import {
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/tropikui/selecttropik";
import { SelectItem } from "@/components/ui/tropikui/selecttropik";
import { SelectTropik } from "@/components/ui/tropikui/selecttropik";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { InputNumeric } from "@/components/ui/tropikui/inputnumeric";
import { TextareaTropik } from "@/components/ui/tropikui/textareatropik";
import { Switch } from "@/components/ui/switch";
import { InputSaat } from "@/components/ui/tropikui/inputsaat";
import CariHareketTable from "@/components/Cari/CariHareketTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Calendar, 
  FileText, 
  DollarSign, 
  Clock,
  Plus,
} from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";

interface ApiError {
  message: string;
}

const formSchema = z.object({
  CariID: z.string().min(1, "Cari ünvanı gerekli"),
  Tarih: z.string().min(1, "Cari tarih gerekli"),
  VadeTarihi: z.string().min(1, "Cari vade tarihi gerekli"),
  BelgeNo: z.string().min(1, "Cari belge no gerekli"),
  HareketTipi: z.string().min(1, "Hareket tipi gerekli"),
  BorcAlacak: z.enum(["B", "A"], { required_error: "Borç/Alacak seçilmeli" }),
  Tutar: z.number().min(1, "Tutar gerekli"),
  Aciklama: z.string().optional(),
  DovizKullan: z.boolean().optional(),
  DovizID: z.number().min(1, "Döviz türü gerekli"),
  Saat: z.string().min(1, "Saat gerekli"),
});

const BELGENO_PARAMETRE_ID = 11; // İleride değiştirilebilir

// Anlık tarih ve saat değerlerini alan yardımcı fonksiyonlar
const getCurrentDate = () => format(new Date(), 'yyyy-MM-dd');
const getCurrentTime = () => format(new Date(), 'HH:mm');

export default function CariHareketler() {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3002";
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();

  // Seçili cari bilgisini tut
  const [selectedCariId, setSelectedCariId] = useState<string>("");
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      CariID: "",
      Tarih: getCurrentDate(),
      VadeTarihi: getCurrentDate(),
      BelgeNo: "",
      HareketTipi: "Evrak",
      BorcAlacak: "B",
      Tutar: undefined,
      Aciklama: "",
      DovizKullan: false,
      DovizID: 1,
      Saat: getCurrentTime(),
    },
  });

  // Form resetleme fonksiyonu
  const resetForm = () => {
    form.reset({
      CariID: "",
      Tarih: getCurrentDate(),
      VadeTarihi: getCurrentDate(),
      BelgeNo: "",
      HareketTipi: "Evrak",
      BorcAlacak: "B",
      Tutar: undefined,
      Aciklama: "",
      DovizKullan: false,
      DovizID: 1,
      Saat: getCurrentTime(),
    });
    setSelectedCariId("");
  };

  // Özelleştirilmiş reset fonksiyonu
  const resetForm2 = () => {
    const currentCariId = form.getValues("CariID");
    form.reset({
      CariID: currentCariId, // Seçili cari korunacak
      Tarih: getCurrentDate(),
      VadeTarihi: getCurrentDate(),
      BelgeNo: "",
      HareketTipi: "Evrak",
      BorcAlacak: "B",
      Tutar: undefined,
      Aciklama: "",
      DovizKullan: false,
      DovizID: 1,
      Saat: getCurrentTime(),
    });
  };

  const createModulMutation = useMutation({
    mutationFn: (ModulData: z.infer<typeof formSchema>) => {
      return axios.post(
        `${apiUrl}/api/carihareketleri`,
        ModulData,
        accessToken
          ? {
              headers: { Authorization: `Bearer ${accessToken}` },
              withCredentials: true,
            }
          : { withCredentials: true }
      );
    },
    onSuccess: () => {
      // resetForm(); // Artık kaydetme sonrası form temizlenmeyecek
      // Cari hareketleri listesini güncelle
      queryClient.invalidateQueries({ queryKey: ['carihareketleri'] });
      toast.success("Cari hareketi başarıyla eklendi", {
        description: "İşlem başarıyla tamamlandı",
        style: {
          backgroundColor: "#dcfce7",
          border: "1px solid #86efac",
          color: "#166534",
        },
      });
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error("Hata", {
        description:
          error.response?.data?.message || "Cari hareketi eklenirken bir hata oluştu",
        style: {
          backgroundColor: "#fee2e2",
          border: "1px solid #fca5a5",
          color: "#991b1b",
        },
      });
    },
  });

  async function updateParametreIfNeeded(belgeNo: string, parametreId: number) {
    try {
      const resp = await axios.get(
        `${apiUrl}/api/ayarlar/parametreler/${parametreId}`,
        accessToken
          ? {
              headers: { Authorization: `Bearer ${accessToken}` },
              withCredentials: true,
            }
          : { withCredentials: true }
      );
      const deger = resp.data?.deger?.toString?.() ?? "";
      if (belgeNo === deger) {
        if (/^\d+$/.test(deger)) {
          const yeniDeger = (parseInt(deger, 10) + 1)
            .toString()
            .padStart(deger.length, "0");
          await axios.post(
            `${apiUrl}/api/ayarlar/parametreler`,
            {
              parametreid: parametreId,
              deger: yeniDeger,
            },
            accessToken
              ? {
                  headers: { Authorization: `Bearer ${accessToken}` },
                  withCredentials: true,
                }
              : { withCredentials: true }
          );
        }
      }
    } catch (err) {
      // Hata olursa sessiz geç
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let payload: any = { ...values };

    // Tarih ve saat bilgilerini birleştir
    if (values.Tarih && values.Saat) {
      const tarihSaat = `${values.Tarih}T${values.Saat}:00`;
      payload.Tarih = tarihSaat;
    }

    if (values.DovizKullan) {
      payload.Borc = 0;
      payload.Alacak = 0;
      payload.DovizBorc = values.BorcAlacak === "B" ? values.Tutar : 0;
      payload.DovizAlacak = values.BorcAlacak === "A" ? values.Tutar : 0;
    } else {
      payload.Borc = values.BorcAlacak === "B" ? values.Tutar : 0;
      payload.Alacak = values.BorcAlacak === "A" ? values.Tutar : 0;
      payload.DovizBorc = 0;
      payload.DovizAlacak = 0;
    }

    delete payload.Tutar;
    delete payload.Saat;

    if (editMode && editData) {
      // Edit modda ise update
      try {
        await axios.put(
          `${apiUrl}/api/carihareketleri/${editData.CariHareketleriID}`,
          payload,
          accessToken
            ? {
                headers: { Authorization: `Bearer ${accessToken}` },
                withCredentials: true,
              }
            : { withCredentials: true }
        );
        setEditMode(false);
        setEditData(null);
        queryClient.invalidateQueries({ queryKey: ['carihareketleri'] });
        toast.success("Kayıt başarıyla güncellendi");
      } catch (error: any) {
        toast.error("Güncelleme hatası", {
          description: error?.response?.data?.message || "Kayıt güncellenemedi",
        });
      }
      return;
    }

    // Edit modda değilse, aynı BelgeNo ve CariID ile kayıt var mı kontrol et
    try {
      const checkRes = await axios.get(
        `${apiUrl}/api/carihareketleri?cariId=${values.CariID}`,
        accessToken
          ? {
              headers: { Authorization: `Bearer ${accessToken}` },
              withCredentials: true,
            }
          : { withCredentials: true }
      );
      const existing = checkRes.data.find((item: any) => item.BelgeNo === values.BelgeNo);
      if (existing) {
        // Kayıt varsa update
        await axios.put(
          `${apiUrl}/api/carihareketleri/${existing.CariHareketleriID}`,
          payload,
          accessToken
            ? {
                headers: { Authorization: `Bearer ${accessToken}` },
                withCredentials: true,
              }
            : { withCredentials: true }
        );
        queryClient.invalidateQueries({ queryKey: ['carihareketleri'] });
        toast.success("Kayıt başarıyla güncellendi");
      } else {
        // Kayıt yoksa post
        updateParametreIfNeeded(values.BelgeNo, BELGENO_PARAMETRE_ID).finally(
          () => {
            createModulMutation.mutate(payload);
          }
        );
      }
    } catch (error: any) {
      toast.error("Kayıt kontrol hatası", {
        description: error?.response?.data?.message || "Kayıt kontrolü sırasında hata oluştu",
      });
    }
  }

  // Tablo satırına çift tıklanınca formu doldur
  const handleRowDoubleClick = (row: any) => {
    setEditMode(true);
    setEditData(row);
    // Formu doldur
    const tutarValue = row.BorcAlacak === "B" ? row.Borc : row.Alacak;
    let parsedTutar = tutarValue;
    if (typeof tutarValue === "string") {
      parsedTutar = parseFloat(tutarValue.replace(",", "."));
    }
    form.reset({
      CariID: row.CariID?.toString() || "",
      Tarih: row.Tarih ? row.Tarih.slice(0, 10) : getCurrentDate(),
      VadeTarihi: row.VadeTarihi ? row.VadeTarihi.slice(0, 10) : getCurrentDate(),
      BelgeNo: row.BelgeNo || "",
      HareketTipi: row.HareketTipi || "Evrak",
      BorcAlacak: row.BorcAlacak || "B",
      Tutar: parsedTutar ?? undefined,
      Aciklama: row.Aciklama || "",
      DovizKullan: (Number(row.DovizBorc) > 0 || Number(row.DovizAlacak) > 0),
      DovizID: row.DovizID || 1,
      Saat: getCurrentTime(),
    });
    setSelectedCariId(row.CariID?.toString() || "");
  };

  return (
    <PageLayout>
       <div className="w-full px-2 sm:px-1 flex flex-col gap-8">
        {/* Üstte Form */}
        <Card className="p-0 border-0 shadow-none bg-transparent rounded-none">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <Plus className="w-5 h-5 text-blue-600" />
              Yeni Cari Hareket Ekle
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Cari Seçimi */}
                <FormField
                  control={form.control}
                  name="CariID"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Cari Ünvanı</FormLabel>
                      <FormControl>
                        <CariSecCombo
                          value={field.value}
                          onChange={(val) => {
                            field.onChange(val);
                            setSelectedCariId(val);
                          }}
                          label=""
                          placeholder="Cari seçin..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Tarih, Vade Tarihi ve Saat */}
                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="Tarih"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          İşlem Tarihi
                        </FormLabel>
                        <FormControl>
                                                       <Tarih
                             value={field.value}
                             onChange={field.onChange}
                           />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="VadeTarihi"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Vade Tarihi
                        </FormLabel>
                        <FormControl>
                                                       <Tarih
                             value={field.value}
                             onChange={field.onChange}
                           />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="Saat"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Saat
                        </FormLabel>
                        <FormControl>
                          <InputSaat
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Saat"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Belge No ve Hareket Tipi */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="BelgeNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          Belge No
                        </FormLabel>
                        <FormControl>
                                                       <BelgeNo
                             value={field.value}
                             onChange={field.onChange}
                           />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="HareketTipi"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Hareket Tipi</FormLabel>
                        <SelectTropik value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Hareket tipi seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="Evrak">Evrak</SelectItem>
                              <SelectItem value="Banka">Banka</SelectItem>
                              <SelectItem value="Pos">Pos</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </SelectTropik>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Borç/Alacak Seçimi */}
                <FormField
                  control={form.control}
                  name="BorcAlacak"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">İşlem Türü</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="B" id="borc" />
                            <Label htmlFor="borc" className="text-sm font-medium">Borç</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="A" id="alacak" />
                            <Label htmlFor="alacak" className="text-sm font-medium">Alacak</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Tutar */}
                <FormField
                  control={form.control}
                  name="Tutar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        Tutar
                      </FormLabel>
                      <FormControl>
                        <InputNumeric
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="0.00"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Döviz Kullanımı */}
                <FormField
                  control={form.control}
                  name="DovizKullan"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-sm font-medium">Döviz Kullan</FormLabel>
                        <div className="text-sm text-gray-500">
                          İşlemi döviz cinsinden yap
                        </div>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Döviz Türü */}
                <FormField
                  control={form.control}
                  name="DovizID"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Döviz Türü</FormLabel>
                      <SelectTropik value={field.value?.toString()} onValueChange={(value) => field.onChange(parseInt(value))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Döviz seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="1">TL</SelectItem>
                            <SelectItem value="2">USD</SelectItem>
                            <SelectItem value="3">EUR</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </SelectTropik>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Açıklama */}
                <FormField
                  control={form.control}
                  name="Aciklama"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Açıklama</FormLabel>
                      <FormControl>
                        <TextareaTropik
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Açıklama girin..."
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Butonlar */}
                <div className="flex gap-3 pt-4">
                <ButonEkle
                    type="button"
                    onClick={resetForm2}
                    
                  >
                    Ekle
                  </ButonEkle>
                  <ButonIptal
                    type="button"
                    onClick={resetForm}
                    
                  >
                    İptal
                  </ButonIptal>
                  <ButonKaydet
                    type="submit"
                    disabled={createModulMutation.isPending}
                    
                  >
                    {createModulMutation.isPending ? "Kaydediliyor..." : "Kaydet"}
                  </ButonKaydet>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Altta Tablo */}
        <Card className="p-0 border-0 shadow-none bg-transparent rounded-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">
              Cari Hareket Listesi
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <CariHareketTable cariId={selectedCariId} onRowDoubleClick={handleRowDoubleClick} />
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
