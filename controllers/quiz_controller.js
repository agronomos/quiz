﻿var models = require('../models/models.js');

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
	models.Quiz.findAll().then(
		function(quizes) {
			res.render('quizes/index', {quizes: quizes});
		}
	).catch(function(error) {next(error);});
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
}
