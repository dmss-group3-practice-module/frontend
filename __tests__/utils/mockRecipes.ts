import { Recipe } from '../../src/types/Recipe';

export const mockRecipes: Recipe[] = [
  {
    id: 1,
    creatorId: 1,
    name: 'Apple Pie',
    image: 'apple-pie.jpg',
    description: 'A delicious apple pie recipe',
    cookingTimeInMin: 60,
    difficultyLevel: 3,
    cuisine: 'Western',
    rating: 4.5,
    status: 1,
    draftRecipe: null,
    createDatetime: new Date(),
    updateDatetime: new Date(),
    cookingSteps: [],
    ingredients: [],
    reviews: [],
  },
  {
    id: 2,
    creatorId: 1,
    name: 'Banana Cake',
    image: 'banana-cake.jpg',
    description: 'A delicious banana cake recipe',
    cookingTimeInMin: 60,
    difficultyLevel: 2,
    cuisine: 'Western',
    rating: 4.5,
    status: 1,
    draftRecipe: null,
    createDatetime: new Date(),
    updateDatetime: new Date(),
    cookingSteps: [],
    ingredients: [],
    reviews: [],
  },
  {
    id: 3,
    creatorId: 1,
    name: 'Carrot Cake',
    image: 'carrot-cake.jpg',
    description: 'A delicious carrot cake recipe',
    cookingTimeInMin: 60,
    difficultyLevel: 1,
    cuisine: 'Local',
    rating: 4.5,
    status: 1,
    draftRecipe: null,
    createDatetime: new Date(),
    updateDatetime: new Date(),
    cookingSteps: [],
    ingredients: [],
    reviews: [],
  },
];
