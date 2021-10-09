Spruce.store("mobilemenu", {
	open: false,
	content: null,
	isOpen() {
		return this.open;
	},
	toggle() {
		this.open = !this.open;
	},
	close() {
		this.open = false;
	},
});

export default function mobilemenu() {
	return {
		trigger: {
			["@click.prevent"]() {
				this.$store.mobilemenu.toggle();
			},
			["@keydown.escape"]() {
				this.$store.mobilemenu.close();
			},
		},
		dialogue: {
			["x-show"]() {
				return this.$store.mobilemenu.isOpen();
			},
		},
		transitions: {},
	};
}
