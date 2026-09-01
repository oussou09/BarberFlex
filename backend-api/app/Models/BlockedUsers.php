<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BlockedUsers extends Model
{
    //
    protected $table = 'blocked_users';
    protected $fillable = [
        'full_name',
        'phone',
        'email'
    ];
}
