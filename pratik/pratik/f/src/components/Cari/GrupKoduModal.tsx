import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import GrupKoduTable from "./GrupKoduTable";

interface GrupKoduModalProps {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  onSelect?: (grupKodu: any) => void;
  sadeceSecimModu?: boolean;
}

const GrupKoduModal: React.FC<GrupKoduModalProps> = ({ open, onClose, onSelect }) => {
  const handleSelect = (grupKodu: any) => {
    if (onSelect) onSelect(grupKodu);
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose} sx={{ '& .MuiPaper-root': { borderRadius: '12px' } }}>
    
      <DialogContent >
        <GrupKoduTable onSelect={handleSelect} />
      </DialogContent>
      <DialogActions>
        {/* İsterseniz buraya buton ekleyebilirsiniz */}
      </DialogActions>
    </Dialog>
  );
};

export default GrupKoduModal; 