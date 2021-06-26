const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded());

app.use(express.static('assets'));

var contactsList = [
    {
        name: "Iron Man",
        phone: "1234567890"
    },
    {
        name: "Captain America",
        phone: "1111111111"
    },
    {
        name: "Thor",
        phone: "0987654321"
    }
];

app.get('/', function(req,res){

    Contact.find({}, function(err, contacts){
        if (err){
            console.log('error while fetching contacts from db');
            return;
        }
        return res.render('home', {title:"My Contacts List", contact_list: contacts});
    });
    
   
});

app.get('/practice', function(req,res){
    return res.render('practice', {title:"Practice ejs"});
});


app.get('/delete-contact', function(req,res){
    let id = req.query.id;
    
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error while deleting an object from db');
            return;
        }
        return res.redirect('back');
    });
});

app.post('/create-contact', function(req,res){
   // contactsList.push(req.body);
   // return res.redirect('back');

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if (err){
            console.log('error while creating a contact!');
            return;
        }
        console.log('********', newContact);
        return res.redirect('back');
    });

});

app.listen(port, function(err){
    if (err){
        console.log('Error while running the server', err);
    }

    console.log('Server is running on port', port);
});