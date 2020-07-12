const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const { v4: uuidv4 } = require("uuid");
const md5 = require("crypto-js");
const { Client } = require("@elastic/elasticsearch");
const { errors } = require("@elastic/elasticsearch");
const fetch = require("node-fetch");

const conn = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "P@ssw0rd",
	database: "incidents",
});

const client = new Client({
	node: { url: new URL("http://10.102.10.234:9200") },
	auth: {
		apiKey: {
			id: "iVrVAXIBTfWaIfC1YmVv",
			api_key: "u2Q_6xWiRkSWaJsEDJnpYw",
		},
		// username: 'elastic',
		//   	password: 'P@ssw0rd'
	},
});
// conn.connect();

// conn.query("SELECT * from incidents_list", function (err, rows, fields) {
// 	if (err) throw err;
// 	return JSON.stringify(rows);
// });
// conn.end();

// console.log(list);

// app.use(cors());
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);
app.use(express.json());

app.get("/api/getinfo", (req, res) => {
	console.log("Get info");
	conn.query("SELECT id, description FROM task_list;", function (
		err,
		rows,
		fields
	) {
		if (err) throw err;
		res.json(JSON.stringify(rows));
	});
});

app.get("/api/playbook", (req, res) => {
	console.log("Query /api/playbook");
	console.log(req.headers);
	let value_cookie = req.headers.cookie;
	let id = req.query.id;
	console.log(id);
	value_cookie = value_cookie.slice(8);
	console.log(value_cookie);
	if (cookie === "" || cookie !== value_cookie) {
		res.status(401).send(JSON.stringify({ status: "Permission Denied" }));
	} else {
		conn.query(
			"select * from incidents_list left join (select inc_id,task_id,description,detail,phase as type, status as tag_status from relation_incident_tag left join task_list on task_id = task_list.id) as tb1 on incidents_list.id = tb1.inc_id  where incidents_list.id = ?;",
			[id],
			function (err, rows, fields) {
				if (err) throw err;
				// console.log(JSON.stringify(rows));
				res.json(JSON.stringify(rows));
			}
		);
	}
});

app.put("/api/playbook", (req, res) => {
	console.log("Update /api/playbook");
	console.log(req.headers);
	let value_cookie = req.headers.cookie;
	let { inc_id, task_id, tag_status } = req.body;
	console.log(typeof inc_id);
	console.log(typeof task_id);
	console.log(typeof tag_status);
	value_cookie = value_cookie.slice(8);
	console.log(value_cookie);
	if (cookie === "" || cookie !== value_cookie) {
		res.status(401).send(JSON.stringify({ status: "Permission Denied" }));
	} else {
		conn.query(
			"UPDATE relation_incident_tag SET status = ? WHERE inc_id = ? AND task_id = ?;",
			[tag_status, inc_id, task_id],
			function (err, rows, fields) {
				if (err) throw err;
				// console.log(JSON.stringify(rows));
				// res.json(JSON.stringify(rows));
				res.sendStatus(200);
			}
		);
	}
});

app.post("/api/playbook", (req, res) => {
	let { inc_id, task_id, tag_status } = req.body;
	conn.query(
		"INSERT INTO relation_incident_tag (inc_id,task_id, status) VALUES (?,?,?);",
		[inc_id, task_id, tag_status],
		function (err, rows, fields) {
			if (err) throw err;
			// console.log(JSON.stringify(rows));
			// res.json(JSON.stringify(rows));
			res.sendStatus(200);
		}
	);
});

app.delete("/api/playbook", (req, res) => {
	console.log("Delete Playbook");
	let { inc_id, task_id } = req.body;
	conn.query(
		"DELETE FROM relation_incident_tag WHERE inc_id = ? and task_id = ?;",
		[inc_id, task_id],
		function (err, rows, fields) {
			if (err) throw err;
			// console.log(JSON.stringify(rows));
			// res.json(JSON.stringify(rows));
			res.sendStatus(200);
		}
	);
});

app.get("/api/items", (req, res) => {
	console.log("Query /api/items");
	console.log(req.headers.cookie);
	let value_cookie = req.headers.cookie;
	value_cookie = value_cookie.slice(8);
	console.log(value_cookie);
	if (cookie === "" || cookie !== value_cookie) {
		res.status(401).send(JSON.stringify({ status: "Permission Denied" }));
	} else {
		conn.query("SELECT * from incidents_list;", function (err, rows, fields) {
			if (err) throw err;
			// console.log(JSON.stringify(rows))
			res.json(JSON.stringify(rows));
		});
	}
});

app.get("/api/checkurl", (req, res) => {
	/*console.log("Query /api/urls");
	console.log(req.headers.cookie);
	let value_cookie = req.headers.cookie;
	value_cookie = value_cookie.slice(8);
	console.log(value_cookie);
	if (cookie === "" || cookie !== value_cookie) {
		res.status(401).send(JSON.stringify({ status: "Permission Denied" }));
	} else {

		});
	}*/
	// let url = req.query.url;
	let url = "microsoft-covid19.com";
	let uri = "https://api.xforce.ibmcloud.com/url/";
	let resOption = {
		method: "GET",
		credentials: "include",
		headers: {
			Authorization:
				"Basic " +
				new Buffer(
					"3b1645e8-d524-43f7-a93f-33c796ce70b6" +
						":" +
						"c3d9aa7d-540a-4d78-a082-2fe0a85fc7d0",
					"utf8"
				).toString("base64"),
		},
	};
	uri = uri + url;
	console.log(uri);
	fetch(uri, resOption)
		.then((response) => response.json())
		.then((result) => {
			if (result.error) res.send(result);
			else res.send(result.result);
		})
		.catch((error) => console.log("error", error));
});

app.get("/api/checkhash", (req, res) => {
	/*console.log("Query /api/urls");
	console.log(req.headers.cookie);
	let value_cookie = req.headers.cookie;
	value_cookie = value_cookie.slice(8);
	console.log(value_cookie);
	if (cookie === "" || cookie !== value_cookie) {
		res.status(401).send(JSON.stringify({ status: "Permission Denied" }));
	} else {

		});
	}*/
	//let dest_ip = req.body.dest_ip;
	//let timestamp = req.body.timestamp;
	let hash = "474B9CCF5AB9D72CA8A333889BBB34F0";
	let dstIP = "10.10.125.234";
	let timestamp = "2020-06-05T08:14:44.941";
	let uri = "https://api.xforce.ibmcloud.com/malware/";
	let resOption = {
		method: "GET",
		credentials: "include",
		headers: {
			Authorization:
				"Basic " +
				new Buffer(
					"3b1645e8-d524-43f7-a93f-33c796ce70b6" +
						":" +
						"c3d9aa7d-540a-4d78-a082-2fe0a85fc7d0",
					"utf8"
				).toString("base64"),
		},
	};
	client
		.search({
			index: "evelogstash",
			//type: 'posts',
			body: {
				query: {
					bool: {
						must: {
							match: { dest_ip: dstIP },
							match: { event_type: "alert" },
							match: { "@timestamp": timestamp },
						},
					},
				},
			},
		})
		.then(
			function (resp) {
				console.log(resp.body.hits.total.value);
				if (resp.body.hits.total.value > 0) {
					//let reStr = resp.body.hits.hits[0]['_source']['http']['http_refer'];
					//uri = uri + reStr.substring(reStr.indexOf('//')+2);
					uri = uri + hash;
					console.log(uri);
					fetch(uri, resOption)
						.then((response) => response.json())
						.then((result) => {
							console.log(result);
							if (result.error) res.send(result);
							else res.send(result.malware);
						})
						.catch((error) => console.log("error", error));
				} else res.json("No Url found during time range");
			},
			function (err) {
				console.trace(err.message);
			}
		);
});

app.post("/api/login", (req, res) => {
	cookie = uuidv4();
	console.log("Query /api/login");
	const login = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "P@ssw0rd",
		database: "users",
	});
	let email = req.body.email;
	let password = req.body.password;
	let result = [];
	login.query(
		"SELECT email,role from users where email = ? and password = ?;",
		[email, password],
		function (err, rows, fields) {
			if (err) throw err;
			result = JSON.parse(JSON.stringify(rows));
			if (rows.length === 0) {
				res.status(400);
				res.json({ status: "Login fail" });
			} else {
				res.cookie("user_id", cookie, { httpOnly: true });
				res.json({ result: result });
			}
		}
	);
	login.end();
	console.log(result);
	console.log("Done!");
});

app.post("/api/assets", (req, res) => {
	let { asset_name, ip } = req.body;
	console.log(asset_name + ip);
	conn.query(
		"INSERT INTO assets (asset_name, ip) VALUES (?,?);",
		[asset_name, ip],
		function (err, rows, fields) {
			if (err) throw err;
			// console.log(JSON.stringify(rows))
			res.sendStatus(200);
		}
	);
});
app.get("/api/assets", (req, res) => {
	let { asset_name, ip } = req.body;
	conn.query("SELECT * FROM assets;", function (err, rows, fields) {
		if (err) throw err;
		// console.log(JSON.stringify(rows))
		res.json(JSON.stringify(rows));
	});
});

app.delete("/api/assets", (req, res) => {
	let { id } = req.query;
	console.log(id);
	conn.query("DELETE FROM assets WHERE id = ?", [id], function (
		err,
		rows,
		fields
	) {
		if (err) throw err;
		// console.log(JSON.stringify(rows))
		res.sendStatus(200);
	});
});

app.put("/api/assets", (req, res) => {
	let { id } = req.query;
	let { asset_name, ip } = req.body;
	console.log(id);
	conn.query(
		"UPDATE assets SET asset_name=?, ip=? WHERE id=?;",
		[asset_name, ip, id],
		function (err, rows, fields) {
			if (err) throw err;
			// console.log(JSON.stringify(rows))
			res.sendStatus(200);
		}
	);
});

app.post("/api/tasks", (req, res) => {
	let { description, detail, phase } = req.body;
	console.log(description, detail, phase);
	let value_cookie = req.headers.cookie;
	value_cookie = value_cookie.slice(8);
	console.log(value_cookie);
	if (cookie === "" || cookie !== value_cookie) {
		res.status(401).send(JSON.stringify({ status: "Permission Denied" }));
	} else {
		conn.query(
			"INSERT INTO task_list (description, detail,phase) VALUES (?,?,?);",
			[description, detail, phase],
			function (err, rows, fields) {
				if (err) throw err;
				// console.log(JSON.stringify(rows))
				res.sendStatus(200);
			}
		);
	}
});
app.get("/api/tasks", (req, res) => {
	let value_cookie = req.headers.cookie;
	value_cookie = value_cookie.slice(8);
	console.log(value_cookie);
	if (cookie === "" || cookie !== value_cookie) {
		res.status(401).send(JSON.stringify({ status: "Permission Denied" }));
	} else {
		conn.query("SELECT * FROM task_list;", function (err, rows, fields) {
			if (err) throw err;
			// console.log(JSON.stringify(rows))
			res.json(JSON.stringify(rows));
		});
	}
});

app.delete("/api/tasks", (req, res) => {
	let { id } = req.query;
	console.log(id);
	let value_cookie = req.headers.cookie;
	value_cookie = value_cookie.slice(8);
	console.log(value_cookie);
	if (cookie === "" || cookie !== value_cookie) {
		res.status(401).send(JSON.stringify({ status: "Permission Denied" }));
	} else {
		conn.query("DELETE FROM task_list WHERE id = ?", [id], function (
			err,
			rows,
			fields
		) {
			if (err) throw err;
			// console.log(JSON.stringify(rows))
			res.sendStatus(200);
		});
	}
});

app.put("/api/tasks", (req, res) => {
	let { id } = req.query;
	let { description, detail, phase } = req.body;
	console.log(id);
	let value_cookie = req.headers.cookie;
	value_cookie = value_cookie.slice(8);
	console.log(value_cookie);
	if (cookie === "" || cookie !== value_cookie) {
		res.status(401).send(JSON.stringify({ status: "Permission Denied" }));
	} else {
		conn.query(
			"UPDATE task_list SET description=?, detail=?, phase=? WHERE id=?;",
			[description, detail, phase, id],
			function (err, rows, fields) {
				if (err) throw err;
				// console.log(JSON.stringify(rows))
				res.sendStatus(200);
			}
		);
	}
});

app.delete("/api/logout", (req, res) => {
	console.log("Log Out");
	cookie = "";
	res.json({ status: "Log out successful" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
