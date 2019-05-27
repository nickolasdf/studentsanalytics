<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::view('/', 'welcome');
//Route::view('/{path?}', 'welcome');

Route::get(     'students',              'StudentController@index');
Route::get(     'students/{student}',    'StudentController@show');
Route::post(    'students',              'StudentController@store');
Route::put(     'students/{student}',    'StudentController@update');
Route::delete(  'students/{student}',    'StudentController@delete');
