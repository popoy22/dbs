<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Pricing;
use Faker\Generator as Faker;

$factory->define(Pricing::class, function (Faker $faker) {
    return [
        'symbol' => strtoupper($faker->randomLetter).$faker->numberBetween(11,99).":SGX",
        'bid_price' => $faker->randomFloat(100,9999),
        'ask_price' => $faker->randomFloat(100,9999),
        'event_time' => $faker->dateTimeBetween($startDate = '-1 years', $endDate = 'now', $timezone = null),
    ];
});