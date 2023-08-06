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
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->text('name');
            $table->timestamps();
        });

        // Inserting the data for this column
        DB::table('categories')->insert([
            ['name' => 'SALUD'],
            ['name' => 'TURISMO'],
            ['name' => 'DEPORTES'],
            ['name' => 'EDUCACIÓN'],
            ['name' => 'TECNOLOGÍA'],
            ['name' => 'CONSULTORÍA'],
            ['name' => 'GASTRONOMÍA'],
            ['name' => 'CONSTRUCCIÓN'],
            ['name' => 'TRANSPORTACIÓN'],
            ['name' => 'SOCIEDAD Y CULTURA'],
            ['name' => 'MEDIOS DE COMUNICACIÓN'],
            ['name' => 'ARTES Y ENTRETENIMIENTO'],
            ['name' => 'VENTAS DE PRODUCTOS Y SERVICIOS'],
            ['name' => 'ARQUITECTURA'],
            ['name' => 'VETERANOS'],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
