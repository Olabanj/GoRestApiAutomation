///<reference types ="Cypress"/>
describe("get user",()=>{
    let AccessToken ="f499b6256c7e10fccf4090fa26f0e07694bc696e2af4f0235d2835ea3db713eb"
    it('list user user',()=>{
       cy.request({
        method:'GET',
        url:"https://gorest.co.in/public-api/users",
        headers:{
            Authorization:'Bearer' + AccessToken
        }
     }).then((res)=>{
        expect(res.status).to.eq(200)
        expect(res.body.meta.pagination.limit).to.eq(10)
        expect(res.body).has.property('code',200)
     })
     })
     it('get user by id',()=>{
        cy.request({
            method:'GET',
            url:'https://gorest.co.in/public-api/users/980462',
            headers:{
                Authorization:'Bearer' + AccessToken
            }
        }).then((res)=>{
            expect(res.body).has.property('code',200)
            expect(res.body.data).has.property('id',980462)
            expect(res.body.data).has.property('name','Gayatri Joshi')
            expect(res.body.data).has.property('gender','male')
            //name": "Gayatri Joshi
        })
     })
})