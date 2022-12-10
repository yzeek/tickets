import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket"

const createTicket =()=>{
   return request(app)
    .post('/api/tickets')
    .set('Cookie',global.signin())
    .send({
    title:'title',
    price:24
    });
}

it('can fetch list of tickets', async () => {
    await createTicket()
    await createTicket()
    await createTicket()
    const r= await request(app)
    .get('/api/tickets')
    .send()
    .expect(200)
expect(r.body.length).toEqual(3)
})
        // const month = 11, year = 2022;

    // function getFirstDayOfMonth(year: number, month: number) {
    //     return new Date(Date.UTC(year, month, 1));
    // }
    // function getLastDayOfMonth(year: number, month: number) {
    //     return new Date(Date.UTC(year, month + 1, 0, 23, 59, 59, 999));
    // }
    // const firstDay = getFirstDayOfMonth(year, month)
    // console.log(firstDay); // 👉️ Tue Nov 01 2022 00:00:00 GMT+0200 

    // const lastDay = getLastDayOfMonth(year, month);
    // console.log(lastDay); // 👉️ Wed Nov 30 2022 23:59:59 GMT+0200 (Israel Standard Time)

    // expect(firstDay.getMonth()).toBe(11)

// it('return error if title invalid', async () => { })
// it('returns error if price invalid', async () => { })
// it('creates a ticket on valid data', async () => { })