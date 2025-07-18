import React, { useMemo, useRef, useEffect } from 'react';
import { MaterialReactTable, type MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { MRT_Localization_TR } from 'material-react-table/locales/tr';
import { ButonSec } from "@/components/ui/tropikui/ButtonLib";
import { formatDate } from '../../lib/utils'; // Yola dikkat et!
import type { Cari } from "@/interfaces/cari-interface";


interface CariSecTableProps {
  onSelect?: (cari: Cari) => void;
  autoFocusSearch?: boolean;
  searchTerm?: string; // Yeni prop
}

const CariSecTable: React.FC<CariSecTableProps> = ({ onSelect, autoFocusSearch, searchTerm }) => {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3002';
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocusSearch) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [autoFocusSearch]);

  // cariler verisini çek
  const { data = [], isLoading, isError } = useQuery<Cari[]>({
    queryKey: ['carisec'],
    queryFn: async () => {
      const res = await axios.get(`${apiUrl}/api/cariler/carisec`);
      // Tüm string kolonları (özellikle grup isimleri) null/undefined ise '' yap
      return res.data.map((cari: any) => ({
        ...cari,
        CariKod: cari.CariKod ?? '',
        CariIsim: cari.CariIsim ?? '',
        Il: cari.Il ?? '',
        Ilce: cari.Ilce ?? '',
        VergiDairesi: cari.VergiDairesi ?? '',
        VergiNumarasi: cari.VergiNumarasi ?? '',
        TCKimlikNo: cari.TCKimlikNo ?? '',
        CariRol: cari.CariRol ?? '',
        KayitTarihi: cari.KayitTarihi ?? '',
        GrupKodu1Isim: cari.GrupKodu1Isim ?? '',
        GrupKodu2Isim: cari.GrupKodu2Isim ?? '',
        GrupKodu3Isim: cari.GrupKodu3Isim ?? '',
      }));
    },
    refetchOnWindowFocus: false,
  });

  const columns = useMemo<MRT_ColumnDef<Cari>[]>(
    () => [
      {
        id: 'sec',
        header: 'Seç',
        size: 80,
        enableColumnFilter: false,
        enableSorting: false,
        enableResizing: false,
        Cell: ({ row }) => (
          <ButonSec onClick={() => onSelect && onSelect(row.original)} />
        ),
      },
      {
        accessorKey: 'CariKod',
        header: 'Cari Kod',
        size: 100,
        muiFilterTextFieldProps: { placeholder: 'Filtrele' },
        enableGlobalFilter: true,
      },
      {
        accessorKey: 'CariIsim',
        header: 'Cari İsim',
        size: 250,
        muiFilterTextFieldProps: { placeholder: 'Filtrele' },
        enableGlobalFilter: true,
      },
      {
        accessorKey: 'Il',
        header: 'İl',
        size: 100,
        muiFilterTextFieldProps: { placeholder: 'Filtrele' },
        enableGlobalFilter: true,
      },
      {
        accessorKey: 'Ilce',
        header: 'İlçe',
        size: 100,
        muiFilterTextFieldProps: { placeholder: 'Filtrele' },
        enableGlobalFilter: true,
      },
      {
        accessorKey: 'VergiDairesi',
        header: 'Vergi Dairesi',
        size: 150,
        muiFilterTextFieldProps: { placeholder: 'Filtrele' },
        enableGlobalFilter: true,
      },
      {
        accessorKey: 'VergiNumarasi',
        header: 'Vergi Numarası',
        size: 150,
        muiFilterTextFieldProps: { placeholder: 'Filtrele' },
        enableGlobalFilter: true,
      },
      {
        accessorKey: 'TCKimlikNo',
        header: 'TC Kimlik No',
        size: 120,
        muiFilterTextFieldProps: { placeholder: 'Filtrele' },
        enableGlobalFilter: true,
      },
      {
        accessorKey: 'CariRol',
        header: 'Cari Rol',
        size: 100,
        muiFilterTextFieldProps: { placeholder: 'Filtrele' },
        enableGlobalFilter: true,
      },
      {
        accessorKey: 'GrupKodu1Isim',
        header: 'Grup Kodu 1',
        size: 100,
        muiFilterTextFieldProps: { placeholder: 'Filtrele' },
        enableGlobalFilter: true,
      },
      {
        accessorKey: 'GrupKodu2Isim',
        header: 'Grup Kodu 2',
        size: 100,
        muiFilterTextFieldProps: { placeholder: 'Filtrele' },
        enableGlobalFilter: true,
      },
      {
        accessorKey: 'GrupKodu3Isim',
        header: 'Grup Kodu 3',
        size: 100,
        muiFilterTextFieldProps: { placeholder: 'Filtrele' },
        enableGlobalFilter: true,
      },
      {
        accessorKey: 'KayitTarihi',
        header: 'Kayıt Tarihi',
        size: 150,
        muiFilterTextFieldProps: { placeholder: 'Filtrele' },
        enableGlobalFilter: true,
        Cell: ({ cell }) => formatDate(cell.getValue() as string),
      },
    ],
    [onSelect]
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableEditing: false,
    enablePagination: true,
    enableColumnFilters: true,
    enableDensityToggle: true,
    enableFullScreenToggle: false,
    enableGlobalFilter: true,
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
      columnFilters: searchTerm ? [{ id: 'CariKod', value: searchTerm }] : [], // Sadece CariKod kolonunda arama
    },
    muiSearchTextFieldProps: {
      inputRef: searchInputRef,
    },
    muiBottomToolbarProps: { 
      className: 'border-t border-[var(--border)] px-4 py-2'
    },
    muiTablePaperProps: {
      className: 'shadow-none border-none bg-none h-full flex flex-col',
    },
    muiTableContainerProps: {
      className: 'flex-1 min-h-[300px] h-full border border-[var(--border)] shadow-none mb-2 overflow-x-auto overflow-y-hidden',
    },
    
    muiTableProps: {
      className: 'border-collapse shadow-none border border-[var(--border)] table-fixed w-full',
    },
    muiTableBodyCellProps: { className: 'border-r border-b border-[var(--border)]' },
    muiTableHeadCellProps: { className: 'border-r border-b border-[var(--border)] bg-gray-100' },
    muiTableBodyRowProps: ({ row }) => ({
      className: row.index % 2 === 0 ? 'bg-white' : 'bg-skyblue-50',
      onDoubleClick: () => {
        if (onSelect) onSelect(row.original);
      },
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

  return <MaterialReactTable table={table} />;
};

export default CariSecTable; 