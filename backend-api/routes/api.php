<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminActionsController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ReservationsController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('wp-admin')->group(function () {
    Route::post('/login', [AdminActionsController::class, 'LoginAdminPanel']);
});

Route::post('/storecontact', [ContactController::class, 'StoreContact']);
Route::get('/getcontacts', [ContactController::class, 'GetContacts']);


Route::get('/reservations', [ReservationsController::class, 'ReservationsReturn']);
Route::post('/storereservations', [ReservationsController::class, 'StoreReservations']);
