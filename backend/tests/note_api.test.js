import { expect } from '@jest/globals'
import mongoose from 'mongoose'
const { connection } = mongoose
import supertest from 'supertest'
import app from '../app'
import Note from '../models/note'
import { initNotes, nonExId, notesDb } from './test_helper'
const api = supertest(app)

beforeEach(async () => {
    await Note.deleteMany({})
    await Note.insertMany(initNotes)
    /*
    another way to do this would be...

    await Note.deleteMany({})
    const noteObjects = initNotes.map(n => new Note(n))
    const promiseArray = noteObjects.map(n => n.save())
    await Promise.all(promiseArray)

    */
})

describe('initial note saving &proc', () => {
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
})

describe('viewing a specific note', () => {
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
    
    test('fail 404 if note nonexistent', async () => {
        const validNonexId = await nonExId()

        console.log('validNonexId :>> ', validNonexId)

        await api
            .get(`/api/notes/${validNonexId}`)
            .expect(404)
    })

    test('fali 400 when id is invalid0', async () => {
        const invalidId = '5a3d5da59070081a82a3445'

        await api
        .get(`/api/notes/${invalidId}`)
        .expect(400)
    })
})

describe('new note addition', () => {
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
    
        const notesAtEnd = await notesDb()
        expect(notesAtEnd).toHaveLength(initNotes.length + 1)
    
        const contents = notesAtEnd.map(n => n.content)
        expect(contents).toContain('async/await simplifies making async calls')
    })

    test('no content note not added 400', async () => {
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
})

describe('note removal', () => {
    test('can delete note 204', async () => {
        const notesAtStart = await notesDb()
        const noteToDelete = notesAtStart[0]
    
        await api
            .delete(`/api/notes/${noteToDelete.id}`)
            .expect(204)
    
        const notesAtEnd = await notesDb()
    
        expect(notesAtEnd).toHaveLength(initNotes.length - 1)

        const contents = notesAtEnd.map(n => n.content)

        expect(contents).not.toContain(noteToDelete.content)
    })
})

afterAll(() => connection.close())