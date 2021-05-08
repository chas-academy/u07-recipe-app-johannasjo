<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    use HasFactory;

    protected $fillable = ['title'];

    public function recipeList()
    {
        return $this->belongsToMany(Favorite::class);
    }
}
