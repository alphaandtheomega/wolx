import  { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { InputStd } from "@/components/ui/tropikui/inputstd"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { ButonKaydet, ButonIptal } from "@/components/ui/tropikui/ButtonLib"

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from "@/components/ui/alert-dialog"
import PageLayout from "@/components/PageLayout"

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3002"

// Formun şeması (dilersen zod ile de ekleyebilirsin)
const defaultValues = {
  otomatikKod: true,
  baslangicNo: 1,
  baslangicEki: "CR"
}

const PARAMETRE_IDLERI = {
  baslangicEki: 5,
  baslangicNo: 6,
  otomatikKod: 7
};

export default function Ayarlar() {
  const form = useForm({
    defaultValues
  })
  const { accessToken } = useAuth();

  // Parametreleri backend'den çek
  const { data } = useQuery({
    queryKey: ["parametreler"],
    queryFn: async () => {
      const res = await axios.get(`${apiUrl}/api/ayarlar/parametreler`)
      return res.data
    }
  })

  useEffect(() => {
    if (Array.isArray(data)) {
      const baslangicNoParam = data.find((p: any) => p.parametreadi === "Cari Kodu Başlangıç No")
      const baslangicEkiParam = data.find((p: any) => p.parametreadi === "Cari Kodu Başlangıç Eki")
      const otomatikKodParam = data.find((p: any) => p.parametreadi === "Cari Otomatik Kod")
      form.reset({
        otomatikKod: (otomatikKodParam?.deger === "E"),
        baslangicNo: baslangicNoParam?.deger || "1",
        baslangicEki: baslangicEkiParam?.deger || "CR"
      })
    }
  }, [data])

  // Mutation: Ayarları kaydet
  const mutation = useMutation({
    mutationFn: async (values: any) => {
      await axios.post(`${apiUrl}/api/ayarlar/parametreler`, {
        parametreid: PARAMETRE_IDLERI.baslangicEki,
        deger: values.baslangicEki
      }, accessToken ? { headers: { Authorization: `Bearer ${accessToken}` }, withCredentials: true } : { withCredentials: true })
      await axios.post(`${apiUrl}/api/ayarlar/parametreler`, {
        parametreid: PARAMETRE_IDLERI.baslangicNo,
        deger: values.baslangicNo
      }, accessToken ? { headers: { Authorization: `Bearer ${accessToken}` }, withCredentials: true } : { withCredentials: true })
      await axios.post(`${apiUrl}/api/ayarlar/parametreler`, {
        parametreid: PARAMETRE_IDLERI.otomatikKod,
        deger: values.otomatikKod ? "E" : "H"
      }, accessToken ? { headers: { Authorization: `Bearer ${accessToken}` }, withCredentials: true } : { withCredentials: true })
    },
    onSuccess: () => {
      toast.success("Ayarlar kaydedildi")
    },
    onError: () => {
      toast.error("Ayarlar kaydedilemedi")
    }
  })

  function onSubmit(values: any) {
    console.log('KAYDET ile giden veri:', values);
    mutation.mutate(values)
  }

  

  const handleVarsayilanaDon = async () => {
    const res = await axios.get(`${apiUrl}/api/ayarlar/parametreler`);
    const data = res.data;
    const baslangicNoParam = data.find((p: any) => p.parametreadi === "Cari Kodu Başlangıç No");
    const baslangicEkiParam = data.find((p: any) => p.parametreadi === "Cari Kodu Başlangıç Eki");
    const otomatikKodParam = data.find((p: any) => p.parametreadi === "Cari Otomatik Kod");
    form.reset({
      otomatikKod: (otomatikKodParam?.varsayilan_deger === "E"),
      baslangicNo: baslangicNoParam?.varsayilan_deger || "1",
      baslangicEki: baslangicEkiParam?.varsayilan_deger || "CR"
    });
  };

  return (
    <PageLayout>
    
        <Card className="border-0 shadow-none">
          <CardContent >
            <div className="flex  items-center gap-4 mb-6 pb-6  dark:border-gray-600">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                  Genel Ayarlar
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Hesap ve sistem ayarlarını buradan düzenleyebilirsiniz.
                </p>
              </div>
            </div>
            <Tabs defaultValue="cari">
              <TabsList>
                <TabsTrigger value="cari">Cari Modül</TabsTrigger>
                <TabsTrigger value="stok">Stok Modül</TabsTrigger>
              </TabsList>
              <TabsContent value="cari">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="border border-border rounded-lg shadow-sm bg-background dark:bg-background p-4 flex flex-col gap-4 max-w-md">
                    <div className="font-semibold text-gray-700 dark:text-gray-200 border-b pb-2 mb-2">Cari Kodu</div>
                    <FormField
                      control={form.control}
                      name="otomatikKod"
                      render={({ field }) => (
                        <FormItem className="flex items-center gap-2 mb-2">
                          <FormControl>
                            <Switch id="otomatik-kod" checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <FormLabel htmlFor="otomatik-kod" className="font-medium text-gray-700 dark:text-gray-200 cursor-pointer">
                            Cari kodunu otomatik ver
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                      <FormField
                        control={form.control}
                        name="baslangicEki"
                        render={({ field }) => (
                          <FormItem className="flex flex-col gap-1 w-full md:w-1/2">
                            <FormLabel htmlFor="baslangic-eki" className="text-sm text-gray-700 dark:text-gray-200">Başlangıç Eki</FormLabel>
                            <FormControl>
                              <InputStd id="baslangic-eki" type="text" {...field} className="h-10 w-24" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="baslangicNo"
                        render={({ field }) => (
                          <FormItem className="flex flex-col gap-1 w-full md:w-1/2">
                            <FormLabel htmlFor="baslangic-no" className="text-sm text-gray-700 dark:text-gray-200">Başlangıç No</FormLabel>
                            <FormControl>
                              <InputStd id="baslangic-no" type="number" {...field} className="h-10" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex justify-end gap-4 pt-6 border-t border-gray-100 dark:border-gray-600">
                      <ButonIptal  type="button"  onClick={() => form.reset()}>İptal</ButonIptal>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button  type="button" >Varsayılana Dön</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Varsayılana Dön</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tüm ayarlarınız varsayılan ayarlara sıfırlanacak, kabul ediyor musunuz?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Hayır</AlertDialogCancel>
                            <AlertDialogAction asChild>
                              <Button type="button"  onClick={handleVarsayilanaDon}>Evet</Button>
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <ButonKaydet  type="submit" disabled={mutation.isPending}>{mutation.isPending ? "Kaydediliyor..." : "Kaydet"}</ButonKaydet>
                    </div>
                  </form>
                </Form>
              </TabsContent>
              <TabsContent value="stok">
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="tabs-demo-current">Current password</Label>
                    <InputStd id="tabs-demo-current" type="password" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="tabs-demo-new">New password</Label>
                    <InputStd id="tabs-demo-new" type="password" />
                  </div>
                  <div className="flex justify-end gap-4 pt-6 border-t border-gray-100 dark:border-gray-600">
                    <Button type="button" >
                      İptal
                    </Button>
                    <Button >Kaydet</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
    
    </PageLayout>
  )
}
