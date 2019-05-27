<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class StudentStat extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
          Schema::create('students', function (Blueprint $table) {
                    $table->increments('id');
                    $table->string('address');
                    $table->string('region');
                    $table->string('tel');
                    $table->string('email',250)->unique();
                    $table->string('vnz');
                    $table->string('prof');
                    $table->string('name');
                  //  $table->string('date');
                    $table->boolean('isJoined');

                    $table->timestamps();
                });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
