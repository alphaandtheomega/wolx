import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { CariListeSheet } from '@/components/Cari/CariListeSheet';
import CariListeTable from '@/components/Cari/CariListeTable';
import PageLayout from '@/components/PageLayout';
import { useAuth } from '@/context/auth-context';
import type { MRT_DensityState } from 'material-react-table';
import { toast } from 'sonner';

function CariListe() {
  const [isSheetOpen, setIsSheetOpen] = useState(true);
  const [searchParams, setSearchParams] = useState<any | null>(null);
  const { accessToken } = useAuth();
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3002';

  // Tablo ayarları state'i
  const [tableSettings, setTableSettings] = useState<any | null>(null);

  // Tablo ayarlarını backend'den çek
  const { isLoading: isSettingsLoading, isError: isSettingsError, data: fetchedSettings } = useQuery({
    queryKey: ['cariTableSettings', accessToken],
    queryFn: async () => {
      const res = await axios.get(`${apiUrl}/api/ayarlar/parametreler/13`,
        accessToken
          ? { headers: { Authorization: `Bearer ${accessToken}` }, withCredentials: true }
          : { withCredentials: true }
      );
      if (!res.data?.deger) throw new Error('Tablo ayarları bulunamadı!');
      return JSON.parse(res.data.deger);
    },
    enabled: !!accessToken,
  });

  useEffect(() => {
    if (fetchedSettings) setTableSettings(fetchedSettings);
  }, [fetchedSettings]);

  // Tablo ayarlarını kaydetmek için mutation
  const saveSettingsMutation = useMutation({
    mutationFn: async (settings: any) => {
      await axios.post(
        `${apiUrl}/api/ayarlar/parametreler`,
        {
          parametreid: 13,
          deger: JSON.stringify(settings),
        },
        accessToken
          ? { headers: { Authorization: `Bearer ${accessToken}` }, withCredentials: true }
          : { withCredentials: true }
      );
    },
  });

  // Tablo ayarları değiştiğinde hem state'i hem DB'yi güncelle
  const handleTableSettingsChange = (newSettings: any) => {
    setTableSettings((prev: any) => ({ ...prev, ...newSettings }));
    saveSettingsMutation.mutate({ ...tableSettings, ...newSettings });
  };

  // Taslağı kaydet fonksiyonu
  const handleSaveDraft = (settings: any) => {
    saveSettingsMutation.mutate(settings, {
      onSuccess: () => toast.success('Tablo ayarları başarıyla kaydedildi!'),
      onError: () => toast.error('Tablo ayarları kaydedilemedi!'),
    });
  };

  const handleSearch = (params: any) => {
    setSearchParams(params);
    setIsSheetOpen(false);
  };

  const handleReset = () => {
    setSearchParams(null);
    setIsSheetOpen(true);
  };

  // Ayarlar gelmeden tabloyu render etme, hata varsa göster
  if (isSettingsLoading) {
    return <PageLayout><div className="text-center text-gray-400 mt-8">Tablo ayarları yükleniyor...</div></PageLayout>;
  }
  if (isSettingsError || !tableSettings) {
    return <PageLayout><div className="text-center text-red-500 mt-8">Tablo ayarları yüklenemedi. Lütfen sistem yöneticisine başvurun.</div></PageLayout>;
  }

  return (
    <PageLayout>
      <CariListeSheet
        onSearch={handleSearch}
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      />
      <CariListeTable
        searchParams={searchParams}
        accessToken={accessToken}
        onReset={handleReset}
        columnOrder={tableSettings.columnOrder}
        onColumnOrderChange={order => handleTableSettingsChange({ columnOrder: order })}
        columnSizing={tableSettings.columnSizing}
        onColumnSizingChange={sizing => handleTableSettingsChange({ columnSizing: sizing })}
        columnVisibility={tableSettings.columnVisibility}
        onColumnVisibilityChange={visibility => handleTableSettingsChange({ columnVisibility: visibility })}
        sorting={tableSettings.sorting}
        onSortingChange={sorting => handleTableSettingsChange({ sorting })}
        pagination={tableSettings.pagination}
        onPaginationChange={pagination => handleTableSettingsChange({ pagination })}
        density={tableSettings.density as MRT_DensityState}
        onDensityChange={density => handleTableSettingsChange({ density })}
        columnFilters={tableSettings.columnFilters}
        onColumnFiltersChange={filters => handleTableSettingsChange({ columnFilters: filters })}
        globalFilter={tableSettings.globalFilter}
        onGlobalFilterChange={filter => handleTableSettingsChange({ globalFilter: filter })}
        onSaveDraft={handleSaveDraft}
      />
    </PageLayout>
  );
}

export default CariListe;