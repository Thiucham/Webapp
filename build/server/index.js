import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { Links, Meta, NavLink, Outlet, Scripts, ScrollRestoration, ServerRouter, UNSAFE_withComponentProps, useLoaderData, useLocation, useNavigate, useOutletContext, useParams } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useRef, useState } from "react";
// \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
// node_modules/@react-router/dev/dist/config/defaults/entry.server.node.tsx
var entry_server_node_exports = /* @__PURE__ */ __exportAll({
	default: () => handleRequest,
	streamTimeout: () => streamTimeout
});
var streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
	if (request.method.toUpperCase() === "HEAD") return new Response(null, {
		status: responseStatusCode,
		headers: responseHeaders
	});
	return new Promise((resolve, reject) => {
		let shellRendered = false;
		let userAgent = request.headers.get("user-agent");
		let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
		let timeoutId = setTimeout(() => abort(), 6e3);
		const { pipe, abort } = renderToPipeableStream(/* @__PURE__ */ jsx(ServerRouter, {
			context: routerContext,
			url: request.url
		}), {
			[readyOption]() {
				shellRendered = true;
				const body = new PassThrough({ final(callback) {
					clearTimeout(timeoutId);
					timeoutId = void 0;
					callback();
				} });
				const stream = createReadableStreamFromReadable(body);
				responseHeaders.set("Content-Type", "text/html");
				pipe(body);
				resolve(new Response(stream, {
					headers: responseHeaders,
					status: responseStatusCode
				}));
			},
			onShellError(error) {
				reject(error);
			},
			onError(error) {
				responseStatusCode = 500;
				if (shellRendered) console.error(error);
			}
		});
	});
}
// ../../../../../@vite-plugin-pwa/virtual:pwa-register
var autoUpdateMode = "true";
var selfDestroying = "false";
var auto = autoUpdateMode === "true";
var autoDestroy = selfDestroying === "true";
function registerSW(options = {}) {
	const { immediate = false, onNeedReload, onNeedRefresh, onOfflineReady, onRegistered, onRegisteredSW, onRegisterError } = options;
	let wb;
	let registerPromise;
	let sendSkipWaitingMessage;
	const updateServiceWorker = async (_reloadPage = true) => {
		await registerPromise;
		if (!auto) sendSkipWaitingMessage?.();
	};
	async function register() {
		if ("serviceWorker" in navigator) {
			wb = await import("./assets/workbox-window.prod.es5-CzJxx9q2.js").then(({ Workbox }) => {
				return new Workbox("/Webapp/sw.js", {
					scope: "/Webapp/app/",
					type: "classic"
				});
			}).catch((e) => {
				onRegisterError?.(e);
			});
			if (!wb) return;
			sendSkipWaitingMessage = () => {
				wb?.messageSkipWaiting();
			};
			if (!autoDestroy) {
				if (auto) {
					wb.addEventListener("activated", (event) => {
						if (event.isUpdate || event.isExternal) {
							if (onNeedReload) onNeedReload();
							else window.location.reload();
						}
					});
					wb.addEventListener("installed", (event) => {
						if (!event.isUpdate) onOfflineReady?.();
					});
				} else {
					let onNeedRefreshCalled = false;
					const showSkipWaitingPrompt = () => {
						onNeedRefreshCalled = true;
						wb?.addEventListener("controlling", (event) => {
							if (event.isUpdate) {
								if (onNeedReload) onNeedReload();
								else window.location.reload();
							}
						});
						onNeedRefresh?.();
					};
					wb.addEventListener("installed", (event) => {
						if (typeof event.isUpdate === "undefined") {
							if (typeof event.isExternal !== "undefined") {
								if (event.isExternal) showSkipWaitingPrompt();
								else !onNeedRefreshCalled && onOfflineReady?.();
							} else !onNeedRefreshCalled && onOfflineReady?.();
						} else if (!event.isUpdate) onOfflineReady?.();
					});
					wb.addEventListener("waiting", showSkipWaitingPrompt);
				}
			}
			wb.register({ immediate }).then((r) => {
				if (onRegisteredSW) onRegisteredSW("/Webapp/sw.js", r);
				else onRegistered?.(r);
			}).catch((e) => {
				onRegisterError?.(e);
			});
		}
	}
	registerPromise = register();
	return updateServiceWorker;
}
// src/root.tsx
var root_exports = /* @__PURE__ */ __exportAll({
	default: () => root_default,
	meta: () => meta
});
var meta = () => [
	{ title: "Thiucham" },
	{
		name: "description",
		content: "Explore songs, lyrics and your favourite music collections on Thiucham."
	},
	{
		name: "keywords",
		content: "Hiuna Khomlui, Khristen Madui Lui, Luisan, Liangmai Hymnal, Liangmai Gospel Lyrics"
	}
];
var root_default = UNSAFE_withComponentProps(function Root() {
	useEffect(() => {
		registerSW();
	}, []);
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsxs("head", { children: [
			/* @__PURE__ */ jsx("meta", { charSet: "UTF-8" }),
			/* @__PURE__ */ jsx("meta", {
				name: "viewport",
				content: "width=device-width, initial-scale=1.0"
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "theme-color",
				content: "#ffffff"
			}),
			/* @__PURE__ */ jsx(Meta, {}),
			/* @__PURE__ */ jsx(Links, {}),
			/* @__PURE__ */ jsx("link", {
				rel: "icon",
				type: "image/png",
				sizes: "192x192",
				href: "/Webapp/icons/icon-192.png"
			}),
			/* @__PURE__ */ jsx("link", {
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			}),
			/* @__PURE__ */ jsx("link", {
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			}),
			/* @__PURE__ */ jsx("link", {
				href: "https://fonts.googleapis.com/css2?family=Open+Sans&display=swap",
				rel: "stylesheet"
			}),
			/* @__PURE__ */ jsx("link", {
				rel: "manifest",
				href: "/Webapp/manifest.webmanifest"
			})
		] }), /* @__PURE__ */ jsxs("body", { children: [
			/* @__PURE__ */ jsx("div", {
				id: "root",
				children: /* @__PURE__ */ jsx(Outlet, {})
			}),
			/* @__PURE__ */ jsx(ScrollRestoration, {}),
			/* @__PURE__ */ jsx(Scripts, {})
		] })]
	});
});
// src/features/site/Home.tsx
var Home_exports$1 = /* @__PURE__ */ __exportAll({ default: () => Home_default$1 });
var Home_default$1 = UNSAFE_withComponentProps(function Home() {
	return /* @__PURE__ */ jsxs("main", { children: [
		/* @__PURE__ */ jsx("section", { children: /* @__PURE__ */ jsx("h1", { children: "Your Digital Liangmai Song book" }) }),
		/* @__PURE__ */ jsxs("section", { children: [
			/* @__PURE__ */ jsx("h2", { children: "About Thiucham" }),
			/* @__PURE__ */ jsx("p", { children: "Thiucham began on August 14th, 2024 with a heartfelt goal to make Liangmai Christian song lyrics easily accessible through a simple and meaningful application." }),
			/* @__PURE__ */ jsx("p", { children: "Today, Thiucham continues to grow as a modern web app, offering a smoother and more reliable experience for everyone." })
		] }),
		/* @__PURE__ */ jsxs("section", { children: [/* @__PURE__ */ jsx("h2", { children: "📚 Song Collections" }), /* @__PURE__ */ jsxs("ul", { children: [
			/* @__PURE__ */ jsx("li", { children: "Hiuna Khomlui" }),
			/* @__PURE__ */ jsx("li", { children: "Khristen Madui Lui" }),
			/* @__PURE__ */ jsx("li", { children: "Luisan" })
		] })] }),
		/* @__PURE__ */ jsxs("section", { children: [/* @__PURE__ */ jsx("h2", { children: "✨ Features" }), /* @__PURE__ */ jsxs("ul", { children: [
			/* @__PURE__ */ jsx("li", { children: "Easy and smooth navigation" }),
			/* @__PURE__ */ jsx("li", { children: "Clean and distraction-free design" }),
			/* @__PURE__ */ jsx("li", { children: "Works across mobile and desktop" }),
			/* @__PURE__ */ jsx("li", { children: "No tracking — your privacy is respected" })
		] })] }),
		/* @__PURE__ */ jsxs("section", { children: [/* @__PURE__ */ jsx("a", {
			href: "#",
			target: "_blank",
			rel: "noreferrer",
			children: "Download android apk"
		}), /* @__PURE__ */ jsx("a", {
			href: "#",
			target: "_blank",
			rel: "noreferrer",
			children: "Open from browser"
		})] }),
		/* @__PURE__ */ jsxs("section", { children: [
			/* @__PURE__ */ jsx("h2", { children: "Contact info" }),
			/* @__PURE__ */ jsxs("p", { children: [
				"Email:",
				" ",
				/* @__PURE__ */ jsx("a", {
					href: "mailto:thiuchamlyricsliangmai@gmail.com",
					children: "thiuchamlyricsliangmai@gmail.com"
				})
			] }),
			/* @__PURE__ */ jsx("a", {
				href: "#",
				target: "_blank",
				rel: "noreferrer",
				children: "Leave a review"
			})
		] })
	] });
});
// src/features/app/features/home/Home.tsx
var Home_exports = /* @__PURE__ */ __exportAll({ default: () => Home_default });
var Home_default = UNSAFE_withComponentProps(function Home() {
	const navigate = useNavigate();
	return /* @__PURE__ */ jsxs("main", {
		className: "home",
		children: [
			/* @__PURE__ */ jsx("h1", { children: "THIUCHAM" }),
			/* @__PURE__ */ jsx("p", { children: "Choose a collection" }),
			/* @__PURE__ */ jsxs("div", {
				className: "home-collections",
				children: [
					/* @__PURE__ */ jsx("button", {
						onClick: () => navigate("/app/Hiuna-Khomlui/AllList"),
						children: "Hiuna Khomlui"
					}),
					/* @__PURE__ */ jsx("button", {
						onClick: () => navigate("/app/Khristen-Madui-Lui/AllList"),
						children: "Khristen Madui Lui"
					}),
					/* @__PURE__ */ jsx("button", {
						onClick: () => navigate("/app/Luisan/AllList"),
						children: "Luisan"
					}),
					/* @__PURE__ */ jsx("button", {
						className: "home-favourites",
						onClick: () => navigate("/app/favourites/List"),
						children: "⭐ Favourites"
					})
				]
			})
		]
	});
});
// src/features/app/api/config.ts
var API_URL = "https://script.google.com/macros/s/AKfycbyvTPKIsccX022C_HAteYIlQDJty858G0Q-kvD4g4zc7bTXM1uSOzhJ3-h4_7RRN6iD/exec";
// src/features/app/features/auth/SignIn.tsx
var SignIn_exports = /* @__PURE__ */ __exportAll({ default: () => SignIn_default });
var SignIn_default = UNSAFE_withComponentProps(function SignIn() {
	const navigate = useNavigate();
	const location = useLocation();
	const correction = location.state?.correction;
	const returnTo = location.state?.returnTo;
	const [step, setStep] = useState("email");
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	async function handleEmailSubmit(event) {
		event.preventDefault();
		setLoading(true);
		try {
			const result = await (await fetch(API_URL, {
				method: "POST",
				body: JSON.stringify({
					path: "sign in",
					action: "start",
					email
				})
			})).json();
			if (!result.success) {
				alert(result.message || "Failed to send verification code.");
				return;
			}
			setStep("otp");
		} catch (error) {
			console.error("Sign-in error:", error);
			alert("Something went wrong. Please try again.");
		} finally {
			setLoading(false);
		}
	}
	async function handleOtpSubmit(event) {
		event.preventDefault();
		const otp = new FormData(event.currentTarget).get("otp");
		setLoading(true);
		try {
			const result = await (await fetch(API_URL, {
				method: "POST",
				body: JSON.stringify({
					path: "sign in",
					action: "verify",
					email,
					otp
				})
			})).json();
			if (!result.success) {
				alert(result.message || "Verification failed.");
				return;
			}
			localStorage.setItem("identityToken", result.data.identityToken);
			navigate(returnTo, {
				state: { correction },
				replace: true
			});
		} catch (error) {
			console.error("Verification error:", error);
			alert("Something went wrong. Please try again.");
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ jsxs("main", {
		className: "sign-in",
		children: [/* @__PURE__ */ jsx("button", {
			className: "go-back",
			onClick: () => navigate(-1),
			children: "〈"
		}), /* @__PURE__ */ jsxs("div", {
			className: "sign-in-card",
			children: [
				/* @__PURE__ */ jsx("h1", { children: "Thiucham" }),
				step === "email" && /* @__PURE__ */ jsxs(Fragment, { children: [
					/* @__PURE__ */ jsx("p", {
						className: "sign-in-description",
						children: "To keep track of your suggestions, we'll verify your email address."
					}),
					/* @__PURE__ */ jsxs("form", {
						onSubmit: handleEmailSubmit,
						children: [
							/* @__PURE__ */ jsx("label", {
								htmlFor: "email",
								children: "Email"
							}),
							/* @__PURE__ */ jsx("input", {
								id: "email",
								type: "email",
								placeholder: "your@email.com",
								autoComplete: "email",
								value: email,
								onChange: (event) => setEmail(event.target.value),
								required: true
							}),
							/* @__PURE__ */ jsx("button", {
								type: "submit",
								disabled: loading,
								children: loading ? "Sending..." : "Send verification code"
							})
						]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "sign-in-note",
						children: "We'll send a 4-digit verification code to this email."
					})
				] }),
				step === "otp" && /* @__PURE__ */ jsxs(Fragment, { children: [
					/* @__PURE__ */ jsx("h4", { children: "Check your email" }),
					/* @__PURE__ */ jsxs("p", {
						className: "sign-in-description",
						children: [
							"We sent a 4-digit verification code to ",
							/* @__PURE__ */ jsx("strong", { children: email }),
							"."
						]
					}),
					/* @__PURE__ */ jsxs("form", {
						onSubmit: handleOtpSubmit,
						children: [
							/* @__PURE__ */ jsx("label", {
								htmlFor: "otp",
								children: "Verification code"
							}),
							/* @__PURE__ */ jsx("input", {
								id: "otp",
								name: "otp",
								type: "text",
								inputMode: "numeric",
								maxLength: "4",
								pattern: "[0-9]{4}",
								autoComplete: "one-time-code",
								placeholder: "0000",
								required: true
							}),
							/* @__PURE__ */ jsx("button", {
								type: "submit",
								disabled: loading,
								children: loading ? "Verifying..." : "Verify"
							})
						]
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => setStep("email"),
						disabled: loading,
						children: "← Change email"
					})
				] })
			]
		})]
	});
});
// src/features/app/loaders/AllCollectionsLoader.ts
async function AllCollectionsLoader() {
	const collections = [
		"Luisan",
		"Khristen-Madui-Lui",
		"Hiuna-Khomlui"
	];
	const songs = {};
	for (const collection of collections) {
		const response = await fetch(`/Webapp/data/${collection}.json`);
		if (!response.ok) throw new Response("Failed to load collections", { status: 404 });
		songs[collection] = await response.json();
	}
	return {
		collection: null,
		songs
	};
}
// src/features/app/loaders/CollectionLoader.ts
async function CollectionLoader({ params: { collection } }) {
	if (!collection) return await AllCollectionsLoader();
	const response = await fetch(`/Webapp/data/${collection}.json`);
	if (!response.ok) throw new Response("Collection not found", { status: 404 });
	return {
		collection,
		songs: await response.json()
	};
}
// src/features/app/components/ui/ScreenBackDrop.tsx
function ScreenBackDrop({ children, onClose }) {
	return /* @__PURE__ */ jsx("div", {
		className: "transparent-overlay",
		onClick: onClose,
		children: /* @__PURE__ */ jsx("div", {
			className: "transparent-overlay-content",
			onClick: (event) => event.stopPropagation(),
			children
		})
	});
}
// src/features/app/components/layouts/TopBar.tsx
function TopBar({ path }) {
	const navigate = useNavigate();
	const collection = path[0];
	const showMenu = path.length <= 2;
	const isSearchPage = path[1] === "search";
	const isFavourites = collection === "Favourites";
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	useEffect(() => {
		setIsMenuOpen(false);
	}, [location.pathname]);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("header", {
		className: "top-bar",
		children: [
			/* @__PURE__ */ jsx("button", {
				className: "top-left",
				onClick: () => showMenu ? setIsMenuOpen((prev) => !prev) : navigate(-1),
				children: showMenu ? "☰" : "〈"
			}),
			/* @__PURE__ */ jsx("div", {
				className: "top-center",
				children: collection
			}),
			!isFavourites && /* @__PURE__ */ jsx("button", {
				className: "top-right",
				onClick: () => isSearchPage ? navigate(-1) : navigate(`/${collection}/search`),
				children: isSearchPage ? "✕" : "🔍"
			})
		]
	}), isMenuOpen && /* @__PURE__ */ jsx(ScreenBackDrop, {
		onClose: () => setIsMenuOpen(false),
		children: /* @__PURE__ */ jsxs("aside", {
			className: "left-bar",
			children: [
				/* @__PURE__ */ jsx(NavLink, {
					to: "/Hiuna-Khomlui/list",
					className: "left-item",
					children: "Hiuna Khomlui"
				}),
				/* @__PURE__ */ jsx(NavLink, {
					to: "/Khristen-Madui-Lui/list",
					className: "left-item",
					children: "Khristen Madui Lui"
				}),
				/* @__PURE__ */ jsx(NavLink, {
					to: "/Luisan/list",
					className: "left-item",
					children: "Luisan"
				}),
				/* @__PURE__ */ jsx(NavLink, {
					to: "/Favourites/list",
					className: "left-item",
					children: "⭐ Favourites"
				}),
				/* @__PURE__ */ jsx("a", {
					className: "left-item",
					href: "https://sites.google.com/view/thiucham/content-info",
					target: "_blank",
					rel: "noopener noreferrer",
					children: "▸ App Info"
				})
			]
		})
	})] });
}
// src/features/app/components/layouts/AppLayout.tsx
var AppLayout_exports = /* @__PURE__ */ __exportAll({
	clientLoader: () => clientLoader,
	default: () => AppLayout_default,
	useAppOutletContext: () => useAppOutletContext
});
async function clientLoader(args) {
	return CollectionLoader(args);
}
var AppLayout_default = UNSAFE_withComponentProps(function AppLayout() {
	const { collection, songs } = useLoaderData();
	const path = useLocation().pathname.split("/").filter(Boolean);
	return /* @__PURE__ */ jsxs("div", {
		className: "app-layout",
		children: [/* @__PURE__ */ jsx(TopBar, { path }), /* @__PURE__ */ jsx("main", {
			className: "app-content",
			children: /* @__PURE__ */ jsx(Outlet, { context: {
				collection,
				songs
			} })
		})]
	});
});
function useAppOutletContext() {
	return useOutletContext();
}
// src/features/app/contexts/FavouritesProvider.tsx
var FavouritesProvider_exports = /* @__PURE__ */ __exportAll({
	FavouritesProvider: () => FavouritesProvider,
	useFavourites: () => useFavourites
});
var STORAGE_KEY$2 = "favourites";
var FavouritesContext = createContext(null);
function FavouritesProvider({ children }) {
	const [favourites, setFavourites] = useState(() => {
		const stored = localStorage.getItem(STORAGE_KEY$2);
		return stored ? JSON.parse(stored) : {};
	});
	function toggleFavourite(collection, songId) {
		const id = String(songId);
		const current = favourites[collection] || [];
		const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
		const updated = {
			...favourites,
			[collection]: next
		};
		setFavourites(updated);
		localStorage.setItem(STORAGE_KEY$2, JSON.stringify(updated));
	}
	function isFavourite(collection, songId) {
		return favourites[collection]?.includes(String(songId)) || false;
	}
	return /* @__PURE__ */ jsx(FavouritesContext.Provider, {
		value: {
			isFavourite,
			toggleFavourite
		},
		children
	});
}
function useFavourites() {
	const context = useContext(FavouritesContext);
	if (!context) throw new Error("useFavourites must be used inside FavouritesProvider");
	return context;
}
// src/features/app/components/ui/List.tsx
function List({ songs = [], collection }) {
	const navigate = useNavigate();
	const { isFavourite } = useFavourites();
	function openDetails(song, index) {
		navigate(`${song.ID}`, { state: {
			song,
			songs,
			index,
			collection
		} });
	}
	return /* @__PURE__ */ jsx("ul", {
		className: "list",
		children: songs.map((song, index) => /* @__PURE__ */ jsxs("li", {
			onClick: () => openDetails(song, index),
			children: [
				/* @__PURE__ */ jsx("span", {
					className: "id",
					children: song.ID
				}),
				/* @__PURE__ */ jsx("span", {
					className: "title",
					children: song.Title
				}),
				isFavourite(collection, song.ID) && /* @__PURE__ */ jsx("span", {
					className: "favourite",
					children: "⭐"
				}),
				song.Translation && /* @__PURE__ */ jsx("div", {
					className: "translation",
					children: song.Translation
				})
			]
		}, song.ID))
	});
}
// src/features/app/features/collection/AllList.tsx
function AllList() {
	const { songs, collection } = useAppOutletContext();
	return /* @__PURE__ */ jsx(List, {
		songs,
		collection
	});
}
// src/features/app/components/ui/HeaderList.tsx
function HeaderList({ groups = {} }) {
	const [openGroup, setOpenGroup] = useState(null);
	function toggleGroup(group) {
		setOpenGroup((current) => current === group ? null : group);
	}
	return /* @__PURE__ */ jsx("main", { children: Object.entries(groups).map(([group, data]) => {
		const isOpen = openGroup === group;
		const { songs, collection } = data;
		return /* @__PURE__ */ jsxs("section", { children: [/* @__PURE__ */ jsx("div", {
			onClick: () => toggleGroup(group),
			children: /* @__PURE__ */ jsxs("h3", {
				style: { paddingLeft: "1rem" },
				children: [
					group,
					" (",
					songs.length,
					")"
				]
			})
		}), isOpen && /* @__PURE__ */ jsx(List, {
			songs,
			collection
		})] }, group);
	}) });
}
// src/features/app/features/collection/Categories.tsx
function Categories() {
	const { songs, collection } = useAppOutletContext();
	const grouped = {};
	songs.forEach((song) => {
		const category = song.Category || "Others";
		if (!grouped[category]) grouped[category] = {
			songs: [],
			collection
		};
		grouped[category].songs.push(song);
	});
	return /* @__PURE__ */ jsx(HeaderList, { groups: grouped });
}
// src/features/app/features/collection/Favourites.tsx
var STORAGE_KEY$1 = "favourites";
function Favourites$1() {
	const { songs, collection } = useAppOutletContext();
	const [favouriteSongs, setFavouriteSongs] = useState([]);
	useEffect(() => {
		const favouriteIds = JSON.parse(localStorage.getItem(STORAGE_KEY$1) || "{}")[collection] || [];
		const filteredSongs = songs.filter((song) => favouriteIds.includes(String(song.ID)));
		setFavouriteSongs(filteredSongs);
	}, [songs, collection]);
	if (favouriteSongs.length === 0) return /* @__PURE__ */ jsxs("main", { children: [/* @__PURE__ */ jsx("h2", { children: "No favourites yet" }), /* @__PURE__ */ jsxs("p", { children: [
		"You have no favourite songs in this ",
		/* @__PURE__ */ jsx("strong", { children: collection }),
		"."
	] })] });
	return /* @__PURE__ */ jsx(List, {
		songs: favouriteSongs,
		collection
	});
}
// src/features/app/hooks/useSwipe.ts
function useSwipe({ onSwipeLeft, onSwipeRight, threshold = 115 }) {
	const startX = useRef(null);
	const startY = useRef(null);
	const axis = useRef(null);
	const [offsetX, setOffsetX] = useState(0);
	const [isDragging, setIsDragging] = useState(false);
	function onTouchStart(event) {
		startX.current = event.touches[0].clientX;
		startY.current = event.touches[0].clientY;
		axis.current = null;
	}
	function onTouchMove(event) {
		if (startX.current === null) return;
		const dx = event.touches[0].clientX - startX.current;
		if (axis.current === null) {
			const dy = event.touches[0].clientY - startY.current;
			if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
			axis.current = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
		}
		if (axis.current === "x") {
			setIsDragging(true);
			setOffsetX(dx);
		}
	}
	function onTouchEnd(event) {
		if (startX.current === null) return;
		if (axis.current === "x") {
			const distance = event.changedTouches[0].clientX - startX.current;
			if (distance < -threshold) onSwipeLeft();
			else if (distance > threshold) onSwipeRight();
		}
		startX.current = null;
		startY.current = null;
		axis.current = null;
		setIsDragging(false);
		setOffsetX(0);
	}
	return {
		onTouchStart,
		onTouchMove,
		onTouchEnd,
		offsetX,
		isDragging
	};
}
// src/features/app/features/collection/CollectionShell.tsx
var CollectionShell_exports = /* @__PURE__ */ __exportAll({ default: () => CollectionShell_default });
var CollectionShell_default = UNSAFE_withComponentProps(function CollectionShell() {
	const navigate = useNavigate();
	const { view } = useParams();
	const Views = {
		alllist: AllList,
		categories: Categories,
		favourites: Favourites$1
	};
	const viewOrder = Object.keys(Views);
	const View = Views[view];
	const nextView = () => {
		const index = viewOrder.indexOf(view);
		if (index < viewOrder.length - 1) navigate(`../${viewOrder[index + 1]}`);
	};
	const previousView = () => {
		const index = viewOrder.indexOf(view);
		if (index > 0) navigate(`../${viewOrder[index - 1]}`);
	};
	const { onTouchStart, onTouchMove, onTouchEnd, offsetX, isDragging } = useSwipe({
		onSwipeLeft: nextView,
		onSwipeRight: previousView
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "collection-scroll",
		children: [/* @__PURE__ */ jsx("main", {
			className: `collection ${direction === "left" ? "collection-left" : "collection-right"}`,
			onTouchStart,
			onTouchMove,
			onTouchEnd,
			style: {
				transform: `translate3d(${offsetX}px, 0, 0)`,
				transition: isDragging ? "none" : "transform 0.22s cubic-bezier(0.22, 1, 0.36, 1)"
			},
			children: View && /* @__PURE__ */ jsx(View, {})
		}), /* @__PURE__ */ jsx(Outlet, {})]
	});
});
// src/features/app/features/details/hooks/useSongData.ts
function useSongData() {
	const { songId } = useParams();
	const { songs, collection } = useAppOutletContext();
	const index = songs?.findIndex((song) => String(song.id) === songId) ?? -1;
	return {
		collection,
		songs,
		song: index !== -1 ? songs?.[index] : void 0,
		index
	};
}
// src/features/app/hooks/useKeyboardNavigation.ts
function useKeyboardNavigation({ onNext, onPrevious, onClose, onEnter, mode = "" }) {
	useEffect(() => {
		function handleKeyDown(event) {
			if (event.key === "ArrowRight" || mode === "projection" && (event.key === "ArrowDown" || event.key === " ")) {
				onNext();
				return;
			}
			if (event.key === "ArrowLeft" || mode === "projection" && event.key === "ArrowUp") {
				onPrevious();
				return;
			}
			if (event.key === "Enter" && onEnter) {
				onEnter();
				return;
			}
			if (event.key === "Escape" && onClose) onClose();
		}
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [
		onNext,
		onPrevious,
		onClose,
		onEnter,
		mode
	]);
}
// src/features/app/features/details/hooks/useLyricsSections.ts
var DETAIL_ORDER = [
	["V1", "CH-"],
	["CH", "V1-"],
	["V2", "V2-"],
	["V3", "V3-"],
	["V4", "V4-"],
	["V5", "V5-"],
	["V6", "V6-"],
	["V7", "V7-"],
	["V8", "V8-"],
	["V9", "V9-"],
	["V10", "V10-"],
	["V11", "V11-"]
];
function useLyricsSections(song) {
	return DETAIL_ORDER.map(([first, second]) => {
		const key = song[first] ? first : song[second] ? second : null;
		if (!key) return null;
		return {
			key,
			text: String(song[key])
		};
	}).filter((section) => section !== null);
}
// src/features/app/features/details/components/DetailHeader.tsx
function DetailHeader({ header }) {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsxs("div", {
			className: "detail-head",
			children: [/* @__PURE__ */ jsx("div", { children: header.ID }), /* @__PURE__ */ jsx("div", { children: header.Title })]
		}),
		header.Translation && /* @__PURE__ */ jsx("div", {
			className: "translation",
			children: header.Translation
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "detail-meta-info",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "song-meta-item",
				children: [/* @__PURE__ */ jsx("span", {
					className: "song-meta-label",
					children: "KEY"
				}), /* @__PURE__ */ jsx("span", {
					className: "song-meta-value",
					children: header.Key || "⚪"
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "song-meta-item",
				children: [/* @__PURE__ */ jsx("span", {
					className: "song-meta-label",
					children: "TIME"
				}), /* @__PURE__ */ jsx("span", {
					className: "song-meta-value",
					children: header.Time || "⚪"
				})]
			})]
		})
	] });
}
// src/features/app/features/details/components/DetailActions.tsx
function DetailActions({ isFavourite, onToggle, onMore }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "detail-actions",
		children: [/* @__PURE__ */ jsx("button", {
			"aria-label": "Toggle favourites",
			onClick: onToggle,
			children: isFavourite ? "⭐" : "☆"
		}), /* @__PURE__ */ jsx("button", {
			onClick: onMore,
			"aria-label": "More actions",
			title: "More actions",
			children: "⋮"
		})]
	});
}
// src/features/app/features/details/components/LyricsContent.tsx
function LyricsContent({ sections, onDoubleClick }) {
	return /* @__PURE__ */ jsx("div", {
		className: "lyrics-container",
		onDoubleClick,
		children: sections.map(({ key, text }) => /* @__PURE__ */ jsx("div", {
			className: "lyrics",
			children: text
		}, key))
	});
}
// src/features/app/features/details/components/MoreOptions.tsx
function MoreOptions() {
	return /* @__PURE__ */ jsx("div", {
		className: "more-options",
		children: /* @__PURE__ */ jsx("button", {
			className: "close",
			onClick: onClose,
			"aria-label": "Close",
			children: "❌"
		})
	});
}
// src/features/app/components/ui/icons/ProjectionIcon.tsx
function ProjectionIcon() {
	return /* @__PURE__ */ jsxs("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "20",
		height: "20",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: [/* @__PURE__ */ jsx("path", { d: "M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" }), /* @__PURE__ */ jsx("path", { d: "m12 15 5 6H7l5-6z" })]
	});
}
// src/features/app/features/details/Details.tsx
var Details_exports = /* @__PURE__ */ __exportAll({ default: () => Details_default });
var Details_default = UNSAFE_withComponentProps(function Details() {
	const location = useLocation();
	const navigate = useNavigate();
	const [showHelp, setShowHelp] = useState(false);
	const fallbackData = useSongData();
	let song = location.state?.song;
	let songs;
	let index;
	let collection;
	if (!song) ({collection, songs, song, index} = fallbackData);
	else {
		songs = location.state?.songs;
		index = location.state?.index;
		collection = location.state?.collection;
	}
	function closeDetails() {
		navigate(-1);
	}
	function openProjection() {
		navigate("../projection", { state: { lyrics: song.Lyrics } });
	}
	function nextSong() {
		if (index >= songs.length - 1) return;
		const nextIndex = index + 1;
		const nextSong = songs[nextIndex];
		navigate(`../${nextSong.ID}`, {
			replace: true,
			state: {
				song: nextSong,
				songs,
				index: nextIndex,
				collection
			}
		});
	}
	function previousSong() {
		if (index <= 0) return;
		const previousIndex = index - 1;
		const previousSong = songs[previousIndex];
		navigate(`../${previousSong.ID}`, {
			replace: true,
			state: {
				song: previousSong,
				songs,
				index: previousIndex,
				collection
			}
		});
	}
	const { isFavourite, toggleFavourite } = useFavourites();
	const sections = useLyricsSections(song.Lyrics);
	useKeyboardNavigation({
		onNext: nextSong,
		onPrevious: previousSong,
		onClose: closeDetails,
		onEnter: openProjection
	});
	const { onTouchStart, onTouchMove, onTouchEnd, offsetX, isDragging } = useSwipe({
		onSwipeLeft: nextSong,
		onSwipeRight: previousSong
	});
	return /* @__PURE__ */ jsxs(Fragment, { children: [showHelp && /* @__PURE__ */ jsx(ScreenBackDrop, {
		onClose: () => setShowHelp(false),
		children: /* @__PURE__ */ jsx(MoreOptions, { onClose: () => setShowHelp(false) })
	}), /* @__PURE__ */ jsxs("div", {
		className: "fullscreen-overlay",
		children: [/* @__PURE__ */ jsxs("main", {
			className: `details ${direction === "left" ? "details--enter-left" : "details--enter-right"}`,
			onTouchStart,
			onTouchMove,
			onTouchEnd,
			style: {
				transform: `translate3d(${offsetX}px, 0, 0)`,
				transition: isDragging ? "none" : "transform 0.22s cubic-bezier(0.22, 1, 0.36, 1)"
			},
			children: [
				/* @__PURE__ */ jsx(DetailHeader, { song: song.Header }),
				/* @__PURE__ */ jsx(DetailActions, {
					isFavourite: isFavourite(collection, songId),
					onToggle: () => toggleFavourite(collection, songId),
					onMore: () => setShowHelp(true)
				}),
				/* @__PURE__ */ jsx(LyricsContent, {
					sections,
					onDoubleClick: openProjection
				})
			]
		}), /* @__PURE__ */ jsx("button", {
			className: "projection",
			onClick: openProjection,
			"aria-label": "Open projection",
			children: /* @__PURE__ */ jsx(ProjectionIcon, {})
		})]
	})] });
});
// src/features/app/features/correction/CorrectionPage.tsx
var CorrectionPage_exports = /* @__PURE__ */ __exportAll({ default: () => CorrectionPage_default });
var CorrectionPage_default = UNSAFE_withComponentProps(function CorrectionPage() {
	const location = useLocation();
	const navigate = useNavigate();
	const correction = location.state?.correction;
	const [lyrics, setLyrics] = useState(correction?.originalLyrics || "");
	const [loading, setLoading] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	function handleChange(event) {
		setLyrics(event.target.value);
	}
	async function handleSubmit() {
		if (lyrics === correction.originalLyrics) {
			alert("No changes have been made. Please make some changes before submitting.");
			return;
		}
		const submission = {
			identityToken: localStorage.getItem("identityToken"),
			collection: correction.collection,
			songId: correction.songId,
			originalLyrics: correction.originalLyrics,
			correctedLyrics: lyrics
		};
		setLoading(true);
		try {
			const result = await (await fetch(API_URL, {
				method: "POST",
				body: JSON.stringify({
					path: "correction",
					...submission
				})
			})).json();
			if (result.success) setSubmitted(true);
			else {
				if (result.error === "Invalid identity token") localStorage.removeItem("identityToken");
				alert(result.error || "Failed to submit correction.");
			}
		} catch (error) {
			alert(error.message || "Failed to submit correction.");
		} finally {
			setLoading(false);
		}
	}
	if (!correction) return /* @__PURE__ */ jsx("div", {
		className: "correction-empty",
		children: "No correction session found."
	});
	return /* @__PURE__ */ jsx("div", {
		className: "fullscreen-overlay",
		children: /* @__PURE__ */ jsx("main", {
			className: "correction",
			children: !submitted ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("h3", { children: [
				correction.songId,
				". ",
				correction.title
			] }), /* @__PURE__ */ jsxs("form", {
				className: "correction-editor",
				children: [/* @__PURE__ */ jsx("textarea", {
					value: lyrics,
					onChange: handleChange
				}), /* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: handleSubmit,
					disabled: loading,
					children: loading ? "Submitting..." : "Submit"
				})]
			})] }) : /* @__PURE__ */ jsxs("div", {
				className: "correction-success",
				children: [
					/* @__PURE__ */ jsx("h3", { children: "Correction submitted" }),
					/* @__PURE__ */ jsx("p", { children: "Thank you. Your correction has been submitted for review." }),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => navigate(-1),
						children: "OK"
					})
				]
			})
		})
	});
});
// src/features/app/hooks/useFullscreen.ts
function useFullscreen(enabled) {
	useEffect(() => {
		if (!enabled) return;
		async function enterFullscreen() {
			try {
				await document.documentElement.requestFullscreen();
			} catch {}
		}
		enterFullscreen();
		return () => {
			if (document.fullscreenElement) document.exitFullscreen();
			screen.orientation?.unlock();
		};
	}, [enabled]);
}
// src/features/app/hooks/useControlsVisibility.ts
function useControlsVisibility() {
	const [showControls, setShowControls] = useState(false);
	const timer = useRef(null);
	function show() {
		if (showControls) {
			clearTimeout(timer.current);
			setShowControls(false);
			return;
		}
		setShowControls(true);
		timer.current = setTimeout(() => {
			setShowControls(false);
		}, 3e3);
	}
	useEffect(() => {
		return () => clearTimeout(timer.current);
	}, []);
	return {
		showControls,
		show
	};
}
// src/features/app/features/projection/Projection.tsx
var Projection_exports = /* @__PURE__ */ __exportAll({ default: () => Projection_default });
var PROJECTION_ORDER = [
	["V1", "CH-"],
	["CH", "V1-"],
	["V2", "CH-"],
	["CH", "V2-"],
	["V3", "CH-"],
	["CH", "V3-"],
	["V4", "CH-"],
	["CH", "V4-"],
	["V5", "CH-"],
	["CH", "V5-"],
	["V6", "CH-"],
	["CH", "V6-"],
	["V7", "CH-"],
	["CH", "V7-"],
	["V8", "CH-"],
	["CH", "V8-"],
	["V9", "CH-"],
	["CH", "V9-"],
	["V10", "CH-"],
	["CH", "V10-"],
	["V11", "CH-"],
	["CH", "V11-"]
];
var Projection_default = UNSAFE_withComponentProps(function Projection() {
	const location = useLocation();
	const navigate = useNavigate();
	const song = location.state?.lyrics;
	const [currentSlide, setCurrentSlide] = useState(0);
	const [orientationLocked, setOrientationLocked] = useState(false);
	useFullscreen(song);
	async function toggleOrientation() {
		try {
			if (orientationLocked) {
				screen.orientation?.unlock();
				setOrientationLocked(false);
			} else {
				await screen.orientation?.lock("landscape");
				setOrientationLocked(true);
			}
		} catch (error) {
			console.error("Orientation error:", error);
		}
	}
	const { showControls, show } = useControlsVisibility();
	const lyrics = [];
	let useFirst = null;
	if (song) for (const [first, second] of PROJECTION_ORDER) {
		if (useFirst === null) {
			if (song[first]) useFirst = true;
			else if (song[second]) useFirst = false;
			else continue;
		}
		const key = useFirst ? first : second;
		if (!song[key]) {
			if (key.startsWith("CH")) continue;
			break;
		}
		lyrics.push(song[key]);
	}
	const totalSlides = lyrics.length;
	const lastSlide = totalSlides - 1;
	function closeProjection() {
		navigate(-1);
	}
	function nextSlide() {
		setCurrentSlide((current) => Math.min(current + 1, lastSlide));
	}
	function previousSlide() {
		setCurrentSlide((current) => Math.max(current - 1, 0));
	}
	useKeyboardNavigation({
		onNext: nextSlide,
		onPrevious: previousSlide,
		onClose: closeProjection,
		mode: "projection"
	});
	const { onTouchStart, onTouchMove, onTouchEnd, offsetX, isDragging } = useSwipe({
		onSwipeLeft: nextSlide,
		onSwipeRight: previousSlide,
		threshold: 50
	});
	if (!song) return null;
	return /* @__PURE__ */ jsxs("div", {
		className: "projection-main",
		children: [/* @__PURE__ */ jsx("div", {
			className: "projection-viewport",
			onTouchStart,
			onTouchMove,
			onTouchEnd,
			children: /* @__PURE__ */ jsx("div", {
				className: "projection-track",
				style: {
					transform: `translateX(calc(-${currentSlide * 100}% + ${offsetX}px))`,
					transition: isDragging ? "none" : "transform 350ms ease"
				},
				children: lyrics.map((lyric, index) => /* @__PURE__ */ jsx("div", {
					className: "projection-slide",
					onClick: show,
					children: /* @__PURE__ */ jsx("div", {
						className: "lyrics",
						children: lyric
					})
				}, index))
			})
		}), showControls && /* @__PURE__ */ jsxs(Fragment, { children: [
			/* @__PURE__ */ jsx("button", {
				className: "projection-close",
				onClick: closeProjection,
				children: "❌"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "projection-counter",
				children: [
					currentSlide + 1,
					" / ",
					totalSlides
				]
			}),
			/* @__PURE__ */ jsx("button", {
				className: "projection-rotate",
				onClick: toggleOrientation,
				children: "Rotate"
			})
		] })]
	});
});
// src/features/app/features/search/SearchList.tsx
function normalize(str) {
	return (str || "").toLowerCase().replace(/[ !,.?'-]/g, "");
}
function SearchList() {
	useNavigate();
	const { songs, collection } = useAppOutletContext();
	const [query, setQuery] = useState("");
	const inputRef = useRef(null);
	useEffect(() => {
		inputRef.current?.focus();
	}, []);
	const normalizedQuery = normalize(query);
	const results = normalizedQuery === "" ? [] : songs.filter((song) => song.ID.toString().includes(normalizedQuery) || normalize(song.Title).includes(normalizedQuery) || normalize(song.Translation).includes(normalizedQuery));
	return /* @__PURE__ */ jsxs("main", { children: [/* @__PURE__ */ jsx("input", {
		ref: inputRef,
		className: "search-input",
		type: "search",
		value: query,
		onChange: (event) => setQuery(event.target.value),
		placeholder: "Search"
	}), /* @__PURE__ */ jsx(List, {
		songs: results,
		collection
	})] });
}
// src/features/app/features/search/SearchShell.tsx
var SearchShell_exports = /* @__PURE__ */ __exportAll({ default: () => SearchShell_default });
var SearchShell_default = UNSAFE_withComponentProps(function SearchShell() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(SearchList, {}), /* @__PURE__ */ jsx(Outlet, {})] });
});
// src/features/app/features/favourite/AllFavourites.tsx
var STORAGE_KEY = "favourites";
function Favourites() {
	const collections = useAppOutletContext();
	const [groups, setGroups] = useState({});
	useEffect(() => {
		const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
		const result = {};
		for (const collection of Object.keys(stored)) {
			const favouriteIds = stored[collection];
			if (!Array.isArray(favouriteIds) || favouriteIds.length === 0) continue;
			const songs = collections[collection];
			if (!songs) continue;
			result[collection] = {
				songs: songs.filter((song) => favouriteIds.includes(String(song.ID))),
				collection
			};
		}
		setGroups(result);
	}, [collections]);
	if (!Object.values(groups).some((group) => group.songs.length > 0)) return /* @__PURE__ */ jsxs("main", { children: [/* @__PURE__ */ jsx("h2", { children: "No favourites yet" }), /* @__PURE__ */ jsx("p", { children: "You have no favourites in any collection." })] });
	return /* @__PURE__ */ jsx(HeaderList, { groups });
}
// src/features/app/features/favourite/AllFavouritesShell.tsx
var AllFavouritesShell_exports = /* @__PURE__ */ __exportAll({ default: () => AllFavouritesShell_default });
var AllFavouritesShell_default = UNSAFE_withComponentProps(function AllFavouritesShell() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Favourites, {}), /* @__PURE__ */ jsx(Outlet, {})] });
});
// \0virtual:react-router/server-manifest
var server_manifest_default = {
	"entry": {
		"module": "/Webapp/assets/entry.client-C5Oho-wG.js",
		"imports": ["/Webapp/assets/jsx-runtime-DyZJNswf.js", "/Webapp/assets/components-eNz6PIFw.js"],
		"css": []
	},
	"routes": {
		"root": {
			"id": "root",
			"parentId": void 0,
			"path": "",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/Webapp/assets/root-CFgySuu8.js",
			"imports": [
				"/Webapp/assets/jsx-runtime-DyZJNswf.js",
				"/Webapp/assets/components-eNz6PIFw.js",
				"/Webapp/assets/lib-BnTW59RI.js"
			],
			"css": ["/Webapp/assets/root-B89vCArA.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"features/site/Home": {
			"id": "features/site/Home",
			"parentId": "root",
			"path": void 0,
			"index": true,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/Webapp/assets/Home-BVVy2tp_.js",
			"imports": ["/Webapp/assets/components-eNz6PIFw.js", "/Webapp/assets/jsx-runtime-DyZJNswf.js"],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"features/app/features/home/Home": {
			"id": "features/app/features/home/Home",
			"parentId": "root",
			"path": "app",
			"index": true,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/Webapp/assets/Home-gNkQd05C.js",
			"imports": ["/Webapp/assets/components-eNz6PIFw.js", "/Webapp/assets/jsx-runtime-DyZJNswf.js"],
			"css": ["/Webapp/assets/Home-B_kVvwL8.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"features/app/features/auth/SignIn": {
			"id": "features/app/features/auth/SignIn",
			"parentId": "root",
			"path": "app/sign-in",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/Webapp/assets/SignIn--8D510h8.js",
			"imports": [
				"/Webapp/assets/components-eNz6PIFw.js",
				"/Webapp/assets/jsx-runtime-DyZJNswf.js",
				"/Webapp/assets/config-7LYfntVk.js"
			],
			"css": ["/Webapp/assets/SignIn-D1Db6pRp.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"features/app/components/layouts/AppLayout": {
			"id": "features/app/components/layouts/AppLayout",
			"parentId": "root",
			"path": void 0,
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": true,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/Webapp/assets/AppLayout-B0BmdLtI.js",
			"imports": [
				"/Webapp/assets/AppLayout-Sv0nRkPY.js",
				"/Webapp/assets/components-eNz6PIFw.js",
				"/Webapp/assets/jsx-runtime-DyZJNswf.js",
				"/Webapp/assets/lib-BnTW59RI.js",
				"/Webapp/assets/AppLayout-YhZAtGdj.js"
			],
			"css": ["/Webapp/assets/AppLayout-DCIzq2Kz.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": "/Webapp/assets/AppLayout-fkcRE9Ib.js",
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"features/app/contexts/FavouritesProvider": {
			"id": "features/app/contexts/FavouritesProvider",
			"parentId": "features/app/components/layouts/AppLayout",
			"path": void 0,
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": false,
			"hasErrorBoundary": false,
			"module": "/Webapp/assets/FavouritesProvider-BJ0-2Edb.js",
			"imports": ["/Webapp/assets/FavouritesProvider-7J2dXjDk.js", "/Webapp/assets/jsx-runtime-DyZJNswf.js"],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"features/app/features/collection/CollectionShell": {
			"id": "features/app/features/collection/CollectionShell",
			"parentId": "features/app/contexts/FavouritesProvider",
			"path": "app/:collection/:view",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/Webapp/assets/CollectionShell-nF_OCjwW.js",
			"imports": [
				"/Webapp/assets/components-eNz6PIFw.js",
				"/Webapp/assets/AppLayout-Sv0nRkPY.js",
				"/Webapp/assets/List-Dg-JPFoM.js",
				"/Webapp/assets/jsx-runtime-DyZJNswf.js",
				"/Webapp/assets/HeaderList-CmKSmfp7.js",
				"/Webapp/assets/useSwipe-DVVC66a9.js",
				"/Webapp/assets/lib-BnTW59RI.js",
				"/Webapp/assets/FavouritesProvider-7J2dXjDk.js"
			],
			"css": [
				"/Webapp/assets/CollectionShell-Bk_oW0sQ.css",
				"/Webapp/assets/AppLayout-DCIzq2Kz.css",
				"/Webapp/assets/List-CNy72T3N.css"
			],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"collection-details": {
			"id": "collection-details",
			"parentId": "features/app/features/collection/CollectionShell",
			"path": ":songId",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/Webapp/assets/Details-B6JKehWo.js",
			"imports": [
				"/Webapp/assets/components-eNz6PIFw.js",
				"/Webapp/assets/jsx-runtime-DyZJNswf.js",
				"/Webapp/assets/FavouritesProvider-7J2dXjDk.js",
				"/Webapp/assets/AppLayout-Sv0nRkPY.js",
				"/Webapp/assets/useSwipe-DVVC66a9.js",
				"/Webapp/assets/useKeyboardNavigation-DvklpTIM.js",
				"/Webapp/assets/lib-BnTW59RI.js"
			],
			"css": ["/Webapp/assets/Details-B0weJs9l.css", "/Webapp/assets/AppLayout-DCIzq2Kz.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"collection-correction": {
			"id": "collection-correction",
			"parentId": "features/app/features/collection/CollectionShell",
			"path": "suggest-correction",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/Webapp/assets/CorrectionPage-CcI-_GXp.js",
			"imports": [
				"/Webapp/assets/components-eNz6PIFw.js",
				"/Webapp/assets/jsx-runtime-DyZJNswf.js",
				"/Webapp/assets/config-7LYfntVk.js"
			],
			"css": ["/Webapp/assets/CorrectionPage-BtQgS3_y.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"collection-projection": {
			"id": "collection-projection",
			"parentId": "features/app/features/collection/CollectionShell",
			"path": "projection",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/Webapp/assets/Projection-B_SV4o82.js",
			"imports": [
				"/Webapp/assets/components-eNz6PIFw.js",
				"/Webapp/assets/jsx-runtime-DyZJNswf.js",
				"/Webapp/assets/useSwipe-DVVC66a9.js",
				"/Webapp/assets/useKeyboardNavigation-DvklpTIM.js"
			],
			"css": ["/Webapp/assets/Projection-BgNZbIWD.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"features/app/features/search/SearchShell": {
			"id": "features/app/features/search/SearchShell",
			"parentId": "features/app/contexts/FavouritesProvider",
			"path": "app/:collection/search",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/Webapp/assets/SearchShell-tdSF3GXZ.js",
			"imports": [
				"/Webapp/assets/components-eNz6PIFw.js",
				"/Webapp/assets/jsx-runtime-DyZJNswf.js",
				"/Webapp/assets/AppLayout-Sv0nRkPY.js",
				"/Webapp/assets/List-Dg-JPFoM.js",
				"/Webapp/assets/lib-BnTW59RI.js",
				"/Webapp/assets/FavouritesProvider-7J2dXjDk.js"
			],
			"css": [
				"/Webapp/assets/SearchShell-DqWOMkhi.css",
				"/Webapp/assets/AppLayout-DCIzq2Kz.css",
				"/Webapp/assets/List-CNy72T3N.css"
			],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"search-details": {
			"id": "search-details",
			"parentId": "features/app/features/search/SearchShell",
			"path": ":songId",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/Webapp/assets/Details-B6JKehWo.js",
			"imports": [
				"/Webapp/assets/components-eNz6PIFw.js",
				"/Webapp/assets/jsx-runtime-DyZJNswf.js",
				"/Webapp/assets/FavouritesProvider-7J2dXjDk.js",
				"/Webapp/assets/AppLayout-Sv0nRkPY.js",
				"/Webapp/assets/useSwipe-DVVC66a9.js",
				"/Webapp/assets/useKeyboardNavigation-DvklpTIM.js",
				"/Webapp/assets/lib-BnTW59RI.js"
			],
			"css": ["/Webapp/assets/Details-B0weJs9l.css", "/Webapp/assets/AppLayout-DCIzq2Kz.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"search-correction": {
			"id": "search-correction",
			"parentId": "features/app/features/search/SearchShell",
			"path": "suggest-correction",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/Webapp/assets/CorrectionPage-CcI-_GXp.js",
			"imports": [
				"/Webapp/assets/components-eNz6PIFw.js",
				"/Webapp/assets/jsx-runtime-DyZJNswf.js",
				"/Webapp/assets/config-7LYfntVk.js"
			],
			"css": ["/Webapp/assets/CorrectionPage-BtQgS3_y.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"search-projection": {
			"id": "search-projection",
			"parentId": "features/app/features/search/SearchShell",
			"path": "projection",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/Webapp/assets/Projection-B_SV4o82.js",
			"imports": [
				"/Webapp/assets/components-eNz6PIFw.js",
				"/Webapp/assets/jsx-runtime-DyZJNswf.js",
				"/Webapp/assets/useSwipe-DVVC66a9.js",
				"/Webapp/assets/useKeyboardNavigation-DvklpTIM.js"
			],
			"css": ["/Webapp/assets/Projection-BgNZbIWD.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"features/app/features/favourite/AllFavouritesShell": {
			"id": "features/app/features/favourite/AllFavouritesShell",
			"parentId": "features/app/contexts/FavouritesProvider",
			"path": "app/Favourites/list",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/Webapp/assets/AllFavouritesShell-DKK8dPpg.js",
			"imports": [
				"/Webapp/assets/components-eNz6PIFw.js",
				"/Webapp/assets/jsx-runtime-DyZJNswf.js",
				"/Webapp/assets/AppLayout-Sv0nRkPY.js",
				"/Webapp/assets/HeaderList-CmKSmfp7.js",
				"/Webapp/assets/lib-BnTW59RI.js",
				"/Webapp/assets/List-Dg-JPFoM.js",
				"/Webapp/assets/FavouritesProvider-7J2dXjDk.js"
			],
			"css": ["/Webapp/assets/AppLayout-DCIzq2Kz.css", "/Webapp/assets/List-CNy72T3N.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"all-fav-details": {
			"id": "all-fav-details",
			"parentId": "features/app/features/favourite/AllFavouritesShell",
			"path": ":songId",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/Webapp/assets/Details-B6JKehWo.js",
			"imports": [
				"/Webapp/assets/components-eNz6PIFw.js",
				"/Webapp/assets/jsx-runtime-DyZJNswf.js",
				"/Webapp/assets/FavouritesProvider-7J2dXjDk.js",
				"/Webapp/assets/AppLayout-Sv0nRkPY.js",
				"/Webapp/assets/useSwipe-DVVC66a9.js",
				"/Webapp/assets/useKeyboardNavigation-DvklpTIM.js",
				"/Webapp/assets/lib-BnTW59RI.js"
			],
			"css": ["/Webapp/assets/Details-B0weJs9l.css", "/Webapp/assets/AppLayout-DCIzq2Kz.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"all-fav-correction": {
			"id": "all-fav-correction",
			"parentId": "features/app/features/favourite/AllFavouritesShell",
			"path": "suggest-correction",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/Webapp/assets/CorrectionPage-CcI-_GXp.js",
			"imports": [
				"/Webapp/assets/components-eNz6PIFw.js",
				"/Webapp/assets/jsx-runtime-DyZJNswf.js",
				"/Webapp/assets/config-7LYfntVk.js"
			],
			"css": ["/Webapp/assets/CorrectionPage-BtQgS3_y.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"all-fav-projection": {
			"id": "all-fav-projection",
			"parentId": "features/app/features/favourite/AllFavouritesShell",
			"path": "projection",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/Webapp/assets/Projection-B_SV4o82.js",
			"imports": [
				"/Webapp/assets/components-eNz6PIFw.js",
				"/Webapp/assets/jsx-runtime-DyZJNswf.js",
				"/Webapp/assets/useSwipe-DVVC66a9.js",
				"/Webapp/assets/useKeyboardNavigation-DvklpTIM.js"
			],
			"css": ["/Webapp/assets/Projection-BgNZbIWD.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		}
	},
	"url": "/Webapp/assets/manifest-5089cf19.js",
	"version": "5089cf19",
	"sri": void 0
};
// \0virtual:react-router/server-build
var assetsBuildDirectory = "build/client";
var basename = "/Webapp/";
var future = {
	"unstable_customRouteDiscovery": false,
	"unstable_enableNodeReadableStream": false,
	"unstable_optimizeDeps": false
};
var ssr = false;
var unstable_apiOnly = false;
var unstable_apiServerOrigin = void 0;
var isSpaMode = false;
var prerender = [
	"/",
	"/app",
	"/app/sign-in",
	"/app/Luisan/list",
	"/app/Luisan/list/1",
	"/app/Luisan/list/2",
	"/app/Luisan/list/3",
	"/app/Luisan/list/4",
	"/app/Luisan/list/5",
	"/app/Luisan/list/6",
	"/app/Luisan/list/7",
	"/app/Luisan/list/8",
	"/app/Luisan/list/9",
	"/app/Luisan/list/10",
	"/app/Luisan/list/11",
	"/app/Luisan/list/12",
	"/app/Luisan/list/13",
	"/app/Luisan/list/14",
	"/app/Luisan/list/15",
	"/app/Luisan/list/16",
	"/app/Luisan/list/17",
	"/app/Luisan/list/18",
	"/app/Luisan/list/19",
	"/app/Luisan/list/20",
	"/app/Luisan/list/21",
	"/app/Luisan/list/22",
	"/app/Luisan/list/23",
	"/app/Luisan/list/24",
	"/app/Luisan/list/25",
	"/app/Luisan/list/26",
	"/app/Luisan/list/27",
	"/app/Luisan/list/28",
	"/app/Luisan/list/29",
	"/app/Luisan/list/30",
	"/app/Luisan/list/31",
	"/app/Luisan/list/32",
	"/app/Luisan/list/33",
	"/app/Luisan/list/34",
	"/app/Luisan/list/35",
	"/app/Luisan/list/36",
	"/app/Luisan/list/37",
	"/app/Luisan/list/38",
	"/app/Luisan/list/39",
	"/app/Luisan/list/40",
	"/app/Luisan/list/41",
	"/app/Luisan/list/42",
	"/app/Luisan/list/43",
	"/app/Luisan/list/44",
	"/app/Luisan/list/45",
	"/app/Luisan/list/46",
	"/app/Luisan/list/47",
	"/app/Luisan/list/48",
	"/app/Luisan/list/49",
	"/app/Luisan/list/50",
	"/app/Luisan/list/51",
	"/app/Luisan/list/52",
	"/app/Luisan/list/53",
	"/app/Luisan/list/54",
	"/app/Luisan/list/55",
	"/app/Luisan/list/56",
	"/app/Luisan/list/57",
	"/app/Luisan/list/58",
	"/app/Luisan/list/59",
	"/app/Luisan/list/60",
	"/app/Luisan/list/61",
	"/app/Luisan/list/62",
	"/app/Luisan/list/63",
	"/app/Luisan/list/64",
	"/app/Luisan/list/65",
	"/app/Luisan/list/66",
	"/app/Luisan/list/67",
	"/app/Luisan/list/68",
	"/app/Luisan/list/69",
	"/app/Luisan/list/70",
	"/app/Luisan/list/71",
	"/app/Luisan/list/72",
	"/app/Luisan/list/73",
	"/app/Luisan/list/74",
	"/app/Luisan/list/75",
	"/app/Luisan/list/76",
	"/app/Luisan/list/77",
	"/app/Luisan/list/78",
	"/app/Luisan/list/79",
	"/app/Luisan/list/80",
	"/app/Luisan/list/81",
	"/app/Luisan/list/82",
	"/app/Luisan/list/83",
	"/app/Luisan/list/84",
	"/app/Luisan/list/85",
	"/app/Luisan/list/86",
	"/app/Luisan/list/87",
	"/app/Luisan/list/88",
	"/app/Luisan/list/89",
	"/app/Luisan/list/90",
	"/app/Luisan/list/91",
	"/app/Luisan/list/92",
	"/app/Luisan/list/93",
	"/app/Luisan/list/94",
	"/app/Luisan/list/95",
	"/app/Luisan/list/96",
	"/app/Luisan/list/97",
	"/app/Luisan/list/98",
	"/app/Luisan/list/99",
	"/app/Luisan/list/100",
	"/app/Luisan/list/101",
	"/app/Luisan/list/102",
	"/app/Luisan/list/103",
	"/app/Luisan/list/104",
	"/app/Luisan/list/105",
	"/app/Luisan/list/106",
	"/app/Luisan/list/107",
	"/app/Luisan/list/108",
	"/app/Luisan/list/109",
	"/app/Luisan/list/110",
	"/app/Luisan/list/111",
	"/app/Luisan/list/112",
	"/app/Luisan/list/113",
	"/app/Luisan/list/114",
	"/app/Luisan/list/115",
	"/app/Luisan/list/116",
	"/app/Luisan/list/117",
	"/app/Luisan/list/118",
	"/app/Luisan/list/119",
	"/app/Luisan/list/120",
	"/app/Luisan/list/121",
	"/app/Luisan/list/122",
	"/app/Luisan/list/123",
	"/app/Luisan/list/124",
	"/app/Luisan/list/125",
	"/app/Luisan/list/126",
	"/app/Luisan/list/127",
	"/app/Luisan/list/128",
	"/app/Luisan/list/129",
	"/app/Luisan/list/130",
	"/app/Luisan/list/131",
	"/app/Luisan/list/132",
	"/app/Luisan/list/133",
	"/app/Luisan/list/134",
	"/app/Luisan/list/135",
	"/app/Luisan/list/136",
	"/app/Luisan/list/137",
	"/app/Luisan/list/138",
	"/app/Luisan/list/139",
	"/app/Luisan/list/140",
	"/app/Luisan/list/141",
	"/app/Luisan/list/142",
	"/app/Luisan/list/143",
	"/app/Luisan/list/144",
	"/app/Luisan/list/145",
	"/app/Luisan/list/146",
	"/app/Luisan/list/147",
	"/app/Luisan/list/148",
	"/app/Luisan/list/149",
	"/app/Luisan/list/150",
	"/app/Luisan/list/151",
	"/app/Luisan/list/152",
	"/app/Luisan/list/153",
	"/app/Luisan/list/154",
	"/app/Luisan/list/155",
	"/app/Luisan/list/156",
	"/app/Luisan/list/157",
	"/app/Luisan/list/158",
	"/app/Luisan/list/159",
	"/app/Luisan/list/160",
	"/app/Luisan/list/161",
	"/app/Luisan/list/162",
	"/app/Luisan/list/163",
	"/app/Luisan/list/164",
	"/app/Luisan/list/165",
	"/app/Luisan/list/166",
	"/app/Luisan/list/167",
	"/app/Luisan/list/168",
	"/app/Luisan/list/169",
	"/app/Luisan/list/170",
	"/app/Luisan/list/171",
	"/app/Luisan/list/172",
	"/app/Luisan/list/173",
	"/app/Luisan/list/174",
	"/app/Luisan/list/175",
	"/app/Luisan/list/176",
	"/app/Luisan/list/177",
	"/app/Luisan/list/178",
	"/app/Luisan/list/179",
	"/app/Luisan/list/180",
	"/app/Luisan/list/181",
	"/app/Luisan/list/182",
	"/app/Luisan/list/183",
	"/app/Luisan/list/184",
	"/app/Luisan/list/185",
	"/app/Luisan/list/186",
	"/app/Luisan/list/187",
	"/app/Luisan/list/188",
	"/app/Luisan/list/189",
	"/app/Luisan/list/190",
	"/app/Luisan/list/191",
	"/app/Luisan/list/192",
	"/app/Luisan/list/193",
	"/app/Luisan/list/194",
	"/app/Luisan/list/195",
	"/app/Luisan/list/196",
	"/app/Luisan/list/197",
	"/app/Luisan/list/198",
	"/app/Luisan/list/199",
	"/app/Luisan/list/200",
	"/app/Hiuna-Khomlui/list",
	"/app/Hiuna-Khomlui/list/1",
	"/app/Hiuna-Khomlui/list/2",
	"/app/Hiuna-Khomlui/list/3",
	"/app/Hiuna-Khomlui/list/4",
	"/app/Hiuna-Khomlui/list/5",
	"/app/Hiuna-Khomlui/list/6",
	"/app/Hiuna-Khomlui/list/7",
	"/app/Hiuna-Khomlui/list/8",
	"/app/Hiuna-Khomlui/list/9",
	"/app/Hiuna-Khomlui/list/10",
	"/app/Hiuna-Khomlui/list/11",
	"/app/Hiuna-Khomlui/list/12",
	"/app/Hiuna-Khomlui/list/13",
	"/app/Hiuna-Khomlui/list/14",
	"/app/Hiuna-Khomlui/list/15",
	"/app/Hiuna-Khomlui/list/16",
	"/app/Hiuna-Khomlui/list/17",
	"/app/Hiuna-Khomlui/list/18",
	"/app/Hiuna-Khomlui/list/19",
	"/app/Hiuna-Khomlui/list/20",
	"/app/Hiuna-Khomlui/list/21",
	"/app/Hiuna-Khomlui/list/22",
	"/app/Hiuna-Khomlui/list/23",
	"/app/Hiuna-Khomlui/list/24",
	"/app/Hiuna-Khomlui/list/25",
	"/app/Hiuna-Khomlui/list/26",
	"/app/Hiuna-Khomlui/list/27",
	"/app/Hiuna-Khomlui/list/28",
	"/app/Hiuna-Khomlui/list/29",
	"/app/Hiuna-Khomlui/list/30",
	"/app/Hiuna-Khomlui/list/31",
	"/app/Hiuna-Khomlui/list/32",
	"/app/Hiuna-Khomlui/list/33",
	"/app/Hiuna-Khomlui/list/34",
	"/app/Hiuna-Khomlui/list/35",
	"/app/Hiuna-Khomlui/list/36",
	"/app/Hiuna-Khomlui/list/37",
	"/app/Hiuna-Khomlui/list/38",
	"/app/Hiuna-Khomlui/list/39",
	"/app/Hiuna-Khomlui/list/40",
	"/app/Hiuna-Khomlui/list/41",
	"/app/Hiuna-Khomlui/list/42",
	"/app/Hiuna-Khomlui/list/43",
	"/app/Hiuna-Khomlui/list/44",
	"/app/Hiuna-Khomlui/list/45",
	"/app/Hiuna-Khomlui/list/46",
	"/app/Hiuna-Khomlui/list/47",
	"/app/Hiuna-Khomlui/list/48",
	"/app/Hiuna-Khomlui/list/49",
	"/app/Hiuna-Khomlui/list/50",
	"/app/Hiuna-Khomlui/list/51",
	"/app/Hiuna-Khomlui/list/52",
	"/app/Hiuna-Khomlui/list/53",
	"/app/Hiuna-Khomlui/list/54",
	"/app/Hiuna-Khomlui/list/55",
	"/app/Hiuna-Khomlui/list/56",
	"/app/Hiuna-Khomlui/list/57",
	"/app/Hiuna-Khomlui/list/58",
	"/app/Hiuna-Khomlui/list/59",
	"/app/Hiuna-Khomlui/list/60",
	"/app/Hiuna-Khomlui/list/61",
	"/app/Hiuna-Khomlui/list/62",
	"/app/Hiuna-Khomlui/list/63",
	"/app/Hiuna-Khomlui/list/64",
	"/app/Hiuna-Khomlui/list/65",
	"/app/Hiuna-Khomlui/list/66",
	"/app/Hiuna-Khomlui/list/67",
	"/app/Hiuna-Khomlui/list/68",
	"/app/Hiuna-Khomlui/list/69",
	"/app/Hiuna-Khomlui/list/70",
	"/app/Hiuna-Khomlui/list/71",
	"/app/Hiuna-Khomlui/list/72",
	"/app/Hiuna-Khomlui/list/73",
	"/app/Hiuna-Khomlui/list/74",
	"/app/Hiuna-Khomlui/list/75",
	"/app/Hiuna-Khomlui/list/76",
	"/app/Hiuna-Khomlui/list/77",
	"/app/Hiuna-Khomlui/list/78",
	"/app/Hiuna-Khomlui/list/79",
	"/app/Hiuna-Khomlui/list/80",
	"/app/Hiuna-Khomlui/list/81",
	"/app/Hiuna-Khomlui/list/82",
	"/app/Hiuna-Khomlui/list/83",
	"/app/Hiuna-Khomlui/list/84",
	"/app/Hiuna-Khomlui/list/85",
	"/app/Hiuna-Khomlui/list/86",
	"/app/Hiuna-Khomlui/list/87",
	"/app/Hiuna-Khomlui/list/88",
	"/app/Hiuna-Khomlui/list/89",
	"/app/Hiuna-Khomlui/list/90",
	"/app/Hiuna-Khomlui/list/91",
	"/app/Hiuna-Khomlui/list/92",
	"/app/Hiuna-Khomlui/list/93",
	"/app/Hiuna-Khomlui/list/94",
	"/app/Hiuna-Khomlui/list/95",
	"/app/Hiuna-Khomlui/list/96",
	"/app/Hiuna-Khomlui/list/97",
	"/app/Hiuna-Khomlui/list/98",
	"/app/Hiuna-Khomlui/list/99",
	"/app/Hiuna-Khomlui/list/100",
	"/app/Hiuna-Khomlui/list/101",
	"/app/Hiuna-Khomlui/list/102",
	"/app/Hiuna-Khomlui/list/103",
	"/app/Hiuna-Khomlui/list/104",
	"/app/Hiuna-Khomlui/list/105",
	"/app/Hiuna-Khomlui/list/106",
	"/app/Hiuna-Khomlui/list/107",
	"/app/Hiuna-Khomlui/list/108",
	"/app/Hiuna-Khomlui/list/109",
	"/app/Hiuna-Khomlui/list/110",
	"/app/Hiuna-Khomlui/list/111",
	"/app/Hiuna-Khomlui/list/112",
	"/app/Hiuna-Khomlui/list/113",
	"/app/Hiuna-Khomlui/list/114",
	"/app/Hiuna-Khomlui/list/115",
	"/app/Hiuna-Khomlui/list/116",
	"/app/Hiuna-Khomlui/list/117",
	"/app/Hiuna-Khomlui/list/118",
	"/app/Hiuna-Khomlui/list/119",
	"/app/Hiuna-Khomlui/list/120",
	"/app/Hiuna-Khomlui/list/121",
	"/app/Hiuna-Khomlui/list/122",
	"/app/Hiuna-Khomlui/list/123",
	"/app/Hiuna-Khomlui/list/124",
	"/app/Hiuna-Khomlui/list/125",
	"/app/Hiuna-Khomlui/list/126",
	"/app/Hiuna-Khomlui/list/127",
	"/app/Hiuna-Khomlui/list/128",
	"/app/Hiuna-Khomlui/list/129",
	"/app/Hiuna-Khomlui/list/130",
	"/app/Hiuna-Khomlui/list/131",
	"/app/Hiuna-Khomlui/list/132",
	"/app/Hiuna-Khomlui/list/133",
	"/app/Hiuna-Khomlui/list/134",
	"/app/Hiuna-Khomlui/list/135",
	"/app/Hiuna-Khomlui/list/136",
	"/app/Hiuna-Khomlui/list/137",
	"/app/Hiuna-Khomlui/list/138",
	"/app/Hiuna-Khomlui/list/139",
	"/app/Hiuna-Khomlui/list/140",
	"/app/Hiuna-Khomlui/list/141",
	"/app/Hiuna-Khomlui/list/142",
	"/app/Hiuna-Khomlui/list/143",
	"/app/Hiuna-Khomlui/list/144",
	"/app/Hiuna-Khomlui/list/145",
	"/app/Hiuna-Khomlui/list/146",
	"/app/Hiuna-Khomlui/list/147",
	"/app/Hiuna-Khomlui/list/148",
	"/app/Hiuna-Khomlui/list/149",
	"/app/Hiuna-Khomlui/list/150",
	"/app/Hiuna-Khomlui/list/151",
	"/app/Hiuna-Khomlui/list/152",
	"/app/Hiuna-Khomlui/list/153",
	"/app/Hiuna-Khomlui/list/154",
	"/app/Hiuna-Khomlui/list/155",
	"/app/Hiuna-Khomlui/list/156",
	"/app/Hiuna-Khomlui/list/157",
	"/app/Hiuna-Khomlui/list/158",
	"/app/Hiuna-Khomlui/list/159",
	"/app/Hiuna-Khomlui/list/160",
	"/app/Hiuna-Khomlui/list/161",
	"/app/Hiuna-Khomlui/list/162",
	"/app/Hiuna-Khomlui/list/163",
	"/app/Hiuna-Khomlui/list/164",
	"/app/Hiuna-Khomlui/list/165",
	"/app/Hiuna-Khomlui/list/166",
	"/app/Hiuna-Khomlui/list/167",
	"/app/Hiuna-Khomlui/list/168",
	"/app/Hiuna-Khomlui/list/169",
	"/app/Hiuna-Khomlui/list/170",
	"/app/Hiuna-Khomlui/list/171",
	"/app/Hiuna-Khomlui/list/172",
	"/app/Hiuna-Khomlui/list/173",
	"/app/Hiuna-Khomlui/list/174",
	"/app/Hiuna-Khomlui/list/175",
	"/app/Hiuna-Khomlui/list/176",
	"/app/Hiuna-Khomlui/list/177",
	"/app/Hiuna-Khomlui/list/178",
	"/app/Hiuna-Khomlui/list/179",
	"/app/Hiuna-Khomlui/list/180",
	"/app/Hiuna-Khomlui/list/181",
	"/app/Hiuna-Khomlui/list/182",
	"/app/Hiuna-Khomlui/list/183",
	"/app/Hiuna-Khomlui/list/184",
	"/app/Hiuna-Khomlui/list/185",
	"/app/Hiuna-Khomlui/list/186",
	"/app/Hiuna-Khomlui/list/187",
	"/app/Hiuna-Khomlui/list/188",
	"/app/Hiuna-Khomlui/list/189",
	"/app/Hiuna-Khomlui/list/190",
	"/app/Hiuna-Khomlui/list/191",
	"/app/Hiuna-Khomlui/list/192",
	"/app/Hiuna-Khomlui/list/193",
	"/app/Hiuna-Khomlui/list/194",
	"/app/Hiuna-Khomlui/list/195",
	"/app/Hiuna-Khomlui/list/196",
	"/app/Hiuna-Khomlui/list/197",
	"/app/Hiuna-Khomlui/list/198",
	"/app/Hiuna-Khomlui/list/199",
	"/app/Hiuna-Khomlui/list/200",
	"/app/Hiuna-Khomlui/list/201",
	"/app/Hiuna-Khomlui/list/202",
	"/app/Hiuna-Khomlui/list/203",
	"/app/Hiuna-Khomlui/list/204",
	"/app/Hiuna-Khomlui/list/205",
	"/app/Hiuna-Khomlui/list/206",
	"/app/Hiuna-Khomlui/list/207",
	"/app/Hiuna-Khomlui/list/208",
	"/app/Hiuna-Khomlui/list/209",
	"/app/Hiuna-Khomlui/list/210",
	"/app/Hiuna-Khomlui/list/211",
	"/app/Hiuna-Khomlui/list/212",
	"/app/Hiuna-Khomlui/list/213",
	"/app/Hiuna-Khomlui/list/214",
	"/app/Hiuna-Khomlui/list/215",
	"/app/Hiuna-Khomlui/list/216",
	"/app/Hiuna-Khomlui/list/217",
	"/app/Hiuna-Khomlui/list/218",
	"/app/Hiuna-Khomlui/list/219",
	"/app/Hiuna-Khomlui/list/220",
	"/app/Hiuna-Khomlui/list/221",
	"/app/Hiuna-Khomlui/list/222",
	"/app/Hiuna-Khomlui/list/223",
	"/app/Hiuna-Khomlui/list/224",
	"/app/Hiuna-Khomlui/list/225",
	"/app/Hiuna-Khomlui/list/226",
	"/app/Hiuna-Khomlui/list/227",
	"/app/Hiuna-Khomlui/list/228",
	"/app/Hiuna-Khomlui/list/229",
	"/app/Hiuna-Khomlui/list/230",
	"/app/Hiuna-Khomlui/list/231",
	"/app/Hiuna-Khomlui/list/232",
	"/app/Hiuna-Khomlui/list/233",
	"/app/Hiuna-Khomlui/list/234",
	"/app/Hiuna-Khomlui/list/235",
	"/app/Hiuna-Khomlui/list/236",
	"/app/Hiuna-Khomlui/list/237",
	"/app/Hiuna-Khomlui/list/238",
	"/app/Hiuna-Khomlui/list/239",
	"/app/Hiuna-Khomlui/list/240",
	"/app/Hiuna-Khomlui/list/241",
	"/app/Hiuna-Khomlui/list/242",
	"/app/Hiuna-Khomlui/list/243",
	"/app/Hiuna-Khomlui/list/244",
	"/app/Hiuna-Khomlui/list/245",
	"/app/Hiuna-Khomlui/list/246",
	"/app/Hiuna-Khomlui/list/247",
	"/app/Hiuna-Khomlui/list/248",
	"/app/Hiuna-Khomlui/list/249",
	"/app/Hiuna-Khomlui/list/250",
	"/app/Hiuna-Khomlui/list/251",
	"/app/Hiuna-Khomlui/list/252",
	"/app/Hiuna-Khomlui/list/253",
	"/app/Hiuna-Khomlui/list/254",
	"/app/Hiuna-Khomlui/list/255",
	"/app/Hiuna-Khomlui/list/256",
	"/app/Hiuna-Khomlui/list/257",
	"/app/Hiuna-Khomlui/list/258",
	"/app/Hiuna-Khomlui/list/259",
	"/app/Hiuna-Khomlui/list/260",
	"/app/Hiuna-Khomlui/list/261",
	"/app/Hiuna-Khomlui/list/262",
	"/app/Hiuna-Khomlui/list/263",
	"/app/Hiuna-Khomlui/list/264",
	"/app/Hiuna-Khomlui/list/265",
	"/app/Hiuna-Khomlui/list/266",
	"/app/Hiuna-Khomlui/list/267",
	"/app/Hiuna-Khomlui/list/268",
	"/app/Hiuna-Khomlui/list/269",
	"/app/Hiuna-Khomlui/list/270",
	"/app/Hiuna-Khomlui/list/271",
	"/app/Hiuna-Khomlui/list/272",
	"/app/Hiuna-Khomlui/list/273",
	"/app/Hiuna-Khomlui/list/274",
	"/app/Hiuna-Khomlui/list/275",
	"/app/Hiuna-Khomlui/list/276",
	"/app/Hiuna-Khomlui/list/277",
	"/app/Hiuna-Khomlui/list/278",
	"/app/Hiuna-Khomlui/list/279",
	"/app/Hiuna-Khomlui/list/280",
	"/app/Hiuna-Khomlui/list/281",
	"/app/Hiuna-Khomlui/list/282",
	"/app/Hiuna-Khomlui/list/283",
	"/app/Hiuna-Khomlui/list/284",
	"/app/Hiuna-Khomlui/list/285",
	"/app/Hiuna-Khomlui/list/286",
	"/app/Hiuna-Khomlui/list/287",
	"/app/Hiuna-Khomlui/list/288",
	"/app/Hiuna-Khomlui/list/289",
	"/app/Hiuna-Khomlui/list/290",
	"/app/Hiuna-Khomlui/list/291",
	"/app/Hiuna-Khomlui/list/292",
	"/app/Hiuna-Khomlui/list/293",
	"/app/Hiuna-Khomlui/list/294",
	"/app/Hiuna-Khomlui/list/295",
	"/app/Hiuna-Khomlui/list/296",
	"/app/Hiuna-Khomlui/list/297",
	"/app/Hiuna-Khomlui/list/298",
	"/app/Hiuna-Khomlui/list/299",
	"/app/Hiuna-Khomlui/list/300",
	"/app/Hiuna-Khomlui/list/301",
	"/app/Hiuna-Khomlui/list/302",
	"/app/Khristen-Madui-Lui/list",
	"/app/Khristen-Madui-Lui/list/1",
	"/app/Khristen-Madui-Lui/list/2",
	"/app/Khristen-Madui-Lui/list/3",
	"/app/Khristen-Madui-Lui/list/4",
	"/app/Khristen-Madui-Lui/list/5",
	"/app/Khristen-Madui-Lui/list/6",
	"/app/Khristen-Madui-Lui/list/7",
	"/app/Khristen-Madui-Lui/list/8",
	"/app/Khristen-Madui-Lui/list/9",
	"/app/Khristen-Madui-Lui/list/10",
	"/app/Khristen-Madui-Lui/list/11",
	"/app/Khristen-Madui-Lui/list/12",
	"/app/Khristen-Madui-Lui/list/13",
	"/app/Khristen-Madui-Lui/list/14",
	"/app/Khristen-Madui-Lui/list/15",
	"/app/Khristen-Madui-Lui/list/16",
	"/app/Khristen-Madui-Lui/list/17",
	"/app/Khristen-Madui-Lui/list/18",
	"/app/Khristen-Madui-Lui/list/19",
	"/app/Khristen-Madui-Lui/list/20",
	"/app/Khristen-Madui-Lui/list/21",
	"/app/Khristen-Madui-Lui/list/22",
	"/app/Khristen-Madui-Lui/list/23",
	"/app/Khristen-Madui-Lui/list/24",
	"/app/Khristen-Madui-Lui/list/25",
	"/app/Khristen-Madui-Lui/list/26",
	"/app/Khristen-Madui-Lui/list/27",
	"/app/Khristen-Madui-Lui/list/28",
	"/app/Khristen-Madui-Lui/list/29",
	"/app/Khristen-Madui-Lui/list/30",
	"/app/Khristen-Madui-Lui/list/31",
	"/app/Khristen-Madui-Lui/list/32",
	"/app/Khristen-Madui-Lui/list/33",
	"/app/Khristen-Madui-Lui/list/34",
	"/app/Khristen-Madui-Lui/list/35",
	"/app/Khristen-Madui-Lui/list/36",
	"/app/Khristen-Madui-Lui/list/37",
	"/app/Khristen-Madui-Lui/list/38",
	"/app/Khristen-Madui-Lui/list/39",
	"/app/Khristen-Madui-Lui/list/40",
	"/app/Khristen-Madui-Lui/list/41",
	"/app/Khristen-Madui-Lui/list/42",
	"/app/Khristen-Madui-Lui/list/43",
	"/app/Khristen-Madui-Lui/list/44",
	"/app/Khristen-Madui-Lui/list/45",
	"/app/Khristen-Madui-Lui/list/46",
	"/app/Khristen-Madui-Lui/list/47",
	"/app/Khristen-Madui-Lui/list/48",
	"/app/Khristen-Madui-Lui/list/49",
	"/app/Khristen-Madui-Lui/list/50",
	"/app/Khristen-Madui-Lui/list/51",
	"/app/Khristen-Madui-Lui/list/52",
	"/app/Khristen-Madui-Lui/list/53",
	"/app/Khristen-Madui-Lui/list/54",
	"/app/Khristen-Madui-Lui/list/55",
	"/app/Khristen-Madui-Lui/list/56",
	"/app/Khristen-Madui-Lui/list/57",
	"/app/Khristen-Madui-Lui/list/58",
	"/app/Khristen-Madui-Lui/list/59",
	"/app/Khristen-Madui-Lui/list/60",
	"/app/Khristen-Madui-Lui/list/61",
	"/app/Khristen-Madui-Lui/list/62",
	"/app/Khristen-Madui-Lui/list/63",
	"/app/Khristen-Madui-Lui/list/64",
	"/app/Khristen-Madui-Lui/list/65",
	"/app/Khristen-Madui-Lui/list/66",
	"/app/Khristen-Madui-Lui/list/67",
	"/app/Khristen-Madui-Lui/list/68",
	"/app/Khristen-Madui-Lui/list/69",
	"/app/Khristen-Madui-Lui/list/70",
	"/app/Khristen-Madui-Lui/list/71",
	"/app/Khristen-Madui-Lui/list/72",
	"/app/Khristen-Madui-Lui/list/73",
	"/app/Khristen-Madui-Lui/list/74",
	"/app/Khristen-Madui-Lui/list/75",
	"/app/Khristen-Madui-Lui/list/76",
	"/app/Khristen-Madui-Lui/list/77",
	"/app/Khristen-Madui-Lui/list/78",
	"/app/Khristen-Madui-Lui/list/79",
	"/app/Khristen-Madui-Lui/list/80",
	"/app/Khristen-Madui-Lui/list/81",
	"/app/Khristen-Madui-Lui/list/82",
	"/app/Khristen-Madui-Lui/list/83",
	"/app/Khristen-Madui-Lui/list/84",
	"/app/Khristen-Madui-Lui/list/85",
	"/app/Khristen-Madui-Lui/list/86",
	"/app/Khristen-Madui-Lui/list/87",
	"/app/Khristen-Madui-Lui/list/88",
	"/app/Khristen-Madui-Lui/list/89",
	"/app/Khristen-Madui-Lui/list/90",
	"/app/Khristen-Madui-Lui/list/91",
	"/app/Khristen-Madui-Lui/list/92",
	"/app/Khristen-Madui-Lui/list/93",
	"/app/Khristen-Madui-Lui/list/94",
	"/app/Khristen-Madui-Lui/list/95",
	"/app/Khristen-Madui-Lui/list/96",
	"/app/Khristen-Madui-Lui/list/97",
	"/app/Khristen-Madui-Lui/list/98",
	"/app/Khristen-Madui-Lui/list/99",
	"/app/Khristen-Madui-Lui/list/100",
	"/app/Khristen-Madui-Lui/list/101",
	"/app/Khristen-Madui-Lui/list/102",
	"/app/Khristen-Madui-Lui/list/103",
	"/app/Khristen-Madui-Lui/list/104",
	"/app/Khristen-Madui-Lui/list/105",
	"/app/Khristen-Madui-Lui/list/106",
	"/app/Khristen-Madui-Lui/list/107",
	"/app/Khristen-Madui-Lui/list/108",
	"/app/Khristen-Madui-Lui/list/109",
	"/app/Khristen-Madui-Lui/list/110",
	"/app/Khristen-Madui-Lui/list/111",
	"/app/Khristen-Madui-Lui/list/112",
	"/app/Khristen-Madui-Lui/list/113",
	"/app/Khristen-Madui-Lui/list/114",
	"/app/Khristen-Madui-Lui/list/115",
	"/app/Khristen-Madui-Lui/list/116",
	"/app/Khristen-Madui-Lui/list/117",
	"/app/Khristen-Madui-Lui/list/118",
	"/app/Khristen-Madui-Lui/list/119",
	"/app/Khristen-Madui-Lui/list/120",
	"/app/Khristen-Madui-Lui/list/121",
	"/app/Khristen-Madui-Lui/list/122",
	"/app/Khristen-Madui-Lui/list/123",
	"/app/Khristen-Madui-Lui/list/124",
	"/app/Khristen-Madui-Lui/list/125",
	"/app/Khristen-Madui-Lui/list/126",
	"/app/Khristen-Madui-Lui/list/127",
	"/app/Khristen-Madui-Lui/list/128",
	"/app/Khristen-Madui-Lui/list/129",
	"/app/Khristen-Madui-Lui/list/130",
	"/app/Khristen-Madui-Lui/list/131",
	"/app/Khristen-Madui-Lui/list/132",
	"/app/Khristen-Madui-Lui/list/133",
	"/app/Khristen-Madui-Lui/list/134",
	"/app/Khristen-Madui-Lui/list/135",
	"/app/Khristen-Madui-Lui/list/136",
	"/app/Khristen-Madui-Lui/list/137",
	"/app/Khristen-Madui-Lui/list/138",
	"/app/Khristen-Madui-Lui/list/139",
	"/app/Khristen-Madui-Lui/list/140",
	"/app/Khristen-Madui-Lui/list/141",
	"/app/Khristen-Madui-Lui/list/142",
	"/app/Khristen-Madui-Lui/list/143",
	"/app/Khristen-Madui-Lui/list/144",
	"/app/Khristen-Madui-Lui/list/145",
	"/app/Khristen-Madui-Lui/list/146",
	"/app/Khristen-Madui-Lui/list/147",
	"/app/Khristen-Madui-Lui/list/148",
	"/app/Khristen-Madui-Lui/list/149",
	"/app/Khristen-Madui-Lui/list/150",
	"/app/Khristen-Madui-Lui/list/151",
	"/app/Khristen-Madui-Lui/list/152",
	"/app/Khristen-Madui-Lui/list/153",
	"/app/Khristen-Madui-Lui/list/154",
	"/app/Khristen-Madui-Lui/list/155",
	"/app/Khristen-Madui-Lui/list/156",
	"/app/Khristen-Madui-Lui/list/157",
	"/app/Khristen-Madui-Lui/list/158",
	"/app/Khristen-Madui-Lui/list/159",
	"/app/Khristen-Madui-Lui/list/160",
	"/app/Khristen-Madui-Lui/list/161",
	"/app/Khristen-Madui-Lui/list/162",
	"/app/Khristen-Madui-Lui/list/163",
	"/app/Khristen-Madui-Lui/list/164",
	"/app/Khristen-Madui-Lui/list/165",
	"/app/Khristen-Madui-Lui/list/166",
	"/app/Khristen-Madui-Lui/list/167",
	"/app/Khristen-Madui-Lui/list/168",
	"/app/Khristen-Madui-Lui/list/169",
	"/app/Khristen-Madui-Lui/list/170",
	"/app/Khristen-Madui-Lui/list/171",
	"/app/Khristen-Madui-Lui/list/172",
	"/app/Khristen-Madui-Lui/list/173",
	"/app/Khristen-Madui-Lui/list/174",
	"/app/Khristen-Madui-Lui/list/175",
	"/app/Khristen-Madui-Lui/list/176",
	"/app/Khristen-Madui-Lui/list/177",
	"/app/Khristen-Madui-Lui/list/178",
	"/app/Khristen-Madui-Lui/list/179",
	"/app/Khristen-Madui-Lui/list/180",
	"/app/Khristen-Madui-Lui/list/181",
	"/app/Khristen-Madui-Lui/list/182",
	"/app/Khristen-Madui-Lui/list/183",
	"/app/Khristen-Madui-Lui/list/184",
	"/app/Khristen-Madui-Lui/list/185",
	"/app/Khristen-Madui-Lui/list/186",
	"/app/Khristen-Madui-Lui/list/187",
	"/app/Khristen-Madui-Lui/list/188",
	"/app/Khristen-Madui-Lui/list/189",
	"/app/Khristen-Madui-Lui/list/190",
	"/app/Khristen-Madui-Lui/list/191",
	"/app/Khristen-Madui-Lui/list/192",
	"/app/Khristen-Madui-Lui/list/193",
	"/app/Khristen-Madui-Lui/list/194",
	"/app/Khristen-Madui-Lui/list/195",
	"/app/Khristen-Madui-Lui/list/196",
	"/app/Khristen-Madui-Lui/list/197",
	"/app/Khristen-Madui-Lui/list/198",
	"/app/Khristen-Madui-Lui/list/199",
	"/app/Khristen-Madui-Lui/list/200",
	"/app/Khristen-Madui-Lui/list/201",
	"/app/Khristen-Madui-Lui/list/202",
	"/app/Khristen-Madui-Lui/list/203",
	"/app/Khristen-Madui-Lui/list/204",
	"/app/Khristen-Madui-Lui/list/205",
	"/app/Khristen-Madui-Lui/list/206",
	"/app/Khristen-Madui-Lui/list/207",
	"/app/Khristen-Madui-Lui/list/208",
	"/app/Khristen-Madui-Lui/list/209",
	"/app/Khristen-Madui-Lui/list/210",
	"/app/Khristen-Madui-Lui/list/211",
	"/app/Khristen-Madui-Lui/list/212",
	"/app/Khristen-Madui-Lui/list/213",
	"/app/Khristen-Madui-Lui/list/214",
	"/app/Khristen-Madui-Lui/list/215",
	"/app/Khristen-Madui-Lui/list/216",
	"/app/Khristen-Madui-Lui/list/217",
	"/app/Khristen-Madui-Lui/list/218",
	"/app/Khristen-Madui-Lui/list/219",
	"/app/Khristen-Madui-Lui/list/220",
	"/app/Khristen-Madui-Lui/list/221",
	"/app/Khristen-Madui-Lui/list/222",
	"/app/Khristen-Madui-Lui/list/223",
	"/app/Khristen-Madui-Lui/list/224",
	"/app/Khristen-Madui-Lui/list/225",
	"/app/Khristen-Madui-Lui/list/226",
	"/app/Khristen-Madui-Lui/list/227",
	"/app/Khristen-Madui-Lui/list/228",
	"/app/Khristen-Madui-Lui/list/229",
	"/app/Khristen-Madui-Lui/list/230",
	"/app/Khristen-Madui-Lui/list/231",
	"/app/Khristen-Madui-Lui/list/232",
	"/app/Khristen-Madui-Lui/list/233",
	"/app/Khristen-Madui-Lui/list/234",
	"/app/Khristen-Madui-Lui/list/235",
	"/app/Khristen-Madui-Lui/list/236",
	"/app/Khristen-Madui-Lui/list/237",
	"/app/Khristen-Madui-Lui/list/238",
	"/app/Khristen-Madui-Lui/list/239",
	"/app/Khristen-Madui-Lui/list/240",
	"/app/Khristen-Madui-Lui/list/241",
	"/app/Khristen-Madui-Lui/list/242",
	"/app/Khristen-Madui-Lui/list/243",
	"/app/Khristen-Madui-Lui/list/244",
	"/app/Khristen-Madui-Lui/list/245",
	"/app/Khristen-Madui-Lui/list/246",
	"/app/Khristen-Madui-Lui/list/247",
	"/app/Khristen-Madui-Lui/list/248",
	"/app/Khristen-Madui-Lui/list/249",
	"/app/Khristen-Madui-Lui/list/250",
	"/app/Khristen-Madui-Lui/list/251",
	"/app/Khristen-Madui-Lui/list/252",
	"/app/Khristen-Madui-Lui/list/253",
	"/app/Khristen-Madui-Lui/list/254",
	"/app/Khristen-Madui-Lui/list/255",
	"/app/Khristen-Madui-Lui/list/256",
	"/app/Khristen-Madui-Lui/list/257",
	"/app/Khristen-Madui-Lui/list/258",
	"/app/Khristen-Madui-Lui/list/259",
	"/app/Khristen-Madui-Lui/list/260",
	"/app/Khristen-Madui-Lui/list/261",
	"/app/Khristen-Madui-Lui/list/262",
	"/app/Khristen-Madui-Lui/list/263",
	"/app/Khristen-Madui-Lui/list/264",
	"/app/Khristen-Madui-Lui/list/265",
	"/app/Khristen-Madui-Lui/list/266",
	"/app/Khristen-Madui-Lui/list/267",
	"/app/Khristen-Madui-Lui/list/268",
	"/app/Khristen-Madui-Lui/list/269",
	"/app/Khristen-Madui-Lui/list/270",
	"/app/Khristen-Madui-Lui/list/271",
	"/app/Khristen-Madui-Lui/list/272",
	"/app/Khristen-Madui-Lui/list/273",
	"/app/Khristen-Madui-Lui/list/274",
	"/app/Khristen-Madui-Lui/list/275",
	"/app/Khristen-Madui-Lui/list/276",
	"/app/Khristen-Madui-Lui/list/277",
	"/app/Khristen-Madui-Lui/list/278",
	"/app/Khristen-Madui-Lui/list/279",
	"/app/Khristen-Madui-Lui/list/280",
	"/app/Khristen-Madui-Lui/list/281",
	"/app/Khristen-Madui-Lui/list/282",
	"/app/Khristen-Madui-Lui/list/283",
	"/app/Khristen-Madui-Lui/list/284",
	"/app/Khristen-Madui-Lui/list/285",
	"/app/Khristen-Madui-Lui/list/286",
	"/app/Khristen-Madui-Lui/list/287",
	"/app/Khristen-Madui-Lui/list/288",
	"/app/Khristen-Madui-Lui/list/289",
	"/app/Khristen-Madui-Lui/list/290",
	"/app/Khristen-Madui-Lui/list/291",
	"/app/Khristen-Madui-Lui/list/292",
	"/app/Khristen-Madui-Lui/list/293",
	"/app/Khristen-Madui-Lui/list/294",
	"/app/Khristen-Madui-Lui/list/295",
	"/app/Khristen-Madui-Lui/list/296",
	"/app/Khristen-Madui-Lui/list/297",
	"/app/Khristen-Madui-Lui/list/298",
	"/app/Khristen-Madui-Lui/list/299",
	"/app/Khristen-Madui-Lui/list/300",
	"/app/Khristen-Madui-Lui/list/301",
	"/app/Khristen-Madui-Lui/list/302",
	"/app/Khristen-Madui-Lui/list/303",
	"/app/Khristen-Madui-Lui/list/304",
	"/app/Khristen-Madui-Lui/list/305",
	"/app/Khristen-Madui-Lui/list/306",
	"/app/Khristen-Madui-Lui/list/307",
	"/app/Khristen-Madui-Lui/list/308",
	"/app/Khristen-Madui-Lui/list/309",
	"/app/Khristen-Madui-Lui/list/310",
	"/app/Khristen-Madui-Lui/list/311",
	"/app/Khristen-Madui-Lui/list/312",
	"/app/Khristen-Madui-Lui/list/313",
	"/app/Khristen-Madui-Lui/list/314",
	"/app/Khristen-Madui-Lui/list/315",
	"/app/Khristen-Madui-Lui/list/316",
	"/app/Khristen-Madui-Lui/list/317",
	"/app/Khristen-Madui-Lui/list/318",
	"/app/Khristen-Madui-Lui/list/319",
	"/app/Khristen-Madui-Lui/list/320",
	"/app/Khristen-Madui-Lui/list/321",
	"/app/Khristen-Madui-Lui/list/322",
	"/app/Khristen-Madui-Lui/list/323",
	"/app/Khristen-Madui-Lui/list/324",
	"/app/Khristen-Madui-Lui/list/325",
	"/app/Khristen-Madui-Lui/list/326",
	"/app/Khristen-Madui-Lui/list/327",
	"/app/Khristen-Madui-Lui/list/328",
	"/app/Khristen-Madui-Lui/list/329",
	"/app/Khristen-Madui-Lui/list/330",
	"/app/Khristen-Madui-Lui/list/331",
	"/app/Khristen-Madui-Lui/list/332",
	"/app/Khristen-Madui-Lui/list/333",
	"/app/Khristen-Madui-Lui/list/334",
	"/app/Khristen-Madui-Lui/list/335",
	"/app/Khristen-Madui-Lui/list/336",
	"/app/Khristen-Madui-Lui/list/337",
	"/app/Khristen-Madui-Lui/list/338",
	"/app/Khristen-Madui-Lui/list/339",
	"/app/Khristen-Madui-Lui/list/340",
	"/app/Khristen-Madui-Lui/list/341",
	"/app/Khristen-Madui-Lui/list/342",
	"/app/Khristen-Madui-Lui/list/343",
	"/app/Khristen-Madui-Lui/list/344",
	"/app/Khristen-Madui-Lui/list/345",
	"/app/Khristen-Madui-Lui/list/346",
	"/app/Khristen-Madui-Lui/list/347",
	"/app/Khristen-Madui-Lui/list/348",
	"/app/Khristen-Madui-Lui/list/349",
	"/app/Khristen-Madui-Lui/list/350",
	"/app/Khristen-Madui-Lui/list/351",
	"/app/Khristen-Madui-Lui/list/352",
	"/app/Khristen-Madui-Lui/list/353",
	"/app/Khristen-Madui-Lui/list/354",
	"/app/Khristen-Madui-Lui/list/355",
	"/app/Khristen-Madui-Lui/list/356",
	"/app/Khristen-Madui-Lui/list/357",
	"/app/Khristen-Madui-Lui/list/358",
	"/app/Khristen-Madui-Lui/list/359",
	"/app/Khristen-Madui-Lui/list/360",
	"/app/Khristen-Madui-Lui/list/361",
	"/app/Khristen-Madui-Lui/list/362",
	"/app/Khristen-Madui-Lui/list/363",
	"/app/Khristen-Madui-Lui/list/364",
	"/app/Khristen-Madui-Lui/list/365",
	"/app/Khristen-Madui-Lui/list/366",
	"/app/Khristen-Madui-Lui/list/367",
	"/app/Khristen-Madui-Lui/list/368",
	"/app/Khristen-Madui-Lui/list/369",
	"/app/Khristen-Madui-Lui/list/370",
	"/app/Khristen-Madui-Lui/list/371",
	"/app/Khristen-Madui-Lui/list/372",
	"/app/Khristen-Madui-Lui/list/373",
	"/app/Khristen-Madui-Lui/list/374",
	"/app/Khristen-Madui-Lui/list/375",
	"/app/Khristen-Madui-Lui/list/376",
	"/app/Khristen-Madui-Lui/list/377",
	"/app/Khristen-Madui-Lui/list/378",
	"/app/Khristen-Madui-Lui/list/379",
	"/app/Khristen-Madui-Lui/list/380",
	"/app/Khristen-Madui-Lui/list/381",
	"/app/Khristen-Madui-Lui/list/382",
	"/app/Khristen-Madui-Lui/list/383",
	"/app/Khristen-Madui-Lui/list/384",
	"/app/Khristen-Madui-Lui/list/385",
	"/app/Khristen-Madui-Lui/list/386",
	"/app/Khristen-Madui-Lui/list/387",
	"/app/Khristen-Madui-Lui/list/388",
	"/app/Khristen-Madui-Lui/list/389",
	"/app/Khristen-Madui-Lui/list/390",
	"/app/Khristen-Madui-Lui/list/391",
	"/app/Khristen-Madui-Lui/list/392",
	"/app/Khristen-Madui-Lui/list/393",
	"/app/Khristen-Madui-Lui/list/394",
	"/app/Khristen-Madui-Lui/list/395",
	"/app/Khristen-Madui-Lui/list/396",
	"/app/Khristen-Madui-Lui/list/397",
	"/app/Khristen-Madui-Lui/list/398",
	"/app/Khristen-Madui-Lui/list/399",
	"/app/Khristen-Madui-Lui/list/400",
	"/app/Khristen-Madui-Lui/list/401",
	"/app/Khristen-Madui-Lui/list/402",
	"/app/Khristen-Madui-Lui/list/403",
	"/app/Khristen-Madui-Lui/list/404",
	"/app/Khristen-Madui-Lui/list/405",
	"/app/Khristen-Madui-Lui/list/406",
	"/app/Khristen-Madui-Lui/list/407",
	"/app/Khristen-Madui-Lui/list/408",
	"/app/Khristen-Madui-Lui/list/409",
	"/app/Khristen-Madui-Lui/list/410",
	"/app/Khristen-Madui-Lui/list/411",
	"/app/Khristen-Madui-Lui/list/412",
	"/app/Khristen-Madui-Lui/list/413",
	"/app/Khristen-Madui-Lui/list/414",
	"/app/Khristen-Madui-Lui/list/415",
	"/app/Khristen-Madui-Lui/list/416",
	"/app/Khristen-Madui-Lui/list/417",
	"/app/Khristen-Madui-Lui/list/418",
	"/app/Khristen-Madui-Lui/list/419",
	"/app/Khristen-Madui-Lui/list/420",
	"/app/Khristen-Madui-Lui/list/421",
	"/app/Khristen-Madui-Lui/list/422",
	"/app/Khristen-Madui-Lui/list/423",
	"/app/Khristen-Madui-Lui/list/424",
	"/app/Khristen-Madui-Lui/list/425",
	"/app/Khristen-Madui-Lui/list/426",
	"/app/Khristen-Madui-Lui/list/427",
	"/app/Khristen-Madui-Lui/list/428",
	"/app/Khristen-Madui-Lui/list/429",
	"/app/Khristen-Madui-Lui/list/430",
	"/app/Khristen-Madui-Lui/list/431",
	"/app/Khristen-Madui-Lui/list/432",
	"/app/Khristen-Madui-Lui/list/433",
	"/app/Khristen-Madui-Lui/list/434",
	"/app/Khristen-Madui-Lui/list/435",
	"/app/Khristen-Madui-Lui/list/436",
	"/app/Khristen-Madui-Lui/list/437",
	"/app/Khristen-Madui-Lui/list/438",
	"/app/Khristen-Madui-Lui/list/439",
	"/app/Khristen-Madui-Lui/list/440",
	"/app/Khristen-Madui-Lui/list/441",
	"/app/Khristen-Madui-Lui/list/442",
	"/app/Khristen-Madui-Lui/list/443",
	"/app/Khristen-Madui-Lui/list/444",
	"/app/Khristen-Madui-Lui/list/445",
	"/app/Khristen-Madui-Lui/list/446",
	"/app/Khristen-Madui-Lui/list/447",
	"/app/Khristen-Madui-Lui/list/448"
];
var routeDiscovery = { "mode": "initial" };
var publicPath = "/Webapp/";
var entry = { module: entry_server_node_exports };
var routes = {
	"root": {
		id: "root",
		parentId: void 0,
		path: "",
		index: void 0,
		caseSensitive: void 0,
		module: root_exports
	},
	"features/site/Home": {
		id: "features/site/Home",
		parentId: "root",
		path: void 0,
		index: true,
		caseSensitive: void 0,
		module: Home_exports$1
	},
	"features/app/features/home/Home": {
		id: "features/app/features/home/Home",
		parentId: "root",
		path: "app",
		index: true,
		caseSensitive: void 0,
		module: Home_exports
	},
	"features/app/features/auth/SignIn": {
		id: "features/app/features/auth/SignIn",
		parentId: "root",
		path: "app/sign-in",
		index: void 0,
		caseSensitive: void 0,
		module: SignIn_exports
	},
	"features/app/components/layouts/AppLayout": {
		id: "features/app/components/layouts/AppLayout",
		parentId: "root",
		path: void 0,
		index: void 0,
		caseSensitive: void 0,
		module: AppLayout_exports
	},
	"features/app/contexts/FavouritesProvider": {
		id: "features/app/contexts/FavouritesProvider",
		parentId: "features/app/components/layouts/AppLayout",
		path: void 0,
		index: void 0,
		caseSensitive: void 0,
		module: FavouritesProvider_exports
	},
	"features/app/features/collection/CollectionShell": {
		id: "features/app/features/collection/CollectionShell",
		parentId: "features/app/contexts/FavouritesProvider",
		path: "app/:collection/:view",
		index: void 0,
		caseSensitive: void 0,
		module: CollectionShell_exports
	},
	"collection-details": {
		id: "collection-details",
		parentId: "features/app/features/collection/CollectionShell",
		path: ":songId",
		index: void 0,
		caseSensitive: void 0,
		module: Details_exports
	},
	"collection-correction": {
		id: "collection-correction",
		parentId: "features/app/features/collection/CollectionShell",
		path: "suggest-correction",
		index: void 0,
		caseSensitive: void 0,
		module: CorrectionPage_exports
	},
	"collection-projection": {
		id: "collection-projection",
		parentId: "features/app/features/collection/CollectionShell",
		path: "projection",
		index: void 0,
		caseSensitive: void 0,
		module: Projection_exports
	},
	"features/app/features/search/SearchShell": {
		id: "features/app/features/search/SearchShell",
		parentId: "features/app/contexts/FavouritesProvider",
		path: "app/:collection/search",
		index: void 0,
		caseSensitive: void 0,
		module: SearchShell_exports
	},
	"search-details": {
		id: "search-details",
		parentId: "features/app/features/search/SearchShell",
		path: ":songId",
		index: void 0,
		caseSensitive: void 0,
		module: Details_exports
	},
	"search-correction": {
		id: "search-correction",
		parentId: "features/app/features/search/SearchShell",
		path: "suggest-correction",
		index: void 0,
		caseSensitive: void 0,
		module: CorrectionPage_exports
	},
	"search-projection": {
		id: "search-projection",
		parentId: "features/app/features/search/SearchShell",
		path: "projection",
		index: void 0,
		caseSensitive: void 0,
		module: Projection_exports
	},
	"features/app/features/favourite/AllFavouritesShell": {
		id: "features/app/features/favourite/AllFavouritesShell",
		parentId: "features/app/contexts/FavouritesProvider",
		path: "app/Favourites/list",
		index: void 0,
		caseSensitive: void 0,
		module: AllFavouritesShell_exports
	},
	"all-fav-details": {
		id: "all-fav-details",
		parentId: "features/app/features/favourite/AllFavouritesShell",
		path: ":songId",
		index: void 0,
		caseSensitive: void 0,
		module: Details_exports
	},
	"all-fav-correction": {
		id: "all-fav-correction",
		parentId: "features/app/features/favourite/AllFavouritesShell",
		path: "suggest-correction",
		index: void 0,
		caseSensitive: void 0,
		module: CorrectionPage_exports
	},
	"all-fav-projection": {
		id: "all-fav-projection",
		parentId: "features/app/features/favourite/AllFavouritesShell",
		path: "projection",
		index: void 0,
		caseSensitive: void 0,
		module: Projection_exports
	}
};
var allowedActionOrigins = false;
export { allowedActionOrigins, server_manifest_default as assets, assetsBuildDirectory, basename, entry, future, isSpaMode, prerender, publicPath, routeDiscovery, routes, ssr, unstable_apiOnly, unstable_apiServerOrigin };
