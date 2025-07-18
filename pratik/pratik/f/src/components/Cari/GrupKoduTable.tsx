import React, { useMemo } from 'react';
import { MaterialReactTable, type MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { ButonSec } from '../ui/tropikui/ButtonLib';

// Grup kodu tipi
interface GrupKodu {
  GrupKodID: number;
  GrupKod: string;
  GrupIsim: string;
}

interface GrupKoduTableProps {
  onSelect?: (grupKodu: GrupKodu) => void;
}

const GrupKoduTable: React.FC<GrupKoduTableProps> = ({ onSelect }) => {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3002';
  const { data = [], isLoading, isError } = useQuery<GrupKodu[]>({
    queryKey: ['carigrupkodlari'],
    queryFn: async () => {
      const res = await axios.get(`${apiUrl}/api/carigrupkodlari`);
      return res.data;
    },
    refetchOnWindowFocus: false,
  });

  const columns = useMemo<MRT_ColumnDef<GrupKodu>[]>(
    () => [
      {
        id: 'actions',
        header: '',
        size: 60,
        Cell: ({ row }) => (
          <ButonSec  
            onClick={() => onSelect && onSelect(row.original)}
            
            
          >
            Seç
          </ButonSec>
        ),
        enableColumnActions: false,
        enableSorting: false,
        enableColumnFilter: false,
        enableEditing: false,
      },
      {
        accessorKey: 'GrupIsim',
        header: 'Grup İsim',
        size: 250,
        muiFilterTextFieldProps: { placeholder: 'Filtrele' },
      },
      {
        accessorKey: 'GrupKod',
        header: 'Grup Kod',
        size: 100,
        muiFilterTextFieldProps: { placeholder: 'Filtrele' },
      },

    ],
    [onSelect]
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableEditing: false,
    enablePagination: false,
    enableColumnFilters: true,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableGlobalFilter: false,
    enableHiding: false,
    enableBottomToolbar: false,
    muiBottomToolbarProps: { sx: { display: 'none' } },
    muiTablePaperProps: {
      sx: {
        boxShadow: 'none',
        border: 'none',
        background: 'none',
      },
    },
    muiTableContainerProps: {
      sx: {
        minHeight: '300px',
        border: '1px solid var(--border)',
        boxShadow: 'none',
        marginBottom: '10px',
        overflow: 'hidden',
      },
    },
    muiTableProps: {
      sx: {
        borderCollapse: 'separate',
        borderSpacing: 0,
        boxShadow: 'none',
        border: 'none',
        '& .MuiTableCell-head': {
          borderBottomColor: 'var(--border)',
          borderBottomStyle: 'solid',
          borderBottomWidth: '1px',
          borderRightColor: 'var(--border)',
          borderRightStyle: 'solid',
          borderRightWidth: '1px',
        },
        '& .MuiTableCell-body': {
          borderRightColor: 'var(--border)',
          borderRightStyle: 'solid',
          borderRightWidth: '1px',
          borderBlockEndColor: 'var(--border)',
          borderBlockEndStyle: 'solid',
          borderBlockEndWidth: '1px',
        },
      },
    },
  });

  if (isLoading) return <div>Yükleniyor...</div>;
  if (isError) return <div>Veri alınamadı.</div>;

  return <MaterialReactTable table={table} />;
};

export default GrupKoduTable; 