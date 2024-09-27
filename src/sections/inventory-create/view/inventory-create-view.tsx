import React from 'react';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField, Grid } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';
import { Iconify } from 'src/components/iconify';
import { ConfirmationDialog } from '../ConfirmationDialog';

export function InventoryCreateView() {
  const navigate = useNavigate();

  const [itemName, setItemName] = useState('');
  const [unitOfMeasurement, setUnitOfMeasurement] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: send ingredient to backend endpoint

    // handleCloseDialog();
  };

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Add a new ingredient
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:back" />}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </Box>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={3} sm={12}>
            <TextField
              required
              placeholder={'e.g. banana'}
              fullWidth
              label="Item name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </Grid>
          <Grid item xs={3} sm={3}>
            <TextField
              type="number"
              placeholder={'e.g. 35'}
              required
              fullWidth
              label="Quantity"
              value={quantity}
              InputProps={{
                inputProps: { min: 0 },
              }}
              onKeyDown={(event) => {
                if (event?.key === '-' || event?.key === '+') {
                  event.preventDefault();
                }
              }}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Grid>
          <Grid item xs={3} sm={3}>
            <TextField
              required
              placeholder={'e.g. kg'}
              fullWidth
              label="Unit of measurement"
              value={unitOfMeasurement}
              onChange={(e) => setUnitOfMeasurement(e.target.value)}
            />
          </Grid>
          <Grid item xs={3} sm={12}>
            <TextField
              required
              label="Expiry date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </Grid>
        </Grid>
        <Box mt={3}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleOpenDialog}
            disabled={!itemName || !quantity || !unitOfMeasurement || !expiryDate}
          >
            Add Ingredient
          </Button>
        </Box>
      </Box>

      <ConfirmationDialog
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        itemName={itemName}
        quantity={quantity}
        unitOfMeasurement={unitOfMeasurement}
        expiryDate={expiryDate}
        handleSubmit={handleSubmit}
      />
    </DashboardContent>
  );
}