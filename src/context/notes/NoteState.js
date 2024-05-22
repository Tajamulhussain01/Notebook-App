import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) =>{
  const host = "http://localhost:5000"
  const notesInitial = []

  // Get all Notes
  const getNotes = async () =>{
    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
        },
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)
  }

  // const notesInitial = [
  //   {
  //     "_id": "643a4317c808c5800a44168c",
  //     "user": "64382d39e34cecb3694e3fde",
  //     "title": "Routine",
  //     "description": "Please Wake Up Early",
  //     "tag": "Personal",
  //     "date": "2023-04-15T06:24:23.840Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "643ac448fd0172dac958b7ba",
  //     "user": "64382d39e34cecb3694e3fde",
  //     "title": "Routine 45",
  //     "description": "Please Wake Up Early [ADDED]",
  //     "tag": "Personal",
  //     "date": "2023-04-15T15:35:36.284Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "643ac58f289ac54fec55ad54",
  //     "user": "64382d39e34cecb3694e3fde",
  //     "title": "Routine Updated",
  //     "description": "Please Wake Up Early Updated",
  //     "tag": "Personal",
  //     "date": "2023-04-15T15:41:03.117Z",
  //     "__v": 0
  //   }
  // ];

  const [notes, setNotes] = useState(notesInitial);
   
  // Add a Note
  const addNote = async (title, description, tag) =>{
    // API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
        },
      body: JSON.stringify({title, description, tag}), 
    });

    const note = await response.json();
    setNotes(notes.concat(note))   
  }

  // Delete a Note
  const deleteNote = async (id) =>{
    // API call
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
        },
    });
    const json = response.json();
    console.log(json)

    console.log("Deleting Note with id " + id)
    const newNotes = notes.filter((note)=>{return note._id!==id})
    setNotes(newNotes)
  }

  // Edit a Note
  const editNote = async (id, title, description ,tag)=>{
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
        },
      body: JSON.stringify({title, description, tag}), 
    });
    const json = await response.json();
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client 
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if(element._id === id){
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  }

  return (
    // <NoteContext.Provider value={{state, update}}>
    <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
        {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;