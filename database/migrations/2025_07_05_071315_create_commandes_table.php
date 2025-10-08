<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommandesTable extends Migration
{
    public function up()
    {
        Schema::create('commandes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');  
            $table->foreignId('commande_id')->nullable()->constrained()->onDelete('set null');
            $table->string('prenom'); 
            $table->string('nom');  
            $table->string('adresse'); 
            $table->string('ville');  
            $table->string('code_postal');  
            $table->string('telephone');  
            $table->string('statut', 20)->default('en_attente');  
            $table->decimal('total', 10, 2);  
            $table->timestamps(); 
        });
    }

    public function down()
    {
        Schema::dropIfExists('commandes');
    }
}