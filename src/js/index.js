import request from './bestbuy';


export default class App{
	constructor() {
		this.initBBCall();
	}

	initBBCall () {
		request({url: "https://api.bestbuy.com/v1/products((categoryPath.id=abcat0502000))",api : '8ccddf4rtjz5k5btqam84qak'})
		.then(data => {
			console.log(data);
			function getIt(manufacturer, name, image, salePrice){
				var companyName = $('<h2 class=manufacturer> </h2>');
				var productName = $('<h3 class=name> </h3>');
				var productImg = $('<img class=productImage> </img>').css({'height':'300px','width':'auto', 'margin': '0 auto'});
				var productPrice = $('<h4 class=price> </h4>');
				var button = $(`<button data-sku=${sku} data-price=${salePrice} class=addToCart>Add to Cart </button>`);


				$(companyName).append(manufacturer);
				$(productName).append(name);
				$(productImg).attr('src', image);
				$(productPrice).append("$", salePrice);
				var container = $('<div></div>');
        container.append(companyName, productName, productImg, productPrice, button);
				$('#products').append(container);
				console.log('product added to page');

			}
			for (var i = 0; i <= 5; i++) {
				var manufacturer = data.products[i].manufacturer;
				var name = data.products[i].name;
				var sku = data.products[i].sku;
				var image = data.products[i].image;
				var salePrice = data.products[i].salePrice;
        getIt(manufacturer, name, image, salePrice);
			};

			$(document).ready(function(){
				console.log('bxslider initiated');
     window.slider = $('#products').bxSlider({
       minSlides: 2,
       maxSlides: 2,
       slideWidth: 400,
       slideMargin: 0,
       controls: false,
     });
   });
window.slider.reloadSlider();
		})
		.catch(error => {
			console.log('warning Christopher Robins... Error');
			console.log(error);
		});
	};

	argBBCall (path) {
		request({url: 'https://api.bestbuy.com/v1/products' + path,api : '8ccddf4rtjz5k5btqam84qak'})
		.then(data => {
			console.log(data);
			function getIt(){
				var companyName = $('<h2 class=manufacturer> </h2>');
				var productName = $('<h3 class=name> </h3>');
				var productImg = $('<img class=productImage> </img>').css({'height':'300px','width':'auto', 'margin': '0 auto'});
				var productPrice = $('<h4 class=price> </h4>');
				var button = $(`<button data-sku=${sku} data-price=${salePrice} class=addToCart>Add to Cart </button>`);


				$(companyName).append(manufacturer);
				$(productName).append(name);
				$(productImg).attr('src', image);
				$(productPrice).append('$', salePrice);
				var container = $('<div></div>');
				container.append(companyName, productName, productImg, productPrice, button);
				$('#products').append(container);
			}
			for (var i = 0; i <= 5; i++) {
				var manufacturer = data.products[i].manufacturer;
				var name = data.products[i].name;
				var sku = data.products[i].sku;
				var image = data.products[i].image;
				var salePrice = data.products[i].salePrice;
        getIt(manufacturer, name, image, salePrice, sku);
			};
			 window.slider.reloadSlider();
		})
		.catch(error => {
			console.log('warning Christopher Robins... Error');
			console.log(error);
		});
	};
}
let x = new App;

$(document).ready(function(){
	$('li').on('click', function() {
		$('#products').empty();
		x.argBBCall($(this).attr('id'));
	});
});

				$("#products").on('click', 'button', function() {
          var sku = $(event.target).data("sku");
					var price = $(event.target).data("price");
					var old = sessionStorage.getItem(sku);
			if (old == null)	{	var object = {
						 price,
					 quantity: 1
				 }
				 sessionStorage.setItem(sku, JSON.stringify(object));
			}
			else {
				old = JSON.parse(old);
				old.quantity++;
				sessionStorage.setItem(sku, JSON.stringify(old));
			}

			quickView();
			console.log(sku, object);



		});

		function quickView(){
			var totalItems = $(' <h3 class=totalItems></h3>');
			var cartTotal = $('<h3 class=cartTotal> Cart Total  : </h3>');
			$('.items').empty();
			var totalItemsinCart = 0;
			var totalPrice = 0;
			for (var i = 0; i < sessionStorage.length; i++) {
				var key = sessionStorage.key(i);
				var product = JSON.parse(sessionStorage.getItem(key));
				var price = product.price;
				var quantity = product.quantity;
				var subtotal = price * quantity;
				totalPrice += subtotal;
				totalItemsinCart += parseInt(quantity);
				store(key, product, quantity, price);




			}
			$('.totalItems').text('Total Items:' + totalItemsinCart);
			$('.cartTotal').text('Cart Total:' + totalPrice.toFixed(2));

      $('.update').on('click', function(event){
				var findQuantity = ($(event.target).parent().find('input').val());
				var cartSku = $(event.target).data('sku');
				console.log(cartSku);
				console.log(event.target);
				var oldObject = JSON.parse(sessionStorage.getItem(cartSku));
				var newObject = oldObject;
				newObject.quantity = findQuantity;
				sessionStorage.setItem(cartSku, JSON.stringify(newObject));
				quickView();
			})




			function store() {

			var sku = $('<h5 class=sku>sku  : </h5>');
			var word = $('<span> Quantity: </span>');
			var amount = $('<input class=quantity></input>');
			var money = $('<h5 class=money>total  :</h5>');

			var remove = $('<button class=remove> Remove </button>');
			var container = $('<div class=product></div>');

      remove.attr('data-sku', key);
			remove.on('click', function(event){
				var removeSku = $(event.target).data('sku');
				sessionStorage.removeItem(removeSku);
				quickView();
			})
      $(amount).val(quantity);
			$(totalItems).text('Total Items: ' + quantity);
			$(cartTotal).text('Cart Total:' + '$' + money);
			$(sku).text('sku:' + key);
			var update = $(` <button data-sku=${key} class=update> Update </button>`);
			$(amount).text('quantity:' + quantity);
			$(money).text('total:' + '$' + (price * quantity).toFixed(2));
			container.append(sku, word, amount, money, update, remove);
		  $('.items').append(container);

		}

};

var modal = $('#myModal');
var cart = $("#cart");
var span = $(".close")[0];

$(document).ready(function(){
	$("#cart").on("click", function(){
		modal.css('display', "block");
		quickView();
	})
})
$(document).ready(function(){
	$('.close').on('click',function(){
		modal.css('display', 'none');
	})
})
$(window).on('click', function(event){
    if(event.target.id == 'myModal'){
        $('#myModal').css({display: "none"});
    }
});
