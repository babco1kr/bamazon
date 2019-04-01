#bamazon
This is a node application that runs using the inqurier modules. In order to use this application you need to npm i

There are 2 files in this repo, bamazon.js and bamazonManager.js

<h2>bamazon.js</h2><br>
In this file, on start you will be shown all the items in stock and prompted to whether they would like to buy products or Exit.
Upon deciding to buy they will be prompted to say what id they decided to purchase and then the amount they would like to purchase.<br>
Like so:<br>

![buy](/gifs/CustomerBuy.gif)<br>

If they try and purchase more than we have in stock it will tell them there isnt enough quantity and end the program<br>
Like so:<br>

![not-enough](/gifs/notEnough.gif)<br>

<h2>bamazoneManager.js</h2><br>

In this file the user is first prompted as to what they would like to do. They can choose to view products for sale, view low inventory,
add to inventory, add new product, or exit.<br>

Selecting view products results in a table of the products being displayed like so:<br>

![view-products](/gifs/ManagerView.gif)<br>

Selecting view low inventory will display all the produts with less than 5 left in stock like so:<br>

![low-inventory](/gifs/ManagerLowInventory.gif)<br>

Selecting add to inventory will allow the user to add inventory to a product that already exists. It does this by asking the user the id
of the product they would like to add to and how much they would like to add. It then updates the stock of said item like so:<br>

![add-inventory](/gifs/ManagerAddInventory.gif)<br>

Selecting the add new product allows the user to add a new product to be sold by entering all the fields inside of a propmt one at a time like so: <br>

![add-product](/gifs/ManagerAddProduct.gif)