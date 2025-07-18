import { useState, useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { MRT_Localization_TR } from 'material-react-table/locales/tr';
import { useAuth } from '@/context/auth-context';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// Cari hareket veri tipi
type CariHareket = {
  CariHareketleriID: number;
  CariID: number;
  Tarih: string;
  VadeTarihi: string | null;
  BelgeNo: string | null;
  HareketTipi: string | null;
  BorcAlacak: string | null;
  Borc: number | null;
  Alacak: number | null;
  DovizBorc: number | null;
  DovizAlacak: number | null;
  Kur: number | null;
  DovizID: number | null;
  Aciklama: string | null;
  KayitYapanKullanici: string | null;
  KayitTarihi: string | null;
  Tip: string | null;
  FaturaGrupKodu: string | null;
  FaturaGrupKod: string | null;
  Sil: boolean;
};

interface CariHareketTableProps {
  cariId: string;
  onRowDoubleClick?: (row: CariHareket) => void;
}

const CariHareketTable = ({ cariId, onRowDoubleClick }: CariHareketTableProps) => {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3002';
  const { accessToken } = useAuth();
  const queryClient = useQueryClient ? useQueryClient() : null;
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<CariHareket | null>(null);

  // React Query ile veri çek
  const { data = [], isLoading, isError } = useQuery<CariHareket[]>({
    queryKey: ['carihareketleri', cariId],
    queryFn: async () => {
      if (!cariId) return [];
      const res = await axios.get(`${apiUrl}/api/carihareketleri?cariId=${cariId}`,
        accessToken ? {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        } : { withCredentials: true }
      );
      return res.data;
    },
    enabled: !!cariId, // Sadece cari seçiliyse fetch et
    refetchOnWindowFocus: false,
  });

  // Soft delete fonksiyonu
  const handleSoftDelete = async (row: CariHareket) => {
    try {
      await axios.put(
        `${apiUrl}/api/carihareketleri/${row.CariHareketleriID}`,
        { ...row, Sil: true },
        accessToken
          ? {
              headers: { Authorization: `Bearer ${accessToken}` },
              withCredentials: true,
            }
          : { withCredentials: true }
      );
      if (queryClient) queryClient.invalidateQueries({ queryKey: ['carihareketleri', cariId] });
    } catch (error) {
      // Hata yönetimi
      alert('Silme işlemi başarısız!');
    }
  };

  const handleDeleteClick = (row: CariHareket) => {
    setRowToDelete(row);
    setDeleteDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDeleteDialogOpen(false);
    setRowToDelete(null);
  };

  const handleDialogConfirm = async () => {
    if (rowToDelete) {
      await handleSoftDelete(rowToDelete);
    }
    setDeleteDialogOpen(false);
    setRowToDelete(null);
  };

  // Tarih formatlama fonksiyonu
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    try {
      // Hem tarih hem saat göster
      return format(new Date(dateString), 'dd.MM.yyyy HH:mm', { locale: tr });
    } catch {
      return dateString;
    }
  };

  // Para formatlama fonksiyonu
  const formatCurrency = (amount: number | null) => {
    if (amount === null || amount === undefined) return '-';
    return new Intl.NumberFormat('tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Sütunları tanımla
  const columns = useMemo<MRT_ColumnDef<CariHareket>[]>(
    () => [
      {
        id: 'actions',
        header: 'İşlemler',
        size: 80,
        Cell: ({ row }) => (
          <Button
            color="error"
            size="small"
            onClick={e => {
              e.stopPropagation();
              handleDeleteClick(row.original);
            }}
            startIcon={<DeleteIcon />}
          >
            Sil
          </Button>
        ),
        enableColumnFilter: false,
        enableSorting: false,
        enableGlobalFilter: false,
        muiTableBodyCellProps: { style: { padding: '0 8px' } },
      },
      {
        accessorKey: 'Tarih',
        header: 'Tarih',
        size: 120,
        Cell: ({ cell }) => formatDate(cell.getValue<string>()),
        muiFilterTextFieldProps: { placeholder: 'Filtrele' },
        enableGlobalFilter: true,
      },
      {
        accessorKey: 'HareketTipi',
        header: 'Hareket Tipi',
        size: 150,
        Cell: ({ cell }) => cell.getValue<string>() || '-',
        muiFilterTextFieldProps: { placeholder: 'Filtrele' },
        enableGlobalFilter: true,
      },
      {
        accessorKey: 'BelgeNo',
        header: 'Belge No',
        size: 120,
        Cell: ({ cell }) => cell.getValue<string>() || '-',
        muiFilterTextFieldProps: { placeholder: 'Filtrele' },
        enableGlobalFilter: true,
      },
      {
        accessorKey: 'BorcAlacak',
        header: 'Borç/Alacak',
        size: 120,
        Cell: ({ cell }) => cell.getValue<string>() || '-',
        muiFilterTextFieldProps: { placeholder: 'Filtrele' },
        enableGlobalFilter: true,
      },
      {
        accessorKey: 'Borc',
        header: 'Borç',
        size: 120,
        Cell: ({ cell }) => formatCurrency(cell.getValue<number>()),
        muiFilterTextFieldProps: { placeholder: 'Filtrele' },
        enableGlobalFilter: true,
      },
      {
        accessorKey: 'Alacak',
        header: 'Alacak',
        size: 120,
        Cell: ({ cell }) => formatCurrency(cell.getValue<number>()),
        muiFilterTextFieldProps: { placeholder: 'Filtrele' },
        enableGlobalFilter: true,
      },
      {
        accessorKey: 'DovizID',
        header: 'Döviz ID',
        size: 100,
        Cell: ({ cell }) => cell.getValue<number>() || '-',
        muiFilterTextFieldProps: { placeholder: 'Filtrele' },
        enableGlobalFilter: true,
      },
      {
        accessorKey: 'DovizBorc',
        header: 'Döviz Borç',
        size: 120,
        Cell: ({ cell }) => formatCurrency(cell.getValue<number>()),
        muiFilterTextFieldProps: { placeholder: 'Filtrele' },
        enableGlobalFilter: true,
      },
      {
        accessorKey: 'DovizAlacak',
        header: 'Döviz Alacak',
        size: 120,
        Cell: ({ cell }) => formatCurrency(cell.getValue<number>()),
        muiFilterTextFieldProps: { placeholder: 'Filtrele' },
        enableGlobalFilter: true,
      },
      {
        accessorKey: 'Kur',
        header: 'Kur',
        size: 100,
        Cell: ({ cell }) => formatCurrency(cell.getValue<number>()),
        muiFilterTextFieldProps: { placeholder: 'Filtrele' },
        enableGlobalFilter: true,
      },
      {
        accessorKey: 'Aciklama',
        header: 'Açıklama',
        size: 200,
        Cell: ({ cell }) => cell.getValue<string>() || '-',
        muiFilterTextFieldProps: { placeholder: 'Filtrele' },
        enableGlobalFilter: true,
      },
      {
        accessorKey: 'KayitYapanKullanici',
        header: 'Kayıt Yapan Kullanıcı',
        size: 150,
        Cell: ({ cell }) => cell.getValue<string>() || '-',
        muiFilterTextFieldProps: { placeholder: 'Filtrele' },
        enableGlobalFilter: true,
      },
      {
        accessorKey: 'KayitTarihi',
        header: 'Kayıt Tarihi',
        size: 120,
        Cell: ({ cell }) => formatDate(cell.getValue<string>()),
        muiFilterTextFieldProps: { placeholder: 'Filtrele' },
        enableGlobalFilter: true,
      },
      {
        accessorKey: 'VadeTarihi',
        header: 'Vade Tarihi',
        size: 120,
        Cell: ({ cell }) => formatDate(cell.getValue<string>()),
        muiFilterTextFieldProps: { placeholder: 'Filtrele' },
        enableGlobalFilter: true,
      },
    ],
    [cariId],
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableEditing: false,
    enablePagination: true,
    enableColumnFilters: false,
    enableDensityToggle: true,
    enableFullScreenToggle: false,
    enableGlobalFilter: false,
    enableHiding: true,
    enableBottomToolbar: true,
    enableColumnOrdering: true,
    enableColumnResizing: true,
    paginationDisplayMode: 'pages',
    muiPaginationProps: {
      variant: 'outlined',
      shape: 'rounded',
      showRowsPerPage: true,
      showFirstButton: true,
      showLastButton: true,
    },
    initialState: {
      density: 'comfortable',
      pagination: {
        pageSize: 10,
        pageIndex: 0,
      },
      showColumnFilters: true,
      showGlobalFilter: true,
    },
    
    muiSearchTextFieldProps: {
      disabled: true, // Search input'u devre dışı bırak
      placeholder: "Arama devre dışı", // Kullanıcıya bilgi ver
    },
    muiTableProps: {
      className: 'border-collapse shadow-none border border-[var(--border)] table-fixed w-full',
    },
    muiTableBodyCellProps: { className: 'border-r border-b border-[var(--border)]' },
    muiTableHeadCellProps: { className: 'border-r border-b border-[var(--border)] bg-gray-100' },
    muiTableBodyRowProps: ({ row }) => ({
      className: row.index % 2 === 0 ? 'bg-white' : 'bg-skyblue-50',
      onDoubleClick: () => {
        if (onRowDoubleClick) onRowDoubleClick(row.original);
      },
      style: { cursor: onRowDoubleClick ? 'pointer' : undefined },
    }),
    muiTableBodyProps: {
      sx: {
        '& tr:nth-of-type(odd) > td': {
          backgroundColor: '#f5f5f5',
        },
      },
    },
    localization: MRT_Localization_TR,
  });

  if (isLoading) return <div>Yükleniyor...</div>;
  if (isError) return <div>Veri alınamadı.</div>;

  return (
    <>
      <MaterialReactTable table={table} />
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDialogClose}
      >
        <DialogTitle>Kayıt Silinsin mi?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bu kaydı silmek istediğinize emin misiniz?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Hayır
          </Button>
          <Button onClick={handleDialogConfirm} color="error" autoFocus>
            Evet
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CariHareketTable;
