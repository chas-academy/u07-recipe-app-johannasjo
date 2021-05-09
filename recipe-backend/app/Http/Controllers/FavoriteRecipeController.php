<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Favorite;

class FavoriteRecipeController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('auth:api');
    //     /* $this->user = auth()->user(); */
    // }

    // get all recipes from certain list
    public function index($id)
    {
        $favorite = Favorite::findOrfail($id);

        return response()->json(
            $favorite->recipes()->get()
        );
    }

    public function destroy($id, $recipeId)
    {
        $favorite = Favorite::findOrfail($id);

        return $favorite->recipes()->detach($recipeId);
    }

    public function update($id, $recipeId)
    {
        $favorite = Favorite::findOrfail($id);

        return $favorite->recipes()->attach($recipeId);
    }
}
