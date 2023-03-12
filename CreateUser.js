///<reference types ="Cypress"/>
describe("post request",()=>{
    let AccessToken ="f499b6256c7e10fccf4090fa26f0e07694bc696e2af4f0235d2835ea3db713eb"
    let randomText =""
    let randomEmail=""
    it("create user successfully",()=>{
        var pattern = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        for(var i=0; i<10 ; i++)
        randomText+=pattern.charAt(Math.floor(Math.random() * pattern.length)); 
        randomEmail=randomText + '@gmail.com'
        cy.request({
            method: 'POST',
            url:'https://gorest.co.in/public/v2/users',
            headers:{
                 'Authorization': 'Bearer ' + AccessToken
            },
            body:{
                "name": "lukman",
                "gender": "male",
                "email": randomEmail,
                "status": "active"
             }
        }).then((res)=>{
           cy.log(JSON.stringify(res))
            expect(res.status).to.eq(201)
            expect(res.body).has.property('gender','male')
            expect(res.body).has.property('email',randomEmail)
            expect(res.body).has.property('status',"active")
            }).then((res)=>{
            const userId = res.body.id
            cy.log('the user id is:' + userId)
                //2. get user (GET)
            cy.request({
                method: 'GET',
                url: 'https://gorest.co.in/public/v2/users/'+userId,
                headers: {
                 'Authorization': 'Bearer ' + AccessToken
                        }
                    }).then((res)=>{
                        expect(res.status).to.eq(200)
                        expect(res.body).has.property('id', userId)
                        expect(res.body).has.property('name','lukman')
                        
                    })
            })

        })
    })