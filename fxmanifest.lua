fx_version 'bodacious'
game 'gta5'

lua54 "yes"

client_scripts {
    "lua-lib/orbitalcam/camera.lua",
    "lua-lib/orbitalcam/controllable_orbitalcam.lua",
    "lua-lib/orbitalcam/orbitalcam.lua",

    "dist/client.js"
} 

server_scripts {
    "dist/server.js"
}

-- fxdk_watch_command 'yarn' {'watch'}
-- fxdk_build_command 'yarn' {'build'}

ui_page "web/dist/index.html"

files {
    "web/dist/index.html",
    
    "web/dist/images/*.svg",
    "web/dist/images/*.png",
    "web/dist/icons/*.svg",
    "web/dist/fonts/*.ttf",
    "web/dist/vehicles/*.png",

    "web/dist/assets/*.svg",
    "web/dist/assets/*.css",
    "web/dist/assets/*.js",

    "web/dist/icons/*",
}