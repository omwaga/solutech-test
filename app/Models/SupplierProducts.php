<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupplierProducts extends Model
{
    use HasFactory;

    protected $fillable = ['supply_id', 'product_id'];

    public function supplier()
    {
    	return $this->belongsTo(Suppliers::class, 'supply_id', 'id');
    }

    public function product()
    {
    	return $this->belongsTo(Products::class, 'product_id', 'id');
    }
}
