"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const formSchema = z.object({
  CariKod: z.string().optional(),
  CariIsim: z.string().optional(),
  Durum: z.boolean().optional(),
  GrupKodu1ID: z.number().optional(),
  GrupKodu2ID: z.number().optional(),
  GrupKodu3ID: z.number().optional(),
});

interface CariListeSheetProps {
  onSearch: (params: any) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CariListeSheet({ onSearch, open, onOpenChange }: CariListeSheetProps) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      CariKod: "",
      CariIsim: "",
      Durum: true,
      GrupKodu1ID: 0,
      GrupKodu2ID: 0,
      GrupKodu3ID: 0,
    },
  });
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3002";
  const { data: grupKodlari1 = [] } = useQuery({
    queryKey: ["carigrupkodlari"],
    queryFn: async () => {
      const res = await axios.get(`${apiUrl}/api/carigrupkodlari`);
      return res.data;
    },
    enabled: open1,
  });
  const { data: grupKodlari2 = [] } = useQuery({
    queryKey: ["carigrupkodlari"],
    queryFn: async () => {
      const res = await axios.get(`${apiUrl}/api/carigrupkodlari`);
      return res.data;
    },
    enabled: open2,
  });
  const { data: grupKodlari3 = [] } = useQuery({
    queryKey: ["carigrupkodlari"],
    queryFn: async () => {
      const res = await axios.get(`${apiUrl}/api/carigrupkodlari`);
      return res.data;
    },
    enabled: open3,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSearch({
      CariKod: values.CariKod || undefined,
      CariIsim: values.CariIsim || undefined,
      Durum: values.Durum !== undefined ? String(values.Durum) : undefined,
      GrupKodu1ID: values.GrupKodu1ID !== undefined ? String(values.GrupKodu1ID) : undefined,
      GrupKodu2ID: values.GrupKodu2ID !== undefined ? String(values.GrupKodu2ID) : undefined,
      GrupKodu3ID: values.GrupKodu3ID !== undefined ? String(values.GrupKodu3ID) : undefined,
    });
    form.reset();
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="max-w-md w-full p-6 pt-1 bg-white dark:bg-gray-900 shadow-2xl border-0 overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-center text-teal-600 tracking-tight mb-0">Cari Arama</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col gap-y-6 gap-x-2">
              {/* Cari Kodu */}
              <FormField
                control={form.control}
                name="CariKod"
                render={({ field }) => (
                  <FormItem className="gap-2">
                    <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-200">Cari Kodu</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Cari Kodu" className="h-10 border border-slate-200 dark:border-gray-700 focus:border-teal-500 focus:ring-teal-500/20 text-base px-4" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Cari Ünvan */}
              <FormField
                control={form.control}
                name="CariIsim"
                render={({ field }) => (
                  <FormItem className="gap-2">
                    <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-200">Cari Ünvan</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Cari Ünvan" className="h-10 border border-slate-200 dark:border-gray-700 focus:border-teal-500 focus:ring-teal-500/20 text-base px-4" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Cari Durumu */}
              <FormField
                control={form.control}
                name="Durum"
                render={({ field }) => (
                  <FormItem className="col-span-1 md:col-span-2 flex flex-col justify-center h-10 bg-gray-50 dark:bg-gray-800 rounded-md p-4 mt-2">
                    <div className="flex items-center gap-4">
                      <Switch checked={field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-teal-500 scale-125" />
                      <span className={field.value ? "text-green-600 font-semibold text-base" : "text-gray-400 font-semibold text-base"}>
                        {field.value ? "Aktif" : "Pasif"}
                      </span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Diğer alanlar grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-2">
                {/* Grup Kodu 1 */}
                <FormField
                  control={form.control}
                  name="GrupKodu1ID"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-200">Grup Kodu 1</FormLabel>
                      <FormControl>
                        <Select
                          open={open1}
                          onOpenChange={setOpen1}
                          value={field.value !== undefined ? String(field.value) : ""}
                          onValueChange={(val) => field.onChange(Number(val))}
                        >
                          <SelectTrigger className="border w-full border-slate-200 dark:border-gray-700 focus:border-teal-500 focus:ring-teal-500/20 text-base px-4 py-0 !h-10">
                            <SelectValue className="flex items-center" placeholder="Grup Kodu 1" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {grupKodlari1.filter((g: any) => g.Kategori === "CariGrubu").map((g: any) => (
                                <SelectItem key={g.GrupKodID} value={String(g.GrupKodID)}>
                                  {g.GrupIsim}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
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
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-200">Grup Kodu 2</FormLabel>
                      <FormControl>
                        <Select
                          open={open2}
                          onOpenChange={setOpen2}
                          value={field.value !== undefined ? String(field.value) : ""}
                          onValueChange={(val) => field.onChange(Number(val))}
                        >
                          <SelectTrigger className="!h-10 border w-full border-slate-200 dark:border-gray-700 focus:border-teal-500 focus:ring-teal-500/20  text-base px-4">
                            <SelectValue placeholder="Grup Kodu 2" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {grupKodlari2.filter((g: any) => g.Kategori === "CariGrubu").map((g: any) => (
                                <SelectItem key={g.GrupKodID} value={String(g.GrupKodID)}>
                                  {g.GrupIsim}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
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
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-200">Grup Kodu 3</FormLabel>
                      <FormControl>
                        <Select
                          open={open3}
                          onOpenChange={setOpen3}
                          value={field.value !== undefined ? String(field.value) : ""}
                          onValueChange={(val) => field.onChange(Number(val))}
                        >
                          <SelectTrigger className="!h-10 border w-full border-slate-200 dark:border-gray-700 focus:border-teal-500 focus:ring-teal-500/20  text-base px-4">
                            <SelectValue placeholder="Grup Kodu 3" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {grupKodlari3.filter((g: any) => g.Kategori === "CariGrubu").map((g: any) => (
                                <SelectItem key={g.GrupKodID} value={String(g.GrupKodID)}>
                                  {g.GrupIsim}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/* Butonlar */}
            <div className="flex flex-col gap-2 mt-8 w-full">
              <Button type="submit" className="w-full h-15 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-lg transition-all">Ara</Button>
              <div className="flex gap-2 w-full">
                <Button onClick={() => form.reset()} variant="outline" type="button" className="w-1/2 h-15  border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-semibold text-lg">Temizle</Button>
                <SheetClose asChild>
                  <Button variant="outline" className="w-1/2 h-15  border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-semibold text-lg">Kapat</Button>
                </SheetClose>
              </div>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
