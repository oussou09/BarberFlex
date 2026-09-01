<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminActionsController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ReservationsController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/wp-admin/login', [AdminActionsController::class, 'LoginAdminPanel']);
Route::prefix('wp-admin')->middleware(['auth:sanctum','abilities:role:admin'])->group(function () {
    // verify the admin csrf token validation
    Route::get('/verifytoken',[AdminActionsController::class, 'TokenValidator']);
    //admin csrf token route
    Route::post('/cancelslot',[AdminActionsController::class, 'handleCancelSlot']);
    Route::get('/getblockedusers',[AdminActionsController::class, 'GetBlockedUsers']);
    Route::post('/storeblockusers',[AdminActionsController::class ,'handleBlockUsers']);
});

Route::post('/storecontact', [ContactController::class, 'StoreContact']);
Route::get('/getcontacts', [ContactController::class, 'GetContacts']);


Route::get('/reservations', [ReservationsController::class, 'ReservationsReturn']);
Route::post('/storereservations', [ReservationsController::class, 'StoreReservations']);
