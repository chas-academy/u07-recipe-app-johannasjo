<?php

namespace App\Http\Controllers;

use App\Models\RecipeList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class RecipeListController extends Controller
{

    public function __construct() {
        $this->middleware('auth:api');
        $this->user = auth()->user();
    }
  
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
       
      /*   Log::info('Getting the user id' . var_dump($this->user)); */
        
        return $this->user->recipeList()->get(['list_title']); 
        /* RecipeList::all(); */
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
       //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return RecipeList::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\RecipeList  $recipeList
     * @return \Illuminate\Http\Response
     */
    public function show(RecipeList $recipeList, $id)
    {
       /*  $list = $this->user->recipeList()->find($id);

        Log::info('Getting the user id' . var_dump($list));

        if(!$list) {
            return response()->json([
                'success' => false,
                'message' => 'Unfortunately that list can not be found'
            ], 400);
        }

        return $list; */
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\RecipeList  $recipeList
     * @return \Illuminate\Http\Response
     */
    public function edit(RecipeList $recipeList)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\RecipeList  $recipeList
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, RecipeList $recipeList)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\RecipeList  $recipeList
     * @return \Illuminate\Http\Response
     */
    public function destroy(RecipeList $recipeList)
    {
        //
    }
}
