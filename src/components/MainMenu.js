export default function mainmenu() {
	return {
		open: false,
		trigger: {
			["@click.prevent"]() {
				this.open = !this.open;
			},
			["@keydown.escape"]() {
				this.open = false;
			},
		},
		dialogue: {
			["x-show"]() {
				return this.open;
			},
			["@click.away"]() {
				this.open = false;
			},
		},
		transitions: {},
	};
}
