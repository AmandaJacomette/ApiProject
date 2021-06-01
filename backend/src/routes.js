const { Router } = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const SessionController = require('./controllers/SessionController');
const HouseController = require('./controllers/HouseController');
const DashboardController = require('./controllers/DashboardController');
const ReservaController = require('./controllers/ReservaController');

const routes = new Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);

routes.post('/houses', upload.single('thumbnail'), HouseController.store);
routes.get('/houses', HouseController.index);
routes.put('/houses/:house_id', upload.single('thumbnail'), HouseController.update);
routes.delete('/houses', HouseController.destroy);

routes.get('/dashboard', DashboardController.show);

routes.post('/houses/:house_id/reserva', ReservaController.store);
routes.get('/reserva', ReservaController.index);
routes.delete('/reserva/cancel', ReservaController.destroy);


module.exports = routes;