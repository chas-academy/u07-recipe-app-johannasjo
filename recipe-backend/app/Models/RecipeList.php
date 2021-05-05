<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecipeList extends Model
{
    use HasFactory;
    protected $fillable = ['list_title', 'user_id'];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
