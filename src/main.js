// import Alpine from "alpinejs";
import "@ryangjchandler/spruce";
import "alpinejs";
import "alpinejs/dist/alpine-ie11";

import "lazysizes";

import "./css/main.css";

import MainMenu from "./components/MainMenu";
import MobileMenu from "./stores/MobileMenu";

// window.Spruce.store("modal", {
// 	modalOpen: "login",
// 	content: null,
// });

window["mainmenu"] = MainMenu;
window["mobilemenu"] = MobileMenu;
