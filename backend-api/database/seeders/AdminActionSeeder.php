<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AdminActionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('admin_actions')->insert([
            'fullname'       => 'System Admin Oussama',
            'email'          => 'admin_oussama@barberflex.com',
            'password'       => Hash::make('password123'),
            'remember_token' => Str::random(10),
            'created_at'     => now(),
            'updated_at'     => now(),
        ]);
    }
}