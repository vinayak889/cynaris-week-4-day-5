<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('recruiter_id')->constrained('users')->cascadeOnDelete();
            $table->string('title');
            $table->string('company');
            $table->string('location');
            $table->string('employment_type');
            $table->string('salary_range')->nullable();
            $table->string('category');
            $table->text('description');
            $table->enum('status', ['draft','published','closed'])->default('draft');
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('jobs'); }
};
