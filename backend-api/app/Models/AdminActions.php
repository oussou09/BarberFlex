<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
class AdminActions extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

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
