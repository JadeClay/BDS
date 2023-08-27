<?php

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Province;
use App\Models\Category;
use App\Models\Business;
use App\Models\User;

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

/* 
    LOGIN
    Search for the user, and compare the given information, 
    then it creates a Bearer Token to authenticate all the request made to the API on protected routes by Laravel Sanctum.
*/
Route::post('/login', function (Request $request) {

    $info = [
        'success' => false,
        'token' => null,
    ];

    $user = User::where('username', $request->username )->first();

    if ( !empty( $user ) && Hash::check($request->password, $user->password) ) {
        $info['success'] = true;
        $token = $user->createToken( $user->id )->plainTextToken;
        return [
            'success' => true,
            'token' => $token,
        ];
    } else {
        return response("User not found",404);
    }

});

Route::middleware('auth:sanctum')->post('/categories/delete/{id}', function(Request $request, string $id){
    try {
        $businesses = Category::find($id)->businesses()->get();
    
        foreach ($businesses as $business) {
            $business->categories()->detach($id);
        }
    
        return Category::find($id)->delete();
    } catch (\Throwable $th) {
        return $th;
    }
});

Route::middleware('auth:sanctum')->post('/categories/edit/{id}', function(Request $request, string $id){
    try {
        $category = Category::find($id);
        $category->name = $request->name;
        $category->save();
    } catch (\Throwable $th) {
        return $th;
    }

    return response("Updated succesfully", 204);
});

Route::middleware('auth:sanctum')->post('/categories/new', function(Request $request){
    
    try {
        $category = new Category;
        $category->name =  strtoupper($request->input("name"));
        $category->save();
    } catch (\Throwable $th) {
        return $th;
    }

    return response("Created sucessfully", 201);
});

/* 
    GET - GENERAL INFORMATION
    Endpoints to get all information saved in the tables of the database.
*/
Route::get('/provinces', function (Request $request){
    return Province::all();
});

Route::get('/categories', function(Request $request){
    return Category::all()->sortBy('name')->values()->all();
});

Route::get('/categories/dashboard', function(Request $request){
    return Category::orderBy('name')->paginate(5);
});

Route::get('/business',function(Request $request){
    return Business::all();
});

Route::get('/business/public',function(Request $request){
    return Business::where('status',1)->get();
});

/* 
    GET - SPECIFIC BUSINESS 
    Endpoints to get the information of an specific business, by an ID
*/
Route::get('/business/{id}',function(Request $request, string $id){
    $businesses = Business::all();

    $business = $businesses->find((int) $id);
    return $business;
});

Route::get('/business/category/{id}',function(Request $request,string $id){;
    $business = Business::find($id);
    return $business->categories;
});

Route::get('/business/photos/{id}',function(Request $request, string $id){
    try{
        $business = Business::find($id);
        return $business->photos;
    }catch(\Throwable $th){
        return $th;
    }
});

/* 
    INDEXING BUSINESS BY STATUS (FOR DASHBOARD TABLE)
    0 - Pending approval
    1 - Approved
    2 - Rejected
*/
Route::get('/business/list/{status}',function(Request $request, string $status){
    switch ($status) {
        case '0':
            return Business::where('status','=',0)->paginate(5);
        case '1':
            return Business::where('status', '=', 1)->paginate(5);
        case '2':
            return Business::where('status', '=', 2)->paginate(5);
        default:
            return Business::paginate(5);
    }
});

/* 
    SEARCH BUSINESS BY CATEGORY
    Retrieve every business that has the specific category in the database
*/
Route::get('/business/search/category/{category}',function(Request $request, string $category){
    try{
        return Business::whereHas('categories', function ($query) use($category){
            $query->where('business_category.category_id',$category);
        })->where('status',1)->paginate(5);
    }catch(\Throwable $th){
        return $th;
    }

});

/* 
    SEARCH BUSINESS BY TEXT
    Uses Laravel Scout to retrieve the businesses that contains the search string in their names or descriptions
*/
Route::get('/business/search/{searchString}',function(Request $request, string $searchString){
    
    if($searchString != "1"){
        return Business::search($searchString)->where('status',1)->paginate(5);
    }
    
    return Business::where('status',1)->paginate(5);
});

/* 
    SEARCH BUSINESS BY TEXT - DASHBOARD
    Uses Laravel Scout to retrieve the businesses that contains the search string in their names or descriptions
*/
Route::get('/business/search/dashboard/{searchString}',function(Request $request, string $searchString){
    
    return Business::search($searchString)->paginate(5);
    
});

/* 
    MANAGEMENT OF BUSINESS 
    Endpoints to edit, and manage the businesses created in the database
*/
Route::middleware('auth:sanctum')->post('/business/reject/{id}',function(Request $request, string $id){
    try {
        $business = Business::find($id);
        $business->status = 2;
        $business->save();
        return $business;
    } catch (\Throwable $th) {
        return $th;
    }
});

Route::middleware('auth:sanctum')->post('/business/approve/{id}',function(Request $request, string $id){
    try {
        $business = Business::find($id);
        $business->status = 1;
        $business->save();
        return $business;
    } catch (\Throwable $th) {
        return $th;
    }
});

Route::middleware('auth:sanctum')->post('/business/edit/{id}',function(Request $request, string $id){

    // Saving the data of the new Business in the table via the Eloquent ORM
    try {
        $business = Business::find($id);
        $business->name = $request->input('name');
        $business->description = $request->input('description');
        $business->direction = $request->input('direction');
        if($request->input('location_link') != null){
            $business->location_link = $request->input('location_link');
        }
        $business->telephone = $request->input('telephone');
        $business->cellphone = $request->input('cellphone');
        $business->owner = $request->input('owner');
        $business->province_id = $request->input('province_id');
        $business->email = $request->input('email');
        if($request->input('website') != null && $request->input('website') != "null"){
            $business->website = $request->input('website');
        }
        if($request->input('facebook') != null && $request->input('facebook') != "null"){
            $business->facebook = $request->input('facebook');
        }
        if($request->input('instagram') != null && $request->input('instagram') != "null"){
            $business->instagram = $request->input('instagram'); 
        }
        

        $path = '/home/mkplace/public_html/api/images'; // THIS IS FOR PRODUCTION
        $deletePath = '/home/mkplace/public_html/api';
        if($request->input('logo') != "undefined"){ // Seeking if there is any change in LOGO
            if($business->logo != "undefined"){
                File::delete($deletePath . $business->logo);
            }
            $image = 'LOGO_' .$business->name . '.' . $request->file('logo')->getClientOriginalExtension(); // Generating the name for the LOGO
            $request->file('logo')->move($path,$image);

            $business->logo = 'images/' . $image;   // Saving the relative URL to the database
        }

        if($request->input('images') != "0"){ // Seeking if there is any change in LOGO
            $cantImages = $request->input('images');
            
            if($business->photos != ""){
                $savedImages = json_decode($business->photos);
    
                foreach ($savedImages as $image) {
                    File::delete($path . "/" . $image);
                }
            }
            for ($i=0; $i < $cantImages; $i++) { 
                $randomId = Str::random(5);
                $newImage = 'IMG_'.$business->name . '_' . $randomId . '.' . $request->file('image-'.$i)->getClientOriginalExtension();
                $request->file('image-'.$i)->move($path,$newImage);
                $imagesURL[$i] = $newImage;
            }

            $business->photos = json_encode($imagesURL);
        }
        $business->save();

        if($request->input('category') != "undefined"){ // Seeking if there is any change in Categories
            $aux = $request->input('category');
            $categories = explode(",",$aux);
            $business->categories()->detach();

            foreach ($categories as $category) {
                $saveCategory = Category::find($category);
                $saveCategory->businesses()->save($business);
            }
        }
        
    } catch (\Throwable $th) {
        return $th;
    }

    // If everything is okay, returning the business object as a response.
    return response("Updated succesfully",204);
});

/* 
    CREATE BUSINESS
    Endpoint to create a new business in the database, handles photos, logo, etc.
*/
Route::post('/business/new',function(Request $request){

    // Saving the data of the new Business in the table via the Eloquent ORM
    try {
        $business = new Business;
        $business->name = $request->input('name');
        $business->description = $request->input('description');
        $business->direction = $request->input('direction');
        $business->location_link = $request->input('location_link');
        $business->telephone = $request->input('telephone');
        $business->cellphone = $request->input('cellphone');
        $business->owner = $request->input('owner');
        $business->province_id = $request->input('province_id');
        $business->email = $request->input('email');
        $business->website = $request->input('website');
        $business->facebook = $request->input('facebook');
        $business->instagram = $request->input('instagram');

        $business->status = 0; // Adding the status of PENDING REVIEW to the business

        if ($request->input('logo') != "undefined") {
            $path = '/home/mkplace/public_html/api/images'; // THIS IS FOR PRODUCTION
            $image = 'LOGO_' .$business->name . '.' . $request->file('logo')->getClientOriginalExtension(); // Generating the name for the LOGO
            $request->file('logo')->move($path,$image); // Change path for public_path('images') when in development
    
            $business->logo = 'images/' . $image; // Saving the relative URL of the Logo to the database
        }

        
        // Saving the images for the corporate profile
        if ($request->input('images') != "undefined") {
            $quantity = $request->input('images');
            $imagesURL = [];
            for ($i=0; $i < $quantity; $i++) { 
                $randomId = Str::random(5);
                $newImage = 'IMG_'.$business->name . '_' . $randomId . '.' . $request->file('image-'.$i)->getClientOriginalExtension();
                $request->file('image-'.$i)->move($path,$newImage); // Change path for public_path('images') when in development
                $imagesURL[$i] = $newImage;
            }

            $business->photos = json_encode($imagesURL);
        }
        
        $business->save();

        // Saving the categories of the business in the pivot table
        $aux = $request->input('category');
        $categories = explode(",",$aux);
        foreach ($categories as $category) {
            $saveCategory = Category::find($category);
            $saveCategory->businesses()->save($business);
        }
        return response("Created sucessfully",201);

    } catch (\Throwable $th) {
        return $th;
    }
    
    // The process didn't get triggered, there's something wrong...
    return response(500);
});

/* 
    USER
    Retrieves data of user
*/
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
