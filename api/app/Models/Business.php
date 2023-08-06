<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Laravel\Scout\Searchable;

class Business extends Model
{

    /*
        Status possible values:

        0: Pending
        1: Approved
        2: Rejected
    */
    protected $fillable = [
        'name','description','direction','location_link','owner','telephone','province_id','cellphone','email','website','facebook','instagram','status','photos',
    ];

    protected $cast = [
        'photos' => 'array'
    ];

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class);
    }

    public function toSearchableArray()
    {
        return [
            'name' => '',
            'description' => '',
            'owner' => ''
        ];
    }

    public function makeAllSearchableUsing($query)
    {
        return $query->with('categories');
    }
    
    use HasFactory;
    use Searchable;
}
