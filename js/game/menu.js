function Start(){

	$ = {};

	/////// SET UP SCENE ////////

	Show("background","coffeehouse");
	Show("cup","cup_steam",{x:44,y:359});
	Show("nicky","coffee_nicky_still");

	PlaySound("bg","coffeehouse",{loop:-1, volume:0.7});

	//////////////////////////////

	N("<b>COMING OUT SIMULATOR 2014</b>");
	N("Un quasi-jeu de semi-vérités.");
	N("Salut, joueur. Bienvenue dans mon jeu, je suppose.");

	// TODO remove this when translation is done
	TranslationWarning();

	N("Qu'est-ce qu'on fait maintenant?");

	Choose({
		"On joue!": Play,
		"Euh, qui êtes-vous? (Générique)": function(){
			Credits("Euh, qui êtes-vous?");
		},
		"C'est quoi ce jeu? (À propos)": function(){
			About("C'est quoi ce jeu?");
		}
	});

}

function TranslationWarning () {
	N("Avant de commencer, je dois t'avertir...");
	N("Cette version du jeu est en cours de traduction.");
	N("Il vaudrait mieux attendre qu'elle soit terminée.");
	p(". . .");
	N(". . .")
	Wait(1000);
	SipCoffee(". . .");
	Wait(500);
	N(".  . .");
	p("...alors, ça vient?");
	N("Oh, aucune idée. C'est quelqu'un d'autre qui fait la traduction.")
	SipCoffee("Et il se dépêche?");
	t("<span style=\"font-family: monospace;\">Je suis aux études. Aucune idée de quand je vais avoir fini.</span>");
	t("<span style=\"font-family: monospace;\">Donc, pour l'instant, seul le menu est traduit.</span>");
	t("<span style=\"font-family: monospace;\">Le reste du jeu est encore en anglais.</span>");
	Wait(500);
	N("...that was weird.");
}

function SipCoffee(message){
	Show("nicky","coffee_nicky_drink");
	Show("cup",null);
	PlaySound("sfx","coffee_sip");
	p(message);
	Show("nicky","coffee_nicky_still");
	Show("cup","cup_steam");
}

function Play(message){

	SipCoffee(message);

	// Asked neither
	if(!$.asked_about && !$.asked_credits){
		N("Ah, t'es pressé de commencer! Parfait!");
		N("Pas envie de lire le générique ou la section À propos ou--");
		p("Chut.");
		N("Ok, j'ai compris.");
	}
	// Asked both
	if($.asked_about && $.asked_credits){
		p(". . .");
		p("Pourquoi me faire cliquer alors que c'était la seule option restante?");
		N("AUCUNE IDÉE");
	// Asked either
	}else if($.asked_about || $.asked_credits){
		N("Oui, commençons!");
	}

	N("Remontons de quatre ans, autour de 2010...");
	p("Euh, QUATRE ans tu dis?");
	N("...à la soirée qui a changé ma vie à jamais.");

	N("Dis-moi, cher joueur, comment crois-tu que ça va finir?");

	Choose({
		"Avec des arcs-en-ciel et des licornes?": function(message){
			$.main_menu_convo_1 = 1;

			p(message);
			N("Oui. C'est exactement comme ça que ça se termine.");
			p("Vraiment?");
			N("Non.");
			Play_2();
		},
		"Avec toi sur reddit dans un Starbucks.": function(message){
			$.main_menu_convo_1 = 2;

			p(message);
			N("Hé, je programme sur cet ordinateur. Je suis en train de transformer mon histoire enrichissante en le jeu auquel tu joues.");
			p("Nah, t'es probablement en train de procrastiner.");
			N("T'es qui pour me dire ça?");
			p("Touché.");
			N("Quoi qu'il en soit...");
			Play_2();
		},
		"DANS LE SANG ET LA VIOLENCE": function(message){
			$.main_menu_convo_1 = 3;

			p(message);
			N("Euh, comparé à ça, mon histoire n'es pas si tragique.");
			N("Mais c'est une façon imagée de voir les choses.");
			p("du saaaaaaaaang.");
			N("Quoi qu'il en soit...");
			Play_2();
		}
	});

}

function Play_2(){

	if(!$.asked_about){
		N("Si tu n'avais pas sauté la section À propos, tu saurais que c'est une histoire très personnelle.");
		p("Chut.");
	}

	N("Ce jeu inclue des conversations que j'ai eu avec mes parents et mon ex.");
	N("Ainsi que les choses qu'on aurait pu, aurait dû, et n'aurait jamais voulu dire.");
	N("La vérité n'a pas vraiment d'importance.");
	N("Plus maintenant.");

	var temp = {};

	temp["Comment gagner à un jeu sans bonne réponse?"] = function (message) {
		$.main_menu_convo_2 = 2;

		p(message);
		N("Exactement.");
		p(". . .");
		Play_3();
	};

	temp[($.asked_credits ? "T'es" : "Vous êtes") + " un peu négatif, pas vrai?"] = function (message) {
		$.main_menu_convo_2 = 1;

		p(message);
		N("LA VIE est un peu négative.");
		p("Je vais prendre ça pour un oui.");
		Play_3();
	};

	temp["Ce 'vrai' jeu est plein de mensonges?"] = function (message) {
		$.main_menu_convo_2 = 3;

		p(message);
		N("Même si je citais les dialogues 100% à la lettre près, ça serait 100% des mensonges.");
		p(". . .");
		Play_3();
	};

	Choose(temp);
}

function Play_3(){

	N("Tu vas jouer en tant que moi, autour de 2010.");
	if(!$.asked_credits){
		N("Puisque tu as sauté le générique, mon nom (pas-encore-légal) est Nicky Case. Juste pour que tu le saches.");
		p("Vous en avez pour longtemps?");
		N("C'est bon, j'y arrive. Et tu peux me tutoyer.")
		p(". . .")
	}

	var whatISay;
	switch($.main_menu_convo_1){
		case 1: whatISay = "Ce jeu ne se termine pas avec des licornes gaies. "; break;
		case 2: whatISay = "Ce jeu est un coming-out, un pas en avant, une forme d'acceptation. "; break;
		case 3: whatISay = "Ce jeu ne se termine pas en sang, mais en larme. "; break;
	}
	switch($.main_menu_convo_2){
		case 1: whatISay += "Désolé d'être un peu pessimiste."; break;
		case 2: whatISay += "Et il n'y a pas de bonne réponse."; break;
		case 3: whatISay += "Et il est plein de mensonges."; break;
	}
	N(whatISay);

	PlaySound("sfx","coffee_sip");
	Show("nicky","coffee_nicky_drink");
	Show("cup",null);

	p("Hé, je viens de dire ça!");

	// HACK - Just clear dialogue & stuff.
	Wait(1000);
	queue(ClearDialogue,0);

	Wait(500);
	Show("nicky","coffee_nicky_throw");
	PlaySound("sfx","coffee_throw");

	Wait(1000);
	Show("nicky","coffee_nicky_still_2");
	Wait(500);

	N("En jouant...");
	N("Choisis bien tes mots.");
	N("Chaque personnage se souviendra de ce que tu dis. Ou ne dis pas.");
	p("Ouin. T'as même mentionné mes choix dans ce MENU.");
	N("Exactement.");

	N(". . .");
	N("Certaines choses sont difficiles à oublier.");

	Clear();
	Start_Jack_1();

}

function Credits(message){

	$.asked_credits = true;

	if($.asked_about){
		SipCoffee(message);
	}else{
		SipCoffee("Qui êtes-vous?");
	}

	N("Ah, désolé! Laisse-moi me présenter.");
	N("Bonjour, je suis Nicky Case.");
	N("Ce n'est pas mon nom légal, c'est juste mon VRAI nom.");

	p("...c'est pas faux.");
	if($.asked_about){
		p("Et comme vous avez dit, c'est votre histoire à vous?");
	}else{
		p("Et c'est vous qui avez fait ce jeu?");
	}

	N("Tu peux me tutoyer.");
	SipCoffee("Ah, comme tu veux.");
	N("Mais oui, je suis l'unique auteur / programmeur / artiste de Coming Out Simulator 2014.");

	Wait(500);

	if($.asked_about){
		p("Tout ça par toi-même?");
		p("Je l'ai dit et je vais le redire...");
		p("Bien sûr. Narcissique.");
		N("Bon, ce n'est pas SEULEMENT de moi.");
		N("Les sons proviennent du domaine publique.");
	}else{
		N("Par contre, les sons proviennent du domaine publique.");
	}

	N("Et la traduction en français d'un inconnu sur GitHub.");
	p("Tu parles pas français?");
	N("What did you say?");
	p("Haha.");

	N("Blagues à part, même si je suis seul derrière ce jeu...");
	N("...il y a beaucoup de personnes derrière son histoire.");

	if($.asked_about){
		Choose({
			"Puisqu'on en parle, commençons! Maintenant!": Play
		});
	}else{
		Choose({
			"Puisqu'on en parle, on peut commencer?": Play,
			"Et pourquoi as-tu fait ce jeu? (À propos)": function(){
				About("Et pourquoi as-tu fait ce jeu?");
			}
		});
	}

}

function About(message){

	$.asked_about = true;

	SipCoffee(message);

	if($.asked_credits){
		N("Je voulais raconter mon histoire.");
	}else{
		N("Ce jeu...");
		N("...ou ce simulateur de conversation, en fait...");
		N("...est une histoire très personnelle.");
	}

	p("Bien sûr. Narcissique.");
	N("Ha, c'est ça.");

	if($.asked_credits){
		p("En fait non, un narcissique utiliserais son vrai nom.");
		N("Je te l'ai dit, c'est mon VRAI--");
		p("Okay, okay. Weirdo.");
	}

	N("J'ai fait ce jeu pour le #Nar8 Game Jam. Ça m'a donné une excuse. Et une date limite!");
	p("T'as attendu au dernier jour pour commencer, pas vrai?");
	N("Oui.");
	N("Aussi! Ce jeu est libre de droits. Laissé au domaine publique.");
	N("Je suis autant ouvert avec mon code source qu'avec ma sexualité.");

	p("Beurk, quel mauvais jeu de mot.");
	N("Je peux en coder un avec plus de classes.");
	p("noooooon.");

	if($.asked_credits){
		Choose({
			"Commençons à jouer avant d'y passer la nuit.": Play
		});
	}else{
		Choose({
			"Blagues à part, on peut jouer maintenant?": Play,
			"Qui êtes-vous? (Générique)": function(){
				Credits("Qui êtes-vous?");
			}
		});
	}

}
