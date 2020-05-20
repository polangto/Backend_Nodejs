const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const { v4: uuidv4 } = require('uuid');
const md5 = require('crypto-js');

const conn = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'P@ssw0rd',
	database: 'incidents',
});

app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	})
);
const data = [
	{
		id: 12,
		status: null,
		name: 'Classification: Attempted User Privilege Gain',
		hostname: 'elk',
		protocol: 'UDP',
		src_ip: '10.10.125.234',
		src_port: '50030',
		dest_ip: '52.87.201.4',
		dest_port: '3478',
		logtime: '04/29/2020-16:17:50.124631',
		detect_time: '2020-05-13T09:11:15.604Z',
		owner: null,
		phase: null,
		severity: 'low',
	},
	{
		id: 13,
		status: null,
		name: 'Classification: Targeted Malicious Activity was Detected',
		hostname: 'elk',
		protocol: 'TCP',
		src_ip: '10.10.125.234',
		src_port: '56358',
		dest_ip: '91.189.91.38',
		dest_port: '80',
		logtime: '04/29/2020-06:30:45.402458',
		detect_time: '2020-05-12T07:33:35.812Z',
		owner: null,
		phase: null,
		severity: 'low',
	},
	{
		id: 14,
		status: null,
		name: 'Classification: Attempted User Privilege Gain',
		hostname: 'elk',
		protocol: 'UDP',
		src_ip: '10.10.125.234',
		src_port: '50030',
		dest_ip: '52.87.201.4',
		dest_port: '3478',
		logtime: '04/29/2020-16:17:50.124631',
		detect_time: '2020-05-13T09:11:15.604Z',
		owner: null,
		phase: null,
		severity: 'low',
	},
	{
		id: 15,
		status: null,
		name: 'Classification: Targeted Malicious Activity was Detected',
		hostname: 'elk',
		protocol: 'TCP',
		src_ip: '10.10.125.234',
		src_port: '56358',
		dest_ip: '91.189.91.38',
		dest_port: '80',
		logtime: '04/29/2020-06:30:45.402458',
		detect_time: '2020-05-12T07:33:35.812Z',
		owner: null,
		phase: null,
		severity: 'low',
	},
	{
		id: 16,
		status: null,
		name: 'Classification: Attempted User Privilege Gain',
		hostname: 'elk',
		protocol: 'UDP',
		src_ip: '10.10.125.234',
		src_port: '50030',
		dest_ip: '52.87.201.4',
		dest_port: '3478',
		logtime: '04/29/2020-16:17:50.124631',
		detect_time: '2020-05-13T09:11:15.604Z',
		owner: null,
		phase: null,
		severity: 'low',
	},
	{
		id: 17,
		status: null,
		name: 'Classification: Targeted Malicious Activity was Detected',
		hostname: 'elk',
		protocol: 'TCP',
		src_ip: '10.10.125.234',
		src_port: '56358',
		dest_ip: '91.189.91.38',
		dest_port: '80',
		logtime: '04/29/2020-06:30:45.402458',
		detect_time: '2020-05-12T07:33:35.812Z',
		owner: null,
		phase: null,
		severity: 'low',
	},
	{
		id: 18,
		status: null,
		name: 'Classification: Attempted User Privilege Gain',
		hostname: 'elk',
		protocol: 'UDP',
		src_ip: '10.10.125.234',
		src_port: '50030',
		dest_ip: '52.87.201.4',
		dest_port: '3478',
		logtime: '04/29/2020-16:17:50.124631',
		detect_time: '2020-05-13T09:11:15.604Z',
		owner: null,
		phase: null,
		severity: 'low',
	},
	{
		id: 19,
		status: null,
		name: 'Classification: Targeted Malicious Activity was Detected',
		hostname: 'elk',
		protocol: 'TCP',
		src_ip: '10.10.125.234',
		src_port: '56358',
		dest_ip: '91.189.91.38',
		dest_port: '80',
		logtime: '04/29/2020-06:30:45.402458',
		detect_time: '2020-05-12T07:33:35.812Z',
		owner: null,
		phase: null,
		severity: 'low',
	},
	{
		id: 20,
		status: null,
		name: 'Classification: Attempted User Privilege Gain',
		hostname: 'elk',
		protocol: 'UDP',
		src_ip: '10.10.125.234',
		src_port: '50030',
		dest_ip: '52.87.201.4',
		dest_port: '3478',
		logtime: '04/29/2020-16:17:50.124631',
		detect_time: '2020-05-13T09:11:15.604Z',
		owner: null,
		phase: null,
		severity: 'low',
	},
	{
		id: 21,
		status: null,
		name: 'Classification: Targeted Malicious Activity was Detected',
		hostname: 'elk',
		protocol: 'TCP',
		src_ip: '10.10.125.234',
		src_port: '56358',
		dest_ip: '91.189.91.38',
		dest_port: '80',
		logtime: '04/29/2020-06:30:45.402458',
		detect_time: '2020-05-12T07:33:35.812Z',
		owner: null,
		phase: null,
		severity: 'low',
	},
	{
		id: 22,
		status: null,
		name: 'Classification: Attempted User Privilege Gain',
		hostname: 'elk',
		protocol: 'UDP',
		src_ip: '10.10.125.234',
		src_port: '50030',
		dest_ip: '52.87.201.4',
		dest_port: '3478',
		logtime: '04/29/2020-16:17:50.124631',
		detect_time: '2020-05-13T09:11:15.604Z',
		owner: null,
		phase: null,
		severity: 'low',
	},
	{
		id: 23,
		status: null,
		name: 'Classification: Targeted Malicious Activity was Detected',
		hostname: 'elk',
		protocol: 'TCP',
		src_ip: '10.10.125.234',
		src_port: '56358',
		dest_ip: '91.189.91.38',
		dest_port: '80',
		logtime: '04/29/2020-06:30:45.402458',
		detect_time: '2020-05-12T07:33:35.812Z',
		owner: null,
		phase: null,
		severity: 'low',
	},
	{
		id: 24,
		status: null,
		name: 'Classification: Attempted User Privilege Gain',
		hostname: 'elk',
		protocol: 'UDP',
		src_ip: '10.10.125.234',
		src_port: '50030',
		dest_ip: '52.87.201.4',
		dest_port: '3478',
		logtime: '04/29/2020-16:17:50.124631',
		detect_time: '2020-05-13T09:11:15.604Z',
		owner: null,
		phase: null,
		severity: 'low',
	},
	{
		id: 25,
		status: null,
		name: 'Classification: Targeted Malicious Activity was Detected',
		hostname: 'elk',
		protocol: 'TCP',
		src_ip: '10.10.125.234',
		src_port: '56358',
		dest_ip: '91.189.91.38',
		dest_port: '80',
		logtime: '04/29/2020-06:30:45.402458',
		detect_time: '2020-05-12T07:33:35.812Z',
		owner: null,
		phase: null,
		severity: 'low',
	},
	{
		id: 26,
		status: null,
		name: 'Classification: Attempted User Privilege Gain',
		hostname: 'elk',
		protocol: 'UDP',
		src_ip: '10.10.125.234',
		src_port: '50030',
		dest_ip: '52.87.201.4',
		dest_port: '3478',
		logtime: '04/29/2020-16:17:50.124631',
		detect_time: '2020-05-13T09:11:15.604Z',
		owner: null,
		phase: null,
		severity: 'low',
	},
	{
		id: 27,
		status: null,
		name: 'Classification: Targeted Malicious Activity was Detected',
		hostname: 'elk',
		protocol: 'TCP',
		src_ip: '10.10.125.234',
		src_port: '56358',
		dest_ip: '91.189.91.38',
		dest_port: '80',
		logtime: '04/29/2020-06:30:45.402458',
		detect_time: '2020-05-12T07:33:35.812Z',
		owner: null,
		phase: null,
		severity: 'low',
	},
	{
		id: 28,
		status: null,
		name: 'Classification: Attempted User Privilege Gain',
		hostname: 'elk',
		protocol: 'UDP',
		src_ip: '10.10.125.234',
		src_port: '50030',
		dest_ip: '52.87.201.4',
		dest_port: '3478',
		logtime: '04/29/2020-16:17:50.124631',
		detect_time: '2020-05-13T09:11:15.604Z',
		owner: null,
		phase: null,
		severity: 'low',
	},
	{
		id: 29,
		status: null,
		name: 'Classification: Targeted Malicious Activity was Detected',
		hostname: 'elk',
		protocol: 'TCP',
		src_ip: '10.10.125.234',
		src_port: '56358',
		dest_ip: '91.189.91.38',
		dest_port: '80',
		logtime: '04/29/2020-06:30:45.402458',
		detect_time: '2020-05-12T07:33:35.812Z',
		owner: null,
		phase: null,
		severity: 'low',
	},
	{
		id: 30,
		status: null,
		name: 'Classification: Attempted User Privilege Gain',
		hostname: 'elk',
		protocol: 'UDP',
		src_ip: '10.10.125.234',
		src_port: '50030',
		dest_ip: '52.87.201.4',
		dest_port: '3478',
		logtime: '04/29/2020-16:17:50.124631',
		detect_time: '2020-05-13T09:11:15.604Z',
		owner: null,
		phase: null,
		severity: 'low',
	},
	{
		id: 31,
		status: null,
		name: 'Classification: Targeted Malicious Activity was Detected',
		hostname: 'elk',
		protocol: 'TCP',
		src_ip: '10.10.125.234',
		src_port: '56358',
		dest_ip: '91.189.91.38',
		dest_port: '80',
		logtime: '04/29/2020-06:30:45.402458',
		detect_time: '2020-05-12T07:33:35.812Z',
		owner: null,
		phase: null,
		severity: 'low',
	},
	{
		id: 32,
		status: null,
		name: 'Classification: Attempted User Privilege Gain',
		hostname: 'elk',
		protocol: 'UDP',
		src_ip: '10.10.125.234',
		src_port: '50030',
		dest_ip: '52.87.201.4',
		dest_port: '3478',
		logtime: '04/29/2020-16:17:50.124631',
		detect_time: '2020-05-13T09:11:15.604Z',
		owner: null,
		phase: null,
		severity: 'low',
	},
	{
		id: 33,
		status: null,
		name: 'Classification: Targeted Malicious Activity was Detected',
		hostname: 'elk',
		protocol: 'TCP',
		src_ip: '10.10.125.234',
		src_port: '56358',
		dest_ip: '91.189.91.38',
		dest_port: '80',
		logtime: '04/29/2020-06:30:45.402458',
		detect_time: '2020-05-12T07:33:35.812Z',
		owner: null,
		phase: null,
		severity: 'low',
	},
	{
		id: 34,
		status: null,
		name: 'Classification: Attempted User Privilege Gain',
		hostname: 'elk',
		protocol: 'UDP',
		src_ip: '10.10.125.234',
		src_port: '50030',
		dest_ip: '52.87.201.4',
		dest_port: '3478',
		logtime: '04/29/2020-16:17:50.124631',
		detect_time: '2020-05-13T09:11:15.604Z',
		owner: null,
		phase: null,
		severity: 'low',
	},
	{
		id: 35,
		status: null,
		name: 'Classification: Targeted Malicious Activity was Detected',
		hostname: 'elk',
		protocol: 'TCP',
		src_ip: '10.10.125.234',
		src_port: '56358',
		dest_ip: '91.189.91.38',
		dest_port: '80',
		logtime: '04/29/2020-06:30:45.402458',
		detect_time: '2020-05-12T07:33:35.812Z',
		owner: null,
		phase: null,
		severity: 'low',
	},
	{
		id: 36,
		status: null,
		name: 'Classification: Attempted User Privilege Gain',
		hostname: 'elk',
		protocol: 'UDP',
		src_ip: '10.10.125.234',
		src_port: '50030',
		dest_ip: '52.87.201.4',
		dest_port: '3478',
		logtime: '04/29/2020-16:17:50.124631',
		detect_time: '2020-05-13T09:11:15.604Z',
		owner: null,
		phase: null,
		severity: 'low',
	},
	{
		id: 37,
		status: null,
		name: 'Classification: Targeted Malicious Activity was Detected',
		hostname: 'elk',
		protocol: 'TCP',
		src_ip: '10.10.125.234',
		src_port: '56358',
		dest_ip: '91.189.91.38',
		dest_port: '80',
		logtime: '04/29/2020-06:30:45.402458',
		detect_time: '2020-05-12T07:33:35.812Z',
		owner: null,
		phase: null,
		severity: 'low',
	},
	{
		id: 38,
		status: null,
		name: 'Classification: Attempted User Privilege Gain',
		hostname: 'elk',
		protocol: 'UDP',
		src_ip: '10.10.125.234',
		src_port: '50030',
		dest_ip: '52.87.201.4',
		dest_port: '3478',
		logtime: '04/29/2020-16:17:50.124631',
		detect_time: '2020-05-13T09:11:15.604Z',
		owner: null,
		phase: null,
		severity: 'low',
	},
	{
		id: 39,
		status: null,
		name: 'Classification: Targeted Malicious Activity was Detected',
		hostname: 'elk',
		protocol: 'TCP',
		src_ip: '10.10.125.234',
		src_port: '56358',
		dest_ip: '91.189.91.38',
		dest_port: '80',
		logtime: '04/29/2020-06:30:45.402458',
		detect_time: '2020-05-12T07:33:35.812Z',
		owner: null,
		phase: null,
		severity: 'low',
	},
	{
		id: 40,
		status: null,
		name: 'Classification: Attempted User Privilege Gain',
		hostname: 'elk',
		protocol: 'UDP',
		src_ip: '10.10.125.234',
		src_port: '50030',
		dest_ip: '52.87.201.4',
		dest_port: '3478',
		logtime: '04/29/2020-16:17:50.124631',
		detect_time: '2020-05-13T09:11:15.604Z',
		owner: null,
		phase: null,
		severity: 'low',
	},
	{
		id: 41,
		status: null,
		name: 'Classification: Targeted Malicious Activity was Detected',
		hostname: 'elk',
		protocol: 'TCP',
		src_ip: '10.10.125.234',
		src_port: '56358',
		dest_ip: '91.189.91.38',
		dest_port: '80',
		logtime: '04/29/2020-06:30:45.402458',
		detect_time: '2020-05-12T07:33:35.812Z',
		owner: null,
		phase: null,
		severity: 'low',
	},
];
let playbook = [
	{
		id: 1,
		name_incident: 'sjdhfl',
		name_tag: 'init',
		descrition: 'Những bài hát EDM 2019 gây nghiện không lối thoát',
		type: 'engage',
		status: 0,
	},
	{
		id: 1,
		name_incident: 'sjdwqehfl',
		name_tag: 'asdf',
		descrition: 'Những bài hát EDM 2019 gây nghiện không lối thoát',
		type: 'detect/analyze',
		status: 0,
	},
	{
		id: 1,
		name_incident: 'qweqe',
		name_tag: 'Dqewrdos',
		descrition: 'Những bài hát EDM 2019 gây nghiện không lối thoát',
		type: 'engage',
		status: 0,
	},
	{
		id: 1,
		name_incident: 'rqweeqr',
		name_tag: 'qwer',
		descrition: 'Những bài hát EDM 2019 gây nghiện không lối thoát',
		type: 'respond',
		status: 0,
	},
	{
		id: 1,
		name_incident: 'qasrq',
		name_tag: 'Ddsadfaos',
		descrition: 'Những bài hát EDM 2019 gây nghiện không lối thoát',
		type: 'engage',
		status: 0,
	},
];

app.use(express.json());

app.get('/api/items', (req, res) => {
	console.log('Query /api/items');
	console.log(req.headers);
	let value_cookie = req.headers.cookie;
	console.log(value_cookie);
	value_cookie = value_cookie.slice(8);
	console.log(value_cookie);
	if (cookie === '' || cookie !== value_cookie) {
		res.status(401).send(JSON.stringify({ status: 'Permission Denied' }));
	} else {
		res.json(JSON.stringify(data));
	}
});

app.get('/api/playbook', (req, res) => {
	console.log('Query /api/playbook');
	let value_cookie = req.headers.cookie;
	value_cookie = value_cookie.slice(8);
	console.log(value_cookie);
	if (cookie === '' || cookie !== value_cookie) {
		res.status(401).send(JSON.stringify({ status: 'Permission Denied' }));
	} else {
		res.json(JSON.stringify(playbook));
	}
});

app.post('/api/login', (req, res) => {
	cookie = uuidv4();
	console.log('Query /api/login');
	// const login = mysql.createConnection({
	// 	host: 'localhost',
	// 	user: 'root',
	// 	password: 'P@ssw0rd',
	// 	database: 'users',
	// });
	// let email = req.body.email;
	// let password = req.body.password;
	// let result = [];
	// login.query(
	// 	'SELECT id from users where email = ? and password = ?;',
	// 	[email, password],
	// 	function (err, rows, fields) {
	// 		if (err) throw err;
	// 		result = JSON.parse(JSON.stringify(rows));
	// 		if (rows.length === 0) {
	// 			res.status(400);
	// 			res.json({ status: 'Login fail' });
	// 		} else {
	// 			res.cookie('user_id', cookie, { httpOnly: true });
	// 			res.json({ token: cookie });
	// 		}
	// 	}
	// );
	// login.end();
	// console.log(result);
	if (req.body.email !== 'admin' || req.body.password !== 'admin') {
		res.status(400);
		res.json({ status: 'Login fail' });
	} else {
		res.cookie('user_id', cookie, { httpOnly: true });
		res.json({ status: 'Login Sucseccful' });
	}
	console.log('Done!');
});

app.delete('/api/logout', (req, res) => {
	cookie = '';
	res.json({ status: 'Log out successful' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
