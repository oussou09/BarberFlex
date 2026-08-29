<?php

namespace App\Http\Controllers;

use App\Models\AdminActions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password; // ✅

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
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(AdminActions $adminActions)
    {
        //
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
