<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Favorite;
use App\Models\User;

class FavoriteRecipeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
        $this->user = auth()->user();
    }

    // get all recipes from certain list
    public function index($id)
    {
        $favorite = $this->user->favorites()->findOrfail($id);

        if (!$favorite) {
            return response()->json([
                'success' => false,
                'message' => 'Unfortunately that list could not be found',
            ], 400);
        }

        return response()->json(
            $favorite->recipes()->get()
        );
    }

    public function destroy($id, $recipeId)
    {
        $favorite = Favorite::findOrfail($id);

        if (!$favorite) {
            return response()->json([
                'success' => false,
                'message' => 'Unfortunately that list could not be found',
            ], 400);
        }

        return $favorite->recipes()->detach($recipeId);
    }

    public function update($id, $recipeId)
    {
        $favorite = Favorite::findOrfail($id);

        if ($favorite->recipes()->get($recipeId)) {
            return "The recipe is already added to the list";
        }

        return $favorite->recipes()->attach($recipeId);
    }
}
