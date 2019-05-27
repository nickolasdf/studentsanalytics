<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = [
        'address',
        'region',
        'tel',
        'email',
        'vnz',
        'prof',
        'date',
        'name',
        'isJoined',

    ];
}
