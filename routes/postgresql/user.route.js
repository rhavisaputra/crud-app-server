const express = require('express');
const router = express.Router();

// Model
const User = require('../../models/postgresql/user.model');

router.get('/user', (req, res) => {
	res.send('This is Postgresql User route');
})

router.get('/user/all', async (req, res) => {
	try {
		const user = await User.findAll({
			order: [
				['createdAt','DESC']
			]
		});
		res.send(user);
	} catch(error) {
		res.send(error);
	}
})

router.get('/user/:id', async (req, res) => {
	try {
		var user = await User.findOne({
			where: {
				userId: req.params.id
			}
		});
		res.send(user);
	} catch(error) {
		res.send(error);
	}
})

router.post('/user', async (req, res) => {
	try {
		const user = new User(req.body);
		await user.save();
		res.status(201);
		res.send(user);
	} catch(error) {
		res.send(error);
	}
})

router.put('/user/:id', async (req, res) => {
	try {
		const { name, email, role } = req.body;
		const user = await User.update({
			name,
			email,
			role
		}, {
			where: {
				userId: req.params.id
			}
		});
		res.send("Updated");
	} catch(error) {
		res.send(error);
	}
})

router.delete('/user/:id', async (req, res) => {
	try {
		var user = await User.destroy({
			where: {
				userId: req.params.id
			}
		});
		res.send("Deleted");
	} catch(error) {
		res.send(error);
	}
})

module.exports = router;