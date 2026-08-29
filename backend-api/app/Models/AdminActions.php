<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class AdminActions extends Model
{
    use HasApiTokens, HasFactory;

    protected $table = 'admin_actions';
    protected $fillable = [
        'fullname',
        'email',
        'password',
    ];
    protected $hidden = [
            'password',
            'remember_token',
        ];

}
