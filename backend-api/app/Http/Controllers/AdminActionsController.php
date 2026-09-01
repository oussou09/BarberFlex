<?php

namespace App\Http\Controllers;

use App\Models\AdminActions;
use App\Models\BlockedUsers;
use App\Models\Reservations;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

// use Illuminate\Support\Facades\Password;
class AdminActionsController extends Controller
{
    /**
     * handle login admin.
     */

    public function LoginAdminPanel(Request $request)
    {
        $DataValidator = $request->validate([
            'email' => ['required', 'string', 'email', 'max:255', 'exists:admin_actions,email'],
            'password' => ['required', 'string', Password::min(8)->letters()->numbers()],
        ]);

        $EmailAdmin = AdminActions::where('email', $DataValidator['email'])->first();

        if (! $EmailAdmin || ! Hash::check($DataValidator['password'], $EmailAdmin->password)) {
            return response()->json([
                'message' => 'Invalid admin credentials',
            ], 401);
        }

        $AdminToken = $EmailAdmin->createToken('admin_token', ['role:admin'])->plainTextToken;

        return response()->json([
            'message' => 'Admin login successful.',
            'full_name' => $EmailAdmin->fullname,
            'token' => $AdminToken,
        ], 200);
    }

    /**
     * check the csrf token is valid.
     */
    public function TokenValidator(Request $request)
    {
        try {
            $admin = $request->user();
            return response()->json([
                'valid' => true,
                'admin_name' => $admin->fullname,
                'message' => 'Token is valid',
            ], 200);
        }catch (\Throwable $th) {
            return response()->json([
                'valid' => false,
                'message' => 'An error occurred during verification',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * handle the cancelation the slot.
     */
    public function handleCancelSlot(Request $request)
    {
        $dataValidator = $request->validate(['SlotId'=>'required|exists:reservations,id']);

        try {
            $slot = Reservations::findOrFail($dataValidator['SlotId']);
            $slot->update([
                'status' => 'cancelled'
            ]);
            // $slot->delete();
            return response()->json([
                'message' => 'slot has been successfully cancelled'
            ],200);
        }catch (\Exception $e) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Failed to cancel the slot',
                'error'   => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function handleBlockUsers(Request $request)
    {
        $DataValidator = $request->validate([
            'full_name' => 'nullable|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email',
            'reason' => 'nullable|string|max:100',
        ]);

        try {
            $blockedUser = BlockedUsers::create($DataValidator);
            $blockedReservation = Reservations::where('phone', $DataValidator['phone'])->first();
            $blockedReservation?->delete();

            return response()->json([
                'status' => 'success',
                'data' => $blockedUser,
                'message' => 'User has been successfully blocked'
            ],200);
        }catch (\Exception $e) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Failed to block the user',
                'error'   => $e->getMessage()
            ], 500);
        }
    }


    public function GetBlockedUsers()
    {
        try {
            $blockedUsers = BlockedUsers::all();
            return response()->json([
                'status' => 'success',
                'blockedUsers' => $blockedUsers,
                'message' => 'User has been successfully blocked'
            ],200);
        }catch (\Exception $e) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Failed to block the user',
                'error'   => $e->getMessage()
            ], 500);
        }

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AdminActions $adminActions)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AdminActions $adminActions)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AdminActions $adminActions)
    {
        //
    }
}
