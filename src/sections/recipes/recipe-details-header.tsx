import React, { useState } from 'react';

import { Typography, Grid, Button } from '@mui/material';

import RecipeDeleteDialog from './recipe-delete-dialog';
import RecipeCookDialog from './recipe-cook-dialog';
import RecipeRevertDialog from './recipe-revert-dialog';

import { Iconify } from 'src/components/iconify';
import { Recipe } from 'src/types/Recipe';

export const defaultCookingStep = {
  id: 0,
  recipeId: 0,
  description: '',
  imageUrl: 'No Image',
};
interface RecipeCookingStepListProps {
  editable: boolean;
  setEditable: React.Dispatch<React.SetStateAction<boolean>>;
  creation: boolean;
  ownerMode: boolean;
  recipe: Recipe;
  triggerResetRecipe: () => void;
  saveRecipe: () => void;

  getRecipeFromServer: () => void;
}

export const RecipeHeader = (props: RecipeCookingStepListProps) => {
  const {
    editable,
    setEditable,
    creation,
    ownerMode,
    recipe,
    triggerResetRecipe,
    saveRecipe,
    getRecipeFromServer,
  } = props;

  const handleCloseRevertDialog = () => setRevertDialogOption(false);
  const [openRevertDialogOption, setRevertDialogOption] = useState(false);
  const setEditableToTrue = () => {
    setEditable(true);
  };
  const openRevertDialog = () => {
    setRevertDialogOption(true);
  };
  return (
    <>
      <RecipeRevertDialog
        openDialog={openRevertDialogOption}
        handleCloseDialog={handleCloseRevertDialog}
        triggerResetRecipe={triggerResetRecipe}
      />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h3">
            {creation ? 'Recipe Creation' : <div>Recipes Details for {recipe && recipe.name}</div>}
          </Typography>
        </Grid>
        {creation ? (
          <Grid item xs={12}>
            <Button variant="outlined" onClick={saveRecipe}>
              <Iconify icon="solar:pen-bold" />
              Create Recipe
            </Button>
          </Grid>
        ) : (
          ownerMode && (
            <Grid item xs={12}>
              {!editable ? (
                <Button variant="outlined" onClick={setEditableToTrue}>
                  <Iconify icon="solar:pen-bold" />
                  Edit Recipe
                </Button>
              ) : (
                <>
                  <Button variant="outlined" onClick={saveRecipe}>
                    <Iconify icon="material-symbols:save" />
                    Save Changes
                  </Button>
                  <Button variant="outlined" onClick={openRevertDialog}>
                    <Iconify icon="grommet-icons:revert" />
                    Discard Changes
                  </Button>
                </>
              )}
              <RecipeDeleteDialog recipeId={recipe.id} />
            </Grid>
          )
        )}
        {!ownerMode && !creation && (
          <Grid item xs={12}>
            <RecipeCookDialog recipeId={recipe.id} getRecipeFromServer={getRecipeFromServer} />
          </Grid>
        )}
      </Grid>
    </>
  );
};
