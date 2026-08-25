<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    //
    public function StoreContact(Request $request){
        $validateData = $request->validate([
            'full_name' => 'required|string|max:255',
            'message' => 'required|string'
        ]);

        try {

            Contact::create($validateData);

            return response()->json([
                'message' => 'Contact message stored successfully'
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to store contact message',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function GetContacts(){

        try{

            $contacts = Contact::all();

            return response()->json([
                'contacts' => $contacts
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve contacts',
                'error' => $e->getMessage()
            ], 500);
        }

    }
}
