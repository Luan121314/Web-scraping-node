const puppeteer = require('puppeteer');
const url = 'https://www.escol.as/cidades/3531-itaquaquecetuba/categories/59-creche-particular'
// const url = 'https://www.edponline.com.br/para-sua-casa/login'

const iniciar = async () => {
    const browser = await puppeteer.launch({ devtools: false });
    const page = await browser.newPage();
    await page.goto(url)
    let cont = 2
    let result = []
    do {
        const pages = await page.evaluate(async () => {
            const creches = [];

            document.querySelectorAll('.w-full h3 a').forEach((creche) => {
                const { href, innerText } = creche
                creches.push({ link: href, entidade: innerText });
                console.log('cebceoa')
            })

            return creches

        })

        pages.map(entidade => {
            console.log('Adicionando entidade')
            result = [...result, entidade]
        });

        await page.waitFor(2000);
        await page.goto(`${url}?page=${cont}`);
        await page.waitFor(2000);
        cont++

    } while (cont <= 3);

    console.log(result)

    let resultSerialize = []
    console.log('Serializando entidades')

    
    for (let i = 0; i < result.length; i++) {
        console.log(`${i} de ${result.length}`)
        await page.waitFor(3000);
        await page.goto(result[i].link);
        const {entidade, link} = result[i]

        const email = await page.evaluate(() => (document.querySelector('div span .mb-6').innerText
        )).catch(()=>{console.log(`Entidade sem email => ${result[i].entidade}`)})
        resultSerialize.push({entidade, link, email: email || '' })
    }

    // console.log(resultSerialize)
    await browser.close();
    console.log('Finalizado')
    return resultSerialize
}


module.exports = iniciar

