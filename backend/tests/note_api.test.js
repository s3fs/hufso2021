import { expect } from '@jest/globals'
import mongoose from 'mongoose'
const { connection } = mongoose
import supertest from 'supertest'
import app from '../app'

const api = supertest(app)

test('notes returned as json', async () => {
    await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('d. s. 9 notes', async () => {
    const response = await api.get('/api/notes')

    expect(response.body).toHaveLength(9)
})

test('Die erstes Note ist ueber HTTP Methods', async () => {
    const response = await api.get('/api/notes')

    expect(response.body[0].content).toBe('HTML is Easy')
})

afterAll(() => connection.close())