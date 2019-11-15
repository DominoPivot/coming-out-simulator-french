// PLOT BEATS:
// 1) In medias res talking about Inception
// 2) Thanks for movie, we still up to stay over tomorrow night?
// 3) You need to stop hiding... // Can't even CALL.
// Weave in previous bits of convo pieces.
// Also, FULL CIRCLE with the Inception!
// OKAY, TOO CONVOLUTED, CUT OUT THE DIFFERENT FAMILIES & TYPO parts.

function Start_Jack_1(){

	/////// SET UP SCENE ////////

	Show("background","bedroom");
	Show("us","bedroom_us_1");
	Show("light","bedroom_light_1",{x:0,y:159});

	PlaySound("bg","bedroom_1",{loop:-1});

	/////////////////////////////

	j("Et quand il annonce simplement,");
	j("«&nbsp;C'est la compagnie que j'ai achetée. C'était plus commode, non?&nbsp;»");
	j("C'était juste parfait.");
	n("Ah, c'est ça qu'il a dit?");
	n("J'ai mal entendu et je voyais pas pourquoi tout le monde riait.");
	j("Tu as besoin soit de sous-titres, soit de te laver les oreilles.");
	j("Sinon comment tu interprètes la fin?");

	Choose({
		"C'était totallement un rêve.": Inception_Dream,
		"Il est de retour dans le vrai monde!": Inception_Awake,
		"Ça n'a plus d'importance. Cobbs a lâché prise.": Inception_Neither
	});

}

function Inception_Dream(message){

	$.inception_answer = "dream";

	n(message);
	j("Et sa quête de rédemption n'était qu'un mensonge?");
	n("Un gros mensonge sale.");
	j("Tu serais pas un peu trop pessimiste?");

	Choose({
		"Ouaip, je suis un triste sac de tristesse.": Sadsack,
		"Parfois... mais pas quand je suis avec toi.": function(message){
			$.im_a_poet = true;

			n(message);
			j("Ah Nicky, sacré poète amateur.");
			n("Sors le pain baguette et le vin,");
			n("Parce que c'est la chose la plus <em>cheesy</em> que t'as jamais dite.");
			j("Je ne demande jamais pardon.");
			n("Enfin bref...");
			Thanks();
		},
		"Je suis juste réaliste.": function(message){
			$.hippies = true;

			n(message);
			j("T'as besoin de plus de pensée positive dans ta vie.");
			n("Et toi de lâcher les trucs new age de hippies.");
			n("Enfin bref...");
			Thanks();
		}
	});

}
function Inception_Awake(message){

	$.inception_answer = "awake";
	$.im_a_poet = true;

	n(message);
	n("Sinon, le film entier serait un mensonge.");
	n("Ça sert à quoi de vivre un mensonge?");
	j("Ah Nicky, sacré poète amateur.");
	j("J'en déduis que tu as aimé le film?");

	Choose({
		"Ah oui. Trop.": function(message){
			n(message);
			Thanks();
		},
		"Bof, c'était un peu trop mélangeant.": function(message){
			n(message);
			j("Je pense que c'était ça le but.");
			n("Mission accomplie alors.");
			n("Enfin bref...");
			Thanks();
		},
		"🍆": function(message){
			n(message);
			j("Je vais prendre ça pour un oui.");
			Thanks();
		}
	});

}
function Inception_Neither(message){

	$.inception_answer = "neither";

	n(message);
	j("Oh?");
	n("Il n'a même pas regardé pour voir si la toupie tombait!");
	n("Mensonges, vérités, ou semi-vérités... Cobbs a arrêté de s'en faire.");
	n("Il est enfin heureux et c'est ce qui compte.");
	j("Tu es soit très poétique, ou alors très déprimant.");

	Choose({
		"Je suis un poète accidentel.": function(message){

			$.im_a_poet = true;

			n(message);
			n("Je prends mon café avec une larme de lait.");
			j("Ou un nuage? ;)");
			n("Ah non, j'ai mieux. Je bois mon café noir comme mon âme.");
			n("Enfin bref...");
			Thanks();

		},
		"Nan, je suis juste un triste sac de tristesse.": Sadsack,
		"Ou les deux.":function(message){

			$.hippies = true;
			$.im_a_poet = true;

			n(message);
			n("LA POÉSIE N'EST QUE DOULEUR. L'ART EST LA SOUFFRANCE.");
			j("Je croirais entendre ma mère.");
			n("Tes parents sont <em>tellement</em> des hippies new-age.");
			n("Enfin bref...");
			Thanks();

		}
	});

}

function Sadsack(message){

	$.sadsack = true;

	n(message);
	j("Ah, désolé.");
	j("J'espère que notre soirée au cinéma t'as remonté le moral?");
	n("Absolument!");
	Thanks();

}

function Thanks(){

	n("Merci de m'avoir amené voir Inception!");
	j("Tout le plaisir est pour moi, Nicky.");
	j("Tu devrais parodier Inception dans ton jeu flash bizarre!");
	n("Mmm, peut-être.");
	n("Bon, on se reverra demain soir!");

	j("Quoique...");
	n("J'espère pouvoir convaincre mes parents de me laisser passer la nuit.");

	j("J'aurais préfèré que tu ne dises pas à tes parents qu'on étudiait alors qu'on était au cinéma.");
	n("Je vais leur dire qu'on se prépare pour les examens de-- quoi?");

	j("Tu ne peux pas rester caché comme ça.");
	n("Jack...");

	Choose({
		"Je ne leur dirai jamais.": function(message){
			$.coming_out_readiness="no";
			n(message);
			j("Vraiment, jamais?");
			Hiding();
		},
		"J'aimerais pouvoir leur dire aussi.": function(message){
			$.coming_out_readiness="yes";
			n(message);
			Hiding();
		},
		"Je ne suis pas prêt à leur dire.": function(message){
			$.coming_out_readiness="maybe";
			n(message);
			j("Je peux t'aider à être prêt.");
			Hiding();
		}
	});

}

function Hiding(){

	j("Nicky, te cacher comme ça est en train de te rendre malade.");

	if($.inception_answer=="awake"){
		j("Comme tu disais, pourquoi vivre un mensonge?");
	}
	if($.inception_answer=="dream"){
		j("C'est... comment tu disais? Un gros mensonge sale.");
	}

	if($.sadsack){
		j("Tu disais être un sac de tristesse?");
		j("Je sais que c'est pas une blague. Pas vraiment.");
	}

	n("Jack, t'exagères.");
	j("J'ai fait mon coming-out à mes parents depuis un an.");
	if($.hippies){
		n("Ça c'est PAS une comparaison juste.");
		n("COMME JE DISAIS, tes parents sont des hippies new-age.");
		n("Quand je vais chez vous je sais jamais si la fumée est de l'encens ou du weed.");
		j("Heille! On fume juste du pot un jour sur deux quand même!");
		n("Haha.");
		j("Ce que je veux dire, c'est que mes parents m'ont soutenu.");
	}else{
		j("Et ils ont été un grand soutien!");
	}

	j("T'es au Canada maintenant. Beaucoup de gens ici acceptent le monde LGBT.");
	j("Comment sais-tu que tes parents ne seront pas encourageants?");

	Choose({
		"Les parents asiatiques sont généralement homophobes.": Hiding_2,
		"Je ne sais pas... Je suppose que j'ai jamais essayé...": Hiding_2,
		"La seule chose qu'ils encouragent, c'est les études.": Hiding_2
	});

}

function Hiding_2(message){

	n(message);

	if($.coming_out_readiness=="no"){
		n("Non vraiment, il ne doivent jamais savoir.");
	}

	j("Tu as des problèmes de confiance.");
	j("T'es même en train de me texter...");
	j("...par crainte que tes parents nous écoutent parler.");

	n("Parce qu'ils le feraient!");

	j("Ce mode de communication.");
	j("C'est imprécis, impersonnel, et c'est impossible vraiment connecter.");

	if($.im_a_poet){
		n("Haha. T'es un poète amateur aussi, apparemment.");
	}else{
		n("C'est pas si mal...");
	}

	if($.coming_out_readiness=="yes"){
		j("Tu l'as dis toi même que t'en avais envie.");
		j("Dis-leur.");
	}else{
		j("Nicky.");
	}
	j("Dis-leur à propos de nous. Ce soir.");

	Choose({
		"Ce soir?! T'es malade!": Hiding_3,
		"Soupire... Je vais faire de mon mieux.": Hiding_3,
		"Je vais juste tâter le terrain.": Hiding_3
	});

}

function Hiding_3(message){

	n(message);
	j(". . .");
	n("Je veux pas qu'ils paniquent non plus.");
	n("J'essaie toujours de les convaincre de me laisser passer la nuit chez toi.");
	n("Je vais leur dire que j'étudie encore.");
	j(". . .");
	n("C'est l'heure de manger. Je vais descendre les rejoindre.");

	j("Tu sais, je suis d'accord.");
	n("Hein?");
	j("Avec ce que tu disais à propos du film.");
	switch($.inception_answer){
		case "dream": j("Je pense que Cobbs rêvait encore, vivant dans le mensonge."); break;
		case "awake": j("Je pense que Cobbs a reconnecté avec sa famille, dans le vrai monde."); break;
		case "neither": j("Je pense que ça importe peu, tant que Cobbs est heureux."); break;
	}
	n("Oh.");
	j("Okay.");
	if($.coming_out_readiness=="maybe"){
		j("J'espère que tu as changé d'idée à propos de ne pas être encore prêt.");
	}
	j("Bonne chance. Texte-moi dans une heure.");

	var insult = "";
	if($.im_a_poet) insult+=" poète amateur";
	if($.hippies) insult+=" hippie new-age";
	n("À plus.");
	if(insult!=""){
		n("Espèce de "+insult+".");
	}

	Jack_1_End();

}

function Jack_1_End(){
	Clear();
	Start_Dinner_1();
}
