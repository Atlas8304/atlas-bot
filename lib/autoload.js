const fs = require("fs");
const path = require("path");

function find_nested(dir, pattern) {
    let results = [];

    fs.readdirSync(dir).forEach((subDir) => {
        subDir = path.resolve(dir, subDir);
        const stat = fs.statSync(subDir);
        if(stat.isDirectory()) {
            results = results.concat(find_nested(subDir, pattern))
        } else if (stat.isFile() && subDir.endsWith(pattern)) {
            results.push(subDir);
        }
    });

    return results;
}

commandList = find_nested(__dirname + '/../commands', 'js');

module.exports.autoload = (atlas) => {
    commandList.forEach(file => {
        const props = require(file);
        atlas.commands.set(props.name, props);
        props.aliases.forEach(alias => {
            atlas.aliases.set(alias, props.name);
        });
    });
    console.log(`Loaded ${commandList.length} commands`)
};