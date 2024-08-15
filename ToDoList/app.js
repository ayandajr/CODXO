// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
var items = [];
let workItems = [];

app.set("view engine", "ejs");//This lets us see the text within the ejs file, hence the <%=  %>.

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static("public"));

app.get("/", function(req, res)
{
    var today = new Date ();

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    var day = today.toLocaleDateString("en-US", options);
    res.render("list", {listTitle: day, newListItems: items});
})

app.post("/", function(req,res){
    let item = req.body.newItem;

    if(req.body.list === "work")
    {
        workItems.push(item);
        res.redirect("/work");
    }
    else
    {
        items.push(item);
        res.redirect("/");
    }
})

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newListItems: items})
})

app.post("/work", function(req, res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/");
})

app.listen(3000, function()
{
    console.log("Server running on port 3000");
})