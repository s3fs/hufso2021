import { expect } from '@jest/globals'
import mongoose from 'mongoose'
const { connection } = mongoose
import supertest from 'supertest'
import app from '../app'
import Note from '../models/note'
import { initNotes, nonExId, notesDb } from './test_helper'

beforeEach(async () => {
    await Note.deleteMany({})
    let noteObject = new Note(initNotes[0])
    await noteObject.save()
    noteObject = new Note(initNotes[1])
    await noteObject.save()
})

const api = supertest(app)

test('notes returned as json', async () => {
    await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('Alle Notei geben', async () => {
    const response = await api.get('/api/notes')

    expect(response.body).toHaveLength(initNotes.length)
})

test('Ein spezifik Note ist bei die andere Notei', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map(n => n.content)

    expect(contents).toContain('Browser can execute only Javascript')
})

test('a valid note can be added', async () => {
    const newNote = {
        content: 'async/await simplifies making async calls',
        important: true
    }

    await api
        .post('/api/notes')
        .send(newNote)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
       //?? 
    const notesAtEnd = await notesDb()
    expect(notesAtEnd).toHaveLength(initNotes.length + 1)

    const contents = notesAtEnd.map(n => n.content)
    expect(contents).toContain('async/await simplifies making async calls')
})

test('no content note not added', async () => {
    const newNote = {
        important: true
    }

    await api
        .post('/api/notes')
        .send(newNote)
        .expect(400)
    
    const notesAtEnd = await notesDb()

    expect(notesAtEnd).toHaveLength(initNotes.length)
})

test('Spezifik note can be viewed', async () => {
    const notesAtStart = await notesDb()

    const noteToView = notesAtStart[0]

    const resNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    const processedNoteToView = JSON.parse(JSON.stringify(noteToView))

    expect(resNote.body).toEqual(processedNoteToView)
})

test('can delete note', async () => {
    const notesAtStart = await notesDb()
    const noteToDelete = notesAtStart[0]

    await api
        .delete(`/api/notes/${noteToDelete.id}`)
        .expect(204)

    const notesAtEnd = await notesDb()

    expect(notesAtEnd).toHaveLength(initNotes.length - 1)
})

afterAll(() => connection.close())