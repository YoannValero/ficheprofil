let tableauFront = document.getElementById('frontTable');
let tableauBack = document.getElementById('backTable');

		function add(type, content, target) {
			let variable = document.createElement(type)
			variable.textContent = content
			target.appendChild(variable)
			return variable
		}
		
		// Composant Accès aux données , Utilisation de Stapi pour BDD
		fetch("http://localhost:1337/ficheprofils").then((resp) => {
		resp.json().then((data) => {
			data.forEach((d) => {
				// console.log(data);

				d.compmetier.forEach((e) => {
					let compMetierValues = Object.values(e)            // Récupération des values de la liste objet des compétences métiers
					let totoEntries = Object.entries(compMetierValues) // Création d'un Tableau de tableaux pour chaque compétences métiers
					let compMetiers = data[0].compmetier[0]
					let compMetiersNameInArray = Object.keys(compMetiers)
					let transformation2 = compMetiersNameInArray.map((e) => {
						return e.charAt(0).toUpperCase() + e.substr(1).split('_').join(' ').split('8').join('é').replace('7', "'").replace('9', 'è')
					})

					//Front Entêtes (Comprendre, analyser ...)
					let trForThFront = add('tr', '', tableauFront)     // Tr qui contient les entêtes th (Comprendre, Analyser...) to Array Front
					add('td', '', trForThFront)       				   // td avant les entête pour décaler d'un colonne to Array Front
					// tableauFront.appendChild(tBodyFront)
					//Back Entêtes (Comprendre, analyser ....)
					let trForThBack = add('tr', '', tableauBack)       // Tr qui contient les entêtes th (Comprendre, Analyser) to Array Back
					add('td', '', trForThBack)    					   // td avant entête Array back pour décaler d'une colonne

					let level = Object.keys(compMetiers.r8aliser_une_interface_utilisateur_web_statique_et_adaptable); // [Array => Comprendre.analyser,duppliquer...]


					for (let i = 0; i < level.length; i++) {
						if (level[i] !== 'id') { // Exclude Id
							let thFront = add('th', level[i], trForThFront) // contient string Comprendre, Duppliquer....
							let thBack = add('th', level[i], trForThBack)   // contient string Comprendre, Duppliquer....

							thFront.className = 'colth';
							thBack.className = 'colth';

							thFront.setAttribute('scope', 'col')
							thBack.setAttribute('scope', 'col')

							tableauFront.appendChild(trForThFront)
							tableauBack.appendChild(trForThBack)
						}
					}
					// Mise en place Table Front End
					for (let i = 1; i <= 4; i++) {                     // Boucle indice Front End de 0 à 4 
						var trFront = document.createElement('tr')
						var thFrontEachLine = add('th', transformation2[i], trFront) // Contient compétences Métiers Front End Libellés
						thFrontEachLine.className = 'comp'
						thFrontEachLine.setAttribute('scope', 'row')

						tableauFront.appendChild(trFront)

						// Compétences Front End    
						let compFrontEnd = Object.values(totoEntries[i][1])
						for (let j = 1; j < compFrontEnd.length; j++) {
							
							let tdOfValueFront = document.createElement('td')
							let spanLibelleFront = add('span', level[j], tdOfValueFront)
							spanLibelleFront.className = 'resp'

							let progressInTd = add('progress', '', tdOfValueFront)
							progressInTd.setAttribute('max', 3)
							progressInTd.setAttribute('value', compFrontEnd[j])  // Value de comprendre,analsyer... front end 

							trFront.appendChild(tdOfValueFront)
						}
					}
					// Mise en place table Back End
					for (let i = 5; i <= 9; i++) {                     // Boucle indice Back End de 5 a 9
						let compBackEndd = Object.values(totoEntries[i][1])
						// console.log(transformation);
						
						var trBack = add('tr', '', tableauBack)        // Create Line for each compBack
						var thBackeachLine = add('th', transformation2[i], trBack) // Contient compétences Métiers Back End Libellés
						thBackeachLine.className = 'comp'
						// console.log(transformation);
						// thBackeachLine.setAttribute('scope', 'row')
						for (let j = 1; j < compBackEndd.length; j++) {
							let tdOfValueBack = document.createElement('td')

							let spanLibelleBack = add('span', level[j], tdOfValueBack)
							let progressInTdBack = add('progress', '', tdOfValueBack)
							spanLibelleBack.className = 'resp'
							progressInTdBack.setAttribute('max', 3)
							progressInTdBack.setAttribute('value', compBackEndd[j])

							trBack.appendChild(tdOfValueBack)
						}
					}
				})
			})
		})
	})