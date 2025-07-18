import React, { useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CariSecTable from "./CariSecTable";
import { DialogTitle, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

interface CariSecModalProps {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  onSelect?: (cariSec: any) => void;
  sadeceSecimModu?: boolean;
  searchTerm?: string; // Yeni prop
}

const CariSecModal: React.FC<CariSecModalProps> = ({ open, onClose, onSelect, searchTerm }) => {
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        const input = document.querySelector('input[placeholder="Ara"]') as HTMLInputElement;
        input?.focus();
      }, 500);
    }
  }, [open]);
  const handleSelect = (cariSec: any) => {
    if (onSelect) onSelect(cariSec);
    onClose();
  };
  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="xl"
      fullWidth
      PaperProps={{
        className: 'rounded-xl max-w-[90vw] max-h-[85vh] w-[1200px] h-[700px]'
      }}
    >
      <DialogTitle className="flex justify-between items-center border-b border-[var(--border)] px-6 py-4 text-xl font-semibold">
        <span>Cari Seç</span>
        <IconButton onClick={onClose} size="large">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className="p-6 h-[calc(100%-120px)] overflow-hidden">
        <CariSecTable onSelect={handleSelect} autoFocusSearch={open} searchTerm={searchTerm} />
      </DialogContent>
      <DialogActions className="border-t border-[var(--border)] px-6 py-4">
        {/* İsterseniz buraya buton ekleyebilirsiniz */}
      </DialogActions>
    </Dialog>
  );
};

export default CariSecModal; 