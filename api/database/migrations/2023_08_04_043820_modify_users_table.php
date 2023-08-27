<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Hash;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function(Blueprint $table){
            $table->renameColumn('email','username');
        });

        /* 
            CREATING THE ADMIN USER
            Change the word inside HASH to set the corresponding password of the user.
        */
        DB::table('users')->insert([
            ['name' => 'root','username' => 'root', 'password' => Hash::make('change this')],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
