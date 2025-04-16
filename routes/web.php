<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public Routes
Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/menu', function () {
    return Inertia::render('Menu');
})->name('menu');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/health-corner', function () {
    return Inertia::render('HealthCorner');
})->name('health-corner');

Route::get('/business', function () {
    return Inertia::render('Business');
})->name('business');

Route::get('/locations', function () {
    return Inertia::render('Locations');
})->name('locations');

Route::get('/order', function () {
    return Inertia::render('Order');
})->name('order');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

// Product detail pages
Route::get('/products/{product}', function ($product) {
    // You would typically fetch product details from a database here
    return Inertia::render('ProductDetail', [
        'productSlug' => $product
    ]);
})->name('product.detail');

// Blog routes
Route::get('/blog/{slug}', function ($slug) {
    return Inertia::render('BlogPost', [
        'postSlug' => $slug
    ]);
})->name('blog.post');

// Bake-along routes
Route::get('/bake-along/{recipe}', function ($recipe) {
    return Inertia::render('BakeAlong', [
        'recipeSlug' => $recipe
    ]);
})->name('bake-along');

// Authentication & Dashboard
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';