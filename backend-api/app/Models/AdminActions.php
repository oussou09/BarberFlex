<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdminActions extends Model
{

    protected $table = 'admin_actions';
    protected $fillable = [
        'fullname',
        'email',
        'password',
    ];

}
