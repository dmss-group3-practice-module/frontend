import { useState, useCallback, useEffect } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';

import { RecipeItem } from '../recipe-item';
import { RecipeSort } from '../recipe-sort';
import { RecipeFilters } from '../recipe-filters';
import type { FiltersProps } from '../recipe-filters';
import {
  DEFAULT_FILTERS,
  EXISTING_INGREDIENT_OPTIONS,
  CATEGORY_OPTIONS,
  RATING_OPTIONS,
  COOKING_TIME_OPTIONS,
  DIFFICULTY_OPTIONS,
  VALID_FILTER_CATEGORY,
} from '../recipes-filter-config';

import { DashboardContent } from 'src/layouts/dashboard';
import { Recipe } from 'src/types/Recipe';
import { useAuth } from 'src/context/AuthContext';
import { Iconify } from 'src/components/iconify';
import { useRouter } from 'src/routes/hooks';

import { getAllRecipeByCreatorId } from 'src/dao/recipeDao';

export function MyRecipesView() {
  const router = useRouter();
  const { user } = useAuth();
  const [allRecipes, setAllRecipe] = useState<Recipe[]>([]);
  const [displayPublishedRecipes, setDisplayPublishedRecipes] = useState<Recipe[]>([]);
  const [displayDraftRecipes, setDisplayDraftRecipes] = useState<Recipe[]>([]);
  const [sortBy, setSortBy] = useState('Newest');
  const [openFilter, setOpenFilter] = useState(false);
  const [filters, setFilters] = useState<FiltersProps>(DEFAULT_FILTERS);

  useEffect(() => {
    getRecipeListById(user?.id);
  }, []);

  const getRecipeListById = useCallback(async (userId: number = -1) => {
    if (userId === -1) {
      return;
    }
    const recipesList = await getAllRecipeByCreatorId(userId);
    setRecipe(recipesList);
  }, []);

  const handleOpenFilter = useCallback(() => setOpenFilter(true), []);

  const handleCloseFilter = useCallback(() => setOpenFilter(false), []);

  const handleSort = useCallback((newSort: string) => setSortBy(newSort), []);

  const handleSetFilters = useCallback((updateState: Partial<FiltersProps>) => {
    setFilters((prevValue) => ({ ...prevValue, ...updateState }));
  }, []);

  const setRecipe = (recipeList: Recipe[]) => setAllRecipe(recipeList);

  //used to handle change in filters, any additional logic to the filter need to be done...
  useEffect(() => {
    //need to ensure the filter options is maintained,
    const categories = filters.categories;

    if (categories.length === 0) {
      filters.categories = ['Any'];
    } else if (categories[categories.length - 1] === 'Any') {
      filters.categories = ['Any'];
    } else {
      filters.categories = filters.categories.filter((value) => value !== 'Any');
    }
  }, [filters]);

  //react to changes in recipes, filters, sortBy to update displayRecipes
  useEffect(() => {
    const filteredRecipes = allRecipes.filter(
      (recipe) =>
        (filters.categories.includes('Any') ||
          filters.categories.includes(recipe.cuisine) ||
          (filters.categories.includes('Others') &&
            !VALID_FILTER_CATEGORY.includes(recipe.cuisine))) &&
        (filters.cookingTime == -1 || filters.cookingTime >= recipe.cookingTimeInMin) &&
        (filters.difficulty == null || filters.difficulty >= recipe.difficultyLevel) &&
        (filters.rating == null || filters.rating <= recipe.rating),
    );
    filteredRecipes.sort((a, b) => {
      switch (sortBy.toLowerCase()) {
        case 'newest':
          return b.updateDatetime.getTime() - a.updateDatetime.getTime();
        case 'ratingDesc':
          return b.rating - a.rating;
        case 'difficultDesc':
          return a.difficultyLevel - b.difficultyLevel;
        case 'difficultAsc':
          return b.difficultyLevel - a.difficultyLevel;
        default:
          return 0;
      }
    });
    //setDisplayPublishedRecipes(filteredRecipes);

    setDisplayDraftRecipes(filteredRecipes.filter((recipe) => recipe.status === 0));
    setDisplayPublishedRecipes(filteredRecipes.filter((recipe) => recipe.status === 1));
  }, [filters, sortBy, allRecipes]);

  const canReset = Object.keys(filters).some(
    (key) => filters[key as keyof FiltersProps] !== DEFAULT_FILTERS[key as keyof FiltersProps],
  );

  const goToRecipePage = useCallback(
    (path: number | string) => {
      router.push('/recipes/details/' + path);
    },

    [router],
  );

  return (
    <DashboardContent>
      <Typography variant="h4" sx={{ mb: 5 }}>
        My Recipes
      </Typography>

      <Grid container>
        <Grid item xs={6}>
          <Button variant="outlined" onClick={() => goToRecipePage('new')}>
            <Iconify icon="material-symbols:add" />
            Create Recipe
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Box display="flex" alignItems="center" justifyContent="flex-end" sx={{ mb: 1 }}>
            <Box gap={1} display="flex" flexShrink={0} sx={{ my: 1 }}>
              <RecipeFilters
                canReset={canReset}
                filters={filters}
                onSetFilters={handleSetFilters}
                openFilter={openFilter}
                onOpenFilter={handleOpenFilter}
                onCloseFilter={handleCloseFilter}
                onResetFilter={() => setFilters(DEFAULT_FILTERS)}
                options={{
                  existingIngredients: EXISTING_INGREDIENT_OPTIONS,
                  categories: CATEGORY_OPTIONS,
                  ratings: RATING_OPTIONS,
                  cookingTime: COOKING_TIME_OPTIONS,
                  difficulty: DIFFICULTY_OPTIONS,
                }}
              />
              <RecipeSort
                sortBy={sortBy}
                onSort={handleSort}
                options={[
                  { value: 'newest', label: 'Newest' },
                  { value: 'ratingDesc', label: 'Highest Rated' },
                  { value: 'difficultDesc', label: 'Difficult:Easy-Hard' },
                  { value: 'difficultAsc', label: 'Difficult:Hard-Easy' },
                ]}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5">Draft recipes</Typography>
        </Grid>
        {displayDraftRecipes.length !== 0 ? (
          <Grid container xs={12}>
            {displayDraftRecipes.map((recipe: Recipe) => (
              <Grid item key={recipe.id} xs={12} sm={8} md={4} padding={1}>
                <RecipeItem recipe={recipe} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" textAlign="center">
              No Draft recipes found
            </Typography>
          </Grid>
        )}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5">Published recipes</Typography>
        </Grid>
        {displayPublishedRecipes.length !== 0 ? (
          <Grid container xs={12}>
            {displayPublishedRecipes.map((recipe: Recipe) => (
              <Grid item key={recipe.id} xs={12} sm={8} md={4} padding={1}>
                <RecipeItem recipe={recipe} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" textAlign="center">
              No Published recipes found
            </Typography>
          </Grid>
        )}
      </Grid>

      {/* <Pagination count={10} color="primary" sx={{ mt: 8, mx: 'auto' }} /> */}
    </DashboardContent>
  );
}
