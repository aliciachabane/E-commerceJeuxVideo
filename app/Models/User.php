<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash; 

class User extends Authenticatable

{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'created_at',
        'updated_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
        
        ];
    }

    public function setPasswordAttribute($value)
    {
       
        if (!empty($value)) {
            $this->attributes['password'] = Hash::make($value);
        }
    }

    public function getFullNameAttribute()
    {
        return $this->name;
    }
}