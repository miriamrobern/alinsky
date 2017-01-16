var handlers = {

	sidebarPaneExpand: function(pane) {
		var mapPane = document.getElementById('mapPane');
		var mapBarContents = document.getElementById('mapBarContents');
		var calPane = document.getElementById('calPane');
		var calBarContents = document.getElementById('calBarContents');
		var contactPane = document.getElementById('contactPane');
		var contactBarContents = document.getElementById('contactBarContents');
		var actionPane = document.getElementById('actionPane');
		var actionBarContents = document.getElementById('actionBarContents');
		
			mapPane.style.display = 'none';
			mapBarContents.style.display = 'none';
			calPane.style.display = 'none';
			calBarContents.style.display = 'none';
			contactPane.style.display = 'none';
			contactBarContents.style.display = 'none';
			actionPane.style.display = 'none';
			actionBarContents.style.display = 'none';


		if (pane == "map") {
			mapPane.style.display = 'block';
			mapBarContents.style.display = 'block';
			}
		
		else if (pane == "cal") {
			calPane.style.display = 'block';
			calBarContents.style.display = 'block';
			}
		
		else if (pane == "contact") {
			view.refreshContacts();
			contactPane.style.display = 'block';
			contactBarContents.style.display = 'block';
			}

		else if (pane == "action") {
			actionPane.style.display = 'block';
			actionBarContents.style.display = 'block';
			}
			
	},
	
	actionPaneExpand: function(pane) {
		var actionOperations = document.getElementById('actionOperations');
		var actionConnect = document.getElementById('actionConnect');
		var actionMassCommunication = document.getElementById('actionMassCommunication');
		var actionEventPlanning = document.getElementById('actionEventPlanning');
		var actionDelegate = document.getElementById('actionDelegate');
		var actionSelfCare = document.getElementById('actionSelfCare');
		
		var actionTitle = document.getElementById('actionTitle');
		
		actionOperations.style.display = 'none';
		actionConnect.style.display = 'none';
		actionMassCommunication.style.display = 'none';
		actionEventPlanning.style.display = 'none';
		actionDelegate.style.display = 'none';
		actionSelfCare.style.display = 'none';
		
		if (pane == "actionOperations") {actionTitle.innerHTML = "Review "+institutions[0].name+" Operations";actionOperations.style.display = 'block'};
		if (pane == "actionConnect") {actionTitle.innerHTML = "One-on-Ones";actionConnect.style.display = 'block'};
		if (pane == "actionMassCommunication") {actionTitle.innerHTML = "Mass Communication";actionMassCommunication.style.display = 'block'};
		if (pane == "actionEventPlanning") {actionTitle.innerHTML = "Event Planning";actionEventPlanning.style.display = 'block'};
		if (pane == "actionDelegate") {actionTitle.innerHTML = "Delegate";actionDelegate.style.display = 'block'};
		if (pane == "actionSelfCare") {actionTitle.innerHTML = "Self Care";actionSelfCare.style.display = 'block'};
			
	},
	
	displayContact: function(index) {
		var contact = people[index];
		view.displayContact(contact);
	},
	
	displayNeighborhood: function(index) {
		var neighborhood = neighborhoods[index];
		view.displayNeighborhood(neighborhood);
	},
	
	displayInstitution: function(index) {
		var institution = view.focus.neighborhood.institutions[index];
		view.displayInstitution(institution);
	},
	
	displayDate: function(date) {
		view.displayDate(date);
		handlers.sidebarPaneExpand("cal");
	},
	
	jumpToInstitution: function(index) {
		var institution = view.focus.contact.connections[index][0];
		view.displayNeighborhood(institution.neighborhood);
		view.displayInstitution(institution);
		handlers.sidebarPaneExpand("map");
	},
	
	jumpToPerson: function(index) {
		var contact = people[index];
		view.displayContact(contact);
		handlers.sidebarPaneExpand("contact");
	},
	
	jumpToClient: function(index) {
		var contact = view.focus.institution.clients[index][0];
		view.displayContact(contact);
		handlers.sidebarPaneExpand("contact");
	},
	
	jumpToEmployee: function(index) {
		var contact = view.focus.institution.employees.all[index];
		view.displayContact(contact);
		handlers.sidebarPaneExpand("contact");
	},

	newPerson: function() {
		var newGuy = new Person();
		newGuy.growUp();
		newGuy.findHousing();
		newGuy.findJob();
		if (newGuy.resources.devotion > 1) {newGuy.findChurch()};
		view.refreshContacts();
		handlers.jumpToPerson(people.length-1);
	},

	newNeighborhood: function() {
		var newNeighborhood = new Neighborhood();
		view.focus.neighborhood = newNeighborhood;
		view.refreshMap();
		view.displayNeighborhood(newNeighborhood);
	},

	newInstitution: function() {
		var newInstitution = new Institution(view.focus.neighborhood);
		view.refreshMap();
		view.displayNeighborhood(view.focus.neighborhood);
		view.displayInstitution(newInstitution);
	},
	
	newClient: function() {
		view.focus.institution.newClient();
		view.displayInstitution(view.focus.institution);
	},
	
	newEmployee: function(level) {
		view.focus.institution.newEmployee(level);
		view.displayInstitution(view.focus.institution);
	},
	
	renameOrganization: function() {
		var newName = document.getElementById('organizationRenameField').value;
		institutions[0].rename(newName);
		view.refreshActions();
		view.displayNeighborhood(institutions[0].neighborhood);
		view.displayInstitution(institutions[0]);
	},
	
	connectNeighbor: function(index,manaCost) {
		var institution = people[0].connections[index][0];
		var contact = institution.newClient();
		people[0].currencies.mana -= manaCost;
		view.refreshHeader();
		view.refreshActions();
		view.displayContact(contact);
		handlers.sidebarPaneExpand("contact");
	},
	
	connectCoworker: function(index,manaCost) {
		var institution = people[0].connections[index][0];
		var contact = institution.newEmployee();
		people[0].currencies.mana -= manaCost;
		view.refreshHeader();
		view.refreshActions();
		view.displayContact(contact);
		handlers.sidebarPaneExpand("contact");
	},
	
	connectCongregant: function(index,manaCost) {
		var institution = people[0].connections[index][0];
		var contact = institution.newClient();
		people[0].currencies.mana -= manaCost;
		view.refreshHeader();
		view.refreshActions();
		view.displayContact(contact);
		handlers.sidebarPaneExpand("contact");
	},
	
	newList: function() {
		institutions[0].newList();
		view.refreshActions();
	},
	
	renameList: function(list) {
		var newName = document.getElementById('communicationListRenameField'+list).value;
		institutions[0].renameList(list,newName);
		view.refreshActions();
	},
	
	addToList: function(list) {
		var subscriber = document.getElementById('communicationAddToList'+list).value;
		institutions[0].addToList(list,subscriber);
		view.refreshActions();
	},
	
	removeFromList: function(list,subscriber) {
		institutions[0].removeFromList(list,subscriber);
		view.refreshActions();
	},
	
	selfCare: function() {
		var cost = document.getElementById('selfCareCost').innerHTML;
		people[0].selfCare(cost);
		view.refreshActions();
	},
	
	sleep: function() {
		var wake = document.getElementById('sleepUntil').innerHTML;
		var timeOfDay = wake.slice(-2);
		wake = parseInt(wake.substring(0,wake.length-2));
		if (timeOfDay === "pm") {wake += 12}
		people[0].sleep(wake);
		view.refreshActions();
	},
}