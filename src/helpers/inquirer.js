const inquirer = require('inquirer');

require('colors');

const preguntas = [
	{
		type: 'list',
		name: 'options',
		message: '¿Qué desea hacer?',
		choices: [
			{
				value: '1',
				name: `${'1.'.green} Crear tarea`,
			},
			{
				value: '2',
				name: `${'2.'.green} Listar Tareas`,
			},
			{
				value: '3',
				name: `${'3.'.green} Listar Tareas completadas`,
			},
			{
				value: '4',
				name: `${'4.'.green} Listar Tareas pendientes`,
			},
			{
				value: '5',
				name: `${'5.'.green} Completar Tarea(s)`,
			},
			{
				value: '6',
				name: `${'6.'.green} Borrar Tareas`,
			},
			{
				value: '0',
				name: `${'0.'.green} Salir`,
			},
		],
	},
];

const inquirerMenu = async () => {
	console.clear();
	console.log('========================='.green);
	console.log('  Seleccione una opción  '.green);
	console.log('=========================\n'.green);

	const { options } = await inquirer.prompt(preguntas);

	return options;
};

const pausa = async (opt) => {
	const pregunta = [
		{
			type: 'list',
			name: 'options',
			message: `Presione ${'ENTER'.green} para continuar`,
			choices: [`${opt}`],
		},
	];

	console.log('\n');
	await inquirer.prompt(pregunta);
};

const leerInput = async (message) => {
	const question = [
		{
			type: 'input',
			name: 'desc',
			message,
			validate(value) {
				if (value.name === 0) {
					return 'Por favor ingrese un valor';
				}
				return true;
			},
		},
	];

	const { desc } = await inquirer.prompt(question);

	return desc;
};

const listadoTareasBorrar = async (tareas = []) => {
	const choices = tareas.map((tarea, i) => {
		const idx = `${i + 1}.`.green;
		return {
			value: tarea.id,
			name: `${idx} ${tarea.desc}`,
		};
	});
	choices.unshift({
		value: '0',
		name: '0.'.green + ' Cancelar',
	});
	const preguntas = [
		{
			type: 'list',
			name: 'id',
			message: 'Borrar',
			choices,
		},
	];
	const { id } = await inquirer.prompt(preguntas);
	return id;
};

const confirmar = async (message) => {
	const question = [
		{
			type: 'confirm',
			name: 'ok',
			message,
		},
	];

	const { ok } = await inquirer.prompt(question);
	return ok;
};

const mostrarListadoChecklist = async (tareas = []) => {
	const choices = tareas.map((tarea, i) => {
		const idx = `${i + 1}.`.green;
		return {
			value: tarea.id,
			name: `${idx} ${tarea.desc}`,
			checked: tarea.completadoEn ? true : false,
		};
	});

	const preguntas = [
		{
			type: 'checkbox',
			name: 'ids',
			message: 'Selecciones',
			choices,
		},
	];
	const { ids } = await inquirer.prompt(preguntas);
	return ids;
};

module.exports = {
	inquirerMenu,
	pausa,
	leerInput,
	listadoTareasBorrar,
	confirmar,
	mostrarListadoChecklist,
};
