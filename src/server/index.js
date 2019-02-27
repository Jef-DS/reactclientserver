const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const root = path.join(__dirname, '../../');
const router = express.Router();
const cursussen = [{id:1, naam:'React'}, {id: 2, naam:'Angular'}]
const deelnemers = [];
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', express.static(path.join(root, 'src/client/opleiding/build')));
router.use(function(req, res, next) {
    // do logging
    console.log('Request', req);
    next(); // make sure we go to the next routes and don't stop here
});
router.route('/cursussen').get((req, resp) =>{
    resp.json(cursussen);
});
router.route('/cursussen').post((req, resp) =>{
    let cursus = {id: cursussen.length, naam: req.body.naam};
    cursussen.push(cursus);
    resp.json(cursus);
});
router.route('/cursussen/:cursusid').get((req, resp) => {
    const cursus = cursussen.find( c => c.id == req.params.cursusid);
    resp.json(cursus);
})
app.use('/api', router);

app.get('/', (req, resp) => {
    resp.sendFile(path.join(root, 'src/client/opleiding/build/index.html'));
})

app.listen(8000, () => console.log('Ik luister op poort 8000'));