<?php

use Faker\Generator as Faker;

$factory->define(App\Student::class, function (Faker $faker) {
    return [
        'address' => substr($faker->sentence(2), 0, -1),
        'region' => substr($faker->sentence(2), 0, -1),
        'tel'     => substr($faker->sentence(2), 0, -1),
        'email'   => substr($faker->sentence(2), 0, -1),
        'vnz'     => substr($faker->sentence(2), 0, -1),
        'prof'    => substr($faker->sentence(2), 0, -1),
        'name'    => substr($faker->sentence(2), 0, -1),
        //'date' => substr($faker->sentence(2), 0, -1),
        'isJoined'=> $faker->boolean(),

    ];
});
