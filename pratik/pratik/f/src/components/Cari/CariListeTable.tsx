import { Box, IconButton, Tooltip, Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { MaterialReactTable } from "material-react-table";
import type { MRT_DensityState } from "material-react-table";
import { MRT_Localization_TR } from "material-react-table/locales/tr";
import { useState, useEffect } from "react";
import axios from "axios";

interface CariListeTableProps {
  searchParams: any;
  accessToken: string | null;
  onReset: () => void;
  columnOrder: string[];
  onColumnOrderChange: (order: string[]) => void;
  columnSizing: Record<string, number>;
  onColumnSizingChange: (sizing: Record<string, number>) => void;
  columnVisibility: Record<string, boolean>;
  onColumnVisibilityChange: (visibility: Record<string, boolean>) => void;
  sorting: any[];
  onSortingChange: (sorting: any[]) => void;
  pagination: { pageIndex: number; pageSize: number };
  onPaginationChange: (pagination: { pageIndex: number; pageSize: number }) => void;
  density: MRT_DensityState;
  onDensityChange: (density: MRT_DensityState) => void;
  columnFilters: any[];
  onColumnFiltersChange: (filters: any[]) => void;
  globalFilter: string;
  onGlobalFilterChange: (filter: string) => void;
  onSaveDraft: (settings: any) => void;
}

export default function CariListeTable({
  searchParams,
  accessToken,
  onReset,
  columnOrder,
  onColumnOrderChange,
  columnSizing,
  onColumnSizingChange,
  columnVisibility,
  onColumnVisibilityChange,
  sorting,
  onSortingChange,
  pagination,
  onPaginationChange,
  density,
  onDensityChange,
  columnFilters,
  onColumnFiltersChange,
  globalFilter,
  onGlobalFilterChange,
  onSaveDraft,
}: CariListeTableProps) {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3002";
  const [overrideData, setOverrideData] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);

  // Tablo ayarlarını local state'te de tut (component mount olduğunda prop'tan al)
  const [localColumnOrder, setLocalColumnOrder] = useState<string[]>(columnOrder);
  const [localColumnSizing, setLocalColumnSizing] = useState<Record<string, number>>(columnSizing);
  const [localColumnVisibility, setLocalColumnVisibility] = useState<Record<string, boolean>>(columnVisibility);
  const [localSorting, setLocalSorting] = useState<any[]>(sorting);
  const [localPagination, setLocalPagination] = useState<{ pageIndex: number; pageSize: number }>(pagination);
  const [localDensity, setLocalDensity] = useState<MRT_DensityState>(density);
  const [localColumnFilters, setLocalColumnFilters] = useState<any[]>(columnFilters);
  const [localGlobalFilter, setLocalGlobalFilter] = useState<string>(globalFilter);

  // Prop değişirse local state'i güncelle (örn. parent'tan yeni ayar gelirse)
  useEffect(() => { setLocalColumnOrder(columnOrder); }, [columnOrder]);
  useEffect(() => { setLocalColumnSizing(columnSizing); }, [columnSizing]);
  useEffect(() => { setLocalColumnVisibility(columnVisibility); }, [columnVisibility]);
  useEffect(() => { setLocalSorting(sorting); }, [sorting]);
  useEffect(() => { setLocalPagination(pagination); }, [pagination]);
  useEffect(() => { setLocalDensity(density); }, [density]);
  useEffect(() => { setLocalColumnFilters(columnFilters); }, [columnFilters]);
  useEffect(() => { setLocalGlobalFilter(globalFilter); }, [globalFilter]);

  // Tablo verisini çek
  useEffect(() => {
    let cancelled = false;
    async function fetchData() {
      if (!searchParams) {
        setData([]);
        return;
      }
      setIsLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/api/cariler/filter`, {
          params: searchParams,
          headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
          withCredentials: true,
        });
        if (!cancelled) setData(response.data.data || []);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    fetchData();
    return () => { cancelled = true; };
  }, [searchParams, accessToken]);

  // Kolonlar örnek, ihtiyaca göre düzenlenebilir
  const columns = [
    { accessorKey: "CariKod", header: "Cari Kodu" },
    { accessorKey: "CariIsim", header: "Cari Ünvan" },
    { accessorKey: "Adres", header: "Adres" },
    { accessorKey: "Il", header: "İl" },
    { accessorKey: "Ilce", header: "İlçe" },
    { accessorKey: "Ulke", header: "Ülke" },
    { accessorKey: "VergiDairesi", header: "Vergi Dairesi" },
    { accessorKey: "VergiNumarasi", header: "Vergi Numarası" },
    { accessorKey: "TCKimlikNo", header: "TC Kimlik No" },
    { accessorKey: "PostaKodu", header: "Posta Kodu" },
    { accessorKey: "CariRol", header: "Rol" },
    { accessorKey: "IsTel1", header: "İş Tel" },
    { accessorKey: "CepTel", header: "Cep Tel" },
    { accessorKey: "EMail", header: "E-Mail"},
    { accessorKey: "Faks", header: "Faks" },
    { accessorKey: "Durum", header: "Durum", Cell: ({ cell }: { cell: any }) => cell.getValue() ? "Aktif" : "Pasif" },
    { accessorKey: "GrupKodu1Isim", header: "Grup Kodu 1" },
    { accessorKey: "GrupKodu2Isim", header: "Grup Kodu 2" },
    { accessorKey: "GrupKodu3Isim", header: "Grup Kodu 3" },
    { accessorKey: "Kisitla", header: "Kısıtla" },
    { accessorKey: "Doviz", header: "Döviz" },
    { accessorKey: "DovizTuruID", header: "Döviz Türü" },
    { accessorKey: "Iskonto1", header: "İskonto" },
    { accessorKey: "VadeGunu", header: "Vade Günü" },
    { accessorKey: "FiyatSecilen", header: "Fiyat Seçilen" },
    { accessorKey: "RiskLimiti", header: "Risk Limiti" },
    { accessorKey: "RiskKullan", header: "Risk Kullan" },
    { accessorKey: "KayitTarihi", header: "Kayıt Tarihi", Cell: ({ cell }: { cell: any }) => {
      const value = cell.getValue();
      if (!value) return "";
      const date = new Date(value);
      return isNaN(date.getTime()) ? value : date.toLocaleString("tr-TR", { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
  },
    { accessorKey: "DuzenlemeTarihi", header: "Düzenleme Tarihi" },
    { accessorKey: "WebSite", header: "Web Site" },
    { accessorKey: "DuzenlemeYapanKullanici", header: "Düzenleyen" },
    { accessorKey: "KayitYapanKullanici", header: "Kaydeden" },
    { accessorKey: "Aciklama", header: "Açıklama" },
    { accessorKey: "RiskAciklama", header: "Risk Açıklama" },
    { accessorKey: "KisitlaAciklamasi", header: "Kısıt Açıklaması" },
  ];

  return (
    <Box className="mt-4">
      <Box className="flex justify-between items-center mb-2">
        <Button variant="contained" color="primary" onClick={onReset}>Yeni Arama</Button>
        <Button
          variant="outlined"
          color="success"
          onClick={() => {
            onSaveDraft({
              columnOrder: localColumnOrder,
              columnSizing: localColumnSizing,
              columnVisibility: localColumnVisibility,
              sorting: localSorting,
              pagination: localPagination,
              density: localDensity,
              columnFilters: localColumnFilters,
              globalFilter: localGlobalFilter,
            });
          }}
        >
          Taslağı Kaydet
        </Button>
        <Button
          variant="outlined"
          color="info"
          onClick={async () => {
            try {
              const response = await axios.get(`${apiUrl}/api/ayarlar/parametreler/13`, {
                headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
                withCredentials: true,
              });
              const defaults = response.data?.varsayilan_deger ? JSON.parse(response.data.varsayilan_deger) : {};
              setLocalColumnOrder(defaults.columnOrder || []);
              setLocalColumnSizing(defaults.columnSizing || {});
              setLocalColumnVisibility(defaults.columnVisibility || {});
              setLocalSorting(defaults.sorting || []);
              setLocalPagination(defaults.pagination || { pageIndex: 0, pageSize: 10 });
              setLocalDensity(defaults.density || "comfortable");
              setLocalColumnFilters(defaults.columnFilters || []);
              setLocalGlobalFilter(defaults.globalFilter || "");
              // Parent'a da ilet
              onColumnOrderChange(defaults.columnOrder || []);
              onColumnSizingChange(defaults.columnSizing || {});
              onColumnVisibilityChange(defaults.columnVisibility || {});
              onSortingChange(defaults.sorting || []);
              onPaginationChange(defaults.pagination || { pageIndex: 0, pageSize: 10 });
              onDensityChange(defaults.density || "comfortable");
              onColumnFiltersChange(defaults.columnFilters || []);
              onGlobalFilterChange(defaults.globalFilter || "");
            } catch (err) {
              // Hata yönetimi
              alert("Varsayılan ayarlar alınamadı!");
            }
          }}
          style={{ marginLeft: 8 }}
        >
          Varsayılanı Getir
        </Button>
        <Tooltip title="Yenile">
          <IconButton onClick={async () => {
            const response = await axios.get(`${apiUrl}/api/cariler/filter`, {
              headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
              withCredentials: true,
            });
            setOverrideData(response.data.data || []);
          }}><RefreshIcon /></IconButton>
        </Tooltip>
      </Box>
      <MaterialReactTable
        columns={columns}
        data={overrideData !== null ? overrideData : data}
        localization={MRT_Localization_TR}
        state={{
          isLoading,
          showGlobalFilter: true,
          columnOrder: localColumnOrder,
          columnSizing: localColumnSizing,
          columnVisibility: localColumnVisibility,
          sorting: localSorting,
          pagination: localPagination,
          density: localDensity,
          columnFilters: localColumnFilters,
          globalFilter: localGlobalFilter,
        }}
        enableGlobalFilter={true}
        enableColumnFilters={true}
        enableSorting={true}
        enablePagination={true}
        enableRowSelection={false}
        enableColumnResizing={true}
        enableColumnOrdering={true}
        enableColumnDragging={true}
        enableExpanding={true}
        renderDetailPanel={({ row }) => (
          <Box className="w-full p-6 bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col md:flex-row gap-6">
            {/* Fatura İşlemleri */}
            <div className="flex-1 flex flex-col items-start">
              <div className="text-lg font-semibold mb-2 text-gray-700">fatura işlemleri</div>
              <button
                className="w-full text-left px-4 py-2 mb-2 rounded-lg bg-gray-100 hover:bg-blue-100 transition font-medium text-gray-800"
                onClick={() => console.log('Satış Faturası')}
              >Satış Faturası</button>
              <button
                className="w-full text-left px-4 py-2 rounded-lg bg-gray-100 hover:bg-blue-100 transition font-medium text-gray-800"
                onClick={() => console.log('Alış Faturası')}
              >Alış Faturası</button>
            </div>
            {/* Finansal İşlemler */}
            <div className="flex-1 flex flex-col items-start border-l border-gray-200 pl-6">
              <div className="text-lg font-semibold mb-2 text-gray-700">finansal işlemler</div>
              <button
                className="w-full text-left px-4 py-2 mb-2 rounded-lg bg-gray-100 hover:bg-green-100 transition font-medium text-gray-800"
                onClick={() => console.log('tahsilat')}
              >tahsilat</button>
              <button
                className="w-full text-left px-4 py-2 mb-2 rounded-lg bg-gray-100 hover:bg-green-100 transition font-medium text-gray-800"
                onClick={() => console.log('tediy e')}
              >tediy e</button>
              <button
                className="w-full text-left px-4 py-2 mb-2 rounded-lg bg-gray-100 hover:bg-green-100 transition font-medium text-gray-800"
                onClick={() => console.log('gelen havale')}
              >gelen havale</button>
              <button
                className="w-full text-left px-4 py-2 rounded-lg bg-gray-100 hover:bg-green-100 transition font-medium text-gray-800"
                onClick={() => console.log('giden havale')}
              >giden havale</button>
            </div>
            {/* Raporlar */}
            <div className="flex-1 flex flex-col items-start border-l border-gray-200 pl-6">
              <div className="text-lg font-semibold mb-2 text-gray-700">raporlar</div>
              <button
                className="w-full text-left px-4 py-2 mb-2 rounded-lg bg-gray-100 hover:bg-purple-100 transition font-medium text-gray-800"
                onClick={() => console.log('cari ekstre')}
              >cari ekstre</button>
              <button
                className="w-full text-left px-4 py-2 rounded-lg bg-gray-100 hover:bg-purple-100 transition font-medium text-gray-800"
                onClick={() => console.log('fatura raporu')}
              >fatura raporu</button>
            </div>
          </Box>
        )}
        // renderRowActions kaldırıldı
        onColumnOrderChange={updaterOrValue => {
          let nextOrder = typeof updaterOrValue === 'function' ? updaterOrValue(localColumnOrder) : updaterOrValue;
          setLocalColumnOrder(nextOrder);
          onColumnOrderChange(nextOrder);
        }}
        onColumnSizingChange={updaterOrValue => {
          let nextSizing = typeof updaterOrValue === 'function' ? updaterOrValue(localColumnSizing) : updaterOrValue;
          setLocalColumnSizing(nextSizing);
          onColumnSizingChange(nextSizing);
        }}
        onColumnVisibilityChange={updaterOrValue => {
          let nextVisibility = typeof updaterOrValue === 'function' ? updaterOrValue(localColumnVisibility) : updaterOrValue;
          setLocalColumnVisibility(nextVisibility);
          onColumnVisibilityChange(nextVisibility);
        }}
        onSortingChange={updaterOrValue => {
          let nextSorting = typeof updaterOrValue === 'function' ? updaterOrValue(localSorting) : updaterOrValue;
          setLocalSorting(nextSorting);
          onSortingChange(nextSorting);
        }}
        onPaginationChange={updaterOrValue => {
          let nextPagination = typeof updaterOrValue === 'function' ? updaterOrValue(localPagination) : updaterOrValue;
          setLocalPagination(nextPagination);
          onPaginationChange(nextPagination);
        }}
        onDensityChange={updaterOrValue => {
          let nextDensity = typeof updaterOrValue === 'function' ? updaterOrValue(localDensity) : updaterOrValue;
          setLocalDensity(nextDensity);
          onDensityChange(nextDensity);
        }}
        onColumnFiltersChange={updaterOrValue => {
          let nextFilters = typeof updaterOrValue === 'function' ? updaterOrValue(localColumnFilters) : updaterOrValue;
          setLocalColumnFilters(nextFilters);
          onColumnFiltersChange(nextFilters);
        }}
        onGlobalFilterChange={updaterOrValue => {
          let nextGlobalFilter = typeof updaterOrValue === 'function' ? updaterOrValue(localGlobalFilter) : updaterOrValue;
          setLocalGlobalFilter(nextGlobalFilter);
          onGlobalFilterChange(nextGlobalFilter);
        }}
        muiTableContainerProps={{ sx: { minHeight: 300 } }}
        muiTableBodyRowProps={{ hover: true }}
        muiTableHeadCellProps={{ sx: { fontWeight: 'bold' } }}
        enableStickyHeader={true}
      />
      {/* Uyarı sadece veri yoksa ve arama yapılmamışsa gösterilecek */}
      {(!searchParams && (overrideData?.length === 0 || (!overrideData && data.length === 0))) && (
        <Box className="text-center text-gray-400 mt-8">Arama yapmadan tablo verisi gösterilmez.</Box>
      )}
    </Box>
  );
}
