var express = require('express');
var cors = require('cors');
require('dotenv').config();
const multer = require('multer');



var app = express();


app.use(express.json());
app.use(express.urlencoded( { extended: true }));
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

//connect to db
mongoose.connect(process.env.MONGO_URI, {})

const db = mongoose.connection

//listen for error in connection process
db.on('error', () => {
  console.log('Connected to MongoDB');
})

//listen for a successful connection
db.once('open', () => {
  console.log('Connected to MongoDb')
})

;



//initialize multer 
const upload = multer ()


app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

//andle form submission with the file upload
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  //check if file was uploaded
  if(!req.file) {
    res.status(400).json({ error: 'no file uploaded'})
  }
  res.status(200).json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  })
})




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
