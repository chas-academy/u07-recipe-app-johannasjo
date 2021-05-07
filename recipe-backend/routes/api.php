<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\RecipeListController;

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
});


Route::group([
    'middleware' => 'api',
    'prefix' => 'auth',

], function ($router) {
    
    Route::get('/recipes', [RecipeController::class, 'index']);
    Route::get('/recipes/{id}', [RecipeController::class, 'show']);
    Route::delete('/recipes/{id}', [RecipeController::class, 'destroy']);
    Route::post('/recipes', [RecipeController::class, 'store']);

    Route::get('/recipe-lists', [RecipeListController::class, 'index']);
    Route::get('/recipe-lists/{id}', [RecipeListController::class, 'show']);
    Route::post('/recipe-lists', [RecipeListController::class, 'store']);
    Route::put('/recipe-lists/{id}', [RecipeListController::class, 'update']);
    Route::delete('/recipe-lists/{id}', [RecipeListController::class, 'destroy']);
});