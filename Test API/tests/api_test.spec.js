const { test, expect  } = require('@playwright/test')

const userAPIPostRequest = require('../test_data/post_request_body.json')
const userAPIPutRequest = require('../test_data/put_request_body.json')

test('API POST Request User', async ({ request }) => {

    const postAPIResponse = await request.post(`/api/users`, {
        data: userAPIPostRequest
    })
        expect(postAPIResponse.ok()).toBeTruthy()
        expect(postAPIResponse.status()).toBe(201)

        const postAPIResponseBody = await postAPIResponse.json();
        console.log(postAPIResponseBody)

        expect(postAPIResponseBody).toHaveProperty("name", "morpheus")
        expect(postAPIResponseBody).toHaveProperty("job", "leader")
        
})


test('API GET Request User', async ({ request }) => {
    
    const response = await request.get('/api/users/2')

    expect(response.status()).toBe(200)

    const text = await response.text();
    expect(text).toContain('Weaver')

    console.log(await response.json());
    
 })


 test('API PUT Request User', async ({ request }) => {
    
    const response = await request.put('/api/users/2', {
        data : userAPIPutRequest
    })

    expect(response.status()).toBe(200)

    const text = await response.text();
    expect(text).toContain('zion resident')

    console.log(await response.json());
    
 })


 test('API DELETE Request User', async ({ request }) => {
    
    const response = await request.delete('/api/users/2')

    expect(response.status()).toBe(204)

 })