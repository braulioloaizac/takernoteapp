const express = require('express');
const path = require('path');
const fs = require('fs');
// Helper method for generating unique ids
const uuid = require('./helpers/uuid')

//Imports the Data Base
const notesDB = require('./db/db.json');
const { randomUUID } = require('crypto');

//Sets the port to 3001
const PORT = process.env.PORT || 3001;

const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

//Starts the server
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/api/notes', (req, res) =>
    res.json(notesDB)
);

app.post('/api/notes', (req, res) => {
    
    const newNote = req.body;
    newNote.id = uuid();
    
    fs.readFile('./db/db.json', 'utf-8', (error, data) =>{
        if (error){
            console.log(error);
        }

        else{
            //Get the json
            const prevNotes = JSON.parse(data)


            //Inserts the new note
            prevNotes.push(newNote);

            //Writes the JSON file
            fs.writeFile('./db/db.json',
            JSON.stringify(prevNotes, null, 2), (wrterror) => 
                wrterror ? console.error(wrterror) : console.info('Note added sucesfully')
            )
        }
    })
    res.send('Added Note')
});


// app.delete('/api/notes/:noteID', (req, res) => {
    
//     const id = req.params.noteID;

//     fs.readFile('./db/db.json', 'utf-8', (error, data) =>{
//         if (error){
//             console.log(error);
//         }

//         else{
//             //Get the json
//             const prevNotes = JSON.parse(data)

//             prevNotes.forEach(note => {
//                 if( note.id === id){
//                     delete note.title;
//                     delete note.text;
//                     delete note.id;
//                     console.log(prevNotes)
//                 }

                
//                 //Writes the JSON file
//                 fs.writeFile('./db/db.json',
//                 JSON.stringify(prevNotes, null, 2), (wrterror) => 
//                     wrterror ? console.error(wrterror) : console.info('Note deleted sucesfully')
//                 )
//             });

            
//         }
//     })
//     res.send('Deleted sucesfully')
//     console.log(note.title)
//   })
