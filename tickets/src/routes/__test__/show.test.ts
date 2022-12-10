import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket"

it('returns 404 if ticket not found', async () => {

    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app).get(`/api/tickets/${id}`)
        .send()
        .expect(404);

})
it('returns ticket if found', async () => {

    let tickets = await Ticket.find({})
    expect(tickets.length).toEqual(0);
    const r = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'title456',
            price: 24
        });
    expect(r.statusCode).toEqual(201)

    const t = await request(app).get(`/api/tickets/${r.body.id}`)
    expect(t.body.title).toEqual(r.body.title)
    expect(t.body.price).toEqual(r.body.price)
})

