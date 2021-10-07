import Alpine from "alpinejs";
import "lazysizes";

import "./css/main.css";

window.Alpine = Alpine;
// Register Alpine stores
const alpineStores = require.context("./stores/", true, /\.js$/);
alpineStores.keys().forEach((key) => {
	const store = alpineStores(key).default;
	const name = store.name;
	Alpine.store(name, store.store());
});

// Register Alpine components
const alpineComponents = require.context("./components/", true, /\.js$/);
alpineComponents.keys().forEach((key) => {
	const component = alpineComponents(key).default;
	const name = component.name;
	Alpine.data(name, component.component);
});

Alpine.start();
