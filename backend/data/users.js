import bcrypt from "bcryptjs";

const users = [
	{
		name: "haider",
		email: "nomanali2727@gmail.com",
		password: bcrypt.hashSync("haiderali", 10),
		isAdmin: true,
	},
	{
		name: "Asif Ali",
		email: "asif@gmail.com",
		password: bcrypt.hashSync("asifali", 10),
	},
	{
		name: "Zain Ali",
		email: "zain@gmail.com",
		password: bcrypt.hashSync("zainali", 10),
	},
];

export default users;
