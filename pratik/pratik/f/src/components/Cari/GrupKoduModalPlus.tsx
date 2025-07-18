import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import GrupKoduTablePlus from './GrupKoduTablePlus';

interface GrupKoduModalPlusProps {
  open: boolean;
  onClose: () => void;
}

const GrupKoduModalPlus: React.FC<GrupKoduModalPlusProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} aria-describedby="grupkodu-modal-aciklama" sx={{ '& .MuiPaper-root': { borderRadius: '15px', boxShadow: 'none' } }}>
      <DialogContent >
      
        <GrupKoduTablePlus />
      </DialogContent>
      <DialogActions>
        {/* İsterseniz buraya buton ekleyebilirsiniz */}
      </DialogActions>
    </Dialog>
  );
};

export default GrupKoduModalPlus;
