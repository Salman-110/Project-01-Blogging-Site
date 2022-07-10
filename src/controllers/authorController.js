const jwt = require('jsonwebtoken');
const authorModel = require("../models/authorModel");



const createauthor = async function (req, res) {
    try {
        let data = req.body
        let author = await authorModel.create(data);
        return res.status(201).send({ msg: author });
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
};
module.exports.createauthor = createauthor;



const authorLogin = async function (req, res) {
    try {
        let data = req.body;
        const { email, password } = data;

        let author = await authorModel.findOne({ email: email, password: password })
        if (!author) {
            return res.status(400).send("Invalid Email-id or Password");
        }
        let authorid = author._id.toString();

        let token = jwt.sign({
            authorid: authorid
        },
            "BloggingSiteProject"
        );
        res.setHeader("x-api-key", token);
        res.status(200).send({ status: true, data: "login Successful", token });
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
};
module.exports.authorLogin = authorLogin;