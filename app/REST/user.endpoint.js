import business from '../business/business.container';
import applicationException from '../service/applicationException';
import resultDAO from "../DAO/resultDAO";

const questionDAO = require('../DAO/questionDAO');
const CategoryDAO = require('../DAO/categoryDAO');
const ResultDAO = require('../DAO/resultDAO');

const userEndpoint = (router) => {
    router.post('/api/user/auth', async (request, response) => {
        try {
            console.log("przeszlo 1")
            let result = await business.getUserManager(request).authenticate(request.body.email, request.body.password);
            console.log("email " + request.body.email)
            console.log("password " + request.body.password)
            response.status(200).send(result);
            console.log("przeszlo last")
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    router.post('/api/user/create', async (request, response, next) => {
        try {
            console.log('test')
            const result = await business.getUserManager(request).createNewOrUpdate(request.body);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });
    router.post('/api/result/create', async (req, res) => {
        const newResultDAO = new ResultDAO({
            name: req.body.name,
            category: req.body.category,
            score: req.body.score,
        });

        newResultDAO.save((error) => {
            if (error) {
                res.status(500).json({msg: 'Sorry, internal server errors'});
                return;
            }
            return res.json({
                msg: 'Your data has been saved!'
            });
        });
    });


    router.delete('/api/user/logout/:userId',  async (request, response, next) => {
        try {
            let result = await business.getUserManager(request).removeHashSession(request.body.userId);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    router.get('/api/category', (req, res) => {
        setTimeout(function () {
            CategoryDAO.find({})
                .then((data) => {
                    res.json(data);
                })
                .catch((error) => {
                    console.log('error: ', error);
                });
        }, 1000);
    });
    router.get('/api/quiz', (req, res) => {
        questionDAO.find({})
            .then((data) => {
                res.json(data);
            })
            .catch((error) => {
                console.log('error: ', error);
            });
    });
    router.get('/api/result', (req, res) => {
        ResultDAO.find({})
            .then((data) => {
                res.json(data);
            })
            .catch((error) => {
                console.log('error: ', error);
            });
    });

};

export default userEndpoint;
