<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('businesses', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->longText('description')->nullable();
            $table->foreignId('province_id')->nullable()->constrained(
                table: 'provinces', indexName: 'provinces_id'
            );
            $table->text('direction')->nullable();
            $table->text('location_link')->nullable();
            $table->text('owner')->nullable();
            $table->text('telephone')->nullable();
            $table->text('cellphone')->nullable();
            $table->text('email')->nullable();
            $table->text('website')->nullable();
            $table->text('facebook')->nullable();
            $table->text('instagram')->nullable();
            $table->longText('logo')->nullable();
            $table->json('photos');
            $table->tinyInteger('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('businesses');
    }
};
