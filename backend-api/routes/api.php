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
    //admin csrf token route
});

Route::post('/storecontact', [ContactController::class, 'StoreContact']);
Route::get('/getcontacts', [ContactController::class, 'GetContacts']);


Route::get('/reservations', [ReservationsController::class, 'ReservationsReturn']);
Route::post('/storereservations', [ReservationsController::class, 'StoreReservations']);
