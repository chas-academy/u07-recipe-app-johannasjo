<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\FavoriteController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);

    Route::get('/recipes', [RecipeController::class, 'index']);
    Route::get('/recipes/{id}', [RecipeController::class, 'show']);

    // many to many relationship described through nestled route:
    Route::delete('/favorites/{id}/recipes/{id}', [RecipeController::class, 'destroy']);
    Route::post('/favorites/{id}/recipes', [RecipeController::class, 'store']);
});


Route::group([
    'middleware' => 'api',
    'prefix' => 'auth',

], function ($router) {

    Route::get('/favorites', [FavoriteController::class, 'index']);
    Route::get('/favorites/{id}', [FavoriteController::class, 'show']);
    Route::post('/favorites', [FavoriteController::class, 'store']);
    Route::put('/favorites/{id}', [FavoriteController::class, 'update']);
    Route::delete('/favorites/{id}', [FavoriteController::class, 'destroy']);
});
