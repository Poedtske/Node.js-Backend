const express = require('express');
const debug=require('debug')('app:sessionRouter');
const { MongoClient, ObjectId  } = require('mongodb');
const bodyParser = require('body-parser');
const sessions = require('../data/sessions.json');
const speakerService=require('../services/speakerService');
const methodOverride=require('method-override');

const sessionsRouter = express.Router();

sessionsRouter.use(bodyParser.urlencoded({ extended: false }));
sessionsRouter.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    console.log(method,req.body._method)
    delete req.body._method
    return method
  }
}))

sessionsRouter.route('/').get((req, res) => {
  const url =
    'mongodb+srv://AdminEhb:Password@backendproject.6ex1nk5.mongodb.net/?retryWrites=true&w=majority';
  const dbName = 'BackendProject';

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug('Connected to the mongo DB');

      const db = client.db(dbName);

      const sessions = await db.collection('sessions').find().toArray();
      res.render('sessions',{sessions});
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  })();
});

// sessionsRouter.route('/').get((req, res) => {
//   res.render('sessions', {
//     sessions,
//   });
// });

//show session
sessionsRouter.route('/:id').get((req, res) => {
  const id = req.params.id;
  const url =
    'mongodb+srv://AdminEhb:Password@backendproject.6ex1nk5.mongodb.net/?retryWrites=true&w=majority';
  const dbName = 'BackendProject';

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug('Connected to the mongo DB');

      const db = client.db(dbName);

      const session = await db.collection('sessions').findOne({_id: new ObjectId(id)});
      const speaker= await speakerService.getSpeakerById(session.speakers[0].id);

      session.speaker=speaker.data;

      res.render('session',{session});
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  })();
});

//update session

// sessionsRouter.get('/edit',(req,res)=>{
//   res.render('sessionEdit');
// })
sessionsRouter.route('/edit/:id').put(async (req, res) => {
  const id = parseInt(req.params.id);
  const url =
    'mongodb+srv://AdminEhb:Password@backendproject.6ex1nk5.mongodb.net/?retryWrites=true&w=majority';
  const dbName = 'BackendProject';

  let client;

  try {
    client = await MongoClient.connect(url);
    debug('Connected to the mongo DB');

    const db = client.db(dbName);

    const session = await db.collection('sessions').findOne({ _id: new ObjectId(id) });
    const speaker = await speakerService.getSpeakerById(session.speakers[0].id);

    // Update the session based on its _id
    await db.collection('sessions').updateOne(
      { _id: new ObjectId(id) }, // Filter criteria
      { $set: { speaker: speaker.data } } // Update operation
    );

    // Optionally, you can fetch the updated session after the update
    const updatedSession = await db.collection('sessions').findOne({ _id: new ObjectId(id) });

    res.render('session', { session: updatedSession });
  } catch (error) {
    debug(error.stack);
  } finally {
    if (client) {
      client.close();
    }
  }
});


//show sessions
sessionsRouter.route('/').get((req, res) => {
  const url =
    'mongodb+srv://AdminEhb:Password@backendproject.6ex1nk5.mongodb.net/?retryWrites=true&w=majority';
  const dbName = 'BackendProject';

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug('Connected to the mongo DB');

      const db = client.db(dbName);

      const sessions = await db.collection('sessions').find().toArray();
      res.render('sessions',{sessions});
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  })();
});

//create sessions
sessionsRouter.route('/').post((req,res)=>{
  
  const url =
      'mongodb+srv://AdminEhb:Password@backendproject.6ex1nk5.mongodb.net/?retryWrites=true&w=majority';
    const dbName = 'BackendProject';
    
  
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected to the mongo DB');
  
        const db = client.db(dbName);
        const sessionData = await req.body.session;
        await db.collection('sessions').insertOne({sessionData});
        // res.redirect('/');

      } catch (error) {
        debug(error.stack);
      }
      client.close();
    })();


  res.redirect('/');
})
//delete session
sessionsRouter.delete('/delete/:id',(req,res)=>{
  const id = parseInt(req.body.id);
  const url =
      'mongodb+srv://AdminEhb:Password@backendproject.6ex1nk5.mongodb.net/?retryWrites=true&w=majority';
    const dbName = 'BackendProject';
    
  
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected to the mongo DB');
  
        const db = client.db(dbName);
  
        const session = await db.collection('sessions').findOne({_id: new ObjectId(id)});
        await db.collection('sessions').deleteOne( { "_id" : new ObjectId("65a5693a61a180f1564e77ff") } );
        // await db.collection('sessions').deleteOne(session.id);
  
        res.render('session',{session});
      } catch (error) {
        debug(error.stack);
      }
      client.close();
    })();


  res.redirect('/');
})

module.exports=sessionsRouter;