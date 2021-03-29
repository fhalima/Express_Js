let express =require('express')
let app = express();
let bodyParser =require('body-parser')
let session=require('express-session')

//nos moteurs de templates
app.set('view engine', 'ejs');

//nos middleware
app.use('/assets',express.static('public'));
app.use(bodyParser.urlencoded({extended:false}))
app.use(session({
    secret:'halima',
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false}
}))
app.use(require('./middlewares/flash'))

//nos routes
app.get('/', (request, response)=>{
let Message = require('./models/Message')
    Message.all(function(messages){
        response.render('pages/index', {messages:messages})
    })
    // response.render('pages/index')
});

app.get('/comment/:id', (request, response)=>{
    let Message = require('./models/Message')
    Message.find(request.params.id, function(message){
        response.render('pages/showMessage', {message:message})
    })
    // response.render('pages/index')
});

app.post('/', (request, response)=>{
    if(request.body.message === undefined || request.body.message === ''){
        request.flash('error', "Vous n\'avez pas entré de message")
        response.redirect('/');
    } else{
        let Message = require('./models/Message')
        Message.create(request.body.message, function(){
            request.flash('success', 'Merci !')
            response.redirect('/');
        })
    }
    // response.redirect('/');

})

app.listen(8080);