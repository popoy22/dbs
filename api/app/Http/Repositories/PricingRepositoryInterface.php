<?php 
namespace App\Repositories;

interface PricingRepositoryInterface
{
    public function getRealTime();
    public function getBySymbol($symbol);
}

?>