import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { useState } from 'react';
import { ResponseSnackbar } from 'src/sections/inventory/ingredient-snackbar';

interface RecipeRevertDialogProps {
  openDialog: boolean;
  handleCloseDialog: () => void;
  triggerResetRecipe: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RecipeRevertDialog(props: RecipeRevertDialogProps): JSX.Element {
  const { openDialog, handleCloseDialog, triggerResetRecipe } = props;

  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    setIsSuccess(true);
    triggerResetRecipe(true);
    setLoading(false);
    handleCloseDialog();
  };

  const handleCloseSnackbar = () => {
    setIsSuccess(false);
  };

  return (
    <>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Revert Changes?</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" disabled={loading}>
            {loading ? 'Creating...' : 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>
      <ResponseSnackbar
        isOpen={isSuccess}
        handleCloseSnackbar={handleCloseSnackbar}
        severity="success"
        message="Recipe details reverted"
      />
    </>
  );
}