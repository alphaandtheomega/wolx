import React, { useMemo } from 'react';
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from 'material-react-table';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '@/context/auth-context';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { toast } from 'sonner';
import TextField from '@mui/material/TextField';
import { ButonKaydet, ButonIptal, ButonIptalKucuk, ButonSilKucuk, ButonSilSimge, ButonDuzenleSimge } from "@/components/ui/tropikui/ButtonLib";
import { ButonEkle } from '@/components/ui/tropikui/ButtonLib';

// GrupKodu tipi
export type GrupKodu = {
  GrupKodID: number;
  GrupKod: string;
  GrupIsim: string;
};

const GrupKoduTablePlus: React.FC = () => {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3002';
  const { accessToken } = useAuth();
  const { data = [], isLoading, isError } = useQuery<GrupKodu[]>({
    queryKey: ['carigrupkodlari'],
    queryFn: async () => {
      const res = await axios.get(`${apiUrl}/api/carigrupkodlari`);
      return res.data;
    },
    refetchOnWindowFocus: false,
  });

  const queryClient = useQueryClient();

  // Silme dialogu için state
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState<GrupKodu | null>(null);

  // Grup ekleme için state
  const [addDialogOpen, setAddDialogOpen] = React.useState(false);
  const [newGrupKod, setNewGrupKod] = React.useState('');
  const [newGrupIsim, setNewGrupIsim] = React.useState('');
  const [isSaving, setIsSaving] = React.useState(false);

  // Düzenle için state
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [editGrupKod, setEditGrupKod] = React.useState('');
  const [editGrupIsim, setEditGrupIsim] = React.useState('');
  const [editRow, setEditRow] = React.useState<GrupKodu | null>(null);
  const [isEditing, setIsEditing] = React.useState(false);

  const handleEditClick = (row: GrupKodu) => {
    setEditRow(row);
    setEditGrupKod(row.GrupKod);
    setEditGrupIsim(row.GrupIsim);
    setEditDialogOpen(true);
  };

  // Silme butonuna tıklanınca dialogu aç
  const handleDeleteClick = (row: GrupKodu) => {
    setSelectedRow(row);
    setDeleteDialogOpen(true);
  };

  // Onay verildiğinde silme işlemini yap
  const handleDeleteConfirm = async () => {
    if (!selectedRow) return;
    try {
      await axios.delete(`${apiUrl}/api/carigrupkodlari/${selectedRow.GrupKodID}`,
        accessToken ? {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        } : { withCredentials: true }
      );
      toast.success('Silme başarılı!', {
        description: `${selectedRow.GrupKod} - ${selectedRow.GrupIsim} silindi.`
      });
      queryClient.invalidateQueries({ queryKey: ['carigrupkodlari'] });
    } catch (err) {
      toast.error('Silme sırasında hata oluştu!', {
        description: `${selectedRow.GrupKod} - ${selectedRow.GrupIsim} silinemedi.`
      });
    } finally {
      setDeleteDialogOpen(false);
      setSelectedRow(null);
    }
  };

  // İptal edilirse dialogu kapat
  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedRow(null);
  };

  // Grup ekle butonuna tıklanınca modalı aç
  const handleAddClick = () => {
    setNewGrupKod('');
    setNewGrupIsim('');
    setAddDialogOpen(true);
  };

  // Kaydet butonuna basınca API'ya gönder
  const handleAddSave = async () => {
    if (!newGrupKod.trim() || !newGrupIsim.trim()) {
      toast.error('Grup kodu ve isim boş olamaz!');
      return;
    }
    setIsSaving(true);
    try {
      await axios.post(`${apiUrl}/api/carigrupkodlari`, {
        GrupKod: newGrupKod,
        GrupIsim: newGrupIsim,
      }, accessToken ? {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      } : { withCredentials: true });
      toast.success('Grup başarıyla eklendi!');
      setAddDialogOpen(false);
      setNewGrupKod('');
      setNewGrupIsim('');
      queryClient.invalidateQueries({ queryKey: ['carigrupkodlari'] });
    } catch (err) {
      toast.error('Grup eklenirken hata oluştu!');
    } finally {
      setIsSaving(false);
    }
  };

  // Modalı kapat
  const handleAddCancel = () => {
    setAddDialogOpen(false);
    setNewGrupKod('');
    setNewGrupIsim('');
  };

  // Kaydet butonuna basınca API'ya gönder
  const handleEditSave = async () => {
    if (!editRow) return;
    if (!editGrupKod.trim() || !editGrupIsim.trim()) {
      toast.error('Grup kodu ve isim boş olamaz!');
      return;
    }
    setIsEditing(true);
    try {
      await axios.put(`${apiUrl}/api/carigrupkodlari/${editRow.GrupKodID}`, {
        GrupKod: editGrupKod,
        GrupIsim: editGrupIsim,
      }, accessToken ? {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      } : { withCredentials: true });
      toast.success('Grup başarıyla güncellendi!');
      setEditDialogOpen(false);
      setEditRow(null);
      queryClient.invalidateQueries({ queryKey: ['carigrupkodlari'] });
    } catch (err) {
      toast.error('Grup güncellenirken hata oluştu!');
    } finally {
      setIsEditing(false);
    }
  };

  // Modalı kapat
  const handleEditCancel = () => {
    setEditDialogOpen(false);
    setEditRow(null);
    setEditGrupKod('');
    setEditGrupIsim('');
  };

  const columns = useMemo<MRT_ColumnDef<GrupKodu>[]>(
    () => [
      {
        id: 'actions',
        header: 'İşlemler',
        size: 80,
        Cell: ({ row }) => (
          <span style={{ display: 'flex', gap: 4 }}>
            <ButonDuzenleSimge onClick={() => handleEditClick(row.original)}>
              <EditIcon />
            </ButonDuzenleSimge>
            <ButonSilSimge onClick={() => handleDeleteClick(row.original)}>
              <DeleteIcon />
            </ButonSilSimge>
          </span>
        ),
        enableColumnActions: false,
        enableSorting: false,
        enableColumnFilter: false,
        enableEditing: false,
      },
      {
        accessorKey: 'GrupKod',
        header: 'Grup Kod',
        size: 100,
        muiFilterTextFieldProps: { placeholder: 'Filtrele' },
      },
      {
        accessorKey: 'GrupIsim',
        header: 'Grup İsim',
        size: 250,
        muiFilterTextFieldProps: { placeholder: 'Filtrele' },
      },
    ],
    []
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
    muiTableContainerProps: {
      sx: { 
        minHeight: '300px',
        border: '1px solid var(--border)',
        boxShadow: 'none',
        marginBottom: '10px',
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

  return (
    <>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 2, padding: 0 }}>
          <ButonEkle onClick={handleAddClick}>Grup Ekle</ButonEkle>
        </div>
        <div style={{ marginTop: 40 }}>
          <MaterialReactTable table={table} />
        </div>
      </div>
      {/* Silme Onay Dialogu */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel} sx={{ '& .MuiPaper-root': { borderRadius: '6px' } }}>
        <DialogTitle>Silme Onayı</DialogTitle>
        <DialogContent>
          {selectedRow && (
            <>
              <div>
                <b>{selectedRow.GrupKod} - {selectedRow.GrupIsim}</b> kaydını silmek istiyor musunuz?
              </div>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <ButonIptalKucuk onClick={handleDeleteCancel} >
            İptal
          </ButonIptalKucuk>
          <ButonSilKucuk onClick={handleDeleteConfirm} >
            Sil
          </ButonSilKucuk>
        </DialogActions>
      </Dialog>
      {/* Grup Ekle Dialogu */}
      <Dialog open={addDialogOpen} onClose={handleAddCancel} sx={{ '& .MuiPaper-root': { borderRadius: '6px' } }}>
        <DialogTitle>Yeni Grup Ekle</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Grup Kod"
            fullWidth
            value={newGrupKod}
            onChange={e => setNewGrupKod(e.target.value)}
            disabled={isSaving}
          />
          <TextField
            margin="dense"
            label="Grup İsim"
            fullWidth
            value={newGrupIsim}
            onChange={e => setNewGrupIsim(e.target.value)}
            disabled={isSaving}
          />
        </DialogContent>
        <DialogActions>
          <ButonIptal onClick={handleAddCancel} disabled={isSaving}>
            İptal
          </ButonIptal>
          <ButonKaydet onClick={handleAddSave} disabled={isSaving}>
            Kaydet
          </ButonKaydet>
        </DialogActions>
      </Dialog>
      {/* Grup Düzenle Dialogu */}
      <Dialog open={editDialogOpen} onClose={handleEditCancel} sx={{ '& .MuiPaper-root': { borderRadius: '6px' } }}>
        <DialogTitle>Grup Düzenle</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Grup Kod"
            fullWidth
            value={editGrupKod}
            onChange={e => setEditGrupKod(e.target.value)}
            disabled={isEditing}
          />
          <TextField
            margin="dense"
            label="Grup İsim"
            fullWidth
            value={editGrupIsim}
            onChange={e => setEditGrupIsim(e.target.value)}
            disabled={isEditing}
          />
        </DialogContent>
        <DialogActions>
          <ButonIptal onClick={handleEditCancel} disabled={isEditing}>
            İptal
          </ButonIptal>
          <ButonKaydet onClick={handleEditSave} disabled={isEditing}>
            Kaydet
          </ButonKaydet>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GrupKoduTablePlus;
