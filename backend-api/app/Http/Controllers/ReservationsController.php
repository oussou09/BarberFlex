<?php

namespace App\Http\Controllers;

use App\Models\Reservations;
use Illuminate\Http\Request;

class ReservationsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function ReservationsReturn()
    {
        $reservations = Reservations::all();
        return response()->json([
            'reservations' => $reservations
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function StoreReservations(Request $request)
    {
        if($request->isMethod('post')){

            $validationData = $request->validate([
                'full_name' => 'required|string|max:255',
                'day' => 'required|integer',
                'houre' => 'required|integer',
                'phone' => 'required|string|max:20',
                'email' => 'nullable|email',
            ]);

            try{
                $reservation = Reservations::create($validationData);
            return response()->json([
                    'message' => 'Reservation stored successfully',
                    'reservation' => $reservation,
                ], 201);

            }catch(\Exception $e){
                return response()->json([
                    'message' => 'Failed to store reservation',
                    'error' => $e->getMessage()
                ], 500);
            }

        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Reservations $reservations)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Reservations $reservations)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Reservations $reservations)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reservations $reservations)
    {
        //
    }
}
