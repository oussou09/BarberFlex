<?php

namespace Database\Seeders;

use App\Models\BlockedUsers;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BlockedUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 0; $i < 20; $i++) {
            BlockedUsers::create([
                'full_name' => fake()->name(),
                'phone' => '+2126' . fake()->numerify('########'),
                'email' => fake()->unique()->safeEmail(),
                'reason' => fake()->randomElement([
                    'Repeated no-shows',
                    'Late cancellation',
                    'Inappropriate behavior',
                    'Spam bookings',
                    null,
                ]),
            ]);
        }
    }
}
