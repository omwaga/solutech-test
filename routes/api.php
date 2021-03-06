<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('/suppliers', 'App\Http\Controllers\APIs\SuppliersController');
Route::resource('/supplier-products', 'App\Http\Controllers\APIs\SupplierProductsController');
Route::resource('/all-orders', 'App\Http\Controllers\APIs\OrdersController');
Route::resource('/products', 'App\Http\Controllers\APIs\ProductsController');
Route::resource('/order-details', 'App\Http\Controllers\APIs\OrderDetailsController');
