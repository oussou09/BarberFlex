<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Reservations extends Model
{
    use SoftDeletes;

    protected $table = 'reservations';
    protected $fillable = [
        'full_name',
        'day',
        'houre',
        'phone',
        'email',
        'status',
    ];
}
