<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Fake;

class ContactsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $contacts = [];

        for ($i = 0; $i < 50; $i++) {
            $contacts[] = [
                'full_name'  => fake()->name(),
                'message'    => fake()->paragraph(),
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // Bulk insert 50 records into the database
        DB::table('contacts')->insert($contacts);
    }
}