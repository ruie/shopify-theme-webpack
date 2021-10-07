export default {
	name: "cart",
	store() {
		return {
			cart: {
				items: [],
			},
			minicartIsVisible: false,
			toggleMinicart() {
				this.minicartIsVisible = !this.minicartIsVisible;
			},
			initialize(cart) {
				this.cart = cart;
			},
			get subTotal() {
				const reducer = (acc, item) => {
					return acc + item.price * item.quantity;
				};

				return this.cart.items.reduce(reducer, 0);
			},
			truncateLongTitle(input) {
				return input.length > 5 ? `${input.substring(0, 18)}...` : input;
			},
			clear() {
				fetch("/cart/clear.js", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
				})
					.then((response) => response.json())
					.then((data) => {
						if (data.items.length === 0) {
							this.cart.items = [];
						}
					});
			},
			addItem(id, qty, properties) {
				let formData = {
					items: [
						{
							id: id.toString(),
							quantity: qty.toString(),
						},
					],
				};

				if (properties) {
					formData["properties"] = properties.toString();
				}

				fetch("/cart/add.js", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(formData),
				})
					.then((response) => response.json())
					.then((data) => {
						let items = data.items;
						let matchFound = false;

						if (!data.status) {
							for (let i = 0; i < items.length; i++) {
								for (let j = 0; j < this.cart.items.length; j++) {
									if (
										items[i].variant_id ===
										this.cart.items[j].variant_id
									) {
										matchFound = true;
										this.cart.items[j] = items[i];
									}
								}
							}

							if (!matchFound) {
								// Item not yet present in Alpine cart. Add item to beginning of array.
								this.cart.items.unshift(items[0]);
							}
						} else {
							console.error(data.message + ": " + data.description);
						}
					});
			},
			updateQuantity(variant_id, qty) {
				let formData = {
					id: variant_id.toString(),
					quantity: qty.toString(),
				};

				fetch("/cart/change.js", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				})
					.then((response) => response.json())
					.then((data) => {
						this.cart.items = data.items;
					});
			},
		};
	},
};
