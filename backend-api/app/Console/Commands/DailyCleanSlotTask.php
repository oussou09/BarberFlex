<?php

namespace App\Console\Commands;

use App\Models\Reservations;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Carbon\Carbon;

#[Signature('app:daily-clean-slot-task')]
#[Description('Command description')]
class DailyCleanSlotTask extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:daily-clean-slot-task';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Executes daily automated tasks For: cleanup today slot';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //
        // Example: \App\Models\User::where('status', 'pending')->delete();
        $yesterday = Carbon::yesterday('Africa/Casablanca')->format('Ymd');

        $deletedCount = Reservations::where('day', $yesterday)->delete();

        $this->info("Daily task executed successfully! Cleaned {$deletedCount} slots for date: {$yesterday}.");
    }
}
