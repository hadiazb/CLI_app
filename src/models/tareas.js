const { Tarea } = require('./tarea');

class Tareas {
	_listado = {};
	constructor() {
		this._listado = {};
	}

	get listadoArr() {
		const listado = [];
		Object.keys(this._listado).forEach((key) => {
			const tarea = this._listado[key];
			listado.push(tarea);
		});
		return listado;
	}

	borrarTarea(id = '') {
		if (this._listado[id]) {
			delete this._listado[id];
		}
	}

	crearTarea(desc = '') {
		const tarea = new Tarea(desc);
		this._listado[tarea.id] = tarea;
	}

	cargarTareasFromArray(tareas = []) {
		tareas.forEach((tarea) => {
			this._listado[tarea.id] = tarea;
		});
	}

	listadoCompleto() {
		console.log();
		this.listadoArr.forEach((tarea, index) => {
			console.log(
				`${(index + 1).toString().green} ${tarea.desc} :: ${
					tarea.completadoEn === null ? 'Pendiente'.red : 'Completada'.green
				}`
			);
		});
	}

	listarPendientesCompletadas(completadas = true) {
		console.log();
		if (completadas) {
			this.listadoArr
				.filter((tarea) => tarea.completadoEn !== null)
				.forEach((tarea, index) => {
					console.log(
						`${(index + 1 + '.').toString().green} ${tarea.desc} :: ${
							tarea.completadoEn.green
						}`
					);
				});
		} else {
			this.listadoArr
				.filter((tarea) => tarea.completadoEn === null)
				.forEach((tarea, index) => {
					console.log(
						`${(index + 1).toString().green} ${tarea.desc} :: ${
							'Pendientes'.red
						}`
					);
				});
		}
	}

	toggleCompletadas(ids = []) {
		ids.forEach((id) => {
			const tarea = this._listado[id];
			if (!tarea.completadoEn) {
				tarea.completadoEn = new Date().toISOString();
			}
		});

		this.listadoArr.forEach((tarea) => {
			if (!ids.includes(tarea.id)) {
				this._listado[tarea.id].completadoEn = null;
			}
		});
	}
}

module.exports = Tareas;
