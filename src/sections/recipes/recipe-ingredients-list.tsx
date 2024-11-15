import React, { useEffect, useState } from 'react';

import {
  Typography,
  Collapse,
  Alert,
  IconButton,
  Grid,
  Autocomplete,
  TextField,
  Tooltip,
} from '@mui/material';

import { _uomType, _ingredientType } from './recipes-filter-config';

import { Iconify } from 'src/components/iconify';
import { RecipeIngredient } from 'src/types/RecipeIngredient';
import {
  getIngredientNameHelperText,
  getIngredientQuantityTest,
  getIngredientUOMHelperText,
} from './recipe-helper-util';

export function generateDefaultIngredient(): RecipeIngredient {
  return {
    id: 0,
    recipeId: 0,
    name: '',
    quantity: 0,
    uom: '',
  };
}
interface RecipeIngredientsListProps {
  recipeIngredients: RecipeIngredient[];
  setRecipeIngredients: React.Dispatch<React.SetStateAction<RecipeIngredient[]>>;
  editable: boolean;

  highlightHelperText: boolean;
}

export const RecipeIngredientsList = (props: RecipeIngredientsListProps) => {
  const { recipeIngredients, setRecipeIngredients, editable, highlightHelperText } = props;

  const [lastIngredientNotification, setLastIngredientNotification] = useState<boolean>(false);
  const [uomOptions, setUomOptions] = useState<readonly String[]>([]);
  const [ingredientTypeOptions, setIngredientTypeOptions] = useState<readonly String[]>([]);

  useEffect(() => {
    setUomOptions([..._uomType]);
    setIngredientTypeOptions([..._ingredientType]);
  }, []);

  const addIngredient = () => {
    setLastIngredientNotification(false);
    const temp = generateDefaultIngredient();
    setRecipeIngredients([...(recipeIngredients || []), temp]);
  };
  const deleteIngredient = (index: number) => {
    if (recipeIngredients?.length === 1) {
      setLastIngredientNotification(true);
      return;
    }
    setRecipeIngredients(recipeIngredients?.filter((_, i) => i !== index));
  };
  const updateIngredient = (index: number, field: string, value: any) => {
    const temp = recipeIngredients ? [...recipeIngredients] : [];
    const ingredientRecord = temp.find((_, i) => i === index);
    if (!ingredientRecord) {
      return;
    }
    (ingredientRecord as any)[field] = value;

    setRecipeIngredients(temp);
  };

  return (
    <div>
      <Typography variant="subtitle1">
        Ingredients List
        {editable && (
          <IconButton onClick={addIngredient}>
            <Iconify icon="solar:add-circle-broken" />
          </IconButton>
        )}
      </Typography>

      <Collapse in={lastIngredientNotification}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setLastIngredientNotification(false);
              }}
            >
              <Iconify icon="material-symbols:close" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Must consists of at least 1 ingredient.
        </Alert>
      </Collapse>
      <Grid container padding={2}>
        {recipeIngredients?.map((ingredient: RecipeIngredient, index) => (
          <Grid item key={index} xs={12} paddingBottom={2}>
            <Grid container spacing={1}>
              <Grid item sm={8}>
                <Autocomplete
                  fullWidth={true}
                  disableClearable
                  disabled={!editable}
                  value={ingredient ? ingredient.name : ''}
                  options={ingredientTypeOptions}
                  freeSolo
                  onInputChange={(event, value) => updateIngredient(index, 'name', value)}
                  renderInput={(params) => (
                    <TextField {...params} name="ingredient-name" label="Ingredient Name" />
                  )}
                />
                <Typography variant="caption" color={'var(--palette-error-main)'}>
                  {getIngredientNameHelperText(highlightHelperText, ingredient.name)}
                </Typography>
              </Grid>
              <Grid item sm={1}>
                <TextField
                  disabled={!editable}
                  name="quantity"
                  label="Quantity"
                  value={ingredient ? ingredient.quantity : 0}
                  onChange={(event) => updateIngredient(index, 'quantity', event.target.value)}
                  type="number"
                  error={!!getIngredientQuantityTest(highlightHelperText, ingredient.quantity)}
                  helperText={getIngredientQuantityTest(highlightHelperText, ingredient.quantity)}
                />
              </Grid>
              <Grid item sm={2}>
                <Autocomplete
                  fullWidth={true}
                  disableClearable
                  disabled={!editable}
                  // value={ingredient ? ingredient.uom : 'pcs'}
                  value={ingredient?.uom || uomOptions[0]}
                  options={uomOptions}
                  freeSolo
                  onInputChange={(event, value) => updateIngredient(index, 'uom', value)}
                  renderInput={(params) => (
                    <TextField {...params} name="uom" label="Unit Of Measurement" />
                  )}
                />
                <Typography variant="caption" color={'var(--palette-error-main)'}>
                  {getIngredientUOMHelperText(highlightHelperText, ingredient.uom)}
                </Typography>
              </Grid>
              <Grid item sm={1} alignContent={'center'}>
                {editable && (
                  <Tooltip title="Delete">
                    <IconButton disabled={!editable} onClick={() => deleteIngredient(index)}>
                      <Iconify icon="solar:trash-bin-trash-bold" />
                    </IconButton>
                  </Tooltip>
                )}
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
