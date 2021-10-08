import Alpine from "alpinejs";
import "lazysizes";

import "./css/main.css";

window.Alpine = Alpine;
// Register Alpine stores
const alpineStores = require.context("./stores/", true, /\.js$/);
alpineStores.keys().forEach((key) => {
	const store = alpineStores(key).default;
	Alpine.store(store.name, store.store());
});

// Register Alpine components
const alpineComponents = require.context("./components/", true, /\.js$/);
alpineComponents.keys().forEach((key) => {
	const component = alpineComponents(key).default;
	Alpine.data(component.name, component.component);
});

Alpine.start();
