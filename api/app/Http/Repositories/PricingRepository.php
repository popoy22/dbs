<?php 

namespace App\Repositories;

use App\Pricing;
use DB;

class PricingRepository implements PricingRepositoryInterface
{
    public function getRealTime(){
        
        $fields = DB::raw(
        "symbol, 
        (SELECT (t2.bid_price + t2.ask_price) / 2   FROM pricings t2 WHERE t2.symbol = t1.symbol ORDER BY event_time DESC LIMIT 1 OFFSET 0)  as price,
        (SELECT (bid_price + ask_price) / 2   FROM pricings t2 WHERE t2.symbol = t1.symbol ORDER BY event_time DESC LIMIT 1 OFFSET 1 ) as prev_market_price,
        (SELECT (bid_price + ask_price) / 2   FROM pricings t2 WHERE t2.symbol = t1.symbol ORDER BY event_time DESC LIMIT 1 OFFSET 1  ) - (bid_price + ask_price)  as difference,
        (SELECT t2.event_time  FROM pricings t2 WHERE t2.symbol = t1.symbol ORDER BY event_time DESC LIMIT 1 OFFSET 0)  as current_event_time
        "
            
    );
        return DB::table('pricings as t1')->select(
            $fields
           
        )->limit(500)->get();
    }


    function getBySymbol($symbol){
       return Pricing::where("symbol",$symbol)->orderBy('event_time','desc')->get();
    }


} 

?>