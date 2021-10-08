export default {
	name: "dropdown",
	component() {
		return {
			open: false,
			isOpen() {
				return this.open === true;
			},
			toggle() {
				this.open = !this.open;
			},
			close() {
				this.open = false;
			},
		};
	},
};
