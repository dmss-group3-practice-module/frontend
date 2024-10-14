import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListItem,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { ResponseSnackbar } from '../inventory/ingredient-snackbar';
import { Ingredient } from 'src/types/Ingredient';

import { createIngredient } from 'src/dao/ingredientDao';
import { useUserContext } from 'src/context/UserContext';

interface IngredientDetailRowProps {
  label: string;
  ingredientDetail: string;
}

const IngredientDetailRow = ({ label, ingredientDetail }: IngredientDetailRowProps) => {
  return (
    <ListItem>
      <Typography variant="body1">
        <strong>{label}:</strong> {ingredientDetail || 'N/A'}
      </Typography>
    </ListItem>
  );
};

interface ConfirmationDialogProps {
  openDialog: boolean;
  handleCloseDialog: () => void;
  ingredient: Ingredient;
}

export const ConfirmationDialog = ({
  openDialog,
  handleCloseDialog,
  ingredient,
}: ConfirmationDialogProps) => {
  const { user } = useUserContext();

  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const result = await createIngredient(ingredient, user?.id as number);

    if (result.success) {
      setIsSuccess(true);
    } else {
      setIsError(true);
    }
    setLoading(false);
    handleCloseDialog();
  };

  const handleCloseSnackbar = () => {
    setIsSuccess(false);
    setIsError(false);
  };

  return (
    <>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Addition</DialogTitle>
        <DialogContent>
          <DialogContentText>Please review the ingredient details.</DialogContentText>
          <br />

          <IngredientDetailRow label="Item Name" ingredientDetail={ingredient.name} />
          <IngredientDetailRow label="Quantity" ingredientDetail={String(ingredient.quantity)} />
          <IngredientDetailRow label="Unit of Measurement" ingredientDetail={ingredient.uom} />
          <IngredientDetailRow label="Expiry Date" ingredientDetail={ingredient.expiryDate} />
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
        message="Ingredient added successfully!"
      />

      <ResponseSnackbar
        isOpen={isError}
        handleCloseSnackbar={handleCloseSnackbar}
        severity="error"
        message="Failed to add the ingredient. Please try again."
      />
    </>
  );
};
