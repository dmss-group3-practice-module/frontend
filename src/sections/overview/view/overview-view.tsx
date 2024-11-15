import { useCallback, useEffect, useState } from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import OverviewContent, { RecipeRowProps } from './expiring-ingredients';

import { DashboardContent } from 'src/layouts/dashboard';
import { IngredientRowProps } from 'src/sections/inventory/ingredient-table-row';
import { mapToIngredientRowProps, mapToRecipeRowProps } from 'src/sections/inventory/utils';
import { useAuth } from 'src/context/AuthContext';

import { getIngredientsByUser } from 'src/dao/ingredientDao';
import { getAllRecipeByCreatorId, getRecommendedRecipeByCreatorId } from 'src/dao/recipeDao';
import RecommendRecipeContent from './recommendRecipe';

export function OverviewView() {
  const { user } = useAuth();

  const [ingredients, setIngredients] = useState<IngredientRowProps[]>([]);
  const [recipes, setRecipes] = useState<RecipeRowProps[]>([]);
  const [recommendedRecipe, setRecommendedRecipes] = useState<RecipeRowProps[]>([]);

  const fetchIngredientsForUser = useCallback(async () => {
    const ingredients = await getIngredientsByUser(user?.id as number);
    setIngredients(mapToIngredientRowProps(ingredients));
  }, []);
  const fetchRecipesForUser = useCallback(async () => {
    const recipes = await getAllRecipeByCreatorId(user?.id as number);
    setRecipes(mapToRecipeRowProps(recipes));
  }, []);
  const fetchRecommendedRecipesForUser = useCallback(async () => {
    const recipes = await getRecommendedRecipeByCreatorId(user?.id as number);
    setRecommendedRecipes(mapToRecipeRowProps(recipes));
  }, []);

  useEffect(() => {
    fetchIngredientsForUser();
    fetchRecipesForUser();
    fetchRecommendedRecipesForUser();
  }, [fetchIngredientsForUser]);

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Hi, Welcome back {user?.displayName} 👋
      </Typography>

      <Grid>
        <Grid xs={12} md={6} lg={4}>
          <OverviewContent ingredients={ingredients} recipes={recipes} />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <RecommendRecipeContent recommendedRecipe={recommendedRecipe} />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
