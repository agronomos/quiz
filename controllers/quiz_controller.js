var models = require('../models/models.js');

//AutoLoad - Factoriza el codigo  si la ruta incluye quizId
exports.load = function(req, res, next, quizId) {
	
	models.Quiz.findById(quizId).then(
		
		function(quiz){
			
			if (quiz) {
				
				req.quiz = quiz;
				next();
				
			} else {
				
				next(new Error('No Existe quizId = ' + quizId));
				
			}
			
		}
		
	).catch(function (error) { next(error);});
	
};

exports.index = function(req, res) {
	
	//Se ha solicitado una busqueda
	if (req.query.search) {
		
		var patron = '%' + req.query.search.replace(/ /g,'%') + '%';
		models.Quiz.count( {where: ["pregunta LIKE ?", patron ] }).then(
			
			function(count) {
				
				if (count > 0) {
					
					models.Quiz.findAll( {where: ["pregunta LIKE ? order by pregunta asc", patron ] }).then(
					
						function(quizes) {
							
							res.render('quizes/index', {texto: 'Resultado ordenado de la búsqueda:', quizes: quizes});
						
						}
						
					).catch(function(error) {next(error);});
					
				}else {
					
					res.render('quizes/index', {texto: 'No se encontró el patrón.', quizes: null});
				
				}
			
			}
		
		).catch(function(error) {next(error);});
		
	}
	else {
		
		models.Quiz.findAll().then(
		
			function(quizes) {
				
				res.render('quizes/index', {texto: 'Lista de preguntas disponibles:', quizes: quizes});
				
			}
			
		).catch(function(error) {next(error);});
		
	}
	
};

exports.show = function(req, res) {
	
	res.render('quizes/show', { quiz: req.quiz});

};

exports.answer =  function(req, res) {
	
	var resultado = 'Incorrecto';
	
	if (req.query.respuesta === req.quiz.respuesta) {
		
		resultado = 'Correcto';
		
	}
	
	res.render('quizes/answer', { quiz: req.quiz, respuesta: resultado});	
};

exports.author = function(req, res) {
	
	res.render('author');
	
};

