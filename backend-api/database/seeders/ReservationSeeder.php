<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Faker\Factory as Faker;

class ReservationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        // Allowed hours: 10:00 to 22:00 (10 AM to 10 PM), excluding 13:00 and 14:00
        $allowedHours = [10, 11, 12, 15, 16, 17, 18, 19, 20, 21, 22];

        // Generate 20 random reservations
        foreach (range(1, 50) as $index) {
            // Pick a random day within the next 7 days
            $randomDate = Carbon::now()->addDays(rand(1, 7));
            $randomHour = $faker->randomElement($allowedHours);

            DB::table('reservations')->insert([
                'full_name'  => $faker->name(),
                'day'        => (int) $randomDate->format('Ymd'), // e.g., 20260819
                'houre'      => $randomHour,                      // 10 to 22 (excluding 13, 14)
                'phone'      => $faker->phoneNumber(),
                'email'      => $faker->optional(0.9)->safeEmail(), // 90% chance to populate
                'status'     => $faker->randomElement(['confirmed', 'cancelled']),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}