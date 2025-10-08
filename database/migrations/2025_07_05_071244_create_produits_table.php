<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProduitsTable extends Migration
{
    public function up()
    {
        Schema::create('produits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->string('nom');
            $table->string('image')->nullable();
            $table->text('description')->nullable();
            $table->decimal('prix', 10, 2);
            $table->integer('stock')->default(0);
            $table->timestamps();
             $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('produits');
    }
}