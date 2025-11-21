# Playable
Case Study for Playable

OWWEVİEW
This platform allows customers to browse categories, explore products, add items to the shopping cart, and complete a simulated checkout.
Meanwhile, admins can manage products and categories through a dedicated admin panel.

The application includes:

 JWT authentication
 Role-based routing (admin → admin panel, customer → shop)
 Order system
 Cart management
 Category-based product browsing
 Admin CRUD operations

 Tech Stack
-> Frontend
Next.js

TypeScript

TailwindCSS

Zustand (state management)

Axios

-> Backend
Express.js

MongoDB / Mongoose

JWT Authentication


Features
Customer Features (Shop)
Authentication

Users can register and log in.

JWT-based session management is used

After logging in, users are redirected based on their role:

Customers are redirected to the shop page.

Admins are redirected to the admin panel.

Category and Product Browsing

All categories are displayed on the homepage.

When a category is selected, the products belonging to that category are listed.

Product Listing

Products are displayed based on their category.

Each product card includes the product name, price, and image.

Users can add products to their cart.

Shopping Cart

Users can add multiple products to their cart.

The quantity of items in the cart can be increased or decreased.

Items can be removed entirely from the cart.

The total amount is calculated automatically.

Users can complete the order through a simple checkout process.

Order History

Users can view their previous orders.

Orders are stored in the database and displayed with details such as date and total amount.

Profile

Users can view their profile information.

Admin Features (Admin Panel)
Access Control

Only users with the admin role can access the admin panel.

Users without the required role are redirected automatically.

Product Management

Admins can add new products.

Existing products can be listed.

Products can be edited (optional).

Products can be deleted.

Stock information can be managed.

Products can be assigned to categories.

Category Management

Admins can create categories.

Categories can be listed.

Categories can be activated or deactivated (optional).

System Flow
Login Process

The user logs in.

The backend returns data in the following format:

{
  "token": "xxx",
  "user": { "role": "customer" or "admin" }
}


The frontend redirects the user based on the role:

Customer → /shop

Admin → /admin

TEST CASE: 
You can test the project using this user for admin page: email: "test@gmail.com" password: "123456"
If you want you can register for Customer Pages but I added a example customer user: email: "user@gmail.com" password:"123456" 
