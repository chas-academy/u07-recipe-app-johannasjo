<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class FavoriteController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api');
        $this->user = auth()->user();
        /* $this->user = User::find(1); */
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        /*   Log::info('Getting the user id' . var_dump($this->user)); */

        return $this->user->favorites()->get(['title']);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $storeData = $this->validate($request, [
            'title' => 'required',
            'user_id' => 'required'
        ]);

        $id = $this->user->id;

        Log::info('Getting the user id' . $id);
        if ($storeData['user_id'] != $id) {
            return response()->json([
                'success' => false,
                'message' => 'Unfortunately your list could not be saved',
            ], 403);
        }

        $list = Favorite::create($storeData);

        if ($list)
            return response()->json([
                'success' => true,
                'list' => $list
            ]);
        else
            return response()->json([
                'success' => false,
                'message' => 'Unfortunately your list could not be saved',
            ], 400);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Favorite  $favorite
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $list = $this->user->favorites()->find($id);

        if (!$list) {
            return response()->json([
                'success' => false,
                'message' => 'Unfortunately that list can not be found'
            ], 404);
        }

        return $list;
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Favorite  $favorite
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Favorite $favorite, $id)
    {
        $list = Favorite::find($id);
        $updateData = $list->fill($request->all())->save();
        $userId = $this->user->id;

        if ($list['user_id'] != $userId) {
            return response()->json([
                'message' => "You don't have right to update this list",
            ], 403);
        }

        /* $updatedList = Favorite::update($storeData)->save(); */

        if ($updateData)
            return response()->json(
                $list,
            );
        else
            return response()->json([
                'message' => 'Unfortunately your list could not be saved',
            ], 400);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Favorite  $favorite
     * @return \Illuminate\Http\Response
     */
    public function destroy(Favorite $favorite, $id)
    {
        $list = Favorite::findOrFail($id);
        $userId = $this->user->id;

        // rewrite as middleware
        if ($list['user_id'] != $userId) {
            return response()->json([
                'message' => "You don't have right to delete this list",
            ]);
        }

        $list->delete();

        return response()->json($list->id);
    }
}
