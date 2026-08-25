<?php

namespace App\Http\Controllers;

use App\Models\AdminActions;
use Illuminate\Http\Request;

class AdminActionsController extends Controller
{
    /**
     * handle login admin.
     */

    public function LoginAdminPanel(Request $request)
    {
        $email = $request->input('email');
        $password = $request->input('password');

        if (empty($email) || empty($password)) {
            return response()->json(['error' => 'Invalid request.'], 400);
        }

        return response()->json(['success' => 'Admin login successful.'], 200);
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
