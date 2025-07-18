// "use client";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { InputStd } from "@/components/ui/tropikui/inputstd";
// import { InputNumeric } from "@/components/ui/tropikui/inputnumeric";
// import { InputSelect } from "@/components/ui/tropikui/inputselect";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import axios from "axios";
// import { AxiosError } from "axios";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { useAuth } from "@/context/auth-context";
// import { Card, CardContent } from "@/components/ui/card";
// import PageLayout from "@/components/PageLayout";
// import { useState, useEffect } from "react";
// import ReactDatePicker from "react-datepicker";
// import { tr } from "date-fns/locale";
// import "react-datepicker/dist/react-datepicker.css";
// import { InputCalendar } from "@/components/ui/tropikui/inputcalendar";

// interface ApiError {
//   message: string;
// }

// interface CariHesap {
//   id: number;
//   cariKodu: string;
//   cariAdi: string;
// }

// const formSchema = z.object({
//   gonderenCariId: z.number().min(1, "Gönderen cari hesap seçiniz"),
//   aliciCariId: z.number().min(1, "Alıcı cari hesap seçiniz"),
//   tutar: z.number().min(0.01, "Tutar 0'dan büyük olmalı"),
//   aciklama: z.string().min(1, "Açıklama gerekli"),
//   islemTarihi: z.string().min(1, "İşlem tarihi gerekli"),
// });

// export default function VirmanHareketleri() {
//   const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3002";
//   const { accessToken } = useAuth();
//   const [cariHesaplar, setCariHesaplar] = useState<CariHesap[]>([]);

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       gonderenCariId: 0,
//       aliciCariId: 0,
//       tutar: 0,
//       aciklama: "",
//       islemTarihi: new Date().toISOString().split('T')[0],
//     },
//   });

//   // Cari hesapları getir
//   const { data: cariData, isLoading: cariLoading } = useQuery({
//     queryKey: ['cariHesaplar'],
//     queryFn: async () => {
//       const response = await axios.get(`${apiUrl}/api/cari`, {
//         headers: { Authorization: `Bearer ${accessToken}` },
//         withCredentials: true,
//       });
//       return response.data;
//     },
//     enabled: !!accessToken,
//   });

//   useEffect(() => {
//     if (cariData) {
//       setCariHesaplar(cariData);
//     }
//   }, [cariData]);

//   const createVirmanMutation = useMutation({
//     mutationFn: (virmanData: z.infer<typeof formSchema>) => {
//       return axios.post(
//         `${apiUrl}/api/virman`,
//         virmanData,
//         accessToken
//           ? {
//               headers: { Authorization: `Bearer ${accessToken}` },
//               withCredentials: true,
//             }
//           : { withCredentials: true }
//       );
//     },
//     onSuccess: () => {
//       form.reset({
//         gonderenCariId: 0,
//         aliciCariId: 0,
//         tutar: 0,
//         aciklama: "",
//         islemTarihi: new Date().toISOString().split('T')[0],
//       });
//       toast.success("Virman hareketi başarıyla kaydedildi", {
//         description: "İşlem başarıyla tamamlandı",
//         style: {
//           backgroundColor: "#dcfce7",
//           border: "1px solid #86efac",
//           color: "#166534",
//         },
//       });
//     },
//     onError: (error: AxiosError<ApiError>) => {
//       toast.error("Hata", {
//         description:
//           error.response?.data?.message ||
//           "Virman hareketi kaydedilirken bir hata oluştu",
//         style: {
//           backgroundColor: "#fee2e2",
//           border: "1px solid #fca5a5",
//           color: "#991b1b",
//         },
//       });
//     },
//   });

//   function onSubmit(values: z.infer<typeof formSchema>) {
//     if (values.gonderenCariId === values.aliciCariId) {
//       toast.error("Hata", {
//         description: "Gönderen ve alıcı cari hesaplar aynı olamaz",
//         style: {
//           backgroundColor: "#fee2e2",
//           border: "1px solid #fca5a5",
//           color: "#991b1b",
//         },
//       });
//       return;
//     }
//     createVirmanMutation.mutate(values);
//   }

//   return (
//     <PageLayout>
//       <Card className="overflow-hidden p-0 border-0 shadow-none max-w-2xl">
//         <CardContent className="p-6 md:p-8 bg-background dark:bg-background backdrop-blur-sm">
//           {/* Header - İkon ve Başlık */}
//           <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-600 mb-6">
//             <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl">
//               <svg
//                 className="w-6 h-6 text-white"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
//                 />
//               </svg>
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold tracking-tight text-foreground leading-tight">
//                 Virman Hareketi
//               </h1>
//               <p className="text-gray-400 dark:text-gray-400 text-sm mt-0.5 font-normal">
//                 Cari hesaplar arası virman işlemi yapın
//               </p>
//             </div>
//           </div>

//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(onSubmit)}
//               className="space-y-5"
//               autoComplete="off"
//             >
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                 {/* Gönderen Cari Hesap */}
//                 <FormField
//                   control={form.control}
//                   name="gonderenCariId"
//                   render={({ field }) => (
//                     <FormItem className="space-y-1.5">
//                       <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-200">
//                         Gönderen Cari Hesap
//                       </FormLabel>
//                       <FormControl>
//                         <InputSelect
//                           placeholder="Gönderen hesap seçin"
//                           className="h-12 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
//                           options={cariHesaplar.map(cari => ({
//                             value: cari.id.toString(),
//                             label: `${cari.cariKodu} - ${cari.cariAdi}`
//                           }))}
//                           value={field.value.toString()}
//                           onChange={(value) => field.onChange(parseInt(value))}
//                           disabled={cariLoading}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {/* Alıcı Cari Hesap */}
//                 <FormField
//                   control={form.control}
//                   name="aliciCariId"
//                   render={({ field }) => (
//                     <FormItem className="space-y-1.5">
//                       <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-200">
//                         Alıcı Cari Hesap
//                       </FormLabel>
//                       <FormControl>
//                         <InputSelect
//                           placeholder="Alıcı hesap seçin"
//                           className="h-12 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
//                           options={cariHesaplar.map(cari => ({
//                             value: cari.id.toString(),
//                             label: `${cari.cariKodu} - ${cari.cariAdi}`
//                           }))}
//                           value={field.value.toString()}
//                           onChange={(value) => field.onChange(parseInt(value))}
//                           disabled={cariLoading}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {/* Tutar */}
//                 <FormField
//                   control={form.control}
//                   name="tutar"
//                   render={({ field }) => (
//                     <FormItem className="space-y-1.5">
//                       <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-200">
//                         Tutar
//                       </FormLabel>
//                       <FormControl>
//                         <InputNumeric
//                           placeholder="0.00"
//                           className="h-12 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
//                           value={field.value}
//                           onChange={(value) => field.onChange(value)}
//                           decimalScale={2}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {/* İşlem Tarihi */}
//                 <FormField
//                   control={form.control}
//                   name="islemTarihi"
//                   render={({ field }) => (
//                     <FormItem className="space-y-1.5">
//                       <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-200">
//                         İşlem Tarihi
//                       </FormLabel>
//                       <FormControl>
//                         <ReactDatePicker
//                           selected={field.value ? new Date(field.value) : null}
//                           onChange={date => {
//                             field.onChange(date ? date.toISOString().split("T")[0] : "");
//                           }}
//                           locale={tr}
//                           dateFormat="dd.MM.yyyy"
//                           customInput={<InputCalendar />}
//                           placeholderText="gg.aa.yyyy"
//                           showPopperArrow={false}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               {/* Açıklama */}
//               <FormField
//                 control={form.control}
//                 name="aciklama"
//                 render={({ field }) => (
//                   <FormItem className="space-y-1.5">
//                     <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-200">
//                       Açıklama
//                     </FormLabel>
//                     <FormControl>
//                       <InputStd
//                         type="text"
//                         placeholder="Virman açıklaması"
//                         className="h-12 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <div className="flex flex-col sm:flex-row justify-end gap-3 pt-5 border-t border-gray-100 dark:border-gray-600">
//                 <Button
//                   type="button"
//                   onClick={() => form.reset({
//                     gonderenCariId: 0,
//                     aliciCariId: 0,
//                     tutar: 0,
//                     aciklama: "",
//                     islemTarihi: new Date().toISOString().split('T')[0],
//                   })}
//                   variant="outline"
//                   className="h-12 px-6 rounded-lg border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
//                 >
//                   İptal
//                 </Button>
//                 <Button
//                   type="submit"
//                   disabled={createVirmanMutation.isPending || cariLoading}
//                   className="h-12 px-6 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-foreground font-medium transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
//                 >
//                   {createVirmanMutation.isPending ? "Kaydediliyor..." : "Virman Yap"}
//                 </Button>
//               </div>
//             </form>
//           </Form>
//         </CardContent>
//       </Card>
//     </PageLayout>
//   );
// }
