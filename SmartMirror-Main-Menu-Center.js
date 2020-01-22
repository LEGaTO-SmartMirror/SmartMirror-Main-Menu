/**
 * @file smartmirror-main-menu.js
 *
 * @author nkucza
 * @license MIT
 *
 * @see  https://github.com/NKucza/smartmirror-main-menu
 */

Module.register("SmartMirror-Main-Menu-Center", {
   
	menuObjPointer:  0,
	selectedNum: -1,
	currentMenuAmount : 1,

	 defaults: {

		menuObj:{	
			main: {
				camera: {title: "Camera Detections", icon: "fa fa-television"},					
				augmentations: {title: "AI Art Mirror", icon: "fa fa-file"},
				//messevideo: {title: "Show messe video", icon: "fa fa-film"},
				applications: {title: "Available Applications" , icon: "fa fa-clone"},
				smarthome: {title: "Smart Home" , icon: "fa fa-home"},
				preferences: {title: "Preferences" , icon: "fa fa-cogs"}
            	//monitorOff: { title: "Turn Off Monitor", icon: "television", source: "SERVER" },
           		//restart: { title: "Restart MagicMirror", icon: "recycle", source: "ALL" },
            	//refresh: { title: "Refresh MagicMirror", icon: "refresh", source: "LOCAL" },
            	//reboot: { title: "Reboot", icon: "spinner", source: "ALL" },
            	//shutdown: { title: "Shutdown", icon: "power-off", source: "ALL" },
        	},
			camera: {
				image: {title: "Toggle Camera Image", icon: "fa fa-eye"},
				distance: {title: "Toggle short distance", icon: "fa fa-compress"},
				face: {title: "Show / Hide Face Detec.", icon: "fa fa-user-circle"},
				objects: {title: "Show / Hide Object Detec.", icon: "fa fa-coffee"},
				gesture: {title: "Show / Hide Gesture Rec.", icon: "fa fa-thumbs-up"},
				SHOWALL: {title: "Show all Detections", icon: "fa fa-eye"},
				person: {title: "Show Person Recognition", icon: "fa fa-users"},
				HIDEALL: {title: "Hide All / Remove All", icon: "fa fa-eye-slash"},
				back: {title: "Back" , icon: "fa fa-undo" }
			},
			augmentations: {
				aiartmiror: {title: "Ai-Art-Mirror", icon: "fa fa-image"},
				randomsytle: {title: "Toggle Styles Automatically", icon : "fa fa-toggle-on"},
				nextsytle: {title: "Next Style", icon: "fa fa-arrow-right"},
				prevsytle: {title: "Previous Style", icon: "fa fa-arrow-left"},
				sourcesytle: {title: "Display Sources", icon: "fa fa-exchange"},
				back: {title: "Back" , icon: "fa fa-undo" }
			},
			messevideo: {
				corlab: {title: "Corlab video", icon: ""},
				back: {title: "Back" , icon: "fa fa-undo" }
			},
			application: {
				clock: {title: "Clock", icon: "fa fa-clock-o" },
				weather: {title: "Weather", icon: "fa fa-cloud"},
				crypto: {title: "Crypto Stock Values", icon: "fa fa-bitcoin" },
				calendar: {title: "Calendar", icon: "fa fa-calendar"},
				mensa: {title: "Mensa Offer", icon: "fa fa-apple" },
				transportation: {title: "Public Transportation", icon: "fa fa-bus" },
				traffic: {title: "Traffic Load", icon: "fa fa-car" },
				speech: {title: "Speech Recogn. Output", icon: "fa fa-comment"},
				newsfeed: {title: "Heise Newsfeed", icon: "fa fa-rss-square" },
				bivital: {title: "Vital Data" , icon: "fa fa-heart"},
				soccer:{title: "Soccer Results", icon:"fa fa-circle"},
				back: {title: "Back" , icon: "fa fa-undo" }
			},
			smarthome: {
				coffee: {title: "Coffee Machine" , icon: "fa fa-coffee" },
				back: {title: "Back" , icon: "fa fa-undo" }
			},
			coffee: {
				stats: {title: "Show/Hide Statistic" , icon: "fa fa-chart-bar" },
				singlecoffee: {title: "Make Single Coffee" , icon: "fa fa-coffee" },
				doublecoffee: {title: "Make Double Coffee" , icon: "fa fa-coffee" },
				espresso: {title: "Make Single Espresso" , icon: "fa fa-coffee" },
				doubleespresso: {title: "Make Double Espresso" , icon: "fa fa-coffee" },
				back: {title: "Back" , icon: "fa fa-undo" }
			},
			preferences: {
				user: {title: "Addjust user settings", icon: "fa fa-user"},
				face: {title: "Face recognition settings", icon: "fa fa-user-circle"},
				back: {title: "Back" , icon: "fa fa-undo" }
			},
			user_settings: {
				language: {title:"language:", icon: "fa fa-globe"},
				back: {title: "Back" , icon: "fa fa-undo" }
			}
		}

	},

		doMenuAction: function(action) {
		var actionDetail = {};
		if (typeof action === "object") {
			actionDetail = action;
			actionName = actionDetail.actionName;
		} else {
			actionName = action;
			actionDetail = this.menuObjPointer[action]['title'];
		}

		this.sendNotification("MENU_CLICKED", actionName);
		//console.log(`OSM Menu Item Clicked: ${actionName}\n${actionDetail}`);

/*		var nodeActions = ["monitorOn", "monitorOff", "monitorToggle", "restart", "reboot", "shutdown", "stop", "minimize", "toggleFullscreen", "openDevTools"];

		// Module Actions
		if (actionName.startsWith("module")) {
			this.handleModuleAction(actionName);
		} else if (actionName.startsWith("notify")) {
			this.sendNotification(actionDetail.notification,actionDetail.payload);
		} else if (nodeActions.indexOf(actionName) !== -1) {
			this.sendSocketNotification("PROCESS_ACTION", actionName);
		} else if (actionName === "refresh") {
			window.location.reload(true);
		} else if (actionName === "toggleTouchMode") {
			this.toggleTouchMode();
		} else if (actionName.startsWith("changeMenuPosition_")) {
			this.changeMenuPosition(actionName.replace("changeMenuPosition_", ""));
		} else if (actionName.startsWith("delayed")) {
			if (!("actionName" in actionDetail)) {
				actionDetail.actionName = actionName;  
			}
			this.delayedAction(actionDetail);
		} else {
			alert(`Unknown OSM Menu Item Clicked: ${actionName}`);
		}

		this.toggleMenu(true); */
	},

	start: function() {
		console.log(this.name + " has started...");
		this.menuObjPointer = this.config.menuObj.main;
		this.config.menuObj.user_settings.language.title = "language: " + config.language;
		
	},

	/**
     * @function getDom
     * @description Creates the UI as DOM for displaying in MagicMirror application.
     * @override
     *
     * @returns {Element}
     */
    getDom() {
		var self = this;
		var wrapper = document.createElement("div");
		wrapper.className = "xLargeMenu";

		var table = document.createElement("table");
		var tbody = document.createElement("tbody");

		table.className = "table";
		table.className = "tbody";


		this.data.header = 'Main Menu'

		function makeOnClickHandler(a) {
			return function() {
				self.doMenuAction(a);
			};
		}

		if(this.selectedNum > -1){
			var selectedObject =  Object.keys(this.menuObjPointer)[this.selectedNum];
		}

		Object.keys(this.menuObjPointer).forEach(k => {
		//	var row = this.getMenuItem(this.menuObjPointer[k]);
			var row = document.createElement("tr");
			var namecell = document.createElement("namecellMainMenu");
			var cellText = document.createTextNode(this.menuObjPointer[k].title + " ");
			namecell.appendChild(cellText);
			//namecell.className =  "namecell";
			namecell.className =  "valuecellMainMenu";
			namecell.onclick = makeOnClickHandler(k);
			row.appendChild(namecell);

			var span = document.createElement("span");
			span.innerHTML = `<i class="${this.menuObjPointer[k].icon}" aria-hidden="true"></i>`;
		
			if (k == selectedObject){
				//span.classList.add('pulse'); 
				//namecell.classList.add('pulse'); 
				console.log(this.name + " added animation to span");
				console.log(" ")
				console.log(" ")
				span.classList.add('pulse'); 
				namecell.classList.add('pulse'); 

				//span.classList.add('pulseanimation'); 
				//namecell.classList.add('pulseanimation'); 
			}

			
			span.onclick = makeOnClickHandler(k);
		
			row.appendChild(span);
			row.className = "tablerow";
			tbody.appendChild(row);
		});

		table.appendChild(tbody);
		wrapper.appendChild(table);

		return wrapper;
    },
		
	getStyles() {
        return ['font-awesome.css', 'SmartMirror-Main-Menu-Center.css'];
    },

	notificationReceived: function(notification, payload, sender) {
		if(notification === 'MAIN_MENU') {
			console.log("[" + this.name + "] " + "received: " + payload);
			if(payload === 'menu'){
				this.menuObjPointer = this.config.menuObj.main;
				this.currentMenuAmount = Object.keys(this.menuObjPointer).length;
				this.selectedNum = -1;
				this.updateDom();
			}else if(payload === 'camera'){
				this.menuObjPointer = this.config.menuObj.camera;
				this.currentMenuAmount = Object.keys(this.menuObjPointer).length;
				this.selectedNum = -1;
				this.updateDom();
			}else if(payload === 'augmentations'){
				this.menuObjPointer = this.config.menuObj.augmentations;
				this.currentMenuAmount = Object.keys(this.menuObjPointer).length;
				this.selectedNum = -1;
				this.updateDom();
			}else if(payload === 'messevideo'){
				this.menuObjPointer = this.config.menuObj.messevideo;
				this.currentMenuAmount = Object.keys(this.menuObjPointer).length;
				this.selectedNum = -1;
				this.updateDom();
			}else if(payload === 'application'){
				this.menuObjPointer = this.config.menuObj.application;
				this.currentMenuAmount = Object.keys(this.menuObjPointer).length;
				this.selectedNum = -1;
				this.updateDom();
			}else if(payload === 'smarthome'){
				this.menuObjPointer = this.config.menuObj.smarthome;
				this.currentMenuAmount = Object.keys(this.menuObjPointer).length;
				this.selectedNum = -1;
				this.updateDom();
			}else if(payload === 'coffee'){
				this.menuObjPointer = this.config.menuObj.coffee;
				this.currentMenuAmount = Object.keys(this.menuObjPointer).length;
				this.selectedNum = -1;
				this.updateDom();
			}else if(payload === 'preferences'){
				this.menuObjPointer = this.config.menuObj.preferences;
				this.currentMenuAmount = Object.keys(this.menuObjPointer).length;
				this.selectedNum = -1;
				this.updateDom();
			}else if(payload === 'user_settings'){
				this.menuObjPointer = this.config.menuObj.user_settings;
				this.currentMenuAmount = Object.keys(this.menuObjPointer).length;
				this.selectedNum = -1;
				this.config.menuObj.user_settings.language.title = "language: " + config.language;
				this.updateDom();
			}
			this.sendNotification("MENU_ITEMS", Object.keys(this.menuObjPointer));
		}else if (notification === 'MAIN_MENU_CLICK_SELECTED'){
			if(this.selectedNum > -1){
				var actionName = Object.keys(this.menuObjPointer)[this.selectedNum];
				this.sendNotification("MENU_CLICKED", actionName);
				this.selectedNum = -1;
				this.updateDom();
			}
		}else if (notification === 'MAIN_MENU_SELECT'){
			this.selectedNum = payload;
			this.updateDom();
			console.log(this.name + "selected item is now: " + this.selectedNum);
		}else if (notification === 'MAIN_MENU_UP'){
			this.selectedNum = this.selectedNum -1;
			if(this.selectedNum < 0)
				this.selectedNum = this.currentMenuAmount -1 ;
			this.updateDom();
		}else if (notification === 'MAIN_MENU_DOWN'){
			this.selectedNum = this.selectedNum +1;
			if(this.selectedNum == this.currentMenuAmount)
				this.selectedNum = 0;
			this.updateDom();
		}

	},


});
