describe('addItemInput', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto(
            'http://localhost:6006/iframe.html?args=&id=additeminput--add-item-input-test&viewMode=story'
            // 'http://localhost:9009/iframe.html?id=todolist-additemform--add-item-form-example'
        )
        const image = await page.screenshot()

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot()
    })
})
