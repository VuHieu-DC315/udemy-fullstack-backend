const { get } = require("../routes/web")
const connection = require("../config/database")

const gethomePage = async(req, res) => {
    let conn = await connection;
    let [results, fields] = await conn.query('select * from Users u');
    console.log(">>> check results: ", results); // results contains rows returned by server    
    return res.render('home.ejs')
}

const getAbcPage = (req, res) => {
    res.send('This is ABC page')
}

const gethoidanitPage = (req, res) => {
    res.render('sample.ejs')
}

const postCreateUser = async (req, res) => {

    let email = req.body.email
    let name = req.body.name
    let city = req.body.city
    // console.log('>>> Check req body: ', email, name, city);
    let conn = await connection;
    let [results, fields] = await conn.query(
        `INSERT INTO Users (email, name, city) VALUES (?, ?, ?)`, [email, name, city]
    );

    // console.log(">>> check results insert: ",results);

    res.send('Create user successfully!')

    // const [results, fields] = await connection.query('select * from Users u');
    // console.log(">>> check results: ", results); // results contains rows returned by server
}

const getCreatePage = (req, res) => {
    res.render('Create.ejs')
}
module.exports = {
    gethomePage,
    getAbcPage,
    gethoidanitPage,
    postCreateUser,
    getCreatePage
}