const grid = new Muuri('.grid', {
	layout: {
    rounding: false
  }
});

//agregar los listener de los enlaces para filtar por categoria
window.addEventListener('load', ()=>{
	grid.refreshItems().layout();
	document.getElementById('grid').classList.add('img-cargadas');
	const enlaces = document.querySelectorAll('#categorias a');
	enlaces.forEach((elemento) =>{
		elemento.addEventListener('click', (evento) =>{
			evento.preventDefault();
			enlaces.forEach((enlace) => enlace.classList.remove('activo'));
			evento.target.classList.add('activo');

			const categoria = evento.target.innerHTML;
			categoria === 'Todos' ? grid.filter('[data-categoria]'):
			grid.filter(`[data-categoria="${categoria}"]`);
		});
	});


	//agragar el listener para la barra de busqueda
	document.querySelector('#barra-busqueda').addEventListener('input', (evento)=>{
		const busqueda=evento.target.value;
		grid.filter( (item) => item.getElement().dataset.etiqueta.includes(busqueda) );
	});


	//agragando un listener para la imagnes
	const overlay = document.getElementById('overlay');
	document.querySelectorAll('.grid .item img').forEach((elemento)=>{
		const ruta = elemento.getAttribute('src');
		const descripcion = elemento.parentNode.parentNode.dataset.descripcion;

		elemento.addEventListener('click', ()=>{
			overlay.classList.add('activo');
			document.querySelector('#overlay img').src=ruta;
			document.querySelector('#overlay .descripcion').innerHTML=descripcion;
		});

	});

	//eventListener del Boton de cerrar
	document.querySelector('#btn-cerrar-popup').addEventListener('click', ()=>{
		overlay.classList.remove('activo');
	});

	//eventlistener del overlay 
	overlay.addEventListener('click', (evento)=>{
		if(evento.target.id === 'overlay'){
			overlay.classList.remove('activo');
		}
	});
});
