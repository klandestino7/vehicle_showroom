fx_version 'bodacious'
game 'gta5'

client_scripts {
    "dist/client.js"
} 

server_scripts {
    "@oxmysql/lib/MySQL.lua",
    "dist/server.js"
}

fxdk_watch_command 'yarn' {'watch'}
fxdk_build_command 'yarn' {'build'}

ui_page "web/dist/index.html"

files {
    "web/dist/index.html",
    
    "web/dist/images/*.svg",
    "web/dist/icons/*.svg",
    "web/dist/fonts/*.ttf",
    "web/dist/vehicles/*.png",

    "web/dist/assets/*.svg",
    "web/dist/assets/*.css",
    "web/dist/assets/*.js",

    "web/dist/icons/*",
}