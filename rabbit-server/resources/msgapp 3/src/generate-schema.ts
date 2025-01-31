import glob from 'glob'
import { unlink } from 'fs/promises'
import { appendFile, readFileSync, writeFileSync } from 'fs';
import { mergeTypeDefs } from '@graphql-tools/merge'
import { print } from 'graphql'

glob('src/**/*graphql', async (err, files) => {
    if(err) throw err;

    let typesArray: Array<string> = []

    await unlink('schema.graphql')
    writeFileSync(
        'schema.graphql', 
        '# generated Schema - do not edit # \n\n', 
        { flag: 'a+' })

    files.forEach((filePath) => {
        const schema = readFileSync(filePath, { encoding: 'utf-8' } )
        typesArray.push(schema)
    })

    const typeDefs = print(mergeTypeDefs(typesArray))
    appendFile('schema.graphql', typeDefs, function (err) {
        if(err) throw err;
    })

    console.info('Graphql schema generated')
})